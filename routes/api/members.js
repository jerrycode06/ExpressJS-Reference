const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../Members");

//This routes gets all members
router.get("/", (req, res) => res.json(members));

//Get single members
router.get("/:id", (req, res) => {
  // res.send(req.params.id);
  const found = members.some((member) => member.id === parseInt(req.params.id)); // some returns True or False if condition in callback is true or false
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id))); //filter humko id number ke hisaab se data dega
  } else {
    res
      .status(400)
      .json({ msg: `No Member found with the id ${req.params.id}` });
  }
});

//Create member
router.post("/", (req, res) => {
  // res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please Include Name and Email" });
  }
  members.push(newMember);
  res.json(members);
  // res.redirect("/");
});

//Update Members
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMem = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMem.name ? updateMem.name : member.name;
        member.email = updateMem.email ? updateMem.email : member.email;

        res.json({ msg: "member Updated ", member });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No Member found with the id ${req.params.id}` });
  }
});

//Delete Members
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member Deleted",
      member: members.filter((member) => member.id !== parseInt(req.params.id)),
    });
  } else {
    res
      .status(400)
      .json({ msg: `No Member found with the id ${req.params.id}` });
  }
});

module.exports = router;
