# Key Projects and Concepts
Course by Maximilian Schwarzmüller on the [React - The Complete Guide 2022](https://www.udemy.com/course/react-the-complete-guide-incl-redux/). Below is just a summary on key learning points.

## Expense Tracker 
![Expense Tracker](ExpenseTracker.png "Expense Tracker")

### Key Learning Points
1. Const, Let, Spread Operator and Arrow Functions
- Let assigns a variable with varying values that will change 
- Const assigns a variable with expected values that will never change
- Spread Operator allows you to pull elements out of an array
    ```
    const oldArray = [1, 2, 3];
    const newArray = [...oldArray, 4, 5]; // This now is [1, 2, 3, 4, 5];
    ```
- Arrow Functions can be used to create new functions with shorter syntax
    ```
    const callMe = function(name) { 
        console.log(name);
        }

    # Shorter syntax with Arrow Function 
    const callMe = (name) => { 
        console.log(name);
        }
    ```

2. Components
- React is all about Components! Components are modular DOM nodes used to build the react UI for ease of reusability and separation of concern which allows for scalable and clean interfaces. With components built by JSX in a declarative way with variables expressed dynamically in '{}' braces and data shared among components via props.

    > Declarative JSX code within a ```<div>``` element that gets props from the root DOM node with data shared downwards from parent to child ie. Expenses Parent Node to ExpenseItem Child node which gets the values from the props.
    ```
    const ExpenseItem = (props) => {
        return (
            <li>
                <Card className="expense-item">
                    <ExpenseDate date={props.date} />
                    <div className="expense-item__description">
                        <h2>{props.title}</h2>
                        <div className="expense-item__price">${props.amount}</div>
                    </div>
                    {/* <button onClick={clickHandler}>Change Title</button> */}
                </Card>
            </li>
        );
    };
    ```

3. Use of State
- State is utilized to ensure to capture an 'old' state and transform it based on 'new' state to add, update or remove specific DOM elements on the DOM tree. 
    > On the example below we have a state that gets the old state 'enteredTitle' with the default empty string state to capture the new state 'setEnteredTitle' as captured by a listen handler titleChangeHandler 
    ``` 
    import React, { useState } from "react";

    const [enteredTitle, setEnteredTitle] = useState("");

    // Listen Handlers
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };
    ```

4. Two Binding
- Bind several values to a node element in this case using ```<input value={enteredTitle} onChange={setEnteredTitle}>``` on a specific event to ensure we are able to pass state to that node element when that state changes. 
    > In the example below we can pass the state of an empty string once a form is submitted and on submission we are able to pass state back to that empty string and the values are stored onSubmit
    ```
    const [enteredTitle, setEnteredTitle] = useState("");

    // Listen Handlers
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    // Clears form on submit when value set to initial default value
    setEnteredTitle("");

    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        ...
    </form>
    ```

5. Lifting State Up (Send data upwards from child to parent)
- Data will be sent from the child to the parent through a 'prop function' that will ensure that the data stored in the child node is shared to the parent. Similarly attributes and values are sent from the parent to child using 'props' with the only difference being a 'prop function' is used to send data upwards.

    > From the NewExpense Component in NewExpense.js file is a child to the App Component where we pass a prop function to send data to the App Component which can also be utilized by sibling components in the App Component
    ```
    const NewExpense = (props) => {
        const saveExpenseDataHandler = (enteredExpenseData) => {
            const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString(),
            };

            props.onAddExpense(expenseData);
        };
        ... JSX code ...
    };
    ```
    > Get data through to the child NewExpense component so as to utilize the data by the parent App Component in the App.js file
    ```
        // Add expense generate dynamic array of data and update list with useState
        const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

        const addExpenseHandler = (expense) => {
            setExpenses((prevExpenses) => {
            return [expense, ...prevExpenses];
            });
        };

        <NewExpense onAddExpense={addExpenseHandler} />
    ```

6. Adding lists Dynamically
- Adding an item to an already exisiting list can be done using the Spread Operator as shown below as in the App.js function under ```<NewExpense onAddExpense={addExpenseHandler} />``` with the new expense add to the prevExpenses with lifting state up from the child nodes of NewExpense and ExpenseForm.
    ```
    const addExpenseHandler = (expense) => {
        setExpenses((prevExpenses) => {
        return [expense, ...prevExpenses];
        });
    };
    ```