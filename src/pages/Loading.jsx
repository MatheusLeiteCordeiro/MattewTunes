import React, { Component } from 'react';
import '../styles/Loading.css'; // Importando o CSS da animação

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <div className="sound-wave">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <p className="loading-text">Carregando...</p>
      </div>
    );
  }
}