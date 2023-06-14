import mongoose from "mongoose";

const {Schema} = mongoose;

 const ProjectSchema = new Schema({

    Titre:{
        type: String,
        required: true
    },
   
},
{timestamps: true}
);
export default mongoose.model('Project', ProjectSchema);
