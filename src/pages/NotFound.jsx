import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css'; // Importando o CSS

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="page-not-found dark-mode">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Página não encontrada</h2>
          <p className="error-description">
            Ops! Parece que essa faixa pulou ou o disco arranhou. Não conseguimos encontrar a página que você está procurando.
          </p>
          
          <Link to="/search" className="back-home-button">
            Voltar para as buscas
          </Link>
        </div>
      </div>
    );
  }
}