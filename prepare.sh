#!/bin/bash
rm -rf dist;
mkdir dist;
ln -s README.md dist/;
ln -s package.json dist/;
ln -s LICENSE dist/;
tsc --declaration;
find . -name '*.vue' | cpio -pdm dist/
echo "Done! "