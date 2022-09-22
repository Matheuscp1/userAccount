import { createConnection } from 'typeorm'

createConnection()
  .then(() => console.log('🚀 Database Connected!'))
  .catch((err) => {
    console.error('Erro ao conectar no Banco de Dados', err)
  })
