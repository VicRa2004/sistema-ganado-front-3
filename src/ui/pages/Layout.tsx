import { Outlet, useNavigate } from "react-router";
// 1. IMPORTANTE: Importar ScrollBar aquí
import { ScrollArea, ScrollBar } from "@/ui/components/ui/scroll-area";
import { Navigation } from "../components/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/infrastructure/auth.store";

export const Layout = () => {
  const clear = useAuthStore((state) => state.clear);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      clear();
      navigate("/login?expired=true");
    };

    window.addEventListener("auth-expired", handler);
    return () => window.removeEventListener("auth-expired", handler);
  }, [navigate, clear]);

  return (
    // 2. CORRECCIÓN: 'overflow-hidd' -> 'overflow-hidden'
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Navigation />

      <main className="flex-1 overflow-hidden">
        {/* Nota: Moví el p-4 a un div interno. 
            Es buena práctica en shadcn para que el ScrollBar no se monte sobre el padding.
        */}
        <ScrollArea className="h-full w-full">
          <div className="p-4 h-full">
            {" "}
            {/* Contenedor interno para el padding */}
            <Outlet />
          </div>

          {/* 3. SOLUCIÓN: Agregar explícitamente la barra horizontal */}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>
    </div>
  );
};
