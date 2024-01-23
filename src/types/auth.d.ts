import { DefaultSession } from "@auth/core/types";

declare module "next-auth" {
  interface User {
    id?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
