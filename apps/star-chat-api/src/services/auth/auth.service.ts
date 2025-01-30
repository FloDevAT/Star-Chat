export class AuthService {
  private static instance: AuthService;

  private usernames: string[];

  constructor() {
    this.usernames = [];
  }

  public login(username: string): void {
    if (this.usernames.includes(username)) {
      throw new Error("Username already in use!");
    }

    this.usernames.push(username);
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
