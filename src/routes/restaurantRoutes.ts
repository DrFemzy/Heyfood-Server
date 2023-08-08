import express from "express"
const router = express.Router()
import { getPopularRestaurants, getRestaurants, uploadRestaurants } from "../controllers/restaurantController"

router.post("/", getRestaurants) 
router.post("/upload", uploadRestaurants) 
router.post("/popular", getPopularRestaurants)


export default router