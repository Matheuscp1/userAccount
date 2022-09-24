import { Address } from './address';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from './abstractEntity';

@Entity()
export class Client extends AbstractEntity {
  @Unique('index_cpf', ['cpf'])
  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany('Address', (address: Address) => address.clientId, {
    onDelete: 'CASCADE',
  })
  address: Promise<Address[]>;
}
