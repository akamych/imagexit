import { Model, Table, Column, AutoIncrement, PrimaryKey, ForeignKey, AllowNull, DataType } from 'sequelize-typescript'
import { User } from './user'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  theme!: string

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'owner_id',
  })
  ownerId!: string

  static async findByOwnerId(ownerId: string): Promise<UserTheme | null> {
    try {
      const userTheme = await UserTheme.findOne({ where: { ownerId } })
      return userTheme || null
    } catch (error) {
      console.error('Error finding user theme:', error)
      return null
    }
  }
}
