const { withEntitlementsPlist } = require('expo/config-plugins');

// expo-notifications' config plugin adds the aps-environment (push) entitlement,
// but this app only uses local notifications. A provisioning profile without the
// Push Notifications capability then fails code signing, so strip the entitlement.
module.exports = function withoutPushEntitlement(config) {
  return withEntitlementsPlist(config, (c) => {
    delete c.modResults['aps-environment'];
    return c;
  });
};
