import { LoginCredentials } from '@star-chat/models';

export class AuthService {
  private static instance: AuthService;

  public async login(creds: LoginCredentials) {

  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }


}
