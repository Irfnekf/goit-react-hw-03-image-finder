import css from './modalImg.module.css';

const ModalImg = ({ img }) => {
  return (
    <div className={css.ModalImg}>
      <img src={img} alt="" />
    </div>
  );
};

export default ModalImg;
