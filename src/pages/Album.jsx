import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';

export default class Album extends Component {
  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <MusicCard id={ id } />
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};
