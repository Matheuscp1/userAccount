import { CalledDto } from './../dto/called-dto';
import { Called } from './../entities/called';
import { Client } from './../entities/client';
import { ClientDto } from './../dto/client.dto';
import { AddressDto } from '../dto/address-dto';
import { Address } from '../entities/address';
import { UserAccount } from '../entities/userAccount';
import { UserAccountDto } from '../dto/userAccount-dto';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { response } from 'express';

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
      let address: AddressDto = { ...request.body, accountId: newAccount.id };
      let repositoryAddress = getRepository(Address);
      let newAddress = await repositoryAddress.create(address);
      newAddress = await repositoryAddress.save(address);

      return await response.status(201).json(newAccount);
    } catch (error) {
      return await response.status(500).json(error.message);
    }
  }

  async createCalled(request: Request, response: Response): Promise<any> {
    try {
      let called: CalledDto = request.body;
      called.accountId = request.loggedUser.data.id;

      let repositoryCalled = getRepository(Called);
      let newCalled: CalledDto = repositoryCalled.create(called);
      newCalled = await repositoryCalled.save(called);
      return await response.status(201).json(newCalled);
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

      return await response.status(201).json(newClient);
    } catch (error) {
      return await response.status(500).json(error.message);
    }
  }

  async getCalled(request: Request, res: Response): Promise<any> {
    try {
      const {limit, offset } = request.query
      const repositoryCalled = getRepository(Called);
      const [results,total] = await repositoryCalled.findAndCount({
        order: {
          id: 'DESC',
        },
        relations: ['clientId'],
        where: {
          accountId: request.loggedUser.data.id,
        },
        take: limit,
        skip: offset
      });
      return await res.status(200).json({results, total});
    } catch (error) {
      return await res.status(500).json(error.message);
    }
  }

  async getCalledById(request: Request, res: Response): Promise<any> {
    try {
      const repositoryCalled = getRepository(Called);
      const allCalled = await repositoryCalled.findOne({
        relations: ['clientId'],
        where: {
          id: request.params.id,
        },
      });
      return await res.status(200).json(allCalled);
    } catch (error) {
      return await res.status(500).json(error.message);
    }
  }

  async getClients(request: Request, res: Response): Promise<any> {
    try {
      const {limit, offset } = request.query
      const repositoryClient = getRepository(Client);
      const [results,total] = await repositoryClient.findAndCount({
        //take: limit,
        //skip: offset
      });
      return await res.status(200).json({results,total});
    } catch (error) {
      return await res.status(500).json(error.message);
    }
  }

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
      console.log(error);
      return await response.status(500).json(error.message);
    }
  }

  async updateCalled(request: Request, response: Response): Promise<any> {
    console.log(request.body);
    try {
      const { name, clientId, subject, status, complement, id } = request.body;
      const repositoryCalled = getRepository(Called);
      const called = await repositoryCalled.findOne({
        where: {
          id,
        },
      });
      console.log(request.body);
      called!.name = name;
      called!.clientId = clientId;
      called!.status = status;
      called!.complement = complement;
      called!.subject = subject;
      repositoryCalled.save(called);
      let CalledDto: CalledDto = {
        subject,
        name,
        status,
        complement,
      };
      return await response.status(200).json(CalledDto);
    } catch (error) {
      console.log(error);
      return await response.status(500).json(error.message);
    }
  }
}
