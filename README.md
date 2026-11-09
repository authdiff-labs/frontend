# AuthDiff

AuthDiff compares a baseline Soroban authorization tree with a candidate and
reports changes at their exact invocation path. The first milestone is a local
review flow for normalized input.

Run `npm ci --prefix backend`, then `node backend/server.mjs` and open http://127.0.0.1:4782. Select **Load
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
Select **Load testnet capture** to replay two unsigned Stellar RPC simulations
of the native XLM contract's approve call. The candidate changes the i128 amount
from 100 to 250. The capture did not submit transactions or deploy the fixture.

Raw input is a JSON object with a Stellar source account in `source` and a
base64 authorization-entry array in `auth`. The decoder handles source-account,
address and address-v2 credentials for contract calls. It rejects delegated
credentials and host functions that create contracts. Nonces, expiration,
signatures, fees and execution effects are outside this comparison.

Run `npm test --prefix backend` to replay the captured data. Use
`npm run pilot --prefix backend` for a fresh unsigned capture with a funded
testnet account supplied through `AUTHDIFF_TESTNET_SOURCE` when needed.
