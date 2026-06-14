'use strict';
import { Model } from 'sequelize';

import { WorkflowAttributes as wAttr } from "../interfaces/Workflow";
import { WorkflowPriority as wPriority } from "../interfaces/Workflow";
import { WorkflowType as wType } from "../interfaces/Workflow";

module.exports = (sequelize: any, DataTypes: any) => {

    class Workflow extends Model<wAttr>
        implements wAttr {

        id!: wAttr["id"];
        referenceNumber!: wAttr["referenceNumber"];
        subject!: wAttr["subject"];
        workflowType!: wAttr["workflowType"];
        priority!: wAttr["priority"];
        dueDate!: wAttr["dueDate"];
        // creationDate!: wAttr["creationDate"];
        // updateDate!: wAttr["updateDate"];


        static associate(models: any) {
            // define association here:
            // -------{#1: Workflow HAS MANY Actions} -------
            Workflow.hasMany(models.Action, {
                foreignKey: {
                    name: 'workflowId',
                    allowNull: false,
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            // -------{#2: Workflow HAS MANY Workflow_Participants} -------
            Workflow.hasMany(models.Workflow_Participant, {
                foreignKey: {
                    name: 'workflowId',
                    allowNull: false,
                },
                // onDelete: 'SET NULL',
                // onUpdate: 'CASCADE',
            });
        }
    }// end class

    Workflow.init({
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        referenceNumber: {
            // Human-readable unique tracking number, e.g. "MTS/2026/00001".
            // Nullable so pre-existing rows stay valid (MySQL allows multiple NULLs in a unique index).
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        subject: {
            type: DataTypes.STRING, // default is VARCHAR(255)
            allowNull: false,
        },
        workflowType: {
            type: DataTypes.ENUM,
            values: [
                wType.INTERNAL_CORRESPONDENCE,
                wType.EXTERNAL_CORRESPONDENCE_INCOMING,
                wType.EXTERNAL_CORRESPONDENCE_OUTGOING,
                wType.LETTER,
                wType.DECISION,
                wType.REPORT,
                wType.INSTRUCTIONS,
                wType.INVITATION,
            ],
            defaultValue: wType.INTERNAL_CORRESPONDENCE,
            allowNull: false,
        },
        priority: {
            type: DataTypes.ENUM,
            values: [
                wPriority.URGENT,
                wPriority.HIGH,
                wPriority.MEDIUM,
                wPriority.LOW,
            ],
            defaultValue: wPriority.MEDIUM,
            allowNull: false,
        },
        dueDate: {
            // Optional deadline for the mail; used by the overdue-alert engine.
            type: DataTypes.DATE, // DATETIME for mysql
            allowNull: true,
        },
        // creationDate: {
        //     type: DataTypes.DATE, // DATETIME for mysql
        //     // defaultValue: Date.now(),
        //     allowNull: false,
        // },
        // updateDate: {
        //     type: DataTypes.DATE, // DATETIME for mysql
        //     // defaultValue: Date.now(),
        //     allowNull: false,
        // }
    }, {
        sequelize, //this is our Sequelize instance (our db connection instance)
        modelName: 'Workflow',
    });

    return Workflow;
};