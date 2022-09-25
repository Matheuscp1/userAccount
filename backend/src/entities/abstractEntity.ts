import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  modifiedDate?: Date;

  @Column({ default: true })
  active: boolean;
}
