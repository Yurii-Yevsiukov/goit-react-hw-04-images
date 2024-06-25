import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SeachBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from '../Services/Api';
import styles from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      try {
        setIsLoading(true);

        const { hits, totalHits } = await fetchImages({ query, page });

        setLoadMore(page < Math.ceil(totalHits / 12));

        setImages((prevImages) => [...prevImages, ...hits]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      getImages();
    }
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    if (newQuery.trim() === '') {
      return alert('Enter something!');
    }

    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (clickedImage) => {
    setShowModal(true);
    setSelectedImage(clickedImage);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };


  return (
    <div className={styles.App}>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {loadMore && <Button onClick={handleLoadMore} />}
      {showModal && <Modal image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );  
};
