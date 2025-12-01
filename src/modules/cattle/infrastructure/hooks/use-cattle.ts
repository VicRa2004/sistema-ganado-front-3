import { container } from "@/core/container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CattleFilters } from "../../domain/CattleRepository";
import { CattleCreate, CattleUpdate } from "../../domain/Cattle";

const service = container.cattle;

export const useGetCattles = (filters: CattleFilters) => {
  const { data, isPending, error, refetch } = useQuery({
    // Usamos el filtro como parte de la key para que refetch actúe si cambian los filtros
    queryKey: ["cattles", filters],
    queryFn: () => service.getAll(filters),
  });

  return { data, isPending, error, refetch };
};

export const useGetCattle = (id: number) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["cattle", id],
    queryFn: () => service.getOne(id),
  });

  return { data, isPending, error, refetch };
};

export const useCreateCattle = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["create-cattle"],
    mutationFn: (cattle: CattleCreate) => service.create(cattle),
    onSuccess: () => {
      // Invalidamos la lista para que se recargue con el nuevo ganado
      queryClient.refetchQueries({ queryKey: ["cattles"] });
    },
  });

  return { mutate, isPending, error };
};

export const useUpdateCattle = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["update-cattle"],
    mutationFn: (cattle: CattleUpdate) => service.update(cattle),
    onSuccess: (cattle) => {
      // Actualizamos la lista general
      queryClient.refetchQueries({ queryKey: ["cattles"] });
      // Actualizamos el detalle específico de este ganado si estuviera abierto
      queryClient.refetchQueries({ queryKey: ["cattle", cattle.id] });
    },
  });

  return { mutate, isPending, error };
};

export const useDeleteCattle = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["delete-cattle"],
    mutationFn: (id: number) => service.delete(id),
    onSuccess: (_, id) => {
      // Recargamos la lista
      queryClient.refetchQueries({ queryKey: ["cattles"] });
      // Removemos la cache del detalle eliminado para evitar errores si se intenta acceder
      queryClient.removeQueries({ queryKey: ["cattle", id] });
    },
  });

  return { mutate, isPending, error };
};
