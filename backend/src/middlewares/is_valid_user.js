import UserController from "../controllers/users.controller.js";

export default async function (req, res, next){
    try {
        const User = new UserController()
        let { email, password } = req.body;
        let user =  await User.readOne(email)
        if (!user){
            next()
        } else {
            return res.status(400).json({
                status: 400,
                method: req.method,
                path: req.url,
                message: 'Invalid user.'
            })
        }  
    } catch (error) {
        next(error)
    }
}