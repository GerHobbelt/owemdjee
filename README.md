# owemdjee

Data Science &amp; Image Processing amalgam library in C/C++.

This place is a gathering spot & integration workplace for the C & C++ libraries we choose to use.  Think "Façade Pattern' and you're getting warm. :wink:
The heavy data lifting will be done in the referenced libraries, while this lib will provide some glue and common ground for them to work in/with.


## Reason for this repo

`git submodules` hasn't been the most, ah, "user-friendly" methods to track and manage a set of libraries that you wish to track at *source level*.

A few problems have been repeatedly observed over our lifetime with `git`:

- when it so happens that the importance & interest in a submoduled library is perhaps waning and you want to migrate to another, you can of course invoke `git` to ditch the old sow and bring in the shiny new one, but that stuff gets quite finicky when you are pedalling back & forth through your commit tree when, e.g. bughunting or maintenance work on a release branch which isn't up to snuff with the fashion kids yet. 

  Yup, that's been much less of a problem since about 2018, but old scars need more than a pat on the arm to heal, if you get my drift.
  
- folks haven't always been the happy campers they were supposed to be when they're facing a set of submodules and want to feel safe and sure in their "knowledge" that each library X is at commit Y, when the top of the module tree is itself at commit Z, for we are busy producing a production release, perhaps? That's a wee bit stressful and there have been enough "flukes" with git to make that a not-so-ironclad-as-we-would-like position. 

  Over time, [I've created several bash shell scripts to help with that buzzin' feelin' of *absolute certainty*](https://github.com/GerHobbelt/developer-utility-commands). Useful perhaps, but the cuteness of those wears off pretty darn quickly when many nodes in the submodule tree start cluttering their git repo with those.

  
### And?

This repo is made to ensure we have a single point of reference for all the data munching stuff, at least.

We don't need to `git submodule add` all those data processing libs in our applications this way, as this is a single submodule to bother that project with. The scripts and other material in here will provide the means to ensure your build and test tools can quickly and easily ensure that everyone in here is at the commit spot they're supposed to be.

And when we want to add another lib about data/image processing, we do that in here, so the application-level git repo sees a very stable singular submodule all the time: this repo/lib, not the stuff that will change over time as external libs gain and loose momentum over time. (We're talking multiyear timespans here!)


### Critique?

It's not the most brilliant solution to our problems, as this, of course, becomes a single point of failure that way, but experience in the past with similar "solutions" has shown that it's maybe not always fun, but at least we keep track of the management crap in one place and that was worth it, every time.

And why not do away with `git submodule` entirely and use packages instead? Because this stuff is important enough that *other, quite painful experience* has shown us that (binary & source) packages are a wonder and a hassle too: I'ld rather have my code tracked and tagged at source level **all the way** because that has reduced several bug situations from man-*weeks* to man-*hours*: like Gentoo, compile it all, one compiler only.  Doesn't matter if the bug is in your own code or elsewhere, there are enough moments like that where one is helped enormously by the ability to step through *and possibly tweak a bit of code here or there temporarily to help the debugging process* that I, at least, prefer full source code.

And that's what this repo is here to provide: the source code gathered and ready for use on our machines.



### Why is this repo a *solution*? And does it scale?

The worst bit first: it scales like rotten eggs. The problem there is two-fold: first, there's (relatively) few people who want to track progress at the bleeding edge, so tooling is consequently limited in power and availability, compared to conservative approaches (count the number of *package managers* lately?).

Meanwhile, I'm in a spot where I *want* to ride the bleeding edge, at least most of the time, and I happen to *like* it that way: my world is much more *R&D* than *product maintenance*, so having a means to track, relatively easy, the latest developments in subjects and materiel of interest is a boon to me. Sure, I'll moan and rant about it once in a while, but if I wanted to really get rid of the need to be flexible and *adapt to changes*, sometimes often, I'ld have gone with the conservative stability of *package managers* and *LTS releases* already. Which I've done for other parts of my environment, but do not intend to do for the part which is largely covered by this repo: source libraries which I intend to use or am using already in research tools I'm developing for others and myself.

For that purpose, this repo is a *solution*, though -- granted -- a *sub-optimal one* in that it doesn't scale very well. I don't think there's any automated process available to make this **significantly faster and more scalable** anyway: the fact that I'm riding the bleeding edge and wish to be able to backpedal at will when the latest change of direction or state of affairs of a component is off the rails (from my perspective at least), requires me to be flexible and adaptable to the full gamut of change. There are alternative approaches, also within the `git` world, but they haven't shown real appeal vs. *old skool* `git submodules` -- which is cranky at times and a pain in the neck when you want to ditch something but still need it in another dev branch, *moan moan moan*, but anyway... -- so here we are.

> **Side note**: submodules which have been picked up for experimentation and inspection **but have been deleted from this A list later on** are ~~struck through~~ in the overview below: the rationale there is that we can thus still observe **why** we struck it off the list, *plus* never make the mistake of re-introducing it after a long time, forgetting that we once had a look already, *without* running into the struck-through entry and having to re-evaluate the reason at least, before we re-introduce an item.
>  


---


# Intent

## Inter-process communications (IPC)

Lowest possible **run-time** cost, a.k.a. "run-time overhead": the aim is to have IPC which does not noticably impact UX (User Experience of the application: responsiveness / UI) on reeasonably powered machines. (Users are *not* expected to have the latest or fastest hardware.)

As *at least* large images will be transfered (PDF page renders) we need to have a binary-able protocol.


## Programming Languages used: *intent and purposes*

We expect to use these languages in processes which require this type of IPC:

- JavaScript (**UI**, mostly. Think [*electron*](https://www.electronjs.org/), *web browser*, [*Chromely*](https://chromely.net/)<sup>[also](https://github.com/chromelyapps/Chromely)</sup>, [*WebView2*](https://docs.microsoft.com/en-us/microsoft-edge/webview2/)<sup>[plus](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)</sup>, that sort of thing)
- C / C++ (**backend No.1**)
  + PDF renderer ([mupdf](https://mupdf.com/))
  + metadata & annotations extractor ([mupdf](https://mupdf.com/) et al)
  + *very* probably also the database interface (SQLite)
  + \[page] image processing (leptonica, openCV, ImageMagick?, what-ever turns out to be useful and reasonable to integrate (particularly between PDF page renderer and OCR engine to help us provide a *user-tunable* PDF text+metadata extractor
  + OCR (tesseract)
  + "A.I."-assisted tooling to help process and *clean* PDFs: cover pages, abstract/summary extraction for meta-research, etc. (think ngrams, xdelta, SVM, tensors, author identification, document categorization, document similarity / \[*near*-]duplicate / revision detection, tagging, ...)
  + document identifier key generator a.k.a. **content hasher** for creating **unique** key for each document, which can be used as database record index, etc.
    * old: Qiqqa SHA1B
    * new: BLAKE3+Base36
- C# (**"business logic" / "middleware"**: the glue logic)
- Java (SOLR / Lucene: our choice for the "full text search database" ~ **backend No.2**)

Here we *intend* to use the regular SOLR APIs, which does not require specialized binary IPC.

We **may** **probably** choose to use a web-centric UI approach where images are *compressed* and *cached* in the *backend*, while being provided as \<picture> or \<img> tag references (URLs) in the HTML generated by the backend. *However*, we keep our options open ATM as furtheer testing is expected to hit a few obstacles there (smart caching required as we will be processing lots of documents in "background **bulk processes**" alongside the browsing and other more *direct* user activity) so a *websocket* or similar push technology may be employed: there we may benefit from dedicated IPC for large binary and text data transfers.


## Scripting the System: Languages Considered for Scripting by Users

Python has been considered. Given its loud presence in the AI communities, we still may integrate it one day. However, personally I'm not a big fan of the language and don't use it unless it's *prudent to do*, e.g. when extending or tweaking previous works produced by others. 
Also, it turns out, it's not exactly *easy* to integrate (CPython) and I don't see a need for it beyond this one project / product: Qiqqa.

I've looked at Lua for a scripting language suitable for users (used quite a lot in the gaming industries and elsewhere); initial trials to get something going did not uncover major obstacles, but the question "_how do I **debug** Lua scripts?_" does not produce any viable project / product that goes beyond the *old skool `printf`-style debugging method*. Not a prime candidate therefor, as we expect that users will pick this up, when they like it, and grow the user scripts to unanticipated size and complexity: I've seen this happen multiple times in my career. Lua does not provide a scalable growth path from my perspective due to the lack of a *decent, customizable, debugger*.

Third candidate is JavaScript. While Artifex/mupdf comes with `mujs`, which is a simple engine it suffers from *two* drawbacks: it's ES5 and also does not provide a debugger mechanism beyond old skool `print`. Nice for nerds, but this is user-facing and thus not a viable option.

The other JavaScript engines considered are of varying size, performance and complexity. *Some* of them offer ways to integrate them with the \[F12] Chrome browser Developer Tools debugger, which would be *very nice to have available*. The road traveled there, along the various JavaScript engines is this:

- mujs: ES5, no visual debugger. **Out.**
- jerryscript: ES2017/2020 (good!), there's noises about Chrome Developer Tools on the Net for this one. Small, designed for embedded devices. I like that.
- [Facebook's Hermes](https://github.com/facebook/hermes), [Samsung's Escargot](https://github.com/Samsung/escargot) and [XS/moddable](https://www.moddable.com/)<sup>[also](https://github.com/Moddable-OpenSource/moddable) [here](https://github.com/Moddable-OpenSource/moddable-xst)</sup>, which led me to [a webpage where various embeddable JS engines are compared size- and *performance*-wise](https://bellard.org/quickjs/bench.html).
- [QuickJS](https://github.com/bellard/quickjs): ES2020, DevTools or [VS Code debugging](https://github.com/koush/vscode-quickjs-debug) seems to be available. Also comes with an interesting runtime: [txiki](https://github.com/saghul/txiki.js), which we still need to take a good look at.
- [Google's V8](https://v8.dev/)<sup>[here](https://github.com/v8/v8) [too](https://chromium.googlesource.com/v8/v8/+/84450a2239672109bcf537d6740b8babda521567)</sup>, as available in NodeJS, is deemed too complex for integration: when we go there, we could spend the same amount of effort on CPython integration -- though there again is the ever-present "how to debug this visually?!" question...)

- [ScriptX](./ScriptX/) -- Tencent's [ScriptX](https://github.com/Tencent/ScriptX) is a script engine abstraction layer. A variety of script engines are encapsulated on the bottom and a unified API is exposed on the top, so that the upper-layer caller can completely isolate the underlying engine implementation (back-end).

  ScriptX not only isolates several JavaScript engines (e.g. V8 and QuickJS), but can even isolate different scripting languages, so that the upper layer can seamlessly switch between scripting engine and scripting language without changing the code.

**UPDATE 2021/June**: jerryscript, duktape, XS/moddable, escargot: these have been dropped as we picked QuickJS. After some initial hassle with that codebase, we picked a different branch to test, which was cleaner and compiled out of the box (CMake > MSVC), which is always a good omen for a codebase when you have cross-platform portability in mind.



---

# Libraries we're looking at for this *intent*:

- **IPC: flatbuffer et al for protocol design**:

    - [bebop](./bebop)
    - ~~[FastBinaryEncoding](https://github.com/chronoxor/FastBinaryEncoding)~~
      + **removed**; reason: for binary format record serialization we will be using `bebop` exclusively. All other communications will be JSON/JSON5/XML based.
    - ~~[flatbuffers](https://github.com/google/flatbuffers)~~
      + **removed**; reason: see `protobuf`: same smell rising. Faster at run time, but still a bit hairy to my tastes while `bebop` et al are on to something *potentially nice*.
    - ~~[flatcc](https://github.com/dvidelabs/flatcc)~~
      + **removed**; reason: see `flatbuffers`. When we don't dig `flatbuffers`, then `flatcc` is automatically pretty useless to us. Let's rephrase that professionally: "`flatcc` has moved out of scope for our project."
    - [cereal](./cereal) -- C++11 serialization library
    - ZeroMQ a.k.a. ØMQ:
        + [libzmq](./libzmq) -- ZeroMQ core engine in C++, implements [ZMTP/3.1](https://zguide.zeromq.org/).
        + [cppzmq](./cppzmq) -- header-only C++ binding for libzmq.
        + [libCZMQ](../libCZMQ) -- High-level C binding for ØMQ. (http://czmq.zeromq.org/)
    - ~~[libsmile](https://github.com/pierre/libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format~~
      + **removed**; reason: for binary format record serialization we will be using `bebop` exclusively. All other communications will be JSON/JSON5/XML based.
    - ~~[protobuf](https://github.com/protocolbuffers/protobuf)~~
      + **removed**; reason: relatively slow run-time and (in my opinion) rather ugly & convoluted approach at build time. Has too much of a Java/CorporateProgramming smell, which has not lessened over the years, unfortunately.
    - ~~[SWIG](https://swig.readthedocs.io/en/latest/Manual/SWIG.html) (*not included; more suitable for RPC than what we have in mind, which is purely data messages enchange*)~~
	- [velocypack](../velocypack): a fast and compact format for serialization and storage.  These days, JSON (JavaScript Object Notation, see ECMA-404) is used in many cases where data has to be exchanged. Lots of protocols between different services use it, databases store JSON (document stores naturally, but others increasingly as well). It is popular, because it is simple, human-readable, and yet surprisingly versatile, despite its limitations. At the same time there is a plethora of alternatives ranging from XML over Universal Binary JSON, MongoDB's BSON, MessagePack, BJSON (binary JSON), Apache Thrift till Google's protocol buffers and ArangoDB's shaped JSON. When looking into this, we were surprised to find that none of these formats manages to combine compactness, platform independence, fast access to sub-objects and rapid conversion from and to JSON.

- **IPC: websockets, etc.: all communication means**

    - [libwebsocketpp](./libwebsocketpp)
    - [libwebsockets](./libwebsockets)
    - [websocket-sharp](./websocket-sharp)
    - [OpenSSL](./openssl) -- also used by cURL et al, incidentally.
    - [crow](./crow) -- IPC / server framework 
     
      Interface looks nicer than `oatpp`...
    - ~~[oatpp](https://github.com/oatpp/oatpp) -- IPC / server framework~~
      + **removed**; reason: see `crow`. We have picked `crow` as the preferred way forward, so any similar/competing product is out of scope unless `crow` throws a tantrum on our test bench after all, the chances of that being *very slim*.
    - ~~[ice](https://github.com/zeroc-ice/ice) -- Comprehensive RPC Framework: helps you network your software with minimal effort.~~
      + **removed**; reason: has a strong focus on the *remote*, i.e. `R` in `RPC` (thus a focus on things such as encryption, authentication, firewalling, etc.), which we don't want or need: all services are supposed to run on a single machine and comms go through `localhost` *only*. When folks find they need to distribute the workload across multiple machines, then we'll be entering a new era in Qiqqa usage and then will be soon enough to (re-)investigate the usefulness of this package.
      
        Also, we are currently more interested in *fast data serialization* then RPC *per se* as we aim for a solution that's more akin to a REST API interface style.

    - [WinHttpPAL](./WinHttpPAL) -- implements [WinHttp API](https://docs.microsoft.com/en-us/windows/win32/winhttp/winhttp-start-page) Platform Abstraction Layer for POSIX systems using libcurl
    - ZeroMQ a.k.a. ØMQ:
        + [libzmq](./libzmq) -- ZeroMQ core engine in C++, implements [ZMTP/3.1](https://zguide.zeromq.org/).
        + [cppzmq](./cppzmq) -- header-only C++ binding for libzmq.
        + [libCZMQ](../libCZMQ) -- High-level C binding for ØMQ. (http://czmq.zeromq.org/)

- **IPC: JSON for protocol design**:

    - [json](./json)
    - [json-jansson](./json-jansson)
    - [rapidJSON](./rapidJSON)
    - [yyjson](./yyjson)
    - [libsmile](./libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format

- ~~**IPC: YAML, TOML, etc. for protocol design**~~:

    **Not considered**: reason: when we want the IPC protocol to be "human readable" in any form/approximation, we've decided to stick with JSON or XML (if we cannot help it -- I particularly dislike the verbosity and tag redundancy (open+close) in XML and consider it a lousy design choice for *any* purpose).

    The more human readable formats (YAML, TOML, ...) are intended for human to machine communications, e.g. for feeding configurations into applications, and **SHOULD NOT** be used for IPC anywhere. (Though I must say I'm on the fence where it comes using YAML as an alternative IPC format where it replaces JSON; another contender there are the JSON5/JSON6 formats.)

- **content hashing** (cryptographic strength i.e. *"guaranteed"* collision-free)
    
    The bit about **_"guaranteed"_ collision-free** is to be read as: hash algorithms in this section must come with *strong statistical guarantees* that any chance at a **hash collision** is negligible, even for *extremely large* collections. In practice this means: use *cryptographic* hash algorithms with a *strength* of 128 bits or more. (Qiqqa used a b0rked version SHA1 thus far, which is considered too weak as we already sample PDFs which cause a hash collision for the *official* SHA1 algo (and thus also collide in our b0rked SHA1 variant): while those can still be argued to be fringe case, I don't want to be bothered with this at all and thus choose to err on the side of 'better than SHA1B' here. Meanwhile, any library in here *may* contain weaker cryptographic hashes alongside: we won't be using those for **content hashing**.
  
    - [BLAKE3](./BLAKE3) -- cryptographic hash
    - [cryptopp](./cryptopp) -- crypto library
    - [OpenSSL](./openssl) -- its crypto library part, more specifically.

- **hash-like filters & fast hashing for hash tables** et al (64 bits and less, mostly)

    These hashes are for other purposes, e.g. fast lookup in dictionaries, fast approximate hit testing and set reduction through fast filtering (think *bloom filter*). These *may* be **machine specific** (and some of them *are*): these are **never supposed to be used for encoding in storage or other means which crosses machine boundaries**: if you want to use them for a database index, that is fine *as long as* you don't expect that database index to be readable by any other machine than the one which produced and uses these hash numbers.
  
    > As you can see from the list below, I went on a shopping spree, having fun with all the latest, including some *possibly insane* stuff that's only really useful for particular edge cases -- which we *hope to avoid ourselves, for a while at least*. Anyway, I'ld say we've got the motherlode here. Simple fun for those days when your brain-flag is at half-mast. Enjoy.
  
    + [sparsehash](./sparsehash) -- fast (non-cryptographic) hash algorithms
    + [xxHash](./xxHash) -- fast (non-cryptographic) hash algorithm
    + [circlehash](../circlehash) -- a family of non-cryptographic hash functions that pass every test in SMHasher.
    + [smhasher](../smhasher) -- benchmark and collection of fast hash functions for symbol tables or hash tables.
    + [BBHash](./BBHash)
    + [BCF-cuckoo-index](./BCF-cuckoo-index)
    + [caffe](./caffe)
    + [catboost](./catboost)
    + [cmph-hasher](./cmph-hasher)
    + [cuckoo-index](./cuckoo-index)
    + [cuckoofilter](./cuckoofilter)
    + [DCF-cuckoo-index](./DCF-cuckoo-index)
    + [emphf-hash](./emphf-hash)
    + [gperf-hash](./gperf-hash)
    + [LDCF-hash](./LDCF-hash)
    + [libbloom](./libbloom)
    + [morton_filter](./morton_filter)
    + [phf-hash](./phf-hash)

- **intermediate data storage / caching / hierarchical data stores** (binary hOCR; document text revisions; ...) 

    - [c-blosc2](./c-blosc2) -- a high performance compressor optimized for binary data (i.e. floating point numbers, integers and booleans), designed to transmit data to the processor cache faster than the traditional, non-compressed, direct memory fetch approach via a `memcpy()` OS call.
    - [CacheLib](./CacheLib) -- provides an in-process high performance caching mechanism, thread-safe API to build high throughput, low overhead caching services, with built-in ability to leverage DRAM and SSD caching transparently.
    - ~~HDF5 file format~~
        + ~~[h5cpp-HDF5](./h5cpp-HDF5)~~
          + **removed**; reason: see the `HDF5` entry below.
        + ~~[HDF5](./HDF5)~~
          + **removed**; reason: HDF5 is a nice concept but considered *overkill* right now; where we need disk stores, we'll be using SQLite or LMDB-like key-value stores instead. Such stores are not meant to be interchangeable with other software in their raw shape and we'll provide public access APIs instead, where applicable.
        + ~~[HighFive-HDF5](./HighFive-HDF5)~~
          + **removed**; reason: see the `HDF5` entry above.
    - RAM-/disk-based large queues and stores: B+tree, LSM-tree, ...
        + [cpp-btree](../cpp-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
        + [tlx-btree](./tlx-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
        + [Lightning.NET](./Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
        + [libmdbx](./libmdbx)
        + [ligra-graph](./ligra-graph)
        + [lmdb-safe](./lmdb-safe)
        + [lmdb-store](./lmdb-store)
        + [lmdb.spreads.net](./lmdb.spreads.net)
        + [lmdb](./lmdb)
        + [lmdbxx](./lmdbxx) -- LMDB C++ wrapper
        + [palmtree](./palmtree) -- concurrent lock free B+Tree
        + [parallel-hashmap](./parallel-hashmap) -- a set of hash map implementations, as well as a btree alternative to std::map and std::set
	
- **data storage / caching / IPC: loss-less data compression**

    - [brotli](../brotli) -- compression
    - ~~[bzip2](https://github.com/nemequ/bzip2)~~
      + **removed**; reason: see `fast-lzma2` below. When we want this, we can go through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines.
    - [c-blosc2](./c-blosc2) -- a high performance compressor optimized for binary data (i.e. floating point numbers, integers and booleans), designed to transmit data to the processor cache faster than the traditional, non-compressed, direct memory fetch approach via a `memcpy()` OS call.
    - ~~[fast-lzma2](https://github.com/conor42/fast-lzma2)~~
      + **removed**; reason: gone as part of the first round of compression libraries' cleanup: we intend to support lz4 for fast work, plus zstd and *maybe* brotli for higher compression ratios, while we won't bother with anything else: the rest can be dealt with through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines when we need to read (or write) them. See also: [7zip-Zstd](https://github.com/mcmilk/7-Zip-zstd), which is what I use for accessing almost all compressed material anywhere.
    - [libzip](./libzip) -- a library for reading, creating, and modifying zip archives.
    - ~~[lizard](https://github.com/inikep/lizard) -- [Lizard](https://github.com/inikep/lizard) (formerly LZ5) is a lossless compression algorithm designed to give better decompression speed than LZ4 i.e. over 2000 MB/s and best ratio (comparable to zlib and low levels of zstd/brotli) at decompression speed of 1000 MB/s~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...
    - [lz4](./lz4)
    - ~~[lzo](https://github.com/nemequ/lzo)~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...
    - ~~[lzsse](https://github.com/ConorStokes/LZSSE)~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...
    - ~~[pithy](https://github.com/johnezang/pithy)~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...
    - [shoco](./shoco) -- a fast compressor for short strings
    - ~~[snappy](./snappy) -- [Snappy](https://github.com/google/snappy) is a compression/decompression library. It does not aim for maximum compression, or compatibility with any other compression library; instead, it aims for very high speeds and reasonable compression.~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading. See also [How do I decide between LZ4 and Snappy compression?](https://stackoverflow.com/questions/67537111/how-do-i-decide-between-lz4-and-snappy-compression)
    - ~~[squash](https://github.com/quixdb/squash)~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD).
    - ~~[xz-utils](https://github.com/xz-mirror/xz)~~
      + **removed**; reason: see `fast-lzma2` above. When we want this, we can go through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines.
    - [zstd](./zstd)
    - see also [lzbench](https://github.com/inikep/lzbench)

- **file / directory tree synchronization** (local and remote)

    - [lib_nas_lockfile](./lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
    
    - [librsync](../librsync) -- a library for calculating and applying network deltas. librsync encapsulates the core algorithms of the rsync protocol, which help with efficient calculation of the differences between two files. The rsync algorithm is different from most differencing algorithms because it does not require the presence of the two files to calculate the delta.  Instead, it requires a set of checksums of each block of one file, which together form a signature for that file.  Blocks at any position in the other file which have the same checksum are likely to be identical, and whatever remains is the difference. This algorithm transfers the differences between two files without needing both files on the same system.

    - [zsync2](../zsync2) -- the advanced file download/sync tool zsync. zsync is a well known tool for downloading and updating local files from HTTP servers using the well known algorithms rsync used for diffing binary files. Therefore, it becomes possible to synchronize modifications by exchanging the changed blocks locally using `Range:` requests. The system is based on meta files called `.zsync` files. They contain hash sums for every block of data. The file is generated from and stored along with the actual file it refers to. Due to how system works, nothing but a "dumb" HTTP server is required to make use of zsync2. This makes it easy to integrate zsync2 into existing systems.

    - [csync2](../csync2) -- a cluster synchronization tool. It can be used to keep files on multiple hosts in a cluster in sync. Csync2 can handle complex setups with much more than just 2 hosts, handle file deletions and can detect conflicts.

- **OCR: hOCR output format, other output formats? (dedicated binary?)**

    - [hocr-fileformat](./hocr-fileformat)
    - [hocr-spec](./hocr-spec)
    - [hocr-tools](./hocr-tools)

- **pattern recognition: "A.I." for cover pages, image/page *segmentation*, including abstract & summary demarcation, "figure" and "table" detection & extraction from documents, ...**

    - [dlib](./dlib) -- machine learning algorithms
        - [lapack](./lapack) -- [CBLAS](http://www.netlib.org/blas/) + [LAPACK](http://www.netlib.org/lapack/index.html) optimized linear algebra libs
    - [clBLAS](./clBLAS)
    - [libsvm](./libsvm)
    - [math-atlas](./math-atlas)
    - [MITIE-nlp](./MITIE-nlp) -- provides state-of-the-art information extraction tools. Includes tools for performing [named entity extraction](http://blog.dlib.net/2014/04/mitie-completely-free-and-state-of-art.html) and [binary relation detection](http://blog.dlib.net/2014/07/mitie-v02-released-now-includes-python.html) as well as tools for training custom extractors and relation detectors.  MITIE is built on top of [dlib](http://dlib.net), a high-performance machine-learning library, MITIE makes use of several state-of-the-art techniques including the use of distributional word embeddings and Structural Support Vector Machines.
    - [mlpack](./mlpack)
    - [mipp](./mipp) -- MyIntrinsics++ (MIPP): a portable wrapper for vector intrinsic functions (SIMD) written in C++11. It works for SSE, AVX, AVX-512 and ARM NEON (32-bit and 64-bit) instructions. MIPP wrapper supports simple/double precision floating-point numbers and also signed integer arithmetic (64-bit, 32-bit, 16-bit and 8-bit). With the MIPP wrapper you do not need to write a specific intrinsic code anymore. Just use provided functions and the wrapper will automatically generate the right intrisic calls for your specific architecture.
	- [multiverso](../multiverso): a parameter server based framework for training machine learning models on big data with numbers of machines. It is currently a standard C++ library and provides a series of friendly programming interfaces. Now machine learning researchers and practitioners do not need to worry about the system routine issues such as distributed model storage and operation, inter-process and inter-thread communication, multi-threading management, and so on. Instead, they are able to focus on the core machine learning logics: data, model, and training.
    - [libbf](../libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
    - [ncnn](./ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
    - [pytorch](./pytorch) -- PyTorch library in C++
    - [thunderSVM](./thunderSVM)
    - [xsimd](./xsimd) -- xtensor core library
    - [xtensor-blas](./xtensor-blas)
    - [xtensor-io](./xtensor-io)
    - [xtensor](./xtensor)
    - [xtl](./xtl) -- xtensor core library
	
	- **similarity search**:
		- [annoy](../annoy): Annoy (Approximate Nearest Neighbors Oh Yeah) is a C++ library with Python bindings to search for points in space that are close to a given query point. It also creates large read-only file-based data structures that are mmapped into memory so that many processes may share the same data. Annoy is almost as fast as the fastest libraries, but there is actually another feature that really sets Annoy apart: it has the ability to use static files as indexes. In particular, this means you can share index across processes. Annoy also decouples creating indexes from loading them, so you can pass around indexes as files and map them into memory quickly. Another nice thing of Annoy is that it tries to minimize memory footprint so the indexes are quite small. Why is this useful? If you want to find nearest neighbors and you have many CPU's, you only need to build the index once. You can also pass around and distribute static files to use in production environment: any process will be able to load (`mmap`) the index into memory and will be able to do lookups immediately. We use it at Spotify for music recommendations. After running matrix factorization algorithms, every user/item can be represented as a vector in f-dimensional space. This library helps us search for similar users/items. We have many millions of tracks in a high-dimensional space, so memory usage is a prime concern.
		- [CTCWordBeamSearch](../CTCWordBeamSearch): Connectionist Temporal Classification (CTC) decoder with dictionary and Language Model (LM).
		- [faiss](../faiss): a library for efficient similarity search and clustering of dense vectors. It contains algorithms that search in sets of vectors of any size, up to ones that possibly do not fit in RAM. It also contains supporting code for evaluation and parameter tuning. Faiss is written in C++ with complete wrappers for Python/numpy. Some of the most useful algorithms are implemented on the GPU. It is developed primarily at Facebook AI Research.
		- [hnswlib](../hnswlib): fast approximate nearest neighbor search. Header-only C++ HNSW implementation with python bindings.
		- [kgraph](../kgraph): a library for k-nearest neighbor (k-NN) graph construction and online k-NN search using a k-NN Graph as index. KGraph implements heuristic algorithms that are extremely generic and fast. KGraph works on abstract objects. The only assumption it makes is that a similarity score can be computed on any pair of objects, with a user-provided function.
		- [libngt-ann](../libngt-ann): Yahoo's Neighborhood Graph and Tree for Indexing High-dimensional Data. NGT provides commands and a library for performing high-speed approximate nearest neighbor searches against a large volume of data (several million to several 10 million items of data) in high dimensional vector data space (several ten to several thousand dimensions).
		- [libsptag](../libsptag): a library for fast approximate nearest neighbor search.  SPTAG (Space Partition Tree And Graph) is a library for large scale vector approximate nearest neighbor search scenario released by [Microsoft Research (MSR)](https://www.msra.cn/) and [Microsoft Bing](http://bing.com). 
		- [nanoflann](../nanoflann): a C++11 header-only library for building KD-Trees of datasets with different topologies: R^2, R^3 (point clouds), SO(2) and SO(3) (2D and 3D rotation groups). No support for approximate NN is provided. This library is a fork of the `flann` library by Marius Muja and David G. Lowe, and born as a child project of `MRPT`.
		- [nmslib](../nmslib): Non-Metric Space Library (NMSLIB) is an efficient cross-platform similarity search library and a toolkit for evaluation of similarity search methods. The core-library does not have any third-party dependencies. It has been gaining popularity recently. In particular, it has become a part of Amazon Elasticsearch Service. The goal of the project is to create an effective and comprehensive toolkit for searching in generic and non-metric spaces. Even though the library contains a variety of metric-space access methods, our main focus is on generic and approximate search methods, in particular, on methods for non-metric spaces. NMSLIB is possibly the first library with a principled support for non-metric space searching.
		- [xgboost](../xgboost): an optimized distributed gradient boosting library designed to be highly efficient, flexible and portable. It implements machine learning algorithms under the Gradient Boosting framework. XGBoost provides a parallel tree boosting (also known as GBDT, GBM) that solve many data science problems in a fast and accurate way. The same code runs on major distributed environment (Kubernetes, Hadoop, SGE, MPI, Dask) and can solve problems beyond billions of examples.

    - **text tokenization**, i.e. breaking text into words when you _receive a textstream without spaces_. Also useful for Asian languages, which don't do spaces, e.g. Chinese.
        + [sentencepiece](./sentencepiece) -- text tokenization
        + [sentence-tokenizer](./sentence-tokenizer) -- text tokenization
        + [you-token-to-me](./you-token-to-me) -- text tokenization
        + [libtextcat](./libtextcat) -- text language detection
        + [ucto](./ucto) -- text tokenization
            * [uctodata](./uctodata) -- data for `ucto` library
            * [libfolia](./libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
        + [fastBPE](./fastBPE) -- text tokenization / ngrams
        + [fastText](./fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification. Includes language detection feeatures.
        + [BlingFire](./BlingFire) -- we are a team at Microsoft called Bling (Beyond Language Understanding), sharing our [FInite State machine and REgular expression manipulation library](https://github.com/microsoft/BlingFire) (FIRE). We use Fire for many linguistic operations inside Bing such as Tokenization, Multi-word expression matching, Unknown word-guessing, Stemming / Lemmatization just to mention a few.
        
          Fire can also be used to improve FastText: see [here](https://github.com/microsoft/BlingFire#8-example-of-reaching-99-accuracy-for-language-detection).

          Bling Fire Tokenizer provides state of the art performance for Natural Language text tokenization.

    - **GMM/HMM/kM: fit patterns, e.g. match & transform a point cloud or image onto a template** --> help matching pages against banner templates, etc. as part of the OCR/recognition task.
        + [GMMreg](./GMMreg) -- implementations of the robust point set registration framework described in the paper "[Robust Point Set Registration Using Gaussian Mixture Models](https://github.com/bing-jian/gmmreg/blob/master/gmmreg_PAMI_preprint.pdf)", Bing Jian and Baba C. Vemuri, IEEE Transactions on Pattern Analysis and Machine Intelligence, 2011, 33(8), pp. 1633-1645. An earlier conference version of this work, "A Robust Algorithm for Point Set Registration Using Mixture of Gaussians, Bing Jian and Baba C. Vemuri.", appeared in the proceedings of ICCV'05.
        + [liblinear](./liblinear)
        + [hmm-scalable](./hmm-scalable)
        + [hmm-stoch](./hmm-stoch)
        + [GMM-HMM-kMeans](./GMM-HMM-kMeans)

    - [yara-pattern-matcher](./yara-pattern-matcher) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks
	
    - **_delta features_ & other feature extraction** (see Qiqqa research notes)
        + [dtl-diff-template-library](./dtl-diff-template-library)
        + [google-diff-match-patch](./google-diff-match-patch)
        + [HDiffPatch](./HDiffPatch)
        + [yara-pattern-matcher](./yara-pattern-matcher)

- **regex matchers (manual edit - pattern recognition)**

    * [hyperscan](./hyperscan) -- Hyperscan is a high-performance multiple regex matching library.
    * [re2](./re2)
    * [tre](./tre)
    * [pcre](./pcre)

- **OCR: quality improvements, language detect, ...**

    - [hunspell](./hunspell)
    - [hunspell-hyphen](./hunspell-hyphen)
    - [libtextcat](./libtextcat) -- text language detection
    - [fastText](./fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification. Includes language detection feeatures.

- **OCR page image preprocessing, \[scanner] tooling: getting the pages to the OCR engine**

    - [GraphicsMagick](./GraphicsMagick)
    - [ImageMagick](./ImageMagick)
    - [jasper](./jasper) -- JasPer Image Processing/Coding Tool Kit
    - [lcms2](../lcms2)
    - [leptonica](../leptonica)
    - [libvips](./libvips)
    - [olena](./olena)
    - [opencv](./opencv)
    - [opencv_contrib](./opencv_contrib)
    - [scantailor](./scantailor) -- [scantailor_advanced](https://github.com/4lex4/scantailor-advanced) is the [ScanTailor](https://github.com/scantailor/scantailor) version that merges the features of the *ScanTailor Featured* and *ScanTailor Enhanced* versions, brings new ones and fixes. ScanTailor is an interactive post-processing tool for scanned pages. It performs operations such as page splitting, deskewing, adding/removing borders, selecting content, ... and many others.
    - [CImg](../CImg) -- a **small** C++ toolkit for **image processing**.
    
- **image export, image / \[scanned] document import**

    - [CImg](../CImg) -- a **small** C++ toolkit for **image processing**.
    - [CxImage](../CxImage) -- venerated library for reading and creating many image file formats.
    - [jbig2dec](../jbig2dec)
    - [jpeginfo](../jpeginfo)
    - [libgd](../libgd) -- GD is a library for the dynamic creation of images by programmers. GD has support for: WebP, JPEG, PNG, AVIF, HEIF, TIFF, BMP, GIF, TGA, WBMP, XPM.
    - [libjpeg](../libjpeg)
    - [libpng](../libpng)
    - [libtiff](../libtiff)
    - [openjpeg](../openjpeg)
    - ~~[OpenEXR](./OpenEXR) -- lossless format for multi-layered images. Professional use. (I've used it before; nice file format.)~~
        + ~~[Imath](./Imath) -- float16 support lib for OpenEXR format~~
        + **removed**; reason: considered *overkill* for the projects I'm currently involved in, including Qiqqa. Those can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.
    - ~~[OpenImageIO](./OpenImageIO)~~
        + **removed**; reason: considered nice & cool but still *overkill*. Qiqqa tooling can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.
    - [jpeg-xl](./jpeg-xl) - [JPEG-XL](https://gitlab.com/wg1/jpeg-xl) support
    - [libgif](./libgif)
    - [libjpeg-turbo](./libjpeg-turbo)
    - [libwebp](./libwebp)
    - ~~[GDCM-Grassroots-DICOM](./GDCM-Grassroots-DICOM)~~
      + **removed**; reason: not a frequently used format; the filter codes can be found in other libraries. *Overkill*. Qiqqa tooling can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.
    - [pmt-png-tools](./pmt-png-tools)
    - ~~[DICOM to NIfTI](https://github.com/rordenlab/dcm2niix) (*not included; see also DICOM slot above*)~~
    - ~~[cgohlke::imagecodecs](https://github.com/cgohlke/imagecodecs) (*not included; see also DICOM slot above*)~~
    - [image formats (visual) quality comparison](https://eclipseo.github.io/image-comparison-web/) (*not included*)

- **Monte Carlo simulations, LDA, keyword inference/extraction, etc.**

	- [gibbs-lda](../gibbs-lda): modified GibbsLDA++: A C/C++ Implementation of Latent Dirichlet Allocation by by Xuan-Hieu Phan and Cam-Tu Nguyen.
    - [lda-bigartm](./lda-bigartm)
    - [lda-Familia](./lda-Familia)
    - [lda](./lda) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
	- [lda-3-variants](../lda-3-variants): three modified open source versions of LDA with collapsed Gibbs Sampling: GibbsLDA++, ompi-lda and online_twitter_lda.
    - [LightLDA](./LightLDA)
    - [mcmc](./mcmc) -- Monte Carlo
    - [mmc](./mmc) -- Monte Carlo
	- [multiverso](../multiverso): a parameter server based framework for training machine learning models on big data with numbers of machines. It is currently a standard C++ library and provides a series of friendly programming interfaces. Now machine learning researchers and practitioners do not need to worry about the system routine issues such as distributed model storage and operation, inter-process and inter-thread communication, multi-threading management, and so on. Instead, they are able to focus on the core machine learning logics: data, model, and training.
    - [ncnn](./ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
    - [OptimizationTemplateLibrary](./OptimizationTemplateLibrary) -- Optimization Template Library (OTL)
    - [pcg-c-random](./pcg-c-random) -- fast random generators
	- [randen](../randen): What if we could default to attack-resistant random generators without excessive CPU cost? We introduce 'Randen', a new generator with security guarantees; it outperforms MT19937, pcg64_c32, Philox, ISAAC and ChaCha8 in real-world benchmarks. This is made possible by AES hardware acceleration and a large Feistel permutation.

    - **text tokenization** (as a preprocessing step for LDA et al):
        + [sentencepiece](./sentencepiece) -- text tokenization
        + [sentence-tokenizer](./sentence-tokenizer) -- text tokenization
        + [you-token-to-me](./you-token-to-me) -- text tokenization
        + [libtextcat](./libtextcat) -- text language detection
        + [ucto](./ucto) -- text tokenization
            * [uctodata](./uctodata) -- data for `ucto` library
            * [libfolia](./libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
        + [fastBPE](./fastBPE) -- text tokenization / ngrams
        + [many-stop-words](./many-stop-words)
        + [stopwords](./stopwords)
        + [fastText](./fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification. Includes language detection feeatures.

    - other *topic modeling* code on the Net:
        * [Hierarchical Dirichlet Process (with Split-Merge Operations), Chong Wang](https://github.com/renaud/hdp-faster)
        * [Hierarchical Latent Tree Analysis (HLTA)](https://github.com/kmpoon/hlta)
        * [Leonard Poon - various works](https://github.com/kmpoon?tab=repositories)
        * [David Blei's list of topic modeling OSS software](http://www.cs.columbia.edu/~blei/topicmodeling_software.html) + [github repo list](https://github.com/blei-lab)

- **database "backend storage"**

    - [sqlite](./sqlite)
    - [sqlite-amalgamation](./sqlite-amalgamation)
    - [sqlite3pp](./sqlite3pp) -- a minimal ORM wrapper for SQLite et al.
    - [SQLiteCpp](../SQLiteCpp) -- a smart and easy to use C++ SQLite3 wrapper. SQLiteC++ offers an encapsulation around the native C APIs of SQLite, with a few intuitive and well documented C++ classes.
    - [lib_nas_lockfile](./lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
    - [otl](../otl) -- Oracle Template Library (STL-like wrapper for SQL DB queries; supports many databases besides Oracle)
    
    - LMDB, NoSQL and key/value stores:
    
    - [lmdb](./lmdb) -- OpenLDAP [LMDB](http://www.lmdb.tech/doc/index.html) is an outrageously fast key/value store with semantics that make it highly interesting for many applications.  Of specific note, besides speed, is the full support for transactions and good read/write concurrency.  LMDB is also famed for its robustness **when used correctly**.

    - [Lightning.NET](./Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
    - [lmdb.spreads.net](./lmdb.spreads.net) -- Low-level zero-overhead and [the fastest](https://github.com/Spreads/Spreads.LMDB/commit/4085dde649ef9ebb64310f2627299762dd62d5ce) LMDB .NET wrapper with some additional native methods useful for [Spreads](https://github.com/Spreads/).

    - [lmdb-store](./lmdb-store) -- an ultra-fast NodeJS interface to LMDB; probably the fastest and most efficient NodeJS key-value/database interface that exists for full storage and retrieval of structured JS data (objects, arrays, etc.) in a true persisted, scalable, [ACID compliant](https://en.wikipedia.org/wiki/ACID) database. It provides a simple interface for interacting with LMDB.

    - [lmdb-safe](./lmdb-safe) -- A safe modern & performant C++17 wrapper of LMDB. [LMDB](http://www.lmdb.tech/doc/index.html) is an outrageously fast key/value store with semantics that make it highly interesting for many applications.  Of specific note, besides speed, is the full support for transactions and good read/write concurrency.  LMDB is also famed for its robustness **when used correctly**.
    - [lmdbxx](./lmdbxx) -- LMDB C++ wrapper
    - [libmdbx](./libmdbx) -- lmdb++: a comprehensive C++11 wrapper for the LMDB embedded database library, offering both an error-checked procedural interface and an object-oriented resource interface with RAII semantics.

    - [ligra-graph](./ligra-graph) -- a Lightweight Graph Processing Framework for Shared Memory; works on both uncompressed and compressed graphs and hypergraphs.

    - [upscaledb](../upscaledb) -- a.k.a. hamsterdb: a thread-safe key/value database engine. It supports a B+Tree index structure, uses memory mapped I/O (if available), fast Cursors and variable length keys and can create In-Memory Databases.

- **metadata & text (OCR et al): language detect, suggesting fixes, ...**

    - [libtextcat](./libtextcat) -- text language detection
    - [sentence-tokenizer](./sentence-tokenizer) -- text tokenization
    - [sentencepiece](./sentencepiece) -- text tokenization
    - [unicode-cldr](./unicode-cldr)
    - [unicode-icu](./unicode-icu)
    - [you-token-to-me](./you-token-to-me) -- text tokenization
    - [ucto](./ucto) -- text tokenization
        + [uctodata](./uctodata) -- data for `ucto` library
        + [libfolia](./libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
    - [fastBPE](./fastBPE) -- text tokenization / ngrams
    - see also https://github.com/fxsjy/jieba for a Chinese text tokenizer (done in Python)
    - [fastText](./fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification.
    - [cld2-language-detect](../cld2-language-detect) -- CLD2 probabilistically detects over 80 languages in Unicode UTF-8 text, either plain text or HTML/XML. For mixed-language input, CLD2 returns the top three languages found and their approximate percentages of the total text bytes.  Optionally, it also returns a vector of text spans with the language of each identified. The design target is web pages of at least 200 characters (about two sentences); CLD2 is not designed to do well on very short text.
    - [uchardet](../uchardet) -- [uchardet](https://www.freedesktop.org/wiki/Software/uchardet/) is an encoding and language detector library, which attempts to determine the encoding of the text. It can reliably detect many charsets. Moreover it also works as a very good and fast language detector.

- **PDF metadata editing** for round-trip annotation and other "external application editing" of known documents; metadata embedding / *export*

    - [libexpat](./libexpat) -- XML read/write
    - [libxml2](./libxml2) -- XML read/write
    - [xml-pugixml](./xml-pugixml)
    - [XMP-Toolkit-SDK](./XMP-Toolkit-SDK)

- **web scraping** (document extraction, cleaning, metadata extraction, BibTeX, ...) 

    - see investigation notes in Qiqqa docs
    - [cURL](../curl) -- the ubiquitous [libcurl](http://curl.haxx.se/libcurl).
    - [libcpr](../libcpr) -- wrapper library for cURL. C++ Requests is a simple wrapper around [libcurl](http://curl.haxx.se/libcurl) inspired by the excellent [Python Requests](https://github.com/kennethreitz/requests) project. Despite its name, libcurl's easy interface is anything but, and making mistakes misusing it is a common source of error and frustration. Using the more expressive language facilities of C++11, this library captures the essence of making network calls into a few concise idioms.
    - [extract](../extract)
    - [libidn2](./libidn2) -- international domain name parsing
    - [gumbo-parser](../gumbo-parser) -- HTML parser
    - [gumbo-libxml](./gumbo-libxml)
    - [http-parser](./http-parser)
    - [picohttpparser](./picohttpparser)
    - [xml-pugixml](./xml-pugixml)
    - [libexpat](./libexpat) -- XML read/write
    - [libxml2](./libxml2) -- [libxml](http://xmlsoft.org/): XML read/write
    - [gumbo-query](./gumbo-query) -- HTML DOM access in C/C++
    - [tidy-html5](./tidy-html5)
    - [url](./url) -- URI parsing and other utility functions
    - [htmlstreamparser](../htmlstreamparser)
    - [libpsl](../libpsl) -- handles the *Public Suffix List* (a collection of Top Level Domains (TLDs) suffixes, e.g. `.com`, `.net`, *Country Top Level Domains* (ccTLDs) like `.de` and `.cn` and *[Brand Top Level Domains](https://icannwiki.org/Brand_TLD)* like `.apple` and `.google`. Can be used to:
        - avoid privacy-leaking "supercookies"
        - avoid privacy-leaking "super domain" certificates ([see post from Jeffry Walton](https://lists.gnu.org/archive/html/bug-wget/2014-03/msg00093.html))
        - domain highlighting parts of the domain in a user interface
        - sorting domain lists by site

- **file format support**

    - [file](./file) -- `file` filetype recognizer tool & mimemagic 
    - [djvulibre](./djvulibre)
    - [extract](../extract)
    - ~~[gmime](https://github.com/jstedfast/gmime) (alternative repo [here](https://github.com/GNOME/gmime)) -- multipart MIME library; serves as a fundamental building block for full MHTML file format I/O support~~
      + **removed**; reason: GNOME libraries are horrible to integrate with other codebases.
    - [gumbo-libxml](./gumbo-libxml)
    - [gumbo-parser](../gumbo-parser)
    - [gumbo-query](./gumbo-query) -- HTML DOM access in C/C++
    - [http-parser](./http-parser)
    - [libarchive](./libarchive)
    - [libcmime](../libcmime) -- MIME extract/insert/encode/decode: use for MHTML support
    - [libexpat](./libexpat) -- XML read/write
    - [libxml2](./libxml2) -- [libxml](http://xmlsoft.org/): XML read/write
    - [libzip](./libzip) -- a C library for reading, creating, and modifying zip and zip64 archives. Files can be added from data buffers, files, or compressed data copied directly from other zip archives. Changes made without closing the archive can be reverted. Decryption and encryption of Winzip AES and legacy PKware encrypted files is supported.
    - [CHM lib](./CHM-lib) -- as I have several HTML pages stored in this format. See also MHTML: `mht-rip`
    - [mht-rip](./mht-rip) -- as I have several HTML pages stored in this MHTML format. See also CHM: `CHM-lib`
    - [mime-mega](../mime-mega) -- MIME extract/insert/encode/decode: use for MHTML support
    - [mimetic](./mimetic) -- MIME: use for MHTML support
    - [picohttpparser](./picohttpparser)
    - [ticpp](./ticpp) -- TinyXML++: XML read/write
    - [tidy-html5](./tidy-html5) -- clean up HTML documents before archiving/processing
    - [xml-pugixml](./xml-pugixml)
    - [upskirt-markdown](./upskirt-markdown) -- MarkDown renderer
        - [svg-charter](./svg-charter) -- SVG chart renderer
            - [tinyexpr](./tinyexpr)
    - [libwarc](../libwarc) -- C++ library to parse WARC files. WARC is the official storage format of the Internet Archive for storing scraped content. WARC format used: http://bibnum.bnf.fr/WARC/WARC_ISO_28500_version1_latestdraft.pdf
    - [warc2text](../warc2text) -- Extracts plain text, language identification and more metadata from WARC records.

- **BibTeX and similar library metadata formats' support**

    - [bibtex-robust-decoder](./bibtex-robust-decoder)
    - [bibutils](./bibutils)

- **export / output file formats, text formatting, etc.**

    - [fmt](./fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
    - [hypertextcpp](./hypertextcpp) -- string/text template engine & source-to-source compiler.
    - [libqrencode](./libqrencode) -- generate QRcodes from anything (e.g. URLs)
    - [upskirt-markdown](./upskirt-markdown) -- MarkDown renderer
        - [svg-charter](./svg-charter) -- SVG chart renderer
            - [tinyexpr](./tinyexpr)

- **FTS (*Full Text Search*) and related: SOLR/Lucene et al: document content search**

  We'll be using SOLR mostly, but here might be some interface libraries and an intersting alternative
  
    - [Manticore](https://manticoresearch.com/): while the userbase is much smaller than for the *Lucene Gang* (Lucene/SOLR/ES/OpenSearch), this still got me. Can't say exactly why. All the other Lucene/SOLR alternatives out there didn't appeal to me (old tech, slow dev, ...).

        - [manticore-columnar](../manticore-columnar)
        - [manticoresearch](../manticoresearch)
        - [manticore-plugins](../manticore-plugins)
    
	- [pisa](../pisa): a text search engine able to run on large-scale collections of documents. It allows researchers to experiment with state-of-the-art techniques, allowing an ideal environment for rapid development. PISA is a text search engine, though the "PISA Project" is a set of tools that help experiment with indexing and query processing. Given a text collection, PISA can build an inverted index over this corpus, allowing the corpus to be searched. The inverted index, put simply, is an efficient data structure that represents the document corpus by storing a list of documents for each unique term (see here). At query time, PISA stores its index in main memory for rapid retrieval.
	
	- **stemmers**:
	    - [libstemmer](../libstemmer) -- SnowBall stemmer for many languages.
	    - [snowball](../snowball) -- SnowBall stemming compiler (code generator)
		
	- **language detection / inference**:
	    - [cld2-language-detect](../cld2-language-detect) -- CLD2 probabilistically detects over 80 languages in Unicode UTF-8 text, either plain text or HTML/XML. For mixed-language input, CLD2 returns the top three languages found and their approximate percentages of the total text bytes.  Optionally, it also returns a vector of text spans with the language of each identified. The design target is web pages of at least 200 characters (about two sentences); CLD2 is not designed to do well on very short text.
	    - [uchardet](../uchardet) -- [uchardet](https://www.freedesktop.org/wiki/Software/uchardet/) is an encoding and language detector library, which attempts to determine the encoding of the text. It can reliably detect many charsets. Moreover it also works as a very good and fast language detector.

- **scripting *user-tunable tasks* such as OCR preprocessing, metadata extraction, metadata cleaning & other \[post-]processing, ...**

    - [mujs](../mujs)
    - ~~[CPython](./CPython)~~
      + **removed**; reason: we've decided to offer any application user facing scripting features in JavaScript only: Python and the others can use socket-based messaging when someone wants to write their user scripts in any of those languages.
        
        The additional (and more important) reason to ditch CPython from the R&D set is hairiness of integrating Python into an application as an embedded scripting language, instead of the other way around. With the envisioned advent of ZeroMQ/socket based IPC, any Python scripts can hook into that instead of spending the effort and maintenance of having that large language as an embedded 'assistive' scripting/configuration language: it's simply too huge and complicated. We're not Blender and we don't have the funding.
    - [ECMA262](./ECMA262)
    - ~~[lua](./lua)~~
      + **removed**; reason: we've decided to offer any application user facing scripting features in JavaScript only: Python and the others can use socket-based messaging when someone wants to write their user scripts in any of those languages. See also the `CPython` entry.
    - ~~[luaJIT](./luaJIT)~~
      + **removed**; reason: see the `lua` entry above.
    - [QuickJS](./QuickJS)
        - [txiki](./txiki.js) -- uses QuickJS as its kernel
        - [QuickJS-C++-Wrapper](./QuickJS-C++-Wrapper)
        - [QuickJS-C++-Wrapper2](../QuickJS-C++-Wrapper2)
        - [libbf](../libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
    - [ScriptX](./ScriptX/) -- wrapper for V8, QuickJS, Lua, Python, ...
    - [VisualScriptEngine](../VisualScriptEngine) -- A visual scripting engine designed for embedding. The engine is written in modern C++ and compiles on several platforms with no external dependencies.
    - [wxVisualScriptEngine](../wxVisualScriptEngine) -- a utility module for [VisualScriptEngine](https://github.com/kovacsv/VisualScriptEngine) which provides helper classes for embedding the engine in a wxWidgets application.
     
    - [replxx](./replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
    - [linenoise](./linenoise) -- `readline` simile for REPL/interactive runs in a CLI

- **multi-processing core technologies**

	- **CLI: commandline parsing & perusing**
	    + [cli11](./cli11) -- command line options parser
	    + [clipp](./clipp) -- commandline parser 
	    + ~~[clippson](./clippson) -- commandline parser + JSON data diagnostical dumper~~
	      + **removed**; reason: deemed cool but unsuitable for our needs. Besides, we intend to use `cli11` instead of `clipp` for that library is easier to read and support is more active there.
	    + ~~[docopt](./docopt) -- generate documentation for command line options~~
	      + **removed**; reason: deemed cool but unsuitable for our needs. We intend to use `cli11` instead.
		  
	- **CPU features & capabilities detection**
	
	    - ~~[cpu_features](./cpu_features)~~
	      + **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.
	    - ~~[cpu_stat](./cpu_stat)~~
	      + **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.
	    - ~~[cpuinfo](./cpuinfo) -- CPU & hardware info~~
	      + **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.
	    - [libcpuid](./libcpuid) -- CPU & hardware info
	    - [spy-build-sysinfo](./spy-build-sysinfo) -- build system info
		
	- **run-time library core features: logging, formatting, ...**
	
	    - [expected-lite](./expected-lite)
	    - [fmt](./fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
	    - [hypertextcpp](./hypertextcpp) -- string/text template engine & source-to-source compiler.
	    - [frozen](./frozen) -- provides 0 cost initialization for immutable containers, fixed-size containers, and various algorithms.
	    - [hedley](./hedley) -- a C/C++ header file designed to smooth over some platform-specific annoyances.
	    - [libscanf](./libscanf)
	    - [magic_enum](./magic_enum) -- Header-only C++17 library provides static reflection for enums; works with any enum type without any macro or boilerplate code.
	    - [messagebox-windows](./messagebox-windows) -- drive `MessageBox` and `MessageBeep` Win32 APIs
	    - [pcg-c-random](./pcg-c-random) -- fast random generators
	    - [plf_nanotimer](./plf_nanotimer) -- high precision cross-platform performance timer
	    - [prio_queue](./prio_queue) -- a cache friendly priority queue, done as a B-heap.
		- [randen](../randen): What if we could default to attack-resistant random generators without excessive CPU cost? We introduce 'Randen', a new generator with security guarantees; it outperforms MT19937, pcg64_c32, Philox, ISAAC and ChaCha8 in real-world benchmarks. This is made possible by AES hardware acceleration and a large Feistel permutation.
	    - [stdext-path](./stdext-path) -- path manipulations (`dirname` et al)
		
	- **running tasks in parallel: multi-processing, multithreading, async, ...**
	
	    + [createprocess-windows](./createprocess-windows) -- drive `CreateProcess` Win32 API
	    + [libtuv](./libtuv)
	    + [libunifex](./libunifex) -- a prototype implementation of the C++ sender/receiver async programming model that is currently being considered for standardisation. This project contains implementations of the following: Schedulers, Timers, Asynchronous I/O, Algorithms that encapsulate certain concurrency patterns, Async streams, Cancellation, Coroutine integration.
	    + [oneTBB](./oneTBB) -- Intel's Thread Building Blocks library: used with OpenImageIO, ...
	    + [pthread-win32](./pthread-win32) -- `pthread` for MS Windows
        + [subprocess](./subprocess) -- [benman64/subprocess](https://github.com/benman64/subprocess): cross platform subprocess library for C++ similar to design of Python `subprocess`. 
        + [tiny-process-library](./tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
        + https://github.com/rajatjain1997/subprocess -- A C++ high level library for running shell processes
        + https://github.com/arun11299/cpp-subprocess -- as close as possible to Python2.7 `subprocess` module in dealing with processes.
        + https://github.com/pnappa/subprocesscpp -- A header-only library that allows you to execute processes either synchronously or asynchronously, whilst providing input and output handling. No more calling `exec` in C++!
        + https://github.com/sheredom/subprocess.h -- A one header solution to launching processes and interacting with them for C/C++.
		
    - **multi-processing: invoking external applications**
	
        + [subprocess](./subprocess) -- [benman64/subprocess](https://github.com/benman64/subprocess): cross platform subprocess library for C++ similar to design of Python `subprocess`. 
        + [tiny-process-library](./tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
        + https://github.com/rajatjain1997/subprocess -- A C++ high level library for running shell processes
        + https://github.com/arun11299/cpp-subprocess -- as close as possible to Python2.7 `subprocess` module in dealing with processes.
        + https://github.com/pnappa/subprocesscpp -- A header-only library that allows you to execute processes either synchronously or asynchronously, whilst providing input and output handling. No more calling `exec` in C++!
        + https://github.com/sheredom/subprocess.h -- A one header solution to launching processes and interacting with them for C/C++.
	    + [createprocess-windows](./createprocess-windows) -- drive `CreateProcess` Win32 API
		
    - **thread pools**
	
        + [thread-pool-c](./thread-pool-c)
        + [thread-pool-cpp](./thread-pool-cpp)
        + [thread-pool](./thread-pool)
		
    - **task schedulers**
	
      - [enkiTS](./enkiTS-TaskScheduler) -- A C++11 Task Scheduler for creating parallel programs.
     
        Features:
        - Lightweight
        - Fast, then scalable - designed for consumer devices first, so performance on a low number of threads is important, followed by scalability.
        - Braided parallelism - can issue tasks from another task as well as from the thread which created the Task System, and has a simple task interface for both data and task parallelism.
        - Up-front Allocation friendly - designed for zero allocations during scheduling.
        - Can pin tasks to a given thread - can schedule a task which will only be run on the specified thread.
        - Can set task priorities - Up to 5 task priorities can be configured via define ENKITS_TASK_PRIORITIES_NUM (defaults to 3). Higher priority tasks are run before lower priority ones.
        - Can register external threads to use with enkiTS
        - Dependencies - can set dependencies between tasks.
        - Completion Actions - can perform an action on task completion. This avoids the expensive action of adding the task to the scheduler, and can be used to safely delete a completed task.
        - Can wait for pinned tasks - useful for creating IO threads which do no other work.
		
      - [google::marl](./google-marl) -- a hybrid thread / fiber task scheduler written in C++ 11. Marl uses a combination of fibers and threads to allow efficient execution of tasks that can block, while keeping a fixed number of hardware threads.
      - [taskflow](./taskflow) -- Quickly write parallel and heterogeneous task programs in modern C++. Taskflow is faster, more expressive, and easier for drop-in integration than many of existing task programming frameworks in handling complex parallel workloads.
      - [asynqro](./asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.
 
    - **Promise/A+**

      The key distinction between Promises/A+ and `std::promise` in C++11 is that Promises/A+ provides non-blocking synchronization (via chaining function objects) and `std::promise` provides blocking synchronization (or polling). Both have their uses and one is not a direct replacement for the other.

      IMPORTANT NOTE: there is one major difference, though. Most modern Javascript promises (including JS Native promises) resolve asynchronously, i.e. their `resolve()` method does not directly call the `then()` handlers, but schedules the calls on the next message loop iteration. The same happens when a `then()`/`catch()` handler is attached to an already resolved/rejected promise. This may be a bit less efficient, but makes the behavior symmetric and more predictable. These libraries *SHOULD* resolve synchronously, because they are unaware of the message loop that is used in the application. (Look into task schedulers above for when you need such awareness, e.g. `taskflow`.)

        - [promise-cpp](./promise-cpp) -- advanced C++ promise/A+ library in Javascript style
		- [promise-hpp](../promise-hpp): C++ asynchronous promises like a Promises/A+
        - [libq](./libq) -- A platform-independent promise library for C++, implementing asynchronous continuations.
        - [asynqro](./asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.
        - https://github.com/rhashimoto/poolqueue -- C++ Asynchronous Promises, inspired by Promises/A+.
        - https://github.com/YACLib/YACLib -- Yet Another lightweight C++ library for concurrent and parallel task execution.
        - https://github.com/alxvasilev/cpp-promise -- Javascript-like C++ promise library

- **web servers, generic sockets I/O (IPC)**

    + [civetweb](./civetweb)
    + [crow](./crow) -- IPC / server framework
    + [drogon](./drogon) -- a C++14/17-based HTTP application framework to easily build various types of web application server programs.
    + [h2o-server](./h2o-server) -- an optimized HTTP/1, HTTP/2, HTTP/3 server.
    + ~~[libmicrohttpd](https://github.com/Karlson2k/libmicrohttpd)~~
      + **removed**; reason: we've decided on using `crow` as the main server framework. Second choices are civetweb and h2o. This GNU library is way too 'Unix-is-the-world' oriented for a smooth portable dev experience.
    + ~~[oatpp](https://github.com/oatpp/oatpp) -- IPC / server framework~~
      + **removed**; reason: we've decided on using `crow` as the main server framework.
    + [proxygen](./proxygen) -- the core C++ HTTP abstractions used at Facebook. Internally, it is used as the basis for building many HTTP servers, proxies, and clients, focusing on the common HTTP abstractions and our simple HTTPServer framework. The framework supports HTTP/1.1, SPDY/3, SPDY/3.1, HTTP/2, and HTTP/3.
    + [wget](./wget)

- **socket I/O: websockets**

    - [libwebsocketpp](./libwebsocketpp) -- a header only C++ library that implements RFC6455 The WebSocket Protocol.
    - [libwebsockets](./libwebsockets) -- a simple-to-use library providing client and server for HTTP/1, HTTP/2, websockets, MQTT and other protocols in a security-minded, lightweight, configurable, scalable and flexible way.
    - [websocket-sharp](./websocket-sharp)

- **disk I/O, monitoring import locations, ...**

    + [efsw](./efsw) -- cross-platform file system watcher and notifier
    + [glob](./glob) -- directory scanner
    + [filesystem](./filesystem) -- a header-only single-file `std::filesystem` compatible helper library, based on the C++17 and C++20 specs, but implemented for C++11, C++14, C++17 or C++20 (tightly following the C++17 standard with very few documented exceptions). It is of course in its own namespace `ghc::filesystem` to not interfere with a regular `std::filesystem` should you use it in a mixed C++17 environment (which is possible).

- **configuration / parameterization**

    + [gflags](./gflags) -- google::flags library, used by other libs in this set.
    + ~~[inih](https://github.com/benhoyt/inih)~~
      + **removed**; reason: we've decided on using `libconfig` for configuration files.
    + ~~[iniparser](https://github.com/ndevilla/iniparser)~~
      + **removed**; reason: we've decided on using `libconfig` for configuration files.
    + [libconfig](../libconfig) -- generic config (file) reader/writer
	+ **TOML**
	    + [tomlpp](../tomlpp) -- TOML++
    + **YAML**
        + [libyaml](./libyaml) -- YAML
        + [libcyaml](../libcyaml)
        + [libyaml-examples](../libyaml-examples)
        + [libfyaml](../libfyaml)
        + [yaml-test-suite](../yaml-test-suite)
        + [yaml-cpp](../yaml-cpp)
        + [rapidyaml](../rapidyaml)

- **testing & fuzzing**

    - [googletest](./googletest)
    - [gbenchmark](./gbenchmark)
    - [cxxtest_catch_2_gtest](../cxxtest_catch_2_gtest) -- quick & dirty converter from various test suites to googletest, i.e. allows us to use a single test framework, despite some libraries having been set up to use another, e.g. Catch2.

- **logging & debugging**

    + [binlog](../binlog) -- a high performance C++ log library to produce structured binary logs.
    + [breakpad](./breakpad) -- a set of client and server components which implement a crash-reporting system.
    + ~~[EasyLogger](https://github.com/armink/EasyLogger) -- an ultra-lightweight (ROM<1.6K, RAM<0.3K), high-performance C/C++ log library, very suitable for resource-sensitive software projects. Compared with the well-known C/C++ log libraries such as log4c and zlog, EasyLogger has simpler functions and provides fewer interfaces to users, but it will be quick to get started. More practical functions support dynamic expansion in the form of plug-ins.~~
      + **removed**; reason: we've decided on using `glog` as the logging library for everything: while that one isn't perfect, most of the other stuff we've been looking at is using that one already and it matches our needs 80% of the time, while I'm okay with patching that library for the other 20% (syslog-like use, i.e. logging to localhost logging server where all logging is collected -- these log messages should travel across as part of the ZeroMQ message streams.)
    + [fmt](./fmt)
    + [glog](./glog) -- Google Logging is a C++98 library that implements application-level logging. The library provides logging APIs based on C++-style streams and various helper macros.
    + ~~[log4cplus](https://github.com/log4cplus/log4cplus)~~
      + **removed**; reason: we've decided on using `glog` as the logging library for everything. log4cplus, at the same time, is a tad too much. (I consider `log4j` et al *overdone* as it caters to every need instead of just providing those things as contrib code which can be integrated at need -- should not be as far run-time configurable as it currently is.)
    + [MuPDF itself](../../)
    + [plf_nanotimer](./plf_nanotimer) -- high precision cross-platform performance timer
    + [replxx](./replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
    + [resumable-assert](./resumable-assert)
    + ~~[spdlog](https://github.com/gabime/spdlog)~~
      + **removed**; reason: we've decided on using `glog` as the logging library for everything. `spdlog` has some nice features but in the end it was easy of cross-platform compilation and installed base that won out here... 
    + [uberlog](./uberlog) -- a cross platform C++ logging system that is focused on fast and small, writing to a shared memory ring buffer.
    + ~~[zlog](https://github.com/HardySimpson/zlog)~~
      + **removed**; `zlog` has a nice overall design but is too 'Unix-is-the-world' in its coding: in the end it was easy of cross-platform compilation of `glog` that won the day and I'm okay with layering on top of that one to get the zlog category and other channel features, once I really need them.

    + **ETW (Event Tracing for Microsoft Windows)**
		- [UIforETW](../UIforETW): Bruce Dawson's user interface for recording ETW (Event Tracing for Windows) traces, which allow amazingly deep investigations of performance problems on Windows.
		- [krabsETW](../krabsETW): a C++ library that simplifies interacting with ETW. It allows for any number of traces and providers to be enabled and for client code to register for event notifications from these traces.
		- [tracelogging-for-ETW](../tracelogging-for-ETW): C++ Wrapper for Windows ETW TraceLogging
		- [Sealighter](../Sealighter): Sysmon-Like research tool for ETW: helps non-developers dive into researching Event Tracing for Windows (ETW) and Windows PreProcessor Tracing (WPP).
		- [Windows10EtwEvents](../Windows10EtwEvents): Events from all manifest-based and mof-based ETW providers across Windows 10 versions.
		- [EtwExplorer](../EtwExplorer): View ETW Provider metadata. Event Tracing for Windows (ETW) is a logging facility built into the Windows OS. Modern providers register a manifest that describes all the events they support, with their properties. Classic providers register a MOF instead.
		- [SilkETW](../SilkETW): SilkETW & SilkService are flexible C# wrappers for ETW, they are meant to abstract away the complexities of ETW and give people a simple interface to perform research and introspection. While both projects have obvious defensive (and offensive) applications they should primarily be considered as research tools.
	
- **OCR core (*tesseract*)**

    + [langdata_LSTM](../langdata_LSTM)
    + [tessconfigs](../tessconfigs)
    + [tessdata](../tessdata)
    + [tessdata_best](../tessdata_best)
    + [tessdata_contrib](../tessdata_contrib)
    + [tessdata_fast](../tessdata_fast)
    + [tessdoc](../tessdoc)
    + [tesseract](../tesseract)
    + [tesseract_docs](../tesseract_docs)
    + [tesseract_langdata](../tesseract_langdata)
    + [tesstrain](../tesstrain)

- **PDF render & metadata core (*mupdf*)**

    + [extract](../extract)
    + [freeglut](../freeglut)
    + [freetype](../freetype)
    + [harfbuzz](../harfbuzz)
    + [jbig2dec](../jbig2dec)
    + [lcms2](../lcms2)
    + [leptonica](../leptonica)
    + [libjpeg](../libjpeg)
    + [libpng](../libpng)
    + [libtiff](../libtiff)
    + [openjpeg](../openjpeg)
    + [zlib](../zlib)

- **UI / GUI**

    + [neutralinoJS](./neutralinoJS) -- a lightweight and portable desktop application development framework. It lets you develop lightweight cross-platform desktop applications using JavaScript, HTML and CSS. Neutralinojs offers a lightweight SDK which is an alternative for Electron and NW.js. Neutralinojs doesn't bundle Chromium and uses the existing web browser library in the operating system. Neutralinojs implements a WebSocket connection for native operations and embeds a static web server to serve the web content. Also, it offers a built-in [JavaScript client library](https://github.com/neutralinojs/neutralino.js) for developers.
    + [neutralinoJS-CLI](./neutralinoJS-CLI) -- The official CLI of Neutralinojs.
    + [photino.native](../photino.native) -- Photino is a lightweight open-source framework for building native, cross-platform desktop applications with Web UI technology. Photino uses the OSs built-in WebKit-based browser control for Windows, macOS and Linux. Photino is the lightest cross-platform framework compared to Electron.
    + [webview](./webview) -- cross-platform embedding of the system-default web browser: a tiny cross-platform webview library for C/C++/Golang to build modern cross-platform GUIs. The goal of the project is to create a common HTML5 UI abstraction layer for the most widely used platforms. It supports two-way JavaScript bindings (to call JavaScript from C/C++/Go and to call C/C++/Go from JavaScript).
    + [wxWidgets](./wxWidgets) -- cross-platform GUI framework.
    + [wxCharts](./wxCharts) -- charts for wxWidgets
    + [wxFormBuilder](../wxFormBuilder) -- resource editor and GUI designer
    + [wxPDFView](./wxPDFView) -- wxWidgets PDF viewer/reader control
    + [wxWebViewChromium](./wxWebViewChromium) -- Chromium CEF3-based embedded browser for wxWidgets
    + [scintilla](./scintilla) -- text editor
    + [wxExamples](../wxExamples) -- examples using wxWidgets
    + [wxMEdit](../wxMEdit) -- a cross-platform Text/Hex Editor written in C++ & wxWidgets. wxMEdit supports many useful functions, e.g. Bookmark, Syntax Highlightings, Word Wraps, Encodings and Column/Hex Modes.
    + [wxSQLite3](../wxSQLite3) -- a C++ wrapper around the SQLite 3.x database and is specifically designed for use in programs based on the wxWidgets library. **wxSQLite3** does not try to hide the underlying database, in contrary almost all special features of the current SQLite3 version are supported, like for example the creation of user defined scalar or aggregate functions.
    + [wxVisualScriptEngine](../wxVisualScriptEngine) -- a utility module for [VisualScriptEngine](https://github.com/kovacsv/VisualScriptEngine) which provides helper classes for embedding the engine in a wxWidgets application.

- **misc / other**

    + ~~[binary_bakery](https://github.com/s9w/binary_bakery) -- resource compiler-like tool: embed any data in your C/C++ application~~
      + **removed**; reason: we already have `bin2coff` from MuPDF, which serves this purpose well enough.
    + [preprocess-corpuses](../preprocess-corpuses) -- Pipelines for preprocessing corpora.

- **sub-dependencies (libraries which are required by any of the above)**

    + [boost](./boost) -- required by several other libraries in this collection
    + ~~[Catch2](./Catch2)~~
      + **removed**; reason: we've decided to standardize on a single unittest library (which is well supported in Microsoft Visual Studio, including the Test Explorer view there); where necessary, we'll have to provide a translation layer instead when existing submodules use different test rigs originally.
    + [gflags](./gflags) -- google::flags library, used by other libs in this set.
    + [glib2](../glib2): GLib is the low-level core library that forms the basis for projects such as GTK and GNOME.
    + ~~[Imath](./Imath) -- float16 support lib for OpenEXR format~~
    + [jemalloc](./jemalloc)
    + [mimalloc](./mimalloc) -- a compact general purpose allocator with excellent performance.
    + [snmalloc](./snmalloc) -- a high-performance allocator.
    + [libbf](../libbf)
    + [libfolia](./libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
    + [libidn2](./libidn2)
    + [nanosvg](./nanosvg)
    + [OpenSSL](./openssl) -- also used by cURL et al, incidentally.
    + [pcre](./pcre)
    + ~~[protobuf](./protobuf)~~
    + [svg-charter](./svg-charter) -- SVG chart renderer
    + [ticpp](./ticpp) -- TinyXML++: XML read/write (is part of wxFormbuilder).
    + [tinyexpr](./tinyexpr)
    + [tlx](./tlx) -- a collection of C++ helpers and extensions universally needed, but not found in the STL.
    + [tsf](./tsf) -- type-safe printf equivalent for C++ (used by the uberlog submodule)
    + [uint128_t](./uint128_t)
    + [scintilla](./scintilla) -- text editor (part of wxWidgets)
    + [htmlstreamparser](../htmlstreamparser) -- used in a demo of zsync2
    + [libcpr](../libcpr) -- wrapper library for cURL; used by zsync2
    + [highway](../highway) -- dependency of JpegXL


---

# Libraries in this collection (All of the above, listed in alphabetical order)

- [annoy](../annoy): Annoy (Approximate Nearest Neighbors Oh Yeah) is a C++ library with Python bindings to search for points in space that are close to a given query point. It also creates large read-only file-based data structures that are mmapped into memory so that many processes may share the same data. Annoy is almost as fast as the fastest libraries, but there is actually another feature that really sets Annoy apart: it has the ability to use static files as indexes. In particular, this means you can share index across processes. Annoy also decouples creating indexes from loading them, so you can pass around indexes as files and map them into memory quickly. Another nice thing of Annoy is that it tries to minimize memory footprint so the indexes are quite small. Why is this useful? If you want to find nearest neighbors and you have many CPU's, you only need to build the index once. You can also pass around and distribute static files to use in production environment: any process will be able to load (`mmap`) the index into memory and will be able to do lookups immediately. We use it at Spotify for music recommendations. After running matrix factorization algorithms, every user/item can be represented as a vector in f-dimensional space. This library helps us search for similar users/items. We have many millions of tracks in a high-dimensional space, so memory usage is a prime concern.
- [asynqro](./asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.
- [BBHash](./BBHash)
- [BCF-cuckoo-index](./BCF-cuckoo-index)
- [bebop](./bebop)
- [bibtex-robust-decoder](./bibtex-robust-decoder)
- [bibutils](./bibutils)
- [binary_bakery](./binary_bakery) -- resource compiler-like tool: embed any data in your C/C++ application
- [binlog](../binlog) -- a high performance C++ log library to produce structured binary logs.
- [BLAKE3](./BLAKE3)
- [BlingFire](./BlingFire) -- we are a team at Microsoft called Bling (Beyond Language Understanding), sharing our [FInite State machine and REgular expression manipulation library](https://github.com/microsoft/BlingFire) (FIRE). We use Fire for many linguistic operations inside Bing such as Tokenization, Multi-word expression matching, Unknown word-guessing, Stemming / Lemmatization just to mention a few.
- [boost](./boost) -- required by several other libraries in this collection
- [breakpad](./breakpad)
- [brotli](../brotli) -- compression
- [bzip2](./bzip2)
- [c-blosc2](./c-blosc2) -- a high performance compressor optimized for binary data (i.e. floating point numbers, integers and booleans), designed to transmit data to the processor cache faster than the traditional, non-compressed, direct memory fetch approach via a `memcpy()` OS call.
- [CacheLib](./CacheLib) -- provides an in-process high performance caching mechanism, thread-safe API to build high throughput, low overhead caching services, with built-in ability to leverage DRAM and SSD caching transparently.
- [caffe](./caffe)
- [catboost](./catboost)
- ~~[Catch2](./Catch2)~~
- [cereal](./cereal) -- C++11 serialization library
- [CHM lib](./CHM-lib) -- as I have several HTML pages stored in this format. See also MHTML: `mht-rip`
- [CImg](../CImg) -- a **small** C++ toolkit for **image processing**.
- [circlehash](../circlehash) -- a family of non-cryptographic hash functions that pass every test in SMHasher.
- [civetweb](./civetweb)
- [clBLAS](./clBLAS)
- [cld2-language-detect](../cld2-language-detect) -- CLD2 probabilistically detects over 80 languages in Unicode UTF-8 text, either plain text or HTML/XML. For mixed-language input, CLD2 returns the top three languages found and their approximate percentages of the total text bytes.  Optionally, it also returns a vector of text spans with the language of each identified. The design target is web pages of at least 200 characters (about two sentences); CLD2 is not designed to do well on very short text.- [cli11](./cli11) -- command line options parser
- [clipp](./clipp) -- commandline parser 
- ~~[clippson](./clippson) -- commandline parser + JSON data diagnostical dumper~~
- [cmph-hasher](./cmph-hasher)
- [cpp-btree](../cpp-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- [cppzmq](./cppzmq)
- [cpu_features](./cpu_features)
- [cpu_stat](./cpu_stat)
- [cpuinfo](./cpuinfo) -- CPU & hardware info
- ~~[CPython](./CPython)~~
- [createprocess-windows](./createprocess-windows) -- drive `CreateProcess` Win32 API
- [crow](./crow) -- IPC / server framework 
- [cryptopp](./cryptopp)
- [csync2](../csync2) -- a cluster synchronization tool. It can be used to keep files on multiple hosts in a cluster in sync. Csync2 can handle complex setups with much more than just 2 hosts, handle file deletions and can detect conflicts.
- [CTCWordBeamSearch](../CTCWordBeamSearch): Connectionist Temporal Classification (CTC) decoder with dictionary and Language Model (LM).
- [cuckoo-index](./cuckoo-index)
- [cuckoofilter](./cuckoofilter)
- [cURL](../curl)
- [CxImage](../CxImage) -- venerated library for reading and creating many image file formats
- [DCF-cuckoo-index](./DCF-cuckoo-index)
- [djvulibre](./djvulibre)
- [dlib](./dlib) -- machine learning algorithms
- ~~[docopt](./docopt) -- generate documentation for command line options~~
- [drogon](./drogon)
- [dtl-diff-template-library](./dtl-diff-template-library)
- ~~[EasyLogger](https://github.com/armink/EasyLogger) -- an ultra-lightweight (ROM<1.6K, RAM<0.3K), high-performance C/C++ log library, very suitable for resource-sensitive software projects. Compared with the well-known C/C++ log libraries such as log4c and zlog, EasyLogger has simpler functions and provides fewer interfaces to users, but it will be quick to get started. More practical functions support dynamic expansion in the form of plug-ins.~~
- [ECMA262](./ECMA262)
- [efsw](./efsw) -- cross-platform file system watcher and notifier
- [emphf-hash](./emphf-hash)
- [enkiTS](./enkiTS-TaskScheduler) -- A C++11 Task Scheduler for creating parallel programs.
- [EtwExplorer](../EtwExplorer): View ETW Provider metadata. Event Tracing for Windows (ETW) is a logging facility built into the Windows OS. Modern providers register a manifest that describes all the events they support, with their properties. Classic providers register a MOF instead.
- [expected-lite](./expected-lite)
- [extract](../extract)
- [faiss](../faiss): a library for efficient similarity search and clustering of dense vectors. It contains algorithms that search in sets of vectors of any size, up to ones that possibly do not fit in RAM. It also contains supporting code for evaluation and parameter tuning. Faiss is written in C++ with complete wrappers for Python/numpy. Some of the most useful algorithms are implemented on the GPU. It is developed primarily at Facebook AI Research.
- [fast-lzma2](./fast-lzma2)
- ~~[FastBinaryEncoding](./FastBinaryEncoding)~~
- [fastBPE](./fastBPE) -- text tokenization / ngrams
- [fastText](./fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification.
- [file](./file) -- `file` filetype recognizer tool & mimemagic 
- [filesystem](./filesystem) -- a header-only single-file `std::filesystem` compatible helper library, based on the C++17 and C++20 specs, but implemented for C++11, C++14, C++17 or C++20 (tightly following the C++17 standard with very few documented exceptions). It is of course in its own namespace `ghc::filesystem` to not interfere with a regular `std::filesystem` should you use it in a mixed C++17 environment (which is possible).
- ~~[flatbuffers](./flatbuffers)~~
- ~~[flatcc](./flatcc)~~
- [fmt](./fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
- [freeglut](../freeglut)
- [freetype](../freetype)
- [frozen](./frozen) -- provides 0 cost initialization for immutable containers, fixed-size containers, and various algorithms.
- [gbenchmark](./gbenchmark)
- [GDCM-Grassroots-DICOM](./GDCM-Grassroots-DICOM)
- [gflags](./gflags) -- google::flags library, used by other libs in this set.
- [gibbs-lda](../gibbs-lda): modified GibbsLDA++: A C/C++ Implementation of Latent Dirichlet Allocation by by Xuan-Hieu Phan and Cam-Tu Nguyen.
- [glib2](../glib2): GLib is the low-level core library that forms the basis for projects such as GTK and GNOME.
- [glob](./glob) -- directory scanner
- [glog](./glog) -- Google Logging is a C++98 library that implements application-level logging. The library provides logging APIs based on C++-style streams and various helper macros.
- [GMM-HMM-kMeans](./GMM-HMM-kMeans)
- [GMMreg](./GMMreg)
- [google-diff-match-patch](./google-diff-match-patch)
- [google::marl](./google-marl) -- a hybrid thread / fiber task scheduler written in C++ 11. Marl uses a combination of fibers and threads to allow efficient execution of tasks that can block, while keeping a fixed number of hardware threads.
- [googletest](./googletest)
- [cxxtest_catch_2_gtest](../cxxtest_catch_2_gtest) -- quick & dirty converter from various test suites to googletest, i.e. allows us to use a single test framework, despite some libraries having been set up to use another, e.g. Catch2.
- [gperf-hash](./gperf-hash)
- [GraphicsMagick](./GraphicsMagick)
- [gumbo-libxml](./gumbo-libxml)
- [gumbo-parser](../gumbo-parser)
- [gumbo-query](./gumbo-query) -- HTML DOM access in C/C++
- [h2o-server](./h2o-server)
- ~~[h5cpp-HDF5](./h5cpp-HDF5)~~
- [harfbuzz](../harfbuzz)
- ~~[HDF5](./HDF5)~~
- [HDiffPatch](./HDiffPatch)
- [hedley](./hedley) -- a C/C++ header file designed to smooth over some platform-specific annoyances.
- ~~[HighFive-HDF5](./HighFive-HDF5)~~
- [hmm-scalable](./hmm-scalable)
- [hmm-stoch](./hmm-stoch)
- [hnswlib](../hnswlib): fast approximate nearest neighbor search. Header-only C++ HNSW implementation with python bindings.
- [hocr-fileformat](./hocr-fileformat)
- [hocr-spec](./hocr-spec)
- [hocr-tools](./hocr-tools)
- [htmlstreamparser](../htmlstreamparser)
- [http-parser](./http-parser)
- [hunspell-hyphen](./hunspell-hyphen)
- [hunspell](./hunspell)
- [hyperscan](./hyperscan) -- Hyperscan is a high-performance multiple regex matching library.
- ~~[ice](./ice) -- Comprehensive RPC Framework: helps you network your software with minimal effort.~~
- [ImageMagick](./ImageMagick)
- ~~[Imath](./Imath) -- float16 support lib for OpenEXR format~~
- ~~[inih](./inih)~~
- ~~[iniparser](./iniparser)~~
- [jasper](./jasper) -- JasPer Image Processing/Coding Tool Kit
- [jbig2dec](../jbig2dec)
- [jemalloc](./jemalloc)
- [jpeg-xl](./jpeg-xl) - [JPEG-XL]https://gitlab.com/wg1/jpeg-xl) support
- [jpeginfo](../jpeginfo)
- [json-jansson](./json-jansson)
- [json](./json)
- [kgraph](../kgraph): a library for k-nearest neighbor (k-NN) graph construction and online k-NN search using a k-NN Graph as index. KGraph implements heuristic algorithms that are extremely generic and fast. KGraph works on abstract objects. The only assumption it makes is that a similarity score can be computed on any pair of objects, with a user-provided function.
- [krabsETW](../krabsETW): a C++ library that simplifies interacting with ETW. It allows for any number of traces and providers to be enabled and for client code to register for event notifications from these traces.
- [langdata_LSTM](../langdata_LSTM) -- tesseract data
- [lapack](./lapack) -- [CBLAS](http://www.netlib.org/blas/) + [LAPACK](http://www.netlib.org/lapack/index.html) optimized linear algebra libs
- [lcms2](../lcms2)
- [lda-bigartm](./lda-bigartm)
- [lda-Familia](./lda-Familia)
- [lda](./lda) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
- [lda-3-variants](../lda-3-variants): three modified open source versions of LDA with collapsed Gibbs Sampling: GibbsLDA++, ompi-lda and online_twitter_lda.
- [LDCF-hash](./LDCF-hash)
- [leptonica](../leptonica)
- [lib_nas_lockfile](./lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
- [libarchive](./libarchive)
- [libbf](../libbf)
- [libbloom](./libbloom)
- [libcmime](../libcmime) -- MIME extract/insert/encode/decode: use for MHTML support
- [libconfig](../libconfig) -- generic config (file) reader/writer
- [libcpr](../libcpr) -- wrapper library for cURL. C++ Requests is a simple wrapper around [libcurl](http://curl.haxx.se/libcurl) inspired by the excellent [Python Requests](https://github.com/kennethreitz/requests) project. Despite its name, libcurl's easy interface is anything but, and making mistakes misusing it is a common source of error and frustration. Using the more expressive language facilities of C++11, this library captures the essence of making network calls into a few concise idioms.
- [libcpuid](./libcpuid) -- CPU & hardware info
- [libCZMQ](../libCZMQ)
- [libexpat](./libexpat) -- XML read/write
- [libfolia](./libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
- [libgd](../libgd) -- GD is a library for the dynamic creation of images by programmers. GD has support for: WebP, JPEG, PNG, AVIF, HEIF, TIFF, BMP, GIF, TGA, WBMP, XPM.
- [libgif](./libgif)
- [libidn2](./libidn2)
- [libjpeg-turbo](./libjpeg-turbo)
- [libjpeg](../libjpeg)
- [liblinear](./liblinear)
- [libmdbx](./libmdbx)
- ~~[libmicrohttpd](./libmicrohttpd)~~
- [libngt-ann](../libngt-ann): Yahoo's Neighborhood Graph and Tree for Indexing High-dimensional Data. NGT provides commands and a library for performing high-speed approximate nearest neighbor searches against a large volume of data (several million to several 10 million items of data) in high dimensional vector data space (several ten to several thousand dimensions).
- [libpng](../libpng)
- [libpsl](../libpsl) -- handles the *Public Suffix List* (a collection of Top Level Domains (TLDs) suffixes, e.g. `.com`, `.net`, *Country Top Level Domains* (ccTLDs) like `.de` and `.cn` and *[Brand Top Level Domains](https://icannwiki.org/Brand_TLD)* like `.apple` and `.google`.
- [libsptag](../libsptag): a library for fast approximate nearest neighbor search.  SPTAG (Space Partition Tree And Graph) is a library for large scale vector approximate nearest neighbor search scenario released by [Microsoft Research (MSR)](https://www.msra.cn/) and [Microsoft Bing](http://bing.com). 
- [libq](./libq) -- A platform-independent promise library for C++, implementing asynchronous continuations.
- [libqrencode](./libqrencode)
- [libscanf](./libscanf)
- ~~[libsmile](./libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format~~
- [libstemmer](../libstemmer) -- SnowBall stemmer for many languages.
- [snowball](../snowball) -- SnowBell stemming compiler (code generator)
- [libsvm](./libsvm)
- [libtextcat](./libtextcat) -- text language detection
- [libtiff](../libtiff)
- [libtuv](./libtuv)
- [libunifex](./libunifex) -- a prototype implementation of the C++ sender/receiver async programming model that is currently being considered for standardisation. This project contains implementations of the following: Schedulers, Timers, Asynchronous I/O, Algorithms that encapsulate certain concurrency patterns, Async streams, Cancellation, Coroutine integration.
- [libvips](./libvips)
- [libwarc](../libwarc) -- C++ library to parse WARC files. WARC is the official storage format of the Internet Archive for storing scraped content. WARC format used: http://bibnum.bnf.fr/WARC/WARC_ISO_28500_version1_latestdraft.pdf
- [warc2text](../warc2text) -- Extracts plain text, language identification and more metadata from WARC records.
- [libwebp](./libwebp)
- [libwebsocketpp](./libwebsocketpp)
- [libwebsockets](./libwebsockets)
- [libxml2](./libxml2) -- [libxml](http://xmlsoft.org/): XML read/write
- [libyaml](./libyaml) -- YAML
- [libcyaml](../libcyaml)
- [libyaml-examples](../libyaml-examples)
- [libfyaml](../libfyaml)
- [yaml-test-suite](../yaml-test-suite)
- [yaml-cpp](../yaml-cpp)
- [rapidyaml](../rapidyaml)
- [libzip](./libzip) -- a C library for reading, creating, and modifying zip and zip64 archives.
- [libzmq](./libzmq)
- [LightLDA](./LightLDA)
- [Lightning.NET](./Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
- [ligra-graph](./ligra-graph)
- [linenoise](./linenoise)
- ~~[lizard](./lizard)~~
- [lmdb-safe](./lmdb-safe)
- [lmdb-store](./lmdb-store)
- [lmdb.spreads.net](./lmdb.spreads.net)
- [lmdb](./lmdb)
- [lmdbxx](./lmdbxx) -- LMDB C++ wrapper
- [log4cplus](./log4cplus)
- [lua](./lua)
- [luaJIT](./luaJIT)
- [lz4](./lz4)
- ~~[lzo](./lzo)~~
- ~~[lzsse](./lzsse)~~
- [magic_enum](./magic_enum)
- [manticore-columnar](../manticore-columnar)
- [manticoresearch](../manticoresearch)
- [manticore-plugins](../manticore-plugins)
- [many-stop-words](./many-stop-words)
- [math-atlas](./math-atlas)
- [mcmc](./mcmc)
- [messagebox-windows](./messagebox-windows) -- drive `MessageBox` and `MessageBeep` Win32 APIs
- [mht-rip](./mht-rip) -- as I have several HTML pages stored in this MHTML format. See also CHM: `CHM-lib`
- [mimalloc](./mimalloc) -- a compact general purpose allocator with excellent performance.
- [mime-mega](../mime-mega) -- MIME extract/insert/encode/decode: use for MHTML support
- [mimetic](./mimetic) -- MIME: use for MHTML support
- [mipp](./mipp) -- MyIntrinsics++ (MIPP): a portable wrapper for vector intrinsic functions (SIMD) written in C++11. It works for SSE, AVX, AVX-512 and ARM NEON (32-bit and 64-bit) instructions.
- [MITIE-nlp](./MITIE-nlp)
- [mlpack](./mlpack)
- [mmc](./mmc)
- [morton_filter](./morton_filter)
- [mujs](../mujs)
- [multiverso](../multiverso): a parameter server based framework for training machine learning models on big data with numbers of machines. It is currently a standard C++ library and provides a series of friendly programming interfaces. Now machine learning researchers and practitioners do not need to worry about the system routine issues such as distributed model storage and operation, inter-process and inter-thread communication, multi-threading management, and so on. Instead, they are able to focus on the core machine learning logics: data, model, and training.
- [nanoflann](../nanoflann): a C++11 header-only library for building KD-Trees of datasets with different topologies: R^2, R^3 (point clouds), SO(2) and SO(3) (2D and 3D rotation groups). No support for approximate NN is provided. This library is a fork of the `flann` library by Marius Muja and David G. Lowe, and born as a child project of `MRPT`.
- [nanosvg](./nanosvg)
- [ncnn](./ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
- [neutralinoJS-CLI](./neutralinoJS-CLI)
- [neutralinoJS](./neutralinoJS)
- [nmslib](../nmslib): Non-Metric Space Library (NMSLIB) is an efficient cross-platform similarity search library and a toolkit for evaluation of similarity search methods. The core-library does not have any third-party dependencies. It has been gaining popularity recently. In particular, it has become a part of Amazon Elasticsearch Service. The goal of the project is to create an effective and comprehensive toolkit for searching in generic and non-metric spaces. Even though the library contains a variety of metric-space access methods, our main focus is on generic and approximate search methods, in particular, on methods for non-metric spaces. NMSLIB is possibly the first library with a principled support for non-metric space searching.
- ~~[oatpp](./oatpp) -- IPC / server framework~~
- [olena](./olena)
- [oneTBB](./oneTBB) -- Intel's Thread Building Blocks library: used with OpenImageIO, ...
- [opencv](./opencv)
- [opencv_contrib](./opencv_contrib)
- [OpenEXR](./OpenEXR) -- lossless format for multi-layered images. Professional use. (I've used it before; nice file format.)
- [OpenImageIO](./OpenImageIO)
- [openjpeg](../openjpeg)
- [OpenSSL](./openssl) -- also used by cURL et al, incidentally.
- [OptimizationTemplateLibrary](./OptimizationTemplateLibrary) -- Optimization Template Library (OTL)
- [otl](../otl) -- Oracle Template Library (STL-like wrapper for SQL DB queries; supports many databases besides Oracle)
- [palmtree](./palmtree) -- concurrent lock free B+Tree
- [parallel-hashmap](./parallel-hashmap) -- a set of hash map implementations, as well as a btree alternative to std::map and std::set
- [pcg-c-random](./pcg-c-random) -- fast random generators
- [pcre](./pcre)
- [phf-hash](./phf-hash)
- [photino.native](../photino.native)
- [picohttpparser](./picohttpparser)
- [pisa](../pisa): a text search engine able to run on large-scale collections of documents. It allows researchers to experiment with state-of-the-art techniques, allowing an ideal environment for rapid development. PISA is a text search engine, though the "PISA Project" is a set of tools that help experiment with indexing and query processing. Given a text collection, PISA can build an inverted index over this corpus, allowing the corpus to be searched. The inverted index, put simply, is an efficient data structure that represents the document corpus by storing a list of documents for each unique term (see here). At query time, PISA stores its index in main memory for rapid retrieval.
- ~~[pithy](./pithy)~~
- [plf_nanotimer](./plf_nanotimer) -- high precision cross-platform performance timer
- [pmt-png-tools](./pmt-png-tools)
- [preprocess-corpuses](../preprocess-corpuses) -- Pipelines for preprocessing corpora.
- [prio_queue](./prio_queue) -- a cache friendly priority queue, done as a B-heap.
- [promise-cpp](./promise-cpp) -- advanced C++ promise/A+ library in Javascript style
- [promise-hpp](../promise-hpp): C++ asynchronous promises like a Promises/A+
- [protobuf](./protobuf)
- [proxygen](./proxygen)
- [pthread-win32](./pthread-win32)
- [pytorch](./pytorch) -- PyTorch library in C++
- [QuickJS-C++-Wrapper](./QuickJS-C++-Wrapper)
- [QuickJS-C++-Wrapper2](../QuickJS-C++-Wrapper2)
- [QuickJS](./QuickJS)
- [randen](../randen): What if we could default to attack-resistant random generators without excessive CPU cost? We introduce 'Randen', a new generator with security guarantees; it outperforms MT19937, pcg64_c32, Philox, ISAAC and ChaCha8 in real-world benchmarks. This is made possible by AES hardware acceleration and a large Feistel permutation.
- [rapidJSON](./rapidJSON)
- [re2](./re2)
- [replxx](./replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
- [resumable-assert](./resumable-assert)
- [scantailor](./scantailor) -- [scantailor_advanced](https://github.com/4lex4/scantailor-advanced) is the [ScanTailor](https://github.com/scantailor/scantailor) version that merges the features of the *ScanTailor Featured* and *ScanTailor Enhanced* versions, brings new ones and fixes. ScanTailor is an interactive post-processing tool for scanned pages. It performs operations such as page splitting, deskewing, adding/removing borders, selecting content, ... and many others.
- [ScriptX](./ScriptX/) -- wrapper for V8, QuickJS, Lua, Python, ...
- [Sealighter](../Sealighter): Sysmon-Like research tool for ETW: helps non-developers dive into researching Event Tracing for Windows (ETW) and Windows PreProcessor Tracing (WPP).
- [sentence-tokenizer](./sentence-tokenizer) -- text tokenization
- [sentencepiece](./sentencepiece) -- text tokenization
- [shoco](./shoco) -- a fast compressor for short strings
- [SilkETW](../SilkETW): SilkETW & SilkService are flexible C# wrappers for ETW, they are meant to abstract away the complexities of ETW and give people a simple interface to perform research and introspection. While both projects have obvious defensive (and offensive) applications they should primarily be considered as research tools.
- [smhasher](../smhasher) -- benchmark and collection of fast hash functions for symbol tables or hash tables.
- ~~[snappy](./snappy)~~
- [snmalloc](./snmalloc) -- a high-performance allocator.
- [sparsehash](./sparsehash) -- fast hash algorithms
- ~~[spdlog](./spdlog)~~
- [spy-build-sysinfo](./spy-build-sysinfo) -- build system info
- [sqlite-amalgamation](./sqlite-amalgamation)
- [sqlite](./sqlite)
- [sqlite3pp](./sqlite3pp) -- a minimal ORM wrapper for SQLite et al.
- [SQLiteCpp](../SQLiteCpp) -- a smart and easy to use C++ SQLite3 wrapper. SQLiteC++ offers an encapsulation around the native C APIs of SQLite, with a few intuitive and well documented C++ classes.
- ~~[squash](./squash)~~
- [stdext-path](./stdext-path) -- path manipulations (`dirname` et al)
- [stopwords](./stopwords)
- [subprocess](./subprocess)
- [svg-charter](./svg-charter) -- SVG chart renderer
- [taskflow](./taskflow)
- [tessconfigs](../tessconfigs)
- [tessdata](../tessdata)
- [tessdata_best](../tessdata_best)
- [tessdata_contrib](../tessdata_contrib)
- [tessdata_fast](../tessdata_fast)
- [tessdoc](../tessdoc)
- [tesseract](../tesseract)
- [tesseract_docs](../tesseract_docs)
- [tesseract_langdata](../tesseract_langdata)
- [tesstrain](../tesstrain)
- [thread-pool-c](./thread-pool-c)
- [thread-pool-cpp](./thread-pool-cpp)
- [thread-pool](./thread-pool)
- [thunderSVM](./thunderSVM)
- [ticpp](./ticpp) -- TinyXML++: XML read/write
- [tidy-html5](./tidy-html5) -- clean up HTML documents before archiving/processing
- [tiny-process-library](./tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
- [tinyexpr](./tinyexpr)
- [tlx-btree](./tlx-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- [tlx](./tlx) -- a collection of C++ helpers and extensions universally needed, but not found in the STL.
- [tomlpp](../tomlpp) -- TOML++
- [tracelogging-for-ETW](../tracelogging-for-ETW): C++ Wrapper for Windows ETW TraceLogging
- [tre](./tre)
- [tsf](./tsf) -- type-safe printf equivalent for C++ (used by the uberlog submodule)
- [txiki](./txiki.js) -- uses QuickJS as its kernel
- [uberlog](./uberlog) -- a cross platform C++ logging system that is focused on fast and small, writing to a shared memory ring buffer.
- [uchardet](../uchardet) -- [uchardet](https://www.freedesktop.org/wiki/Software/uchardet/) is an encoding and language detector library, which attempts to determine the encoding of the text. It can reliably detect many charsets. Moreover it also works as a very good and fast language detector.
- [ucto](./ucto) -- text tokenization
- [uctodata](./uctodata) -- data for `ucto` library
- [UIforETW](../UIforETW): Bruce Dawson's user interface for recording ETW (Event Tracing for Windows) traces, which allow amazingly deep investigations of performance problems on Windows.
- [uint128_t](./uint128_t)
- [unicode-cldr](./unicode-cldr)
- [unicode-icu](./unicode-icu)
- [upscaledb](../upscaledb) -- a.k.a. hamsterdb: a thread-safe key/value database engine. It supports a B+Tree index structure, uses memory mapped I/O (if available), fast Cursors and variable length keys and can create In-Memory Databases.
- [upskirt-markdown](./upskirt-markdown) -- MarkDown renderer
- [url](./url) -- URI parsing and other utility functions
- [velocypack](../velocypack): a fast and compact format for serialization and storage.  These days, JSON (JavaScript Object Notation, see ECMA-404) is used in many cases where data has to be exchanged. Lots of protocols between different services use it, databases store JSON (document stores naturally, but others increasingly as well). It is popular, because it is simple, human-readable, and yet surprisingly versatile, despite its limitations. At the same time there is a plethora of alternatives ranging from XML over Universal Binary JSON, MongoDB's BSON, MessagePack, BJSON (binary JSON), Apache Thrift till Google's protocol buffers and ArangoDB's shaped JSON. When looking into this, we were surprised to find that none of these formats manages to combine compactness, platform independence, fast access to sub-objects and rapid conversion from and to JSON.
- [VisualScriptEngine](../VisualScriptEngine) -- A visual scripting engine designed for embedding. The engine is written in modern C++ and compiles on several platforms with no external dependencies.
- [websocket-sharp](./websocket-sharp)
- [webview](./webview)
- [wget](./wget)
- [Windows10EtwEvents](../Windows10EtwEvents): Events from all manifest-based and mof-based ETW providers across Windows 10 versions.
- [WinHttpPAL](./WinHttpPAL) -- implements [WinHttp API](https://docs.microsoft.com/en-us/windows/win32/winhttp/winhttp-start-page) Platform Abstraction Layer for POSIX systems using libcurl
- [wxCharts](./wxCharts)
- [wxExamples](../wxExamples)
- [wxFormBuilder](../wxFormBuilder)
- [wxMEdit](../wxMEdit) -- a cross-platform Text/Hex Editor written in C++ & wxWidgets. wxMEdit supports many useful functions, e.g. Bookmark, Syntax Highlightings, Word Wraps, Encodings and Column/Hex Modes.
- [wxWidgets](./wxWidgets)
- [wxPDFView](./wxPDFView) -- wxWidgets PDF viewer/reader control
- [wxSQLite3](../wxSQLite3) -- a C++ wrapper around the SQLite 3.x database and is specifically designed for use in programs based on the wxWidgets library. **wxSQLite3** does not try to hide the underlying database, in contrary almost all special features of the current SQLite3 version are supported, like for example the creation of user defined scalar or aggregate functions.
- [wxVisualScriptEngine](../wxVisualScriptEngine) -- a utility module for [VisualScriptEngine](https://github.com/kovacsv/VisualScriptEngine) which provides helper classes for embedding the engine in a wxWidgets application.
- [wxWebViewChromium](./wxWebViewChromium) -- Chromium CEF3-based embedded browser for wxWidgets
- [xgboost](../xgboost): an optimized distributed gradient boosting library designed to be highly efficient, flexible and portable. It implements machine learning algorithms under the Gradient Boosting framework. XGBoost provides a parallel tree boosting (also known as GBDT, GBM) that solve many data science problems in a fast and accurate way. The same code runs on major distributed environment (Kubernetes, Hadoop, SGE, MPI, Dask) and can solve problems beyond billions of examples.
- [xml-pugixml](./xml-pugixml)
- [XMP-Toolkit-SDK](./XMP-Toolkit-SDK)
- [xsimd](./xsimd) -- xtensor core library
- [xtensor-blas](./xtensor-blas)
- [xtensor-io](./xtensor-io)
- [xtensor](./xtensor)
- [xtl](./xtl) -- xtensor core library
- [xxHash](./xxHash) -- fast hash algorithm
- [xz-utils](./xz-utils)
- [yara-pattern-matcher](./yara-pattern-matcher) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks
- [you-token-to-me](./you-token-to-me) -- text tokenization
- [yyjson](./yyjson)
- [zlib](../zlib)
- ~~[zlog](./zlog)~~
- [zstd](./zstd)
- [librsync](../librsync) -- a library for calculating and applying network deltas. librsync encapsulates the core algorithms of the rsync protocol.
- [zsync2](../zsync2) -- the advanced file download/sync tool zsync. zsync is a well known tool for downloading and updating local files from HTTP servers using the well known algorithms rsync.
- [csync2](../csync2) -- a cluster synchronization tool. It can be used to keep files on multiple hosts in a cluster in sync. Csync2 can handle complex setups with much more than just 2 hosts, handle file deletions and can detect conflicts.






## Libraries not available in this collection but already part of `mupdf`

- [cURL](../curl)
- [extract](../extract)
- [freeglut](../freeglut)
- [freetype](../freetype)
- [gumbo-parser](../gumbo-parser)
- [harfbuzz](../harfbuzz)
- [jbig2dec](../jbig2dec)
- [jpeginfo](../jpeginfo)
- [langdata_LSTM](../langdata_LSTM)
- [lcms2](../lcms2)
- [leptonica](../leptonica)
- [libjpeg](../libjpeg)
- [libpng](../libpng)
- [libtiff](../libtiff)
- [mujs](../mujs)
- [openjpeg](../openjpeg)
- [tessconfigs](../tessconfigs)
- [tessdata](../tessdata)
- [tessdata_best](../tessdata_best)
- [tessdata_contrib](../tessdata_contrib)
- [tessdata_fast](../tessdata_fast)
- [tessdoc](../tessdoc)
- [tesseract](../tesseract)
- [tesseract_docs](../tesseract_docs)
- [tesseract_langdata](../tesseract_langdata)
- [tesstrain](../tesstrain)
- [zlib](../zlib)
























- [fast_pfor](../fast_pfor): a research library with integer compression schemes. It is broadly applicable to the compression of arrays of 32-bit integers where most integers are small. The library seeks to exploit SIMD instructions (SSE) whenever possible.
- [portable-memory-mapping](../portable-memory-mapping): portable Memory Mapping C++ Class (Windows/Linux)
- [libmio](../libmio): An easy to use header-only cross-platform C++11 memory mapping library. `mio` has been created with the goal to be easily includable (i.e. no dependencies) in any C++ project that needs memory mapped file IO without the need to pull in Boost.
- [libvrb](../libvrb): implements a ring buffer, also known as a character FIFO or circular buffer, with a special property that any data present in the buffer, as well as any empty space, are always seen as a single contiguous extent by the calling program.  This is implemented with virtual memory mapping by creating a mirror image of the buffer contents at the memory location in the virtual address space immediately after the main buffer location.  This allows the mirror image to always be seen without doing any copying of data.
- [fmtlog](../fmtlog): a performant fmtlib-style logging library with latency in nanoseconds (i.e. using fmt library format).
- [libcnl](../libcnl): The Compositional Numeric Library (CNL) is a C++ library of fixed-precision numeric classes which enhance integers to deliver safer, simpler, cheaper arithmetic types. CNL is particularly well-suited to: (1) compute on energy-constrained environments where FPUs are absent or costly; (2) compute on energy-intensive environments where arithmetic is the bottleneck such as simulations, machine learning applications and DSPs; and (3) domains such as finance where precision is essential.
- [libucl](../libucl): the configuration language called UCL - Universal Configuration Language.  UCL is heavily infused by nginx configuration as the example of a convenient configuration system. However, UCL is fully compatible with JSON format and is able to parse json files.
- [libquill](../libquill): a cross-platform low latency logging library based on C++14.
- [NanoLog](../NanoLog): an extremely performant nanosecond scale logging system for C++ that exposes a simple printf-like API and achieves over 80 million logs/second at a median latency of just over 7 nanoseconds.
- [libwil](../libwil): The Windows Implementation Libraries (WIL) is a header-only C++ library created to make life easier for developers on Windows through readable type-safe C++ interfaces for common Windows coding patterns.
- [libzopfli](../libzopfli): Zopfli Compression Algorithm is a compression library programmed in C to perform very good, but slow, deflate or zlib compression.
- [libwildmatch](../libwildmatch): wildmatch is a BSD-licensed C/C++ library for git/rsync-style pattern matching.
- [libsqlfs](../libsqlfs): a POSIX style file system on top of an SQLite database.  It allows applications to have access to a full read/write file system in a single file, complete with its own file hierarchy and name space.  This is useful for applications which needs structured storage, such as embedding documents within documents, or management of configuration data or preferences.
- [sqlean](../sqlean): The ultimate set of SQLite extensions: SQLite has few functions compared to other database management systems. SQLite authors see this as a feature rather than a problem, because SQLite has an extension mechanism in place. There are a lot of SQLite extensions out there, but they are incomplete, inconsistent and scattered across the internet. sqlean brings them together, neatly packaged into domain modules, documented, tested, and built for Linux, Windows and macOS.
- [sqlite-stats](../sqlite-stats): provides common statistical functions for SQLite.
- [SQLiteHistograms](../SQLiteHistograms): an SQLite extension library for creating histogram tables, tables of ratio between histograms and interpolation tables of scatter point tables.
- [sqlite-fts5-snowball](../sqlite-fts5-snowball): a simple extension for use with FTS5 within SQLite. It allows FTS5 to use Martin Porter's Snowball stemmers (libstemmer), which are available in several languages. Check http://snowballstem.org/ for more information about them.
- [sqlite_wrapper](../sqlite_wrapper): an easy-to-use, lightweight and concurrency-friendly SQLite wrapper written in C++17.
- [libdeflate](../libdeflate): heavily optimized library for DEFLATE/zlib/gzip compression and decompression.
- [libCRCpp](../libCRCpp): easy to use and fast C++ CRC library.
- [ms_cpp_client_telemetry](../ms_cpp_client_telemetry): 1DS C/C++ SDK enables cross-platform telemetry collection from various Microsoft products. It enables data / telemetry upload to Collector++. 1DS (One Data Strategy), also known as One Observability, is a cross-org initiative with five teams across the company coming together to unify multiple telemetry efforts at Microsoft. Collector++ is the externally-facing destination end-point where telemetry data is uploaded to that subsequently routes the data to Microsoft internal data pipeline.
- [typesense](../typesense): a fast, typo-tolerant search engine for building delightful search experiences. Open Source alternative to Algolia and an Easier-to-Use alternative to ElasticSearch. ⚡🔍✨ Fast, typo tolerant, in-memory fuzzy Search Engine for building delightful search experiences.
- [dtoa-benchmark](../dtoa-benchmark): This benchmark evaluates the performance of conversion from double precision IEEE-754 floating point (double) to ASCII string.
- [Extensible-Storage-Engine](../Extensible-Storage-Engine): ESE is an embedded / ISAM-based database engine, that provides rudimentary table and indexed access. However the library provides many other strongly layered and and thus reusable sub-facilities as well: A Synchronization / Locking library, a Data-structures / STL-like library, an OS-abstraction layer, and a Cache Manager, as well as the full-blown database engine itself.
- [pthreadpool](../pthreadpool): pthreadpool is a portable and efficient thread pool implementation. It provides similar functionality to `#pragma omp parallel for`, but with additional features.
- [lrucache11](../lrucache11): A header only C++11 LRU Cache template class that allows you to define key, value and optionally the `Map` type. uses a double linked list and a `std::unordered_map` style container to provide fast insert, delete and update No dependencies other than the C++ standard library. 
- [CTPL-Thread-Pool](../CTPL-Thread-Pool): Modern and efficient C++ Thread Pool Library. More specifically, there are some threads dedicated to the pool and a container of jobs. The jobs come to the pool dynamically. A job is fetched and deleted from the container when there is an idle thread. The job is then run on that thread.
- [portable_concurrency-std-future](../portable_concurrency-std-future): Portable implementation of future/promise API in C++. `std::future` done right.
- [YACLib](../YACLib): YACLib is a lightweight C++ library for concurrent and parallel task execution.
- [taolog](../taolog): A Win32 logger based on DebugView & ETW.
- [opentelemetry-cpp](../opentelemetry-cpp): The OpenTelemetry C++ Client
- [pelikan](../pelikan): Pelikan is Twitter's unified cache backend.
- [microsoft-performance-toolkit-sdk](../microsoft-performance-toolkit-sdk): The Microsoft Performance Toolkit is a collection of cross-platform tools developers can use to create and extend performance analysis applications. It serves as the runtime of the Windows Performance Analyzer, a Windows program included in the Windows Performance Toolkit. By using the Microsoft Performance Toolkit SDK, Windows Performance Analyzer - or any performance analysis application - can be configured to process and display performance data from arbitrary sources.
- [oppat](../oppat): Open Power/Performance Analysis Tool (OPPAT) is a cross-OS, cross-architecture Power and Performance Analysis Tool. cross-OS: supports Windows ETW trace files and Linux/Android perf/trace-cmd trace files. cross-architecture: supports Intel and ARM chips hardware events (using perf and/or PCM).
- [compact_enc_det](../compact_enc_det): Compact Encoding Detection (CED for short) is a library written in C++ that scans given raw bytes and detect the most likely text encoding.
- [tink](../tink): A multi-language, cross-platform library that provides cryptographic APIs that are secure, easy to use correctly, and hard(er) to misuse.
- [highwayhash](../highwayhash): Fast strong hash functions: SipHash/HighwayHash
- [nsync](../nsync): a C library that exports various synchronization primitives. `nsync` may be desirable in place of `pthread` primitives in some cases:  (1) nsync locks are reader-writer locks (but are as efficient as mutexes).  (2) nsync locks and condition variables occupy only two words each.  (3) nsync works on Unix-like systems and Windows.  It should be portable to other platforms straightforwardly.  (4) nsync provides conditional critical sections.  These fill the same role as condition variables, but are usually easier to use, and in most common cases are comparable in speed.  They can be easier to use in two ways:  (A) it's not necessary to surround the "wait" operation in a while loop; instead the condition is passed to the call as a function and arbitrary pointer argument.  (B) it's not necessary to wake or signal explicitly when the condition(s) become true; they are checked automatically. The primary downsides are:  (A) they are not available in most other common synchronization APIs, and so they may be unfamiliar (even though they date back to the 1960s), and (B) if threads routinely wait on many distinct, false conditions associated with the same lock, they may be slower than condition variables. In this case, clients can use condition variables in the normal way; conditional critical sections and condition variables can be used with the same lock.  (5) nsync waits can be cancelled via an object passed to the wait calls, unlike the pthread model in which threads are cancelled.  This difference can be useful if the computation needs multiple threads, or if cancellation affects only sub-operations within a larger operation by the thread.
- [zfp-compressed-arrays](../zfp-compressed-arrays): zfp is a compressed format for representing multidimensional floating-point and integer arrays. zfp provides compressed-array classes that support high throughput read and write random access to individual array elements. zfp also supports serial and parallel (OpenMP and CUDA) compression of whole arrays, e.g., for applications that read and write large data sets to and from disk.


- [ThreadPool](../ThreadPool):
- [TraceETW](../TraceETW):
- [random](../random):
- [wyhash](../wyhash):
- [xnnpack](../xnnpack):
- [merror](../merror):
- [kahypar](../kahypar):
- [flat_hash_map](../flat_hash_map):
- [pagerank](../pagerank):
- [graphit](../graphit):
- [libgrape-lite](../libgrape-lite):
- [concurrencpp](../concurrencpp):
- [lerc](../lerc):
- [stx-error-handling](../stx-error-handling):
- [result-cpp](../result-cpp):
- [delegate](../delegate):
- [robin-map](../robin-map):
- [hopscotch-map](../hopscotch-map):
- [ocreval](../ocreval):
- [asio](../asio):
- [highway](../highway):
- [tinycolormap](../tinycolormap):
