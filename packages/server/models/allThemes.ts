import { Model, Table, Column, DataType, AutoIncrement, PrimaryKey, AllowNull, Unique } from 'sequelize-typescript'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
export class GameTheme extends Model<GameTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string
}
