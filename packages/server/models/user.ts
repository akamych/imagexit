import { Model, Table, Column, AutoIncrement, PrimaryKey, AllowNull, DataType } from 'sequelize-typescript'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'users',
})
export class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  username!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string

  static async getById(id: number): Promise<User | null> {
    try {
      const user = await User.findByPk(id)
      return user || null
    } catch (error) {
      console.error('Error finding user by id:', error)
      return null
    }
  }

  static async getByUsername(username: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { username } })
      return user || null
    } catch (error) {
      console.error('Error finding user by username:', error)
      return null
    }
  }

  static async createNew(username: string, email: string, password: string): Promise<User | null> {
    try {
      const newUser = await User.create({ username, email, password } as User)
      return newUser
    } catch (error) {
      console.error('Error creating new user:', error)
      return null
    }
  }
}
