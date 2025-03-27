
import { useState } from "react";

const initialBooks = [
  { isbn: "9780755500413", title: "All New Minecraft Creative Handbook", price: 9.99 },
  { isbn: "9781546152293", title: "Astro Turf Journal", price: 8.99 },
  { isbn: "9781338680072", title: "Ballad of Songbird and Snakes Journal, The", price: 4.99 },
  { isbn: "9780702309519", title: "Ballad of Songbirds and Snakes, The", price: 8.99 },
  { isbn: "9780702334740", title: "Beastly Beauty", price: 8.99 },
  { isbn: "9781398520943", title: "Bite Risk", price: 7.99 },
  { isbn: "9780008588830", title: "Blunders, The", price: 7.99 },
  { isbn: "9781784162122", title: "Book Thief, The", price: 5.99 },
  { isbn: "9780702333101", title: "Boy in the Suit, The", price: 7.99 },
  { isbn: "9780241591888", title: "Boy Next Door, The", price: 8.99 },
  { isbn: "9780702334467", title: "Boy Who Didn't Want to Die, The: Graphic Memoir", price: 8.99 },
  { isbn: "9780702314667", title: "Boy with Big Decisions, The", price: 7.99 },
  { isbn: "9780702340956", title: "Boys With Sharp Teeth Available from 20th February", price: 8.99 },
  { isbn: "9780241638477", title: "Brothers Hawthorne, The", price: 8.99 },
  { isbn: "9781473629165", title: "Caraval", price: 9.99 },
  { isbn: "9781526665386", title: "Clockwork Conspiracy, The", price: 7.99 },
  { isbn: "9780702325861", title: "Cloud Nine", price: 8.99 },
  { isbn: "9781804536780", title: "Complete Guide to Cosy Gaming, The", price: 9.99 },
  { isbn: "9781471413049", title: "Crossing the Line", price: 7.99 },
  { isbn: "9780241770252", title: "Danger Gang", price: 3.99 },
  { isbn: "9780702333200", title: "Diary of a Future Billionaire", price: 7.99 },
  { isbn: "9780241645758", title: "Diary of a Wimpy Kid", price: 3.99 },
  { isbn: "9780241583166", title: "Diary of a Wimpy Kid: Hot Mess", price: 8.99 },
  { isbn: "9780241583159", title: "Diary of a Wimpy Kid: No Brainer", price: 7.99 },
  { isbn: "9781398534735", title: "Dork Diaries", price: 2.99 },
  { isbn: "9781471196850", title: "Dork Diaries: I Love Paris", price: 7.99 },
  { isbn: "9781398541184", title: "Dork Diaries: Sister Showdown", price: 7.99 },
  { isbn: "9781546151517", title: "Dragon Diary", price: 8.99 },
  { isbn: "9780008657062", title: "Dreadwood: Terror Tower", price: 7.99 },
  { isbn: "9780702337963", title: "Ella Jones vs The Sun Stealer", price: 7.99 },
  { isbn: "9780241767191", title: "Enchanted To Meet You", price: 8.99 },
  { isbn: "9781801058735", title: "Escape Room: The Haunted Castle", price: 9.99 },
  { isbn: "9780241681046", title: "Every Time You Hear That Song", price: 8.99 },
  { isbn: "9780241769966", title: "Extremely Embarrassing Life of Lottie Brooks, The", price: 4.99 },
  { isbn: "9780702330841", title: "Fart that Saved the Universe, The Available from 1st March", price: 7.99 },
  { isbn: "9780702331367", title: "Find Me After", price: 8.99 },
  { isbn: "9780008582043", title: "Finding Bear", price: 7.99 },
  { isbn: "9781398519978", title: "First to Die at the End, The", price: 7.99 },
  { isbn: "9781546131151", title: "Five Nights at Freddy's: Return to the Pit", price: 8.99 },
  { isbn: "9781546128434", title: "Five Nights at Freddy's: Tales from the Pizzaplex Graphic Novel Volume 1", price: 8.99 },
  { isbn: "9781339005348", title: "Five Nights at Freddy's: Fazbear Frights Graphic Novel Collection Volume 5", price: 8.99 },
  { isbn: "9781804538241", title: "Football Legends 2025", price: 9.99 },
  { isbn: "9781803378770", title: "Furry Bubble Tea Notebook", price: 8.99 },
  { isbn: "9780702325380", title: "Game of Scandal, A", price: 8.99 },
  { isbn: "9781405293181", title: "Good Girls Guide to Murder, A", price: 9.99 },
  { isbn: "9780241672051", title: "Grandest Game, The", price: 9.99 },
  { isbn: "9781444951387", title: "Heartstopper Volume 1", price: 8.99 },
  { isbn: "9781444957655", title: "Heartstopper Volume 5", price: 8.99 },
  { isbn: "9780007458424", title: "Hobbit, The", price: 5.99 },
  { isbn: "9781407132082", title: "Hunger Games, The", price: 4.99 },
  { isbn: "9781780622163", title: "I Am Malala", price: 4.99 },
  { isbn: "9780241760628", title: "Inheritance Games, The", price: 3.99 },
  { isbn: "9780241767108", title: "Last Bookstore on Earth, The", price: 8.99 },
  { isbn: "9780702338526", title: "Let's Split Up", price: 8.99 },
  { isbn: "9780702338038", title: "Meet Me at Midnight", price: 8.99 },
  { isbn: "9781805075707", title: "Mondays Are Murder", price: 8.99 },
  { isbn: "9780702331213", title: "Monster Hunter's Handbook, The", price: 6.99 },
  { isbn: "9781786542212", title: "Naturals, The", price: 9.99 },
  { isbn: "9780008659288", title: "Nick & Charlie", price: 8.99 },
  { isbn: "9780702329890", title: "Nina Peanut: Epic World Tour Era Available from 29th April", price: 7.99 },
  { isbn: "9780241628867", title: "Noughts and Crosses", price: 3.99 },
  { isbn: "9781529380941", title: "Once Upon a Broken Heart", price: 9.99 },
  { isbn: "9780241695968", title: "One of Us is Back", price: 8.99 },
  { isbn: "9780141375632", title: "One of Us is Lying", price: 8.99 },
  { isbn: "9780702315640", title: "People Like Stars", price: 4.99 },
  { isbn: "9780702333408", title: "Phantom Hearts", price: 8.99 },
  { isbn: "9780552579278", title: "Pig Heart Boy", price: 3.99 },
  { isbn: "9781546151753", title: "Plush Boba Tea Diary", price: 8.99 },
  { isbn: "9781398535732", title: "Powerful", price: 8.99 },
  { isbn: "9781398529489", title: "Powerless", price: 9.99 },
  { isbn: "9780008507268", title: "Reappearance of Rachel Price, The", price: 8.99 },
  { isbn: "9781398530126", title: "Reckless", price: 9.99 },
  { isbn: "9780702334399", title: "Red Flags", price: 8.99 },
  { isbn: "9781546151609", title: "Rhinestone Butterfly Diary", price: 8.99 },
  { isbn: "9781801055369", title: "Rocks and Minerals Briefcase", price: 9.99 },
  { isbn: "9780702328701", title: "Rosie Frost: Ice on Fire Available from 10th April", price: 7.99 },
  { isbn: "9781444980578", title: "Rules of Royalty, The", price: 9.99 },
  { isbn: "9781839133138", title: "Safiyyah's War", price: 7.99 },
  { isbn: "9781546124962", title: "Saphie the One-Eyed Cat Volume 1", price: 9.99 },
  { isbn: "9780702337734", title: "Sidemen: The Ultimate Fan Book", price: 6.99 },
  { isbn: "9780008601270", title: "Skulduggery Pleasant: A Mind Full Of Murder", price: 8.99 },
  { isbn: "9780008659271", title: "Solitaire", price: 9.99 },
  { isbn: "9780702340574", title: "Sunrise on the Reaping Available from 25th March", price: 14.99 },
  { isbn: "9780008305857", title: "Super Sleuth", price: 8.99 },
  { isbn: "9780702341670", title: "Take a Chance on Me", price: 8.99 },
  { isbn: "9781471166204", title: "They Both Die at the End", price: 8.99 },
  { isbn: "9781398536548", title: "Til Death", price: 8.99 },
  { isbn: "9780702328763", title: "Tom Gates: Five Star Stories", price: 7.99 },
  { isbn: "9781407191126", title: "Tom Gates: Ha! Ha! Hilarious", price: 7.99 },
  { isbn: "9781546138570", title: "Treasure Hunt: Gold", price: 9.99 },
  { isbn: "9781915788252", title: "Ultimate Unofficial Guide to Fortnite", price: 6.99 },
  { isbn: "9780702339042", title: "Unico: Awakening", price: 7.99 },
  { isbn: "9780702330926", title: "Virtue Season, The", price: 8.99 },
  { isbn: "9780702325618", title: "Vulpine, The", price: 8.99 },
  { isbn: "9780702332920", title: "Watch Your Back", price: 8.99 },
  { isbn: "9780702335167", title: "When We Flew Away: A Novel of Anne Frank, Before the Diary", price: 7.99 },
  { isbn: "9780702304941", title: "Win Lose Kill Die", price: 8.99 },
  { isbn: "9789999751780", title: "Wings of Fire Pack x 3", price: 8.99 },
  { isbn: "9780702329760", title: "Your Time Is Up", price: 8.99 }
];


