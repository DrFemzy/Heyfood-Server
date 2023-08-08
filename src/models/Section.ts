import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema
import { RestaurantDoc } from "./Restaurant"

export interface SectionDoc extends Document {
    name: string,
    restaurants: Array<RestaurantDoc>,
}



const Section = new Schema<SectionDoc>({
    name: {
        type: String
    },
    restaurants: {
        type: [Object]
    }
}, {timestamps: true})


export default mongoose.model<SectionDoc>("Section", Section)