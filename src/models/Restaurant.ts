import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface RestaurantDoc extends Document {
    name: string,
    storeTags: Array<string>,
    popular: {
        count: number
    },
    coverImage: object,
    rating: {
        rating: number,
        count: number,
    },
    description: string
}

const Restaurant = new Schema<RestaurantDoc>({
    name: {
        type: String
    },
    storeTags: {
        type: [String],
    },
    popular: {
        type: Object
    },
    coverImage: {
        type: Object
    },
    rating: {
        type: Object
    },
    description: {
        type: String
    }
}, {timestamps: true})


export default mongoose.model<RestaurantDoc>("Restaurant", Restaurant)