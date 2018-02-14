import { rollup } from 'rollup';
import rootImport from 'rollup-plugin-root-import';

export default{
    input: 'apps/wallet/elements/app/app.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    plugins: [
        rootImport({
            root: './',
            useEntry: 'prepend',
            // If we don't find the file verbatim, try adding these extensions
            extensions: '.js'
        })
    ]
};