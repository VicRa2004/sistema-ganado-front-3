import { Link } from "react-router";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent } from "@/ui/components/ui/card";
import { useAuthStore } from "@/modules/auth/infrastructure/auth.store";

export const Index = () => {
  const token = useAuthStore((state) => state.token);

  const year = new Date().getFullYear();

  // =============================
  // Si el usuario está autenticado
  // =============================
  if (token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center gap-10">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Bienvenido al Sistema Ganadero
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl">
            Accede a tus terrenos, fierros, ganado y registros.
          </p>
        </div>

        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6 space-y-6">
            <p className="text-muted-foreground">
              Estás autenticado. Comienza a gestionar tu información.
            </p>

            <div className="flex flex-col gap-4">
              <Button asChild size="lg">
                <Link to="/app/ground">Ir a Terrenos</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/app/brand">Ir a Fierros</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/app/cattle">Ir a Ganado</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <footer className="text-sm text-muted-foreground pt-10">
          © {year} Sistema Ganadero — Todos los derechos reservados.
        </footer>
      </div>
    );
  }

  // =============================
  // Si NO está autenticado
  // =============================
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center gap-10">
      {/* Título principal */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Sistema de Gestión Ganadera
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl">
          Administra tus terrenos, fierros, ganado y registros de forma
          sencilla, rápida y organizada.
        </p>
      </div>

      {/* Card de acciones */}
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-6">
          <p className="text-muted-foreground">
            Comienza iniciando sesión o crea una cuenta nueva.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="w-full md:w-auto">
              <Link to="/login">Iniciar Sesión</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full md:w-auto"
            >
              <Link to="/register">Crear Cuenta</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="text-sm text-muted-foreground pt-10">
        © {year} Sistema Ganadero — Todos los derechos reservados.
      </footer>
    </div>
  );
};
