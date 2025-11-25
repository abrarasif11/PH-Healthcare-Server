const loginUser = async (payload: { email: string; password: string }) => {
  console.log("User Login", payload);
};
export const AuthServices = {
  loginUser,
};
