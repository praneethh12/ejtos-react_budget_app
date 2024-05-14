// src/components/Budget.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, currency, expenses } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        const value = Number(event.target.value);
        const spentSoFar = expenses.reduce((total, item) => total + item.cost, 0);
        if (value < spentSoFar) {
            alert(`Budget cannot be lower than amount spent so far: ${currency}${spentSoFar}`);
        } else if (value > 20000) {
            alert(`Budget cannot exceed ${currency}20000`);
        } else {
            setNewBudget(value);
            dispatch({ type: 'SET_BUDGET', payload: value });
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
            />
        </div>
    );
};

export default Budget;
