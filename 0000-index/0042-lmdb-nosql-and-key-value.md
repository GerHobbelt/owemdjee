

### LMDB, NoSQL and key/value stores

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

- **comdb2-bdb** [📁](./comdb2-bdb) [🌐](https://github.com/GerHobbelt/comdb2) -- a clustered RDBMS built on Optimistic Concurrency Control techniques. It provides multiple isolation levels, including Snapshot and Serializable Isolation.
- **ctsa** [📁](./ctsa) [🌐](https://github.com/GerHobbelt/ctsa) -- a Univariate Time Series Analysis and ARIMA Modeling Package in ANSI C: CTSA is a C software package for univariate time series analysis. ARIMA and Seasonal ARIMA models have been added as of 10/30/2014. 07/24/2020 Update: SARIMAX and Auto ARIMA added. Documentation will be added in the coming days. Software is still in beta stage and older ARIMA and SARIMA functions are now superseded by SARIMAX.
- **data_tamer** [📁](./data_tamer) [🌐](https://github.com/GerHobbelt/data_tamer) -- a library to log/trace numerical variables over time and takes periodic "snapshots" of their values, to later visualize them as time-series.
- **ejdb** [📁](./ejdb) [🌐](https://github.com/GerHobbelt/ejdb) -- an embeddable JSON database engine published under MIT license, offering a single file database, online backups support, a simple but powerful query language (JQL), based on the TokyoCabinet-inspired KV store `iowow`.
- **FASTER** [📁](./FASTER) [🌐](https://github.com/GerHobbelt/FASTER) -- helps manage large application state easily, resiliently, and with high performance by offering (1) **FASTER Log**, which is a high-performance concurrent persistent recoverable log, iterator, and random reader library, and (2) **FASTER KV** as a concurrent key-value store + cache that is designed for point lookups and heavy updates. FASTER supports data larger than memory, by leveraging fast external storage (local or cloud). It also supports consistent recovery using a fast non-blocking checkpointing technique that lets applications trade-off performance for commit latency. Both FASTER KV and FASTER Log offer orders-of-magnitude higher performance than comparable solutions, on standard workloads.
- **forestdb** [📁](./forestdb) [🌐](https://github.com/GerHobbelt/forestdb) -- a key-value storage engine whos main index structure is built from [Hierarchical B+-Tree based Trie](http://db.csail.mit.edu/sigmod11contest/sigmod_2011_contest_poster_jungsang_ahn.pdf), called HB+-Trie. [ForestDB paper](https://www.computer.org/csdl/trans/tc/preprint/07110563.pdf) has been published in IEEE Transactions on Computers. Compared with traditional B+-Tree based storage engines, ForestDB shows significantly better read and write performance with less storage overhead. ForestDB has been tested on various server OS environments (Centos, Ubuntu, Mac OS x, Windows) and mobile OSs (iOS, Android).
- **gdbm** [📁](./gdbm) [🌐](https://github.com/GerHobbelt/gdbm) -- GNU dbm is a set of NoSQL database routines that use extendable hashing and works similar to the standard UNIX `dbm` routines.
- **iowow** [📁](./iowow) [🌐](https://github.com/GerHobbelt/iowow) -- a C/11 file storage utility library and persistent key/value storage engine, supporting multiple key-value databases within a single file, online database backups and [Write Ahead Logging (WAL) support](http://iowow.io/wal). Good performance comparing its main competitors: `lmdb`, `leveldb`, `kyoto cabinet`.
- **Jungle** [📁](./Jungle) [🌐](https://github.com/GerHobbelt/Jungle) -- an embedded key-value storage library, based on a combined index of [LSM-tree](https://en.wikipedia.org/wiki/Log-structured_merge-tree) and [copy-on-write (append-only) B+tree](https://www.usenix.org/legacy/events/lsf07/tech/rodeh.pdf). Please refer to our [paper](https://www.usenix.org/conference/hotstorage19/presentation/ahn). Jungle is specialized for building [replicated state machine](https://en.wikipedia.org/wiki/State_machine_replication) of consensus protocols such as [Paxos](https://en.wikipedia.org/wiki/Paxos_(computer_science)) or [Raft](https://raft.github.io/), by providing chronological ordering and lightweight persistent snapshot. It can be also used for building log store.
- **libmdbx** [📁](./libmdbx) [🌐](https://github.com/GerHobbelt/libmdbx) -- one of the fastest embeddable key-value ACID database without WAL. `libmdbx` surpasses the legendary LMDB in terms of reliability, features and performance.
- **libsiridb** [📁](./libsiridb) [🌐](https://github.com/GerHobbelt/libsiridb) -- SiriDB Connector C (libsiridb) is a library which can be used to communicate with [SiriDB](https://github.com/transceptor-technology/siridb-server) using the C program language. This library contains useful functions but does not handle the connection itself.
- **Lightning.NET** [📁](./Lightning.NET) [🌐](https://github.com/GerHobbelt/Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
- **lmdb** [📁](./lmdb) [🌐](https://github.com/GerHobbelt/lmdb) -- OpenLDAP [LMDB](http://www.lmdb.tech/doc/index.html) is an outrageously fast key/value store with semantics that make it highly interesting for many applications.  Of specific note, besides speed, is the full support for transactions and good read/write concurrency.  LMDB is also famed for its robustness **when used correctly**.
- **lmdb-safe** [📁](./lmdb-safe) [🌐](https://github.com/GerHobbelt/lmdb-safe) -- A safe modern & performant C++ wrapper of LMDB. LMDB is an outrageously fast key/value store with semantics that make it highly interesting for many applications. Of specific note, besides speed, is the full support for transactions and good read/write concurrency. LMDB is also famed for its robustness.. **when used correctly**. The design of LMDB is elegant and simple, which aids both the performance and stability. The downside of this elegant design is a nontrivial set of rules that need to be followed to not break things. In other words, LMDB delivers great things but only if you use it exactly right. This is by conscious design. The `lmdb-safe` library aims to deliver the full LMDB performance while programmatically making sure the LMDB semantics are adhered to, with very limited overhead.
- **lmdb.spreads.net** [📁](./lmdb.spreads.net) [🌐](https://github.com/GerHobbelt/Spreads.LMDB) -- Low-level zero-overhead and [the fastest](https://github.com/Spreads/Spreads.LMDB/commit/4085dde649ef9ebb64310f2627299762dd62d5ce) LMDB .NET wrapper with some additional native methods useful for [Spreads](https://github.com/Spreads/).
- **lmdb-store** [📁](./lmdb-store) [🌐](https://github.com/GerHobbelt/lmdb-store) -- an ultra-fast NodeJS interface to LMDB; probably the fastest and most efficient NodeJS key-value/database interface that exists for full storage and retrieval of structured JS data (objects, arrays, etc.) in a true persisted, scalable, [ACID compliant](https://en.wikipedia.org/wiki/ACID) database. It provides a simple interface for interacting with LMDB.
- **lmdbxx** [📁](./lmdbxx) [🌐](https://github.com/GerHobbelt/lmdbxx) -- lmdb++: a comprehensive C++11 wrapper for the LMDB embedded database library, offering both an error-checked procedural interface and an object-oriented resource interface with RAII semantics.
- **mmkv** [📁](./mmkv) [🌐](https://github.com/GerHobbelt/MMKV) -- an **efficient**, **small**, **easy-to-use** mobile key-value storage framework used in the WeChat application. It's currently available on **Android**, **iOS/macOS**, **Win32** and **POSIX**.
- **PGM-index** [📁](./PGM-index) [🌐](https://github.com/GerHobbelt/PGM-index) -- the Piecewise Geometric Model index (PGM-index) is a data structure that enables fast lookup, predecessor, range searches and updates in arrays of billions of items using orders of magnitude less space than traditional indexes while providing the same worst-case query time guarantees.
- **pmemkv** [📁](./pmemkv) [🌐](https://github.com/GerHobbelt/pmemkv) -- `pmemkv` is a local/embedded key-value datastore optimized for persistent memory. Rather than being tied to a single language or backing implementation, `pmemkv` provides different options for language bindings and storage engines.
- **pmemkv-bench** [📁](./pmemkv-bench) [🌐](https://github.com/GerHobbelt/pmemkv-bench) -- benchmark for [libpmemkv](https://github.com/pmem/pmemkv/) and its underlying libraries, based on [leveldb's db_bench](https://github.com/google/leveldb). The `pmemkv_bench` utility provides some standard read, write & remove benchmarks. It's based on the `db_bench` utility included with LevelDB and RocksDB, although the list of supported parameters is slightly different.
- **qlever** [📁](./qlever) [🌐](https://github.com/GerHobbelt/qlever) -- a SPARQL engine that can efficiently index and query very large knowledge graphs with up to 100 billion triples on a single standard PC or server. In particular, QLever is fast for queries that involve large intermediate or final results, which are notoriously hard for engines like Blazegraph or Virtuoso.
- **sdsl-lite** [📁](./sdsl-lite) [🌐](https://github.com/GerHobbelt/sdsl-lite) -- The Succinct Data Structure Library (SDSL) is a powerful and flexible C++11 library implementing succinct data structures. In total, the library contains the highlights of 40 [research publications][SDSLLIT]. Succinct data structures can represent an object (such as a bitvector or a tree) in space close to the information-theoretic lower bound of the object while supporting operations of the original object efficiently. The theoretical time complexity of an operation performed on the classical data structure and the equivalent succinct data structure are (most of the time) identical.
- **siridb-server** [📁](./siridb-server) [🌐](https://github.com/GerHobbelt/siridb-server) -- SiriDB Server is a highly-scalable, robust and super fast time series database. SiriDB uses a unique mechanism to operate without a global index and allows server resources to be added on the fly. SiriDB’s unique query language includes dynamic grouping of time series for easy analysis over large amounts of time series. SiriDB is scalable on the fly and has no downtime while updating or expanding your database. The scalable possibilities enable you to enlarge the database time after time without losing speed. SiriDB is developed to give an unprecedented performance without downtime. A SiriDB cluster distributes time series across multiple pools. Each pool supports active replicas for load balancing and redundancy. When one of the replicas is not available the database is still accessible.
- **unqlite** [📁](./unqlite) [🌐](https://github.com/GerHobbelt/unqlite) -- UnQLite is a Transactional Embedded Database Engine, an in-process software library which implements a self-contained, serverless, zero-configuration, transactional NoSQL database engine. UnQLite is a document store database similar to MongoDB, Redis, CouchDB etc. as well a standard Key/Value store similar to BerkeleyDB, LevelDB, etc.
  
  Unlike most other NoSQL databases, UnQLite does not have a separate server process. UnQLite reads and writes directly to ordinary disk files.
  A complete database with multiple collections is contained in a single disk file.
  The database file format is cross-platform; you can freely copy a database between 32-bit and 64-bit systems or between big-endian and little-endian architectures.
  
  - BSD licensed product.
  - Built with a powerful disk storage engine which support O(1) lookup.
  - Cross-platform file format.
  - Document store (JSON) database via Jx9.
  - Pluggable run-time interchangeable storage engine.
  - Serverless, NoSQL database engine.
  - Simple, Clean and easy to use API.
  - Single database file, does not use temporary files.
  - Standard Key/Value store.
  - Support cursors for linear records traversal.
  - Support for on-disk as well in-memory databases.
  - Support Terabyte sized databases.
  - Thread safe and full reentrant.
  - Transactional (ACID) database.
  - UnQLite is a Self-Contained C library without dependency.
  - Zero configuration.
















	
----

🡸 [prev](./0041-database-backend-storage.md)  |  🡹 [up](./0041-database-backend-storage.md)  |  🡺 [next](./0043-sqlite-specific-modules-related.md)
