import mongoose from 'mongoose';

const { Schema } = mongoose;

const PointageSchema = new Schema({
  employeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employe',
    required: true
  },
  startTime: {
    type: Date.now,
    required: true
  },
  endTime: {
    type: Date.now,
  }
},
{timestamps: true}
);

export default mongoose.model('Pointages', PointageSchema);
