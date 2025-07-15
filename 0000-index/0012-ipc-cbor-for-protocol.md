

## IPC: CBOR for protocol design

- **glaze** [📁](./glaze) [🌐](https://github.com/GerHobbelt/glaze) -- one of the fastest JSON libraries in the world. Glaze reads and writes from object memory, simplifying interfaces and offering incredible performance. Glaze also supports [BEVE](https://github.com/beve-org/beve) (binary efficient versatile encoding), CSV (comma separated value) and Binary data through the same API for maximum performance
- **GoldFish-CBOR** [📁](./GoldFish-CBOR) [🌐](https://github.com/GerHobbelt/GoldFish) -- a fast JSON and CBOR streaming library, without using memory. GoldFish can parse and generate very large [JSON](http://json.org) or [CBOR](http://cbor.io) documents. It has some similarities to a [SAX](https://en.wikipedia.org/wiki/Simple_API_for_XML) parser, but doesn't use an event driven API, instead the user of the GoldFish interface is in control. GoldFish intends to be the easiest and one of the fastest JSON and CBOR streaming parser and serializer to use.
- **jsoncons** [📁](./jsoncons) [🌐](https://github.com/GerHobbelt/jsoncons) -- a C++, header-only library for constructing [JSON](http://www.json.org) and JSON-like data formats such as [CBOR](http://cbor.io/). Compared to other JSON libraries, jsoncons has been designed to handle very large JSON texts. At its heart are SAX-style parsers and serializers. It supports reading an entire JSON text in memory in a variant-like structure. But it also supports efficient access to the underlying data using StAX-style pull parsing and push serializing. It supports incremental parsing into a user's preferred form, using information about user types provided by specializations of `json_type_traits`.
- **libcbor** [📁](./libcbor) [🌐](https://github.com/GerHobbelt/libcbor) -- a C library for parsing and generating [CBOR](https://tools.ietf.org/html/rfc7049), the general-purpose schema-less binary data format.
- **QCBOR** [📁](./QCBOR) [🌐](https://github.com/GerHobbelt/QCBOR) -- a powerful, commercial-quality CBOR encoder/decoder that implements these RFCs:
  
  * [RFC7049](https://tools.ietf.org/html/rfc7049) The previous CBOR standard. Replaced by RFC 8949.
  * [RFC8742](https://tools.ietf.org/html/rfc8742) CBOR Sequences
  * [RFC8943](https://tools.ietf.org/html/rfc8943) CBOR Dates
  * [RFC8949](https://tools.ietf.org/html/rfc8949) The CBOR Standard. (Everything except sorting of encoded maps)

- **tinycbor** [📁](./tinycbor) [🌐](https://github.com/GerHobbelt/tinycbor) -- Concise Binary Object Representation (CBOR) library for serializing data to disk or message channel.















	
----

🡸 [prev](./0011-ipc-json-for-protocol.md)  |  🡹 [up](./0006-libraries-we-re-looking-at-for-this-intent.md)  |  🡺 [next](./0013-ipc-yaml-toml-etc-for-protocol.md)
