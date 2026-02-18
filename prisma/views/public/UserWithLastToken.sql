SELECT
  u.id,
  u.email,
  t.created_at AS lastlogin
FROM
  (
    users u
    JOIN tokens t ON ((t.user_id = u.id))
  );