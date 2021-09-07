#!/bin/bash

# Build in sequence of dependency.

yarn workspace @ttoss/config build
yarn workspace @ttoss/test-utils build

yarn workspace @ttoss/ui build
yarn workspace @ttoss/form build

yarn workspace @ttoss/auth build

yarn workspace @ttoss/storybook build
