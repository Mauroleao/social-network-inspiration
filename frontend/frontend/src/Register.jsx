import React, { useState } from 'react';
import { registerUser } from './api.js';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ email, username, password });
      console.log("Resposta da API:", data);
      if (data.id) {
        setMessage('Usuário cadastrado com sucesso!');
      } else {
        setMessage(data.detail || 'Erro no cadastro');
      }
    } catch (error) {
      console.error("Erro na conexão com a API:", error);
      setMessage('Erro na conexão com a API');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Criar sua conta</h1>
        <p className="register-subtitle">Inscreva-se no Twitter Clone</p>
        <form onSubmit={handleRegister} className="register-form">
          <input 
            type="email" 
            placeholder="Email" 
            className="register-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required 
          />
          <input 
            type="text" 
            placeholder="Nome de usuário" 
            className="register-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className="register-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="register-button">Cadastrar</button>
        </form>
        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;