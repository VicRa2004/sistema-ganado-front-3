import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";

// Hooks
import {
  useUpdateCattle, // <--- Hook de actualización
  useGetCattle, // <--- Hook para obtener datos (asumiendo que existe igual que useGetGround)
  useGetCattles,
} from "@/modules/cattle/infrastructure/hooks/use-cattle";
import { useGetIrons } from "@/modules/iron/infrastructure/hooks/use-iron";
import { useGetGrounds } from "@/modules/ground/infrastructure/hooks/use-ground";
import { useGetRaces } from "@/modules/race/infrastructure/hooks/use-race";

// UI Components
import { Input } from "@/ui/components/ui/input";
import { Textarea } from "@/ui/components/ui/textarea";
import { Button } from "@/ui/components/ui/button";
import { Label } from "@/ui/components/ui/label";
import { Skeleton } from "@/ui/components/ui/skeleton"; // <--- Para el estado de carga
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/ui/components/ui/card";

// Custom Components
import { SelectionInput } from "@/ui/components/custom/SelectionInput";
import { DataSelectorModal } from "@/ui/components/custom/DataSelectorModal";

// --- SCHEMA (Similar al Create, pero adaptado si fuera necesario) ---
const schema = z.object({
  description: z.string().min(2, "Requerido"),
  registrationNumber: z.string().min(1, "Requerido"),
  lotNumber: z.string().min(1, "Requerido"),
  gender: z.enum(["male", "female"]),
  color: z.string().min(2, "Requerido"),
  birthdate: z.string().refine((d) => !isNaN(Date.parse(d)), "Fecha inválida"),
  idRace: z.number().min(1, "Requerido"),
  observations: z.string().optional(), // Cambiado a optional para update
  idGround: z.number().optional(),
  idIron: z.number().optional(),
  idFather: z.number().optional(),
  idMother: z.number().optional(),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

export const UpdateCattle = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  // 1. Obtener datos y hook de update
  const { data, error, isPending: isLoadingData } = useGetCattle(id);
  const { mutate, isPending: isUpdating } = useUpdateCattle();

  // Estado unificado para modales
  const [activeModal, setActiveModal] = useState<
    "ground" | "iron" | "father" | "mother" | "race" | null
  >(null);

  // Nombres visuales
  const [displayNames, setDisplayNames] = useState({
    ground: "",
    iron: "",
    father: "",
    mother: "",
    race: "",
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

  // 2. Efecto para cargar los datos en el formulario cuando llegan del backend
  useEffect(() => {
    if (data) {
      // a) Formatear fecha para input type="date" (YYYY-MM-DD)
      const formattedDate = data.birthdate
        ? new Date(data.birthdate).toISOString().split("T")[0]
        : "";

      // b) Actualizar los nombres visuales para los selectores
      setDisplayNames({
        race: data.race?.name || "",
        ground: data.ground?.name || "",
        iron: data.iron?.name || "",
        // Nota: El objeto 'father' y 'mother' en la interfaz Cattle
        // tiene registrationNumber, usaremos eso como label visual inicial.
        father: data.father?.registrationNumber || "",
        mother: data.mother?.registrationNumber || "",
      });

      // c) Resetear el formulario con los valores e IDs
      form.reset({
        description: data.description,
        registrationNumber: data.registrationNumber,
        lotNumber: data.lotNumber,
        gender: data.gender, // Asegúrate que el backend devuelva "male"|"female"
        color: data.color,
        birthdate: formattedDate,
        observations: data.observations || "",
        idRace: data.idRace,
        idGround: data.idGround,
        idIron: data.idIron,
        idFather: data.idFather,
        idMother: data.idMother,
      });
    }
  }, [data, form]);

  // Helper para asignar valor al form + actualizar UI visual
  const handleSelection = (
    key: keyof typeof displayNames,
    id: number,
    name: string
  ) => {
    const formFieldMap: Record<string, any> = {
      ground: "idGround",
      iron: "idIron",
      father: "idFather",
      mother: "idMother",
      race: "idRace",
    };

    form.setValue(formFieldMap[key], id, { shouldValidate: true });
    setDisplayNames((prev) => ({ ...prev, [key]: name }));
    setActiveModal(null);
  };

  const clearSelection = (key: keyof typeof displayNames) => {
    const formFieldMap: Record<string, any> = {
      ground: "idGround",
      iron: "idIron",
      father: "idFather",
      mother: "idMother",
      race: "idRace",
    };
    form.setValue(formFieldMap[key], key === "race" ? 0 : undefined);
    setDisplayNames((prev) => ({ ...prev, [key]: "" }));
  };

  const onSubmit = (values: FormValues) => {
    // Preparar objeto para enviar
    const payload = {
      id, // Importante: enviar el ID
      ...values,
      birthdate: new Date(values.birthdate),
      // Solo enviamos imagen si es un File nuevo (array de files del input)
      image: values.image instanceof FileList ? values.image[0] : undefined,
    };

    mutate(payload, {
      onSuccess: () => navigate("/app/cattle"),
      onError: (err) => console.log(err),
    });
  };

  // 3. Manejo de estados de carga y error (Estilo Skeleton)
  if (isLoadingData)
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    );

  if (error)
    return (
      <p className="text-center p-4">Error al cargar los datos del ganado.</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Actualizar Ganado</CardTitle>
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
                <SelectionInput
                  label="Raza"
                  value={displayNames.race}
                  onOpen={() => setActiveModal("race")}
                  onClear={() => clearSelection("race")}
                />
                <p className="text-xs text-red-500">
                  {form.formState.errors.idRace?.message}
                </p>
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

            {/* --- BLOQUE 2: RELACIONES --- */}
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
              <Label>Actualizar Imagen (Opcional)</Label>
              <Input type="file" accept="image/*" {...form.register("image")} />
              {/* Podrías mostrar una miniatura de la imagen actual aquí si existe en data.image */}
            </div>

            <Button type="submit" disabled={isUpdating} className="w-full">
              {isUpdating ? "Actualizando..." : "Guardar Cambios"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* --- MODALES --- */}

      <DataSelectorModal
        title="Seleccionar Raza"
        isOpen={activeModal === "race"}
        onClose={() => setActiveModal(null)}
        useDataHook={useGetRaces}
        displayKey="name"
        onSelect={(item) => handleSelection("race", item.id, item.name)}
      />

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
        hookParams={{ gender: "male" }}
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
        hookParams={{ gender: "female" }}
        displayKey="description"
        extraKey="registrationNumber"
        onSelect={(item) =>
          handleSelection("mother", item.id, item.description)
        }
      />
    </div>
  );
};
