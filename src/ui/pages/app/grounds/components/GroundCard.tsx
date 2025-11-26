import { Link } from "react-router";
import {
  Pencil,
  Trash2,
  MapPin,
  Ruler,
  Calendar,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

import { Card, CardContent, CardFooter } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import { Ground } from "@/modules/ground/domain/Ground";

interface GroundProps {
  ground: Ground;
  onDelete: () => void;
}

export const GroundCard = ({ ground, onDelete }: GroundProps) => {
  // Calculamos el área total para mostrar un dato extra útil
  const area = (Number(ground.width) * Number(ground.length)).toLocaleString();

  return (
    <Card className="group overflow-hidden border-muted/60 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 flex flex-col h-full">
      {/* SECCIÓN DE IMAGEN */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {ground.image ? (
          <img
            src={ground.image}
            alt={ground.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50 text-muted-foreground">
            <ImageIcon className="h-10 w-10 opacity-20" />
          </div>
        )}

        {/* Badge Flotante: Dimensiones */}
        <div className="absolute bottom-2 left-2 flex gap-2">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm shadow-sm text-xs font-medium px-2 py-0.5 border-white/20"
          >
            <Ruler className="mr-1.5 h-3 w-3 text-primary" />
            {ground.width}m × {ground.length}m
          </Badge>
          <Badge
            variant="secondary"
            className="hidden sm:inline-flex bg-background/90 backdrop-blur-sm shadow-sm text-xs font-medium px-2 py-0.5 border-white/20"
          >
            {area} m²
          </Badge>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <CardContent className="flex-1 p-5 space-y-4">
        <div>
          <h3 className="font-semibold text-lg tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {ground.name}
          </h3>

          {/* Ubicación */}
          <div className="flex items-center mt-1.5 text-sm text-muted-foreground">
            <MapPin className="mr-1.5 h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
            <span className="line-clamp-1">{ground.address}</span>
          </div>
        </div>

        {/* Separador sutil o notas */}
        {ground.notes && (
          <div className="rounded-md bg-muted/30 p-2.5 text-xs text-muted-foreground/80 border border-muted/40">
            <div className="flex items-start gap-2">
              <FileText className="h-3.5 w-3.5 mt-0.5 opacity-70 shrink-0" />
              <p className="line-clamp-2 italic leading-relaxed">
                "{ground.notes}"
              </p>
            </div>
          </div>
        )}
      </CardContent>

      {/* FOOTER DE ACCIONES */}
      <CardFooter className="p-4 pt-3 border-t bg-muted/10 flex items-center justify-between gap-4">
        {/* Fecha de creación */}
        <div
          className="flex items-center text-xs text-muted-foreground/70"
          title="Fecha de registro"
        >
          <Calendar className="mr-1.5 h-3.5 w-3.5" />
          {new Date(ground.createdAt).toLocaleDateString()}
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <Link to={`update/${ground.id}`}>
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
