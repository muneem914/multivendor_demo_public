export interface Address {
  label: string;
  street: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
}

export interface NotificationPreferences {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  wishlistUpdates: boolean;
}

export interface Shop {
  name: string;
  location: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  isVerified?: boolean;
}

export type Role = "customer" | "seller" | "admin";

export interface IUser {
  id: string;
  fName: string;
  lName: string;
  phone: number;
  email: string;
  password: string;
  role: Role;
  bio?: string;
  addresses?: Address[];
  notificationPreferences?: NotificationPreferences;
  shop?: Shop;
}
