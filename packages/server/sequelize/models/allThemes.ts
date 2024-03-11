import { Model, Table, Column, DataType, AutoIncrement, PrimaryKey, AllowNull, Unique } from 'sequelize-typescript'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'game_theme',
})
export class AllThemes extends Model<AllThemes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string
}