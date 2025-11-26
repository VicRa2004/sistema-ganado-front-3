import { useState } from "react";
import { useGetGrounds } from "@/modules/ground/infrastructure/hooks/use-ground";

import { Toggle } from "@/ui/components/ui/toggle";
import { Button } from "@/ui/components/ui/button";
import { LayoutGrid, Table as TableIcon, Plus } from "lucide-react";
import { Link } from "react-router";

import { GroundCard } from "./components/GroundCard";
import { GroundTable } from "./components/GroundTable";

export const IndexGround = () => {
  const [view, setView] = useState<"card" | "table">("card");

  const { data, isPending, error } = useGetGrounds({
    page: 1,
    limit: 10,
  });

  const items = data?.items ?? [];

  return (
    <div className="p-4 space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Terrenos</h1>

        <div className="flex items-center gap-3">
          <Link to="create">
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nuevo
            </Button>
          </Link>

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

      {/* loading / empty */}
      {isPending && <p>Cargando...</p>}
      {error && <p>Error al cargar terrenos</p>}
      {!isPending && !error && items.length === 0 && (
        <p>No hay terrenos registrados.</p>
      )}

      {/* card view */}
      {view === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((ground) => (
            <GroundCard key={ground.id} ground={ground} />
          ))}
        </div>
      )}

      {/* table view */}
      {view === "table" && <GroundTable grounds={items} />}
    </div>
  );
};
