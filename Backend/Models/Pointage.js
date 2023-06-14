import mongoose from 'mongoose';

const { Schema } = mongoose;

const PointageSchema = new Schema({
  employeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employe',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
  }
},
{timestamps: true}
);

export default mongoose.model('Pointages', PointageSchema);
