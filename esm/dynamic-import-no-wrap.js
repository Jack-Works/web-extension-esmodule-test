import("./shared/math.js").then(rec => {
  if (rec.add(2, 4) === 6) {
    window.x = window.x || {};
    window.x["dynamic import with no wrap"] = true;
  }
  console.log("dynamic import with no wrap works!");
});
