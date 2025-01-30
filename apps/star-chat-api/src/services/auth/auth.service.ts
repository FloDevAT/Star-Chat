import * as jwt from 'jsonwebtoken';
import { LoginCredentials } from '@star-chat/models';
import * as process from 'node:process';

export class AuthService {
  private static instance: AuthService;

  private usernames: string[];

  constructor() {
    this.usernames = [];
  }

  public login(username: string): string {
    if (this.usernames.includes(username)) {
      throw new Error("Username already in use!");
    }

    const token = jwt.sign({
      username: username
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    this.usernames.push(username);

    return token;
  }

  public verifyToken(token: string): boolean {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }

  public getUsernameFromToken(token: string): string {
    const data: LoginCredentials = jwt.decode(token) as LoginCredentials;
    return data.username;
  }

  public logout(username: string): void {
    const index = this.usernames.indexOf(username);

    if (index !== -1) {
      this.usernames.splice(index, 1);
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

}
