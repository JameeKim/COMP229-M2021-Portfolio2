/**
 * server/models/projects.ts
 *
 * Schema for project model shown on projects page
 *
 * Dohyun Kim 301058465
 * Jun. 8, 2021
 */

import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        projectType: {
            type: [{
                type: String,
                enum: ["game", "webapp", "mobile", "desktop", "general"],
            }],
            default: ["game"],
        },
        collaborationType: String,
        description: [String],
        imgPath: {
            type: String,
            required: true,
        },
        imgAlt: {
            type: String,
            default: "An image of the project",
        },
        links: [{
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }],
    },
    {
        collection: "projects",
    },
);

const Model = mongoose.model("Project", ProjectSchema);
export default Model;
