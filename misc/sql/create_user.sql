INSERT INTO users (
    uuid,
    "createdAt",
    "updatedAt",
    name,
    email,
    password,
    role
  )
VALUES (
    gen_random_uuid(),
    now(),
    now(),
    'ilya',
    'flamewowilia@gmail.com',
    '1024$7t2c+XzKV0Qo7iv2oC7YvZrnNHH/sDyx8i7fZKXcKdh13njDFx2YkupAdcHUmvOfJT8ALuRJZIR3EVU30o7sNg==$d612c15bb8b1497f18ef1af2d8feed306ee39af4fbb51bcff9864b9baf1a8813b8cde92e62150ddc5ccbe59c0fba67c94cb7d5ac7206232b97695d66ca8a864c',
    1
  );