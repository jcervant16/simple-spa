import terser from "@rollup/plugin-terser";

export default {
    input: "src/main.js",
    output: [
        {
            file: "dist/simple-js.esm.js",
            format: "esm",
           sourcemap: true,
        },
        {
            file: "dist/simple-js.umd.js",
            format: "umd",
            name: "SimpleSPA",     
            sourcemap: true,
            plugins: [terser()]
        }
    ],
};
