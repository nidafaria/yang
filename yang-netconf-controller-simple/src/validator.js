const fs = require("node:fs");
const path = require("node:path");
const Yang = require("yang-js");

const yangPath = path.join(__dirname, "..", "yang", "interface-config.yang");

function validateWithYang(config) {
  const yangText = fs.readFileSync(yangPath, "utf8");

  // Parse the actual YANG module and evaluate the supplied configuration
  // against its schema. Schema/type/constraint errors are reported by yang-js.
  const schema = Yang.parse(yangText);
  const model = schema.eval(config);

  // Return a plain representation of the schema-bound model.
  return model.toJSON();
}

module.exports = { validateWithYang };
