import express from "express"
import { createUser, getUsers, getUserEmail, getUser } from "../promises/users.js";
import jwt from "jsonwebtoken";
import {pushRefreshToken, getRefreshToken, deleteToken, getAllRefreshToken} from "../promises/auth.js";
import nodeMailer from "nodemailer"

const router = express.Router();

const generateRefreshToken = (user) =>{
    return jwt.sign({
        id: user.id,
        role: user.role,
        status: user.status
    }, process.env.JWT_REFRESH, {
        expiresIn: "28800s"
    });
}


router.post("/register", async(req,res)=>{
    const {name, contactNumber, email, password, role, status} = req.body;

    let userEmailAccount = await getUserEmail(email);
    console.log(userEmailAccount[0]);
    if(!name | !contactNumber | !email | !password | !role | !status){
        res.status(200).json({ errmessage:"information missing"});
    }
    else if(userEmailAccount[0]){
        res.status(200).json({
            errmessage: "Account already exists"
        })
    }    
    else {
    const result = await createUser(name, contactNumber, email, password, role, status);
    res.status(200).json(result);
    }
})

router.post("/forgotpassword", async(req,res)=>{
    let { email } = req.body;
    const user = await getUserEmail(email);
    if (!user || user.length === 0) {
        return res.status(200).json({
            err:"User Doesn't Exist"});
    }
    let password = user[0].password;

    const html = `
        <h1>Your Email: ${email}</h1>
        <p>Your password: ${password}</p>
    `;
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password By Books management",
        html: html
    }, (error, info) => {
        if (error) {
            return res.status(500).send("Error sending email: " + error.message);
        }
        res.status(200).json({ message: 'Email sent: ' + info.response });
    });
})

router.get("/", async(req,res) =>{
    const users = await getUsers();
    res.status(200).json(users);
})

router.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    const [user] = await getUserEmail(email);
    if (!user){
        res.status(200).json({
            err: "Account Doesn't exist"
        });
        return
    }
    if(user?.password == password) {
        const refreshToken = generateRefreshToken(user);
        const row = await pushRefreshToken(refreshToken);
        res.status(200).json({
            name: user.name,
            role: user.role,
            email: user.email,
            id: user.id,
            status: user.status,
            refreshToken: refreshToken
        });
    }
    else{
        res.status(200).json({
            err: "You Entered Wrong Password"
        });
    }
})

router.post("/refresh", async (req,res)=>{
    const refreshToken = req.body;
    const databaseRefreshToken = await getRefreshToken(refreshToken.refreshToken);
    if (!refreshToken) return res.status(401).send("You are not authenticated");
    if(!databaseRefreshToken) res.status(403).send("Refresh Token is not in database");
    jwt.verify(refreshToken.refreshToken, process.env.JWT_REFRESH, async(err,user)=>{
        deleteToken(refreshToken.refreshToken);
        const newRefreshToken = await generateRefreshToken(refreshToken);
        await pushRefreshToken(refreshToken.refreshToken);
        
        res.status(200).json({
            refreshToken: newRefreshToken
        })
    })
})

router.get("/refresh", async(req,res)=>{
    let result = await getAllRefreshToken();

    res.status(200).json(result);
})

export const verify = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    if(authHeader){
        const token = authHeader.split(" ")[1];        
        jwt.verify(token, process.env.JWT_REFRESH, (err, user)=>{
            if(err){
                res.status(403).send("Token is not Valid");
            }
            req.user = user;
            req.user.token = token;
            next();
        })
    } else {
        res.status(401).send("You are not authenticated");
    }
}

router.post("/logout", verify, async(req,res)=>{
    let refreshToken = req.user.token;
    refreshToken = await deleteToken(req.user.token);
    let result = await getAllRefreshToken();
    res.status(200).json(refreshToken);
})

router.get('/checkToken', verify, (req,res)=>{
    return res.status(200).json({message: "true"});
})

export default router;