import bcrypt from 'bcryptjs'

const users =[
    { name:'Admin User',
      email:'admin@example.com',
      password:bcrypt.hashSync('123456',10),
      isAdmin:true
    },
    { name:'Abhisehkk',
      email:'abhi@example.com',
      password:bcrypt.hashSync('123456',10),
    },
    { name:'Remo',
      email:'remo@example.com',
      password:bcrypt.hashSync('123456',10),
    },
]
export default users