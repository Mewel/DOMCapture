(function () {
    if (window.domCaptureContentScriptLoaded === true) {
        return;
    }
    window.domCaptureContentScriptLoaded = true;
    $(document).ready(() => {
        run();
    });
})();

function run() {
    console.log("dom capture contentScript.js loaded");

    let defaultBackgroundColor = $("body").css("backgroundColor");

    // fix CORS for css loading it from the background script
    fixCors();
    // set pixel ratio to 1 ignore the zoom level
    fixPixelRatio();

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (!request.action) {
            sendResponse({error: "invalid action"});
        }
        // clipboard
        if (request.action === "clipboard" && request.data) {
            toCanvas(request.data)
                .then(toBlob)
                .then(toClipboard)
                .catch(e => handleError(e, sendResponse));
        }
        // file
        if (request.action === "file" && request.data) {
            toCanvas(request.data)
                .then(toBlob)
                .then((blob) => toFile(blob, request.fileName ? request.fileName : (document.title + ".png")))
                .then(() => {
                    sendResponse({msg: "ok"});
                }, (e) => {
                    handleError(e, sendResponse);
                });
        }
        return true;
    });

    function handleError(error, sendResponse) {
        console.log(error);
        sendResponse({
            error: error.message ? error.message : error
        })
    }

    function filterContent(node) {
        if (node.tagName === null || node.tagName === undefined) {
            return true;
        }
        return node.tagName.toLocaleLowerCase() !== 'noscript';
    }

    function getBackgroundColor(data) {
        return data.backgroundColor ? data.backgroundColor : defaultBackgroundColor;
    }

    /**
     * <p>
     * <b>Margin:</b> Temporally fixes the top/left and bottom/right margin for the given element. If you don't set the
     * top/left corner 0 the processed image will be moved and cut off.
     * </p>
     * <p>
     * <b>Height/Overflow:</b> Some webpages (wikipedia) sets the body height to the current viewport getting us in
     * trouble capturing only a section of the whole page. Setting the height to auto and overflow to hidden should
     * fix this.
     * </p>
     *
     * @param element the element to fix the margin for
     * @param next the next function
     * @returns {PromiseLike<any> | Promise<any>}
     */
    function fixElement(element, next) {
        const marginLeft = $(element).css("marginLeft");
        const marginRight = $(element).css("marginRight");
        const marginTop = $(element).css("marginTop");
        const marginBottom = $(element).css("marginBottom");
        const height = $(element).css("height");
        const overflow = $(element).css("overflow");
        $(element).css("marginLeft", "0px");
        $(element).css("marginRight", marginLeft);
        $(element).css("marginTop", "0px");
        $(element).css("marginBottom", marginTop);
        $(element).css("height", "auto");
        $(element).css("overflow", "hidden");
        return next(element)
            .then((result) => {
                $(element).css("marginLeft", marginLeft);
                $(element).css("marginRight", marginRight);
                $(element).css("marginTop", marginTop);
                $(element).css("marginBottom", marginBottom);
                $(element).css("height", height);
                $(element).css("overflow", overflow);
                return result;
            });
    }

    function elementToCanvas(element, data) {
        return fixElement(element, () => {
            return htmlToImage.toCanvas(element, {
                filter: filterContent,
                backgroundColor: getBackgroundColor(data)
            });
        });
    }

    function toCanvas(data) {
        const selectedElements = $(data.selector);
        if (selectedElements.length === 0) {
            return Promise.reject("jQuery selector returned zero elements. Please check your selector:" + data.selector);
        } else if (selectedElements.length === 1) {
            chrome.runtime.sendMessage(selectedElements[0]);
            return elementToCanvas(selectedElements[0], data)
        } else {
            // traversal
            const selectors = data.traversal === "user" ?
                data.selector.split(",").map(s => s.trim()).map(s => $(s)).flatMap(e => e.toArray()) :
                selectedElements.toArray();
            // to canvas
            return Promise
                .all(selectors.map(element => {
                    return elementToCanvas(element, data);
                }))
                .then((canvasArray) => {
                    const size = getSize(canvasArray, data);
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    canvas.width = size.width;
                    canvas.height = size.height;
                    canvas.style.width = "" + size.width;
                    canvas.style.height = "" + size.height;
                    ctx.fillStyle = getBackgroundColor(data);
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    merge(canvasArray, ctx, selectedElements, data);
                    return canvas;
                });
        }

        function getSize(canvasArray, data) {
            if (!data.layout || data.layout === "keep") {
                return {
                    width: $(document).width(),
                    height: $(document).height(),
                }
            } else if (data.layout === "vertical") {
                return {
                    width: Math.max.apply(Math, canvasArray.map((canvas) => {
                        return canvas.width;
                    })),
                    height: canvasArray.reduce((acc, canvas) => acc + canvas.height, 0)
                }
            } else {
                return {
                    width: canvasArray.reduce((acc, canvas) => acc + canvas.width, 0),
                    height: Math.max.apply(Math, canvasArray.map((canvas) => {
                        return canvas.height;
                    }))
                }
            }
        }

        function merge(canvasArray, ctx, selectedElements, data) {
            if (!data.layout || data.layout === "keep") {
                if (canvasArray.length !== selectedElements.length) {
                    throw Error("Canvas array and selected elements size is not equal!");
                }
                selectedElements.each((i, element) => {
                    const offset = $(element).offset();
                    draw(canvasArray[i], offset.left, offset.top);
                });
            } else {
                let offset = 0;
                canvasArray.forEach(canvas => {
                    if (data.layout === "vertical") {
                        draw(canvas, 0, offset);
                        offset += canvas.height;
                    } else if (data.layout === "horizontal") {
                        draw(canvas, offset, 0);
                        offset += canvas.width;
                    }
                });
            }

            function draw(canvas, left, top) {
                if (canvas.width !== 0 && canvas.height !== 0) {
                    ctx.drawImage(canvas, left, top);
                }
            }
        }
    }

    function toBlob(canvas) {
        if (!canvas) {
            throw Error("canvas is empty");
        }
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            });
        });
    }

    function toClipboard(blob) {
        if (!blob) {
            throw Error("blob is empty");
        }
        // do alert to focus current window!
        alert("Image created! Copy to clipboard...");
        // copy to clipboard
        return navigator.permissions.query({name: "clipboard-write"})
            .then(result => {
                if (result.state === "granted" || result.state === "prompt") {
                    return true;
                }
                throw new Error("Clipboard-Write permission not granted!");
            })
            .then(() => {
                return navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob
                    })
                ]);
            });
    }

    function toFile(blob, fileName) {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.parentNode.removeChild(a);
    }

    function fixCors() {
        $("link[rel='stylesheet']").each((i, link) => {
            fetchCSSFromExtension($(link).attr("href"))
                .then(result => {
                    if (result.error) {
                        console.log(result.error);
                    } else {
                        $("head").append("<style>" + result + "</style>");
                        $(link).remove();
                    }
                });
        });
    }

    /**
     * TODO: right now only a pixel ratio of 1 is supported (zooming does not affect the snapshot).
     */
    function fixPixelRatio() {
        htmlToImage.util.getPixelRatio = () => {
            return 1;
        };
    }

}

function fetchBlobFromExtension(url) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({action: "fetchBlob", url: url}, function (response) {
            resolve(response);
        });
    });
}

function fetchCSSFromExtension(url) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({action: "fetchCSS", url: url}, function (response) {
            resolve(response);
        });
    });
}
