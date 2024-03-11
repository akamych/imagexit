import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript'

@Table({ tableName: 'ForumTopicsEmojis' })
class ForumTopicEmojis extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Column(DataType.STRING)
  topicId!: number

  @Column(DataType.TEXT)
  code!: string

  @Column(DataType.INTEGER)
  clicks!: number

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date
}

export default ForumTopicEmojis
