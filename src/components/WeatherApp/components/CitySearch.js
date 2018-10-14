import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';


class CitySearch extends React.Component {
  state = {
    search: ''
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEnter);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEnter);
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && !e.repeat) {
      this.handleSubmit(e);
    }
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  }

  handleSubmit = (e) => {
    if (!this.state.search.trim()) return;
    this.props.onSearch(this.state.search);
    this.handleReset(e);
  }

  handleReset = (e) => {
    e.preventDefault();
    this.setState({ search: '' });
  }

  render() {
    return (
      <form className="weather-app__search search-box" onSubmit={this.handleSubmit}>
        <div className="search-box__input">
          <input
            type="text"
            name="search"
            placeholder="Search"
            autoComplete="off"
            value={this.state.search}
            onChange={this.handleChange} />
        </div>
        {this.state.search !== '' &&
          <button type="button" className="search-box__btn search-box__btn_clear" onClick={this.handleReset}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        }
        <button type="submit" className="search-box__btn search-box__btn_search">
          <FontAwesomeIcon icon={faSearch} flip="horizontal" />
        </button>
      </form>
    );
  }
}

export default CitySearch;