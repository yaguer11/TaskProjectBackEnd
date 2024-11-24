const Story = require("../model/story");

exports.getAllStories = (req, res) => {
  Story.find()
    .populate("epic owner assignedTo")
    .then((stories) => {
      res.status(200).json(stories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
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
  Story.findByIdAndDelete(req.params.id)
    .then((deletedStory) => {
      if (!deletedStory) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.status(200).json({ message: "Story deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
