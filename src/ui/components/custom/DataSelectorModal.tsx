import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/ui/avatar";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";

interface DataSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  // Hook genérico que acepta paginación
  useDataHook: (params: {
    page: number;
    limit: number;
    [key: string]: any;
  }) => any;
  hookParams?: Record<string, any>; // Filtros extra (ej: gender: 'male')
  onSelect: (item: any) => void;
  displayKey: string; // Campo principal a mostrar (ej: name)
  extraKey?: string; // Campo secundario (ej: registrationNumber)
}

export const DataSelectorModal = ({
  isOpen,
  onClose,
  title,
  useDataHook,
  hookParams = {},
  onSelect,
  displayKey,
  extraKey,
}: DataSelectorModalProps) => {
  const [page, setPage] = useState(1);

  // Llamamos al hook pasando la página y los filtros extra
  const { data, isPending } = useDataHook({ page, limit: 5, ...hookParams });

  const items = data?.items || [];
  const totalPages = data?.meta?.totalPages || 1;

  const handleSelect = (item: any) => {
    onSelect(item);
    onClose(); // Cerramos automáticamente al seleccionar
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {isPending ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Cargando datos...
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No hay resultados disponibles.
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer transition-colors border border-transparent hover:border-border group"
                >
                  <Avatar className="h-10 w-10 border bg-background">
                    <AvatarImage src={item.image} />
                    <AvatarFallback className="text-[10px]">ID</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium truncate text-sm">
                      {item[displayKey]}
                    </p>
                    {extraKey && item[extraKey] && (
                      <p className="text-xs text-muted-foreground">
                        {item[extraKey]}
                      </p>
                    )}
                    {/* Badge condicional para terrenos */}
                    {item.width && (
                      <Badge
                        variant="outline"
                        className="text-[10px] mt-1 h-5 font-normal text-muted-foreground"
                      >
                        {item.width}x{item.length}m
                      </Badge>
                    )}
                  </div>
                  <Check className="h-4 w-4 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                </div>
              ))}
            </div>
          )}

          {/* Paginación */}
          <div className="flex items-center justify-between pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isPending}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            <span className="text-xs text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
              disabled={page >= totalPages || isPending}
            >
              Siguiente <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
