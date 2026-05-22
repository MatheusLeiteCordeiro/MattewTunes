import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Header from '../components/Header';
import '../styles/Profile.css'; // Importando nosso novo arquivo de estilos!

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userInfos: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userInfos = await getUser();
    this.setState({
      userInfos,
      loading: false,
    });
  }

  render() {
    const { loading, userInfos } = this.state;
    const { description, email, image, name } = userInfos;
    
    return (
      <div data-testid="page-profile" className="page-profile dark-mode">
        <Header />
        
        <main className="profile-container">
          {loading ? (
            <div className="loading-wrapper">
              <Loading />
            </div>
          ) : (
            <div className="profile-card">
              
              <div className="profile-header-info">
                <div className="image-container">
                  {/* Se tiver imagem, mostra. Se não, mostra a inicial do nome */}
                  {image ? (
                    <img 
                      data-testid="profile-image" 
                      src={image} 
                      alt={name} 
                      className="profile-avatar"
                    />
                  ) : (
                    <div className="profile-avatar-placeholder">
                      {name ? name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                
                <h2 className="profile-name">{name}</h2>
                <p className="profile-email">{email || 'Nenhum email cadastrado'}</p>
              </div>

              <div className="profile-body">
                <h3 className="section-title">Sobre mim</h3>
                <p className="profile-description">
                  {description || "Você ainda não adicionou uma descrição ao seu perfil."}
                </p>
              </div>

              <div className="profile-footer">
                <Link to="/profile/edit" className="edit-profile-button">
                  Editar perfil
                </Link>
              </div>
              
            </div>
          )}
        </main>
      </div>
    );
  }
}