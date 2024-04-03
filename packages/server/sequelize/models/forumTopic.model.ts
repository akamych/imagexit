import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript'

@Table({ tableName: 'ForumTopics' })
class ForumTopic extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Column(DataType.STRING)
  title!: string

  @Column(DataType.TEXT)
  description!: string

  @Column(DataType.INTEGER)
  userId!: number

  @Column(DataType.INTEGER)
  viewCount!: number

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date
}

export default ForumTopic
