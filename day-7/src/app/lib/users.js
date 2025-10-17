import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const usersFilePath = path.join(process.cwd(), 'users.json');

function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
    throw error;
  }
}

export async function addUser(user) {
  try {
    const users = readUsers();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    
    const newUser = {
      id: Date.now().toString(),
      name: user.name,
      email: user.email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    return newUser;
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
}

export async function findUserByEmail(email) {
  try {
    const users = readUsers();
    const user = users.find(u => u.email === email);
    return user || null;
  } catch (error) {
    console.error('Error in findUserByEmail:', error);
    return null;
  }
}

export async function findUserByCredentials(email, password) {
  try {
    console.log('Looking for user with credentials:', { email });
    
    const users = readUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      console.log('User not found');
      return null;
    }
    
    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) {
      console.log('Password match found');
      return user;
    } else {
      console.log('Password does not match');
      return null;
    }
  } catch (error) {
    console.error('Error in findUserByCredentials:', error);
    return null;
  }
}