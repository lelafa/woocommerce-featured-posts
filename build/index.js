/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('featured-post/featured-post', {
  title: 'Featured Post',
  icon: 'megaphone',
  category: 'widgets',
  edit: () => {
    const [posts, setPosts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const [selectedPosts, setSelectedPosts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const [postTitles, setPostTitles] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const [postExcerpts, setPostExcerpts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
      fetch('/wp-json/featured-post/v1/selected-posts').then(response => response.json()).then(data => {
        const dataArray = Object.values(data);
        console.log(dataArray);
        setSelectedPosts(dataArray.map(post => post.ID));
        setPostTitles(dataArray.map(post => post.post_title));
        setPostExcerpts(dataArray.map(post => post.post_content));
        setPosts(data);
      }).catch(error => console.error('Error:', error));
    }, []);

    // If posts is null, return null (don't render anything)
    if (posts === null) {
      return null;
    }

    // If posts is an empty array, return 'No posts'
    if (posts.length === 0) {
      return 'No posts';
    }
    console.log(selectedPosts);
    console.log(postTitles);
    console.log(postExcerpts);
    console.log(posts);
    console.log(Object.keys(posts));

    // If posts is not null and not an empty array, map over the posts and render them
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "featured-posts"
    }, selectedPosts.map((post, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: "featured-post"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "featured-post-title"
    }, postTitles[index]), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "featured-post-excerpt"
    }, postExcerpts[index]))));
  }
  /*
  
  save: ( { attributes } ) => { 
      console.log(attributes);
  
      return (
          <div className="featured-posts">
                  <div className="featured-post" >
                      <h2 className="featured-post-title">
                          {attributes.postTitles.map(Title => Title)}
                      </h2>
                      <span className="featured-post-excerpt">{attributes.postExcerpts.map(Excerpt => Excerpt)}</span>
                  </div>
          </div>
      );
  },
  */
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map