
// Book Sales Tracker Web App

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Download, Trash2 } from "lucide-react";

const initialBooks = [
  { age: "8+", isbn: "9780755500413", title: "All New Minecraft Creative Handbook", price: 9.99 },
  { age: "8+", isbn: "9781546152293", title: "Astro Turf Journal", price: 8.99 },
  { age: "11+", isbn: "9781338680072", title: "Ballad of Songbird and Snakes Journal, The", price: 4.99 },
  { age: "13+", isbn: "9780702309519", title: "Ballad of Songbirds and Snakes, The", price: 8.99 },
  { age: "8+", isbn: "HANDPOINTERS", title: "Hand Pointers", price: 3.99 },
];

export default function BookSalesTracker() {
  const [books, setBooks] = useState(initialBooks);
  const [sales, setSales] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedIsbn, setSelectedIsbn] = useState(books[0].isbn);
  const [quantity, setQuantity] = useState(1);
  const [cashReceived, setCashReceived] = useState(0);
  const [changeGiven, setChangeGiven] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [stationeryPrice, setStationeryPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = () => {
    const book = books.find(b => b.isbn === selectedIsbn);
    const price = (!discountApplied && cart.length === 0) ? book.price - 1 : book.price;
    const total = price * quantity;
    const item = { ...book, quantity, price, total };
    setCart([...cart, item]);
    if (!discountApplied) setDiscountApplied(true);
  };

  const finalizeSale = () => {
    const totalDue = cart.reduce((sum, item) => sum + item.total, 0);
    const change = cashReceived - totalDue;
    const timestamp = new Date().toISOString();
    const saleRecord = {
      items: [...cart],
      cashReceived,
      change,
      timestamp
    };
    setSales([...sales, saleRecord]);
    setChangeGiven(change);
    setCart([]);
    setDiscountApplied(false);
    setQuantity(1);
    setCashReceived(0);
  };

  const clearCart = () => {
    setCart([]);
    setDiscountApplied(false);
  };

  const removeCartItem = index => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const addCustomBook = () => {
    const newBook = {
      age: "custom",
      isbn: Date.now().toString(),
      title: customTitle,
      price: parseFloat(customPrice),
    };
    setBooks([...books, newBook]);
    setSelectedIsbn(newBook.isbn);
    setCustomTitle("");
    setCustomPrice("");
  };

  const addStationeryItem = () => {
    const price = parseFloat(stationeryPrice);
    if (price >= 0.4 && price <= 3) {
      const item = {
        age: "stationery",
        isbn: Date.now().toString(),
        title: "Stationery Item",
        price,
        quantity: 1,
        total: price,
      };
      setCart([...cart, item]);
      setStationeryPrice("");
    }
  };

  const exportCSV = () => {
    const rows = ["Title,Quantity,Price,Total,Cash Received,Change,Timestamp"];
    sales.forEach(sale => {
      sale.items.forEach(item => {
        rows.push(\`"\${item.title}",\${item.quantity},\${item.price.toFixed(2)},\${item.total.toFixed(2)},\${sale.cashReceived.toFixed(2)},\${sale.change.toFixed(2)},\${sale.timestamp}\`);
      });
    });
    const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "book_sales.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRevenue = sales.reduce((sum, s) => sum + s.items.reduce((a, i) => a + i.total, 0), 0);
  const totalBooks = sales.reduce((sum, s) => sum + s.items.reduce((a, i) => a + parseInt(i.quantity), 0), 0);
  const totalDue = cart.reduce((sum, item) => sum + item.total, 0);
  const totalCashReceivedToday = sales
    .filter(sale => new Date(sale.timestamp).toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + s.cashReceived, 0);
  const totalChangeGivenToday = sales
    .filter(sale => new Date(sale.timestamp).toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + s.change, 0);

  return (
    <div className="p-4 space-y-4">
      Emmanuel College Book Fair Web App
    </div>
  );
}
