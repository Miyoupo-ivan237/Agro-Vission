export default function Header({ title = 'Agro-Vission Admin' }) {
  return <header className="px-6 py-4 border-b border-slate-200"><h1 className="text-xl font-bold">{title}</h1></header>;
}
