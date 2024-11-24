const Project = require("../model/project");

exports.getAllProjects = (req, res) => {
  Project.find()
    .populate("members owner")
    .then((projects) => {
      res.status(200).json(projects);
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
  Project.findByIdAndDelete(req.params.id)
    .then((deletedProject) => {
      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json({ message: "Project deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
