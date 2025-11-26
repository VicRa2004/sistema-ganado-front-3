import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Asegúrate de importar el hook correcto de Iron
import { useCreateIron } from "@/modules/iron/infrastructure/hooks/use-iron";

import { Input } from "@/ui/components/ui/input";
import { Button } from "@/ui/components/ui/button";
import { Label } from "@/ui/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/ui/components/ui/card";
import { useNavigate } from "react-router";

// Esquema de validación
const schema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  // Validamos que exista una lista de archivos y que tenga al menos un elemento
  image: z
    .any()
    .refine((files) => files && files.length > 0, "La imagen es obligatoria"),
});

type FormValues = z.infer<typeof schema>;

export const CreateIron = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useCreateIron();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    // Preparamos el payload conforme a la interfaz IronCreate
    const payload = {
      name: values.name,
      // Como validamos que es obligatorio, podemos acceder al índice 0 con seguridad
      image: values.image[0],
    };

    mutate(payload, {
      onSuccess(data) {
        console.log(data);
        navigate("/app/iron");
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Crear Fierro</CardTitle>
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
                placeholder="Ej. Fierro de herrar ganadería X"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Image (Obligatoria) */}
            <div className="space-y-1">
              <Label>Imagen</Label>
              <Input type="file" accept="image/*" {...form.register("image")} />
              {form.formState.errors.image && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.image.message as string}
                </p>
              )}
            </div>

            {/* Mensaje de error general del servidor */}
            {error && (
              <p className="text-sm text-red-500">Error al crear el registro</p>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Guardando..." : "Crear Fierro"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
