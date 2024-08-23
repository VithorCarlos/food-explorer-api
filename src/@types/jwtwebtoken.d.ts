import "jsonwebtoken";
import { ROLE } from "@/domain/enums/role";

declare module "jsonwebtoken" {
  interface JwtPayload {
    sub: string;
  }

  export function decode(token: string, options?: DecodeOptions): JwtPayload;
}
