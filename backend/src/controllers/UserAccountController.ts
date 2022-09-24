import { Client } from './../entities/client';
import { ClientDto } from './../dto/client.dto';
import { AddressDto } from '../dto/address-dto';
import { Address } from '../entities/address';
import { UserAccount } from '../entities/userAccount';
import { UserAccountDto } from '../dto/userAccount-dto';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { getRepository } from 'typeorm';

export class AccountController {
  async create(request: Request, response: Response): Promise<any> {
    try {
      let userAccount: UserAccountDto = request.body;
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(userAccount.password, salt);
      userAccount.password = hash;
      let repositoryAccount = getRepository(UserAccount);
      let newAccount: UserAccountDto = repositoryAccount.create(userAccount);
      newAccount = await repositoryAccount.save(userAccount);
      console.log(userAccount.id, newAccount, '------------------');
      let address: AddressDto = { ...request.body, accountId: newAccount.id };
      let repositoryAddress = getRepository(Address);
      let newAddress = await repositoryAddress.create(address);
      newAddress = await repositoryAddress.save(address);
      console.log('newAddress', newAddress, '------------------');
      return await response.status(201).json(newAccount);
    } catch (error) {
      return await response.status(500).json(error.message);
    }
  }

  async createClient(request: Request, response: Response): Promise<any> {
    try {
      let client: ClientDto = request.body;
      let repositoryClient = getRepository(Client);
      let newClient: UserAccountDto = repositoryClient.create(client);
      newClient = await repositoryClient.save(client);
      let address: AddressDto = { ...request.body, clientId: newClient.id };
      let repositoryAddress = getRepository(Address);
      let newAddress = await repositoryAddress.create(address);
      newAddress = await repositoryAddress.save(address);
      console.log('newAddress', newAddress, '------------------');
      return await response.status(201).json(newClient);
    } catch (error) {
      return await response.status(500).json(error.message);
    }
  }

  /*   async get(request: Request, res: Response): Promise<any> {
      try {
        const repositoryAccount = getRepository(Account);
        const allAccount = await repositoryAccount.find();
        return await res.status(200).json(allAccount);
      } catch (error) {
        return await res.status(500).json(error.message);
      }
    }
  */
  async login(request: Request, response: Response): Promise<any> {
    try {
      const { emailOrUser, password } = request.body;
      const repositoryAccount = getRepository(UserAccount);
      let where: {};
      if (emailOrUser.match(/^\S+@\S+\.\S+$/)) {
        let email = emailOrUser.match(/^\S+@\S+\.\S+$/)[0];
        where = { email };
      } else {
        where = { userName: emailOrUser };
      }
      console.log(where);
      const userAccount = await repositoryAccount.findOne({
        where,
      });
      if (userAccount) {
        let compare = bcrypt.compareSync(password, userAccount.password);
        if (compare) {
          const { email, id, userName, cpf, name } = userAccount;
          let userDto: UserAccountDto = {
            email,
            name,
            userName,
            cpf,
          };
          jsonwebtoken.sign(
            { ...userDto, id },
            'testeJWT',
            { expiresIn: '2h' },
            (err, token) => {
              if (err) {
                response.status(401).json(err);
              } else {
                response.status(200).json({ token, user: userDto });
              }
            },
          );
        } else {
          return response.status(404).json('Senha incorreta');
        }
      } else {
        return response.status(404).json('Usuário não encontrado');
      }
    } catch (error) {
      return await response.status(500).json(error.message);
    }
  }

  async updateUser(request: Request, response: Response): Promise<any> {
    try {
      const { name } = request.body;
      const repositoryAccount = getRepository(UserAccount);
      const userAccount = await repositoryAccount.findOne({
        where: {
          name: request.loggedUser.data.name,
        },
      });
      userAccount!.name = name;
      repositoryAccount.save(userAccount);
      const { email, id, userName, cpf } = userAccount!;
      let userDto: UserAccountDto = {
        email,
        name: userAccount?.name,
        userName,
        cpf,
      };
      jsonwebtoken.sign(
        { ...userDto, id },
        'testeJWT',
        { expiresIn: '2h' },
        (err, token) => {
          if (err) {
            response.status(401).json(err);
          } else {
            return response.status(200).json({ token, user: userDto });
          }
        },
      );
    } catch (error) {
      console.log(error)
      return await response.status(500).json(error.message);
    }
  }
}
