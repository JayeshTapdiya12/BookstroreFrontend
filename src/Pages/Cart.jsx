import React, { useState, useEffect } from 'react'
import '../Style/Cart.css'
import { useParams } from 'react-router-dom';
import { getCart, removeCart } from '../Service/CartService';
import Header from '../compoments/Header';
const Cart = () => {

    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(quantity + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleRemove = async () => {

        // const res = await removeCart(id);
        // console.log(res)
        alert("BBook remove!");
    };

    const handlePlaceOrder = () => {
        alert("Order placed!");
    };



    const [cart, setCart] = useState([]);
    const [cartn, setCartn] = useState("0");

    const cartDetails = async () => {
        try {
            const res = await getCart(id);
            console.log(res)
            setCartn(res?.data?.data?.__v)
            setCart(res?.data?.data?.book)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        cartDetails();
    }, [])

    return (
        <>
            <Header cartn={cartn} />
            <div className="cart-container">

                {cart.map((ele) => {
                    return (
                        <>

                            <h2>Quantity ({ele.quantity})</h2>
                            <div className="cart-item">
                                <img
                                    src={ele.bookImage}
                                    alt={ele.bookName}
                                    className="book-image"
                                />
                                <div className="cart-details">
                                    <h3>BookName: {ele.bookName}</h3>
                                    <p>AuthorName: {ele.author}</p>
                                    <div className="cart-price">
                                        <span>Rs. {ele.discountPrice}</span>
                                        <span className="cart-original-price">Rs. {ele.price}</span>
                                    </div>
                                    <div className="cart-quantity">
                                        <button onClick={() => handleQuantityChange('decrement')}>-</button>
                                        <input type="text" value={quantity} readOnly />
                                        <button onClick={() => handleQuantityChange('increment')}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={handleRemove}>Remove</button>
                                </div>
                            </div>
                            {/* <div className="cart-actions">
                                <div className="cart-address">
                                    <i className="fa fa-map-marker"></i>
                                    <span>BridgeLabz Solutions LLP, No...</span>
                                </div>
                                <button className="place-order-btn" onClick={handlePlaceOrder}>PLACE ORDER</button>
                            </div> */}

                        </>
                    )
                })}
            </div>

        </>
    )
}

export default Cart
