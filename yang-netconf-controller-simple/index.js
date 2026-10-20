const fs = require("node:fs");
const path = require("node:path");
const { validateWithYang } = require("./src/validator");
const { buildEditConfigRpc } = require("./src/rpc-builder");
const { sendToMockNetconfServer } = require("./src/mock-netconf-server");

function main() {
  console.log("=== YANG + NETCONF mock project ===");

  try {
    const configPath = path.join(__dirname, "config", "interfaces.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    console.log("[CONFIG] JSON configuration loaded.");

    validateWithYang(config);
    console.log("[VALIDATION] Configuration accepted by the YANG model.");

    const rpc = buildEditConfigRpc(config);
    console.log("[RPC] Generated NETCONF edit-config request:");
    console.log(rpc);

    const result = sendToMockNetconfServer(rpc);
    console.log("[NETCONF] Mock server response:", result.response);

    if (!result.success) {
      console.error("[FAILURE] Mock server rejected the request.");
      process.exitCode = 1;
      return;
    }

    console.log("[SUCCESS] Workflow completed (simulated; no real device connection).");
  } catch (error) {
    console.error("[VALIDATION/EXECUTION ERROR]", error.message);
    console.error("[STOPPED] No RPC was sent.");
    process.exitCode = 1;
  }
}

main();
