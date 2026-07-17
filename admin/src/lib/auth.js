export function getToken() {
  return localStorage.getItem("admin_token");
}

export function isLoggedIn() {
  return !!getToken();
}
