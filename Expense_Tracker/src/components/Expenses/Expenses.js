import React, { useState } from "react";

import ExpenseFilter from "./ExpenseFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart"
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  // Select year
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  // Filter based on year
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });


  return (
    <div>
      <Card className="expenses">
        {/* Create a state and change state */}
        <ExpenseFilter
          selected={filteredYear}
          onFilterYear={filterChangeHandler}
        />

        <ExpensesChart expenses={filteredExpenses} />

        {/* Conditional */}
        <ExpensesList items={filteredExpenses}/>
      </Card>
    </div>
  );
};

export default Expenses;


// Filter conditionals in JSX
// Option 1 create 2 conditons
// {filteredExpenses.length === 0 && <p>No expenses found.</p>}

// {filteredExpenses.length > 0 &&
//   filteredExpenses.map((expense) => (
//     <ExpenseItem
//       key={expense.id}
//       title={expense.title}
//       amount={expense.amount}
//       date={expense.date}
//     />
//   ))}
// Option 2 create 1 conditional
// {filteredExpenses.length === 0 ? (
//   <p>No expenses found.</p>
// ) : (
//   filteredExpenses.map((expense) => (
//     <ExpenseItem
//       key={expense.id}
//       title={expense.title}
//       amount={expense.amount}
//       date={expense.date}
//     />
//   ))
// )}