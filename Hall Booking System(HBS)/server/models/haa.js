import mongoose from "mongoose";
const HourSchema = new mongoose.Schema(
    {
        hourNumbers: [
            { 
                number: Number, 
                unavailableDates: {
                    type: [Date]
                }
            }
        ],
    },
    { timestamps: true }
);

const Hour = mongoose.model("Hour", HourSchema);
export default Hour