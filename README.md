# Are ESModule in WebExtension ready yet? The test suit.

Tested item

- Load background page as ESModule (by `<script type="module">`)
- Load popup page as ESModule (by `<script type="module">`)
- Load options page as ESModule (by `<script type="module">`)
- Load content script as ESModule (specify in the manifest)

## Chrome

✔️\*: Content script must use a dynamic import to load an ESModule.

## Firefox

## Firefox for Android

## WebExtension polyfill for iOS
