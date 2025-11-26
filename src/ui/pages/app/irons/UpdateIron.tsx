import { useEffect } from "react";
import {
  useUpdateIron,
  useGetIron,
} from "@/modules/iron/infrastructure/hooks/use-iron"; // Hooks de Iron
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
import { Button } from "@/ui/components/ui/button";
import { Skeleton } from "@/ui/components/ui/skeleton";

// -----------------------------
// Schema para Iron (Solo nombre e imagen opcional)
// -----------------------------
const formSchema = z.object({
  name: z.string().optional(),
  // Usamos z.any() o z.instanceof(File) dependiendo de cómo manejes el input.
  // Al ser update, la imagen es opcional (si no se sube, se mantiene la anterior).
  image: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const UpdateIron = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data, error, isPending } = useGetIron(id);
  const { mutate, isPending: isUpdating } = useUpdateIron();

  console.log(data);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // Image se queda undefined por defecto
    },
  });

  // Cargar valores cuando la data llegue
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        // No reseteamos la imagen porque el input file no acepta URLs por valor
      });
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    mutate(
      {
        id,
        name: values.name,
        // Solo enviamos la imagen si el usuario seleccionó una nueva (es un objeto File)
        image: values.image,
      },
      {
        onSuccess(data) {
          console.log("Actualizado correctamente", data);
          navigate("/app/iron"); // Ajusta la ruta de redirección si es necesario
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

  if (error) return <p>Error al cargar los datos del fierro.</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Actualizar Fierro</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-1">
              <Label>Nombre</Label>
              <Input
                {...form.register("name")}
                placeholder="Nombre del fierro..."
              />
            </div>

            {/* Imagen */}
            <div className="space-y-1">
              <Label>Imagen (opcional)</Label>
              {/* Mostramos una pequeña vista previa si ya existe imagen en BD */}
              {data?.image && (
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1">
                    Imagen actual:
                  </p>
                  <img
                    src={data.image}
                    alt="Actual"
                    className="h-20 w-auto rounded-md object-cover border"
                  />
                </div>
              )}

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) form.setValue("image", file);
                }}
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Deja este campo vacío para mantener la imagen actual.
              </p>
            </div>

            <Button type="submit" disabled={isUpdating} className="w-full">
              {isUpdating ? "Actualizando..." : "Actualizar Fierro"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
