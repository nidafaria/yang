const NETCONF_NS = "urn:ietf:params:xml:ns:netconf:base:1.0";
const MODEL_NS = "urn:example:interface-config";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildEditConfigRpc(config) {
  const interfacesXml = config.interfaces.interface.map((intf) => {
    const mtu = intf.mtu === undefined ? 1500 : intf.mtu;

    return `
        <interface>
          <name>${escapeXml(intf.name)}</name>
          <enabled>${intf.enabled}</enabled>
          <mtu>${mtu}</mtu>
        </interface>`;
  }).join("");

  return `<rpc message-id="1" xmlns="${NETCONF_NS}">
  <edit-config>
    <target>
      <running/>
    </target>
    <config>
      <interfaces xmlns="${MODEL_NS}">${interfacesXml}
      </interfaces>
    </config>
  </edit-config>
</rpc>`;
}

module.exports = { buildEditConfigRpc };
