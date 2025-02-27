import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;


//Cadastro
router.post('/cadastro', async (req,res) => {
    try{
        const user = req.body;
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)

        const userDB = await prisma.user.create({
            data:{
                email: user.email,
                name: user.name,
                password: hashPassword
            }
        })
        res.status(201).json(userDB);
    }
    catch (erro) {
        res.status(500).json({message:"Erro no servidor"})
    }
})



//Login
router.post('/login', async (req,res) => {
    try{
        
        const userInfo = req.body;
        //Busca usuário no Banco
        const user = await prisma.user.findUnique({where: {email: userInfo.email}})
        if (!user){
            return res.status(404).json({message: "Usuário não encontrado"})
        }

        //Verifica a senha com a senha criptografada no banco
        const isMatch = await bcrypt.compare(userInfo.password, user.password);
        if (!isMatch){
            return res.status(400).json({message: "Senha incorreta"})
        }

        //Gerar o token JWT
        const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '10h'});
        res.status(200).json(token);
    }   
    catch (err){
        res.status(500).json({message:"Erro no servidor"})
    }
})

export default router