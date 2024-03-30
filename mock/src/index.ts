import express, { Request, Response } from 'express'
import sampleProductRouter from './sampleProduct/routes'

const app = express()
const port = process.argv[2] || 3003

app.get('/', (req: Request, res: Response) => {
  console.log(req.body)
  res.status(200).json({ message: 'This is mock endpoint' })
})

app.use('/sampleProduct', sampleProductRouter)

app.listen(port, () => console.log(`Listening on port ${port}`))
