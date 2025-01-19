import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/user.js';
import { handleSaveError } from './hooks.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleSaveError);

export const UserCollection = model('user', userSchema);
