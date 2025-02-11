const replaceString = [
  ['color-interpolation-filters', 'colorInterpolationFilters'],
  ['flood-opacity', 'floodOpacity'],
  ['clip-path', 'clipPath'],
  ['stop-color', 'stopColor'],
  ['clip-rule', 'clipRule'],
  ['fill-rule', 'fillRule'],
  ['stroke-width', 'strokeWidth'],
  ['stroke-linecap', 'strokeLinecap'],
  ['stroke-linejoin', 'strokeLinejoin'],
  ['fill-opacity', 'fillOpacity'],
  ['stop-opacity', 'stopOpacity'],
  ['stroke-opacity', 'strokeOpacity'],
  ['stroke-dasharray', 'strokeDasharray'],
  ['stroke-miterlimit', 'strokeMiterlimit'],
  ['xlink:href', 'xlinkHref'],
  ['xmlns:xlink', 'xmlnsXlink'],
  ['style="mask-type:alpha"', `style={{ maskType: 'alpha' }}`],
  ['style="mask-type:luminance"', `style={{ maskType: 'luminance' }}`],
];

async function replaceSvg() {
  const { basename } = await import('path');
  const options = {
    files: ['./src/components/Icons/**.tsx', './src/components/Icons/**/**.tsx'],
    from: [...replaceString.map((x) => new RegExp(x[0], 'g')), new RegExp('export const \\w+', 'g')],
    to: [
      ...replaceString.map((x) => x[1]),
      (...args) => {
        const filename = basename(args[3], '.tsx');
        return `export const ${filename}`;
      },
    ],
  };
  // replace svg
  try {
    const replace = await import('replace-in-file');
    const results = await replace.replaceInFile(options);
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

async function isDir(path) {
  try {
    const fs = await import('fs');
    const stat = fs.lstatSync(path);
    return stat.isDirectory();
  } catch {
    // lstatSync throws an error if path doesn't exist
    return false;
  }
}

async function autoImportFile(folderIcons) {
  const { join } = await import('path');
  const fs = await import('fs');
  const files = fs.readdirSync(folderIcons).filter((e) => e !== 'index.ts');
  let text = '';
  for (const file of files) {
    const path = join(folderIcons, file);
    if (await isDir(path)) {
      await autoImportFile(path);
    }
    text += `export * from './${file.replace('.tsx', '')}';\r\n`;
  }
  fs.writeFileSync(join(folderIcons, 'index.ts'), text);
}

async function run() {
  const { join } = await import('path');
  await replaceSvg();
  await autoImportFile(join(__dirname, 'src', 'components', 'Icons'));
  await autoImportFile(join(__dirname, 'src', 'components', 'ui'));
}

run();
