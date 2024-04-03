import * as pg from 'pg'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env

const sequelizeOptions: SequelizeOptions = {
  dialect: 'postgres',
  dialectModule: pg,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  models: [__dirname + '/models'],
}

const sequelize = new Sequelize(sequelizeOptions)

export default sequelize
