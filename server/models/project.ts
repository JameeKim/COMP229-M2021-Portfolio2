/**
 * server/models/project.ts
 *
 * Schema for project model shown on projects page
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { model, Model, Schema } from "mongoose";

export type ProjectType = "game" | "webapp" | "mobile" | "desktop" | "web" | "general";

interface Project {
    name: string;
    projectType: ProjectType[];
    collaborationType?: string;
    description: string[];
    imgPath: string;
    imgAlt: string;
    links: { name: string, url: string }[];
}

const ProjectSchema = new Schema<Project, Model<Project>>(
    {
        name: {
            type: String,
            required: true,
        },
        projectType: {
            type: [{
                type: String,
                enum: ["game", "webapp", "mobile", "desktop", "web", "general"],
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

const Project = model<Project>("Project", ProjectSchema);
export default Project;
