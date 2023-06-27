# TrollCallAPIs
A set of TrollCallNotAgain-equivalent API hooks, made to let developers create third-party apps for the TrollCall service.

---

TrollCall is great, but the merge of the client and server TrollCallNotAgain has with Next.js is problematic. (ahem, Client/Server Hydration and Server Components (those are messy grr))

There are a few issues with the existing APIs as well:
1. Objects get duplicated if their name/first-name is changed.

Doing this:
```
PUSH /api/user/.../troll/name1

{
  ...
  "name": ["name2", ...]
  ...
}
```
results in this on the database:
```
trolls/
|- Document {"name": ["name1", ...], ...}
|- Document {"name": ["name2", ...], ...}
```
which is not good.

2. More issues that I forgot

They certainly exist
