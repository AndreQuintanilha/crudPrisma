import Link from "next/link";

export default function GibiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <nav className="bg-slate-400">
    <ul>
        <li><Link href="/cadastrarGibi">Cadastrar Gibi</Link></li>

    </ul>
    </nav>
    {children}
   </>
  );
}
