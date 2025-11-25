import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/ui/components/ui/navigation-menu";
import { Button } from "@/ui/components/ui/button";
import { useAuthStore } from "@/modules/auth/infrastructure/auth.store"; // ejemplo de store

export const Navigation = () => {
  const user = useAuthStore((state) => state.user); // si user existe, está logeado

  console.log(user);

  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between bg-white">
      {/* logo */}
      <Link to="/" className="text-xl font-bold">
        GanadoAPP
      </Link>

      {/* navegación */}
      <NavigationMenu>
        <NavigationMenuList>
          {/* SI NO hay usuario → login / register */}
          {!user && (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/login" className="px-3 py-2 hover:text-primary">
                    Iniciar sesión
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/register" className="px-3 py-2 hover:text-primary">
                    Registrarse
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}

          {/* SI hay usuario → navegación de la app ganadera */}
          {user && (
            <>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Catálogos</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3 grid gap-2">
                  <NavigationMenuLink asChild>
                    <Link to="/terrenos" className="hover:text-primary">
                      Terrenos
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/fierros" className="hover:text-primary">
                      Fierros
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/ganado" className="hover:text-primary">
                      Ganado
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/crias" className="hover:text-primary">
                      Registro de crías
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* menú de usuario */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>{user.fullName}</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3 flex flex-col gap-2 w-40">
                  <NavigationMenuLink asChild>
                    <Link to="/perfil" className="hover:text-primary">
                      Perfil
                    </Link>
                  </NavigationMenuLink>

                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={() => alert("Saliendo")}
                  >
                    Cerrar sesión
                  </Button>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
