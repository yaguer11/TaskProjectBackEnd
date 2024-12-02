const Story = require("../model/story");
const Task = require("../model/task");

exports.getAllStories = (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "Usuario no autorizado." });
  }

  Story.find({ owner: userId }) // Filtra solo las historias del usuario logueado.
    .populate("epic owner assignedTo")
    .then((stories) => {
      res.status(200).json({ data: stories });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error al recuperar historias." });
    });
};

exports.getStoryById = (req, res) => {
  Story.findById(req.params.id)
    .populate("epic owner assignedTo")
    .then((story) => {
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.status(200).json(story);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getStoriesByEpicId = (req, res) => {
  const { epicId } = req.params;

  Story.find({ epic: epicId })
    .populate("epic owner assignedTo")
    .then((stories) => {
      if (!stories.length) {
        return res
          .status(404)
          .json({ message: "No stories found for this epic" });
      }
      res.status(200).json({ data: stories });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.createStory = (req, res) => {
  const newStory = new Story(req.body);
  newStory
    .save()
    .then((savedStory) => {
      res.status(201).json(savedStory);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

exports.updateStory = (req, res) => {
  Story.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedStory) => {
      if (!updatedStory) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.status(200).json(updatedStory);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

exports.deleteStory = (req, res) => {
  const { id } = req.params;
  Task.find({ story: id })
    .then((tasks) => {
      if (tasks.length > 0) {
        return res.status(400).json({
          message: "No se puede eliminar: la historia tiene tareas asociadas.",
        });
      }
      return Story.findByIdAndDelete(id).then((deletedStory) => {
        if (!deletedStory) {
          return res.status(404).json({ message: "Historia no encontrada." });
        }
        res.status(200).json({ message: "Historia eliminada exitosamente." });
      });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};
