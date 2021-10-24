#include "../hookapi.h"

#defind BLACKLIST_ACCOUNT

int64_t cbak(int64_t reserved) {
}

int64_t hook(int64_t reserved) {
  GUARD(1);
  // fetch the originating account ID
  uint8_t otxn_accid[20];
  if (otxn_field(otxn_accid, 20, sfAccount) != 20)
      rollback(SBUF("Firewall: Could not fetch sfAccount from originating transaction!!!"), 100);

  // RH NOTE in production you should always specify account IDs directly as a preset 20 byte array
  // translating from r-addr here is just for demonstration purposes.
  uint8_t blacklist_accid[20];
  if (util_accid(SBUF(blacklist_accid), SBUF(BLACKLIST_ACCOUNT)) != 20)
      rollback(SBUF("Firewall: Could not decode blacklist account id."), 200);

  // look up the account ID in the foreign state (blacklist accounts hook state)
  uint8_t blacklist_status[1] = { 0 };
  int64_t lookup = state_foreign(SBUF(blacklist_status), SBUF(otxn_accid), SBUF(blacklist_accid));
  if (lookup == INVALID_ACCOUNT)
      trace(SBUF("Firewall: Warning specified blacklist account does not exist."), 0, 0, 0);

  if (blacklist_status[0] == 0)
      accept(SBUF("Firewall: Allowing transaction."), 0);

  rollback(SBUF("Firewall: Blocking transaction from blacklisted account."), 1);

  return 0;

}