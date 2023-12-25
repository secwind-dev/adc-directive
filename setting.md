#step1

-   sw--init--pnpm

update file tsconfig.json
`"noEmit": true  // เพื่อ npm run validate`

#step2
Update the scripts in your package.json with the following
"main": "./dist/index.js",
"module": "./dist/index.mjs",
"types": "./dist/index.d.ts",
"scripts": {
"build": "tsup src/index.ts --format cjs,esm --dts",
"validate":"tsc"
}

#step 3
สร้าง file .github/workflows/main.yml

#step 4
github repositories project settings/secrets/actions
`//สร้าง NPM_TOKEN ด้วย New repositories secrets`
\*\*example URL https://github.com/total-typescript/ts-reset/blob/main/package.json
