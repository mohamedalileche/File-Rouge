import mongoose from 'mongoose';

const { Schema } = mongoose;

const CongeSchema = new Schema({
  employe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employe',
    required: true
  },
  debut: {
    type: Date,
    required: true
  },
  fin: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['Annuel', 'Maladie', 'Maternité', 'Paternité'],
    required: true
  },
  statut: {
    type: String,
    enum: ['En attente', 'Approuvé', 'Refusé'],
    default: 'en attente'
  }
},
{timestamps: true}
);

export default mongoose.model('Conges', CongeSchema);
