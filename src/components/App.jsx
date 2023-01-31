import { Component } from 'react';
import css from './app.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './shared/components/Modal/Modal';
import ModalImg from './ModalImg/ModalImg';

import { searchImg } from './shared/imageApi';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImg();
    }
  }

  async fetchImg() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImg(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchPost = ({ search }) => {
    if (search !== this.state.search) {
      this.setState({ search, items: [], page: 1 });
    }
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showLargeImg = largeImageUrl => {
    this.setState({
      largeImageUrl,
      showModal: true,
    });
  };
  closeModal = () => {
    this.setState({
      largeImageUrl: '',
      showModal: false,
    });
  };
  render() {
    const { searchPost, onLoadMore, showLargeImg, closeModal } = this;
    const { items, loading, showModal, error, largeImageUrl } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchPost} />
        <ImageGallery items={items} showLargeImg={showLargeImg} />
        {error && <p>Error</p>}
        {showModal && (
          <Modal onClose={closeModal}>
            <ModalImg img={largeImageUrl} />
          </Modal>
        )}
        {Boolean(items.length) && <Button onClick={onLoadMore} />}
        {loading && <Loader />}
      </div>
    );
  }
}
