import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import './config/database'
const app = express()

// Middlewares
app.use(express.json({ limit: '200mb' }))
app.use(cors())
export { app }
