import { connect } from 'react-redux';
import DisplayBox from '../components/DisplayBox';

const mapStateToProps = (state) => ({
  display: state.display
});

const StatusDisplayBox = connect(mapStateToProps, null)(DisplayBox);

export default StatusDisplayBox;