# Create Login Process

## Database
```
table: users (
  id int (auto),
  firstname varchar(100),
  lastname varchar(100),
  username varchar(50),
  email varchar(80),
  normalizeemail varchar(80),
  hashed_password varchar(255),
  created_at datetime,
  created_by int,
  updated_at datetime,
  updated_by int,
  deleted_at datetime nullable
)
```

## Notes
- Password must be stored using bcrypt
- normalizeemail = lowercase(email)

## Tasks
- Create Login Process (email + password)
- Implement CRUD Users
- Implement Update Profile

## Features
- Register user
- Login user
- Update user profile
- Soft delete user (deleted_at)
