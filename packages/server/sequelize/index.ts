import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  models: [__dirname + '/models'],
}

const sequelize = new Sequelize(sequelizeOptions)

export default sequelize
