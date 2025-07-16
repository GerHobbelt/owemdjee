











### SQLite specific modules & related materials

- **duckdb** [📁](./duckdb) [🌐](https://github.com/GerHobbelt/duckdb) -- DuckDB is a high-performance analytical database system. It is designed to be fast, reliable, portable, and easy to use. DuckDB provides a rich SQL dialect, with support far beyond basic SQL. DuckDB supports arbitrary and nested correlated subqueries, window functions, collations, complex types (arrays, structs), and more.
- **libdist** [📁](./libdist) [🌐](https://github.com/GerHobbelt/distlib) -- string distance related functions (Damerau-Levenshtein, Jaro-Winkler, longest common substring & subsequence) implemented as SQLite run-time loadable extension, with UTF-8 support.
- **lib_nas_lockfile** [📁](./lib_nas_lockfile) [🌐](https://github.com/GerHobbelt/lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
- **libsl3** [📁](./libsl3) [🌐](https://github.com/GerHobbelt/libsl3) -- a C++ interface for SQLite 3.x. libsl3 is designed to enable comfortable and efficient communication with a SQLite database based on its natural language, which is SQL.
- **libsql** [📁](./libsql) [🌐](https://github.com/GerHobbelt/libsql) -- libSQL is an open source, open contribution fork of SQLite. We aim to evolve it to suit many more use cases than SQLite was originally designed for, and plan to use third-party OSS code wherever it makes sense.
  
  SQLite has solidified its place in modern technology stacks, embedded in nearly any computing device you can think of. Its open source nature and public domain availability make it a popular choice for modification to meet specific use cases.
  But despite having its code available, SQLite famously doesn't accept external contributors, so community improvements cannot be widely enjoyed.
  There have been other forks in the past, but they all focus on a specific technical difference. We aim to be a community where people can contribute from many different angles and motivations.
  We want to see a world where everyone can benefit from all of the great ideas and hard work that the SQLite community contributes back to the codebase.

- **libsqlfs** [📁](./libsqlfs) [🌐](https://github.com/GerHobbelt/libsqlfs) -- a POSIX style file system on top of an SQLite database.  It allows applications to have access to a full read/write file system in a single file, complete with its own file hierarchy and name space.  This is useful for applications which needs structured storage, such as embedding documents within documents, or management of configuration data or preferences.
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





	
----

🡸 [previous section](./0042-lmdb-nosql-and-key-value.md)  |  🡹 [up](./0041-database-backend-storage.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0044-metadata.md)
