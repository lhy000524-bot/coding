import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import financeRouter from './routes/finance.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/finance', financeRouter)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Stock price search server listening on port ${PORT}`)
})
