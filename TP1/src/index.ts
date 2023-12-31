import fastify from 'fastify'
import userRouter from './routes/user.router'
import 'dotenv/config'
import { initDB } from './db/initDB';

const port = 5000;

const startServer = async () => {

	try{
		await initDB().then(()=>console.log("Initialisation")).catch((err)=>console.log(err))
	}catch(err){
		console.log(err)
	}

  try {
	const server = fastify()

	const errorHandler = (error, address) => {
  	server.log.error(error, address);
	}

	server.register(userRouter, { prefix: '' })

	await server.listen({ port }, errorHandler)
  } catch (e) {
	console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.error(e)
  process.exit(1)
})

startServer()