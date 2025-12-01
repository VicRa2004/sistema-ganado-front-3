import { useState } from "react";
import {
  useGetCattles,
  useDeleteCattle,
} from "@/modules/cattle/infrastructure/hooks/use-cattle"; // Ajusta rutas

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
} from "@/ui/components/ui/alert-dialog";
import { LayoutGrid, Table as TableIcon, Plus } from "lucide-react";
import { Link } from "react-router";

import { CattleCard } from "./components/CattleCard";
import { CattleTable } from "./components/CattleTable";

export const IndexCattle = () => {
  // CAMBIO: Iniciamos en "table" como solicitaste
  const [view, setView] = useState<"card" | "table">("table");

  // Estado para el modal de eliminación
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Hook para obtener datos
  const { data, isPending, error } = useGetCattles({
    page: 1,
    limit: 10,
    // Aquí podrías agregar más filtros por defecto si quisieras
  });

  // Hook para eliminar
  const { mutate: deleteCattle } = useDeleteCattle();

  const items = data?.items ?? [];

  // Función para confirmar la eliminación
  const handleDeleteConfirm = () => {
    if (!deleteId) return;

    deleteCattle(deleteId); // Ejecutamos la mutación real
    setDeleteId(null); // Cerramos modal
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Ganado</h1>

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

      {/* Loading / Empty / Error */}
      {isPending && (
        <p className="text-muted-foreground text-sm">Cargando ganado...</p>
      )}
      {error && (
        <p className="text-destructive text-sm">Error al cargar datos.</p>
      )}
      {!isPending && !error && items.length === 0 && (
        <div className="text-center py-10 border rounded-lg bg-muted/10">
          <p className="text-muted-foreground">No hay ganado registrado.</p>
        </div>
      )}

      {/* Card View */}
      {view === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((cattle) => (
            <CattleCard
              key={cattle.id}
              cattle={cattle}
              onDelete={() => setDeleteId(cattle.id)}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <CattleTable cattles={items} onDelete={(id) => setDeleteId(id)} />
      )}

      {/* MODAL DE ELIMINACIÓN */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el registro del ganado y sus relaciones asociadas.
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
