const moment = require("moment");
const multer = require("multer");

const checkReqErrors = require("./status").checkReqErrors;

const fileTypes = [
  "image/png",
  "image/jpg",
  "image/svg+xml",
  "image/gif",
  "image/tiff",
  "text/plain",
  "text/csv",
  "application/pdf",
];

module.exports.fileTypes = fileTypes;

async function uploadArray(req, res, fileTypes) {
  let uploaded = [];

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../uploads");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.originalname.slice(0, file.originalname.lastIndexOf(".")) +
          "-" +
          moment().format("DD_MM_YY_hh-mm") +
          file.originalname.slice(
            file.originalname.lastIndexOf("."),
            file.originalname.length
          )
      );
      uploaded.push(file.originalname);
    },
  });

  var upload = multer({
    storage: storage,
    fileFilter: function fileFilter(req, file, cb, next) {
      if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(null, false);
        cb(new Error({ err: "Filetype not supported" }));
      }
    },
  }).array("photo");

  upload(req, res, function (err) {
    if (err) {
      checkReqErrors({ error: err }, res);
    } else {
      checkReqErrors(
        { msg: { status: "Upload Complete", files: uploaded.join() } },
        res
      );
    }
  });
}

module.exports.uploadArray = uploadArray;
