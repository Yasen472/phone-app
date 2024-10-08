import mongoose from 'mongoose';

const contactSchema = mongoose.Schema(
  {
    contactName: {
      type: String,
      required: true,
    },
    contactPhoneNumber: {
      type: String,
      required: true,
    }
  }
);

export const Contact = mongoose.model('Contact', contactSchema);
