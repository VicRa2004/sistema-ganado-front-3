import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateGround } from "@/modules/ground/infrastructure/hooks/use-ground";

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

const schema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  width: z.number().min(1, "El ancho debe ser mayor a 0"),
  length: z.number().min(1, "El largo debe ser mayor a 0"),
  address: z.string().min(3, "La dirección es obligatoria"),
  notes: z.string().min(2, "Las notas son obligatorias"),
  image: z.any().optional(), // file
});

type FormValues = z.infer<typeof schema>;

export const CreateGround = () => {
  const { mutate, isPending, error } = useCreateGround();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      width: 0,
      length: 0,
      address: "",
      notes: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload = {
      ...values,
      width: Number(values.width),
      length: Number(values.length),
      image: values.image?.[0] ?? undefined,
    };

    mutate(payload, {
      onSuccess(data) {
        console.log("se completo correctamente");
        console.log(data);
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Crear Terreno</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            {/* Name */}
            <div className="space-y-1">
              <Label>Nombre</Label>
              <Input
                {...form.register("name")}
                placeholder="Ej. Rancho Los Olivos"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Width */}
            <div className="space-y-1">
              <Label>Ancho (m)</Label>
              <Input
                type="number"
                {...form.register("width", { valueAsNumber: true })}
                placeholder="Ej. 120"
              />
              {form.formState.errors.width && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.width.message}
                </p>
              )}
            </div>

            {/* Length */}
            <div className="space-y-1">
              <Label>Largo (m)</Label>
              <Input
                type="number"
                {...form.register("length", { valueAsNumber: true })}
                placeholder="Ej. 300"
              />
              {form.formState.errors.length && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.length.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-1">
              <Label>Dirección</Label>
              <Input
                {...form.register("address")}
                placeholder="Ej. Camino a la venta S/N"
              />
              {form.formState.errors.address && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <Label>Notas</Label>
              <Textarea
                {...form.register("notes")}
                placeholder="Notas adicionales (opcional)"
              />
            </div>

            {/* Image */}
            <div className="space-y-1">
              <Label>Imagen (opcional)</Label>
              <Input type="file" accept="image/*" {...form.register("image")} />
            </div>

            {error && (
              <p className="text-sm text-red-500">Error al crear terreno</p>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Guardando..." : "Crear Terreno"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
