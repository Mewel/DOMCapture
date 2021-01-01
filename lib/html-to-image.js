// changes to original html-to-image
// - use global window.htmlToImage variable
// - export htmlToImage.util
// add fetchBlobFromExtension function line 1037 (failed getBlobFromURL)

window.htmlToImage = null;

// *********************** transpiled code here **********************

(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {exports: {}};
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }

        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }

    return r
})()({
    1: [function (require, module, exports) {
        window.htmlToImage = require('html-to-image');
    }, {"html-to-image": 10}], 2: [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {value: true});
        exports.applyStyleWithOptions = void 0;

        function applyStyleWithOptions(clonedNode, options) {
            var style = clonedNode.style;
            if (options.backgroundColor) {
                style.backgroundColor = options.backgroundColor;
            }
            if (options.width) {
                style.width = options.width + "px";
            }
            if (options.height) {
                style.height = options.height + "px";
            }
            var manual = options.style;
            if (manual != null) {
                Object.keys(manual).forEach(function (key) {
                    style[key] = manual[key];
                });
            }
            return clonedNode;
        }

        exports.applyStyleWithOptions = applyStyleWithOptions;

    }, {}], 3: [function (require, module, exports) {
        "use strict";
        var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P(function (resolve) {
                    resolve(value);
                });
            }

            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }

                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }

                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }

                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        var __generator = (this && this.__generator) || function (thisArg, body) {
            var _ = {
                label: 0, sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                }, trys: [], ops: []
            }, f, y, t, g;
            return g = {
                next: verb(0),
                "throw": verb(1),
                "return": verb(2)
            }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
                return this;
            }), g;

            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }

            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_) try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return {value: op[1], done: false};
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
                if (op[0] & 5) throw op[1];
                return {value: op[0] ? op[1] : void 0, done: true};
            }
        };
        Object.defineProperty(exports, "__esModule", {value: true});
        exports.cloneNode = void 0;
        var clonePseudoElements_1 = require("./clonePseudoElements");
        var util_1 = require("./util");

        function cloneSingleNode(node) {
            return __awaiter(this, void 0, void 0, function () {
                var dataURL;
                return __generator(this, function (_a) {
                    if (node instanceof HTMLCanvasElement) {
                        dataURL = node.toDataURL();
                        if (dataURL === 'data:,') {
                            return [2 /*return*/, Promise.resolve(node.cloneNode(false))];
                        }
                        return [2 /*return*/, util_1.createImage(dataURL)];
                    }
                    // if (node.tagName && node.tagName.toLowerCase() === 'svg') {
                    //   return Promise.resolve(node as SVGElement)
                    //     .then((svg) => svgToDataURL(svg))
                    //     .then(createImage)
                    // }
                    return [2 /*return*/, Promise.resolve(node.cloneNode(false))];
                });
            });
        }

        function cloneChildren(nativeNode, clonedNode, filter) {
            return __awaiter(this, void 0, void 0, function () {
                var children;
                return __generator(this, function (_a) {
                    children = util_1.toArray(nativeNode.childNodes);
                    if (children.length === 0) {
                        return [2 /*return*/, Promise.resolve(clonedNode)];
                    }
                    return [2 /*return*/, children
                        .reduce(function (done, child) {
                            return done
                                .then(function () {
                                    return cloneNode(child, filter);
                                })
                                .then(function (clonedChild) {
                                    if (clonedChild) {
                                        clonedNode.appendChild(clonedChild);
                                    }
                                });
                        }, Promise.resolve())
                        .then(function () {
                            return clonedNode;
                        })];
                });
            });
        }

        function decorate(nativeNode, clonedNode) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!(clonedNode instanceof Element)) {
                        return [2 /*return*/, clonedNode];
                    }
                    return [2 /*return*/, Promise.resolve()
                        .then(function () {
                            return cloneCssStyle(nativeNode, clonedNode);
                        })
                        .then(function () {
                            return clonePseudoElements_1.clonePseudoElements(nativeNode, clonedNode);
                        })
                        .then(function () {
                            return cloneInputValue(nativeNode, clonedNode);
                        })
                        .then(function () {
                            return clonedNode;
                        })];
                });
            });
        }

        function cloneCssStyle(nativeNode, clonedNode) {
            var source = window.getComputedStyle(nativeNode);
            var target = clonedNode.style;
            if (source.cssText) {
                target.cssText = source.cssText;
            } else {
                util_1.toArray(source).forEach(function (name) {
                    target.setProperty(name, source.getPropertyValue(name), source.getPropertyPriority(name));
                });
            }
        }

        function cloneInputValue(nativeNode, clonedNode) {
            if (nativeNode instanceof HTMLTextAreaElement) {
                clonedNode.innerHTML = nativeNode.value;
            }
            if (nativeNode instanceof HTMLInputElement) {
                clonedNode.setAttribute('value', nativeNode.value);
            }
        }

        function cloneNode(nativeNode, filter, isRoot) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!isRoot && filter && !filter(nativeNode)) {
                        return [2 /*return*/, Promise.resolve(null)];
                    }
                    return [2 /*return*/, Promise.resolve(nativeNode)
                        .then(cloneSingleNode)
                        .then(function (clonedNode) {
                            return cloneChildren(nativeNode, clonedNode, filter);
                        })
                        .then(function (clonedNode) {
                            return decorate(nativeNode, clonedNode);
                        })];
                });
            });
        }

        exports.cloneNode = cloneNode;

    }, {"./clonePseudoElements": 4, "./util": 11}], 4: [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {value: true});
        exports.clonePseudoElements = void 0;
        var util_1 = require("./util");

        function clonePseudoElements(nativeNode, clonedNode) {
            var pseudos = [':before', ':after'];
            pseudos.forEach(function (pseudo) {
                return Pseudo.clonePseudoElement(nativeNode, clonedNode, pseudo);
            });
        }

        exports.clonePseudoElements = clonePseudoElements;
        var Pseudo;
        (function (Pseudo) {
            function clonePseudoElement(nativeNode, clonedNode, pseudo) {
                var style = window.getComputedStyle(nativeNode, pseudo);
                var content = style.getPropertyValue('content');
                if (content === '' || content === 'none') {
                    return;
                }
                var className = util_1.uuid();
                // fix: Cannot assign to read only property 'className' of object '#<…
                try {
                    clonedNode.className = clonedNode.className + " " + className;
                } catch (err) {
                    return;
                }
                var styleElement = document.createElement('style');
                styleElement.appendChild(getPseudoElementStyle(className, pseudo, style));
                clonedNode.appendChild(styleElement);
            }

            Pseudo.clonePseudoElement = clonePseudoElement;

            function getPseudoElementStyle(className, pseudo, style) {
                var selector = "." + className + ":" + pseudo;
                var cssText = style.cssText
                    ? formatCssText(style)
                    : formatCssProperties(style);
                return document.createTextNode(selector + "{" + cssText + "}");
            }

            function formatCssText(style) {
                var content = style.getPropertyValue('content');
                return style.cssText + " content: " + content + ";";
            }

            function formatCssProperties(style) {
                return util_1.toArray(style)
                    .map(function (name) {
                        var value = style.getPropertyValue(name);
                        var priority = style.getPropertyPriority(name);
                        return name + ": " + value + (priority ? ' !important' : '') + ";";
                    })
                    .join(' ');
            }
        })(Pseudo || (Pseudo = {}));

    }, {"./util": 11}], 5: [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {value: true});
        exports.createSvgDataURL = void 0;
        var util_1 = require("./util");

        function createSvgDataURL(clonedNode, width, height) {
            var xmlns = 'http://www.w3.org/2000/svg';
            var svg = document.createElementNS(xmlns, 'svg');
            var foreignObject = document.createElementNS(xmlns, 'foreignObject');
            svg.setAttributeNS('', 'width', "" + width);
            svg.setAttributeNS('', 'height', "" + height);
            foreignObject.setAttributeNS('', 'width', '100%');
            foreignObject.setAttributeNS('', 'height', '100%');
            foreignObject.setAttributeNS('', 'x', '0');
            foreignObject.setAttributeNS('', 'y', '0');
            foreignObject.setAttributeNS('', 'externalResourcesRequired', 'true');
            svg.appendChild(foreignObject);
            foreignObject.appendChild(clonedNode);
            return util_1.svgToDataURL(svg);
        }

        exports.createSvgDataURL = createSvgDataURL;

    }, {"./util": 11}], 6: [function (require, module, exports) {
        "use strict";
        var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P(function (resolve) {
                    resolve(value);
                });
            }

            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }

                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }

                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }

                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        var __generator = (this && this.__generator) || function (thisArg, body) {
            var _ = {
                label: 0, sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                }, trys: [], ops: []
            }, f, y, t, g;
            return g = {
                next: verb(0),
                "throw": verb(1),
                "return": verb(2)
            }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
                return this;
            }), g;

            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }

            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_) try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return {value: op[1], done: false};
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
                if (op[0] & 5) throw op[1];
                return {value: op[0] ? op[1] : void 0, done: true};
            }
        };
        Object.defineProperty(exports, "__esModule", {value: true});
        exports.embedImages = void 0;
        var getBlobFromURL_1 = require("./getBlobFromURL");
        var embedResources_1 = require("./embedResources");
        var util_1 = require("./util");

        function embedImages(clonedNode, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!(clonedNode instanceof Element)) {
                        return [2 /*return*/, Promise.resolve(clonedNode)];
                    }
                    return [2 /*return*/, Promise.resolve(clonedNode)
                        .then(function (node) {
                            return embedBackground(node, options);
                        })
                        .then(function (node) {
                            return embedImageNode(node, options);
                        })
                        .then(function (node) {
                            return embedChildren(node, options);
                        })];
                });
            });
        }

        exports.embedImages = embedImages;

        function embedBackground(clonedNode, options) {
            return __awaiter(this, void 0, void 0, function () {
                var background;
                return __generator(this, function (_a) {
                    background = clonedNode.style.getPropertyValue('background');
                    if (!background) {
                        return [2 /*return*/, Promise.resolve(clonedNode)];
                    }
                    return [2 /*return*/, Promise.resolve(background)
                        .then(function (cssString) {
                            return embedResources_1.embedResources(cssString, null, options);
                        })
                        .then(function (cssString) {
                            clonedNode.style.setProperty('background', cssString, clonedNode.style.getPropertyPriority('background'));
                            return clonedNode;
                        })];
                });
            });
        }

        function embedImageNode(clonedNode, options) {
            if (!(clonedNode instanceof HTMLImageElement) || util_1.isDataUrl(clonedNode.src)) {
                return Promise.resolve(clonedNode);
            }
            return Promise.resolve(clonedNode.src)
                .then(function (url) {
                    return getBlobFromURL_1.getBlobFromURL(url, options);
                })
                .then(function (data) {
                    if(!data) {
                        throw new Error("Unable to get image of " + clonedNode.src);
                    }
                    return util_1.toDataURL(data, util_1.getMimeType(clonedNode.src));
                })
                .then(function (dataURL) {
                    return new Promise(function (resolve, reject) {
                        clonedNode.onload = resolve;
                        clonedNode.onerror = reject;
                        clonedNode.src = dataURL;
                    });
                })
                .then(function () {
                    return clonedNode;
                }, function () {
                    return clonedNode;
                });
        }

        function embedChildren(clonedNode, options) {
            return __awaiter(this, void 0, void 0, function () {
                var children, deferreds;
                return __generator(this, function (_a) {
                    children = util_1.toArray(clonedNode.childNodes);
                    deferreds = children.map(function (child) {
                        return embedImages(child, options);
                    });
                    return [2 /*return*/, Promise.all(deferreds).then(function () {
                        return clonedNode;
                    })];
                });
            });
        }

    }, {"./embedResources": 7, "./getBlobFromURL": 9, "./util": 11}], 7: [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {value: true});
        exports.embed = exports.parseURLs = exports.embedResources = exports.shouldEmbed = void 0;
        var getBlobFromURL_1 = require("./getBlobFromURL");
        var util_1 = require("./util");
        var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;

        function shouldEmbed(string) {
            return string.search(URL_REGEX) !== -1;
        }

        exports.shouldEmbed = shouldEmbed;

        function embedResources(cssString, baseUrl, options) {
            if (!shouldEmbed(cssString)) {
                return Promise.resolve(cssString);
            }
            return Promise.resolve(cssString)
                .then(parseURLs)
                .then(function (urls) {
                    return urls.reduce(function (done, url) {
                        return done.then(function (ret) {
                            return embed(ret, url, baseUrl, options);
                        });
                    }, Promise.resolve(cssString));
                });
        }

        exports.embedResources = embedResources;

        function parseURLs(str) {
            var result = [];
            str.replace(URL_REGEX, function (raw, quotation, url) {
                result.push(url);
                return raw;
            });
            return result.filter(function (url) {
                return !util_1.isDataUrl(url);
            });
        }

        exports.parseURLs = parseURLs;

        function embed(cssString, resourceURL, baseURL, options, get) {
            var resolvedURL = baseURL ? resolveUrl(resourceURL, baseURL) : resourceURL;
            return Promise.resolve(resolvedURL)
                .then(function (url) {
                    return (get ? get(url) : getBlobFromURL_1.getBlobFromURL(url, options));
                })
                .then(function (data) {
                    if(!data) {
                        throw new Error("Unable to embed " + resourceURL);
                    }
                    return util_1.toDataURL(data, util_1.getMimeType(resourceURL));
                })
                .then(function (dataURL) {
                    return cssString.replace(urlToRegex(resourceURL), "$1" + dataURL + "$3");
                })
                .then(function (content) {
                    return content;
                }, function () {
                    return resolvedURL;
                });
        }

        exports.embed = embed;

        function resolveUrl(url, baseUrl) {
            // url is absolute already
            if (url.match(/^[a-z]+:\/\//i)) {
                return url;
            }
            // url is absolute already, without protocol
            if (url.match(/^\/\//)) {
                return window.location.protocol + url;
            }
            // dataURI, mailto:, tel:, etc.
            if (url.match(/^[a-z]+:/i)) {
                return url;
            }
            var doc = document.implementation.createHTMLDocument();
            var base = doc.createElement('base');
            var a = doc.createElement('a');
            doc.head.appendChild(base);
            doc.body.appendChild(a);
            if (baseUrl) {
                base.href = baseUrl;
            }
            a.href = url;
            return a.href;
        }

        function urlToRegex(url) {
            return new RegExp("(url\\(['\"]?)(" + escape(url) + ")(['\"]?\\))", 'g');
        }

        function escape(url) {
            return url.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
        }

    }, {"./getBlobFromURL": 9, "./util": 11}], 8: [function (require, module, exports) {
        "use strict";
        var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P(function (resolve) {
                    resolve(value);
                });
            }

            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }

                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }

                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }

                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        var __generator = (this && this.__generator) || function (thisArg, body) {
            var _ = {
                label: 0, sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                }, trys: [], ops: []
            }, f, y, t, g;
            return g = {
                next: verb(0),
                "throw": verb(1),
                "return": verb(2)
            }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
                return this;
            }), g;

            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }

            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_) try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return {value: op[1], done: false};
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
                if (op[0] & 5) throw op[1];
                return {value: op[0] ? op[1] : void 0, done: true};
            }
        };
        Object.defineProperty(exports, "__esModule", {value: true});
        exports.getCssRules = exports.embedWebFonts = exports.parseWebFontRules = void 0;
        var util_1 = require("./util");
        var embedResources_1 = require("./embedResources");

        function parseWebFontRules(clonedNode) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!clonedNode.ownerDocument) {
                            reject(new Error('Provided element is not within a Document'));
                        }
                        resolve(util_1.toArray(clonedNode.ownerDocument.styleSheets));
                    })
                        .then(getCssRules)
                        .then(getWebFontRules)];
                });
            });
        }

        exports.parseWebFontRules = parseWebFontRules;

        function embedWebFonts(clonedNode, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, parseWebFontRules(clonedNode)
                        .then(function (rules) {
                            return Promise.all(rules.map(function (rule) {
                                var baseUrl = rule.parentStyleSheet
                                    ? rule.parentStyleSheet.href
                                    : null;
                                return embedResources_1.embedResources(rule.cssText, baseUrl, options);
                            }));
                        })
                        .then(function (cssStrings) {
                            return cssStrings.join('\n');
                        })
                        .then(function (cssString) {
                            var styleNode = document.createElement('style');
                            var sytleContent = document.createTextNode(cssString);
                            styleNode.appendChild(sytleContent);
                            if (clonedNode.firstChild) {
                                clonedNode.insertBefore(styleNode, clonedNode.firstChild);
                            } else {
                                clonedNode.appendChild(styleNode);
                            }
                            return clonedNode;
                        })];
                });
            });
        }

        exports.embedWebFonts = embedWebFonts;

        function getCssRules(styleSheets) {
            return __awaiter(this, void 0, void 0, function () {
                var ret, promises;
                return __generator(this, function (_a) {
                    ret = [];
                    promises = [];
                    // First loop inlines imports
                    styleSheets.forEach(function (sheet) {
                        if ('cssRules' in sheet) {
                            try {
                                util_1.toArray(sheet.cssRules).forEach(function (item) {
                                    if (item.type === CSSRule.IMPORT_RULE) {
                                        promises.push(fetchCSS(item.href, sheet)
                                            .then(embedFonts)
                                            .then(function (cssText) {
                                                var parsed = parseCSS(cssText);
                                                parsed.forEach(function (rule) {
                                                    sheet.insertRule(rule, sheet.cssRules.length);
                                                });
                                            })
                                            .catch(function (e) {
                                                console.log('Error loading remote css', e.toString());
                                            }));
                                    }
                                });
                            } catch (e) {
                                var inline_1 = styleSheets.find(function (a) {
                                    return a.href === null;
                                }) || document.styleSheets[0];
                                if (sheet.href != null) {
                                    promises.push(fetchCSS(sheet.href, inline_1)
                                        .then(embedFonts)
                                        .then(function (cssText) {
                                            var parsed = parseCSS(cssText);
                                            parsed.forEach(function (rule) {
                                                inline_1.insertRule(rule, sheet.cssRules.length);
                                            });
                                        })
                                        .catch(function (e) {
                                            console.log('Error loading remote stylesheet', e.toString());
                                        }));
                                }
                                console.log('Error inlining remote css file', e.toString());
                            }
                        }
                    });
                    return [2 /*return*/, Promise.all(promises).then(function () {
                        // Second loop parses rules
                        styleSheets.forEach(function (sheet) {
                            if ('cssRules' in sheet) {
                                try {
                                    util_1.toArray(sheet.cssRules).forEach(function (item) {
                                        ret.push(item);
                                    });
                                } catch (e) {
                                    console.log("Error while reading CSS rules from " + sheet.href, e.toString());
                                }
                            }
                        });
                        return ret;
                    })];
                });
            });
        }

        exports.getCssRules = getCssRules;

        function getWebFontRules(cssRules) {
            return cssRules
                .filter(function (rule) {
                    return rule.type === CSSRule.FONT_FACE_RULE;
                })
                .filter(function (rule) {
                    return embedResources_1.shouldEmbed(rule.style.getPropertyValue('src'));
                });
        }

        function parseCSS(source) {
            if (source === undefined) {
                return [];
            }
            var cssText = source;
            var css = [];
            var cssKeyframeRegex = '((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})';
            var combinedCSSRegex = '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]' +
                '*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})'; // to match css & media queries together
            var cssCommentsRegex = new RegExp('(\\/\\*[\\s\\S]*?\\*\\/)', 'gi');
            // strip out comments
            cssText = cssText.replace(cssCommentsRegex, '');
            var keyframesRegex = new RegExp(cssKeyframeRegex, 'gi');
            var arr;
            while (true) {
                arr = keyframesRegex.exec(cssText);
                if (arr === null) {
                    break;
                }
                css.push(arr[0]);
            }
            cssText = cssText.replace(keyframesRegex, '');
            // unified regex
            var unified = new RegExp(combinedCSSRegex, 'gi');
            while (true) {
                arr = unified.exec(cssText);
                if (arr === null) {
                    break;
                }
                css.push(arr[0]);
            }
            return css;
        }

        function fetchCSS(url, sheet) {
            return fetch(url).then(function (res) {
                return {
                    url: url,
                    cssText: res.text(),
                };
            }, function (e) {
                console.log('ERROR FETCHING CSS: ', e.toString());
            });
        }

        function embedFonts(data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, data.cssText.then(function (resolved) {
                        var cssText = resolved;
                        var regexUrlFind = /url\(["']?([^"')]+)["']?\)/g;
                        var fontLocations = cssText.match(/url\([^)]+\)/g) || [];
                        var fontLoadedPromises = fontLocations.map(function (location) {
                            var url = location.replace(regexUrlFind, '$1');
                            if (!url.startsWith('https://')) {
                                var source = data.url;
                                url = new URL(url, source).href;
                            }
                            return new Promise(function (resolve, reject) {
                                fetch(url)
                                    .then(function (res) {
                                        return res.blob();
                                    })
                                    .then(function (blob) {
                                        var reader = new FileReader();
                                        reader.addEventListener('load', function (res) {
                                            // Side Effect
                                            cssText = cssText.replace(location, "url(" + reader.result + ")");
                                            resolve([location, reader.result]);
                                        });
                                        reader.readAsDataURL(blob);
                                    })
                                    .catch(reject);
                            });
                        });
                        return Promise.all(fontLoadedPromises).then(function () {
                            return cssText;
                        });
                    })];
                });
            });
        }

    }, {"./embedResources": 7, "./util": 11}], 9: [function (require, module, exports) {
        "use strict";
        /* tslint:disable:max-line-length */
        Object.defineProperty(exports, "__esModule", {value: true});
        exports.getBlobFromURL = void 0;
        var util_1 = require("./util");
// KNOWN ISSUE
// -----------
// Can not handle redirect-url, such as when access 'http://something.com/avatar.png'
// will redirect to 'http://something.com/65fc2ffcc8aea7ba65a1d1feda173540'
        var TIMEOUT = 3000;
        var cache = [];

        function getBlobFromURL(url, options) {
            var root = url.split('?')[0];
            var found = cache.find(function (item) {
                return item.url === root;
            });
            if (found) {
                return found.promise;
            }
            // cache bypass so we dont have CORS issues with cached images
            // ref: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
            if (options.cacheBust) {
                // tslint:disable-next-line
                url += (/\?/.test(url) ? '&' : '?') + new Date().getTime();
            }
            var failed = function (reason) {
                /*var placeholder = '';
                if (options.imagePlaceholder) {
                    var parts = options.imagePlaceholder.split(/,/);
                    if (parts && parts[1]) {
                        placeholder = parts[1];
                    }
                }
                var msg = "Failed to fetch resource: " + url;
                if (reason) {
                    msg = typeof reason === 'string' ? reason : reason.message;
                }
                if (msg) {
                    console.error(msg);
                }
                return placeholder;*/
                // we don't care just try to catch from the extension
                return fetchBlobFromExtension(url);
            };
            var deferred = window.fetch
                ? window
                    .fetch(url)
                    .then(function (response) {
                        return response.blob();
                    })
                    .then(function (blob) {
                        return new Promise(function (resolve, reject) {
                            var reader = new FileReader();
                            reader.onloadend = function () {
                                return resolve(reader.result);
                            };
                            reader.onerror = reject;
                            reader.readAsDataURL(blob);
                        });
                    })
                    .then(util_1.getDataURLContent)
                    .catch(function () {
                        return new Promise(function (resolve, reject) {
                            return reject();
                        });
                    })
                : new Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    var timeout = function () {
                        reject(new Error("Timeout of " + TIMEOUT + "ms occured while fetching resource: " + url));
                    };
                    var done = function () {
                        if (req.readyState !== 4) {
                            return;
                        }
                        if (req.status !== 200) {
                            reject(new Error("Failed to fetch resource: " + url + ", status: " + req.status));
                            return;
                        }
                        var encoder = new FileReader();
                        encoder.onloadend = function () {
                            resolve(util_1.getDataURLContent(encoder.result));
                        };
                        encoder.readAsDataURL(req.response);
                    };
                    req.onreadystatechange = done;
                    req.ontimeout = timeout;
                    req.responseType = 'blob';
                    req.timeout = TIMEOUT;
                    req.open('GET', url, true);
                    req.send();
                });
            var promise = deferred.catch(failed);
            cache.push({promise: promise, url: root});
            return promise;
        }

        exports.getBlobFromURL = getBlobFromURL;

    }, {"./util": 11}], 10: [function (require, module, exports) {
        "use strict";
        var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P(function (resolve) {
                    resolve(value);
                });
            }

            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }

                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }

                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }

                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        var __generator = (this && this.__generator) || function (thisArg, body) {
            var _ = {
                label: 0, sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                }, trys: [], ops: []
            }, f, y, t, g;
            return g = {
                next: verb(0),
                "throw": verb(1),
                "return": verb(2)
            }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
                return this;
            }), g;

            function verb(n) {
                return function (v) {
                    return step([n, v]);
                };
            }

            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_) try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return {value: op[1], done: false};
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
                if (op[0] & 5) throw op[1];
                return {value: op[0] ? op[1] : void 0, done: true};
            }
        };
        Object.defineProperty(exports, "__esModule", {value: true});
        exports.toBlob = exports.toJpeg = exports.toPng = exports.toPixelData = exports.toCanvas = exports.toSvgDataURL = exports.toSvg = exports.toUtil = void 0;
        var cloneNode_1 = require("./cloneNode");
        var embedImages_1 = require("./embedImages");
        var embedWebFonts_1 = require("./embedWebFonts");
        var createSvgDataURL_1 = require("./createSvgDataURL");
        var applyStyleWithOptions_1 = require("./applyStyleWithOptions");
        var util_1 = require("./util");

        function getImageSize(domNode, options) {
            if (options === void 0) {
                options = {};
            }
            var width = options.width || util_1.getNodeWidth(domNode);
            var height = options.height || util_1.getNodeHeight(domNode);
            return {width: width, height: height};
        }

        function toSvg(domNode, options) {
            if (options === void 0) {
                options = {};
            }
            return __awaiter(this, void 0, void 0, function () {
                var _a, width, height;
                return __generator(this, function (_b) {
                    _a = getImageSize(domNode, options), width = _a.width, height = _a.height;
                    return [2 /*return*/, cloneNode_1.cloneNode(domNode, options.filter, true)
                        .then(function (clonedNode) {
                            return embedWebFonts_1.embedWebFonts(clonedNode, options);
                        })
                        .then(function (clonedNode) {
                            return embedImages_1.embedImages(clonedNode, options);
                        })
                        .then(function (clonedNode) {
                            return applyStyleWithOptions_1.applyStyleWithOptions(clonedNode, options);
                        })
                        .then(function (clonedNode) {
                            return createSvgDataURL_1.createSvgDataURL(clonedNode, width, height);
                        })];
                });
            });
        }

        exports.toSvg = toSvg;
        exports.toSvgDataURL = toSvg;

        function toCanvas(domNode, options) {
            if (options === void 0) {
                options = {};
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toSvg(domNode, options)
                        .then(util_1.createImage)
                        .then(util_1.delay(100))
                        .then(function (image) {
                            var canvas = document.createElement('canvas');
                            var context = canvas.getContext('2d');
                            var ratio = options.pixelRatio || util_1.getPixelRatio();
                            var _a = getImageSize(domNode, options), width = _a.width, height = _a.height;
                            canvas.width = width * ratio;
                            canvas.height = height * ratio;
                            canvas.style.width = "" + width;
                            canvas.style.height = "" + height;
                            if (options.backgroundColor) {
                                context.fillStyle = options.backgroundColor;
                                context.fillRect(0, 0, canvas.width, canvas.height);
                            }
                            context.drawImage(image, 0, 0);
                            return canvas;
                        })];
                });
            });
        }

        exports.toCanvas = toCanvas;

        function toPixelData(domNode, options) {
            if (options === void 0) {
                options = {};
            }
            return __awaiter(this, void 0, void 0, function () {
                var _a, width, height;
                return __generator(this, function (_b) {
                    _a = getImageSize(domNode, options), width = _a.width, height = _a.height;
                    return [2 /*return*/, toCanvas(domNode, options).then(function (canvas) {
                        var ctx = canvas.getContext('2d');
                        return ctx.getImageData(0, 0, width, height).data;
                    })];
                });
            });
        }

        exports.toPixelData = toPixelData;

        function toPng(domNode, options) {
            if (options === void 0) {
                options = {};
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toCanvas(domNode, options).then(function (canvas) {
                        return canvas.toDataURL();
                    })];
                });
            });
        }

        exports.toPng = toPng;

        function toJpeg(domNode, options) {
            if (options === void 0) {
                options = {};
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toCanvas(domNode, options).then(function (canvas) {
                        return canvas.toDataURL('image/jpeg', options.quality || 1);
                    })];
                });
            });
        }

        exports.toJpeg = toJpeg;

        function toBlob(domNode, options) {
            if (options === void 0) {
                options = {};
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toCanvas(domNode, options).then(util_1.canvasToBlob)];
                });
            });
        }

        exports.toBlob = toBlob;

        exports.util = util_1;
    }, {
        "./applyStyleWithOptions": 2,
        "./cloneNode": 3,
        "./createSvgDataURL": 5,
        "./embedImages": 6,
        "./embedWebFonts": 8,
        "./util": 11
    }], 11: [function (require, module, exports) {
        (function (process) {
            (function () {
                "use strict";
                var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
                    function adopt(value) {
                        return value instanceof P ? value : new P(function (resolve) {
                            resolve(value);
                        });
                    }

                    return new (P || (P = Promise))(function (resolve, reject) {
                        function fulfilled(value) {
                            try {
                                step(generator.next(value));
                            } catch (e) {
                                reject(e);
                            }
                        }

                        function rejected(value) {
                            try {
                                step(generator["throw"](value));
                            } catch (e) {
                                reject(e);
                            }
                        }

                        function step(result) {
                            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                        }

                        step((generator = generator.apply(thisArg, _arguments || [])).next());
                    });
                };
                var __generator = (this && this.__generator) || function (thisArg, body) {
                    var _ = {
                        label: 0, sent: function () {
                            if (t[0] & 1) throw t[1];
                            return t[1];
                        }, trys: [], ops: []
                    }, f, y, t, g;
                    return g = {
                        next: verb(0),
                        "throw": verb(1),
                        "return": verb(2)
                    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
                        return this;
                    }), g;

                    function verb(n) {
                        return function (v) {
                            return step([n, v]);
                        };
                    }

                    function step(op) {
                        if (f) throw new TypeError("Generator is already executing.");
                        while (_) try {
                            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                            if (y = 0, t) op = [op[0] & 2, t.value];
                            switch (op[0]) {
                                case 0:
                                case 1:
                                    t = op;
                                    break;
                                case 4:
                                    _.label++;
                                    return {value: op[1], done: false};
                                case 5:
                                    _.label++;
                                    y = op[1];
                                    op = [0];
                                    continue;
                                case 7:
                                    op = _.ops.pop();
                                    _.trys.pop();
                                    continue;
                                default:
                                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                        _ = 0;
                                        continue;
                                    }
                                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                        _.label = op[1];
                                        break;
                                    }
                                    if (op[0] === 6 && _.label < t[1]) {
                                        _.label = t[1];
                                        t = op;
                                        break;
                                    }
                                    if (t && _.label < t[2]) {
                                        _.label = t[2];
                                        _.ops.push(op);
                                        break;
                                    }
                                    if (t[2]) _.ops.pop();
                                    _.trys.pop();
                                    continue;
                            }
                            op = body.call(thisArg, _);
                        } catch (e) {
                            op = [6, e];
                            y = 0;
                        } finally {
                            f = t = 0;
                        }
                        if (op[0] & 5) throw op[1];
                        return {value: op[0] ? op[1] : void 0, done: true};
                    }
                };
                Object.defineProperty(exports, "__esModule", {value: true});
                exports.getBlobFromImageURL = exports.svgToDataURL = exports.createImage = exports.getPixelRatio = exports.getNodeHeight = exports.getNodeWidth = exports.toArray = exports.canvasToBlob = exports.getDataURLContent = exports.toDataURL = exports.isDataUrl = exports.delay = exports.getMimeType = exports.getExtension = exports.uuid = void 0;
                var WOFF = 'application/font-woff';
                var JPEG = 'image/jpeg';
                var mimes = {
                    woff: WOFF,
                    woff2: WOFF,
                    ttf: 'application/font-truetype',
                    eot: 'application/vnd.ms-fontobject',
                    png: 'image/png',
                    jpg: JPEG,
                    jpeg: JPEG,
                    gif: 'image/gif',
                    tiff: 'image/tiff',
                    svg: 'image/svg+xml',
                };
                exports.uuid = (function uuid() {
                    // generate uuid for className of pseudo elements.
                    // We should not use GUIDs, otherwise pseudo elements sometimes cannot be captured.
                    var counter = 0;
                    // ref: http://stackoverflow.com/a/6248722/2519373
                    var random = function () {
                        return ("0000" + ((Math.random() * Math.pow(36, 4)) << 0).toString(36)).slice(-4);
                    };
                    return function () {
                        counter += 1;
                        return "u" + random() + counter;
                    };
                })();

                function getExtension(url) {
                    var match = /\.([^./]*?)$/g.exec(url);
                    return match ? match[1] : '';
                }

                exports.getExtension = getExtension;

                function getMimeType(url) {
                    var ext = getExtension(url).toLowerCase();
                    return mimes[ext] || '';
                }

                exports.getMimeType = getMimeType;

                function delay(ms) {
                    return function (args) {
                        return new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve(args);
                            }, ms);
                        });
                    };
                }

                exports.delay = delay;

                function isDataUrl(url) {
                    return url.search(/^(data:)/) !== -1;
                }

                exports.isDataUrl = isDataUrl;

                function toDataURL(content, mimeType) {
                    return "data:" + mimeType + ";base64," + content;
                }

                exports.toDataURL = toDataURL;

                function getDataURLContent(dataURL) {
                    return dataURL.split(/,/)[1];
                }

                exports.getDataURLContent = getDataURLContent;

                function toBlob(canvas) {
                    return new Promise(function (resolve) {
                        var binaryString = window.atob(canvas.toDataURL().split(',')[1]);
                        var len = binaryString.length;
                        var binaryArray = new Uint8Array(len);
                        for (var i = 0; i < len; i += 1) {
                            binaryArray[i] = binaryString.charCodeAt(i);
                        }
                        resolve(new Blob([binaryArray], {type: 'image/png'}));
                    });
                }

                function canvasToBlob(canvas) {
                    if (canvas.toBlob) {
                        return new Promise(function (resolve) {
                            return canvas.toBlob(resolve);
                        });
                    }
                    return toBlob(canvas);
                }

                exports.canvasToBlob = canvasToBlob;

                function toArray(arrayLike) {
                    var result = [];
                    for (var i = 0, l = arrayLike.length; i < l; i += 1) {
                        result.push(arrayLike[i]);
                    }
                    return result;
                }

                exports.toArray = toArray;

                function px(node, styleProperty) {
                    var val = window.getComputedStyle(node).getPropertyValue(styleProperty);
                    return parseFloat(val.replace('px', ''));
                }

                function getNodeWidth(node) {
                    var leftBorder = px(node, 'border-left-width');
                    var rightBorder = px(node, 'border-right-width');
                    return node.scrollWidth + leftBorder + rightBorder;
                }

                exports.getNodeWidth = getNodeWidth;

                function getNodeHeight(node) {
                    var topBorder = px(node, 'border-top-width');
                    var bottomBorder = px(node, 'border-bottom-width');
                    return node.scrollHeight + topBorder + bottomBorder;
                }

                exports.getNodeHeight = getNodeHeight;

                function getPixelRatio() {
                    var ratio;
                    var val = process && process.env ? process.env.devicePixelRatio : null;
                    if (val) {
                        ratio = parseInt(val, 10);
                        if (isNaN(ratio)) {
                            ratio = 1;
                        }
                    }
                    return ratio || window.devicePixelRatio || 1;
                }

                exports.getPixelRatio = getPixelRatio;

                function createImage(url) {
                    return new Promise(function (resolve, reject) {
                        var image = new Image();
                        image.onload = function () {
                            return resolve(image);
                        };
                        image.onerror = reject;
                        image.crossOrigin = 'anonymous';
                        image.src = url;
                    });
                }

                exports.createImage = createImage;

                function svgToDataURL(svg) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, Promise.resolve()
                                .then(function () {
                                    return new XMLSerializer().serializeToString(svg);
                                })
                                .then(encodeURIComponent)
                                .then(function (html) {
                                    return "data:image/svg+xml;charset=utf-8," + html;
                                })];
                        });
                    });
                }

                exports.svgToDataURL = svgToDataURL;

                function getBlobFromImageURL(url) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, createImage(url).then(function (image) {
                                var width = image.width, height = image.height;
                                var canvas = document.createElement('canvas');
                                var context = canvas.getContext('2d');
                                var ratio = getPixelRatio();
                                canvas.width = width * ratio;
                                canvas.height = height * ratio;
                                canvas.style.width = "" + width;
                                canvas.style.height = "" + height;
                                context.scale(ratio, ratio);
                                context.drawImage(image, 0, 0);
                                var dataURL = canvas.toDataURL(getMimeType(url));
                                return getDataURLContent(dataURL);
                            })];
                        });
                    });
                }

                exports.getBlobFromImageURL = getBlobFromImageURL;

            }).call(this)
        }).call(this, require('_process'))
    }, {"_process": 12}], 12: [function (require, module, exports) {
// shim for using process in browser
        var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
            throw new Error('setTimeout has not been defined');
        }

        function defaultClearTimeout() {
            throw new Error('clearTimeout has not been defined');
        }

        (function () {
            try {
                if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }())

        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                //normal enviroments in sane situations
                return setTimeout(fun, 0);
            }
            // if setTimeout wasn't available but was latter defined
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }


        }

        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                //normal enviroments in sane situations
                return clearTimeout(marker);
            }
            // if clearTimeout wasn't available but was latter defined
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                }
            }


        }

        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }

        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;

            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }

        process.nextTick = function (fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        };

// v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }

        Item.prototype.run = function () {
            this.fun.apply(null, this.array);
        };
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = ''; // empty string to avoid regexp issues
        process.versions = {};

        function noop() {
        }

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function (name) {
            return []
        }

        process.binding = function (name) {
            throw new Error('process.binding is not supported');
        };

        process.cwd = function () {
            return '/'
        };
        process.chdir = function (dir) {
            throw new Error('process.chdir is not supported');
        };
        process.umask = function () {
            return 0;
        };

    }, {}]
}, {}, [1]);
