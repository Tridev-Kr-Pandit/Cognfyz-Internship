import express from 'express'
const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middleware/auth_middleware.js';

//Route Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth);

// Public Routes
router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin);




//Protected Routes
router.post('/changepassword', UserController.changeUserPassword);

router.use('/loggeduser', checkUserAuth);
router.get('/loggeduser', UserController.loggedUser);



export default router;