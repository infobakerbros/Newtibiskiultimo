import React, { useState } from "react";

export default function Menu() {
  const [cart, setCart] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const products = [
    { id: 1, name: "Tibiski Normal (4 unidades)", price: 3 },
    { id: 2, name: "Tibiski Normal (8 unidades)", price: 6 },
    { id: 3, name: "Tibiski Normal (12 unidades)", price: 8.5 },
    { id: 4, name: "Tibiski Mini (6 unidades)", price: 3 },
    { id: 5, name: "Tibiski Mini (10 unidades)", price: 6 },
    { id: 6, name: "Tibiski Mini (15 unidades)", price: 8.5 },
  ];

  const handleAdd = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemove = (id) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const total = Object.entries(cart).reduce(
    (acc, [id, qty]) =>
      acc + qty * products.find((p) => p.id === Number(id)).price,
    0
  );

  const handleConfirm = () => setShowPopup(true);

  const handleSubmit = () => {
    alert(`Pedido confirmado para ${customer.name}`);
    setShowPopup(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#0f3b2f",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ color: "#f5b942", marginBottom: "30px" }}>
        Menú Tibiski 🥐
      </h1>

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            margin: "10px auto",
            padding: "10px",
            width: "90%",
            maxWidth: "400px",
            background: "#145c47",
            borderRadius: "10px",
          }}
        >
          <h3>{p.name}</h3>
          <p>${p.price.toFixed(2)}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <button onClick={() => handleRemove(p.id)}>-</button>
            <span>{cart[p.id] || 0}</span>
            <button onClick={() => handleAdd(p.id)}>+</button>
          </div>
        </div>
      ))}

      <h2 style={{ marginTop: "20px" }}>Total: ${total.toFixed(2)}</h2>
      <button
        style={{
          marginTop: "20px",
          backgroundColor: "#f5b942",
          color: "#0f3b2f",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
        }}
        onClick={handleConfirm}
      >
        Confirmar Pedido
      </button>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              color: "#0f3b2f",
              padding: "20px",
              borderRadius: "12px",
              width: "80%",
              maxWidth: "400px",
            }}
          >
            <h2>Datos del cliente</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
            <input
              type="text"
              placeholder="Dirección"
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#f5b942",
                color: "#0f3b2f",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Enviar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
