import Link from "next/link";

export function FooterDisclaimer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-700/80 bg-[#0f172a]">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} SoyContratoFacil.es — Todos los
            derechos reservados.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <Link
              href="/guias"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Guías
            </Link>
            <Link
              href="/articulos"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Artículos
            </Link>
            <Link
              href="/sobre-nosotros"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Sobre nosotros
            </Link>
            <Link
              href="/aviso-legal"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Aviso legal
            </Link>
            <Link
              href="/privacidad"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos-de-uso"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Términos de uso
            </Link>
            <Link
              href="/cookies"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
