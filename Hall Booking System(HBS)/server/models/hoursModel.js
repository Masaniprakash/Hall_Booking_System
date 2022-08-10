import mongoose from "mongoose";
const HourSchema = new mongoose.Schema(
    {
        hourNumbers:[ 
            { 
                number: Number, 
                unavailableDates: {
                    type: [{
                        date:Date,
                        name:String
                    }]
                }
            }
        ]
    },
    { timestamps: true }
);

const Hour = mongoose.model("Hour", HourSchema);
export default Hour