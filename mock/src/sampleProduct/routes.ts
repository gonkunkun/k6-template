import { Router, Request, Response } from 'express'

const router = Router()

router.get('/sample', (req: Request, res: Response) => {
  console.log(req.body)
  res.status(200).json({ message: 'This is sampleProduct endpoint' })
})

router.use((req: Request, res: Response) => {
  console.log(req.body)
  res.status(200).json({ message: 'OK' })
})

export default router
