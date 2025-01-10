import { model, Schema } from 'mongoose';
import { contactTypeStr } from '../../constants/contact.js';

// name - string, required
// phoneNumber - string, required
// email - string
// isFavourite - boolean, default false
// contactType - string, enum(’work’, ‘home’, ‘personal’), required, default ‘personal’

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypeStr,
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
  },
);

const ContactCollection = model('contact', contactSchema);

export const sortByList = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

export default ContactCollection;
