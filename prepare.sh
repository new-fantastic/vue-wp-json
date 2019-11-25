#!/bin/bash
rm -rf dist;
mkdir dist;
npx tsc --declaration;
cp package.json dist
cp README.md dist
cp LICENSE dist
cp .gitignore dist
rm -rf dist/tests
find . -name '*.vue' | cpio -pdm dist/
echo "Done! "
