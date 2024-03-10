import { Model, Table, Column, AutoIncrement, PrimaryKey, AllowNull, DataType } from 'sequelize-typescript'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  secondName!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  displayName!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  phone!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  login!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  avatar!: string

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

  static async getByUsername(login: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { login } })
      return user || null
    } catch (error) {
      console.error('Error finding user by username:', error)
      return null
    }
  }

  static async createNew(login: string, email: string, password: string): Promise<User | null> {
    try {
      const newUser = await User.create({ login, email, password } as User)
      return newUser
    } catch (error) {
      console.error('Error creating new user:', error)
      return null
    }
  }
}
