import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';
import { Home } from '../home/home.entity';

@Table
export class Image extends Model<Image> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, allowNull: false })
  image_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @ForeignKey(() => Home)
  @Column({ type: DataType.INTEGER, allowNull: false })
  home_id: number;

  @BelongsTo(() => Home)
  home: Home[];
}
