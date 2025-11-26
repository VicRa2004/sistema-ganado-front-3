import { Link } from "react-router";
import {
  Tractor,
  Stamp,
  Beef,
  ArrowRight,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react"; // Asumiendo que tienes lucide-react instalado (estándar en shadcn)
import { Button } from "@/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/components/ui/card";
import { useAuthStore } from "@/modules/auth/infrastructure/auth.store";

export const Index = () => {
  const token = useAuthStore((state) => state.token);
  const year = new Date().getFullYear();

  // Componente de Fondo (Patrón de puntos sutil)
  const BackgroundPattern = () => (
    <div className="absolute inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none" />
  );

  // =============================
  // VISTA: USUARIO AUTENTICADO
  // =============================
  if (token) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 gap-8">
        <BackgroundPattern />

        {/* Cabecera del Dashboard */}
        <div className="text-center space-y-2 max-w-3xl">
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
            <LayoutDashboard className="w-3 h-3 mr-1" /> Panel de Control
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Bienvenido de nuevo
          </h1>
          <p className="text-muted-foreground text-lg">
            Selecciona un módulo para comenzar a gestionar tu producción.
          </p>
        </div>

        {/* Grid de Módulos (En lugar de lista vertical) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-4">
          {/* Módulo: Terrenos */}
          <Link to="/app/ground" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-muted hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <Tractor className="w-6 h-6 text-emerald-700" />
                </div>
                <CardTitle className="text-xl">Terrenos</CardTitle>
                <CardDescription>
                  Gestión de parcelas, pastizales y ubicaciones.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-emerald-600 group-hover:underline">
                  Acceder <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Módulo: Fierros (Marcas) */}
          <Link to="/app/brand" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-muted hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Stamp className="w-6 h-6 text-orange-700" />
                </div>
                <CardTitle className="text-xl">Fierros y Marcas</CardTitle>
                <CardDescription>
                  Registro de hierros, patentes y señalética.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-orange-600 group-hover:underline">
                  Acceder <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Módulo: Ganado */}
          <Link to="/app/cattle" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-muted hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Beef className="w-6 h-6 text-blue-700" />
                </div>
                <CardTitle className="text-xl">Ganado</CardTitle>
                <CardDescription>
                  Inventario, trazabilidad y control sanitario.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-blue-600 group-hover:underline">
                  Acceder <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <footer className="text-sm text-muted-foreground mt-auto pt-10">
          © {year} Sistema Ganadero — Todos los derechos reservados.
        </footer>
      </div>
    );
  }

  // =============================
  // VISTA: PÚBLICA (HERO)
  // =============================
  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundPattern />

      {/* Contenedor Principal Centrado */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-5xl mx-auto w-full">
        {/* Badge superior */}
        <div className="mb-6 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
          v2.0 Disponible
        </div>

        {/* Título Hero con gradiente sutil si se desea, o texto sólido fuerte */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl">
          Gestión inteligente para tu <br className="hidden md:block" />
          <span className="text-primary">actividad ganadera</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Centraliza la información de tu campo. Administra terrenos, fierros,
          ganado y registros sanitarios en una plataforma moderna, sencilla y
          organizada.
        </p>

        {/* Área de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all"
          >
            <Link to="/auth/login">
              <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm"
          >
            <Link to="/auth/register">
              <UserPlus className="mr-2 h-4 w-4" /> Crear Cuenta
            </Link>
          </Button>
        </div>

        {/* Feature Highlights (Opcional - Iconos pequeños abajo para dar confianza) */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-70">
          <div className="flex flex-col items-center gap-2">
            <Tractor className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium">Control de Tierras</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Beef className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium">Trazabilidad Animal</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Stamp className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium">Registro de Marcas</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium">Reportes Claros</span>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t bg-background/50 backdrop-blur-sm">
        © {year} Sistema Ganadero — Todos los derechos reservados.
      </footer>
    </div>
  );
};
