import { Strategy } from 'passport-local';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
} from 'sequelize-typescript';
import { Home } from 'src/home/home.entity';
import { Message } from 'src/message/message.entity';

export enum UserType {
  Realtor = 'Realtor',
  Buyer = 'Buyer',
  Admin = 'Admin',
}

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  user_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone_num: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['Realtor', 'Buyer', 'Admin'],
  })
  user_type: string;

  // user(realtor) can have many homes to sell
  @HasMany(() => Home)
  homes: Home[];

  // message
  @HasMany(() => Message, 'realtor_message_id')
  realtor_message: Message[];

  @HasMany(() => Message, 'buyer_message_id')
  buyer_message: Message[];
}
