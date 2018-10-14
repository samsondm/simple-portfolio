import React, { Component } from 'react';

class CalcButton extends Component {
  handleClick = (e) => {
    this.props.clickAction(this.props.symbol);
  };

  handleKeyDown = (e) => {
    const key = this.props.keyValue ? this.props.keyValue : this.props.symbol;
    if (key.indexOf(e.key) > -1) {
      e.preventDefault();
      this.props.clickAction(this.props.symbol);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <button id={this.props.id} onClick={this.handleClick} className={this.props.styleClass}>
        {this.props.symbol}
      </button>
    );
  }
}

export default CalcButton;