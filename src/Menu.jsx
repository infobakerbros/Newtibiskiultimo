import React, { useState } from "react";

const Menu = () => {
  const [cart, setCart] = useState({});
  const sections = [
    {
      title: "TIBISKIS ORIGINALES",
      items: [
        { cantidad: 4, precio: 3.0 },
        { cantidad: 12, precio: 8.5 },
        { cantidad: 25, precio: 15.5 },
      ],
    },
    {
      title: "TIBISKIS CHICOS",
      items: [
        { cantidad: 6, precio: 3.0 },
        { cantidad: 15, precio: 8.5 },
        { cantidad: 30, precio: 15.5 },
      ],
    },
    {
      title: "OREJITAS",
      items: [{ cantidad: 8, precio: 3.0 }],
    },
  ];

  const updateCart = (item, delta) => {
    setCart((prev) => ({
      ...prev,
      [item]: Math.max(0, (prev[item] || 0) + delta),
    }));
  };

  const total = Object.entries(cart).reduce(
    (acc, [key, value]) => acc + value * parseFloat(key.split("$")[1]),
    0
  );

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#165c3a",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Baloo 2, cursive",
        color: "#fff",
      }}
    >
      {/* ENCABEZADO PRINCIPAL */}
      <h1
        style={{
          fontSize: "3.2rem",
          color: "#f8c94e",
          fontWeight: "800",
          textShadow: "3px 3px 0px #000",
          letterSpacing: "2px",
          marginBottom: "40px",
        }}
      >
        MENÚ
      </h1>

      {/* SECCIONES */}
      {sections.map((section) => (
        <div key={section.title} style={{ marginBottom: "40px" }}>
          <h2
            style={{
              color: "#f5b942",
              fontSize: "2rem",
              letterSpacing: "1px",
              textShadow: "1px 1px 0px #000",
              marginBottom: "20px",
            }}
          >
            {section.title}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {section.items.map((item) => {
              const key = `${section.title}-${item.precio}`;
              return (
                <div
                  key={key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr auto",
                    alignItems: "center",
                    backgroundColor: "#104c30",
                    borderRadius: "12px",
                    padding: "10px 20px",
                    width: "80%",
                    maxWidth: "400px",
                    boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <p>Cant. {item.cantidad}</p>
                  <p>${item.precio.toFixed(2)}</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={() => updateCart(key, -1)}
                      style={{
                        backgroundColor: "#f5b942",
                        border: "none",
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      –
                    </button>
                    <span>{cart[key] || 0}</span>
                    <button
                      onClick={() => updateCart(key, 1)}
                      style={{
                        backgroundColor: "#f5b942",
                        border: "none",
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <div style={{ marginTop: "20px" }}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button
          style={{
            backgroundColor: "#f5b942",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
};

export default Menu;
