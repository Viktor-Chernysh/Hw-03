import { Component } from 'react';
import Loader from './Loader/Loader';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { per_page } from 'services/API';
import Modal from './Modal/Modal';
import { getImage } from 'services/API';

// const STATE_MACHINE = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVE: 'resolve',
//   REJECT: 'reject',
// };
const initialState = {
  images: [],
  searchValue: '',
  page: 1,
  loading: false,
  showModal: false,
  modalImage: null,
  totalPages: null,
};
class App extends Component {
  state = {
    images: [],
    searchValue: '',
    page: 1,
    loading: false,
    showModal: false,
    modalImage: null,
    totalPages: null,
  };
  async componentDidUpdate(pP, pS) {
    // const { searchValue, page } = this.state;
    // if (pS.searchValue !== searchValue) {
    //   console.log('initial state');
    //   this.setState({ page: 1 });
    //   return;
    // }
  }
  // async componentDidUpdate(prevProp, prevState) {
  //   const { searchValue, page } = this.state;
  //   if (prevState.searchValue && searchValue === '') {
  //     console.log('initial state');
  //     this.setState({ ...initialState });
  //     return;
  //   }
  //   if (prevState.searchValue !== searchValue && searchValue !== '') {
  //     console.log('load');
  //     this.setState({ images: [], page: 1 });
  //     this.loadImages();
  //     return;
  //   }
  //   if (prevState.page !== page) {
  //     console.log('update page');
  //     this.loadImages();
  //     return;
  //   }
  // }

  // async updateImages() {
  //   const { searchValue, page } = this.state;
  //   this.setState({ loading: true });
  //   try {
  //     const images = await getImage(searchValue, page);
  //     this.setState(prev => ({
  //       images: [...prev.images, ...images.hits],
  //       showLoadMore: true,
  //     }));
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // }

  // async loadImages() {
  //   const { searchValue, page } = this.state;
  //   this.setState({ loading: true });

  //   try {
  //     const images = await getImage(searchValue, page);
  //     const totalPages = Math.ceil(Number(images.totalHits) / per_page);
  //     this.setState(prevState => ({
  //       images: [...prevState.images, ...images.hits],
  //       totalPages,
  //     }));
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // }
  onSubmit = async value => {
    // if (value === '' || value === this.state.searchValue) {
    //   return;
    // }
    // if (value !== this.state.searchValue) {
    //   const images = await getImage(value, 1);
    //   const totalPages = Math.ceil(Number(images.totalHits) / per_page);
    //   this.setState(prev => ({
    //     images: [...images.hits],
    //     searchValue: value,
    //     totalPages,
    //     page: prev.page + 1,
    //   }));
    //   return;
    // }
    const images = await getImage(value, this.state.page);
    const totalPages = Math.ceil(Number(images.totalHits) / per_page);
    this.setState(prev => ({
      images: [...images.hits],
      searchValue: value,
      totalPages,
      page: prev.page + 1,
    }));
    console.log('onSub');
    // this.setState({ searchValue: value });
  };
  onClick = async () => {
    const { searchValue, page } = this.state;
    // this.setState(prev => ({ page: prev.page + 1 }));
    const images = await getImage(searchValue, page);
    this.setState(p => ({
      images: [...p.images, ...images.hits],
      page: p.page + 1,
    }));
    console.log(page);
  };
  onImageClick = image => {
    this.setState({ showModal: true, modalImage: image });
  };
  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };
  render() {
    const {
      loading,
      images,
      searchValue,
      showModal,
      modalImage,
      page,
      totalPages,
    } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        {searchValue && (
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        )}
        {page < totalPages && searchValue !== '' && (
          <Button onClick={this.onClick} />
        )}
        {loading && <Loader />}
        {showModal && (
          <Modal modalImage={modalImage} toggleModal={this.toggleModal} />
        )}
      </>
    );
  }
}
export { App };
