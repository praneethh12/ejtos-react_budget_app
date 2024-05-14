// src/components/Currency.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
    const { currency, dispatch } = useContext(AppContext);

    const changeCurrency = (event) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: event.target.value,
        });
    };

    return (
        <div className='row mt-3'>
            <div className='col-sm'>
                <label htmlFor='currency' style={{marginRight:"10px"}}>Currency </label>
                <select className='custom-select' id='currency' value={currency} onChange={changeCurrency} style={{backgroundColor:"#5AF964"}}>
                    <option value='$'>$ Dollar</option>
                    <option value='£'>£ Pound</option>
                    <option value='€'>€ Euro</option>
                    <option value='₹'>₹ Rupee</option>
                </select>
            </div>
        </div>
    );
};

export default Currency;
