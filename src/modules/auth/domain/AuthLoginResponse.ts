import { User } from "@/modules/user/domain/User";

export interface AuthLoginResponse {
  user: User;
  token: string;
}
