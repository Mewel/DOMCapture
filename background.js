chrome.runtime.onMessage.addListener((message, sender, reply) => {
    if (!message || !message.action || !message.url) {
        return false;
    }
    console.log("fetch " + message.url);
    if (message.action === "fetchBlob") {
        fetch(message.url)
            .then(response => response.blob())
            .then(convertBlobToBase64)
            .then(base64 => {
                reply(base64.split(',')[1]);
            })
            .catch(error => {
                console.error("There has been a problem with your fetch operation:", error);
                reply("");
            });
    } else if (message.action === "fetchCSS") {
        fetch(message.url)
            .then(response => response.text())
            .then(text => reply(text))
            .catch(error => {
                console.error("Unable to fetch css", error);
                reply({error: "Unable to load css " + message.url});
            })
    }
    return true;
});

function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
}
