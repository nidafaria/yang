# Simple YANG + NETCONF Mock Project

This small project demonstrates the basic workflow:

1. Read default configuration values from JSON.
2. Collect configuration values from the terminal.
3. Load the YANG model and validate the configuration with `yang-js`.
4. Build a NETCONF-style `<edit-config>` RPC in XML.
5. Pass it to a local mock server function.
6. Log the simulated server reply.

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

## Terminal configuration

Run `npm start` and enter the interface name, enabled state, and MTU when prompted. Press Enter to keep the default from `config/interfaces.json`. Names must be 1 to 32 characters, enabled must be `true` or `false`, and MTU values must be integers from `576` through `9000`; invalid values are rejected before an RPC is sent.

## Main files

- `yang/interface-config.yang`: schema.
- `config/interfaces.json`: desired configuration.
- `src/validator.js`: manually validates the YANG-defined name, enabled, and MTU constraints, then loads and evaluates the actual YANG file.
- `src/rpc-builder.js`: creates the XML RPC.
- `src/mock-netconf-server.js`: simulates receiving the RPC.
- `index.js`: coordinates the workflow and logs each step.

No tests, REST API, persistent database, device inventory, or audit history are included.
