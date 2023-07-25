export const usersList = [
  {
    id: 1,
    prenom: 'Paul',
    nom: 'Gomis',
    email: 'paul.gomis@gmail.com',
    avatar: `https://ui-avatars.com/api/?name=Paul+Gomis`,
    lastMessage: 'Lorem ipsum dolor sit amet consectetur. Cursus magna mollis.'
  },
  {
    id: 2,
    prenom: 'Mardoché',
    nom: 'Kiki',
    email: 'paul.gomis@gmail.com',
    avatar: `https://ui-avatars.com/api/?name=Mardoché+Kiki`,
    lastMessage: 'Lorem ipsum dolor sit amet consectetur. Cursus magna mollis.'
  },
  {
    id: 3,
    prenom: 'Mbaye',
    nom: 'Niass',
    email: 'paul.gomis@gmail.com',
    avatar: `https://ui-avatars.com/api/?name=Mbaye+Niass`,
    lastMessage: 'Lorem ipsum dolor sit amet consectetur. Cursus magna mollis.'
  },
  {
    id: 4,
    prenom: 'Chérif',
    nom: 'Guissé',
    email: 'paul.gomis@gmail.com',
    avatar: `https://ui-avatars.com/api/?name=Chérif+Guissé`,
    lastMessage: 'Lorem ipsum dolor sit amet consectetur. Cursus magna mollis.'
  }
]

export const recever = {
  id: 5,
  prenom: 'Adama',
  nom: 'Diakhaté',
  email: 'diakhateadama36@gmail.com',
  avatar: `https://ui-avatars.com/api/?name=Adama+Diakhaté`
}

export const sender = {
  id: 6,
  prenom: 'Adama',
  nom: 'Diakhaté',
  email: 'diakhateadama36@gmail.com',
  avatar: `https://ui-avatars.com/api/?name=Adama+Diakhaté`
}

export const user = {
  id: 20,
  nom: 'User',
  prenom: 'Current'
}

export const chatData = [
  {
    lastMessage: {
        content: 'Creation Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    user: {
      id: 1,
      prenom: 'Paul',
      nom: 'Gomis',
      email: 'paul.gomis@gmail.com',
      avatar: `https://ui-avatars.com/api/?name=Paul+Gomis`,
    },
    messages: [
      {
        id: 3,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'send',
        sender: {
          id: 1
        },
        avatar: `https://ui-avatars.com/api/?name=Paul+Gomis`,
      },
      {
        id: 1,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      },
      {
        id: 2,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      },
      {
        id: 5,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'send',
        sender: {
            id: 1
          },
          avatar: `https://ui-avatars.com/api/?name=Paul+Gomis`,
      },
      {
        id: 4,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      }
    ],
    count: 5
  },

  {
    lastMessage: {
        content: 'Creation Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    user: {
      id: 2,
      prenom: 'Mardoché',
      nom: 'Kiki',
      email: 'paul.gomis@gmail.com',
      avatar: `https://ui-avatars.com/api/?name=Mardoché+Kiki`,
    },
    messages: [
        {
        id: 1,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      },
      {
        id: 3,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'send',
        sender: {
            id: 2
          },
          avatar: `https://ui-avatars.com/api/?name=Mardoché+Kiki`,
      },
      
      {
        id: 2,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      },
      {
        id: 5,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'send',
        sender: {
            id: 2
          },
          avatar: `https://ui-avatars.com/api/?name=Mardoché+Kiki`,
      },
      {
        id: 4,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      }
    ],
    count: 5
  },
  {
    lastMessage: {
        content: 'Creation Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    user: {
      id: 3,
      prenom: 'Mbaye',
      nom: 'Niass',
      email: 'paul.gomis@gmail.com',
      avatar: `https://ui-avatars.com/api/?name=Mbaye+Niass`,
    },
    messages: [
        {
            id: 3,
            content:
              'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
            date: '09:04 PM',
            type: 'send',
            sender: {
                id: 3
              },
              avatar: `https://ui-avatars.com/api/?name=Mbaye+Niass`,
          },
      {
        id: 1,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      },
      {
        id: 2,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      },
      {
        id: 5,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'send',
        sender: {
            id: 3
          },
          avatar: `https://ui-avatars.com/api/?name=Mbaye+Niass`,
      },
      {
        id: 4,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      }
    ],
    count: 5
  },
  {
    lastMessage: {
        content: 'Creation Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    user: {
      id: 4,
      prenom: 'Chérif',
      nom: 'Guissé',
      email: 'paul.gomis@gmail.com',
      avatar: `https://ui-avatars.com/api/?name=Chérif+Guissé`,
    },
    messages: [
      {
        id: 3,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'send',
        sender: {
            id: 4
          },
          avatar: `https://ui-avatars.com/api/?name=Chérif+Guissé`,
      },
      {
        id: 3,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'send',
        sender: {
            id: 4
          },
          avatar: `https://ui-avatars.com/api/?name=Chérif+Guissé`,
      },
      {
        id: 1,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      },
      {
        id: 2,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      },
      {
        id: 5,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'send',
        sender: {
            id: 4
          },
          avatar: `https://ui-avatars.com/api/?name=Chérif+Guissé`,
      },
      {
        id: 4,
        content:
          'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
        date: '09:04 PM',
        type: 'received',
        sender: sender
      }
    ],
    count: 5
  }
]
export const detailsChatData = [
  {
    id: 3,
    content:
      'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '09:04 PM',
    type: 'send'
  },
  {
    id: 1,
    content:
      'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '09:04 PM',
    type: 'received',
    sender: sender
  },
  {
    id: 2,
    content:
      'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '09:04 PM',
    type: 'received',
    sender: sender
  },
  {
    id: 5,
    content:
      'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '09:04 PM',
    type: 'send'
  },
  {
    id: 4,
    content:
      'Creation Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '09:04 PM',
    type: 'received',
    sender: sender
  }
]
