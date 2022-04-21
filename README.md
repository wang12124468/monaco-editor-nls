# monaco-editor-nls

> You can find how to use it in [monaco-editor-esm-webpack-plugin](https://github.com/wang12124468/monaco-editor-esm-webpack-plugin).  
> It dependency on [vscode-loc](https://github.com/microsoft/vscode-loc) to get the locales.

Provider the file of `nls.js` to replace the original `nls.js` file of [monaco editor](https://github.com/microsoft/monaco-editor).
And also Provider the locales of [monaco editor](https://github.com/microsoft/monaco-editor)

## Intalling

`npm install monaco-editor-nls`

## Using

- The first, you should cofigure [monaco-editor-esm-webpack-plugin](https://github.com/wang12124468/monaco-editor-esm-webpack-plugin)

- Then, you can set the locale data in your code.

    ```
    // index.js
    import { setLocaleData } from 'monaco-editor-nls';
    import zh_CN from 'monaco-editor-nls/locale/zh-hans';

    setLocaleData(zh_CN);

    // You must import/require after `setLocaleData`
    const monaco = require('monaco-editor/esm/vs/editor/editor.api');

    monaco.editor.create(document.getElementById('container'), { language: 'javascript' });
    ```
## Using custom locale

### For example to use [vscode-loc](https://github.com/microsoft/vscode-loc)

- First, install.

`npm install git+ssh://git@github.com:microsoft/vscode-loc.git`

- Then, set the locale data.

    ```
    // index.js
    import { setLocaleData } from 'monaco-editor-nls';
    import zh_CN from 'vscode-loc/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json';

    // Note: there should set the `contents`.
    setLocaleData(zh_CN.contents);

    // You must import/require after `setLocaleData`
    const monaco = require('monaco-editor/esm/vs/editor/editor.api');

    monaco.editor.create(document.getElementById('container'), { language: 'javascript' });
    ```

## Notice

Current monaco-editor version: 0.32.x