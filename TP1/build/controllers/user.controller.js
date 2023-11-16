"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUserByID = exports.listUsers = void 0;
const staticUsers = [
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
];
const listUsers = async (request, reply) => {
    Promise.resolve(staticUsers)
        .then((users) => {
        reply.send({ data: users });
    });
};
exports.listUsers = listUsers;
const getUserByID = (request, reply) => {
    const userId = Number(request.params.id);
    const user = staticUsers.find((u) => u.id === userId);
    if (user) {
        reply.send({ data: user });
    }
    else {
        reply.status(404).send({ error: 'User not found' });
    }
};
exports.getUserByID = getUserByID;
const addUser = (request, reply) => {
    const body = request.body;
    const newId = Math.max(...staticUsers.map(user => user.id)) + 1;
    console.log(body.name);
    const newUser = {
        id: newId,
        name: body.name,
    };
    staticUsers.push(newUser);
    reply.send({ data: newUser, message: 'User added successfully' });
};
exports.addUser = addUser;
//# sourceMappingURL=user.controller.js.map