import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import '../styles//ProfileEdit.css';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
      email: '',
      description: '',
      image: '', // Aqui continuaremos guardando a imagem (agora como Base64)
      isDisabled: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userInfos = await getUser();
    const { name, email, description, image } = userInfos;
    this.setState({
      userName: name,
      email,
      description,
      image,
      loading: false,
    }, () => this.validation());
  }

  // Handler normal para campos de texto
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validation());
  }

  // NOVO Handler específico para carregar arquivo do computador
  handleFileChange = ({ target }) => {
    const file = target.files[0]; // Pega o primeiro arquivo selecionado

    if (file) {
      // FileReader é uma API nativa do navegador
      const reader = new FileReader();

      // Define o que acontece quando a leitura termina com sucesso
      reader.onloadend = () => {
        // reader.result contém a imagem convertida em string Base64
        this.setState({
          image: reader.result,
        }, () => this.validation()); // Valida após atualizar a imagem
      };

      // Inicia a leitura do arquivo como uma Data URL (Base64)
      reader.readAsDataURL(file);
    }
  }

  handleClick = async () => {
    const { userName, email, description, image } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });
    const userInfo = ({
      name: userName,
      email,
      image, // Salva a string Base64
      description,
    });
    await updateUser(userInfo);
    this.setState({ loading: false });

    history.push('/profile');
  };

  validation() {
    const { image, userName, email, description } = this.state;
    // A validação de length > 0 continua funcionando para Base64
    const fill = (
      userName.length <= 0
    || email.length <= 0
    || description.length <= 0
    || image.length <= 0
    );

    this.setState({ isDisabled: fill });
  }

  render() {
    const { isDisabled, description, email, userName, loading } = this.state;
    
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit dark-mode">
        <Header />
        
        <main className="profile-edit-container">
          {loading ? (
            <div className="loading-wrapper">
              <Loading />
            </div>
          ) : (
            <div className="profile-edit-card">
              <h2 className="edit-title">Editar Perfil</h2>
              
              <form className="edit-form">
                <label className="form-label" htmlFor="userName">
                  Nome
                  <input
                    id="userName"
                    value={ userName }
                    name="userName"
                    data-testid="edit-input-name"
                    onChange={ this.handleChange }
                    className="form-input"
                    placeholder="Como quer ser chamado?"
                  />
                </label>
                
                <label className="form-label" htmlFor="email">
                  Email
                  <input
                    id="email"
                    value={ email }
                    name="email"
                    type="email"
                    data-testid="edit-input-email"
                    onChange={ this.handleChange }
                    className="form-input"
                    placeholder="seu@email.com"
                  />
                </label>
                
                <label className="form-label" htmlFor="description">
                  Descrição
                  <input
                    id="description"
                    value={ description }
                    name="description"
                    data-testid="edit-input-description"
                    onChange={ this.handleChange }
                    className="form-input"
                    placeholder="Fale um pouco sobre você..."
                  />
                </label>
                
                {/* ALTERADO: Input de link para input de arquivo */}
                <label className="form-label" htmlFor="image">
                  Foto de Perfil
                  <div className="file-input-wrapper">
                    <input
                      id="image"
                      name="image"
                      type="file" // Define que é um upload de arquivo
                      accept="image/*" // Aceita apenas imagens (jpg, png, etc)
                      data-testid="edit-input-image"
                      onChange={ this.handleFileChange } // Usa o novo handler
                      className="form-input-file" // Classe específica para estilizar
                    />
                  </div>
                </label>
                
                <button
                  disabled={ isDisabled }
                  type="button"
                  data-testid="edit-button-save"
                  onClick={ this.handleClick }
                  className="save-button"
                >
                  Salvar alterações
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};