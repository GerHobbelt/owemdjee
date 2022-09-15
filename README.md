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

- **ScriptX** [📁](./ScriptX) [🌐](https://github.com/GerHobbelt/ScriptX) -- Tencent's [ScriptX](https://github.com/Tencent/ScriptX) is a script engine abstraction layer. A variety of script engines are encapsulated on the bottom and a unified API is exposed on the top, so that the upper-layer caller can completely isolate the underlying engine implementation (back-end).

  ScriptX not only isolates several JavaScript engines (e.g. V8 and QuickJS), but can even isolate different scripting languages, so that the upper layer can seamlessly switch between scripting engine and scripting language without changing the code.

**UPDATE 2021/June**: jerryscript, duktape, XS/moddable, escargot: these have been dropped as we picked QuickJS. After some initial hassle with that codebase, we picked a different branch to test, which was cleaner and compiled out of the box (CMake > MSVC), which is always a good omen for a codebase when you have cross-platform portability in mind.



---

# Libraries we're looking at for this *intent*:

- **IPC: flatbuffer et al for protocol design**:

    - **bebop** [📁](./bebop) [🌐](https://github.com/GerHobbelt/bebop)
    - ~~**FastBinaryEncoding** [🌐](https://github.com/chronoxor/FastBinaryEncoding)~~
      + **removed**; reason: for binary format record serialization we will be using `bebop` exclusively. All other communications will be JSON/JSON5/XML based.
    - ~~**flatbuffers** [🌐](https://github.com/google/flatbuffers)~~
      + **removed**; reason: see `protobuf`: same smell rising. Faster at run time, but still a bit hairy to my tastes while `bebop` et al are on to something *potentially nice*.
    - ~~**flatcc** [🌐](https://github.com/dvidelabs/flatcc)~~
      + **removed**; reason: see `flatbuffers`. When we don't dig `flatbuffers`, then `flatcc` is automatically pretty useless to us. Let's rephrase that professionally: "`flatcc` has moved out of scope for our project."
    - **cereal** [📁](./cereal) [🌐](https://github.com/GerHobbelt/cereal) -- C++11 serialization library
    - ZeroMQ a.k.a. ØMQ:
        + **libzmq** [📁](./libzmq) [🌐](https://github.com/GerHobbelt/libzmq) -- ZeroMQ core engine in C++, implements [ZMTP/3.1](https://zguide.zeromq.org/).
        + **cppzmq** [📁](./cppzmq) [🌐](https://github.com/GerHobbelt/cppzmq) -- header-only C++ binding for libzmq.
        + **libCZMQ** [📁](./libCZMQ) [🌐](https://github.com/GerHobbelt/czmq) -- High-level C binding for ØMQ. (http://czmq.zeromq.org/)
    - ~~**libsmile** [🌐](https://github.com/pierre/libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format~~
      + **removed**; reason: for binary format record serialization we will be using `bebop` exclusively. All other communications will be JSON/JSON5/XML based.
    - ~~**protobuf** [🌐](https://github.com/protocolbuffers/protobuf)~~
      + **removed**; reason: relatively slow run-time and (in my opinion) rather ugly & convoluted approach at build time. Has too much of a Java/CorporateProgramming smell, which has not lessened over the years, unfortunately.
    - ~~**SWIG** [🌐](https://swig.readthedocs.io/en/latest/Manual/SWIG.html) (*not included; more suitable for RPC than what we have in mind, which is purely data messages enchange*)~~
    - **velocypack** [📁](./velocypack) [🌐](https://github.com/GerHobbelt/velocypack) -- a fast and compact format for serialization and storage.  These days, JSON (JavaScript Object Notation, see ECMA-404) is used in many cases where data has to be exchanged. Lots of protocols between different services use it, databases store JSON (document stores naturally, but others increasingly as well). It is popular, because it is simple, human-readable, and yet surprisingly versatile, despite its limitations. At the same time there is a plethora of alternatives ranging from XML over Universal Binary JSON, MongoDB's BSON, MessagePack, BJSON (binary JSON), Apache Thrift till Google's protocol buffers and ArangoDB's shaped JSON. When looking into this, we were surprised to find that none of these formats manages to combine compactness, platform independence, fast access to sub-objects and rapid conversion from and to JSON.

- **IPC: websockets, etc.: all communication means**

    - **libwebsocketpp** [📁](./libwebsocketpp) [🌐](https://github.com/GerHobbelt/websocketpp) -- WebSocket++ is a header only C++ library that implements RFC6455 The WebSocket Protocol.
    - **libwebsockets** [📁](./libwebsockets) [🌐](https://github.com/GerHobbelt/libwebsockets) -- a simple-to-use C library providing client and server for HTTP/1, HTTP/2, WebSockets, MQTT and other protocols. It supports a lot of lightweight ancilliary implementations for things like JSON, CBOR, JOSE, COSE. It's very gregarious when it comes to event loop sharing, supporting libuv, libevent, libev, sdevent, glib and uloop, as well as custom event libs.
    - **websocket-sharp** [📁](./websocket-sharp) [🌐](https://github.com/GerHobbelt/websocket-sharp) -- a C# implementation of the WebSocket protocol client and server.
    - **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- also used by cURL et al, incidentally.
    - **crow** [📁](./crow) [🌐](https://github.com/GerHobbelt/crow) -- IPC / server framework

      Interface looks nicer than `oatpp`...
    - ~~**oatpp** [🌐](https://github.com/oatpp/oatpp) -- IPC / server framework~~
      + **removed**; reason: see `crow`. We have picked `crow` as the preferred way forward, so any similar/competing product is out of scope unless `crow` throws a tantrum on our test bench after all, the chances of that being *very slim*.
    - ~~**ice** [🌐](https://github.com/zeroc-ice/ice) -- Comprehensive RPC Framework: helps you network your software with minimal effort.~~
      + **removed**; reason: has a strong focus on the *remote*, i.e. `R` in `RPC` (thus a focus on things such as encryption, authentication, firewalling, etc.), which we don't want or need: all services are supposed to run on a single machine and comms go through `localhost` *only*. When folks find they need to distribute the workload across multiple machines, then we'll be entering a new era in Qiqqa usage and then will be soon enough to (re-)investigate the usefulness of this package.

        Also, we are currently more interested in *fast data serialization* then RPC *per se* as we aim for a solution that's more akin to a REST API interface style.

    - **WinHttpPAL** [📁](./WinHttpPAL) [🌐](https://github.com/GerHobbelt/WinHttpPAL) -- implements [WinHttp API](https://docs.microsoft.com/en-us/windows/win32/winhttp/winhttp-start-page) Platform Abstraction Layer for POSIX systems using libcurl
    - ZeroMQ a.k.a. ØMQ:
        + **libzmq** [📁](./libzmq) [🌐](https://github.com/GerHobbelt/libzmq) -- ZeroMQ core engine in C++, implements [ZMTP/3.1](https://zguide.zeromq.org/).
        + **cppzmq** [📁](./cppzmq) [🌐](https://github.com/GerHobbelt/cppzmq) -- header-only C++ binding for libzmq.
        + **libCZMQ** [📁](./libCZMQ) [🌐](https://github.com/GerHobbelt/czmq) -- High-level C binding for ØMQ. (http://czmq.zeromq.org/)

- **IPC: JSON for protocol design**:

    - **json** [📁](./json) [🌐](https://github.com/GerHobbelt/nlohmann-json) -- N. Lohmann's JSON for Modern C++.
    - **json-jansson** [📁](./json-jansson) [🌐](https://github.com/GerHobbelt/jansson)
    - **rapidJSON** [📁](./rapidJSON) [🌐](https://github.com/GerHobbelt/rapidjson) -- TenCent's fast JSON parser/generator for C++ with both SAX & DOM style APIs.
    - **yyjson** [📁](./yyjson) [🌐](https://github.com/GerHobbelt/yyjson) -- allegedly the fastest JSON library in C.
    - ~~**libsmile** [🌐](https://github.com/pierre/libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format~~
      + **removed**; reason: I think we'dd better standardize on using one or more of these:
        - JSON
        - XML
        - YAML
        - TOML
        - custom binary exchange formats for those interchanges that demand highest performance and MAY carry large transfer loads.

- ~~**IPC: YAML, TOML, etc. for protocol design**~~:

    **Not considered**: reason: when we want the IPC protocol to be "human readable" in any form/approximation, we've decided to stick with JSON or XML (if we cannot help it -- I particularly dislike the verbosity and tag redundancy (open+close) in XML and consider it a lousy design choice for *any* purpose).

    The more human readable formats (YAML, TOML, ...) are intended for human to machine communications, e.g. for feeding configurations into applications, and **SHOULD NOT** be used for IPC anywhere. (Though I must say I'm on the fence where it comes using YAML as an alternative IPC format where it replaces JSON; another contender there are the JSON5/JSON6 formats.)

- **content hashing** (cryptographic strength i.e. *"guaranteed"* collision-free)

    The bit about **_"guaranteed"_ collision-free** is to be read as: hash algorithms in this section must come with *strong statistical guarantees* that any chance at a **hash collision** is negligible, even for *extremely large* collections. In practice this means: use *cryptographic* hash algorithms with a *strength* of 128 bits or more. (Qiqqa used a b0rked version SHA1 thus far, which is considered too weak as we already sample PDFs which cause a hash collision for the *official* SHA1 algo (and thus also collide in our b0rked SHA1 variant): while those can still be argued to be fringe case, I don't want to be bothered with this at all and thus choose to err on the side of 'better than SHA1B' here. Meanwhile, any library in here *may* contain weaker cryptographic hashes alongside: we won't be using those for **content hashing**.

    - **BLAKE3** [📁](./BLAKE3) [🌐](https://github.com/GerHobbelt/BLAKE3) -- cryptographic hash
    - **cryptopp** [📁](./cryptopp) [🌐](https://github.com/GerHobbelt/cryptopp) -- crypto library
    - **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- its crypto library part, more specifically.
    - **tink** [📁](./tink) [🌐](https://github.com/GerHobbelt/tink) -- A multi-language, cross-platform library that provides cryptographic APIs that are secure, easy to use correctly, and hard(er) to misuse.

- **hash-like filters & fast hashing for hash tables** et al (64 bits and less, mostly)

    These hashes are for other purposes, e.g. fast lookup in dictionaries, fast approximate hit testing and set reduction through fast filtering (think *bloom filter*). These *may* be **machine specific** (and some of them *are*): these are **never supposed to be used for encoding in storage or other means which crosses machine boundaries**: if you want to use them for a database index, that is fine *as long as* you don't expect that database index to be readable by any other machine than the one which produced and uses these hash numbers.

    > As you can see from the list below, I went on a shopping spree, having fun with all the latest, including some *possibly insane* stuff that's only really useful for particular edge cases -- which we *hope to avoid ourselves, for a while at least*. Anyway, I'ld say we've got the motherlode here. Simple fun for those days when your brain-flag is at half-mast. Enjoy.

    + **sparsehash** [📁](./sparsehash) [🌐](https://github.com/GerHobbelt/sparsehash) -- fast (non-cryptographic) hash algorithms
    + **xxHash** [📁](./xxHash) [🌐](https://github.com/GerHobbelt/xxHash) -- fast (non-cryptographic) hash algorithm
    + **circlehash** [📁](./circlehash) [🌐](https://github.com/GerHobbelt/circlehash) -- a family of non-cryptographic hash functions that pass every test in SMHasher.
    + **smhasher** [📁](./smhasher) [🌐](https://github.com/GerHobbelt/smhasher) -- benchmark and collection of fast hash functions for symbol tables or hash tables.
    + **BBHash** [📁](./BBHash) [🌐](https://github.com/GerHobbelt/BBHash) -- Bloom-filter based minimal perfect hash function library.
    + **BCF-cuckoo-index** [📁](./BCF-cuckoo-index) [🌐](https://github.com/GerHobbelt/BCF) -- Better Choice Cuckoo Filter (BCF) is an efficient approximate set representation data structure. Different from the standard Cuckoo Filter (CF), BCF leverages the principle of the power of two choices to select the better candidate bucket during insertion. BCF reduces the average number of relocations of the state-of-the-art CF by 35%.
    + **cmph-hasher** [📁](./cmph-hasher) [🌐](https://github.com/GerHobbelt/cmph) -- C Minimal Perfect Hashing Library for both small and (very) large hash sets.
    + **cuckoo-index** [📁](./cuckoo-index) [🌐](https://github.com/GerHobbelt/cuckoo-index) -- Cuckoo Index (CI) is a lightweight secondary index structure that represents the many-to-many relationship between keys and partitions of columns in a highly space-efficient way. CI associates variable-sized fingerprints in a Cuckoo filter with compressed bitmaps indicating qualifying partitions. The problem of finding all partitions that possibly contain a given lookup key is traditionally solved by maintaining one filter (e.g., a Bloom filter) per partition that indexes all unique key values contained in this partition. To identify all partitions containing a key, we would need to probe all per-partition filters (which could be many). Depending on the storage medium, a false positive there can be very expensive. Furthermore, secondary columns typically contain many duplicates (also across partitions). Cuckoo Index (CI) addresses these drawbacks of per-partition filters. (It must know all keys at build time, though.)
    + **cuckoofilter** [📁](./cuckoofilter) [🌐](https://github.com/GerHobbelt/cuckoofilter)
    + **DCF-cuckoo-index** [📁](./DCF-cuckoo-index) [🌐](https://github.com/GerHobbelt/DCF) -- the Dynamic Cuckoo Filter (DCF) is an efficient approximate membership test data structure. Different from the classic Bloom filter and its variants, DCF is especially designed for highly dynamic datasets and supports extending and reducing its capacity. The DCF design is the first to achieve both reliable item deletion and flexibly extending/reducing for approximate set representation and membership testing. DCF outperforms the state-of-the-art DBF designs in both speed and memory consumption.
    + **emphf-hash** [📁](./emphf-hash) [🌐](https://github.com/GerHobbelt/emphf) -- an efficient external-memory algorithm for the construction of minimal perfect hash functions for large-scale key sets, focusing on speed and low memory usage (2.61 N bits plus a small constant factor).
    + **gperf-hash** [📁](./gperf-hash) [🌐](https://github.com/GerHobbelt/gperf) -- This is GNU gperf, a program that generates C/C++ perfect hash functions for sets of key words.
    + **LDCF-hash** [📁](./LDCF-hash) [🌐](https://github.com/GerHobbelt/LDCF) -- The Logarithmic Dynamic Cuckoo Filter (LDCF) is an efficient approximate membership test data structure for dynamic big data sets. LDCF uses a novel multi-level tree structure and reduces the worst insertion and membership testing time from O(N) to O(1), while simultaneously reducing the memory cost of DCF as the cardinality of the set increases.
    + **libbloom** [📁](./libbloom) [🌐](https://github.com/GerHobbelt/bloomd) -- a high-performance C server, exposing bloom filters and operations over them. The rate of false positives can be tuned to meet application demands, but reducing the error rate rapidly increases the amount of memory required for the representation. Example: Bloom filters enable you to represent 1MM items with a false positive rate of 0.1% in 2.4MB of RAM.
    + **morton_filter** [📁](./morton_filter) [🌐](https://github.com/GerHobbelt/morton_filter) -- a [Morton filter](https://www.vldb.org/pvldb/vol11/p1041-breslow.pdf) -- a new approximate set membership data structure. A Morton filter is a modified cuckoo filter that is optimized for bandwidth-constrained systems. Morton filters use additional computation in order to reduce their off-chip memory traffic. Like a cuckoo filter, a Morton filter supports insertions, deletions, and lookup operations. It additionally adds high-throughput self-resizing, a feature of quotient filters, which allows a Morton filter to increase its capacity solely by leveraging its internal representation. This capability is in contrast to existing vanilla cuckoo filter implementations, which are static and thus require using a backing data structure that contains the full set of items to resize the filter. Morton filters can also be configured to use less memory than a cuckoo filter for the same error rate while simultaneously delivering insertion, deletion, and lookup throughputs that are, respectively, up to 15.5x, 1.3x, and 2.5x higher than a cuckoo filter. Morton filters in contrast to vanilla cuckoo filters do not require a power of two number of buckets but rather only a number that is a multiple of two. They also use fewer bits per item than a Bloom filter when the target false positive rate is less than around 1% to 3%.
    + **phf-hash** [📁](./phf-hash) [🌐](https://github.com/GerHobbelt/phf) -- a simple implementation of the CHD perfect hash algorithm. CHD can generate perfect hash functions for very large key sets -- on the order of millions of keys -- in a very short time.
    + **highwayhash** [📁](./highwayhash) [🌐](https://github.com/GerHobbelt/highwayhash) -- Fast strong hash functions: SipHash/HighwayHash

- **intermediate data storage / caching / hierarchical data stores** (binary hOCR; document text revisions; ...)

    - **c-blosc2** [📁](./c-blosc2) [🌐](https://github.com/GerHobbelt/c-blosc2) -- a high performance compressor optimized for binary data (i.e. floating point numbers, integers and booleans), designed to transmit data to the processor cache faster than the traditional, non-compressed, direct memory fetch approach via a `memcpy()` OS call.
    - **CacheLib** [📁](./CacheLib) [🌐](https://github.com/GerHobbelt/CacheLib) -- provides an in-process high performance caching mechanism, thread-safe API to build high throughput, low overhead caching services, with built-in ability to leverage DRAM and SSD caching transparently.
    - ~~HDF5 file format~~
        + ~~**h5cpp-HDF5** [🌐](https://github.com/steven-varga/h5cpp)~~
          + **removed**; reason: see the `HDF5` entry below.
        + ~~**HDF5** [🌐](https://github.com/HDFGroup/hdf5)~~
          + **removed**; reason: HDF5 is a nice concept but considered *overkill* right now; where we need disk stores, we'll be using SQLite or LMDB-like key-value stores instead. Such stores are not meant to be interchangeable with other software in their raw shape and we'll provide public access APIs instead, where applicable.
        + ~~**HighFive-HDF5** [🌐](https://github.com/BlueBrain/HighFive)~~
          + **removed**; reason: see the `HDF5` entry above.
    - RAM-/disk-based large queues and stores: B+tree, LSM-tree, ...
        + **cpp-btree** [📁](./cpp-btree) [🌐](https://github.com/GerHobbelt/cpp-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
        + **tlx-btree** [📁](./tlx-btree) [🌐](https://github.com/GerHobbelt/tlx) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
        + **Lightning.NET** [📁](./Lightning.NET) [🌐](https://github.com/GerHobbelt/Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
        + **libmdbx** [📁](./libmdbx) [🌐](https://github.com/GerHobbelt/libmdbx) -- one of the fastest embeddable key-value ACID database without WAL. `libmdbx` surpasses the legendary LMDB in terms of reliability, features and performance.
        + **ligra-graph** [📁](./ligra-graph) [🌐](https://github.com/GerHobbelt/ligra) -- LIGRA: a Lightweight Graph Processing Framework for Shared Memory; works on both uncompressed and compressed graphs and hypergraphs.
        + **lmdb-safe** [📁](./lmdb-safe) [🌐](https://github.com/GerHobbelt/lmdb-safe) -- A safe modern & performant C++ wrapper of LMDB. LMDB is an outrageously fast key/value store with semantics that make it highly interesting for many applications. Of specific note, besides speed, is the full support for transactions and good read/write concurrency. LMDB is also famed for its robustness.. **when used correctly**. The design of LMDB is elegant and simple, which aids both the performance and stability. The downside of this elegant design is a nontrivial set of rules that need to be followed to not break things. In other words, LMDB delivers great things but only if you use it exactly right. This is by conscious design. The `lmdb-safe` library aims to deliver the full LMDB performance while programmatically making sure the LMDB semantics are adhered to, with very limited overhead.
        + **lmdb-store** [📁](./lmdb-store) [🌐](https://github.com/GerHobbelt/lmdb-store) -- an ultra-fast NodeJS interface to LMDB; probably the fastest and most efficient NodeJS key-value/database interface that exists for full storage and retrieval of structured JS data (objects, arrays, etc.) in a true persisted, scalable, [ACID compliant](https://en.wikipedia.org/wiki/ACID) database. It provides a simple interface for interacting with LMDB.
        + **lmdb.spreads.net** [📁](./lmdb.spreads.net) [🌐](https://github.com/GerHobbelt/Spreads.LMDB)
        + **lmdb** [📁](./lmdb) [🌐](https://github.com/GerHobbelt/lmdb)
        + **lmdbxx** [📁](./lmdbxx) [🌐](https://github.com/GerHobbelt/lmdbxx) -- lmdb++: a comprehensive C++11 wrapper for the LMDB embedded database library, offering both an error-checked procedural interface and an object-oriented resource interface with RAII semantics.
        + **palmtree** [📁](./palmtree) [🌐](https://github.com/GerHobbelt/palmtree) -- concurrent lock free B+Tree
        + **parallel-hashmap** [📁](./parallel-hashmap) [🌐](https://github.com/GerHobbelt/parallel-hashmap) -- a set of hash map implementations, as well as a btree alternative to std::map and std::set

- **data storage / caching / IPC: loss-less data compression**

    - **brotli** [📁](./brotli) [🌐](https://github.com/GerHobbelt/brotli) -- compression
    - ~~**bzip2** [🌐](https://github.com/nemequ/bzip2)~~
      + **removed**; reason: see `fast-lzma2` below. When we want this, we can go through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines.
    - **c-blosc2** [📁](./c-blosc2) [🌐](https://github.com/GerHobbelt/c-blosc2) -- a high performance compressor optimized for binary data (i.e. floating point numbers, integers and booleans), designed to transmit data to the processor cache faster than the traditional, non-compressed, direct memory fetch approach via a `memcpy()` OS call.
    - ~~**fast-lzma2** [🌐](https://github.com/conor42/fast-lzma2)~~
      + **removed**; reason: gone as part of the first round of compression libraries' cleanup: we intend to support lz4 for fast work, plus zstd and *maybe* brotli for higher compression ratios, while we won't bother with anything else: the rest can be dealt with through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines when we need to read (or write) them. See also: [7zip-Zstd](https://github.com/mcmilk/7-Zip-zstd), which is what I use for accessing almost all compressed material anywhere.
    - **fast_pfor** [📁](./fast_pfor) [🌐](https://github.com/GerHobbelt/FastPFor) -- a research library with integer compression schemes. It is broadly applicable to the compression of arrays of 32-bit integers where most integers are small. The library seeks to exploit SIMD instructions (SSE) whenever possible.
    - **libzip** [📁](./libzip) [🌐](https://github.com/GerHobbelt/libzip) -- a library for reading, creating, and modifying zip archives.
    - ~~**lizard** [🌐](https://github.com/inikep/lizard) -- [Lizard](https://github.com/inikep/lizard) (formerly LZ5) is a lossless compression algorithm designed to give better decompression speed than LZ4 i.e. over 2000 MB/s and best ratio (comparable to zlib and low levels of zstd/brotli) at decompression speed of 1000 MB/s~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...
    - **lz4** [📁](./lz4) [🌐](https://github.com/GerHobbelt/lz4)
    - ~~**lzo** [🌐](https://github.com/nemequ/lzo)~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...
    - ~~**lzsse** [🌐](https://github.com/ConorStokes/LZSSE)~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...
    - ~~**pithy** [🌐](https://github.com/johnezang/pithy)~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...
    - **shoco** [📁](./shoco) [🌐](https://github.com/GerHobbelt/shoco) -- a fast compressor for short strings
    - ~~**Snappy** [🌐](https://github.com/google/snappy) -- a compression/decompression library. It does not aim for maximum compression, or compatibility with any other compression library; instead, it aims for very high speeds and reasonable compression.~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading. See also [How do I decide between LZ4 and Snappy compression?](https://stackoverflow.com/questions/67537111/how-do-i-decide-between-lz4-and-snappy-compression)
    - ~~**squash** [🌐](https://github.com/quixdb/squash)~~
      + **removed**; reason: see `fast-lzma2` above. LZ4 either overtakes this one or is on par (anno 2022 AD).
    - ~~**xz-utils** [🌐](https://github.com/xz-mirror/xz)~~
      + **removed**; reason: see `fast-lzma2` above. When we want this, we can go through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines.
    - **zstd** [📁](./zstd) [🌐](https://github.com/GerHobbelt/zstd)
    - see also [lzbench](https://github.com/inikep/lzbench)

- **file / directory tree synchronization** (local and remote)

    - **lib_nas_lockfile** [📁](./lib_nas_lockfile) [🌐](https://github.com/GerHobbelt/lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.

    - **librsync** [📁](./librsync) [🌐](https://github.com/GerHobbelt/librsync) -- a library for calculating and applying network deltas. librsync encapsulates the core algorithms of the rsync protocol, which help with efficient calculation of the differences between two files. The rsync algorithm is different from most differencing algorithms because it does not require the presence of the two files to calculate the delta.  Instead, it requires a set of checksums of each block of one file, which together form a signature for that file.  Blocks at any position in the other file which have the same checksum are likely to be identical, and whatever remains is the difference. This algorithm transfers the differences between two files without needing both files on the same system.

    - **zsync2** [📁](./zsync2) [🌐](https://github.com/GerHobbelt/zsync2) -- the advanced file download/sync tool zsync. zsync is a well known tool for downloading and updating local files from HTTP servers using the well known algorithms rsync used for diffing binary files. Therefore, it becomes possible to synchronize modifications by exchanging the changed blocks locally using `Range:` requests. The system is based on meta files called `.zsync` files. They contain hash sums for every block of data. The file is generated from and stored along with the actual file it refers to. Due to how system works, nothing but a "dumb" HTTP server is required to make use of zsync2. This makes it easy to integrate zsync2 into existing systems.

    - **csync2** [📁](./csync2) [🌐](https://github.com/GerHobbelt/csync2) -- a cluster synchronization tool. It can be used to keep files on multiple hosts in a cluster in sync. Csync2 can handle complex setups with much more than just 2 hosts, handle file deletions and can detect conflicts.

- **OCR: hOCR output format, other output formats? (dedicated binary?)**

    - **hocr-fileformat** [📁](./hocr-fileformat) [🌐](https://github.com/GerHobbelt/ocr-fileformat)
    - **hocr-spec** [📁](./hocr-spec) [🌐](https://github.com/GerHobbelt/hocr-spec)
    - **hocr-tools** [📁](./hocr-tools) [🌐](https://github.com/GerHobbelt/hocr-tools)

- **pattern recognition: "A.I." for cover pages, image/page *segmentation*, including abstract & summary demarcation, "figure" and "table" detection & extraction from documents, ...**

    - **dlib** [📁](./dlib) [🌐](https://github.com/GerHobbelt/dlib) -- machine learning algorithms
        - **lapack** [📁](./lapack) [🌐](https://github.com/GerHobbelt/lapack) -- [CBLAS](http://www.netlib.org/blas/) + [LAPACK](http://www.netlib.org/lapack/index.html) optimized linear algebra libs
    - **clBLAS** [📁](./clBLAS) [🌐](https://github.com/GerHobbelt/clBLAS) -- the OpenCL™ BLAS portion of OpenCL's `clMath`. The complete set of BLAS level 1, 2 & 3 routines is implemented. In addition to GPU devices, the library also supports running on CPU devices to facilitate debugging and multicore programming. The primary goal of `clBLAS` is to make it easier for developers to utilize the inherent performance and power efficiency benefits of heterogeneous computing. `clBLAS` interfaces do not hide nor wrap OpenCL interfaces, but rather leaves OpenCL state management to the control of the user to allow for maximum performance and flexibility. The clBLAS library does generate and enqueue optimized OpenCL kernels, relieving the user from the task of writing, optimizing and maintaining kernel code themselves.
    - **caffe** [📁](./caffe) [🌐](https://github.com/GerHobbelt/caffe) -- a fast deep learning framework made with expression and modularity in mind, developed by Berkeley AI Research (BAIR)/The Berkeley Vision and Learning Center (BVLC).
    - **catboost** [📁](./catboost) [🌐](https://github.com/GerHobbelt/catboost) -- a fast, scalable, high performance Gradient Boosting on Decision Trees library, used for ranking, classification, regression and other machine learning tasks. Supports computation on CPU and GPU.
    - **libsvm** [📁](./libsvm) [🌐](https://github.com/GerHobbelt/libsvm) -- a simple, easy-to-use, and efficient software for SVM classification and regression. It solves C-SVM classification, nu-SVM classification, one-class-SVM, epsilon-SVM regression, and nu-SVM regression. It also provides an automatic model selection tool for C-SVM classification.
    - **math-atlas** [📁](./math-atlas) [🌐](https://github.com/GerHobbelt/math-atlas) -- The ATLAS (Automatically Tuned Linear Algebra Software) project is an ongoing research effort focusing on applying empirical techniques in order to provide portable performance, delivering an efficient BLAS implementation, as well as a few routines from LAPACK.
    - **MITIE-nlp** [📁](./MITIE-nlp) [🌐](https://github.com/GerHobbelt/MITIE) -- provides state-of-the-art information extraction tools. Includes tools for performing [named entity extraction](http://blog.dlib.net/2014/04/mitie-completely-free-and-state-of-art.html) and [binary relation detection](http://blog.dlib.net/2014/07/mitie-v02-released-now-includes-python.html) as well as tools for training custom extractors and relation detectors.  MITIE is built on top of [dlib](http://dlib.net), a high-performance machine-learning library, MITIE makes use of several state-of-the-art techniques including the use of distributional word embeddings and Structural Support Vector Machines.
    - **mlpack** [📁](./mlpack) [🌐](https://github.com/GerHobbelt/mlpack) -- an intuitive, fast, and flexible C++ machine learning library, meant to be a machine learning analog to LAPACK, aiming to implement a wide array of machine learning methods and functions as a "swiss army knife" for machine learning researchers.
    - **mipp** [📁](./mipp) [🌐](https://github.com/GerHobbelt/MIPP) -- MyIntrinsics++ (MIPP): a portable wrapper for vector intrinsic functions (SIMD) written in C++11. It works for SSE, AVX, AVX-512 and ARM NEON (32-bit and 64-bit) instructions. MIPP wrapper supports simple/double precision floating-point numbers and also signed integer arithmetic (64-bit, 32-bit, 16-bit and 8-bit). With the MIPP wrapper you do not need to write a specific intrinsic code anymore. Just use provided functions and the wrapper will automatically generate the right intrisic calls for your specific architecture.
    - **multiverso** [📁](./multiverso) [🌐](https://github.com/GerHobbelt/Multiverso) -- a parameter server based framework for training machine learning models on big data with numbers of machines. It is currently a standard C++ library and provides a series of friendly programming interfaces. Now machine learning researchers and practitioners do not need to worry about the system routine issues such as distributed model storage and operation, inter-process and inter-thread communication, multi-threading management, and so on. Instead, they are able to focus on the core machine learning logics: data, model, and training.
    - **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
    - **ncnn** [📁](./ncnn) [🌐](https://github.com/GerHobbelt/ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
    - **pytorch** [📁](./pytorch) [🌐](https://github.com/GerHobbelt/pytorch) -- PyTorch library in C++
    - **thunderSVM** [📁](./thunderSVM) [🌐](https://github.com/GerHobbelt/thundersvm) -- ThunderSVM exploits GPUs and multi-core CPUs to achieve high efficiency, supporting all functionalities of LibSVM such as one-class SVMs, SVC, SVR and probabilistic SVMs.
    - **xsimd** [📁](./xsimd) [🌐](https://github.com/GerHobbelt/xsimd) -- SIMD (Single Instruction, Multiple Data) instructions differ between microprocessor vendors and compilers. `xsimd` provides a unified means for using these features for library authors. It enables manipulation of batches of numbers with the same arithmetic operators as for single values. It also provides accelerated implementation of common mathematical functions operating on batches.
    - **xtensor-blas** [📁](./xtensor-blas) [🌐](https://github.com/GerHobbelt/xtensor-blas) -- an extension to the `xtensor` library, offering bindings to BLAS and LAPACK libraries through `cxxblas` and `cxxlapack`.
    - **xtensor-io** [📁](./xtensor-io) [🌐](https://github.com/GerHobbelt/xtensor-io) -- a `xtensor` plugin to read and write images, audio files, NumPy (compressed) NPZ and HDF5 files.
    - **xtensor** [📁](./xtensor) [🌐](https://github.com/GerHobbelt/xtensor) -- C++ tensors with broadcasting and lazy computing. `xtensor` is a C++ library meant for numerical analysis with multi-dimensional array expressions.
    - **xtl** [📁](./xtl) [🌐](https://github.com/GerHobbelt/xtl) -- xtensor core library

    - **similarity search**:
        - **annoy** [📁](./annoy) [🌐](https://github.com/GerHobbelt/annoy) -- ANNOY (<b>A</b>pproximate <b>N</b>earest <b>N</b>eighbors <b>O</b>h <b>Y</b>eah) is a C++ library to search for points in space that are close to a given query point. It also creates large read-only file-based data structures that are `mmap`-ped into memory so that many processes may share the same data. ANNOY is almost as fast as the fastest libraries, but what really sets Annoy apart is: it has the ability to use static files as indexes, enabling you to share an index across processes. ANNOY also decouples creating indexes from loading them, so you can pass around indexes as files and map them into memory quickly. ANNOY tries to minimize its memory footprint: the indexes are quite small. This is useful when you want to find nearest neighbors using multiple CPU's. Spotify uses ANNOY for music recommendations.
        - **CTCWordBeamSearch** [📁](./CTCWordBeamSearch) [🌐](https://github.com/GerHobbelt/CTCWordBeamSearch) -- Connectionist Temporal Classification (CTC) decoder with dictionary and Language Model (LM).
        - **faiss** [📁](./faiss) [🌐](https://github.com/GerHobbelt/faiss) -- a library for efficient similarity search and clustering of dense vectors. It contains algorithms that search in sets of vectors of any size, up to ones that possibly do not fit in RAM. It also contains supporting code for evaluation and parameter tuning. Faiss is written in C++ with complete wrappers for Python/numpy. Some of the most useful algorithms are implemented on the GPU. It is developed primarily at Facebook AI Research.
        - **hnswlib** [📁](./hnswlib) [🌐](https://github.com/GerHobbelt/hnswlib) -- fast approximate nearest neighbor search. Header-only C++ HNSW implementation with python bindings.
        - **kgraph** [📁](./kgraph) [🌐](https://github.com/GerHobbelt/kgraph) -- a library for k-nearest neighbor (k-NN) graph construction and online k-NN search using a k-NN Graph as index. KGraph implements heuristic algorithms that are extremely generic and fast. KGraph works on abstract objects. The only assumption it makes is that a similarity score can be computed on any pair of objects, with a user-provided function.
        - **libngt-ann** [📁](./libngt-ann) [🌐](https://github.com/GerHobbelt/NGT) -- Yahoo's Neighborhood Graph and Tree for Indexing High-dimensional Data. NGT provides commands and a library for performing high-speed approximate nearest neighbor searches against a large volume of data (several million to several 10 million items of data) in high dimensional vector data space (several ten to several thousand dimensions).
        - **libsptag** [📁](./libsptag) [🌐](https://github.com/GerHobbelt/SPTAG) -- a library for fast approximate nearest neighbor search.  SPTAG (Space Partition Tree And Graph) is a library for large scale vector approximate nearest neighbor search scenario released by [Microsoft Research (MSR)](https://www.msra.cn/) and [Microsoft Bing](http://bing.com).
        - **nanoflann** [📁](./nanoflann) [🌐](https://github.com/GerHobbelt/nanoflann) -- a C++11 header-only library for building KD-Trees of datasets with different topologies: R^2, R^3 (point clouds), SO(2) and SO(3) (2D and 3D rotation groups). No support for approximate NN is provided. This library is a fork of the `flann` library by Marius Muja and David G. Lowe, and born as a child project of `MRPT`.
        - **nmslib** [📁](./nmslib) [🌐](https://github.com/GerHobbelt/nmslib) -- Non-Metric Space Library (NMSLIB) is an efficient cross-platform similarity search library and a toolkit for evaluation of similarity search methods. The core-library does not have any third-party dependencies. It has been gaining popularity recently. In particular, it has become a part of Amazon Elasticsearch Service. The goal of the project is to create an effective and comprehensive toolkit for searching in generic and non-metric spaces. Even though the library contains a variety of metric-space access methods, our main focus is on generic and approximate search methods, in particular, on methods for non-metric spaces. NMSLIB is possibly the first library with a principled support for non-metric space searching.
        - **xgboost** [📁](./xgboost) [🌐](https://github.com/GerHobbelt/xgboost) -- an optimized distributed gradient boosting library designed to be highly efficient, flexible and portable. It implements machine learning algorithms under the Gradient Boosting framework. XGBoost provides a parallel tree boosting (also known as GBDT, GBM) that solve many data science problems in a fast and accurate way. The same code runs on major distributed environment (Kubernetes, Hadoop, SGE, MPI, Dask) and can solve problems beyond billions of examples.

    - **text tokenization**, i.e. breaking text into words when you _receive a textstream without spaces_. Also useful for Asian languages, which don't do spaces, e.g. Chinese.
        + **sentencepiece** [📁](./sentencepiece) [🌐](https://github.com/GerHobbelt/sentencepiece) -- text tokenization
        + **sentence-tokenizer** [📁](./sentence-tokenizer) [🌐](https://github.com/GerHobbelt/Tokenizer) -- text tokenization
        + **you-token-to-me** [📁](./you-token-to-me) [🌐](https://github.com/GerHobbelt/YouTokenToMe) -- text tokenization
        + **libtextcat** [📁](./libtextcat) [🌐](https://github.com/GerHobbelt/libtextcat) -- text language detection
        + **ucto** [📁](./ucto) [🌐](https://github.com/GerHobbelt/ucto) -- text tokenization
            * **uctodata** [📁](./uctodata) [🌐](https://github.com/GerHobbelt/uctodata) -- data for `ucto` library
            * **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
        + **fastBPE** [📁](./fastBPE) [🌐](https://github.com/GerHobbelt/fastBPE) -- text tokenization / ngrams
        + **fastText** [📁](./fastText) [🌐](https://github.com/GerHobbelt/fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification. Includes language detection feeatures.
        + **BlingFire** [📁](./BlingFire) [🌐](https://github.com/GerHobbelt/BlingFire) -- we are a team at Microsoft called Bling (Beyond Language Understanding), sharing our [FInite State machine and REgular expression manipulation library](https://github.com/microsoft/BlingFire) (FIRE). We use Fire for many linguistic operations inside Bing such as Tokenization, Multi-word expression matching, Unknown word-guessing, Stemming / Lemmatization just to mention a few.

          Fire can also be used to improve FastText: see [here](https://github.com/microsoft/BlingFire#8-example-of-reaching-99-accuracy-for-language-detection).

          Bling Fire Tokenizer provides state of the art performance for Natural Language text tokenization.

    - **GMM/HMM/kM: fit patterns, e.g. match & transform a point cloud or image onto a template** --> help matching pages against banner templates, etc. as part of the OCR/recognition task.
        + **GMMreg** [📁](./GMMreg) [🌐](https://github.com/GerHobbelt/Project_gmmreg) -- implementations of the robust point set registration framework described in the paper "[Robust Point Set Registration Using Gaussian Mixture Models](https://github.com/bing-jian/gmmreg/blob/master/gmmreg_PAMI_preprint.pdf)", Bing Jian and Baba C. Vemuri, IEEE Transactions on Pattern Analysis and Machine Intelligence, 2011, 33(8), pp. 1633-1645. An earlier conference version of this work, "A Robust Algorithm for Point Set Registration Using Mixture of Gaussians, Bing Jian and Baba C. Vemuri.", appeared in the proceedings of ICCV'05.
        + **liblinear** [📁](./liblinear) [🌐](https://github.com/GerHobbelt/liblinear)
        + **hmm-scalable** [📁](./hmm-scalable) [🌐](https://github.com/GerHobbelt/hmm-scalable)
        + **hmm-stoch** [📁](./hmm-stoch) [🌐](https://github.com/GerHobbelt/StochHMM)
        + **GMM-HMM-kMeans** [📁](./GMM-HMM-kMeans) [🌐](https://github.com/GerHobbelt/KMeans-GMM-HMM) -- HMM based on KMeans and GMM

    - **yara-pattern-matcher** [📁](./yara-pattern-matcher) [🌐](https://github.com/GerHobbelt/yara) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks

    - **_delta features_ & other feature extraction** (see Qiqqa research notes)
        + **dtl-diff-template-library** [📁](./dtl-diff-template-library) [🌐](https://github.com/GerHobbelt/dtl)
        + **google-diff-match-patch** [📁](./google-diff-match-patch) [🌐](https://github.com/GerHobbelt/diff-match-patch)
        + **HDiffPatch** [📁](./HDiffPatch) [🌐](https://github.com/GerHobbelt/HDiffPatch)
        + **yara-pattern-matcher** [📁](./yara-pattern-matcher) [🌐](https://github.com/GerHobbelt/yara)

- **regex matchers (manual edit - pattern recognition)**

    * **hyperscan** [📁](./hyperscan) [🌐](https://github.com/GerHobbelt/hyperscan) -- Hyperscan is a high-performance multiple regex matching library.
    * **re2** [📁](./re2) [🌐](https://github.com/GerHobbelt/re2)
    * **tre** [📁](./tre) [🌐](https://github.com/GerHobbelt/tre)
    * **pcre** [📁](./pcre) [🌐](https://github.com/GerHobbelt/pcre)

- **OCR: quality improvements, language detect, ...**

    - **hunspell** [📁](./hunspell) [🌐](https://github.com/GerHobbelt/hunspell)
    - **hunspell-hyphen** [📁](./hunspell-hyphen) [🌐](https://github.com/GerHobbelt/hyphen)
    - **libtextcat** [📁](./libtextcat) [🌐](https://github.com/GerHobbelt/libtextcat) -- text language detection
    - **fastText** [📁](./fastText) [🌐](https://github.com/GerHobbelt/fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification. Includes language detection feeatures.

- **OCR page image preprocessing, \[scanner] tooling: getting the pages to the OCR engine**

    - **GraphicsMagick** [📁](./GraphicsMagick) [🌐](https://github.com/GerHobbelt/graphicsmagick)
    - **ImageMagick** [📁](./ImageMagick) [🌐](https://github.com/GerHobbelt/ImageMagick)
    - **jasper** [📁](./jasper) [🌐](https://github.com/GerHobbelt/jasper) -- JasPer Image Processing/Coding Tool Kit
    - **lcms2** [📁](../../thirdparty/lcms2) [🌐](https://github.com/GerHobbelt/thirdparty-lcms2) -- `lcms2mt` is a thread-safe fork of `lcms` (a.k.a. Little CMS). Little CMS intends to be a small-footprint color management engine, with special focus on accuracy and performance. It uses the International Color Consortium standard (ICC), which is the modern standard when regarding to color management. The ICC specification is widely used and is referred to in many International and other de-facto standards. It was approved as an International Standard, ISO 15076-1, in 2005. Little CMS is a **full implementation** of ICC specification 4.3, it fully supports all kind of V2 and V4 profiles, including abstract, devicelink and named color profiles.
    - **leptonica** [📁](../../thirdparty/leptonica) [🌐](https://github.com/GerHobbelt/leptonica)
    - **libvips** [📁](./libvips) [🌐](https://github.com/GerHobbelt/libvips) -- a demand-driven, horizontally threaded image processing library which has around 300 operations covering arithmetic, histograms, convolution, morphological operations, frequency filtering, colour, resampling, statistics and others. It supports a large range of numeric types, from 8-bit int to 128-bit complex. Images can have any number of bands. It supports a good range of image formats, including JPEG, JPEG2000, JPEG-XL, TIFF, PNG, WebP, HEIC, AVIF, FITS, Matlab, OpenEXR, PDF, SVG, HDR, PPM / PGM / PFM, CSV, GIF, Analyze, NIfTI, DeepZoom, and OpenSlide. It can also load images via ImageMagick or GraphicsMagick, letting it work with formats like DICOM.
    - **olena** [📁](./olena) [🌐](https://github.com/GerHobbelt/olena)
    - **opencv** [📁](./opencv) [🌐](https://github.com/GerHobbelt/opencv)
    - **opencv_contrib** [📁](./opencv_contrib) [🌐](https://github.com/GerHobbelt/opencv_contrib)
    - **scantailor** [📁](./scantailor) [🌐](https://github.com/GerHobbelt/scantailor-advanced) -- [scantailor_advanced](https://github.com/4lex4/scantailor-advanced) is the [ScanTailor](https://github.com/scantailor/scantailor) version that merges the features of the *ScanTailor Featured* and *ScanTailor Enhanced* versions, brings new ones and fixes. ScanTailor is an interactive post-processing tool for scanned pages. It performs operations such as page splitting, deskewing, adding/removing borders, selecting content, ... and many others.
    - **CImg** [📁](./CImg) [🌐](https://github.com/GerHobbelt/CImg) -- a **small** C++ toolkit for **image processing**.

- **image export, image / \[scanned] document import**

    - **CImg** [📁](./CImg) [🌐](https://github.com/GerHobbelt/CImg) -- a **small** C++ toolkit for **image processing**.
    - **CxImage** [📁](./CxImage) [🌐](https://github.com/GerHobbelt/CxImage) -- venerated library for reading and creating many image file formats.
    - **jbig2dec** [📁](../../thirdparty/jbig2dec) [🌐](https://github.com/GerHobbelt/jbig2dec) -- a decoder library and example utility implementing the JBIG2 bi-level image compression spec. Also known as ITU T.88 and ISO IEC 14492, and included by reference in Adobe's PDF version 1.4 and later.
    - **jpeginfo** [📁](../../thirdparty/jpeginfo) [🌐](https://github.com/GerHobbelt/jpeginfo)
    - **libgd** [📁](./libgd) [🌐](https://github.com/GerHobbelt/libgd) -- GD is a library for the dynamic creation of images by programmers. GD has support for: WebP, JPEG, PNG, AVIF, HEIF, TIFF, BMP, GIF, TGA, WBMP, XPM.
    - **libjpeg** [📁](../../thirdparty/libjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-libjpeg)
    - **libpng** [📁](../../thirdparty/libpng) [🌐](https://github.com/GerHobbelt/libpng)
    - **libtiff** [📁](../../thirdparty/libtiff) [🌐](https://github.com/GerHobbelt/libtiff)
    - **openjpeg** [📁](../../thirdparty/openjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-openjpeg)
    - ~~**OpenEXR** [🌐](https://github.com/AcademySoftwareFoundation/openexr) -- lossless format for multi-layered images. Professional use. (I've used it before; nice file format.)~~
        + ~~**Imath** [🌐](https://github.com/AcademySoftwareFoundation/Imath) -- float16 support lib for OpenEXR format~~
        + **removed**; reason: considered *overkill* for the projects I'm currently involved in, including Qiqqa. Those can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.
    - ~~**OpenImageIO** [🌐](https://github.com/OpenImageIO/oiio)~~
        + **removed**; reason: considered nice & cool but still *overkill*. Qiqqa tooling can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.
    - **jpeg-xl** [📁](./jpeg-xl) [🌐](https://github.com/GerHobbelt/jpeg-xl) - [JPEG-XL](https://gitlab.com/wg1/jpeg-xl) support
    - **libgif** [📁](./libgif) [🌐](https://github.com/GerHobbelt/libgif)
    - **libjpeg-turbo** [📁](./libjpeg-turbo) [🌐](https://github.com/GerHobbelt/libjpeg-turbo)
    - **libwebp** [📁](./libwebp) [🌐](https://github.com/GerHobbelt/libwebp)
    - ~~**GDCM-Grassroots-DICOM** [🌐](https://github.com/malaterre/GDCM)~~
      + **removed**; reason: not a frequently used format; the filter codes can be found in other libraries. *Overkill*. Qiqqa tooling can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.
    - **pmt-png-tools** [📁](./pmt-png-tools) [🌐](https://github.com/GerHobbelt/pmt)
    - ~~[DICOM to NIfTI](https://github.com/rordenlab/dcm2niix) (*not included; see also DICOM slot above*)~~
    - ~~**cgohlke::imagecodecs** [🌐](https://github.com/cgohlke/imagecodecs) (*not included; see also DICOM slot above*)~~
    - [image formats (visual) quality comparison](https://eclipseo.github.io/image-comparison-web/) (*not included*)

- **Monte Carlo simulations, LDA, keyword inference/extraction, etc.**

    - **gibbs-lda** [📁](./gibbs-lda) [🌐](https://github.com/GerHobbelt/gibbs-lda) -- modified GibbsLDA++: A C/C++ Implementation of Latent Dirichlet Allocation by by Xuan-Hieu Phan and Cam-Tu Nguyen.
    - **lda-bigartm** [📁](./lda-bigartm) [🌐](https://github.com/GerHobbelt/bigartm) -- BigARTM is a powerful tool for topic modeling based on a novel technique called Additive Regularization of Topic Models. This technique effectively builds multi-objective models by adding the weighted sums of regularizers to the optimization criterion. BigARTM is known to combine well very different objectives, including sparsing, smoothing, topics decorrelation and many others. Such combination of regularizers significantly improves several quality measures at once almost without any loss of the perplexity.
    - **lda-Familia** [📁](./lda-Familia) [🌐](https://github.com/GerHobbelt/Familia)
    - **lda** [📁](./lda) [🌐](https://github.com/GerHobbelt/lda-c) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
    - **lda-3-variants** [📁](./lda-3-variants) [🌐](https://github.com/GerHobbelt/LDA) -- three modified open source versions of LDA with collapsed Gibbs Sampling: GibbsLDA++, ompi-lda and online_twitter_lda.
    - **LightLDA** [📁](./LightLDA) [🌐](https://github.com/GerHobbelt/LightLDA)
    - **mcmc** [📁](./mcmc) [🌐](https://github.com/GerHobbelt/mcmc) -- Monte Carlo
    - **mmc** [📁](./mmc) [🌐](https://github.com/GerHobbelt/mmc) -- Monte Carlo
    - **multiverso** [📁](./multiverso) [🌐](https://github.com/GerHobbelt/Multiverso) -- a parameter server based framework for training machine learning models on big data with numbers of machines. It is currently a standard C++ library and provides a series of friendly programming interfaces. Now machine learning researchers and practitioners do not need to worry about the system routine issues such as distributed model storage and operation, inter-process and inter-thread communication, multi-threading management, and so on. Instead, they are able to focus on the core machine learning logics: data, model, and training.
    - **ncnn** [📁](./ncnn) [🌐](https://github.com/GerHobbelt/ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
    - **OptimizationTemplateLibrary** [📁](./OptimizationTemplateLibrary) [🌐](https://github.com/GerHobbelt/O-T-L) -- Optimization Template Library (OTL)
    - **pcg-c-random** [📁](./pcg-c-random) [🌐](https://github.com/GerHobbelt/pcg-c) -- a C implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
    - **pcg-cpp-random** [📁](./pcg-cpp-random) [🌐](https://github.com/GerHobbelt/pcg-cpp) -- a C++ implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
    - **randen** [📁](./randen) [🌐](https://github.com/GerHobbelt/randen) -- What if we could default to attack-resistant random generators without excessive CPU cost? We introduce 'Randen', a new generator with security guarantees; it outperforms MT19937, pcg64_c32, Philox, ISAAC and ChaCha8 in real-world benchmarks. This is made possible by AES hardware acceleration and a large Feistel permutation.

    - **text tokenization** (as a preprocessing step for LDA et al):
        + **sentencepiece** [📁](./sentencepiece) [🌐](https://github.com/GerHobbelt/sentencepiece) -- text tokenization
        + **sentence-tokenizer** [📁](./sentence-tokenizer) [🌐](https://github.com/GerHobbelt/Tokenizer) -- text tokenization
        + **you-token-to-me** [📁](./you-token-to-me) [🌐](https://github.com/GerHobbelt/YouTokenToMe) -- text tokenization
        + **libtextcat** [📁](./libtextcat) [🌐](https://github.com/GerHobbelt/libtextcat) -- text language detection
        + **ucto** [📁](./ucto) [🌐](https://github.com/GerHobbelt/ucto) -- text tokenization
            * **uctodata** [📁](./uctodata) [🌐](https://github.com/GerHobbelt/uctodata) -- data for `ucto` library
            * **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
        + **fastBPE** [📁](./fastBPE) [🌐](https://github.com/GerHobbelt/fastBPE) -- text tokenization / ngrams
        + **many-stop-words** [📁](./many-stop-words) [🌐](https://github.com/GerHobbelt/many-stop-words)
        + **stopwords** [📁](./stopwords) [🌐](https://github.com/GerHobbelt/stopwords)
        + **fastText** [📁](./fastText) [🌐](https://github.com/GerHobbelt/fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification. Includes language detection feeatures.

    - other *topic modeling* code on the Net:
        * [Hierarchical Dirichlet Process (with Split-Merge Operations), Chong Wang](https://github.com/renaud/hdp-faster)
        * [Hierarchical Latent Tree Analysis (HLTA)](https://github.com/kmpoon/hlta)
        * [Leonard Poon - various works](https://github.com/kmpoon?tab=repositories)
        * [David Blei's list of topic modeling OSS software](http://www.cs.columbia.edu/~blei/topicmodeling_software.html) + [github repo list](https://github.com/blei-lab)

- **database "backend storage"**

    - **sqlite** [📁](./sqlite) [🌐](https://github.com/GerHobbelt/sqlite)
    - **sqlite-amalgamation** [📁](./sqlite-amalgamation) [🌐](https://github.com/GerHobbelt/sqlite-amalgamation)
    - **sqlite3pp** [📁](./sqlite3pp) [🌐](https://github.com/GerHobbelt/sqlite3pp) -- a minimal ORM wrapper for SQLite et al.
    - **SQLiteCpp** [📁](./SQLiteCpp) [🌐](https://github.com/GerHobbelt/SQLiteCpp) -- a smart and easy to use C++ SQLite3 wrapper. SQLiteC++ offers an encapsulation around the native C APIs of SQLite, with a few intuitive and well documented C++ classes.
    - **libsqlfs** [📁](./libsqlfs) [🌐](https://github.com/GerHobbelt/libsqlfs) -- a POSIX style file system on top of an SQLite database.  It allows applications to have access to a full read/write file system in a single file, complete with its own file hierarchy and name space.  This is useful for applications which needs structured storage, such as embedding documents within documents, or management of configuration data or preferences.
    - **sqlean** [📁](./sqlean) [🌐](https://github.com/GerHobbelt/sqlean) -- The ultimate set of SQLite extensions: SQLite has few functions compared to other database management systems. SQLite authors see this as a feature rather than a problem, because SQLite has an extension mechanism in place. There are a lot of SQLite extensions out there, but they are incomplete, inconsistent and scattered across the internet. sqlean brings them together, neatly packaged into domain modules, documented, tested, and built for Linux, Windows and macOS.
    - **sqlite-stats** [📁](./sqlite-stats) [🌐](https://github.com/GerHobbelt/sqlite-stats) -- provides common statistical functions for SQLite.
    - **SQLiteHistograms** [📁](./SQLiteHistograms) [🌐](https://github.com/GerHobbelt/SQLiteHistograms) -- an SQLite extension library for creating histogram tables, tables of ratio between histograms and interpolation tables of scatter point tables.
    - **sqlite-fts5-snowball** [📁](./sqlite-fts5-snowball) [🌐](https://github.com/GerHobbelt/fts5-snowball) -- a simple extension for use with FTS5 within SQLite. It allows FTS5 to use Martin Porter's Snowball stemmers (libstemmer), which are available in several languages. Check http://snowballstem.org/ for more information about them.
    - **sqlite_wrapper** [📁](./sqlite_wrapper) [🌐](https://github.com/GerHobbelt/sqlite_wrapper) -- an easy-to-use, lightweight and concurrency-friendly SQLite wrapper written in C++17.
    - **lib_nas_lockfile** [📁](./lib_nas_lockfile) [🌐](https://github.com/GerHobbelt/lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
    - **otl** [📁](./otl) [🌐](https://github.com/GerHobbelt/otl) -- Oracle Template Library (STL-like wrapper for SQL DB queries; supports many databases besides Oracle)

    - LMDB, NoSQL and key/value stores:

      + **lmdb** [📁](./lmdb) [🌐](https://github.com/GerHobbelt/lmdb) -- OpenLDAP [LMDB](http://www.lmdb.tech/doc/index.html) is an outrageously fast key/value store with semantics that make it highly interesting for many applications.  Of specific note, besides speed, is the full support for transactions and good read/write concurrency.  LMDB is also famed for its robustness **when used correctly**.

      + **Lightning.NET** [📁](./Lightning.NET) [🌐](https://github.com/GerHobbelt/Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
      + **lmdb.spreads.net** [📁](./lmdb.spreads.net) [🌐](https://github.com/GerHobbelt/Spreads.LMDB) -- Low-level zero-overhead and [the fastest](https://github.com/Spreads/Spreads.LMDB/commit/4085dde649ef9ebb64310f2627299762dd62d5ce) LMDB .NET wrapper with some additional native methods useful for [Spreads](https://github.com/Spreads/).

      + **lmdb-store** [📁](./lmdb-store) [🌐](https://github.com/GerHobbelt/lmdb-store) -- an ultra-fast NodeJS interface to LMDB; probably the fastest and most efficient NodeJS key-value/database interface that exists for full storage and retrieval of structured JS data (objects, arrays, etc.) in a true persisted, scalable, [ACID compliant](https://en.wikipedia.org/wiki/ACID) database. It provides a simple interface for interacting with LMDB.

      + **lmdb-safe** [📁](./lmdb-safe) [🌐](https://github.com/GerHobbelt/lmdb-safe) -- A safe modern & performant C++ wrapper of LMDB. LMDB is an outrageously fast key/value store with semantics that make it highly interesting for many applications. Of specific note, besides speed, is the full support for transactions and good read/write concurrency. LMDB is also famed for its robustness.. **when used correctly**. The design of LMDB is elegant and simple, which aids both the performance and stability. The downside of this elegant design is a nontrivial set of rules that need to be followed to not break things. In other words, LMDB delivers great things but only if you use it exactly right. This is by conscious design. The `lmdb-safe` library aims to deliver the full LMDB performance while programmatically making sure the LMDB semantics are adhered to, with very limited overhead.
      + **lmdbxx** [📁](./lmdbxx) [🌐](https://github.com/GerHobbelt/lmdbxx) -- lmdb++: a comprehensive C++11 wrapper for the LMDB embedded database library, offering both an error-checked procedural interface and an object-oriented resource interface with RAII semantics.
      + **libmdbx** [📁](./libmdbx) [🌐](https://github.com/GerHobbelt/libmdbx) -- one of the fastest embeddable key-value ACID database without WAL. `libmdbx` surpasses the legendary LMDB in terms of reliability, features and performance.

    - **ligra-graph** [📁](./ligra-graph) [🌐](https://github.com/GerHobbelt/ligra) -- LIGRA: a Lightweight Graph Processing Framework for Shared Memory; works on both uncompressed and compressed graphs and hypergraphs.

    - **upscaledb** [📁](./upscaledb) [🌐](https://github.com/GerHobbelt/hamsterdb) -- a.k.a. hamsterdb: a thread-safe key/value database engine. It supports a B+Tree index structure, uses memory mapped I/O (if available), fast Cursors and variable length keys and can create In-Memory Databases.

- **metadata & text (OCR et al) -- language detect, suggesting fixes, ...**

    - **libtextcat** [📁](./libtextcat) [🌐](https://github.com/GerHobbelt/libtextcat) -- text language detection
    - **sentence-tokenizer** [📁](./sentence-tokenizer) [🌐](https://github.com/GerHobbelt/Tokenizer) -- text tokenization
    - **sentencepiece** [📁](./sentencepiece) [🌐](https://github.com/GerHobbelt/sentencepiece) -- text tokenization
    - **unicode-cldr** [📁](./unicode-cldr) [🌐](https://github.com/GerHobbelt/cldr)
    - **unicode-icu** [📁](./unicode-icu) [🌐](https://github.com/GerHobbelt/icu)
    - **you-token-to-me** [📁](./you-token-to-me) [🌐](https://github.com/GerHobbelt/YouTokenToMe) -- text tokenization
    - **ucto** [📁](./ucto) [🌐](https://github.com/GerHobbelt/ucto) -- text tokenization
        + **uctodata** [📁](./uctodata) [🌐](https://github.com/GerHobbelt/uctodata) -- data for `ucto` library
        + **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
    - **fastBPE** [📁](./fastBPE) [🌐](https://github.com/GerHobbelt/fastBPE) -- text tokenization / ngrams
    - see also https://github.com/fxsjy/jieba for a Chinese text tokenizer (done in Python)
    - **fastText** [📁](./fastText) [🌐](https://github.com/GerHobbelt/fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification.
    - **cld2-language-detect** [📁](./cld2-language-detect) [🌐](https://github.com/GerHobbelt/cld2) -- CLD2 probabilistically detects over 80 languages in Unicode UTF-8 text, either plain text or HTML/XML. For mixed-language input, CLD2 returns the top three languages found and their approximate percentages of the total text bytes.  Optionally, it also returns a vector of text spans with the language of each identified. The design target is web pages of at least 200 characters (about two sentences); CLD2 is not designed to do well on very short text.
    - **uchardet** [📁](./uchardet) [🌐](https://github.com/GerHobbelt/uchardet) -- [uchardet](https://www.freedesktop.org/wiki/Software/uchardet/) is an encoding and language detector library, which attempts to determine the encoding of the text. It can reliably detect many charsets. Moreover it also works as a very good and fast language detector.

- **PDF metadata editing** for round-trip annotation and other "external application editing" of known documents; metadata embedding / *export*

    - **libexpat** [📁](./libexpat) [🌐](https://github.com/GerHobbelt/libexpat) -- XML read/write
    - **libxml2** [📁](./libxml2) [🌐](https://github.com/GerHobbelt/libxml2) -- XML read/write
    - **xml-pugixml** [📁](./xml-pugixml) [🌐](https://github.com/GerHobbelt/pugixml)
    - **XMP-Toolkit-SDK** [📁](./XMP-Toolkit-SDK) [🌐](https://github.com/GerHobbelt/XMP-Toolkit-SDK)

- **web scraping** (document extraction, cleaning, metadata extraction, BibTeX, ...)

    - see investigation notes in Qiqqa docs
    - **cURL** [📁](../../thirdparty/curl) [🌐](https://github.com/GerHobbelt/thirdparty-curl) -- the ubiquitous [libcurl](http://curl.haxx.se/libcurl).
    - **libcpr** [📁](./libcpr) [🌐](https://github.com/GerHobbelt/cpr) -- wrapper library for cURL. C++ Requests is a simple wrapper around [libcurl](http://curl.haxx.se/libcurl) inspired by the excellent [Python Requests](https://github.com/kennethreitz/requests) project. Despite its name, libcurl's easy interface is anything but, and making mistakes misusing it is a common source of error and frustration. Using the more expressive language facilities of C++11, this library captures the essence of making network calls into a few concise idioms.
    - **extract** [📁](../../thirdparty/extract) [🌐](https://github.com/GerHobbelt/thirdparty_extract)
    - **libidn2** [📁](./libidn2) [🌐](https://github.com/GerHobbelt/libidn2) -- international domain name parsing
    - **gumbo-parser** [📁](../../thirdparty/gumbo-parser) [🌐](https://github.com/GerHobbelt/gumbo-parser) -- HTML parser
    - **gumbo-libxml** [📁](./gumbo-libxml) [🌐](https://github.com/GerHobbelt/gumbo-libxml)
    - **http-parser** [📁](./http-parser) [🌐](https://github.com/GerHobbelt/http-parser)
    - **picohttpparser** [📁](./picohttpparser) [🌐](https://github.com/GerHobbelt/picohttpparser)
    - **xml-pugixml** [📁](./xml-pugixml) [🌐](https://github.com/GerHobbelt/pugixml)
    - **libexpat** [📁](./libexpat) [🌐](https://github.com/GerHobbelt/libexpat) -- XML read/write
    - **libxml2** [📁](./libxml2) [🌐](https://github.com/GerHobbelt/libxml2) -- [libxml](http://xmlsoft.org/): XML read/write
    - **gumbo-query** [📁](./gumbo-query) [🌐](https://github.com/GerHobbelt/gumbo-query) -- HTML DOM access in C/C++
    - **tidy-html5** [📁](./tidy-html5) [🌐](https://github.com/GerHobbelt/tidy-html5)
    - **url** [📁](./url) [🌐](https://github.com/GerHobbelt/url) -- URI parsing and other utility functions
    - **htmlstreamparser** [📁](./htmlstreamparser) [🌐](https://github.com/GerHobbelt/htmlstreamparser)
    - **libpsl** [📁](./libpsl) [🌐](https://github.com/GerHobbelt/libpsl) -- handles the *Public Suffix List* (a collection of Top Level Domains (TLDs) suffixes, e.g. `.com`, `.net`, *Country Top Level Domains* (ccTLDs) like `.de` and `.cn` and *[Brand Top Level Domains](https://icannwiki.org/Brand_TLD)* like `.apple` and `.google`. Can be used to:
        - avoid privacy-leaking "supercookies"
        - avoid privacy-leaking "super domain" certificates ([see post from Jeffry Walton](https://lists.gnu.org/archive/html/bug-wget/2014-03/msg00093.html))
        - domain highlighting parts of the domain in a user interface
        - sorting domain lists by site

- **file format support**

    - **file** [📁](./file) [🌐](https://github.com/GerHobbelt/file) -- `file` filetype recognizer tool & mimemagic
    - **djvulibre** [📁](./djvulibre) [🌐](https://github.com/GerHobbelt/djvulibre)
    - **extract** [📁](../../thirdparty/extract) [🌐](https://github.com/GerHobbelt/thirdparty_extract)
    - ~~**gmime** [🌐](https://github.com/jstedfast/gmime) (alternative repo [here](https://github.com/GNOME/gmime)) -- multipart MIME library; serves as a fundamental building block for full MHTML file format I/O support~~
      + **removed**; reason: GNOME libraries are horrible to integrate with other codebases.
    - **gumbo-libxml** [📁](./gumbo-libxml) [🌐](https://github.com/GerHobbelt/gumbo-libxml)
    - **gumbo-parser** [📁](../../thirdparty/gumbo-parser) [🌐](https://github.com/GerHobbelt/gumbo-parser)
    - **gumbo-query** [📁](./gumbo-query) [🌐](https://github.com/GerHobbelt/gumbo-query) -- HTML DOM access in C/C++
    - **http-parser** [📁](./http-parser) [🌐](https://github.com/GerHobbelt/http-parser)
    - **libarchive** [📁](./libarchive) [🌐](https://github.com/GerHobbelt/libarchive)
    - **libcmime** [📁](./libcmime) [🌐](https://github.com/GerHobbelt/libcmime) -- MIME extract/insert/encode/decode: use for MHTML support
    - **libexpat** [📁](./libexpat) [🌐](https://github.com/GerHobbelt/libexpat) -- XML read/write
    - **libxml2** [📁](./libxml2) [🌐](https://github.com/GerHobbelt/libxml2) -- [libxml](http://xmlsoft.org/): XML read/write
    - **libzip** [📁](./libzip) [🌐](https://github.com/GerHobbelt/libzip) -- a C library for reading, creating, and modifying zip and zip64 archives. Files can be added from data buffers, files, or compressed data copied directly from other zip archives. Changes made without closing the archive can be reverted. Decryption and encryption of Winzip AES and legacy PKware encrypted files is supported.
    - **CHM-lib** [📁](./CHM-lib) [🌐](https://github.com/GerHobbelt/CHMLib) -- as I have several HTML pages stored in this format. See also MHTML: `mht-rip`
    - **mht-rip** [📁](./mht-rip) [🌐](https://github.com/GerHobbelt/mht-rip) -- as I have several HTML pages stored in this MHTML format. See also CHM: `CHM-lib`
    - **mime-mega** [📁](./mime-mega) [🌐](https://github.com/GerHobbelt/MegaMimes) -- MIME extract/insert/encode/decode: use for MHTML support
    - **mimetic** [📁](./mimetic) [🌐](https://github.com/GerHobbelt/mimetic) -- MIME: use for MHTML support
    - **picohttpparser** [📁](./picohttpparser) [🌐](https://github.com/GerHobbelt/picohttpparser)
    - **ticpp** [📁](./ticpp) [🌐](https://github.com/GerHobbelt/ticpp) -- TinyXML++: XML read/write
    - **tidy-html5** [📁](./tidy-html5) [🌐](https://github.com/GerHobbelt/tidy-html5) -- clean up HTML documents before archiving/processing
    - **xml-pugixml** [📁](./xml-pugixml) [🌐](https://github.com/GerHobbelt/pugixml)
    - **upskirt-markdown** [📁](./upskirt-markdown) [🌐](https://github.com/GerHobbelt/soldout) -- MarkDown renderer
        - **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
            - **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr)
    - **libwarc** [📁](./libwarc) [🌐](https://github.com/GerHobbelt/libwarc) -- C++ library to parse WARC files. WARC is the official storage format of the Internet Archive for storing scraped content. WARC format used: http://bibnum.bnf.fr/WARC/WARC_ISO_28500_version1_latestdraft.pdf
    - **warc2text** [📁](./warc2text) [🌐](https://github.com/GerHobbelt/warc2text) -- Extracts plain text, language identification and more metadata from WARC records.

- **BibTeX and similar library metadata formats' support**

    - **bibtex-robust-decoder** [📁](./bibtex-robust-decoder) [🌐](https://github.com/GerHobbelt/bibtex-robust-decoder)
    - **bibutils** [📁](./bibutils) [🌐](https://github.com/GerHobbelt/bibutils) -- the `bibutils` set interconverts between various bibliography formats using a common MODS-format XML intermediate. For example, one can convert RIS-format files to Bibtex by doing two transformations: RIS->MODS->Bibtex. By using a common intermediate for N formats, only 2N programs are required and not N²-N.

- **export / output file formats, text formatting, etc.**

    - **fmt** [📁](./fmt) [🌐](https://github.com/GerHobbelt/fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
    - **hypertextcpp** [📁](./hypertextcpp) [🌐](https://github.com/GerHobbelt/hypertextcpp) -- string/text template engine & source-to-source compiler.
    - **libqrencode** [📁](./libqrencode) [🌐](https://github.com/GerHobbelt/libqrencode) -- generate QRcodes from anything (e.g. URLs). `libqrencode` is a fast and compact library for encoding data in a QR Code, a 2D symbology that can be scanned by handy terminals such as a smartphone. The capacity of QR Code is up to 7000 digits or 4000 characters and has high robustness. `libqrencode` supports QR Code model 2, described in JIS (Japanese Industrial Standards) X0510:2004 or ISO/IEC 18004. Most of features in the specification are implemented: Numeric, alphabet, Japanese kanji (Shift-JIS) or any 8 bit code, Optimized encoding of a string, Structured-append of symbols, Micro QR Code (experimental).

    - **upskirt-markdown** [📁](./upskirt-markdown) [🌐](https://github.com/GerHobbelt/soldout) -- MarkDown renderer
        - **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
            - **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr)

- **FTS (*Full Text Search*) and related: SOLR/Lucene et al: document content search**

  We'll be using SOLR mostly, but here might be some interface libraries and an intersting alternative

    - [Manticore](https://manticoresearch.com/) -- while the userbase is much smaller than for the *Lucene Gang* (Lucene/SOLR/ES/OpenSearch), this still got me. Can't say exactly why. All the other Lucene/SOLR alternatives out there didn't appeal to me (old tech, slow dev, ...).

        - **manticore-columnar** [📁](./manticore-columnar) [🌐](https://github.com/GerHobbelt/columnar)
        - **manticoresearch** [📁](./manticoresearch) [🌐](https://github.com/GerHobbelt/manticoresearch)
        - **manticore-plugins** [📁](./manticore-plugins) [🌐](https://github.com/GerHobbelt/manticore-plugins)

    - **pisa** [📁](./pisa) [🌐](https://github.com/GerHobbelt/pisa) -- a text search engine able to run on large-scale collections of documents. It allows researchers to experiment with state-of-the-art techniques, allowing an ideal environment for rapid development. PISA is a text search engine, though the "PISA Project" is a set of tools that help experiment with indexing and query processing. Given a text collection, PISA can build an inverted index over this corpus, allowing the corpus to be searched. The inverted index, put simply, is an efficient data structure that represents the document corpus by storing a list of documents for each unique term (see here). At query time, PISA stores its index in main memory for rapid retrieval.

    - **stemmers**:
        - **libstemmer** [📁](./libstemmer) [🌐](https://github.com/GerHobbelt/libstemmer) -- SnowBall stemmer for many languages.
        - **snowball** [📁](./snowball) [🌐](https://github.com/GerHobbelt/snowball) -- SnowBall stemming compiler (code generator)

    - **language detection / inference**:
        - **cld2-language-detect** [📁](./cld2-language-detect) [🌐](https://github.com/GerHobbelt/cld2) -- CLD2 probabilistically detects over 80 languages in Unicode UTF-8 text, either plain text or HTML/XML. For mixed-language input, CLD2 returns the top three languages found and their approximate percentages of the total text bytes.  Optionally, it also returns a vector of text spans with the language of each identified. The design target is web pages of at least 200 characters (about two sentences); CLD2 is not designed to do well on very short text.
        - **uchardet** [📁](./uchardet) [🌐](https://github.com/GerHobbelt/uchardet) -- [uchardet](https://www.freedesktop.org/wiki/Software/uchardet/) is an encoding and language detector library, which attempts to determine the encoding of the text. It can reliably detect many charsets. Moreover it also works as a very good and fast language detector.

- **scripting *user-tunable tasks* such as OCR preprocessing, metadata extraction, metadata cleaning & other \[post-]processing, ...**

    - **mujs** [📁](../../thirdparty/mujs) [🌐](https://github.com/GerHobbelt/mujs) -- a lightweight ES5 Javascript interpreter designed for embedding in other software to extend them with scripting capabilities.
    - ~~**CPython** [🌐](https://github.com/python/cpython)~~
      + **removed**; reason: we've decided to offer any application user facing scripting features in JavaScript only: Python and the others can use socket-based messaging when someone wants to write their user scripts in any of those languages.

        The additional (and more important) reason to ditch CPython from the R&D set is hairiness of integrating Python into an application as an embedded scripting language, instead of the other way around. With the envisioned advent of ZeroMQ/socket based IPC, any Python scripts can hook into that instead of spending the effort and maintenance of having that large language as an embedded 'assistive' scripting/configuration language: it's simply too huge and complicated. We're not Blender and we don't have the funding.
    - **ECMA262** [📁](./ECMA262) [🌐](https://github.com/GerHobbelt/ecma262)
    - ~~**lua** [🌐](https://github.com/lua/lua)~~
      + **removed**; reason: we've decided to offer any application user facing scripting features in JavaScript only: Python and the others can use socket-based messaging when someone wants to write their user scripts in any of those languages. See also the `CPython` entry.
    - ~~**luaJIT** [🌐](https://github.com/LuaJIT/LuaJIT)~~
      + **removed**; reason: see the `lua` entry above.
    - **QuickJS** [📁](./QuickJS) [🌐](https://github.com/GerHobbelt/quickjs)
        - **txiki** [📁](./txiki.js) [🌐](https://github.com/GerHobbelt/txiki.js) -- uses QuickJS as its kernel
        - **QuickJS-C++-Wrapper** [📁](./QuickJS-C++-Wrapper) [🌐](https://github.com/GerHobbelt/quickjscpp)
        - **QuickJS-C++-Wrapper2** [📁](./QuickJS-C++-Wrapper2) [🌐](https://github.com/GerHobbelt/quickjspp)
        - **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
    - **ScriptX** [📁](./ScriptX) [🌐](https://github.com/GerHobbelt/ScriptX) -- wrapper for V8, QuickJS, Lua, Python, ...
    - **VisualScriptEngine** [📁](./VisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngine) -- A visual scripting engine designed for embedding. The engine is written in modern C++ and compiles on several platforms with no external dependencies.
    - **wxVisualScriptEngine** [📁](./wxVisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngineWxWidgets) -- a utility module for [VisualScriptEngine](https://github.com/kovacsv/VisualScriptEngine) which provides helper classes for embedding the engine in a wxWidgets application.

    - **replxx** [📁](./replxx) [🌐](https://github.com/GerHobbelt/replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
    - **linenoise** [📁](./linenoise) [🌐](https://github.com/GerHobbelt/linenoise) -- `readline` simile for REPL/interactive runs in a CLI

- **multi-processing core technologies**

    - **CLI: commandline parsing & perusing**
        + **cli11** [📁](./cli11) [🌐](https://github.com/GerHobbelt/CLI11) -- command line options parser
        + **clipp** [📁](./clipp) [🌐](https://github.com/GerHobbelt/clipp) -- commandline parser
        + ~~**clippson** [🌐](https://github.com/heavywatal/clippson) -- commandline parser + JSON data diagnostical dumper~~
          + **removed**; reason: deemed cool but unsuitable for our needs. Besides, we intend to use `cli11` instead of `clipp` for that library is easier to read and support is more active there.
        + ~~**docopt** [🌐](https://github.com/docopt/docopt.cpp) -- generate documentation for command line options~~
          + **removed**; reason: deemed cool but unsuitable for our needs. We intend to use `cli11` instead.

    - **CPU features & capabilities detection**

        - ~~**cpu_features** [🌐](https://github.com/google/cpu_features)~~
          + **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.
        - ~~**cpu_stat** [🌐](https://github.com/vivaladav/cpu-stat)~~
          + **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.
        - ~~**cpuinfo** [📁](./cpuinfo) [🌐](https://github.com/GerHobbelt/cpuinfo) -- CPU & hardware info~~
          + **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.
        - **infoware** [📁](./infoware) [🌐](https://github.com/GerHobbelt/infoware) -- C++ Library for pulling system and hardware information, without hitting the command line.
        - **libcpuid** [📁](./libcpuid) [🌐](https://github.com/GerHobbelt/libcpuid) -- CPU & hardware info
        - **spy-build-sysinfo** [📁](./spy-build-sysinfo) [🌐](https://github.com/GerHobbelt/spy) -- build system info

    - **run-time library core features: logging, formatting, ...**

        - **expected-lite** [📁](./expected-lite) [🌐](https://github.com/GerHobbelt/expected-lite) -- a single-file header-only library to represent value objects that either contain a valid value or an error. The library is a partly implementation of the proposal for [`std::expected`](https://en.cppreference.com/w/cpp/utility/expected) for use with C++11 and later.
        - **fmt** [📁](./fmt) [🌐](https://github.com/GerHobbelt/fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
        - **hypertextcpp** [📁](./hypertextcpp) [🌐](https://github.com/GerHobbelt/hypertextcpp) -- string/text template engine & source-to-source compiler.
        - **frozen** [📁](./frozen) [🌐](https://github.com/GerHobbelt/frozen) -- provides 0 cost initialization for immutable containers, fixed-size containers, and various algorithms.
        - **hedley** [📁](./hedley) [🌐](https://github.com/GerHobbelt/hedley) -- a C/C++ header file designed to smooth over some platform-specific annoyances.
        - **libscanf** [📁](./libscanf) [🌐](https://github.com/GerHobbelt/scnlib)
        - **magic_enum** [📁](./magic_enum) [🌐](https://github.com/GerHobbelt/magic_enum) -- Header-only C++17 library provides static reflection for enums; works with any enum type without any macro or boilerplate code.
        - **messagebox-windows** [📁](./messagebox-windows) [🌐](https://github.com/GerHobbelt/messagebox-windows) -- drive `MessageBox` and `MessageBeep` Win32 APIs
        - **pcg-c-random** [📁](./pcg-c-random) [🌐](https://github.com/GerHobbelt/pcg-c) -- a C implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
        - **pcg-cpp-random** [📁](./pcg-cpp-random) [🌐](https://github.com/GerHobbelt/pcg-cpp) -- a C++ implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
        - **plf_nanotimer** [📁](./plf_nanotimer) [🌐](https://github.com/GerHobbelt/plf_nanotimer) -- high precision cross-platform performance timer
        - **prio_queue** [📁](./prio_queue) [🌐](https://github.com/GerHobbelt/prio_queue) -- a cache friendly priority queue, done as a B-heap.
        - **randen** [📁](./randen) [🌐](https://github.com/GerHobbelt/randen) -- What if we could default to attack-resistant random generators without excessive CPU cost? We introduce 'Randen', a new generator with security guarantees; it outperforms MT19937, pcg64_c32, Philox, ISAAC and ChaCha8 in real-world benchmarks. This is made possible by AES hardware acceleration and a large Feistel permutation.
        - **stdext-path** [📁](./stdext-path) [🌐](https://github.com/GerHobbelt/stdext-path) -- path manipulations (`dirname` et al)
            - **taolog** [📁](./taolog) [🌐](https://github.com/GerHobbelt/taolog) -- A Win32 logger based on DebugView & ETW.

    - **running tasks in parallel: multi-processing, multithreading, async, ...**

        + **createprocess-windows** [📁](./createprocess-windows) [🌐](https://github.com/GerHobbelt/createprocess-windows) -- drive `CreateProcess` Win32 API
        + **libtuv** [📁](./libtuv) [🌐](https://github.com/GerHobbelt/libtuv) -- a multi-platform tiny event library refactored from `libuv` source for IoT and embedded systems.
        + **libunifex** [📁](./libunifex) [🌐](https://github.com/GerHobbelt/libunifex) -- a prototype implementation of the C++ sender/receiver async programming model that is currently being considered for standardisation. This project contains implementations of the following: Schedulers, Timers, Asynchronous I/O, Algorithms that encapsulate certain concurrency patterns, Async streams, Cancellation, Coroutine integration.
        + **oneTBB** [📁](./oneTBB) [🌐](https://github.com/GerHobbelt/oneTBB) -- Intel's Thread Building Blocks library: used with OpenImageIO, ...
        + **pevents** [📁](./pevents) [🌐](https://github.com/GerHobbelt/pevents) -- Win32 events for *nix/POSIX platforms, built on top of `pthreads`. `pevents` provides most of the functionality of both manual- and auto-reset events on Windows, most-notably including simultaneous waits on multiple events (à la `WaitForMultipleObjects`). `pevents` also doubles as a thin, sane wrapper for `CreateEvent()` & co. on Windows, meaning you can use `pevents` directly in your cross-platform code without `#ifdef`s for Windows/pthreads. While POSIX condition variables (pthread_cond_t) and WIN32 events both provide the essential building blocks of the synchronization primitives required to write multithreaded code with signaling, the nature of the differences between the two have lent their way towards creating different synchronization and multithreaded-programming paradigms. The only features not included are only named events and support for security attributes. To the author's best knowledge, this is the only implementation of WIN32 events available for Linux and other posix platforms that provides support for simultaneously waiting on multiple events. Depending on your needs, we've been told that pevents may be used as a lightweight alternative to libuv/libev while still allowing your code to embrace asynchronous event handling with ease.
        + **pthread-win32** [📁](./pthread-win32) [🌐](https://github.com/GerHobbelt/pthread-win32) -- `pthread` for MS Windows
        + **subprocess** [📁](./subprocess) [🌐](https://github.com/GerHobbelt/subprocess) -- [benman64/subprocess](https://github.com/benman64/subprocess): cross platform subprocess library for C++ similar to design of Python `subprocess`.
        + **tiny-process-library** [📁](./tiny-process-library) [🌐](https://github.com/GerHobbelt/tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
        + https://github.com/rajatjain1997/subprocess -- A C++ high level library for running shell processes
        + https://github.com/arun11299/cpp-subprocess -- as close as possible to Python2.7 `subprocess` module in dealing with processes.
        + https://github.com/pnappa/subprocesscpp -- A header-only library that allows you to execute processes either synchronously or asynchronously, whilst providing input and output handling. No more calling `exec` in C++!
        + https://github.com/sheredom/subprocess.h -- A one header solution to launching processes and interacting with them for C/C++.

    - **multi-processing: invoking external applications**

        + **subprocess** [📁](./subprocess) [🌐](https://github.com/GerHobbelt/subprocess) -- [benman64/subprocess](https://github.com/benman64/subprocess) -- cross platform subprocess library for C++ similar to design of Python `subprocess`.
        + **tiny-process-library** [📁](./tiny-process-library) [🌐](https://github.com/GerHobbelt/tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
        + https://github.com/rajatjain1997/subprocess -- A C++ high level library for running shell processes
        + https://github.com/arun11299/cpp-subprocess -- as close as possible to Python2.7 `subprocess` module in dealing with processes.
        + https://github.com/pnappa/subprocesscpp -- A header-only library that allows you to execute processes either synchronously or asynchronously, whilst providing input and output handling. No more calling `exec` in C++!
        + https://github.com/sheredom/subprocess.h -- A one header solution to launching processes and interacting with them for C/C++.
        + **createprocess-windows** [📁](./createprocess-windows) [🌐](https://github.com/GerHobbelt/createprocess-windows) -- drive `CreateProcess` Win32 API

    - **thread pools**

        + **thread-pool-c** [📁](./thread-pool-c) [🌐](https://github.com/GerHobbelt/C-Thread-Pool)
        + **thread-pool-cpp** [📁](./thread-pool-cpp) [🌐](https://github.com/GerHobbelt/thread-pool-cpp)
        + **thread-pool** [📁](./thread-pool) [🌐](https://github.com/GerHobbelt/thread-pool) -- `BS::thread_pool`: a fast, lightweight, and easy-to-use C++17 thread pool for high-performance scientific computing.

    - **task schedulers**

      - **enkiTS** [📁](./enkiTS-TaskScheduler) [🌐](https://github.com/GerHobbelt/enkiTS) -- A C++11 Task Scheduler for creating parallel programs.

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

      - **google::marl** [📁](./google-marl) [🌐](https://github.com/GerHobbelt/marl) -- a hybrid thread / fiber task scheduler written in C++ 11. Marl uses a combination of fibers and threads to allow efficient execution of tasks that can block, while keeping a fixed number of hardware threads.
      - **taskflow** [📁](./taskflow) [🌐](https://github.com/GerHobbelt/taskflow) -- Quickly write parallel and heterogeneous task programs in modern C++. Taskflow is faster, more expressive, and easier for drop-in integration than many of existing task programming frameworks in handling complex parallel workloads.
      - **asynqro** [📁](./asynqro) [🌐](https://github.com/GerHobbelt/asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.

    - **Promise/A+**

      The key distinction between Promises/A+ and `std::promise` in C++11 is that Promises/A+ provides non-blocking synchronization (via chaining function objects) and `std::promise` provides blocking synchronization (or polling). Both have their uses and one is not a direct replacement for the other.

      IMPORTANT NOTE: there is one major difference, though. Most modern Javascript promises (including JS Native promises) resolve asynchronously, i.e. their `resolve()` method does not directly call the `then()` handlers, but schedules the calls on the next message loop iteration. The same happens when a `then()`/`catch()` handler is attached to an already resolved/rejected promise. This may be a bit less efficient, but makes the behavior symmetric and more predictable. These libraries *SHOULD* resolve synchronously, because they are unaware of the message loop that is used in the application. (Look into task schedulers above for when you need such awareness, e.g. `taskflow`.)

        - **promise-cpp** [📁](./promise-cpp) [🌐](https://github.com/GerHobbelt/promise-cpp) -- advanced C++ promise/A+ library in Javascript style
        - **promise-hpp** [📁](./promise-hpp) [🌐](https://github.com/GerHobbelt/promise.hpp) -- C++ asynchronous promises like a Promises/A+
        - **libq** [📁](./libq) [🌐](https://github.com/GerHobbelt/q) -- A platform-independent promise library for C++, implementing asynchronous continuations.
        - **asynqro** [📁](./asynqro) [🌐](https://github.com/GerHobbelt/asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.
        - https://github.com/rhashimoto/poolqueue -- C++ Asynchronous Promises, inspired by Promises/A+.
        - https://github.com/YACLib/YACLib -- Yet Another lightweight C++ library for concurrent and parallel task execution.
        - https://github.com/alxvasilev/cpp-promise -- Javascript-like C++ promise library

- **web servers, generic sockets I/O (IPC)**

    + **civetweb** [📁](./civetweb) [🌐](https://github.com/GerHobbelt/civetweb) -- an easy to use, powerful, C (C/C++) embeddable web server with optional CGI, SSL and Lua support.
    + **crow** [📁](./crow) [🌐](https://github.com/GerHobbelt/crow) -- IPC / server framework
    + **drogon** [📁](./drogon) [🌐](https://github.com/GerHobbelt/drogon) -- a C++14/17-based HTTP application framework to easily build various types of web application server programs.
    + **h2o-server** [📁](./h2o-server) [🌐](https://github.com/GerHobbelt/h2o) -- an optimized HTTP/1, HTTP/2, HTTP/3 server.
    + ~~**libmicrohttpd** [🌐](https://github.com/Karlson2k/libmicrohttpd)~~
      + **removed**; reason: we've decided on using `crow` as the main server framework. Second choices are `civetweb` and `h2o`. This GNU library is way too 'Unix-is-the-world' oriented for a smooth portable dev experience.
    + ~~**oatpp** [🌐](https://github.com/oatpp/oatpp) -- IPC / server framework~~
      + **removed**; reason: we've decided on using `crow` as the main server framework.
    + **proxygen** [📁](./proxygen) [🌐](https://github.com/GerHobbelt/proxygen) -- the core C++ HTTP abstractions used at Facebook. Internally, it is used as the basis for building many HTTP servers, proxies, and clients, focusing on the common HTTP abstractions and our simple HTTPServer framework. The framework supports HTTP/1.1, SPDY/3, SPDY/3.1, HTTP/2, and HTTP/3.
    + **wget** [📁](./wget) [🌐](https://github.com/GerHobbelt/wget)

- **socket I/O: websockets**

    - **libwebsocketpp** [📁](./libwebsocketpp) [🌐](https://github.com/GerHobbelt/websocketpp) -- WebSocket++ is a header only C++ library that implements RFC6455 The WebSocket Protocol.
    - **libwebsockets** [📁](./libwebsockets) [🌐](https://github.com/GerHobbelt/libwebsockets) -- a simple-to-use C library providing client and server for HTTP/1, HTTP/2, WebSockets, MQTT and other protocols. It supports a lot of lightweight ancilliary implementations for things like JSON, CBOR, JOSE, COSE. It's very gregarious when it comes to event loop sharing, supporting libuv, libevent, libev, sdevent, glib and uloop, as well as custom event libs.
    - **websocket-sharp** [📁](./websocket-sharp) [🌐](https://github.com/GerHobbelt/websocket-sharp) -- a C# implementation of the WebSocket protocol client and server.

- **disk I/O, monitoring import locations, ...**

    + **efsw** [📁](./efsw) [🌐](https://github.com/GerHobbelt/efsw) -- cross-platform file system watcher and notifier
    + **glob** [📁](./glob) [🌐](https://github.com/GerHobbelt/glob) -- directory scanner
    + **filesystem** [📁](./filesystem) [🌐](https://github.com/GerHobbelt/filesystem) -- a header-only single-file `std::filesystem` compatible helper library, based on the C++17 and C++20 specs, but implemented for C++11, C++14, C++17 or C++20 (tightly following the C++17 standard with very few documented exceptions). It is of course in its own namespace `ghc::filesystem` to not interfere with a regular `std::filesystem` should you use it in a mixed C++17 environment (which is possible).

- **configuration / parameterization**

    + **gflags** [📁](./gflags) [🌐](https://github.com/GerHobbelt/gflags) -- google::flags library, used by other libs in this set.
    + ~~**inih** [🌐](https://github.com/benhoyt/inih)~~
      + **removed**; reason: we've decided on using `libconfig` for configuration files.
    + ~~**iniparser** [🌐](https://github.com/ndevilla/iniparser)~~
      + **removed**; reason: we've decided on using `libconfig` for configuration files.
    + **libconfig** [📁](./libconfig) [🌐](https://github.com/GerHobbelt/libconfig) -- generic config (file) reader/writer
    + **TOML**
        + **tomlpp** [📁](./tomlpp) [🌐](https://github.com/GerHobbelt/tomlplusplus) -- TOML++
    + **YAML**
        + **libyaml** [📁](./libyaml) [🌐](https://github.com/GerHobbelt/libyaml) -- YAML
        + **libcyaml** [📁](./libcyaml) [🌐](https://github.com/GerHobbelt/libcyaml)
        + **libyaml-examples** [📁](./libyaml-examples) [🌐](https://github.com/GerHobbelt/libyaml-examples)
        + **libfyaml** [📁](./libfyaml) [🌐](https://github.com/GerHobbelt/libfyaml)
        + **yaml-test-suite** [📁](./yaml-test-suite) [🌐](https://github.com/GerHobbelt/yaml-test-suite)
        + **yaml-cpp** [📁](./yaml-cpp) [🌐](https://github.com/GerHobbelt/yaml-cpp)
        + **rapidyaml** [📁](./rapidyaml) [🌐](https://github.com/GerHobbelt/rapidyaml)

- **testing & fuzzing**

    - **googletest** [📁](./googletest) [🌐](https://github.com/GerHobbelt/googletest)
    - **gbenchmark** [📁](./gbenchmark) [🌐](https://github.com/GerHobbelt/benchmark)
    - **cxxtest_catch_2_gtest** [📁](./cxxtest_catch_2_gtest) [🌐](https://github.com/GerHobbelt/cxxtest_catch_2_gtest) -- quick & dirty converter from various test suites to googletest, i.e. allows us to use a single test framework, despite some libraries having been set up to use another, e.g. [Catch2](https://github.com/catchorg/Catch2).

- **logging & debugging**

    + **binlog** [📁](./binlog) [🌐](https://github.com/GerHobbelt/binlog) -- a high performance C++ log library to produce structured binary logs.
    + **breakpad** [📁](./breakpad) [🌐](https://github.com/GerHobbelt/breakpad) -- a set of client and server components which implement a crash-reporting system.
    + ~~**EasyLogger** [🌐](https://github.com/armink/EasyLogger) -- an ultra-lightweight (ROM<1.6K, RAM<0.3K), high-performance C/C++ log library, very suitable for resource-sensitive software projects. Compared with the well-known C/C++ log libraries such as log4c and zlog, EasyLogger has simpler functions and provides fewer interfaces to users, but it will be quick to get started. More practical functions support dynamic expansion in the form of plug-ins.~~
      + **removed**; reason: we've decided on using `glog` as the logging library for everything: while that one isn't perfect, most of the other stuff we've been looking at is using that one already and it matches our needs 80% of the time, while I'm okay with patching that library for the other 20% (syslog-like use, i.e. logging to localhost logging server where all logging is collected -- these log messages should travel across as part of the ZeroMQ message streams.)
    + **fmt** [📁](./fmt) [🌐](https://github.com/GerHobbelt/fmt)
    + **glog** [📁](./glog) [🌐](https://github.com/GerHobbelt/glog) -- Google Logging is a C++98 library that implements application-level logging. The library provides logging APIs based on C++-style streams and various helper macros.
    + **libassert** [📁](./libassert) [🌐](https://github.com/GerHobbelt/libassert) -- the most over-engineered and overpowered C++ assertion library. **Library philosophy**: Provide as much helpful diagnostic info as possible.
    + ~~**log4cplus** [🌐](https://github.com/log4cplus/log4cplus)~~
      + **removed**; reason: we've decided on using `glog` as the logging library for everything. log4cplus, at the same time, is a tad too much. (I consider `log4j` et al *overdone* as it caters to every need instead of just providing those things as contrib code which can be integrated at need -- should not be as far run-time configurable as it currently is.)
    + **MuPDF itself**  [📁](../../) [🌐](https://github.com/GerHobbelt/mupdf)
    + **plf_nanotimer** [📁](./plf_nanotimer) [🌐](https://github.com/GerHobbelt/plf_nanotimer) -- high precision cross-platform performance timer
    + **replxx** [📁](./replxx) [🌐](https://github.com/GerHobbelt/replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
    + **resumable-assert** [📁](./resumable-assert) [🌐](https://github.com/GerHobbelt/resumable-assert)
    + ~~**spdlog** [🌐](https://github.com/gabime/spdlog)~~
      + **removed**; reason: we've decided on using `glog` as the logging library for everything. `spdlog` has some nice features but in the end it was easy of cross-platform compilation and installed base that won out here...
    + **taolog** [📁](./taolog) [🌐](https://github.com/GerHobbelt/taolog) -- A Win32 logger based on DebugView & ETW.
    + **uberlog** [📁](./uberlog) [🌐](https://github.com/GerHobbelt/uberlog) -- a cross platform C++ logging system that is focused on fast and small, writing to a shared memory ring buffer.
    + ~~**zlog** [🌐](https://github.com/HardySimpson/zlog)~~
      + **removed**; `zlog` has a nice overall design but is too 'Unix-is-the-world' in its coding: in the end it was easy of cross-platform compilation of `glog` that won the day and I'm okay with layering on top of that one to get the zlog category and other channel features, once I really need them.

    + **ETW (Event Tracing for Microsoft Windows)**
        - **UIforETW** [📁](./UIforETW) [🌐](https://github.com/GerHobbelt/UIforETW) -- Bruce Dawson's user interface for recording ETW (Event Tracing for Windows) traces, which allow amazingly deep investigations of performance problems on Windows.
        - **krabsETW** [📁](./krabsETW) [🌐](https://github.com/GerHobbelt/krabsetw) -- a C++ library that simplifies interacting with ETW. It allows for any number of traces and providers to be enabled and for client code to register for event notifications from these traces.
        - **tracelogging-for-ETW** [📁](./tracelogging-for-ETW) [🌐](https://github.com/GerHobbelt/tracelogging) -- C++ Wrapper for Windows ETW TraceLogging
        - **Sealighter** [📁](./Sealighter) [🌐](https://github.com/GerHobbelt/Sealighter) -- Sysmon-Like research tool for ETW: helps non-developers dive into researching Event Tracing for Windows (ETW) and Windows PreProcessor Tracing (WPP).
        - **Windows10EtwEvents** [📁](./Windows10EtwEvents) [🌐](https://github.com/GerHobbelt/Windows10EtwEvents) -- Events from all manifest-based and mof-based ETW providers across Windows 10 versions.
        - **EtwExplorer** [📁](./EtwExplorer) [🌐](https://github.com/GerHobbelt/EtwExplorer) -- View ETW Provider metadata. Event Tracing for Windows (ETW) is a logging facility built into the Windows OS. Modern providers register a manifest that describes all the events they support, with their properties. Classic providers register a MOF instead.
        - **SilkETW** [📁](./SilkETW) [🌐](https://github.com/GerHobbelt/SilkETW) -- SilkETW & SilkService are flexible C# wrappers for ETW, they are meant to abstract away the complexities of ETW and give people a simple interface to perform research and introspection. While both projects have obvious defensive (and offensive) applications they should primarily be considered as research tools.

- **telemetry**

  - **ms_cpp_client_telemetry** [📁](./ms_cpp_client_telemetry) [🌐](https://github.com/GerHobbelt/cpp_client_telemetry) -- 1DS C/C++ SDK enables cross-platform telemetry collection from various Microsoft products. It enables data / telemetry upload to Collector++. 1DS (One Data Strategy), also known as One Observability, is a cross-org initiative with five teams across the company coming together to unify multiple telemetry efforts at Microsoft. Collector++ is the externally-facing destination end-point where telemetry data is uploaded to that subsequently routes the data to Microsoft internal data pipeline.
  - **opentelemetry-cpp** [📁](./opentelemetry-cpp) [🌐](https://github.com/GerHobbelt/opentelemetry-cpp) -- The OpenTelemetry C++ Client

- **OCR core (*tesseract*)**

    + **langdata_LSTM** [📁](../../thirdparty/langdata_LSTM) [🌐](https://github.com/GerHobbelt/langdata_lstm)
    + **tessconfigs** [📁](../../thirdparty/tessconfigs) [🌐](https://github.com/GerHobbelt/tessconfigs)
    + **tessdata** [📁](../../thirdparty/tessdata) [🌐](https://github.com/GerHobbelt/tessdata)
    + **tessdata_best** [📁](../../thirdparty/tessdata_best) [🌐](https://github.com/GerHobbelt/tessdata_best)
    + **tessdata_contrib** [📁](../../thirdparty/tessdata_contrib) [🌐](https://github.com/GerHobbelt/tessdata_contrib)
    + **tessdata_fast** [📁](../../thirdparty/tessdata_fast) [🌐](https://github.com/GerHobbelt/tessdata_fast)
    + **tessdoc** [📁](../../thirdparty/tessdoc) [🌐](https://github.com/GerHobbelt/tessdoc)
    + **tesseract** [📁](../../thirdparty/tesseract) [🌐](https://github.com/GerHobbelt/tesseract)
    + **tesseract_docs** [📁](../../thirdparty/tesseract_docs) [🌐](https://github.com/GerHobbelt/tesseract_docs)
    + **tesseract_langdata** [📁](../../thirdparty/tesseract_langdata) [🌐](https://github.com/GerHobbelt/langdata)
    + **tesstrain** [📁](../../thirdparty/tesstrain) [🌐](https://github.com/GerHobbelt/tesstrain)

- **PDF render & metadata core (*mupdf*)**

    + **extract** [📁](../../thirdparty/extract) [🌐](https://github.com/GerHobbelt/thirdparty_extract)
    + **freeglut** [📁](../../thirdparty/freeglut) [🌐](https://github.com/GerHobbelt/thirdparty-freeglut)
    + **freetype** [📁](../../thirdparty/freetype) [🌐](https://github.com/GerHobbelt/thirdparty-freetype2)
    + **harfbuzz** [📁](../../thirdparty/harfbuzz) [🌐](https://github.com/GerHobbelt/thirdparty-harfbuzz)
    + **jbig2dec** [📁](../../thirdparty/jbig2dec) [🌐](https://github.com/GerHobbelt/jbig2dec) -- a decoder library and example utility implementing the JBIG2 bi-level image compression spec. Also known as ITU T.88 and ISO IEC 14492, and included by reference in Adobe's PDF version 1.4 and later.
    + **lcms2** [📁](../../thirdparty/lcms2) [🌐](https://github.com/GerHobbelt/thirdparty-lcms2) -- `lcms2mt` is a thread-safe fork of `lcms` (a.k.a. Little CMS). Little CMS intends to be a small-footprint color management engine, with special focus on accuracy and performance. It uses the International Color Consortium standard (ICC), which is the modern standard when regarding to color management. The ICC specification is widely used and is referred to in many International and other de-facto standards. It was approved as an International Standard, ISO 15076-1, in 2005. Little CMS is a **full implementation** of ICC specification 4.3, it fully supports all kind of V2 and V4 profiles, including abstract, devicelink and named color profiles.
    + **leptonica** [📁](../../thirdparty/leptonica) [🌐](https://github.com/GerHobbelt/leptonica)
    + **libjpeg** [📁](../../thirdparty/libjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-libjpeg)
    + **libpng** [📁](../../thirdparty/libpng) [🌐](https://github.com/GerHobbelt/libpng)
    + **libtiff** [📁](../../thirdparty/libtiff) [🌐](https://github.com/GerHobbelt/libtiff)
    + **openjpeg** [📁](../../thirdparty/openjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-openjpeg)
    + **zlib** [📁](../../thirdparty/zlib) [🌐](https://github.com/GerHobbelt/thirdparty-zlib)

- **UI / GUI**

    + **horsejs** [📁](./horsejs) [🌐](https://github.com/GerHobbelt/horsejs) -- a framework similar to Electron. Unlike Electron, it has no built-in Node.js, but directly uses C++ to provide most of Electron's capabilities, such as accessing files using JavaScript, opening dialog boxes, creating new windows, etc. Since there is no Node.js, HorseJs runs faster, uses less memory, and is more stable.
    + **neutralinoJS** [📁](./neutralinoJS) [🌐](https://github.com/GerHobbelt/neutralinojs) -- a lightweight and portable desktop application development framework. It lets you develop lightweight cross-platform desktop applications using JavaScript, HTML and CSS. Neutralinojs offers a lightweight SDK which is an alternative for Electron and NW.js. Neutralinojs doesn't bundle Chromium and uses the existing web browser library in the operating system. Neutralinojs implements a WebSocket connection for native operations and embeds a static web server to serve the web content. Also, it offers a built-in [JavaScript client library](https://github.com/neutralinojs/neutralino.js) for developers.
    + **neutralinoJS-CLI** [📁](./neutralinoJS-CLI) [🌐](https://github.com/GerHobbelt/neutralinojs-cli) -- The official CLI of Neutralinojs.
    + **photino.native** [📁](./photino.native) [🌐](https://github.com/GerHobbelt/photino.Native) -- Photino is a lightweight open-source framework for building native, cross-platform desktop applications with Web UI technology. Photino uses the OSs built-in WebKit-based browser control for Windows, macOS and Linux. Photino is the lightest cross-platform framework compared to Electron.
    + **webview** [📁](./webview) [🌐](https://github.com/GerHobbelt/webview) -- cross-platform embedding of the system-default web browser: a tiny cross-platform webview library for C/C++/Golang to build modern cross-platform GUIs. The goal of the project is to create a common HTML5 UI abstraction layer for the most widely used platforms. It supports two-way JavaScript bindings (to call JavaScript from C/C++/Go and to call C/C++/Go from JavaScript).
    + **wxWidgets** [📁](./wxWidgets) [🌐](https://github.com/GerHobbelt/wxWidgets) -- cross-platform GUI framework.
    + **wxCharts** [📁](./wxCharts) [🌐](https://github.com/GerHobbelt/wxCharts) -- charts for wxWidgets
    + **wxFormBuilder** [📁](./wxFormBuilder) [🌐](https://github.com/GerHobbelt/wxFormBuilder) -- resource editor and GUI designer
    + **wxPDFView** [📁](./wxPDFView) [🌐](https://github.com/GerHobbelt/wxPDFView) -- wxWidgets PDF viewer/reader control
    + **wxWebViewChromium** [📁](./wxWebViewChromium) [🌐](https://github.com/GerHobbelt/wxWebViewChromium) -- Chromium CEF3-based embedded browser for wxWidgets
    + **scintilla** [📁](./scintilla) [🌐](https://github.com/GerHobbelt/scintilla) -- text editor
    + **wxExamples** [📁](./wxExamples) [🌐](https://github.com/GerHobbelt/Examples_wxWidgets) -- examples using wxWidgets
    + **wxMEdit** [📁](./wxMEdit) [🌐](https://github.com/GerHobbelt/wxMEdit) -- a cross-platform Text/Hex Editor written in C++ & wxWidgets. wxMEdit supports many useful functions, e.g. Bookmark, Syntax Highlightings, Word Wraps, Encodings and Column/Hex Modes.
    + **wxSQLite3** [📁](./wxSQLite3) [🌐](https://github.com/GerHobbelt/wxsqlite3) -- a C++ wrapper around the SQLite 3.x database and is specifically designed for use in programs based on the wxWidgets library. **wxSQLite3** does not try to hide the underlying database, in contrary almost all special features of the current SQLite3 version are supported, like for example the creation of user defined scalar or aggregate functions.
    + **wxVisualScriptEngine** [📁](./wxVisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngineWxWidgets) -- a utility module for [VisualScriptEngine](https://github.com/kovacsv/VisualScriptEngine) which provides helper classes for embedding the engine in a wxWidgets application.

- **misc / other**

    + ~~**binary_bakery** [🌐](https://github.com/s9w/binary_bakery) -- resource compiler-like tool: embed any data in your C/C++ application~~
      + **removed**; reason: we already have `bin2coff` from MuPDF, which serves this purpose well enough.
    + **preprocess-corpuses** [📁](./preprocess-corpuses) [🌐](https://github.com/GerHobbelt/preprocess) -- Pipelines for preprocessing corpora.

- **sub-dependencies (libraries which are required by any of the above)**

    + **boost** [📁](./boost) [🌐](https://github.com/GerHobbelt/boost) -- required by several other libraries in this collection
    + ~~**Catch2** [🌐](https://github.com/catchorg/Catch2)~~
      + **removed**; reason: we've decided to standardize on a single unittest library (which is well supported in Microsoft Visual Studio, including the Test Explorer view there); where necessary, we'll have to provide a translation layer instead when existing submodules use different test rigs originally.
    + **gflags** [📁](./gflags) [🌐](https://github.com/GerHobbelt/gflags) -- google::flags library, used by other libs in this set.
    + **glib2** [📁](./glib2) [🌐](https://github.com/GerHobbelt/glib) -- GLib is the low-level core library that forms the basis for projects such as GTK and GNOME.
    + ~~**Imath** [🌐](https://github.com/AcademySoftwareFoundation/Imath) -- float16 support lib for OpenEXR format~~
    + **jemalloc** [📁](./jemalloc) [🌐](https://github.com/GerHobbelt/jemalloc)
    + **mimalloc** [📁](./mimalloc) [🌐](https://github.com/GerHobbelt/mimalloc) -- a compact general purpose allocator with excellent performance.
    + **snmalloc** [📁](./snmalloc) [🌐](https://github.com/GerHobbelt/snmalloc) -- a high-performance allocator.
    + **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf)
    + **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
    + **libidn2** [📁](./libidn2) [🌐](https://github.com/GerHobbelt/libidn2)
    + **nanosvg** [📁](./nanosvg) [🌐](https://github.com/GerHobbelt/nanosvg)
    + **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- also used by cURL et al, incidentally.
    + **pcre** [📁](./pcre) [🌐](https://github.com/GerHobbelt/pcre)
    + ~~**protobuf** [🌐](https://github.com/protocolbuffers/protobuf)~~
    + **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
    + **ticpp** [📁](./ticpp) [🌐](https://github.com/GerHobbelt/ticpp) -- TinyXML++: XML read/write (is part of wxFormbuilder).
    + **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr)
    + **tlx** [📁](./tlx) [🌐](https://github.com/GerHobbelt/tlx) -- a collection of C++ helpers and extensions universally needed, but not found in the STL.
    + **tsf** [📁](./tsf) [🌐](https://github.com/GerHobbelt/tsf) -- type-safe printf equivalent for C++ (used by the uberlog submodule)
    + **uint128_t** [📁](./uint128_t) [🌐](https://github.com/GerHobbelt/uint128_t)
    + **scintilla** [📁](./scintilla) [🌐](https://github.com/GerHobbelt/scintilla) -- text editor (part of wxWidgets)
    + **htmlstreamparser** [📁](./htmlstreamparser) [🌐](https://github.com/GerHobbelt/htmlstreamparser) -- used in a demo of zsync2
    + **libcpr** [📁](./libcpr) [🌐](https://github.com/GerHobbelt/cpr) -- wrapper library for cURL; used by zsync2
    + **highway** [📁](./highway) [🌐](https://github.com/GerHobbelt/highway) -- dependency of JpegXL


---

# Libraries in this collection (All of the above, listed in alphabetical order)

- **annoy** [📁](./annoy) [🌐](https://github.com/GerHobbelt/annoy) -- ANNOY (<b>A</b>pproximate <b>N</b>earest <b>N</b>eighbors <b>O</b>h <b>Y</b>eah) is a C++ library to search for points in space that are close to a given query point. It also creates large read-only file-based data structures that are `mmap`-ped into memory so that many processes may share the same data. ANNOY is almost as fast as the fastest libraries, but what really sets Annoy apart is: it has the ability to use static files as indexes, enabling you to share an index across processes. ANNOY also decouples creating indexes from loading them, so you can pass around indexes as files and map them into memory quickly. ANNOY tries to minimize its memory footprint: the indexes are quite small. This is useful when you want to find nearest neighbors using multiple CPU's. Spotify uses ANNOY for music recommendations.
- **asynqro** [📁](./asynqro) [🌐](https://github.com/GerHobbelt/asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.
- **BBHash** [📁](./BBHash) [🌐](https://github.com/GerHobbelt/BBHash) -- Bloom-filter based minimal perfect hash function library.
- **BCF-cuckoo-index** [📁](./BCF-cuckoo-index) [🌐](https://github.com/GerHobbelt/BCF) -- Better Choice Cuckoo Filter (BCF) is an efficient approximate set representation data structure. Different from the standard Cuckoo Filter (CF), BCF leverages the principle of the power of two choices to select the better candidate bucket during insertion. BCF reduces the average number of relocations of the state-of-the-art CF by 35%.
- **bebop** [📁](./bebop) [🌐](https://github.com/GerHobbelt/bebop)
- **bibtex-robust-decoder** [📁](./bibtex-robust-decoder) [🌐](https://github.com/GerHobbelt/bibtex-robust-decoder)
- **bibutils** [📁](./bibutils) [🌐](https://github.com/GerHobbelt/bibutils) -- the `bibutils` set interconverts between various bibliography formats using a common MODS-format XML intermediate. For example, one can convert RIS-format files to Bibtex by doing two transformations: RIS->MODS->Bibtex. By using a common intermediate for N formats, only 2N programs are required and not N²-N.
- ~~**binary_bakery** [🌐](https://github.com/s9w/binary_bakery) -- resource compiler-like tool: embed any data in your C/C++ application~~
- **binlog** [📁](./binlog) [🌐](https://github.com/GerHobbelt/binlog) -- a high performance C++ log library to produce structured binary logs.
- **BLAKE3** [📁](./BLAKE3) [🌐](https://github.com/GerHobbelt/BLAKE3)
- **BlingFire** [📁](./BlingFire) [🌐](https://github.com/GerHobbelt/BlingFire) -- we are a team at Microsoft called Bling (Beyond Language Understanding), sharing our [FInite State machine and REgular expression manipulation library](https://github.com/microsoft/BlingFire) (FIRE). We use Fire for many linguistic operations inside Bing such as Tokenization, Multi-word expression matching, Unknown word-guessing, Stemming / Lemmatization just to mention a few.
- **boost** [📁](./boost) [🌐](https://github.com/GerHobbelt/boost) -- required by several other libraries in this collection
- **breakpad** [📁](./breakpad) [🌐](https://github.com/GerHobbelt/breakpad)
- **brotli** [📁](./brotli) [🌐](https://github.com/GerHobbelt/brotli) -- compression
- ~~**bzip2** [🌐](https://github.com/nemequ/bzip2)~~
- **CacheLib** [📁](./CacheLib) [🌐](https://github.com/GerHobbelt/CacheLib) -- provides an in-process high performance caching mechanism, thread-safe API to build high throughput, low overhead caching services, with built-in ability to leverage DRAM and SSD caching transparently.
- **caffe** [📁](./caffe) [🌐](https://github.com/GerHobbelt/caffe) -- a fast deep learning framework made with expression and modularity in mind, developed by Berkeley AI Research (BAIR)/The Berkeley Vision and Learning Center (BVLC).
- **catboost** [📁](./catboost) [🌐](https://github.com/GerHobbelt/catboost) -- a fast, scalable, high performance Gradient Boosting on Decision Trees library, used for ranking, classification, regression and other machine learning tasks. Supports computation on CPU and GPU.
- ~~**Catch2** [🌐](https://github.com/catchorg/Catch2)~~
- **c-blosc2** [📁](./c-blosc2) [🌐](https://github.com/GerHobbelt/c-blosc2) -- a high performance compressor optimized for binary data (i.e. floating point numbers, integers and booleans), designed to transmit data to the processor cache faster than the traditional, non-compressed, direct memory fetch approach via a `memcpy()` OS call.
- **cereal** [📁](./cereal) [🌐](https://github.com/GerHobbelt/cereal) -- C++11 serialization library
- **CHM-lib** [📁](./CHM-lib) [🌐](https://github.com/GerHobbelt/CHMLib) -- as I have several HTML pages stored in this format. See also MHTML: `mht-rip`
- **CImg** [📁](./CImg) [🌐](https://github.com/GerHobbelt/CImg) -- a **small** C++ toolkit for **image processing**.
- **circlehash** [📁](./circlehash) [🌐](https://github.com/GerHobbelt/circlehash) -- a family of non-cryptographic hash functions that pass every test in SMHasher.
- **civetweb** [📁](./civetweb) [🌐](https://github.com/GerHobbelt/civetweb) -- an easy to use, powerful, C (C/C++) embeddable web server with optional CGI, SSL and Lua support.
- **clBLAS** [📁](./clBLAS) [🌐](https://github.com/GerHobbelt/clBLAS) -- the OpenCL™ BLAS portion of OpenCL's `clMath`. The complete set of BLAS level 1, 2 & 3 routines is implemented. In addition to GPU devices, the library also supports running on CPU devices to facilitate debugging and multicore programming. The primary goal of `clBLAS` is to make it easier for developers to utilize the inherent performance and power efficiency benefits of heterogeneous computing. `clBLAS` interfaces do not hide nor wrap OpenCL interfaces, but rather leaves OpenCL state management to the control of the user to allow for maximum performance and flexibility. The clBLAS library does generate and enqueue optimized OpenCL kernels, relieving the user from the task of writing, optimizing and maintaining kernel code themselves.
- **cld2-language-detect** [📁](./cld2-language-detect) [🌐](https://github.com/GerHobbelt/cld2) -- CLD2 probabilistically detects over 80 languages in Unicode UTF-8 text, either plain text or HTML/XML. For mixed-language input, CLD2 returns the top three languages found and their approximate percentages of the total text bytes.  Optionally, it also returns a vector of text spans with the language of each identified. The design target is web pages of at least 200 characters (about two sentences); CLD2 is not designed to do well on very short text.- **cli11** [📁](./cli11) [🌐](https://github.com/GerHobbelt/CLI11) -- command line options parser
- **clipp** [📁](./clipp) [🌐](https://github.com/GerHobbelt/clipp) -- commandline parser
- ~~**clippson** [🌐](https://github.com/heavywatal/clippson) -- commandline parser + JSON data diagnostical dumper~~
- **cmph-hasher** [📁](./cmph-hasher) [🌐](https://github.com/GerHobbelt/cmph) -- C Minimal Perfect Hashing Library for both small and (very) large hash sets.
- **cpp-btree** [📁](./cpp-btree) [🌐](https://github.com/GerHobbelt/cpp-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- **cppzmq** [📁](./cppzmq) [🌐](https://github.com/GerHobbelt/cppzmq)
- ~~**cpu_features** [🌐](https://github.com/google/cpu_features)~~
- **cpuinfo** [📁](./cpuinfo) [🌐](https://github.com/GerHobbelt/cpuinfo) -- CPU & hardware info
- ~~**cpu_stat** [🌐](https://github.com/vivaladav/cpu-stat)~~
- ~~**CPython** [🌐](https://github.com/python/cpython)~~
- **createprocess-windows** [📁](./createprocess-windows) [🌐](https://github.com/GerHobbelt/createprocess-windows) -- drive `CreateProcess` Win32 API
- **crow** [📁](./crow) [🌐](https://github.com/GerHobbelt/crow) -- IPC / server framework
- **cryptopp** [📁](./cryptopp) [🌐](https://github.com/GerHobbelt/cryptopp)
- **csync2** [📁](./csync2) [🌐](https://github.com/GerHobbelt/csync2) -- a cluster synchronization tool. It can be used to keep files on multiple hosts in a cluster in sync. Csync2 can handle complex setups with much more than just 2 hosts, handle file deletions and can detect conflicts.
- **CTCWordBeamSearch** [📁](./CTCWordBeamSearch) [🌐](https://github.com/GerHobbelt/CTCWordBeamSearch) -- Connectionist Temporal Classification (CTC) decoder with dictionary and Language Model (LM).
- **cuckoofilter** [📁](./cuckoofilter) [🌐](https://github.com/GerHobbelt/cuckoofilter)
- **cuckoo-index** [📁](./cuckoo-index) [🌐](https://github.com/GerHobbelt/cuckoo-index) -- Cuckoo Index (CI) is a lightweight secondary index structure that represents the many-to-many relationship between keys and partitions of columns in a highly space-efficient way. CI associates variable-sized fingerprints in a Cuckoo filter with compressed bitmaps indicating qualifying partitions. The problem of finding all partitions that possibly contain a given lookup key is traditionally solved by maintaining one filter (e.g., a Bloom filter) per partition that indexes all unique key values contained in this partition. To identify all partitions containing a key, we would need to probe all per-partition filters (which could be many). Depending on the storage medium, a false positive there can be very expensive. Furthermore, secondary columns typically contain many duplicates (also across partitions). Cuckoo Index (CI) addresses these drawbacks of per-partition filters.
- **cURL** [📁](../../thirdparty/curl) [🌐](https://github.com/GerHobbelt/thirdparty-curl)
- **CxImage** [📁](./CxImage) [🌐](https://github.com/GerHobbelt/CxImage) -- venerated library for reading and creating many image file formats
- **cxxtest_catch_2_gtest** [📁](./cxxtest_catch_2_gtest) [🌐](https://github.com/GerHobbelt/cxxtest_catch_2_gtest) -- quick & dirty converter from various test suites to googletest, i.e. allows us to use a single test framework, despite some libraries having been set up to use another, e.g. Catch2.
- **DCF-cuckoo-index** [📁](./DCF-cuckoo-index) [🌐](https://github.com/GerHobbelt/DCF) -- the Dynamic Cuckoo Filter (DCF) is an efficient approximate membership test data structure. Different from the classic Bloom filter and its variants, DCF is especially designed for highly dynamic datasets and supports extending and reducing its capacity. The DCF design is the first to achieve both reliable item deletion and flexibly extending/reducing for approximate set representation and membership testing. DCF outperforms the state-of-the-art DBF designs in both speed and memory consumption.
- **djvulibre** [📁](./djvulibre) [🌐](https://github.com/GerHobbelt/djvulibre)
- **dlib** [📁](./dlib) [🌐](https://github.com/GerHobbelt/dlib) -- machine learning algorithms
- ~~**docopt** [🌐](https://github.com/docopt/docopt.cpp) -- generate documentation for command line options~~
- **drogon** [📁](./drogon) [🌐](https://github.com/GerHobbelt/drogon)
- **dtl-diff-template-library** [📁](./dtl-diff-template-library) [🌐](https://github.com/GerHobbelt/dtl)
- ~~**EasyLogger** [🌐](https://github.com/armink/EasyLogger) -- an ultra-lightweight (ROM<1.6K, RAM<0.3K), high-performance C/C++ log library, very suitable for resource-sensitive software projects. Compared with the well-known C/C++ log libraries such as log4c and zlog, EasyLogger has simpler functions and provides fewer interfaces to users, but it will be quick to get started. More practical functions support dynamic expansion in the form of plug-ins.~~
- **ECMA262** [📁](./ECMA262) [🌐](https://github.com/GerHobbelt/ecma262)
- **efsw** [📁](./efsw) [🌐](https://github.com/GerHobbelt/efsw) -- cross-platform file system watcher and notifier
- **emphf-hash** [📁](./emphf-hash) [🌐](https://github.com/GerHobbelt/emphf) -- an efficient external-memory algorithm for the construction of minimal perfect hash functions for large-scale key sets, focusing on speed and low memory usage (2.61 N bits plus a small constant factor).
- **enkiTS** [📁](./enkiTS-TaskScheduler) [🌐](https://github.com/GerHobbelt/enkiTS) -- A C++11 Task Scheduler for creating parallel programs.
- **EtwExplorer** [📁](./EtwExplorer) [🌐](https://github.com/GerHobbelt/EtwExplorer) -- View ETW Provider metadata. Event Tracing for Windows (ETW) is a logging facility built into the Windows OS. Modern providers register a manifest that describes all the events they support, with their properties. Classic providers register a MOF instead.
- **expected-lite** [📁](./expected-lite) [🌐](https://github.com/GerHobbelt/expected-lite) -- a single-file header-only library to represent value objects that either contain a valid value or an error. The library is a partly implementation of the proposal for [`std::expected`](https://en.cppreference.com/w/cpp/utility/expected) for use with C++11 and later.
- **extract** [📁](../../thirdparty/extract) [🌐](https://github.com/GerHobbelt/thirdparty_extract)
- **faiss** [📁](./faiss) [🌐](https://github.com/GerHobbelt/faiss) -- a library for efficient similarity search and clustering of dense vectors. It contains algorithms that search in sets of vectors of any size, up to ones that possibly do not fit in RAM. It also contains supporting code for evaluation and parameter tuning. Faiss is written in C++ with complete wrappers for Python/numpy. Some of the most useful algorithms are implemented on the GPU. It is developed primarily at Facebook AI Research.
- ~~**FastBinaryEncoding** [🌐](https://github.com/chronoxor/FastBinaryEncoding)~~
- **fastBPE** [📁](./fastBPE) [🌐](https://github.com/GerHobbelt/fastBPE) -- text tokenization / ngrams
- ~~**fast-lzma2** [🌐](https://github.com/conor42/fast-lzma2)~~
- **fast_pfor** [📁](./fast_pfor) [🌐](https://github.com/GerHobbelt/FastPFor) -- a research library with integer compression schemes. It is broadly applicable to the compression of arrays of 32-bit integers where most integers are small. The library seeks to exploit SIMD instructions (SSE) whenever possible.
- **fastText** [📁](./fastText) [🌐](https://github.com/GerHobbelt/fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification.
- **file** [📁](./file) [🌐](https://github.com/GerHobbelt/file) -- `file` filetype recognizer tool & mimemagic
- **filesystem** [📁](./filesystem) [🌐](https://github.com/GerHobbelt/filesystem) -- a header-only single-file `std::filesystem` compatible helper library, based on the C++17 and C++20 specs, but implemented for C++11, C++14, C++17 or C++20 (tightly following the C++17 standard with very few documented exceptions). It is of course in its own namespace `ghc::filesystem` to not interfere with a regular `std::filesystem` should you use it in a mixed C++17 environment (which is possible).
- ~~**flatbuffers** [🌐](https://github.com/google/flatbuffers)~~
- ~~**flatcc** [🌐](https://github.com/dvidelabs/flatcc)~~
- **fmt** [📁](./fmt) [🌐](https://github.com/GerHobbelt/fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
- **freeglut** [📁](../../thirdparty/freeglut) [🌐](https://github.com/GerHobbelt/thirdparty-freeglut)
- **freetype** [📁](../../thirdparty/freetype) [🌐](https://github.com/GerHobbelt/thirdparty-freetype2)
- **frozen** [📁](./frozen) [🌐](https://github.com/GerHobbelt/frozen) -- provides 0 cost initialization for immutable containers, fixed-size containers, and various algorithms.
- **gbenchmark** [📁](./gbenchmark) [🌐](https://github.com/GerHobbelt/benchmark)
- ~~**GDCM-Grassroots-DICOM** [🌐](https://github.com/malaterre/GDCM)~~
- **gflags** [📁](./gflags) [🌐](https://github.com/GerHobbelt/gflags) -- google::flags library, used by other libs in this set.
- **gibbs-lda** [📁](./gibbs-lda) [🌐](https://github.com/GerHobbelt/gibbs-lda) -- modified GibbsLDA++: A C/C++ Implementation of Latent Dirichlet Allocation by by Xuan-Hieu Phan and Cam-Tu Nguyen.
- **glib2** [📁](./glib2) [🌐](https://github.com/GerHobbelt/glib) -- GLib is the low-level core library that forms the basis for projects such as GTK and GNOME.
- **glob** [📁](./glob) [🌐](https://github.com/GerHobbelt/glob) -- directory scanner
- **glog** [📁](./glog) [🌐](https://github.com/GerHobbelt/glog) -- Google Logging is a C++98 library that implements application-level logging. The library provides logging APIs based on C++-style streams and various helper macros.
- **GMM-HMM-kMeans** [📁](./GMM-HMM-kMeans) [🌐](https://github.com/GerHobbelt/KMeans-GMM-HMM) -- HMM based on KMeans and GMM
- **GMMreg** [📁](./GMMreg) [🌐](https://github.com/GerHobbelt/Project_gmmreg)
- **google-diff-match-patch** [📁](./google-diff-match-patch) [🌐](https://github.com/GerHobbelt/diff-match-patch)
- **google::marl** [📁](./google-marl) [🌐](https://github.com/GerHobbelt/marl) -- a hybrid thread / fiber task scheduler written in C++ 11. Marl uses a combination of fibers and threads to allow efficient execution of tasks that can block, while keeping a fixed number of hardware threads.
- **googletest** [📁](./googletest) [🌐](https://github.com/GerHobbelt/googletest)
- **gperf-hash** [📁](./gperf-hash) [🌐](https://github.com/GerHobbelt/gperf) -- This is GNU gperf, a program that generates C/C++ perfect hash functions for sets of key words.
- **GraphicsMagick** [📁](./GraphicsMagick) [🌐](https://github.com/GerHobbelt/graphicsmagick)
- **gumbo-libxml** [📁](./gumbo-libxml) [🌐](https://github.com/GerHobbelt/gumbo-libxml)
- **gumbo-parser** [📁](../../thirdparty/gumbo-parser) [🌐](https://github.com/GerHobbelt/gumbo-parser)
- **gumbo-query** [📁](./gumbo-query) [🌐](https://github.com/GerHobbelt/gumbo-query) -- HTML DOM access in C/C++
- **h2o-server** [📁](./h2o-server) [🌐](https://github.com/GerHobbelt/h2o)
- ~~**h5cpp-HDF5** [🌐](https://github.com/steven-varga/h5cpp)~~
- **harfbuzz** [📁](../../thirdparty/harfbuzz) [🌐](https://github.com/GerHobbelt/thirdparty-harfbuzz)
- ~~**HDF5** [🌐](https://github.com/HDFGroup/hdf5)~~
- **HDiffPatch** [📁](./HDiffPatch) [🌐](https://github.com/GerHobbelt/HDiffPatch)
- **hedley** [📁](./hedley) [🌐](https://github.com/GerHobbelt/hedley) -- a C/C++ header file designed to smooth over some platform-specific annoyances.
- ~~**HighFive-HDF5** [🌐](https://github.com/BlueBrain/HighFive)~~
- **highwayhash** [📁](./highwayhash) [🌐](https://github.com/GerHobbelt/highwayhash) -- Fast strong hash functions: SipHash/HighwayHash
- **hmm-scalable** [📁](./hmm-scalable) [🌐](https://github.com/GerHobbelt/hmm-scalable)
- **hmm-stoch** [📁](./hmm-stoch) [🌐](https://github.com/GerHobbelt/StochHMM)
- **hnswlib** [📁](./hnswlib) [🌐](https://github.com/GerHobbelt/hnswlib) -- fast approximate nearest neighbor search. Header-only C++ HNSW implementation with python bindings.
- **hocr-fileformat** [📁](./hocr-fileformat) [🌐](https://github.com/GerHobbelt/ocr-fileformat)
- **hocr-spec** [📁](./hocr-spec) [🌐](https://github.com/GerHobbelt/hocr-spec)
- **hocr-tools** [📁](./hocr-tools) [🌐](https://github.com/GerHobbelt/hocr-tools)
- **horsejs** [📁](./horsejs) [🌐](https://github.com/GerHobbelt/horsejs) -- a framework similar to Electron. Unlike Electron, it has no built-in Node.js, but directly uses C++ to provide most of Electron's capabilities, such as accessing files using JavaScript, opening dialog boxes, creating new windows, etc. Since there is no Node.js, HorseJs runs faster, uses less memory, and is more stable.
- **htmlstreamparser** [📁](./htmlstreamparser) [🌐](https://github.com/GerHobbelt/htmlstreamparser)
- **http-parser** [📁](./http-parser) [🌐](https://github.com/GerHobbelt/http-parser)
- **hunspell** [📁](./hunspell) [🌐](https://github.com/GerHobbelt/hunspell)
- **hunspell-hyphen** [📁](./hunspell-hyphen) [🌐](https://github.com/GerHobbelt/hyphen)
- **hyperscan** [📁](./hyperscan) [🌐](https://github.com/GerHobbelt/hyperscan) -- Hyperscan is a high-performance multiple regex matching library.
- ~~**ice** [🌐](https://github.com/zeroc-ice/ice) -- Comprehensive RPC Framework: helps you network your software with minimal effort.~~
- **ImageMagick** [📁](./ImageMagick) [🌐](https://github.com/GerHobbelt/ImageMagick)
- ~~**Imath** [🌐](https://github.com/AcademySoftwareFoundation/Imath) -- float16 support lib for OpenEXR format~~
- **infoware** [📁](./infoware) [🌐](https://github.com/GerHobbelt/infoware) -- C++ Library for pulling system and hardware information, without hitting the command line.
- ~~**inih** [🌐](https://github.com/benhoyt/inih)~~
- ~~**iniparser** [🌐](https://github.com/ndevilla/iniparser)~~
- **jasper** [📁](./jasper) [🌐](https://github.com/GerHobbelt/jasper) -- JasPer Image Processing/Coding Tool Kit
- **jbig2dec** [📁](../../thirdparty/jbig2dec) [🌐](https://github.com/GerHobbelt/jbig2dec) -- a decoder library and example utility implementing the JBIG2 bi-level image compression spec. Also known as ITU T.88 and ISO IEC 14492, and included by reference in Adobe's PDF version 1.4 and later.
- **jemalloc** [📁](./jemalloc) [🌐](https://github.com/GerHobbelt/jemalloc)
- **jpeginfo** [📁](../../thirdparty/jpeginfo) [🌐](https://github.com/GerHobbelt/jpeginfo)
- **jpeg-xl** [📁](./jpeg-xl) [🌐](https://github.com/GerHobbelt/jpeg-xl) - [JPEG-XL]https://gitlab.com/wg1/jpeg-xl) support
- **json-jansson** [📁](./json-jansson) [🌐](https://github.com/GerHobbelt/jansson)
- **json** [📁](./json) [🌐](https://github.com/GerHobbelt/nlohmann-json) -- N. Lohmann's JSON for Modern C++.
- **kgraph** [📁](./kgraph) [🌐](https://github.com/GerHobbelt/kgraph) -- a library for k-nearest neighbor (k-NN) graph construction and online k-NN search using a k-NN Graph as index. KGraph implements heuristic algorithms that are extremely generic and fast. KGraph works on abstract objects. The only assumption it makes is that a similarity score can be computed on any pair of objects, with a user-provided function.
- **krabsETW** [📁](./krabsETW) [🌐](https://github.com/GerHobbelt/krabsetw) -- a C++ library that simplifies interacting with ETW. It allows for any number of traces and providers to be enabled and for client code to register for event notifications from these traces.
- **langdata_LSTM** [📁](../../thirdparty/langdata_LSTM) [🌐](https://github.com/GerHobbelt/langdata_lstm) -- tesseract data
- **lapack** [📁](./lapack) [🌐](https://github.com/GerHobbelt/lapack) -- [CBLAS](http://www.netlib.org/blas/) + [LAPACK](http://www.netlib.org/lapack/index.html) optimized linear algebra libs
- **lcms2** [📁](../../thirdparty/lcms2) [🌐](https://github.com/GerHobbelt/thirdparty-lcms2) -- `lcms2mt` is a thread-safe fork of `lcms` (a.k.a. Little CMS). Little CMS intends to be a small-footprint color management engine, with special focus on accuracy and performance. It uses the International Color Consortium standard (ICC), which is the modern standard when regarding to color management. The ICC specification is widely used and is referred to in many International and other de-facto standards. It was approved as an International Standard, ISO 15076-1, in 2005. Little CMS is a **full implementation** of ICC specification 4.3, it fully supports all kind of V2 and V4 profiles, including abstract, devicelink and named color profiles.
- **lda-3-variants** [📁](./lda-3-variants) [🌐](https://github.com/GerHobbelt/LDA) -- three modified open source versions of LDA with collapsed Gibbs Sampling: GibbsLDA++, ompi-lda and online_twitter_lda.
- **lda-bigartm** [📁](./lda-bigartm) [🌐](https://github.com/GerHobbelt/bigartm) -- BigARTM is a powerful tool for topic modeling based on a novel technique called Additive Regularization of Topic Models. This technique effectively builds multi-objective models by adding the weighted sums of regularizers to the optimization criterion. BigARTM is known to combine well very different objectives, including sparsing, smoothing, topics decorrelation and many others. Such combination of regularizers significantly improves several quality measures at once almost without any loss of the perplexity.
- **lda-Familia** [📁](./lda-Familia) [🌐](https://github.com/GerHobbelt/Familia)
- **lda** [📁](./lda) [🌐](https://github.com/GerHobbelt/lda-c) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
- **LDCF-hash** [📁](./LDCF-hash) [🌐](https://github.com/GerHobbelt/LDCF) -- The Logarithmic Dynamic Cuckoo Filter (LDCF) is an efficient approximate membership test data structure for dynamic big data sets. LDCF uses a novel multi-level tree structure and reduces the worst insertion and membership testing time from O(N) to O(1), while simultaneously reducing the memory cost of DCF as the cardinality of the set increases.
- **leptonica** [📁](../../thirdparty/leptonica) [🌐](https://github.com/GerHobbelt/leptonica)
- **libarchive** [📁](./libarchive) [🌐](https://github.com/GerHobbelt/libarchive)
- **libassert** [📁](./libassert) [🌐](https://github.com/GerHobbelt/libassert) -- the most over-engineered and overpowered C++ assertion library. **Library philosophy**: Provide as much helpful diagnostic info as possible.
- **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf)
- **libbloom** [📁](./libbloom) [🌐](https://github.com/GerHobbelt/bloomd) -- a high-performance C server, exposing bloom filters and operations over them. The rate of false positives can be tuned to meet application demands, but reducing the error rate rapidly increases the amount of memory required for the representation. Example: Bloom filters enable you to represent 1MM items with a false positive rate of 0.1% in 2.4MB of RAM.
- **libcmime** [📁](./libcmime) [🌐](https://github.com/GerHobbelt/libcmime) -- MIME extract/insert/encode/decode: use for MHTML support
- **libconfig** [📁](./libconfig) [🌐](https://github.com/GerHobbelt/libconfig) -- generic config (file) reader/writer
- **libcpr** [📁](./libcpr) [🌐](https://github.com/GerHobbelt/cpr) -- wrapper library for cURL. C++ Requests is a simple wrapper around [libcurl](http://curl.haxx.se/libcurl) inspired by the excellent [Python Requests](https://github.com/kennethreitz/requests) project. Despite its name, libcurl's easy interface is anything but, and making mistakes misusing it is a common source of error and frustration. Using the more expressive language facilities of C++11, this library captures the essence of making network calls into a few concise idioms.
- **libcpuid** [📁](./libcpuid) [🌐](https://github.com/GerHobbelt/libcpuid) -- CPU & hardware info
- **libcyaml** [📁](./libcyaml) [🌐](https://github.com/GerHobbelt/libcyaml)
- **libCZMQ** [📁](./libCZMQ) [🌐](https://github.com/GerHobbelt/czmq)
- **libexpat** [📁](./libexpat) [🌐](https://github.com/GerHobbelt/libexpat) -- XML read/write
- **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
- **libfyaml** [📁](./libfyaml) [🌐](https://github.com/GerHobbelt/libfyaml)
- **libgd** [📁](./libgd) [🌐](https://github.com/GerHobbelt/libgd) -- GD is a library for the dynamic creation of images by programmers. GD has support for: WebP, JPEG, PNG, AVIF, HEIF, TIFF, BMP, GIF, TGA, WBMP, XPM.
- **libgif** [📁](./libgif) [🌐](https://github.com/GerHobbelt/libgif)
- **libidn2** [📁](./libidn2) [🌐](https://github.com/GerHobbelt/libidn2)
- **libjpeg** [📁](../../thirdparty/libjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-libjpeg)
- **libjpeg-turbo** [📁](./libjpeg-turbo) [🌐](https://github.com/GerHobbelt/libjpeg-turbo)
- **liblinear** [📁](./liblinear) [🌐](https://github.com/GerHobbelt/liblinear)
- **libmdbx** [📁](./libmdbx) [🌐](https://github.com/GerHobbelt/libmdbx) -- one of the fastest embeddable key-value ACID database without WAL. `libmdbx` surpasses the legendary LMDB in terms of reliability, features and performance.
- ~~**libmicrohttpd** [🌐](https://github.com/Karlson2k/libmicrohttpd)~~
- **lib_nas_lockfile** [📁](./lib_nas_lockfile) [🌐](https://github.com/GerHobbelt/lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
- **libngt-ann** [📁](./libngt-ann) [🌐](https://github.com/GerHobbelt/NGT) -- Yahoo's Neighborhood Graph and Tree for Indexing High-dimensional Data. NGT provides commands and a library for performing high-speed approximate nearest neighbor searches against a large volume of data (several million to several 10 million items of data) in high dimensional vector data space (several ten to several thousand dimensions).
- **libpng** [📁](../../thirdparty/libpng) [🌐](https://github.com/GerHobbelt/libpng)
- **libpsl** [📁](./libpsl) [🌐](https://github.com/GerHobbelt/libpsl) -- handles the *Public Suffix List* (a collection of Top Level Domains (TLDs) suffixes, e.g. `.com`, `.net`, *Country Top Level Domains* (ccTLDs) like `.de` and `.cn` and *[Brand Top Level Domains](https://icannwiki.org/Brand_TLD)* like `.apple` and `.google`.
- **libq** [📁](./libq) [🌐](https://github.com/GerHobbelt/q) -- A platform-independent promise library for C++, implementing asynchronous continuations.
- **libqrencode** [📁](./libqrencode) [🌐](https://github.com/GerHobbelt/libqrencode) -- generate QRcodes from anything (e.g. URLs). `libqrencode` is a fast and compact library for encoding data in a QR Code, a 2D symbology that can be scanned by handy terminals such as a smartphone. The capacity of QR Code is up to 7000 digits or 4000 characters and has high robustness. `libqrencode` supports QR Code model 2, described in JIS (Japanese Industrial Standards) X0510:2004 or ISO/IEC 18004. Most of features in the specification are implemented: Numeric, alphabet, Japanese kanji (Shift-JIS) or any 8 bit code, Optimized encoding of a string, Structured-append of symbols, Micro QR Code (experimental).
- **librsync** [📁](./librsync) [🌐](https://github.com/GerHobbelt/librsync) -- a library for calculating and applying network deltas. librsync encapsulates the core algorithms of the rsync protocol.
- **libscanf** [📁](./libscanf) [🌐](https://github.com/GerHobbelt/scnlib)
- ~~**libsmile** [🌐](https://github.com/pierre/libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format~~
- **libsptag** [📁](./libsptag) [🌐](https://github.com/GerHobbelt/SPTAG) -- a library for fast approximate nearest neighbor search.  SPTAG (Space Partition Tree And Graph) is a library for large scale vector approximate nearest neighbor search scenario released by [Microsoft Research (MSR)](https://www.msra.cn/) and [Microsoft Bing](http://bing.com).
- **libsqlfs** [📁](./libsqlfs) [🌐](https://github.com/GerHobbelt/libsqlfs) -- a POSIX style file system on top of an SQLite database.  It allows applications to have access to a full read/write file system in a single file, complete with its own file hierarchy and name space.  This is useful for applications which needs structured storage, such as embedding documents within documents, or management of configuration data or preferences.
- **libstemmer** [📁](./libstemmer) [🌐](https://github.com/GerHobbelt/libstemmer) -- SnowBall stemmer for many languages.
- **libsvm** [📁](./libsvm) [🌐](https://github.com/GerHobbelt/libsvm) -- a simple, easy-to-use, and efficient software for SVM classification and regression. It solves C-SVM classification, nu-SVM classification, one-class-SVM, epsilon-SVM regression, and nu-SVM regression. It also provides an automatic model selection tool for C-SVM classification.
- **libtextcat** [📁](./libtextcat) [🌐](https://github.com/GerHobbelt/libtextcat) -- text language detection
- **libtiff** [📁](../../thirdparty/libtiff) [🌐](https://github.com/GerHobbelt/libtiff)
- **libtuv** [📁](./libtuv) [🌐](https://github.com/GerHobbelt/libtuv) -- a multi-platform tiny event library refactored from `libuv` source for IoT and embedded systems.
- **libunifex** [📁](./libunifex) [🌐](https://github.com/GerHobbelt/libunifex) -- a prototype implementation of the C++ sender/receiver async programming model that is currently being considered for standardisation. This project contains implementations of the following: Schedulers, Timers, Asynchronous I/O, Algorithms that encapsulate certain concurrency patterns, Async streams, Cancellation, Coroutine integration.
- **libvips** [📁](./libvips) [🌐](https://github.com/GerHobbelt/libvips) -- a demand-driven, horizontally threaded image processing library which has around 300 operations covering arithmetic, histograms, convolution, morphological operations, frequency filtering, colour, resampling, statistics and others. It supports a large range of numeric types, from 8-bit int to 128-bit complex. Images can have any number of bands. It supports a good range of image formats, including JPEG, JPEG2000, JPEG-XL, TIFF, PNG, WebP, HEIC, AVIF, FITS, Matlab, OpenEXR, PDF, SVG, HDR, PPM / PGM / PFM, CSV, GIF, Analyze, NIfTI, DeepZoom, and OpenSlide. It can also load images via ImageMagick or GraphicsMagick, letting it work with formats like DICOM.
- **libwarc** [📁](./libwarc) [🌐](https://github.com/GerHobbelt/libwarc) -- C++ library to parse WARC files. WARC is the official storage format of the Internet Archive for storing scraped content. WARC format used: http://bibnum.bnf.fr/WARC/WARC_ISO_28500_version1_latestdraft.pdf
- **libwebp** [📁](./libwebp) [🌐](https://github.com/GerHobbelt/libwebp)
- **libwebsocketpp** [📁](./libwebsocketpp) [🌐](https://github.com/GerHobbelt/websocketpp) -- WebSocket++ is a header only C++ library that implements RFC6455 The WebSocket Protocol.
- **libwebsockets** [📁](./libwebsockets) [🌐](https://github.com/GerHobbelt/libwebsockets) -- a simple-to-use C library providing client and server for HTTP/1, HTTP/2, WebSockets, MQTT and other protocols. It supports a lot of lightweight ancilliary implementations for things like JSON, CBOR, JOSE, COSE. It's very gregarious when it comes to event loop sharing, supporting libuv, libevent, libev, sdevent, glib and uloop, as well as custom event libs.
- **libxml2** [📁](./libxml2) [🌐](https://github.com/GerHobbelt/libxml2) -- [libxml](http://xmlsoft.org/): XML read/write
- **libyaml-examples** [📁](./libyaml-examples) [🌐](https://github.com/GerHobbelt/libyaml-examples)
- **libyaml** [📁](./libyaml) [🌐](https://github.com/GerHobbelt/libyaml) -- YAML
- **libzip** [📁](./libzip) [🌐](https://github.com/GerHobbelt/libzip) -- a C library for reading, creating, and modifying zip and zip64 archives.
- **libzmq** [📁](./libzmq) [🌐](https://github.com/GerHobbelt/libzmq)
- **LightLDA** [📁](./LightLDA) [🌐](https://github.com/GerHobbelt/LightLDA)
- **Lightning.NET** [📁](./Lightning.NET) [🌐](https://github.com/GerHobbelt/Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
- **ligra-graph** [📁](./ligra-graph) [🌐](https://github.com/GerHobbelt/ligra) -- LIGRA: a Lightweight Graph Processing Framework for Shared Memory; works on both uncompressed and compressed graphs and hypergraphs.
- **linenoise** [📁](./linenoise) [🌐](https://github.com/GerHobbelt/linenoise)
- ~~**lizard** [🌐](https://github.com/inikep/lizard) -- Lizard (formerly LZ5) is an efficient compressor with very fast decompression.~~
- **lmdb** [📁](./lmdb) [🌐](https://github.com/GerHobbelt/lmdb)
- **lmdb-safe** [📁](./lmdb-safe) [🌐](https://github.com/GerHobbelt/lmdb-safe) -- A safe modern & performant C++ wrapper of LMDB. LMDB is an outrageously fast key/value store with semantics that make it highly interesting for many applications. Of specific note, besides speed, is the full support for transactions and good read/write concurrency. LMDB is also famed for its robustness.. **when used correctly**. The design of LMDB is elegant and simple, which aids both the performance and stability. The downside of this elegant design is a nontrivial set of rules that need to be followed to not break things. In other words, LMDB delivers great things but only if you use it exactly right. This is by conscious design. The `lmdb-safe` library aims to deliver the full LMDB performance while programmatically making sure the LMDB semantics are adhered to, with very limited overhead.
- **lmdb.spreads.net** [📁](./lmdb.spreads.net) [🌐](https://github.com/GerHobbelt/Spreads.LMDB)
- **lmdb-store** [📁](./lmdb-store) [🌐](https://github.com/GerHobbelt/lmdb-store) -- an ultra-fast NodeJS interface to LMDB; probably the fastest and most efficient NodeJS key-value/database interface that exists for full storage and retrieval of structured JS data (objects, arrays, etc.) in a true persisted, scalable, [ACID compliant](https://en.wikipedia.org/wiki/ACID) database. It provides a simple interface for interacting with LMDB.
- **lmdbxx** [📁](./lmdbxx) [🌐](https://github.com/GerHobbelt/lmdbxx) -- lmdb++: a comprehensive C++11 wrapper for the LMDB embedded database library, offering both an error-checked procedural interface and an object-oriented resource interface with RAII semantics.
- ~~**log4cplus** [🌐](https://github.com/log4cplus/log4cplus)~~
- ~~**lua** [🌐](https://github.com/lua/lua)~~
- ~~**luaJIT** [🌐](https://github.com/LuaJIT/LuaJIT)~~
- **lz4** [📁](./lz4) [🌐](https://github.com/GerHobbelt/lz4)
- ~~**lzo** [🌐](https://github.com/nemequ/lzo)~~
- ~~**lzsse** [🌐](https://github.com/ConorStokes/LZSSE)~~
- **magic_enum** [📁](./magic_enum) [🌐](https://github.com/GerHobbelt/magic_enum)
- **manticore-columnar** [📁](./manticore-columnar) [🌐](https://github.com/GerHobbelt/columnar)
- **manticore-plugins** [📁](./manticore-plugins) [🌐](https://github.com/GerHobbelt/manticore-plugins)
- **manticoresearch** [📁](./manticoresearch) [🌐](https://github.com/GerHobbelt/manticoresearch)
- **many-stop-words** [📁](./many-stop-words) [🌐](https://github.com/GerHobbelt/many-stop-words)
- **math-atlas** [📁](./math-atlas) [🌐](https://github.com/GerHobbelt/math-atlas) -- The ATLAS (Automatically Tuned Linear Algebra Software) project is an ongoing research effort focusing on applying empirical techniques in order to provide portable performance, delivering an efficient BLAS implementation, as well as a few routines from LAPACK.
- **mcmc** [📁](./mcmc) [🌐](https://github.com/GerHobbelt/mcmc)
- **messagebox-windows** [📁](./messagebox-windows) [🌐](https://github.com/GerHobbelt/messagebox-windows) -- drive `MessageBox` and `MessageBeep` Win32 APIs
- **mht-rip** [📁](./mht-rip) [🌐](https://github.com/GerHobbelt/mht-rip) -- as I have several HTML pages stored in this MHTML format. See also CHM: `CHM-lib`
- **mimalloc** [📁](./mimalloc) [🌐](https://github.com/GerHobbelt/mimalloc) -- a compact general purpose allocator with excellent performance.
- **mime-mega** [📁](./mime-mega) [🌐](https://github.com/GerHobbelt/MegaMimes) -- MIME extract/insert/encode/decode: use for MHTML support
- **mimetic** [📁](./mimetic) [🌐](https://github.com/GerHobbelt/mimetic) -- MIME: use for MHTML support
- **mipp** [📁](./mipp) [🌐](https://github.com/GerHobbelt/MIPP) -- MyIntrinsics++ (MIPP): a portable wrapper for vector intrinsic functions (SIMD) written in C++11. It works for SSE, AVX, AVX-512 and ARM NEON (32-bit and 64-bit) instructions.
- **MITIE-nlp** [📁](./MITIE-nlp) [🌐](https://github.com/GerHobbelt/MITIE)
- **mlpack** [📁](./mlpack) [🌐](https://github.com/GerHobbelt/mlpack) -- an intuitive, fast, and flexible C++ machine learning library, meant to be a machine learning analog to LAPACK, aiming to implement a wide array of machine learning methods and functions as a "swiss army knife" for machine learning researchers.
- **mmc** [📁](./mmc) [🌐](https://github.com/GerHobbelt/mmc)
- **morton_filter** [📁](./morton_filter) [🌐](https://github.com/GerHobbelt/morton_filter) -- a [Morton filter](https://www.vldb.org/pvldb/vol11/p1041-breslow.pdf) -- a new approximate set membership data structure. A Morton filter is a modified cuckoo filter that is optimized for bandwidth-constrained systems. Morton filters use additional computation in order to reduce their off-chip memory traffic. Like a cuckoo filter, a Morton filter supports insertions, deletions, and lookup operations. It additionally adds high-throughput self-resizing, a feature of quotient filters, which allows a Morton filter to increase its capacity solely by leveraging its internal representation. This capability is in contrast to existing vanilla cuckoo filter implementations, which are static and thus require using a backing data structure that contains the full set of items to resize the filter. Morton filters can also be configured to use less memory than a cuckoo filter for the same error rate while simultaneously delivering insertion, deletion, and lookup throughputs that are, respectively, up to 15.5x, 1.3x, and 2.5x higher than a cuckoo filter. Morton filters in contrast to vanilla cuckoo filters do not require a power of two number of buckets but rather only a number that is a multiple of two. They also use fewer bits per item than a Bloom filter when the target false positive rate is less than around 1% to 3%.
- **ms_cpp_client_telemetry** [📁](./ms_cpp_client_telemetry) [🌐](https://github.com/GerHobbelt/cpp_client_telemetry) -- 1DS C/C++ SDK enables cross-platform telemetry collection from various Microsoft products. It enables data / telemetry upload to Collector++. 1DS (One Data Strategy), also known as One Observability, is a cross-org initiative with five teams across the company coming together to unify multiple telemetry efforts at Microsoft. Collector++ is the externally-facing destination end-point where telemetry data is uploaded to that subsequently routes the data to Microsoft internal data pipeline.
- **mujs** [📁](../../thirdparty/mujs) [🌐](https://github.com/GerHobbelt/mujs) -- a lightweight ES5 Javascript interpreter designed for embedding in other software to extend them with scripting capabilities.
- **multiverso** [📁](./multiverso) [🌐](https://github.com/GerHobbelt/Multiverso) -- a parameter server based framework for training machine learning models on big data with numbers of machines. It is currently a standard C++ library and provides a series of friendly programming interfaces. Now machine learning researchers and practitioners do not need to worry about the system routine issues such as distributed model storage and operation, inter-process and inter-thread communication, multi-threading management, and so on. Instead, they are able to focus on the core machine learning logics: data, model, and training.
- **nanoflann** [📁](./nanoflann) [🌐](https://github.com/GerHobbelt/nanoflann) -- a C++11 header-only library for building KD-Trees of datasets with different topologies: R^2, R^3 (point clouds), SO(2) and SO(3) (2D and 3D rotation groups). No support for approximate NN is provided. This library is a fork of the `flann` library by Marius Muja and David G. Lowe, and born as a child project of `MRPT`.
- **nanosvg** [📁](./nanosvg) [🌐](https://github.com/GerHobbelt/nanosvg)
- **ncnn** [📁](./ncnn) [🌐](https://github.com/GerHobbelt/ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
- **neutralinoJS-CLI** [📁](./neutralinoJS-CLI) [🌐](https://github.com/GerHobbelt/neutralinojs-cli)
- **neutralinoJS** [📁](./neutralinoJS) [🌐](https://github.com/GerHobbelt/neutralinojs)
- **nmslib** [📁](./nmslib) [🌐](https://github.com/GerHobbelt/nmslib) -- Non-Metric Space Library (NMSLIB) is an efficient cross-platform similarity search library and a toolkit for evaluation of similarity search methods. The core-library does not have any third-party dependencies. It has been gaining popularity recently. In particular, it has become a part of Amazon Elasticsearch Service. The goal of the project is to create an effective and comprehensive toolkit for searching in generic and non-metric spaces. Even though the library contains a variety of metric-space access methods, our main focus is on generic and approximate search methods, in particular, on methods for non-metric spaces. NMSLIB is possibly the first library with a principled support for non-metric space searching.
- ~~**oatpp** [🌐](https://github.com/oatpp/oatpp) -- IPC / server framework~~
- **olena** [📁](./olena) [🌐](https://github.com/GerHobbelt/olena)
- **oneTBB** [📁](./oneTBB) [🌐](https://github.com/GerHobbelt/oneTBB) -- Intel's Thread Building Blocks library: used with OpenImageIO, ...
- **opencv_contrib** [📁](./opencv_contrib) [🌐](https://github.com/GerHobbelt/opencv_contrib)
- **opencv** [📁](./opencv) [🌐](https://github.com/GerHobbelt/opencv)
- ~~**OpenEXR** [🌐](https://github.com/AcademySoftwareFoundation/openexr) -- lossless format for multi-layered images. Professional use. (I've used it before; nice file format.)~~
- ~~**OpenImageIO** [🌐](https://github.com/OpenImageIO/oiio)~~
- **openjpeg** [📁](../../thirdparty/openjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-openjpeg)
- **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- also used by cURL et al, incidentally.
- **opentelemetry-cpp** [📁](./opentelemetry-cpp) [🌐](https://github.com/GerHobbelt/opentelemetry-cpp) -- The OpenTelemetry C++ Client
- **OptimizationTemplateLibrary** [📁](./OptimizationTemplateLibrary) [🌐](https://github.com/GerHobbelt/O-T-L) -- Optimization Template Library (OTL)
- **otl** [📁](./otl) [🌐](https://github.com/GerHobbelt/otl) -- Oracle Template Library (STL-like wrapper for SQL DB queries; supports many databases besides Oracle)
- **palmtree** [📁](./palmtree) [🌐](https://github.com/GerHobbelt/palmtree) -- concurrent lock free B+Tree
- **parallel-hashmap** [📁](./parallel-hashmap) [🌐](https://github.com/GerHobbelt/parallel-hashmap) -- a set of hash map implementations, as well as a btree alternative to std::map and std::set
- **pcg-cpp-random** [📁](./pcg-cpp-random) [🌐](https://github.com/GerHobbelt/pcg-cpp) -- a C++ implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
- **pcg-c-random** [📁](./pcg-c-random) [🌐](https://github.com/GerHobbelt/pcg-c) -- a C implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
- **pcre** [📁](./pcre) [🌐](https://github.com/GerHobbelt/pcre)
- **pevents** [📁](./pevents) [🌐](https://github.com/GerHobbelt/pevents) -- Win32 events for *nix/POSIX platforms, built on top of `pthreads`. `pevents` provides most of the functionality of both manual- and auto-reset events on Windows, most-notably including simultaneous waits on multiple events (à la `WaitForMultipleObjects`). `pevents` also doubles as a thin, sane wrapper for `CreateEvent()` & co. on Windows, meaning you can use `pevents` directly in your cross-platform code without `#ifdef`s for Windows/pthreads. While POSIX condition variables (pthread_cond_t) and WIN32 events both provide the essential building blocks of the synchronization primitives required to write multithreaded code with signaling, the nature of the differences between the two have lent their way towards creating different synchronization and multithreaded-programming paradigms. The only features not included are only named events and support for security attributes. To the author's best knowledge, this is the only implementation of WIN32 events available for Linux and other posix platforms that provides support for simultaneously waiting on multiple events. Depending on your needs, we've been told that pevents may be used as a lightweight alternative to libuv/libev while still allowing your code to embrace asynchronous event handling with ease.
- **phf-hash** [📁](./phf-hash) [🌐](https://github.com/GerHobbelt/phf) -- a simple implementation of the CHD perfect hash algorithm. CHD can generate perfect hash functions for very large key sets -- on the order of millions of keys -- in a very short time.
- **photino.native** [📁](./photino.native) [🌐](https://github.com/GerHobbelt/photino.Native)
- **picohttpparser** [📁](./picohttpparser) [🌐](https://github.com/GerHobbelt/picohttpparser)
- **pisa** [📁](./pisa) [🌐](https://github.com/GerHobbelt/pisa) -- a text search engine able to run on large-scale collections of documents. It allows researchers to experiment with state-of-the-art techniques, allowing an ideal environment for rapid development. PISA is a text search engine, though the "PISA Project" is a set of tools that help experiment with indexing and query processing. Given a text collection, PISA can build an inverted index over this corpus, allowing the corpus to be searched. The inverted index, put simply, is an efficient data structure that represents the document corpus by storing a list of documents for each unique term (see here). At query time, PISA stores its index in main memory for rapid retrieval.
- ~~**pithy** [🌐](https://github.com/johnezang/pithy)~~
- **plf_nanotimer** [📁](./plf_nanotimer) [🌐](https://github.com/GerHobbelt/plf_nanotimer) -- high precision cross-platform performance timer
- **pmt-png-tools** [📁](./pmt-png-tools) [🌐](https://github.com/GerHobbelt/pmt)
- **preprocess-corpuses** [📁](./preprocess-corpuses) [🌐](https://github.com/GerHobbelt/preprocess) -- Pipelines for preprocessing corpora.
- **prio_queue** [📁](./prio_queue) [🌐](https://github.com/GerHobbelt/prio_queue) -- a cache friendly priority queue, done as a B-heap.
- **promise-cpp** [📁](./promise-cpp) [🌐](https://github.com/GerHobbelt/promise-cpp) -- advanced C++ promise/A+ library in Javascript style
- **promise-hpp** [📁](./promise-hpp) [🌐](https://github.com/GerHobbelt/promise.hpp) -- C++ asynchronous promises like a Promises/A+
- ~~**protobuf** [🌐](https://github.com/protocolbuffers/protobuf)~~
- **proxygen** [📁](./proxygen) [🌐](https://github.com/GerHobbelt/proxygen)
- **pthread-win32** [📁](./pthread-win32) [🌐](https://github.com/GerHobbelt/pthread-win32)
- **pytorch** [📁](./pytorch) [🌐](https://github.com/GerHobbelt/pytorch) -- PyTorch library in C++
- **QuickJS-C++-Wrapper2** [📁](./QuickJS-C++-Wrapper2) [🌐](https://github.com/GerHobbelt/quickjspp)
- **QuickJS-C++-Wrapper** [📁](./QuickJS-C++-Wrapper) [🌐](https://github.com/GerHobbelt/quickjscpp)
- **QuickJS** [📁](./QuickJS) [🌐](https://github.com/GerHobbelt/quickjs)
- **randen** [📁](./randen) [🌐](https://github.com/GerHobbelt/randen) -- What if we could default to attack-resistant random generators without excessive CPU cost? We introduce 'Randen', a new generator with security guarantees; it outperforms MT19937, pcg64_c32, Philox, ISAAC and ChaCha8 in real-world benchmarks. This is made possible by AES hardware acceleration and a large Feistel permutation.
- **rapidJSON** [📁](./rapidJSON) [🌐](https://github.com/GerHobbelt/rapidjson) -- TenCent's fast JSON parser/generator for C++ with both SAX & DOM style APIs.
- **rapidyaml** [📁](./rapidyaml) [🌐](https://github.com/GerHobbelt/rapidyaml)
- **re2** [📁](./re2) [🌐](https://github.com/GerHobbelt/re2)
- **replxx** [📁](./replxx) [🌐](https://github.com/GerHobbelt/replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
- **resumable-assert** [📁](./resumable-assert) [🌐](https://github.com/GerHobbelt/resumable-assert)
- **scantailor** [📁](./scantailor) [🌐](https://github.com/GerHobbelt/scantailor-advanced) -- [scantailor_advanced](https://github.com/4lex4/scantailor-advanced) is the [ScanTailor](https://github.com/scantailor/scantailor) version that merges the features of the *ScanTailor Featured* and *ScanTailor Enhanced* versions, brings new ones and fixes. ScanTailor is an interactive post-processing tool for scanned pages. It performs operations such as page splitting, deskewing, adding/removing borders, selecting content, ... and many others.
- **ScriptX** [📁](./ScriptX) [🌐](https://github.com/GerHobbelt/ScriptX) -- wrapper for V8, QuickJS, Lua, Python, ...
- **Sealighter** [📁](./Sealighter) [🌐](https://github.com/GerHobbelt/Sealighter) -- Sysmon-Like research tool for ETW: helps non-developers dive into researching Event Tracing for Windows (ETW) and Windows PreProcessor Tracing (WPP).
- **sentencepiece** [📁](./sentencepiece) [🌐](https://github.com/GerHobbelt/sentencepiece) -- text tokenization
- **sentence-tokenizer** [📁](./sentence-tokenizer) [🌐](https://github.com/GerHobbelt/Tokenizer) -- text tokenization
- **shoco** [📁](./shoco) [🌐](https://github.com/GerHobbelt/shoco) -- a fast compressor for short strings
- **SilkETW** [📁](./SilkETW) [🌐](https://github.com/GerHobbelt/SilkETW) -- SilkETW & SilkService are flexible C# wrappers for ETW, they are meant to abstract away the complexities of ETW and give people a simple interface to perform research and introspection. While both projects have obvious defensive (and offensive) applications they should primarily be considered as research tools.
- **smhasher** [📁](./smhasher) [🌐](https://github.com/GerHobbelt/smhasher) -- benchmark and collection of fast hash functions for symbol tables or hash tables.
- ~~**snappy** [🌐](https://github.com/google/snappy)~~
- **snmalloc** [📁](./snmalloc) [🌐](https://github.com/GerHobbelt/snmalloc) -- a high-performance allocator.
- **snowball** [📁](./snowball) [🌐](https://github.com/GerHobbelt/snowball) -- SnowBell stemming compiler (code generator)
- **sparsehash** [📁](./sparsehash) [🌐](https://github.com/GerHobbelt/sparsehash) -- fast hash algorithms
- ~~**spdlog** [🌐](https://github.com/gabime/spdlog)~~
- **spy-build-sysinfo** [📁](./spy-build-sysinfo) [🌐](https://github.com/GerHobbelt/spy) -- build system info
- **sqlean** [📁](./sqlean) [🌐](https://github.com/GerHobbelt/sqlean) -- The ultimate set of SQLite extensions: SQLite has few functions compared to other database management systems. SQLite authors see this as a feature rather than a problem, because SQLite has an extension mechanism in place. There are a lot of SQLite extensions out there, but they are incomplete, inconsistent and scattered across the internet. sqlean brings them together, neatly packaged into domain modules, documented, tested, and built for Linux, Windows and macOS.
- **sqlite3pp** [📁](./sqlite3pp) [🌐](https://github.com/GerHobbelt/sqlite3pp) -- a minimal ORM wrapper for SQLite et al.
- **sqlite-amalgamation** [📁](./sqlite-amalgamation) [🌐](https://github.com/GerHobbelt/sqlite-amalgamation)
- **SQLiteCpp** [📁](./SQLiteCpp) [🌐](https://github.com/GerHobbelt/SQLiteCpp) -- a smart and easy to use C++ SQLite3 wrapper. SQLiteC++ offers an encapsulation around the native C APIs of SQLite, with a few intuitive and well documented C++ classes.
- **sqlite-fts5-snowball** [📁](./sqlite-fts5-snowball) [🌐](https://github.com/GerHobbelt/fts5-snowball) -- a simple extension for use with FTS5 within SQLite. It allows FTS5 to use Martin Porter's Snowball stemmers (libstemmer), which are available in several languages. Check http://snowballstem.org/ for more information about them.
- **SQLiteHistograms** [📁](./SQLiteHistograms) [🌐](https://github.com/GerHobbelt/SQLiteHistograms) -- an SQLite extension library for creating histogram tables, tables of ratio between histograms and interpolation tables of scatter point tables.
- **sqlite** [📁](./sqlite) [🌐](https://github.com/GerHobbelt/sqlite)
- **sqlite-stats** [📁](./sqlite-stats) [🌐](https://github.com/GerHobbelt/sqlite-stats) -- provides common statistical functions for SQLite.
- **sqlite_wrapper** [📁](./sqlite_wrapper) [🌐](https://github.com/GerHobbelt/sqlite_wrapper) -- an easy-to-use, lightweight and concurrency-friendly SQLite wrapper written in C++17.
- ~~**squash** [🌐](https://github.com/quixdb/squash)~~
- **stdext-path** [📁](./stdext-path) [🌐](https://github.com/GerHobbelt/stdext-path) -- path manipulations (`dirname` et al)
- **stopwords** [📁](./stopwords) [🌐](https://github.com/GerHobbelt/stopwords)
- **subprocess** [📁](./subprocess) [🌐](https://github.com/GerHobbelt/subprocess)
- **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
- **taolog** [📁](./taolog) [🌐](https://github.com/GerHobbelt/taolog) -- A Win32 logger based on DebugView & ETW.
- **taskflow** [📁](./taskflow) [🌐](https://github.com/GerHobbelt/taskflow)
- **tessconfigs** [📁](../../thirdparty/tessconfigs) [🌐](https://github.com/GerHobbelt/tessconfigs)
- **tessdata_best** [📁](../../thirdparty/tessdata_best) [🌐](https://github.com/GerHobbelt/tessdata_best)
- **tessdata_contrib** [📁](../../thirdparty/tessdata_contrib) [🌐](https://github.com/GerHobbelt/tessdata_contrib)
- **tessdata_fast** [📁](../../thirdparty/tessdata_fast) [🌐](https://github.com/GerHobbelt/tessdata_fast)
- **tessdata** [📁](../../thirdparty/tessdata) [🌐](https://github.com/GerHobbelt/tessdata)
- **tessdoc** [📁](../../thirdparty/tessdoc) [🌐](https://github.com/GerHobbelt/tessdoc)
- **tesseract_docs** [📁](../../thirdparty/tesseract_docs) [🌐](https://github.com/GerHobbelt/tesseract_docs)
- **tesseract_langdata** [📁](../../thirdparty/tesseract_langdata) [🌐](https://github.com/GerHobbelt/langdata)
- **tesseract** [📁](../../thirdparty/tesseract) [🌐](https://github.com/GerHobbelt/tesseract)
- **tesstrain** [📁](../../thirdparty/tesstrain) [🌐](https://github.com/GerHobbelt/tesstrain)
- **thread-pool-cpp** [📁](./thread-pool-cpp) [🌐](https://github.com/GerHobbelt/thread-pool-cpp)
- **thread-pool-c** [📁](./thread-pool-c) [🌐](https://github.com/GerHobbelt/C-Thread-Pool)
- **thread-pool** [📁](./thread-pool) [🌐](https://github.com/GerHobbelt/thread-pool) -- `BS::thread_pool`: a fast, lightweight, and easy-to-use C++17 thread pool for high-performance scientific computing.
- **thunderSVM** [📁](./thunderSVM) [🌐](https://github.com/GerHobbelt/thundersvm) -- ThunderSVM exploits GPUs and multi-core CPUs to achieve high efficiency, supporting all functionalities of LibSVM such as one-class SVMs, SVC, SVR and probabilistic SVMs.
- **ticpp** [📁](./ticpp) [🌐](https://github.com/GerHobbelt/ticpp) -- TinyXML++: XML read/write
- **tidy-html5** [📁](./tidy-html5) [🌐](https://github.com/GerHobbelt/tidy-html5) -- clean up HTML documents before archiving/processing
- **tink** [📁](./tink) [🌐](https://github.com/GerHobbelt/tink) -- A multi-language, cross-platform library that provides cryptographic APIs that are secure, easy to use correctly, and hard(er) to misuse.
- **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr)
- **tiny-process-library** [📁](./tiny-process-library) [🌐](https://github.com/GerHobbelt/tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
- **tlx-btree** [📁](./tlx-btree) [🌐](https://github.com/GerHobbelt/tlx) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- **tlx** [📁](./tlx) [🌐](https://github.com/GerHobbelt/tlx) -- a collection of C++ helpers and extensions universally needed, but not found in the STL.
- **tomlpp** [📁](./tomlpp) [🌐](https://github.com/GerHobbelt/tomlplusplus) -- TOML++
- **tracelogging-for-ETW** [📁](./tracelogging-for-ETW) [🌐](https://github.com/GerHobbelt/tracelogging) -- C++ Wrapper for Windows ETW TraceLogging
- **tre** [📁](./tre) [🌐](https://github.com/GerHobbelt/tre)
- **tsf** [📁](./tsf) [🌐](https://github.com/GerHobbelt/tsf) -- type-safe printf equivalent for C++ (used by the uberlog submodule)
- **txiki** [📁](./txiki.js) [🌐](https://github.com/GerHobbelt/txiki.js) -- uses QuickJS as its kernel
- **uberlog** [📁](./uberlog) [🌐](https://github.com/GerHobbelt/uberlog) -- a cross platform C++ logging system that is focused on fast and small, writing to a shared memory ring buffer.
- **uchardet** [📁](./uchardet) [🌐](https://github.com/GerHobbelt/uchardet) -- [uchardet](https://www.freedesktop.org/wiki/Software/uchardet/) is an encoding and language detector library, which attempts to determine the encoding of the text. It can reliably detect many charsets. Moreover it also works as a very good and fast language detector.
- **uctodata** [📁](./uctodata) [🌐](https://github.com/GerHobbelt/uctodata) -- data for `ucto` library
- **ucto** [📁](./ucto) [🌐](https://github.com/GerHobbelt/ucto) -- text tokenization
- **UIforETW** [📁](./UIforETW) [🌐](https://github.com/GerHobbelt/UIforETW) -- Bruce Dawson's user interface for recording ETW (Event Tracing for Windows) traces, which allow amazingly deep investigations of performance problems on Windows.
- **uint128_t** [📁](./uint128_t) [🌐](https://github.com/GerHobbelt/uint128_t)
- **unicode-cldr** [📁](./unicode-cldr) [🌐](https://github.com/GerHobbelt/cldr)
- **unicode-icu** [📁](./unicode-icu) [🌐](https://github.com/GerHobbelt/icu)
- **upscaledb** [📁](./upscaledb) [🌐](https://github.com/GerHobbelt/hamsterdb) -- a.k.a. hamsterdb: a thread-safe key/value database engine. It supports a B+Tree index structure, uses memory mapped I/O (if available), fast Cursors and variable length keys and can create In-Memory Databases.
- **upskirt-markdown** [📁](./upskirt-markdown) [🌐](https://github.com/GerHobbelt/soldout) -- MarkDown renderer
- **url** [📁](./url) [🌐](https://github.com/GerHobbelt/url) -- URI parsing and other utility functions
- **velocypack** [📁](./velocypack) [🌐](https://github.com/GerHobbelt/velocypack) -- a fast and compact format for serialization and storage.  These days, JSON (JavaScript Object Notation, see ECMA-404) is used in many cases where data has to be exchanged. Lots of protocols between different services use it, databases store JSON (document stores naturally, but others increasingly as well). It is popular, because it is simple, human-readable, and yet surprisingly versatile, despite its limitations. At the same time there is a plethora of alternatives ranging from XML over Universal Binary JSON, MongoDB's BSON, MessagePack, BJSON (binary JSON), Apache Thrift till Google's protocol buffers and ArangoDB's shaped JSON. When looking into this, we were surprised to find that none of these formats manages to combine compactness, platform independence, fast access to sub-objects and rapid conversion from and to JSON.
- **VisualScriptEngine** [📁](./VisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngine) -- A visual scripting engine designed for embedding. The engine is written in modern C++ and compiles on several platforms with no external dependencies.
- **warc2text** [📁](./warc2text) [🌐](https://github.com/GerHobbelt/warc2text) -- Extracts plain text, language identification and more metadata from WARC records.
- **websocket-sharp** [📁](./websocket-sharp) [🌐](https://github.com/GerHobbelt/websocket-sharp) -- a C# implementation of the WebSocket protocol client and server.
- **webview** [📁](./webview) [🌐](https://github.com/GerHobbelt/webview)
- **wget** [📁](./wget) [🌐](https://github.com/GerHobbelt/wget)
- **Windows10EtwEvents** [📁](./Windows10EtwEvents) [🌐](https://github.com/GerHobbelt/Windows10EtwEvents) -- Events from all manifest-based and mof-based ETW providers across Windows 10 versions.
- **WinHttpPAL** [📁](./WinHttpPAL) [🌐](https://github.com/GerHobbelt/WinHttpPAL) -- implements [WinHttp API](https://docs.microsoft.com/en-us/windows/win32/winhttp/winhttp-start-page) Platform Abstraction Layer for POSIX systems using libcurl
- **wxCharts** [📁](./wxCharts) [🌐](https://github.com/GerHobbelt/wxCharts)
- **wxExamples** [📁](./wxExamples) [🌐](https://github.com/GerHobbelt/Examples_wxWidgets)
- **wxFormBuilder** [📁](./wxFormBuilder) [🌐](https://github.com/GerHobbelt/wxFormBuilder)
- **wxMEdit** [📁](./wxMEdit) [🌐](https://github.com/GerHobbelt/wxMEdit) -- a cross-platform Text/Hex Editor written in C++ & wxWidgets. wxMEdit supports many useful functions, e.g. Bookmark, Syntax Highlightings, Word Wraps, Encodings and Column/Hex Modes.
- **wxPDFView** [📁](./wxPDFView) [🌐](https://github.com/GerHobbelt/wxPDFView) -- wxWidgets PDF viewer/reader control
- **wxSQLite3** [📁](./wxSQLite3) [🌐](https://github.com/GerHobbelt/wxsqlite3) -- a C++ wrapper around the SQLite 3.x database and is specifically designed for use in programs based on the wxWidgets library. **wxSQLite3** does not try to hide the underlying database, in contrary almost all special features of the current SQLite3 version are supported, like for example the creation of user defined scalar or aggregate functions.
- **wxVisualScriptEngine** [📁](./wxVisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngineWxWidgets) -- a utility module for [VisualScriptEngine](https://github.com/kovacsv/VisualScriptEngine) which provides helper classes for embedding the engine in a wxWidgets application.
- **wxWebViewChromium** [📁](./wxWebViewChromium) [🌐](https://github.com/GerHobbelt/wxWebViewChromium) -- Chromium CEF3-based embedded browser for wxWidgets
- **wxWidgets** [📁](./wxWidgets) [🌐](https://github.com/GerHobbelt/wxWidgets)
- **xgboost** [📁](./xgboost) [🌐](https://github.com/GerHobbelt/xgboost) -- an optimized distributed gradient boosting library designed to be highly efficient, flexible and portable. It implements machine learning algorithms under the Gradient Boosting framework. XGBoost provides a parallel tree boosting (also known as GBDT, GBM) that solve many data science problems in a fast and accurate way. The same code runs on major distributed environment (Kubernetes, Hadoop, SGE, MPI, Dask) and can solve problems beyond billions of examples.
- **xml-pugixml** [📁](./xml-pugixml) [🌐](https://github.com/GerHobbelt/pugixml)
- **XMP-Toolkit-SDK** [📁](./XMP-Toolkit-SDK) [🌐](https://github.com/GerHobbelt/XMP-Toolkit-SDK)
- **xsimd** [📁](./xsimd) [🌐](https://github.com/GerHobbelt/xsimd) -- SIMD (Single Instruction, Multiple Data) instructions differ between microprocessor vendors and compilers. `xsimd` provides a unified means for using these features for library authors. It enables manipulation of batches of numbers with the same arithmetic operators as for single values. It also provides accelerated implementation of common mathematical functions operating on batches.
- **xtensor-blas** [📁](./xtensor-blas) [🌐](https://github.com/GerHobbelt/xtensor-blas) -- an extension to the `xtensor` library, offering bindings to BLAS and LAPACK libraries through `cxxblas` and `cxxlapack`.
- **xtensor-io** [📁](./xtensor-io) [🌐](https://github.com/GerHobbelt/xtensor-io) -- a `xtensor` plugin to read and write images, audio files, NumPy (compressed) NPZ and HDF5 files.
- **xtensor** [📁](./xtensor) [🌐](https://github.com/GerHobbelt/xtensor) -- C++ tensors with broadcasting and lazy computing. `xtensor` is a C++ library meant for numerical analysis with multi-dimensional array expressions.
- **xtl** [📁](./xtl) [🌐](https://github.com/GerHobbelt/xtl) -- xtensor core library
- **xxHash** [📁](./xxHash) [🌐](https://github.com/GerHobbelt/xxHash) -- fast hash algorithm
- ~~**xz-utils** [🌐](https://github.com/xz-mirror/xz)~~
- **yaml-cpp** [📁](./yaml-cpp) [🌐](https://github.com/GerHobbelt/yaml-cpp)
- **yaml-test-suite** [📁](./yaml-test-suite) [🌐](https://github.com/GerHobbelt/yaml-test-suite)
- **yara-pattern-matcher** [📁](./yara-pattern-matcher) [🌐](https://github.com/GerHobbelt/yara) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks
- **you-token-to-me** [📁](./you-token-to-me) [🌐](https://github.com/GerHobbelt/YouTokenToMe) -- text tokenization
- **yyjson** [📁](./yyjson) [🌐](https://github.com/GerHobbelt/yyjson) -- allegedly the fastest JSON library in C.
- **zlib** [📁](../../thirdparty/zlib) [🌐](https://github.com/GerHobbelt/thirdparty-zlib)
- ~~**zlog** [🌐](https://github.com/HardySimpson/zlog)~~
- **zstd** [📁](./zstd) [🌐](https://github.com/GerHobbelt/zstd)
- **zsync2** [📁](./zsync2) [🌐](https://github.com/GerHobbelt/zsync2) -- the advanced file download/sync tool zsync. zsync is a well known tool for downloading and updating local files from HTTP servers using the well known algorithms rsync.







## Libraries not available in this collection but already part of `mupdf`

- **cURL** [📁](../../thirdparty/curl) [🌐](https://github.com/GerHobbelt/thirdparty-curl)
- **extract** [📁](../../thirdparty/extract) [🌐](https://github.com/GerHobbelt/thirdparty_extract)
- **freeglut** [📁](../../thirdparty/freeglut) [🌐](https://github.com/GerHobbelt/thirdparty-freeglut)
- **freetype** [📁](../../thirdparty/freetype) [🌐](https://github.com/GerHobbelt/thirdparty-freetype2)
- **gumbo-parser** [📁](../../thirdparty/gumbo-parser) [🌐](https://github.com/GerHobbelt/gumbo-parser)
- **harfbuzz** [📁](../../thirdparty/harfbuzz) [🌐](https://github.com/GerHobbelt/thirdparty-harfbuzz)
- **jbig2dec** [📁](../../thirdparty/jbig2dec) [🌐](https://github.com/GerHobbelt/jbig2dec) -- a decoder library and example utility implementing the JBIG2 bi-level image compression spec. Also known as ITU T.88 and ISO IEC 14492, and included by reference in Adobe's PDF version 1.4 and later.
- **jpeginfo** [📁](../../thirdparty/jpeginfo) [🌐](https://github.com/GerHobbelt/jpeginfo)
- **langdata_LSTM** [📁](../../thirdparty/langdata_LSTM) [🌐](https://github.com/GerHobbelt/langdata_lstm)
- **lcms2** [📁](../../thirdparty/lcms2) [🌐](https://github.com/GerHobbelt/thirdparty-lcms2) -- `lcms2mt` is a thread-safe fork of `lcms` (a.k.a. Little CMS). Little CMS intends to be a small-footprint color management engine, with special focus on accuracy and performance. It uses the International Color Consortium standard (ICC), which is the modern standard when regarding to color management. The ICC specification is widely used and is referred to in many International and other de-facto standards. It was approved as an International Standard, ISO 15076-1, in 2005. Little CMS is a **full implementation** of ICC specification 4.3, it fully supports all kind of V2 and V4 profiles, including abstract, devicelink and named color profiles.
- **leptonica** [📁](../../thirdparty/leptonica) [🌐](https://github.com/GerHobbelt/leptonica)
- **libjpeg** [📁](../../thirdparty/libjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-libjpeg)
- **libpng** [📁](../../thirdparty/libpng) [🌐](https://github.com/GerHobbelt/libpng)
- **libtiff** [📁](../../thirdparty/libtiff) [🌐](https://github.com/GerHobbelt/libtiff)
- **mujs** [📁](../../thirdparty/mujs) [🌐](https://github.com/GerHobbelt/mujs) -- a lightweight ES5 Javascript interpreter designed for embedding in other software to extend them with scripting capabilities.
- **openjpeg** [📁](../../thirdparty/openjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-openjpeg)
- **tessconfigs** [📁](../../thirdparty/tessconfigs) [🌐](https://github.com/GerHobbelt/tessconfigs)
- **tessdata** [📁](../../thirdparty/tessdata) [🌐](https://github.com/GerHobbelt/tessdata)
- **tessdata_best** [📁](../../thirdparty/tessdata_best) [🌐](https://github.com/GerHobbelt/tessdata_best)
- **tessdata_contrib** [📁](../../thirdparty/tessdata_contrib) [🌐](https://github.com/GerHobbelt/tessdata_contrib)
- **tessdata_fast** [📁](../../thirdparty/tessdata_fast) [🌐](https://github.com/GerHobbelt/tessdata_fast)
- **tessdoc** [📁](../../thirdparty/tessdoc) [🌐](https://github.com/GerHobbelt/tessdoc)
- **tesseract** [📁](../../thirdparty/tesseract) [🌐](https://github.com/GerHobbelt/tesseract)
- **tesseract_docs** [📁](../../thirdparty/tesseract_docs) [🌐](https://github.com/GerHobbelt/tesseract_docs)
- **tesseract_langdata** [📁](../../thirdparty/tesseract_langdata) [🌐](https://github.com/GerHobbelt/langdata)
- **tesstrain** [📁](../../thirdparty/tesstrain) [🌐](https://github.com/GerHobbelt/tesstrain)
- **zlib** [📁](../../thirdparty/zlib) [🌐](https://github.com/GerHobbelt/thirdparty-zlib)























## TBD: Libraries which still need to be moved into the overview / categories above...




- **portable-memory-mapping** [📁](./portable-memory-mapping) [🌐](https://github.com/GerHobbelt/portable-memory-mapping) -- portable Memory Mapping C++ Class (Windows/Linux)
- **libmio** [📁](./libmio) [🌐](https://github.com/GerHobbelt/mio) -- An easy to use header-only cross-platform C++11 memory mapping library. `mio` has been created with the goal to be easily includable (i.e. no dependencies) in any C++ project that needs memory mapped file IO without the need to pull in Boost.
- **libvrb** [📁](./libvrb) [🌐](https://github.com/GerHobbelt/vrb) -- implements a ring buffer, also known as a character FIFO or circular buffer, with a special property that any data present in the buffer, as well as any empty space, are always seen as a single contiguous extent by the calling program.  This is implemented with virtual memory mapping by creating a mirror image of the buffer contents at the memory location in the virtual address space immediately after the main buffer location.  This allows the mirror image to always be seen without doing any copying of data.
- **fmtlog** [📁](./fmtlog) [🌐](https://github.com/GerHobbelt/fmtlog) -- a performant fmtlib-style logging library with latency in nanoseconds (i.e. using fmt library format).
- **libcnl** [📁](./libcnl) [🌐](https://github.com/GerHobbelt/cnl) -- The Compositional Numeric Library (CNL) is a C++ library of fixed-precision numeric classes which enhance integers to deliver safer, simpler, cheaper arithmetic types. CNL is particularly well-suited to: (1) compute on energy-constrained environments where FPUs are absent or costly; (2) compute on energy-intensive environments where arithmetic is the bottleneck such as simulations, machine learning applications and DSPs; and (3) domains such as finance where precision is essential.
- **libucl** [📁](./libucl) [🌐](https://github.com/GerHobbelt/libucl) -- the configuration language called UCL - Universal Configuration Language.  UCL is heavily infused by nginx configuration as the example of a convenient configuration system. However, UCL is fully compatible with JSON format and is able to parse json files.
- **libquill** [📁](./libquill) [🌐](https://github.com/GerHobbelt/quill) -- a cross-platform low latency logging library based on C++14.
- **NanoLog** [📁](./NanoLog) [🌐](https://github.com/GerHobbelt/NanoLog) -- an extremely performant nanosecond scale logging system for C++ that exposes a simple printf-like API and achieves over 80 million logs/second at a median latency of just over 7 nanoseconds.
- **libwil** [📁](./libwil) [🌐](https://github.com/GerHobbelt/wil) -- The Windows Implementation Libraries (WIL) is a header-only C++ library created to make life easier for developers on Windows through readable type-safe C++ interfaces for common Windows coding patterns.
- **libzopfli** [📁](./libzopfli) [🌐](https://github.com/GerHobbelt/zopfli) -- Zopfli Compression Algorithm is a compression library programmed in C to perform very good, but slow, deflate or zlib compression.
- **libwildmatch** [📁](./libwildmatch) [🌐](https://github.com/GerHobbelt/wildmatch) -- wildmatch is a BSD-licensed C/C++ library for git/rsync-style pattern matching.
- **libdeflate** [📁](./libdeflate) [🌐](https://github.com/GerHobbelt/libdeflate) -- heavily optimized library for DEFLATE/zlib/gzip compression and decompression.
- **libCRCpp** [📁](./libCRCpp) [🌐](https://github.com/GerHobbelt/CRCpp) -- easy to use and fast C++ CRC library.
- **typesense** [📁](./typesense) [🌐](https://github.com/GerHobbelt/typesense) -- a fast, typo-tolerant search engine for building delightful search experiences. Open Source alternative to Algolia and an Easier-to-Use alternative to ElasticSearch. ⚡🔍✨ Fast, typo tolerant, in-memory fuzzy Search Engine for building delightful search experiences.
- **dtoa-benchmark** [📁](./dtoa-benchmark) [🌐](https://github.com/GerHobbelt/dtoa-benchmark) -- This benchmark evaluates the performance of conversion from double precision IEEE-754 floating point (double) to ASCII string.
- **Extensible-Storage-Engine** [📁](./Extensible-Storage-Engine) [🌐](https://github.com/GerHobbelt/Extensible-Storage-Engine) -- ESE is an embedded / ISAM-based database engine, that provides rudimentary table and indexed access. However the library provides many other strongly layered and thus reusable sub-facilities as well: A Synchronization / Locking library, a Data-structures / STL-like library, an OS-abstraction layer, and a Cache Manager, as well as the full-blown database engine itself.
- **pthreadpool** [📁](./pthreadpool) [🌐](https://github.com/GerHobbelt/pthreadpool) -- pthreadpool is a portable and efficient thread pool implementation. It provides similar functionality to `#pragma omp parallel for`, but with additional features.
- **lrucache11** [📁](./lrucache11) [🌐](https://github.com/GerHobbelt/lrucache11) -- A header only C++11 LRU Cache template class that allows you to define key, value and optionally the `Map` type. uses a double linked list and a `std::unordered_map` style container to provide fast insert, delete and update No dependencies other than the C++ standard library.
- **CTPL-Thread-Pool** [📁](./CTPL-Thread-Pool) [🌐](https://github.com/GerHobbelt/CTPL) -- Modern and efficient C++ Thread Pool Library. More specifically, there are some threads dedicated to the pool and a container of jobs. The jobs come to the pool dynamically. A job is fetched and deleted from the container when there is an idle thread. The job is then run on that thread.
- **portable_concurrency-std-future** [📁](./portable_concurrency-std-future) [🌐](https://github.com/GerHobbelt/portable_concurrency) -- Portable implementation of future/promise API in C++. `std::future` done right.
- **YACLib** [📁](./YACLib) [🌐](https://github.com/GerHobbelt/YACLib) -- YACLib is a lightweight C++ library for concurrent and parallel task execution.
- **pelikan** [📁](./pelikan) [🌐](https://github.com/GerHobbelt/pelikan) -- Pelikan is Twitter's unified cache backend.
- **microsoft-performance-toolkit-sdk** [📁](./microsoft-performance-toolkit-sdk) [🌐](https://github.com/GerHobbelt/microsoft-performance-toolkit-sdk) -- The Microsoft Performance Toolkit is a collection of cross-platform tools developers can use to create and extend performance analysis applications. It serves as the runtime of the Windows Performance Analyzer, a Windows program included in the Windows Performance Toolkit. By using the Microsoft Performance Toolkit SDK, Windows Performance Analyzer - or any performance analysis application - can be configured to process and display performance data from arbitrary sources.
- **oppat** [📁](./oppat) [🌐](https://github.com/GerHobbelt/oppat) -- Open Power/Performance Analysis Tool (OPPAT) is a cross-OS, cross-architecture Power and Performance Analysis Tool. cross-OS: supports Windows ETW trace files and Linux/Android perf/trace-cmd trace files. cross-architecture: supports Intel and ARM chips hardware events (using perf and/or PCM).
- **compact_enc_det** [📁](./compact_enc_det) [🌐](https://github.com/GerHobbelt/compact_enc_det) -- Compact Encoding Detection (CED for short) is a library written in C++ that scans given raw bytes and detect the most likely text encoding.
- **nsync** [📁](./nsync) [🌐](https://github.com/GerHobbelt/nsync) -- a C library that exports various synchronization primitives. `nsync` may be desirable in place of `pthread` primitives in some cases:  (1) nsync locks are reader-writer locks (but are as efficient as mutexes).  (2) nsync locks and condition variables occupy only two words each.  (3) nsync works on Unix-like systems and Windows.  It should be portable to other platforms straightforwardly.  (4) nsync provides conditional critical sections.  These fill the same role as condition variables, but are usually easier to use, and in most common cases are comparable in speed.  They can be easier to use in two ways:  (A) it's not necessary to surround the "wait" operation in a while loop; instead the condition is passed to the call as a function and arbitrary pointer argument.  (B) it's not necessary to wake or signal explicitly when the condition(s) become true; they are checked automatically. The primary downsides are:  (A) they are not available in most other common synchronization APIs, and so they may be unfamiliar (even though they date back to the 1960s), and (B) if threads routinely wait on many distinct, false conditions associated with the same lock, they may be slower than condition variables. In this case, clients can use condition variables in the normal way; conditional critical sections and condition variables can be used with the same lock.  (5) nsync waits can be cancelled via an object passed to the wait calls, unlike the pthread model in which threads are cancelled.  This difference can be useful if the computation needs multiple threads, or if cancellation affects only sub-operations within a larger operation by the thread.
- **zfp-compressed-arrays** [📁](./zfp-compressed-arrays) [🌐](https://github.com/GerHobbelt/zfp) -- zfp is a compressed format for representing multidimensional floating-point and integer arrays. zfp provides compressed-array classes that support high throughput read and write random access to individual array elements. zfp also supports serial and parallel (OpenMP and CUDA) compression of whole arrays, e.g., for applications that read and write large data sets to and from disk.


- **ThreadPool** [📁](./ThreadPool) [🌐](https://github.com/GerHobbelt/ThreadPool)
- **TraceETW** [📁](./TraceETW) [🌐](https://github.com/GerHobbelt/TraceEtw)
- **random** [📁](./random) [🌐](https://github.com/GerHobbelt/random) -- random for modern C++ with a convenient API.
- **wyhash** [📁](./wyhash) [🌐](https://github.com/GerHobbelt/wyhash) -- No hash function is perfect, but some are useful. `wyhash` and `wyrand` are the ideal 64-bit hash function and PRNG respectively: solid, portable, fastest (especially for short keys), salted (using a dynamic secret to avoid intended attack).
- **xnnpack** [📁](./xnnpack) [🌐](https://github.com/GerHobbelt/XNNPACK)
- **merror** [📁](./merror) [🌐](https://github.com/GerHobbelt/merror) -- a library for error handling in C++ without exceptions.
- **kahypar** [📁](./kahypar) [🌐](https://github.com/GerHobbelt/kahypar) -- KaHyPar (Karlsruhe Hypergraph Partitioning) is a multilevel hypergraph partitioning framework providing direct k-way and recursive bisection based partitioning algorithms that compute solutions of very high quality.
- **flat_hash_map** [📁](./flat_hash_map) [🌐](https://github.com/GerHobbelt/flat_hash_map) -- a very fast hashtable.
- **pagerank** [📁](./pagerank) [🌐](https://github.com/GerHobbelt/pagerank) -- a [pagerank](http://www.ams.org/samplings/feature-column/fcarc-pagerank) implementation in C++ able to handle very big graphs.
- **graphit** [📁](./graphit) [🌐](https://github.com/GerHobbelt/graphit) -- a High-Performance Domain Specific Language for Graph Analytics.
- **libgrape-lite** [📁](./libgrape-lite) [🌐](https://github.com/GerHobbelt/libgrape-lite) -- a C++ library from Alibaba for parallel graph processing (GRAPE). It differs from prior systems in its ability to parallelize sequential graph algorithms as a whole by following the PIE programming model from GRAPE. Sequential algorithms can be easily "plugged into" `libgrape-lite` with only minor changes and get parallelized to handle large graphs efficiently. `libgrape-lite` is designed to be highly efficient and flexible, to cope with the scale, variety and complexity of real-life graph applications.
- **concurrencpp** [📁](./concurrencpp) [🌐](https://github.com/GerHobbelt/concurrencpp)
- **lerc** [📁](./lerc) [🌐](https://github.com/GerHobbelt/lerc) -- LERC (Limited Error Raster Compression) is an open-source image or raster format which supports rapid encoding and decoding for any pixel type (not just RGB or Byte). Users set the maximum compression error per pixel while encoding, so the precision of the original input image is preserved (within user defined error bounds).
- **stx-error-handling** [📁](./stx-error-handling) [🌐](https://github.com/GerHobbelt/STX)
- **result-cpp** [📁](./result-cpp) [🌐](https://github.com/GerHobbelt/result) -- `Result<T, E>` is a modern, simple, and light-weight error-handling alternative to C++ exceptions with a rich feature-set.

- **delegate** [📁](./delegate) [🌐](https://github.com/GerHobbelt/delegate) -- an embedded friendly alternative to `std::function`. The main purpose is to store callable things such as free functions, member functions, and functors. Once stored, the delegate can be called without knowledge of the type of stored thing. The `delegate` guarantees no heap allocation and [is `trivially_copyable`](https://en.cppreference.com/w/cpp/named_req/TriviallyCopyable). It will never throw exceptions itself. Intended use is as general callback storage (think function pointer analog). The price to pay is that the delegate only stores a pointer to referenced functor objects or objects to call member functions on. The user needs to handle the lifetime of a referred object. In addition, the delegation object has a smaller footprint compared to common `std::function` implementations, using only 2 pointers (free function pointer and void pointer). This is small enough so that a delegate will use small object optimization.

- **robin-map** [📁](./robin-map) [🌐](https://github.com/GerHobbelt/robin-map) -- a C++ implementation of a fast hash map and hash set using open-addressing and linear robin hood hashing with backward shift deletion to resolve collisions.
- **hopscotch-map** [📁](./hopscotch-map) [🌐](https://github.com/GerHobbelt/hopscotch-map) -- a C++ implementation of a fast hash map and hash set using hopscotch hashing and open-addressing to resolve collisions. It is a cache-friendly data structure offering better performances than `std::unordered_map` in most cases and is closely similar to `google::dense_hash_map` while using less memory and providing more functionalities.
- **ocreval** [📁](./ocreval) [🌐](https://github.com/GerHobbelt/ocreval) -- `ocreval` contains 17 tools for measuring the performance of and experimenting with OCR output. `ocreval` is a modern port of the [ISRI Analytic Tools for OCR Evaluation](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.216.9427&rep=rep1&type=pdf), with UTF-8 support and other improvements.
- **asio** [📁](./asio) [🌐](https://github.com/GerHobbelt/asio)
- **highway** [📁](./highway) [🌐](https://github.com/GerHobbelt/highway)
- **tinycolormap** [📁](./tinycolormap) [🌐](https://github.com/GerHobbelt/tinycolormap) -- a header-only, single-file library for colormaps written in C++11.
- **tesseract-gImgRdrGui** [📁](./tesseract-gImgRdrGui) [🌐](https://github.com/GerHobbelt/gImageReader)
- **pdf2htmlEX** [📁](./pdf2htmlEX) [🌐](https://github.com/GerHobbelt/pdf2htmlEX)
- **bhtsne--Barnes-Hut-t-SNE** [📁](./bhtsne--Barnes-Hut-t-SNE) [🌐](https://github.com/GerHobbelt/bhtsne) -- Barnes-Hut t-SNE
- **cpp-ipc** [📁](./cpp-ipc) [🌐](https://github.com/GerHobbelt/cpp-ipc) -- a high-performance inter-process communication using shared memory on Linux/Windows.
- **userver** [📁](./userver) [🌐](https://github.com/GerHobbelt/userver) -- an open source asynchronous framework with a rich set of abstractions for fast and comfortable creation of C++ microservices, services and utilities. The framework solves the problem of efficient I/O interactions transparently for the developers. Operations that would typically suspend the thread of execution do not suspend it. Instead of that, the thread processes other requests and tasks and returns to the handling of the operation only when it is guaranteed to execute immediately. As a result you get straightforward source code and avoid CPU-consuming context switches from OS, efficiently utilizing the CPU with a small amount of execution threads.
- **PhotonLibOS** [📁](./PhotonLibOS) [🌐](https://github.com/GerHobbelt/PhotonLibOS)
- **coost** [📁](./coost) [🌐](https://github.com/GerHobbelt/coost) -- A tiny boost library in C++11. `coost` (formerly known as `cocoyaxi`) is an elegant and efficient cross-platform C++ base library, it is not as heavy as `boost`, but still provides enough powerful features.
- **libstb** [📁](./libstb) [🌐](https://github.com/GerHobbelt/stb) -- single-file public domain (or MIT licensed) libraries for C/C++.
- **bolt** [📁](./bolt) [🌐](https://github.com/GerHobbelt/bolt) -- a deep learning library with high performance and heterogeneous flexibility.
- **concurrentqueue** [📁](./concurrentqueue) [🌐](https://github.com/GerHobbelt/concurrentqueue) -- moodycamel::ConcurrentQueue, an industrial-strength and fast multi-producer, multi-consumer lock-free concurrent queue for C++11.
- **libimagequant** [📁](./libimagequant) [🌐](https://github.com/GerHobbelt/libimagequant) -- Palette quantization library that powers `pngquant` and other PNG optimizers. `libimagequant` converts RGBA images to palette-based 8-bit indexed images, including alpha component. It's ideal for generating tiny PNG images and nice-looking GIFs. Image encoding/decoding isn't handled by the library itself, bring your own encoder.
- **palanteer** [📁](./palanteer) [🌐](https://github.com/GerHobbelt/palanteer) -- Visual Python and C++ nanosecond profiler, logger, tests enabler: a set of lean and efficient tools to improve the quality of software, for C++ and Python programs.
- **iceoryx** [📁](./iceoryx) [🌐](https://github.com/GerHobbelt/iceoryx) -- true zero-copy inter-process-communication. iceoryx is an inter-process-communication (IPC) middleware for various operating systems (currently we support Linux, macOS, QNX, FreeBSD and Windows 10). It has its origins in the automotive industry, where large amounts of data have to be transferred between different processes when it comes to driver assistance or automated driving systems. However, the efficient communication mechanisms can also be applied to a wider range of use cases, e.g. in the field of robotics or game development.
- **ecal** [📁](./ecal) [🌐](https://github.com/GerHobbelt/ecal) -- the *enhanced Communication Abstraction Layer* (*eCAL*) is a middleware that enables scalable, high performance interprocess communication on a single computer node or between different nodes in a computer network. eCAL uses a publish-subscribe pattern to automatically connect different nodes in the network. eCAL automatically chooses the best available data transport mechanism for each link:

  + Shared memory for local communication (incredible fast!)
  + UDP for network communication

- **recycle** [📁](./recycle) [🌐](https://github.com/GerHobbelt/recycle) -- an implementation of a simple resource pool for recycling resources in C++.
- **tcp_pubsub** [📁](./tcp_pubsub) [🌐](https://github.com/GerHobbelt/tcp_pubsub) -- a minimal publish-subscribe library that transports data via TCP. `tcp_pubsub` does not define a message format but only transports binary blobs. It does however define a protocol around that, which is kept as lightweight as possible.
- **DBoW2** [📁](./DBoW2) [🌐](https://github.com/GerHobbelt/DBoW2) -- a C++ library for indexing and converting images into a bag-of-word representation. It implements a hierarchical tree for approximating nearest neighbours in the image feature space and creating a visual vocabulary. DBoW2 also implements an image database with inverted and direct files to index images and enabling quick queries and feature comparisons.
- **warp-ctc** [📁](./warp-ctc) [🌐](https://github.com/GerHobbelt/warp-ctc) -- A fast parallel implementation of CTC, on both CPU and GPU. Connectionist Temporal Classification (CTC) is a loss function useful for performing supervised learning on sequence data, without needing an alignment between input data and labels. For example, CTC can be used to train end-to-end systems for speech recognition.
- **OpenFST** [📁](./OpenFST) [🌐](https://github.com/GerHobbelt/openfst) -- a library for constructing, combining, optimizing, and searching weighted finite-state transducers (FSTs). Weighted finite-state transducers are automata where each transition has an input label, an output label, and a weight. The more familiar finite-state acceptor is represented as a transducer with each transition's input and output label equal. Finite-state acceptors are used to represent sets of strings (specifically, regular or rational sets); finite-state transducers are used to represent binary relations between pairs of strings (specifically, rational transductions). The weights can be used to represent the cost of taking a particular transition. FSTs have key applications in speech recognition and synthesis, machine translation, optical character recognition, pattern matching, string processing, machine learning, information extraction and retrieval among others. Often a weighted transducer is used to represent a probabilistic model (e.g., an n-gram model, pronunciation model). FSTs can be optimized by determinization and minimization, models can be applied to hypothesis sets (also represented as automata) or cascaded by finite-state composition, and the best results can be selected by shortest-path algorithms.
- **dynet** [📁](./dynet) [🌐](https://github.com/GerHobbelt/dynet) -- The Dynamic Neural Network Toolkit. DyNet is a neural network library developed by Carnegie Mellon University and many others. It is written in C++ (with bindings in Python) and is designed to be efficient when run on either CPU or GPU, and to work well with networks that have dynamic structures that change for every training instance. For example, these kinds of networks are particularly important in natural language processing tasks, and DyNet has been used to build state-of-the-art systems for syntactic parsing, machine translation, morphological inflection, and many other application areas.
- **tensorflow** [📁](./tensorflow) [🌐](https://github.com/GerHobbelt/tensorflow) -- an end-to-end open source platform for machine learning.
- **libchardet** [📁](./libchardet) [🌐](https://github.com/GerHobbelt/libchardet) -- is based on Mozilla Universal Charset Detector library and, detects the character set used to encode data.
- **line_detector** [📁](./line_detector) [🌐](https://github.com/GerHobbelt/line_detector) -- line segment detector ([lsd](http://www.ipol.im/pub/art/2012/gjmr-lsd/)) &. edge drawing line detector (edl) &. hough line detector (standard &. probabilistic) for detection.
- **refl-cpp** [📁](./refl-cpp) [🌐](https://github.com/GerHobbelt/refl-cpp) -- static reflection for C++17 (compile-time enumeration, attributes, proxies, overloads, template functions, metaprogramming).
- **zpp_bits** [📁](./zpp_bits) [🌐](https://github.com/GerHobbelt/zpp_bits) -- A modern, *fast*, C++20 binary serialization and RPC library, with just one header file.See also the [benchmark](https://github.com/GerHobbelt/zpp_bits#benchmark).
- **cppflow** [📁](./cppflow) [🌐](https://github.com/GerHobbelt/cppflow) -- run TensorFlow models in c++ without Bazel, without TensorFlow installation and without compiling Tensorflow.
- **utfcpp** [📁](./utfcpp) [🌐](https://github.com/GerHobbelt/utfcpp) -- UTF-8 with C++ in a Portable Way
- **fast_float** [📁](./fast_float) [🌐](https://github.com/GerHobbelt/fast_float) -- fast and exact implementation of the C++ `from_chars` functions for float and double types: 4x faster than `strtod`
- **libcopp** [📁](./libcopp) [🌐](https://github.com/GerHobbelt/libcopp) -- cross-platform coroutine library in C++
- **boost-url** [📁](./boost-url) [🌐](https://github.com/GerHobbelt/boost-url) -- a library for manipulating (RFC3986) Uniform Resource Identifiers (URIs) and Locators (URLs).
- **gdbm** [📁](./gdbm) [🌐](https://github.com/GerHobbelt/gdbm) -- GNU dbm is a set of NoSQL database routines that use extendable hashing and works similar to the standard UNIX `dbm` routines.

- **win32-dpi** [📁](./win32-dpi) [🌐](https://github.com/GerHobbelt/win32-dpi) -- Win32 DPI-aware window example, showcasing how to write a Win32 DPI-aware GUI application that scales properly on everything starting from Windows XP up to and including latest Windows 11.

- **libiconv** [📁](./libiconv) [🌐](https://github.com/GerHobbelt/libiconv-win-build) -- provides conversion between many platform, language or country dependent character encodings to & from Unicode. This library provides an `iconv()` implementation, for use on systems which don't have one, or whose implementation cannot convert from/to Unicode. It provides support for the encodings: European languages (ASCII, ISO-8859-{1,2,3,4,5,7,9,10,13,14,15,16}, KOI8-R, KOI8-U, KOI8-RU, CP{1250,1251,1252,1253,1254,1257}, CP{850,866,1131}, Mac{Roman,CentralEurope,Iceland,Croatian,Romania}, Mac{Cyrillic,Ukraine,Greek,Turkish}, Macintosh), Semitic languages (ISO-8859-{6,8}, CP{1255,1256}, CP862, Mac{Hebrew,Arabic}), Japanese (EUC-JP, SHIFT_JIS, CP932, ISO-2022-JP, ISO-2022-JP-2, ISO-2022-JP-1, ISO-2022-JP-MS), Chinese (EUC-CN, HZ, GBK, CP936, GB18030, EUC-TW, BIG5, CP950, BIG5-HKSCS, BIG5-HKSCS:2004, BIG5-HKSCS:2001, BIG5-HKSCS:1999, ISO-2022-CN, ISO-2022-CN-EXT), Korean (EUC-KR, CP949, ISO-2022-KR, JOHAB), Armenian (ARMSCII-8), Georgian (Georgian-Academy, Georgian-PS), Tajik (KOI8-T), Kazakh (PT154, RK1048), Thai (ISO-8859-11, TIS-620, CP874, MacThai), Laotian (MuleLao-1, CP1133), Vietnamese (VISCII, TCVN, CP1258), Platform specifics (HP-ROMAN8, NEXTSTEP), Full Unicode (UTF-8, UCS-2, UCS-2BE, UCS-2LE, UCS-4, UCS-4BE, UCS-4LE, UTF-16, UTF-16BE, UTF-16LE, UTF-32, UTF-32BE, UTF-32LE, UTF-7, C99, JAVA, UCS-2-INTERNAL, UCS-4-INTERNAL). It also provides support for a few extra encodings: European languages (CP{437,737,775,852,853,855,857,858,860,861,863,865,869,1125}), Semitic languages (CP864), Japanese (EUC-JISX0213, Shift_JISX0213, ISO-2022-JP-3), Chinese (BIG5-2003), Turkmen (TDS565), Platform specifics (ATARIST, RISCOS-LATIN1). It has also some limited support for transliteration, i.e. when a character cannot be represented in the target character set, it can be approximated through one or several similarly looking characters. 

- **dirent** [📁](./dirent) [🌐](https://github.com/GerHobbelt/dirent) -- POSIX `dirent.h` ported to MS Windows (Win32/Win64); used by several libraries.

- **swig**  [📁](./swig) [🌐](https://github.com/GerHobbelt/swig) -- a software development tool (code generator) that connects programs written in C and C++ with a variety of high-level programming languages.
- **cpp_rest_sdk**  [📁](./cpp_rest_sdk) [🌐](https://github.com/GerHobbelt/cpprestsdk) -- C++ REST SDK is a Microsoft project for cloud-based client-server communication in native code using a modern asynchronous C++ API design. This project aims to help C++ developers connect to and interact with services.




🔗 🌐 📁 🗃️






