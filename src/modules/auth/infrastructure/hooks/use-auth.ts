import { container } from "@/core/container";
import { User } from "@/modules/user/domain/User";
import { useMutation } from "@tanstack/react-query";

const service = container.auth;

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      service.login(email, password),
  });
};

export const useLogout = () => {
  return {
    logout: () => service.logout(),
  };
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (user: User) => service.register(user),
  });
};
