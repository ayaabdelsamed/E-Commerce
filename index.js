import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import categoryRouter from './src/modules/category/category.routes.js'
const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.use(categoryRouter)

dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))