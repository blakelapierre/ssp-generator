#!/bin/bash

cd frontend

npm install
gulpur build

rm -rf .tmp
mkdir .tmp

cp .dist/* .tmp

cd ..

git checkout -b gh-pages
git checkout gh-pages

shopt -s extglob
rm -rf !(.tmp)

mv .tmp/* ../