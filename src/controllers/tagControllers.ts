import { Request, Response } from "express";
import Tag from "../models/Tag"


export const getTags = async (req: Request, res: Response) => {
    const sortKeys = ["Most Popular", "Nearest", "Highest rated", "Newest", "Most Rated"]
    try{
        const tags = await Tag.find()
        return res.status(200).json({
            tags,sortKeys,error: false
        })
    }catch(err){
        return res.status(200).json({
            error: true,
            message: "Server error occured"
        })
    }
}

export const uploadTags = (req: Request, res: Response) => {
    const tagArray = req.body.tags

    Tag.insertMany(tagArray).then((tags) => {
        res.status(200).json({
            message: "tags uploaded successfully",
            tags
        })
    })
}