export default function isAuthenticated() {
  const token = (
    (localStorage.getItem('token') !== null)
      ? JSON.parse(localStorage.getItem('token'))
      : undefined
  );

  if (!token) {
    return false;
  }

  return true;
}
