import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/ui/components/ui/table";
import { Button } from "@/ui/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router";
import { Ground } from "@/modules/ground/domain/Ground";

interface GroundTableProps {
  grounds: Ground[];
}

export const GroundTable = ({ grounds }: GroundTableProps) => {
  return (
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
          {grounds.map((ground) => (
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
  );
};
