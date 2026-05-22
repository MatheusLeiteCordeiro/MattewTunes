import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/Header.css';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: null, // Armazena o objeto de usuário completo
      loading: true,
    };
  }

  async componentDidMount() {
    // Busca as informações completas do usuário
    this.setState({ loading: true });
    const response = await getUser();
    this.setState({
      user: response,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    
    if (loading || !user) {
      return (
        <header className="header-component dark-mode loading-header">
          <Loading />
        </header>
      );
    }
    
    const { name, image } = user; // Desestrutura o nome e a imagem (que pode ser URL ou Base64)

    return (
      <header data-testid="header-component" className="header-component dark-mode">
        <nav className="header-nav">
          <Link data-testid="link-to-search" to="/search" className="header-link">
            Pesquisa
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites" className="header-link">
            Favoritos
          </Link>
          <Link data-testid="link-to-profile" to="/profile" className="header-link">
            Perfil
          </Link>
        </nav>
        
        <Link to="/profile" className="header-user-link-wrapper">
          <div className="header-user">
            {/* NOVO: Container condicional para imagem vs placeholder */}
            <div className="avatar-container">
              {image ? (
                <img 
                  src={image} 
                  alt={name} 
                  className="user-avatar-image" 
                />
              ) : (
                <div className="user-avatar-placeholder">
                  {/* Fallback para a inicial se não houver imagem */}
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h2 data-testid="header-user-name" className="user-name">
              {name}
            </h2>
          </div>
        </Link>
      </header>
    );
  }
}