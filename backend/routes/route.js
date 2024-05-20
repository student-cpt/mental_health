import express from 'express';
import { userSignup, userLogin, getUsers, deleteUser, updateUser } from '../controller/user-controller.js';
import passport from 'passport';
import '../config/passportConfig.js';
import { create_journal, getPostsByUsername} from '../controller/journal-controller.js';
import { getAnonymousPosts, createAnonymousPost } from '../controller/anonymous-controller.js';
const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/users', passport.authenticate('jwt', { session: false }), getUsers);
router.delete('/delete-user', passport.authenticate('jwt', { session: false }), deleteUser);
router.put('/update-user', passport.authenticate('jwt', { session: false }), updateUser);

router.get('/anonymousPosts', getAnonymousPosts);
router.post('/createAnonymousPosts', createAnonymousPost);


router.post ('/:username', create_journal);

router.post('/logout', (req, res) => {
    req.logout(); 
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Logged out successfully' });
    });
});

export default router; 
