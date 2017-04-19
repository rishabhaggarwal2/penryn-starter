#!/bin/bash
DIR=dist/
if [ -d "$DIR" ]; then
    rm -rf "$DIR"
fi
node build/node/prod/index.js
