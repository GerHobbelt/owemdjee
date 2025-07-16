











## IPC: YAML, TOML, etc. for protocol design

**Not considered**: reason: when we want the IPC protocol to be "human readable" in any form/approximation, we've decided to stick with JSON or XML (if we cannot help it -- I particularly dislike the verbosity and tag redundancy (open+close) in XML and consider it a lousy design choice for *any* purpose).

The more human readable formats (YAML, TOML, ...) are intended for human to machine communications, e.g. for feeding configurations into applications, and **SHOULD NOT** be used for IPC anywhere. (Though I must say I'm on the fence where it comes using YAML as an alternative IPC format where it replaces JSON; another contender there are the JSON5/JSON6 formats.)















	
----

🡸 [previous section](./0012-ipc-cbor-for-protocol.md)  |  🡹 [up](./0006-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0014-content.md)
