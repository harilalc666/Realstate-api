import {
  Table,
  Column,
  ForeignKey,
  DataType,
  Model,
  PrimaryKey,
  BelongsTo,
  AutoIncrement,
} from 'sequelize-typescript';
import { Home } from 'src/home/home.entity';
import { User } from 'src/users/user.entity';

@Table
export class Message extends Model<Message> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, allowNull: false })
  message_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  message: string;

  // Home
  @ForeignKey(() => Home)
  @Column({ type: DataType.INTEGER, allowNull: false })
  home_id: number;

  @BelongsTo(() => Home)
  homes: Home;

  // user
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  realtor_message_id: number;

  @BelongsTo(() => User, 'realtor_message_id')
  realtor: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  buyer_message_id: number;

  @BelongsTo(() => User, 'buyer_message_id')
  buyer: User;
}
