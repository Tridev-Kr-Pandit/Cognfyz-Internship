import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';



var checkUserAuth = async(req,res, next)=>{
    let token
    const {authorization} = req.headers;  

    if(authorization && authorization.startsWith('Bearer')){
        try {
            //Get Token from header
            token = authorization.split(' ')[1];
            // console.log('Token', token);
            // console.log('Authorization', authorization);


            //Verify Token
            const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log(userID);

            //Get User from Token
            req.user = await UserModel.findById(userID).select('-password');
            // console.log(req.user);

            next();
        } catch (error) {
            console.log(error);
            res.status(401).send({"status": "feild", "message": "Unauthorized User"});
        }
    }
    if(!token){
        res.status(401).send({"status": "feild", "message": "Unauthorized User, No Token"});
    }
}

export default checkUserAuth;