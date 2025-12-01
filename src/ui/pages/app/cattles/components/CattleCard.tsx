import { Link } from "react-router";
import {
  Pencil,
  Trash2,
  Tag,
  Dna,
  FileText,
  Image as ImageIcon,
  PawPrint,
} from "lucide-react";

import { Card, CardContent, CardFooter } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import { Cattle } from "@/modules/cattle/domain/Cattle"; // Ajusta la ruta a tu dominio

interface CattleProps {
  cattle: Cattle;
  onDelete: () => void;
}

export const CattleCard = ({ cattle, onDelete }: CattleProps) => {
  // Lógica de color para género
  const genderColor =
    cattle.gender === "male"
      ? "bg-blue-500/10 text-blue-600 border-blue-200"
      : "bg-pink-500/10 text-pink-600 border-pink-200";

  console.log(cattle);

  const genderLabel = cattle.gender === "male" ? "Macho" : "Hembra";

  return (
    <Card className="group overflow-hidden border-muted/60 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 flex flex-col h-full">
      {/* SECCIÓN DE IMAGEN */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {cattle.image ? (
          <img
            src={cattle.image}
            alt={cattle.description}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50 text-muted-foreground">
            <ImageIcon className="h-10 w-10 opacity-20" />
          </div>
        )}

        {/* Badges Flotantes: Raza y Género */}
        <div className="absolute bottom-2 left-2 flex gap-2">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm shadow-sm text-xs font-medium px-2 py-0.5 border-white/20"
          >
            <Dna className="mr-1.5 h-3 w-3 text-primary" />
            {cattle.race?.name || "Sin raza"}
          </Badge>
          <Badge
            variant="outline"
            className={`backdrop-blur-sm shadow-sm text-xs font-medium px-2 py-0.5 border ${genderColor}`}
          >
            {genderLabel}
          </Badge>
        </div>

        {/* Badge de Estado (si está activo o no) */}
        <div className="absolute top-2 right-2">
          <Badge
            variant={cattle.status ? "default" : "destructive"}
            className="text-[10px] h-5 px-1.5"
          >
            {cattle.status ? "Activo" : "Inactivo"}
          </Badge>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <CardContent className="flex-1 p-5 space-y-4">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-lg tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {cattle.description}
            </h3>
          </div>

          {/* Identificadores */}
          <div className="flex flex-wrap items-center mt-2 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center" title="Número de Registro">
              <Tag className="mr-1.5 h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
              <span className="font-mono text-xs">
                {cattle.registrationNumber}
              </span>
            </div>
            <div className="flex items-center" title="Número de Lote">
              <span className="text-xs border px-1 rounded bg-muted/20">
                Lote: {cattle.lotNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Separador sutil o notas */}
        {cattle.observations && (
          <div className="rounded-md bg-muted/30 p-2.5 text-xs text-muted-foreground/80 border border-muted/40">
            <div className="flex items-start gap-2">
              <FileText className="h-3.5 w-3.5 mt-0.5 opacity-70 shrink-0" />
              <p className="line-clamp-2 italic leading-relaxed">
                "{cattle.observations}"
              </p>
            </div>
          </div>
        )}
      </CardContent>

      {/* FOOTER DE ACCIONES */}
      <CardFooter className="p-4 pt-3 border-t bg-muted/10 flex items-center justify-between gap-4">
        {/* Fecha de nacimiento */}
        <div
          className="flex items-center text-xs text-muted-foreground/70"
          title="Fecha de nacimiento"
        >
          <PawPrint className="mr-1.5 h-3.5 w-3.5" />
          {new Date(cattle.birthdate).toLocaleDateString()}
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <Link to={`update/${cattle.id}`}>
              <Pencil className="h-4 w-4 mr-1.5" />
              <span className="text-xs font-medium">Editar</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
