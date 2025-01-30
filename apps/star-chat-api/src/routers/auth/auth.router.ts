import express, { Request, Response } from 'express';
import { verifyLoginCredentialsType } from '@star-chat/models';
import { AuthService } from '../../services';
import { b } from 'vitest/dist/suite-IbNSsUWN';

const authRouter = express.Router();

authRouter.post('/login', (req: Request, res: Response) => {
  const body = req.body;

  if (verifyLoginCredentialsType(body)) {
    const authService: AuthService = AuthService.getInstance();

    try {
      authService.login(body.username);
      res.status(201).json({
        msg: 'Logged in successfully!'
      })
    } catch (e) {
      res.status(401).json({
        err: e.message
      })
    }
  } else {
    res.status(400).json({
      err: 'Invalid request body!'
    });
  }
});

authRouter.post('/logout', (req: Request, res: Response) => {
  const body = req.body;

  if (verifyLoginCredentialsType(body)) {
    const authService: AuthService = AuthService.getInstance();
    authService.logout(body.username);

    res.status(200).json({
      msg: "Logged out!"
    });
  } else {
    res.status(400).json({
      err: 'Invalid request body!'
    })
  }
});


export { authRouter };
