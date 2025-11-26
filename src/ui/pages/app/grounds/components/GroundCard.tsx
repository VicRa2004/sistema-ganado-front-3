import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router";
import { Ground } from "@/modules/ground/domain/Ground";

interface GroundPros {
  ground: Ground;
}

export const GroundCard = ({ ground }: GroundPros) => {
  return (
    <Card className="border rounded-xl overflow-hidden">
      {/* Imagen */}
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
          <span className="font-semibold">Dimensiones:</span> {ground.width}m ×{" "}
          {ground.length}m
        </p>

        <p>
          <span className="font-semibold">Dirección:</span> {ground.address}
        </p>

        <p className="line-clamp-2">
          <span className="font-semibold">Notas:</span> {ground.notes || "—"}
        </p>

        <p className="text-xs text-muted-foreground">
          Creado: {new Date(ground.createdAt).toLocaleDateString()}
        </p>

        {/* acciones */}
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
  );
};
