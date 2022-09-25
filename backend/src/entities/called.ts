import { Client } from './client';
import { UserAccount } from './userAccount';
import { Address } from './address';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { AbstractEntity } from './abstractEntity';

@Entity()
export class Called extends AbstractEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  status: string;

  @Column({ length: 100 })
  subject: string;

  @Column({ type: 'text' })
  complement: string;

  @ManyToOne((type) => UserAccount, (account) => UserAccount, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_account_id' })
  accountId: number;

  @ManyToOne((type) => Client, (client) => Client, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'client_id' })
  clientId: number;
}
