import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Input } from "@/ui/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/ui/components/ui/form";
import { Link, useNavigate } from "react-router";
import { useLogin } from "@/modules/auth/infrastructure/hooks/use-auth";

export const Login = () => {
  const navigation = useNavigate();
  const { mutate } = useLogin();

  // schema de validación
  const schema = z.object({
    email: z.email("Correo inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
  });

  type typeSchema = z.infer<typeof schema>;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: typeSchema) => {
    mutate(values, {
      onError(error) {
        console.log(error);
      },
      onSuccess(data) {
        //console.log(data);
        navigation("/app/");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
          <CardDescription>
            Accede al sistema ganadero con tu cuenta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="text-sm text-center w-full">
          ¿No tienes cuenta?{" "}
          <Link
            to="/auth/register"
            className="text-primary ml-1 hover:underline"
          >
            Regístrate
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
