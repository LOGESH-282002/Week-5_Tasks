import fs from 'fs'
import path from 'path'

const USERS_FILE = path.join(process.cwd(), 'users.json')

function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users file:', error)
    return { users: [] }
  }
}

function writeUsers(usersData) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usersData, null, 2))
  } catch (error) {
    console.error('Error writing users file:', error)
    throw error
  }
}

export async function addUser(user) {
  try {
    const usersData = readUsers()
    
    const newUser = {
      id: Date.now().toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: new Date().toISOString()
    }
    
    usersData.users.push(newUser)
    writeUsers(usersData)
    
    return newUser
  } catch (error) {
    console.error('Error in addUser:', error)
    throw error
  }
}

export async function findUserByEmail(email) {
  try {
    const usersData = readUsers()
    const user = usersData.users.find(u => u.email === email)
    return user || null
  } catch (error) {
    console.error('Error in findUserByEmail:', error)
    return null
  }
}

export async function findUserByCredentials(email, password) {
  try {
    console.log('Looking for user with credentials:', { email, password })
    
    const usersData = readUsers()
    const user = usersData.users.find(u => u.email === email && u.password === password)
    
    console.log('Match found:', user)
    return user || null
  } catch (error) {
    console.error('Error in findUserByCredentials:', error)
    return null
  }
}