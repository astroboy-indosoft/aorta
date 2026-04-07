import {
  createUser,
  findUserByNormalizedEmail,
  hashPassword
} from './users-store';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { firstname, lastname, username, email, password } = req.body;

  const normalizeemail = email.toLowerCase();

  const existing = findUserByNormalizedEmail(normalizeemail);
  if (existing) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashed_password = await hashPassword(password);
  const user = createUser({
    firstname,
    lastname,
    username,
    email,
    normalizeemail,
    hashed_password
  });

  return res.status(201).json({ id: user.id });
}
