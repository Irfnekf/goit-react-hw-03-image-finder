import css from './image-galleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item, onClick }) => {
  return (
    <li
      onClick={() => onClick(item.largeImageURL)}
      className={css.ImageGalleryItem}
    >
      <img
        className={css.ImageGalleryItem_image}
        src={item.webformatURL}
        alt={item.tags}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
