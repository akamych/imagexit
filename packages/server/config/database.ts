import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  database: 'your_database_name',
  username: 'your_username',
  password: 'your_password',
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Соединение установлено успешно')
  })
  .catch(error => {
    console.error('Не удалось подключиться к базе данных:', error)
  })

export default sequelize
