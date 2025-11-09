import React, { useState } from "react";

export default function App() {
  const [zona, setZona] = useState("");
  const [pedido, setPedido] = useState([]);

  const menu = {
    "Tibiskis Originales": [
      { cantidad: 4, precio: 3.0 },
      { cantidad: 12, precio: 8.5 },
      { cantidad: 25, precio: 15.5 },
    ],
    "Tibiskis Chicos": [
      { cantidad: 6, precio: 3.0 },
      { cantidad: 15, precio: 8.5 },
      { cantidad: 30, precio: 15.5 },
    ],
    "Orejitas": [{ cantidad: 8, precio: 3.0 }],
  };

  const toggleItem = (nombre, cantidad, precio) => {
    const itemId = `${nombre}-${cantidad}`;
    setPedido((prev) =>
      prev.some((i) => i.id === itemId)
        ? prev.filter((i) => i.id !== itemId)
        : [...prev, { id: itemId, nombre, cantidad, precio }]
    );
  };

  const total = pedido.reduce((sum, i) => sum + i.precio, 0).toFixed(2);

  const mensajeWhatsApp = encodeURIComponent(
    `🧁 *Nuevo pedido Tibiski* 🧁
${pedido
  .map((i) => `• ${i.nombre} (${i.cantidad}) - $${i.precio.toFixed(2)}`)
  .join("\n")}
📍 Zona: ${zona || "No especificada"}
💰 Total: $${total}
Gracias por preferir Tibiski 💛`
  );

  const linkWhatsApp = `https://wa.me/50762386744?text=${mensajeWhatsApp}`;

  return (
    <div className="min-h-screen bg-green-900 text-white p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-6">
        Menú Tibiski 🍪
      </h1>

      <div className="max-w-2xl mx-auto bg-green-800 p-5 rounded-2xl shadow-lg">
        {Object.keys(menu).map((categoria) => (
          <div key={categoria} className="mb-6">
            <h2 className="text-2xl text-yellow-300 font-semibold mb-2">
              {categoria}
            </h2>
            {menu[categoria].map(({ cantidad, precio }) => {
              const itemId = `${categoria}-${cantidad}`;
              const activo = pedido.some((i) => i.id === itemId);
              return (
                <button
                  key={itemId}
                  onClick={() => toggleItem(categoria, cantidad, precio)}
                  className={`block w-full text-left border rounded-lg p-3 mb-2 transition ${
                    activo
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : "bg-green-700 border-yellow-400 hover:bg-green-600"
                  }`}
                >
                  {cantidad} x ${precio.toFixed(2)}
                </button>
              );
            })}
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-yellow-300 mb-1">
            Zona / Sector de entrega 🏠
          </label>
          <input
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            placeholder="Ej: San Francisco, Bella Vista..."
            className="w-full p-2 rounded-lg text-black"
          />
          <p className="text-sm text-gray-300 mt-1">
            *El costo de delivery varía según la zona.*
          </p>
        </div>

        <div className="text-center space-y-3">
          <p className="text-lg font-semibold text-yellow-300">
            Total: ${total}
          </p>

          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-300 transition"
          >
            📦 Enviar Pedido por WhatsApp
          </a>

          <div className="bg-green-700 py-3 rounded-xl mt-2">
            <p>💸 Pagar por Yappy:</p>
            <p className="text-yellow-300 font-bold text-xl">6317-0993</p>
          </div>
        </div>
      </div>
    </div>
  );
}

