const fs = require("fs");

const get = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("api/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const save = data => {
  return new Promise((resolve, reject) => {
    var json = JSON.stringify(data);
    fs.writeFile("api/db.json", json, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.get = get;
exports.save = save;
