import React, { useState, useEffect } from 'react';
import { getFeed, createPost } from './api';
import './Dashboard.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  
  // Recupere o token que foi salvo no login
  const token = localStorage.getItem('authToken');

  // Função para atualizar o feed
  const fetchFeed = async () => {
    try {
      const data = await getFeed(token);
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar o feed:", error);
    }
  };

  useEffect(() => {
    if(token) {
      fetchFeed();
    }
  }, [token]);

  // Função para criar um novo post
  const handleNewPost = async (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    try {
      await createPost({ text: newPostText }, token);
      setNewPostText("");
      fetchFeed(); // Atualiza o feed após o novo post
    } catch (error) {
      console.error("Erro ao criar novo post:", error);
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