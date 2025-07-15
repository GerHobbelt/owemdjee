

## IPC: JSON for protocol design

- **cJSON** [📁](./cJSON) [🌐](https://github.com/GerHobbelt/cJSON) -- ultra-lightweight JSON parser in ANSI C.
- **glaze** [📁](./glaze) [🌐](https://github.com/GerHobbelt/glaze) -- one of the fastest JSON libraries in the world. Glaze reads and writes from object memory, simplifying interfaces and offering incredible performance. Glaze also supports [BEVE](https://github.com/beve-org/beve) (binary efficient versatile encoding), CSV (comma separated value) and Binary data through the same API for maximum performance
- **GoldFish-CBOR** [📁](./GoldFish-CBOR) [🌐](https://github.com/GerHobbelt/GoldFish) -- a fast JSON and CBOR streaming library, without using memory. GoldFish can parse and generate very large [JSON](http://json.org) or [CBOR](http://cbor.io) documents. It has some similarities to a [SAX](https://en.wikipedia.org/wiki/Simple_API_for_XML) parser, but doesn't use an event driven API, instead the user of the GoldFish interface is in control. GoldFish intends to be the easiest and one of the fastest JSON and CBOR streaming parser and serializer to use.
- **json** [📁](./json) [🌐](https://github.com/GerHobbelt/nlohmann-json) -- N. Lohmann's JSON for Modern C++.
- **jsoncons** [📁](./jsoncons) [🌐](https://github.com/GerHobbelt/jsoncons) -- a C++, header-only library for constructing [JSON](http://www.json.org) and JSON-like data formats such as [CBOR](http://cbor.io/). Compared to other JSON libraries, jsoncons has been designed to handle very large JSON texts. At its heart are SAX-style parsers and serializers. It supports reading an entire JSON text in memory in a variant-like structure. But it also supports efficient access to the underlying data using StAX-style pull parsing and push serializing. It supports incremental parsing into a user's preferred form, using information about user types provided by specializations of `json_type_traits`.
- **jsoncpp** [📁](./jsoncpp) [🌐](https://github.com/GerHobbelt/jsoncpp) -- JsonCpp is a C++ library that allows manipulating JSON values, including serialization and deserialization to and from strings. It can also preserve existing comment in unserialization/serialization steps, making it a convenient format to store user input files.
- **json-jansson** [📁](./json-jansson) [🌐](https://github.com/GerHobbelt/jansson) -- _Jansson_ is a C library for encoding, decoding and manipulating JSON data.
- **rapidJSON** [📁](./rapidJSON) [🌐](https://github.com/GerHobbelt/rapidjson) -- TenCent's fast JSON parser/generator for C++ with both SAX & DOM style APIs.
- **simdjson** [📁](./simdjson) [🌐](https://github.com/GerHobbelt/simdjson) -- simdjson : Parsing gigabytes of JSON per second. For NDJSON files, we can exceed 3 GB/s with our multithreaded parsing functions](https://github.com/simdjson/simdjson/blob/master/doc/parse_many.md).
- **tao-json** [📁](./tao-json) [🌐](https://github.com/GerHobbelt/tao-json) -- taoJSON is a C++ header-only JSON library that provides a generic [Value Class](doc/Value-Class.md), uses [Type Traits](doc/Type-Traits.md) to interoperate with C++ types, uses an [Events Interface](doc/Events-Interface.md) to convert from and to JSON, JAXN, CBOR, MsgPack and UBJSON, and much more...
- **yyjson** [📁](./yyjson) [🌐](https://github.com/GerHobbelt/yyjson) -- allegedly the fastest JSON library in C.
- ~~**libsmile** [🌐](https://github.com/pierre/libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format~~
  
  - **discouraged**; reason: for binary format record serialization we will be using `bebop` or `reflect-cpp` exclusively. All other communications will be JSON/JSON5/XML based. I think we'd better standardize on using one or more of these:
    
    - custom binary exchange formats for those interchanges that demand highest performance and MAY carry large transfer loads.
    - JSON
    - TOML
    - XML
    - YAML












