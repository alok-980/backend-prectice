
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import userModel from '../model/user.model.js';
import config from './config.js';

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(
                        new Error('Google account did not provide an email')
                    );
                }

                let user = await userModel.findOne({
                    googleId: profile.id,
                });

                if (!user) {
                    user = await userModel.findOne({ email });
                }

                if (!user) {
                    user = await userModel.create({
                        googleId: profile.id,
                        email,
                        name: profile.displayName,
                        avatar: profile.photos?.[0]?.value,
                    });
                } else if (!user.googleId) {
                    user.googleId = profile.id;
                    user.name = user.name || profile.displayName;
                    user.avatar = user.avatar || profile.photos?.[0]?.value;
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

export default passport;
