import { Component } from 'react';
import s from './SearchBar.module.css';
import { SearchOutlined } from '@ant-design/icons';

class SearchBar extends Component {
  state = { input: '' };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.input.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.input.trim().toLowerCase());
    this.setState({ input: '' });
  };
  onInputPress = e => {
    const { value } = e.target;
    this.setState({ input: value });
  };

  render() {
    const { input } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <SearchOutlined style={{ fontSize: 20 }} />
          </button>
          <input
            className={s.SearchForm_input}
            type="text"
            onChange={this.onInputPress}
            placeholder="Search images and photos"
            value={input}
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;
