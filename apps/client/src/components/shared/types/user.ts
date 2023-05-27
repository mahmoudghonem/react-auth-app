export interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;

}

export interface TokenData {
  email: string;
  sub: number;
  exp: number;
  iat: number;
}