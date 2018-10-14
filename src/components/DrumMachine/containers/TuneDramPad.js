import { connect } from 'react-redux';
import DrumPad from '../components/DrumPad';

const mapStateToProps = (state) => ({
  bankNumber: state.bank
});

const TuneDramPad = connect(mapStateToProps, null)(DrumPad);

export default TuneDramPad;