import { requireRole } from './../middlewares/auth';
import { Role } from '../types/role.enum';
import express from 'express';
import { getAllCustomers, getAllSellers, getProfile, login, logout, register, updateNotificationPreferences, updateUserPassword, updateUserProfile } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, getProfile)
router.put('/me/update-profile', requireAuth, updateUserProfile)
router.put('/me/update-notification', requireAuth, updateNotificationPreferences)
router.put('/me/update-password', requireAuth, updateUserPassword)

router.get('/sellers', requireAuth, requireRole(Role.ADMIN), getAllSellers)
router.get('/customers', requireAuth, requireRole(Role.ADMIN), getAllCustomers)




export default router;