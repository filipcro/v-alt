import React from 'react';
import DateTime from 'react-datetime';

import './TimeRangePicker.css';

const TimeRangePicker = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate
}) => (
    <div className="TimeRangePicker">
        <label>
            <span>Datum početka</span>
            <DateTime locale="hr" value={startDate} onChange={setStartDate} timeFormat={false} />
        </label>
        <label>
            <span>Datum završetka</span>
            <DateTime locale="hr" value={endDate} onChange={setEndDate} timeFormat={false} />
        </label>

    </div>
);

export default TimeRangePicker;
