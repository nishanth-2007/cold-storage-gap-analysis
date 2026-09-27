import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['farmer', 'owner', 'planner', 'admin'], 
    default: 'farmer' 
  },
  organization: { type: String, default: '' },
  state: { type: String, default: 'Andhra Pradesh' },
  district: { type: String, default: '' },
  mandal: { type: String, default: '' },
  village: { type: String, default: '' },
  phone: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
export default User;
