import React, { Component } from 'react';
import './ProjectWrapper.css';

class ProjectWrapper extends Component {
  state = {
    style: {
      background: ''
    }
  };

  componentDidMount() {
    document.title = this.props.title;
  }

  changeBackground = (background) => {
    this.setState({
      style: {
        background
      }
    });
  };

  handleClick = (e) => e.stopPropagation();

  handleBackClick = (e) => {
    e.stopPropagation();
    document.title = 'Portfolio';
    this.props.history.push('/');
  }

  render() {
    return (
      <div className={"project-wrapper min-height-flex-fix " + this.props.className} style={this.state.style} onClick={this.handleClick}>
        <div className="project-wrapper__back-container">
          <div className="project-wrapper__back" onClick={this.handleBackClick} />
        </div>
        {React.cloneElement(React.Children.only(this.props.children), { changeBackground: this.changeBackground })}
      </div>
    );
  }
}

export default ProjectWrapper;