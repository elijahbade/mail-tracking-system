import cron from "node-cron";
import { Op } from "sequelize";
import colors from "colors";
import "dotenv/config";

import db from "../models/";
import { getIO } from "../socket";
import transporter from "../config/mailer";
import { ActionTypes } from "../interfaces/Workflow_Participants";

const { models } = db.sequelize;

// Overdue emails are OFF unless explicitly enabled, because the SMTP credentials
// in .env may be invalid; the real-time socket badge always works regardless.
const EMAIL_ENABLED = process.env.OVERDUE_EMAIL_ENABLED === "true";
// Defaults to hourly; override with OVERDUE_CRON (e.g. "* * * * *" to test).
const CRON_EXPR = process.env.OVERDUE_CRON || "0 * * * *";

/**
 * Scans for mail whose dueDate has passed and whose RECIPIENT(s) still haven't
 * opened it, then alerts each such recipient once (real-time + optional email).
 * `overdueNotified` on the participant row gates against repeat alerts.
 */
export const scanOverdue = async () => {
    try {
        const now = new Date();

        const overdueWorkflows = await models.Workflow.findAll({
            where: { dueDate: { [Op.lt]: now } }, // NULL dueDates are excluded by the comparison
            attributes: ["id", "referenceNumber", "subject", "dueDate"],
        });
        if (!overdueWorkflows.length) return;

        const io = getIO();
        let alertCount = 0;

        for (const wf of overdueWorkflows) {
            const participants = await models.Workflow_Participant.findAll({
                where: {
                    workflowId: wf.id,
                    actionType: ActionTypes.RECIPIENT,
                    isSeen: false,
                    overdueNotified: false,
                },
                attributes: ["id", "empPositionId"],
            });

            for (const p of participants) {
                const empPosition = await models.Employee_Position.findByPk(p.empPositionId, {
                    attributes: ["employeeId"],
                });
                if (!empPosition) continue;

                const employee = await models.Employee.findByPk(empPosition.employeeId, {
                    attributes: ["id", "firstName", "lastName", "email"],
                });

                const payload = {
                    workflowId: wf.id,
                    referenceNumber: wf.referenceNumber,
                    subject: wf.subject,
                    dueDate: wf.dueDate,
                    actionType: "overdue",
                };

                io?.to(String(empPosition.employeeId)).emit("overdue notification", payload);

                if (EMAIL_ENABLED && employee?.email) {
                    transporter.sendMail(
                        {
                            from: "CORRESPONDENCE MTS <fareshatem.fh@outlook.com>",
                            to: employee.email,
                            subject: `Overdue Mail: ${wf.referenceNumber}`,
                            html:
                                `<p>Dear ${employee.firstName} ${employee.lastName},</p>` +
                                `<p>The mail <b>${wf.referenceNumber}</b> ("${wf.subject}") passed its ` +
                                `due date (${wf.dueDate}) and has not yet been opened. Kindly take action.</p>`,
                        },
                        (err: any) => {
                            if (err) console.log("overdue email error:", err?.response || err);
                        }
                    );
                }

                // Gate future runs so the same recipient isn't alerted repeatedly.
                await models.Workflow_Participant.update(
                    { overdueNotified: true },
                    { where: { id: p.id } }
                );
                alertCount++;
            }
        }

        if (alertCount > 0) {
            console.log(colors.bgMagenta.black(`Overdue scan: sent ${alertCount} overdue alert(s)`));
        }
    } catch (err) {
        console.log("scanOverdue error:", err);
    }
};

export const startOverdueJob = () => {
    cron.schedule(CRON_EXPR, scanOverdue);
    console.log(colors.bgCyan.black(`Overdue mail job scheduled (cron: ${CRON_EXPR})`));
};
