/**
 * @generated SignedSource<<c81119e683451423f54bbfde904e2e40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserCard_user$data = {
  readonly name: string;
  readonly " $fragmentType": "UserCard_user";
};
export type UserCard_user$key = {
  readonly " $data"?: UserCard_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserCard_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserCard_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "3da98b9a7b3253fb777cc3c32aebc902";

export default node;
