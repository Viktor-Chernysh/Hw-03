import { createPortal } from 'react-dom';
import { Component } from 'react';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }
  handleKeyUp = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };
  onOverlayClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.props.toggleModal();
  };

  render() {
    const { modalImage } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={e => this.onOverlayClick(e)}>
        <div className={s.Modal}>
          <img src={modalImage.largeImageURL} alt={modalImage.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
