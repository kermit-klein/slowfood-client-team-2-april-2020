import axios from "axios";

const register = async (email, password, password_confirmation) => {
  try {
    const response = await axios.post("/auth", {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    });
    return { registered: true, message: response };
  } catch (error) {
    return { registered: false, message: error.message };
  }
};

export { register };