export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedIsbn, setSelectedIsbn] = useState(books[0].isbn);
  const [quantity, setQuantity] = useState(1);
  const [customTitle, setCustomTitle] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [stationeryPrice, setStationeryPrice] = useState("");
  const [cashReceived, setCashReceived] = useState('');
  const [discountUsed, setDiscountUsed] = useState(false);

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
    setSales([...sales, { cart, cashReceived, change, timestamp }]);
    setCart([]);
    setCashReceived(0);
    setDiscountUsed(false);
  };

  const exportCSV = () => {
    const rows = ["Title,Quantity,Price,Total,Cash Received,Change,Timestamp"];
    sales.forEach(sale => {
      sale.cart.forEach(item => {
        rows.push(`"${item.title}",${item.quantity},${item.price.toFixed(2)},${item.total.toFixed(2)},${sale.cashReceived.toFixed(2)},${sale.change.toFixed(2)},${sale.timestamp}`);
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
    .reduce((sum, s) => sum + s.cashReceived, 0);
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
      <input placeholder="Cash Received" type="number" value={cashReceived}
onChange={e => setCashReceived(e.target.value)} onChange={e => setCashReceived(Number(e.target.value))} />
      <button onClick={finalizeSale}>Finalize Sale</button>

      <h2>Sales Log</h2>
      <ul>
        {sales.map((s, i) => (
          <li key={i}>
            {new Date(s.timestamp).toLocaleTimeString()} | Cash: £{s.cashReceived.toFixed(2)} | Change: £{s.change.toFixed(2)}
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
