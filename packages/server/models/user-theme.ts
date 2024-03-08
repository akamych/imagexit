import { Model, ModelType, Table, Column, AutoIncrement, PrimaryKey, ForeignKey, AllowNull, DataType } from 'sequelize-typescript'
import User from './user'

export interface IUserTheme {
  id: number
  theme: string
  ownerId: string
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model<UserTheme> implements IUserTheme {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  theme!: string

  @ForeignKey(() => User as unknown as ModelType<User, UserTheme>)
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'owner_id',
  })
  ownerId!: string

  static override async findByPk(userId: string): Promise<UserTheme | undefined> {
    try {
      const userTheme: UserTheme | undefined = await UserTheme.findByPk(userId)
      return userTheme
    } catch (error) {
      console.error('Error finding user theme:', error)
      return undefined
    }
  }
}
