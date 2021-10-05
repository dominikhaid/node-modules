const express = require("express");
const router = express.Router();
const uploadArray = require("../includes/uploads").uploadArray;
const fileTypes = require("../includes/uploads").fileTypes;

const checkReqErrors = require("../includes/status").checkReqErrors;

router.post("/", function (req, res) {
  uploadArray(req, res, fileTypes);
});

router.get("/", function (req, res) {
  checkReqErrors({ msg: fileTypes }, res);
});

module.exports = router;
