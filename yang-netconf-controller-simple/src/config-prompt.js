const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

function parseEnabled(value, defaultValue) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "") {
    return defaultValue;
  }
  if (normalized === "true") {
    return true;
  }
  if (normalized === "false") {
    return false;
  }
  throw new Error("Invalid enabled value: enter true or false.");
}

async function promptForConfiguration(defaultConfig) {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const defaultInterfaces = defaultConfig?.interfaces?.interface;
    const interfaces = Array.isArray(defaultInterfaces) && defaultInterfaces.length > 0
      ? defaultInterfaces
      : [{ name: "", enabled: true, mtu: 1500 }];

    const configuredInterfaces = [];
    console.log("Enter interface configuration (press Enter to keep the default).");

    for (let index = 0; index < interfaces.length; index += 1) {
      const defaultInterface = interfaces[index];
      const name = await rl.question(
        `Interface ${index + 1} name [${defaultInterface.name}]: `
      );
      const enabled = await rl.question(
        `Interface ${index + 1} enabled (true/false) [${defaultInterface.enabled}]: `
      );
      const mtu = await rl.question(
        `Interface ${index + 1} MTU [${defaultInterface.mtu ?? 1500}]: `
      );

      configuredInterfaces.push({
        name: name.trim() || defaultInterface.name,
        enabled: parseEnabled(enabled, defaultInterface.enabled),
        mtu: mtu.trim() === "" ? defaultInterface.mtu : Number(mtu.trim()),
      });
    }

    return {
      interfaces: {
        interface: configuredInterfaces,
      },
    };
  } finally {
    rl.close();
  }
}

module.exports = { promptForConfiguration };
