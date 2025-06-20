
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import { AuthRequest } from "../middlewares/auth";
import { Role } from "../types/role.enum";

// route: /api/register
export const register = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const {
    fName,
    lName,
    email,
    phone,
    password,
    role = Role.CUSTOMER,
    bio,
    notificationPreferences,
    addresses,
    shop
  } = req.body;

  if (!fName || !lName || !phone || !email || !password) {
    return next(new ErrorHandler('All fields are required', 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler('Email already exists', 400));
  }

  const hashed = await hashPassword(password);

  const userData: any = {
    fName,
    lName,
    phone,
    email,
    password: hashed,
    role,
    bio,
    notificationPreferences,
    addresses
  };

  if (role === Role.SELLER) {
    if (!shop?.name) {
      return next(new ErrorHandler("Shop details is required for sellers", 400));
    }
    userData.shop = shop;
  }

  const user = await User.create(userData);
  const token = generateToken(user);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    path: '/',
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      fName: user.fName,
      lName: user.lName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      bio: user.bio,
      notificationPreferences: user.notificationPreferences,
      addresses: user.addresses,
      shop: user.shop
    },
    token
  });
});



// route: /api/login
export const login = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('All fields are required', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler('Invalid credentials', 400));
  }

  const token = generateToken(user);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    path: '/',
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      fName: user.fName,
      lName: user.lName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      bio: user.bio,
      notificationPreferences: user.notificationPreferences,
      addresses: user.addresses,
      shop: user.shop
    },
    token
  });
});


// route: /api/logout
export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});


// route: /api/me
export const getProfile = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new ErrorHandler('Not authenticated', 401));
  }

  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      fName: user.fName,
      lName: user.lName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      bio: user.bio,
      notificationPreferences: user.notificationPreferences,
      addresses: user.addresses,
      shop: user.shop
    },
  });
});


// route: /api/sellers - admin
export const getAllSellers = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ErrorHandler('Only admins can see all sellers', 403));
  }

  const sellers = await User.find({ role: 'seller' }).select("-password");
  res.status(200).json({ success: true, sellers });
});


// route: /api/customers - admin
export const getAllCustomers = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ErrorHandler('Only admins can see all customers', 403));
  }

  const customers = await User.find({ role: 'customer' }).select("-password");
  res.status(200).json({ success: true, customers });
});



// route: /api/me/update-profile - login required
export const updateUserProfile = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ErrorHandler("Not authenticated", 401));

  const updates = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({ success: true, user });
});


// route: /api/me/update-notification - login required
export const updateNotificationPreferences = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ErrorHandler("Not authenticated", 401));

  const preferences = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { notificationPreferences: preferences },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({ success: true, preferences: user.notificationPreferences });
});



// route: /api/me/update-password - login required
export const updateUserPassword = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ErrorHandler("Not authenticated", 401));

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new ErrorHandler("Both current and new passwords are required", 400));
  }

  const user = await User.findById(req.user.id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) return next(new ErrorHandler("Current password is incorrect", 400));

  user.password = await hashPassword(newPassword);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});
