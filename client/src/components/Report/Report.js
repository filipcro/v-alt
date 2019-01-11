import React from 'react';

import AccountBalance from '../../containers/AccountBalance';
import TimeRangePicker from '../../containers/TimeRangePicker';
import TransactionsTotal from '../../containers/TransactionsTotal';

const Report = () => (
    <div>
        <AccountBalance />
        <TimeRangePicker />
        <TransactionsTotal />
    </div>
);

export default Report;
