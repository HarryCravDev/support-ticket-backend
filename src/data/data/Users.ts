import IUser from "../../types/IUser";
const bcrypt = require('bcrypt');

const users: IUser[] = [
    {
        name: 'John Doe',
        email: "johndoe@email.com",
        password: bcrypt.hashSync('password', 10),
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: "janedoe@email.com",
        password: bcrypt.hashSync('password', 10),
        isAdmin: false,
    },
    {
        name: 'Harry Craven',
        email: "harry@email.com",
        password: bcrypt.hashSync('password', 10),
        isAdmin: true,
    }
];

export default users;