









## IPC: websockets, etc.: all communication means

- **blazingmq** [📁](./blazingmq) [🌐](https://github.com/GerHobbelt/blazingmq) -- BlazingMQ is a modern, High-Performance Message Queue, which focuses on efficiency, reliability, and a rich feature set for modern-day workflows. At its core, BlazingMQ provides durable, fault-tolerant, highly performant, and highly available queues, along with features like various message routing strategies (e.g., work queues, priority, fan-out, broadcast, etc.), compression, strong consistency, poison pill detection, etc.  Message queues generally provide a loosely-coupled, asynchronous communication channel ("queue") between application services (producers and consumers) that send messages to one another. You can think about it like a mailbox for communication between application programs, where 'producer' drops a message in a mailbox and 'consumer' picks it up at its own leisure. Messages placed into the queue are stored until the recipient retrieves and processes them. In other words, producer and consumer applications can temporally and spatially isolate themselves from each other by using a message queue to facilitate communication.
- **boringssl** [📁](./boringssl) [🌐](https://github.com/GerHobbelt/boringssl) -- BoringSSL is a fork of OpenSSL that is designed to meet Google's needs.
- **cpp-httplib** [📁](./cpp-httplib) [🌐](https://github.com/GerHobbelt/cpp-httplib) -- an extremely easy to setup C++11 cross platform HTTP/HTTPS library. 
  
  **NOTE**: This library uses 'blocking' socket I/O. If you are looking for a library with 'non-blocking' socket I/O, this is not the one that you want.

- **cpp-ipc** [📁](./cpp-ipc) [🌐](https://github.com/GerHobbelt/cpp-ipc) -- a high-performance inter-process communication using shared memory on Linux/Windows.
- **cpp-netlib** [📁](./cpp-netlib) [🌐](https://github.com/GerHobbelt/cpp-netlib) -- modern C++ network programming library: `cpp-netlib` is a collection of network-related routines/implementations geared towards providing a robust cross-platform networking library.
- **cpp_rest_sdk** [📁](./cpp_rest_sdk) [🌐](https://github.com/GerHobbelt/cpprestsdk) -- the C++ REST SDK is a Microsoft project for cloud-based client-server communication in native code using a modern asynchronous C++ API design. This project aims to help C++ developers connect to and interact with services.
- **crow** [📁](./crow) [🌐](https://github.com/GerHobbelt/crow) -- IPC / server framework. Crow is a very fast and easy to use C++ micro web framework (inspired by Python Flask).
  
  Interface looks nicer than `oatpp`...

- **ecal** [📁](./ecal) [🌐](https://github.com/GerHobbelt/ecal) -- the *enhanced Communication Abstraction Layer* (*eCAL*) is a middleware that enables scalable, high performance interprocess communication on a single computer node or between different nodes in a computer network. eCAL uses a publish-subscribe pattern to automatically connect different nodes in the network. eCAL automatically chooses the best available data transport mechanism for each link:
  
  - Shared memory for local communication (incredible fast!)
  - UDP for network communication

- **iceoryx** [📁](./iceoryx) [🌐](https://github.com/GerHobbelt/iceoryx) -- true zero-copy inter-process-communication. iceoryx is an inter-process-communication (IPC) middleware for various operating systems (currently we support Linux, macOS, QNX, FreeBSD and Windows 10). It has its origins in the automotive industry, where large amounts of data have to be transferred between different processes when it comes to driver assistance or automated driving systems. However, the efficient communication mechanisms can also be applied to a wider range of use cases, e.g. in the field of robotics or game development.
- **libetpan** [📁](./libetpan) [🌐](https://github.com/GerHobbelt/libetpan) -- this mail library provides a portable, efficient framework for different kinds of mail access: IMAP, SMTP, POP and NNTP.
- **libwebsocketpp** [📁](./libwebsocketpp) [🌐](https://github.com/GerHobbelt/websocketpp) -- WebSocket++ is a header only C++ library that implements RFC6455 The WebSocket Protocol.
- **libwebsockets** [📁](./libwebsockets) [🌐](https://github.com/GerHobbelt/libwebsockets) -- a simple-to-use C library providing client and server for HTTP/1, HTTP/2, WebSockets, MQTT and other protocols. It supports a lot of lightweight ancilliary implementations for things like JSON, CBOR, JOSE, COSE. It's very gregarious when it comes to event loop sharing, supporting libuv, libevent, libev, sdevent, glib and uloop, as well as custom event libs.
- **MPMCQueue** [📁](./MPMCQueue) [🌐](https://github.com/GerHobbelt/MPMCQueue) -- a bounded multi-producer multi-consumer concurrent queue written in C++11.
- **MultipartEncoder** [📁](./MultipartEncoder) [🌐](https://github.com/GerHobbelt/MultipartEncoder) -- a C++ implementation of encoding multipart/form-data. You may find the asynchronous http-client, i.e. [cpprestsdk](https://github.com/Microsoft/cpprestsdk), does not support posting a multipart/form-data request. This MultipartEncoder is a work around to generate the body content of multipart/form-data format, so that then you can use a cpp HTTP-client, which is not limited to cpprestsdk, to post a multipart/form-data request by setting the encoded body content.
- **nanomsg-nng** [📁](./nanomsg-nng) [🌐](https://github.com/GerHobbelt/nng) -- a rewrite of the Scalability Protocols library known as https://github.com/nanomsg/nanomsg[libnanomsg], which adds significant new capabilities, while retaining compatibility with the original. NNG is a lightweight, broker-less library, offering a simple API to solve common recurring messaging problems, such as publish/subscribe, RPC-style request/reply, or service discovery.
- **nghttp3** [📁](./nghttp3) [🌐](https://github.com/GerHobbelt/nghttp3) -- an implementation of `RFC 9114 <https://datatracker.ietf.org/doc/html/rfc9114>`_ HTTP/3 mapping over QUIC and `RFC 9204 <https://datatracker.ietf.org/doc/html/rfc9204>`_ QPACK in C.
- **ngtcp2** [📁](./ngtcp2) [🌐](https://github.com/GerHobbelt/ngtcp2) -- ngtcp2 project is an effort to implement `RFC9000 <https://datatracker.ietf.org/doc/html/rfc9000>`_ QUIC protocol.
- **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- OpenSSL is a robust, commercial-grade, full-featured Open Source Toolkit for the Transport Layer Security (TLS) protocol formerly known as the Secure Sockets Layer (SSL) protocol. The protocol implementation is based on a full-strength general purpose cryptographic library, which can also be used stand-alone.
- **readerwriterqueue** [📁](./readerwriterqueue) [🌐](https://github.com/GerHobbelt/readerwriterqueue) -- a single-producer, single-consumer lock-free queue for C++.
- **restc-cpp** [📁](./restc-cpp) [🌐](https://github.com/GerHobbelt/restc-cpp) -- a modern C++ REST Client library. The magic that takes the pain out of accessing JSON API's from C++. The design goal of this project is to make external REST API's simple and safe to use in C++ projects, but still fast and memory efficient.
- **restclient-cpp** [📁](./restclient-cpp) [🌐](https://github.com/GerHobbelt/restclient-cpp) -- a simple REST client for C++, which wraps `libcurl` for HTTP requests.
- **shadesmar** [📁](./shadesmar) [🌐](https://github.com/GerHobbelt/shadesmar) -- an IPC library that uses the system's shared memory to pass messages. Supports publish-subscribe and RPC.
- **sharedhashfile** [📁](./sharedhashfile) [🌐](https://github.com/GerHobbelt/sharedhashfile) -- share hash tables with stable key hints stored in memory mapped files between arbitrary processes.
- **shmdata** [📁](./shmdata) [🌐](https://github.com/GerHobbelt/shmdata) -- shares streams of framed data between processes (1 writer to many readers) via shared memory. It supports any kind of data stream:  it has been used with multichannel audio, video frames, 3D models, OSC messages, and various others types of data. Shmdata is very fast and allows processes to access data streams without the need for extra copies.
- **SPSCQueue** [📁](./SPSCQueue) [🌐](https://github.com/GerHobbelt/SPSCQueue) -- a single producer single consumer wait-free and lock-free fixed size queue written in C++11.
- **tcp_pubsub** [📁](./tcp_pubsub) [🌐](https://github.com/GerHobbelt/tcp_pubsub) -- a minimal publish-subscribe library that transports data via TCP. `tcp_pubsub` does not define a message format but only transports binary blobs. It does however define a protocol around that, which is kept as lightweight as possible.
- **tcpshm** [📁](./tcpshm) [🌐](https://github.com/GerHobbelt/tcpshm) -- a connection-oriented persistent message queue framework based on TCP or SHM IPC for Linux. TCPSHM provides a reliable and efficient solution based on a sequence number and acknowledge mechanism, that every sent out msg is persisted in a send queue until sender got ack that it's been consumed by the receiver, so that disconnects/crashes are tolerated and the recovery process is purely automatic.
- **telegram-bot-api** [📁](./telegram-bot-api) [🌐](https://github.com/GerHobbelt/telegram-bot-api) -- the Telegram Bot API provides an HTTP API for creating Telegram Bots.
- **telegram-td** [📁](./telegram-td) [🌐](https://github.com/GerHobbelt/td) -- TDLib (Telegram Database library) is a cross-platform library for building [Telegram](https://telegram.org) clients. It can be easily used from almost any programming language.
- **ucx** [📁](./ucx) [🌐](https://github.com/GerHobbelt/ucx) -- Unified Communication X (UCX) is an optimized production proven-communication framework for modern, high-bandwidth and low-latency networks. UCX exposes a set of abstract communication primitives that utilize the best of available hardware resources and offloads. These include RDMA (InfiniBand and RoCE), TCP, GPUs, shared memory, and network atomic operations.
- **userver** [📁](./userver) [🌐](https://github.com/GerHobbelt/userver) -- an open source asynchronous framework with a rich set of abstractions for fast and comfortable creation of C++ microservices, services and utilities. The framework solves the problem of efficient I/O interactions transparently for the developers. Operations that would typically suspend the thread of execution do not suspend it. Instead of that, the thread processes other requests and tasks and returns to the handling of the operation only when it is guaranteed to execute immediately. As a result you get straightforward source code and avoid CPU-consuming context switches from OS, efficiently utilizing the CPU with a small amount of execution threads.
- **uvw** [📁](./uvw) [🌐](https://github.com/GerHobbelt/uvw) -- `libuv` wrapper in modern C++. `uvw` started as a header-only, event based, tiny and easy to use wrapper for [`libuv`](https://github.com/libuv/libuv) written in modern C++.  Now it's finally available also as a compilable static library. The basic idea is to wrap the *C-ish* interface of `libuv` behind a graceful C++ API.
- **websocket-sharp** [📁](./websocket-sharp) [🌐](https://github.com/GerHobbelt/websocket-sharp) -- a C# implementation of the WebSocket protocol client and server.
- **WinHttpPAL** [📁](./WinHttpPAL) [🌐](https://github.com/GerHobbelt/WinHttpPAL) -- implements [WinHttp API](https://docs.microsoft.com/en-us/windows/win32/winhttp/winhttp-start-page) Platform Abstraction Layer for POSIX systems using libcurl
- ~~**ice** [🌐](https://github.com/zeroc-ice/ice) -- Comprehensive RPC Framework: helps you network your software with minimal effort.~~
  
  - **removed**; reason: has a strong focus on the *remote*, i.e. `R` in `RPC` (thus a focus on things such as encryption, authentication, firewalling, etc.), which we don't want or need: all services are supposed to run on a single machine and comms go through `localhost` *only*. When folks find they need to distribute the workload across multiple machines, then we'll be entering a new era in Qiqqa usage and then will be soon enough to (re-)investigate the usefulness of this package.


Also, we are currently more interested in *fast data serialization* then RPC *per se* as we aim for a solution that's more akin to a REST API interface style.

- **corosync** [📁](./corosync) [🌐](https://github.com/GerHobbelt/corosync) -- the Corosync Cluster Engine. The synchronization algorithm is used for every service in corosync to synchronize state of the system. The checkpoint synchronization algorithm is to synchronize checkpoints after a partition or merge of two or more partitions.
- ~~**oatpp** [🌐](https://github.com/oatpp/oatpp) -- IPC / server framework~~
  
  - **removed**; reason: see `crow`. We have picked `crow` as the preferred way forward, so any similar/competing product is out of scope unless `crow` throws a tantrum on our test bench after all, the chances of that being *very slim*.













	
----

🡸 [previous section](./0017-ipc-flatbuffer-et-al-for-protocol-design.md)  |  🡹 [up](./0016-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0019-ipc-zeromq-a-k-a-mq.md)
