

const CartPage = () => {
    return (
        <div>
            
            <h1>Your Cart</h1>
            {}
            <ul>
                <li>plodu 1 - $10.00</li>
                <li>plodu 2 - $15.00</li>
                <li>plodu 3 - $20.00</li>
            </ul>
            <h2>Total: $45.00</h2>
            <button className="border-2 rounded-3xl px-4 py-1">Proceed to Checkout</button>
        </div>
    );
};

export default CartPage;
