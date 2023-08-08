import express from "express"
const router = express.Router()
import { getTags, uploadTags } from "../controllers/tagControllers"

router.post("/", getTags)
router.post("/upload", uploadTags)


export default router