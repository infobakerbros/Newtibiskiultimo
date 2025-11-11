import React, { useState } from "react";

export default function Menu() {
  const [cart, setCart] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });

  const sections = [
    {
      title: "TIBISKIS ORIGINALES",
      items: [
        { id: 1, qty: 4, price: 3.0 },
        { id: 2, qty: 12, price: 8.5 },
        { id: 3, qty: 25, price: 15.5 },
      ],
    },
    {
      title: "TIBISKIS CHICOS",
      items: [
        { id: 4, qty: 6, price: 3.0 },
        { id: 5, qty: 15, price: 8.5 },
        { id: 6, qty: 30, price: 15.5 },
      ],
    },
    {
      title: "OREJITAS",
      items: [{ id: 7, qty: 8, price: 3.0 }],
    },
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
    (acc, [id, qty]) =>
      acc +
      qty *
        sections
          .flatMap((s) => s.items)
          .find((i) => i.id === Number(id)).price,
    0
  );

  const handleSubmit = () => {
    alert(
      `Pedido confirmado para ${customer.name}\nTeléfono: ${customer.phone}\nDirección: ${customer.address}`
    );
    setShowPopup(false);
    setCustomer({ name: "", phone: "", address: "" });
    setCart({});
  };

  return (
    <div
      style={{
        backgroundColor: "#165c3a",
        minHeight: "100vh",
        padding: "25px",
        fontFamily: "'Baloo 2', cursive",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#f8c94e",
          fontSize: "3rem",
          fontWeight: "800",
          marginBottom: "10px",
          textShadow: "2px 2px 0px #000",
        }}
      >
        MENÚ
      </h1>
      <h2
        style={{
          color: "#f8c94e",
          fontSize: "2rem",
          marginBottom: "25px",
          letterSpacing: "1px",
        }}
      >
        TIBISKI 🥐
      </h2>

      {sections.map((section) => (
        <div key={section.title} style={{ marginBottom: "35px" }}>
          <h3
            style={{
              color: "#f5b942",
              fontSize: "1.8rem",
              letterSpacing: "1px",
              textShadow: "1px 1px 0px #000",
            }}
          >
            {section.title}
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              maxWidth: "450px",
              margin: "0 auto",
              textAlign: "center",
              backgroundColor: "#145c47",
              borderRadius: "20px",
              padding: "10px 0",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ fontWeight: "700" }}>Cantidad</div>
            <div style={{ fontWeight: "700" }}>Precio</div>
            <div style={{ fontWeight: "700" }}>🛒</div>

            {section.items.map((item) => (
              <React.Fragment key={item.id}>
                <div>{item.qty}</div>
                <div>${item.price.toFixed(2)}</div>
                <div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    style={{
                      backgroundColor: "#f5b942",
                      border: "none",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      fontWeight: "bold",
                      color: "#165c3a",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>
                  <span>{cart[item.id] || 0}</span>
                  <button
                    onClick={() => handleAdd(item.id)}
                    style={{
                      backgroundColor: "#f5b942",
                      border: "none",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      fontWeight: "bold",
                      color: "#165c3a",
                      marginLeft: "5px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}

      <h2 style={{ marginTop: "20px" }}>Total: ${total.toFixed(2)}</h2>
      <button
        onClick={() => setShowPopup(true)}
        style={{
          backgroundColor: "#f8c94e",
          color: "#165c3a",
          border: "none",
          borderRadius: "15px",
          padding: "12px 30px",
          fontWeight: "700",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Confirmar Pedido
      </button>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#145c47",
              padding: "25px",
              borderRadius: "15px",
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#f5b942" }}>Datos del Cliente 🧾</h2>

            <input
              type="text"
              placeholder="Nombre completo"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                marginBottom: "10px",
              }}
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                marginBottom: "10px",
              }}
            />
            <input
              type="text"
              placeholder="Dirección"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                marginBottom: "15px",
              }}
            />

            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#f5b942",
                color: "#165c3a",
                fontWeight: "bold",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
                marginRight: "10px",
              }}
            >
              Enviar Pedido
            </button>

            <button
              onClick={() => setShowPopup(false)}
              style={{
                backgroundColor: "#ccc",
                color: "#165c3a",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
