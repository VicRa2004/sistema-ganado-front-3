import { useState } from "react";
import { useGetGrounds } from "@/modules/ground/infrastructure/hooks/use-ground";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/ui/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/ui/components/ui/table";
import { Toggle } from "@/ui/components/ui/toggle";
import { Button } from "@/ui/components/ui/button";
import {
  LayoutGrid,
  Table as TableIcon,
  Pencil,
  Trash,
  Plus,
} from "lucide-react";
import { Link } from "react-router";

export const IndexGround = () => {
  const [view, setView] = useState<"card" | "table">("card");

  // lógica intacta
  const { data, isPending, error } = useGetGrounds({
    page: 1,
    limit: 10,
  });

  const items = data?.items ?? [];
  const itemsToDisplay = view === "card" ? items.slice(0, 10) : items;

  return (
    <div className="p-4 space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Terrenos</h1>

        <div className="flex items-center gap-3">
          {/* botón crear */}
          <Link to="create">
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nuevo
            </Button>
          </Link>

          {/* selector card / table */}
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

      {/* loading */}
      {isPending && <p>Cargando...</p>}
      {error && <p>Error al cargar terrenos</p>}

      {!isPending && !error && items.length === 0 && (
        <p>No hay terrenos registrados.</p>
      )}

      {/* Vista Card */}
      {view === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {itemsToDisplay.map((ground) => (
            <Card key={ground.id} className="border rounded-xl overflow-hidden">
              {/* Imagen si existe */}
              {ground.image ? (
                <img
                  src={ground.image}
                  alt={ground.name}
                  className="w-full h-36 object-cover"
                />
              ) : (
                <img
                  src="default-ground.png"
                  alt={ground.name}
                  className="w-full h-36 object-cover"
                />
              )}

              <CardHeader>
                <CardTitle>{ground.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Dimensiones:</span>{" "}
                  {ground.width}m × {ground.length}m
                </p>

                <p>
                  <span className="font-semibold">Dirección:</span>{" "}
                  {ground.address}
                </p>

                <p className="line-clamp-2">
                  <span className="font-semibold">Notas:</span>{" "}
                  {ground.notes || "—"}
                </p>

                <p className="text-xs text-muted-foreground">
                  Creado: {new Date(ground.createdAt).toLocaleDateString()}
                </p>

                {/* botones acciones */}
                <div className="flex justify-end gap-2 pt-2">
                  <Link to={`update/${ground.id}`}>
                    <Button size="sm" className="flex items-center gap-1">
                      <Pencil className="h-4 w-4" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex items-center gap-1"
                  >
                    <Trash className="h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Vista Table */}
      {view === "table" && (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Dimensiones</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Notas</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((ground) => (
                <TableRow key={ground.id}>
                  <TableCell>{ground.name}</TableCell>
                  <TableCell>
                    {ground.width}m × {ground.length}m
                  </TableCell>
                  <TableCell>{ground.address}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {ground.notes || "—"}
                  </TableCell>
                  <TableCell>
                    {new Date(ground.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* acciones */}
                  <TableCell className="text-right space-x-2">
                    <Link to={`update/${ground.id}`}>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="inline-flex items-center gap-1"
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="inline-flex items-center gap-1"
                    >
                      <Trash className="h-4 w-4" />
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
