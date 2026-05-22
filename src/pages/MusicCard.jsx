import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import { removeSong, addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../styles//MusicCard.css'; // Importando o CSS do Dark Mode

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      arrayInfoOfAlbum: [],
      artistName: '',
      albumName: '',
      artworkUrl: '', // NOVO: Estado para guardar a capa do álbum
      loading: false,
      checkedMusicList: [],
    };
  }

  async componentDidMount() {
    this.handleMusics();
    const checkedMusics = await getFavoriteSongs();
    this.setState({ checkedMusicList: checkedMusics });
  }

  async componentDidUpdate() {
    const checkedMusics = await getFavoriteSongs();
    this.setState({ checkedMusicList: checkedMusics });
  }

  handleChecked = async (index, event) => {
    const { arrayInfoOfAlbum } = this.state;
    this.setState({
      loading: true,
    });
    await addSong(arrayInfoOfAlbum[index]);
    if (!event.target.checked) {
      this.setState((prevState) => ({
        checkedMusicList: [...prevState.checkedMusicList, arrayInfoOfAlbum[index]],
        loading: false,
      }));
    } else {
      await removeSong(arrayInfoOfAlbum[index]);
      this.setState((prevState) => ({
        checkedMusicList: prevState.checkedMusicList
          .filter((music) => music !== arrayInfoOfAlbum[index]),
        loading: false,
      }));
    }
  }

  handleMusics = async () => {
    const { id } = this.props;
    const arrayInfoOfAlbum = await getMusics(id);
    
    // A API guarda os dados do álbum na posição 0
    const albumInfo = arrayInfoOfAlbum[0];

    this.setState({
      arrayInfoOfAlbum,
      artistName: albumInfo.artistName,
      albumName: albumInfo.collectionName,
      // Truque para pegar a imagem em 500x500 ao invés de 100x100 para não ficar borrada
      artworkUrl: albumInfo.artworkUrl100.replace('100x100bb', '500x500bb'),
    });
  }

  render() {
    const {
      arrayInfoOfAlbum,
      albumName,
      artistName,
      artworkUrl, // Desestruturando a capa
      loading,
      checkedMusicList,
    } = this.state;

    const musicList = arrayInfoOfAlbum.map((music, index) => (
      index !== 0 ? (
        <div key={ index } className="track-item">
          <div className="track-info">
            <span className="track-number">{index}</span>
            <p className="track-name">{ music.trackName }</p>
          </div>
          
          <div className="track-controls">
            <audio data-testid="audio-component" className="custom-audio" src={ music.previewUrl } controls>
              <track kind="captions" />
            </audio>
            
            {/* O htmlFor precisa ser único, usamos o trackId ao invés do nome para evitar bugs com espaços */}
            <label htmlFor={ `fav-${music.trackId}` } className="favorite-label">
              <span className="sr-only">Favorita:</span>
              <input
                data-testid={ `checkbox-music-${music.trackId}` }
                type="checkbox"
                className="favorite-checkbox"
                checked={
                  checkedMusicList
                    .some((musicChecked) => musicChecked.trackId === music.trackId)
                }
                id={ `fav-${music.trackId}` }
                onChange={ (event) => this.handleChecked(index, event) }
              />
              <span className="favorite-heart">♥</span>
            </label>
          </div>
        </div>
      )
        : null
    ));

    return (
      <div data-testid="page-album" className="page-album dark-mode">
        <Header />
        
        <main className="album-container">
          {loading && (
            <div className="loading-overlay">
              <Loading />
            </div>
          )}
          
          {/* SESSÃO HERO (Capa, Nome e Artista) */}
          <section className="album-hero">
            <div className="album-artwork-container">
              {artworkUrl && <img src={artworkUrl} alt={albumName} className="album-artwork" />}
            </div>
            <div className="album-hero-details">
              <h2 data-testid="album-name" className="album-title">{albumName}</h2>
              <p data-testid="artist-name" className="album-artist">{artistName}</p>
            </div>
          </section>

          {/* SESSÃO LISTA DE MÚSICAS */}
          <section className="tracklist-section">
            {musicList}
          </section>
        </main>
      </div>
    );
  }
}

MusicCard.propTypes = {
  id: PropTypes.string.isRequired,
};