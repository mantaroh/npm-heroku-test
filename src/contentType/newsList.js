const UglifyJS = require("uglify-js");
const babel = require("@babel/core");
const fs = require("fs");

class NewsList {
  constructor() {
  }

  getHeader() {
//    return fs.readFileSync("template/news-list.js", { "encode": "utf8"});
    return `
class HeadlesCMSNewsList extends HTMLElement {
  constructor() {
    super();
    this.onReceiveData('{"schemas": [{"title": "news1","link": "http://www.google.com"},{"title": "news2","link": "http://www.google.com"},{"title": "news3","link": "http://www.google.com"}]}');
  }

  onReceiveData(json) {
    // This class has one of ShadowDOM which has the one div element(wrapper element).
    let wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');
    let shadow = this.attachShadow({mode: 'open'});

    // This style will be applied whole of this custom elements.
    let style = document.createElement('style');
    style.textContent =  \`
      .wrapper {
        background-color: grey;
        width: 80%;
        margin: 0 auto 0 auto;
        border: dashed 3px;
      }\`;

    // Append child element based on the received json data from API server.
    try {
      let datas = JSON.parse(json);

      let ulElem = document.createElement('ul');
      wrapper.appendChild(ulElem);

      datas.schemas.forEach(link => {
        let liElem = document.createElement('li');
        let aElem = document.createElement('a');
        aElem.setAttribute('href', link.link);

        aElem.textContent = link.title;
        liElem.appendChild(aElem);
        ulElem.appendChild(liElem);
      });
    } catch(e) {
      console.log(e);
    }

    // Append wrapper element and style element into this ShadowDOM.
    shadow.appendChild(wrapper);
    shadow.appendChild(style);
  }
}

// Register the custom element.
customElements.define('headless-news-list', headlesCMSNewsList);`;
  }

  // This function will hrows the exception.
  // e.g. file not found.
  generate(defaultTypes) {
    defaultTypes.forEach(type => {
      console.log(type);
    });

    const options = {"presets": ["@babel/preset-env"]}
    let result = babel.transformSync(this.getHeader(), options);

    return UglifyJS.minify(result.code);
  }
}

module.exports = NewsList;
