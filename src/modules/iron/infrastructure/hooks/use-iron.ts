import { container } from "@/core/container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IronFilters } from "../../domain/IronRepository";
import { IronCreate, IronUpdate } from "../../domain/Iron";

// Usamos el servicio de iron
const service = container.iron;

export const useGetIrons = (filters: IronFilters) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["irons", filters],
    queryFn: () => service.getAll(filters),
  });

  return { data, isPending, error, refetch };
};

export const useGetIron = (id: number) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["iron", id],
    queryFn: () => service.getOne(id),
  });

  return { data, isPending, error, refetch };
};

export const useCreateIron = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["create-iron"],
    mutationFn: (iron: IronCreate) => service.create(iron),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["irons"] });
    },
  });

  return { mutate, isPending, error };
};

export const useUpdateIron = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["update-iron"],
    mutationFn: (iron: IronUpdate & { id: number }) => service.update(iron),
    onSuccess: (iron) => {
      queryClient.refetchQueries({ queryKey: ["irons"] });
      // Actualizamos también la caché del elemento individual si se está viendo en detalle
      queryClient.refetchQueries({ queryKey: ["iron", iron.id] });
    },
  });

  return { mutate, isPending, error };
};

export const useDeleteIron = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["delete-iron"],
    mutationFn: (id: number) => service.delete(id),
    onSuccess: (_, id) => {
      queryClient.refetchQueries({ queryKey: ["irons"] });
      // Removemos de la caché el elemento eliminado para evitar lecturas de datos obsoletos
      queryClient.removeQueries({ queryKey: ["iron", id] });
    },
  });

  return { mutate, isPending, error };
};
