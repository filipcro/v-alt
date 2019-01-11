import { connect } from 'react-redux';

import TimeRangePicker from '../components/Report/TimeRangePicker';

import {
    setEndDate,
    setStartDate
} from '../actions/transactionFilter';


const mapStateToProps = state => ({
    endDate: state.transactionFilter.endDate,
    startDate: state.transactionFilter.startDate
});

const mapDispatchToProps = dispatch => ({
    setEndDate: endDate => dispatch(setEndDate(endDate)),
    setStartDate: startDate => dispatch(setStartDate(startDate))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeRangePicker);
