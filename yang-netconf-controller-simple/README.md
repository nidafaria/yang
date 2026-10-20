# Simple YANG + NETCONF Mock Project

This small project demonstrates the basic workflow:

1. Read configuration data from JSON.
2. Load the YANG model and validate the JSON with `yang-js`.
3. Build a NETCONF-style `<edit-config>` RPC in XML.
4. Pass it to a local mock server function.
5. Log the simulated server reply.

## Important limitation

This is an educational mock. `yang-js` evaluates the supplied YANG schema, but its YANG 1.1 support may be incomplete. This project does not connect to a real network device. The mock server is a JavaScript function in the same Node.js process, not a real NETCONF server.

## Run in VS Code

1. Extract the ZIP.
2. Open the extracted folder in VS Code.
3. Open Terminal > New Terminal.
4. Run:

```bash
npm install
npm start
```

## Try validation

In `config/interfaces.json`, change an MTU to `100` or change `enabled` to a string such as `"yes"`, then run `npm start` again. The YANG-driven validation should reject values that violate the model. If a particular constraint is not enforced by this library version, treat that as a library limitation rather than production-grade validation.

## Main files

- `yang/interface-config.yang`: schema.
- `config/interfaces.json`: desired configuration.
- `src/validator.js`: loads and evaluates the actual YANG file.
- `src/rpc-builder.js`: creates the XML RPC.
- `src/mock-netconf-server.js`: simulates receiving the RPC.
- `index.js`: coordinates the workflow and logs each step.

No tests, REST API, persistent database, device inventory, or audit history are included.
