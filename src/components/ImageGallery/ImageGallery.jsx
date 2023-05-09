import { Component } from 'react';
import s from './ImageGallery.module.css';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { getImage, getTotalPages } from 'services/API';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    images: null,
    loader: false,
    page: 1,
    showModal: false,
    modalImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ loader: true });
      const dataImage = await getImage(this.props.searchValue);
      const totalPages = getTotalPages(dataImage);
      this.setState({
        images: dataImage.hits,
        totalPages,
        loader: false,
        page: 2,
      });
    }
  }

  handleShowMore = async () => {
    this.setState({ loader: true });
    const dataImage = await getImage(this.props.searchValue, this.state.page);
    this.setState(prevState => ({
      images: [...prevState.images, ...dataImage.hits],
      page: prevState.page + 1,
      loader: false,
    }));
  };
  onImageClick = modalImage => {
    this.setState({ modalImage, showModal: true });
  };
  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };

  render() {
    const { loader, images, totalPages, page, showModal, modalImage } =
      this.state;
    return (
      <>
        <ul className={s.ImageGallery}>
          {images &&
            images.map(image => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onImageClick={this.onImageClick}
              />
            ))}
        </ul>
        {loader && <Loader />}
        {page <= totalPages && images && !loader && (
          <Button onClick={this.handleShowMore} />
        )}
        {showModal && (
          <Modal toggleModal={this.toggleModal} modalImage={modalImage} />
        )}
      </>
    );
  }
}
export default ImageGallery;
