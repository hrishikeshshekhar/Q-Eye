var mongoose = require("mongoose");
var fs = require("fs");
var multer = require("multer");
var path = require("path");
var express = require("express");
var router = express.Router();
var FCM = require("fcm-push");

var serverkey =
  "AAAAxvVzlqY:APA91bFSoT0mqiy1tzs96ZfRVfPVOU923tXCMkmMtct30HHKWLsr6CEtFXjCZ-tlO1Iv61hIUpgMMVfFTHRKK_Mao-DZb9wg2SYHrxKk2ETco1z7si7UtehVWqfAVxc7V4NxyG8K3p3O";
var fcm = new FCM(serverkey);

function runqEye(filepath) {
  var spawn = require("child_process").spawn;
  var process = spawn("python", ["./qEye.py", filepath]);

  process.stdout.on("data", function(data) {
    data = JSON.parse(data);
  });
}

const storage = multer.diskStorage({
  destination: "./public/images2process/",
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("file");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Jpeg Images Only!");
  }
}

router.post("/sendimg", function(req, res) {
  upload(req, res, function(err) {
    if (err) throw err;
    else res.status(200).json({ success: "true" });
    // var { isThreat, imageUrl, confidence } = runqEye(req.file.path.toString());

    // var message = {
    //   to:
    //     "fmYOSjDJQX4:APA91bFN4zqKSTAEHYH6iy7NTHlIZc1SybmgDG37sEbzRX0-S0ryRUssjYoQHSPjsphgyYcdinqp8sMBNJ-yOqLLZUTVKkWraKKaOQCtnjzxZvOD6I4px0j3T8yjDeX8ln6zKtKmZ4ma",
    //   data: {
    //     imageUrl: imageUrl
    //   },
    //   notification: {
    //     title: "",
    //     body: "Alert threat detected!!!"
    //   }
    // };

    // if (isThreat) {
    //   fcm.send(message, function(err, response) {
    //     if (err) {
    //       console.log("Something has gone wrong !");
    //     } else {
    //       console.log("Successfully sent with resposne :", response);
    //     }
    //   });
    //   fs.rename(
    //     imageUrl,
    //     "./public/threats/" + imageUrl.split("/").pop(),
    //     function() {
    //       res.json({
    //         isThreat: isThreat,
    //         imageUrl: imageUrl,
    //         confidence: confidence
    //       });
    //     }
    //   );
    // } else {
    //   fs.rename(
    //     imageUrl,
    //     "./public/processedImages/" + imageUrl.split("/").pop(),
    //     function() {
    //       res.json({
    //         isThreat: isThreat,
    //         message: "Alert threat detected!!!",
    //         imageUrl: imageUrl,
    //         confidence: confidence
    //       });
    //     }
    //   );
    // }
  });
});

module.exports = router;
