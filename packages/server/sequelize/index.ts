import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import * as path from 'path'
import * as fs from 'fs'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

// Получаем абсолютный путь к директории с моделями
const modelsPath = path.join(__dirname, 'models')

// Читаем все файлы в директории моделей
const modelFiles = fs.readdirSync(modelsPath)

// Фильтруем файлы моделей
const models = modelFiles
  .filter(file => file.endsWith('.ts') && file !== 'index.ts') // Исключаем файл index.ts (если он есть)
  .map(file => require(path.join(modelsPath, file))) // Импортируем каждую модель

const sequelizeOptions: SequelizeOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  models: models,
}

const sequelize = new Sequelize(sequelizeOptions)

export default sequelize
