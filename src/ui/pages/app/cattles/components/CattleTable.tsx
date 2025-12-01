import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/ui/components/ui/table";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/ui/avatar";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router";
import { Cattle } from "@/modules/cattle/domain/Cattle";

interface CattleTableProps {
  cattles: Cattle[];
  onDelete: (id: number) => void;
}

export const CattleTable = ({ cattles, onDelete }: CattleTableProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Img</TableHead>
            <TableHead>Identificación</TableHead>
            <TableHead>Raza</TableHead>
            <TableHead>Género</TableHead>
            <TableHead>Nacimiento</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cattles.map((cattle) => (
            <TableRow key={cattle.id}>
              {/* Avatar pequeño de la imagen */}
              <TableCell>
                <Avatar className="h-9 w-9 rounded-md">
                  <AvatarImage src={cattle.image} alt={cattle.description} />
                  <AvatarFallback className="rounded-md">CN</AvatarFallback>
                </Avatar>
              </TableCell>

              {/* Identificación (Descripción + Registro) */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{cattle.description}</span>
                  <span className="text-xs text-muted-foreground">
                    Reg: {cattle.registrationNumber}
                  </span>
                </div>
              </TableCell>

              <TableCell>{cattle.race?.name || "—"}</TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    cattle.gender === "male"
                      ? "border-blue-200 text-blue-600 bg-blue-50"
                      : "border-pink-200 text-pink-600 bg-pink-50"
                  }
                >
                  {cattle.gender === "male" ? "Macho" : "Hembra"}
                </Badge>
              </TableCell>

              <TableCell>
                {new Date(cattle.birthdate).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <Badge
                  variant={cattle.status ? "secondary" : "destructive"}
                  className="text-[10px]"
                >
                  {cattle.status ? "Activo" : "Baja"}
                </Badge>
              </TableCell>

              <TableCell className="text-right space-x-2">
                <Link to={`update/${cattle.id}`}>
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
                  onClick={() => onDelete(cattle.id)}
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
