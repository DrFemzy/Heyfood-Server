import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface TagDoc extends Document {
    name: string,
    description: string,
    iconUrl: string,
}

const Tag = new Schema<TagDoc>({
    name: {
        type: String
    },
    description: {
        type: String
    },
    iconUrl: {
        type: String
    },
}, {timestamps: true})


export default mongoose.model<TagDoc>("Tag", Tag)