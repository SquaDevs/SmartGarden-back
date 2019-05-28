const User = require("../models/User");
class SessionController {
  async create(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: "Invalid password" });
      }

      return res.json({
        username: user.username,
        email: user.email,
        name: user.name,
        token: User.generateToken(user)
      });
    } catch (error) {
      return res.status(500).json({ error: "Something  went wrong" });
    }
  }

  async delete(req, res) {}
}

module.exports = new SessionController();
