# AuthDiff frontend

A dependency-free review workbench for baseline and candidate Soroban
authorization trees. It compares ordered invocation trees and shows the exact
path, principal and arguments that changed.

Run `npm ci --prefix backend`, then `node backend/server.mjs` and open
http://127.0.0.1:4782. Select **Load example**, then **Compare trees** to see a
nested amount change. **Load testnet capture** replays two unsigned Stellar RPC
simulations of the native XLM contract's `approve` call. **Swap sides** reverses
baseline and candidate before comparing.

The workbench is a single self-contained `index.html` served by the backend. It
posts to `/compare` for normalized trees and `/compare-xdr` for raw
`{ source, auth }` captures, then renders the ranked change summary and one card
per change. All input is inserted with `textContent`, so captured data is never
interpreted as markup.

Keep these five components as sibling checkouts:

| Component | Role |
| --- | --- |
| frontend | Review workbench with baseline, candidate and changed paths |
| backend | Local HTTP API and bounded JSON input |
| contract | Soroban fixture for parent and child authorization calls |
| auth-tree-core | Ordered, typed comparison engine |
| fixtures | Synthetic baseline and candidate data for reproducible review |

Run `npm test` here for the static document checks. Run
`node --test auth-tree-core/index.test.mjs` for the engine tests and
`npm test --prefix backend` to replay the captured data.
