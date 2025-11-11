import React, { useState } from "react";

export default function Menu() {
  const [cart, setCart] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });

  const products = [
    { id: 1, name: "Tibiskis Originales (4 unidades)", price: 3, img: "/tibiski.png" },
    { id: 2, name: "Tibiskis Originales (12 unidades)", price: 8.5, img: "/tibiski.png" },
    { id: 3, name: "Tibiskis Originales (25 unidades)", price: 15.5, img: "/tibiski.png" },
    { id: 4, name: "Tibiskis Chicos (6 unidades)", price: 3, img: "/tibiski.png" },
    { id: 5, name: "Tibiskis Chicos (15 unidades)", price: 8.5, img: "/tibiski.png" },
    { id: 6, name: "Tibiskis Chicos (30 unidades)", price: 15.5, img: "/tibiski.png" },
    { id: 7, name: "Orejitas (8 unidades)", price: 3, img: "/orejitas.png" },
  ];

  const handleAdd = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const handleRemove = (id) =>
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: current - 1 };
    });

  const total = Object.entries(cart).reduce(
    (acc, [id, qty]) => acc + qty * products.find((p) => p.id === Number(id)).price,
    0
  );

  return (
    <div
      style={{
        backgroundColor: "#0f3b2f",
        minHeight: "100vh",
        textAlign: "center",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#f5b942", marginBottom: "30px", fontWeight: "800" }}>
        MENÚ TIBISKI 🥐
      </h1>

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            backgroundColor: "#145c47",
            borderRadius: "20px",
            margin: "20px auto",
            padding: "15px",
            width: "90%",
            maxWidth: "400px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <img
            src={p.img}
            alt={p.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "12px",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
          <h3 style={{ margin: "5px 0", color: "#f5b942" }}>{p.name}</h3>
          <p style={{ margin: "5px 0", fontSize: "18px" }}>${p.price.toFixed(2)}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => handleRemove(p.id)}
              style={{
                backgroundColor: "#f5b942",
                color: "#0f3b2f",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                fontWeight: "bold",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              −
            </button>
            <span style={{ fontSize: "18px" }}>{cart[p.id] || 0}</span>
            <button
              onClick={() => handleAdd(p.id)}
              style={{
                backgroundColor: "#f5b942",
                color: "#0f3b2f",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                fontWeight: "bold",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <h2 style={{ marginTop: "30px" }}>Total: ${total.toFixed(2)}</h2>

      <button
        onClick={() => setShowPopup(true)}
        style={{
          backgroundColor: "#f5b942",
          color: "#0f3b2f",
          border: "none",
          padding: "15px 30px",
          borderRadius: "15px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Confirmar Pedido
      </button>
    </div>
  );
}
