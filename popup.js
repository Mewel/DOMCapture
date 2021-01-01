console.log("dom capture popup js loaded");

/**
 * Injecting contentScript.js to webpage on opening popup. Opening the popup multiple times
 * should not cause any problems cause the "old" version is removed and replaced by the new one.
 * I'm not a 100% sure though. Needs to be tested further.
 */
chrome.tabs.executeScript({file: 'lib/jquery-3.5.1.min.js'});
chrome.tabs.executeScript({file: 'lib/html-to-image.js'});
chrome.tabs.executeScript({file: 'contentScript.js'});

$(document).ready(() => {
    let data;

    let settingsOpen = false;
    const clipboardButton = $("#clipboard");
    const fileButton = $("#file");

    // favorites
    $("#favorites").editableSelect({filter: false});
    $("#favorites").addClass("form-control form-control-sm");
    $("#favorites").on("select.editable-select", function (e) {
        loadFavorite($(e.target).val());
        saveLast();
    });

    $("#saveFavorite").on("click", () => {
        const name = $("#favorites").val();
        if (!data.favorites[name]) {
            addFavorite(name);
        }
        data.favorites[name] = getData();
        save();
    });

    // bind buttons
    clipboardButton.click(() => {
        modal("loading");
        chrome.tabs.getSelected((tab) => {
            chrome.tabs.sendMessage(tab.id, {
                action: "clipboard",
                data: getData()
            }, handleResponse);
        });
    });
    fileButton.click(() => {
        modal("loading");
        chrome.tabs.getSelected((tab) => {
            chrome.tabs.sendMessage(tab.id, {
                action: "file",
                data: getData()
            }, handleResponse);
        });
    });

    // settings
    handleSettings();

    // modal
    $("#closeErrorModal, #closeOkModal").on("click", () => {
        const modal = $("#modal");
        modal.fadeTo("fast", 0, () => {
            modal.css("display", "none");
            modal.find(".dc-modal-content").css("display", "none");
        });
    });

    // help
    $("#help").on("click", () => {
        chrome.tabs.create({ url: chrome.runtime.getURL("help.html") });
    });

    // get data and update ui
    chrome.storage.sync.get("domCaptureData", (result) => {
        data = result ? result.domCaptureData : null;
        if(!data || !result.domCaptureData || Object.keys(result.domCaptureData).length === 0) {
            // initial data for startup
            data = {
                last: {
                    selector: "body"
                },
                favorites: {
                    "body": {
                        selector: "body"
                    }
                }
            }
        }
        // add to favorites
        Object.keys(data.favorites).forEach(name => {
            addFavorite(name);
        });
        // update ui
        loadData(data.last);
        if (data.last.name) {
            $("#favorites").val(data.last.name);
        }
    });

    function modal(name) {
        const modal = $("#modal");
        if (modal.css("display") === "block") {
            modal.find(".dc-modal-content").css("display", "none");
        }
        modal.find("#" + name).css("display", "block");
        modal.css("display", "block").fadeTo('fast', 1);
    }

    function handleResponse(response) {
        if (!response) {
            return;
        }
        if (response.error) {
            $("#error-text").html(response.error);
            modal("error");
        } else if (response.msg && response.msg === "ok") {
            modal("modal-ok");
        }
    }

    function getData() {
        return {
            selector: $("#selector").val(),
            backgroundColor: $("#bgColor").val(),
            layout: $(".settings-layout label[class*='active']").prop('title'),
            traversal: $(".settings-traversal label[class*='active']").prop('title')
        };
    }

    function loadData(data) {
        $("#selector").val(data.selector);
        $("#bgColor").val(data.backgroundColor);
        $(".dc-color-input-switcher").parent().parent().next().attr("type", data.backgroundColor ? "color" : "text");
        $(".settings-layout label").removeClass("active");
        $(".settings-traversal label").removeClass("active");
        $("#layout-" + (data.layout ? data.layout : "keep")).attr("checked", "checked").parent().addClass("active");
        $("#traversal-" + (data.traversal ? data.traversal : "document")).attr("checked", "checked").parent().addClass("active");
    }

    function loadFavorite(name) {
        if (name && data.favorites[name]) {
            $("#favorites").val(name);
            loadData(data.favorites[name]);
        }
    }

    function saveLast() {
        data.last = getData();
        const name = $("#favorites").val();
        if (name) {
            data.last.name = name;
        }
        save();
    }

    function save() {
        chrome.storage.sync.set({"domCaptureData": data});
    }

    function clearUI() {
        $("#favorites").val("");
        $("#selector").val("");
        $("#bgColor").val("");
        $(".dc-color-input-switcher").parent().parent().next().attr("type", "text");
        $(".settings-layout label").removeClass("active");
        $("#layout-keep").parent().addClass("active");
    }

    function addFavorite(name) {
        const favorites = $("#favorites");
        favorites.editableSelect("add", name, 0);
        const li = $(".es-list li:first");
        li.addClass("d-flex justify-content-between");
        li.on("mouseenter", (e) => {
            $(e.target).append("<i class='fa fa-times'></i>");
            $(e.target).find("i").on("mousedown", () => {
                if (confirm("Delete '" + name + "'?")) {
                    const index = [...e.target.parentElement.children].indexOf(e.target);
                    favorites.editableSelect("remove", index);
                    delete data.favorites[name];
                    save();
                    clearUI();
                }
            });
        }).on("mouseleave", () => {
            $(".es-list").find("li i").remove();
        });
    }

    function handleSettings() {
        $("#settings-btn").on("click", () => {
            const settingsButton = $("#settings-btn i");
            settingsButton.toggleClass("fa-chevron-up", settingsOpen);
            settingsButton.toggleClass("fa-chevron-down", !settingsOpen);
            settingsOpen = !settingsOpen;
        });

        // bg-color
        $(".dc-color-input-switcher").on("click", () => {
            let dcInputColor = $(".dc-color-input-switcher").parent().parent().next();
            if (dcInputColor.attr("type") === "text") {
                dcInputColor.attr("type", "color");
            } else {
                dcInputColor.attr("type", "text");
            }
        });
        $(".dc-color-input-clearer").on("click", () => {
            let dcInputColor = $(".dc-color-input-clearer").parent().parent().prev();
            if (dcInputColor.attr("type") === "color") {
                dcInputColor.attr("type", "text");
            }
            dcInputColor.val('');
            saveLast();
        });
        // save last
        $("#bgColor").on("change", () => {
            saveLast();
        });
        $("#layout-keep, #layout-horizontal, #layout-vertical, #traversal-document, #traversal-user").on("click", () => {
            saveLast();
        });
        $("#selector").on("input change keyup", () => {
            saveLast();
        });
    }
});
