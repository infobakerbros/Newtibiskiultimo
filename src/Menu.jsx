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
          letterSpac
          
