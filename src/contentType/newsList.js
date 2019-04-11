const UglifyJS = require("uglify-js");
const babel = require("@babel/core");
const fs = require("fs");
const path = require('path');

class NewsList {
  constructor() {
  }

  getTemplateFile() {
    return fs.readFileSync(path.join(__dirname, "template/news-list.js"), { "encoding": "utf-8" });
  }

  // This function will hrows the exception.
  // e.g. file not found.
  generate(defaultTypes) {
    defaultTypes.forEach(type => {
      console.log(type);
    });

    const options = {"presets": ["@babel/preset-env"]}
    let result = babel.transformSync(this.getTemplateFile(), options);

    return UglifyJS.minify(result.code);
  }
}

module.exports = NewsList;
