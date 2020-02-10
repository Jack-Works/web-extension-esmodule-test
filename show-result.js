console.log('running test')
window.x = {
  "dynamic import with no wrap": false,
  "dynamic import with wrap": false,
  "static import": false,
  "import.meta": false
};
var thisPage, backgroundPage, contentScript;
var isBackground = false;

chrome.runtime.getBackgroundPage &&
  chrome.runtime.getBackgroundPage(e => {
    if (e === globalThis) isBackground = true;
  });

setInterval(() => {
  thisPage = document.getElementById("this");
  contentScript = document.getElementById("cs");
  backgroundPage = document.getElementById("bg");
  if (!thisPage || !contentScript || !backgroundPage) return;

  var result = JSON.stringify(window.x, undefined, 4);
  if (thisPage.innerHTML !== result) thisPage.innerHTML = result;
  if (isBackground) {
    chrome.storage.local.set({ result });
  } else {
    chrome.storage.local.get(({ result, cs }) => {
      if (result !== backgroundPage.innerHTML)
        backgroundPage.innerHTML = result;
      if (cs !== contentScript.innerHTML) contentScript.innerHTML = cs;
    });
  }
}, 100);

setInterval(() => {
  if (!location.protocol.includes("http")) return;

  var result = JSON.stringify(window.x, undefined, 4);

  chrome.storage.local.set({ cs: result });
}, 100);
