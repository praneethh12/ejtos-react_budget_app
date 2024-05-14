// src/context/AppContext.js
import React, { createContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "HR", name: 'HR', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£',
};

const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            let total_budget = state.expenses.reduce(
                (total, item) => total + item.cost, 0
            );
            total_budget += action.payload.cost;
            if (total_budget <= state.budget) {
                const updatedExpenses = state.expenses.map(expense =>
                    expense.name === action.payload.name
                        ? { ...expense, cost: expense.cost + action.payload.cost }
                        : expense
                );
                return { ...state, expenses: updatedExpenses };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return state;
            }
        case 'RED_EXPENSE':
            const reducedExpenses = state.expenses.map(expense =>
                expense.name === action.payload.name && expense.cost - action.payload.cost >= 0
                    ? { ...expense, cost: expense.cost - action.payload.cost }
                    : expense
            );
            return { ...state, expenses: reducedExpenses };
        case 'DELETE_EXPENSE':
            const remainingExpenses = state.expenses.map(expense =>
                expense.name === action.payload
                    ? { ...expense, cost: 0 }
                    : expense
            );
            return { ...state, expenses: remainingExpenses };
        case 'SET_BUDGET':
            return { ...state, budget: action.payload };
        case 'CHG_CURRENCY':
            return { ...state, currency: action.payload };
        default:
            return state;
    }
};

const AppProvider = (props) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const remaining = state.budget - state.expenses.reduce((total, item) => total + item.cost, 0);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining,
                currency: state.currency,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
