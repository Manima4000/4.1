import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from '../../services/api.js'
 

function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        try{
            const data = await api.post('/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            data; //Conectando com o backend
            const token = data.data;
            localStorage.setItem('token',token) //guardando o token
            navigate('/listar-usuarios')
            
        }
        catch (error) {
            alert("Senha ou email incorretos")
        }
        
    }

    return(
        <div className="max-w-md  mx-auto border mt-10 bg-white p-8 border-gray-300 rounded-lg shadow-lg ">
            <h2 className="text-2xl front-bold mb-6 text-center text-gray-800">Login</h2>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <input ref = {emailRef} placeholder="Email" type="email " className="w-full py-2 botder border-gray-300 rounded-md focus:outline-none"/>
                <input ref = {passwordRef} placeholder="Senha" type="password" className="w-full py-2 botder border-gray-300 rounded-md focus:outline-none"/>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">Login</button>
            </form>
            <Link to="/" className="text-blue-700 hover:underline mt-4 block text-center">Não tem uma conta? Cadastre-se</Link>
        </div>
    )
}

export default Login;