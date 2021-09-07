#!/bin/bash

yarn
yarn run build
yarn run test
npx lerna publish --yes