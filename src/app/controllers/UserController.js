const User = require("../models/User");

class UserController {
  async create(req, res) {
    try {
      const { email, name, password, username } = req.body;

      if (await User.findOne({ email })) {
        return res.status(409).send();
        // throw new Error("User already exists");
      }

      await User.create({ email, name, password, username });
      return res.status(201).send();
    } catch (error) {
      return res.status(500).json({ error: "Something  went wrong" });
    }
  }
  async show(req, res) {
    try {
      const user = await User.findById(req.userId);

      delete user._doc.password;
      delete user._doc.__v;

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ error: "Something  went wrong" });
    }
  }

  async update(req, res) {
    try {
      const { name, username } = req.body;

      if (!(name || username)) {
        return res.status(500).json({ error: "No data to be updated" });
      }

      const user = await User.findById(req.userId);

      let useToUp = { ...user["_doc"] };

      useToUp.name = name || useToUp.name;
      useToUp.username = username || useToUp.username;

      const resul = await User.findOneAndUpdate(req.userId, useToUp, {
        new: true
      });

      delete resul["_doc"].password;
      delete resul["_doc"].__v;

      return res.json({ user: resul });
    } catch (error) {
      return res.status(500).json({ error: "Something  went wrong" });
    }
  }

  async delete(req, res) {
    try {
      await User.findByIdAndDelete(req.userId);
      return res.send();
    } catch (error) {
      return res.status(500).json({ error: "Something  went wrong" });
    }
  }
}

module.exports = new UserController();
