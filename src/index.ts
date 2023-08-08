import { Request, Response } from "express";
import express from "express"
import cors from "cors"
import env from "dotenv"
import bodyParser from "body-parser"

env.config();

// Connect DB
require("./utils/connectDB")

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routers
import restaurantRouter from "./routes/restaurantRoutes"
import sectionRouter from "./routes/sectionRoutes"
import tagRouter from "./routes/tagRoutes"

// Middlewares

app.use("/api/restaurant", restaurantRouter);
app.use("/api/section", sectionRouter);
app.use("/api/tag", tagRouter);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Up and running"
    })
})

// Start Server on port 8080
app.listen(process.env.PORT, function(){
    console.log("App started on port: ", process.env.PORT)
})
