import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import Header from '../components/Header'; 
import '../styles/Favorites.css'; 
export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      arrayFavoritesSongs: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      arrayFavoritesSongs: favoritesSongs,
      loading: false,
    });
  }

 
  async componentDidUpdate() {
    // const updatedFavoriteSongs = await getFavoriteSongs();
    // this.setState({ arrayFavoritesSongs: updatedFavoriteSongs });
  }

  handleChecked = async (favoriteSong) => {
    this.setState({
      loading: true,
    });
    await removeSong(favoriteSong);
    this.setState((prevState) => ({
      arrayFavoritesSongs: prevState.arrayFavoritesSongs
        .filter((song) => song.trackId !== favoriteSong.trackId),
      loading: false,
    }));
  }

  render() {
    const {
      loading,
      arrayFavoritesSongs,
    } = this.state;

    const favoritesSongsList = arrayFavoritesSongs.map((favoritesSong, index) => (
      <div key={ index } className="track-item">
        <div className="track-info">
          <p className="track-name">{ favoritesSong.trackName }</p>
        </div>
        
        <div className="track-controls">
          <audio data-testid="audio-component" className="custom-audio" src={ favoritesSong.previewUrl } controls>
            <track kind="captions" />
          </audio>
          
          <label htmlFor={ `fav-${favoritesSong.trackId}` } className="favorite-label">
            <span className="sr-only">Favorita</span>
            <input
              checked={
                arrayFavoritesSongs
                  .some((musicChecked) => musicChecked.trackId === favoritesSong.trackId)
              }
              data-testid={ `checkbox-music-${favoritesSong.trackId}` }
              type="checkbox"
              className="favorite-checkbox"
              id={ `fav-${favoritesSong.trackId}` }
              onChange={ () => this.handleChecked(favoritesSong) }
            />
            <span className="favorite-heart">♥</span>
          </label>
        </div>
      </div>
    ));

    return (
      <div data-testid="page-favorites" className="page-favorites dark-mode">
        
        <main className="favorites-container">
          <h2 className="page-title">Músicas Favoritas</h2>
          
          { loading ? (
            <div className="loading-wrapper">
              <Loading />
            </div>
          ) : (
            <div className="tracklist-section">
              {arrayFavoritesSongs.length === 0 ? (
                <p className="empty-favorites">Você ainda não tem músicas favoritas.</p>
              ) : (
                favoritesSongsList
              )}
            </div>
          )}
        </main>
      </div>
    );
  }
}