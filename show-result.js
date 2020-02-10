console.log("running test");
window.x = {
  "dynamic import with no wrap": false,
  "dynamic import with wrap": false,
  "static import": false,
  "import.meta": false
};
var thisPage, backgroundPage, contentScript;
var isBackground = false;

function getBackgroundPage() {
  return new Promise(resolve => {
    try {
      chrome.runtime.getBackgroundPage &&
        chrome.runtime.getBackgroundPage(resolve);
    } catch (e) {
      browser.runtime.getBackgroundPage &&
        browser.runtime.getBackgroundPage.then(resolve);
    }
  });
}
function get() {
  return new Promise(resolve => {
    try {
      chrome.storage.local.get(resolve);
    } catch (e) {
      browser.storage.local.get().then(resolve);
    }
  });
}
function set(v) {
  try {
    chrome.storage.local.set(v);
  } catch (e) {
    browser.storage.local.set(v);
  }
}
window.getURL = function(r) {
  try {
    return chrome.runtime.getURL(r);
  } catch (e) {
    return browser.runtime.getURL(r);
  }
};

getBackgroundPage().then(e => {
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
    set({ result });
  } else {
    get().then(({ result, cs }) => {
      if (result !== backgroundPage.innerHTML)
        backgroundPage.innerHTML = result;
      if (cs !== contentScript.innerHTML) contentScript.innerHTML = cs;
    });
  }
}, 100);

setInterval(() => {
  if (!location.protocol.includes("http")) return;

  var result = JSON.stringify(window.x, undefined, 4);

  set({ cs: result });
}, 100);
