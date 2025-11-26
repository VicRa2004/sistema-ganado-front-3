import { useEffect } from "react";
import {
  useUpdateGround,
  useGetGround,
} from "@/modules/ground/infrastructure/hooks/use-ground";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/components/ui/card";
import { Input } from "@/ui/components/ui/input";
import { Label } from "@/ui/components/ui/label";
import { Textarea } from "@/ui/components/ui/textarea";
import { Button } from "@/ui/components/ui/button";
import { Skeleton } from "@/ui/components/ui/skeleton";

// -----------------------------
// Zod schema opcional (todos los campos opcionales)
// -----------------------------
const formSchema = z.object({
  name: z.string().optional(),
  width: z.coerce.number().optional(),
  length: z.coerce.number().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  image: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const UpdateGround = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data, error, isPending } = useGetGround(id);
  const { mutate, isPending: isUpdating } = useUpdateGround();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      width: undefined,
      length: undefined,
      address: "",
      notes: "",
    },
  });

  // Cargar valores cuando la data llegue
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        width: data.width,
        length: data.length,
        address: data.address,
        notes: data.notes,
      });
    }
  }, [data]);

  const onSubmit = (values: FormValues) => {
    mutate(
      {
        id,
        ...values,
      },
      {
        onSuccess(data) {
          console.log(data);
          navigate("/app/ground");
        },
        onError(error) {
          console.log(error);
        },
      }
    );
  };

  if (isPending)
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-40 w-full" />
      </div>
    );

  if (error) return <p>Error al cargar los datos.</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Actualizar Terreno</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-1">
              <Label>Nombre</Label>
              <Input {...form.register("name")} placeholder="Nombre..." />
            </div>

            {/* Dimensiones */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Ancho (m)</Label>
                <Input
                  type="number"
                  {...form.register("width", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-1">
                <Label>Largo (m)</Label>
                <Input
                  type="number"
                  {...form.register("length", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* Dirección */}
            <div className="space-y-1">
              <Label>Dirección</Label>
              <Input {...form.register("address")} placeholder="Dirección..." />
            </div>

            {/* Notas */}
            <div className="space-y-1">
              <Label>Notas</Label>
              <Textarea {...form.register("notes")} placeholder="Notas..." />
            </div>

            {/* Imagen */}
            <div className="space-y-1">
              <Label>Imagen (opcional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) form.setValue("image", file);
                }}
              />
            </div>

            <Button type="submit" disabled={isUpdating} className="w-full">
              {isUpdating ? "Actualizando..." : "Actualizar Terreno"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
