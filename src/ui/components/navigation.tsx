import { Link } from "react-router";
import {
  Tractor,
  Beef,
  Stamp,
  Baby,
  LogOut,
  User,
  LayoutDashboard,
  Settings,
} from "lucide-react";

// Componentes UI
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/ui/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/ui/dropdown-menu";
import { Button } from "@/ui/components/ui/button";
import { Avatar, AvatarFallback } from "@/ui/components/ui/avatar";

// Store y otros
import { useAuthStore } from "@/modules/auth/infrastructure/auth.store";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/ui/lib/utils";
import React from "react";
import { useLogout } from "@/modules/auth/infrastructure/hooks/use-auth";

export const Navigation = () => {
  const user = useAuthStore((state) => state.user);
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  // Función para obtener iniciales (Ej: "Juan Perez" -> "JP")
  const getInitials = (name?: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-6">
        {/* LOGO E IDENTIDAD */}
        <div className="mr-8 flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-90"
          >
            <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
              <Beef className="h-6 w-6 text-primary" />
            </div>
            <span className="hidden font-bold sm:inline-block text-lg tracking-tight">
              GanadoAPP
            </span>
          </Link>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <div className="flex-1 flex items-center">
          {user && (
            <NavigationMenu>
              <NavigationMenuList>
                {/* Link Directo al Dashboard */}
                <NavigationMenuItem>
                  <Link to="/app" className={navigationMenuTriggerStyle()}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </NavigationMenuItem>

                {/* Menú Desplegable Gestión */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Gestión</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-muted/80 transition-colors"
                            to="/app/cattle"
                          >
                            <div className="bg-primary/10 w-fit p-2 rounded-md mb-2">
                              <Beef className="h-6 w-6 text-primary" />
                            </div>
                            <div className="mb-2 text-lg font-medium">
                              Ganado
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Control total de tu hato, inventario y
                              movimientos.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>

                      <ListItem
                        href="/app/ground"
                        title="Terrenos"
                        icon={<Tractor className="h-4 w-4" />}
                      >
                        Administra parcelas y ubicaciones.
                      </ListItem>
                      <ListItem
                        href="/app/iron"
                        title="Fierros"
                        icon={<Stamp className="h-4 w-4" />}
                      >
                        Registro de marcas y señalética.
                      </ListItem>
                      <ListItem
                        href="/app/crias"
                        title="Crías"
                        icon={<Baby className="h-4 w-4" />}
                      >
                        Nacimientos y destetes.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        {/* ZONA DERECHA */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          {!user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/auth/login">Ingresar</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register">Crear cuenta</Link>
              </Button>
            </div>
          ) : (
            /* Dropdown de Perfil Mejorado */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full focus-visible:ring-1 focus-visible:ring-offset-1"
                >
                  <Avatar className="h-9 w-9 border transition-shadow hover:shadow-md">
                    {/* Intentamos cargar la imagen */}

                    {/* Fallback Estilizado */}
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold text-xs">
                      {user.fullName ? (
                        getInitials(user.fullName)
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none truncate">
                      {user.fullName || "Usuario"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/perfil"
                    className="cursor-pointer w-full flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/app/settings"
                    className="cursor-pointer w-full flex items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

// Componente auxiliar ListItem
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href!}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none group-hover:text-primary transition-colors">
            {icon && (
              <span className="text-muted-foreground group-hover:text-primary">
                {icon}
              </span>
            )}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5 ml-6">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
