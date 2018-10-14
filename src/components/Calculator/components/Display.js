import React, {
  Component
} from 'react';

class Display extends Component {
  render() {
    return (
      <div id="display">
        {this.props.input}
      </div>
    );
  }
}

export default Display;