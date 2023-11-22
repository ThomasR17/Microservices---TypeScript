import { FastifyReply, FastifyRequest } from "fastify"
import { IUser } from "interfaces"

const staticUsers: IUser[] = [
    {
        id: 1,
        name: 'Joyce Byers'
    },
    {
        id: 2,
        name: 'Mike Wheeler'
    },
    {
        id: 3,
        name: 'Eleven'
    },
    {
        id: 4,
        name: 'Jason Statham'
    },
    {
        id: 5,
        name: 'Twelve'
    },
]

interface CustomRequestParams extends FastifyRequest{
    params: {
        id: Number
    }
}

export const listUsers = async (
 request: FastifyRequest, 
 reply: FastifyReply) => {

  Promise.resolve(staticUsers)
  .then((users) => {
	reply.send({ data: users })
  })
}

export const getUserByID = (request: CustomRequestParams, reply: FastifyReply) => {
    const userId = Number(request.params.id);
    const user = staticUsers.find((u) => u.id === userId);

    if (user) {
        reply.send({ data: user });
    } else {
        reply.status(404).send({ error: 'User not found' });
    }
}

interface CustomRequestBody extends FastifyRequest{
    body: {
        name: string
        score: number
    }
} 

export const addUser = (request: CustomRequestBody, reply: FastifyReply) => {
    const newId = Math.max(...staticUsers.map(user => user.id)) + 1;

    const newUser: IUser = ({
        id: newId,
        name: request.body.name,
        score: request.body.score,
    })
    console.log(newUser);
    staticUsers.push(newUser);

    reply.send({ data: newUser, message: 'User added successfully' });
}

import type * as s from 'zapatos/schema'
import * as db from 'zapatos/db'
import pool from '../db/pgPool'

export const dblistUsers = 
  async (request: FastifyRequest, reply: FastifyReply) => {
    return db.sql<s.users.SQL, s.users.Selectable[]>`SELECT * FROM ${"users"}`
    .run(pool)
    .then((users) => ({ data: users }))
    // Or .then((users) => reply.send({ data: users }))
}


export const dbaddUsers = async (request: CustomRequestBody, reply: FastifyReply) => {
    const { name, score } = request.body;

    try {
        // Utilisation correcte de la requête SQL générée par Zapatos
        const result = await db.sql<s.users.SQL, s.users.Selectable[]>`
            INSERT INTO ${"users"} (name, score)
            VALUES (${'name'}, ${'score'})
        `.run(pool);

        return { data: result };
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'utilisateur :', error);
        reply.status(500).send({ error: 'Erreur lors de l\'ajout d\'utilisateur' });
    }
};  