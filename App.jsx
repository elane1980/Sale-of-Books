export default function App() {
  return (
    <div style={{
      fontFamily: "Arial",
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #e6f2e6, #ccffcc)",
      padding: 20
    }}>
      <header style={{
        backgroundColor: "#004225",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <img src="/emmanuel-logo.png" alt="Emmanuel College Logo" style={{ height: 40, marginRight: 16 }} />
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Emmanuel College Book Fair</h1>
      </header>
      <p>App content goes here...</p>
    </div>
  );
}
