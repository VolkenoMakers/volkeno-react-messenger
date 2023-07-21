import Avatar from "./assets/avatar.png"
import Profil from "./assets/profil.png"

export const usersList = [
    {
        id: 1,
        name: "Paul",
        lastName: "Gomis",
        email: "paul.gomis@gmail.com",
        avatar: Avatar,
        lastMessage: "Lorem ipsum dolor sit amet consectetur. Cursus magna mollis."
    },
    {
        id: 2,
        name: "Mardoché",
        lastName: "Kiki",
        email: "paul.gomis@gmail.com",
        avatar: Avatar,

        lastMessage: "Lorem ipsum dolor sit amet consectetur. Cursus magna mollis."
    },
    {
        id: 3,
        name: "Mbaye",
        lastName: "Niass",
        email: "paul.gomis@gmail.com",
        avatar: Avatar,

        lastMessage: "Lorem ipsum dolor sit amet consectetur. Cursus magna mollis."
    },
    {
        id: 4,
        name: "Chérif",
        lastName: "Guissé",
        email: "paul.gomis@gmail.com",
        avatar: Avatar,

        lastMessage: "Lorem ipsum dolor sit amet consectetur. Cursus magna mollis."
    }
]

export const recever = {
    id: 5,
    name: "Adama",
    lastName: "Diakhaté",
    email: "diakhateadama36@gmail.com",
    avatar: Profil,
}

export const sender = {
    id: 6,
    name: "Adama",
    lastName: "Diakhaté",
    email: "diakhateadama36@gmail.com",
    avatar: Profil,
}

export const chatData = [
    
    {
        id: 3,
        content: "Creation Ipsum is simply dummy text of the printing and typesetting industry.",
        date: "09:04 PM",
        type: "send",
    },
    {
        id: 1,
        content: "Creation Ipsum is simply dummy text of the printing and typesetting industry.",
        date: "09:04 PM",
        type: "received",
        sender: sender
    },
    {
        id: 2,
        content: "Creation Ipsum is simply dummy text of the printing and typesetting industry.",
        date: "09:04 PM",
        type: "received",
        sender: sender
    },
     {
        id: 5,
        content: "Creation Ipsum is simply dummy text of the printing and typesetting industry.",
        date: "09:04 PM",
        type: "send"
    },
    {
        id: 4,
        content: "Creation Ipsum is simply dummy text of the printing and typesetting industry.",
        date: "09:04 PM",
        type: "received",
        sender: sender
    },
]