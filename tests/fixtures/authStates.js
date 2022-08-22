export const initialState = {
  status: "checking", // 'authenticated', 'no-authenticated'
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: "authenticated", // 'authenticated', 'no-authenticated'
  user: {
    uid: "ABC",
    NAME: "Fernando",
  },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: "no-authenticated", // 'authenticated', 'no-authenticated'
  user: {},
  errorMessage: undefined,
};
