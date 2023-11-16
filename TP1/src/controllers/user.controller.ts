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
    }
} 

export const addUser = (request: CustomRequestBody, reply: FastifyReply) => {
    const newId = Math.max(...staticUsers.map(user => user.id)) + 1;

    const newUser: IUser = ({
        id: newId,
        name: request.body.name,
    })
    console.log(newUser);
    staticUsers.push(newUser);

    reply.send({ data: newUser, message: 'User added successfully' });
}