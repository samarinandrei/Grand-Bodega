import useStore from '../store';

export default function OrderPanel({ order, total, clearOrder }) {
  const { changeQty, removeItem } = useStore();

  return (
    <aside className="w-full lg:w-96 bg-[var(--card)] border-l border-[var(--border)] p-6 flex flex-col h-screen lg:sticky lg:top-0">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-medium text-[var(--text)]">Your Check</h2>
        {order.length > 0 && (
          <button onClick={clearOrder} className="text-red-400 text-sm">Clear all</button>
        )}
      </div>

      {order.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-amber-500">
          Your check is empty<br />Add drinks from menu
        </div>
      ) : (
        <div className="flex-1 space-y-4 overflow-y-auto">
          {order.map((item) => (
            <div key={item.name} className="bg-[#2C1810] dark:bg-[#1F120A] p-4 rounded-2xl flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-amber-400">{item.price} lei × {item.qty}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => changeQty(item.name, -1)} className="w-8 h-8 border border-amber-700 rounded-lg hover:bg-amber-900">-</button>
                <span>{item.qty}</span>
                <button onClick={() => changeQty(item.name, 1)} className="w-8 h-8 border border-amber-700 rounded-lg hover:bg-amber-900">+</button>
                <button onClick={() => removeItem(item.name)} className="text-red-400 ml-2">×</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-amber-800">
        <div className="flex justify-between text-3xl mb-6 text-[var(--text)]">
          <span>Total</span>
          <strong>{total} lei</strong>
        </div>
        <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 py-5 rounded-3xl text-lg font-medium text-white">
          PAY AT BAR
        </button>
      </div>
    </aside>
  );
}