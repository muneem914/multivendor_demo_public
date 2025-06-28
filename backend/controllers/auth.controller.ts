
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
  // res.cookie("token", null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  // });

  res.clearCookie("token", {
    path: '/',
    httpOnly: true,
    sameSite: "none",
    secure: true,
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



// route /address/new
export const addNewAddress = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ErrorHandler("Not authenticated", 401));

  const newAddress = req.body;

  if (!newAddress || !newAddress.label || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode || !newAddress.country) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (newAddress.isDefault === true) {
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { "addresses.$[].isDefault": false } }
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { addresses: newAddress } },
    { new: true, runValidators: true }
  )

  if (!updatedUser) {
    return next(new ErrorHandler("User not found", 404))
  }

  res.status(200).json({
    success: true,
    message: "Address added successfully",
    addresses: updatedUser.addresses
  })
})



// route - api/address/update/:id

export const updateAddress = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ErrorHandler("Not authenticated", 404))

  const { id } = req.params;
  const updatedAddress = req.body;

  if (!updatedAddress || !updatedAddress.label || !updatedAddress.street || !updatedAddress.city || !updatedAddress.state || !updatedAddress.postalCode || !updatedAddress.country) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (updatedAddress.isDefault === true) {
    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { "addresses.$[].isDefault": false } }
    )
  }

  const updateUserAddress = await User.findOneAndUpdate(
    {
      _id: req.user.id,
      "addresses._id": id
    },
    {
      $set: {
        "addresses.$.label": updatedAddress.label,
        "addresses.$.street": updatedAddress.street,
        "addresses.$.city": updatedAddress.city,
        "addresses.$.state": updatedAddress.state,
        "addresses.$.postalCode": updatedAddress.postalCode,
        "addresses.$.country": updatedAddress.country,
        "addresses.$.isDefault": updatedAddress.isDefault || false
      },
    },
    { new: true, runValidators: true }
  )

  if (!updateUserAddress) return next(new ErrorHandler("user or address not found", 404))

  const hasDefaultAddress = updateUserAddress.addresses?.some(address => address.isDefault === true);

  if (!hasDefaultAddress && updateUserAddress.addresses && updateUserAddress.addresses.length > 0) {
    const finalUpdatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { "addresses.0.isDefault": true } },
      { new: true }
    )

    return res.status(200).json({
      success: true,
      message: "Address updated successfully, first address set as default",
      addresses: finalUpdatedUser?.addresses
    })
  }

  res.status(200).json({
    success: true,
    message: 'address updated successfully',
    addresses: updateUserAddress.addresses
  })
})





// route - api/address/delete/:id

export const deleteAddress = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ErrorHandler("Not authenticated", 404))

  const { id } = req.params;

  const user = await User.findById(req.user.id);
  if (!user || !user.addresses || user.addresses.length === 0) {
    return next(new ErrorHandler("User not found", 404))
  }

  const addressToDelete = user.addresses.find(address => address._id?.toString() === id)
  if (!addressToDelete) return next(new ErrorHandler("address not found", 404))

  const isDefaultAddress = addressToDelete.isDefault;

  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { addresses: { _id: id } } },
    { new: true }
  )

  if (!updateUser) return next(new ErrorHandler("failed to delete address", 500))

  if (isDefaultAddress && updateUser.addresses && updateUser.addresses.length > 0) {
    const finalUpdateUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { "addresses.0.isDefault": true } },
      { new: true }
    )

    return res.status(200).json({
      success: true,
      message: "Address deleted and first address set as default",
      addresses: finalUpdateUser?.addresses
    })
  }

  return res.status(200).json({
    success: true,
    message: "address deleted successfully",
    addresses: updateUser.addresses
  })

})



// route - api/address/default/:id
export const setDefaultAddress = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ErrorHandler("user not found", 404))

  const { id } = req.params;

  await User.findByIdAndUpdate(
    req.user.id,
    { $set: { "addresses.$[].isDefault": false } },
  )

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: req.user.id,
      "addresses._id": id
    },
    { $set: { "addresses.$.isDefault": true } },
    { new: true }
  )

  if (!updatedUser) return next(new ErrorHandler("user or address not found", 404))

  res.status(200).json({
    success: true,
    message: "default address updated successfully",
    addresses: updatedUser.addresses
  })
})



// route api/admin/sellers/:id/verify
export const verifySeller = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') return next(new ErrorHandler("Only admin can access to this route", 403))

  const { id } = req.params;

  const seller = await User.findById(id);

  if (!seller) return next(new ErrorHandler("seller not found", 404))
  if (seller.role !== 'seller') return next(new ErrorHandler("user is not a seller", 400))
  if (!seller.shop) return next(new ErrorHandler("seller has no shop profile", 400))

  const updateSeller = await User.findByIdAndUpdate(
    id,
    { $set: { 'shop.isVerified': true } },
    { new: true, runValidators: true }
  ).select('-password')

  res.status(200).json({
    success: true,
    message: "seller verified successfully",
    seller: updateSeller
  })

})

// route api/admin/sellers/:id/invalidate
export const invalidateSeller = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') return next(new ErrorHandler("Only admin can access to this route", 403))

  const { id } = req.params;

  const seller = await User.findById(id);

  if (!seller) return next(new ErrorHandler("seller not found", 404))
  if (seller.role !== 'seller') return next(new ErrorHandler("user is not a seller", 400))
  if (!seller.shop) return next(new ErrorHandler("seller has no shop profile", 400))

  const updateSeller = await User.findByIdAndUpdate(
    id,
    { $set: { 'shop.isVerified': false } },
    { new: true, runValidators: true }
  ).select('-password')

  res.status(200).json({
    success: true,
    message: "seller unverified successfully",
    seller: updateSeller
  })

})

// route api/admin/sellers/:id
export const getSellerById = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") return next(new ErrorHandler("Only admin can access to this route", 403))

  const { id } = req.params;

  const seller = await User.findOne({
    _id: id,
    role: 'seller'
  }).select("-password")

  if (!seller) return next(new ErrorHandler("seller not found by Id", 404))

  res.status(200).json({
    success: true,
    seller
  })
})
// route api/admin/customers/:id
export const getCustomerById = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") return next(new ErrorHandler("Only admin can access to this route", 403))

  const { id } = req.params;

  const customer = await User.findOne({
    _id: id,
    role: 'customer'
  }).select("-password")

  if (!customer) return next(new ErrorHandler("customer not found by Id", 404))

  res.status(200).json({
    success: true,
    customer
  })
})

// route api/admin/delete/:id
export const deleteUserById = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") return next(new ErrorHandler("Only admin can access to this route", 403))

  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found with provided ID", 404))

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "user deleted successfully"
  })
})
