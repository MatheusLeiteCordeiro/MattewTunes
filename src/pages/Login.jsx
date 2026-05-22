import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      loginName: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ loginName: target.value }, () => {
      const { loginName } = this.state;
      const numberOfCharacters = 3;
      if (loginName.length >= numberOfCharacters) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleClick = async () => {
    const { loginName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { isDisabled, loginName, loading } = this.state;
    
    if (loading) {
      return (
        <div className="page-login dark-mode">
          <Loading />
        </div>
      );
    }
    
    return (
      <div data-testid="page-login" className="page-login dark-mode">
        {/* TÍTULO NO TOPO FORA DO CARD */}
        <header className="header-brand">
          <h1 className="brand-title">Matthew Tunes</h1>
        </header>

        <div className="login-container">
          <h2 className="login-welcome">Seja bem vindo</h2>
          <p className="login-subtitle">Faça login para curtir o som</p>
          
          <input
            name="loginName"
            value={ loginName }
            onChange={ this.handleChange }
            type="text"
            data-testid="login-name-input"
            className="login-input"
            placeholder="Qual o seu nome?"
            autoComplete="off"
          />
          
          <button
            disabled={ isDisabled }
            type="button"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            className="login-button"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};