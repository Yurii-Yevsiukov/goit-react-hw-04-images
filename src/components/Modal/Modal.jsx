import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ image, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.Overlay} onClick={handleClose}>
      <div className={styles.Modal}>
        <img src={image} alt={alt} />
      </div>
    </div>
  );
}

Modal.proppTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onclose: PropTypes.func.isRequired,
};

export default Modal;
