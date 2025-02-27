import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import cors from 'cors'

import auth from './middleware/auth.js'

const app = express()
app.use(express.json());
app.use(cors());

app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);



app.listen(3000, () => console.log("Servidor Rodando")); //Rodando o api na porta 3000

// mongodb+srv://Manima4000:<db_password>@cluster0.bjaln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0