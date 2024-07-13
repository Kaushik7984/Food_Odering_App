import React, { useContext, useState } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import ModalNew from "./ModalNew";
import { currencyFormatter } from "../util/formatting";
import "../index.css";
import CheckOut from "./CheckOut";

export default function Header() {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItem, item) => {
    return totalNumberOfItem + item.quantity;
  }, 0);

 
  const [showModal, setShowModal] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);


  const handleOnClick = () => {
    setShowModal(true);
  };

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  // if(cartCtx.items.length > 0 && showCheckOut){
  //   <CheckOut/>
  // }

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  ); 

const closeCheckHandle =()=>{
  setShowCheckOut(false)
  setShowModal(false)
}

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="a resturant" />
        <h2 className="webname1">Foodies </h2>
      </div>
      {showModal && (
        <ModalNew className="forCenterCart">
          <h2 style={{ color: "black" }}>Your Cart</h2>

          {cartCtx.items.length === 0 ? (
            <p style={{ color: "black" }}>The Cart Is Empty !!</p>
          ) : null}
          <ul style={{ color: "black" }}>
            {cartCtx.items.map((item) => (
              <li className="cart-item" key={item.id} >
                <p>
                  {item.name} - {item.quantity} × 

                  {currencyFormatter.format(item.price)}
                </p>
                <p className="cart-item-actions">
                  <button onClick={()=>{cartCtx.removeItem(item.id)}}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={()=>{cartCtx.addItem(item)}}>+</button>
                </p>
              </li>
            ))}
          </ul>
          <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
          <p className="modal-actions">
            <Button
              textOnly
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </Button>

            {cartCtx.items.length > 0 && <Button onClick={()=>{(setShowCheckOut(true))}}>Go to CheckOut</Button>}

          </p>
        </ModalNew>

      )}
      <nav>
        {/* <Button onClick={handleShowCart} textOnly>Cart({totalCartItems})</Button> */}
        <Button onClick={handleOnClick} textOnly>
          Cart({totalCartItems})
        </Button>
      </nav>

      {showCheckOut && <CheckOut  onCloseCheckOut={closeCheckHandle}/>}
    </header>
  );
}
