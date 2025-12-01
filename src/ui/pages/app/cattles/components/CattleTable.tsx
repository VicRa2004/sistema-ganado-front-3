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
import { Pencil, Trash, MapPin } from "lucide-react"; // Agregué MapPin para el terreno
import { Link } from "react-router";
import { Cattle } from "@/modules/cattle/domain/Cattle";

interface CattleTableProps {
  cattles: Cattle[];
  onDelete: (id: number) => void;
}

export const CattleTable = ({ cattles, onDelete }: CattleTableProps) => {
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[60px]">Img</TableHead>
            <TableHead>Identificación</TableHead>
            {/* Nuevas Columnas */}
            <TableHead>Fierro</TableHead>
            <TableHead>Raza</TableHead>
            <TableHead>Terreno</TableHead>
            {/* Fin Nuevas Columnas */}
            <TableHead>Género</TableHead>
            <TableHead>Nacimiento</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cattles.map((cattle) => (
            <TableRow key={cattle.id} className="hover:bg-muted/5">
              {/* 1. Avatar de la Vaca */}
              <TableCell>
                <Avatar className="h-10 w-10 rounded-md border">
                  <AvatarImage
                    src={cattle.image}
                    alt={cattle.description}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-md bg-slate-200">
                    GN
                  </AvatarFallback>
                </Avatar>
              </TableCell>

              {/* 2. Identificación */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    {cattle.description}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Reg: {cattle.registrationNumber}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Lote: {cattle.lotNumber}
                  </span>
                </div>
              </TableCell>

              {/* 3. Fierro (Nuevo) */}
              <TableCell>
                <div
                  className="flex items-center gap-2"
                  title={cattle.iron?.name}
                >
                  {cattle.iron?.image ? (
                    <img
                      src={cattle.iron.image}
                      alt={cattle.iron.name}
                      className="h-8 w-8 object-contain rounded-sm border bg-white"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      {cattle.iron?.name || "S/F"}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* 4. Raza (Mejorado) */}
              <TableCell>
                <span className="font-medium text-sm">
                  {cattle.race?.name || "Sin raza"}
                </span>
              </TableCell>

              {/* 5. Terreno (Nuevo) */}
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{cattle.ground?.name || "Sin asignar"}</span>
                </div>
              </TableCell>

              {/* 6. Género */}
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    cattle.gender === "male"
                      ? "border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100"
                      : "border-pink-200 text-pink-700 bg-pink-50 hover:bg-pink-100"
                  }
                >
                  {cattle.gender === "male" ? "Macho" : "Hembra"}
                </Badge>
              </TableCell>

              {/* 7. Nacimiento */}
              <TableCell className="text-sm">
                {new Date(cattle.birthdate).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>

              {/* 8. Estado */}
              <TableCell>
                <Badge
                  variant={cattle.status ? "default" : "destructive"}
                  className={`text-[10px] ${
                    cattle.status ? "bg-green-600 hover:bg-green-700" : ""
                  }`}
                >
                  {cattle.status ? "Activo" : "Baja"}
                </Badge>
              </TableCell>

              {/* 9. Acciones */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link to={`update/${cattle.id}`}>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete(cattle.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
