const Epic = require("../model/epic");

exports.getAllEpics = (req, res) => {
  Epic.find()
    .populate("project owner assignedTo")
    .then((epics) => {
      res.status(200).json(epics);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getEpicById = (req, res) => {
  Epic.findById(req.params.id)
    .populate("project owner assignedTo")
    .then((epic) => {
      if (!epic) {
        return res.status(404).json({ message: "Epic not found" });
      }
      res.status(200).json(epic);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.createEpic = (req, res) => {
  const newEpic = new Epic(req.body);
  newEpic
    .save()
    .then((savedEpic) => {
      res.status(201).json(savedEpic);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

exports.updateEpic = (req, res) => {
  Epic.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedEpic) => {
      if (!updatedEpic) {
        return res.status(404).json({ message: "Epic not found" });
      }
      res.status(200).json(updatedEpic);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

exports.deleteEpic = (req, res) => {
  Epic.findByIdAndDelete(req.params.id)
    .then((deletedEpic) => {
      if (!deletedEpic) {
        return res.status(404).json({ message: "Epic not found" });
      }
      res.status(200).json({ message: "Epic deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
