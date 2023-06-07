import ExpenseListContext from "../ListContext/List-context";
import React, { useContext } from "react";
import "./ExpenseList.css";
import AuthContext from "../../auth/auth-context/auth-context";

function ExpenseList(props) {
  const listContext = useContext(ExpenseListContext);
  const authCtx = useContext(AuthContext);

  const removeHandler = (id) => {
    fetch(
      `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${authCtx.email}/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          listContext.removeExpense(id);
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const editExpenseHandler = (id) => {
    props.onEdit(id);
  };
  // let category,month,day,year,description,amount;
  const expense = listContext.Expenses.map((expense) => (
    // const month = expense.date?.toLocaleString("en-US", { month: "long" });
    // const day = expense.date?.toLocaleString("en-US", { day: "2-digit" });
    // const year = expense.date?.getFullYear();

    <li key={expense.id} className="li">
      <div className="mainDiv">
        <div className="dateDiv">
          <span className="day">
            {expense.date?.toLocaleString("en-US", { day: "2-digit" })}
          </span>
          <span className="month">
            {expense.date?.toLocaleString("en-US", { month: "long" })}
          </span>
          <span className="year">{expense.date?.getFullYear()}</span>
        </div>
        <div className="spent">
          <span className="category">{expense.category}</span>
          <span className="description">{expense.description}</span>
        </div>
        <div className="amount">RS.{expense.amount}</div>
        <div className="buttonsDiv">
          <button
            className="editButton"
            onClick={() => {
              editExpenseHandler(expense.id);
            }}
          >
            Edit
          </button>
          <button
            className="removeButton"
            onClick={() => {
              removeHandler(expense.id);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  ));

  return (
    <div className="List">
      <ul>{expense}</ul>
    </div>
  );
}
export default ExpenseList;
