import { Model, Table, Column, AutoIncrement, PrimaryKey, ForeignKey, DataType } from 'sequelize-typescript'
import User from './user'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export default class UserTheme extends Model<UserTheme> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Column(DataType.STRING)
  theme!: string

  @ForeignKey(() => User)
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
