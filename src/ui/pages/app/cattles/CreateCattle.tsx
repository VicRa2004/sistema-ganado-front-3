import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

// Hooks
import {
  useCreateCattle,
  useGetCattles,
} from "@/modules/cattle/infrastructure/hooks/use-cattle";
import { useGetIrons } from "@/modules/iron/infrastructure/hooks/use-iron";
import { useGetGrounds } from "@/modules/ground/infrastructure/hooks/use-ground";

// UI Components
import { Input } from "@/ui/components/ui/input";
import { Textarea } from "@/ui/components/ui/textarea";
import { Button } from "@/ui/components/ui/button";
import { Label } from "@/ui/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/ui/components/ui/card";

// Custom Components (Los que acabamos de crear)
import { SelectionInput } from "@/ui/components/custom/SelectionInput";
import { DataSelectorModal } from "@/ui/components/custom/DataSelectorModal";

// --- SCHEMA (Fuera del componente para limpieza) ---
const schema = z.object({
  description: z.string().min(2, "Requerido"),
  registrationNumber: z.string().min(1, "Requerido"),
  lotNumber: z.string().min(1, "Requerido"),
  gender: z.enum(["male", "female"]),
  color: z.string().min(2, "Requerido"),
  birthdate: z.string().refine((d) => !isNaN(Date.parse(d)), "Fecha inválida"),
  idRace: z.number().min(1, "Requerido"),
  observations: z.string(),
  idGround: z.number().optional(),
  idIron: z.number().optional(),
  idFather: z.number().optional(),
  idMother: z.number().optional(),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

export const CreateCattle = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error: createError } = useCreateCattle();

  // Estado unificado para modales y nombres visuales
  const [activeModal, setActiveModal] = useState<
    "ground" | "iron" | "father" | "mother" | null
  >(null);
  const [displayNames, setDisplayNames] = useState({
    ground: "",
    iron: "",
    father: "",
    mother: "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      registrationNumber: "",
      lotNumber: "",
      gender: "male",
      color: "",
      birthdate: "",
      idRace: 0,
      observations: "",
    },
  });

  // Helper para asignar valor al form + actualizar UI visual
  const handleSelection = (
    key: keyof typeof displayNames,
    id: number,
    name: string
  ) => {
    // Mapeo de keys visuales a campos del formulario
    const formFieldMap: Record<string, any> = {
      ground: "idGround",
      iron: "idIron",
      father: "idFather",
      mother: "idMother",
    };

    form.setValue(formFieldMap[key], id);
    setDisplayNames((prev) => ({ ...prev, [key]: name }));
    setActiveModal(null); // Cierra el modal
  };

  const clearSelection = (key: keyof typeof displayNames) => {
    const formFieldMap: Record<string, any> = {
      ground: "idGround",
      iron: "idIron",
      father: "idFather",
      mother: "idMother",
    };
    form.setValue(formFieldMap[key], undefined);
    setDisplayNames((prev) => ({ ...prev, [key]: "" }));
  };

  const onSubmit = (values: FormValues) => {
    mutate(
      {
        ...values,
        birthdate: new Date(values.birthdate),
        status: true,
        idUser: 1,
        image: values.image?.[0] ?? undefined,
      },
      {
        onSuccess: () => navigate("/cattle"),
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Registrar Ganado</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* --- BLOQUE 1: DATOS BÁSICOS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <Label>Descripción</Label>
                <Input
                  {...form.register("description")}
                  placeholder="Ej. Vaca Holstein"
                />
                <p className="text-xs text-red-500">
                  {form.formState.errors.description?.message}
                </p>
              </div>

              <div className="space-y-1">
                <Label>Registro</Label>
                <Input
                  {...form.register("registrationNumber")}
                  placeholder="REG-001"
                />
              </div>

              <div className="space-y-1">
                <Label>Lote</Label>
                <Input {...form.register("lotNumber")} placeholder="Lote A" />
              </div>

              <div className="space-y-1">
                <Label>Género</Label>
                <select
                  className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
                  {...form.register("gender")}
                >
                  <option value="male">Macho</option>
                  <option value="female">Hembra</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label>Raza (ID)</Label>
                <Input
                  type="number"
                  {...form.register("idRace", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-1">
                <Label>Color</Label>
                <Input {...form.register("color")} />
              </div>

              <div className="space-y-1">
                <Label>Nacimiento</Label>
                <Input type="date" {...form.register("birthdate")} />
              </div>
            </div>

            {/* --- BLOQUE 2: RELACIONES (Usando componentes custom) --- */}
            <div className="p-4 bg-muted/20 rounded-lg border border-dashed space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground">
                Ubicación y Genealogía
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectionInput
                  label="Terreno"
                  value={displayNames.ground}
                  onOpen={() => setActiveModal("ground")}
                  onClear={() => clearSelection("ground")}
                />

                <SelectionInput
                  label="Fierro"
                  value={displayNames.iron}
                  onOpen={() => setActiveModal("iron")}
                  onClear={() => clearSelection("iron")}
                />

                <SelectionInput
                  label="Padre"
                  value={displayNames.father}
                  onOpen={() => setActiveModal("father")}
                  onClear={() => clearSelection("father")}
                />

                <SelectionInput
                  label="Madre"
                  value={displayNames.mother}
                  onOpen={() => setActiveModal("mother")}
                  onClear={() => clearSelection("mother")}
                />
              </div>
            </div>

            {/* --- BLOQUE 3: EXTRAS --- */}
            <div className="space-y-1">
              <Label>Observaciones</Label>
              <Textarea {...form.register("observations")} />
            </div>

            <div className="space-y-1">
              <Label>Imagen</Label>
              <Input type="file" accept="image/*" {...form.register("image")} />
            </div>

            {createError && (
              <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                Error al guardar.
              </div>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Guardando..." : "Registrar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* --- MODALES RENDERIZADOS CONDICIONALMENTE --- */}

      <DataSelectorModal
        title="Seleccionar Terreno"
        isOpen={activeModal === "ground"}
        onClose={() => setActiveModal(null)}
        useDataHook={useGetGrounds}
        displayKey="name"
        onSelect={(item) => handleSelection("ground", item.id, item.name)}
      />

      <DataSelectorModal
        title="Seleccionar Fierro"
        isOpen={activeModal === "iron"}
        onClose={() => setActiveModal(null)}
        useDataHook={useGetIrons}
        displayKey="name"
        onSelect={(item) => handleSelection("iron", item.id, item.name)}
      />

      <DataSelectorModal
        title="Seleccionar Padre"
        isOpen={activeModal === "father"}
        onClose={() => setActiveModal(null)}
        useDataHook={useGetCattles}
        hookParams={{ gender: "male" }} // Filtro automático
        displayKey="description"
        extraKey="registrationNumber"
        onSelect={(item) =>
          handleSelection("father", item.id, item.description)
        }
      />

      <DataSelectorModal
        title="Seleccionar Madre"
        isOpen={activeModal === "mother"}
        onClose={() => setActiveModal(null)}
        useDataHook={useGetCattles}
        hookParams={{ gender: "female" }} // Filtro automático
        displayKey="description"
        extraKey="registrationNumber"
        onSelect={(item) =>
          handleSelection("mother", item.id, item.description)
        }
      />
    </div>
  );
};
