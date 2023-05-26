import { DataSource } from "typeorm"
import { Auth, User } from "../entities"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: parseInt(process.env['DB_PORT']!),
    username: process.env['DB_USER_NAME'],
    password: process.env['DB_PASSWORD'],
    database: "test_db",
    entities: [User,Auth],
    synchronize: true
})

