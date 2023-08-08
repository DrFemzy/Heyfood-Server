import { Request, Response } from "express";
import Section from "../models/Section"

export const getSections = (req: Request, res: Response) => {

    Section.insertMany(["sectionArray"]).then((sections) => {
        res.status(200).json({
            message: "Sections uploaded successfully",
            sections
        })
    })
}

export const uploadSections = (req: Request, res: Response) => {
    const sectionArray = req.body.sections

    Section.insertMany(sectionArray).then((sections) => {
        res.status(200).json({
            message: "Sections uploaded successfully",
            sections
        })
    })
}
