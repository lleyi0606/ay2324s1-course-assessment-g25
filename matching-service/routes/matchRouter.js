const express = require('express')
const matchController = require("../controllers/matchController");
const matchRouter = express.Router();

matchRouter.post("/", matchController.findMatch)
matchRouter.delete("/deleteMatch/:username", matchController.cancelFindMatch)
matchRouter.get("/getPair/:username", matchController.getPairByUsername)
matchRouter.delete("/deletePair/:username", matchController.deletePair)
matchRouter.get("/pair", matchController.getAllPairs)
matchRouter.get("/matching", matchController.getAllMatch)

module.exports = matchRouter