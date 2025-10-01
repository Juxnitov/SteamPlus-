import pkg from 'pg'
import { Pool } from 'pg'

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: 'Sofia*2901*',
    port: 5432
})

export default pool