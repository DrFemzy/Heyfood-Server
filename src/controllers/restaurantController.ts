import { Request, Response } from "express";
import Restaurant from "../models/Restaurant"
import Section from "../models/Section";
import { getRestaurantRequestValidation, sortingRequestValidation } from "../utils/requestValidation";


export const getRestaurants = async (req: Request, res: Response) => {
    const { error } = getRestaurantRequestValidation(req.body)

    if(error){
        // console.log(error)
        return res.status(400).json({
            error: true,
            message: error.details[0].message.toUpperCase(),
        })
    }
    const body = req.body, skip = (body.page - 1) * body.perPage, perPage = body.perPage
    const restaurantCount = body.storeTags?.length > 0 ? await Restaurant.count({
        $or: body.storeTags?.map((tag: string)=>{
            return {storeTags: tag}
        })
    }) : await Restaurant.count()
    
    const restaurants = body.storeTags?.length > 0 ? await Restaurant.find({
        $or: body.storeTags?.map((tag: string)=>{
            return {storeTags: tag}
        })
    }, null, {limit: perPage, skip: skip}) : await Restaurant.find({}, null, {limit: perPage, skip: skip})
    const sections = await Section.find({}, null, {limit: perPage, skip: skip})
    
    return res.status(200).json({
        error: false,
        result: {
            restaurants, sections
        },
        message: "Restaurants Fetched successfully",
        pageInfo: {
            total: restaurantCount, 
            perPage,
            currentPage: body.page,
            from: skip+1, 
            to: skip+perPage,
            lastPage: Math.ceil(restaurantCount/perPage)
        }
    })
}

export const uploadRestaurants = (req: Request, res: Response) => {
    const restaurantArray = req.body.restaurants

    Restaurant.insertMany(restaurantArray).then((restaurants) => {
        res.status(200).json({
            message: "Restaurants uploaded successfully",
            restaurants
        })
    })
}


export const getPopularRestaurants = async (req: Request, res: Response) => {
    const { error } = sortingRequestValidation(req.body)

    if(error){
        // console.log(error)
        return res.status(400).json({
            error: true,
            message: error.details[0].message.toUpperCase(),
        })
    }
    const body = req.body, skip = (body.page - 1) * body.perPage, perPage = body.perPage
    const restaurantCount = await Restaurant.count()

    let restaurants

    switch (req.body.sortKey) {
        case "Most Popular":
          restaurants = await Restaurant.find({}, null, {limit: perPage, skip: skip, sort: {popular : -1}})
          break;
        case "Highest Rated":
          restaurants = await Restaurant.find({}, null, {limit: perPage, skip: skip, sort: {"rating.rating" : -1}})
          break;
        case "Newest":
            restaurants = await Restaurant.find({}, null, {limit: perPage, skip: skip, sort: {createdAt : -1}})
            break;
        case "Most Rated":
            restaurants = await Restaurant.find({}, null, {limit: perPage, skip: skip, sort: {'rating.count' : -1}})
          break;
      }
    
    return res.status(200).json({
        error: false,
        result: {
            restaurants, section: []
        },
        message: "Restaurants Fetched successfully",
        pageInfo: {
            total: restaurantCount, 
            perPage,
            currentPage: body.page,
            from: skip+1, 
            to: skip+perPage,
            lastPage: Math.ceil(restaurantCount/perPage)
        }
    })
}