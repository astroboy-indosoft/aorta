import bcrypt from 'bcryptjs';

let users = [];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { firstname, lastname, username, email, password } = req.body;

  const normalizeemail = email.toLowerCase();

  const existing = users.find(u => u.normalizeemail === normalizeemail);
  if (existing) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashed_password = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    firstname,
    lastname,
    username,
    email,
    normalizeemail,
    hashed_password,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null
  };

  users.push(user);

  return res.status(201).json({ id: user.id });
}
