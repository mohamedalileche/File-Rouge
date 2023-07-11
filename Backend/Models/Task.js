import mongoose from "mongoose";

const {Schema} = mongoose;

 const TaskSchema = new Schema({
    
    Titre: {
        type: String,
        required: true
    },
    Description:{
        type:String, 
        default :""
    },
    Employe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employe',
        required: true
      },
    Assigne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employe',
        required: true
    },
    Project:{
        type:Schema.Types.ObjectId,
        ref:"Project"
    }
},
{timestamps: true}
);
export default mongoose.model('Task', TaskSchema);

