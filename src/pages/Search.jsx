import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../styles/Search.css'; // Importando o novo CSS

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      search: '',
      loading: false,
      requestAPI: false,
      currentSearch: '',
      arrayOfAlbuns: [],
    };
  }

  handleChange = ({ target }) => {
    this.setState({ search: target.value }, () => {
      const { search } = this.state;
      const numberOfCharacters = 2;
      if (search.length >= numberOfCharacters) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({
      currentSearch: search,
      loading: true,
      search: '',
      isDisabled: true,
    });
    const arrayOfResults = await searchAlbumsAPI(search);
    this.setState({
      requestAPI: true,
      loading: false,
      arrayOfAlbuns: arrayOfResults,
    });
  }

  render() {
    const {
      isDisabled,
      search,
      loading,
      requestAPI,
      currentSearch,
      arrayOfAlbuns,
    } = this.state;

    if (loading) {
      return (
        <div className="page-search dark-mode loading-container">
          <Loading />
        </div>
      );
    }

    // Transformando a lista em Cards de Álbum
    const albumList = arrayOfAlbuns.map((album) => (
      <Link
        key={album.collectionId}
        to={`/album/${album.collectionId}`}
        data-testid={`link-to-album-${album.collectionId}`}
        className="album-card"
      >
        <div className="album-image-wrapper">
          {/* O replace abaixo força a API do iTunes a trazer uma imagem maior e mais nítida */}
          <img 
            alt={album.collectionName} 
            src={album.artworkUrl100.replace('100x100bb', '300x300bb')} 
          />
        </div>
        <div className="album-info">
          <p className="album-name">{album.collectionName}</p>
          <p className="artist-name">{album.artistName}</p>
        </div>
      </Link>
    ));

    return (
      <div data-testid="page-search" className="page-search dark-mode">
        
        {/* TÍTULO NO TOPO DA PÁGINA (Exatamente onde você marcou) */}
        <header className="top-brand-header">
          <h1 className="brand-title">Matthew Tunes</h1>
        </header>

        <div className="search-content">
          <form className="search-form" onSubmit={this.handleClick}>
            <input
              name="search"
              value={search}
              onChange={this.handleChange}
              type="text"
              data-testid="search-artist-input"
              className="search-input"
              placeholder="Busque por artistas ou bandas..."
              autoComplete="off"
            />
            <button
              disabled={isDisabled}
              data-testid="search-artist-button"
              type="submit"
              className="search-button"
            >
              Pesquisar
            </button>
          </form>

          {requestAPI && (
            <div className="results-section">
              <h2 className="results-title">
                Resultados para: <span>{currentSearch}</span>
              </h2>
              
              {arrayOfAlbuns.length === 0 ? (
                <p className="no-results">Nenhum álbum foi encontrado. Tente outra busca!</p>
              ) : (
                <div className="album-grid">
                  {albumList}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}