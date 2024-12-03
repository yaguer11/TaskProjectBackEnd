const Epic = require("../model/epic");
const Story = require("../model/story");

exports.getAllEpics = (req, res) => {
  Epic.find()
    .populate("project")
    .then((epics) => {
      res.status(200).json(epics);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getEpicById = (req, res) => {
  const { id, projectId, epicId } = req.params;

  if (projectId && epicId) {
    Epic.findOne({ _id: epicId, project: projectId })
      .populate("project")
      .then((epic) => {
        if (!epic) {
          return res
            .status(404)
            .json({ message: "Epic not found in this project" });
        }
        res.status(200).json(epic);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else if (id) {
    Epic.findById(id)
      .populate("project")
      .then((epic) => {
        if (!epic) {
          return res.status(404).json({ message: "Epic not found" });
        }
        res.status(200).json(epic);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(400).json({ message: "Invalid request. Missing parameters." });
  }
};

exports.getEpicsByProjectId = (req, res) => {
  const { projectId } = req.params;

  Epic.find({ project: projectId })
    .then((epics) => {
      res.status(200).json({ data: epics });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error obtaining epics", error });
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
  const { id } = req.params;

  Epic.findByIdAndUpdate(id, req.body, { new: true })
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
  const { id } = req.params;

  Story.find({ epic: id })
    .then((stories) => {
      if (stories.length > 0) {
        return res.status(400).json({
          message: "No se puede eliminar la épica: tiene historias asociadas.",
        });
      }
      return Epic.findByIdAndDelete(id).then((deletedEpic) => {
        if (!deletedEpic) {
          return res.status(404).json({ message: "Épica no encontrada." });
        }
        res.status(200).json({ message: "Épica eliminada exitosamente." });
      });
    })
    .catch((error) => {
      console.error("Error no controlado:", error);
      if (!res.headersSent) {
        res.status(500).json({
          message: "Error al eliminar la épica.",
          error: error.message || error,
        });
      }
    });
};
