import { NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
export const auth = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const authToken = request.headers['authorization'];
    if (authToken) {
      const token = authToken.split(' ');
      if (token[1]) {
        jsonwebtoken.verify(token[1], 'testeJWT', (err, data) => {
          if (err) {
            response.status(401).json({ error: err });
          } else {
            let x = (request.loggedUser = {
              data,
            });
            next();
          }
        });
      } else {
        response.status(401).json({ error: 'Token vazio' });
      }
    } else {
      response.status(401).json({ error: 'Sem cabeçalho de token' });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'erro no servidor' });
  }
};
