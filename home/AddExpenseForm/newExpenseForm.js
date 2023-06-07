import "./newExpenseForm.css";
import { useRef, useContext, useState } from "react";
import ExpenseListContext from "../ListContext/List-context";
import AuthContext from "../../auth/auth-context/auth-context";

function AddExpenseForm(props) {
  const listContext = useContext(ExpenseListContext);
  const authCtx = useContext(AuthContext);
  const [err, setErr] = useState(false);

  const categoryRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredCategory = categoryRef.current.value;
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredDate = dateRef.current.value;

    if (
      enteredCategory !== null &&
      enteredAmount > 0 &&
      enteredDescription.length > 1 &&
      enteredDate !== undefined
    ) {
      const newExpense = {
        category: enteredCategory,
        amount: enteredAmount,
        description: enteredDescription,
        date: new Date(enteredDate),
      };

      fetch(
        `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${authCtx.email}.json`,
        {
          method: "POST",
          body: JSON.stringify(newExpense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          const id=data.name
          listContext.addExpense({...newExpense,id:id});
          console.log(listContext);
        })
        .catch((err) => {
          alert(err.message);
        });

      console.log(newExpense);
      console.log(listContext);

      categoryRef.current.value = null;
      amountRef.current.value = null;
      descriptionRef.current.value = null;
      dateRef.current.value = null;
      setErr(false);
    } else {
      setErr(true);
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="first">
        <span>
          <label>Category :</label>
          <select
            list="category"
            className="inputList"
            id="category"
            ref={categoryRef}
          >
            <option default></option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Clothing">Clothing</option>
            <option value="Medical/Health">Medical/Health</option>
            <option value="Household items/Supplies">
              Household items/Supplies
            </option>
            <option value="Insurance">Insurance</option>
            <option value="Personal">Personal</option>
            <option value="Education">Education</option>
            <option value="Savings">Savings</option>
            <option value="Gifts/Donations">Gifts/Donations</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </span>
        <span>
          <label>Amount :</label>
          <input type="number" className="input" ref={amountRef} />
        </span>
      </div>
      <div className="second">
        <span>
          <label>Desctription :</label>
          <input type="text" className="input" ref={descriptionRef} />
        </span>
        <span className="dateSpan">
          <label>Date :</label>
          <input type="date" className="input" ref={dateRef} />
        </span>
      </div>
      <div className="error">{err && <p>Enter valid input field!</p>}</div>
      <div className="buttonsSpan">
        <button className="cancelButton" onClick={props.onClick}>
          Cancel
        </button>
        <button className="addExpenseButton" type="submit">
          Add Expense
        </button>
      </div>
    </form>
  );
}
export default AddExpenseForm;
