import { Router } from 'express'
import { AccountRouter } from './userAccount.routes'


const router = Router()

router.use(AccountRouter)


export { router }
