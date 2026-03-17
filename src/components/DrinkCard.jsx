export default function DrinkCard({ drink, onAdd }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 hover:-translate-y-2 transition-all flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="logo-font text-2xl text-[var(--text)]">{drink.name}</h3>
          {drink.note && <p className="text-amber-500 text-xs">{drink.note}</p>}
          <p className="text-amber-400 text-xl font-medium">{drink.price} lei</p>
        </div>
        <button
          onClick={onAdd}
          className="bg-amber-700 hover:bg-amber-600 px-5 py-2.5 rounded-2xl text-sm font-medium text-white transition"
        >
          Add
        </button>
      </div>

      <div className="mt-auto pt-5 border-t border-amber-800/40">
        <p className="text-xs uppercase tracking-wider text-amber-500 mb-2">Recipe</p>
        <ul className="text-sm text-[var(--text)] space-y-1">
          {drink.recipe.map((line, i) => (
            <li key={i}>• {line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}