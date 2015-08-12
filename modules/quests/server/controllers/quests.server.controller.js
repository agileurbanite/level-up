'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Quest = mongoose.model('Quest'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a quest
 */
exports.create = function (req, res) {
  var quest = new Quest(req.body);
  quest.user = req.user;
  quest.users.push(quest.user);

  quest.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(quest);
    }
  });
};

/**
 * Show the current quest
 */
exports.read = function (req, res) {
  res.json(req.quest);
};

/**
 * Update a quest
 */
exports.update = function (req, res) {
  var quest = req.quest;

  quest.title = req.body.title;
  quest.content = req.body.content;

  quest.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(quest);
    }
  });
};

/**
 * Delete an quest
 */
exports.delete = function (req, res) {
  var quest = req.quest;

  quest.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(quest);
    }
  });
};

/**
 * List of quests
 */
exports.list = function (req, res) {
  Quest.find().sort('-created').populate('user', 'displayName').exec(function (err, quests) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(quests);
    }
  });
};

/**
 * quest middleware
 */
exports.questByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'quest is invalid'
    });
  }

  Quest.findById(id).populate('user', 'displayName').exec(function (err, quest) {
    if (err) {
      return next(err);
    } else if (!quest) {
      return res.status(404).send({
        message: 'No quest with that identifier has been found'
      });
    }
    req.quest = quest;
    next();
  });
};
