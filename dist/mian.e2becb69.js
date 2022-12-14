// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ECQE":[function(require,module,exports) {
// ???????????? (??????or??????)
var hashMap = JSON.parse(localStorage.getItem("x")) || [{
  url: "//www.acfun.cn"
}, {
  url: "//www.bilibili.com"
}]; // ????????????

function render() {
  //??????????????????, ???????????????????????????li
  $("li:not(.last)").remove(); //??????????????????

  hashMap.forEach(function (v, i) {
    var $iocUrl = v.url.replace(/.*\/\//, "").replace(/\/.*/, ""); //??????//?????????, ??????/?????????

    var $linkUrl = $iocUrl.replace("www.", "");
    var $li = $("\n          <li>\n            <a href=\"".concat(v.url, "\">\n                <div class=\"site\">\n                    <div class=\"logo\"><img src=\"//").concat($iocUrl, "/favicon.ico\" alt=\"\" onerror=\"this.src='images/page.png';this.onerror=null\"></div>\n                    <div class=\"link\">").concat($linkUrl, "</div>\n                </div>\n            </a>\n            <div class='close'>\n                <svg class=\"icon\">\n                    <use xlink:href=\"#icon-close\"></use>\n                </svg>\n            </div>\n          </li>\n    ")).insertBefore($("li.last")); //??????,????????????

    $li.find(".close")[0].onclick = function () {
      hashMap.splice(i, 1);
      localStorage.setItem("x", JSON.stringify(hashMap)); //??????

      render();
    };
  });
}

render(); // ??????,????????????

$(".addButton").on("click", function () {
  var url = prompt("?????????????????????????????????????"); // ????????????//?????????//

  if (url.indexOf("//") === -1) {
    url = "//" + url;
  } //????????????


  hashMap.push({
    url: url
  }); //?????????????????????

  localStorage.setItem("x", JSON.stringify(hashMap)); //??????

  render();
}); // ??????,????????????

$(document).on("keypress", function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    var url = hashMap[i].url.replace(/.*\/\//, "").replace("www.", "");

    if (url[0] === key) {
      open(hashMap[i].url);
    }
  }
}); // ??????????????????, ?????????input??????????????????????????????

$("input")[0].onkeypress = function (e) {
  e.stopPropagation();
};
},{}]},{},["ECQE"], null)
//# sourceMappingURL=mian.e2becb69.js.map