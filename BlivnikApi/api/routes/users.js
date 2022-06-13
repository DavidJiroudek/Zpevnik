var express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
//const auth = require('../middleware/auth')
var router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findUser(req.body.username, req.body.password)
    if(user === false){
      res.send({ user: false, token: false })
      return null;
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
} catch (e) {
    res.status(400).send(e)
}
});


router.post("/register", async (req, res) => {
  const user = new User(req.body)
  try {
  await user.save()
  const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
  }catch(e) {
      res.status(400).send(e)
  }
});

router.get("/isLogged", auth, async (req, res) => {
  res.send({isLogged: true})
});

// router.get("/logOut", async (req, res) => {
//   try {
//     const _id = req.query.songId;
//     await User.findByIdAndRemove(_id);
//     res.send("Token smazán");
// } catch(e) {
//     res.status(500).send();
// }
// });

module.exports = router;
