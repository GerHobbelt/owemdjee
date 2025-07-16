









## IPC: flatbuffer et al for protocol design

- **arrow** [📁](./arrow) [🌐](https://github.com/GerHobbelt/arrow) -- Apache Arrow is a development platform for in-memory analytics. It contains a set of technologies that enable big data systems to process and move data fast. The reference Arrow libraries contain many distinct software components:
  
  - Columnar vector and table-like containers (similar to data frames) supporting
    flat or nested types
  
  - Conversions to and from other in-memory data structures
  - Integration tests for verifying binary compatibility between the
    implementations (e.g. sending data from Java to C++)
  
  - IO interfaces to local and remote filesystems
  - Readers and writers for various widely-used file formats (such as Parquet, CSV)
  - Reference-counted off-heap buffer memory management, for zero-copy memory
    sharing and handling memory-mapped files
  
  - Self-describing binary wire formats (streaming and batch/file-like) for
    remote procedure calls (RPC) and interprocess communication (IPC)

- **avro** [📁](./avro) [🌐](https://github.com/GerHobbelt/avro) -- Apache Avro™ is a data serialization system.
- **bebop** [📁](./bebop) [🌐](https://github.com/GerHobbelt/bebop) -- an extremely simple, fast, efficient, cross-platform serialization format. Bebop is a schema-based binary serialization technology, similar to Protocol Buffers or MessagePack. In particular, Bebop tries to be a good fit for client–server or distributed web apps that need something faster, more concise, and more type-safe than JSON or MessagePack, while also avoiding some of the complexity of Protocol Buffers, FlatBuffers and the like.
- **bitsery** [📁](./bitsery) [🌐](https://github.com/GerHobbelt/bitsery) -- header only C++ binary serialization library, designed around the networking requirements for real-time data delivery, especially for games. All cross-platform requirements are enforced at compile time, so serialized data do not store any meta-data information and is as small as possible.
- **capnproto** [📁](./capnproto) [🌐](https://github.com/GerHobbelt/capnproto) -- Cap'n Proto is an insanely fast data interchange format and capability-based RPC system. Think JSON, except binary. Or think [Protocol Buffers](https://github.com/google/protobuf), except faster.
- **cereal** [📁](./cereal) [🌐](https://github.com/GerHobbelt/cereal) -- C++11 serialization library
- **flatbuffers** [📁](./flatbuffers) [🌐](https://github.com/GerHobbelt/flatbuffers) -- a cross platform serialization library architected for maximum memory efficiency. It allows you to directly access serialized data without parsing/unpacking it first, while still having great forwards/backwards compatibility.
- **GoldFish-CBOR** [📁](./GoldFish-CBOR) [🌐](https://github.com/GerHobbelt/GoldFish) -- a fast JSON and CBOR streaming library, without using memory. GoldFish can parse and generate very large [JSON](http://json.org) or [CBOR](http://cbor.io) documents. It has some similarities to a [SAX](https://en.wikipedia.org/wiki/Simple_API_for_XML) parser, but doesn't use an event driven API, instead the user of the GoldFish interface is in control. GoldFish intends to be the easiest and one of the fastest JSON and CBOR streaming parser and serializer to use.
- **ion-c** [📁](./ion-c) [🌐](https://github.com/GerHobbelt/ion-c) -- a C implementation of the [Ion data notation](http://amzn.github.io/ion-docs). Amazon Ion is a richly-typed, self-describing, hierarchical data serialization format offering interchangeable binary and text representations. The text format (a superset of JSON) is easy to read and author, supporting rapid prototyping. The binary representation is efficient to store, transmit, and skip-scan parse. The rich type system provides unambiguous semantics for long-term preservation of data which can survive multiple generations of software evolution.
- **libbson** [📁](./libbson) [🌐](https://github.com/GerHobbelt/libbson) -- a library providing useful routines related to building, parsing, and iterating BSON documents.
- **libnop** [📁](./libnop) [🌐](https://github.com/GerHobbelt/libnop) -- libnop (C++ Native Object Protocols) is a header-only library for serializing and deserializing C++ data types without external code generators or runtime support libraries. The only mandatory requirement is a compiler that supports the C++14 standard.
- **libsmile** [📁](./libsmile) [🌐](https://github.com/GerHobbelt/libsmile) -- C implementation of the Smile binary format (https://github.com/FasterXML/smile-format-specification).
  
  - **discouraged**; reason: for binary format record serialization we will be using `bebop` or `reflect-cpp` exclusively. All other communications will be JSON/JSON5/XML based.

- **mosquitto** [📁](./mosquitto) [🌐](https://github.com/GerHobbelt/mosquitto) -- Eclipse Mosquitto is an open source implementation of a server for version 5.0, 3.1.1, and 3.1 of the MQTT protocol. It also includes a C and C++ client library, and the `mosquitto_pub` and `mosquitto_sub` utilities for publishing and subscribing.
- **msgpack-c** [📁](./msgpack-c) [🌐](https://github.com/GerHobbelt/msgpack-c) -- [MessagePack](http://msgpack.org/) (a.k.a. `msgpack`) for C/C++ is an efficient binary serialization format, which lets you exchange data among multiple languages like JSON, except that it's faster and smaller. Small integers are encoded into a single byte and short strings require only one extra byte in addition to the strings themselves.
- **msgpack-cpp** [📁](./msgpack-cpp) [🌐](https://github.com/GerHobbelt/msgpack-c) -- `msgpack` for C++: [MessagePack](http://msgpack.org/) is an efficient binary serialization format, which lets you exchange data among multiple languages like JSON, except that it's faster and smaller. Small integers are encoded into a single byte and short strings require only one extra byte in addition to the strings themselves.
- **protobuf** [📁](./protobuf) [🌐](https://github.com/GerHobbelt/protobuf) -- Protocol Buffers - Google's data interchange format that is a language-neutral, platform-neutral, extensible mechanism for serializing structured data.
  
  - **☹discouraged🤧**; reason: relatively slow run-time and (in my opinion) rather ugly & convoluted approach at build time. Has too much of a Java/CorporateProgramming smell, which has not lessened over the years, unfortunately.

- **reflect** [📁](./reflect) [🌐](https://github.com/GerHobbelt/reflect) -- a C++20 Static Reflection library with optimized run-time execution and binary size, fast compilation times and platform agnostic, minimal API. The library only provides basic reflection primitives and is not a full-fledged, heavy, implementation for https://wg21.link/P2996 which is a language proposal with many more features and capabilities.
- **reflect-cpp** [📁](./reflect-cpp) [🌐](https://github.com/GerHobbelt/reflect-cpp) -- a C++-20 library for **fast serialization, deserialization and validation** using reflection, similar to [pydantic](https://github.com/pydantic/pydantic) in Python, [serde](https://github.com/serde-rs) in Rust, [encoding](https://github.com/golang/go/tree/master/src/encoding) in Go or [aeson](https://github.com/haskell/aeson/tree/master) in Haskell. As the aforementioned libraries are among the most widely used in the respective languages, reflect-cpp fills an important gap in C++ development. It reduces boilerplate code and increases code safety.
- **serde-cpp** [📁](./serde-cpp) [🌐](https://github.com/GerHobbelt/serde-cpp) -- serialization framework for C++17, inspired by Rust [serde](https://serde.rs/) project.
- **serdepp** [📁](./serdepp) [🌐](https://github.com/GerHobbelt/serdepp) -- a C++17 low cost serialize deserialize adaptor library like Rust [serde](https://serde.rs/) project.
- **swig** [📁](./swig) [🌐](https://github.com/GerHobbelt/swig) -- SWIG (Simplified Wrapper and Interface Generator) is a software development tool (code generator) that connects programs written in C and C++ with a variety of high-level programming languages. It is used for building scripting language interfaces to C and C++ programs. SWIG simplifies development by largely automating the task of scripting language integration, allowing developers and users to focus on more important problems.
  
  *[SWIG 🌐](https://swig.readthedocs.io/en/latest/Manual/SWIG.html) was not considered initially; more suitable for RPC than what we have in mind, which is purely data messages enchange. MAY be of use for transitional applications which are mixed-(programming-)language based, e.g. where we want to mix C/C++ and C# in a single Test Application.*

- **thrift** [📁](./thrift) [🌐](https://github.com/GerHobbelt/thrift) -- Apache Thrift is a lightweight, language-independent software stack for point-to-point RPC implementation. Thrift provides clean abstractions and implementations for data transport, data serialization, and application level processing. The code generation system takes a simple definition language as input and generates code across programming languages that uses the abstracted stack to build interoperable RPC clients and servers.
- **velocypack** [📁](./velocypack) [🌐](https://github.com/GerHobbelt/velocypack) -- a fast and compact format for serialization and storage.  These days, JSON (JavaScript Object Notation, see ECMA-404) is used in many cases where data has to be exchanged. Lots of protocols between different services use it, databases store JSON (document stores naturally, but others increasingly as well). It is popular, because it is simple, human-readable, and yet surprisingly versatile, despite its limitations. At the same time there is a plethora of alternatives ranging from XML over Universal Binary JSON, MongoDB's BSON, MessagePack, BJSON (binary JSON), Apache Thrift till Google's protocol buffers and ArangoDB's shaped JSON. When looking into this, we were surprised to find that none of these formats manages to combine compactness, platform independence, fast access to sub-objects and rapid conversion from and to JSON.
- **zpp_bits** [📁](./zpp_bits) [🌐](https://github.com/GerHobbelt/zpp_bits) -- A modern, *fast*, C++20 binary serialization and RPC library, with just one header file.See also the [benchmark](https://github.com/GerHobbelt/zpp_bits#benchmark).
- ZeroMQ a.k.a. ØMQ:
- ~~**FastBinaryEncoding** [🌐](https://github.com/chronoxor/FastBinaryEncoding)~~
  
  - **removed**; reason: for binary format record serialization we will be using `bebop` exclusively. All other communications will be JSON/JSON5/XML based.

- ~~**flatbuffers** [🌐](https://github.com/google/flatbuffers)~~
  
  - **removed**; reason: see `protobuf`: same smell rising. Faster at run time, but still a bit hairy to my tastes while `bebop` et al are on to something *potentially nice*.

- ~~**flatcc** [🌐](https://github.com/dvidelabs/flatcc)~~
  
  - **removed**; reason: see `flatbuffers`. When we don't dig `flatbuffers`, then `flatcc` is automatically pretty useless to us. Let's rephrase that professionally: "`flatcc` has moved out of scope for our project."













	
----

🡸 [previous section](./0016-libraries-we-re-looking-at-for-this-intent.md)  |  🡹 [up](./0016-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0018-ipc-websockets-etc-all-communication-means.md)
