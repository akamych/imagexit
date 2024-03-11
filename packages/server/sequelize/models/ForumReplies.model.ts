import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import ForumComments from './forumComments.model'

@Table({ tableName: 'ForumReplies' })
class ForumReplies extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @ForeignKey(() => ForumComments)
  @Column(DataType.INTEGER)
  commentId!: number

  @BelongsTo(() => ForumComments)
  comment!: ForumComments

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

export default ForumReplies
