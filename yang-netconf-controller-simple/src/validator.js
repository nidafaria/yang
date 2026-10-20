const fs = require("node:fs");
const path = require("node:path");
const Yang = require("yang-js");

const yangPath = path.join(__dirname, "..", "yang", "interface-config.yang");
const INTERFACE_NAME_MAX_LENGTH = 32;
const MTU_MIN = 576;
const MTU_MAX = 9000;

function validateInterfaceFields(config) {
  const interfaces = config?.interfaces?.interface;

  if (!Array.isArray(interfaces)) {
    return;
  }

  interfaces.forEach((intf, index) => {
    if (!intf || typeof intf !== "object") {
      throw new Error(`Invalid interface at interfaces.interface[${index}].`);
    }

    const location = `interfaces.interface[${index}]`;
    const { name, enabled } = intf;

    if (
      typeof name !== "string" ||
      name.length < 1 ||
      name.length > INTERFACE_NAME_MAX_LENGTH
    ) {
      throw new Error(
        `Invalid name at ${location}.name: expected a string from 1 to ${INTERFACE_NAME_MAX_LENGTH} characters.`
      );
    }

    if (typeof enabled !== "boolean") {
      throw new Error(
        `Invalid enabled value at ${location}.enabled: expected true or false.`
      );
    }

    if (!Object.prototype.hasOwnProperty.call(intf, "mtu")) {
      return;
    }

    const { mtu } = intf;
    if (
      typeof mtu !== "number" ||
      !Number.isInteger(mtu) ||
      mtu < MTU_MIN ||
      mtu > MTU_MAX
    ) {
      throw new Error(
        `Invalid MTU at interfaces.interface[${index}].mtu: expected an integer from ${MTU_MIN} to ${MTU_MAX}.`
      );
    }
  });
}

function validateWithYang(config) {
  validateInterfaceFields(config);

  const yangText = fs.readFileSync(yangPath, "utf8");

  // Parse the actual YANG module and evaluate the supplied configuration
  // against its schema. Schema/type/constraint errors are reported by yang-js.
  const schema = Yang.parse(yangText);
  const model = schema.eval(config);

  // Return a plain representation of the schema-bound model.
  return model.toJSON();
}

module.exports = { validateWithYang };
