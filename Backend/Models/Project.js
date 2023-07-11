import mongoose from "mongoose";

const {Schema} = mongoose;

 const ProjectSchema = new Schema({

    Titre:{
        type: String,
        required: true
    },
    Entreprise: {
        type: Schema.Types.ObjectId,
        ref: 'Entreprise', // Référence au modèle de l'entreprise,
        required: true
    },  
},
{timestamps: true}
);
export default mongoose.model('Project', ProjectSchema);
