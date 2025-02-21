import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log("Resposta da API:", data);
      if(data.token){
        setMessage('Login realizado com sucesso!');
        // Salvar token (ex: localStorage) se necessário
        localStorage.setItem('authToken', data.token);
        // Redireciona para a Dashboard
        navigate('/dashboard');
      } else {
        setMessage(data.detail || 'Erro no login');
      }
    } catch (error) {
      console.error("Erro na conexão com a API:", error);
      setMessage('Erro na conexão com a API');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Twitter Clone</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input 
            type="email" 
            placeholder="Email" 
            className="login-input"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="login-input"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="login-button">Entrar</button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;