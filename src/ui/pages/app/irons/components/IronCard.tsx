import { Link } from "react-router";
import { Pencil, Trash2, Calendar, Image as ImageIcon } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Iron } from "@/modules/iron/domain/Iron"; // Asegúrate de que la ruta sea correcta

interface IronProps {
  iron: Iron;
  onDelete: () => void;
}

export const IronCard = ({ iron, onDelete }: IronProps) => {
  return (
    <Card className="group overflow-hidden border-muted/60 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 flex flex-col h-full">
      {/* SECCIÓN DE IMAGEN */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {iron.image ? (
          <img
            src={iron.image}
            alt={iron.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50 text-muted-foreground">
            <ImageIcon className="h-10 w-10 opacity-20" />
          </div>
        )}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <CardContent className="flex-1 p-5">
        <div>
          <h3 className="font-semibold text-lg tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {iron.name}
          </h3>
          {/* Iron no tiene dirección ni notas, por lo que esta sección es más simple */}
        </div>
      </CardContent>

      {/* FOOTER DE ACCIONES */}
      <CardFooter className="p-4 pt-3 border-t bg-muted/10 flex items-center justify-between gap-4">
        {/* Fecha de creación */}
        <div
          className="flex items-center text-xs text-muted-foreground/70"
          title="Fecha de registro"
        >
          <Calendar className="mr-1.5 h-3.5 w-3.5" />
          {new Date(iron.createdAt).toLocaleDateString()}
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <Link to={`update/${iron.id}`}>
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
