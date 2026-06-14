import { Op } from "sequelize";
import db from "../models/";

const { models } = db.sequelize;

const PREFIX = "MTS"; // Mail Tracking System

/**
 * Generates a human-readable, unique mail reference number of the form
 * `MTS/<year>/<00001>` using a global per-year sequence.
 *
 * The count is taken inside the caller's transaction so the sequence is
 * consistent with the workflow insert; the `referenceNumber` unique index on
 * the `workflows` table is the final backstop against a race collision.
 *
 * @param year         the calendar year to bucket the sequence under
 * @param transaction  the Sequelize transaction the workflow is created in
 */
export const generateReferenceNumber = async (
    year: number,
    transaction: any
): Promise<string> => {
    const countThisYear = await models.Workflow.count({
        where: {
            referenceNumber: { [Op.like]: `${PREFIX}/${year}/%` },
        },
        transaction,
    });

    const sequence = String(countThisYear + 1).padStart(5, "0");
    return `${PREFIX}/${year}/${sequence}`;
};
