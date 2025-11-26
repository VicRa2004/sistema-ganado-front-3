import { useState } from "react";
import { useGetGrounds } from "@/modules/ground/infrastructure/hooks/use-ground";

import { Toggle } from "@/ui/components/ui/toggle";
import { Button } from "@/ui/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui/components/ui/alert-dialog"; // Importamos el AlertDialog
import { LayoutGrid, Table as TableIcon, Plus } from "lucide-react";
import { Link } from "react-router";

import { GroundCard } from "./components/GroundCard";
import { GroundTable } from "./components/GroundTable";

export const IndexGround = () => {
  const [view, setView] = useState<"card" | "table">("card");
  // Estado para guardar el ID del elemento a eliminar. Si es null, el modal está cerrado.
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isPending, error } = useGetGrounds({
    page: 1,
    limit: 10,
  });

  const items = data?.items ?? [];

  // Función para confirmar la eliminación
  const handleDeleteConfirm = () => {
    if (!deleteId) return;

    // AQUÍ EJECUTAS TU LÓGICA DE ELIMINACIÓN (ej: hook de delete)
    console.log("Eliminando elemento con ID:", deleteId);

    // Cerramos el modal
    setDeleteId(null);
  };

  return (
    <div className="p-4 space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Terrenos</h1>

        <div className="flex items-center gap-3">
          <Link to="create">
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nuevo
            </Button>
          </Link>

          <div className="flex gap-2">
            <Toggle
              pressed={view === "card"}
              onPressedChange={() => setView("card")}
              aria-label="Card view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Toggle>

            <Toggle
              pressed={view === "table"}
              onPressedChange={() => setView("table")}
              aria-label="Table view"
            >
              <TableIcon className="h-4 w-4" />
            </Toggle>
          </div>
        </div>
      </div>

      {/* loading / empty */}
      {isPending && <p>Cargando...</p>}
      {error && <p>Error al cargar terrenos</p>}
      {!isPending && !error && items.length === 0 && (
        <p>No hay terrenos registrados.</p>
      )}

      {/* card view */}
      {view === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((ground) => (
            <GroundCard
              key={ground.id}
              ground={ground}
              // Pasamos la función para abrir el modal
              onDelete={() => setDeleteId(ground.id)}
            />
          ))}
        </div>
      )}

      {/* table view */}
      {view === "table" && (
        <GroundTable
          grounds={items}
          // Pasamos la función para abrir el modal
          onDelete={(id) => setDeleteId(id)}
        />
      )}

      {/* MODAL DE ELIMINACIÓN (AlertDialog) */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el terreno de la base de datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
