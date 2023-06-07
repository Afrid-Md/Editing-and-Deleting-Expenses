import { Card } from "react-bootstrap";
import './Card.css';
import ExpenseList from "../ExpenseList/ExpenseList";

import ListContext from '../ListContext/List-context';
import { useContext, useEffect, useState } from "react";

function ListCard(props) {
  const[no,setNo]=useState(true);

  const listContext=useContext(ListContext);

  useEffect(()=>{
    if(listContext.Expenses.length>0){
      setNo(false);  
    }else{
      setNo(true);
    }
  },[listContext.Expenses.length])


  return (
    <Card
      style={{
        backgroundColor: "rgb(80, 80, 80)",
        width: "90%",
        marginTop: "40px",
        marginLeft: "5%",
        marginRight: "5%",
        boxShadow: '0  2px 8px rgb(0,0,0.25)',
        marginBottom:'30px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}
    > {no ? <p className="noexpenses">No Expenses found add some...</p>:<ExpenseList onEdit={props.onEdit}/>}
    </Card>
  );
}

export default ListCard;
