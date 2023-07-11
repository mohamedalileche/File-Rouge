import mongoose from 'mongoose';

const { Schema } = mongoose;

const PointageSchema = new Schema({
  employeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employe',
    required: true
  },
  startTime: {
    type: Date,
    default : new Date()
  },
  endTime: {
    type: Date
  }
},
{timestamps: true}
);

export default mongoose.model('Pointages', PointageSchema);
