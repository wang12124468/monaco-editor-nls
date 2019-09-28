const process = require('child_process');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
const rootPath = path.resolve(__dirname, '..');

/** vscode-loc i18n file's prefix name */
const vscodeLocDirNamePrefix = 'vscode-language-pack-';

/** The dir for repository to vscode-loc  */
const vscodeLocRepositoryDir = path.resolve(rootPath, 'vscode-loc');
const vscodeLocRepositoryI18Dir = path.resolve(vscodeLocRepositoryDir, 'i18n');
const vscodeLocTranslationsDirName = 'translations';

/** The path for locale */
const localePath = path.resolve(rootPath, 'locale');

/** The repository for vscode-loc: https://github.com/microsoft/vscode-loc */
const vscodeLocRepository = 'git@github.com:microsoft/vscode-loc.git';

// First clone the source of vscode-loc
gitCloneVscode();

// Then translate vscode-loc's i18n to locale
translateVscodeLocToLocale();

/** Clone the source of vscode-loc  */
function gitCloneVscode() {
    console.log(`Clone vscode-doc from ${vscodeLocRepository}. Please wait...`);
    rimraf.sync(vscodeLocRepositoryDir);
    process.execSync(`git clone ${vscodeLocRepository} --depth=1`);
}

/** Translate vscode-loc's i18n to locale */
function translateVscodeLocToLocale() {

    console.log(`Translate vscode-loc's i18n to locale.  Please wait...`);
    
    rimraf.sync(localePath);
    fs.mkdirSync(localePath);

    const i18Dirs = fs.readdirSync(vscodeLocRepositoryI18Dir);
    i18Dirs.map((i18Dir) => {
        if(!i18Dir.startsWith(vscodeLocDirNamePrefix)) { return; }
        const language = i18Dir.substring(vscodeLocDirNamePrefix.length).toLowerCase();
        const translationsPath = path.resolve(vscodeLocRepositoryI18Dir, i18Dir, vscodeLocTranslationsDirName);
        translate(language, translationsPath);
    })
}

/** Translate one language of vscode-doc to locale */
function translate(language, translationsPath) {

    const translationsDirs = fs.readdirSync(translationsPath);
    translationsDirs.map(translationsDir => {
        if(!translationsDir.endsWith('.i18n.json')) {
            return;
        }

        const data = fs.readFileSync(path.resolve(translationsPath, translationsDir), { encoding: 'UTF-8' });

        let i18n = null;
        // Try to parse to json
        try {
            i18n = json.parse(data);
        } catch (error) {
            try {
                i18n = eval(`(${data})`);
            } catch (error) {
                console.error(`Translate ${translationsDir} error!`);
                return;
            }
        }

        const locale = JSON.stringify(i18n.contents || {}, null, 4);
        fs.writeFileSync(path.resolve(localePath, `${language}.json`), locale);
        console.log(`Translate ${language}.json ok!`);
    })
}