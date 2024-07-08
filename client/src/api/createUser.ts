import axios from 'axios';
import type { CreateUserRequest } from '../../../shared/types';

export default async function createUser(email: string) {
  const request: CreateUserRequest = {email}
  await axios.post('http://localhost:3000/createUser', request);
}