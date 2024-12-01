const Project = require("../model/project");
const Epic = require("../model/epic");

exports.getAllProjects = (req, res) => {
  const userId = req.userId;

  Project.find({
    $or: [{ owner: userId }, { members: userId }],
  })
    .populate("members owner")
    .then((projects) => {
      res.status(200).json({ data: projects });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getProjectById = (req, res) => {
  Project.findById(req.params.id)
    .populate("members owner")
    .then((project) => {
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.createProject = (req, res) => {
  const newProject = new Project(req.body);
  newProject
    .save()
    .then((savedProject) => {
      res.status(201).json(savedProject);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

exports.updateProject = (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedProject) => {
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json(updatedProject);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;

  Epic.find({ project: id })
    .then((epics) => {
      if (epics.length > 0) {
        return res.status(400).json({
          message: "No se puede eliminar el proyecto: tiene épicas asociadas.",
        });
      }
      return Project.findByIdAndDelete(id).then((deletedProject) => {
        if (!deletedProject) {
          return res.status(404).json({ message: "Proyecto no encontrado." });
        }
        return res
          .status(200)
          .json({ message: "Proyecto eliminado exitosamente." });
      });
    })
    .catch((error) => {
      console.error("Error al eliminar el proyecto:", error);
      res.status(500).json({
        message: "Error al eliminar el proyecto.",
        error: error.message,
      });
    });
};
