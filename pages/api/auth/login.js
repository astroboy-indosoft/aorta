import { comparePassword, findUserByNormalizedEmail } from './users-store';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password } = req.body;
  const normalizeemail = email.toLowerCase();

  const user = findUserByNormalizedEmail(normalizeemail);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const valid = await comparePassword(password, user.hashed_password);

  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.status(200).json({ message: 'Login success', userId: user.id });
}
