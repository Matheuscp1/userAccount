import { AddressDto } from '../dto/address-dto';
import { Address } from './../entities/address';
import { UserAccount } from './../entities/userAccount';
import { UserAccountDto } from './../dto/userAccount-dto';
import bcrypt from 'bcrypt';
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
}
