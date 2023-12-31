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
    Poste: {
        type: String,
    },
    Role: {
        type: String,
        enum: ["Manager", "Salarié"],
        default: "Salarié",
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    EnLigne: {
        type: Boolean,
        default: false
    },
    Entreprise: {
        type: Schema.Types.ObjectId,
        ref: 'Entreprise', // Référence au modèle de l'entreprise,
        required: true
    },

});

export default mongoose.model('Employe', EmployeSchema);
