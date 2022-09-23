import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import './config/database'
import { router } from './routes/router'
const app = express()

// Middlewares
app.use(express.json({ limit: '200mb' }))
app.use(cors())
app.use('/api/', router)
export { app }
// yotutube REACT SISTEMA DE LOGIN