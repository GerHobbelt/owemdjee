

### RAM-/disk-based large queues and stores: B+tree, LSM-tree, ...

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

- **cpp-btree** [📁](./cpp-btree) [🌐](https://github.com/GerHobbelt/cpp-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- **ejdb** [📁](./ejdb) [🌐](https://github.com/GerHobbelt/ejdb) -- an embeddable JSON database engine published under MIT license, offering a single file database, online backups support, a simple but powerful query language (JQL), based on the TokyoCabinet-inspired KV store `iowow`.
- **FASTER** [📁](./FASTER) [🌐](https://github.com/GerHobbelt/FASTER) -- helps manage large application state easily, resiliently, and with high performance by offering (1) **FASTER Log**, which is a high-performance concurrent persistent recoverable log, iterator, and random reader library, and (2) **FASTER KV** as a concurrent key-value store + cache that is designed for point lookups and heavy updates. FASTER supports data larger than memory, by leveraging fast external storage (local or cloud). It also supports consistent recovery using a fast non-blocking checkpointing technique that lets applications trade-off performance for commit latency. Both FASTER KV and FASTER Log offer orders-of-magnitude higher performance than comparable solutions, on standard workloads.
- **iowow** [📁](./iowow) [🌐](https://github.com/GerHobbelt/iowow) -- a C/11 file storage utility library and persistent key/value storage engine, supporting multiple key-value databases within a single file, online database backups and [Write Ahead Logging (WAL) support](http://iowow.io/wal). Good performance comparing its main competitors: `lmdb`, `leveldb`, `kyoto cabinet`.
- **libmdbx** [📁](./libmdbx) [🌐](https://github.com/GerHobbelt/libmdbx) -- one of the fastest embeddable key-value ACID database without WAL. `libmdbx` surpasses the legendary LMDB in terms of reliability, features and performance.
- **libpmemobj-cpp** [📁](./libpmemobj-cpp) [🌐](https://github.com/GerHobbelt/libpmemobj-cpp) -- a C++ binding for **libpmemobj** (a library which is a part of [PMDK collection](https://github.com/pmem/pmdk)).
- **libshmcache** [📁](./libshmcache) [🌐](https://github.com/GerHobbelt/libshmcache) -- a local share memory cache for multi processes. it is a high performance library because read mechanism is lockless. libshmcache is 100+ times faster than a remote interface such as redis.
- **Lightning.NET** [📁](./Lightning.NET) [🌐](https://github.com/GerHobbelt/Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
- **ligra-graph** [📁](./ligra-graph) [🌐](https://github.com/GerHobbelt/ligra) -- LIGRA: a Lightweight Graph Processing Framework for Shared Memory; works on both uncompressed and compressed graphs and hypergraphs.
- **lmdb** [📁](./lmdb) [🌐](https://github.com/GerHobbelt/lmdb) -- OpenLDAP [LMDB](http://www.lmdb.tech/doc/index.html) is an outrageously fast key/value store with semantics that make it highly interesting for many applications.  Of specific note, besides speed, is the full support for transactions and good read/write concurrency.  LMDB is also famed for its robustness **when used correctly**.
- **lmdb-safe** [📁](./lmdb-safe) [🌐](https://github.com/GerHobbelt/lmdb-safe) -- A safe modern & performant C++ wrapper of LMDB. LMDB is an outrageously fast key/value store with semantics that make it highly interesting for many applications. Of specific note, besides speed, is the full support for transactions and good read/write concurrency. LMDB is also famed for its robustness.. **when used correctly**. The design of LMDB is elegant and simple, which aids both the performance and stability. The downside of this elegant design is a nontrivial set of rules that need to be followed to not break things. In other words, LMDB delivers great things but only if you use it exactly right. This is by conscious design. The `lmdb-safe` library aims to deliver the full LMDB performance while programmatically making sure the LMDB semantics are adhered to, with very limited overhead.
- **lmdb.spreads.net** [📁](./lmdb.spreads.net) [🌐](https://github.com/GerHobbelt/Spreads.LMDB) -- Low-level zero-overhead and [the fastest](https://github.com/Spreads/Spreads.LMDB/commit/4085dde649ef9ebb64310f2627299762dd62d5ce) LMDB .NET wrapper with some additional native methods useful for [Spreads](https://github.com/Spreads/).
- **lmdb-store** [📁](./lmdb-store) [🌐](https://github.com/GerHobbelt/lmdb-store) -- an ultra-fast NodeJS interface to LMDB; probably the fastest and most efficient NodeJS key-value/database interface that exists for full storage and retrieval of structured JS data (objects, arrays, etc.) in a true persisted, scalable, [ACID compliant](https://en.wikipedia.org/wiki/ACID) database. It provides a simple interface for interacting with LMDB.
- **lmdbxx** [📁](./lmdbxx) [🌐](https://github.com/GerHobbelt/lmdbxx) -- lmdb++: a comprehensive C++11 wrapper for the LMDB embedded database library, offering both an error-checked procedural interface and an object-oriented resource interface with RAII semantics.
- **palmtree** [📁](./palmtree) [🌐](https://github.com/GerHobbelt/palmtree) -- concurrent lock free B+Tree
- **parallel-hashmap** [📁](./parallel-hashmap) [🌐](https://github.com/GerHobbelt/parallel-hashmap) -- a set of hash map implementations, as well as a btree alternative to std::map and std::set
- **pmdk** [📁](./pmdk) [🌐](https://github.com/GerHobbelt/pmdk) -- the **Persistent Memory Development Kit (PMDK)** is a collection of libraries and tools for System Administrators and Application Developers to simplify managing and accessing persistent memory devices.
- **pmdk-tests** [📁](./pmdk-tests) [🌐](https://github.com/GerHobbelt/pmdk-tests) -- tests for [Persistent Memory Development Kit](https://github.com/pmem/pmdk)
- **pmemkv** [📁](./pmemkv) [🌐](https://github.com/GerHobbelt/pmemkv) -- `pmemkv` is a local/embedded key-value datastore optimized for persistent memory. Rather than being tied to a single language or backing implementation, `pmemkv` provides different options for language bindings and storage engines.
- **pmemkv-bench** [📁](./pmemkv-bench) [🌐](https://github.com/GerHobbelt/pmemkv-bench) -- benchmark for [libpmemkv](https://github.com/pmem/pmemkv/) and its underlying libraries, based on [leveldb's db_bench](https://github.com/google/leveldb). The `pmemkv_bench` utility provides some standard read, write & remove benchmarks. It's based on the `db_bench` utility included with LevelDB and RocksDB, although the list of supported parameters is slightly different.
- **riegeli** [📁](./riegeli) [🌐](https://github.com/GerHobbelt/riegeli) -- *Riegeli/records* is a file format for storing a sequence of string records, typically serialized protocol buffers. It supports dense compression, fast decoding, seeking, detection and optional skipping of data corruption, filtering of proto message fields for even faster decoding, and parallel encoding.
- **tlx-btree** [📁](./tlx-btree) [🌐](https://github.com/GerHobbelt/tlx) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- **vmem** [📁](./vmem) [🌐](https://github.com/GerHobbelt/vmem) -- **libvmem** and **libvmmalloc** are a couple of libraries for using persistent memory for malloc-like volatile uses.  They have historically been a part of [PMDK](https://pmem.io/pmdk) despite being solely for volatile uses. You may want consider using [memkind](https://github.com/memkind/memkind) instead in code that benefits from extra features like NUMA awareness.
- **vmemcache** [📁](./vmemcache) [🌐](https://github.com/GerHobbelt/vmemcache) -- **libvmemcache** is an embeddable and lightweight in-memory buffered LRU caching solution. It's designed to fully take advantage of large capacity memory, such as Persistent Memory with DAX, through memory mapping in an efficient and scalable way.















	
----

🡸 [previous section](./0016-intermediate-data-storage-caching-hierarchical-data.md)  |  🡹 [up](./0016-intermediate-data-storage-caching-hierarchical-data.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0018-hdf5-file.md)
