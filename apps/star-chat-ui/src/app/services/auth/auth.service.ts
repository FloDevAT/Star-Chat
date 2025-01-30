import { LoginCredentials } from '@star-chat/models';

export class AuthService {
  private static instance: AuthService;

  public async login(creds: LoginCredentials): Promise<Response> {
    return fetch('http://localhost:3333/auth/login', {
      method: 'post',
      body: JSON.stringify(creds),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }
    });
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }


}
