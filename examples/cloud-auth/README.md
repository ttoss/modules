# Cloud-auth

Cloud-auth is the way that we use to load a pre-defined Amazon Cognito template in a project. Instead of making the same template for each new project, @ttoss/auth provides a package with a predefined template that we can import.

## Getting Started

You need to have Carlin installed (see this [link](https://carlin.ttoss.dev/docs/installation)) and your Amazon Credentials must be registered via AWS CLI.

On the root of the project folder, run:

```bash
yarn add @ttoss/auth
```


## Usage

Go to the Auth folder of the project:
```bash
cd *project-name*/packages/cloud/auth
```

The template's name is `getTemplate`. To use it, create a new file called *cloudformation.ts* and import the template. After the import, export it again.

To deploy the template, run:

```bash
carlin deploy
```

## Example

```bash
import { getTemplate } from "@ttoss/auth";

const template = getTemplate();

export default template;
```

