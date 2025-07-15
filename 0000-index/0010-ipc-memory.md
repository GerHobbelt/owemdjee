

### IPC: memory mapping

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

- **fmem** [📁](./fmem) [🌐](https://github.com/GerHobbelt/fmem) -- a cross-platform library for opening memory-backed libc streams (a la UNIX `fmemopen()`).
- **fmemopen_windows** [📁](./fmemopen_windows) [🌐](https://github.com/GerHobbelt/fmemopen_windows) -- provides **FILE\*** handler based on memory backend for fread,fwrite etc. just like `fmemopen` on linux, but now on MS Windows.
- **libmio** [📁](./libmio) [🌐](https://github.com/GerHobbelt/mio) -- An easy to use header-only cross-platform C++11 memory mapping library. `mio` has been created with the goal to be easily includable (i.e. no dependencies) in any C++ project that needs memory mapped file IO without the need to pull in Boost.
- **libvrb** [📁](./libvrb) [🌐](https://github.com/GerHobbelt/vrb) -- implements a ring buffer, also known as a character FIFO or circular buffer, with a special property that any data present in the buffer, as well as any empty space, are always seen as a single contiguous extent by the calling program.  This is implemented with virtual memory mapping by creating a mirror image of the buffer contents at the memory location in the virtual address space immediately after the main buffer location.  This allows the mirror image to always be seen without doing any copying of data.
- **portable-memory-mapping** [📁](./portable-memory-mapping) [🌐](https://github.com/GerHobbelt/portable-memory-mapping) -- portable Memory Mapping C++ Class (Windows/Linux)
- **shadesmar** [📁](./shadesmar) [🌐](https://github.com/GerHobbelt/shadesmar) -- an IPC library that uses the system's shared memory to pass messages. Supports publish-subscribe and RPC.
- **sharedhashfile** [📁](./sharedhashfile) [🌐](https://github.com/GerHobbelt/sharedhashfile) -- share hash tables with stable key hints stored in memory mapped files between arbitrary processes.
- **shmdata** [📁](./shmdata) [🌐](https://github.com/GerHobbelt/shmdata) -- shares streams of framed data between processes (1 writer to many readers) via shared memory. It supports any kind of data stream:  it has been used with multichannel audio, video frames, 3D models, OSC messages, and various others types of data. Shmdata is very fast and allows processes to access data streams without the need for extra copies.
- **stxxl** [📁](./stxxl) [🌐](https://github.com/GerHobbelt/stxxl) -- STXXL is an implementation of the C++ standard template library STL for external memory (out-of-core) computations, i. e. STXXL implements containers and algorithms that can process huge volumes of data that only fit on disks.
- **tcpshm** [📁](./tcpshm) [🌐](https://github.com/GerHobbelt/tcpshm) -- a connection-oriented persistent message queue framework based on TCP or SHM IPC for Linux. TCPSHM provides a reliable and efficient solution based on a sequence number and acknowledge mechanism, that every sent out msg is persisted in a send queue until sender got ack that it's been consumed by the receiver, so that disconnects/crashes are tolerated and the recovery process is purely automatic.
- **thrill** [📁](./thrill) [🌐](https://github.com/GerHobbelt/thrill) -- an *EXPERIMENTAL* C++ framework for algorithmic distributed Big Data batch computations on a cluster of machines. More information at [http://project-thrill.org](http://project-thrill.org).















	
----

🡸 [previous section](./0009-ipc-zeromq-a-k-a.md)  |  🡹 [up](./0008-ipc-websockets-etc-all-communication.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0011-ipc-json-for-protocol.md)
