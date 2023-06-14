import mongoose from 'mongoose';

const { Schema } = mongoose;

const EntrepriseSchema = new Schema({
    Nom_entreprise: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Telephone: {
        type: Number,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true
        
    },
});

export default mongoose.model('Entreprise', EntrepriseSchema);