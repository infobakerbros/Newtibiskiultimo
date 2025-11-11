import React, { useState } from "react";

const Menu = () => {
  const [cart, setCart] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    ubicacion: "",
  });

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

  const updateCart = (sectionTitle, item, delta) => {
    const key = `${sectionTitle}-${item.cantidad}`;
    setCart((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + delta),
    }));
  };

  const total = Object.entries(cart).reduce((acc, [key, quantity]) => {
    const [sectionTitle, cantidad] = key.split("-");
    const section = sections.find((s) => s.title === sectionTitle);
    const item = section?.items.find(
      (i) => i.cantidad === parseInt(cantidad, 10)
    );
    return acc + (item ? item.precio * quantity : 0);
  }, 0);

  const confirmarPedido = () => {
    if (total === 0) {
      alert("Por favor selecciona al menos un producto 🥐");
    } else {
      setShowPopup(true);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enviarPedido = () => {
    if (!formData.nombre || !formData.telefono || !formData.ubicacion) {
      alert("Por favor completa todos los campos 📋");
      return;
    }
    alert(
      `✅ Pedido confirmado\n\nCliente: ${formData.nombre}\nTeléfono: ${formData.telefono}\nUbicación: ${formData.ubicacion}\nTotal: $${total.toFixed(
        2
      )}\n\nGracias por tu compra 🥐`
    );
    setShowPopup(false);
    setCart({});
    setFormData({ nombre: "", telefono: "", ubicacion: "" });
  };

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
      {/* LOGOS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          marginBottom: "30px",
        }}
      >
        <img
          src="/logo.png"
          alt="Logo verde"
          style={{ height: "80px", width: "auto" }}
        />
        <img
          src="/baker-logo.png"
          alt="Baker Bros Logo"
          style={{ height: "65px", width: "auto" }}
        />
      </div>

      {/* TITULO */}
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

          {section.items.map((item) => {
            const key = `${section.title}-${item.cantidad}`;
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
                  margin: "0 auto 10px auto",
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
                    onClick={() => updateCart(section.title, item, -1)}
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
                    onClick={() => updateCart(section.title, item, 1)}
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
      ))}

      {/* TOTAL Y BOTÓN */}
      <div style={{ marginTop: "30px" }}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button
          onClick={confirmarPedido}
          style={{
            backgroundColor: "#f5b942",
            border: "none",
            borderRadius: "10px",
            padding: "12px 25px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.3)",
            fontSize: "1rem",
          }}
        >
          Confirmar Pedido
        </button>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#104c30",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              color: "#fff",
              width: "85%",
              maxWidth: "400px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src="/tibiski.png"
              alt="Tibiski"
              style={{
                width: "130px",
                margin: "0 auto 15px auto",
                display: "block",
              }}
            />
            <h2 style={{ color: "#f5b942", marginBottom: "15px" }}>
              Confirmar Pedido
            </h2>

            <input
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              style={{
                width: "90%",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                marginBottom: "10px",
                textAlign: "center",
                color: "#000", // texto negro visible
              }}
            />
            <input
              name="telefono"
              placeholder="Número de teléfono"
              value={formData.telefono}
              onChange={handleInputChange}
              style={{
                width: "90%",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                marginBottom: "10px",
                textAlign: "center",
                color: "#000",
              }}
            />
            <input
              name="ubicacion"
              placeholder="Ubicación"
              value={formData.ubicacion}
              onChange={handleInputChange}
              style={{
                width: "90%",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                marginBottom: "15px",
                textAlign: "center",
                color: "#000",
              }}
            />

            <button
              onClick={enviarPedido}
              style={{
                backgroundColor: "#f5b942",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Enviar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
