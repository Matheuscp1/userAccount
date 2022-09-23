import { Address } from './address';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from './abstractEntity';

@Entity()
export class UserAccount extends AbstractEntity {
  @Unique('index_cpf', ['cpf'])
  @Column({ length: 14 })
  cpf: string;
  @Unique('index_email', ['email'])
  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  userName: string;

  @Column({ length: 60 })
  password: string;  

    
  @OneToMany('Address', (address: Address) => address.accountId, { onDelete: 'CASCADE' })
  extracts: Promise<Address[]>
}
