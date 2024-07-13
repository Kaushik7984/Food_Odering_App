import React, { useContext, useState } from "react";
import ModalNew from "./ModalNew";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../Hook/useHttp";
import Error from "./Error"

export default function CheckOut({ onCloseCheckOut }) {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    console.log(customerData);

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData,
    //     },
    //   }),
    // });
  };

  const requestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const {
    data,
    loading: sending,
    error,
    sendRequest,
  } = useHttp("https://react-food-api.vercel.app/orders", requestConfig);

  let actions = (
    <>
      <Button type="button" onClick={onCloseCheckOut} textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if(sending){
    actions=<span style={{color:"red"}}>
      Sending Order Data !!
    </span>
  }
  if(data && !error){
    return <ModalNew className="forCenterSuccess" >
      <h2 style={{color:"green"}}>Success !! </h2>
      <div style={{marginTop:"1rem"}}>
      <p>Your Order Was submitted Successfully!!</p>
      <p>we will get back to you with more details via email within next few minutes..</p>
      </div>
      <p className="modal-actions">
      <Button onClick={onCloseCheckOut} style={{marginTop:"4rem"}} >Okay </Button>
      </p>
    </ModalNew>
  }
  return (
    <ModalNew className="forCenterCheckOut">
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "black" }}>CheckOut</h2>
        <p style={{ color: "#453a3a" }}>
          Total Amount: {currencyFormatter.format(cartTotal)}
        </p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
        </div>

        {error && <Error title="failed to submit order !!" style={{color:"red"}} message={error}/>}
        <p className="modal-actions">{actions}</p>
      </form>
    </ModalNew>
  );
}
