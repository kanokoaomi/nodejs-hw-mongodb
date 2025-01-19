import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/user.js';
import { handleSaveError } from './hooks.js';

const sessionSchema = new Schema(
  {
    userId: {
      //   type: Schema.Types.ObjectId,
      type: String,
      //   ref: 'user',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

sessionSchema.post('save', handleSaveError);

export const SessionCollection = model('session', sessionSchema);
