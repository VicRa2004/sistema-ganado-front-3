import { container } from "@/core/container";
import { useQuery } from "@tanstack/react-query";
import { GroundFilters } from "../../domain/GroundRepository";

const service = container.ground;

export const useGetGrounds = (filters: GroundFilters) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["grounds", filters],
    queryFn: () => service.getAll(filters),
  });

  return { data, isPending, error, refetch };
};
