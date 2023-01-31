import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}></span>
          </button>
          <input
            value={search}
            name="search"
            placeholder="Search images and photos"
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            required
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
