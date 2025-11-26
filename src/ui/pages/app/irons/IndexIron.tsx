import { useState } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";

// Hooks de infraestructura (asegúrate de que la ruta sea correcta según tu proyecto)
import {
  useGetIrons,
  useDeleteIron,
} from "@/modules/iron/infrastructure/hooks/use-iron";

// Componentes UI
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

// Componente de Tarjeta
import { IronCard } from "./components/IronCard";

export const IndexIron = () => {
  // Estado para el modal de eliminación
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Hook para obtener datos
  const { data, isPending, error } = useGetIrons({
    page: 1,
    limit: 10,
  });

  // Hook para eliminar
  const { mutate: deleteIron } = useDeleteIron();

  const items = data?.items ?? [];

  // Función para confirmar la eliminación
  const handleDeleteConfirm = () => {
    if (!deleteId) return;

    // Ejecutamos la mutación de react-query
    deleteIron(deleteId);

    // Cerramos el modal
    setDeleteId(null);
  };

  return (
    <div className="p-4 space-y-4">
      {/* HEADER: Solo título y botón de crear (sin toggles) */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Fierros</h1>

        <Link to="create">
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Nuevo
          </Button>
        </Link>
      </div>

      {/* ESTADOS DE CARGA / ERROR */}
      {isPending && <p>Cargando...</p>}
      {error && <p>Error al cargar fierros</p>}
      {!isPending && !error && items.length === 0 && (
        <p>No hay fierros registrados.</p>
      )}

      {/* CARD VIEW (Única vista disponible) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((iron) => (
          <IronCard
            key={iron.id}
            iron={iron}
            // Al hacer click en basura, guardamos el ID y se abre el modal
            onDelete={() => setDeleteId(iron.id)}
          />
        ))}
      </div>

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
              el fierro de la base de datos.
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
