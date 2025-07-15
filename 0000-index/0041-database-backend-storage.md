

## database "backend storage"

- **arangodb** [📁](./arangodb) [🌐](https://github.com/GerHobbelt/arangodb) -- a scalable open-source multi-model database natively supporting graph, document and search. All supported data models & access patterns can be combined in queries allowing for maximal flexibility.
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

- **BitFunnel** [📁](./BitFunnel) [🌐](https://github.com/GerHobbelt/BitFunnel) -- the BitFunnel index used by [Bing's](http://www.bing.com) super-fresh, news, and media indexes. The algorithm is described in [BitFunnel: Revisiting Signatures for Search](https://dl.acm.org/doi/pdf/10.1145/3077136.3080789).
- **csv-parser** [📁](./csv-parser) [🌐](https://github.com/GerHobbelt/csv-parser) -- Vince's CSV Parser: there's plenty of other CSV parsers in the wild, but I had a hard time finding what I wanted. Inspired by Python's `csv` module, I wanted a library with **simple, intuitive syntax**. Furthermore, I wanted support for special use cases such as calculating statistics on very large files. Thus, this library was created with these following goals in mind.
- **csvquote** [📁](./csvquote) [🌐](https://github.com/GerHobbelt/csvquote) -- smart and simple CSV processing on the command line. This program can be used at the start and end of a text processing pipeline so that regular unix command line tools can properly handle CSV data that contain commas and newlines inside quoted data fields. Without this program, embedded special characters would be incorrectly interpreted as separators when they are inside quoted data fields.
- **datamash** [📁](./datamash) [🌐](https://github.com/GerHobbelt/datamash) -- GNU Datamash is a command-line program which performs basic numeric, textual and statistical operations on input textual data files. It is designed to be portable and reliable, and aid researchers to easily automate analysis pipelines, without writing code or even short scripts.
- **data_tamer** [📁](./data_tamer) [🌐](https://github.com/GerHobbelt/data_tamer) -- a library to log/trace numerical variables over time and takes periodic "snapshots" of their values, to later visualize them as time-series.
- **duckdb** [📁](./duckdb) [🌐](https://github.com/GerHobbelt/duckdb) -- DuckDB is a high-performance analytical database system. It is designed to be fast, reliable, portable, and easy to use. DuckDB provides a rich SQL dialect, with support far beyond basic SQL. DuckDB supports arbitrary and nested correlated subqueries, window functions, collations, complex types (arrays, structs), and more.
- **Extensible-Storage-Engine** [📁](./Extensible-Storage-Engine) [🌐](https://github.com/GerHobbelt/Extensible-Storage-Engine) -- ESE is an embedded / ISAM-based database engine, that provides rudimentary table and indexed access. However the library provides many other strongly layered and thus reusable sub-facilities as well: A Synchronization / Locking library, a Data-structures / STL-like library, an OS-abstraction layer, and a Cache Manager, as well as the full-blown database engine itself.
- **fast-cpp-csv-parser** [📁](./fast-cpp-csv-parser) [🌐](https://github.com/GerHobbelt/fast-cpp-csv-parser) -- a small, easy-to-use and fast header-only library for reading comma separated value (CSV) files.
- **forestdb** [📁](./forestdb) [🌐](https://github.com/GerHobbelt/forestdb) -- a key-value storage engine whos main index structure is built from [Hierarchical B+-Tree based Trie](http://db.csail.mit.edu/sigmod11contest/sigmod_2011_contest_poster_jungsang_ahn.pdf), called HB+-Trie. [ForestDB paper](https://www.computer.org/csdl/trans/tc/preprint/07110563.pdf) has been published in IEEE Transactions on Computers. Compared with traditional B+-Tree based storage engines, ForestDB shows significantly better read and write performance with less storage overhead. ForestDB has been tested on various server OS environments (Centos, Ubuntu, Mac OS x, Windows) and mobile OSs (iOS, Android).
- **groonga** [📁](./groonga) [🌐](https://github.com/GerHobbelt/groonga) -- an open-source fulltext search engine and column store.
- **harbour-core** [📁](./harbour-core) [🌐](https://github.com/GerHobbelt/core) -- Harbour is the free software implementation of a multi-platform, multi-threading, object-oriented, scriptable programming language, backward compatible with Clipper/xBase. Harbour consists of a compiler and runtime libraries with multiple UI and database backends, its own make system and a large collection of libraries and interfaces to many popular APIs.
- **IdGenerator** [📁](./IdGenerator) [🌐](https://github.com/GerHobbelt/IdGenerator) -- a digital ID generator using the snowflake algorithm, developed in response to the performance problems that often occur. Example use is when you, as an architecture designer, want to solve the problem of unique database primary keys, especially in multi-database distributed systems. You want the primary key of the data table to use the least storage space, while the index speed and the Select, Insert, and Update queries are fast. Meanwhile there may be more than 50 application instances, and each concurrent request can reach 10W/s. You do not want to rely on the auto-increment operation of redis to obtain continuous primary key IDs, because continuous IDs pose business data security risks.
- **iODBC** [📁](./iODBC) [🌐](https://github.com/GerHobbelt/iODBC) -- the iODBC Driver Manager provides you with everything you need to develop ODBC-compliant applications under Unix without having to pay royalties to other parties. An ODBC driver is still needed to affect your connection architecture. You may build a driver with the iODBC components or obtain an ODBC driver from a commercial vendor.
- **Jungle** [📁](./Jungle) [🌐](https://github.com/GerHobbelt/Jungle) -- an embedded key-value storage library, based on a combined index of [LSM-tree](https://en.wikipedia.org/wiki/Log-structured_merge-tree) and [copy-on-write (append-only) B+tree](https://www.usenix.org/legacy/events/lsf07/tech/rodeh.pdf). Please refer to our [paper](https://www.usenix.org/conference/hotstorage19/presentation/ahn). Jungle is specialized for building [replicated state machine](https://en.wikipedia.org/wiki/State_machine_replication) of consensus protocols such as [Paxos](https://en.wikipedia.org/wiki/Paxos_(computer_science)) or [Raft](https://raft.github.io/), by providing chronological ordering and lightweight persistent snapshot. It can be also used for building log store.
- **lazycsv** [📁](./lazycsv) [🌐](https://github.com/GerHobbelt/lazycsv) -- a c++17, posix-compliant, single-header library for reading and parsing csv files. It's fast and lightweight and does not allocate any memory in the constructor or while parsing. It parses each row and cell just on demand on each iteration, that's why it's called lazy.
- **libcsv2** [📁](./libcsv2) [🌐](https://github.com/GerHobbelt/csv2) -- CSV file format reader/writer library.
- **lib_nas_lockfile** [📁](./lib_nas_lockfile) [🌐](https://github.com/GerHobbelt/lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
- **libsiridb** [📁](./libsiridb) [🌐](https://github.com/GerHobbelt/libsiridb) -- SiriDB Connector C (libsiridb) is a library which can be used to communicate with [SiriDB](https://github.com/transceptor-technology/siridb-server) using the C program language. This library contains useful functions but does not handle the connection itself.
- **libsl3** [📁](./libsl3) [🌐](https://github.com/GerHobbelt/libsl3) -- a C++ interface for SQLite 3.x. libsl3 is designed to enable comfortable and efficient communication with a SQLite database based on its natural language, which is SQL.
- **libsql** [📁](./libsql) [🌐](https://github.com/GerHobbelt/libsql) -- libSQL is an open source, open contribution fork of SQLite. We aim to evolve it to suit many more use cases than SQLite was originally designed for, and plan to use third-party OSS code wherever it makes sense.
  
  SQLite has solidified its place in modern technology stacks, embedded in nearly any computing device you can think of. Its open source nature and public domain availability make it a popular choice for modification to meet specific use cases.
  But despite having its code available, SQLite famously doesn't accept external contributors, so community improvements cannot be widely enjoyed.
  There have been other forks in the past, but they all focus on a specific technical difference. We aim to be a community where people can contribute from many different angles and motivations.
  We want to see a world where everyone can benefit from all of the great ideas and hard work that the SQLite community contributes back to the codebase.

- **libsqlfs** [📁](./libsqlfs) [🌐](https://github.com/GerHobbelt/libsqlfs) -- a POSIX style file system on top of an SQLite database.  It allows applications to have access to a full read/write file system in a single file, complete with its own file hierarchy and name space.  This is useful for applications which needs structured storage, such as embedding documents within documents, or management of configuration data or preferences.
- **ligra-graph** [📁](./ligra-graph) [🌐](https://github.com/GerHobbelt/ligra) -- LIGRA: a Lightweight Graph Processing Framework for Shared Memory; works on both uncompressed and compressed graphs and hypergraphs.
- **mcmd** [📁](./mcmd) [🌐](https://github.com/GerHobbelt/mcmd) -- MCMD (M-Command): a set of commands for handling large scale CSV data. **MCMD** (called as M-Command) is a set of commands that are developed for the purpose of high-speed processing of large-scale structured tabular data in CSV format. It is possible to efficiently process large scale data with hundred millions row of records on a standard PC.
- **mydumper** [📁](./mydumper) [🌐](https://github.com/GerHobbelt/mydumper) -- a MySQL Logical Backup Tool. It has 2 tools:
  
  * `mydumper` which is responsible to export a consistent backup of MySQL databases
  * `myloader` reads the backup from mydumper, connects the to destination database and imports the backup.

- **mysql-connector-cpp** [📁](./mysql-connector-cpp) [🌐](https://github.com/GerHobbelt/mysql-connector-cpp) -- MySQL Connector/C++ is a release of MySQL Connector/C++, [the C++ interface](https://dev.mysql.com/doc/dev/connector-cpp/8.0/) for communicating with MySQL servers.
- **nanodbc** [📁](./nanodbc) [🌐](https://github.com/GerHobbelt/nanodbc) -- a small C++ wrapper for the native C ODBC API.
- **ormpp** [📁](./ormpp) [🌐](https://github.com/GerHobbelt/ormpp) -- modern C++ ORM, C++17, support mysql, postgresql, sqlite.
- **otl** [📁](./otl) [🌐](https://github.com/GerHobbelt/otl) -- Oracle Template Library (STL-like wrapper for SQL DB queries; supports many databases besides Oracle)
- **percona-server** [📁](./percona-server) [🌐](https://github.com/GerHobbelt/percona-server) -- Percona Server for MySQL is a free, fully compatible, enhanced, and open source drop-in replacement for any MySQL database. It provides superior performance, scalability, and instrumentation.
- **qlever** [📁](./qlever) [🌐](https://github.com/GerHobbelt/qlever) -- a SPARQL engine that can efficiently index and query very large knowledge graphs with up to 100 billion triples on a single standard PC or server. In particular, QLever is fast for queries that involve large intermediate or final results, which are notoriously hard for engines like Blazegraph or Virtuoso.
- **rapidcsv** [📁](./rapidcsv) [🌐](https://github.com/GerHobbelt/rapidcsv) -- an easy-to-use C++ CSV parser library. It supports C++11 (and later), is header-only and comes with a basic test suite. The library was featured in the book [C++20 for Programmers](https://deitel.com/c-plus-plus-20-for-programmers/).
- **siridb-server** [📁](./siridb-server) [🌐](https://github.com/GerHobbelt/siridb-server) -- SiriDB Server is a highly-scalable, robust and super fast time series database. SiriDB uses a unique mechanism to operate without a global index and allows server resources to be added on the fly. SiriDB’s unique query language includes dynamic grouping of time series for easy analysis over large amounts of time series. SiriDB is scalable on the fly and has no downtime while updating or expanding your database. The scalable possibilities enable you to enlarge the database time after time without losing speed. SiriDB is developed to give an unprecedented performance without downtime. A SiriDB cluster distributes time series across multiple pools. Each pool supports active replicas for load balancing and redundancy. When one of the replicas is not available the database is still accessible.
- **sqawk** [📁](./sqawk) [🌐](https://github.com/GerHobbelt/sqawk) -- apply SQL on CSV files in the shell: `sqawk` imports CSV files into an on-the-fly SQLite database, and runs a user-supplied query on the data.
- **sqlcipher** [📁](./sqlcipher) [🌐](https://github.com/GerHobbelt/sqlcipher) -- SQLCipher is a standalone fork of the [SQLite](https://www.sqlite.org/) database library that adds 256 bit AES encryption of database files and other security features.
- **sqlean** [📁](./sqlean) [🌐](https://github.com/GerHobbelt/sqlean) -- The ultimate set of SQLite extensions: SQLite has few functions compared to other database management systems. SQLite authors see this as a feature rather than a problem, because SQLite has an extension mechanism in place. There are a lot of SQLite extensions out there, but they are incomplete, inconsistent and scattered across the internet. sqlean brings them together, neatly packaged into domain modules, documented, tested, and built for Linux, Windows and macOS.
- **sqleet** [📁](./sqleet) [🌐](https://github.com/GerHobbelt/sqleet) -- an encryption extension for [SQLite3](https://www.sqlite.org/). The encryption is transparent (*on-the-fly*) and based on modern cryptographic algorithms designed for high performance in software and robust side-channel resistance.
- **sqlite** [📁](./sqlite) [🌐](https://github.com/GerHobbelt/sqlite) -- the complete [SQLite database engine](https://sqlite.org/).
- **sqlite3-compression-encryption-vfs** [📁](./sqlite3-compression-encryption-vfs) [🌐](https://github.com/GerHobbelt/sqlite3-compression-encryption-vfs) -- CEVFS: Compression & Encryption VFS for SQLite 3 is a SQLite 3 Virtual File System for compressing and encrypting data at the pager level. Once set up, you use SQLite as you normally would and the compression and encryption is transparently handled during database read/write operations via the SQLite pager.
- **sqlite3pp** [📁](./sqlite3pp) [🌐](https://github.com/GerHobbelt/sqlite3pp) -- a minimal ORM wrapper for SQLite et al.
- **sqlite-amalgamation** [📁](./sqlite-amalgamation) [🌐](https://github.com/GerHobbelt/sqlite-amalgamation) -- the [SQLite](http://www.sqlite.org/download.html) amalgamation, which is the recommended method of building SQLite into larger projects.
- **SQLiteCpp** [📁](./SQLiteCpp) [🌐](https://github.com/GerHobbelt/SQLiteCpp) -- a smart and easy to use C++ SQLite3 wrapper. SQLiteC++ offers an encapsulation around the native C APIs of SQLite, with a few intuitive and well documented C++ classes.
- **sqlite-fts5-snowball** [📁](./sqlite-fts5-snowball) [🌐](https://github.com/GerHobbelt/fts5-snowball) -- a simple extension for use with FTS5 within SQLite. It allows FTS5 to use Martin Porter's Snowball stemmers (libstemmer), which are available in several languages. Check http://snowballstem.org/ for more information about them.
- **sqlite_fts_tokenizer_chinese_simple** [📁](./sqlite_fts_tokenizer_chinese_simple) [🌐](https://github.com/GerHobbelt/simple) -- an extension of [sqlite3 fts5](https://www.sqlite.org/fts5.html) that supports Chinese and Pinyin. It fully provides a [solution to the multi-phonetic word problem of full-text retrieval on WeChat mobile terminal](https://cloud.tencent.com/developer/article/1198371): solution 4 in the article, very simple and efficient support for Chinese and Pinyin searches.
  
  On this basis we also support more accurate phrase matching through [cppjieba](https://github.com/yanyiwu/cppjieba). See the introduction article at https://www.wangfenjin.com/posts/simple-jieba-tokenizer/

- **SQLiteHistograms** [📁](./SQLiteHistograms) [🌐](https://github.com/GerHobbelt/SQLiteHistograms) -- an SQLite extension library for creating histogram tables, tables of ratio between histograms and interpolation tables of scatter point tables.
- **sqliteodbc** [📁](./sqliteodbc) [🌐](https://github.com/GerHobbelt/sqliteodbc) -- SQLite ODBC Driver for the wonderful SQLite 2.8.* and SQLite 3.* Database Engine/Library.
- **sqlite-parquet-vtable** [📁](./sqlite-parquet-vtable) [🌐](https://github.com/GerHobbelt/sqlite-parquet-vtable) -- an SQLite [virtual table](https://sqlite.org/vtab.html) extension to expose Parquet files as SQL tables. You may also find [csv2parquet](https://github.com/cldellow/csv2parquet/) useful. This [blog post](https://cldellow.com/2018/06/22/sqlite-parquet-vtable.html) provides some context on why you might use this.
- **sqlite-stats** [📁](./sqlite-stats) [🌐](https://github.com/GerHobbelt/sqlite-stats) -- provides common statistical functions for SQLite.
- **sqlite_wrapper** [📁](./sqlite_wrapper) [🌐](https://github.com/GerHobbelt/sqlite_wrapper) -- an easy-to-use, lightweight and concurrency-friendly SQLite wrapper written in C++17.
- **sqlite_zstd_vfs** [📁](./sqlite_zstd_vfs) [🌐](https://github.com/GerHobbelt/sqlite_zstd_vfs) -- SQLite VFS extension providing streaming storage compression using Zstandard (Zstd), transparently compressing pages of the main database file as they're written out and later decompressing them as they're read in. It runs page de/compression on background threads and occasionally generates dictionaries to improve subsequent compression.
- **sqlpp11** [📁](./sqlpp11) [🌐](https://github.com/GerHobbelt/sqlpp11) -- a type safe embedded domain specific language for SQL queries and results in C++.
- **ssp** [📁](./ssp) [🌐](https://github.com/GerHobbelt/ssp) -- a header only CSV parser which is fast and versatile with modern C++ API. Requires compiler with C++17 support. Can also be used to efficiently convert strings to specific types. Conversion for floating point values invoked using [fast-float](https://github.com/fastfloat/fast_float).
- **unixODBC** [📁](./unixODBC) [🌐](https://github.com/GerHobbelt/unixODBC) -- an Open Source ODBC sub-system and an ODBC SDK for Linux, Mac OSX, and UNIX.
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

- **upscaledb** [📁](./upscaledb) [🌐](https://github.com/GerHobbelt/hamsterdb) -- a.k.a. hamsterdb: a thread-safe key/value database engine. It supports a B+Tree index structure, uses memory mapped I/O (if available), fast Cursors and variable length keys and can create In-Memory Databases.
- **zsv** [📁](./zsv) [🌐](https://github.com/GerHobbelt/zsv) -- the world's fastest (SIMD) CSV parser, with an extensible CLI for SQL querying, format conversion and more.















	
----

🡸 [previous section](./0040-distance-metrics-image-quality-metrics-image.md)  |  🡹 [up](./0006-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0042-lmdb-nosql-and-key-value.md)
