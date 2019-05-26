#!/bin/bash
rm -rf dist;
mkdir dist;
tsc --declaration;
cp package.json dist
cp README.md dist
cp LICENSE dist
cp .gitignore dist
find . -name '*.vue' | cpio -pdm dist/
echo "Done! "