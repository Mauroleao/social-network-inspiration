import React, { useState, useEffect } from 'react';
import { getFeed, createPost } from './api.js';
import './Dashboard.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('authToken');
  
  console.log('Token obtained:', token);

  const fetchFeed = async () => {
    try {
      const data = await getFeed(token);
      console.log('Feed data (raw):', data);
      if(data.detail){ 
        // Geralmente, se a autenticação falhar, o backend retorna {detail: "Mensagem"}.
        setErrorMessage(data.detail);
      } else {
        setPosts(data);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error fetching feed:', error);
      setErrorMessage('Erro ao buscar feed.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchFeed();
    }
  }, [token]);

  const handleNewPost = async (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    try {
      console.log('Sending new post, token:', token);
      const result = await createPost({ text: newPostText }, token);
      console.log('Response from createPost (raw):', result);
      if(result.detail){
        // Se houver erro, normalmente vem em result.detail.
        setErrorMessage(result.detail);
      } else {
        setNewPostText('');
        setErrorMessage('');
        fetchFeed();
      }
    } catch (error) {
      console.error('Error creating new post:', error);
      setErrorMessage('Erro ao criar post.');
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>Menu</h2>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Explorar</a></li>
          <li><a href="#">Notificações</a></li>
          <li><a href="#">Mensagens</a></li>
          <li><a href="#">Favoritos</a></li>
          <li><a href="#">Listas</a></li>
          <li><a href="#">Perfil</a></li>
        </ul>
      </aside>
      <main className="dashboard-main">
        <div className="new-post-container">
          <form onSubmit={handleNewPost}>
            <textarea
              className="new-post-textarea"
              placeholder="O que está acontecendo?"
              value={newPostText}
              onChange={e => setNewPostText(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="new-post-button">Tweetar</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="feed-content">
          {posts.length ? (
            posts.map(post => (
              <div key={post.id} className="post">
                <p className="post-user"><strong>{post.user}</strong></p>
                <p className="post-text">{post.text}</p>
                <p className="post-date">{new Date(post.created_at).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>O feed está vazio.</p>
          )}
        </div>
      </main>
      <aside className="dashboard-right">
        <div className="trends">
          <h3>Tendências para você</h3>
          <ul>
            <li>#ReactJS</li>
            <li>#Vite</li>
            <li>#TwitterClone</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;