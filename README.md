# AuthDiff

AuthDiff compares a baseline Soroban authorization tree with a candidate and
reports changes at their exact invocation path. The first milestone is a local
review flow for normalized input.

Run `node backend/server.mjs` and open http://127.0.0.1:4782. Select **Load
example**, then **Compare trees** to see a nested amount change. Keep these five
components as sibling checkouts.

| Component | Role |
| --- | --- |
| frontend | Review workbench with baseline, candidate and changed paths |
| backend | Local HTTP API and bounded JSON input |
| contract | Soroban fixture for parent and child authorization calls |
| auth-tree-core | Ordered, typed comparison engine |
| fixtures | Synthetic baseline and candidate data for reproducible review |

Run `node --test auth-tree-core/index.test.mjs` for the engine tests.
The sample uses symbolic contract and account identifiers. The comparison
preserves entry and child order and compares argument XDR as opaque strings.
It covers the supplied normalized fields only. Raw RPC XDR decoding,
nonce and expiry review, delegated credentials, wallet integration and testnet
capture are planned milestones. The tool does not sign transactions or certify
their safety.
