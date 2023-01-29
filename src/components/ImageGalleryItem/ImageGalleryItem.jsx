import css from './image-galleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item }) => {
  return (
    <li className={css.ImageGalleryItem}>
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
