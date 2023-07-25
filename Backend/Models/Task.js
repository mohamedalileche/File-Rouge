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

      Manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employe',
        required: true
      },
    Project:{
        type:Schema.Types.ObjectId,
        ref:"Project"
    },

    Statut: {
        type: String,
        enum: ["En cours", "Finis"],
        default: "En cours"
    }
},
{timestamps: true}
);
export default mongoose.model('Task', TaskSchema);

