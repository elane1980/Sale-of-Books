
import { useState, useEffect } from "react";

const initialBooks = [
  { isbn: "9780755500413", title: "All New Minecraft Creative Handbook", price: 9.99 },
  { isbn: "9781546152293", title: "Astro Turf Journal", price: 8.99 },
  { isbn: "HANDPOINTERS", title: "Hand Pointers", price: 3.99 }
];

export default function App() {
  const [books] = useState(initialBooks);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedIsbn, setSelectedIsbn] = useState(books[0].isbn);
  const [quantity, setQuantity] = useState(1);
  const [customTitle, setCustomTitle] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [stationeryPrice, setStationeryPrice] = useState("");
  const [cashReceived, setCashReceived] = useState('');
  const [discountUsed, setDiscountUsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const clearSales = () => {
    localStorage.removeItem('sales');
    setSales([]);
  };


  useEffect(() => {
    const saved = localStorage.getItem('sales');
    if (saved) setSales(JSON.parse(saved));
  }, []);

  const addToCart = () => {
    const book = books.find(b => b.isbn === selectedIsbn);
    const price = (!discountUsed && cart.length === 0) ? book.price - 1 : book.price;
    const total = price * quantity;
    const item = { ...book, quantity, price, total };
    setCart([...cart, item]);
    if (!discountUsed) setDiscountUsed(true);
  };

  const addCustomBook = () => {
    if (!customTitle || !customPrice) return;
    const price = parseFloat(customPrice);
    const total = price * 1;
    const item = {
      isbn: Date.now().toString(),
      title: customTitle,
      price,
      quantity: 1,
      total
    };
    setCart([...cart, item]);
    setCustomTitle("");
    setCustomPrice("");
  };

  const addStationeryItem = () => {
    const price = parseFloat(stationeryPrice);
    if (price < 0.4 || price > 3) return;
    const item = {
      isbn: Date.now().toString(),
      title: "Stationery Item",
      price,
      quantity: 1,
      total: price
    };
    setCart([...cart, item]);
    setStationeryPrice("");
  };

  const finalizeSale = () => {
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    const change = parseFloat(cashReceived || 0) - total;
    const timestamp = new Date().toISOString();
    const updatedSales = [...sales, { cart, cashReceived, change, timestamp }];
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
    setCart([]);
    setCashReceived('');
    setDiscountUsed(false);
    setQuantity(1);
    setCustomTitle('');
    setCustomPrice('');
    setStationeryPrice('');
  };

  const exportCSV = () => {
    const rows = ["Title,Quantity,Price,Total,Cash Received,Change,Timestamp"];
    sales.forEach(sale => {
      sale.cart.forEach(item => {
        rows.push(`"${item.title}",${item.quantity},${item.price.toFixed(2)},${item.total.toFixed(2)},${parseFloat(sale.cashReceived).toFixed(2)},${sale.change.toFixed(2)},${sale.timestamp}`);
      });
    });
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalRevenue = sales.reduce((sum, s) => sum + s.cart.reduce((t, i) => t + i.total, 0), 0);
  const totalCashToday = sales
    .filter(s => new Date(s.timestamp).toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + parseFloat(s.cashReceived || 0), 0);
  const totalChangeToday = sales
    .filter(s => new Date(s.timestamp).toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + s.change, 0);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Book Sales Tracker</h1>

      <h2>Add a Book</h2>
      <select value={selectedIsbn} onChange={e => setSelectedIsbn(e.target.value)}>
        {books.map(book => (
          <option key={book.isbn} value={book.isbn}>
            {book.title} - £{book.price.toFixed(2)}
          </option>
        ))}
      </select>
      <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
      <button onClick={addToCart}>Add to Cart</button>

      <h3>Add Custom Book</h3>
      <input placeholder="Title" value={customTitle} onChange={e => setCustomTitle(e.target.value)} />
      <input placeholder="Price" type="number" value={customPrice} onChange={e => setCustomPrice(e.target.value)} />
      <button onClick={addCustomBook}>Add Custom</button>

      <h3>Add Stationery Item</h3>
      <input placeholder="£0.40 - £3.00" type="number" value={stationeryPrice} onChange={e => setStationeryPrice(e.target.value)} />
      <button onClick={addStationeryItem}>Add Stationery</button>

      <h2>Cart</h2>
      <ul>
        {cart.map((item, i) => (
          <li key={i}>{item.title} x{item.quantity} - £{item.total.toFixed(2)}</li>
        ))}
      </ul>

      <p>Total Due: £{cart.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</p>
      <input placeholder="Cash Received" type="number" value={cashReceived} onChange={e => setCashReceived(e.target.value)} />
      <button onClick={finalizeSale}>Finalize Sale</button>

      <h2>Sales Log</h2>
      <input type='date' value={selectedDate} onChange={handleDateChange} />
      <button onClick={clearSales}>Clear All Sales Data</button>
      <ul>
        {sales.filter(s => !selectedDate || new Date(s.timestamp).toISOString().slice(0,10) === selectedDate)
        .map((s, i) => (
          <li key={i}>
            {new Date(s.timestamp).toLocaleTimeString()} | Cash: £{parseFloat(s.cashReceived).toFixed(2)} | Change: £{s.change.toFixed(2)}
          </li>
        ))}
      </ul>
      <button onClick={exportCSV}>Export CSV</button>

      <h2>Summary</h2>
      <p>Total Revenue: £{totalRevenue.toFixed(2)}</p>
      <p>Cash Taken Today: £{totalCashToday.toFixed(2)}</p>
      <p>Change Given Today: £{totalChangeToday.toFixed(2)}</p>
    </div>
  );
}
