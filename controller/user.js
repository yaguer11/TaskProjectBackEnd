const User = require("../model/user");

exports.updateProfile = (req, res) => {
  const userId = req.userId;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(updatedUser);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};
