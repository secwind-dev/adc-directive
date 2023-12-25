#step1

-   sw--init--pnpm

update file tsconfig.json
`"noEmit": true  // เพื่อ npm run validate`

#step2
Update the scripts in your package.json with the following
-"scripts": {
"build": "tsup src/index.ts --format cjs,esm --dts",
"validate":"tsc"
}

#step 3

-   mkdir .github .github/workflows

\*\*example URL https://github.com/total-typescript/ts-reset/blob/main/package.json
