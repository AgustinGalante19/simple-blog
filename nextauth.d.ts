import { DefaultSession, DefaultUser } from 'next-auth';
interface IUser extends DefaultUser {
  id?: string;
  name?: string;
  lastname?: string;
  username?: string;
}
declare module 'next-auth' {
  interface Session {
    user?: IUser;
  }
}
