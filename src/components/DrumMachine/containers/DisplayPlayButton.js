import { connect } from 'react-redux';
import changeDisplay from '../actions/changeDisplay';
import PlayButton from '../components/PlayButton';

const mapStateToProps = (state) => ({
  power: state.power,
  volume: state.volume / 100
});

const mapDispatchToProps = (dispatch) => ({
  showName: (name) => dispatch(changeDisplay(name))
});

const DisplayPlayButton = connect(mapStateToProps, mapDispatchToProps)(PlayButton);

export default DisplayPlayButton;