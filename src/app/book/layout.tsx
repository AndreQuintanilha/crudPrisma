import Link from "next/link";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <nav className="bg-slate-400">
    <ul>
        <li><Link href="/cadastrarBook">Cadastrar Book</Link></li>
        
    </ul>
    </nav>
    {children}
   </>
  );
}
