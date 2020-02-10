import { add } from "./shared/math.js";

if (add(2, 4) === 6) {
  window.x = window.x || {};
  window.x["static import"] = true;
  console.log("static import works!");
}
