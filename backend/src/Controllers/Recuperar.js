import clientemodelo from "../models/Cliente.js";
import empleadomodelo from "../models/Empleados.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail, HTMLRecoveryEmail } from "../utils/RecoveryPass.js";
import { config } from "../config.js";
import { verify } from "crypto";


const passworRecovery= {};

passworRecovery.requestCode = async (req,res) =>{
    const {correo} = req.body;

    try{
        let userfound;
        let usertype;

        userfound = await clientemodelo.findOne({correo});
        if(userfound){
            usertype = "cliente";
        }else{
            userfound = await empleadomodelo.findOne({correo});
            if(userfound){
                usertype  = "empleado";
            }
        }
        if(!userfound){
            res.json({message: "Usuario no encontrado"});
        }

        const codex=Math.floor(10000+ Math.random()*90000).toString();

        const token = jwt.sign(
            {correo,codex,usertype,verified:false},
            config.JWT.secret,
            {expiresIn: "20m"}
        );


        res.cookie("tokenRecoveryCode",token,{maxAge: 20 *60 * 1000});

        await sendEmail(
            correo,
            "Tu codigo de verificacion",
            "Hola este es tu codigo de verificacion",
            HTMLRecoveryEmail(codex)
        );

        res.json({message: "Correo enviado"});
    }catch(error){
        console.log("error"+error);
    }
};

passworRecovery.verifyCode = async (req,res) =>{
    const {codex}=req.body;

    try{
        const token = req.cookies.tokenRecoveryCode;

        const decoded = jwt.verify(token,config.JWT.secret)
        if(decoded.codex !== codex){
            return res.json({message: "Codigo invalido"});
        }

        const newToken = jwt.sign(
            {
                email:decoded.email,
                codex:decoded.codex,
                usertype:decoded.usertype,
                verified:true,
            },

            config.JWT.secret,

            {expiresIn: "20m"}
        );

        res.cookie("tokenRecovery",newToken,{maxAge:20*60*1000});
        res.json({message: "codigo de verificacion terminado"});
    }catch (error) {
    console.log("error" + error);
  }
};


passworRecovery.newPass = async (req,res) => {
    const { newPass} = req.body;

    try{
        const token = req.cookies.tokenRecoveryCode;

        const decoded = jwt.verify(token,config.JWT.secret);


        if(!decoded.verified){
            return res.json({message: "Codigo no verificaco"});
        }

        const {correo,usertype} = decoded;

        const hashedPassworrd = await bcryptjs.hash(newPass,10);

        let updateUser;

        if(usertype === "cliente"){
            updateUser =await clientemodelo.findByIdAndUpdate(
                {correo},
                {contrasena:hashedPassworrd},
                {new:true}
            );
        }else if(usertype === "empleado"){
            updateUser = await empleadomodelo.findByIdAndUpdate(
                {correo},
                {contrasena:hashedPassworrd},
                {new:true}
            );
        }

            res.clearCookie("tokenRecoveryCode");
            res.json({ message: "Contraseña actualizada" });
}catch (error) {
    console.log("error" + error);
  }
};

export default passworRecovery;