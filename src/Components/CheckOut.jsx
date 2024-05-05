import React, { useContext, useState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../Store/cartContext";
import { currencyFormatter } from "../Util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../Hooks/useHttp";
import Error from "./Error";

export default function CheckOut({ onCloseCheckOut }) {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries()); //{ email: text@example.com}

    console.log(customerData);

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

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
  } = useHttp("http://localhost:3000/orders", requestConfig);

  let actions = (
    <>
      <Button type="button" onClick={onCloseCheckOut} textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (sending) {
    actions = <span style={{ color: "red" }}>
      Sending Order Data !!
    </span>
  }
  if (data && !error) {
    return <Modal className="forCenterSuccess" >
      <h2 style={{ color: "green" }}>Success !! </h2>
      <div style={{ marginTop: "1rem" }}>
        <p>Your Order Was submitted Successfully!!</p>
        <p>we will get back to you with more details via email within next few minutes..</p>
      </div>
      <p className="modal-actions">
        <Button onClick={onCloseCheckOut} style={{ marginTop: "4rem" }} >Okay </Button>
      </p>
    </Modal>
  }
  return (
    <Modal className="forCenterCheckOut">
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

        {error && <Error title="failed to submit order !!" style={{ color: "red" }} message={error} />}

        <p className="modal-actions">{actions}</p>

      </form>
    </Modal>
  );
}
