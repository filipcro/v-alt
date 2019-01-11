import React from 'react';

import './AccountTotal.css';
import AdditionsSVG from '../Transaction/up-green.svg';
import SubtractionsSVG from '../Transaction/down-red.svg';

const AccountTotal = ({ accountTotal, currency }) => {
    const { additions, subtractions } = accountTotal;
    const total = 390; // length of the circle stroke
    const subtractionPart = total * subtractions / (additions + subtractions);

    return (
        <div className="AccountTotal">
            <svg width="248" height="248" className="AccountTotal-svg">
                <circle
                    r="62"
                    cx="124"
                    cy="124"
                    stroke="#f05742"
                    fill="none"
                    strokeWidth="124"
                    strokeDasharray={`${subtractionPart} ${total}`}
                />
            </svg>
            <h2>{accountTotal.account.name}</h2>
            <div className="AccountTotal-icon-group">
                <img src={AdditionsSVG} alt="prihod" />
                {
                    additions.toLocaleString('hr-HR', {
                        style: 'currency',
                        currency: currency.code
                    })
                }
            </div>
            <div className="AccountTotal-icon-group">
                <img src={SubtractionsSVG} alt="rashod" />
                {
                    subtractions.toLocaleString('hr-HR', {
                        style: 'currency',
                        currency: currency.code
                    })
                }
            </div>
        </div>
    );
};

export default AccountTotal;
