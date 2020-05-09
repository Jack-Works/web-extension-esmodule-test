import { TaskFunction, task, src, dest, series, watch } from "gulp";

const publicPath = "./public/**/*";
const esPath = "./es/**/*";
const systemPath = "./system/**/*";
const out = "./out/";
export default (function defaultTask(cb) {
  // place code for your default task here
  copy(publicPath, out);
  copy(["node_modules/webextension-polyfill/dist/browser-polyfill.*"], out);
  copy(
    "node_modules/@magic-works/webextension-systemjs/*.j*",
    out + "system-loader/"
  );
  copy(esPath, out + "es/");
  copy(systemPath, out + "system/");
  cb();
} as TaskFunction);

function copy(from: string | string[], to: string) {
  src(from).pipe(dest(to));
  watch(publicPath, () => src(from).pipe(dest(to)));
}
