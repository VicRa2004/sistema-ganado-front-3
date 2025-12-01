import { container } from "@/core/container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RaceCreate, RaceUpdate } from "../../domain/Race";

// Asegúrate de haber registrado 'race' en tu contenedor de dependencias
const service = container.race;

export const useGetRaces = () => {
  // Nota: En la interfaz RaceRepository definimos 'find' sin filtros.
  // Si agregas filtros en el futuro, añádelos aquí como argumentos.
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["races"],
    queryFn: () => service.getAll(),
  });

  return { data, isPending, error, refetch };
};

export const useGetRace = (id: number) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["race", id],
    queryFn: () => service.getOne(id),
  });

  return { data, isPending, error, refetch };
};

export const useCreateRace = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["create-race"],
    mutationFn: (race: RaceCreate) => service.create(race),
    onSuccess: () => {
      // Recargamos la lista de carreras tras crear una nueva
      queryClient.refetchQueries({ queryKey: ["races"] });
    },
  });

  return { mutate, isPending, error };
};

export const useUpdateRace = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["update-race"],
    mutationFn: (race: RaceUpdate) => service.update(race),
    onSuccess: (race) => {
      // Actualizamos la lista general
      queryClient.refetchQueries({ queryKey: ["races"] });
      // Actualizamos el detalle específico de la carrera modificada
      queryClient.refetchQueries({ queryKey: ["race", race.id] });
    },
  });

  return { mutate, isPending, error };
};

export const useDeleteRace = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["delete-race"],
    mutationFn: (id: number) => service.delete(id),
    onSuccess: (_, id) => {
      // Recargamos la lista
      queryClient.refetchQueries({ queryKey: ["races"] });
      // Removemos la caché del detalle para evitar mostrar datos obsoletos si se intenta volver a entrar
      queryClient.removeQueries({ queryKey: ["race", id] });
    },
  });

  return { mutate, isPending, error };
};
