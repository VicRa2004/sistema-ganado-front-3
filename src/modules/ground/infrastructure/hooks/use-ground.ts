import { container } from "@/core/container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroundFilters } from "../../domain/GroundRepository";
import { GroundCreate, GroundUpdate } from "../../domain/Ground";

const service = container.ground;

export const useGetGrounds = (filters: GroundFilters) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["grounds", filters],
    queryFn: () => service.getAll(filters),
  });

  return { data, isPending, error, refetch };
};

export const useGetGround = (id: number) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["ground", id],
    queryFn: () => service.getOne(id),
  });

  return { data, isPending, error, refetch };
};

export const useCreateGround = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["create-ground"],
    mutationFn: (ground: GroundCreate) => service.create(ground),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["grounds"] });
    },
  });

  return { mutate, isPending, error };
};

export const useUpdateGround = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["update-branch"],
    mutationFn: (ground: GroundUpdate) => service.update(ground),
    onSuccess: (ground) => {
      queryClient.refetchQueries({ queryKey: ["grounds"] });
      queryClient.refetchQueries({ queryKey: ["ground", ground.id] });
    },
  });

  return { mutate, isPending, error };
};

export const useDeleteGround = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["delete-ground"],
    mutationFn: (id: number) => service.delete(id),
    onSuccess: (_, id) => {
      queryClient.refetchQueries({ queryKey: ["grounds"] });
      queryClient.removeQueries({ queryKey: ["ground", id] });
    },
  });

  return { mutate, isPending, error };
};
