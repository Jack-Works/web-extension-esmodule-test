import(browser.runtime.getURL("./es/content-script.js")).catch(() => {
  // Firefox fallback to SystemJS
  System.import("./system/content-script.js");
});
