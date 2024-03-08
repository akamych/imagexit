import { Pool, QueryResult } from 'pg'

// Заменить на реальные данные подключения к базе данных
const connection: Pool = new Pool({
  user: 'your_username',
  password: 'your_password',
  host: 'your_host',
  database: 'your_database',
})

interface User {
  id: number
  username: string
  email: string
  password: string
}

class User {
  constructor(data: User) {
    this.id = data.id
    this.username = data.username
    this.email = data.email
    this.password = data.password
  }

  static async getAll(): Promise<User[]> {
    const results: QueryResult<User> = await connection.query('SELECT * FROM users')
    return results.rows.map(row => new User(row))
  }

  static async getById(id: number): Promise<User | null> {
    const results: QueryResult<User> = await connection.query('SELECT * FROM users WHERE id = $1', [id])
    return results.rows[0] ? new User(results.rows[0]) : null
  }

  static async create(username: string, email: string, password: string): Promise<number> {
    const result: QueryResult = await connection.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password])
    return result.rowCount ? result.rows[0].id : 0 // Return inserted ID or 0 on failure
  }

  static async getByUsername(username: string): Promise<User | null> {
    const results: QueryResult<User> = await connection.query('SELECT * FROM users WHERE username = $1', [username])
    return results.rows[0] ? new User(results.rows[0]) : null
  }

  async update(username: string, email: string, password: string): Promise<void> {
    await connection.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4', [username, email, password, this.id])
  }

  async delete(): Promise<void> {
    await connection.query('DELETE FROM users WHERE id = $1', [this.id])
  }
}

export default User
