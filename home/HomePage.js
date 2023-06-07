import React, { useContext,useState } from "react";
import NavBar from "./Navbar/Navbar";
import AddNewExpense from "./AddExpenseForm/addExpense";
import ListCard from "./Card/Card";
import AuthContext from "../auth/auth-context/auth-context";



function HomePage() {
  const [item, setItem]=useState(null);

  const authCtx=useContext(AuthContext);

  const editItemHandler = (id) => {
    fetch(
      `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${authCtx.email}/${id}.json`,
      {
        method: "GET",
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
        setItem(data);
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <React.Fragment>
      <NavBar />
      <AddNewExpense item={item}/>
      <ListCard onEdit={editItemHandler} />
    </React.Fragment>
  );
}
export default HomePage;
