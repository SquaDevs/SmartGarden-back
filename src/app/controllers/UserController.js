const User = require("../models/User");

class UserController {
  async create(req, res) {
    const { email, name, password, username } = req.body;

    if (await User.findOne({ email })) {
      return res.status(409).send();
      // throw new Error("User already exists");
    }

    await User.create({ email, name, password, username });
    return res.status(201).send();
  }
  async show(req, res) {
    const user = await User.findById(req.userId);

    delete user._doc.password;
    delete user._doc.__v;

    return res.json({ user });
  }

  async update(req, res) {
    const { name, username } = req.body;

    if (!(name || username)) {
      return res.status(406).json({ error: "No data to be updated" });
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
  }

  async delete(req, res) {
    await User.findByIdAndDelete(req.userId);
    return res.send();
  }
}

module.exports = new UserController();
