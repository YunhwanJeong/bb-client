import { getAccessToken, setAccessToken } from "./accessToken";

const silentRefresh = () => {
  return fetch("http://localhost:4000/auth/refresh-token", {
    method: "POST",
    credentials: "include",
  });
};

const fetchMe = () => {
  return fetch("http://localhost:4000/auth/me", {
    method: "GET",
    headers: {
      authorization: "bearer " + getAccessToken(),
    },
  });
};

export const checkLoginStatus = async (serverAccessToken) => {
  if (serverAccessToken) setAccessToken(serverAccessToken);
  if (!getAccessToken()) {
    const response = await silentRefresh();
    const { ok, accessToken } = await response.json();
    if (!ok) return null;
    setAccessToken(accessToken);
  }
  const response = await fetchMe();
  return await response.json();
};
