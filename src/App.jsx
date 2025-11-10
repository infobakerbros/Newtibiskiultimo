import { useState } from "react";
console.log("🔥 Tibiski nueva versión activa");


const products = [
  { id: 1, name: "Tibiskis Originales (12u)", price: 8.5 },
  { id: 2, name: "Tibiskis Chicos (6u)", price: 3.0 },
  { id: 3, name: "Orejas (8u)", price: 3.0 },
];

export default function App() {
  const [cart, setCart] = useState({});

  const handleAdd = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemove = (id) => {
    setCart((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
  };

  const total = products.reduce(
    (sum, p) => sum + (cart[p.id] || 0) * p.price,
    0
  );

  return (
    <div className="min-h-screen bg-[#1b4d2f] text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Menú Tibiski</h1>
      <div className="grid gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-[#244f31] p-4 rounded-2xl flex flex-col items-center shadow-md"
          >
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p>${p.price.toFixed(2)}</p>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => handleRemove(p.id)}
                className="px-3 py-1 bg-red-600 rounded-full"
              >
                -
              </button>
              <span className="text-xl">{cart[p.id] || 0}</span>
              <button
                onClick={() => handleAdd(p.id)}
                className="px-3 py-1 bg-green-600 rounded-full"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl">Total: ${total.toFixed(2)}</h3>
        <button
          onClick={() => alert("Pedido completado!")}
          className="bg-yellow-500 text-black px-6 py-2 rounded-xl mt-3 font-semibold"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}


