import { Component } from 'react';
import css from './app.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { searchImg } from './shared/imageApi';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
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
    this.setState({ search, items: [], page: 1 });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1, loading: true }));
    this.setState({ loading: false });
  };
  render() {
    const { searchPost, onLoadMore } = this;
    const { items, loading } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchPost} />

        <ImageGallery items={items} />
        {Boolean(items.length) && <Button onClick={onLoadMore} />}
        {loading && <Loader />}
      </div>
    );
  }
}
