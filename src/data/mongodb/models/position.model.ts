import mongoose,{Schema} from "mongoose";
const positionScheme = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        unique:true
    },
    email:{
        type:String,
        required:[true, 'Email is required']
    },
    reason:{
        type:String,
        required:[true, 'Reason is required']
    },
    coordinates:{
        type:{
            type:String,
            enum: ["Point"], 
            required: true
        },
        coordinates:{
            type: [Number],
            required: true,
            validate:{
                validator: function(value:number[]){
                    return value.length === 2;
                },
                message: "Coordinates must have exactly two elements: [longitude, latitude].",
            }
        }
    }
})
positionScheme.index({ coordinates: "2dsphere" });
export const PositionModel=mongoose.model('PositionShared',positionScheme)