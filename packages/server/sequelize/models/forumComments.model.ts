import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import ForumTopic from './forumTopic.model'

@Table({ tableName: 'ForumComments' })
class ForumComments extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @ForeignKey(() => ForumTopic)
  @Column(DataType.INTEGER)
  forumTopicId!: number

  @BelongsTo(() => ForumTopic)
  forumTopic!: ForumTopic

  @Column(DataType.INTEGER)
  userId!: number

  @Column(DataType.TEXT)
  text!: string

  @Column(DataType.INTEGER)
  likeCount!: number

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date
}

export default ForumComments
