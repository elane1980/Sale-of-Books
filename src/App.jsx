
import { useState } from "react";

const initialBooks = [
  { isbn: "9780755500413", title: "All New Minecraft Creative Handbook", price: 9.99 },
  { isbn: "9781546152293", title: "Astro Turf Journal", price: 8.99 },
  { isbn: "HANDPOINTERS", title: "Hand Pointers", price: 3.99 },
];

export default function App() {
  const [books] = useState(initialBooks);
  const [cart, setCart] = useState([]);
  const [selectedIsbn, setSelectedIsbn] = useState(books[0].isbn);
  const [quantity, setQuantity] = useState(1);
  const [cashReceived, setCashReceived] = useState(0);
  const [sales, setSales] = useState([]);

  const addToCart = () => {
    const book = books.find(b => b.isbn === selectedIsbn);
    const item = {
      ...book,
      quantity,
      total: quantity * book.price
    };
    setCart([...cart, item]);
  };

  const finalizeSale = () => {
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    const change = cashReceived - total;
    const timestamp = new Date().toISOString();
    setSales([...sales, { cart, cashReceived, change, timestamp }]);
    setCart([]);
    setCashReceived(0);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Book Sales Tracker</h1>

      <h2>Add to Cart</h2>
      <select onChange={(e) => setSelectedIsbn(e.target.value)} value={selectedIsbn}>
        {books.map(book => (
          <option key={book.isbn} value={book.isbn}>
            {book.title} - £{book.price.toFixed(2)}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={addToCart}>Add</button>

      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.title} x{item.quantity} = £{item.total.toFixed(2)}
          </li>
        ))}
      </ul>

      <p>Total: £{cart.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</p>
      <input
        type="number"
        value={cashReceived}
        onChange={(e) => setCashReceived(Number(e.target.value))}
        placeholder="Cash Received"
      />
      <button onClick={finalizeSale}>Finalize Sale</button>

      <h2>Sales</h2>
      <ul>
        {sales.map((sale, i) => (
          <li key={i}>
            {sale.cart.length} items | Cash: £{sale.cashReceived.toFixed(2)} | Change: £{sale.change.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
