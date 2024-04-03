import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import ForumComments from './forumComments.model'
import User from './user'

@Table({ tableName: 'ForumTopics' })
class ForumTopic extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @HasMany(() => ForumComments)
  comments!: ForumComments[]

  @Column(DataType.STRING)
  title!: string

  @Column(DataType.TEXT)
  description!: string

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  viewCount!: number

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date
}

export default ForumTopic
