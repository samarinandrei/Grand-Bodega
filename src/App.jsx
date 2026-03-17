import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import useStore from './store';
import useLocalStorageSync from './hooks/useLocalStorageSync';
import DrinkCard from './components/DrinkCard';
import OrderPanel from './components/OrderPanel';
import { menu } from './data/menu';

function App() {
  useLocalStorageSync();

  const { order, isDark, toggleTheme, clearOrder, addToOrder } = useStore();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const allDrinks = Object.values(menu).flat();

  const filtered = allDrinks.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  const total = order.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className={`${isDark ? 'dark' : 'light'} min-h-screen`}>
      <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex flex-col lg:flex-row">
        <Toaster position="top-right" />

        {/* MENU SIDE */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <header className="flex flex-col sm:flex-row justify-between gap-6 mb-10">
            <div>
              <h1 className="logo-font text-6xl text-amber-200">Grand Bodega</h1>
              <p className="text-amber-400 tracking-widest">Romanian Bar • București</p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <input
                type="text"
                placeholder="Caută băutură..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-5 py-3 rounded-2xl bg-amber-950/40 border border-amber-700 focus:border-amber-500 w-64"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-5 py-3 rounded-2xl bg-amber-950/40 border border-amber-700"
              >
                <option value="name">Nume A–Z</option>
                <option value="price-asc">Preț crescător</option>
                <option value="price-desc">Preț descrescător</option>
              </select>

              <button
                onClick={toggleTheme}
                className="px-5 py-3 rounded-2xl bg-amber-800 hover:bg-amber-700 transition"
              >
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((drink) => (
              <DrinkCard
                key={drink.name}
                drink={drink}
                onAdd={() => {
                  addToOrder(drink);
                  toast.success(`${drink.name} adăugat! 🍷`, { duration: 2000 });
                }}
              />
            ))}
          </div>
        </main>

        {/* ORDER SIDE */}
        <OrderPanel order={order} total={total} clearOrder={() => {
          clearOrder();
          toast('Comanda a fost ștearsă 🗑️');
        }} />
      </div>
    </div>
  );
}

export default App;