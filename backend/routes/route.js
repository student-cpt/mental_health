import express from 'express';
import { userSignup, userLogin, getUsers, deleteUser, updateUser } from '../controller/user-controller.js';
import passport from 'passport';
import '../config/passportConfig.js';
import { create_journal, getPostsByUsername, update_journal, delete_journal} from '../controller/journal-controller.js';
import { getAnonymousPosts, createAnonymousPost } from '../controller/anonymous-controller.js';
const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/users', passport.authenticate('jwt', { session: false }), getUsers);
router.delete('/delete-user/:username', passport.authenticate('jwt', { session: false }), deleteUser);
router.put('/update-user', passport.authenticate('jwt', { session: false }), updateUser);

router.get('/anonymousPosts', getAnonymousPosts);
router.post('/createAnonymousPosts', createAnonymousPost);


router.post ('/:username', create_journal);
router.get('/:username/journals', getPostsByUsername);
router.put('/journals/:id', passport.authenticate('jwt', { session: false }), update_journal);
router.delete('/journal-delete/:username/:id', passport.authenticate('jwt', { session: false }), delete_journal);



export default router; 
