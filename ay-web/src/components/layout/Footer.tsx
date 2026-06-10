import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1c1c1c] py-10 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Logo className="text-white" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
            <a
              href="mailto:hola@ay.digital"
              className="text-xs text-[#6b6b6b] hover:text-white transition-colors"
            >
              hola@ay.digital
            </a>
            <span className="hidden sm:block text-[#2a2a2a]">|</span>
            <span className="text-xs text-[#3a3a3a]">
              Recursos interactivos para eventos en vivo
            </span>
            <span className="hidden sm:block text-[#2a2a2a]">|</span>
            <span className="text-xs text-[#3a3a3a]">© {year} Ay!</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
