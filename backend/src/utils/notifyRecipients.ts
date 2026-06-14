import db from "../models/";
import { getIO } from "../socket";

const { models } = db.sequelize;

interface NotifyArgs {
    empPositionIds: Array<number | string>;
    payload: any;
    event?: string; // socket event name; defaults to "mail notification"
}

/**
 * Pushes a real-time notification to each participant (by their Employee_Position id).
 *
 * Each participant is identified in workflows by `empPositionId`, but the socket
 * rooms are keyed by `employeeId` (see socket.ts "setup"), so we resolve the
 * owning employee for every position before emitting.
 *
 * Safe to call even when no client is connected — Socket.io simply no-ops on an
 * empty room, and we guard against the io server not being initialised yet.
 */
export const notifyParticipants = async ({ empPositionIds, payload, event = "mail notification" }: NotifyArgs) => {
    const io = getIO();
    if (!io) return; // socket server not ready (e.g. very early startup)

    // De-duplicate position ids (a person could be both recipient and cc in edge cases)
    const uniqueIds = Array.from(new Set(empPositionIds.map((id) => Number(id))));

    for (const empPositionId of uniqueIds) {
        try {
            const empPosition = await models.Employee_Position.findByPk(empPositionId, {
                attributes: ["employeeId"],
            });
            if (!empPosition) continue;
            io.to(String(empPosition.employeeId)).emit(event, payload);
        } catch (err) {
            // Never let a notification failure break the request flow.
            console.log("notifyParticipants error:", err);
        }
    }
};
