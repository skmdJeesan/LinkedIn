export const register = async (req, res) => {
  res.json({
    message: "User registered"
  });
};

export const login = async (req, res) => {
  res.json({
    message: "User logged in"
  });
}