import ITicket from "src/types/ITicket";
const bcrypt = require('bcrypt');

const tickets: ITicket[] = [
    {
        user: "5e9f8f8f8f8f8f8f8f8f8f8",
        product: "iPhone",
        description: "iPhone is broken",
        status: "open",
    },
    {
        user: "5e9f8f8f8f8f8f8f8f8f8f8",
        product: "MacBook Air",
        description: "MacBook Air is broken",
        status: "open",
    },
    {
        user: "5e9f8f8f8f8f8f8f8f8f8f8",
        product: "iPad",
        description: "iPad is broken",
        status: "open",
    },
    {
        user: "5e9f8f8f8f8f8f8f8f8f8f8",
        product: "MacBook Pro",
        description: "MacBook Pro is broken",
        status: "open",
    },
    {
        user: "5e9f8f8f8f8f8f8f8f8f8f8",
        product: "iPhone",
        description: "iPhone is broken",
        status: "open",
    }
];

export default tickets;