import { UserAccount } from './userAccount';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstractEntity';

@Entity()
export class Address extends AbstractEntity {

  @Column({ type: 'varchar', length: 100, })
  zipCode: string;

  @Column({ type: 'varchar', length: 100 })
  publicPlace: string

  @Column({ type: 'varchar', length: 100 })
  complement:string

  @Column({ type: 'varchar', length: 100 })
  district:string

  @Column({ type: 'varchar', length: 100 })
  locality:string

  @Column({ type: 'varchar', length: 2 })
  uf:string

  @ManyToOne((type) => UserAccount, (account) => UserAccount, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_account_id' })
  accountId: number;
}
