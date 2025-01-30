export interface LoginCredentials {
  username: string;
}

export function verifyLoginCredentialsType(obj: any): obj is LoginCredentials {
  const usernameKey: keyof LoginCredentials = 'username';

  return obj &&
    obj[usernameKey];
}
