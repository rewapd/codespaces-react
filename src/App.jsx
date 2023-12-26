import { useEffect, useState } from 'react';
import './App.css';

function App() {

const [amount,setAmount]=useState("1")
const [fromCurr,setFromCurr]=useState("USD");
const [toCurr,setToCurr]=useState("INR")
const [output,setOutput]=useState("")

function handleAmount(event){
  setAmount(Number(event.target.value));
}

function handleFromCurr(event){
  setFromCurr(event.target.value);
}

function handleTocurr(event){
  setToCurr(event.target.value);
}

useEffect(function(){
  async function fetchData(){
    const res= await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`)
  const data=await res.json()
      setOutput(data.rates[toCurr])
  }

  if (fromCurr===toCurr) {
    return setOutput(amount)
  }
  fetchData();
},[amount,fromCurr,toCurr])

  return (
    <div>
      <input type="text" name="amount" value={amount} id="amnt" onChange={(event)=>handleAmount(event)}/>
      <select name="currency" id="cuur" value={fromCurr} onChange={(event)=>handleFromCurr(event)}>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <select name="curr" id="toCurr" value={toCurr} onChange={(event)=>handleTocurr(event)} >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <p>{output} {toCurr} </p>
    </div>
  );
}

export default App;
