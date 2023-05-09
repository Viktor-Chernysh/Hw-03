import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, onImageClick }) {
  const isOnImgClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onImageClick(image);
  };
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={s.ImageGalleryItem_image}
        onClick={e => isOnImgClick(e)}
      />
    </li>
  );
}
