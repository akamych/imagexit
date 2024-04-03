import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Umzug, SequelizeStorage } from 'umzug'
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env

const sequelizeOptions: SequelizeOptions = {
  dialect: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  models: [__dirname + '/models'],
}

const sequelize = new Sequelize(sequelizeOptions)

export const umzug = new Umzug({
  migrations: {
    glob: __dirname + '/migrations/*.js',
  } as any,
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})
;(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  await umzug.up()
})()
export default sequelize
