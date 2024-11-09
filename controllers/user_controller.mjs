import { render } from "ejs";
import User from "../models/user.mjs";
class UserController {
  static async index(req, res) {
    let q = req.query.q;
    q = `.*${q}.*`;
    var re = new RegExp(q);
    let users = await User.find({});
    console.log(users);
    res.render("user", { title: "User Management", users });
  }
  static async new(req, res) {
    res.render("formnew", { title: "User Management" });
  }
  static async delete(req, res) {
    let userdelete = await User.deleteOne({ _id: req.params.id });
    res.redirect("/users");
  }
  static async create(req, res) {
    let { email, name, role } = req.body;
    let user = await User.create({ email, name, role });
    if (user) {
      res.redirect("/users");
    } else {
      res.render("formnew", { title: "User Management" });
    }
  }
  static async edit(req, res) {
    let useredit = await User.findById(req.params.id.trim());
    res.render("formedit", { title: "User Management", user: useredit });
  }
  static async update(req, res) {
    const { email, name, role } = req.body;
    try {
      let userupdate = await User.findByIdAndUpdate(req.params.id.trim(), {
        email,
        name,
        role
      }, { new: true }); // { new: true } returns the updated document
  
      if (userupdate) {
        res.redirect("/users");
      } else {
        res.render("formedit", { title: "User Management", user: userupdate });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating user");
    }
  }
  
}


export default UserController;
