

## Data Storage / Caching / IPC: loss-less data compression

- **7zip** [📁](./7zip) [🌐](https://github.com/GerHobbelt/7zip) -- 7-Zip: [7-zip.org](https://7-zip.org)
- **7-Zip-zstd** [📁](./7-Zip-zstd) [🌐](https://github.com/GerHobbelt/7-Zip-zstd) -- 7-Zip ZS with support of additional Codecs: Zstandard, Brotli, LZ4, LZ5, Lizard, Fast LZMA2
- **bit7z** [📁](./bit7z) [🌐](https://github.com/GerHobbelt/bit7z) -- a library offering a clean and simple interface to the 7-zip shared libraries.
- **brotli** [📁](./brotli) [🌐](https://github.com/GerHobbelt/brotli) -- compression
- **bxzstr** [📁](./bxzstr) [🌐](https://github.com/GerHobbelt/bxzstr) -- a header-only library for using standard c++ iostreams to access streams compressed with ZLib, libBZ2, libLZMA, or libZstd (.gz, .bz2, .xz, and .zst files). For decompression, the format is automatically detected. For compression, the only parameter exposed is the compression algorithm.
- **bzip2** [📁](./bzip2) [🌐](https://github.com/GerHobbelt/bzip2) -- bzip2 with minor modifications to original sources.
- **bzip3** [📁](./bzip3) [🌐](https://github.com/GerHobbelt/bzip3) -- a better, faster and stronger spiritual successor to BZip2. Features higher compression ratios and better performance thanks to a order-0 context mixing entropy coder, a fast Burrows-Wheeler transform code making use of suffix arrays and a RLE with Lempel Ziv+Prediction pass based on LZ77-style string matching and PPM-style context modeling. Like its ancestor, **BZip3 excels at compressing text or code**.
- **c-blosc2** [📁](./c-blosc2) [🌐](https://github.com/GerHobbelt/c-blosc2) -- a high performance compressor optimized for binary data (i.e. floating point numbers, integers and booleans), designed to transmit data to the processor cache faster than the traditional, non-compressed, direct memory fetch approach via a `memcpy()` OS call.
- **density** [📁](./density) [🌐](https://github.com/GerHobbelt/density) -- a superfast compression library. It is focused on high-speed compression, at the best ratio possible. **All three** of DENSITY's algorithms are currently at the **pareto frontier** of compression speed vs ratio (cf. [here](https://github.com/inikep/lzbench/blob/master/lzbench18_sorted.md) for an independent benchmark).
- **densityxx** [📁](./densityxx) [🌐](https://github.com/GerHobbelt/densityxx) -- the c++ version of `density`, which is a super fast compress library.
- **easylzma** [📁](./easylzma) [🌐](https://github.com/GerHobbelt/easylzma) -- a C library and command line tools for LZMA compression and decompression.  It uses a Igor Pavlov's reference implementation and SDK written in C.
- **fast-lzma2** [📁](./fast-lzma2) [🌐](https://github.com/GerHobbelt/fast-lzma2) -- the __Fast LZMA2 Library__ is a lossless high-ratio data compression library based on Igor Pavlov's LZMA2 codec from 7-zip. Binaries of 7-Zip forks which use the algorithm are available in the [7-Zip-FL2 project](https://github.com/conor42/7-Zip-FL2/releases/), the [7-Zip-zstd project](https://github.com/mcmilk/7-Zip-zstd/releases/), and the active fork of [p7zip](https://github.com/szcnick/p7zip/releases/). The library is also embedded in a fork of XZ Utils, named [FXZ Utils](https://github.com/conor42/fxz).
- **fast_pfor** [📁](./fast_pfor) [🌐](https://github.com/GerHobbelt/FastPFor) -- a research library with integer compression schemes. It is broadly applicable to the compression of arrays of 32-bit integers where most integers are small. The library seeks to exploit SIMD instructions (SSE) whenever possible.
- **fsst** [📁](./fsst) [🌐](https://github.com/GerHobbelt/fsst) -- Fast Static Symbol Table (FSST): fast text compression that allows random access. See also the PVLDB paper https://github.com/cwida/fsst/raw/master/fsstcompression.pdf. FSST is a compression scheme focused on string/text data: it can compress strings from distributions with many different values (i.e. where dictionary compression will not work well). It allows *random-access* to compressed data: it is not block-based, so individual strings can be decompressed without touching the surrounding data in a compressed block. When compared to e.g. LZ4 (which is block-based), FSST further achieves similar decompression speed and compression speed, and better compression ratio. FSST encodes strings using a symbol table -- but it works on pieces of the string, as it maps "symbols" (1-8 byte sequences) onto "codes" (single-bytes). FSST can also represent a byte as an exception (255 followed by the original byte). Hence, compression transforms a sequence of bytes into a (supposedly shorter) sequence of codes or escaped bytes. These shorter byte-sequences could be seen as strings again and fit in whatever your program is that manipulates strings. An optional 0-terminated mode (like, C-strings) is also supported.
- **libbsc** [📁](./libbsc) [🌐](https://github.com/GerHobbelt/libbsc) -- a library for lossless, block-sorting data compression. `bsc` is a high performance file compressor based on lossless, block-sorting data compression algorithms.
- **libCSD** [📁](./libCSD) [🌐](https://github.com/GerHobbelt/libCSD) -- a C++ library providing some different techniques for managing string dictionaries in compressed space. These approaches are inspired on the paper: "Compressed String Dictionaries", Nieves R. Brisaboa, Rodrigo Cánovas, Francisco Claude, Miguel A. Martínez-Prieto, and Gonzalo Navarro, 10th Symposium on Experimental Algorithms (SEA'2011), p.136-147, 2011.
- **libdeflate** [📁](./libdeflate) [🌐](https://github.com/GerHobbelt/libdeflate) -- heavily optimized library for DEFLATE/zlib/gzip compression and decompression.
- **libsais** [📁](./libsais) [🌐](https://github.com/GerHobbelt/libsais) -- a library for fast linear time suffix array, longest common prefix array and Burrows-Wheeler transform construction based on induced sorting algorithm described in the following papers: 
  
  * Ge Nong, Sen Zhang, Wai Hong Chan *Two Efficient Algorithms for Linear Suffix Array Construction*, 2009
  * Juha Karkkainen, Giovanni Manzini, Simon J. Puglisi *Permuted Longest-Common-Prefix Array*, 2009
  * Nataliya Timoshevskaya, Wu-chun Feng *SAIS-OPT: On the characterization and optimization of the SA-IS algorithm for suffix array construction*, 2014
  * Jing Yi Xie, Ge Nong, Bin Lao, Wentao Xu *Scalable Suffix Sorting on a Multicore Machine*, 2020
  
  The libsais is inspired by [libdivsufsort](https://github.com/y-256/libdivsufsort), [sais](https://sites.google.com/site/yuta256/sais) libraries by Yuta Mori and [msufsort](https://github.com/michaelmaniscalco/msufsort) by Michael Maniscalco.

- **libzip** [📁](./libzip) [🌐](https://github.com/GerHobbelt/libzip) -- a C library for reading, creating, and modifying zip and zip64 archives.
- **libzopfli** [📁](./libzopfli) [🌐](https://github.com/GerHobbelt/zopfli) -- Zopfli Compression Algorithm is a compression library programmed in C to perform very good, but slow, deflate or zlib compression.
- **lizard** [📁](./lizard) [🌐](https://github.com/GerHobbelt/lizard) -- efficient compression with very fast decompression. Lizard (formerly LZ5) is a lossless compression algorithm which contains 4 compression methods:
  
  - fastLZ4 : compression levels -10...-19 are designed to give better decompression speed than [LZ4] i.e. over 2000 MB/s
  - fastLZ4 + Huffman : compression levels -30...-39 add Huffman coding to fastLZ4
  - LIZv1 : compression levels -20...-29 are designed to give better ratio than [LZ4] keeping 75% decompression speed
  - LIZv1 + Huffman : compression levels -40...-49 give the best ratio (comparable to [zlib] and low levels of [zstd]/[brotli]) at decompression speed of 1000 MB/s

- **lz4** [📁](./lz4) [🌐](https://github.com/GerHobbelt/lz4) -- LZ4 is lossless compression algorithm, providing compression speed > 500 MB/s per core, scalable with multi-cores CPU. It features an extremely fast decoder, with speed in multiple GB/s per core, typically reaching RAM speed limits on multi-core systems.
- **lzbench** [📁](./lzbench) [🌐](https://github.com/GerHobbelt/lzbench) -- an in-memory benchmark of open-source LZ77/LZSS/LZMA compressors. It joins all compressors into a single exe.
- **lzham_codec** [📁](./lzham_codec) [🌐](https://github.com/GerHobbelt/lzham_codec) -- LZHAM is a lossless data compression codec, with a compression ratio similar to LZMA but with 1.5x-8x faster decompression speed.
- **lzma** [📁](./lzma) [🌐](https://github.com/GerHobbelt/lzma) -- LZMA Utils is an attempt to provide LZMA compression to POSIX-like systems. The idea is to have a gzip-like command line tool and a zlib-like library, which would make it easy to adapt the new compression technology to existing applications.
- **p7zip** [📁](./p7zip) [🌐](https://github.com/GerHobbelt/p7zip) -- p7zip-zstd = 7zip with extensions, including major modern codecs such as Brotli, Fast LZMA2, LZ4, LZ5, Lizard and Zstd.
- **shoco** [📁](./shoco) [🌐](https://github.com/GerHobbelt/shoco) -- a fast compressor for short strings
- **snappy** [📁](./snappy) [🌐](https://github.com/GerHobbelt/snappy) -- an up-to-date fork of google/snappy, a fast compression/decompression library. It does not aim for maximum compression, or compatibility with any other compression library; instead, it aims for very high speeds and reasonable compression.
  
  - **second-choice**; reason: see `lzo2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading. See also [How do I decide between LZ4 and Snappy compression?](https://stackoverflow.com/questions/67537111/how-do-i-decide-between-lz4-and-snappy-compression)

- **squash** [📁](./squash) [🌐](https://github.com/GerHobbelt/squash) -- an abstraction library which provides a single API to access many compression libraries, allowing applications a great deal of flexibility when choosing a compression algorithm, or allowing a choice between several of them.
- **Turbo-Range-Coder** [📁](./Turbo-Range-Coder) [🌐](https://github.com/GerHobbelt/Turbo-Range-Coder) -- TurboRC: Turbo Range Coder + rANS Asymmetric Numeral Systems is a very fast (branchless) Range Coder / Arithmetic Coder.
- **xz** [📁](./xz) [🌐](https://github.com/GerHobbelt/xz) -- XZ Utils provide a general-purpose data-compression library plus command-line tools. The native file format is the .xz format, but also the legacy .lzma format is supported. The .xz format supports multiple compression algorithms, which are called "filters" in the context of XZ Utils. The primary filter is currently LZMA2. With typical files, XZ Utils create about 30 % smaller files than gzip.
- **zfp-compressed-arrays** [📁](./zfp-compressed-arrays) [🌐](https://github.com/GerHobbelt/zfp) -- zfp is a compressed format for representing multidimensional floating-point and integer arrays. zfp provides compressed-array classes that support high throughput read and write random access to individual array elements. zfp also supports serial and parallel (OpenMP and CUDA) compression of whole arrays, e.g., for applications that read and write large data sets to and from disk.
- **zstd** [📁](./zstd) [🌐](https://github.com/GerHobbelt/zstd) -- Zstandard, a.k.a. `zstd`, is a fast lossless compression algorithm, targeting real-time compression scenarios at zlib-level and better compression ratios.
- ~~**lzo** [🌐](https://github.com/nemequ/lzo)~~
  
  - **removed**; reason: gone as part of the first round of compression libraries' cleanup: we intend to support lz4 for fast work, plus zstd and *maybe* brotli for higher compression ratios, while we won't bother with anything else: the rest can be dealt with through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines when we need to read (or write) them. See also: [7zip-Zstd](https://github.com/mcmilk/7-Zip-zstd), which is what I use for accessing almost all compressed material anywhere.

- ~~**lzsse** [🌐](https://github.com/ConorStokes/LZSSE)~~
  
  - **removed**; reason: see `lzo` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...

- ~~**pithy** [🌐](https://github.com/johnezang/pithy)~~
  
  - **removed**; reason: see `lzo` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...

- ~~**xz-utils** [🌐](https://github.com/xz-mirror/xz)~~
  
  - **removed**; reason: see `lzo2` above. When we want this, we can go through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines.
















	
----

🡸 [prev](./0018-hdf5-file.md)  |  🡹 [up](./0006-libraries-we-re-looking-at-for-this-intent.md)  |  🡺 [next](./0020-file-directory-tree.md)
