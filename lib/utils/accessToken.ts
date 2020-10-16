let accessToken = "";

export const setAccessToken = (inputAccessToken: string) => {
  accessToken = inputAccessToken;
};

export const getAccessToken = () => {
  return accessToken;
};
