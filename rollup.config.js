import typescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import * as fs from "fs";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";

const dir = "src/ts"

function isDev() {
    return !!process.argv.find((el)=> el=="--config-dev");
}

let files = fs.readdirSync(dir).filter(el=>path.extname(el)==".ts").map(el=> dir+"/"+ el);

if(!files.length) {
    throw new Error(`No sources found in ${dir}`);
}

export default {
    input: {
        app:"src/ts/app.ts",
        // testnpmlibrary:"node_modules/testnpmlibrary/src/index.ts",
    },
    output: {
        dir:"public/js",
        format: "esm",
        sourcemap: isDev(),
    },
    plugins: [
        // typescript(),
        typescript({
        tsconfig: "./tsconfig.json"
        }),
   
        !isDev() ? terser() : null,
        nodeResolve({
            jsnext:true,
            module:true,

            // moduleDirectories:["node_modules"],
            // modulePaths:["node_modules/testnpmlibrary"],
            // browser: true,
            // mainFields: ["browser", "module", "main"],
        }),
        // commonjs(),
   
        ],
        // external:["../../.../ElectronTest"]
        // external:['watawaeengine','testnpmlibrary']
}


// export default files.map(el=> {
//     return {
//         input: el,
//         output: {
//             dir: "public/js",
//             format: "esm",
//             sourcemap: isDev(),
//         },
//         plugins: [
//             typescript({
//                 tsconfig: "./tsconfig.json"
//             }),
//             !isDev() ? terser() : null,
          
//         ],
      
//     }
// })

// export default [
//     {
//         input: "src/ts/app.ts",
//         output: {
//             dir: "public/js",
//             format: "esm",
//             sourcemap: isDev(),
//         },
//         plugins: [
//             typescript({
//                 tsconfig: "./tsconfig.json"
//             }),
//             !isDev() ? terser() : null
//         ]
//     }
// ]