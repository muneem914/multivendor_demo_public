
import mongoose, { Schema, Document } from 'mongoose';
import { Role } from '../types/role.enum';

interface NotificationPreferences {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  wishlistUpdates: boolean;
}

interface Address {
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

interface Shop {
  name: string;
  location: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  isVerified?: boolean;
}

export interface IUser extends Document {
  fName: string;
  lName: string;
  email: string;
  phone: number;
  password: string;
  role: Role;
  bio?: string;
  notificationPreferences?: NotificationPreferences;
  addresses?: Address[];
  shop?: Shop;
}

const notificationPreferencesSchema = new Schema<NotificationPreferences>({
  orderUpdates: { type: Boolean, default: true },
  promotions: { type: Boolean, default: false },
  newsletter: { type: Boolean, default: true },
  wishlistUpdates: { type: Boolean, default: true },
}, { _id: false });

const addressSchema = new Schema<Address>({
  label: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
}, { _id: false });

const shopSchema = new Schema<Shop>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  logoUrl: { type: String },
  bannerUrl: { type: String },
  isVerified: { type: Boolean, default: false },
}, { _id: false });

const userSchema = new Schema<IUser>(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CUSTOMER,
    },
    bio: { type: String },
    notificationPreferences: notificationPreferencesSchema,
    addresses: [addressSchema],
    shop: shopSchema,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
