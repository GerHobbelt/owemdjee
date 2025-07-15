

## Intermediate Data Storage / Caching / Hierarchical Data Stores (binary hOCR; document text revisions; ...)

- **CacheLib** [📁](./CacheLib) [🌐](https://github.com/GerHobbelt/CacheLib) -- provides an in-process high performance caching mechanism, thread-safe API to build high throughput, low overhead caching services, with built-in ability to leverage DRAM and SSD caching transparently.
- **cachelot** [📁](./cachelot) [🌐](https://github.com/GerHobbelt/cachelot) -- is an LRU cache that works at the speed of light. The library works with a fixed pre-allocated memory. You tell the memory size and LRU cache is ready. Small metadata, up to 98% memory utilization.
- **caches** [📁](./caches) [🌐](https://github.com/GerHobbelt/caches) -- implements a simple thread-safe cache with several page replacement policies: LRU (Least Recently Used), FIFO (First-In/First-Out), LFU (Least Frequently Used)
- **c-blosc2** [📁](./c-blosc2) [🌐](https://github.com/GerHobbelt/c-blosc2) -- a high performance compressor optimized for binary data (i.e. floating point numbers, integers and booleans), designed to transmit data to the processor cache faster than the traditional, non-compressed, direct memory fetch approach via a `memcpy()` OS call.
- **localmemcache** [📁](./localmemcache) [🌐](https://github.com/GerHobbelt/localmemcache) -- a key-value database and library that provides an interface similar to `memcached` but for accessing local data instead of remote data.  It's based on mmap()'ed shared memory for maximum speed. It supports persistence, also making it a fast alternative to GDBM and Berkeley DB.
- **lru_cache** [📁](./lru_cache) [🌐](https://github.com/GerHobbelt/lru_cache) -- LRU cache is a fast, header-only, generic C++ 17 [LRU cache][1] library, with customizable backend.
- **lrucache11** [📁](./lrucache11) [🌐](https://github.com/GerHobbelt/lrucache11) -- A header only C++11 LRU Cache template class that allows you to define key, value and optionally the `Map` type. uses a double linked list and a `std::unordered_map` style container to provide fast insert, delete and update No dependencies other than the C++ standard library.
- **pelikan** [📁](./pelikan) [🌐](https://github.com/GerHobbelt/pelikan) -- Pelikan is Twitter's unified cache backend.
- **stlcache** [📁](./stlcache) [🌐](https://github.com/GerHobbelt/stlcache) -- STL::Cache is an in-memory cache for C++ applications. STL::Cache is just a simple wrapper over standard map, that implements some cache algorithms, thus allowing you to limit the storage size and automatically remove unused items from it. It is intended to be used for keeping any key/value data, especially when data's size are too big, to just put it into the map and keep the whole thing. With STL::Cache you could put enormous (really unlimited) amount of data into it, but it will store only some small part of your data. So re-usable data will be kept near your code and not so popular data will not spend expensive memory. STL::Cache uses configurable policies, for decisions, whether data are good, to be kept in cache or they should be thrown away. It is shipped with 8 policies and you are free to implement your own.















	
----

🡸 [previous section](./0015-hash-like-filters-fast-hashing-for-hash-tables-et.md)  |  🡹 [up](./0006-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0017-ram-disk-based-large-queues-and-stores-b-tree-lsm-tree.md)
