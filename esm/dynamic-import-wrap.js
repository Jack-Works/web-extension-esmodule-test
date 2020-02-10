import(window.getURL("/esm/shared/math.js")).then(rec => {
  if (rec.add(2, 4) === 6) {
    window.x = window.x || {};
    window.x["dynamic import with wrap"] = true;
  }
  console.log("dynamic import with wrap works!");
  import("./import.meta.js");
});
