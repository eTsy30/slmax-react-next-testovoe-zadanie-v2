// authOptions.ts
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import fs from 'fs/promises'
import { uuid } from 'uuidv4'
import GoogleProvider from 'next-auth/providers/google'
interface User {
  id: string // Добавляем поле id
  email: string
  password: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      name: 'GoogleProvider',
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password' },
        register: { label: 'Register', type: 'checkbox' },
      },
      authorize: async (credentials, req) => {
        let users: User[] = []
        try {
          const data = await fs.readFile('users.json')
          users = JSON.parse(data.toString())
        } catch (error) {}

        if (credentials?.register) {
          console.log(credentials?.register, '+++++')

          const existingUser = users.find(
            (user) => user.email === credentials.email
          )
          if (existingUser) {
            return Promise.reject('User with this email already exists')
          }

          const id = uuid()

          const newUser: User = {
            id,
            email: credentials?.email,
            password: credentials?.password,
          }
          users.push(newUser)

          await fs.writeFile('users.json', JSON.stringify(users))

          return Promise.resolve(newUser)
        } else {
          const user = users.find(
            (user) =>
              user.email === credentials?.email &&
              user.password === credentials.password
          )
          if (user) {
            return Promise.resolve(user)
          } else {
            return Promise.reject('Invalid email or password')
          }
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/singIn',
  },
}
