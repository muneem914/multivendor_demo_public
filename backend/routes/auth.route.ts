import { requireRole } from './../middlewares/auth';
import { Role } from '../types/role.enum';
import express from 'express';
import { addNewAddress, deleteAddress, deleteUserById, getAllCustomers, getAllSellers, getCustomerById, getProfile, getSellerById, invalidateSeller, login, logout, register, setDefaultAddress, updateAddress, updateNotificationPreferences, updateUserPassword, updateUserProfile, verifySeller } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, getProfile)
router.put('/me/update-profile', requireAuth, updateUserProfile)
router.put('/me/update-notification', requireAuth, updateNotificationPreferences)
router.put('/me/update-password', requireAuth, updateUserPassword)


router.post('/address/new', requireAuth, addNewAddress)
router.put('/address/update/:id', requireAuth, updateAddress)
router.delete('/address/delete/:id', requireAuth, deleteAddress)
router.patch('/address/default/:id', requireAuth, setDefaultAddress)

// admin routes
router.delete('/admin/users/delete/:id', requireAuth, requireRole(Role.ADMIN), deleteUserById)
router.get('/admin/sellers', requireAuth, requireRole(Role.ADMIN), getAllSellers)
router.get('/admin/customers', requireAuth, requireRole(Role.ADMIN), getAllCustomers)
router.get('/admin/sellers/:id', requireAuth, requireRole(Role.ADMIN), getSellerById)
router.get('/admin/customers/:id', requireAuth, requireRole(Role.ADMIN), getCustomerById)
router.put('/admin/sellers/:id/verify', requireAuth, requireRole(Role.ADMIN), verifySeller)
router.put('/admin/sellers/:id/invalidate', requireAuth, requireRole(Role.ADMIN), invalidateSeller)


export default router;