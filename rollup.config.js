import fs from 'fs'
import glob from 'glob'
import typescript from 'typescript';
import cssnext from 'postcss-cssnext';
import typescriptPlugin from 'rollup-plugin-typescript2';
import postcssPlugin from 'rollup-plugin-postcss-modules';

const initCssTypeDeclarations = () => {
    /* initialize CSS files because of a catch-22 situation: https://github.com/rollup/rollup/issues/1404 */
    for (const css of glob.sync('src/**/*.css')) {
        const definition = `${css}.d.ts`
        if (!fs.existsSync(definition))
            fs.writeFileSync(definition, 'const mod: { [cls: string]: string }\nexport default mod\n');
    }
};

initCssTypeDeclarations();
export default {
    input: './src/index.tsx',
    output: {
        file: './dist/kite.js',
        format: 'cjs',
    },
    plugins: [
        postcssPlugin({
            extract: 'dist/kite.css',
            plugins: [cssnext()],
            writeDefinitions: true,
        }),
        typescriptPlugin({ typescript }),
    ],
};
