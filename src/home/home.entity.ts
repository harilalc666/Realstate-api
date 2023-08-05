import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsTo,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { Image } from 'src/image/image.entity';
import { User } from 'src/users/user.entity';
import { Message } from 'src/message/message.entity';

@Table
export class Home extends Model<Home> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, allowNull: false })
  home_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  number_of_bedrooms: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  number_of_bathrooms: number;

  @Column({ type: DataType.STRING, allowNull: false })
  city: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: new Date() })
  listed_date: Date;

  @Column({ type: DataType.FLOAT, allowNull: false })
  land_size: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['Residential', 'Commercial'],
  })
  property_type: string;

  // home can have many images
  @HasMany(() => Image)
  image: Image[];

  // Home has user_id as foreign key in Home table
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  // one home belong to many users
  @BelongsTo(() => User)
  user: User;

  // messages
  @HasMany(() => Message)
  messages: Message[];
}
