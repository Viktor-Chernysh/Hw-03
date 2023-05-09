import { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchValue: '',
  };

  onSubmit = async searchValue => {
    this.setState({ searchValue });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery searchValue={searchValue} />
      </>
    );
  }
}
export { App };
