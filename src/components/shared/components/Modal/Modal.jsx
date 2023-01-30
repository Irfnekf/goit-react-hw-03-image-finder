import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.css';

const ModalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    const { closeModal } = this;

    return createPortal(
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>{children}</div>
      </div>,
      ModalRoot
    );
  }
}

export default Modal;
