function sendToMockNetconfServer(rpcXml) {
  console.log("[NETCONF] Mock server received an RPC.");

  if (!rpcXml.includes("<edit-config>") || !rpcXml.includes("<config>")) {
    return {
      success: false,
      response: "<rpc-reply><rpc-error><error-tag>operation-not-supported</error-tag></rpc-error></rpc-reply>"
    };
  }

  // Simulated response only: no real device is contacted or changed.
  return {
    success: true,
    response: "<rpc-reply><ok/></rpc-reply>"
  };
}

module.exports = { sendToMockNetconfServer };
