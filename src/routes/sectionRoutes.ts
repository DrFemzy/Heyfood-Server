import express from "express"
const router = express.Router()
import { getSections, uploadSections } from "../controllers/sectionController"

router.get("/", getSections)
router.post("/upload", uploadSections)


export default router