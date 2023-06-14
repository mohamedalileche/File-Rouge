import mongoose from 'mongoose';

const { Schema } = mongoose;

const EmployeSchema = new Schema({
    Nom: {
        type: String,
        required: true
    },
    Prenom: {
        type: String,
        required: true
    },
    Telephone: {
        type: Number,
        required: true,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Role: {
        type: String,
        enum: ["Admin", "Employe"],
        default: "Employe",
        required: true,
    },
    Horaires: {
        type: String
    },
    Password: {
        type: String,
        required: true
    },
    Entreprise: {
        type: Schema.Types.ObjectId,
        ref: 'Entreprise' // Référence au modèle de l'entreprise
    }
});

export default mongoose.model('Employe', EmployeSchema);
