import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './../../user/entities/user.entity';
import { Message } from './../../message/entities/message.entity';

@Entity({
  name: 'chats',
})
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Message, (message) => message.chat, { nullable: true })
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
