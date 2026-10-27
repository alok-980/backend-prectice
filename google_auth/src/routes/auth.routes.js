
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/passport.js';
import config from '../config/config.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 1. Start Google OAuth login
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account',
        session: false,
    })
);

// 2. Handle Google's callback
router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${config.CLIENT_URL}/login?error=google`,
    }),
    (req, res) => {
        try {
            const token = jwt.sign(
                { id: req.user._id.toString() },
                config.ACCESS_TOKEN_SECRET,
                { expiresIn: '7d' }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/',
            });

            return res.redirect(`${config.CLIENT_URL}/dashboard`);
        } catch (error) {
            console.error('JWT creation failed:', error.message);
            return res.status(500).send('Authentication failed');
        }
    }
);

// 3. Get the currently authenticated user
router.get('/me', requireAuth, (req, res) => {
    return res.json({ user: req.user });
});

// 4. Logout by clearing the JWT cookie
router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    return res.json({ message: 'Logged out' });
});

export default router;
