import { Outlet, useNavigate } from "react-router";
import { ScrollArea } from "@/ui/components/ui/scroll-area";
import { Navigation } from "../components/navigation";
import { useEffect } from "react";

export const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => {
      // redirige a login
      navigate("/login?expired=true");
    };

    window.addEventListener("auth-expired", handler);
    return () => window.removeEventListener("auth-expired", handler);
  }, [navigate]);

  return (
    // 1. h-screen: Fuerza al contenedor a medir exactamente el alto de la ventana
    // 2. flex-col: Organiza hijos en columna
    // 3. overflow-hidden: Evita que aparezca el scroll nativo del navegador
    <div className="flex h-screen flex-col overflow-hidden">
      {/* La navegación ocupa su altura natural */}
      <Navigation />

      {/* flex-1: Hace que main ocupe todo el espacio restante disponible
         overflow-hidden: Asegura que el contenedor no se estire si el hijo es grande 
      */}
      <main className="flex-1 overflow-hidden">
        {/* h-full: Obliga al ScrollArea a ocupar todo el alto de main
           w-full: Ocupa todo el ancho
        */}
        <ScrollArea className="h-full w-full p-4">
          <Outlet />
        </ScrollArea>
      </main>
    </div>
  );
};
