# owemdjee

Data Science & Image Processing amalgam library in C/C++.

This place is a gathering spot & integration workplace for the C & C++ libraries we choose to use.  Think "*Façade Pattern*" and you're getting warm. 😉
The heavy data lifting will be done in the referenced libraries, while this lib will provide some glue and common ground for them to work in/with.


* [TOC](#owemdjee)
    * [Reason for this repo](#reason-for-this-repo)
        * [And?](#and)
        * [Critique?](#critique)
        * [Why is this repo a *solution*? And does it scale?](#why-is-this-repo-a-solution-and-does-it-scale)
* [Intent](#intent)
  * [Inter-process communications (IPC)](#inter-process-communications-ipc)
  * [Programming Languages used: *intent and purposes*](#programming-languages-used-intent-and-purposes)
  * [Scripting the System: Languages Considered for Scripting by Users](#scripting-the-system-languages-considered-for-scripting-by-users)
* [Libraries we're looking at for this *intent*](#libraries-were-looking-at-for-this-intent)











## Reason for this repo

`git submodules` hasn't been the most, ah, "user-friendly" methods to track and manage a set of libraries that you wish to track at *source level*.

A few problems have been repeatedly observed over our lifetime with `git`:

+ when it so happens that the importance & interest in a submoduled library is perhaps waning and you want to migrate to another, you can of course invoke `git` to ditch the old sow and bring in the shiny new one, but that stuff gets quite finicky when you are pedalling back & forth through your commit tree when, e.g. bughunting or maintenance work on a release branch which isn't up to snuff with the fashion kids yet.

  Yup, that's been much less of a problem since about 2018, but old scars need more than a pat on the arm to heal, if you get my drift.

+ folks haven't always been the happy campers they were supposed to be when they're facing a set of submodules and want to feel safe and sure in their "knowledge" that each library X is at commit Y, when the top of the module tree is itself at commit Z, for we are busy producing a production release, perhaps? That's a wee bit stressful and there have been enough "flukes" with git to make that a not-so-ironclad-as-we-would-like position.

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

<!--```toc
```-->

* [TOC](#intent)
    * [Inter-process communications (IPC)](#inter-process-communications-ipc)
    * [Programming Languages used: *intent and purposes*](#programming-languages-used-intent-and-purposes)
    * [Scripting the System: Languages Considered for Scripting by Users](#scripting-the-system-languages-considered-for-scripting-by-users)











## Inter-process communications (IPC)

Lowest possible **run-time** cost, a.k.a. "run-time overhead": the aim is to have IPC which does not noticably impact UX (User Experience of the application: responsiveness / UI) on reeasonably powered machines. (Users are *not* expected to have the latest or fastest hardware.)

As *at least* large images will be transfered (PDF page renders) we need to have a binary-able protocol.











## Programming Languages used: *intent and purposes*

We expect to use these languages in processes which require this type of IPC:

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
- JavaScript (**UI**, mostly. Think [*electron*](https://www.electronjs.org/), *web browser*, [*Chromely*](https://chromely.net/)<sup>[also](https://github.com/chromelyapps/Chromely)</sup>, [*WebView2*](https://docs.microsoft.com/en-us/microsoft-edge/webview2/)<sup>[plus](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)</sup>, that sort of thing)

Here we *intend* to use the regular SOLR APIs, which does not require specialized binary IPC.

We **may** **probably** choose to use a web-centric UI approach where images are *compressed* and *cached* in the *backend*, while being provided as \<picture> or \<img> tag references (URLs) in the HTML generated by the backend. *However*, we keep our options open ATM as furtheer testing is expected to hit a few obstacles there (smart caching required as we will be processing lots of documents in "background **bulk processes**" alongside the browsing and other more *direct* user activity) so a *websocket* or similar push technology may be employed: there we may benefit from dedicated IPC for large binary and text data transfers.











## Scripting the System: Languages Considered for Scripting by Users

Python has been considered. Given its loud presence in the AI communities, we still may integrate it one day. However, personally I'm not a big fan of the language and don't use it unless it's *prudent to do*, e.g. when extending or tweaking previous works produced by others.
Also, it turns out, it's not exactly *easy* to integrate (CPython) and I don't see a need for it beyond this one project / product: Qiqqa.

I've looked at Lua for a scripting language suitable for users (used quite a lot in the gaming industries and elsewhere); initial trials to get something going did not uncover major obstacles, but the question "_how do I **debug** Lua scripts?_" does not produce any viable project / product that goes beyond the *old skool `printf`-style debugging method*. Not a prime candidate therefor, as we expect that users will pick this up, when they like it, and grow the user scripts to unanticipated size and complexity: I've seen this happen multiple times in my career. Lua does not provide a scalable growth path from my perspective due to the lack of a *decent, customizable, debugger*.

Third candidate is JavaScript. While Artifex/mupdf comes with `mujs`, which is a simple engine it suffers from *two* drawbacks: it's ES5 and also does not provide a debugger mechanism beyond old skool `print`. Nice for nerds, but this is user-facing and thus not a viable option.

The other JavaScript engines considered are of varying size, performance and complexity. *Some* of them offer ways to integrate them with the \[F12] Chrome browser Developer Tools debugger, which would be *very nice to have available*. The road traveled there, along the various JavaScript engines is this:

- **chibi-scheme** [📁](./chibi-scheme) [🌐](https://github.com/GerHobbelt/chibi-scheme) -- Chibi-Scheme is a very small library intended for use as an extension and scripting language in C programs.  In addition to support for lightweight VM-based threads, each VM itself runs in an isolated heap allowing multiple VMs to run simultaneously in different OS threads.
- **guile** [📁](./guile) [🌐](https://github.com/GerHobbelt/guile) -- Guile is Project GNU's extension language library. Guile is an implementation of the Scheme programming language, packaged as a library that can be linked into applications to give them their own extension language.  Guile supports other languages as well, giving users of Guile-based applications a choice of languages.
- **itcl** [📁](./itcl) [🌐](https://github.com/GerHobbelt/itcl) -- Itcl is an object oriented extension for Tcl.
- **jimtcl** [📁](./jimtcl) [🌐](https://github.com/GerHobbelt/jimtcl) -- the Jim Interpreter is a small-footprint implementation of the Tcl programming language written from scratch. Currently Jim Tcl is very feature complete with an extensive test suite (see the tests directory). There are some Tcl commands and features which are not implemented (and likely never will be), including traces and Tk. However, Jim Tcl offers a number of both Tcl8.5 and Tcl8.6 features ({*}, dict, lassign, tailcall and optional UTF-8 support) and some unique features. These unique features include [lambda] with garbage collection, a general GC/references system, arrays as syntax sugar for [dict]tionaries, object-based I/O and more. Other common features of the Tcl programming language are present, like the "everything is a string" behaviour, implemented internally as dual ported objects to ensure that the execution time does not reflect the semantic of the language :)
- **newlisp** [📁](./newlisp) [🌐](https://github.com/GerHobbelt/newlisp) -- newLISP is a LISP-like scripting language for doing things you typically do with scripting languages: programming for the internet, system administration, text processing, gluing other programs together, etc. newLISP is a scripting LISP for people who are fascinated by LISP's beauty and power of expression, but who need it stripped down to easy-to-learn essentials. newLISP is LISP reborn as a scripting language: pragmatic and casual, simple to learn without requiring you to know advanced computer science concepts. Like any good scripting language, newLISP is quick to get into and gets the job done without fuss. newLISP has a very fast startup time, is small on resources like disk space and memory and has a deep, practical API with functions for networking, statistics, machine learning, regular expressions, multiprocessing and distributed computing built right into it, not added as a second thought in external modules.
- **ScriptX** [📁](./ScriptX) [🌐](https://github.com/GerHobbelt/ScriptX) -- Tencent's [ScriptX](https://github.com/Tencent/ScriptX) is a script engine abstraction layer. A variety of script engines are encapsulated on the bottom and a unified API is exposed on the top, so that the upper-layer caller can completely isolate the underlying engine implementation (back-end).
  
  ScriptX not only isolates several JavaScript engines (e.g. V8 and QuickJS), but can even isolate different scripting languages, so that the upper layer can seamlessly switch between scripting engine and scripting language without changing the code.

- **tcl** [📁](./tcl) [🌐](https://github.com/GerHobbelt/tcl) -- the latest **Tcl** source distribution. Tcl provides a powerful platform for creating integration applications that tie together diverse applications, protocols, devices, and frameworks.
- **tclclockmod** [📁](./tclclockmod) [🌐](https://github.com/GerHobbelt/tclclockmod) -- TclClockMod is the fastest, most powerful Tcl clock engine written in C. This Tcl clock extension is the faster Tcl-module for the replacement of the standard "clock" ensemble of tcl.
- [Facebook's Hermes](https://github.com/facebook/hermes), [Samsung's Escargot](https://github.com/Samsung/escargot) and [XS/moddable](https://www.moddable.com/)<sup>[also](https://github.com/Moddable-OpenSource/moddable) [here](https://github.com/Moddable-OpenSource/moddable-xst)</sup>, which led me to [a webpage where various embeddable JS engines are compared size- and *performance*-wise](https://bellard.org/quickjs/bench.html).
- [Google's V8](https://v8.dev/)<sup>[here](https://github.com/v8/v8) [too](https://chromium.googlesource.com/v8/v8/+/84450a2239672109bcf537d6740b8babda521567)</sup>, as available in NodeJS, is deemed too complex for integration: when we go there, we could spend the same amount of effort on CPython integration -- though there again is the ever-present "how to debug this visually?!" question...)
- [JerryScript](https://github.com/jerryscript-project/jerryscript/): ES2017/2020 (good!), there's noises about Chrome Developer Tools on the Net for this one. Small, designed for embedded devices. I like that.
- mujs: ES5, no visual debugger. **Out.**
- [QuickJS](https://github.com/bellard/quickjs): ES2020, DevTools or [VS Code debugging](https://github.com/koush/vscode-quickjs-debug) seems to be available. Also comes with an interesting runtime: [txiki](https://github.com/saghul/txiki.js), which we still need to take a good look at.

**UPDATE 2021/June**: [JerryScript](https://github.com/jerryscript-project/jerryscript/), duktape, XS/moddable, escargot: these have been dropped as we picked QuickJS. After some initial hassle with that codebase, we picked a different branch to test, which was cleaner and compiled out of the box (CMake > MSVC), which is always a good omen for a codebase when you have cross-platform portability in mind.





---













# Libraries we're looking at for this *intent*:

<!--```toc
```-->

* [TOC](#libraries-we-re-looking-at-for-this-intent)
    * [IPC: flatbuffer et al for protocol design](#ipc-flatbuffer-et-al-for-protocol-design)
    * [IPC: websockets, etc.: all communication means](#ipc-websockets-etc-all-communication-means)
        * [ZeroMQ a.k.a. ØMQ](#ipc-zeromq-aka-ømq)
        * [memory mapping](#ipc-memory-mapping)
    * [IPC: JSON for protocol design](#ipc-json-for-protocol-design)
    * [IPC: CBOR for protocol design](#ipc-cbor-for-protocol-design)
    * [IPC: YAML, TOML, etc. for protocol design](#ipc-yaml-toml-etc-for-protocol-design)
    * [Content Hashing (cryptographic strength i.e. *"guaranteed"* collision-free)](#content-hashing-cryptographic-strength-ie-guaranteed-collision-free)
    * [Hash-like Filters & Fast Hashing for Hash Tables et al (64 bits and less, mostly)](#hash-like-filters--fast-hashing-for-hash-tables-et-al-64-bits-and-less-mostly)
    * [Intermediate Data Storage / Caching / Hierarchical Data Stores (binary hOCR; document text revisions; ...)](#intermediate-data-storage--caching--hierarchical-data-stores-binary-hocr-document-text-revisions-)
        * [RAM-/disk-based large queues and stores: B+tree, LSM-tree, ...](#ram-disk-based-large-queues-and-stores-btree-lsm-tree-)
        * [HDF5 file format](#hdf5-file-format)
    * [Data Storage / Caching / IPC: loss-less data compression](#data-storage--caching--ipc-loss-less-data-compression)
    * [File / Directory Tree Synchronization (local and remote)](#file--directory-tree-synchronization-local-and-remote)
    * [OCR: hOCR output format, other output formats? (dedicated binary?)](#ocr-hocr-output-format-other-output-formats-dedicated-binary)
    * [Pattern Recognition](#pattern-recognition)
        * [BLAS, LAPACK, ...](#blas-lapack-)
        * [_delta features_ & other feature extraction (see Qiqqa research notes)](#delta-features--other-feature-extraction-see-qiqqa-research-notes)
        * [fuzzy matching](#fuzzy-matching)
        * [decision trees](#decision-trees)
        * [GMM/HMM/kM](#gmmhmmkm)
        * [graph analysis, graph databases](#graph-analysis-graph-databases)
        * [NN, ...](#nn-)
        * [similarity search](#similarity-search)
        * [text tokenization (as a preprocessing step for LDA et al)](#text-tokenization-as-a-preprocessing-step-for-lda-et-al)
        * [regex matchers (manual edit - pattern recognition)](#regex-matchers-manual-edit-pattern-recognition)
        * [OCR: quality improvements, language detect, ...](#ocr-quality-improvements-language-detect-)
        * [OCR page image preprocessing, \[scanner\] tooling: getting the pages to the OCR engine](#ocr-page-image-preprocessing-scanner-tooling-getting-the-pages-to-the-ocr-engine)
        * [image export, image / \[scanned\] document import](#image-export-image--scanned-document-import)
        * [Monte Carlo simulations, LDA, keyword inference/extraction, etc.](#monte-carlo-simulations-lda-keyword-inferenceextraction-etc)
        * [Random generators & all things random](#random-generators--all-things-random)
        * [Regression, curve fitting, polynomials, splines, geometrics, math](#regression-curve-fitting-polynomials-splines-geometrics-math)
        * [Solvers, Clustering, Monte Carlo, Decision Trees](#solvers-clustering-monte-carlo-decision-trees)
        * [Distance Metrics, Image Quality Metrics, Image Comparison](#distance-metrics-image-quality-metrics-image-comparison)
    * [Solvers](#solvers)
    * [database "backend storage"](#database-backend-storage)
        * [LMDB, NoSQL and key/value stores](#lmdb-nosql-and-keyvalue-stores)
        * [SQLite specific modules & related materials](#sqLite-specific-modules-related-materials)
    * [metadata & text (OCR et al) -- language detect, suggesting fixes, ...](#metadata--text-ocr-et-al----language-detect-suggesting-fixes-)
    * [PDF (XML) metadata editing](#pdf-xml-metadata-editing)
    * [web scraping (document extraction, cleaning, metadata extraction, BibTeX, ...)](#web-scraping-document-extraction-cleaning-metadata-extraction-bibtex-)
    * [file format support](#file-format-support)
    * [BibTeX and similar library metadata formats' support](#bibtex-and-similar-library-metadata-formats-support)
    * [export / output file formats, text formatting, etc.](#export--output-file-formats-text-formatting-etc)
    * [FTS (*Full Text Search*) and related: SOLR/Lucene et al: document content search](#fts-full-text-search-and-related-solrlucene-et-al-document-content-search)
        * [stemmers](#stemmers)
        * [language detection / inference](#language-detection--inference)
    * [scripting *user-tunable tasks* such as OCR preprocessing, metadata extraction, metadata cleaning & other \[post-\]processing, ...](#scripting-user-tunable-tasks-such-as-ocr-preprocessing-metadata-extraction-metadata-cleaning--other-post-processing-)
      * [QuickJS specific modules & related materials](#quickjs-specific-modules-related-materials)
    * [multi-processing core technologies](#multi-processing-core-technologies)
        * [CLI: commandline parsing & perusing](#cli-commandline-parsing--perusing)
        * [CPU features & capabilities detection](#cpu-features--capabilities-detection)
        * [Date & time functionality](#date--time-functionality)
        * [Misc. core functionality](#misc-core-functionality)
        * [multi-processing: invoking external applications](#multi-processing-invoking-external-applications)
        * [multi-processing: Promise/A+](#multi-processing-promisea)
        * [multi-processing: running tasks in parallel: multi-processing, multithreading, async, ...](#multi-processing-running-tasks-in-parallel-multi-processing-multithreading-async-)
        * [multi-processing: task schedulers](#multi-processing-task-schedulers)
        * [multi-processing: thread pools](#multi-processing-thread-pools)
        * [run-time library core features: logging, formatting, ...](#run-time-library-core-features-logging-formatting-)
    * [web servers, generic sockets I/O (IPC)](#web-servers-generic-sockets-io-ipc)
    * [socket I/O: websockets](#socket-io-websockets)
    * [disk I/O, monitoring import locations, ...](#disk-io-monitoring-import-locations-)
    * [configuration / parameterization](#configuration--parameterization)
        * [TOML](#toml)
        * [YAML](#yaml)
        * [INI](#ini)
    * [testing, benchmarking & fuzzing](#testing-benchmarking--fuzzing)
    * [logging & debugging](#logging--debugging)
        * [ETW (Event Tracing for Microsoft Windows)](#etw-event-tracing-for-microsoft-windows)
    * [colour processing & conversion](#colour-processing--conversion)
    * [visualization](#visualization)
    * [telemetry](#telemetry)
    * [OCR core (*tesseract*)](#ocr-core-tesseract)
    * [PDF render & metadata core (*mupdf*)](#pdf-render--metadata-core-mupdf)
    * [UI / GUI](#ui--gui)
    * [Language translation & transliteration](####language-translation--transliteration)
    * [Application Installers (NSIS, et al)](#application-installers-nsis-et-al)
    * [checking out the competition / compatriots for Qiqqa + re-use useful components](#checking-out-the-competition--compatriots-for-qiqqa--re-use-useful-components)
    * [citations output (CSL)](#citations-output-csl)
    * [Microsoft Word, Google Docs, LibreOffice: application integration](#microsoft-word-google-docs-libreoffice-application-integration)
    * [XML & XSLT tooling](#xml--xslt-tooling)
    * [Microsoft DOCX ~ OpenXML & other XML & XSLT tooling](#microsoft-docx--openxml--other-xml--xslt-tooling)
    * [misc / other](#misc--other)
    * [sub-dependencies (libraries which are required by any of the above)](#sub-dependencies-libraries-which-are-required-by-any-of-the-above)
* [Libraries in this collection (All of the above, listed in alphabetical order)](#libraries-in-this-collection-all-of-the-above-listed-in-alphabetical-order)
* [TBD: Libraries which still need to be moved into the overview / categories above...](#tbd-libraries-which-still-need-to-be-moved-into-the-overview--categories-above)











## IPC: flatbuffer et al for protocol design

- **avro** [📁](./avro) [🌐](https://github.com/GerHobbelt/avro) -- Apache Avro™ is a data serialization system.
- **bebop** [📁](./bebop) [🌐](https://github.com/GerHobbelt/bebop) -- an extremely simple, fast, efficient, cross-platform serialization format. Bebop is a schema-based binary serialization technology, similar to Protocol Buffers or MessagePack. In particular, Bebop tries to be a good fit for client–server or distributed web apps that need something faster, more concise, and more type-safe than JSON or MessagePack, while also avoiding some of the complexity of Protocol Buffers, FlatBuffers and the like.
- **bitsery** [📁](./bitsery) [🌐](https://github.com/GerHobbelt/bitsery) -- header only C++ binary serialization library, designed around the networking requirements for real-time data delivery, especially for games. All cross-platform requirements are enforced at compile time, so serialized data do not store any meta-data information and is as small as possible.
- **capnproto** [📁](./capnproto) [🌐](https://github.com/GerHobbelt/capnproto) -- Cap'n Proto is an insanely fast data interchange format and capability-based RPC system. Think JSON, except binary. Or think [Protocol Buffers](https://github.com/google/protobuf), except faster.
- **cereal** [📁](./cereal) [🌐](https://github.com/GerHobbelt/cereal) -- C++11 serialization library
- **GoldFish-CBOR** [📁](./GoldFish-CBOR) [🌐](https://github.com/GerHobbelt/GoldFish) -- a fast JSON and CBOR streaming library, without using memory. GoldFish can parse and generate very large [JSON](http://json.org) or [CBOR](http://cbor.io) documents. It has some similarities to a [SAX](https://en.wikipedia.org/wiki/Simple_API_for_XML) parser, but doesn't use an event driven API, instead the user of the GoldFish interface is in control. GoldFish intends to be the easiest and one of the fastest JSON and CBOR streaming parser and serializer to use.
- **ion-c** [📁](./ion-c) [🌐](https://github.com/GerHobbelt/ion-c) -- a C implementation of the [Ion data notation](http://amzn.github.io/ion-docs). Amazon Ion is a richly-typed, self-describing, hierarchical data serialization format offering interchangeable binary and text representations. The text format (a superset of JSON) is easy to read and author, supporting rapid prototyping. The binary representation is efficient to store, transmit, and skip-scan parse. The rich type system provides unambiguous semantics for long-term preservation of data which can survive multiple generations of software evolution.
- **libnop** [📁](./libnop) [🌐](https://github.com/GerHobbelt/libnop) -- libnop (C++ Native Object Protocols) is a header-only library for serializing and deserializing C++ data types without external code generators or runtime support libraries. The only mandatory requirement is a compiler that supports the C++14 standard.
- **libsmile** [📁](./libsmile) [🌐](https://github.com/GerHobbelt/libsmile) -- C implementation of the Smile binary format (https://github.com/FasterXML/smile-format-specification).
- **mosquitto** [📁](./mosquitto) [🌐](https://github.com/GerHobbelt/mosquitto) -- Eclipse Mosquitto is an open source implementation of a server for version 5.0, 3.1.1, and 3.1 of the MQTT protocol. It also includes a C and C++ client library, and the `mosquitto_pub` and `mosquitto_sub` utilities for publishing and subscribing.
- **protobuf** [📁](./protobuf) [🌐](https://github.com/GerHobbelt/protobuf) -- Protocol Buffers - Google's data interchange format that is a language-neutral, platform-neutral, extensible mechanism for serializing structured data.
  
  - **☹discouraged🤧**; reason: relatively slow run-time and (in my opinion) rather ugly & convoluted approach at build time. Has too much of a Java/CorporateProgramming smell, which has not lessened over the years, unfortunately.

- **swig** [📁](./swig) [🌐](https://github.com/GerHobbelt/swig) -- SWIG (Simplified Wrapper and Interface Generator) is a software development tool (code generator) that connects programs written in C and C++ with a variety of high-level programming languages. It is used for building scripting language interfaces to C and C++ programs. SWIG simplifies development by largely automating the task of scripting language integration, allowing developers and users to focus on more important problems.
  
  *[SWIG 🌐](https://swig.readthedocs.io/en/latest/Manual/SWIG.html) was not considered initially; more suitable for RPC than what we have in mind, which is purely data messages enchange. MAY be of use for transitional applications which are mixed-(programming-)language based, e.g. where we want to mix C/C++ and C# in a single Test Application.*

- **thrift** [📁](./thrift) [🌐](https://github.com/GerHobbelt/thrift) -- Apache Thrift is a lightweight, language-independent software stack for point-to-point RPC implementation. Thrift provides clean abstractions and implementations for data transport, data serialization, and application level processing. The code generation system takes a simple definition language as input and generates code across programming languages that uses the abstracted stack to build interoperable RPC clients and servers.
- **velocypack** [📁](./velocypack) [🌐](https://github.com/GerHobbelt/velocypack) -- a fast and compact format for serialization and storage.  These days, JSON (JavaScript Object Notation, see ECMA-404) is used in many cases where data has to be exchanged. Lots of protocols between different services use it, databases store JSON (document stores naturally, but others increasingly as well). It is popular, because it is simple, human-readable, and yet surprisingly versatile, despite its limitations. At the same time there is a plethora of alternatives ranging from XML over Universal Binary JSON, MongoDB's BSON, MessagePack, BJSON (binary JSON), Apache Thrift till Google's protocol buffers and ArangoDB's shaped JSON. When looking into this, we were surprised to find that none of these formats manages to combine compactness, platform independence, fast access to sub-objects and rapid conversion from and to JSON.
- ZeroMQ a.k.a. ØMQ:
  
  - **cppzmq** [📁](./cppzmq) [🌐](https://github.com/GerHobbelt/cppzmq) -- header-only C++ binding for libzmq.
  - **libCZMQ** [📁](./libCZMQ) [🌐](https://github.com/GerHobbelt/czmq) -- High-level C binding for ØMQ. (http://czmq.zeromq.org/)
  - **libzmq** [📁](./libzmq) [🌐](https://github.com/GerHobbelt/libzmq) -- ZeroMQ core engine in C++, implements [ZMTP/3.1](https://zguide.zeromq.org/).

- **zpp_bits** [📁](./zpp_bits) [🌐](https://github.com/GerHobbelt/zpp_bits) -- A modern, *fast*, C++20 binary serialization and RPC library, with just one header file.See also the [benchmark](https://github.com/GerHobbelt/zpp_bits#benchmark).
- ~~**FastBinaryEncoding** [🌐](https://github.com/chronoxor/FastBinaryEncoding)~~
  
  - **removed**; reason: for binary format record serialization we will be using `bebop` exclusively. All other communications will be JSON/JSON5/XML based.

- ~~**flatbuffers** [🌐](https://github.com/google/flatbuffers)~~
  
  - **removed**; reason: see `protobuf`: same smell rising. Faster at run time, but still a bit hairy to my tastes while `bebop` et al are on to something *potentially nice*.

- ~~**flatcc** [🌐](https://github.com/dvidelabs/flatcc)~~
  
  - **removed**; reason: see `flatbuffers`. When we don't dig `flatbuffers`, then `flatcc` is automatically pretty useless to us. Let's rephrase that professionally: "`flatcc` has moved out of scope for our project."

- ~~**libsmile** [🌐](https://github.com/pierre/libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format~~
  
  - **removed**; reason: for binary format record serialization we will be using `bebop` exclusively. All other communications will be JSON/JSON5/XML based.












## IPC: websockets, etc.: all communication means

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
- **libwebsocketpp** [📁](./libwebsocketpp) [🌐](https://github.com/GerHobbelt/websocketpp) -- WebSocket++ is a header only C++ library that implements RFC6455 The WebSocket Protocol.
- **libwebsockets** [📁](./libwebsockets) [🌐](https://github.com/GerHobbelt/libwebsockets) -- a simple-to-use C library providing client and server for HTTP/1, HTTP/2, WebSockets, MQTT and other protocols. It supports a lot of lightweight ancilliary implementations for things like JSON, CBOR, JOSE, COSE. It's very gregarious when it comes to event loop sharing, supporting libuv, libevent, libev, sdevent, glib and uloop, as well as custom event libs.
- **nanomsg-nng** [📁](./nanomsg-nng) [🌐](https://github.com/GerHobbelt/nng) -- a rewrite of the Scalability Protocols library known as https://github.com/nanomsg/nanomsg[libnanomsg], which adds significant new capabilities, while retaining compatibility with the original. NNG is a lightweight, broker-less library, offering a simple API to solve common recurring messaging problems, such as publish/subscribe, RPC-style request/reply, or service discovery.
- **nghttp3** [📁](./nghttp3) [🌐](https://github.com/GerHobbelt/nghttp3) -- an implementation of `RFC 9114 <https://datatracker.ietf.org/doc/html/rfc9114>`_ HTTP/3 mapping over QUIC and `RFC 9204 <https://datatracker.ietf.org/doc/html/rfc9204>`_ QPACK in C.
- **ngtcp2** [📁](./ngtcp2) [🌐](https://github.com/GerHobbelt/ngtcp2) -- ngtcp2 project is an effort to implement `RFC9000 <https://datatracker.ietf.org/doc/html/rfc9000>`_ QUIC protocol.
- **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- OpenSSL is a robust, commercial-grade, full-featured Open Source Toolkit for the Transport Layer Security (TLS) protocol formerly known as the Secure Sockets Layer (SSL) protocol. The protocol implementation is based on a full-strength general purpose cryptographic library, which can also be used stand-alone.
- **restc-cpp** [📁](./restc-cpp) [🌐](https://github.com/GerHobbelt/restc-cpp) -- a modern C++ REST Client library. The magic that takes the pain out of accessing JSON API's from C++. The design goal of this project is to make external REST API's simple and safe to use in C++ projects, but still fast and memory efficient.
- **shadesmar** [📁](./shadesmar) [🌐](https://github.com/GerHobbelt/shadesmar) -- an IPC library that uses the system's shared memory to pass messages. Supports publish-subscribe and RPC.
- **sharedhashfile** [📁](./sharedhashfile) [🌐](https://github.com/GerHobbelt/sharedhashfile) -- share hash tables with stable key hints stored in memory mapped files between arbitrary processes.
- **shmdata** [📁](./shmdata) [🌐](https://github.com/GerHobbelt/shmdata) -- shares streams of framed data between processes (1 writer to many readers) via shared memory. It supports any kind of data stream:  it has been used with multichannel audio, video frames, 3D models, OSC messages, and various others types of data. Shmdata is very fast and allows processes to access data streams without the need for extra copies.
- **tcp_pubsub** [📁](./tcp_pubsub) [🌐](https://github.com/GerHobbelt/tcp_pubsub) -- a minimal publish-subscribe library that transports data via TCP. `tcp_pubsub` does not define a message format but only transports binary blobs. It does however define a protocol around that, which is kept as lightweight as possible.
- **tcpshm** [📁](./tcpshm) [🌐](https://github.com/GerHobbelt/tcpshm) -- a connection-oriented persistent message queue framework based on TCP or SHM IPC for Linux. TCPSHM provides a reliable and efficient solution based on a sequence number and acknowledge mechanism, that every sent out msg is persisted in a send queue until sender got ack that it's been consumed by the receiver, so that disconnects/crashes are tolerated and the recovery process is purely automatic.
- **telegram-bot-api** [📁](./telegram-bot-api) [🌐](https://github.com/GerHobbelt/telegram-bot-api) -- the Telegram Bot API provides an HTTP API for creating Telegram Bots.
- **telegram-td** [📁](./telegram-td) [🌐](https://github.com/GerHobbelt/td) -- TDLib (Telegram Database library) is a cross-platform library for building [Telegram](https://telegram.org) clients. It can be easily used from almost any programming language.
- **ucx** [📁](./ucx) [🌐](https://github.com/GerHobbelt/ucx) -- Unified Communication X (UCX) is an optimized production proven-communication framework for modern, high-bandwidth and low-latency networks. UCX exposes a set of abstract communication primitives that utilize the best of available hardware resources and offloads. These include RDMA (InfiniBand and RoCE), TCP, GPUs, shared memory, and network atomic operations.
- **userver** [📁](./userver) [🌐](https://github.com/GerHobbelt/userver) -- an open source asynchronous framework with a rich set of abstractions for fast and comfortable creation of C++ microservices, services and utilities. The framework solves the problem of efficient I/O interactions transparently for the developers. Operations that would typically suspend the thread of execution do not suspend it. Instead of that, the thread processes other requests and tasks and returns to the handling of the operation only when it is guaranteed to execute immediately. As a result you get straightforward source code and avoid CPU-consuming context switches from OS, efficiently utilizing the CPU with a small amount of execution threads.
- **websocket-sharp** [📁](./websocket-sharp) [🌐](https://github.com/GerHobbelt/websocket-sharp) -- a C# implementation of the WebSocket protocol client and server.
- **WinHttpPAL** [📁](./WinHttpPAL) [🌐](https://github.com/GerHobbelt/WinHttpPAL) -- implements [WinHttp API](https://docs.microsoft.com/en-us/windows/win32/winhttp/winhttp-start-page) Platform Abstraction Layer for POSIX systems using libcurl
- ~~**ice** [🌐](https://github.com/zeroc-ice/ice) -- Comprehensive RPC Framework: helps you network your software with minimal effort.~~
  
  - **removed**; reason: has a strong focus on the *remote*, i.e. `R` in `RPC` (thus a focus on things such as encryption, authentication, firewalling, etc.), which we don't want or need: all services are supposed to run on a single machine and comms go through `localhost` *only*. When folks find they need to distribute the workload across multiple machines, then we'll be entering a new era in Qiqqa usage and then will be soon enough to (re-)investigate the usefulness of this package.


Also, we are currently more interested in *fast data serialization* then RPC *per se* as we aim for a solution that's more akin to a REST API interface style.

- ~~**oatpp** [🌐](https://github.com/oatpp/oatpp) -- IPC / server framework~~
  
  - **removed**; reason: see `crow`. We have picked `crow` as the preferred way forward, so any similar/competing product is out of scope unless `crow` throws a tantrum on our test bench after all, the chances of that being *very slim*.












### IPC: ZeroMQ a.k.a. ØMQ

- **cppzmq** [📁](./cppzmq) [🌐](https://github.com/GerHobbelt/cppzmq) -- header-only C++ binding for libzmq.
- **libCZMQ** [📁](./libCZMQ) [🌐](https://github.com/GerHobbelt/czmq) -- High-level C binding for ØMQ. (http://czmq.zeromq.org/)
- **libzmq** [📁](./libzmq) [🌐](https://github.com/GerHobbelt/libzmq) -- ZeroMQ core engine in C++, implements [ZMTP/3.1](https://zguide.zeromq.org/).











### IPC: memory mapping

- **fmem** [📁](./fmem) [🌐](https://github.com/GerHobbelt/fmem) -- a cross-platform library for opening memory-backed libc streams (a la UNIX `fmemopen()`).
- **fmemopen_windows** [📁](./fmemopen_windows) [🌐](https://github.com/GerHobbelt/fmemopen_windows) -- provides **FILE\*** handler based on memory backend for fread,fwrite etc. just like `fmemopen` on linux, but now on MS Windows.
- **libmio** [📁](./libmio) [🌐](https://github.com/GerHobbelt/mio) -- An easy to use header-only cross-platform C++11 memory mapping library. `mio` has been created with the goal to be easily includable (i.e. no dependencies) in any C++ project that needs memory mapped file IO without the need to pull in Boost.
- **libvrb** [📁](./libvrb) [🌐](https://github.com/GerHobbelt/vrb) -- implements a ring buffer, also known as a character FIFO or circular buffer, with a special property that any data present in the buffer, as well as any empty space, are always seen as a single contiguous extent by the calling program.  This is implemented with virtual memory mapping by creating a mirror image of the buffer contents at the memory location in the virtual address space immediately after the main buffer location.  This allows the mirror image to always be seen without doing any copying of data.
- **portable-memory-mapping** [📁](./portable-memory-mapping) [🌐](https://github.com/GerHobbelt/portable-memory-mapping) -- portable Memory Mapping C++ Class (Windows/Linux)
- **shadesmar** [📁](./shadesmar) [🌐](https://github.com/GerHobbelt/shadesmar) -- an IPC library that uses the system's shared memory to pass messages. Supports publish-subscribe and RPC.
- **sharedhashfile** [📁](./sharedhashfile) [🌐](https://github.com/GerHobbelt/sharedhashfile) -- share hash tables with stable key hints stored in memory mapped files between arbitrary processes.
- **shmdata** [📁](./shmdata) [🌐](https://github.com/GerHobbelt/shmdata) -- shares streams of framed data between processes (1 writer to many readers) via shared memory. It supports any kind of data stream:  it has been used with multichannel audio, video frames, 3D models, OSC messages, and various others types of data. Shmdata is very fast and allows processes to access data streams without the need for extra copies.
- **tcpshm** [📁](./tcpshm) [🌐](https://github.com/GerHobbelt/tcpshm) -- a connection-oriented persistent message queue framework based on TCP or SHM IPC for Linux. TCPSHM provides a reliable and efficient solution based on a sequence number and acknowledge mechanism, that every sent out msg is persisted in a send queue until sender got ack that it's been consumed by the receiver, so that disconnects/crashes are tolerated and the recovery process is purely automatic.











## IPC: JSON for protocol design

- **GoldFish-CBOR** [📁](./GoldFish-CBOR) [🌐](https://github.com/GerHobbelt/GoldFish) -- a fast JSON and CBOR streaming library, without using memory. GoldFish can parse and generate very large [JSON](http://json.org) or [CBOR](http://cbor.io) documents. It has some similarities to a [SAX](https://en.wikipedia.org/wiki/Simple_API_for_XML) parser, but doesn't use an event driven API, instead the user of the GoldFish interface is in control. GoldFish intends to be the easiest and one of the fastest JSON and CBOR streaming parser and serializer to use.
- **json** [📁](./json) [🌐](https://github.com/GerHobbelt/nlohmann-json) -- N. Lohmann's JSON for Modern C++.
- **jsoncons** [📁](./jsoncons) [🌐](https://github.com/GerHobbelt/jsoncons) -- a C++, header-only library for constructing [JSON](http://www.json.org) and JSON-like data formats such as [CBOR](http://cbor.io/). Compared to other JSON libraries, jsoncons has been designed to handle very large JSON texts. At its heart are SAX-style parsers and serializers. It supports reading an entire JSON text in memory in a variant-like structure. But it also supports efficient access to the underlying data using StAX-style pull parsing and push serializing. It supports incremental parsing into a user's preferred form, using information about user types provided by specializations of `json_type_traits`.
- **jsoncpp** [📁](./jsoncpp) [🌐](https://github.com/GerHobbelt/jsoncpp) -- JsonCpp is a C++ library that allows manipulating JSON values, including serialization and deserialization to and from strings. It can also preserve existing comment in unserialization/serialization steps, making it a convenient format to store user input files.
- **json-jansson** [📁](./json-jansson) [🌐](https://github.com/GerHobbelt/jansson) -- _Jansson_ is a C library for encoding, decoding and manipulating JSON data.
- **rapidJSON** [📁](./rapidJSON) [🌐](https://github.com/GerHobbelt/rapidjson) -- TenCent's fast JSON parser/generator for C++ with both SAX & DOM style APIs.
- **simdjson** [📁](./simdjson) [🌐](https://github.com/GerHobbelt/simdjson) -- simdjson : Parsing gigabytes of JSON per second. For NDJSON files, we can exceed 3 GB/s with our multithreaded parsing functions](https://github.com/simdjson/simdjson/blob/master/doc/parse_many.md).
- **tao-json** [📁](./tao-json) [🌐](https://github.com/GerHobbelt/tao-json) -- taoJSON is a C++ header-only JSON library that provides a generic [Value Class](doc/Value-Class.md), uses [Type Traits](doc/Type-Traits.md) to interoperate with C++ types, uses an [Events Interface](doc/Events-Interface.md) to convert from and to JSON, JAXN, CBOR, MsgPack and UBJSON, and much more...
- **yyjson** [📁](./yyjson) [🌐](https://github.com/GerHobbelt/yyjson) -- allegedly the fastest JSON library in C.
- ~~**libsmile** [🌐](https://github.com/pierre/libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format~~
  
  - **removed**; reason: I think we'd better standardize on using one or more of these:
    
    - custom binary exchange formats for those interchanges that demand highest performance and MAY carry large transfer loads.
    - JSON
    - TOML
    - XML
    - YAML












## IPC: CBOR for protocol design

- **GoldFish-CBOR** [📁](./GoldFish-CBOR) [🌐](https://github.com/GerHobbelt/GoldFish) -- a fast JSON and CBOR streaming library, without using memory. GoldFish can parse and generate very large [JSON](http://json.org) or [CBOR](http://cbor.io) documents. It has some similarities to a [SAX](https://en.wikipedia.org/wiki/Simple_API_for_XML) parser, but doesn't use an event driven API, instead the user of the GoldFish interface is in control. GoldFish intends to be the easiest and one of the fastest JSON and CBOR streaming parser and serializer to use.
- **jsoncons** [📁](./jsoncons) [🌐](https://github.com/GerHobbelt/jsoncons) -- a C++, header-only library for constructing [JSON](http://www.json.org) and JSON-like data formats such as [CBOR](http://cbor.io/). Compared to other JSON libraries, jsoncons has been designed to handle very large JSON texts. At its heart are SAX-style parsers and serializers. It supports reading an entire JSON text in memory in a variant-like structure. But it also supports efficient access to the underlying data using StAX-style pull parsing and push serializing. It supports incremental parsing into a user's preferred form, using information about user types provided by specializations of `json_type_traits`.
- **libcbor** [📁](./libcbor) [🌐](https://github.com/GerHobbelt/libcbor) -- a C library for parsing and generating [CBOR](https://tools.ietf.org/html/rfc7049), the general-purpose schema-less binary data format.
- **QCBOR** [📁](./QCBOR) [🌐](https://github.com/GerHobbelt/QCBOR) -- a powerful, commercial-quality CBOR encoder/decoder that implements these RFCs:
  
  * [RFC7049](https://tools.ietf.org/html/rfc7049) The previous CBOR standard. Replaced by RFC 8949.
  * [RFC8742](https://tools.ietf.org/html/rfc8742) CBOR Sequences
  * [RFC8943](https://tools.ietf.org/html/rfc8943) CBOR Dates
  * [RFC8949](https://tools.ietf.org/html/rfc8949) The CBOR Standard. (Everything except sorting of encoded maps)

- **tinycbor** [📁](./tinycbor) [🌐](https://github.com/GerHobbelt/tinycbor) -- Concise Binary Object Representation (CBOR) library for serializing data to disk or message channel.











## IPC: YAML, TOML, etc. for protocol design

**Not considered**: reason: when we want the IPC protocol to be "human readable" in any form/approximation, we've decided to stick with JSON or XML (if we cannot help it -- I particularly dislike the verbosity and tag redundancy (open+close) in XML and consider it a lousy design choice for *any* purpose).

The more human readable formats (YAML, TOML, ...) are intended for human to machine communications, e.g. for feeding configurations into applications, and **SHOULD NOT** be used for IPC anywhere. (Though I must say I'm on the fence where it comes using YAML as an alternative IPC format where it replaces JSON; another contender there are the JSON5/JSON6 formats.)











## Content Hashing (cryptographic strength i.e. *"guaranteed"* collision-free)

The bit about **_"guaranteed"_ collision-free** is to be read as: hash algorithms in this section must come with *strong statistical guarantees* that any chance at a **hash collision** is negligible, even for *extremely large* collections. In practice this means: use *cryptographic* hash algorithms with a *strength* of 128 bits or more. (Qiqqa used a b0rked version SHA1 thus far, which is considered too weak as we already sample PDFs which cause a hash collision for the *official* SHA1 algo (and thus also collide in our b0rked SHA1 variant): while those can still be argued to be fringe case, I don't want to be bothered with this at all and thus choose to err on the side of 'better than SHA1B' here. Meanwhile, any library in here *may* contain weaker cryptographic hashes alongside: we won't be using those for **content hashing**.

- **BLAKE3** [📁](./BLAKE3) [🌐](https://github.com/GerHobbelt/BLAKE3) -- cryptographic hash
- **boringssl** [📁](./boringssl) [🌐](https://github.com/GerHobbelt/boringssl) -- BoringSSL is a fork of OpenSSL that is designed to meet Google's needs.
- **cryptopp** [📁](./cryptopp) [🌐](https://github.com/GerHobbelt/cryptopp) -- crypto library
- **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- its crypto library part, more specifically.
- **prvhash** [📁](./prvhash) [🌐](https://github.com/GerHobbelt/prvhash) -- PRVHASH is a hash function that generates a [uniform pseudo-random number sequence](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) derived from the message. PRVHASH is conceptually similar (in the sense of using a pseudo-random number sequence as a hash) to [`keccak`](https://en.wikipedia.org/wiki/SHA-3) and [`RadioGatun`](https://en.wikipedia.org/wiki/RadioGat%C3%BAn) schemes, but is a completely different implementation of such concept. PRVHASH is both a ["randomness extractor"](https://en.wikipedia.org/wiki/Randomness_extractor) and an "extendable-output function" (XOF).
- **SipHash** [📁](./SipHash) [🌐](https://github.com/GerHobbelt/SipHash) -- SipHash is a family of pseudorandom functions (PRFs) optimized for speed on short messages. This is the reference C code of SipHash: portable, simple, optimized for clarity and debugging. SipHash was designed in 2012 by [Jean-Philippe Aumasson](https://aumasson.jp) and [Daniel J. Bernstein](https://cr.yp.to) as a defense against [hash-flooding DoS attacks](https://aumasson.jp/siphash/siphashdos_29c3_slides.pdf).
  
  It is *simpler and faster* on short messages than previous cryptographic algorithms, such as MACs based on universal hashing, *competitive in performance* with insecure non-cryptographic algorithms, such as [fhhash](https://github.com/cbreeden/fxhash), *cryptographically secure*, with no sign of weakness despite multiple [cryptanalysis](https://eprint.iacr.org/2019/865) [projects](https://eprint.iacr.org/2019/865) by leading cryptographers, *battle-tested*, with successful integration in OSs (Linux kernel, OpenBSD, FreeBSD, FreeRTOS), languages (Perl, Python, Ruby, etc.), libraries (OpenSSL libcrypto, Sodium, etc.) and applications (Wireguard, Redis, etc.).
  
  As a secure pseudorandom function (a.k.a. keyed hash function), SipHash can also be used as a secure message authentication code (MAC). But SipHash is *not a hash* in the sense of general-purpose key-less hash function such as BLAKE3 or SHA-3. SipHash should therefore always be used with a secret key in order to be secure.

- **tink** [📁](./tink) [🌐](https://github.com/GerHobbelt/tink) -- A multi-language, cross-platform library that provides cryptographic APIs that are secure, easy to use correctly, and hard(er) to misuse.











## Hash-like Filters & Fast Hashing for Hash Tables et al (64 bits and less, mostly)

These hashes are for other purposes, e.g. fast lookup in dictionaries, fast approximate hit testing and set reduction through fast filtering (think *bloom filter*). These *may* be **machine specific** (and some of them *are*): these are **never supposed to be used for encoding in storage or other means which crosses machine boundaries**: if you want to use them for a database index, that is fine *as long as* you don't expect that database index to be readable by any other machine than the one which produced and uses these hash numbers.

> As you can see from the list below, I went on a shopping spree, having fun with all the latest, including some *possibly insane* stuff that's only really useful for particular edge cases -- which we *hope to avoid ourselves, for a while at least*. Anyway, I'ld say we've got the motherlode here. Simple fun for those days when your brain-flag is at half-mast. Enjoy.

- **adaptiveqf** [📁](./adaptiveqf) [🌐](https://github.com/GerHobbelt/adaptiveqf) -- [Adaptive Quotient Filter (AQF)](https://arxiv.org/abs/2107.02866) supports approximate membership testing and counting the occurrences of items in a data set. Like other AMQs, the AQF has a chance for false positives during queries. However, the AQF has the ability to adapt to false positives after they have occurred so they are not repeated. At the same time, the AQF maintains the benefits of a quotient filter, as it is small and fast, has good locality of reference, scales out of RAM to SSD, and supports deletions, counting, resizing, merging, and highly concurrent access.
- **BBHash** [📁](./BBHash) [🌐](https://github.com/GerHobbelt/BBHash) -- Bloom-filter based minimal perfect hash function library.
  
  - **left-for-dead**; reason: has some GCC + Linux specific coding constructs; code isn't clean, which doesn't make my porting effort 'trustworthy'. Overall, if this is the alternative, we'll stick with `gperf`.

- **BCF-cuckoo-index** [📁](./BCF-cuckoo-index) [🌐](https://github.com/GerHobbelt/BCF) -- Better Choice Cuckoo Filter (BCF) is an efficient approximate set representation data structure. Different from the standard Cuckoo Filter (CF), BCF leverages the principle of the power of two choices to select the better candidate bucket during insertion. BCF reduces the average number of relocations of the state-of-the-art CF by 35%.
  
  - **left-for-dead**; reason: has some GCC + Linux specific coding constructs: intrinsics + Linux-only API calls, which increase the cost of porting.

- **bloom** [📁](./bloom) [🌐](https://github.com/GerHobbelt/bloom) -- C++ Bloom Filter Library, which offers optimal parameter selection based on expected false positive rate, union, intersection and difference operations between bloom filters and compression of in-use table (increase of false positive probability vs space).
- **cmph-hasher** [📁](./cmph-hasher) [🌐](https://github.com/GerHobbelt/cmph) -- C Minimal Perfect Hashing Library for both small and (very) large hash sets.
- **cqf** [📁](./cqf) [🌐](https://github.com/GerHobbelt/cqf) -- [A General-Purpose Counting Filter: Counting Quotient Filter (CQF)](https://dl.acm.org/doi/10.1145/3035918.3035963) supports approximate membership testing and counting the occurrences of items in a data set. This general-purpose AMQ is small and fast, has good locality of reference, scales out of RAM to SSD, and supports deletions, counting (even on skewed data sets), resizing, merging, and highly concurrent access.
- **crc32c** [📁](./crc32c) [🌐](https://github.com/GerHobbelt/crc32c) -- a few CRC32C implementations under an umbrella that dispatches to a suitable implementation based on the host computer's hardware capabilities. CRC32C is specified as the CRC that uses the iSCSI polynomial in [RFC 3720](https://tools.ietf.org/html/rfc3720#section-12.1). The polynomial was introduced by G. Castagnoli, S. Braeuer and M. Herrmann. CRC32C is used in software such as Btrfs, ext4, Ceph and leveldb.
- **CRoaring** [📁](./CRoaring) [🌐](https://github.com/GerHobbelt/CRoaring) -- portable Roaring bitmaps in C (and C++). Bitsets, also called bitmaps, are commonly used as fast data structures. Unfortunately, they can use too much memory. To compensate, we often use compressed bitmaps. Roaring bitmaps are compressed bitmaps which tend to outperform conventional compressed bitmaps such as WAH, EWAH or Concise. They are used by several major systems such as Apache Lucene and derivative systems such as Solr and Elasticsearch, etc.. The CRoaring library is used in several systems such as Apache Doris.
- **cuckoofilter** [📁](./cuckoofilter) [🌐](https://github.com/GerHobbelt/cuckoofilter) -- Cuckoo Filter is a Bloom filter replacement for approximated set-membership queries. While Bloom filters are well-known space-efficient data structures to serve queries like "if item x is in a set?", they do not support deletion. Their variances to enable deletion (like counting Bloom filters) usually require much more space. Cuckoo ﬁlters provide the ﬂexibility to add and remove items dynamically. A cuckoo filter is based on cuckoo hashing (and therefore named as cuckoo filter).  It is essentially a cuckoo hash table storing each key's fingerprint. Cuckoo hash tables can be highly compact, thus a cuckoo filter could use less space than conventional Bloom ﬁlters, for applications that require low false positive rates (< 3%).
- **cuckoo-index** [📁](./cuckoo-index) [🌐](https://github.com/GerHobbelt/cuckoo-index) -- Cuckoo Index (CI) is a lightweight secondary index structure that represents the many-to-many relationship between keys and partitions of columns in a highly space-efficient way. CI associates variable-sized fingerprints in a Cuckoo filter with compressed bitmaps indicating qualifying partitions. The problem of finding all partitions that possibly contain a given lookup key is traditionally solved by maintaining one filter (e.g., a Bloom filter) per partition that indexes all unique key values contained in this partition. To identify all partitions containing a key, we would need to probe all per-partition filters (which could be many). Depending on the storage medium, a false positive there can be very expensive. Furthermore, secondary columns typically contain many duplicates (also across partitions). Cuckoo Index (CI) addresses these drawbacks of per-partition filters. (It must know all keys at build time, though.)
- **DCF-cuckoo-index** [📁](./DCF-cuckoo-index) [🌐](https://github.com/GerHobbelt/DCF) -- the Dynamic Cuckoo Filter (DCF) is an efficient approximate membership test data structure. Different from the classic Bloom filter and its variants, DCF is especially designed for highly dynamic datasets and supports extending and reducing its capacity. The DCF design is the first to achieve both reliable item deletion and flexibly extending/reducing for approximate set representation and membership testing. DCF outperforms the state-of-the-art DBF designs in both speed and memory consumption.
- **emphf-hash** [📁](./emphf-hash) [🌐](https://github.com/GerHobbelt/emphf) -- an efficient external-memory algorithm for the construction of minimal perfect hash functions for large-scale key sets, focusing on speed and low memory usage (2.61 N bits plus a small constant factor).
- **eytzinger** [📁](./eytzinger) [🌐](https://github.com/GerHobbelt/eytzinger) -- `fixed_eytzinger_map` is a free implementation of Eytzinger’s layout, in a form of an STL-like generic associative container, broadly compatible with a well-established access patterns. An Eytzinger map, or BFS(breadth-first search) map, places elements in a lookup order, which leads to a better memory locality. In practice, such container can outperform searching in sorted arrays, like `boost::flat_map`, due to less cache misses made in a lookup process. In comparison with RB-based trees, like `std::map`, lookup in Eytzinger map can be multiple times faster. Some comparison graphs are [given here](https://kazakov.life/2017/03/06/cache-friendly-associative-container/).
- **farmhash** [📁](./farmhash) [🌐](https://github.com/GerHobbelt/farmhash) -- FarmHash, a family of hash functions. FarmHash provides hash functions for strings and other data.  The functions mix the input bits thoroughly but are not suitable for cryptography.
- **fastfilter_cpp** [📁](./fastfilter_cpp) [🌐](https://github.com/GerHobbelt/fastfilter_cpp) -- Fast Filter: Fast approximate membership filter implementations (C++, research library)
- **fifo_map** [📁](./fifo_map) [🌐](https://github.com/GerHobbelt/fifo_map) -- a FIFO-ordered associative container for C++. It has the same interface as `std::map`, it can be used as drop-in replacement.
- **flat_hash_map** [📁](./flat_hash_map) [🌐](https://github.com/GerHobbelt/flat_hash_map) -- a very fast hashtable.
- **flat.hpp** [📁](./flat.hpp) [🌐](https://github.com/GerHobbelt/flat.hpp) -- a library of flat vector-like based associative containers.
- **gperf-hash** [📁](./gperf-hash) [🌐](https://github.com/GerHobbelt/gperf) -- This is GNU gperf, a program that generates C/C++ perfect hash functions for sets of key words.
- **highwayhash** [📁](./highwayhash) [🌐](https://github.com/GerHobbelt/highwayhash) -- Fast strong hash functions: SipHash/HighwayHash
- **hopscotch-map** [📁](./hopscotch-map) [🌐](https://github.com/GerHobbelt/hopscotch-map) -- a C++ implementation of a fast hash map and hash set using hopscotch hashing and open-addressing to resolve collisions. It is a cache-friendly data structure offering better performances than `std::unordered_map` in most cases and is closely similar to `google::dense_hash_map` while using less memory and providing more functionalities.
- **iceberghashtable** [📁](./iceberghashtable) [🌐](https://github.com/GerHobbelt/iceberghashtable) -- [IcebergDB: High Performance Hash Tables Through Stability and Low Associativity](https://arxiv.org/abs/2210.04068) is a fast, concurrent, and resizeable hash table implementation. It supports insertions, deletions and queries for 64-bit keys and values.
- **LDCF-hash** [📁](./LDCF-hash) [🌐](https://github.com/GerHobbelt/LDCF) -- The Logarithmic Dynamic Cuckoo Filter (LDCF) is an efficient approximate membership test data structure for dynamic big data sets. LDCF uses a novel multi-level tree structure and reduces the worst insertion and membership testing time from O(N) to O(1), while simultaneously reducing the memory cost of DCF as the cardinality of the set increases.
- **libbloom** [📁](./libbloom) [🌐](https://github.com/GerHobbelt/bloomd) -- a high-performance C server, exposing bloom filters and operations over them. The rate of false positives can be tuned to meet application demands, but reducing the error rate rapidly increases the amount of memory required for the representation. Example: Bloom filters enable you to represent 1MM items with a false positive rate of 0.1% in 2.4MB of RAM.
- **libbloomfilters** [📁](./libbloomfilters) [🌐](https://github.com/GerHobbelt/libbloomfilters) -- **libbf** is a C++11 library which implements various Bloom filters, including:
  
  - A^2
  - Basic
  - Bitwise
  - Counting
  - Spectral MI
  - Spectral RM
  - Stable

- **libCRCpp** [📁](./libCRCpp) [🌐](https://github.com/GerHobbelt/CRCpp) -- easy to use and fast C++ CRC library.
- **libcuckoo** [📁](./libcuckoo) [🌐](https://github.com/GerHobbelt/libcuckoo) -- provides a high-performance, compact hash table that allows multiple concurrent reader and writer threads.
- **morton_filter** [📁](./morton_filter) [🌐](https://github.com/GerHobbelt/morton_filter) -- a [Morton filter](https://www.vldb.org/pvldb/vol11/p1041-breslow.pdf) -- a new approximate set membership data structure. A Morton filter is a modified cuckoo filter that is optimized for bandwidth-constrained systems. Morton filters use additional computation in order to reduce their off-chip memory traffic. Like a cuckoo filter, a Morton filter supports insertions, deletions, and lookup operations. It additionally adds high-throughput self-resizing, a feature of quotient filters, which allows a Morton filter to increase its capacity solely by leveraging its internal representation. This capability is in contrast to existing vanilla cuckoo filter implementations, which are static and thus require using a backing data structure that contains the full set of items to resize the filter. Morton filters can also be configured to use less memory than a cuckoo filter for the same error rate while simultaneously delivering insertion, deletion, and lookup throughputs that are, respectively, up to 15.5x, 1.3x, and 2.5x higher than a cuckoo filter. Morton filters in contrast to vanilla cuckoo filters do not require a power of two number of buckets but rather only a number that is a multiple of two. They also use fewer bits per item than a Bloom filter when the target false positive rate is less than around 1% to 3%.
- **parallel-hashmap** [📁](./parallel-hashmap) [🌐](https://github.com/GerHobbelt/parallel-hashmap) -- a set of hash map implementations, as well as a btree alternative to std::map and std::set
- **phf-hash** [📁](./phf-hash) [🌐](https://github.com/GerHobbelt/phf) -- a simple implementation of the CHD perfect hash algorithm. CHD can generate perfect hash functions for very large key sets -- on the order of millions of keys -- in a very short time.
- **prvhash** [📁](./prvhash) [🌐](https://github.com/GerHobbelt/prvhash) -- PRVHASH is a hash function that generates a [uniform pseudo-random number sequence](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) derived from the message. PRVHASH is conceptually similar (in the sense of using a pseudo-random number sequence as a hash) to [`keccak`](https://en.wikipedia.org/wiki/SHA-3) and [`RadioGatun`](https://en.wikipedia.org/wiki/RadioGat%C3%BAn) schemes, but is a completely different implementation of such concept. PRVHASH is both a ["randomness extractor"](https://en.wikipedia.org/wiki/Randomness_extractor) and an "extendable-output function" (XOF).
- **robin-hood-hashing** [📁](./robin-hood-hashing) [🌐](https://github.com/GerHobbelt/robin-hood-hashing) -- robin_hood unordered map & set.
- **robin-map** [📁](./robin-map) [🌐](https://github.com/GerHobbelt/robin-map) -- a C++ implementation of a fast hash map and hash set using open-addressing and linear robin hood hashing with backward shift deletion to resolve collisions.
- **semimap** [📁](./semimap) [🌐](https://github.com/GerHobbelt/semimap) -- semi::static_map and semi::map: associative map containers with compile-time lookup! Normally, associative containers require some runtime overhead when looking up their values from a key. However, when the key is known at compile-time (for example, when the key is a literal) then this run-time lookup could technically be avoided. This is exactly what the goal of `semi::static_map` and `semi::map` is.
- **SipHash** [📁](./SipHash) [🌐](https://github.com/GerHobbelt/SipHash) -- SipHash is a family of pseudorandom functions (PRFs) optimized for speed on short messages. This is the reference C code of SipHash: portable, simple, optimized for clarity and debugging. SipHash was designed in 2012 by [Jean-Philippe Aumasson](https://aumasson.jp) and [Daniel J. Bernstein](https://cr.yp.to) as a defense against [hash-flooding DoS attacks](https://aumasson.jp/siphash/siphashdos_29c3_slides.pdf).
  
  It is *simpler and faster* on short messages than previous cryptographic algorithms, such as MACs based on universal hashing, *competitive in performance* with insecure non-cryptographic algorithms, such as [fhhash](https://github.com/cbreeden/fxhash), *cryptographically secure*, with no sign of weakness despite multiple [cryptanalysis](https://eprint.iacr.org/2019/865) [projects](https://eprint.iacr.org/2019/865) by leading cryptographers, *battle-tested*, with successful integration in OSs (Linux kernel, OpenBSD, FreeBSD, FreeRTOS), languages (Perl, Python, Ruby, etc.), libraries (OpenSSL libcrypto, Sodium, etc.) and applications (Wireguard, Redis, etc.).
  
  As a secure pseudorandom function (a.k.a. keyed hash function), SipHash can also be used as a secure message authentication code (MAC). But SipHash is *not a hash* in the sense of general-purpose key-less hash function such as BLAKE3 or SHA-3. SipHash should therefore always be used with a secret key in order to be secure.

- **slot_map** [📁](./slot_map) [🌐](https://github.com/GerHobbelt/slot_map) -- a Slot Map is a high-performance associative container with persistent unique keys to access stored values. Upon insertion, a key is returned that can be used to later access or remove the values. Insertion, removal, and access are all guaranteed to take `O(1)` time (best, worst, and average case). Great for storing collections of objects that need stable, safe references but have no clear ownership. The difference between a `std::unordered_map` and a `dod::slot_map` is that the slot map generates and returns the key when inserting a value. A key is always unique and will only refer to the value that was inserted.
- **smhasher** [📁](./smhasher) [🌐](https://github.com/GerHobbelt/smhasher) -- benchmark and collection of fast hash functions for symbol tables or hash tables.
- **sparsehash** [📁](./sparsehash) [🌐](https://github.com/GerHobbelt/sparsehash) -- fast (non-cryptographic) hash algorithms
- **spookyhash** [📁](./spookyhash) [🌐](https://github.com/GerHobbelt/spookyhash) -- a very fast non cryptographic hash function, [designed by Bob Jenkins](http://burtleburtle.net/bob/hash/spooky.html). It produces well-distributed 128-bit hash values for byte arrays of any length. It can produce 64-bit and 32-bit hash values too, at the same speed.
- **tensorstore** [📁](./tensorstore) [🌐](https://github.com/GerHobbelt/tensorstore) -- TensorStore is an open-source C++ and Python software library designed for storage and manipulation of large multi-dimensional arrays.
- **wyhash** [📁](./wyhash) [🌐](https://github.com/GerHobbelt/wyhash) -- No hash function is perfect, but some are useful. `wyhash` and `wyrand` are the ideal 64-bit hash function and PRNG respectively: solid, portable, fastest (especially for short keys), salted (using a dynamic secret to avoid intended attack).
- **xor-and-binary-fuse-filter** [📁](./xor-and-binary-fuse-filter) [🌐](https://github.com/GerHobbelt/xor_singleheader) -- XOR and Binary Fuse Filter library: Bloom filters are used to quickly check whether an element is part of a set. Xor filters and binary fuse filters are faster and more concise alternative to Bloom filters. They are also smaller than cuckoo filters. They are used in [production systems](https://github.com/datafuselabs/databend).
- **xsg** [📁](./xsg) [🌐](https://github.com/GerHobbelt/xsg) -- XOR [BST](https://en.wikipedia.org/wiki/Binary_search_tree) implementations are related to the [XOR linked list](https://en.wikipedia.org/wiki/XOR_linked_list), a [doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list) variant, from where we borrow the idea about how links between nodes are to be implemented. Modest resource requirements and simplicity make XOR [scapegoat trees](https://en.wikipedia.org/wiki/Scapegoat_tree) stand out of the [BST](https://en.wikipedia.org/wiki/Binary_search_tree) crowd. All iterators (except `end()` iterators), but not references and pointers, are invalidated, after inserting or erasing from this XOR [scapegoat tree](https://en.wikipedia.org/wiki/Scapegoat_tree) implementation. You can dereference invalidated iterators, if they were not erased, but you cannot iterate with them. `end()` iterators are constant and always valid, but dereferencing them results in undefined behavior.
- **xxHash** [📁](./xxHash) [🌐](https://github.com/GerHobbelt/xxHash) -- fast (non-cryptographic) hash algorithm
- ~~**circlehash** [📁](./circlehash) [🌐](https://github.com/GerHobbelt/circlehash) -- a family of non-cryptographic hash functions that pass every test in SMHasher.~~
  
  - **removed**; reason: written in Go; port to C/C++ is easy but just too much effort for too little gain; when we're looking for *fast* non-cryptographic hashes like this, we don't it to include 128-bit / 64-bit multiplications as those are generally slower than shift, add, xor. While this will surely be a nice hash, it doesn't fit our purposes.












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











### RAM-/disk-based large queues and stores: B+tree, LSM-tree, ...

- **cpp-btree** [📁](./cpp-btree) [🌐](https://github.com/GerHobbelt/cpp-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
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
- **tlx-btree** [📁](./tlx-btree) [🌐](https://github.com/GerHobbelt/tlx) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- **vmem** [📁](./vmem) [🌐](https://github.com/GerHobbelt/vmem) -- **libvmem** and **libvmmalloc** are a couple of libraries for using persistent memory for malloc-like volatile uses.  They have historically been a part of [PMDK](https://pmem.io/pmdk) despite being solely for volatile uses. You may want consider using [memkind](https://github.com/memkind/memkind) instead in code that benefits from extra features like NUMA awareness.
- **vmemcache** [📁](./vmemcache) [🌐](https://github.com/GerHobbelt/vmemcache) -- **libvmemcache** is an embeddable and lightweight in-memory buffered LRU caching solution. It's designed to fully take advantage of large capacity memory, such as Persistent Memory with DAX, through memory mapping in an efficient and scalable way.











### HDF5 file format

- **h5cpp** [📁](./h5cpp) [🌐](https://github.com/GerHobbelt/h5cpp) -- easy to use HDF5 C++ templates for Serial and Paralel HDF5. Hierarchical Data Format HDF5 is prevalent in high performance scientific computing, sits directly on top of sequential or parallel file systems, providing block and stream operations on standardized or custom binary/text objects. Scientific computing platforms come with the necessary libraries to read write HDF5 dataset. H5CPP simplifies interactions with popular linear algebra libraries, provides compiler assisted seamless object persistence, Standard Template Library support and comes equipped with a novel error handling architecture.
  
  - **in-purgatory**; reason: see the `HDF5` entry below. But advertises to be an interface between OpenCV, Eigen, etc. at the same time...

- ~~**HDF5** [🌐](https://github.com/HDFGroup/hdf5)~~
  
  - **removed**; reason: HDF5 is a nice concept but considered *overkill* right now; where we need disk stores, we'll be using SQLite or LMDB-like key-value stores instead. Such stores are not meant to be interchangeable with other software in their raw shape and we'll provide public access APIs instead, where applicable.

- ~~**HighFive-HDF5** [🌐](https://github.com/BlueBrain/HighFive)~~
  
  - **removed**; reason: see the `HDF5` entry above.












## Data Storage / Caching / IPC: loss-less data compression

- **brotli** [📁](./brotli) [🌐](https://github.com/GerHobbelt/brotli) -- compression
- **c-blosc2** [📁](./c-blosc2) [🌐](https://github.com/GerHobbelt/c-blosc2) -- a high performance compressor optimized for binary data (i.e. floating point numbers, integers and booleans), designed to transmit data to the processor cache faster than the traditional, non-compressed, direct memory fetch approach via a `memcpy()` OS call.
- **density** [📁](./density) [🌐](https://github.com/GerHobbelt/density) -- a superfast compression library. It is focused on high-speed compression, at the best ratio possible. **All three** of DENSITY's algorithms are currently at the **pareto frontier** of compression speed vs ratio (cf. [here](https://github.com/inikep/lzbench/blob/master/lzbench18_sorted.md) for an independent benchmark).
- **densityxx** [📁](./densityxx) [🌐](https://github.com/GerHobbelt/densityxx) -- the c++ version of `density`, which is a super fast compress library.
- **fast-lzma2** [📁](./fast-lzma2) [🌐](https://github.com/GerHobbelt/fast-lzma2) -- the __Fast LZMA2 Library__ is a lossless high-ratio data compression library based on Igor Pavlov's LZMA2 codec from 7-zip. Binaries of 7-Zip forks which use the algorithm are available in the [7-Zip-FL2 project](https://github.com/conor42/7-Zip-FL2/releases/), the [7-Zip-zstd project](https://github.com/mcmilk/7-Zip-zstd/releases/), and the active fork of [p7zip](https://github.com/szcnick/p7zip/releases/). The library is also embedded in a fork of XZ Utils, named [FXZ Utils](https://github.com/conor42/fxz).
- **fast_pfor** [📁](./fast_pfor) [🌐](https://github.com/GerHobbelt/FastPFor) -- a research library with integer compression schemes. It is broadly applicable to the compression of arrays of 32-bit integers where most integers are small. The library seeks to exploit SIMD instructions (SSE) whenever possible.
- **libdeflate** [📁](./libdeflate) [🌐](https://github.com/GerHobbelt/libdeflate) -- heavily optimized library for DEFLATE/zlib/gzip compression and decompression.
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
- **p7zip** [📁](./p7zip) [🌐](https://github.com/GerHobbelt/p7zip) -- p7zip-zstd = 7zip with extensions, including major modern codecs such as Brotli, Fast LZMA2, LZ4, LZ5, Lizard and Zstd.
- **shoco** [📁](./shoco) [🌐](https://github.com/GerHobbelt/shoco) -- a fast compressor for short strings
- **snappy** [📁](./snappy) [🌐](https://github.com/GerHobbelt/snappy) -- an up-to-date fork of google/snappy, a fast compression/decompression library. It does not aim for maximum compression, or compatibility with any other compression library; instead, it aims for very high speeds and reasonable compression.
  
  - **second-choice**; reason: see `lzo2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading. See also [How do I decide between LZ4 and Snappy compression?](https://stackoverflow.com/questions/67537111/how-do-i-decide-between-lz4-and-snappy-compression)

- **squash** [📁](./squash) [🌐](https://github.com/GerHobbelt/squash) -- an abstraction library which provides a single API to access many compression libraries, allowing applications a great deal of flexibility when choosing a compression algorithm, or allowing a choice between several of them.
- **zfp-compressed-arrays** [📁](./zfp-compressed-arrays) [🌐](https://github.com/GerHobbelt/zfp) -- zfp is a compressed format for representing multidimensional floating-point and integer arrays. zfp provides compressed-array classes that support high throughput read and write random access to individual array elements. zfp also supports serial and parallel (OpenMP and CUDA) compression of whole arrays, e.g., for applications that read and write large data sets to and from disk.
- **zstd** [📁](./zstd) [🌐](https://github.com/GerHobbelt/zstd) -- Zstandard, a.k.a. `zstd`, is a fast lossless compression algorithm, targeting real-time compression scenarios at zlib-level and better compression ratios.
- ~~**bzip2** [🌐](https://github.com/nemequ/bzip2)~~
  
  - **removed**; reason: see `lzo` below. When we want this, we can go through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines.

- ~~**lzo** [🌐](https://github.com/nemequ/lzo)~~
  
  - **removed**; reason: gone as part of the first round of compression libraries' cleanup: we intend to support lz4 for fast work, plus zstd and *maybe* brotli for higher compression ratios, while we won't bother with anything else: the rest can be dealt with through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines when we need to read (or write) them. See also: [7zip-Zstd](https://github.com/mcmilk/7-Zip-zstd), which is what I use for accessing almost all compressed material anywhere.

- ~~**lzsse** [🌐](https://github.com/ConorStokes/LZSSE)~~
  
  - **removed**; reason: see `lzo` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...

- ~~**pithy** [🌐](https://github.com/johnezang/pithy)~~
  
  - **removed**; reason: see `lzo` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...

- ~~**xz-utils** [🌐](https://github.com/xz-mirror/xz)~~
  
  - **removed**; reason: see `lzo2` above. When we want this, we can go through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines.


See also [lzbench](https://github.com/inikep/lzbench).











## File / Directory Tree Synchronization (local and remote)

- **cdc-file-transfer** [📁](./cdc-file-transfer) [🌐](https://github.com/GerHobbelt/cdc-file-transfer) -- CDC File Transfer contains tools for syncing and streaming files from Windows to Windows or Linux. The tools are based on Content Defined Chunking (CDC), in particular [FastCDC](https://www.usenix.org/conference/atc16/technical-sessions/presentation/xia), to split up files into chunks.
- **CryptSync** [📁](./CryptSync) [🌐](https://github.com/GerHobbelt/CryptSync) -- a small utility that synchronizes two folders while encrypting the contents in one folder. That means one of the two folders has all files unencrypted (the files you work with) and the other folder has all the files encrypted. This is best used together with cloud storage tools like OneDrive, DropBox or Google Drive.
- **csync2** [📁](./csync2) [🌐](https://github.com/GerHobbelt/csync2) -- a cluster synchronization tool. It can be used to keep files on multiple hosts in a cluster in sync. Csync2 can handle complex setups with much more than just 2 hosts, handle file deletions and can detect conflicts.
- **filecopyex3** [📁](./filecopyex3) [🌐](https://github.com/GerHobbelt/filecopyex3) -- a FAR plugin designed to bring to life all kinds of perverted fantasies on the topic of file copying, each of which will speed up the process by 5% :smile:. At the moment, it has implemented the main features that are sometimes quite lacking in standard copiers.
- **FreeFileSync** [📁](./FreeFileSync) [🌐](https://github.com/GerHobbelt/FreeFileSync) -- a folder comparison and synchronization application that creates and manages backup copies of all your important files. Instead of copying every file every time, FreeFileSync determines the differences between a source and a target folder and transfers only the minimum amount of data needed. FreeFileSync is available for Windows, macOS, and Linux.
- **lib_nas_lockfile** [📁](./lib_nas_lockfile) [🌐](https://github.com/GerHobbelt/lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
- **librsync** [📁](./librsync) [🌐](https://github.com/GerHobbelt/librsync) -- a library for calculating and applying network deltas. librsync encapsulates the core algorithms of the rsync protocol, which help with efficient calculation of the differences between two files. The rsync algorithm is different from most differencing algorithms because it does not require the presence of the two files to calculate the delta.  Instead, it requires a set of checksums of each block of one file, which together form a signature for that file.  Blocks at any position in the other file which have the same checksum are likely to be identical, and whatever remains is the difference. This algorithm transfers the differences between two files without needing both files on the same system.
- **rclone** [📁](./rclone) [🌐](https://github.com/GerHobbelt/rclone) -- Rclone *("rsync for cloud storage")* is a command-line program to sync files and directories to and from different cloud storage providers. See [the full list of all storage providers and their features](https://rclone.org/overview/).
- **rsync** [📁](./rsync) [🌐](https://github.com/GerHobbelt/rsync) -- Rsync is a fast and extraordinarily versatile file copying tool for both remote and local files. Rsync uses a delta-transfer algorithm which provides a very fast method for bringing remote files into sync.
- **vcopy** [📁](./vcopy) [🌐](https://github.com/GerHobbelt/vcopy) -- tool to safely copy files across various (local) hardware under circumstances where there may be another file writer active at the same time and/or the (USB?) connection is sometimes flakey or system I/O drivers buggered.
- **zsync2** [📁](./zsync2) [🌐](https://github.com/GerHobbelt/zsync2) -- the advanced file download/sync tool zsync. zsync is a well known tool for downloading and updating local files from HTTP servers using the well known algorithms rsync used for diffing binary files. Therefore, it becomes possible to synchronize modifications by exchanging the changed blocks locally using `Range:` requests. The system is based on meta files called `.zsync` files. They contain hash sums for every block of data. The file is generated from and stored along with the actual file it refers to. Due to how system works, nothing but a "dumb" HTTP server is required to make use of zsync2. This makes it easy to integrate zsync2 into existing systems.











## OCR: hOCR output format, other output formats? (dedicated binary?)

- **archive-hocr-tools** [📁](./archive-hocr-tools) [🌐](https://github.com/GerHobbelt/archive-hocr-tools) -- a python package to ease hOCR parsing in a streaming manner.
- **hocr-fileformat** [📁](./hocr-fileformat) [🌐](https://github.com/GerHobbelt/ocr-fileformat) -- tools to alidate and transform between OCR file formats (hOCR, ALTO, PAGE, FineReader)
- **hocr-spec** [📁](./hocr-spec) [🌐](https://github.com/GerHobbelt/hocr-spec) -- the [hOCR](https://en.wikipedia.org/wiki/HOCR) Embedded OCR Workflow and Output Format specification originally written by [Thomas Breuel](https://github.com/tmbdev).
- **hocr-tools** [📁](./hocr-tools) [🌐](https://github.com/GerHobbelt/hocr-tools) -- a [Public Specification](http://hocr.info) and tools for the hOCR Format.
  
  hOCR is a format for representing OCR output, including layout information, character confidences, bounding boxes, and style information. It embeds this information invisibly in standard HTML. By building on standard HTML, it automatically inherits well-defined support for most scripts, languages, and common layout options. Furthermore, unlike previous OCR formats, the recognized text and OCR-related information co-exist in the same file and survives editing and manipulation. hOCR markup is independent of the presentation.












## Pattern Recognition

"A.I." for cover pages, image/page *segmentation*, including abstract & summary demarcation, "figure" and "table" detection & extraction from documents, ...











### BLAS, LAPACK, ...

- **armadillo** [📁](./armadillo) [🌐](https://github.com/GerHobbelt/armadillo-code) -- C++ library for linear algebra & scientific computing
- **autodiff** [📁](./autodiff) [🌐](https://github.com/GerHobbelt/autodiff) -- a C++17 library that uses modern and advanced programming techniques to enable automatic computation of derivatives in an efficient, easy, and intuitive way.
- **BaseMatrixOps** [📁](./BaseMatrixOps) [🌐](https://github.com/GerHobbelt/BaseMatrixOps) -- wrappers to C++ linear algebra libraries. No guarantees made about APIs or functionality.
- **clBLAS** [📁](./clBLAS) [🌐](https://github.com/GerHobbelt/clBLAS) -- the OpenCL™ BLAS portion of OpenCL's `clMath`. The complete set of BLAS level 1, 2 & 3 routines is implemented. In addition to GPU devices, the library also supports running on CPU devices to facilitate debugging and multicore programming. The primary goal of `clBLAS` is to make it easier for developers to utilize the inherent performance and power efficiency benefits of heterogeneous computing. `clBLAS` interfaces do not hide nor wrap OpenCL interfaces, but rather leaves OpenCL state management to the control of the user to allow for maximum performance and flexibility. The clBLAS library does generate and enqueue optimized OpenCL kernels, relieving the user from the task of writing, optimizing and maintaining kernel code themselves.
- **CLBlast** [📁](./CLBlast) [🌐](https://github.com/GerHobbelt/CLBlast) -- the tuned OpenCL BLAS library. CLBlast is a modern, lightweight, performant and tunable OpenCL BLAS library written in C++11. It is designed to leverage the full performance potential of a wide variety of OpenCL devices from different vendors, including desktop and laptop GPUs, embedded GPUs, and other accelerators. CLBlast implements BLAS routines: basic linear algebra subprograms operating on vectors and matrices.
- **CLBlast-database** [📁](./CLBlast-database) [🌐](https://github.com/GerHobbelt/CLBlast-database) -- the full database of tuning results for the [CLBlast OpenCL BLAS library](https://github.com/CNugteren/CLBlast). Tuning results are obtained using CLBlast and the [CLTune auto-tuner](https://github.com/CNugteren/CLTune).
- **CLTune** [📁](./CLTune) [🌐](https://github.com/GerHobbelt/CLTune) -- automatic OpenCL kernel tuning for CLBlast: CLTune is a C++ library which can be used to automatically tune your OpenCL and CUDA kernels. The only thing you'll need to provide is a tuneable kernel and a list of allowed parameters and values.
- **ensmallen** [📁](./ensmallen) [🌐](https://github.com/GerHobbelt/ensmallen) -- a high-quality C++ library for non-linear numerical optimization. `ensmallen` provides many types of optimizers that can be used for virtually any numerical optimization task. This includes gradient descent techniques, gradient-free optimizers, and constrained optimization. Examples include L-BFGS, SGD, CMAES and Simulated Annealing.
- **exprtk** [📁](./exprtk) [🌐](https://github.com/GerHobbelt/exprtk) -- C++ Mathematical Expression Toolkit Library is a simple to use, easy to integrate and extremely efficient run-time mathematical expression parsing and evaluation engine. The parsing engine supports numerous forms of functional and logic processing semantics and is easily extensible.
- **fastapprox** [📁](./fastapprox) [🌐](https://github.com/GerHobbelt/fastapprox) -- approximate and vectorized versions of common mathematical functions (e.g. exponential, logarithm, and power, lgamma and digamma, cosh, sinh, tanh, cos, sin, tan, sigmoid and erf, Lambert W)
- **gcem** [📁](./gcem) [🌐](https://github.com/GerHobbelt/gcem) -- GCE-Math (**G**eneralized **C**onstant **E**xpression Math) is a templated C++ library enabling compile-time computation of mathematical functions.
- **h5cpp** [📁](./h5cpp) [🌐](https://github.com/GerHobbelt/h5cpp) -- easy to use HDF5 C++ templates for Serial and Paralel HDF5. Hierarchical Data Format HDF5 is prevalent in high performance scientific computing, sits directly on top of sequential or parallel file systems, providing block and stream operations on standardized or custom binary/text objects. Scientific computing platforms come with the necessary libraries to read write HDF5 dataset. H5CPP simplifies interactions with popular linear algebra libraries, provides compiler assisted seamless object persistence, Standard Template Library support and comes equipped with a novel error handling architecture.
- **Imath** [📁](./Imath) [🌐](https://github.com/GerHobbelt/Imath) -- a basic, light-weight, and efficient C++ representation of 2D and 3D vectors and matrices and other simple but useful mathematical objects, functions, and data types common in computer graphics applications, including the “half” 16-bit floating-point type.
- **itpp** [📁](./itpp) [🌐](https://github.com/GerHobbelt/itpp) -- IT++ is a C++ library of mathematical, signal processing and communication classes and functions. Its main use is in simulation of communication systems and for performing research in the area of communications. The kernel of the library consists of generic vector and matrix classes, and a set of accompanying routines. Such a kernel makes IT++ similar to MATLAB or GNU Octave. The IT++ library originates from the former department of Information Theory at the Chalmers University of Technology, Gothenburg, Sweden.
- **kalman-cpp** [📁](./kalman-cpp) [🌐](https://github.com/GerHobbelt/kalman-cpp) -- Kalman filter and extended Kalman filter implementation in C++. Implements Kalman, Extended Kalman, Second-order extended Kalman and Unscented Kalman filters.
- **lapack** [📁](./lapack) [🌐](https://github.com/GerHobbelt/lapack) -- [CBLAS](http://www.netlib.org/blas/) + [LAPACK](http://www.netlib.org/lapack/index.html) optimized linear algebra libs
- **libalg** [📁](./libalg) [🌐](https://github.com/GerHobbelt/alglib) -- the mathematical *ALGLIB* library for C++.
- **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
- **libcnl** [📁](./libcnl) [🌐](https://github.com/GerHobbelt/cnl) -- The Compositional Numeric Library (CNL) is a C++ library of fixed-precision numeric classes which enhance integers to deliver safer, simpler, cheaper arithmetic types. CNL is particularly well-suited to: (1) compute on energy-constrained environments where FPUs are absent or costly; (2) compute on energy-intensive environments where arithmetic is the bottleneck such as simulations, machine learning applications and DSPs; and (3) domains such as finance where precision is essential.
- **libeigen** [📁](./libeigen) [🌐](https://github.com/GerHobbelt/eigen-git-mirror) -- a C++ template library for linear algebra: matrices, vectors, numerical solvers, and related algorithms.
- **math-atlas** [📁](./math-atlas) [🌐](https://github.com/GerHobbelt/math-atlas) -- The ATLAS (Automatically Tuned Linear Algebra Software) project is an ongoing research effort focusing on applying empirical techniques in order to provide portable performance, delivering an efficient BLAS implementation, as well as a few routines from LAPACK.
- **mipp** [📁](./mipp) [🌐](https://github.com/GerHobbelt/MIPP) -- MyIntrinsics++ (MIPP): a portable wrapper for vector intrinsic functions (SIMD) written in C++11. It works for SSE, AVX, AVX-512 and ARM NEON (32-bit and 64-bit) instructions. MIPP wrapper supports simple/double precision floating-point numbers and also signed integer arithmetic (64-bit, 32-bit, 16-bit and 8-bit). With the MIPP wrapper you do not need to write a specific intrinsic code anymore. Just use provided functions and the wrapper will automatically generate the right intrisic calls for your specific architecture.
- **mlpack** [📁](./mlpack) [🌐](https://github.com/GerHobbelt/mlpack) -- an intuitive, fast, and flexible C++ machine learning library, meant to be a machine learning analog to LAPACK, aiming to implement a wide array of machine learning methods and functions as a "swiss army knife" for machine learning researchers.
- **OpenBLAS** [📁](./OpenBLAS) [🌐](https://github.com/GerHobbelt/OpenBLAS) -- an optimized BLAS (Basic Linear Algebra Subprograms) library based on GotoBLAS2 1.13 BSD version.
- **OpenCL-CTS** [📁](./OpenCL-CTS) [🌐](https://github.com/GerHobbelt/OpenCL-CTS) -- the OpenCL Conformance Test Suite (CTS) for all versions of the Khronos [OpenCL](https://www.khronos.org/opencl/) standard.
- **OpenCL-Headers** [📁](./OpenCL-Headers) [🌐](https://github.com/GerHobbelt/OpenCL-Headers) -- C language headers for the OpenCL API.
- **OpenCL-SDK** [📁](./OpenCL-SDK) [🌐](https://github.com/GerHobbelt/OpenCL-SDK) -- the Khronos OpenCL SDK. It brings together all the components needed to develop OpenCL applications.
- **optim** [📁](./optim) [🌐](https://github.com/GerHobbelt/optim) -- OptimLib is a lightweight C++ library of numerical optimization methods for nonlinear functions. Features a C++11/14/17 library of local and global optimization algorithms, as well as root finding techniques, derivative-free optimization using advanced, parallelized metaheuristic methods and constrained optimization routines to handle simple box constraints, as well as systems of nonlinear constraints.
- **sdsl-lite** [📁](./sdsl-lite) [🌐](https://github.com/GerHobbelt/sdsl-lite) -- The Succinct Data Structure Library (SDSL) is a powerful and flexible C++11 library implementing succinct data structures. In total, the library contains the highlights of 40 [research publications][SDSLLIT]. Succinct data structures can represent an object (such as a bitvector or a tree) in space close to the information-theoretic lower bound of the object while supporting operations of the original object efficiently. The theoretical time complexity of an operation performed on the classical data structure and the equivalent succinct data structure are (most of the time) identical.
- **stan-math** [📁](./stan-math) [🌐](https://github.com/GerHobbelt/stan-math) -- the Stan Math Library is a C++, reverse-mode automatic differentiation library designed to be usable, extensive and extensible, efficient, scalable, stable, portable, and redistributable in order to facilitate the construction and utilization of algorithms that utilize derivatives.
- **stats** [📁](./stats) [🌐](https://github.com/GerHobbelt/stats) -- StatsLib is a templated C++ library of statistical distribution functions, featuring unique compile-time computing capabilities and seamless integration with several popular linear algebra libraries. Features a header-only library of probability density functions, cumulative distribution functions, quantile functions, and random sampling methods. Functions are written in C++11 `constexpr` format, enabling the library to operate as both a compile-time and run-time computation engine. Provides functions to compute the cdf, pdf, quantile, as well as random sampling methods, are available for the following distributions: Bernoulli, Beta, Binomial, Cauchy, Chi-squared, Exponential, F, Gamma, Inverse-Gamma, Inverse-Gaussian, Laplace, Logistic, Log-Normal, Normal (Gaussian), Poisson, Rademacher, Student's t, Uniform and Weibull. In addition, pdf and random sampling functions are available for several multivariate distributions: inverse-Wishart, Multivariate Normal and Wishart.
- **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr) -- a very small recursive descent parser and evaluation engine for math expressions.
- **universal-numbers** [📁](./universal-numbers) [🌐](https://github.com/GerHobbelt/universal) -- a header-only C++ template library for universal number arithmetic. The goal of the Universal Numbers Library is to offer applications alternatives to IEEE floating-point that are more efficient and mathematically robust. The Universal library is a ready-to-use header-only library that provides plug-in replacement for native types, and provides a low-friction environment to start exploring alternatives to IEEE floating-point in your own algorithms.
- **xsimd** [📁](./xsimd) [🌐](https://github.com/GerHobbelt/xsimd) -- SIMD (Single Instruction, Multiple Data) instructions differ between microprocessor vendors and compilers. `xsimd` provides a unified means for using these features for library authors. It enables manipulation of batches of numbers with the same arithmetic operators as for single values. It also provides accelerated implementation of common mathematical functions operating on batches.











### _delta features_ & other feature extraction (see Qiqqa research notes)

- **diffutils** [📁](./diffutils) [🌐](https://github.com/GerHobbelt/diffutils) -- the GNU diff, diff3, sdiff, and cmp utilities. Their features are a superset of the Unix features and they are significantly faster.
- **dtl-diff-template-library** [📁](./dtl-diff-template-library) [🌐](https://github.com/GerHobbelt/dtl) -- `dtl` is the diff template library written in C++.
- **google-diff-match-patch** [📁](./google-diff-match-patch) [🌐](https://github.com/GerHobbelt/diff-match-patch) -- Diff, Match and Patch offers robust algorithms to perform the operations required for synchronizing plain text.
  
  1. Diff:
     * Compare two blocks of plain text and efficiently return a list of differences.
  2. Match:
     * Given a search string, find its best fuzzy match in a block of plain text. Weighted for both accuracy and location.
  3. Patch:
     * Apply a list of patches onto plain text. Use best-effort to apply patch even when the underlying text doesn't match.
  
  Originally built in 2006 to power Google Docs.

- **HDiffPatch** [📁](./HDiffPatch) [🌐](https://github.com/GerHobbelt/HDiffPatch) -- a library and command-line tools for Diff & Patch between binary files or directories(folders); cross-platform; runs fast; create small delta/differential; support large files and limit memory requires when diff & patch.
- **libdist** [📁](./libdist) [🌐](https://github.com/GerHobbelt/distlib) -- string distance related functions (Damerau-Levenshtein, Jaro-Winkler, longest common substring & subsequence) implemented as SQLite run-time loadable extension, with UTF-8 support.
- **yara-pattern-matcher** [📁](./yara-pattern-matcher) [🌐](https://github.com/GerHobbelt/yara) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks











### fuzzy matching

- **libdist** [📁](./libdist) [🌐](https://github.com/GerHobbelt/distlib) -- string distance related functions (Damerau-Levenshtein, Jaro-Winkler, longest common substring & subsequence) implemented as SQLite run-time loadable extension, with UTF-8 support.
- **pdiff** [📁](./pdiff) [🌐](https://github.com/GerHobbelt/pdiff) -- perceptualdiff (pdiff): a program that compares two images using a perceptually based image metric.
- **sdhash** [📁](./sdhash) [🌐](https://github.com/GerHobbelt/sdhash) -- a tool which allows two arbitrary blobs of data to be compared for similarity based on common strings of binary data. It is designed to provide quick results during triage and initial investigation phases.
- **ssdeep** [📁](./ssdeep) [🌐](https://github.com/GerHobbelt/ssdeep) -- fuzzy hashing library, can be used to assist with identifying almost identical files using context triggered piecewise hashing.
- **ssimulacra2** [📁](./ssimulacra2) [🌐](https://github.com/GerHobbelt/ssimulacra2) -- Structural SIMilarity Unveiling Local And Compression Related Artifacts metric developed by Jon Sneyers. SSIMULACRA 2 is based on the concept of the multi-scale structural similarity index measure (MS-SSIM), computed in a perceptually relevant color space, adding two other (asymmetric) error maps, and aggregating using two different norms.
- **VQMT** [📁](./VQMT) [🌐](https://github.com/GerHobbelt/VQMT) -- VQMT (Video Quality Measurement Tool) provides fast implementations of the following objective metrics:
  
  - **MS-SSIM**: Multi-Scale Structural Similarity,
  - **PSNR**: Peak Signal-to-Noise Ratio,
  - **PSNR-HVS**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF),
  - **PSNR-HVS-M**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF) and between-coefficient contrast masking of DCT basis functions.
  - **SSIM**: Structural Similarity,
  - **VIFp**: Visual Information Fidelity, pixel domain version
  
  The above metrics are implemented in C++ with the help of OpenCV and are based on the original Matlab implementations provided by their developers.

- **xor-and-binary-fuse-filter** [📁](./xor-and-binary-fuse-filter) [🌐](https://github.com/GerHobbelt/xor_singleheader) -- XOR and Binary Fuse Filter library: Bloom filters are used to quickly check whether an element is part of a set. Xor filters and binary fuse filters are faster and more concise alternative to Bloom filters. They are also smaller than cuckoo filters. They are used in [production systems](https://github.com/datafuselabs/databend).











### decision trees

- **catboost** [📁](./catboost) [🌐](https://github.com/GerHobbelt/catboost) -- a fast, scalable, high performance Gradient Boosting on Decision Trees library, used for ranking, classification, regression and other machine learning tasks. Supports computation on CPU and GPU.
- **decision-tree** [📁](./decision-tree) [🌐](https://github.com/GerHobbelt/decision-tree) -- a decision tree classifier. Decision trees are a simple machine learning algorithm that use a series of features of an observation to create a prediction of a target outcome class.
- **random-forest** [📁](./random-forest) [🌐](https://github.com/GerHobbelt/random-forest) -- a Fast C++ Implementation of Random Forests as described in: Leo Breiman. Random Forests. Machine Learning 45(1):5-32, 2001.
- **Sherwood** [📁](./Sherwood) [🌐](https://github.com/GerHobbelt/Sherwood) -- Sherwood: a library for decision forest inference, which was written by Duncan Robertson (duncan.robertson@redimension.co.uk) to accompany the book "A. Criminisi and J. Shotton. Decision Forests: for Computer Vision and Medical Image Analysis. Springer,  2013." The Sherwood library comprises a general purpose, object-oriented software framework for applying decision forests to a wide range of inference problems.
- **treelite** [📁](./treelite) [🌐](https://github.com/GerHobbelt/treelite) -- **Treelite** is a universal model exchange and serialization format for decision tree forests. Treelite aims to be a small library that enables other C++ applications to exchange and store decision trees on the disk as well as the network.
- **yggdrasil-decision-forests** [📁](./yggdrasil-decision-forests) [🌐](https://github.com/GerHobbelt/yggdrasil-decision-forests) -- Yggdrasil Decision Forests (YDF) is a production-grade collection of algorithms for the training, serving, and interpretation of decision forest models. YDF is open-source and is available in C++, command-line interface (CLI), TensorFlow (under the name [TensorFlow Decision Forests](https://github.com/tensorflow/decision-forests); TF-DF), JavaScript (inference only), and Go (inference only).











### GMM/HMM/kM

Fit patterns, e.g. match & transform a point cloud or image onto a template --> help matching pages against banner templates, etc. as part of the OCR/recognition task.

- **GMM-HMM-kMeans** [📁](./GMM-HMM-kMeans) [🌐](https://github.com/GerHobbelt/KMeans-GMM-HMM) -- HMM based on KMeans and GMM
- **GMMreg** [📁](./GMMreg) [🌐](https://github.com/GerHobbelt/Project_gmmreg) -- implementations of the robust point set registration framework described in the paper "[Robust Point Set Registration Using Gaussian Mixture Models](https://github.com/bing-jian/gmmreg/blob/master/gmmreg_PAMI_preprint.pdf)", Bing Jian and Baba C. Vemuri, IEEE Transactions on Pattern Analysis and Machine Intelligence, 2011, 33(8), pp. 1633-1645. An earlier conference version of this work, "A Robust Algorithm for Point Set Registration Using Mixture of Gaussians, Bing Jian and Baba C. Vemuri.", appeared in the proceedings of ICCV'05.
- **hmm-scalable** [📁](./hmm-scalable) [🌐](https://github.com/GerHobbelt/hmm-scalable) -- a Tool for fitting Hidden Markov Models models at scale. In particular, it is targeting a specific kind of HMM used in education called Bayesian Knowledge Tracing (BKT) model.
- **hmm-stoch** [📁](./hmm-stoch) [🌐](https://github.com/GerHobbelt/StochHMM) -- StochHMM - A Flexible hidden Markov model application and C++ library that implements HMM from simple text files.   It implements traditional HMM algorithms in addition to providing additional flexibility.  The additional flexibility is achieved by allowing researchers to integrate additional data sources and application code into the HMM framework.
- **liblinear** [📁](./liblinear) [🌐](https://github.com/GerHobbelt/liblinear) -- a simple package for solving large-scale regularized linear classification, regression and outlier detection.











### graph analysis, graph databases

- **arangodb** [📁](./arangodb) [🌐](https://github.com/GerHobbelt/arangodb) -- a scalable open-source multi-model database natively supporting graph, document and search. All supported data models & access patterns can be combined in queries allowing for maximal flexibility.
- **graph-coloring** [📁](./graph-coloring) [🌐](https://github.com/GerHobbelt/graph-coloring) -- a C++ Graph Coloring Package. This project has two primary uses:
  
  * As an executable for finding the chromatic number for an input graph (in edge list or edge matrix format)
  * As a library for finding the particular coloring of an input graph (represented as a `map<string,vector<string>>` edge list)

- **graphit** [📁](./graphit) [🌐](https://github.com/GerHobbelt/graphit) -- a High-Performance Domain Specific Language for Graph Analytics.
- **kahypar** [📁](./kahypar) [🌐](https://github.com/GerHobbelt/kahypar) -- KaHyPar (Karlsruhe Hypergraph Partitioning) is a multilevel hypergraph partitioning framework providing direct k-way and recursive bisection based partitioning algorithms that compute solutions of very high quality.
- **libgrape-lite** [📁](./libgrape-lite) [🌐](https://github.com/GerHobbelt/libgrape-lite) -- a C++ library from Alibaba for parallel graph processing (GRAPE). It differs from prior systems in its ability to parallelize sequential graph algorithms as a whole by following the PIE programming model from GRAPE. Sequential algorithms can be easily "plugged into" `libgrape-lite` with only minor changes and get parallelized to handle large graphs efficiently. `libgrape-lite` is designed to be highly efficient and flexible, to cope with the scale, variety and complexity of real-life graph applications.
- **midas** [📁](./midas) [🌐](https://github.com/GerHobbelt/MIDAS) -- C++ implementation of:
  
  - [MIDAS: Microcluster-Based Detector of Anomalies in Edge Streams](https://arxiv.org/pdf/1911.04464.pdf). *Siddharth Bhatia, Bryan Hooi, Minji Yoon, Kijung Shin, Christos Faloutsos*. AAAI 2020.
  - [Real-time Streaming Anomaly Detection in Dynamic Graphs](https://arxiv.org/pdf/2009.08452.pdf). *Siddharth Bhatia, Rui Liu, Bryan Hooi, Minji Yoon, Kijung Shin, Christos Faloutsos*. TKDD 2022.

- **ogdf** [📁](./ogdf) [🌐](https://github.com/GerHobbelt/ogdf) -- OGDF stands both for **O**pen **G**raph **D**rawing **F**ramework (the original name) and **O**pen **G**raph algorithms and **D**ata structures **F**ramework. OGDF is a self-contained C++ library for graph algorithms, in particular for (but not restricted to) automatic graph drawing. It offers sophisticated algorithms and data structures to use within your own applications or scientific projects.
- **snap** [📁](./snap) [🌐](https://github.com/GerHobbelt/snap) -- Stanford Network Analysis Platform (SNAP) is a general purpose, high performance system for analysis and manipulation of large networks. SNAP scales to massive graphs with hundreds of millions of nodes and billions of edges.











### NN, ...

- **aho_corasick** [📁](./aho_corasick) [🌐](https://github.com/GerHobbelt/aho_corasick) -- a header only implementation of the Aho-Corasick pattern search algorithm invented by Alfred V. Aho and Margaret J. Corasick. It is a very efficient dictionary matching algorithm that can locate all search patterns against in input text simultaneously in O(n + m), with space complexity O(m) (where n is the length of the input text, and m is the combined length of the search patterns).
- **A-MNS_TemplateMatching** [📁](./A-MNS_TemplateMatching) [🌐](https://github.com/GerHobbelt/A-MNS_TemplateMatching) -- the official code for the PatternRecognition2020 paper: Fast and robust template matching with majority neighbour similarity and annulus projection transformation.
- **arrayfire** [📁](./arrayfire) [🌐](https://github.com/GerHobbelt/arrayfire) -- a general-purpose tensor library that simplifies the process of software development for the parallel architectures found in CPUs, GPUs, and other hardware acceleration devices. The library serves users in every technical computing market.
- **bhtsne--Barnes-Hut-t-SNE** [📁](./bhtsne--Barnes-Hut-t-SNE) [🌐](https://github.com/GerHobbelt/bhtsne) -- Barnes-Hut t-SNE
- **bolt** [📁](./bolt) [🌐](https://github.com/GerHobbelt/bolt) -- a deep learning library with high performance and heterogeneous flexibility.
- **caffe** [📁](./caffe) [🌐](https://github.com/GerHobbelt/caffe) -- a fast deep learning framework made with expression and modularity in mind, developed by Berkeley AI Research (BAIR)/The Berkeley Vision and Learning Center (BVLC).
  
  - **ho-hum**; reason: uses google protobuffers, CUDA SDK for the GPU access (at least that's how it looks from the header files reported missing by my compiler). Needs more effort before this can be used in the monolithic production builds.

- **catboost** [📁](./catboost) [🌐](https://github.com/GerHobbelt/catboost) -- a fast, scalable, high performance Gradient Boosting on Decision Trees library, used for ranking, classification, regression and other machine learning tasks. Supports computation on CPU and GPU.
- **cppflow** [📁](./cppflow) [🌐](https://github.com/GerHobbelt/cppflow) -- run TensorFlow models in c++ without Bazel, without TensorFlow installation and without compiling Tensorflow.
- **CRFpp** [📁](./CRFpp) [🌐](https://github.com/GerHobbelt/crfpp) -- CRF++ is a simple, customizable, and open source implementation of <a href="http://www.cis.upenn.edu/~pereira/papers/crf.pdf">Conditional Random Fields (CRFs)</a> for segmenting/labeling sequential data. CRF++ is designed for generic purpose and will be applied to a variety of NLP tasks, such as Named Entity Recognition, Information Extraction and Text Chunking.
- **crfsuite** [📁](./crfsuite) [🌐](https://github.com/GerHobbelt/crfsuite) -- an implementation of Conditional Random Fields (CRFs) for labeling sequential data.
- **CRFsuite-extended** [📁](./CRFsuite-extended) [🌐](https://github.com/GerHobbelt/CRFSuiteEx) -- a fork of [Naoaki Okazaki's](http://www.chokkan.org/) implementation of conditional random fields (CRFs).
- **CurvatureFilter** [📁](./CurvatureFilter) [🌐](https://github.com/GerHobbelt/CurvatureFilter) -- Curvature filters are efficient solvers for variational models. Traditional solvers, such as gradient descent or Euler Lagrange Equation, start at the total energy and use diffusion scheme to carry out the minimization. When the initial condition is the original image, the data fitting energy always increases while the regularization energy always reduces during the optimization, as illustrated in the below figure. Thus, regularization energy must be the dominant part since the total energy has to decrease. Therefore, **Curvature filters focus on minimizing the regularization term,** whose minimizers are already known. For example, if the regularization is Gaussian curvature, the developable surfaces minimize this energy. Therefore, in curvature filter, developable surfaces are used to approximate the data. **As long as the decreased amount in the regularization part is larger than the increased amount in the data fitting energy, the total energy is reduced.**
- **DBoW2** [📁](./DBoW2) [🌐](https://github.com/GerHobbelt/DBoW2) -- a C++ library for indexing and converting images into a bag-of-word representation. It implements a hierarchical tree for approximating nearest neighbours in the image feature space and creating a visual vocabulary. DBoW2 also implements an image database with inverted and direct files to index images and enabling quick queries and feature comparisons.
- **DGM-CRF** [📁](./DGM-CRF) [🌐](https://github.com/GerHobbelt/DGM) -- DGM (Direct Graphical Models) is a cross-platform C++ library implementing various tasks in probabilistic graphical models with pairwise and complete (dense) dependencies. The library aims to be used for the Markov and Conditional Random Fields (MRF / CRF), Markov Chains, Bayesian Networks, _etc_.
- **DiskANN** [📁](./DiskANN) [🌐](https://github.com/GerHobbelt/DiskANN) -- DiskANN is a suite of scalable, accurate and cost-effective approximate nearest neighbor search algorithms for large-scale vector search that support real-time changes and simple filters.
- **dlib** [📁](./dlib) [🌐](https://github.com/GerHobbelt/dlib) -- machine learning algorithms
- **dynet** [📁](./dynet) [🌐](https://github.com/GerHobbelt/dynet) -- The Dynamic Neural Network Toolkit. DyNet is a neural network library developed by Carnegie Mellon University and many others. It is written in C++ (with bindings in Python) and is designed to be efficient when run on either CPU or GPU, and to work well with networks that have dynamic structures that change for every training instance. For example, these kinds of networks are particularly important in natural language processing tasks, and DyNet has been used to build state-of-the-art systems for syntactic parsing, machine translation, morphological inflection, and many other application areas.
- **falconn** [📁](./falconn) [🌐](https://github.com/GerHobbelt/FALCONN) -- FALCONN (FAst Lookups of Cosine and Other Nearest Neighbors) is a library with algorithms for the nearest neighbor search problem. The algorithms in FALCONN are based on [Locality-Sensitive Hashing](https://en.wikipedia.org/wiki/Locality-sensitive_hashing) (LSH), which is a popular class of methods for nearest neighbor search in high-dimensional spaces. The goal of FALCONN is to provide very efficient and well-tested implementations of LSH-based data structures.  Currently, FALCONN supports two LSH families for the [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity): hyperplane LSH and cross polytope LSH. Both hash families are implemented with multi-probe LSH in order to minimize memory usage. Moreover, FALCONN is optimized for both dense and sparse data. Despite being designed for the cosine similarity, FALCONN can often be used for nearest neighbor search under the Euclidean distance or a maximum inner product search.
- **ffht** [📁](./ffht) [🌐](https://github.com/GerHobbelt/FFHT) -- FFHT (Fast Fast Hadamard Transform) is a library that provides a heavily optimized C99 implementation of the Fast Hadamard Transform. FFHT also provides a thin Python wrapper that allows to perform the Fast Hadamard Transform on one-dimensional [NumPy](http://www.numpy.org/) arrays. The Hadamard Transform is a linear orthogonal map defined on real vectors whose length is a _power of two_. For the precise definition, see the [Wikipedia entry](https://en.wikipedia.org/wiki/Hadamard_transform). The Hadamard Transform has been recently used a lot in various machine learning and numerical algorithms. FFHT uses [AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions) to speed up the computation.
- **flann** [📁](./flann) [🌐](https://github.com/GerHobbelt/flann) -- FLANN (Fast Library for Approximate Nearest Neighbors) is a library for performing fast approximate nearest neighbor searches in high dimensional spaces. It contains a collection of algorithms we found to work best for nearest neighbor search and a system for automatically choosing the best algorithm and optimum parameters depending on the dataset.
- **flinng** [📁](./flinng) [🌐](https://github.com/GerHobbelt/FLINNG) -- Filters to Identify Near-Neighbor Groups (FLINNG) is a near neighbor search algorithm outlined in the paper [Practical Near Neighbor Search via Group Testing](https://arxiv.org/pdf/2106.11565.pdf).
- **gtn** [📁](./gtn) [🌐](https://github.com/GerHobbelt/gtn) -- GTN (Automatic Differentiation with WFSTs) is a framework for automatic differentiation with weighted finite-state transducers. The goal of GTN is to make adding and experimenting with structure in learning algorithms much simpler. This structure is encoded as weighted automata, either acceptors (WFSAs) or transducers (WFSTs). With `gtn` you can dynamically construct complex graphs from operations on simpler graphs. Automatic differentiation gives gradients with respect to any input or intermediate graph with a single call to `gtn.backward`.
- **lapack** [📁](./lapack) [🌐](https://github.com/GerHobbelt/lapack) -- [CBLAS](http://www.netlib.org/blas/) + [LAPACK](http://www.netlib.org/lapack/index.html) optimized linear algebra libs
- **libahocorasick** [📁](./libahocorasick) [🌐](https://github.com/GerHobbelt/pyahocorasick) -- a fast and memory efficient library for exact or approximate multi-pattern string search meaning that you can find multiple key strings occurrences at once in some input text.  The strings "index" can be built ahead of time and saved (as a pickle) to disk to reload and reuse later.  The library provides an `ahocorasick` Python module that you can use as a plain dict-like Trie or convert a Trie to an automaton for efficient Aho-Corasick search.
- **libdivsufsort** [📁](./libdivsufsort) [🌐](https://github.com/GerHobbelt/libdivsufsort) -- a software library that implements a lightweight suffix array construction algorithm.
- **libfann** [📁](./libfann) [🌐](https://github.com/GerHobbelt/fann) -- FANN: Fast Artificial Neural Network Library, a free open source neural network library, which implements multilayer artificial neural networks in C with support for both fully connected and sparsely connected networks. Cross-platform execution in both fixed and floating point are supported. It includes a framework for easy handling of training data sets. It is easy to use, versatile, well documented, and fast.
- **libirwls** [📁](./libirwls) [🌐](https://github.com/GerHobbelt/LIBIRWLS) -- LIBIRWLS is an integrated library that incorporates a parallel implementation of the Iterative Re-Weighted Least Squares (IRWLS) procedure, an alternative to quadratic programming (QP), for training of Support Vector Machines (SVMs). Although there are several methods for SVM training, the number of parallel libraries is very reduced. In particular, this library contains solutions to solve either full or budgeted SVMs making use of shared memory parallelization techniques: (1) a parallel SVM training procedure based on the IRWLS algorithm, (2) a parallel budgeted SVMs solver based on the IRWLS algorithm.
- **libmlpp** [📁](./libmlpp) [🌐](https://github.com/GerHobbelt/MLPP) -- ML++ :: The intent with this machine-learning library is for it to act as a crossroad between low-level developers and machine learning engineers.
- **libsvm** [📁](./libsvm) [🌐](https://github.com/GerHobbelt/libsvm) -- a simple, easy-to-use, and efficient software for SVM classification and regression. It solves C-SVM classification, nu-SVM classification, one-class-SVM, epsilon-SVM regression, and nu-SVM regression. It also provides an automatic model selection tool for C-SVM classification.
- **LightGBM** [📁](./LightGBM) [🌐](https://github.com/GerHobbelt/LightGBM) -- LightGBM (Light Gradient Boosting Machine) is a gradient boosting framework that uses tree based learning algorithms. It is designed to be distributed and efficient with the following advantages:
  
  - Better accuracy.
  - Capable of handling large-scale data.
  - Faster training speed and higher efficiency.
  - Lower memory usage.
  - Support of parallel, distributed, and GPU learning.

- **mace** [📁](./mace) [🌐](https://github.com/GerHobbelt/mace) -- **Mobile AI Compute Engine** (or **MACE** for short) is a deep learning inference framework optimized for mobile heterogeneous computing on Android, iOS, Linux and Windows devices. The design focuses on the following
- **marian** [📁](./marian) [🌐](https://github.com/GerHobbelt/marian) -- an efficient Neural Machine Translation framework written in pure C++ with minimal dependencies.
- **midas** [📁](./midas) [🌐](https://github.com/GerHobbelt/MIDAS) -- C++ implementation of:
  
  - [MIDAS: Microcluster-Based Detector of Anomalies in Edge Streams](https://arxiv.org/pdf/1911.04464.pdf). *Siddharth Bhatia, Bryan Hooi, Minji Yoon, Kijung Shin, Christos Faloutsos*. AAAI 2020.
  - [Real-time Streaming Anomaly Detection in Dynamic Graphs](https://arxiv.org/pdf/2009.08452.pdf). *Siddharth Bhatia, Rui Liu, Bryan Hooi, Minji Yoon, Kijung Shin, Christos Faloutsos*. TKDD 2022.

- **MITIE-nlp** [📁](./MITIE-nlp) [🌐](https://github.com/GerHobbelt/MITIE) -- provides state-of-the-art information extraction tools. Includes tools for performing [named entity extraction](http://blog.dlib.net/2014/04/mitie-completely-free-and-state-of-art.html) and [binary relation detection](http://blog.dlib.net/2014/07/mitie-v02-released-now-includes-python.html) as well as tools for training custom extractors and relation detectors.  MITIE is built on top of [dlib](http://dlib.net), a high-performance machine-learning library, MITIE makes use of several state-of-the-art techniques including the use of distributional word embeddings and Structural Support Vector Machines.
- **MNN** [📁](./MNN) [🌐](https://github.com/GerHobbelt/MNN) -- a highly efficient and lightweight deep learning framework. It supports inference and training of deep learning models, and has industry leading performance for inference and training on-device. At present, MNN has been integrated in more than 30 apps of Alibaba Inc, such as Taobao, Tmall, Youku, Dingtalk, Xianyu and etc., covering more than 70 usage scenarios such as live broadcast, short video capture, search recommendation, product searching by image, interactive marketing, equity distribution, security risk control. In addition, MNN is also used on embedded devices, such as IoT. Inside Alibaba, [MNN](https://mp.weixin.qq.com/s/5I1ISpx8lQqvCS8tGd6EJw) works as the basic module of the compute container in the [Walle](https://mp.weixin.qq.com/s/qpeCETty0BqqNJV9CMJafA) System, the first end-to-end, general-purpose, and large-scale production system for device-cloud collaborative machine learning, which has been published in the top system conference OSDI’22.
- **mrpt** [📁](./mrpt) [🌐](https://github.com/GerHobbelt/mrpt) -- MRPT is a lightweight and easy-to-use library for approximate nearest neighbor search with random projection. The index building has an integrated hyperparameter tuning algorithm, so the only hyperparameter required to construct the index is the target recall level! According to [our experiments](https://github.com/ejaasaari/mrpt-comparison/) MRPT is one of the fastest libraries for approximate nearest neighbor search.
  
  In the offline phase of the algorithm MRPT indexes the data with a collection of *random projection trees*. In the online phase the index structure allows us to answer queries in superior time. A detailed description of the algorithm with the time and space complexities, and the aforementioned comparisons can be found in [our article](https://www.cs.helsinki.fi/u/ttonteri/pub/bigdata2016.pdf) that was published in IEEE International Conference on Big Data 2016.
  
  The algorithm for automatic hyperparameter tuning is described in detail in our new article that will be presented in Pacific-Asia Conference on Knowledge Discovery and Data Mining 2019 ([arxiv preprint](https://arxiv.org/abs/1812.07484)).

- **multiverso** [📁](./multiverso) [🌐](https://github.com/GerHobbelt/Multiverso) -- a parameter server based framework for training machine learning models on big data with numbers of machines. It is currently a standard C++ library and provides a series of friendly programming interfaces. Now machine learning researchers and practitioners do not need to worry about the system routine issues such as distributed model storage and operation, inter-process and inter-thread communication, multi-threading management, and so on. Instead, they are able to focus on the core machine learning logics: data, model, and training.
- **mxnet** [📁](./mxnet) [🌐](https://github.com/GerHobbelt/mxnet) -- Apache MXNet is a deep learning framework designed for both *efficiency* and *flexibility*. It allows you to ***mix*** [symbolic and imperative programming](https://mxnet.apache.org/api/architecture/program_model) to ***maximize*** efficiency and productivity.
- **ncnn** [📁](./ncnn) [🌐](https://github.com/GerHobbelt/ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
- **NiuTrans.NMT** [📁](./NiuTrans.NMT) [🌐](https://github.com/GerHobbelt/NiuTrans.NMT) -- a lightweight and efficient Transformer-based neural machine translation system. Its main features are:
  
  - Few dependencies. It is implemented with pure C++, and all dependencies are optional.
  - Flexible running modes. The system can run with various systems and devices (Linux vs. Windows, CPUs vs. GPUs, and FP32 vs. FP16, etc.).
  - Framework agnostic. It supports various models trained with other tools, e.g., fairseq models.
  - High efficiency. It is heavily optimized for fast decoding, see [our WMT paper](https://arxiv.org/pdf/2109.08003.pdf) for more details.

- **onnxruntime** [📁](./onnxruntime) [🌐](https://github.com/GerHobbelt/onnxruntime) -- a cross-platform inference and training machine-learning accelerator. **ONNX Runtime inference** can enable faster customer experiences and lower costs, supporting models from deep learning frameworks such as PyTorch and TensorFlow/Keras as well as classical machine learning libraries such as scikit-learn, LightGBM, XGBoost, etc. ONNX Runtime is compatible with different hardware, drivers, and operating systems, and provides optimal performance by leveraging hardware accelerators where applicable alongside graph optimizations and transforms. [Learn more &rarr;](https://www.onnxruntime.ai/docs/#onnx-runtime-for-inferencing)
- **OpenBLAS** [📁](./OpenBLAS) [🌐](https://github.com/GerHobbelt/OpenBLAS) -- an optimized BLAS (Basic Linear Algebra Subprograms) library based on GotoBLAS2 1.13 BSD version.
- **OpenCL-CTS** [📁](./OpenCL-CTS) [🌐](https://github.com/GerHobbelt/OpenCL-CTS) -- the OpenCL Conformance Test Suite (CTS) for all versions of the Khronos [OpenCL](https://www.khronos.org/opencl/) standard.
- **OpenCL-Headers** [📁](./OpenCL-Headers) [🌐](https://github.com/GerHobbelt/OpenCL-Headers) -- C language headers for the OpenCL API.
- **OpenCL-SDK** [📁](./OpenCL-SDK) [🌐](https://github.com/GerHobbelt/OpenCL-SDK) -- the Khronos OpenCL SDK. It brings together all the components needed to develop OpenCL applications.
- **OpenFST** [📁](./OpenFST) [🌐](https://github.com/GerHobbelt/openfst) -- a library for constructing, combining, optimizing, and searching weighted finite-state transducers (FSTs). Weighted finite-state transducers are automata where each transition has an input label, an output label, and a weight. The more familiar finite-state acceptor is represented as a transducer with each transition's input and output label equal. Finite-state acceptors are used to represent sets of strings (specifically, regular or rational sets); finite-state transducers are used to represent binary relations between pairs of strings (specifically, rational transductions). The weights can be used to represent the cost of taking a particular transition. FSTs have key applications in speech recognition and synthesis, machine translation, optical character recognition, pattern matching, string processing, machine learning, information extraction and retrieval among others. Often a weighted transducer is used to represent a probabilistic model (e.g., an n-gram model, pronunciation model). FSTs can be optimized by determinization and minimization, models can be applied to hypothesis sets (also represented as automata) or cascaded by finite-state composition, and the best results can be selected by shortest-path algorithms.
- **OpenFST-utils** [📁](./OpenFST-utils) [🌐](https://github.com/GerHobbelt/openfst-utils) -- a set of useful programs for manipulating Finite State Transducer with the OpenFst library.
- **openvino** [📁](./openvino) [🌐](https://github.com/GerHobbelt/openvino) -- OpenVINO™ is an open-source toolkit for optimizing and deploying AI inference, includind several components: namely [Model Optimizer], [OpenVINO™ Runtime], [Post-Training Optimization Tool], as well as CPU, GPU, GNA, multi device and heterogeneous plugins to accelerate deep learning inference on Intel® CPUs and Intel® Processor Graphics. It supports pre-trained models from [Open Model Zoo], along with 100+ open source and public models in popular formats such as TensorFlow, ONNX, PaddlePaddle, MXNet, Caffe, Kaldi.
- **PaddleClas** [📁](./PaddleClas) [🌐](https://github.com/GerHobbelt/PaddleClas) -- an image classification and image recognition toolset for industry and academia, helping users train better computer vision models and apply them in real scenarios, based on [PaddlePaddle](https://github.com/paddlepaddle/paddle).
- **PaddleDetection** [📁](./PaddleDetection) [🌐](https://github.com/GerHobbelt/PaddleDetection) -- a Highly Efficient Development Toolkit for Object Detection based on [PaddlePaddle](https://github.com/paddlepaddle/paddle).
- **Paddle-Lite** [📁](./Paddle-Lite) [🌐](https://github.com/GerHobbelt/Paddle-Lite) -- an updated version of Paddle-Mobile, an open-open source deep learning framework designed to make it easy to perform inference on mobile, embeded, and IoT devices. It is compatible with PaddlePaddle and pre-trained models from other sources.
- **PaddleNLP** [📁](./PaddleNLP) [🌐](https://github.com/GerHobbelt/PaddleNLP) -- a NLP library that is both **easy to use** and **powerful**. It aggregates high-quality pretrained models in the industry and provides a **plug-and-play** development experience, covering a model library for various NLP scenarios. With practical examples from industry practices, PaddleNLP can meet the needs of developers who require **flexible customization**.
- **PaddleOCR** [📁](./PaddleOCR) [🌐](https://github.com/GerHobbelt/PaddleOCR) -- PaddleOCR aims to create multilingual, awesome, leading, and practical OCR tools that help users train better models and apply them into practice.
- **PaddlePaddle** [📁](./PaddlePaddle) [🌐](https://github.com/GerHobbelt/Paddle) -- the first independent R&D deep learning platform in China. It is an industrial platform with advanced technologies and rich features that cover core deep learning frameworks, basic model libraries, end-to-end development kits, tools & components as well as service platforms. PaddlePaddle is originated from industrial practices with dedication and commitments to industrialization. It has been widely adopted by a wide range of sectors including manufacturing, agriculture, enterprise service, and so on while serving more than 4.7 million developers, 180,000 companies and generating 560,000 models. With such advantages, PaddlePaddle has helped an increasing number of partners commercialize AI.
- **pagerank** [📁](./pagerank) [🌐](https://github.com/GerHobbelt/pagerank) -- a [pagerank](http://www.ams.org/samplings/feature-column/fcarc-pagerank) implementation in C++ able to handle very big graphs.
- **pecos** [📁](./pecos) [🌐](https://github.com/GerHobbelt/pecos) -- PECOS (Predictions for Enormous and Correlated Output Spaces) is a versatile and modular machine learning (ML) framework for fast learning and inference on problems with large output spaces, such as extreme multi-label ranking (XMR) and large-scale retrieval. PECOS' design is intentionally agnostic to the specific nature of the inputs and outputs as it is envisioned to be a general-purpose framework for multiple distinct applications. Given an input, PECOS identifies a small set (10-100) of relevant outputs from amongst an extremely large (~100MM) candidate set and ranks these outputs in terms of relevance.
- **PGM-index** [📁](./PGM-index) [🌐](https://github.com/GerHobbelt/PGM-index) -- the Piecewise Geometric Model index (PGM-index) is a data structure that enables fast lookup, predecessor, range searches and updates in arrays of billions of items using orders of magnitude less space than traditional indexes while providing the same worst-case query time guarantees.
- **pyclustering** [📁](./pyclustering) [🌐](https://github.com/GerHobbelt/pyclustering) -- a Python, C++ data mining library (clustering algorithm, oscillatory networks, neural networks). The library provides Python and C++ implementations (C++ pyclustering library) of each algorithm or model.
- **pyglass** [📁](./pyglass) [🌐](https://github.com/GerHobbelt/pyglass) -- a library for fast inference of graph index for approximate similarity search.
  
  - It's high performant.
  - No third-party library dependencies, does not rely on OpenBLAS / MKL or any other computing framework.
  - Sophisticated memory management and data structure design, very low memory footprint.
  - Supports multiple graph algorithms, like [**HNSW**](https://github.com/nmslib/hnswlib) and [**NSG**](https://github.com/ZJULearning/nsg).
  - Supports multiple hardware platforms, like **X86** and **ARM**. Support for **GPU** is on the way

- **pytorch** [📁](./pytorch) [🌐](https://github.com/GerHobbelt/pytorch) -- PyTorch library in C++
- **pytorch_cpp_demo** [📁](./pytorch_cpp_demo) [🌐](https://github.com/GerHobbelt/pytorch_cpp) -- Deep Learning sample programs of PyTorch written in C++.
- **ssdeep** [📁](./ssdeep) [🌐](https://github.com/GerHobbelt/ssdeep) -- fuzzy hashing library, can be used to assist with identifying almost identical files using context triggered piecewise hashing.
- **ssimulacra2** [📁](./ssimulacra2) [🌐](https://github.com/GerHobbelt/ssimulacra2) -- Structural SIMilarity Unveiling Local And Compression Related Artifacts metric developed by Jon Sneyers. SSIMULACRA 2 is based on the concept of the multi-scale structural similarity index measure (MS-SSIM), computed in a perceptually relevant color space, adding two other (asymmetric) error maps, and aggregating using two different norms.
- **stan** [📁](./stan) [🌐](https://github.com/GerHobbelt/stan) -- Stan is a C++ package providing (1) full Bayesian inference using the No-U-Turn sampler (NUTS), a variant of Hamiltonian Monte Carlo (HMC), (2) approximate Bayesian inference using automatic differentiation variational inference (ADVI), and (3) penalized maximum likelihood estimation (MLE) using L-BFGS optimization. It is built on top of the [Stan Math library](https://github.com/stan-dev/math).
- **stan-math** [📁](./stan-math) [🌐](https://github.com/GerHobbelt/stan-math) -- the Stan Math Library is a C++, reverse-mode automatic differentiation library designed to be usable, extensive and extensible, efficient, scalable, stable, portable, and redistributable in order to facilitate the construction and utilization of algorithms that utilize derivatives.
- **StarSpace** [📁](./StarSpace) [🌐](https://github.com/GerHobbelt/StarSpace) -- a general-purpose neural model for efficient learning of entity embeddings for solving a wide variety of problems.
- **tensorflow** [📁](./tensorflow) [🌐](https://github.com/GerHobbelt/tensorflow) -- an end-to-end open source platform for machine learning.
- **tensorflow-docs** [📁](./tensorflow-docs) [🌐](https://github.com/GerHobbelt/tensorflow-docs) -- TensorFlow documentation
- **tensorflow-io** [📁](./tensorflow-io) [🌐](https://github.com/GerHobbelt/tensorflow-io) -- TensorFlow I/O is a collection of file systems and file formats that are not available in TensorFlow's built-in support. A full list of supported file systems and file formats by TensorFlow I/O can be found [here](https://www.tensorflow.org/io/api_docs/python/tfio).
- **tensorflow-text** [📁](./tensorflow-text) [🌐](https://github.com/GerHobbelt/tensorflow-text) -- TensorFlow Text provides a collection of text related classes and ops ready to use with TensorFlow 2.0. The library can perform the preprocessing regularly required by text-based models, and includes other features useful for sequence modeling not provided by core TensorFlow.
- **tensorstore** [📁](./tensorstore) [🌐](https://github.com/GerHobbelt/tensorstore) -- TensorStore is an open-source C++ and Python software library designed for storage and manipulation of large multi-dimensional arrays.
- **thunderSVM** [📁](./thunderSVM) [🌐](https://github.com/GerHobbelt/thundersvm) -- ThunderSVM exploits GPUs and multi-core CPUs to achieve high efficiency, supporting all functionalities of LibSVM such as one-class SVMs, SVC, SVR and probabilistic SVMs.
- **tinn** [📁](./tinn) [🌐](https://github.com/GerHobbelt/tinn) -- Tinn (Tiny Neural Network) is a 200 line dependency free neural network library written in C99.
- **vxl** [📁](./vxl) [🌐](https://github.com/GerHobbelt/vxl) -- VXL (the Vision-something-Libraries) is a collection of C++ libraries designed for computer vision research and implementation. It was created from TargetJr and the IUE with the aim of making a light, fast and consistent system.
- **waifu2x-ncnn-vulkan** [📁](./waifu2x-ncnn-vulkan) [🌐](https://github.com/GerHobbelt/waifu2x-ncnn-vulkan) -- waifu2x ncnn Vulkan: an [ncnn project](https://github.com/Tencent/ncnn) implementation of the waifu2x converter. Runs fast on Intel / AMD / Nvidia / Apple-Silicon with Vulkan API.
- **warp-ctc** [📁](./warp-ctc) [🌐](https://github.com/GerHobbelt/warp-ctc) -- A fast parallel implementation of CTC, on both CPU and GPU. Connectionist Temporal Classification (CTC) is a loss function useful for performing supervised learning on sequence data, without needing an alignment between input data and labels. For example, CTC can be used to train end-to-end systems for speech recognition.
- **xnnpack** [📁](./xnnpack) [🌐](https://github.com/GerHobbelt/XNNPACK) -- a highly optimized library of floating-point neural network inference operators for ARM, WebAssembly, and x86 platforms. XNNPACK is not intended for direct use by deep learning practitioners and researchers; instead it provides low-level performance primitives for accelerating high-level machine learning frameworks, such as TensorFlow Lite, TensorFlow.js, PyTorch, and MediaPipe.
- **xtensor** [📁](./xtensor) [🌐](https://github.com/GerHobbelt/xtensor) -- C++ tensors with broadcasting and lazy computing. `xtensor` is a C++ library meant for numerical analysis with multi-dimensional array expressions.
- **xtensor-blas** [📁](./xtensor-blas) [🌐](https://github.com/GerHobbelt/xtensor-blas) -- an extension to the `xtensor` library, offering bindings to BLAS and LAPACK libraries through `cxxblas` and `cxxlapack`.
- **xtensor-io** [📁](./xtensor-io) [🌐](https://github.com/GerHobbelt/xtensor-io) -- a `xtensor` plugin to read and write images, audio files, NumPy (compressed) NPZ and HDF5 files.
- **xtl** [📁](./xtl) [🌐](https://github.com/GerHobbelt/xtl) -- xtensor core library
- **yara-pattern-matcher** [📁](./yara-pattern-matcher) [🌐](https://github.com/GerHobbelt/yara) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks











### similarity search

- **aho_corasick** [📁](./aho_corasick) [🌐](https://github.com/GerHobbelt/aho_corasick) -- a header only implementation of the Aho-Corasick pattern search algorithm invented by Alfred V. Aho and Margaret J. Corasick. It is a very efficient dictionary matching algorithm that can locate all search patterns against in input text simultaneously in O(n + m), with space complexity O(m) (where n is the length of the input text, and m is the combined length of the search patterns).
- **annoy** [📁](./annoy) [🌐](https://github.com/GerHobbelt/annoy) -- ANNOY (<b>A</b>pproximate <b>N</b>earest <b>N</b>eighbors <b>O</b>h <b>Y</b>eah) is a C++ library to search for points in space that are close to a given query point. It also creates large read-only file-based data structures that are `mmap`-ped into memory so that many processes may share the same data. ANNOY is almost as fast as the fastest libraries, but what really sets Annoy apart is: it has the ability to use static files as indexes, enabling you to share an index across processes. ANNOY also decouples creating indexes from loading them, so you can pass around indexes as files and map them into memory quickly. ANNOY tries to minimize its memory footprint: the indexes are quite small. This is useful when you want to find nearest neighbors using multiple CPU's. Spotify uses ANNOY for music recommendations.
- **CTCWordBeamSearch** [📁](./CTCWordBeamSearch) [🌐](https://github.com/GerHobbelt/CTCWordBeamSearch) -- Connectionist Temporal Classification (CTC) decoder with dictionary and Language Model (LM).
- **DiskANN** [📁](./DiskANN) [🌐](https://github.com/GerHobbelt/DiskANN) -- DiskANN is a suite of scalable, accurate and cost-effective approximate nearest neighbor search algorithms for large-scale vector search that support real-time changes and simple filters.
- **faiss** [📁](./faiss) [🌐](https://github.com/GerHobbelt/faiss) -- a library for efficient similarity search and clustering of dense vectors. It contains algorithms that search in sets of vectors of any size, up to ones that possibly do not fit in RAM. It also contains supporting code for evaluation and parameter tuning. Faiss is written in C++ with complete wrappers for Python/numpy. Some of the most useful algorithms are implemented on the GPU. It is developed primarily at Facebook AI Research.
- **falconn** [📁](./falconn) [🌐](https://github.com/GerHobbelt/FALCONN) -- FALCONN (FAst Lookups of Cosine and Other Nearest Neighbors) is a library with algorithms for the nearest neighbor search problem. The algorithms in FALCONN are based on [Locality-Sensitive Hashing](https://en.wikipedia.org/wiki/Locality-sensitive_hashing) (LSH), which is a popular class of methods for nearest neighbor search in high-dimensional spaces. The goal of FALCONN is to provide very efficient and well-tested implementations of LSH-based data structures.  Currently, FALCONN supports two LSH families for the [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity): hyperplane LSH and cross polytope LSH. Both hash families are implemented with multi-probe LSH in order to minimize memory usage. Moreover, FALCONN is optimized for both dense and sparse data. Despite being designed for the cosine similarity, FALCONN can often be used for nearest neighbor search under the Euclidean distance or a maximum inner product search.
- **flann** [📁](./flann) [🌐](https://github.com/GerHobbelt/flann) -- FLANN (Fast Library for Approximate Nearest Neighbors) is a library for performing fast approximate nearest neighbor searches in high dimensional spaces. It contains a collection of algorithms we found to work best for nearest neighbor search and a system for automatically choosing the best algorithm and optimum parameters depending on the dataset.
- **flinng** [📁](./flinng) [🌐](https://github.com/GerHobbelt/FLINNG) -- Filters to Identify Near-Neighbor Groups (FLINNG) is a near neighbor search algorithm outlined in the paper [Practical Near Neighbor Search via Group Testing](https://arxiv.org/pdf/2106.11565.pdf).
- **hnswlib** [📁](./hnswlib) [🌐](https://github.com/GerHobbelt/hnswlib) -- fast approximate nearest neighbor search. Header-only C++ HNSW implementation with python bindings.
- **ivf-hnsw** [📁](./ivf-hnsw) [🌐](https://github.com/GerHobbelt/ivf-hnsw) -- Revisiting the Inverted Indices for Billion-Scale Approximate Nearest Neighbors. This is the code for the current state-of-the-art billion-scale nearest neighbor search system presented in the paper: [Revisiting the Inverted Indices for Billion-Scale Approximate Nearest Neighbors](http://openaccess.thecvf.com/content_ECCV_2018/html/Dmitry_Baranchuk_Revisiting_the_Inverted_ECCV_2018_paper.html) (Dmitry Baranchuk, Artem Babenko, Yury Malkov).
- **kgraph** [📁](./kgraph) [🌐](https://github.com/GerHobbelt/kgraph) -- a library for k-nearest neighbor (k-NN) graph construction and online k-NN search using a k-NN Graph as index. KGraph implements heuristic algorithms that are extremely generic and fast. KGraph works on abstract objects. The only assumption it makes is that a similarity score can be computed on any pair of objects, with a user-provided function.
- **libahocorasick** [📁](./libahocorasick) [🌐](https://github.com/GerHobbelt/pyahocorasick) -- a fast and memory efficient library for exact or approximate multi-pattern string search meaning that you can find multiple key strings occurrences at once in some input text.  The strings "index" can be built ahead of time and saved (as a pickle) to disk to reload and reuse later.  The library provides an `ahocorasick` Python module that you can use as a plain dict-like Trie or convert a Trie to an automaton for efficient Aho-Corasick search.
- **libharry** [📁](./libharry) [🌐](https://github.com/GerHobbelt/harry) -- Harry - A Tool for Measuring String Similarity
- **libngt-ann** [📁](./libngt-ann) [🌐](https://github.com/GerHobbelt/NGT) -- Yahoo's Neighborhood Graph and Tree for Indexing High-dimensional Data. NGT provides commands and a library for performing high-speed approximate nearest neighbor searches against a large volume of data (several million to several 10 million items of data) in high dimensional vector data space (several ten to several thousand dimensions).
- **libsptag** [📁](./libsptag) [🌐](https://github.com/GerHobbelt/SPTAG) -- a library for fast approximate nearest neighbor search.  SPTAG (Space Partition Tree And Graph) is a library for large scale vector approximate nearest neighbor search scenario released by [Microsoft Research (MSR)](https://www.msra.cn/) and [Microsoft Bing](http://bing.com).
- **mrpt** [📁](./mrpt) [🌐](https://github.com/GerHobbelt/mrpt) -- MRPT is a lightweight and easy-to-use library for approximate nearest neighbor search with random projection. The index building has an integrated hyperparameter tuning algorithm, so the only hyperparameter required to construct the index is the target recall level! According to [our experiments](https://github.com/ejaasaari/mrpt-comparison/) MRPT is one of the fastest libraries for approximate nearest neighbor search.
  
  In the offline phase of the algorithm MRPT indexes the data with a collection of *random projection trees*. In the online phase the index structure allows us to answer queries in superior time. A detailed description of the algorithm with the time and space complexities, and the aforementioned comparisons can be found in [our article](https://www.cs.helsinki.fi/u/ttonteri/pub/bigdata2016.pdf) that was published in IEEE International Conference on Big Data 2016.
  
  The algorithm for automatic hyperparameter tuning is described in detail in our new article that will be presented in Pacific-Asia Conference on Knowledge Discovery and Data Mining 2019 ([arxiv preprint](https://arxiv.org/abs/1812.07484)).

- **n2-kNN** [📁](./n2-kNN) [🌐](https://github.com/GerHobbelt/n2) -- N2: Lightweight approximate **N**\ earest **N**\ eighbor algorithm library. N2 stands for two N's, which comes from \'Approximate ``N``\ earest ``N``\ eighbor Algorithm\'. Before N2, there has been other great approximate nearest neighbor libraries such as `Annoy` and `NMSLIB`. However, each of them had different strengths and weaknesses regarding usability, performance, etc. N2 has been developed aiming to bring the strengths of existing aKNN libraries and supplement their weaknesses.
- **nanoflann** [📁](./nanoflann) [🌐](https://github.com/GerHobbelt/nanoflann) -- a C++11 header-only library for building KD-Trees of datasets with different topologies: R^2, R^3 (point clouds), SO(2) and SO(3) (2D and 3D rotation groups). No support for approximate NN is provided. This library is a fork of the `flann` library by Marius Muja and David G. Lowe, and born as a child project of `MRPT`.
- **nmslib** [📁](./nmslib) [🌐](https://github.com/GerHobbelt/nmslib) -- Non-Metric Space Library (NMSLIB) is an efficient cross-platform similarity search library and a toolkit for evaluation of similarity search methods. The core-library does not have any third-party dependencies. It has been gaining popularity recently. In particular, it has become a part of Amazon Elasticsearch Service. The goal of the project is to create an effective and comprehensive toolkit for searching in generic and non-metric spaces. Even though the library contains a variety of metric-space access methods, our main focus is on generic and approximate search methods, in particular, on methods for non-metric spaces. NMSLIB is possibly the first library with a principled support for non-metric space searching.
- **online-hnsw** [📁](./online-hnsw) [🌐](https://github.com/GerHobbelt/online-hnsw) -- Online HNSW: an implementation of the HNSW index for approximate nearest neighbors search for C++14, that supports incremental insertion and removal of elements.
- **pagerank** [📁](./pagerank) [🌐](https://github.com/GerHobbelt/pagerank) -- a [pagerank](http://www.ams.org/samplings/feature-column/fcarc-pagerank) implementation in C++ able to handle very big graphs.
- **pHash** [📁](./pHash) [🌐](https://github.com/GerHobbelt/pHash) -- the open source perceptual hash library. Potential applications include copyright protection, similarity search for media files, or even digital forensics. For example, YouTube could maintain a database of hashes that have been submitted by the major movie producers of movies to which they hold the copyright. If a user then uploads the same video to YouTube, the hash will be almost identical, and it can be flagged as a possible copyright violation. The audio hash could be used to automatically tag MP3 files with proper ID3 information, while the text hash could be used for plagiarism detection.
- **phash-gpl** [📁](./phash-gpl) [🌐](https://github.com/GerHobbelt/phash-gpl) -- pHash&trade; Perceptual Hashing Library is a collection of perceptual hashing algorithms for image, audo, video and text media.
- **probminhash** [📁](./probminhash) [🌐](https://github.com/GerHobbelt/probminhash) -- a class of Locality-Sensitive Hash Algorithms for the (Probability) Jaccard Similarity
- **pyglass** [📁](./pyglass) [🌐](https://github.com/GerHobbelt/pyglass) -- a library for fast inference of graph index for approximate similarity search.
  
  - It's high performant.
  - No third-party library dependencies, does not rely on OpenBLAS / MKL or any other computing framework.
  - Sophisticated memory management and data structure design, very low memory footprint.
  - Supports multiple graph algorithms, like [**HNSW**](https://github.com/nmslib/hnswlib) and [**NSG**](https://github.com/ZJULearning/nsg).
  - Supports multiple hardware platforms, like **X86** and **ARM**. Support for **GPU** is on the way

- **sdhash** [📁](./sdhash) [🌐](https://github.com/GerHobbelt/sdhash) -- a tool which allows two arbitrary blobs of data to be compared for similarity based on common strings of binary data. It is designed to provide quick results during triage and initial investigation phases.
- **ssdeep** [📁](./ssdeep) [🌐](https://github.com/GerHobbelt/ssdeep) -- fuzzy hashing library, can be used to assist with identifying almost identical files using context triggered piecewise hashing.
- **ssimulacra2** [📁](./ssimulacra2) [🌐](https://github.com/GerHobbelt/ssimulacra2) -- Structural SIMilarity Unveiling Local And Compression Related Artifacts metric developed by Jon Sneyers. SSIMULACRA 2 is based on the concept of the multi-scale structural similarity index measure (MS-SSIM), computed in a perceptually relevant color space, adding two other (asymmetric) error maps, and aggregating using two different norms.
- **VQMT** [📁](./VQMT) [🌐](https://github.com/GerHobbelt/VQMT) -- VQMT (Video Quality Measurement Tool) provides fast implementations of the following objective metrics:
  
  - **MS-SSIM**: Multi-Scale Structural Similarity,
  - **PSNR**: Peak Signal-to-Noise Ratio,
  - **PSNR-HVS**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF),
  - **PSNR-HVS-M**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF) and between-coefficient contrast masking of DCT basis functions.
  - **SSIM**: Structural Similarity,
  - **VIFp**: Visual Information Fidelity, pixel domain version
  
  The above metrics are implemented in C++ with the help of OpenCV and are based on the original Matlab implementations provided by their developers.

- **xgboost** [📁](./xgboost) [🌐](https://github.com/GerHobbelt/xgboost) -- an optimized distributed gradient boosting library designed to be highly efficient, flexible and portable. It implements machine learning algorithms under the Gradient Boosting framework. XGBoost provides a parallel tree boosting (also known as GBDT, GBM) that solve many data science problems in a fast and accurate way. The same code runs on major distributed environment (Kubernetes, Hadoop, SGE, MPI, Dask) and can solve problems beyond billions of examples.











### text tokenization (as a preprocessing step for LDA et al):

i.e. breaking text into words when you _receive a textstream without spaces_. Also useful for Asian languages, which don't do spaces, e.g. Chinese.

- **Bi-Sent2Vec** [📁](./Bi-Sent2Vec) [🌐](https://github.com/GerHobbelt/Bi-Sent2Vec) -- provides cross-lingual numerical representations (features) for words, short texts, or sentences, which can be used as input to any machine learning task with applications geared towards cross-lingual word translation, cross-lingual sentence retrieval as well as cross-lingual downstream NLP tasks. The library is a cross-lingual extension of [Sent2Vec](https://github.com/epfml/sent2vec). Bi-Sent2Vec vectors are also well suited to monolingual tasks as indicated by a marked improvement in the monolingual quality of the word embeddings. (For more details, see [paper](https://arxiv.org/abs/1912.12481))
- **BlingFire** [📁](./BlingFire) [🌐](https://github.com/GerHobbelt/BlingFire) -- we are a team at Microsoft called Bling (Beyond Language Understanding), sharing our [FInite State machine and REgular expression manipulation library](https://github.com/microsoft/BlingFire) (FIRE). We use Fire for many linguistic operations inside Bing such as Tokenization, Multi-word expression matching, Unknown word-guessing, Stemming / Lemmatization just to mention a few.
  
  Fire can also be used to improve FastText: see [here](https://github.com/microsoft/BlingFire#8-example-of-reaching-99-accuracy-for-language-detection).
  
  Bling Fire Tokenizer provides state of the art performance for Natural Language text tokenization.

- **cppjieba** [📁](./cppjieba) [🌐](https://github.com/GerHobbelt/cppjieba) -- the C++ version of the Chinese "Jieba" project:
  
  - Supports loading a custom user dictionary, using the '|' separator when multipathing or the ';' separator for separate, multiple, dictionaries.
  - Supports 'utf8' encoding.
  - The project comes with a relatively complete unit test, and the stability of the core function Chinese word segmentation (utf8) has been tested by the online environment.

- **fastBPE** [📁](./fastBPE) [🌐](https://github.com/GerHobbelt/fastBPE) -- text tokenization / ngrams
- **fastText** [📁](./fastText) [🌐](https://github.com/GerHobbelt/fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification. Includes language detection feeatures.
- **fribidi** [📁](./fribidi) [🌐](https://github.com/GerHobbelt/fribidi) -- GNU FriBidi: the Free Implementation of the [Unicode Bidirectional Algorithm]. One of the missing links stopping the penetration of free software in Middle East is the lack of support for the Arabic and Hebrew alphabets. In order to have proper Arabic and Hebrew support, the bidi algorithm needs to be implemented. It is our hope that this library will stimulate more free software in the Middle Eastern countries.
- **friso** [📁](./friso) [🌐](https://github.com/GerHobbelt/friso) -- high performance Chinese tokenizer with both GBK and UTF-8 charset support based on MMSEG algorithm.
- **fxt** [📁](./fxt) [🌐](https://github.com/GerHobbelt/fxt) -- a large scale feature extraction tool for text-based machine learning.
- **koan** [📁](./koan) [🌐](https://github.com/GerHobbelt/koan) -- a `word2vec` negative sampling implementation with correct CBOW update. kōan only depends on Eigen.
  
  Although continuous bag of word (CBOW) embeddings can be trained more quickly than skipgram (SG) embeddings, it is a common belief that SG embeddings tend to perform better in practice. This was observed by the original authors of Word2Vec [1] and also in subsequent work [2].  However, we found that popular implementations of word2vec with negative sampling such as [word2vec](https://github.com/tmikolov/word2vec/) and [gensim](https://github.com/RaRe-Technologies/gensim/) do not implement the CBOW update correctly, thus potentially leading to misconceptions about the performance of CBOW embeddings when trained correctly.

- **libchopshop** [📁](./libchopshop) [🌐](https://github.com/GerHobbelt/libchopshop) -- NLP/text processing with automated stop word detection and stemmer-based filtering. This library / toolkit is engineered to be able to provide **both** of the (often more or less disparate) n-gram token streams / vectors required for (1) initializing / training FTS databases, neural nets, etc. and (2) executing effective queries / matches on these engines.
- **libcppjieba** [📁](./libcppjieba) [🌐](https://github.com/GerHobbelt/libcppjieba) -- source code extracted from the [CppJieba] project to form a separate project, making it easier to understand and use.
- **libdtm** [📁](./libdtm) [🌐](https://github.com/GerHobbelt/dtm) -- LibDTM (Dynamic Topic Models and the Document Influence Model) implements topics that change over time (Dynamic Topic Models) and a model of how individual documents predict that change. This code is the result of work by David M. Blei and Sean M. Gerrish.
- **libtextcat** [📁](./libtextcat) [🌐](https://github.com/GerHobbelt/libtextcat) -- text language detection
- **many-stop-words** [📁](./many-stop-words) [🌐](https://github.com/GerHobbelt/many-stop-words) -- Many Stop Words is a simple Python package that provides a single function for loading sets of stop words for different languages.
- **mecab** [📁](./mecab) [🌐](https://github.com/GerHobbelt/mecab) -- MeCab (Yet Another Part-of-Speech and Morphological Analyzer) is a high-performance morphological analysis engine, designed to be independent of languages, dictionaries, and corpora, using Conditional Random Fields ((CRF)[http://www.cis.upenn.edu/~pereira/papers/crf.pdf]) to estimate the parameters.
- **ngrams-weighted** [📁](./ngrams-weighted) [🌐](https://github.com/GerHobbelt/ngweight) -- implements the method to compute N-gram IDF weights for all valid word N-grams in the given corpus (document set).
- **scws-chinese-word-segmentation** [📁](./scws-chinese-word-segmentation) [🌐](https://github.com/GerHobbelt/scws) -- SCWS (Simple Chinese Word Segmentation) (i.e.: Simple Chinese Word Segmentation System). This is a mechanical Chinese word segmentation engine based on word frequency dictionary, which can basically correctly segment a whole paragraph of Chinese text into words. A word is the smallest morpheme unit in Chinese, but when writing, it does not separate words with spaces like English, so how to segment words accurately and quickly has always been a difficult problem in Chinese word segmentation. SCWS supports Chinese encoding includes `GBK`, `UTF-8`, etc.
  
  There are not many innovative elements in the word segmentation algorithm. It uses a word frequency dictionary collected by itself, supplemented by certain proper names, names of people, and place names. Basic word segmentation is achieved by identifying rules such as digital age. After small-scale testing, the accuracy is between 90% and 95%, which can basically satisfy some use in small search engines, keyword extraction and other occasions. The first prototype version was released in late 2005.

- **sent2vec** [📁](./sent2vec) [🌐](https://github.com/GerHobbelt/sent2vec) -- a tool and pre-trained models related to the [Bi-Sent2vec](https://arxiv.org/abs/1912.12481). The cross-lingual extension of Sent2Vec can be found [here](https://github.com/epfml/Bi-sent2vec). This library provides numerical representations (features) for words, short texts, or sentences, which can be used as input to any machine learning task.
- **sentencepiece** [📁](./sentencepiece) [🌐](https://github.com/GerHobbelt/sentencepiece) -- text tokenization
- **sentence-tokenizer** [📁](./sentence-tokenizer) [🌐](https://github.com/GerHobbelt/Tokenizer) -- text tokenization
- **stopwords** [📁](./stopwords) [🌐](https://github.com/GerHobbelt/stopwords) -- default English stop words from different sources.
- **ucto** [📁](./ucto) [🌐](https://github.com/GerHobbelt/ucto) -- text tokenization
  
  - **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
  - **uctodata** [📁](./uctodata) [🌐](https://github.com/GerHobbelt/uctodata) -- data for `ucto` library

- **word2vec** [📁](./word2vec) [🌐](https://github.com/GerHobbelt/word2vec) -- Word2Vec in C++ 11.
- **word2vec-GloVe** [📁](./word2vec-GloVe) [🌐](https://github.com/GerHobbelt/GloVe) -- an implementation of the GloVe (*Global Vectors for Word Representation*) model for learning word representations.
- **wordfreq** [📁](./wordfreq) [🌐](https://github.com/GerHobbelt/wordfreq) -- wordfreq is a Python library for looking up the frequencies of words in many languages, based on many sources of data.
- **wordfrequency** [📁](./wordfrequency) [🌐](https://github.com/GerHobbelt/FrequencyWords) -- FrequencyWords: Frequency Word List Generator and processed files.
- **you-token-to-me** [📁](./you-token-to-me) [🌐](https://github.com/GerHobbelt/YouTokenToMe) -- text tokenization











### regex matchers (manual edit - pattern recognition)

- **hyperscan** [📁](./hyperscan) [🌐](https://github.com/GerHobbelt/hyperscan) -- Hyperscan is a high-performance multiple regex matching library.
- **libgnurx** [📁](./libgnurx) [🌐](https://github.com/GerHobbelt/libgnurx) -- the POSIX regex functionality from glibc extracted into a separate library, for Win32.
- **libwildmatch** [📁](./libwildmatch) [🌐](https://github.com/GerHobbelt/wildmatch) -- wildmatch is a BSD-licensed C/C++ library for git/rsync-style pattern matching.
- **pcre** [📁](./pcre) [🌐](https://github.com/GerHobbelt/pcre) -- PCRE2 : Perl-Compatible Regular Expressions. The PCRE2 library is a set of C functions that implement regular expression pattern matching using the same syntax and semantics as Perl 5. PCRE2 has its own native API, as well as a set of wrapper functions that correspond to the POSIX regular expression API. It comes in three forms, for processing 8-bit, 16-bit, or 32-bit code units, in either literal or UTF encoding.
- **pdfgrep** [📁](./pdfgrep) [🌐](https://github.com/GerHobbelt/pdfgrep) -- a tool to search text in PDF files. It works similarly to *grep*.
- **re2** [📁](./re2) [🌐](https://github.com/GerHobbelt/re2) -- RE2, a regular expression library.
- **RE-flex** [📁](./RE-flex) [🌐](https://github.com/GerHobbelt/RE-flex) -- the regex-centric, fast lexical analyzer generator for C++ with full Unicode support. Faster than Flex. Accepts Flex specifications. Generates reusable source code that is easy to understand. Introduces indent/dedent anchors, lazy quantifiers, functions for lex/syntax error reporting and more. Seamlessly integrates with Bison and other parsers.
  
  The RE/flex matcher tracks line numbers, column numbers, and indentations, whereas Flex does not (option `noyylineno`) and neither do the other regex matchers (except PCRE2 and Boost.Regex when used with RE/flex).
  Tracking this information incurs some overhead. RE/flex also automatically decodes UTF-8/16/32 input and accepts `std::istream`, strings, and wide strings as input.
  
  RE/flex runs equally fast or slightly faster than the best times of Flex.

- **tre** [📁](./tre) [🌐](https://github.com/GerHobbelt/tre) -- TRE is a lightweight, robust, and efficient POSIX compliant regexp matching library with some exciting features such as approximate (fuzzy) matching. The matching algorithm used in TRE uses linear worst-case time in the length of the text being searched, and quadratic worst-case time in the length of the used regular expression.
- **ugrep** [📁](./ugrep) [🌐](https://github.com/GerHobbelt/ugrep) -- search for anything in everything... ultra fast. "*`grep` for arbitrary binary files*."
- **yara-pattern-matcher** [📁](./yara-pattern-matcher) [🌐](https://github.com/GerHobbelt/yara) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks











### OCR: quality improvements, language detect, ...

- **Capture2Text** [📁](./Capture2Text) [🌐](https://github.com/GerHobbelt/Capture2Text) -- Linux CLI port of Capture2Text v4.5.1 (Ubuntu) - the OCR results from Capture2Text were generally better than standard Tesseract, so it seemed ideal to make this run on Linux.
- **fastText** [📁](./fastText) [🌐](https://github.com/GerHobbelt/fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification. Includes language detection feeatures.
- **fribidi** [📁](./fribidi) [🌐](https://github.com/GerHobbelt/fribidi) -- GNU FriBidi: the Free Implementation of the [Unicode Bidirectional Algorithm]. One of the missing links stopping the penetration of free software in Middle East is the lack of support for the Arabic and Hebrew alphabets. In order to have proper Arabic and Hebrew support, the bidi algorithm needs to be implemented. It is our hope that this library will stimulate more free software in the Middle Eastern countries.
- **hunspell** [📁](./hunspell) [🌐](https://github.com/GerHobbelt/hunspell) -- a free spell checker and morphological analyzer library and command-line tool, designed for quick and high quality spell checking and correcting for languages with word-level writing system, including languages with rich morphology, complex word compounding and character encoding.
- **hunspell-dictionaries** [📁](./hunspell-dictionaries) [🌐](https://github.com/GerHobbelt/dictionaries) -- Collection of normalized and installable [hunspell][] dictionaries.
- **hunspell-hyphen** [📁](./hunspell-hyphen) [🌐](https://github.com/GerHobbelt/hyphen) -- hyphenation library to use converted TeX hyphenation patterns with hunspell.
- **ipa-dict** [📁](./ipa-dict) [🌐](https://github.com/GerHobbelt/ipa-dict) -- Monolingual wordlists with pronunciation information in IPA aims to provide a series of dictionaries consisting of wordlists with accompanying phonemic pronunciation information in International Phonetic Alphabet (IPA) transcription for as many words as possible in as many languages / dialects / variants as possible. The dictionary data is available in a number of human- and machine-readable formats, in order to make it as useful as possible for various other applications.
- **JamSpell** [📁](./JamSpell) [🌐](https://github.com/GerHobbelt/JamSpell) -- a spell checking library, which considers words surroundings (context) for better correction (**accuracy**) and is **fast** (near 5K words per second)
- **libpinyin** [📁](./libpinyin) [🌐](https://github.com/GerHobbelt/libpinyin) -- the libpinyin project aims to provide the algorithms core for intelligent sentence-based Chinese pinyin input methods.
- **libtextcat** [📁](./libtextcat) [🌐](https://github.com/GerHobbelt/libtextcat) -- text language detection
- **LSWMS** [📁](./LSWMS) [🌐](https://github.com/GerHobbelt/LSWMS) -- LSWMS  (Line Segment detection using Weighted Mean-Shift): line segment detection with OpenCV, originally published by Marcos Nieto Doncel.
- **marian** [📁](./marian) [🌐](https://github.com/GerHobbelt/marian) -- an efficient Neural Machine Translation framework written in pure C++ with minimal dependencies.
- **nuspell** [📁](./nuspell) [🌐](https://github.com/GerHobbelt/nuspell) -- a fast and safe spelling checker software program. It is designed for languages with rich morphology and complex word compounding. Nuspell is written in modern C++ and it supports Hunspell dictionaries.
- **ocreval** [📁](./ocreval) [🌐](https://github.com/GerHobbelt/ocreval) -- `ocreval` contains 17 tools for measuring the performance of and experimenting with OCR output. `ocreval` is a modern port of the [ISRI Analytic Tools for OCR Evaluation](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.216.9427&rep=rep1&type=pdf), with UTF-8 support and other improvements.
- **pinyin** [📁](./pinyin) [🌐](https://github.com/GerHobbelt/pinyin) -- pīnyīn is a tool for converting Chinese characters to *pinyin*. It can be used for Chinese phonetic notation, sorting, and retrieval.
- **scws-chinese-word-segmentation** [📁](./scws-chinese-word-segmentation) [🌐](https://github.com/GerHobbelt/scws) -- SCWS (Simple Chinese Word Segmentation) (i.e.: Simple Chinese Word Segmentation System). This is a mechanical Chinese word segmentation engine based on word frequency dictionary, which can basically correctly segment a whole paragraph of Chinese text into words. A word is the smallest morpheme unit in Chinese, but when writing, it does not separate words with spaces like English, so how to segment words accurately and quickly has always been a difficult problem in Chinese word segmentation. SCWS supports Chinese encoding includes `GBK`, `UTF-8`, etc.
  
  There are not many innovative elements in the word segmentation algorithm. It uses a word frequency dictionary collected by itself, supplemented by certain proper names, names of people, and place names. Basic word segmentation is achieved by identifying rules such as digital age. After small-scale testing, the accuracy is between 90% and 95%, which can basically satisfy some use in small search engines, keyword extraction and other occasions. The first prototype version was released in late 2005.

- **SymSpell** [📁](./SymSpell) [🌐](https://github.com/GerHobbelt/SymSpell) -- spelling correction & fuzzy search: **1 million times faster** through Symmetric Delete spelling correction algorithm. The Symmetric Delete spelling correction algorithm reduces the complexity of edit candidate generation and dictionary lookup for a given Damerau-Levenshtein distance. It is six orders of magnitude faster ([than the standard approach with deletes + transposes + replaces + inserts](http://norvig.com/spell-correct.html)) and language independent.
- **tesslinesplit** [📁](./tesslinesplit) [🌐](https://github.com/GerHobbelt/tesslinesplit) -- a standalone program for using Tesseract's line segmentation algorithm to split up document images.
- **unpaper** [📁](./unpaper) [🌐](https://github.com/GerHobbelt/unpaper) -- a post-processing tool for scanned sheets of paper, especially for book pages that have been scanned from previously created photocopies.  The main purpose is to make scanned book pages better readable on screen after conversion to PDF. The program also tries to detect misaligned centering and rotation of ages and will automatically straighten each page by rotating it to the correct angle (a.k.a. deskewing).











### OCR page image preprocessing, \[scanner] tooling: getting the pages to the OCR engine

- **Capture2Text** [📁](./Capture2Text) [🌐](https://github.com/GerHobbelt/Capture2Text) -- Linux CLI port of Capture2Text v4.5.1 (Ubuntu) - the OCR results from Capture2Text were generally better than standard Tesseract, so it seemed ideal to make this run on Linux.
- **ccv-nnc** [📁](./ccv-nnc) [🌐](https://github.com/GerHobbelt/ccv) -- C-based/Cached/Core Computer Vision Library. A Modern Computer Vision Library.
- **CImg** [📁](./CImg) [🌐](https://github.com/GerHobbelt/CImg) -- a **small** C++ toolkit for **image processing**.
- **ColorSpace** [📁](./ColorSpace) [🌐](https://github.com/GerHobbelt/ColorSpace) -- library for converting between color spaces and comparing colors.
- **color-util** [📁](./color-util) [🌐](https://github.com/GerHobbelt/color-util) -- a header-only C++11 library for handling colors, including color space converters between RGB, XYZ, Lab, etc. and color difference calculators such as CIEDE2000.
- **doxa** [📁](./doxa) [🌐](https://github.com/GerHobbelt/Doxa) -- Δoxa Binarization Framework (ΔBF) is an image binarization framework which focuses primarily on local adaptive thresholding algorithms, aimed at providing the building blocks one might use to advance the state of handwritten manuscript binarization.
  
  Supported Algorithms:
  
  * Otsu - "A threshold selection method from gray-level histograms", 1979.
  * Bernsen - "Dynamic thresholding of gray-level images", 1986.
  * Niblack - "An Introduction to Digital Image Processing", 1986.
  * Sauvola - "Adaptive document image binarization", 1999.
  * Wolf - "Extraction and Recognition of Artificial Text in Multimedia Documents", 2003.
  * Gatos - "Adaptive degraded document image binarization", 2005. (Partial)
  * NICK - "Comparison of Niblack inspired Binarization methods for ancient documents", 2009.
  * Su - "Binarization of Historical Document Images Using the Local Maximum and Minimum", 2010.
  * T.R. Singh - "A New local Adaptive Thresholding Technique in Binarization", 2011.
  * Bataineh - "An adaptive local binarization method for document images based on a novel thresholding method and dynamic windows", 2011. (unreproducible)
  * ISauvola - "ISauvola: Improved Sauvola’s Algorithm for Document Image Binarization", 2016.
  * WAN - "Binarization of Document Image Using Optimum Threshold Modification", 2018.
  
  Optimizations:
  
  * Shafait - "Efficient Implementation of Local Adaptive Thresholding Techniques Using Integral Images", 2008.
  * Petty - An algorithm for efficiently calculating the min and max of a local window.  Unpublished, 2019.
  * Chan - "Memory-efficient and fast implementation of local adaptive binarization methods", 2019.
  
  Performance Metrics:
  
  * Overall Accuracy
  * F-Measure
  * Peak Signal-To-Noise Ratio (PSNR)
  * Negative Rate Metric (NRM)
  * Matthews Correlation Coefficient (MCC)
  * Distance-Reciprocal Distortion Measure (DRDM) - "An Objective Distortion Measure for Binary Document Images Based on Human Visual Perception", 2002.
  
  Native Image Support:
  
  * Portable Any-Map: PBM (P4), 8-bit PGM (P5), PPM (P6), PAM (P7)

- **farver-OKlab** [📁](./farver-OKlab) [🌐](https://github.com/GerHobbelt/farver) -- provides very fast, vectorised functions for conversion of colours between different colour spaces, colour comparisons (distance between colours), encoding/decoding, and channel manipulation in colour strings.
- **FFmpeg** [📁](./FFmpeg) [🌐](https://github.com/GerHobbelt/FFmpeg) -- a collection of libraries and tools to process multimedia content such as audio, video, subtitles and related metadata.
- **gmic** [📁](./gmic) [🌐](https://github.com/GerHobbelt/gmic) -- a Full-Featured Open-Source Framework for Image Processing. It provides several different **[user interfaces](https://en.wikipedia.org/wiki/User_interface)** to convert/manipulate/filter/visualize **generic image datasets**, ranging from _1d scalar signals_ to _3d+t sequences of multi-spectral volumetric images_, hence including _2d color images_.
- **gmic-community** [📁](./gmic-community) [🌐](https://github.com/GerHobbelt/gmic-community) -- community contributions for the GMIC Full-Featured Open-Source Framework for Image Processing. It provides several different **[user interfaces](https://en.wikipedia.org/wiki/User_interface)** to convert/manipulate/filter/visualize **generic image datasets**, ranging from _1d scalar signals_ to _3d+t sequences of multi-spectral volumetric images_, hence including _2d color images_.
- **graph-coloring** [📁](./graph-coloring) [🌐](https://github.com/GerHobbelt/graph-coloring) -- a C++ Graph Coloring Package. This project has two primary uses:
  
  * As an executable for finding the chromatic number for an input graph (in edge list or edge matrix format)
  * As a library for finding the particular coloring of an input graph (represented as a `map<string,vector<string>>` edge list)

- **GraphicsMagick** [📁](./GraphicsMagick) [🌐](https://github.com/GerHobbelt/graphicsmagick) -- provides a comprehensive collection of utilities, programming interfaces, and GUIs, to support file format conversion, image processing, and 2D vector rendering. GraphicsMagick is originally based on ImageMagick from ImageMagick Studio (which was originally written by John Cristy at Dupont). The goal of GraphicsMagick is to provide the highest quality product possible while encouraging open and active participation from all interested developers.
- **guetzli** [📁](./guetzli) [🌐](https://github.com/GerHobbelt/guetzli) -- a JPEG encoder that aims for excellent compression density at high visual quality. Guetzli-generated images are typically 20-30% smaller than images of equivalent quality generated by libjpeg. Guetzli generates only sequential (nonprogressive) JPEGs due to faster decompression speeds they offer.
- **hsluv-c** [📁](./hsluv-c) [🌐](https://github.com/GerHobbelt/hsluv-c) -- HSLuv (revision 4) is a human-friendly alternative to HSL. HSLuv is very similar to CIELUV, a color space designed for perceptual uniformity based on human experiments. When accessed by polar coordinates, it becomes functionally similar to HSL with a single problem: its chroma component doesn't fit into a specific range. HSLuv extends CIELUV with a new saturation component that allows you to span all the available chroma as a neat percentage.
- **ImageMagick** [📁](./ImageMagick) [🌐](https://github.com/GerHobbelt/ImageMagick) -- [ImageMagick®](https://imagemagick.org/) can create, edit, compose, or convert digital images. It can read and write images in a variety of formats (over 200) including PNG, JPEG, GIF, WebP, HEIC, SVG, PDF, DPX, EXR, and TIFF. ImageMagick can resize, flip, mirror, rotate, distort, shear and transform images, adjust image colors, apply various special effects, or draw text, lines, polygons, ellipses, and Bézier curves.
- **ITK** [📁](./ITK) [🌐](https://github.com/GerHobbelt/ITK) -- The Insight Toolkit (ITK) is an open-source, cross-platform toolkit for N-dimensional scientific image processing, segmentation, and registration. Segmentation is the process of identifying and classifying data found in a digitally sampled representation. Typically the sampled representation is an image acquired from such medical instrumentation as CT or MRI scanners. Registration is the task of aligning or developing correspondences between data. For example, in the medical environment, a CT scan may be aligned with a MRI scan in order to combine the information contained in both.
- **jasper** [📁](./jasper) [🌐](https://github.com/GerHobbelt/jasper) -- JasPer Image Processing/Coding Tool Kit
- **lcms2** [📁](../../thirdparty/lcms2) [🌐](https://github.com/GerHobbelt/thirdparty-lcms2) -- `lcms2mt` is a thread-safe fork of `lcms` (a.k.a. Little CMS). Little CMS intends to be a small-footprint color management engine, with special focus on accuracy and performance. It uses the International Color Consortium standard (ICC), which is the modern standard when regarding to color management. The ICC specification is widely used and is referred to in many International and other de-facto standards. It was approved as an International Standard, ISO 15076-1, in 2005. Little CMS is a **full implementation** of ICC specification 4.3, it fully supports all kind of V2 and V4 profiles, including abstract, devicelink and named color profiles.
- **leptonica** [📁](../../thirdparty/leptonica) [🌐](https://github.com/GerHobbelt/leptonica) -- supports many operations that are useful on images.
  
  Features:
  
  * Rasterop (aka bitblt)
  * Affine transforms (scaling, translation, rotation, shear) on images of arbitrary pixel depth
  * Projective and bilinear transforms
  * Binary and grayscale morphology, rank order filters, and convolution
  * Seedfill and connected components
  * Image transformations with changes in pixel depth, both at the same scale and with scale change
  * Pixelwise masking, blending, enhancement, arithmetic ops, etc.
  
  Documentation:
  
  - **LeptonicaDocsSite** [📁](./LeptonicaDocsSite) [🌐](https://github.com/GerHobbelt/LeptonicaDocsSite) -- unofficial Reference Documentation for the Leptonica image processing library ([www.leptonica.org](http://www.leptonica.org)).
  - **UnofficialLeptDocs** [📁](./UnofficialLeptDocs) [🌐](https://github.com/GerHobbelt/UnofficialLeptDocs) -- unofficial Sphinx-generated documentation for the Leptonica image processing library.

- **libdip** [📁](./libdip) [🌐](https://github.com/GerHobbelt/diplib) -- **[*DIPlib*](https://diplib.org/diplib-docs/)** is a C++ library for quantitative image analysis.
- **libimagequant** [📁](./libimagequant) [🌐](https://github.com/GerHobbelt/libimagequant) -- Palette quantization library that powers `pngquant` and other PNG optimizers. `libimagequant` converts RGBA images to palette-based 8-bit indexed images, including alpha component. It's ideal for generating tiny PNG images and nice-looking GIFs. Image encoding/decoding isn't handled by the library itself, bring your own encoder.
- **libinsane** [📁](./libinsane) [🌐](https://github.com/GerHobbelt/libinsane) -- *the* library to access scanners on both Linux and Windows.
- **libpillowfight** [📁](./libpillowfight) [🌐](https://github.com/GerHobbelt/libpillowfight) -- simple C Library containing various image processing algorithms. 
  
  Available algorithms:
  
  - ACE (Automatic Color Equalization; Parallelized implementation)
  - Canny edge detection
  - Compare: Compare two images (grayscale) and makes the pixels that are different really visible (red).
  - Gaussian blur
  - Scan borders: Tries to detect the borders of a page in an image coming from a scanner.
  - Sobel operator
  - SWT (Stroke Width Transformation)
  - [Unpaper](https://github.com/Flameeyes/unpaper)'s algorithms
    
    - Blackfilter
    - Blurfilter
    - Border
    - Grayfilter
    - Masks
    - Noisefilter

- **libprecog** [📁](./libprecog) [🌐](https://github.com/GerHobbelt/PRLib) -- PRLib - Pre-Recognition Library. The main aim of the library is to prepare images for OCR (text recogntion). Image processing can really help to improve recognition quality.
- **libprecog-data** [📁](./libprecog-data) [🌐](https://github.com/GerHobbelt/libprecog-data) -- `PRLib` (a.k.a. `libprecog`) test data.
- **libprecog-manuals** [📁](./libprecog-manuals) [🌐](https://github.com/GerHobbelt/libprecog-manuals) -- `PRLib` (a.k.a. `libprecog`) related papers.
- **libraqm** [📁](./libraqm) [🌐](https://github.com/GerHobbelt/libraqm) -- a small library that encapsulates the logic for complex text layout and provides a convenient API.
- **libvips** [📁](./libvips) [🌐](https://github.com/GerHobbelt/libvips) -- a demand-driven, horizontally threaded image processing library which has around 300 operations covering arithmetic, histograms, convolution, morphological operations, frequency filtering, colour, resampling, statistics and others. It supports a large range of numeric types, from 8-bit int to 128-bit complex. Images can have any number of bands. It supports a good range of image formats, including JPEG, JPEG2000, JPEG-XL, TIFF, PNG, WebP, HEIC, AVIF, FITS, Matlab, OpenEXR, PDF, SVG, HDR, PPM / PGM / PFM, CSV, GIF, Analyze, NIfTI, DeepZoom, and OpenSlide. It can also load images via ImageMagick or GraphicsMagick, letting it work with formats like DICOM.
- **LSWMS** [📁](./LSWMS) [🌐](https://github.com/GerHobbelt/LSWMS) -- LSWMS  (Line Segment detection using Weighted Mean-Shift): line segment detection with OpenCV, originally published by Marcos Nieto Doncel.
- **magsac** [📁](./magsac) [🌐](https://github.com/GerHobbelt/magsac) -- (MAGSAC++ had been included in OpenCV) the MAGSAC and MAGSAC++ algorithms for robust model fitting without using a single inlier-outlier threshold.
- **oidn-OpenImageDenoise** [📁](./oidn-OpenImageDenoise) [🌐](https://github.com/GerHobbelt/oidn) -- Intel® Open Image Denoise is an open source library of high-performance, high-quality denoising filters for images rendered with ray tracing.
- **olena** [📁](./olena) [🌐](https://github.com/GerHobbelt/olena) -- a platform dedicated to image processing.  At the moment it is mainly composed of a C++ library: Milena.  This library features many tools to easily perform image processing tasks.  Its main characteristic is its genericity: it allows to write an algorithm once and run it over many kinds of images (gray scale, color, 1D, 2D, 3D, ...).
- **OpenColorIO** [📁](./OpenColorIO) [🌐](https://github.com/GerHobbelt/OpenColorIO) -- OpenColorIO (OCIO) is a complete color management solution geared towards motion picture production with an emphasis on visual effects and computer animation. OCIO provides a straightforward and consistent user experience across all supporting applications while allowing for sophisticated back-end configuration options suitable for high-end production usage. OCIO is compatible with the Academy Color Encoding Specification (ACES) and is LUT-format agnostic, supporting many popular formats.
- **opencv** [📁](./opencv) [🌐](https://github.com/GerHobbelt/opencv) -- OpenCV: Open Source Computer Vision Library
- **opencv_contrib** [📁](./opencv_contrib) [🌐](https://github.com/GerHobbelt/opencv_contrib) -- OpenCV's extra modules. This is where you'll find new, bleeding edge OpenCV module development.
- **opencv_extra** [📁](./opencv_extra) [🌐](https://github.com/GerHobbelt/opencv_extra) -- extra data for OpenCV: Open Source Computer Vision Library
- **pdiff** [📁](./pdiff) [🌐](https://github.com/GerHobbelt/pdiff) -- perceptualdiff (pdiff): a program that compares two images using a perceptually based image metric.
- **Pillow** [📁](./Pillow) [🌐](https://github.com/GerHobbelt/Pillow) -- the friendly PIL (Python Imaging Library) fork by [Jeffrey A. Clark (Alex) and contributors](https://github.com/python-pillow/Pillow/graphs/contributors). PIL is the Python Imaging Library by Fredrik Lundh and Contributors. This library provides extensive file format support, an efficient internal representation, and fairly powerful image processing capabilities.
- **pixman** [📁](./pixman) [🌐](https://github.com/GerHobbelt/pixman) -- a library that provides low-level pixel manipulation features such as image compositing and trapezoid rasterization.
- **poisson_blend** [📁](./poisson_blend) [🌐](https://github.com/GerHobbelt/poisson_blend) -- a simple, readable implementation of Poisson Blending, that demonstrates the concepts explained in [my article](https://erkaman.github.io/posts/poisson_blending.html), seamlessly blending a source image and a target image, at some specified pixel location.
- **pylene** [📁](./pylene) [🌐](https://github.com/GerHobbelt/pylene) -- Pylene is a fork of [Olena/Milena](http://www.lrde.epita.fr/olena), an image processing library targeting genericity and efficiency. It provided mostly Mathematical Morphology building blocs for image processing pipelines.
- **radon-tf** [📁](./radon-tf) [🌐](https://github.com/GerHobbelt/radon-tf) -- simple implementation of the radon transform. Faster when using more than one thread to execute it. No inverse function is provided. CPU implementation only.
- **rotate** [📁](./rotate) [🌐](https://github.com/GerHobbelt/rotate) -- provides several classic, commonly used and novel rotation algorithms (aka block swaps), which were documented since around 1981 up to 2021: three novel rotation algorithms were introduced in 2021, notably the [trinity rotation](https://github.com/scandum/rotate#Trinity-Rotation).
- **rotate_detection** [📁](./rotate_detection) [🌐](https://github.com/GerHobbelt/rotate_detection) -- angle rotation detection on scanned documents. Designed for embedding in systems using tesseract OCR. The detection algorithm based on [Rényi entropy](https://en.wikipedia.org/wiki/R%C3%A9nyi_entropy).
- **scantailor** [📁](./scantailor) [🌐](https://github.com/GerHobbelt/scantailor-advanced) -- [scantailor_advanced](https://github.com/4lex4/scantailor-advanced) is the [ScanTailor](https://github.com/scantailor/scantailor) version that merges the features of the *ScanTailor Featured* and *ScanTailor Enhanced* versions, brings new ones and fixes. ScanTailor is an interactive post-processing tool for scanned pages. It performs operations such as page splitting, deskewing, adding/removing borders, selecting content, ... and many others.
- **scilab** [📁](./scilab) [🌐](https://github.com/GerHobbelt/scilab) -- Scilab includes hundreds of mathematical functions. It has a high-level programming language allowing access to advanced data structures, 2-D and 3-D graphical functions.
- **simd-imgproc** [📁](./simd-imgproc) [🌐](https://github.com/GerHobbelt/Simd) -- the Simd Library is an image processing and machine learning library designed for C and C++ programmers. It provides many useful high performance algorithms for image processing such as: pixel format conversion, image scaling and filtration, extraction of statistic information from images, motion detection, object detection (HAAR and LBP classifier cascades) and classification, neural network.
  
  The algorithms are optimized, using different SIMD CPU extensions where available. The library supports following CPU extensions: SSE, AVX, AVX-512 and AMX for x86/x64, VMX(Altivec) and VSX(Power7) for PowerPC (big-endian), NEON for ARM.

- **tesslinesplit** [📁](./tesslinesplit) [🌐](https://github.com/GerHobbelt/tesslinesplit) -- a standalone program for using Tesseract's line segmentation algorithm to split up document images.
- **twain_library** [📁](./twain_library) [🌐](https://github.com/GerHobbelt/twain_library) -- the DTWAIN Library, **Version 5.x**, from Dynarithmic Software.  DTWAIN is an open source programmer's library that will allow applications to acquire images from TWAIN-enabled devices using a simple Application Programmer's Interface (API).
- **unblending** [📁](./unblending) [🌐](https://github.com/GerHobbelt/unblending) -- a C++ library for decomposing a target image into a set of semi-transparent layers associated with *advanced color-blend modes* (e.g., "multiply" and "color-dodge"). Output layers can be imported to Adobe Photoshop, Adobe After Effects, GIMP, Krita, etc. and are useful for performing complex edits that are otherwise difficult.
- **unpaper** [📁](./unpaper) [🌐](https://github.com/GerHobbelt/unpaper) -- a post-processing tool for scanned sheets of paper, especially for book pages that have been scanned from previously created photocopies.  The main purpose is to make scanned book pages better readable on screen after conversion to PDF. The program also tries to detect misaligned centering and rotation of ages and will automatically straighten each page by rotating it to the correct angle (a.k.a. deskewing).
- **VQMT** [📁](./VQMT) [🌐](https://github.com/GerHobbelt/VQMT) -- VQMT (Video Quality Measurement Tool) provides fast implementations of the following objective metrics:
  
  - **MS-SSIM**: Multi-Scale Structural Similarity,
  - **PSNR**: Peak Signal-to-Noise Ratio,
  - **PSNR-HVS**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF),
  - **PSNR-HVS-M**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF) and between-coefficient contrast masking of DCT basis functions.
  - **SSIM**: Structural Similarity,
  - **VIFp**: Visual Information Fidelity, pixel domain version
  
  The above metrics are implemented in C++ with the help of OpenCV and are based on the original Matlab implementations provided by their developers.












### image export, image / \[scanned] document import

- **CImg** [📁](./CImg) [🌐](https://github.com/GerHobbelt/CImg) -- a **small** C++ toolkit for **image processing**.
- **CxImage** [📁](./CxImage) [🌐](https://github.com/GerHobbelt/CxImage) -- venerated library for reading and creating many image file formats.
- **FFmpeg** [📁](./FFmpeg) [🌐](https://github.com/GerHobbelt/FFmpeg) -- a collection of libraries and tools to process multimedia content such as audio, video, subtitles and related metadata.
- **fpng** [📁](./fpng) [🌐](https://github.com/GerHobbelt/fpng) -- a very fast C++ .PNG image reader/writer for 24/32bpp images. fpng was written to see just how fast you can write .PNG's without sacrificing too much compression. The files written by fpng conform to the [PNG standard](https://www.w3.org/TR/PNG/), are readable using any PNG decoder, and load or validate successfully using libpng, wuffs, lodepng, stb_image, and [pngcheck](http://www.libpng.org/pub/png/apps/pngcheck.html). PNG files written using fpng can also be read using fpng faster than other PNG libraries, due to its explicit use of [Length-Limited Prefix Codes](https://create.stephan-brumme.com/length-limited-prefix-codes/) and an [optimized decoder](https://fastcompression.blogspot.com/2015/10/huffman-revisited-part-4-multi-bytes.html) that exploits the properties of these codes.
- **grok-jpeg2000** [📁](./grok-jpeg2000) [🌐](https://github.com/GerHobbelt/grok) -- World's Leading Open Source JPEG 2000 Codec
  
  Features:
  
  * support for new **High Throughput JPEG 2000 (HTJ2K)** standard
  * fast random-access sub-image decoding using `TLM` and `PLT` markers
  * full encode/decode support for `ICC` colour profiles
  * full encode/decode support for `XML`,`IPTC`, `XMP` and `EXIF` meta-data
  * full encode/decode support for `monochrome`, `sRGB`, `palette`, `YCC`, `extended YCC`, `CIELab` and `CMYK` colour spaces
  * full encode/decode support for `JPEG`,`PNG`,`BMP`,`TIFF`,`RAW`,`PNM` and `PAM` image formats
  * full encode/decode support for 1-16 bit precision images

- **guetzli** [📁](./guetzli) [🌐](https://github.com/GerHobbelt/guetzli) -- a JPEG encoder that aims for excellent compression density at high visual quality. Guetzli-generated images are typically 20-30% smaller than images of equivalent quality generated by libjpeg. Guetzli generates only sequential (nonprogressive) JPEGs due to faster decompression speeds they offer.
- **jbig2dec** [📁](../../thirdparty/jbig2dec) [🌐](https://github.com/GerHobbelt/jbig2dec) -- a decoder library and example utility implementing the JBIG2 bi-level image compression spec. Also known as ITU T.88 and ISO IEC 14492, and included by reference in Adobe's PDF version 1.4 and later.
- **jbig2enc** [📁](./jbig2enc) [🌐](https://github.com/GerHobbelt/jbig2enc) -- an encoder for JBIG2. JBIG2 encodes bi-level (1 bpp) images using a number of clever tricks to get better compression than G4. This encoder can:
  
  * Generate JBIG2 files, or fragments for embedding in PDFs
  * Generic region encoding
  * Perform symbol extraction, classification and text region coding
  * Perform refinement coding and,
  * Compress multipage documents
  
  It uses the Leptonica library.

- **jpeginfo** [📁](../../thirdparty/jpeginfo) [🌐](https://github.com/GerHobbelt/jpeginfo) -- prints information and tests integrity of JPEG/JFIF files.
- **JPEG-XL** [📁](./jpeg-xl) [🌐](https://github.com/GerHobbelt/jpeg-xl) -- JPEG XL reference implementation (encoder and decoder), called `libjxl`. JPEG XL was standardized in 2022 as [ISO/IEC 18181](https://jpeg.org/jpegxl/workplan.html). The [core codestream](doc/format_overview.md#codestream-features) is specified in 18181-1, the [file format](doc/format_overview.md#file-format-features) in 18181-2. [Decoder conformance](https://github.com/libjxl/conformance) is defined in 18181-3, and 18181-4 is the [reference software](https://github.com/libjxl/libjxl).
- **lerc** [📁](./lerc) [🌐](https://github.com/GerHobbelt/lerc) -- LERC (Limited Error Raster Compression) is an open-source image or raster format which supports rapid encoding and decoding for any pixel type (not just RGB or Byte). Users set the maximum compression error per pixel while encoding, so the precision of the original input image is preserved (within user defined error bounds).
- **libaom** [📁](./libaom) [🌐](https://github.com/GerHobbelt/libaom) -- AV1 Codec Library
- **libavif** [📁](./libavif) [🌐](https://github.com/GerHobbelt/libavif) -- a friendly, portable C implementation of the AV1 Image File Format, as described here: <https://aomediacodec.github.io/av1-avif/>
- **libde265** [📁](./libde265) [🌐](https://github.com/GerHobbelt/libde265) -- libde265 is an open source implementation of the h.265 video codec. It is written from scratch and has a plain C API to enable a simple integration into other software. libde265 supports WPP and tile-based multithreading and includes SSE optimizations. The decoder includes all features of the Main profile and correctly decodes almost all conformance streams (see [[wiki page](https://github.com/strukturag/libde265/wiki/Decoder-conformance)]).
- **libgd** [📁](./libgd) [🌐](https://github.com/GerHobbelt/libgd) -- GD is a library for the dynamic creation of images by programmers. GD has support for: WebP, JPEG, PNG, AVIF, HEIF, TIFF, BMP, GIF, TGA, WBMP, XPM.
- **libgif** [📁](./libgif) [🌐](https://github.com/GerHobbelt/libgif) -- a library for manipulating GIF files.
- **libheif** [📁](./libheif) [🌐](https://github.com/GerHobbelt/heif) -- High Efficiency Image File Format (HEIF) :: a visual media container format standardized by the Moving Picture Experts Group (MPEG) for storage and sharing of images and image sequences. It is based on the well-known ISO Base Media File Format (ISOBMFF) standard. HEIF Reader/Writer Engine is an implementation of HEIF standard in order to demonstrate its powerful features and capabilities.
- **libheif-alt** [📁](./libheif-alt) [🌐](https://github.com/GerHobbelt/libheif) -- an ISO/IEC 23008-12:2017 HEIF and AVIF (AV1 Image File Format) file format decoder and encoder. HEIF and AVIF are new image file formats employing HEVC (h.265) or AV1 image coding, respectively, for the best compression ratios currently possible.
- **libjpeg** [📁](../../thirdparty/libjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-libjpeg) -- the Independent JPEG Group's JPEG software
- **libjpeg-turbo** [📁](./libjpeg-turbo) [🌐](https://github.com/GerHobbelt/libjpeg-turbo) -- a JPEG image codec that uses SIMD instructions to accelerate baseline JPEG compression and decompression on x86, x86-64, Arm, PowerPC, and MIPS systems, as well as progressive JPEG compression on x86, x86-64, and Arm systems.  On such systems, libjpeg-turbo is generally 2-6x as fast as libjpeg, all else being equal.  On other types of systems, libjpeg-turbo can still outperform libjpeg by a significant amount, by virtue of its highly-optimized Huffman coding routines.  In many cases, the performance of libjpeg-turbo rivals that of proprietary high-speed JPEG codecs.
- **libpng** [📁](../../thirdparty/libpng) [🌐](https://github.com/GerHobbelt/libpng) -- LIBPNG: Portable Network Graphics support, official libpng repository.
- **libtiff** [📁](../../thirdparty/libtiff) [🌐](https://github.com/GerHobbelt/libtiff) -- TIFF Software Distribution
- **libwebp** [📁](./libwebp) [🌐](https://github.com/GerHobbelt/libwebp) -- a library to encode and decode images in WebP format.
- **mozjpeg** [📁](./mozjpeg) [🌐](https://github.com/GerHobbelt/mozjpeg) -- the Mozilla JPEG Encoder Project improves JPEG compression efficiency achieving higher visual quality and smaller file sizes at the same time. It is compatible with the JPEG standard, and the vast majority of the world's deployed JPEG decoders. MozJPEG is a patch for [libjpeg-turbo](https://github.com/libjpeg-turbo/libjpeg-turbo).
- **OpenEXR** [📁](./OpenEXR) [🌐](https://github.com/GerHobbelt/openexr) -- a high dynamic-range (HDR) image file format developed by Industrial Light & Magic (ILM) for use in computer imaging applications. OpenEXR is a lossless format for multi-layered images. Professional use. (I've used it before; nice file format.)
- **OpenImageIO** [📁](./oiio) [🌐](https://github.com/GerHobbelt/oiio) -- Reading, writing, and processing images in a wide variety of file formats, using a format-agnostic API, aimed at VFX applications.
  
  Also includes:
  
  - an ImageCache class that transparently manages a cache so that it can access truly vast amounts of image data (tens of thousands of image files totaling multiple TB) very efficiently using only a tiny amount (tens of megabytes at most) of runtime memory.
  - ImageBuf and ImageBufAlgo functions, which constitute a simple class for storing and manipulating whole images in memory, plus a collection of the most useful computations you might want to do involving those images, including many image processing operations.
  
  The primary target audience for OIIO is VFX studios and developers of tools such as renderers, compositors, viewers, and other image-related software you'd find in a production pipeline.

- **openjpeg** [📁](../../thirdparty/openjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-openjpeg) -- OPENJPEG Library and Applications -- OpenJPEG is an open-source JPEG 2000 codec written in C language. It has been developed in order to promote the use of [JPEG 2000](http://www.jpeg.org/jpeg2000), a still-image compression standard from the Joint Photographic Experts Group ([JPEG](http://www.jpeg.org)).  Since April 2015, it is officially recognized by ISO/IEC and ITU-T as a [JPEG 2000 Reference Software](http://www.itu.int/rec/T-REC-T.804-201504-I!Amd2).
- **pdiff** [📁](./pdiff) [🌐](https://github.com/GerHobbelt/pdiff) -- perceptualdiff (pdiff): a program that compares two images using a perceptually based image metric.
- **pmt-png-tools** [📁](./pmt-png-tools) [🌐](https://github.com/GerHobbelt/pmt) -- pngcrush and other PNG and MNG tools
- **psd_sdk** [📁](./psd_sdk) [🌐](https://github.com/GerHobbelt/psd_sdk) -- a C++ library that directly reads Photoshop PSD files. The library supports:
  
  * Groups
  * Nested layers
  * Smart Objects
  * User and vector masks
  * Transparency masks and additional alpha channels
  * 8-bit, 16-bit, and 32-bit data in grayscale and RGB color mode
  * All compression types known to Photoshop
  
  Additionally, limited export functionality is also supported.

- **qoi** [📁](./qoi) [🌐](https://github.com/GerHobbelt/qoi) -- QOI: the “Quite OK Image Format” for fast, lossless image compression, single-file MIT licensed library for C/C++. Compared to stb_image and stb_image_write QOI offers 20x-50x faster encoding, 3x-4x faster decoding and 20% better compression. It's also stupidly simple and fits in about 300 lines of C.
- **twain_library** [📁](./twain_library) [🌐](https://github.com/GerHobbelt/twain_library) -- the DTWAIN Library, **Version 5.x**, from Dynarithmic Software.  DTWAIN is an open source programmer's library that will allow applications to acquire images from TWAIN-enabled devices using a simple Application Programmer's Interface (API).
- **Imath** [🌐](https://github.com/AcademySoftwareFoundation/Imath) -- float16 support lib for OpenEXR format
  
  - **optional**; reason: considered *overkill* for the projects I'm currently involved in, including Qiqqa. Those can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.

- **OpenImageIO** [🌐](https://github.com/OpenImageIO/oiio) -- a library for reading, writing, and processing images in a wide variety of file formats, using a format-agnostic API, aimed at VFX applications.
  
  - **tentative/pending**; reason: considered nice & cool but still *overkill*. Qiqqa tooling can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.

- ~~**cgohlke::imagecodecs** [🌐](https://github.com/cgohlke/imagecodecs) (*not included; see also DICOM slot above*)~~
- ~~[DICOM to NIfTI](https://github.com/rordenlab/dcm2niix) (*not included; see also DICOM slot above*)~~
- ~~**GDCM-Grassroots-DICOM** [🌐](https://github.com/malaterre/GDCM)~~
  
  - **removed**; reason: not a frequently used format; the filter codes can be found in other libraries. *Overkill*. Qiqqa tooling can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.


See also [image formats (visual) quality comparison](https://eclipseo.github.io/image-comparison-web/) (*not included*).











### Monte Carlo simulations, LDA, keyword inference/extraction, etc.

- **ceres-solver** [📁](./ceres-solver) [🌐](https://github.com/GerHobbelt/ceres-solver) -- a library for modeling and solving large, complicated optimization problems. It is a feature rich, mature and performant library which has been used in production at Google since 2010. Ceres Solver can solve two kinds of problems: (1) Non-linear Least Squares problems with bounds constraints, and (2) General unconstrained optimization problems.
- **gibbs-lda** [📁](./gibbs-lda) [🌐](https://github.com/GerHobbelt/gibbs-lda) -- modified GibbsLDA++: A C/C++ Implementation of Latent Dirichlet Allocation by by Xuan-Hieu Phan and Cam-Tu Nguyen.
- **lda** [📁](./lda) [🌐](https://github.com/GerHobbelt/lda-c) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
- **lda-3-variants** [📁](./lda-3-variants) [🌐](https://github.com/GerHobbelt/LDA) -- three modified open source versions of LDA with collapsed Gibbs Sampling: GibbsLDA++, ompi-lda and online_twitter_lda.
- **lda-bigartm** [📁](./lda-bigartm) [🌐](https://github.com/GerHobbelt/bigartm) -- BigARTM is a powerful tool for topic modeling based on a novel technique called Additive Regularization of Topic Models. This technique effectively builds multi-objective models by adding the weighted sums of regularizers to the optimization criterion. BigARTM is known to combine well very different objectives, including sparsing, smoothing, topics decorrelation and many others. Such combination of regularizers significantly improves several quality measures at once almost without any loss of the perplexity.
- **lda-Familia** [📁](./lda-Familia) [🌐](https://github.com/GerHobbelt/Familia) -- Familia: A Configurable Topic Modeling Framework for Industrial Text Engineering (Di Jiang and Yuanfeng Song and Rongzhong Lian and Siqi Bao and Jinhua Peng and Huang He and Hua Wu) (2018)
- **LightLDA** [📁](./LightLDA) [🌐](https://github.com/GerHobbelt/LightLDA) -- a distributed system for large scale topic modeling. It implements a distributed sampler that enables very large data sizes and models. LightLDA improves sampling throughput and convergence speed via a fast O(1) metropolis-Hastings algorithm, and allows small cluster to tackle very large data and model sizes through model scheduling and data parallelism architecture. LightLDA is implemented with C++ for performance consideration.
- **mcmc** [📁](./mcmc) [🌐](https://github.com/GerHobbelt/mcmc) -- Monte Carlo
- **mmc** [📁](./mmc) [🌐](https://github.com/GerHobbelt/mmc) -- Monte Carlo
- **multiverso** [📁](./multiverso) [🌐](https://github.com/GerHobbelt/Multiverso) -- a parameter server based framework for training machine learning models on big data with numbers of machines. It is currently a standard C++ library and provides a series of friendly programming interfaces. Now machine learning researchers and practitioners do not need to worry about the system routine issues such as distributed model storage and operation, inter-process and inter-thread communication, multi-threading management, and so on. Instead, they are able to focus on the core machine learning logics: data, model, and training.
- **ncnn** [📁](./ncnn) [🌐](https://github.com/GerHobbelt/ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
- **OptimizationTemplateLibrary** [📁](./OptimizationTemplateLibrary) [🌐](https://github.com/GerHobbelt/O-T-L) -- Optimization Template Library (OTL)
- **stan** [📁](./stan) [🌐](https://github.com/GerHobbelt/stan) -- Stan is a C++ package providing (1) full Bayesian inference using the No-U-Turn sampler (NUTS), a variant of Hamiltonian Monte Carlo (HMC), (2) approximate Bayesian inference using automatic differentiation variational inference (ADVI), and (3) penalized maximum likelihood estimation (MLE) using L-BFGS optimization. It is built on top of the [Stan Math library](https://github.com/stan-dev/math).
- **stateline** [📁](./stateline) [🌐](https://github.com/GerHobbelt/stateline) -- a framework for distributed Markov Chain Monte Carlo (MCMC) sampling written in C++. It implements random walk Metropolis-Hastings with parallel tempering to improve chain mixing, provides an adaptive proposal distribution to speed up convergence, and allows the user to factorise their likelihoods (eg. over sensors or data).
- **waifu2x-ncnn-vulkan** [📁](./waifu2x-ncnn-vulkan) [🌐](https://github.com/GerHobbelt/waifu2x-ncnn-vulkan) -- waifu2x ncnn Vulkan: an [ncnn project](https://github.com/Tencent/ncnn) implementation of the waifu2x converter. Runs fast on Intel / AMD / Nvidia / Apple-Silicon with Vulkan API.
- **warpLDA** [📁](./warpLDA) [🌐](https://github.com/GerHobbelt/warplda) -- a cache efficient implementation for Latent Dirichlet Allocation.
- other *topic modeling* code on the Net:
  
  * [David Blei's list of topic modeling OSS software](http://www.cs.columbia.edu/~blei/topicmodeling_software.html) + [github repo list](https://github.com/blei-lab)
  * [Hierarchical Dirichlet Process (with Split-Merge Operations), Chong Wang](https://github.com/renaud/hdp-faster)
  * [Hierarchical Latent Tree Analysis (HLTA)](https://github.com/kmpoon/hlta)
  * [Leonard Poon - various works](https://github.com/kmpoon?tab=repositories)












### Random generators & all things random

- **EigenRand** [📁](./EigenRand) [🌐](https://github.com/GerHobbelt/EigenRand) -- EigenRand: The Fastest C++11-compatible random distribution generator for Eigen. EigenRand is a header-only library for [Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page), providing vectorized random number engines and vectorized random distribution generators.  Since the classic Random functions of Eigen rely on an old C function `rand()`, there is no way to control random numbers and no guarantee for quality of generated numbers. In addition, Eigen's Random is slow because `rand()` is hard to vectorize. EigenRand provides a variety of random distribution functions similar to C++11 standard's random functions, which can be vectorized and easily integrated into Eigen's expressions of Matrix and Array. You can get 5~10 times speed by just replacing old Eigen's Random or unvectorizable c++11 random number generators with EigenRand.
- **fastPRNG** [📁](./fastPRNG) [🌐](https://github.com/GerHobbelt/fastPRNG) -- a single header-only FAST 32/64 bit PRNG (pseudo-random generator), highly optimized to obtain faster code from compilers, it's based on **xoshiro** / **xoroshiro** ([**Blackman/Vigna**](http://prng.di.unimi.it/)), **xorshift** and other [**Marsaglia**](https://en.wikipedia.org/wiki/George_Marsaglia) algorithms.
- **libchaos** [📁](./libchaos) [🌐](https://github.com/GerHobbelt/libchaos) -- *Advanced library for randomization, hashing and statistical analysis (devoted to [chaos machines](https://en.wikipedia.org/wiki/Chaos_machine))* written to help with the development of software for scientific research. Project goal is to *implement & analyze* various algorithms for randomization and hashing, while maintaining simplicity and security, making them suitable for use in your own code. Popular tools like [TestU01](http://simul.iro.umontreal.ca/testu01/tu01.html), [Dieharder](https://www.phy.duke.edu/~rgb/General/dieharder.php) and [Hashdeep](https://github.com/jessek/hashdeep) are obsolete or their development has been stopped. Libchaos aims to replace them.
- **pcg-cpp-random** [📁](./pcg-cpp-random) [🌐](https://github.com/GerHobbelt/pcg-cpp) -- a C++ implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
- **pcg-c-random** [📁](./pcg-c-random) [🌐](https://github.com/GerHobbelt/pcg-c) -- a C implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
- **prvhash** [📁](./prvhash) [🌐](https://github.com/GerHobbelt/prvhash) -- PRVHASH is a hash function that generates a [uniform pseudo-random number sequence](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) derived from the message. PRVHASH is conceptually similar (in the sense of using a pseudo-random number sequence as a hash) to [`keccak`](https://en.wikipedia.org/wiki/SHA-3) and [`RadioGatun`](https://en.wikipedia.org/wiki/RadioGat%C3%BAn) schemes, but is a completely different implementation of such concept. PRVHASH is both a ["randomness extractor"](https://en.wikipedia.org/wiki/Randomness_extractor) and an "extendable-output function" (XOF).
- **randen** [📁](./randen) [🌐](https://github.com/GerHobbelt/randen) -- What if we could default to attack-resistant random generators without excessive CPU cost? We introduce 'Randen', a new generator with security guarantees; it outperforms MT19937, pcg64_c32, Philox, ISAAC and ChaCha8 in real-world benchmarks. This is made possible by AES hardware acceleration and a large Feistel permutation.
- **random** [📁](./random) [🌐](https://github.com/GerHobbelt/random) -- random for modern C++ with a convenient API.
- **RNGSobol** [📁](./RNGSobol) [🌐](https://github.com/GerHobbelt/RNGSobol) -- Sobol quadi-random numbers generator (C++). Note that unlike pseudo-random numbers, quasi-random numbers care about dimensionality of points.
- **Xoshiro-cpp** [📁](./Xoshiro-cpp) [🌐](https://github.com/GerHobbelt/Xoshiro-cpp) -- a header-only pseudorandom number generator library for modern C++. Based on **David Blackman and Sebastiano Vigna's [xoshiro/xoroshiro generators](http://prng.di.unimi.it/)**.











### Regression, curve fitting, polynomials, splines, geometrics, math

- **blaze** [📁](./blaze) [🌐](https://github.com/GerHobbelt/blaze) -- a high-performance C++ math library for dense and sparse arithmetic. With its state-of-the-art *Smart Expression Template* implementation **Blaze** combines the elegance and ease of use of a domain-specific language with HPC-grade performance, making it one of the most intuitive and fastest C++ math libraries available.
- **Clipper2** [📁](./Clipper2) [🌐](https://github.com/GerHobbelt/Clipper2) -- a Polygon <a href="https://en.wikipedia.org/wiki/Clipping_(computer_graphics)">Clipping</a> and <a href="https://en.wikipedia.org/wiki/Parallel_curve">Offsetting</a> library.
- **figtree** [📁](./figtree) [🌐](https://github.com/GerHobbelt/figtree) -- FIGTree is a library that provides a C/C++ and MATLAB interface for speeding up the computation of the Gauss Transform.
- **gmt** [📁](./gmt) [🌐](https://github.com/GerHobbelt/gmt) -- GMT (Generic Mapping Tools) is an open source collection of about 100 command-line tools for manipulating geographic and Cartesian data sets (including filtering, trend fitting, gridding, projecting, etc.) and producing high-quality illustrations ranging from simple x-y plots via contour maps to artificially illuminated surfaces, 3D perspective views and animations. The GMT supplements add another 50 more specialized and discipline-specific tools. GMT supports over 30 map projections and transformations and requires support data such as [GSHHG](http://www.soest.hawaii.edu/pwessel/gshhg/) coastlines, rivers, and political boundaries and optionally [DCW](http://www.soest.hawaii.edu/pwessel/dcw) country polygons.
- **ifopt** [📁](./ifopt) [🌐](https://github.com/GerHobbelt/ifopt) -- a modern, light-weight, [Eigen]-based C++ interface to Nonlinear Programming solvers, such as Ipopt and Snopt.
- **Ipopt** [📁](./Ipopt) [🌐](https://github.com/GerHobbelt/Ipopt) -- Ipopt (Interior Point OPTimizer, pronounced eye-pea-Opt) is a software package for large-scale [nonlinear optimization](http://wiki.mcs.anl.gov/NEOS/index.php/Nonlinear_Programming_FAQ). It is designed to find (local) solutions of mathematical optimization problems.
- **lol** [📁](./lol) [🌐](https://github.com/GerHobbelt/lol) -- the header-only part of the Lol (Math) Engine framework.
- **lolremez** [📁](./lolremez) [🌐](https://github.com/GerHobbelt/lolremez) -- LolRemez is a Remez algorithm implementation to approximate functions using polynomials.
- **magsac** [📁](./magsac) [🌐](https://github.com/GerHobbelt/magsac) -- (MAGSAC++ had been included in OpenCV) the MAGSAC and MAGSAC++ algorithms for robust model fitting without using a single inlier-outlier threshold.
- **mathtoolbox** [📁](./mathtoolbox) [🌐](https://github.com/GerHobbelt/mathtoolbox) -- mathematical tools (interpolation, dimensionality reduction, optimization, etc.) written in C++11 and [Eigen](http://eigen.tuxfamily.org/).
- **openlibm** [📁](./openlibm) [🌐](https://github.com/GerHobbelt/openlibm) -- [OpenLibm](https://openlibm.org/) is an effort to have a high quality, portable, standalone C mathematical library ([`libm`](http://en.wikipedia.org/wiki/libm)). The project was born out of a need to have a good `libm` for the [Julia programming language](http://www.julialang.org) that worked consistently across compilers and operating systems, and in 32-bit and 64-bit environments.
- **polatory** [📁](./polatory) [🌐](https://github.com/GerHobbelt/polatory) -- a fast and memory-efficient framework for RBF (radial basis function) interpolation. Polatory can perform kriging prediction via RBF interpolation (dual kriging). Although different terminologies are used, both methods produce the same results.
- **radon-tf** [📁](./radon-tf) [🌐](https://github.com/GerHobbelt/radon-tf) -- simple implementation of the radon transform. Faster when using more than one thread to execute it. No inverse function is provided. CPU implementation only.
- **RNGSobol** [📁](./RNGSobol) [🌐](https://github.com/GerHobbelt/RNGSobol) -- Sobol quadi-random numbers generator (C++). Note that unlike pseudo-random numbers, quasi-random numbers care about dimensionality of points.
- **rotate** [📁](./rotate) [🌐](https://github.com/GerHobbelt/rotate) -- provides several classic, commonly used and novel rotation algorithms (aka block swaps), which were documented since around 1981 up to 2021: three novel rotation algorithms were introduced in 2021, notably the [trinity rotation](https://github.com/scandum/rotate#Trinity-Rotation).
- **RRD** [📁](./RRD) [🌐](https://github.com/GerHobbelt/RRD) -- RRD: Rotation-Sensitive Regression for Oriented Scene Text Detection
- **RRPN** [📁](./RRPN) [🌐](https://github.com/GerHobbelt/RRPN) -- (Arbitrary-Oriented Scene Text Detection via Rotation Proposals)[https://arxiv.org/abs/1703.01086]
- **scilab** [📁](./scilab) [🌐](https://github.com/GerHobbelt/scilab) -- Scilab includes hundreds of mathematical functions. It has a high-level programming language allowing access to advanced data structures, 2-D and 3-D graphical functions.
- **sequential-line-search** [📁](./sequential-line-search) [🌐](https://github.com/GerHobbelt/sequential-line-search) -- a C++ library for performing the **sequential line search** method (which is a human-in-the-loop variant of **Bayesian optimization**), following the paper "Yuki Koyama, Issei Sato, Daisuke Sakamoto, and Takeo Igarashi. 2017. Sequential Line Search for Efficient Visual Design Optimization by Crowds. ACM Trans. Graph. 36, 4, pp.48:1--48:11 (2017). (a.k.a. Proceedings of SIGGRAPH 2017), DOI: https://doi.org/10.1145/3072959.3073598"
- **Sophus** [📁](./Sophus) [🌐](https://github.com/GerHobbelt/Sophus) -- a C++ implementation of Lie groups commonly used for 2d and 3d geometric problems (i.e. for Computer Vision or Robotics applications). Among others, this package includes the special orthogonal groups SO(2) and SO(3) to present rotations in 2d and 3d as well as the special Euclidean group SE(2) and SE(3) to represent rigid body transformations (i.e. rotations and translations) in 2d and 3d.
- **spline** [📁](./spline) [🌐](https://github.com/GerHobbelt/spline) -- a lightweight C++ cubic spline interpolation library.
- **splinter** [📁](./splinter) [🌐](https://github.com/GerHobbelt/splinter) -- SPLINTER (SPLine INTERpolation) is a library for *multivariate function approximation with splines*. The library can be used for function approximation, regression, data smoothing, data reduction, and much more. Spline approximations are represented by a speedy C++ implementation of the tensor product B-spline. The B-spline consists of piecewise polynomial basis functions, offering a high flexibility and smoothness. The B-spline can be fitted to data using ordinary least squares (OLS), possibly with regularization. The library also offers construction of penalized splines (P-splines).











### Solvers, Clustering, Monte Carlo, Decision Trees

- **ArborX** [📁](./ArborX) [🌐](https://github.com/GerHobbelt/ArborX) -- a library designed to provide performance portable algorithms for geometric search, similarly to nanoflann and Boost Geometry.
- **CppNumericalSolvers** [📁](./CppNumericalSolvers) [🌐](https://github.com/GerHobbelt/CppNumericalSolvers) -- a header-only C++17 BFGS / L-BFGS-B optimization library.
- **dbscan** [📁](./dbscan) [🌐](https://github.com/GerHobbelt/dbscan) -- Density-Based Spatial Clustering of Applications with Noise (DBSCAN) and Related Algorithms: a fast C++ (re)implementation of several density-based algorithms with a focus on the DBSCAN family for clustering spatial data. The package includes: DBSCAN, HDBSCAN, OPTICS/OPTICSXi, FOSC, Jarvis-Patrick clustering, LOF (Local outlier factor), GLOSH (Global-Local Outlier Score from Hierarchies), kd-tree based kNN search, Fixed-radius NN search
- **FIt-SNE** [📁](./FIt-SNE) [🌐](https://github.com/GerHobbelt/FIt-SNE) -- FFT-accelerated implementation of t-Stochastic Neighborhood Embedding ([t-SNE](https://lvdmaaten.github.io/tsne/)), which is a highly successful method for dimensionality reduction and visualization of high dimensional datasets.  A popular [implementation](https://github.com/lvdmaaten/bhtsne) of t-SNE uses the Barnes-Hut algorithm to approximate the gradient at each iteration of gradient descent.
- **genieclust** [📁](./genieclust) [🌐](https://github.com/GerHobbelt/genieclust) -- a faster and more powerful version of *Genie* (Fast and Robust Hierarchical Clustering with Noise Point Detection) – a robust and outlier resistant clustering algorithm (see Gagolewski, Bartoszuk, Cena, 2016).
- **gram_savitzky_golay** [📁](./gram_savitzky_golay) [🌐](https://github.com/GerHobbelt/gram_savitzky_golay) -- Savitzky-Golay filtering based on Gram polynomials, as described in [General Least-Squares Smoothing and Differentiation by the Convolution (Savitzky-Golay) Method](http://pubs.acs.org/doi/pdf/10.1021/ac00205a007)
- **hdbscan** [📁](./hdbscan) [🌐](https://github.com/GerHobbelt/hdbscan) -- a fast parallel implementation for HDBSCAN* [[1]](https://dl.acm.org/doi/10.1145/2733381) (hierarchical DBSCAN). The implementation stems from our parallel algorithms [[2]](https://arxiv.org/pdf/2104.01126.pdf) developed at MIT, and presented at SIGMOD 2021. Our approach is based on generating a well-separated pair decomposition followed by using Kruskal's minimum spanning tree algorithm and bichromatic closest pair computations. We also give a new parallel divide-and-conquer algorithm for computing the dendrogram, which are used in visualizing clusters of different scale that arise for HDBSCAN*.
- **hdbscan-cpp** [📁](./hdbscan-cpp) [🌐](https://github.com/GerHobbelt/hdbscan-cpp) -- Fast and Efficient Implementation of HDBSCAN in C++ using STL. HDBSCAN - Hierarchical Density-Based Spatial Clustering of Applications with Noise. Performs DBSCAN over varying epsilon values and integrates the result to find a clustering that gives the best stability over epsilon. This allows HDBSCAN to find clusters of varying densities (unlike DBSCAN), and be more robust to parameter selection. In practice this means that HDBSCAN returns a good clustering straight away with little or no parameter tuning -- and the primary parameter, minimum cluster size, is intuitive and easy to select. HDBSCAN is ideal for exploratory data analysis; it's a fast and robust algorithm that you can trust to return meaningful clusters (if there are any).
- **ifopt** [📁](./ifopt) [🌐](https://github.com/GerHobbelt/ifopt) -- a modern, light-weight, [Eigen]-based C++ interface to Nonlinear Programming solvers, such as Ipopt and Snopt.
- **Ipopt** [📁](./Ipopt) [🌐](https://github.com/GerHobbelt/Ipopt) -- Ipopt (Interior Point OPTimizer, pronounced eye-pea-Opt) is a software package for large-scale [nonlinear optimization](http://wiki.mcs.anl.gov/NEOS/index.php/Nonlinear_Programming_FAQ). It is designed to find (local) solutions of mathematical optimization problems.
- **mathtoolbox** [📁](./mathtoolbox) [🌐](https://github.com/GerHobbelt/mathtoolbox) -- mathematical tools (interpolation, dimensionality reduction, optimization, etc.) written in C++11 and [Eigen](http://eigen.tuxfamily.org/).
- **nlopt** [📁](./nlopt) [🌐](https://github.com/GerHobbelt/nlopt) -- a library for nonlinear local and global optimization, for functions with and without gradient information.  It is designed as a simple, unified interface and packaging of several free/open-source nonlinear optimization libraries.
- **openlibm** [📁](./openlibm) [🌐](https://github.com/GerHobbelt/openlibm) -- [OpenLibm](https://openlibm.org/) is an effort to have a high quality, portable, standalone C mathematical library ([`libm`](http://en.wikipedia.org/wiki/libm)). The project was born out of a need to have a good `libm` for the [Julia programming language](http://www.julialang.org) that worked consistently across compilers and operating systems, and in 32-bit and 64-bit environments.
- **osqp** [📁](./osqp) [🌐](https://github.com/GerHobbelt/osqp) -- the Operator Splitting Quadratic Program Solver.
- **osqp-cpp** [📁](./osqp-cpp) [🌐](https://github.com/GerHobbelt/osqp-cpp) -- a C++ wrapper for [OSQP](https://github.com/oxfordcontrol/osqp), an [ADMM](http://stanford.edu/~boyd/admm.html)-based solver for [quadratic programming](https://en.wikipedia.org/wiki/Quadratic_programming). Compared with OSQP's native C interface, the wrapper provides a more convenient input format using Eigen sparse matrices and handles the lifetime of the `OSQPWorkspace` struct. This package has similar functionality to [osqp-eigen](https://github.com/robotology/osqp-eigen).
- **osqp-eigen** [📁](./osqp-eigen) [🌐](https://github.com/GerHobbelt/osqp-eigen) -- a simple C++ wrapper for [osqp](http://osqp.readthedocs.io/en/latest/index.html) library.
- **paramonte** [📁](./paramonte) [🌐](https://github.com/GerHobbelt/paramonte) -- ParaMonte (Plain Powerful Parallel Monte Carlo Library) is a serial/parallel library of Monte Carlo routines for sampling mathematical objective functions of arbitrary-dimensions, in particular, the posterior distributions of Bayesian models in data science, Machine Learning, and scientific inference, with the design goal of unifying the **automation** (of Monte Carlo simulations), **user-friendliness** (of the library), **accessibility** (from multiple programming environments), **high-performance** (at runtime), and **scalability** (across many parallel processors).
- **rgf** [📁](./rgf) [🌐](https://github.com/GerHobbelt/rgf) -- Regularized Greedy Forest (RGF) is a tree ensemble machine learning method described in [this paper](https://arxiv.org/abs/1109.0887). RGF can deliver better results than gradient boosted decision trees (GBDT) on a number of datasets and it has been used to win a few Kaggle competitions. Unlike the traditional boosted decision tree approach, RGF works directly with the underlying forest structure. RGF integrates two ideas: one is to include tree-structured regularization into the learning formulation; and the other is to employ the fully-corrective regularized greedy algorithm.
- **RNGSobol** [📁](./RNGSobol) [🌐](https://github.com/GerHobbelt/RNGSobol) -- Sobol quadi-random numbers generator (C++). Note that unlike pseudo-random numbers, quasi-random numbers care about dimensionality of points.
- **scilab** [📁](./scilab) [🌐](https://github.com/GerHobbelt/scilab) -- Scilab includes hundreds of mathematical functions. It has a high-level programming language allowing access to advanced data structures, 2-D and 3-D graphical functions.
- **sequential-line-search** [📁](./sequential-line-search) [🌐](https://github.com/GerHobbelt/sequential-line-search) -- a C++ library for performing the **sequential line search** method (which is a human-in-the-loop variant of **Bayesian optimization**), following the paper "Yuki Koyama, Issei Sato, Daisuke Sakamoto, and Takeo Igarashi. 2017. Sequential Line Search for Efficient Visual Design Optimization by Crowds. ACM Trans. Graph. 36, 4, pp.48:1--48:11 (2017). (a.k.a. Proceedings of SIGGRAPH 2017), DOI: https://doi.org/10.1145/3072959.3073598"
- **somoclu** [📁](./somoclu) [🌐](https://github.com/GerHobbelt/somoclu) -- a massively parallel implementation of self-organizing maps. It exploits multicore CPUs, it is able to rely on MPI for distributing the workload in a cluster, and it can be accelerated by CUDA. A sparse kernel is also included, which is useful for training maps on vector spaces generated in text mining processes.











### Distance Metrics, Image Quality Metrics, Image Comparison

- **edit-distance** [📁](./edit-distance) [🌐](https://github.com/GerHobbelt/editdistance) -- a fast implementation of the edit distance (Levenshtein distance). The algorithm used in this library is proposed by _Heikki Hyyrö, "Explaining and extending the bit-parallel approximate string matching algorithm of Myers", (2001) <http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.19.7158&rep=rep1&type=pdf>_.
- **figtree** [📁](./figtree) [🌐](https://github.com/GerHobbelt/figtree) -- FIGTree is a library that provides a C/C++ and MATLAB interface for speeding up the computation of the Gauss Transform.
- **flip** [📁](./flip) [🌐](https://github.com/GerHobbelt/flip) -- ꟻLIP: A Tool for Visualizing and Communicating Errors in Rendered Images, implements the [LDR-ꟻLIP](https://research.nvidia.com/publication/2020-07_FLIP) and [HDR-ꟻLIP](https://research.nvidia.com/publication/2021-05_HDR-FLIP) image error metrics.
- **glfw** [📁](./glfw) [🌐](https://github.com/GerHobbelt/glfw) -- GLFW is an Open Source, multi-platform library for OpenGL, OpenGL ES and Vulkan application development.  It provides a simple, platform-independent API for creating windows, contexts and surfaces, reading input, handling events, etc.
- **imagedistance** [📁](./imagedistance) [🌐](https://github.com/GerHobbelt/imagedistance) -- given two images, calculate their distance in several criteria.
- **libdip** [📁](./libdip) [🌐](https://github.com/GerHobbelt/diplib) -- **[*DIPlib*](https://diplib.org/diplib-docs/)** is a C++ library for quantitative image analysis.
- **libxcam** [📁](./libxcam) [🌐](https://github.com/GerHobbelt/libxcam) -- libXCam is a project for extended camera features and focus on image quality improvement and video analysis. There are lots features supported in image pre-processing, image post-processing and smart analysis. This library makes GPU/CPU/ISP working together to improve image quality. OpenCL is used to improve performance in different platforms.
- **magsac** [📁](./magsac) [🌐](https://github.com/GerHobbelt/magsac) -- (MAGSAC++ had been included in OpenCV) the MAGSAC and MAGSAC++ algorithms for robust model fitting without using a single inlier-outlier threshold.
- **mecab** [📁](./mecab) [🌐](https://github.com/GerHobbelt/mecab) -- MeCab (Yet Another Part-of-Speech and Morphological Analyzer) is a high-performance morphological analysis engine, designed to be independent of languages, dictionaries, and corpora, using Conditional Random Fields ((CRF)[http://www.cis.upenn.edu/~pereira/papers/crf.pdf]) to estimate the parameters.
- **pg_similarity** [📁](./pg_similarity) [🌐](https://github.com/GerHobbelt/pg_similarity) -- **pg\_similarity** is an extension to support similarity queries on [PostgreSQL](http://www.postgresql.org/). The implementation is tightly integrated in the RDBMS in the sense that it defines operators so instead of the traditional operators (= and <>) you can use ~~~ and ~!~ (any of these operators represents a similarity function).
- **poisson_blend** [📁](./poisson_blend) [🌐](https://github.com/GerHobbelt/poisson_blend) -- a simple, readable implementation of Poisson Blending, that demonstrates the concepts explained in [my article](https://erkaman.github.io/posts/poisson_blending.html), seamlessly blending a source image and a target image, at some specified pixel location.
- **polatory** [📁](./polatory) [🌐](https://github.com/GerHobbelt/polatory) -- a fast and memory-efficient framework for RBF (radial basis function) interpolation. Polatory can perform kriging prediction via RBF interpolation (dual kriging). Although different terminologies are used, both methods produce the same results.
- **radon-tf** [📁](./radon-tf) [🌐](https://github.com/GerHobbelt/radon-tf) -- simple implementation of the radon transform. Faster when using more than one thread to execute it. No inverse function is provided. CPU implementation only.
- **RapidFuzz** [📁](./RapidFuzz) [🌐](https://github.com/GerHobbelt/RapidFuzz) -- rapid fuzzy string matching in Python and C++ using the Levenshtein Distance.
- **rotate** [📁](./rotate) [🌐](https://github.com/GerHobbelt/rotate) -- provides several classic, commonly used and novel rotation algorithms (aka block swaps), which were documented since around 1981 up to 2021: three novel rotation algorithms were introduced in 2021, notably the [trinity rotation](https://github.com/scandum/rotate#Trinity-Rotation).
- **vmaf** [📁](./vmaf) [🌐](https://github.com/GerHobbelt/vmaf) -- VMAF (Video Multi-Method Assessment Fusion) is an [Emmy-winning](https://theemmys.tv/) perceptual video quality assessment algorithm developed by Netflix. It also provides a set of tools that allows a user to train and test a custom VMAF model.
- **ZLMediaKit** [📁](./ZLMediaKit) [🌐](https://github.com/GerHobbelt/ZLMediaKit) -- a high-performance operational-level streaming media service framework based on C++11, supporting multiple protocols (RTSP/RTMP/HLS/HTTP-FLV/WebSocket-FLV/GB28181/HTTP-TS/WebSocket-TS/HTTP-fMP4/WebSocket-fMP4/MP4/WebRTC) and protocol conversion.
  
  This extension supports a set of similarity algorithms. The most known algorithms are covered by this extension. You must be aware that each algorithm is suited for a specific domain. The following algorithms are provided.
  
  - Cosine Distance;
  - Dice Coefficient;
  - Euclidean Distance;
  - Hamming Distance;
  - Jaccard Coefficient;
  - Jaro Distance;
  - Jaro-Winkler Distance;
  - L1 Distance (as known as City Block or Manhattan Distance);
  - Levenshtein Distance;
  - Matching Coefficient;
  - Monge-Elkan Coefficient;
  - Needleman-Wunsch Coefficient;
  - Overlap Coefficient;
  - Q-Gram Distance;
  - Smith-Waterman Coefficient;
  - Smith-Waterman-Gotoh Coefficient;
  - Soundex Distance.












## Solvers

- **kiwi** [📁](./kiwi) [🌐](https://github.com/GerHobbelt/kiwi) -- Kiwi is an efficient C++ implementation of the Cassowary constraint solving algorithm. Kiwi is an implementation of the algorithm based on the `seminal Cassowary paper <https://constraints.cs.washington.edu/solvers/cassowary-tochi.pdf>`_. It is *not* a refactoring of the original C++ solver. Kiwi has been designed from the ground up to be lightweight and fast. Kiwi ranges from 10x to 500x faster than the original Cassowary solver with typical use cases gaining a 40x improvement. Memory savings are consistently > 5x.
- **LBFGS-Lite** [📁](./LBFGS-Lite) [🌐](https://github.com/GerHobbelt/LBFGS-Lite) -- a header-only L-BFGS unconstrained optimizer.
- **liblbfgs** [📁](./liblbfgs) [🌐](https://github.com/GerHobbelt/liblbfgs) -- libLBFGS: C library of limited-memory BFGS (L-BFGS), a C port of the implementation of Limited-memory Broyden-Fletcher-Goldfarb-Shanno (L-BFGS) method written by Jorge Nocedal. The original FORTRAN source code is available at: http://www.ece.northwestern.edu/~nocedal/lbfgs.html
- **MicroPather** [📁](./MicroPather) [🌐](https://github.com/GerHobbelt/MicroPather) -- a path finder and A* solver (astar or a-star) written in platform independent C++ that can be easily integrated into existing code. MicroPather focuses on being a path finding engine for video games but is a generic A* solver.
- **uno-solver** [📁](./uno-solver) [🌐](https://github.com/GerHobbelt/Uno) -- a modern, modular solver for nonlinearly constrained nonconvex optimization.











## database "backend storage"

- **arangodb** [📁](./arangodb) [🌐](https://github.com/GerHobbelt/arangodb) -- a scalable open-source multi-model database natively supporting graph, document and search. All supported data models & access patterns can be combined in queries allowing for maximal flexibility.
- **csv-parser** [📁](./csv-parser) [🌐](https://github.com/GerHobbelt/csv-parser) -- Vince's CSV Parser: there's plenty of other CSV parsers in the wild, but I had a hard time finding what I wanted. Inspired by Python's `csv` module, I wanted a library with **simple, intuitive syntax**. Furthermore, I wanted support for special use cases such as calculating statistics on very large files. Thus, this library was created with these following goals in mind.
- **csvquote** [📁](./csvquote) [🌐](https://github.com/GerHobbelt/csvquote) -- smart and simple CSV processing on the command line. This program can be used at the start and end of a text processing pipeline so that regular unix command line tools can properly handle CSV data that contain commas and newlines inside quoted data fields. Without this program, embedded special characters would be incorrectly interpreted as separators when they are inside quoted data fields.
- **datamash** [📁](./datamash) [🌐](https://github.com/GerHobbelt/datamash) -- GNU Datamash is a command-line program which performs basic numeric, textual and statistical operations on input textual data files. It is designed to be portable and reliable, and aid researchers to easily automate analysis pipelines, without writing code or even short scripts.
- **duckdb** [📁](./duckdb) [🌐](https://github.com/GerHobbelt/duckdb) -- DuckDB is a high-performance analytical database system. It is designed to be fast, reliable, portable, and easy to use. DuckDB provides a rich SQL dialect, with support far beyond basic SQL. DuckDB supports arbitrary and nested correlated subqueries, window functions, collations, complex types (arrays, structs), and more.
- **Extensible-Storage-Engine** [📁](./Extensible-Storage-Engine) [🌐](https://github.com/GerHobbelt/Extensible-Storage-Engine) -- ESE is an embedded / ISAM-based database engine, that provides rudimentary table and indexed access. However the library provides many other strongly layered and thus reusable sub-facilities as well: A Synchronization / Locking library, a Data-structures / STL-like library, an OS-abstraction layer, and a Cache Manager, as well as the full-blown database engine itself.
- **groonga** [📁](./groonga) [🌐](https://github.com/GerHobbelt/groonga) -- an open-source fulltext search engine and column store.
- **harbour-core** [📁](./harbour-core) [🌐](https://github.com/GerHobbelt/core) -- Harbour is the free software implementation of a multi-platform, multi-threading, object-oriented, scriptable programming language, backward compatible with Clipper/xBase. Harbour consists of a compiler and runtime libraries with multiple UI and database backends, its own make system and a large collection of libraries and interfaces to many popular APIs.
- **IdGenerator** [📁](./IdGenerator) [🌐](https://github.com/GerHobbelt/IdGenerator) -- a digital ID generator using the snowflake algorithm, developed in response to the performance problems that often occur. Example use is when you, as an architecture designer, want to solve the problem of unique database primary keys, especially in multi-database distributed systems. You want the primary key of the data table to use the least storage space, while the index speed and the Select, Insert, and Update queries are fast. Meanwhile there may be more than 50 application instances, and each concurrent request can reach 10W/s. You do not want to rely on the auto-increment operation of redis to obtain continuous primary key IDs, because continuous IDs pose business data security risks.
- **iODBC** [📁](./iODBC) [🌐](https://github.com/GerHobbelt/iODBC) -- the iODBC Driver Manager provides you with everything you need to develop ODBC-compliant applications under Unix without having to pay royalties to other parties. An ODBC driver is still needed to affect your connection architecture. You may build a driver with the iODBC components or obtain an ODBC driver from a commercial vendor.
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
- **mydumper** [📁](./mydumper) [🌐](https://github.com/GerHobbelt/mydumper) -- a MySQL Logical Backup Tool. It has 2 tools:
  
  * `mydumper` which is responsible to export a consistent backup of MySQL databases
  * `myloader` reads the backup from mydumper, connects the to destination database and imports the backup.

- **mysql-connector-cpp** [📁](./mysql-connector-cpp) [🌐](https://github.com/GerHobbelt/mysql-connector-cpp) -- MySQL Connector/C++ is a release of MySQL Connector/C++, [the C++ interface](https://dev.mysql.com/doc/dev/connector-cpp/8.0/) for communicating with MySQL servers.
- **nanodbc** [📁](./nanodbc) [🌐](https://github.com/GerHobbelt/nanodbc) -- a small C++ wrapper for the native C ODBC API.
- **otl** [📁](./otl) [🌐](https://github.com/GerHobbelt/otl) -- Oracle Template Library (STL-like wrapper for SQL DB queries; supports many databases besides Oracle)
- **percona-server** [📁](./percona-server) [🌐](https://github.com/GerHobbelt/percona-server) -- Percona Server for MySQL is a free, fully compatible, enhanced, and open source drop-in replacement for any MySQL database. It provides superior performance, scalability, and instrumentation.
- **qlever** [📁](./qlever) [🌐](https://github.com/GerHobbelt/qlever) -- a SPARQL engine that can efficiently index and query very large knowledge graphs with up to 100 billion triples on a single standard PC or server. In particular, QLever is fast for queries that involve large intermediate or final results, which are notoriously hard for engines like Blazegraph or Virtuoso.
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
- **sqlite-stats** [📁](./sqlite-stats) [🌐](https://github.com/GerHobbelt/sqlite-stats) -- provides common statistical functions for SQLite.
- **sqlite_wrapper** [📁](./sqlite_wrapper) [🌐](https://github.com/GerHobbelt/sqlite_wrapper) -- an easy-to-use, lightweight and concurrency-friendly SQLite wrapper written in C++17.
- **sqlite_zstd_vfs** [📁](./sqlite_zstd_vfs) [🌐](https://github.com/GerHobbelt/sqlite_zstd_vfs) -- SQLite VFS extension providing streaming storage compression using Zstandard (Zstd), transparently compressing pages of the main database file as they're written out and later decompressing them as they're read in. It runs page de/compression on background threads and occasionally generates dictionaries to improve subsequent compression.
- **sqlpp11** [📁](./sqlpp11) [🌐](https://github.com/GerHobbelt/sqlpp11) -- a type safe embedded domain specific language for SQL queries and results in C++.
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











### LMDB, NoSQL and key/value stores

- **comdb2-bdb** [📁](./comdb2-bdb) [🌐](https://github.com/GerHobbelt/comdb2) -- a clustered RDBMS built on Optimistic Concurrency Control techniques. It provides multiple isolation levels, including Snapshot and Serializable Isolation.
- **ctsa** [📁](./ctsa) [🌐](https://github.com/GerHobbelt/ctsa) -- a Univariate Time Series Analysis and ARIMA Modeling Package in ANSI C: CTSA is a C software package for univariate time series analysis. ARIMA and Seasonal ARIMA models have been added as of 10/30/2014. 07/24/2020 Update: SARIMAX and Auto ARIMA added. Documentation will be added in the coming days. Software is still in beta stage and older ARIMA and SARIMA functions are now superseded by SARIMAX.
- **gdbm** [📁](./gdbm) [🌐](https://github.com/GerHobbelt/gdbm) -- GNU dbm is a set of NoSQL database routines that use extendable hashing and works similar to the standard UNIX `dbm` routines.
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
- **sqlite-stats** [📁](./sqlite-stats) [🌐](https://github.com/GerHobbelt/sqlite-stats) -- provides common statistical functions for SQLite.
- **sqlite_wrapper** [📁](./sqlite_wrapper) [🌐](https://github.com/GerHobbelt/sqlite_wrapper) -- an easy-to-use, lightweight and concurrency-friendly SQLite wrapper written in C++17.
- **sqlite_zstd_vfs** [📁](./sqlite_zstd_vfs) [🌐](https://github.com/GerHobbelt/sqlite_zstd_vfs) -- SQLite VFS extension providing streaming storage compression using Zstandard (Zstd), transparently compressing pages of the main database file as they're written out and later decompressing them as they're read in. It runs page de/compression on background threads and occasionally generates dictionaries to improve subsequent compression.











## metadata & text (OCR et al) -- language detect, suggesting fixes, ...

- **cld1-language-detect** [📁](./cld1-language-detect) [🌐](https://github.com/GerHobbelt/cld) -- the CLD (Compact Language Detection) library, extracted from the source code for Google's Chromium library. CLD1 probabilistically detects languages in Unicode UTF-8 text.
- **cld2-language-detect** [📁](./cld2-language-detect) [🌐](https://github.com/GerHobbelt/cld2) -- CLD2 probabilistically detects over 80 languages in Unicode UTF-8 text, either plain text or HTML/XML. For mixed-language input, CLD2 returns the top three languages found and their approximate percentages of the total text bytes.  Optionally, it also returns a vector of text spans with the language of each identified. The design target is web pages of at least 200 characters (about two sentences); CLD2 is not designed to do well on very short text.
- **cld3-language-detect** [📁](./cld3-language-detect) [🌐](https://github.com/GerHobbelt/cld3) -- CLD3 is a neural network model for language identification. The inference code extracts character ngrams from the input text and computes the fraction of times each of them appears. The model outputs BCP-47-style language codes, shown in the table below. For some languages, output is differentiated by script. Language and script names from Unicode CLDR.
- **compact_enc_det** [📁](./compact_enc_det) [🌐](https://github.com/GerHobbelt/compact_enc_det) -- Compact Encoding Detection (CED for short) is a library written in C++ that scans given raw bytes and detect the most likely text encoding.
- **cppjieba** [📁](./cppjieba) [🌐](https://github.com/GerHobbelt/cppjieba) -- the C++ version of the Chinese "Jieba" project:
  
  - Supports loading a custom user dictionary, using the '|' separator when multipathing or the ';' separator for separate, multiple, dictionaries.
  - Supports 'utf8' encoding.
  - The project comes with a relatively complete unit test, and the stability of the core function Chinese word segmentation (utf8) has been tested by the online environment.

- **enca** [📁](./enca) [🌐](https://github.com/GerHobbelt/enca) -- Enca (Extremely Naive Charset Analyser) consists of two main components: `libenca`, an encoding detection library, and `enca`, a command line frontend, integrating libenca and several charset conversion libraries and tools (GNU `recode`, UNIX98 `iconv`, perl `Unicode::Map`, `cstocs`).
- **fastBPE** [📁](./fastBPE) [🌐](https://github.com/GerHobbelt/fastBPE) -- text tokenization / ngrams
- **fastText** [📁](./fastText) [🌐](https://github.com/GerHobbelt/fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification.
- **glyph_name** [📁](./glyph_name) [🌐](https://github.com/GerHobbelt/glyph_name) -- a library for computing Unicode sequences from glyph names according to the Adobe Glyph Naming convention: https://github.com/adobe-type-tools/agl-specification
- **libchardet** [📁](./libchardet) [🌐](https://github.com/GerHobbelt/libchardet) -- is based on Mozilla Universal Charset Detector library and, detects the character set used to encode data.
- **libchopshop** [📁](./libchopshop) [🌐](https://github.com/GerHobbelt/libchopshop) -- NLP/text processing with automated stop word detection and stemmer-based filtering. This library / toolkit is engineered to be able to provide **both** of the (often more or less disparate) n-gram token streams / vectors required for (1) initializing / training FTS databases, neural nets, etc. and (2) executing effective queries / matches on these engines.
- **libcppjieba** [📁](./libcppjieba) [🌐](https://github.com/GerHobbelt/libcppjieba) -- source code extracted from the [CppJieba] project to form a separate project, making it easier to understand and use.
- **libiconv** [📁](./libiconv) [🌐](https://github.com/GerHobbelt/libiconv-win-build) -- provides conversion between many platform, language or country dependent character encodings to & from Unicode. This library provides an `iconv()` implementation, for use on systems which don't have one, or whose implementation cannot convert from/to Unicode. It provides support for the encodings: European languages (ASCII, ISO-8859-{1,2,3,4,5,7,9,10,13,14,15,16}, KOI8-R, KOI8-U, KOI8-RU, CP{1250,1251,1252,1253,1254,1257}, CP{850,866,1131}, Mac{Roman,CentralEurope,Iceland,Croatian,Romania}, Mac{Cyrillic,Ukraine,Greek,Turkish}, Macintosh), Semitic languages (ISO-8859-{6,8}, CP{1255,1256}, CP862, Mac{Hebrew,Arabic}), Japanese (EUC-JP, SHIFT_JIS, CP932, ISO-2022-JP, ISO-2022-JP-2, ISO-2022-JP-1, ISO-2022-JP-MS), Chinese (EUC-CN, HZ, GBK, CP936, GB18030, EUC-TW, BIG5, CP950, BIG5-HKSCS, BIG5-HKSCS:2004, BIG5-HKSCS:2001, BIG5-HKSCS:1999, ISO-2022-CN, ISO-2022-CN-EXT), Korean (EUC-KR, CP949, ISO-2022-KR, JOHAB), Armenian (ARMSCII-8), Georgian (Georgian-Academy, Georgian-PS), Tajik (KOI8-T), Kazakh (PT154, RK1048), Thai (ISO-8859-11, TIS-620, CP874, MacThai), Laotian (MuleLao-1, CP1133), Vietnamese (VISCII, TCVN, CP1258), Platform specifics (HP-ROMAN8, NEXTSTEP), Full Unicode (UTF-8, UCS-2, UCS-2BE, UCS-2LE, UCS-4, UCS-4BE, UCS-4LE, UTF-16, UTF-16BE, UTF-16LE, UTF-32, UTF-32BE, UTF-32LE, UTF-7, C99, JAVA, UCS-2-INTERNAL, UCS-4-INTERNAL). It also provides support for a few extra encodings: European languages (CP{437,737,775,852,853,855,857,858,860,861,863,865,869,1125}), Semitic languages (CP864), Japanese (EUC-JISX0213, Shift_JISX0213, ISO-2022-JP-3), Chinese (BIG5-2003), Turkmen (TDS565), Platform specifics (ATARIST, RISCOS-LATIN1). It has also some limited support for transliteration, i.e. when a character cannot be represented in the target character set, it can be approximated through one or several similarly looking characters.
- **libpinyin** [📁](./libpinyin) [🌐](https://github.com/GerHobbelt/libpinyin) -- the libpinyin project aims to provide the algorithms core for intelligent sentence-based Chinese pinyin input methods.
- **libtextcat** [📁](./libtextcat) [🌐](https://github.com/GerHobbelt/libtextcat) -- text language detection
- **libunibreak** [📁](./libunibreak) [🌐](https://github.com/GerHobbelt/libunibreak) -- an implementation of the line breaking and word breaking algorithms as described in (Unicode Standard Annex 14)[http://www.unicode.org/reports/tr14/] and (Unicode Standard Annex 29)[http://www.unicode.org/reports/tr29/].
- **line_detector** [📁](./line_detector) [🌐](https://github.com/GerHobbelt/line_detector) -- line segment detector ([lsd](http://www.ipol.im/pub/art/2012/gjmr-lsd/)) &. edge drawing line detector (edl) &. hough line detector (standard &. probabilistic) for detection.
- **marian** [📁](./marian) [🌐](https://github.com/GerHobbelt/marian) -- an efficient Neural Machine Translation framework written in pure C++ with minimal dependencies.
- **pinyin** [📁](./pinyin) [🌐](https://github.com/GerHobbelt/pinyin) -- pīnyīn is a tool for converting Chinese characters to *pinyin*. It can be used for Chinese phonetic notation, sorting, and retrieval.
- **sentencepiece** [📁](./sentencepiece) [🌐](https://github.com/GerHobbelt/sentencepiece) -- text tokenization
- **sentence-tokenizer** [📁](./sentence-tokenizer) [🌐](https://github.com/GerHobbelt/Tokenizer) -- text tokenization
- **uchardet** [📁](./uchardet) [🌐](https://github.com/GerHobbelt/uchardet) -- [uchardet](https://www.freedesktop.org/wiki/Software/uchardet/) is an encoding and language detector library, which attempts to determine the encoding of the text. It can reliably detect many charsets. Moreover it also works as a very good and fast language detector.
- **ucto** [📁](./ucto) [🌐](https://github.com/GerHobbelt/ucto) -- text tokenization
  
  - **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
  - **uctodata** [📁](./uctodata) [🌐](https://github.com/GerHobbelt/uctodata) -- data for `ucto` library

- **unicode-cldr** [📁](./unicode-cldr) [🌐](https://github.com/GerHobbelt/cldr) -- Unicode CLDR Project: provides key building blocks for software to support the world's languages, with the largest and most extensive standard repository of locale data available. This data is used by a wide spectrum of companies for their software internationalization and localization, adapting software to the conventions of different languages for such common software tasks.
- **unicode-cldr-data** [📁](./unicode-cldr-data) [🌐](https://github.com/GerHobbelt/cldr-json) -- the JSON distribution of CLDR locale data for internationalization. While XML (not JSON) is the "official" format for all CLDR data, this data is programatically generated from the corresponding XML, using the CLDR tooling. This JSON data is generated using only data that has achieved draft="contributed" or draft="approved" status in the CLDR. This is the same threshhold as is used by the ICU (International Components for Unicode).
- **unicode-icu** [📁](./unicode-icu) [🌐](https://github.com/GerHobbelt/icu) -- the [International Components for Unicode](https://icu.unicode.org/).
- **unicode-icu-data** [📁](./unicode-icu-data) [🌐](https://github.com/GerHobbelt/icu-data) -- International Components for Unicode: Data Repository. This is an auxiliary repository for the International Components for Unicode.
- **unicode-icu-demos** [📁](./unicode-icu-demos) [🌐](https://github.com/GerHobbelt/icu-demos) -- ICU Demos contains sample applications built using the International Components for Unicode (ICU) C++ library ICU4C.
- **utfcpp** [📁](./utfcpp) [🌐](https://github.com/GerHobbelt/utfcpp) -- UTF-8 with C++ in a Portable Way
- **win-iconv** [📁](./win-iconv) [🌐](https://github.com/GerHobbelt/win-iconv) -- an `iconv` implementation using Win32 API to convert.
- **you-token-to-me** [📁](./you-token-to-me) [🌐](https://github.com/GerHobbelt/YouTokenToMe) -- text tokenization











## PDF (XML) metadata editing

for round-trip annotation and other "external application editing" of known documents; metadata embedding / *export*

- **pdfgrep** [📁](./pdfgrep) [🌐](https://github.com/GerHobbelt/pdfgrep) -- a tool to search text in PDF files. It works similarly to *grep*.
- **pdfium** [📁](./pdfium) [🌐](https://github.com/GerHobbelt/pdfium) -- the PDF library used by the Chromium project.
- **podofo** [📁](./podofo) [🌐](https://github.com/GerHobbelt/podofo) -- a library to work with the PDF file format and includes also a few tools. The name comes from the first two letters of PDF (<b>Po</b>rtable <b>Do</b>cument <b>Fo</b>rmat). The PoDoFo library is a free portable C++ library which includes classes to parse a PDF file and modify its contents into memory. The changes can be written back to disk easily. PoDoFo is designed to avoid loading large PDF objects into memory until they are required and can write large streams immediately to disk, so it is possible to manipulate quite large files with it.
- **poppler** [📁](./poppler) [🌐](https://github.com/GerHobbelt/poppler) -- Poppler is a library for rendering PDF files, and examining or modifying their structure.  Poppler originally came from the XPDF sources.
- **qpdf** [📁](./qpdf) [🌐](https://github.com/GerHobbelt/qpdf) -- QPDF is a command-line tool and C++ library that performs content-preserving transformations on PDF files. It supports linearization, encryption, and numerous other features. It can also be used for splitting and merging files, creating PDF files, and inspecting files for study or analysis. QPDF does not render PDFs or perform text extraction, and it does not contain higher-level interfaces for working with page contents. It is a low-level tool for working with the structure of PDF files and can be a valuable tool for anyone who wants to do programmatic or command-line-based manipulation of PDF files.
- **sioyek** [📁](./sioyek) [🌐](https://github.com/GerHobbelt/sioyek) -- a PDF viewer with a focus on textbooks and research papers.
- **sumatrapdf** [📁](./sumatrapdf) [🌐](https://github.com/GerHobbelt/sumatrapdf) -- SumatraPDF is a multi-format (PDF, EPUB, MOBI, CBZ, CBR, FB2, CHM, XPS, DjVu) reader for Windows.
- **XMP-Toolkit-SDK** [📁](./XMP-Toolkit-SDK) [🌐](https://github.com/GerHobbelt/XMP-Toolkit-SDK) -- the XMP Toolkit allows you to integrate XMP functionality into your product, supplying an API for locating, adding, or updating the XMP metadata in a file.
- **xpdf** [📁](./xpdf) [🌐](https://github.com/GerHobbelt/xpdf) -- Xpdf is an open source viewer for Portable Document Format (PDF) files.











## web scraping (document extraction, cleaning, metadata extraction, BibTeX, ...)

(see also investigation notes in Qiqqa docs)

- **boost-url** [📁](./boost-url) [🌐](https://github.com/GerHobbelt/boost-url) -- a library for manipulating (RFC3986) Uniform Resource Identifiers (URIs) and Locators (URLs).
- **cURL** [📁](../../thirdparty/curl) [🌐](https://github.com/GerHobbelt/thirdparty-curl) -- the ubiquitous [libcurl](http://curl.haxx.se/libcurl).
- **curl-impersonate** [📁](./curl-impersonate) [🌐](https://github.com/GerHobbelt/curl-impersonate) -- a special build of [curl](https://github.com/curl/curl) that can impersonate the four major browsers: Chrome, Edge, Safari & Firefox. curl-impersonate is able to perform TLS and HTTP handshakes that are identical to that of a real browser.
- **curl-www** [📁](./curl-www) [🌐](https://github.com/GerHobbelt/curl-www) -- the curl.se web site contents.
- **easyexif** [📁](./easyexif) [🌐](https://github.com/GerHobbelt/easyexif) -- EasyEXIF is a tiny, lightweight C++ library that parses basic (EXIF) information out of JPEG files. It uses only the std::string library and is otherwise pure C++. You pass it the binary contents of a JPEG file, and it parses several of the most important EXIF fields for you.
- **everything-curl** [📁](./everything-curl) [🌐](https://github.com/GerHobbelt/everything-curl) -- *Everything curl* is an extensive guide for all things curl. The project, the command-line tool, the library, how everything started and how it came to be the useful tool it is today. It explains how we work on developing it further, what it takes to use it, how you can contribute with code or bug reports and why millions of existing users use it.
- **exiv2** [📁](./exiv2) [🌐](https://github.com/GerHobbelt/exiv2) -- a C++ library and a command-line utility to read, write, delete and modify Exif, IPTC, XMP and ICC image metadata.
- **extract** [📁](../../thirdparty/extract) [🌐](https://github.com/GerHobbelt/thirdparty_extract) -- clone of git://git.ghostscript.com/extract.git
- **faup** [📁](./faup) [🌐](https://github.com/GerHobbelt/faup) -- **Faup** stands for Finally An Url Parser and is a library and command line tool to parse URLs and normalize fields with two constraints: (1) work with real-life urls (resilient to badly formated ones), and (2) be fast: no allocation for string parsing and read characters only once.
- **GQ-gumbo-css-selectors** [📁](./GQ-gumbo-css-selectors) [🌐](https://github.com/GerHobbelt/GQ) -- GQ is a CSS Selector Engine for [Gumbo Parser](https://github.com/google/gumbo-parser) written in C++11. Using Gumbo Parser as a backend, GQ can parse input HTML and allow users to select and modify elements in the parsed document with CSS Selectors and the provided simple, but powerful mutation API.
- **gumbo-libxml** [📁](./gumbo-libxml) [🌐](https://github.com/GerHobbelt/gumbo-libxml) -- LibXML2 bindings for the Gumbo HTML5 parser: this provides a libxml2 API on top of the Gumbo parser.  It lets you use a modern parser - Gumbo now passes all html5lib tests, including the template tag, and should be fully conformant with the HTML5 spec - with the full ecosystem of libxml tools, including XPath, tree modification, DTD validation, etc.
- **gumbo-parser** [📁](../../thirdparty/gumbo-parser) [🌐](https://github.com/GerHobbelt/gumbo-parser) -- HTML parser
- **gumbo-query** [📁](./gumbo-query) [🌐](https://github.com/GerHobbelt/gumbo-query) -- HTML DOM access in C/C++
- **htmlstreamparser** [📁](./htmlstreamparser) [🌐](https://github.com/GerHobbelt/htmlstreamparser) -- used in a demo of zsync2
- **http-parser** [📁](./http-parser) [🌐](https://github.com/GerHobbelt/http-parser) -- a parser for HTTP messages written in C. It parses both requests and responses. The parser is designed to be used in performance HTTP applications. It does not make any syscalls nor allocations, it does not buffer data, it can be interrupted at anytime. Depending on your architecture, it only requires about 40 bytes of data per message stream (in a web server that is per connection).
- **lexbor** [📁](./lexbor) [🌐](https://github.com/GerHobbelt/lexbor) -- fast HTML5 fully-conformant HTML + CSS parser.
- **libcpr** [📁](./libcpr) [🌐](https://github.com/GerHobbelt/cpr) -- wrapper library for cURL. C++ Requests is a simple wrapper around [libcurl](http://curl.haxx.se/libcurl) inspired by the excellent [Python Requests](https://github.com/kennethreitz/requests) project. Despite its name, libcurl's easy interface is anything but, and making mistakes misusing it is a common source of error and frustration. Using the more expressive language facilities of C++11, this library captures the essence of making network calls into a few concise idioms.
- **libexpat** [📁](./libexpat) [🌐](https://github.com/GerHobbelt/libexpat) -- XML read/write
- **libhog** [📁](./libhog) [🌐](https://github.com/GerHobbelt/libhog) -- `hog` a.k.a. `hound` - fetch the (PDF,EPUB,HTML) document you seek using maximum effort: `hog` is a tool for fetching *files* from the internet, specifically PDFs. Intended to be used where you browse the 'Net and decide you want to download a given PDF from any site: this can be done through the browser itself, but is sometimes convoluted or neigh impossible (ftp links require another tool, PDFs stored at servers which report as having their SSL certificates *expired* are a hassle to get through for the user-in-a-hurry, etc. etc.) and `hog` is meant to cope with all these.
- **libidn2** [📁](./libidn2) [🌐](https://github.com/GerHobbelt/libidn2) -- international domain name parsing
- **libpsl** [📁](./libpsl) [🌐](https://github.com/GerHobbelt/libpsl) -- handles the *Public Suffix List* (a collection of Top Level Domains (TLDs) suffixes, e.g. `.com`, `.net`, *Country Top Level Domains* (ccTLDs) like `.de` and `.cn` and *[Brand Top Level Domains](https://icannwiki.org/Brand_TLD)* like `.apple` and `.google`. Can be used to:
  
  - avoid privacy-leaking "super domain" certificates ([see post from Jeffry Walton](https://lists.gnu.org/archive/html/bug-wget/2014-03/msg00093.html))
  - avoid privacy-leaking "supercookies"
  - domain highlighting parts of the domain in a user interface
  - sorting domain lists by site

- **libxml2** [📁](./libxml2) [🌐](https://github.com/GerHobbelt/libxml2) -- [libxml](http://xmlsoft.org/): XML read/write
- **LLhttp-parser** [📁](./LLhttp-parser) [🌐](https://github.com/GerHobbelt/llhttp) -- a port and replacement of [http_parser](https://github.com/nodejs/http-parser) to TypeScript. [llparse](https://github.com/nodejs/llparse) is used to generate the output C source file, which could be compiled and linked with the embedder's program (like Node.js).
- **picohttpparser** [📁](./picohttpparser) [🌐](https://github.com/GerHobbelt/picohttpparser) -- PicoHTTPParser is a tiny, primitive, fast HTTP request/response parser. Unlike most parsers, it is stateless and does not allocate memory by itself. All it does is accept pointer to buffer and the output structure, and setups the pointers in the latter to point at the necessary portions of the buffer.
- **qs_parse** [📁](./qs_parse) [🌐](https://github.com/GerHobbelt/qs_parse) -- a set of simple and easy functions for parsing URL query strings, such as those generated in an HTTP GET form submission.
- **sist2** [📁](./sist2) [🌐](https://github.com/GerHobbelt/sist2) -- sist2 (Simple incremental search tool) is a fast, low memory usage, multi-threaded application, which scans drives and directory trees, extracts text and metadata from common file types, generates thumbnails and comes with OCR support (with tesseract) and  Named-Entity Recognition (using pre-trained client-side tensorflow models).
- **tidy-html5** [📁](./tidy-html5) [🌐](https://github.com/GerHobbelt/tidy-html5) -- clean up HTML documents before archiving/processing
- **URI-Encode-C** [📁](./URI-Encode-C) [🌐](https://github.com/GerHobbelt/URI-Encode-C) -- an optimized C library for percent encoding/decoding text, i.e. a URI encoder/decoder written in C based on [RFC3986](https://tools.ietf.org/html/rfc3986).
- **url** [📁](./url) [🌐](https://github.com/GerHobbelt/url) -- URI parsing and other utility functions
- **URL-Detector** [📁](./URL-Detector) [🌐](https://github.com/GerHobbelt/URL-Detector) -- Url Detector is a library created by the Linkedin Security Team to detect and extract urls in a long piece of text. Keep in mind that for security purposes, its better to overdetect urls: instead of complying with RFC 3986 (http://www.ietf.org/rfc/rfc3986.txt), we try to detect based on browser behavior, optimizing detection for urls that are visitable through the address bar of Chrome, Firefox, Internet Explorer, and Safari. It is also able to identify the parts of the identified urls.
- **url-parser** [📁](./url-parser) [🌐](https://github.com/GerHobbelt/url.h) -- parse URLs much like Node's [url](http://nodejs.org/api/url.html) module.
- **wget2** [📁](./wget2) [🌐](https://github.com/GerHobbelt/wget2) -- GNU Wget2 is the successor of GNU Wget, a file and recursive website downloader. Designed and written from scratch it wraps around libwget, that provides the basic functions needed by a web client. Wget2 works multi-threaded and uses many features to allow fast operation. In many cases Wget2 downloads much faster than Wget1.x due to HTTP2, HTTP compression, parallel connections and use of If-Modified-Since HTTP header.
- **xml-pugixml** [📁](./xml-pugixml) [🌐](https://github.com/GerHobbelt/pugixml) -- light-weight, simple and fast XML parser for C++ with XPath support.











## file format support

- **basez** [📁](./basez) [🌐](https://github.com/GerHobbelt/basez) -- encode data into/decode data from base16, base32, base32hex, base64 or base64url stream per RFC 4648; MIME base64 Content-Transfer-Encoding per RFC 2045; or PEM Printable Encoding per RFC 1421.
- **CHM-lib** [📁](./CHM-lib) [🌐](https://github.com/GerHobbelt/CHMLib) -- as I have several HTML pages stored in this format. See also MHTML: `mht-rip`
- **csv-parser** [📁](./csv-parser) [🌐](https://github.com/GerHobbelt/csv-parser) -- Vince's CSV Parser: there's plenty of other CSV parsers in the wild, but I had a hard time finding what I wanted. Inspired by Python's `csv` module, I wanted a library with **simple, intuitive syntax**. Furthermore, I wanted support for special use cases such as calculating statistics on very large files. Thus, this library was created with these following goals in mind.
- **cvmatio** [📁](./cvmatio) [🌐](https://github.com/GerHobbelt/cvmatio) -- an open source Matlab v7 MAT file parser written in C++, giving users the ability to interact with binary MAT files in their own projects.
- **datamash** [📁](./datamash) [🌐](https://github.com/GerHobbelt/datamash) -- GNU Datamash is a command-line program which performs basic numeric, textual and statistical operations on input textual data files. It is designed to be portable and reliable, and aid researchers to easily automate analysis pipelines, without writing code or even short scripts.
- **djvulibre** [📁](./djvulibre) [🌐](https://github.com/GerHobbelt/djvulibre) -- DjVu (pronounced "déjà vu") a set of compression technologies, a file format, and a software platform for the delivery over the Web of digital documents, scanned documents, and high resolution images.
- **extract** [📁](../../thirdparty/extract) [🌐](https://github.com/GerHobbelt/thirdparty_extract) -- clone of git://git.ghostscript.com/extract.git
- **fastgron** [📁](./fastgron) [🌐](https://github.com/GerHobbelt/fastgron) -- `fastgron` makes JSON greppable super fast! `fastgron` transforms JSON into discrete assignments to make it easier to grep for what you want and see the absolute 'path' to it. It eases the exploration of APIs that return large blobs of JSON but lack documentation.
- **FFmpeg** [📁](./FFmpeg) [🌐](https://github.com/GerHobbelt/FFmpeg) -- a collection of libraries and tools to process multimedia content such as audio, video, subtitles and related metadata.
- **file** [📁](./file) [🌐](https://github.com/GerHobbelt/file) -- `file` filetype recognizer tool & mimemagic
- **gmt** [📁](./gmt) [🌐](https://github.com/GerHobbelt/gmt) -- GMT (Generic Mapping Tools) is an open source collection of about 100 command-line tools for manipulating geographic and Cartesian data sets (including filtering, trend fitting, gridding, projecting, etc.) and producing high-quality illustrations ranging from simple x-y plots via contour maps to artificially illuminated surfaces, 3D perspective views and animations. The GMT supplements add another 50 more specialized and discipline-specific tools. GMT supports over 30 map projections and transformations and requires support data such as [GSHHG](http://www.soest.hawaii.edu/pwessel/gshhg/) coastlines, rivers, and political boundaries and optionally [DCW](http://www.soest.hawaii.edu/pwessel/dcw) country polygons.
- **gumbo-libxml** [📁](./gumbo-libxml) [🌐](https://github.com/GerHobbelt/gumbo-libxml) -- LibXML2 bindings for the Gumbo HTML5 parser: this provides a libxml2 API on top of the Gumbo parser.  It lets you use a modern parser - Gumbo now passes all html5lib tests, including the template tag, and should be fully conformant with the HTML5 spec - with the full ecosystem of libxml tools, including XPath, tree modification, DTD validation, etc.
- **gumbo-parser** [📁](../../thirdparty/gumbo-parser) [🌐](https://github.com/GerHobbelt/gumbo-parser) -- HTML parser
- **gumbo-query** [📁](./gumbo-query) [🌐](https://github.com/GerHobbelt/gumbo-query) -- HTML DOM access in C/C++
- **http-parser** [📁](./http-parser) [🌐](https://github.com/GerHobbelt/http-parser) -- a parser for HTTP messages written in C. It parses both requests and responses. The parser is designed to be used in performance HTTP applications. It does not make any syscalls nor allocations, it does not buffer data, it can be interrupted at anytime. Depending on your architecture, it only requires about 40 bytes of data per message stream (in a web server that is per connection).
- **id3-tagparser** [📁](./id3-tagparser) [🌐](https://github.com/GerHobbelt/tagparser) -- a C++ library for reading and writing MP4 (iTunes), ID3, Vorbis, Opus, FLAC and Matroska tags.
- **jq** [📁](./jq) [🌐](https://github.com/GerHobbelt/jq) -- a lightweight and flexible command-line JSON processor.
- **jtc** [📁](./jtc) [🌐](https://github.com/GerHobbelt/jtc) -- `jtc` stand for: **_JSON transformational chains_** (used to be _JSON test console_) and is a cli tool to extract, manipulate and transform source JSON, offering powerful ways to select one or multiple elements from a source JSON and apply various actions on the selected elements at once (wrap selected elements into a new JSON, filter in/out, sort elements, update elements, insert new elements, remove, copy, move, compare, transform, swap around and many other operations).
- **lexbor** [📁](./lexbor) [🌐](https://github.com/GerHobbelt/lexbor) -- fast HTML5 fully-conformant HTML + CSS parser.
- **libaom** [📁](./libaom) [🌐](https://github.com/GerHobbelt/libaom) -- AV1 Codec Library
- **libarchive** [📁](./libarchive) [🌐](https://github.com/GerHobbelt/libarchive) -- a portable, efficient C library that can read and write streaming archives in a variety of formats. It also includes implementations of the common `tar`, `cpio`, and `zcat` command-line tools that use the libarchive library.
- **libass** [📁](./libass) [🌐](https://github.com/GerHobbelt/libass) -- `libass` is a portable subtitle renderer for the ASS/SSA (Advanced Substation Alpha/Substation Alpha) subtitle format.
- **libavif** [📁](./libavif) [🌐](https://github.com/GerHobbelt/libavif) -- a friendly, portable C implementation of the AV1 Image File Format, as described here: <https://aomediacodec.github.io/av1-avif/>
- **libcmime** [📁](./libcmime) [🌐](https://github.com/GerHobbelt/libcmime) -- MIME extract/insert/encode/decode: use for MHTML support
- **libcsv2** [📁](./libcsv2) [🌐](https://github.com/GerHobbelt/csv2) -- CSV file format reader/writer library.
- **libde265** [📁](./libde265) [🌐](https://github.com/GerHobbelt/libde265) -- libde265 is an open source implementation of the h.265 video codec. It is written from scratch and has a plain C API to enable a simple integration into other software. libde265 supports WPP and tile-based multithreading and includes SSE optimizations. The decoder includes all features of the Main profile and correctly decodes almost all conformance streams (see [[wiki page](https://github.com/strukturag/libde265/wiki/Decoder-conformance)]).
- **libexpat** [📁](./libexpat) [🌐](https://github.com/GerHobbelt/libexpat) -- XML read/write
- **libheif** [📁](./libheif) [🌐](https://github.com/GerHobbelt/heif) -- High Efficiency Image File Format (HEIF) :: a visual media container format standardized by the Moving Picture Experts Group (MPEG) for storage and sharing of images and image sequences. It is based on the well-known ISO Base Media File Format (ISOBMFF) standard. HEIF Reader/Writer Engine is an implementation of HEIF standard in order to demonstrate its powerful features and capabilities.
- **libheif-alt** [📁](./libheif-alt) [🌐](https://github.com/GerHobbelt/libheif) -- an ISO/IEC 23008-12:2017 HEIF and AVIF (AV1 Image File Format) file format decoder and encoder. HEIF and AVIF are new image file formats employing HEVC (h.265) or AV1 image coding, respectively, for the best compression ratios currently possible.
- **libics** [📁](./libics) [🌐](https://github.com/GerHobbelt/libics) -- the reference library for ICS (Image Cytometry Standard), an open standard for writing images of any dimensionality and data type to file, together with associated information regarding the recording equipment or recorded subject.
  
  ICS stands for Image Cytometry Standard, and was first proposed in: P. Dean, L. Mascio, D. Ow, D. Sudar, J. Mullikin, "Propsed standard for image cytometry data files", Cytometry, n.11, pp.561-569, 1990. 
  
  It writes 2 files, one is the header, with an '.ics' extension, and the other is the actual image data (with an '.ids' extension.)
  
  ICS version 2.0 extends this standard to allow for a more versatile placement of the image data. It can now be placed either in the same '.ics' file or inbedded in any other file, by specifying the file name and the byte offset for the data.
  
  The advantage of ICS over other open standards such as TIFF is that it allows data of any type and dimensionality to be stored. A TIFF file can contain a collection of 2D images; it's up to the user to determine how these relate to each other. An ICS file can contain, for exmaple, a 5D image in which the 4th dimension is the light frequency and the 5th time. Also, all of the information regarding the microscope settings (or whatever instument was used to acquire the image) and the sample preparation can be included in the file.

- **libmetalink** [📁](./libmetalink) [🌐](https://github.com/GerHobbelt/libmetalink) -- a library to read Metalink XML download description format. It supports both [_Metalink version 3_](http://www.metalinker.org/Metalink_3.0_Spec.pdf) and [_Metalink version 4 (RFC 5854)_](https://tools.ietf.org/html/rfc5854).
- **libmobi** [📁](./libmobi) [🌐](https://github.com/GerHobbelt/libmobi) -- a library for handling Mobipocket/Kindle (MOBI) ebook format documents.
- **libpsd** [📁](./libpsd) [🌐](https://github.com/GerHobbelt/libpsd) -- a library for Adobe Photoshop `.psd` file's decoding and rendering.
- **libwarc** [📁](./libwarc) [🌐](https://github.com/GerHobbelt/libwarc) -- C++ library to parse WARC files. WARC is the official storage format of the Internet Archive for storing scraped content. WARC format used: http://bibnum.bnf.fr/WARC/WARC_ISO_28500_version1_latestdraft.pdf
- **libxml2** [📁](./libxml2) [🌐](https://github.com/GerHobbelt/libxml2) -- [libxml](http://xmlsoft.org/): XML read/write
- **libzip** [📁](./libzip) [🌐](https://github.com/GerHobbelt/libzip) -- a C library for reading, creating, and modifying zip and zip64 archives.
- **LLhttp-parser** [📁](./LLhttp-parser) [🌐](https://github.com/GerHobbelt/llhttp) -- a port and replacement of [http_parser](https://github.com/nodejs/http-parser) to TypeScript. [llparse](https://github.com/nodejs/llparse) is used to generate the output C source file, which could be compiled and linked with the embedder's program (like Node.js).
- **metalink-cli** [📁](./metalink-cli) [🌐](https://github.com/GerHobbelt/command) -- a small program which generates a metalink record on `stdout` for every file given on the commandline and using the mirror list from `stdin`.
- **metalink-mini-downloader** [📁](./metalink-mini-downloader) [🌐](https://github.com/GerHobbelt/mini-downloader) -- a small metalink downloader written in C++, using boost, libcurl and expat. It can either be compiled so that it downloads a specific file and then (optionally) launches it or be compiled into a "downloader template", which can later be used to create a custom downloader by replacing text strings inside the executable (they are marked in a special way, to make this easy).
- **mht-rip** [📁](./mht-rip) [🌐](https://github.com/GerHobbelt/mht-rip) -- as I have several HTML pages stored in this MHTML format. See also CHM: `CHM-lib`
- **mime-mega** [📁](./mime-mega) [🌐](https://github.com/GerHobbelt/MegaMimes) -- MIME extract/insert/encode/decode: use for MHTML support
- **mimetic** [📁](./mimetic) [🌐](https://github.com/GerHobbelt/mimetic) -- MIME: use for MHTML support
- **minizip-ng** [📁](./minizip-ng) [🌐](https://github.com/GerHobbelt/minizip-ng) -- a zip manipulation library written in C that is supported on Windows, macOS, and Linux. Minizip was originally developed by [Gilles Vollant](https://www.winimage.com/zLibDll/minizip.html) in 1998. It was first included in the zlib distribution as an additional code contribution starting in zlib 1.1.2. Since that time, it has been continually improved upon and contributed to by many people. The original [project](https://github.com/madler/zlib/tree/master/contrib/minizip) can still be found in the zlib distribution that is maintained by Mark Adler.
- **netpbm** [📁](./netpbm) [🌐](https://github.com/GerHobbelt/netpbm-mirror) -- a toolkit for manipulation of graphic images, including conversion of images between a variety of different formats.  There are over 300 separate tools in the package including converters for about 100 graphics formats.  Examples of the sort of image manipulation we're talking about are: Shrinking an image by 10%; Cutting the top half off of an image; Making a mirror image; Creating a sequence of images that fade from one image to another, etc.
- **OpenEXR** [📁](./OpenEXR) [🌐](https://github.com/GerHobbelt/openexr) -- a high dynamic-range (HDR) image file format developed by Industrial Light & Magic (ILM) for use in computer imaging applications.
- **pdf2htmlEX** [📁](./pdf2htmlEX) [🌐](https://github.com/GerHobbelt/pdf2htmlEX) -- convert PDF to HTML without losing text or format.
- **picohttpparser** [📁](./picohttpparser) [🌐](https://github.com/GerHobbelt/picohttpparser) -- PicoHTTPParser is a tiny, primitive, fast HTTP request/response parser. Unlike most parsers, it is stateless and does not allocate memory by itself. All it does is accept pointer to buffer and the output structure, and setups the pointers in the latter to point at the necessary portions of the buffer.
- **pisa_formatter** [📁](./pisa_formatter) [🌐](https://github.com/GerHobbelt/pisa_formatter) -- converts list of documents to the [pisa-engine](https://github.com/pisa-engine/pisa) binary format: {.docs, .freqs, .sizes}. Its input should be a text file where each line is a document.  Each document starts with the document name (which should not have whitespaces) followed by a list of ascii terms separated by whitespaces which define the document. This also generates a binary .terms file which has the information to convert from term to index and is used by the query_transformer executable. This file stores all the unique terms from all the documents.
- **psd_sdk** [📁](./psd_sdk) [🌐](https://github.com/GerHobbelt/psd_sdk) -- a C++ library that directly reads Photoshop PSD files. The library supports:
  
  * Groups
  * Nested layers
  * Smart Objects
  * User and vector masks
  * Transparency masks and additional alpha channels
  * 8-bit, 16-bit, and 32-bit data in grayscale and RGB color mode
  * All compression types known to Photoshop
  
  Additionally, limited export functionality is also supported.

- **qs_parse** [📁](./qs_parse) [🌐](https://github.com/GerHobbelt/qs_parse) -- a set of simple and easy functions for parsing URL query strings, such as those generated in an HTTP GET form submission.
- **sqawk** [📁](./sqawk) [🌐](https://github.com/GerHobbelt/sqawk) -- apply SQL on CSV files in the shell: `sqawk` imports CSV files into an on-the-fly SQLite database, and runs a user-supplied query on the data.
- **taglib** [📁](./taglib) [🌐](https://github.com/GerHobbelt/taglib) -- TagLib is a library for reading and editing the metadata of several popular audio formats. Currently it supports both ID3v1 and [ID3v2][] for MP3 files, [Ogg Vorbis][] comments and ID3 tags in [FLAC][], MPC, Speex, WavPack, TrueAudio, WAV, AIFF, MP4, APE, and ASF files.
- **ticpp** [📁](./ticpp) [🌐](https://github.com/GerHobbelt/ticpp) -- TinyXML++: XML read/write
- **tidy-html5** [📁](./tidy-html5) [🌐](https://github.com/GerHobbelt/tidy-html5) -- clean up HTML documents before archiving/processing
- **upskirt-markdown** [📁](./upskirt-markdown) [🌐](https://github.com/GerHobbelt/soldout) -- MarkDown renderer
  
  - **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
    
    - **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr) -- a very small recursive descent parser and evaluation engine for math expressions.

- **url-parser** [📁](./url-parser) [🌐](https://github.com/GerHobbelt/url.h) -- parse URLs much like Node's [url](http://nodejs.org/api/url.html) module.
- **warc2text** [📁](./warc2text) [🌐](https://github.com/GerHobbelt/warc2text) -- Extracts plain text, language identification and more metadata from WARC records.
- **xlnt** [📁](./xlnt) [🌐](https://github.com/GerHobbelt/xlnt) -- a modern C++ library for manipulating spreadsheets in memory and reading/writing them from/to XLSX files as described in [ECMA 376 4th edition](http://www.ecma-international.org/publications/standards/Ecma-376.htm).
- **xml-pugixml** [📁](./xml-pugixml) [🌐](https://github.com/GerHobbelt/pugixml) -- light-weight, simple and fast XML parser for C++ with XPath support.
- **zsv** [📁](./zsv) [🌐](https://github.com/GerHobbelt/zsv) -- the world's fastest (SIMD) CSV parser, with an extensible CLI for SQL querying, format conversion and more.
- ~~**gmime** [🌐](https://github.com/jstedfast/gmime) (alternative repo [here](https://github.com/GNOME/gmime)) -- multipart MIME library; serves as a fundamental building block for full MHTML file format I/O support~~
  
  - **removed**; reason: GNOME libraries are horrible to integrate with other codebases.












## BibTeX and similar library metadata formats' support

- **bibtex-robust-decoder** [📁](./bibtex-robust-decoder) [🌐](https://github.com/GerHobbelt/bibtex-robust-decoder) -- BibTeX parser which is robust: it will cope well with various BibTeX input errors which may be caused by manual entry of a BibTeX record.
- **bibtool** [📁](./bibtool) [🌐](https://github.com/GerHobbelt/bibtool) -- a tool for manipulating BibTeX data bases. BibTeX provides a mean to integrate citations into LaTeX documents. BibTool allows the manipulation of BibTeX files which goes beyond the possibilities -- and intentions -- of BibTeX.
- **bibutils** [📁](./bibutils) [🌐](https://github.com/GerHobbelt/bibutils) -- the `bibutils` set interconverts between various bibliography formats using a common MODS-format XML intermediate. For example, one can convert RIS-format files to Bibtex by doing two transformations: RIS->MODS->Bibtex. By using a common intermediate for N formats, only 2N programs are required and not N²-N.











## export / output file formats, text formatting, etc.

- **fast_float** [📁](./fast_float) [🌐](https://github.com/GerHobbelt/fast_float) -- fast and exact implementation of the C++ `from_chars` functions for float and double types: 4x faster than `strtod`
- **fmt** [📁](./fmt) [🌐](https://github.com/GerHobbelt/fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
- **hypertextcpp** [📁](./hypertextcpp) [🌐](https://github.com/GerHobbelt/hypertextcpp) -- string/text template engine & source-to-source compiler.
- **libfort** [📁](./libfort) [🌐](https://github.com/GerHobbelt/libfort) -- a simple crossplatform library to create formatted text tables.
- **libqrencode** [📁](./libqrencode) [🌐](https://github.com/GerHobbelt/libqrencode) -- generate QRcodes from anything (e.g. URLs). `libqrencode` is a fast and compact library for encoding data in a QR Code, a 2D symbology that can be scanned by handy terminals such as a smartphone. The capacity of QR Code is up to 7000 digits or 4000 characters and has high robustness. `libqrencode` supports QR Code model 2, described in JIS (Japanese Industrial Standards) X0510:2004 or ISO/IEC 18004. Most of features in the specification are implemented: Numeric, alphabet, Japanese kanji (Shift-JIS) or any 8 bit code, Optimized encoding of a string, Structured-append of symbols, Micro QR Code (experimental).
- **sile-typesetter** [📁](./sile-typesetter) [🌐](https://github.com/GerHobbelt/sile) -- SILE is a typesetting system; its job is to produce beautiful printed documents. Conceptually, SILE is similar to TeX—from which it borrows some concepts and even syntax and algorithms—but the similarities end there. Rather than being a derivative of the TeX family SILE is a new typesetting and layout engine written from the ground up using modern technologies and borrowing some ideas from graphical systems such as Adobe InDesign.
- **tabulate** [📁](./tabulate) [🌐](https://github.com/GerHobbelt/tabulate) -- Table Maker for Modern C++, for when you want to display table formatted data in the terminal/console text window.
- **textflowcpp** [📁](./textflowcpp) [🌐](https://github.com/GerHobbelt/textflowcpp) -- a simple way to wrap a string at different line lengths, optionally with indents.
- **upskirt-markdown** [📁](./upskirt-markdown) [🌐](https://github.com/GerHobbelt/soldout) -- MarkDown renderer
  
  - **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
    
    - **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr) -- a very small recursive descent parser and evaluation engine for math expressions.

- **variadic_table** [📁](./variadic_table) [🌐](https://github.com/GerHobbelt/variadic_table) -- for "pretty-printing" a formatted table of data to the console. It uses "variadic templates" to allow you to specify the types of data in each column.











## FTS (*Full Text Search*) and related: SOLR/Lucene et al: document content search

We'll be using SOLR mostly, but here might be some interface libraries and an intersting alternative

- **Bi-Sent2Vec** [📁](./Bi-Sent2Vec) [🌐](https://github.com/GerHobbelt/Bi-Sent2Vec) -- provides cross-lingual numerical representations (features) for words, short texts, or sentences, which can be used as input to any machine learning task with applications geared towards cross-lingual word translation, cross-lingual sentence retrieval as well as cross-lingual downstream NLP tasks. The library is a cross-lingual extension of [Sent2Vec](https://github.com/epfml/sent2vec). Bi-Sent2Vec vectors are also well suited to monolingual tasks as indicated by a marked improvement in the monolingual quality of the word embeddings. (For more details, see [paper](https://arxiv.org/abs/1912.12481))
- **BitFunnel** [📁](./BitFunnel) [🌐](https://github.com/GerHobbelt/BitFunnel) -- the BitFunnel search index is used by [Bing's](http://www.bing.com) super-fresh, news, and media indexes. The algorithm is described in [BitFunnel: Revisiting Signatures for
- **completesearch** [📁](./completesearch) [🌐](https://github.com/GerHobbelt/completesearch) -- a fast and interactive search engine for *context-sensitive prefix search* on a given collection of documents. It does not only provide search results, like a regular search engine, but also completions for the last (maybe only partially typed) query word that lead to a hit.
- **edit-distance** [📁](./edit-distance) [🌐](https://github.com/GerHobbelt/editdistance) -- a fast implementation of the edit distance (Levenshtein distance). The algorithm used in this library is proposed by _Heikki Hyyrö, "Explaining and extending the bit-parallel approximate string matching algorithm of Myers", (2001) <http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.19.7158&rep=rep1&type=pdf>_.
- **fxt** [📁](./fxt) [🌐](https://github.com/GerHobbelt/fxt) -- a large scale feature extraction tool for text-based machine learning.
- **groonga** [📁](./groonga) [🌐](https://github.com/GerHobbelt/groonga) -- an open-source fulltext search engine and column store.
- **iresearch** [📁](./iresearch) [🌐](https://github.com/GerHobbelt/iresearch) -- the IResearch search engine is meant to be treated as a standalone index that is capable of both indexing and storing individual values verbatim. Indexed data is treated on a per-version/per-revision basis, i.e. existing data version/revision is never modified and updates/removals are treated as new versions/revisions of the said data. This allows for trivial multi-threaded read/write operations on the index. The index exposes its data processing functionality via a multi-threaded 'writer' interface that treats each document abstraction as a collection of fields to index and/or store. The index exposes its data retrieval functionality via 'reader' interface that returns records from an index matching a specified query. The queries themselves are constructed query trees built directly using the query building blocks available in the API. The querying infrastructure provides the capability of ordering the result set by one or more ranking/scoring implementations. The ranking/scoring implementation logic is plugin-based and lazy-initialized during runtime as needed, allowing for addition of custom ranking/scoring logic without the need to even recompile the IResearch library.
- **libchopshop** [📁](./libchopshop) [🌐](https://github.com/GerHobbelt/libchopshop) -- NLP/text processing with automated stop word detection and stemmer-based filtering. This library / toolkit is engineered to be able to provide **both** of the (often more or less disparate) n-gram token streams / vectors required for (1) initializing / training FTS databases, neural nets, etc. and (2) executing effective queries / matches on these engines.
- **libunibreak** [📁](./libunibreak) [🌐](https://github.com/GerHobbelt/libunibreak) -- an implementation of the line breaking and word breaking algorithms as described in (Unicode Standard Annex 14)[http://www.unicode.org/reports/tr14/] and (Unicode Standard Annex 29)[http://www.unicode.org/reports/tr29/].
- [Manticore](https://manticoresearch.com/) -- while the userbase is much smaller than for the *Lucene Gang* (Lucene/SOLR/ES/OpenSearch), this still got me. Can't say exactly why. All the other Lucene/SOLR alternatives out there didn't appeal to me (old tech, slow dev, ...).
  
  - **manticore-columnar** [📁](./manticore-columnar) [🌐](https://github.com/GerHobbelt/columnar) -- Manticore Columnar Library is a column-oriented storage and secondary indexing library, aiming to provide **decent performance with low memory footprint at big data volume**. When used in combination with [Manticore Search](https://github.com/manticoresoftware/manticoresearch) it can be beneficial for those looking for:
    
    1. log analytics including rich free text search capabities (which is missing in e.g. [Clickhouse](https://github.com/ClickHouse/ClickHouse) - great tool for metrics analytics)
    2. faster / low resource consumption log/metrics analytics. Since the library and Manticore Search are both written in C++ with low optimizations in mind, in many cases the performance / RAM consumption is better than in Lucene / SOLR / Elasticsearch
    3. running log / metric analytics in docker / kubernetes. Manticore Search + the library can work with as little as 30 megabytes of RAM which Elasticsearch / Clickhouse can't. It also starts in less than a second or a few seconds in the worst case. Since the overhead is so little you can afford having more nodes of Manticore Search + the library than Elasticsearch. More nodes and quicker start means higher high availability and agility.
    4. powerful SQL for logs/metrics analytics and everything else [Manticore Search](https://github.com/manticoresoftware/manticoresearch) can give you
  
  - **manticore-plugins** [📁](./manticore-plugins) [🌐](https://github.com/GerHobbelt/manticore-plugins) -- Manticore Search plugins and UDFs (user defined functions) -- Manticore Search can be extended with help of plugins and custom functions (aka user defined functions or UDFs).
  - **manticoresearch** [📁](./manticoresearch) [🌐](https://github.com/GerHobbelt/manticoresearch) -- Manticore Search is an easy to use open source fast database for search. Good alternative for Elasticsearch. What distinguishes it from other solutions is:
    
    * It's very fast and therefore more cost-efficient than alternatives, for example Manticore is:
    * Modern MPP architecture and smart query parallelization capabilities allow to fully utilize all your CPU cores to **lower response time** as much as possible, when needed.
    * Powerful and fast full-text search which **works fine for small and big datasets**
    * Traditional **row-wise storage** for small, medium and big size datasets
    * **Columnar storage** support via the [Manticore Columnar Library](https://github.com/manticoresoftware/columnar/) for bigger datasets (much bigger than can fit in RAM)
    * Easy to use secondary indexes (you don't need to create them manually)
    * Cost-based optimizer for search queries
    * SQL-first: Manticore's **native syntax is SQL**. It speaks SQL over HTTP and uses the MySQL protocol (you can use your preferred MySQL client)
    * **JSON over HTTP**: to provide a more programmatic way to manage your data and schemas, Manticore provides a HTTP JSON protocol
    * Written fully in C++: **starts fast, doesn't take much RAM**, and low-level optimizations provide good performance
    * **Real-time inserts**: after an INSERT is made, the document is accessible immediately
    * [Interactive courses](https://play.manticoresearch.com/) for **easier learning**
    * **Built-in replication and load balancing**
    * **Can sync** from MySQL/PostgreSQL/ODBC/xml/csv out of the box
    * Not fully ACID-compliant, but **supports transactions and binlog** for safe writes

- **mitlm** [📁](./mitlm) [🌐](https://github.com/GerHobbelt/mitlm) -- the MIT Language Modeling Toolkit (MITLM) toolkit is a set of tools designed for the efficient estimation of statistical n-gram language models involving iterative parameter estimation.  It achieves much of its efficiency through the use of a compact vector representation of n-grams.
- **pg_similarity** [📁](./pg_similarity) [🌐](https://github.com/GerHobbelt/pg_similarity) -- **pg\_similarity** is an extension to support similarity queries on [PostgreSQL](http://www.postgresql.org/). The implementation is tightly integrated in the RDBMS in the sense that it defines operators so instead of the traditional operators (= and <>) you can use ~~~ and ~!~ (any of these operators represents a similarity function).
- **pisa** [📁](./pisa) [🌐](https://github.com/GerHobbelt/pisa) -- a text search engine able to run on large-scale collections of documents. It allows researchers to experiment with state-of-the-art techniques, allowing an ideal environment for rapid development. PISA is a text search engine, though the "PISA Project" is a set of tools that help experiment with indexing and query processing. Given a text collection, PISA can build an inverted index over this corpus, allowing the corpus to be searched. The inverted index, put simply, is an efficient data structure that represents the document corpus by storing a list of documents for each unique term (see here). At query time, PISA stores its index in main memory for rapid retrieval.
- **pisa_formatter** [📁](./pisa_formatter) [🌐](https://github.com/GerHobbelt/pisa_formatter) -- converts list of documents to the [pisa-engine](https://github.com/pisa-engine/pisa) binary format: {.docs, .freqs, .sizes}. Its input should be a text file where each line is a document.  Each document starts with the document name (which should not have whitespaces) followed by a list of ascii terms separated by whitespaces which define the document. This also generates a binary .terms file which has the information to convert from term to index and is used by the query_transformer executable. This file stores all the unique terms from all the documents.
- **sent2vec** [📁](./sent2vec) [🌐](https://github.com/GerHobbelt/sent2vec) -- a tool and pre-trained models related to the [Bi-Sent2vec](https://arxiv.org/abs/1912.12481). The cross-lingual extension of Sent2Vec can be found [here](https://github.com/epfml/Bi-sent2vec). This library provides numerical representations (features) for words, short texts, or sentences, which can be used as input to any machine learning task.
- **sist2** [📁](./sist2) [🌐](https://github.com/GerHobbelt/sist2) -- sist2 (Simple incremental search tool) is a fast, low memory usage, multi-threaded application, which scans drives and directory trees, extracts text and metadata from common file types, generates thumbnails and comes with OCR support (with tesseract) and  Named-Entity Recognition (using pre-trained client-side tensorflow models).
- **sqlite-fts5-snowball** [📁](./sqlite-fts5-snowball) [🌐](https://github.com/GerHobbelt/fts5-snowball) -- a simple extension for use with FTS5 within SQLite. It allows FTS5 to use Martin Porter's Snowball stemmers (libstemmer), which are available in several languages. Check http://snowballstem.org/ for more information about them.
- **sqlite_fts_tokenizer_chinese_simple** [📁](./sqlite_fts_tokenizer_chinese_simple) [🌐](https://github.com/GerHobbelt/simple) -- an extension of [sqlite3 fts5](https://www.sqlite.org/fts5.html) that supports Chinese and Pinyin. It fully provides a [solution to the multi-phonetic word problem of full-text retrieval on WeChat mobile terminal](https://cloud.tencent.com/developer/article/1198371): solution 4 in the article, very simple and efficient support for Chinese and Pinyin searches.
  
  On this basis we also support more accurate phrase matching through [cppjieba](https://github.com/yanyiwu/cppjieba). See the introduction article at https://www.wangfenjin.com/posts/simple-jieba-tokenizer/

- **typesense** [📁](./typesense) [🌐](https://github.com/GerHobbelt/typesense) -- a fast, typo-tolerant search engine for building delightful search experiences. Open Source alternative to Algolia and an Easier-to-Use alternative to ElasticSearch. ⚡🔍✨ Fast, typo tolerant, in-memory fuzzy Search Engine for building delightful search experiences.











### stemmers

- **libstemmer** [📁](./libstemmer) [🌐](https://github.com/GerHobbelt/libstemmer) -- SnowBall stemmer for many languages.
- **snowball** [📁](./snowball) [🌐](https://github.com/GerHobbelt/snowball) -- SnowBall stemming compiler (code generator)











### language detection / inference

- **cld1-language-detect** [📁](./cld1-language-detect) [🌐](https://github.com/GerHobbelt/cld) -- the CLD (Compact Language Detection) library, extracted from the source code for Google's Chromium library. CLD1 probabilistically detects languages in Unicode UTF-8 text.
- **cld2-language-detect** [📁](./cld2-language-detect) [🌐](https://github.com/GerHobbelt/cld2) -- CLD2 probabilistically detects over 80 languages in Unicode UTF-8 text, either plain text or HTML/XML. For mixed-language input, CLD2 returns the top three languages found and their approximate percentages of the total text bytes.  Optionally, it also returns a vector of text spans with the language of each identified. The design target is web pages of at least 200 characters (about two sentences); CLD2 is not designed to do well on very short text.
- **cld3-language-detect** [📁](./cld3-language-detect) [🌐](https://github.com/GerHobbelt/cld3) -- CLD3 is a neural network model for language identification. The inference code extracts character ngrams from the input text and computes the fraction of times each of them appears. The model outputs BCP-47-style language codes, shown in the table below. For some languages, output is differentiated by script. Language and script names from Unicode CLDR.
- **libchardet** [📁](./libchardet) [🌐](https://github.com/GerHobbelt/libchardet) -- is based on Mozilla Universal Charset Detector library and, detects the character set used to encode data.
- **uchardet** [📁](./uchardet) [🌐](https://github.com/GerHobbelt/uchardet) -- [uchardet](https://www.freedesktop.org/wiki/Software/uchardet/) is an encoding and language detector library, which attempts to determine the encoding of the text. It can reliably detect many charsets. Moreover it also works as a very good and fast language detector.











## scripting *user-tunable tasks* such as OCR preprocessing, metadata extraction, metadata cleaning & other \[post-\]processing, ...

- **chibi-scheme** [📁](./chibi-scheme) [🌐](https://github.com/GerHobbelt/chibi-scheme) -- Chibi-Scheme is a very small library intended for use as an extension and scripting language in C programs.  In addition to support for lightweight VM-based threads, each VM itself runs in an isolated heap allowing multiple VMs to run simultaneously in different OS threads.
- **cppdap** [📁](./cppdap) [🌐](https://github.com/GerHobbelt/cppdap) -- a C++11 library (["SDK"](https://microsoft.github.io/debug-adapter-protocol/implementors/sdks/)) implementation of the [Debug Adapter Protocol](https://microsoft.github.io/debug-adapter-protocol/), providing an API for implementing a DAP client or server. `cppdap` provides C++ type-safe structures for the full [DAP specification](https://microsoft.github.io/debug-adapter-protocol/specification), and provides a simple way to add custom protocol messages.
- **cpython** [📁](./cpython) [🌐](https://github.com/GerHobbelt/cpython) -- Python version 3. Note: Building a complete Python installation requires the use of various additional third-party libraries, depending on your build platform and configure options.  Not all standard library modules are buildable or useable on all platforms.
- **ECMA262** [📁](./ECMA262) [🌐](https://github.com/GerHobbelt/ecma262) -- ECMAScript :: the source for the current draft of ECMA-262, the ECMAScript® Language Specification.
- **guile** [📁](./guile) [🌐](https://github.com/GerHobbelt/guile) -- Guile is Project GNU's extension language library. Guile is an implementation of the Scheme programming language, packaged as a library that can be linked into applications to give them their own extension language.  Guile supports other languages as well, giving users of Guile-based applications a choice of languages.
- **harbour-core** [📁](./harbour-core) [🌐](https://github.com/GerHobbelt/core) -- Harbour is the free software implementation of a multi-platform, multi-threading, object-oriented, scriptable programming language, backward compatible with Clipper/xBase. Harbour consists of a compiler and runtime libraries with multiple UI and database backends, its own make system and a large collection of libraries and interfaces to many popular APIs.
- **itcl** [📁](./itcl) [🌐](https://github.com/GerHobbelt/itcl) -- Itcl is an object oriented extension for Tcl.
- **jerryscript** [📁](./jerryscript) [🌐](https://github.com/GerHobbelt/jerryscript) -- [JerryScript](https://github.com/jerryscript-project/jerryscript/) is a lightweight JavaScript engine for resource-constrained devices such as microcontrollers. It can run on devices with less than 64 KB of RAM and less than 200 KB of flash memory.
  
  Key characteristics of JerryScript:
  
  * Full ECMAScript 5.1 standard compliance
  * 160K binary size when compiled for ARM Thumb-2
  * Heavily optimized for low memory consumption
  * Written in C99 for maximum portability
  * Snapshot support for precompiling JavaScript source code to byte code
  * Mature C API, easy to embed in applications
  
  Additional information can be found at the [project page](http://jerryscript.net) and [Wiki](https://github.com/jerryscript-project/jerryscript/wiki).

- **jimtcl** [📁](./jimtcl) [🌐](https://github.com/GerHobbelt/jimtcl) -- the Jim Interpreter is a small-footprint implementation of the Tcl programming language written from scratch. Currently Jim Tcl is very feature complete with an extensive test suite (see the tests directory). There are some Tcl commands and features which are not implemented (and likely never will be), including traces and Tk. However, Jim Tcl offers a number of both Tcl8.5 and Tcl8.6 features ({*}, dict, lassign, tailcall and optional UTF-8 support) and some unique features. These unique features include [lambda] with garbage collection, a general GC/references system, arrays as syntax sugar for [dict]tionaries, object-based I/O and more. Other common features of the Tcl programming language are present, like the "everything is a string" behaviour, implemented internally as dual ported objects to ensure that the execution time does not reflect the semantic of the language :)
- **linenoise** [📁](./linenoise) [🌐](https://github.com/GerHobbelt/linenoise) -- `readline` simile for REPL/interactive runs in a CLI
- **miniscript** [📁](./miniscript) [🌐](https://github.com/GerHobbelt/miniscript) -- the [MiniScript scripting language](http://miniscript.org).
- **mujs** [📁](../../thirdparty/mujs) [🌐](https://github.com/GerHobbelt/mujs) -- a lightweight ES5 Javascript interpreter designed for embedding in other software to extend them with scripting capabilities.
- **newlisp** [📁](./newlisp) [🌐](https://github.com/GerHobbelt/newlisp) -- newLISP is a LISP-like scripting language for doing things you typically do with scripting languages: programming for the internet, system administration, text processing, gluing other programs together, etc. newLISP is a scripting LISP for people who are fascinated by LISP's beauty and power of expression, but who need it stripped down to easy-to-learn essentials. newLISP is LISP reborn as a scripting language: pragmatic and casual, simple to learn without requiring you to know advanced computer science concepts. Like any good scripting language, newLISP is quick to get into and gets the job done without fuss. newLISP has a very fast startup time, is small on resources like disk space and memory and has a deep, practical API with functions for networking, statistics, machine learning, regular expressions, multiprocessing and distributed computing built right into it, not added as a second thought in external modules.
- **owl** [📁](./owl) [🌐](https://github.com/GerHobbelt/owl) -- Owl Lisp is a functional dialect of the Scheme programming language. It is mainly based on the applicative subset of the R7RS standard.
- **picoc** [📁](./picoc) [🌐](https://github.com/GerHobbelt/picoc) -- PicoC is a very small C interpreter for scripting. It was originally written as a script language for a UAV's on-board flight system. It's also very suitable for other robotic, embedded and non-embedded applications. The core C source code is around 3500 lines of code. It's not intended to be a complete implementation of ISO C but it has all the essentials.
- **pybind11** [📁](./pybind11) [🌐](https://github.com/GerHobbelt/pybind11) -- a lightweight header-only library that exposes C++ types in Python and vice versa, mainly to create Python bindings of existing C++ code.
- **QuickJS** [📁](./QuickJS) [🌐](https://github.com/GerHobbelt/quickjs) -- a small and embeddable Javascript engine. It supports the <a href="https://tc39.github.io/ecma262/">ES2020</a> specification including modules, asynchronous generators, proxies and BigInt. It optionally supports mathematical extensions such as big decimal floating point numbers (BigDecimal), big binary floating point numbers (BigFloat) and operator overloading.
  
  - **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
  - **QuickJS-C++-Wrapper** [📁](./QuickJS-C++-Wrapper) [🌐](https://github.com/GerHobbelt/quickjscpp) -- quickjscpp is a header-only wrapper around the [quickjs](https://bellard.org/quickjs/) JavaScript engine, which allows easy integration into C++11 code. This wrapper also automatically tracks the lifetime of values and objects, is exception-safe, and automates clean-up.
  - **QuickJS-C++-Wrapper2** [📁](./QuickJS-C++-Wrapper2) [🌐](https://github.com/GerHobbelt/quickjspp) -- QuickJSPP is QuickJS wrapper for C++. It allows you to easily embed Javascript engine into your program.
  - **txiki** [📁](./txiki.js) [🌐](https://github.com/GerHobbelt/txiki.js) -- uses QuickJS as its kernel

- **replxx** [📁](./replxx) [🌐](https://github.com/GerHobbelt/replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
- **sbcl** [📁](./sbcl) [🌐](https://github.com/GerHobbelt/sbcl) -- SBCL is an implementation of ANSI Common Lisp, featuring a high-performance native compiler, native threads on several platforms, a socket interface, a source-level debugger, a statistical profiler, and much more.
- **ScriptX** [📁](./ScriptX) [🌐](https://github.com/GerHobbelt/ScriptX) -- wrapper for V8, QuickJS, Lua, Python, ...
- **tcl** [📁](./tcl) [🌐](https://github.com/GerHobbelt/tcl) -- the latest **Tcl** source distribution. Tcl provides a powerful platform for creating integration applications that tie together diverse applications, protocols, devices, and frameworks.
- **tclclockmod** [📁](./tclclockmod) [🌐](https://github.com/GerHobbelt/tclclockmod) -- TclClockMod is the fastest, most powerful Tcl clock engine written in C. This Tcl clock extension is the faster Tcl-module for the replacement of the standard "clock" ensemble of tcl.
- **txiki** [📁](./txiki.js) [🌐](https://github.com/GerHobbelt/txiki.js) -- a small and powerful JavaScript runtime. It's built on the shoulders of giants: it uses [QuickJS] as its JavaScript engine, [libuv] as the platform layer, [wasm3] as the WebAssembly engine and [curl] as the HTTP / WebSocket client.
- **VisualScriptEngine** [📁](./VisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngine) -- A visual scripting engine designed for embedding. The engine is written in modern C++ and compiles on several platforms with no external dependencies.
- **wxVisualScriptEngine** [📁](./wxVisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngineWxWidgets) -- a utility module for [VisualScriptEngine](https://github.com/kovacsv/VisualScriptEngine) which provides helper classes for embedding the engine in a wxWidgets application.
- **yasl** [📁](./yasl) [🌐](https://github.com/GerHobbelt/yasl) -- Bytecode Interpreter for Yet Another Scripting Language (YASL).
- ~~**CPython** [🌐](https://github.com/python/cpython)~~
  
  - **removed**; reason: we've decided to offer any application user facing scripting features in JavaScript only: Python and the others can use socket-based messaging when someone wants to write their user scripts in any of those languages.


The additional (and more important) reason to ditch CPython from the R&D set is hairiness of integrating Python into an application as an embedded scripting language, instead of the other way around. With the envisioned advent of ZeroMQ/socket based IPC, any Python scripts can hook into that instead of spending the effort and maintenance of having that large language as an embedded 'assistive' scripting/configuration language: it's simply too huge and complicated. We're not Blender and we don't have the funding.

- ~~**lua** [🌐](https://github.com/lua/lua)~~
  
  - **removed**; reason: we've decided to offer any application user facing scripting features in JavaScript only: Python and the others can use socket-based messaging when someone wants to write their user scripts in any of those languages. See also the `CPython` entry.

- ~~**luaJIT** [🌐](https://github.com/LuaJIT/LuaJIT)~~
  
  - **removed**; reason: see the `lua` entry above.












### QuickJS specific modules & related materials

- **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
- **QuickJS** [📁](./QuickJS) [🌐](https://github.com/GerHobbelt/quickjs) -- a small and embeddable Javascript engine. It supports the <a href="https://tc39.github.io/ecma262/">ES2020</a> specification including modules, asynchronous generators, proxies and BigInt. It optionally supports mathematical extensions such as big decimal floating point numbers (BigDecimal), big binary floating point numbers (BigFloat) and operator overloading.
- **QuickJS-C++-Wrapper** [📁](./QuickJS-C++-Wrapper) [🌐](https://github.com/GerHobbelt/quickjscpp) -- quickjscpp is a header-only wrapper around the [quickjs](https://bellard.org/quickjs/) JavaScript engine, which allows easy integration into C++11 code. This wrapper also automatically tracks the lifetime of values and objects, is exception-safe, and automates clean-up.
- **QuickJS-C++-Wrapper2** [📁](./QuickJS-C++-Wrapper2) [🌐](https://github.com/GerHobbelt/quickjspp) -- QuickJSPP is QuickJS wrapper for C++. It allows you to easily embed Javascript engine into your program.
- **ScriptX** [📁](./ScriptX) [🌐](https://github.com/GerHobbelt/ScriptX) -- wrapper for V8, QuickJS, Lua, Python, ...
- **txiki** [📁](./txiki.js) [🌐](https://github.com/GerHobbelt/txiki.js) -- uses QuickJS as its kernel











## multi-processing core technologies













### CLI: commandline parsing & perusing

- **argparse** [📁](./argparse) [🌐](https://github.com/GerHobbelt/argparse) -- simply include argparse.hpp and start parsing command-line arguments.
- **cli11** [📁](./cli11) [🌐](https://github.com/GerHobbelt/CLI11) -- command line options parser
- **clipp** [📁](./clipp) [🌐](https://github.com/GerHobbelt/clipp) -- commandline parser
  
  - **left-for-dead**; reason: looks really nice, but MSVC coughs up some pretty-hard-to-diagnose compiler errors and warnings. The writer of this library is clearly better versed in writing C++ templating code than *me*, alas. Initial attempts to fix the issues left me in the dirt, humiliated, and reading up on the latest C++ *goodnesses* did not improve my success rate, alas.

- **cxxopts** [📁](./cxxopts) [🌐](https://github.com/GerHobbelt/cxxopts) -- a lightweight C++ option parser library, supporting the standard GNU style syntax for options.
- **tclap** [📁](./tclap) [🌐](https://github.com/GerHobbelt/tclap) -- TCLAP (Templatized Command Line Argument Parser) is a simple C++ library that facilitates parsing command line arguments in a type independent manner. It doesn't conform exactly to either the GNU or POSIX standards, although it is close.
- ~~**clippson** [🌐](https://github.com/heavywatal/clippson) -- commandline parser + JSON data diagnostical dumper~~
  
  - **removed**; reason: deemed cool but unsuitable for our needs. Besides, we intend to use `cli11` instead of `clipp` for that library is easier to read and support is more active there.

- ~~**docopt** [🌐](https://github.com/docopt/docopt.cpp) -- generate documentation for command line options~~
  
  - **removed**; reason: deemed cool but unsuitable for our needs. We intend to use `cli11` instead.












### CPU features & capabilities detection

- **cpuinfo** [📁](./cpuinfo) [🌐](https://github.com/GerHobbelt/cpuinfo) -- CPU & hardware info
- **infoware** [📁](./infoware) [🌐](https://github.com/GerHobbelt/infoware) -- C++ Library for pulling system and hardware information, without hitting the command line.
- **libcpuid** [📁](./libcpuid) [🌐](https://github.com/GerHobbelt/libcpuid) -- CPU & hardware info
- **mammut** [📁](./mammut) [🌐](https://github.com/GerHobbelt/mammut) -- provides an object oriented abstraction of architectural features normally exposed by means of `sysfs` files or CPU registries. It also provides the possibility to manage remote machines by using a client server mechanism.
- **osquery** [📁](./osquery) [🌐](https://github.com/GerHobbelt/osquery) -- a SQL powered operating system instrumentation, monitoring, and analytics framework. `osquery` exposes an operating system as a high-performance relational database.  This allows you to write SQL-based queries to explore operating system data.  With osquery, SQL tables represent abstract concepts such as running processes, loaded kernel modules, open network connections, browser plugins, hardware events or file hashes.
- **pcm** [📁](./pcm) [🌐](https://github.com/GerHobbelt/pcm) -- Intel&reg; Performance Counter Monitor (Intel&reg; PCM) is an application programming interface (API) and a set of tools based on the API to monitor performance and energy metrics of Intel&reg; Core&trade;, Xeon&reg;, Atom&trade; and Xeon Phi&trade; processors. PCM works on Linux, Windows, Mac OS X, FreeBSD, DragonFlyBSD and ChromeOS operating systems.
- **PlatformFolders** [📁](./PlatformFolders) [🌐](https://github.com/GerHobbelt/PlatformFolders) -- a C++ library to look for directories like `My Documents`, `~/.config`, `%APPDATA%`, etc. so that you do not need to write platform-specific code.
- **spy-build-sysinfo** [📁](./spy-build-sysinfo) [🌐](https://github.com/GerHobbelt/spy) -- build system info
- ~~**cpuinfo** [📁](./cpuinfo) [🌐](https://github.com/GerHobbelt/cpuinfo) -- CPU & hardware info~~
  
  - **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.

- ~~**cpu_features** [🌐](https://github.com/google/cpu_features)~~
  
  - **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.

- ~~**cpu_stat** [🌐](https://github.com/vivaladav/cpu-stat)~~
  
  - **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.












### Date & time functionality

- **cctz** [📁](./cctz) [🌐](https://github.com/GerHobbelt/cctz) -- CCTZ contains two libraries that cooperate with `<chrono>` to give C++ programmers all the necessary tools for computing with dates, times, and time zones in a simple and correct manner.
- **date** [📁](./date) [🌐](https://github.com/GerHobbelt/date) -- a combo of several separate C++11/C++14/C++17 libraries, all geared towards formatting and working with date and time stamps in human-centric formats.
- **datetimepp** [📁](./datetimepp) [🌐](https://github.com/GerHobbelt/datetimepp) -- datetime++ is an attempt to port [Python Datetime](https://docs.python.org/3/library/datetime.html) to C++. Finally easy datetime management in C++ !
- **dateutils** [📁](./dateutils) [🌐](https://github.com/GerHobbelt/dateutils) -- a bunch of tools that revolve around fiddling with dates and times on the command line with a strong focus on use cases that arise when dealing with large amounts of financial data.
- **libeternaltimestamp** [📁](./libeternaltimestamp) [🌐](https://github.com/GerHobbelt/libeternaltimestamp) -- provide/encode/decode 64-bit integer timestamps which can encode *any* date/time in the lifetime of our planet from before the Big Bang up to about 3000 AD in the future.











### Misc. core functionality

- **asio** [📁](./asio) [🌐](https://github.com/GerHobbelt/asio) -- a cross-platform C++ library for network and low-level I/O programming that provides developers with a consistent asynchronous model using a modern C++ approach.
  
  Note: (older) Boost.Asio is also included in Boost.

- **binary_search** [📁](./binary_search) [🌐](https://github.com/GerHobbelt/binary_search) -- includes both the most commonly used binary search variant, as first published by Hermann Bottenbruch in 1962, plus several novel variants with improved performance. The most notable variant, the monobound binary search, executes two to four times faster than the standard binary search on arrays smaller than 1 million 32 bit integers: Boundless Binary Search, Doubletapped Binary Search, Monobound Binary Search, Tripletapped Binary Search, Quaternary Binary Search, Monobound Interpolated Binary Search, Adaptive Binary Search.
- **blitsort** [📁](./blitsort) [🌐](https://github.com/GerHobbelt/blitsort) -- Blitsort is an in-place rotate quick/merge sort based on the stable out-of-place merge sort [quadsort](https://github.com/scandum/quadsort), stable out-of-place quicksort [fluxsort](https://github.com/scandum/fluxsort), and unstable in-place [crumsort](https://github.com/scandum/crumsort).
- **capture-thread** [📁](./capture-thread) [🌐](https://github.com/GerHobbelt/capture-thread) -- framework for loggers, tracers, and mockers in multithreaded C++ programs. When developing C++ projects, [instrumentation][instrumentation] is frequently used to collect information from the system, inject information into the system, or both. The role of this information within the system rarely lines up with the actual structure of the project. This library is designed to handle all of these situations with minimal intrusion into your project, and without leaking details in your API. The **Capture Thread Library** is designed around the concept of thread-locality, which allows the sharing of static variables *only within the current thread*. Canonical static variables, on the other hand, are problematic due to ownership and thread-safety issues.
- **colormap-shaders** [📁](./colormap-shaders) [🌐](https://github.com/GerHobbelt/colormap-shaders) -- a collection of shaders to draw color maps.
- **color-util** [📁](./color-util) [🌐](https://github.com/GerHobbelt/color-util) -- a header-only C++11 library for handling colors, including color space converters between RGB, XYZ, Lab, etc. and color difference calculators such as CIEDE2000.
- **coost** [📁](./coost) [🌐](https://github.com/GerHobbelt/coost) -- A tiny boost library in C++11. `coost` (formerly known as `cocoyaxi`) is an elegant and efficient cross-platform C++ base library, it is not as heavy as `boost`, but still provides enough powerful features.
- **cppdap** [📁](./cppdap) [🌐](https://github.com/GerHobbelt/cppdap) -- a C++11 library (["SDK"](https://microsoft.github.io/debug-adapter-protocol/implementors/sdks/)) implementation of the [Debug Adapter Protocol](https://microsoft.github.io/debug-adapter-protocol/), providing an API for implementing a DAP client or server. `cppdap` provides C++ type-safe structures for the full [DAP specification](https://microsoft.github.io/debug-adapter-protocol/specification), and provides a simple way to add custom protocol messages.
- **cpplocate** [📁](./cpplocate) [🌐](https://github.com/GerHobbelt/cpplocate) -- a cross-platform C++ library that provides tools for applications to locate their binary files and data assets, as well as those of dependent modules.
- **cr** [📁](./cr) [🌐](https://github.com/GerHobbelt/cr) -- a single file header-only live reload solution for C, written in C++: simple public API, 3 functions to use only (and another to export); works and tested on Linux, MacOSX and Windows; based on dynamic reloadable binary (.so/.dylib/.dll).
- **crumsort** [📁](./crumsort) [🌐](https://github.com/GerHobbelt/crumsort) -- is a hybrid quicksort / mergesort algorithm. The sort is in-place, unstable, adaptive, branchless, and has exceptional performance.
- **delegate** [📁](./delegate) [🌐](https://github.com/GerHobbelt/delegate) -- an embedded friendly alternative to `std::function`. The main purpose is to store callable things such as free functions, member functions, and functors. Once stored, the delegate can be called without knowledge of the type of stored thing. The `delegate` guarantees no heap allocation and [is `trivially_copyable`](https://en.cppreference.com/w/cpp/named_req/TriviallyCopyable). It will never throw exceptions itself. Intended use is as general callback storage (think function pointer analog). The price to pay is that the delegate only stores a pointer to referenced functor objects or objects to call member functions on. The user needs to handle the lifetime of a referred object. In addition, the delegation object has a smaller footprint compared to common `std::function` implementations, using only 2 pointers (free function pointer and void pointer). This is small enough so that a delegate will use small object optimization.
- **fast_float** [📁](./fast_float) [🌐](https://github.com/GerHobbelt/fast_float) -- fast and exact implementation of the C++ `from_chars` functions for float and double types: 4x faster than `strtod`
- **fluxsort** [📁](./fluxsort) [🌐](https://github.com/GerHobbelt/fluxsort) -- is a stable quicksort / mergesort hybrid algorithm. The sort is stable, adaptive, branchless, and has exceptional performance.
- **highway** [📁](./highway) [🌐](https://github.com/GerHobbelt/highway) -- dependency of JpegXL
- **libcnl** [📁](./libcnl) [🌐](https://github.com/GerHobbelt/cnl) -- The Compositional Numeric Library (CNL) is a C++ library of fixed-precision numeric classes which enhance integers to deliver safer, simpler, cheaper arithmetic types. CNL is particularly well-suited to: (1) compute on energy-constrained environments where FPUs are absent or costly; (2) compute on energy-intensive environments where arithmetic is the bottleneck such as simulations, machine learning applications and DSPs; and (3) domains such as finance where precision is essential.
- **libdi-dependency-injection** [📁](./libdi-dependency-injection) [🌐](https://github.com/GerHobbelt/di) -- \[Boost::ext\].DI :: your C++14 **one header only** Dependency Injection library with no dependencies
- **libffi** [📁](./libffi) [🌐](https://github.com/GerHobbelt/libffi) -- provides a portable, high level programming interface to various calling conventions. This allows a programmer to call any function specified by a call interface description at run time.
- **libpopcnt** [📁](./libpopcnt) [🌐](https://github.com/GerHobbelt/libpopcnt) -- a header-only C/C++ library for counting the number of 1 bits (bit population count) in an array as quickly as possible using specialized CPU instructions.
- **libstb** [📁](./libstb) [🌐](https://github.com/GerHobbelt/stb) -- single-file public domain (or MIT licensed) libraries for C/C++.
- **libwil** [📁](./libwil) [🌐](https://github.com/GerHobbelt/wil) -- The Windows Implementation Libraries (WIL) is a header-only C++ library created to make life easier for developers on Windows through readable type-safe C++ interfaces for common Windows coding patterns.
- **memory** [📁](./memory) [🌐](https://github.com/GerHobbelt/memory) -- the C++ STL allocator model has various flaws. For example, they are fixed to a certain type, because they are almost necessarily required to be templates. So you can't easily share a single allocator for multiple types. In addition, you can only get a copy from the containers and not the original allocator object. At least with C++11 they are allowed to be stateful and so can be made object not instance based. But still, the model has many flaws. Over the course of the years many solutions have been proposed, for example [EASTL]. This library is another. But instead of trying to change the STL, it works with the current implementation.
- **mesh-allocator** [📁](./mesh-allocator) [🌐](https://github.com/GerHobbelt/Mesh) -- Mesh: Compacting Memory Management for C/C++ -- Mesh is a drop in replacement for [malloc(3)](http://man7.org/linux/man-pages/man3/malloc.3.html) that can transparently recover from memory fragmentation without any changes to application code. Mesh is described in detail in a [paper (PDF)](https://github.com/plasma-umass/Mesh/raw/master/mesh-pldi19-powers.pdf) that appeared at PLDI 2019.
- **pdiff** [📁](./pdiff) [🌐](https://github.com/GerHobbelt/pdiff) -- perceptualdiff (pdiff): a program that compares two images using a perceptually based image metric.
- **quadsort** [📁](./quadsort) [🌐](https://github.com/GerHobbelt/quadsort) -- a high performance stable bottom-up adaptive branchless merge sort algorithm.
- **recycle** [📁](./recycle) [🌐](https://github.com/GerHobbelt/recycle) -- an implementation of a simple resource pool for recycling resources in C++.
- **refl-cpp** [📁](./refl-cpp) [🌐](https://github.com/GerHobbelt/refl-cpp) -- static reflection for C++17 (compile-time enumeration, attributes, proxies, overloads, template functions, metaprogramming).
- **result-cpp** [📁](./result-cpp) [🌐](https://github.com/GerHobbelt/result) -- `Result<T, E>` is a modern, simple, and light-weight error-handling alternative to C++ exceptions with a rich feature-set.
- **stx-error-handling** [📁](./stx-error-handling) [🌐](https://github.com/GerHobbelt/STX) -- C++ 17 & C++ 20 error-handling and utility extensions.
- **swig** [📁](./swig) [🌐](https://github.com/GerHobbelt/swig) -- SWIG (Simplified Wrapper and Interface Generator) is a software development tool (code generator) that connects programs written in C and C++ with a variety of high-level programming languages. It is used for building scripting language interfaces to C and C++ programs. SWIG simplifies development by largely automating the task of scripting language integration, allowing developers and users to focus on more important problems.
  
  *[SWIG 🌐](https://swig.readthedocs.io/en/latest/Manual/SWIG.html) was not considered initially; more suitable for RPC than what we have in mind, which is purely data messages enchange. MAY be of use for transitional applications which are mixed-(programming-)language based, e.g. where we want to mix C/C++ and C# in a single Test Application.*

- **tinycolormap** [📁](./tinycolormap) [🌐](https://github.com/GerHobbelt/tinycolormap) -- a header-only, single-file library for colormaps written in C++11.
- ~~**merror** [📁](./merror) [🌐](https://github.com/GerHobbelt/merror) -- a library for error handling in C++ without exceptions.~~
  
  - **removed**; reason: code is non-portable to compilers other than GCC, or at least would require more effort than we're willing to expend on this.












### multi-processing: invoking external applications

- **cpplocate** [📁](./cpplocate) [🌐](https://github.com/GerHobbelt/cpplocate) -- a cross-platform C++ library that provides tools for applications to locate their binary files and data assets, as well as those of dependent modules.
- **cr** [📁](./cr) [🌐](https://github.com/GerHobbelt/cr) -- a single file header-only live reload solution for C, written in C++: simple public API, 3 functions to use only (and another to export); works and tested on Linux, MacOSX and Windows; based on dynamic reloadable binary (.so/.dylib/.dll).
- **createprocess-windows** [📁](./createprocess-windows) [🌐](https://github.com/GerHobbelt/createprocess-windows) -- drive `CreateProcess` Win32 API
- **dlfcn-win32** [📁](./dlfcn-win32) [🌐](https://github.com/GerHobbelt/dlfcn-win32) -- an implementation of `dlfcn` for Windows. `dlfcn` is a set of functions that allows runtime dynamic library loading. It is standardized in the POSIX. Windows also provide similar routines, but not in a POSIX-compatible way. This library attempts to implement a wrapper around the Windows functions to make programs written for POSIX that use dlfcn work in Windows without any modifications.
- **PlatformFolders** [📁](./PlatformFolders) [🌐](https://github.com/GerHobbelt/PlatformFolders) -- a C++ library to look for directories like `My Documents`, `~/.config`, `%APPDATA%`, etc. so that you do not need to write platform-specific code.
- **reproc** [📁](./reproc) [🌐](https://github.com/GerHobbelt/reproc) -- reproc (Redirected Process) is a cross-platform C/C++ library that simplifies starting, stopping and communicating with external programs. The main use case is executing command line applications directly from C or C++ code and retrieving their output.
- **subprocess** [📁](./subprocess) [🌐](https://github.com/GerHobbelt/subprocess) -- cross platform subprocess library for C++ similar to design of Python `subprocess`.
- **subprocess-cpp** [📁](./subprocess-cpp) [🌐](https://github.com/GerHobbelt/subprocess-cpp) -- a no nonsense library for writing shell commands in C++.
- **tiny-process-library** [📁](./tiny-process-library) [🌐](https://github.com/GerHobbelt/tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
- https://github.com/arun11299/cpp-subprocess -- as close as possible to Python2.7 `subprocess` module in dealing with processes.
- https://github.com/pnappa/subprocesscpp -- A header-only library that allows you to execute processes either synchronously or asynchronously, whilst providing input and output handling. No more calling `exec` in C++!
- https://github.com/rajatjain1997/subprocess -- A C++ high level library for running shell processes
- https://github.com/sheredom/subprocess.h -- A one header solution to launching processes and interacting with them for C/C++.











### multi-processing: Promise/A+

The key distinction between Promises/A+ and `std::promise` in C++11 is that Promises/A+ provides non-blocking synchronization (via chaining function objects) and `std::promise` provides blocking synchronization (or polling). Both have their uses and one is not a direct replacement for the other.

IMPORTANT NOTE: there is one major difference, though. Most modern Javascript promises (including JS Native promises) resolve asynchronously, i.e. their `resolve()` method does not directly call the `then()` handlers, but schedules the calls on the next message loop iteration. The same happens when a `then()`/`catch()` handler is attached to an already resolved/rejected promise. This may be a bit less efficient, but makes the behavior symmetric and more predictable. These libraries *SHOULD* resolve synchronously, because they are unaware of the message loop that is used in the application. (Look into task schedulers above for when you need such awareness, e.g. `taskflow`.)

- **asynqro** [📁](./asynqro) [🌐](https://github.com/GerHobbelt/asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.
- **concurrencpp** [📁](./concurrencpp) [🌐](https://github.com/GerHobbelt/concurrencpp) -- the C++ concurrency library: concurrencpp is a tasking library for C++ allowing developers to write highly concurrent applications easily and safely by using tasks, executors and coroutines.
- **libq** [📁](./libq) [🌐](https://github.com/GerHobbelt/q) -- A platform-independent promise library for C++, implementing asynchronous continuations.
- **portable_concurrency-std-future** [📁](./portable_concurrency-std-future) [🌐](https://github.com/GerHobbelt/portable_concurrency) -- Portable implementation of future/promise API in C++. `std::future` done right.
- **promise-cpp** [📁](./promise-cpp) [🌐](https://github.com/GerHobbelt/promise-cpp) -- advanced C++ promise/A+ library in Javascript style
- **promise-hpp** [📁](./promise-hpp) [🌐](https://github.com/GerHobbelt/promise.hpp) -- C++ asynchronous promises like a Promises/A+
- **YACLib** [📁](./YACLib) [🌐](https://github.com/GerHobbelt/YACLib) -- YACLib is a lightweight C++ library for concurrent and parallel task execution.
- https://github.com/alxvasilev/cpp-promise -- Javascript-like C++ promise library
- https://github.com/rhashimoto/poolqueue -- C++ Asynchronous Promises, inspired by Promises/A+.
- https://github.com/YACLib/YACLib -- Yet Another lightweight C++ library for concurrent and parallel task execution.











### multi-processing: running tasks in parallel: multi-processing, multithreading, async, ...

- **asyncplusplus** [📁](./asyncplusplus) [🌐](https://github.com/GerHobbelt/asyncplusplus) -- Async++ is a lightweight concurrency framework for C++11.
- **createprocess-windows** [📁](./createprocess-windows) [🌐](https://github.com/GerHobbelt/createprocess-windows) -- drive `CreateProcess` Win32 API
- **libaco** [📁](./libaco) [🌐](https://github.com/GerHobbelt/libaco) -- a blazing fast and lightweight C asymmetric coroutine library 💎 ⛅🚀⛅🌞 Along with the implementation of a production-ready C coroutine library, it has detailed documentation about how to implement a fastest and correct coroutine library, includes a strict mathematical proof. It has no more than 700 LOC but has the full functionality which you may want from a coroutine library. (The phrase "fastest" here means the fastest context switching implementation which complies to the Sys V ABI of Intel386 or AMD64.)
- **libcopp** [📁](./libcopp) [🌐](https://github.com/GerHobbelt/libcopp) -- cross-platform coroutine library in C++
- **libcsp** [📁](./libcsp) [🌐](https://github.com/GerHobbelt/libcsp) -- a concurrency C library 10x faster than Golang, influenced by the CSP model.
- **libtuv** [📁](./libtuv) [🌐](https://github.com/GerHobbelt/libtuv) -- a multi-platform tiny event library refactored from `libuv` source for IoT and embedded systems.
- **libunifex** [📁](./libunifex) [🌐](https://github.com/GerHobbelt/libunifex) -- a prototype implementation of the C++ sender/receiver async programming model that is currently being considered for standardisation. This project contains implementations of the following: Schedulers, Timers, Asynchronous I/O, Algorithms that encapsulate certain concurrency patterns, Async streams, Cancellation, Coroutine integration.
- **nsync** [📁](./nsync) [🌐](https://github.com/GerHobbelt/nsync) -- a C library that exports various synchronization primitives. `nsync` may be desirable in place of `pthread` primitives in some cases:  (1) nsync locks are reader-writer locks (but are as efficient as mutexes).  (2) nsync locks and condition variables occupy only two words each.  (3) nsync works on Unix-like systems and Windows.  It should be portable to other platforms straightforwardly.  (4) nsync provides conditional critical sections.  These fill the same role as condition variables, but are usually easier to use, and in most common cases are comparable in speed.  They can be easier to use in two ways:  (A) it's not necessary to surround the "wait" operation in a while loop; instead the condition is passed to the call as a function and arbitrary pointer argument.  (B) it's not necessary to wake or signal explicitly when the condition(s) become true; they are checked automatically. The primary downsides are:  (A) they are not available in most other common synchronization APIs, and so they may be unfamiliar (even though they date back to the 1960s), and (B) if threads routinely wait on many distinct, false conditions associated with the same lock, they may be slower than condition variables. In this case, clients can use condition variables in the normal way; conditional critical sections and condition variables can be used with the same lock.  (5) nsync waits can be cancelled via an object passed to the wait calls, unlike the pthread model in which threads are cancelled.  This difference can be useful if the computation needs multiple threads, or if cancellation affects only sub-operations within a larger operation by the thread.
- **oneTBB** [📁](./oneTBB) [🌐](https://github.com/GerHobbelt/oneTBB) -- Intel's Thread Building Blocks library: used with OpenImageIO, ...
- **openpbs** [📁](./openpbs) [🌐](https://github.com/GerHobbelt/openpbs) -- in May 2020, OpenPBS became the new name for the PBS Professional Open Source Project. OpenPBS® software optimizes job scheduling and workload management in high-performance computing (HPC) environments – clusters, clouds, and supercomputers – improving system efficiency and people’s productivity.  Built by HPC people for HPC people, OpenPBS is fast, scalable, secure, and resilient, and supports all modern infrastructure, middleware, and applications.
- **pevents** [📁](./pevents) [🌐](https://github.com/GerHobbelt/pevents) -- Win32 events for *nix/POSIX platforms, built on top of `pthreads`. `pevents` provides most of the functionality of both manual- and auto-reset events on Windows, most-notably including simultaneous waits on multiple events (à la `WaitForMultipleObjects`). `pevents` also doubles as a thin, sane wrapper for `CreateEvent()` & co. on Windows, meaning you can use `pevents` directly in your cross-platform code without `#ifdef`s for Windows/pthreads. While POSIX condition variables (pthread_cond_t) and WIN32 events both provide the essential building blocks of the synchronization primitives required to write multithreaded code with signaling, the nature of the differences between the two have lent their way towards creating different synchronization and multithreaded-programming paradigms. The only features not included are only named events and support for security attributes. To the author's best knowledge, this is the only implementation of WIN32 events available for Linux and other posix platforms that provides support for simultaneously waiting on multiple events. Depending on your needs, we've been told that pevents may be used as a lightweight alternative to libuv/libev while still allowing your code to embrace asynchronous event handling with ease.
- **PhotonLibOS** [📁](./PhotonLibOS) [🌐](https://github.com/GerHobbelt/PhotonLibOS) -- a high-efficiency LibOS framework, based on a set of carefully selected C++ libs. The role of LibOS is to connect user apps and the kernel. Photon's API is as consistent as possible with C++ std and glibc semantics. This flattens the learning curve for lib users and brings convenience when migrating legacy codebases. Photon's runtime is driven by a coroutine lib. Out tests show that it has the best I/O performance in the open source world by the year of 2022, even among different programing languages.
- **pipes** [📁](./pipes) [🌐](https://github.com/GerHobbelt/pipes) -- Pipes are small components for writing expressive code when working on collections. Pipes chain together into a pipeline that receives data from a source, operates on that data, and send the results to a destination. This is a header-only library, implemented in C++14.
- **pthread-win32** [📁](./pthread-win32) [🌐](https://github.com/GerHobbelt/pthread-win32) -- `pthread` for MS Windows
- **subprocess** [📁](./subprocess) [🌐](https://github.com/GerHobbelt/subprocess) -- cross platform subprocess library for C++ similar to design of Python `subprocess`.
- **subprocess_h** [📁](./subprocess_h) [🌐](https://github.com/GerHobbelt/subprocess.h) -- 🐜 a simple one header solution to launching processes and interacting with them for C/C++.
- **tiny-process-library** [📁](./tiny-process-library) [🌐](https://github.com/GerHobbelt/tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
- **transwarp** [📁](./transwarp) [🌐](https://github.com/GerHobbelt/transwarp) -- a header-only C++ library for task concurrency. It allows you to easily create a graph of tasks where every task can be executed synchronously. transwarp is written in C++17 and only depends on the standard library.
- https://github.com/arun11299/cpp-subprocess -- as close as possible to Python2.7 `subprocess` module in dealing with processes.
- https://github.com/pnappa/subprocesscpp -- A header-only library that allows you to execute processes either synchronously or asynchronously, whilst providing input and output handling. No more calling `exec` in C++!
- https://github.com/rajatjain1997/subprocess -- A C++ high level library for running shell processes
- https://github.com/sheredom/subprocess.h -- A one header solution to launching processes and interacting with them for C/C++.











### multi-processing: event handling, signals, asynchronous operation

- **eventpp** [📁](./eventpp) [🌐](https://github.com/GerHobbelt/eventpp) -- a C++ event library for callbacks, event dispatcher, and event queue. With eventpp you can easily implement signal and slot mechanism, publisher and subscriber pattern, or observer pattern.
- **libevent** [📁](./libevent) [🌐](https://github.com/GerHobbelt/libevent) -- _libevent_ is meant to replace the event loop found in event driven network servers.
  
  Currently, _libevent_ supports _[/dev/poll](http://download.oracle.com/docs/cd/E19253-01/816-5177/6mbbc4g9n/index.html)_, _[kqueue(2)](http://www.freebsd.org/cgi/man.cgi?query=kqueue&apropos=0&sektion=0&format=html)_, _[event ports](http://developers.sun.com/solaris/articles/event_completion.html)_, [POSIX _select(2)_](http://manpages.debian.net/cgi-bin/man.cgi?query=select), [Windows _select()_](http://msdn.microsoft.com/en-us/library/ms740141(v=vs.85).aspx), [_poll(2)_](http://manpages.debian.net/cgi-bin/man.cgi?query=poll), and _[epoll(4)](http://www.xmailserver.org/linux-patches/epoll.txt)_. The internal event mechanism is completely independent of the exposed event API, and a simple update of libevent can provide new functionality without having to redesign the applications. As a result, _Libevent_ allows for portable application development and provides the most scalable event notification mechanism available on an operating system. Libevent can also be used for multi-threaded applications, either by isolating each `event_base` so that only a single thread accesses it, or by locked access to a single shared `event_base`. _Libevent_ should compile on Linux, *BSD, Mac OS X, Solaris, Windows, and more.
  
  Libevent additionally provides a sophisticated framework for buffered network IO, with support for sockets, filters, rate-limiting, SSL, zero-copy file transmission, and IOCP. Libevent includes support for several useful protocols, including DNS, HTTP, and a minimal RPC framework.

- **libocca** [📁](./libocca) [🌐](https://github.com/GerHobbelt/occa) -- a portable and vendor neutral framework for parallel programming on heterogeneous platforms. The OCCA API provides unified models for heterogeneous programming concepts&mdash;such as a device, memory, or kernel&mdash;while the OCCA Kernel Language (OKL) enables the creation of portable device kernels using a directive-based extension to the C-language.
- **libsigcplusplus** [📁](./libsigcplusplus) [🌐](https://github.com/GerHobbelt/libsigcplusplus) -- libsigc++ : The Typesafe Callback Framework for C++. It allows you to define signals and to connect those signals to any callback function, either global or a member function, regardless of whether it is static or virtual.
- **libuv** [📁](./libuv) [🌐](https://github.com/GerHobbelt/libuv) -- a multi-platform support library with a focus on asynchronous I/O.
  
  Feature highlights:
  
  * Full-featured event loop backed by epoll, kqueue, IOCP, event ports.
  * Asynchronous TCP and UDP sockets
  * Asynchronous DNS resolution
  * Asynchronous file and file system operations
  * File system events
  * ANSI escape code controlled TTY
  * IPC with socket sharing, using Unix domain sockets or named pipes (Windows)
  * Child processes
  * Thread pool
  * Signal handling
  * High resolution clock
  * Threading and synchronization primitives

- **Signals** [📁](./Signals) [🌐](https://github.com/GerHobbelt/Signals) -- a lightweight "signals and slots" implementation using fast delegates. When GUI programming in C++, delegates and the signals and slots paradigm can vastly simplify your code. It implements the Observer pattern while avoiding all the boilerplate code. I needed a lightweight and efficient implementation that I could just drop into my projects and use without adding weird macros, inheriting from crazy templates or having external dependencies. I wanted something simpler and more efficient than libsigc++, sigslot, and boost.signals.











### multi-processing: task schedulers

- **asynqro** [📁](./asynqro) [🌐](https://github.com/GerHobbelt/asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.
- **enkiTS** [📁](./enkiTS-TaskScheduler) [🌐](https://github.com/GerHobbelt/enkiTS) -- a permissively licensed C++11 Task Scheduler for creating parallel programs. The primary goal of enkiTS is to help developers create programs which handle both data and task level parallelism to utilize the full performance of multicore CPUs, whilst being lightweight (only a small amount of code) and easy to use.
  
  Features:
  
    - Braided parallelism - can issue tasks from another task as well as from the thread which created the Task System, and has a simple task interface for both data and task parallelism.
    - Can pin tasks to a given thread - can schedule a task which will only be run on the specified thread.
    - Can register external threads to use with enkiTS
    - Can set task priorities - Up to 5 task priorities can be configured via define ENKITS_TASK_PRIORITIES_NUM (defaults to 3). Higher priority tasks are run before lower priority ones.
    - Can wait for pinned tasks - useful for creating IO threads which do no other work.
    - Completion Actions - can perform an action on task completion. This avoids the expensive action of adding the task to the scheduler, and can be used to safely delete a completed task.
    - Dependencies - can set dependencies between tasks.
    - Fast, then scalable - designed for consumer devices first, so performance on a low number of threads is important, followed by scalability.
    - Lightweight
    - Up-front Allocation friendly - designed for zero allocations during scheduling.

- **google::marl** [📁](./google-marl) [🌐](https://github.com/GerHobbelt/marl) -- a hybrid thread / fiber task scheduler written in C++ 11. Marl uses a combination of fibers and threads to allow efficient execution of tasks that can block, while keeping a fixed number of hardware threads.
- **taskflow** [📁](./taskflow) [🌐](https://github.com/GerHobbelt/taskflow) -- Quickly write parallel and heterogeneous task programs in modern C++. Taskflow is faster, more expressive, and easier for drop-in integration than many of existing task programming frameworks in handling complex parallel workloads.
- **transwarp** [📁](./transwarp) [🌐](https://github.com/GerHobbelt/transwarp) -- a header-only C++ library for task concurrency. It allows you to easily create a graph of tasks where every task can be executed synchronously. transwarp is written in C++17 and only depends on the standard library.











### multi-processing: thread pools

- **concurrencpp** [📁](./concurrencpp) [🌐](https://github.com/GerHobbelt/concurrencpp) -- the C++ concurrency library: concurrencpp is a tasking library for C++ allowing developers to write highly concurrent applications easily and safely by using tasks, executors and coroutines.
- **concurrentqueue** [📁](./concurrentqueue) [🌐](https://github.com/GerHobbelt/concurrentqueue) -- moodycamel::ConcurrentQueue, an industrial-strength and fast multi-producer, multi-consumer lock-free concurrent queue for C++11.
- **CTPL-Thread-Pool** [📁](./CTPL-Thread-Pool) [🌐](https://github.com/GerHobbelt/CTPL) -- Modern and efficient C++ Thread Pool Library. More specifically, there are some threads dedicated to the pool and a container of jobs. The jobs come to the pool dynamically. A job is fetched and deleted from the container when there is an idle thread. The job is then run on that thread.
- **pthreadpool** [📁](./pthreadpool) [🌐](https://github.com/GerHobbelt/pthreadpool) -- pthreadpool is a portable and efficient thread pool implementation. It provides similar functionality to `#pragma omp parallel for`, but with additional features.
- **thread-pool** [📁](./thread-pool) [🌐](https://github.com/GerHobbelt/thread-pool) -- `BS::thread_pool`: a fast, lightweight, and easy-to-use C++17 thread pool library (by Barak Shoshany)
- **thread-pool-c** [📁](./thread-pool-c) [🌐](https://github.com/GerHobbelt/C-Thread-Pool) -- a minimal but advanced threadpool implementation.
- **thread-pool-cpp** [📁](./thread-pool-cpp) [🌐](https://github.com/GerHobbelt/thread-pool-cpp) -- highly scalable and fast thread pool. It implements both work-stealing and work-distribution balancing startegies. It implements cooperative scheduling strategy.
- **YACLib** [📁](./YACLib) [🌐](https://github.com/GerHobbelt/YACLib) -- YACLib is a lightweight C++ library for concurrent and parallel task execution.











### run-time library core features: logging, formatting, ...

- **easyloggingpp** [📁](./easyloggingpp) [🌐](https://github.com/GerHobbelt/easyloggingpp) -- Easylogging++ is single header efficient logging library for C++ applications. It is extremely powerful, highly extendable and configurable to user's requirements. It provides ability to write your own _sinks_ (via a feature referred as `LogDispatchCallback`).
- **expected-lite** [📁](./expected-lite) [🌐](https://github.com/GerHobbelt/expected-lite) -- a single-file header-only library to represent value objects that either contain a valid value or an error. The library is a partly implementation of the proposal for [`std::expected`](https://en.cppreference.com/w/cpp/utility/expected) for use with C++11 and later.
- **fast_float** [📁](./fast_float) [🌐](https://github.com/GerHobbelt/fast_float) -- fast and exact implementation of the C++ `from_chars` functions for float and double types: 4x faster than `strtod`
- **fluent-bit** [📁](./fluent-bit) [🌐](https://github.com/GerHobbelt/fluent-bit) -- [Fluent Bit](http://fluentbit.io) is a fast Log Processor and Forwarder for Linux, Windows, Embedded Linux, MacOS and BSD family operating systems. It's part of the Graduated [Fluentd](http://fluentd.org) Ecosystem and a [CNCF](https://cncf.io) sub-project. Fluent Bit allows to collect log events or metrics from different sources, process them and deliver them to different backends such as [Fluentd](http://fluentd.org), Elasticsearch, Splunk, DataDog, Kafka, New Relic, Azure services, AWS services, Google services, NATS, InfluxDB or any custom HTTP end-point.
- **fmt** [📁](./fmt) [🌐](https://github.com/GerHobbelt/fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
- **fmtlog** [📁](./fmtlog) [🌐](https://github.com/GerHobbelt/fmtlog) -- a performant fmtlib-style logging library with latency in nanoseconds (i.e. using fmt library format).
- **frozen** [📁](./frozen) [🌐](https://github.com/GerHobbelt/frozen) -- provides 0 cost initialization for immutable containers, fixed-size containers, and various algorithms.
- **hedley** [📁](./hedley) [🌐](https://github.com/GerHobbelt/hedley) -- a C/C++ header file designed to smooth over some platform-specific annoyances.
- **hypertextcpp** [📁](./hypertextcpp) [🌐](https://github.com/GerHobbelt/hypertextcpp) -- string/text template engine & source-to-source compiler.
- **libquill** [📁](./libquill) [🌐](https://github.com/GerHobbelt/quill) -- a cross-platform low latency logging library based on C++14.
- **libscanf** [📁](./libscanf) [🌐](https://github.com/GerHobbelt/scnlib) -- a modern C++ library for replacing `scanf` and `std::istream`. This library attempts to move us ever so closer to replacing `iostream`s and C stdio altogether. It's faster than `iostream` (see Benchmarks) and type-safe, unlike `scanf`. Think [{fmt}](https://github.com/fmtlib/fmt) but in the other direction.
- **libwil** [📁](./libwil) [🌐](https://github.com/GerHobbelt/wil) -- The Windows Implementation Libraries (WIL) is a header-only C++ library created to make life easier for developers on Windows through readable type-safe C++ interfaces for common Windows coding patterns.
- **libxo** [📁](./libxo) [🌐](https://github.com/GerHobbelt/libxo) -- `libxo` allows an application to generate text, XML, JSON, and HTML output using a common set of function calls (rather than the application using old skool `printf()`).  The application decides at run time which output style should be produced.
- **lnav** [📁](./lnav) [🌐](https://github.com/GerHobbelt/lnav) -- the Log File Navigator, **lnav** for short, is an advanced log file viewer for the small-scale.  It is a terminal application that can understand your log files and make it easy for you to find problems with little to no setup.
- **magic_enum** [📁](./magic_enum) [🌐](https://github.com/GerHobbelt/magic_enum) -- Header-only C++17 library provides static reflection for enums; works with any enum type without any macro or boilerplate code.
- **messagebox-windows** [📁](./messagebox-windows) [🌐](https://github.com/GerHobbelt/messagebox-windows) -- drive `MessageBox` and `MessageBeep` Win32 APIs
- **microsoft-performance-toolkit-sdk** [📁](./microsoft-performance-toolkit-sdk) [🌐](https://github.com/GerHobbelt/microsoft-performance-toolkit-sdk) -- The Microsoft Performance Toolkit is a collection of cross-platform tools developers can use to create and extend performance analysis applications. It serves as the runtime of the Windows Performance Analyzer, a Windows program included in the Windows Performance Toolkit. By using the Microsoft Performance Toolkit SDK, Windows Performance Analyzer - or any performance analysis application - can be configured to process and display performance data from arbitrary sources.
- **NanoLog** [📁](./NanoLog) [🌐](https://github.com/GerHobbelt/NanoLog) -- an extremely performant nanosecond scale logging system for C++ that exposes a simple printf-like API and achieves over 80 million logs/second at a median latency of just over 7 nanoseconds.
- **numero** [📁](./numero) [🌐](https://github.com/GerHobbelt/numero) -- a library which parses/extracts a decimal number, either integer or floating-point, either in scientific notation or not, from the given input string. It uses the thousands and decimal separator symbols given in the conversion options. It also provides methods for the inverse operation, i.e. converting a value to a (English) human-readable text, e.g. "one thousand and twenty four" for `1024`.
- **oppat** [📁](./oppat) [🌐](https://github.com/GerHobbelt/oppat) -- Open Power/Performance Analysis Tool (OPPAT) is a cross-OS, cross-architecture Power and Performance Analysis Tool. cross-OS: supports Windows ETW trace files and Linux/Android perf/trace-cmd trace files. cross-architecture: supports Intel and ARM chips hardware events (using perf and/or PCM).
- **pcg-cpp-random** [📁](./pcg-cpp-random) [🌐](https://github.com/GerHobbelt/pcg-cpp) -- a C++ implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
- **pcg-c-random** [📁](./pcg-c-random) [🌐](https://github.com/GerHobbelt/pcg-c) -- a C implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
- **plf_nanotimer** [📁](./plf_nanotimer) [🌐](https://github.com/GerHobbelt/plf_nanotimer) -- high precision cross-platform performance timer
- **prio_queue** [📁](./prio_queue) [🌐](https://github.com/GerHobbelt/prio_queue) -- a cache friendly priority queue, done as a B-heap.
- **randen** [📁](./randen) [🌐](https://github.com/GerHobbelt/randen) -- What if we could default to attack-resistant random generators without excessive CPU cost? We introduce 'Randen', a new generator with security guarantees; it outperforms MT19937, pcg64_c32, Philox, ISAAC and ChaCha8 in real-world benchmarks. This is made possible by AES hardware acceleration and a large Feistel permutation.
- **random** [📁](./random) [🌐](https://github.com/GerHobbelt/random) -- random for modern C++ with a convenient API.
- **refl-cpp** [📁](./refl-cpp) [🌐](https://github.com/GerHobbelt/refl-cpp) -- static reflection for C++17 (compile-time enumeration, attributes, proxies, overloads, template functions, metaprogramming).
- **result-cpp** [📁](./result-cpp) [🌐](https://github.com/GerHobbelt/result) -- `Result<T, E>` is a modern, simple, and light-weight error-handling alternative to C++ exceptions with a rich feature-set.
- **spdlog** [📁](./spdlog) [🌐](https://github.com/GerHobbelt/spdlog) -- very fast, header-only/compiled, C++ logging library.
- **spdlog_setup** [📁](./spdlog_setup) [🌐](https://github.com/GerHobbelt/spdlog_setup) -- file-based setup library for convenience in initializing spdlog.
- **sqlplot-tools** [📁](./sqlplot-tools) [🌐](https://github.com/GerHobbelt/sqlplot-tools) -- a tool to **process data series** from algorithm experiments **using SQL statements** and embed the results in **gnuplot** datafiles or **pgfplots** LaTeX files. Using SQL to generate plots can be see as **cracking a nut with a sledgehammer**, but it really works well in practice.
- **stdext-path** [📁](./stdext-path) [🌐](https://github.com/GerHobbelt/stdext-path) -- path manipulations (`dirname` et al)
  
  - **taolog** [📁](./taolog) [🌐](https://github.com/GerHobbelt/taolog) -- A Win32 logger based on DebugView & ETW.

- **stx-error-handling** [📁](./stx-error-handling) [🌐](https://github.com/GerHobbelt/STX) -- C++ 17 & C++ 20 error-handling and utility extensions.
- **TraceETW** [📁](./TraceETW) [🌐](https://github.com/GerHobbelt/TraceEtw) -- [Event Tracing for Windows (ETW)](http://msdn.microsoft.com/en-us/library/windows/desktop/aa363668(v=vs.85).aspx) is  powerful but notoriously complex. In C#, [EventSource](http://msdn.microsoft.com/en-us/library/system.diagnostics.tracing.eventsource(v=vs.110).aspx) made that technology much more approachable. This project aims at providing a similar solution for C++, both for Desktop apps and for Windows/Windows Phone Universal Store apps.
- ~~**merror** [📁](./merror) [🌐](https://github.com/GerHobbelt/merror) -- a library for error handling in C++ without exceptions.~~
  
  - **removed**; reason: code is non-portable to compilers other than GCC, or at least would require more effort than we're willing to expend on this.












## web servers, generic sockets I/O (IPC)

- **civetweb** [📁](./civetweb) [🌐](https://github.com/GerHobbelt/civetweb) -- an easy to use, powerful, C (C/C++) embeddable web server with optional CGI, SSL and Lua support.
- **crow** [📁](./crow) [🌐](https://github.com/GerHobbelt/crow) -- IPC / server framework
- **drogon** [📁](./drogon) [🌐](https://github.com/GerHobbelt/drogon) -- a C++14/17-based HTTP application framework to easily build various types of web application server programs.
- **proxygen** [📁](./proxygen) [🌐](https://github.com/GerHobbelt/proxygen) -- the core C++ HTTP abstractions used at Facebook. Internally, it is used as the basis for building many HTTP servers, proxies, and clients, focusing on the common HTTP abstractions and our simple HTTPServer framework. The framework supports HTTP/1.1, SPDY/3, SPDY/3.1, HTTP/2, and HTTP/3.
- **wget** [📁](./wget) [🌐](https://github.com/GerHobbelt/wget) -- GNU Wget is a free utility for non-interactive download of files from the Web.  It supports HTTP, HTTPS, and FTP protocols, as well as retrieval through HTTP proxies.
- ~~**h2o-server** [📁](./h2o-server) [🌐](https://github.com/GerHobbelt/h2o) -- an optimized HTTP/1, HTTP/2, HTTP/3 server.~~
  
  - **removed**; reason: we've decided on using `crow` as the main server framework. Second choice is `civetweb`. As we're looking for a non-public-facing web server, we don't need h2o and it's complexity.

- ~~**libmicrohttpd** [🌐](https://github.com/Karlson2k/libmicrohttpd)~~
  
  - **removed**; reason: we've decided on using `crow` as the main server framework. Second choices are `civetweb` and `h2o`. This GNU library is way too 'Unix-is-the-world' oriented for a smooth portable dev experience.

- ~~**oatpp** [🌐](https://github.com/oatpp/oatpp) -- IPC / server framework~~
  
  - **removed**; reason: we've decided on using `crow` as the main server framework.












## socket I/O: websockets

- **libwebsocketpp** [📁](./libwebsocketpp) [🌐](https://github.com/GerHobbelt/websocketpp) -- WebSocket++ is a header only C++ library that implements RFC6455 The WebSocket Protocol.
- **libwebsockets** [📁](./libwebsockets) [🌐](https://github.com/GerHobbelt/libwebsockets) -- a simple-to-use C library providing client and server for HTTP/1, HTTP/2, WebSockets, MQTT and other protocols. It supports a lot of lightweight ancilliary implementations for things like JSON, CBOR, JOSE, COSE. It's very gregarious when it comes to event loop sharing, supporting libuv, libevent, libev, sdevent, glib and uloop, as well as custom event libs.
- **websocket-sharp** [📁](./websocket-sharp) [🌐](https://github.com/GerHobbelt/websocket-sharp) -- a C# implementation of the WebSocket protocol client and server.











## disk I/O, monitoring import locations, ...

- **asio** [📁](./asio) [🌐](https://github.com/GerHobbelt/asio) -- a cross-platform C++ library for network and low-level I/O programming that provides developers with a consistent asynchronous model using a modern C++ approach.
  
  Note: (older) Boost.Asio is also included in Boost.

- **cpplocate** [📁](./cpplocate) [🌐](https://github.com/GerHobbelt/cpplocate) -- a cross-platform C++ library that provides tools for applications to locate their binary files and data assets, as well as those of dependent modules.
- **dirent** [📁](./dirent) [🌐](https://github.com/GerHobbelt/dirent) -- POSIX `dirent.h` ported to MS Windows (Win32/Win64); used by several libraries.
- **efsw** [📁](./efsw) [🌐](https://github.com/GerHobbelt/efsw) -- cross-platform file system watcher and notifier
- **FastGlobbing** [📁](./FastGlobbing) [🌐](https://github.com/GerHobbelt/FastGlobbing) -- a Fast String Matching with Wildcards, Globs, and Gitignore-Style Globs. Wildcard string matching and globbing isn’t as trivial as it may seem at first.  In fact, mistakes in the past resulted in serious vulnerabilities such as denial of service due to exponential blow-up in execution time. This fast non-recursive algorithm performs safe gitignore-style wildcard matching.  Implementations in C, C++, Java, Javascript and Python are included.
- **filesystem** [📁](./filesystem) [🌐](https://github.com/GerHobbelt/filesystem) -- a header-only single-file `std::filesystem` compatible helper library, based on the C++17 and C++20 specs, but implemented for C++11, C++14, C++17 or C++20 (tightly following the C++17 standard with very few documented exceptions). It is of course in its own namespace `ghc::filesystem` to not interfere with a regular `std::filesystem` should you use it in a mixed C++17 environment (which is possible).
- **fswatch** [📁](./fswatch) [🌐](https://github.com/GerHobbelt/fswatch) -- a cross-platform file change monitor that receives notifications when the contents of the specified files or directories are modified.
- **glob** [📁](./glob) [🌐](https://github.com/GerHobbelt/glob) -- directory scanner
- **libwildmatch** [📁](./libwildmatch) [🌐](https://github.com/GerHobbelt/wildmatch) -- wildmatch is a BSD-licensed C/C++ library for git/rsync-style pattern matching.
- **tinydir** [📁](./tinydir) [🌐](https://github.com/GerHobbelt/tinydir) -- lightweight, portable and easy to integrate C directory and file reader. TinyDir wraps `dirent` for POSIX and `FindFirstFile` for Windows. Windows unicode is supported.
- **Win32_read_directory_changes** [📁](./Win32_read_directory_changes) [🌐](https://github.com/GerHobbelt/readdirectorychanges) -- sample code which goes with [Understanding ReadDirectoryChangesW](http://qualapps.blogspot.com/2010/05/understanding-readdirectorychangesw.html)
- **Win32_read_directory_changes_IOCP** [📁](./Win32_read_directory_changes_IOCP) [🌐](https://github.com/GerHobbelt/ReadDirectoryChangesIOCP) -- inspired by jimbeveridge's artical [Understanding ReadDirectoryChangesW](http://qualapps.blogspot.com/2010/05/understanding-readdirectorychangesw.html)! The project shows how to read directory changes by IO completion port on windows platform.











## configuration / parameterization

- **gflags** [📁](./gflags) [🌐](https://github.com/GerHobbelt/gflags) -- google::flags library, used by other libs in this set.
- **libconfig** [📁](./libconfig) [🌐](https://github.com/GerHobbelt/libconfig) -- generic config (file) reader/writer
- **libparameters** [📁](./libparameters) [🌐](https://github.com/GerHobbelt/libparameters) -- use C++ runtime configurable typed parameters as if they were native types, while you can track read/write access/usage of each in your code sections for improved diagnostics of your application's behaviour. Used in enhanced tesseract, f.e.
- **libucl** [📁](./libucl) [🌐](https://github.com/GerHobbelt/libucl) -- the configuration language called UCL - Universal Configuration Language.  UCL is heavily infused by nginx configuration as the example of a convenient configuration system. However, UCL is fully compatible with JSON format and is able to parse json files.











### TOML

- **cpptoml** [📁](./cpptoml) [🌐](https://github.com/GerHobbelt/cpptoml) -- a header-only library for parsing [TOML][toml] configuration files. This includes support for the new DateTime format, inline tables, multi-line basic and raw strings, digit separators, hexadecimal integers, octal integers, binary integers, and float special values.
- **toml11** [📁](./toml11) [🌐](https://github.com/GerHobbelt/toml11) -- a C++11 header-only TOML parser/encoder depending only on C++ standard library, compatible to the latest version of [TOML v1.0.0](https://toml.io/en/v1.0.0), including UTF-8 support.
- **tomlpp** [📁](./tomlpp) [🌐](https://github.com/GerHobbelt/tomlplusplus) -- TOML++











### YAML

- **libcyaml** [📁](./libcyaml) [🌐](https://github.com/GerHobbelt/libcyaml) -- a C library for reading and writing structured YAML documents. The fundamental idea behind CYAML is to allow applications to construct schemas which describe both the permissible structure of the YAML documents to read/write, and the C data structure(s) in which the loaded data is arranged in memory.
- **libfyaml** [📁](./libfyaml) [🌐](https://github.com/GerHobbelt/libfyaml) -- a fancy 1.2 YAML and JSON parser/writer. Fully feature complete YAML parser and emitter, supporting the latest YAML spec and passing the full YAML testsuite. It is designed to be very efficient, avoiding copies of data, and has no artificial limits like the 1024 character limit for implicit keys.
- **libyaml** [📁](./libyaml) [🌐](https://github.com/GerHobbelt/libyaml) -- YAML
- **libyaml-examples** [📁](./libyaml-examples) [🌐](https://github.com/GerHobbelt/libyaml-examples) -- a small set of C language example programs to demonstrate how to use the [libyaml library](http://pyyaml.org/wiki/LibYAML).
- **rapidyaml** [📁](./rapidyaml) [🌐](https://github.com/GerHobbelt/rapidyaml) -- *Rapid YAML*, or `ryml`, for short. ryml is a C++ library to parse and emit YAML, and do it fast, on everything from x64 to bare-metal chips without operating system. `ryml` parses both read-only and in-situ source buffers; the resulting data nodes hold only views to sub-ranges of the source buffer. No string copies or duplications are done, and no virtual functions are used. The data tree is a flat index-based structure stored in a single array. Serialization happens only at your direct request, after parsing / before emitting. Internally, the data tree representation stores only string views and has no knowledge of types, but of course, every node can have a YAML type tag. `ryml` makes it easy and fast to read and modify the data tree.
- **yaml-cpp** [📁](./yaml-cpp) [🌐](https://github.com/GerHobbelt/yaml-cpp) -- a YAML parser and emitter in C++ matching the YAML 1.2 spec.
- **yaml-test-suite** [📁](./yaml-test-suite) [🌐](https://github.com/GerHobbelt/yaml-test-suite) -- comprehensive Test Suite for YAML











### INI

- ~~**inih** [🌐](https://github.com/benhoyt/inih)~~
  
  - **removed**; reason: we've decided on using `libconfig` for configuration files.

- ~~**iniparser** [🌐](https://github.com/ndevilla/iniparser)~~
  
  - **removed**; reason: we've decided on using `libconfig` for configuration files.












## testing, benchmarking & fuzzing

- **ApprovalTestsCpp** [📁](./ApprovalTestsCpp) [🌐](https://github.com/GerHobbelt/ApprovalTests.cpp) -- Approval Tests for C++: also known as **Golden Master Tests** or **Snapshot Testing**, Approval Tests are an alternative to asserts.
- **BoxFort** [📁](./BoxFort) [🌐](https://github.com/GerHobbelt/BoxFort) -- a simple, cross-platform sandboxing C library powering [Criterion](https://github.com/Snaipe/Criterion). BoxFort provides a simple API to run user code in isolated processes. The main goal of this project **is not** security, but portable code isolation -- if you want complete system isolation, consider using properly configured containers.
- **Criterion** [📁](./Criterion) [🌐](https://github.com/GerHobbelt/Criterion) -- a dead-simple, yet extensible, C and C++ unit testing framework.
- **cxxtest** [📁](./cxxtest) [🌐](https://github.com/GerHobbelt/cxxtest) -- a unit testing framework for C++ that is similar in spirit to JUnit, CppUnit, and xUnit. CxxTest is easy to use because it does not require precompiling a CxxTest testing library, it employs no advanced features of C++ (e.g. RTTI) and it supports a very flexible form of test discovery.
- **cxxtest_catch_2_gtest** [📁](./cxxtest_catch_2_gtest) [🌐](https://github.com/GerHobbelt/cxxtest_catch_2_gtest) -- quick & dirty converter from various test suites to googletest, i.e. allows us to use a single test framework, despite some libraries having been set up to use another, e.g. [Catch2](https://github.com/catchorg/Catch2).
- **doctest** [📁](./doctest) [🌐](https://github.com/GerHobbelt/doctest) -- a C++ testing framework, by far the fastest both in compile times (by [**orders of magnitude**](doc/markdown/benchmarks.md)) and runtime compared to other feature-rich alternatives.
- **dtoa-benchmark** [📁](./dtoa-benchmark) [🌐](https://github.com/GerHobbelt/dtoa-benchmark) -- This benchmark evaluates the performance of conversion from double precision IEEE-754 floating point (double) to ASCII string.
- **gbenchmark** [📁](./gbenchmark) [🌐](https://github.com/GerHobbelt/benchmark) -- a library to benchmark code snippets, similar to unit tests.
- **googletest** [📁](./googletest) [🌐](https://github.com/GerHobbelt/googletest) -- unit test framework: see the [GoogleTest User's Guide](https://google.github.io/googletest/) for documentation. We recommend starting with the [GoogleTest Primer](https://google.github.io/googletest/primer.html).
  
  Features:
  
  * An [xUnit](https://en.wikipedia.org/wiki/XUnit) test framework.
  * Test discovery.
  * A rich set of assertions.
  * User-defined assertions.
  * Death tests.
  * Fatal and non-fatal failures.
  * Value-parameterized tests.
  * Type-parameterized tests.
  * Various options for running the tests.
  * XML test report generation.

- **honggfuzz** [📁](./honggfuzz) [🌐](https://github.com/GerHobbelt/honggfuzz) -- a security oriented, feedback-driven, evolutionary, easy-to-use fuzzer with interesting analysis options.
- **libassert** [📁](./libassert) [🌐](https://github.com/GerHobbelt/libassert) -- the most over-engineered and overpowered C++ assertion library. **Library philosophy**: Provide as much helpful diagnostic info as possible.
- **resumable-assert** [📁](./resumable-assert) [🌐](https://github.com/GerHobbelt/resumable-assert) -- `assert` replacement to continue execution in debugger. In any large app, it sometimes happens that some asserts are failing in code you don't currently care about, and blocking the entire team from being able to run the app until the issue is fixed is not the best workflow. So we usually end up moving the execution marker past the assert line in IDE or debugger, or even comment the assert out, recompile and relaunch. With Resumable Assert, you can simply continue execution when an assertion fails in debugger, or even disable asserts that you are not interested in, so that those never bother you again.
- **Verify** [📁](./Verify) [🌐](https://github.com/GerHobbelt/Verify) -- a snapshot tool that simplifies the assertion of complex data models and documents. Verify is called on the test result during the assertion phase. It serializes that result and stores it in a file that matches the test name. On the next test execution, the result is again serialized and compared to the existing file. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new result.











## logging & debugging

- **binlog** [📁](./binlog) [🌐](https://github.com/GerHobbelt/binlog) -- a high performance C++ log library to produce structured binary logs.
- **breakpad** [📁](./breakpad) [🌐](https://github.com/GerHobbelt/breakpad) -- a set of client and server components which implement a crash-reporting system.
  
  - **left-for-dead**; reason: nice idea, but slightly too GCC specific. has some GCC + Linux specific coding constructs: intrinsics + Linux-only API calls, which increase the cost of porting.

- **capture-thread** [📁](./capture-thread) [🌐](https://github.com/GerHobbelt/capture-thread) -- framework for loggers, tracers, and mockers in multithreaded C++ programs. When developing C++ projects, [instrumentation][instrumentation] is frequently used to collect information from the system, inject information into the system, or both. The role of this information within the system rarely lines up with the actual structure of the project. This library is designed to handle all of these situations with minimal intrusion into your project, and without leaking details in your API. The **Capture Thread Library** is designed around the concept of thread-locality, which allows the sharing of static variables *only within the current thread*. Canonical static variables, on the other hand, are problematic due to ownership and thread-safety issues.
- **fmt** [📁](./fmt) [🌐](https://github.com/GerHobbelt/fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
- **g3log** [📁](./g3log) [🌐](https://github.com/GerHobbelt/g3log) -- G3log is an asynchronous logger with three main features: 
  
  1. Intuitive `LOG(...)` API
  2. `Design-by-contract` `CHECK(...)` functionality
  3. Fatal crash handling for graceful shutdown of the logged process without loosing any log details up to the point of the crash.

- **glog** [📁](./glog) [🌐](https://github.com/GerHobbelt/glog) -- Google Logging is a C++98 library that implements application-level logging. The library provides logging APIs based on C++-style streams and various helper macros.
- **libassert** [📁](./libassert) [🌐](https://github.com/GerHobbelt/libassert) -- the most over-engineered and overpowered C++ assertion library. **Library philosophy**: Provide as much helpful diagnostic info as possible.
- **libdiagnostics** [📁](./libdiagnostics) [🌐](https://github.com/GerHobbelt/libdiagnostics) -- a C/C++ diagnostics logging library with support for writing HTML and store images and misc binary data to disk alongside. or when a mere logfile doesn't suffice.
- **libevt** [📁](./libevt) [🌐](https://github.com/GerHobbelt/libevt) -- a library to access the Windows Event Log (EVT) format.
- **loguru** [📁](./loguru) [🌐](https://github.com/GerHobbelt/loguru) -- a lightweight and flexible C++ logging library.
- **loki** [📁](./loki) [🌐](https://github.com/GerHobbelt/loki) -- Grafana Loki: like Prometheus, but for logs. Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by [Prometheus](https://prometheus.io/). It is designed to be very cost effective and easy to operate. It does not index the contents of the logs, but rather a set of labels for each log stream.
- **microsoft-performance-toolkit-sdk** [📁](./microsoft-performance-toolkit-sdk) [🌐](https://github.com/GerHobbelt/microsoft-performance-toolkit-sdk) -- The Microsoft Performance Toolkit is a collection of cross-platform tools developers can use to create and extend performance analysis applications. It serves as the runtime of the Windows Performance Analyzer, a Windows program included in the Windows Performance Toolkit. By using the Microsoft Performance Toolkit SDK, Windows Performance Analyzer - or any performance analysis application - can be configured to process and display performance data from arbitrary sources.
- **MuPDF itself**  [📁](../../) [🌐](https://github.com/GerHobbelt/mupdf) -- this MuPDF fork is geared towards use with [Qiqqa (document and citation manager)](https://github.com/jimmejardine/qiqqa-open-source/). It is based on [the original MuPDF work done by Artifex](https://artifex.com/products/mupdf/), _closely tracks the developments overthere_ and augments the codebase with other C/C++ based tools, which are useful in and around the Qiqqa document processes, such as
  
  * text extraction
  * metadata extraction (including annotations)
  * OCR (_text recognition_ as an required extension of _text extraction_ when you have image-based PDFs, which happens quite often in the wild)
  * Qiqqa database support (SQLite I/O; we do include the generic SQLite tools as well to "open up" the Qiqqa _core components_ for advanced usage and users who wish to perform custom actions on the collected and managed data)

- **netdata** [📁](./netdata) [🌐](https://github.com/GerHobbelt/netdata) -- <a href="https://www.netdata.cloud">Netdata</a> collects metrics per second and presents them in beautiful low-latency dashboards. It is designed to run on all of your physical and virtual servers, cloud deployments, Kubernetes clusters, and edge/IoT devices, to monitor your systems, containers, and applications. It scales nicely from just a single server to thousands of servers, even in complex multi/mixed/hybrid cloud environments, and given enough disk space it can keep your metrics for years.
- **oppat** [📁](./oppat) [🌐](https://github.com/GerHobbelt/oppat) -- Open Power/Performance Analysis Tool (OPPAT) is a cross-OS, cross-architecture Power and Performance Analysis Tool. cross-OS: supports Windows ETW trace files and Linux/Android perf/trace-cmd trace files. cross-architecture: supports Intel and ARM chips hardware events (using perf and/or PCM).
- **palanteer** [📁](./palanteer) [🌐](https://github.com/GerHobbelt/palanteer) -- Visual Python and C++ nanosecond profiler, logger, tests enabler: a set of lean and efficient tools to improve the quality of software, for C++ and Python programs.
- **plf_nanotimer** [📁](./plf_nanotimer) [🌐](https://github.com/GerHobbelt/plf_nanotimer) -- high precision cross-platform performance timer
- **quill-logging** [📁](./quill-logging) [🌐](https://github.com/GerHobbelt/quill) -- asynchronous cross-platform low latency logging library based on C++14/C++17.
- **reckless** [📁](./reckless) [🌐](https://github.com/GerHobbelt/reckless) -- Reckless is an extremely low-latency, high-throughput logging library.
- **replxx** [📁](./replxx) [🌐](https://github.com/GerHobbelt/replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
- **resumable-assert** [📁](./resumable-assert) [🌐](https://github.com/GerHobbelt/resumable-assert) -- `assert` replacement to continue execution in debugger. In any large app, it sometimes happens that some asserts are failing in code you don't currently care about, and blocking the entire team from being able to run the app until the issue is fixed is not the best workflow. So we usually end up moving the execution marker past the assert line in IDE or debugger, or even comment the assert out, recompile and relaunch. With Resumable Assert, you can simply continue execution when an assertion fails in debugger, or even disable asserts that you are not interested in, so that those never bother you again.
- **spdlog_sqlite_sink** [📁](./spdlog_sqlite_sink) [🌐](https://github.com/GerHobbelt/sqlite_sink) -- SQLite 3 database sink for `spdlog`: a simple custom sink made for spdlog that writes to SQLite database.
- **sqlplot-tools** [📁](./sqlplot-tools) [🌐](https://github.com/GerHobbelt/sqlplot-tools) -- a tool to **process data series** from algorithm experiments **using SQL statements** and embed the results in **gnuplot** datafiles or **pgfplots** LaTeX files. Using SQL to generate plots can be see as **cracking a nut with a sledgehammer**, but it really works well in practice.
- **taolog** [📁](./taolog) [🌐](https://github.com/GerHobbelt/taolog) -- A Win32 logger based on DebugView & ETW.
- **tempo** [📁](./tempo) [🌐](https://github.com/GerHobbelt/tempo) -- Grafana Tempo is an open source, easy-to-use and high-scale distributed tracing backend. Tempo is cost-efficient, requiring only object storage to operate, and is deeply integrated with Grafana, Prometheus, and Loki. Tempo is Jaeger, Zipkin, Kafka, OpenCensus and OpenTelemetry compatible.  It ingests batches in any of the mentioned formats, buffers them and then writes them to Azure, GCS, S3 or local disk.  As such it is robust, cheap and easy to operate! Tempo implements [TraceQL](https://grafana.com/docs/tempo/latest/traceql/), a traces-first query language inspired by LogQL and PromQL. This query language allows users to very precisely and easily select spans and jump directly to these spans.
- **uberlog** [📁](./uberlog) [🌐](https://github.com/GerHobbelt/uberlog) -- a cross platform C++ logging system that is focused on fast and small, writing to a shared memory ring buffer.
- ~~**EasyLogger** [🌐](https://github.com/armink/EasyLogger) -- an ultra-lightweight (ROM<1.6K, RAM<0.3K), high-performance C/C++ log library, very suitable for resource-sensitive software projects. Compared with the well-known C/C++ log libraries such as log4c and zlog, EasyLogger has simpler functions and provides fewer interfaces to users, but it will be quick to get started. More practical functions support dynamic expansion in the form of plug-ins.~~
  
  - **removed**; reason: we've decided on using `glog` as the logging library for everything: while that one isn't perfect, most of the other stuff we've been looking at is using that one already and it matches our needs 80% of the time, while I'm okay with patching that library for the other 20% (syslog-like use, i.e. logging to localhost logging server where all logging is collected -- these log messages should travel across as part of the ZeroMQ message streams.)

- ~~**log4cplus** [🌐](https://github.com/log4cplus/log4cplus)~~
  
  - **removed**; reason: we've decided on using `glog` as the logging library for everything. log4cplus, at the same time, is a tad too much. (I consider `log4j` et al *overdone* as it caters to every need instead of just providing those things as contrib code which can be integrated at need -- should not be as far run-time configurable as it currently is.)

- ~~**spdlog** [🌐](https://github.com/gabime/spdlog)~~
  
  - **removed**; reason: we've decided on using `glog` as the logging library for everything. `spdlog` has some nice features but in the end it was ease of cross-platform compilation and installed base that won out here...

- ~~**zlog** [🌐](https://github.com/HardySimpson/zlog)~~
  
  - **removed**; `zlog` has a nice overall design but is too 'Unix-is-the-world' in its coding: in the end it was ease of cross-platform compilation of `glog` that won the day and I'm okay with layering on top of that one to get the zlog category and other channel features, once I really need them.












### Colour Processing & Conversion

- **1D-RGB-color-gradient** [📁](./1D-RGB-color-gradient) [🌐](https://github.com/GerHobbelt/1D-RGB-color-gradient) -- 1D (univariate) continous (smooth) [color gradients](https://en.wikipedia.org/wiki/Color_gradient) (colormaps) for gnuplot.
- **2D-color-gradient-or-Procedural-texture** [📁](./2D-color-gradient-or-Procedural-texture) [🌐](https://github.com/GerHobbelt/2D-color-gradient-or-Procedural-texture) -- 2D continous (smooth) [color gradients](https://en.wikipedia.org/wiki/Color_gradient) (colormaps) for gnuplot.
- **gencolormap** [📁](./gencolormap) [🌐](https://github.com/GerHobbelt/gencolormap) -- generate color maps for visualization. A variety of methods for sequential, diverging, and qualitative maps is available.
- **hsluv-color-gradient** [📁](./hsluv-color-gradient) [🌐](https://github.com/GerHobbelt/hsluv-color-gradient) -- 1D discrete and continous perceptually uniform ordered color gradients rendered in [HSL](https://www.hsluv.org/)











### Visualization

- **colormap-shaders** [📁](./colormap-shaders) [🌐](https://github.com/GerHobbelt/colormap-shaders) -- a collection of shaders to draw color maps.
- **ColorSpace** [📁](./ColorSpace) [🌐](https://github.com/GerHobbelt/ColorSpace) -- library for converting between color spaces and comparing colors.
- **color-util** [📁](./color-util) [🌐](https://github.com/GerHobbelt/color-util) -- a header-only C++11 library for handling colors, including color space converters between RGB, XYZ, Lab, etc. and color difference calculators such as CIEDE2000.
- **gnuplot** [📁](./gnuplot) [🌐](https://github.com/GerHobbelt/gnuplot) -- the Gnuplot Plotting Utility is a command-line driven interactive function plotting utility for linux, OSX, MSWin, VMS, and many other platforms. Gnuplot handles both curves (2 dimensions) and surfaces (3 dimensions). Surfaces can be plotted as a mesh fitting the specified function, floating in the 3-d coordinate space, or as a contour plot on the x-y plane. For 2-d plots, there are also many plot styles including lines, points, boxes, heat maps, stacked histograms, and contoured projections of 3D data. Graphs may be labeled with arbitrary labels and arrows, axis labels, a title, date and time, and a key.  The interface includes command-line editing and history on most platforms.
- **gnuplot_i** [📁](./gnuplot_i) [🌐](https://github.com/GerHobbelt/gnuplot_i) -- gnuplot C interface library enables developers to create [gnuplots](http://www.gnuplot.info/) directly from their C programs.
- **gnuplot-palettes** [📁](./gnuplot-palettes) [🌐](https://github.com/GerHobbelt/gnuplot-palettes) -- color palettes for gnuplot.
- **graph-coloring** [📁](./graph-coloring) [🌐](https://github.com/GerHobbelt/graph-coloring) -- a C++ Graph Coloring Package. This project has two primary uses:
  
  * As an executable for finding the chromatic number for an input graph (in edge list or edge matrix format)
  * As a library for finding the particular coloring of an input graph (represented as a `map<string,vector<string>>` edge list)

- **hsluv-c** [📁](./hsluv-c) [🌐](https://github.com/GerHobbelt/hsluv-c) -- HSLuv (revision 4) is a human-friendly alternative to HSL. HSLuv is very similar to CIELUV, a color space designed for perceptual uniformity based on human experiments. When accessed by polar coordinates, it becomes functionally similar to HSL with a single problem: its chroma component doesn't fit into a specific range. HSLuv extends CIELUV with a new saturation component that allows you to span all the available chroma as a neat percentage.
- **IconFontCppHeaders** [📁](./IconFontCppHeaders) [🌐](https://github.com/GerHobbelt/IconFontCppHeaders) -- provides C and C++ headers, among others, for icon fonts Font Awesome, Fork Awesome, Google Material Design, Pictogrammers Material Design icons, Kenney game icons, Fontaudio, Codicons and Lucide. Useful in UI applications such as ones built in Dear ImGui.
- **leptonica-hillshade** [📁](./leptonica-hillshade) [🌐](https://github.com/GerHobbelt/leptonica-hillshade) -- apply hillshade elevation/shadow render to leptonica PIX & FPIX
- **matplotplusplus** [📁](./matplotplusplus) [🌐](https://github.com/GerHobbelt/matplotplusplus) -- **Matplot++** is a graphics library for data visualization that provides interactive plotting, means for exporting plots in high-quality formats for scientific publications, a compact syntax consistent with similar libraries, dozens of plot categories with specialized algorithms, multiple coding styles, and supports generic backends.
- **netdata** [📁](./netdata) [🌐](https://github.com/GerHobbelt/netdata) -- <a href="https://www.netdata.cloud">Netdata</a> collects metrics per second and presents them in beautiful low-latency dashboards. It is designed to run on all of your physical and virtual servers, cloud deployments, Kubernetes clusters, and edge/IoT devices, to monitor your systems, containers, and applications. It scales nicely from just a single server to thousands of servers, even in complex multi/mixed/hybrid cloud environments, and given enough disk space it can keep your metrics for years.
- **OpenColorIO** [📁](./OpenColorIO) [🌐](https://github.com/GerHobbelt/OpenColorIO) -- OpenColorIO (OCIO) is a complete color management solution geared towards motion picture production with an emphasis on visual effects and computer animation. OCIO provides a straightforward and consistent user experience across all supporting applications while allowing for sophisticated back-end configuration options suitable for high-end production usage. OCIO is compatible with the Academy Color Encoding Specification (ACES) and is LUT-format agnostic, supporting many popular formats.
- **pdiff** [📁](./pdiff) [🌐](https://github.com/GerHobbelt/pdiff) -- perceptualdiff (pdiff): a program that compares two images using a perceptually based image metric.
- **sqlplot-tools** [📁](./sqlplot-tools) [🌐](https://github.com/GerHobbelt/sqlplot-tools) -- a tool to **process data series** from algorithm experiments **using SQL statements** and embed the results in **gnuplot** datafiles or **pgfplots** LaTeX files. Using SQL to generate plots can be see as **cracking a nut with a sledgehammer**, but it really works well in practice.
- **tinycolormap** [📁](./tinycolormap) [🌐](https://github.com/GerHobbelt/tinycolormap) -- a header-only, single-file library for colormaps written in C++11.
- **tmap** [📁](./tmap) [🌐](https://github.com/GerHobbelt/tmap) -- a very fast visualization library for large, high-dimensional data sets. tmap's graph layouts are based on the [OGDF](https://ogdf.uos.de/) library.
- **vizzu** [📁](./vizzu) [🌐](https://github.com/GerHobbelt/vizzu-lib) -- Vizzu is a Javascript/C++ library for animated data visualizations and data stories, utilizing a generic dataviz engine that generates many types of charts and seamlessly animates between them. It can be used to create static charts but more importantly, it is designed for building animated data stories and interactive explorers as Vizzu enables showing different perspectives of the data that the viewers can easily follow due to the animation.
- **VTK** [📁](./VTK) [🌐](https://github.com/GerHobbelt/VTK) -- VTK - The Visualization Toolkit - is an open-source software system for image processing, 3D graphics, volume rendering and visualization. VTK includes many advanced algorithms (e.g., surface reconstruction, implicit modeling, decimation) and rendering techniques (e.g., hardware-accelerated volume rendering, LOD control).











### ETW (Event Tracing for Microsoft Windows)

- **EtwExplorer** [📁](./EtwExplorer) [🌐](https://github.com/GerHobbelt/EtwExplorer) -- View ETW Provider metadata. Event Tracing for Windows (ETW) is a logging facility built into the Windows OS. Modern providers register a manifest that describes all the events they support, with their properties. Classic providers register a MOF instead.
- **krabsETW** [📁](./krabsETW) [🌐](https://github.com/GerHobbelt/krabsetw) -- a C++ library that simplifies interacting with ETW. It allows for any number of traces and providers to be enabled and for client code to register for event notifications from these traces.
- **libevt** [📁](./libevt) [🌐](https://github.com/GerHobbelt/libevt) -- a library to access the Windows Event Log (EVT) format.
- **Sealighter** [📁](./Sealighter) [🌐](https://github.com/GerHobbelt/Sealighter) -- Sysmon-Like research tool for ETW: helps non-developers dive into researching Event Tracing for Windows (ETW) and Windows PreProcessor Tracing (WPP).
- **SilkETW** [📁](./SilkETW) [🌐](https://github.com/GerHobbelt/SilkETW) -- SilkETW & SilkService are flexible C# wrappers for ETW, they are meant to abstract away the complexities of ETW and give people a simple interface to perform research and introspection. While both projects have obvious defensive (and offensive) applications they should primarily be considered as research tools.
- **tracelogging-for-ETW** [📁](./tracelogging-for-ETW) [🌐](https://github.com/GerHobbelt/tracelogging) -- C++ Wrapper for Windows ETW TraceLogging
- **UIforETW** [📁](./UIforETW) [🌐](https://github.com/GerHobbelt/UIforETW) -- Bruce Dawson's user interface for recording ETW (Event Tracing for Windows) traces, which allow amazingly deep investigations of performance problems on Windows.
- **Windows10EtwEvents** [📁](./Windows10EtwEvents) [🌐](https://github.com/GerHobbelt/Windows10EtwEvents) -- Events from all manifest-based and mof-based ETW providers across Windows 10 versions.











## telemetry

- **loki** [📁](./loki) [🌐](https://github.com/GerHobbelt/loki) -- Grafana Loki: like Prometheus, but for logs. Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by [Prometheus](https://prometheus.io/). It is designed to be very cost effective and easy to operate. It does not index the contents of the logs, but rather a set of labels for each log stream.
- **ms_cpp_client_telemetry** [📁](./ms_cpp_client_telemetry) [🌐](https://github.com/GerHobbelt/cpp_client_telemetry) -- 1DS C/C++ SDK enables cross-platform telemetry collection from various Microsoft products. It enables data / telemetry upload to Collector++. 1DS (One Data Strategy), also known as One Observability, is a cross-org initiative with five teams across the company coming together to unify multiple telemetry efforts at Microsoft. Collector++ is the externally-facing destination end-point where telemetry data is uploaded to that subsequently routes the data to Microsoft internal data pipeline.
- **netdata** [📁](./netdata) [🌐](https://github.com/GerHobbelt/netdata) -- <a href="https://www.netdata.cloud">Netdata</a> collects metrics per second and presents them in beautiful low-latency dashboards. It is designed to run on all of your physical and virtual servers, cloud deployments, Kubernetes clusters, and edge/IoT devices, to monitor your systems, containers, and applications. It scales nicely from just a single server to thousands of servers, even in complex multi/mixed/hybrid cloud environments, and given enough disk space it can keep your metrics for years.
- **opentelemetry-cpp** [📁](./opentelemetry-cpp) [🌐](https://github.com/GerHobbelt/opentelemetry-cpp) -- The OpenTelemetry C++ Client
- **opentelemetry-cpp-contrib** [📁](./opentelemetry-cpp-contrib) [🌐](https://github.com/GerHobbelt/opentelemetry-cpp-contrib) -- OpenTelemetry C++ Contrib repository which contains set of components extending functionality of the OpenTelemetry SDK. Instrumentation libraries, exporters, and other components can find their home here.
- **siridb-server** [📁](./siridb-server) [🌐](https://github.com/GerHobbelt/siridb-server) -- SiriDB Server is a highly-scalable, robust and super fast time series database. SiriDB uses a unique mechanism to operate without a global index and allows server resources to be added on the fly. SiriDB’s unique query language includes dynamic grouping of time series for easy analysis over large amounts of time series. SiriDB is scalable on the fly and has no downtime while updating or expanding your database. The scalable possibilities enable you to enlarge the database time after time without losing speed. SiriDB is developed to give an unprecedented performance without downtime. A SiriDB cluster distributes time series across multiple pools. Each pool supports active replicas for load balancing and redundancy. When one of the replicas is not available the database is still accessible.
- **statsite** [📁](./statsite) [🌐](https://github.com/GerHobbelt/statsite) -- a metrics aggregation server. Statsite is based heavily on Etsy's StatsD <https://github.com/etsy/statsd>, and is wire compatible.
- **TelemetrySourcerer** [📁](./TelemetrySourcerer) [🌐](https://github.com/GerHobbelt/TelemetrySourcerer) -- Telemetry Sourcerer can enumerate and disable common sources of telemetry used by AV/EDR on Windows. Red teamers and security enthusiasts can use this tool in a lab environment for various purposes, including ETW event monitoring.
- **tempo** [📁](./tempo) [🌐](https://github.com/GerHobbelt/tempo) -- Grafana Tempo is an open source, easy-to-use and high-scale distributed tracing backend. Tempo is cost-efficient, requiring only object storage to operate, and is deeply integrated with Grafana, Prometheus, and Loki. Tempo is Jaeger, Zipkin, Kafka, OpenCensus and OpenTelemetry compatible.  It ingests batches in any of the mentioned formats, buffers them and then writes them to Azure, GCS, S3 or local disk.  As such it is robust, cheap and easy to operate! Tempo implements [TraceQL](https://grafana.com/docs/tempo/latest/traceql/), a traces-first query language inspired by LogQL and PromQL. This query language allows users to very precisely and easily select spans and jump directly to these spans.











## OCR core (*tesseract*)

- **langdata_LSTM** [📁](../../thirdparty/langdata_LSTM) [🌐](https://github.com/GerHobbelt/langdata_lstm) -- tesseract data
- **tessconfigs** [📁](../../thirdparty/tessconfigs) [🌐](https://github.com/GerHobbelt/tessconfigs) -- Tesseract Config files
- **tessdata** [📁](../../thirdparty/tessdata) [🌐](https://github.com/GerHobbelt/tessdata) -- trained models for Tesseract. These have models for legacy tesseract engine (--oem 0) as well as the new LSTM neural net based engine (--oem 1). The LSTM models (--oem 1) in these files have been updated to the integerized versions of [tessdata_best](https://github.com/tesseract-ocr/tessdata_best) on GitHub. So, they should be faster but probably a little less accurate than tessdata_best.
- **tessdata_best** [📁](../../thirdparty/tessdata_best) [🌐](https://github.com/GerHobbelt/tessdata_best) -- the best trained models for the [Tesseract Open Source OCR Engine](https://github.com/tesseract-ocr/tesseract). These models only work with the LSTM OCR engine of Tesseract 4 / 5.
- **tessdata_contrib** [📁](../../thirdparty/tessdata_contrib) [🌐](https://github.com/GerHobbelt/tessdata_contrib) -- user contributions (non Google) for Tesseract 4 / 5.
- **tessdata_fast** [📁](../../thirdparty/tessdata_fast) [🌐](https://github.com/GerHobbelt/tessdata_fast) -- fast integer versions of trained models for the [Tesseract Open Source OCR Engine](https://github.com/tesseract-ocr/tesseract). These models only work with the LSTM OCR engine of Tesseract 4 / 5.
- **tessdoc** [📁](../../thirdparty/tessdoc) [🌐](https://github.com/GerHobbelt/tessdoc) -- user manual for Tesseract versions `5.x`.
- **tesseract** [📁](../../thirdparty/tesseract) [🌐](https://github.com/GerHobbelt/tesseract) -- `tesseract-ocr` with `--visible-pdf-image` and other tweaks.
- **tesseract_docs** [📁](../../thirdparty/tesseract_docs) [🌐](https://github.com/GerHobbelt/tesseract_docs) -- various documents related to Tesseract OCR.
- **tesseract-gImgRdrGui** [📁](./tesseract-gImgRdrGui) [🌐](https://github.com/GerHobbelt/gImageReader) -- a Gtk/Qt front-end to tesseract-ocr.
- **tesseract_langdata** [📁](../../thirdparty/tesseract_langdata) [🌐](https://github.com/GerHobbelt/langdata) -- source training data for Tesseract for lots of languages.
- **tesslinesplit** [📁](./tesslinesplit) [🌐](https://github.com/GerHobbelt/tesslinesplit) -- a standalone program for using Tesseract's line segmentation algorithm to split up document images.
- **tesstrain** [📁](../../thirdparty/tesstrain) [🌐](https://github.com/GerHobbelt/tesstrain) -- training workflow for Tesseract 4.











## PDF render & metadata core (*mupdf*)

- **extract** [📁](../../thirdparty/extract) [🌐](https://github.com/GerHobbelt/thirdparty_extract) -- clone of git://git.ghostscript.com/extract.git
- **farver-OKlab** [📁](./farver-OKlab) [🌐](https://github.com/GerHobbelt/farver) -- provides very fast, vectorised functions for conversion of colours between different colour spaces, colour comparisons (distance between colours), encoding/decoding, and channel manipulation in colour strings.
- **freeglut** [📁](../../thirdparty/freeglut) [🌐](https://github.com/GerHobbelt/thirdparty-freeglut) -- Freeglut, the Free OpenGL Utility Toolkit, is meant to be a free alternative to Mark Kilgard's GLUT library. In short, freeglut can be used by OpenGL programs to perform those tasks which would normally require platform-specific code. Tasks like creating a window, creating an OpenGL context and binding it to the window, and processing input events. Freeglut provides a concise and elegant API to handle those tasks, in a platform-independent manner, keeping the application simple and portable.
- **freetype** [📁](../../thirdparty/freetype) [🌐](https://github.com/GerHobbelt/thirdparty-freetype2) -- FreeType is a freely available software library to render fonts.
- **graph-coloring** [📁](./graph-coloring) [🌐](https://github.com/GerHobbelt/graph-coloring) -- a C++ Graph Coloring Package. This project has two primary uses:
  
  * As an executable for finding the chromatic number for an input graph (in edge list or edge matrix format)
  * As a library for finding the particular coloring of an input graph (represented as a `map<string,vector<string>>` edge list)

- **harfbuzz** [📁](../../thirdparty/harfbuzz) [🌐](https://github.com/GerHobbelt/thirdparty-harfbuzz) -- a text shaping engine. It primarily supports [OpenType][1], but also [Apple Advanced Typography][2].
- **jbig2dec** [📁](../../thirdparty/jbig2dec) [🌐](https://github.com/GerHobbelt/jbig2dec) -- a decoder library and example utility implementing the JBIG2 bi-level image compression spec. Also known as ITU T.88 and ISO IEC 14492, and included by reference in Adobe's PDF version 1.4 and later.
- **lcms2** [📁](../../thirdparty/lcms2) [🌐](https://github.com/GerHobbelt/thirdparty-lcms2) -- `lcms2mt` is a thread-safe fork of `lcms` (a.k.a. Little CMS). Little CMS intends to be a small-footprint color management engine, with special focus on accuracy and performance. It uses the International Color Consortium standard (ICC), which is the modern standard when regarding to color management. The ICC specification is widely used and is referred to in many International and other de-facto standards. It was approved as an International Standard, ISO 15076-1, in 2005. Little CMS is a **full implementation** of ICC specification 4.3, it fully supports all kind of V2 and V4 profiles, including abstract, devicelink and named color profiles.
- **leptonica** [📁](../../thirdparty/leptonica) [🌐](https://github.com/GerHobbelt/leptonica) -- supports many operations that are useful on images.
  
  Features:
  
  * Rasterop (aka bitblt)
  * Affine transforms (scaling, translation, rotation, shear) on images of arbitrary pixel depth
  * Projective and bilinear transforms
  * Binary and grayscale morphology, rank order filters, and convolution
  * Seedfill and connected components
  * Image transformations with changes in pixel depth, both at the same scale and with scale change
  * Pixelwise masking, blending, enhancement, arithmetic ops, etc.

- **libjpeg** [📁](../../thirdparty/libjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-libjpeg) -- the Independent JPEG Group's JPEG software
- **libpng** [📁](../../thirdparty/libpng) [🌐](https://github.com/GerHobbelt/libpng) -- LIBPNG: Portable Network Graphics support, official libpng repository.
- **libtiff** [📁](../../thirdparty/libtiff) [🌐](https://github.com/GerHobbelt/libtiff) -- TIFF Software Distribution
- **mozjpeg** [📁](./mozjpeg) [🌐](https://github.com/GerHobbelt/mozjpeg) -- the Mozilla JPEG Encoder Project improves JPEG compression efficiency achieving higher visual quality and smaller file sizes at the same time. It is compatible with the JPEG standard, and the vast majority of the world's deployed JPEG decoders. MozJPEG is a patch for [libjpeg-turbo](https://github.com/libjpeg-turbo/libjpeg-turbo).
- **OpenColorIO** [📁](./OpenColorIO) [🌐](https://github.com/GerHobbelt/OpenColorIO) -- OpenColorIO (OCIO) is a complete color management solution geared towards motion picture production with an emphasis on visual effects and computer animation. OCIO provides a straightforward and consistent user experience across all supporting applications while allowing for sophisticated back-end configuration options suitable for high-end production usage. OCIO is compatible with the Academy Color Encoding Specification (ACES) and is LUT-format agnostic, supporting many popular formats.
- **openjpeg** [📁](../../thirdparty/openjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-openjpeg) -- OPENJPEG Library and Applications -- OpenJPEG is an open-source JPEG 2000 codec written in C language. It has been developed in order to promote the use of [JPEG 2000](http://www.jpeg.org/jpeg2000), a still-image compression standard from the Joint Photographic Experts Group ([JPEG](http://www.jpeg.org)).  Since April 2015, it is officially recognized by ISO/IEC and ITU-T as a [JPEG 2000 Reference Software](http://www.itu.int/rec/T-REC-T.804-201504-I!Amd2).
- **zlib** [📁](../../thirdparty/zlib) [🌐](https://github.com/GerHobbelt/thirdparty-zlib) -- zlib-ng: zlib data compression library for the next generation systems.











## UI / GUI

- **horsejs** [📁](./horsejs) [🌐](https://github.com/GerHobbelt/horsejs) -- a framework similar to Electron. Unlike Electron, it has no built-in Node.js, but directly uses C++ to provide most of Electron's capabilities, such as accessing files using JavaScript, opening dialog boxes, creating new windows, etc. Since there is no Node.js, HorseJs runs faster, uses less memory, and is more stable.
- **indicators** [📁](./indicators) [🌐](https://github.com/GerHobbelt/indicators) -- thread-safe progress bars and spinners for console applications.
- **libclip** [📁](./libclip) [🌐](https://github.com/GerHobbelt/clip) -- a library to copy/retrieve content to/from the clipboard/pasteboard.
- **libclipboard** [📁](./libclipboard) [🌐](https://github.com/GerHobbelt/libclipboard) -- a lightweight cross-platform clipboard library.
- **libgateY** [📁](./libgateY) [🌐](https://github.com/GerHobbelt/libgateY) -- Use a web browser to easily visualize data from your C++ program and control it’s behaviour. libgateY allows you to add variables shared between the native C++ code and the javascript code.
- **nativefiledialog-extended** [📁](./nativefiledialog-extended) [🌐](https://github.com/GerHobbelt/nativefiledialog-extended) -- a small C library with that portably invokes native file open, folder select and file save dialogs.  Write dialog code once and have it pop up native dialogs on all supported platforms.  Avoid linking large dependencies like wxWidgets and Qt.
- **neutralinoJS** [📁](./neutralinoJS) [🌐](https://github.com/GerHobbelt/neutralinojs) -- a lightweight and portable desktop application development framework. It lets you develop lightweight cross-platform desktop applications using JavaScript, HTML and CSS. Neutralinojs offers a lightweight SDK which is an alternative for Electron and NW.js. Neutralinojs doesn't bundle Chromium and uses the existing web browser library in the operating system. Neutralinojs implements a WebSocket connection for native operations and embeds a static web server to serve the web content. Also, it offers a built-in [JavaScript client library](https://github.com/neutralinojs/neutralino.js) for developers.
- **neutralinoJS-CLI** [📁](./neutralinoJS-CLI) [🌐](https://github.com/GerHobbelt/neutralinojs-cli) -- The official CLI of Neutralinojs.
- **notcurses** [📁](./notcurses) [🌐](https://github.com/GerHobbelt/notcurses) -- a library facilitating complex TUIs on modern terminal emulators, supporting vivid colors, multimedia, threads, and Unicode to the maximum degree possible. Things can be done with Notcurses that simply can't be done with NCURSES. It is furthermore fast as shit. What it is not: a source-compatible X/Open Curses implementation, nor a replacement for NCURSES on existing systems.
- **photino.native** [📁](./photino.native) [🌐](https://github.com/GerHobbelt/photino.Native) -- a lightweight open-source framework for building native, cross-platform desktop applications with Web UI technology. Photino enables developers to use fast, natively compiled languages like C#, C++, Java and more. Photino uses the OSs built-in WebKit-based browser control for Windows, macOS and Linux. Photino is the lightest cross-platform framework.
- **scintilla** [📁](./scintilla) [🌐](https://github.com/GerHobbelt/scintilla) -- text editor
- **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
- **tinycolormap** [📁](./tinycolormap) [🌐](https://github.com/GerHobbelt/tinycolormap) -- a header-only, single-file library for colormaps written in C++11.
- **tvision** [📁](./tvision) [🌐](https://github.com/GerHobbelt/tvision) -- a modern port of Borland's Turbo Vision 2.0, the classical framework for text-based user interfaces. Now cross-platform and with Unicode support. (**retro fun**)
- **vtm** [📁](./vtm) [🌐](https://github.com/GerHobbelt/vtm) -- Terminal multiplexer with window manager and session sharing. Text-based desktop environment inside your terminal. Includes `destopio`, a text/terminal oriented layout engine.
- **webview** [📁](./webview) [🌐](https://github.com/GerHobbelt/webview) -- cross-platform embedding of the system-default web browser: a tiny cross-platform webview library for C/C++/Golang to build modern cross-platform GUIs. The goal of the project is to create a common HTML5 UI abstraction layer for the most widely used platforms. It supports two-way JavaScript bindings (to call JavaScript from C/C++/Go and to call C/C++/Go from JavaScript).
- **win32-dpi** [📁](./win32-dpi) [🌐](https://github.com/GerHobbelt/win32-dpi) -- Win32 DPI-aware window example, showcasing how to write a Win32 DPI-aware GUI application that scales properly on everything starting from Windows XP up to and including latest Windows 11.
- **wxCharts** [📁](./wxCharts) [🌐](https://github.com/GerHobbelt/wxCharts) -- charts for wxWidgets
- **wxCurl** [📁](./wxCurl) [🌐](https://github.com/GerHobbelt/wxCurl) -- clone of improved wxCurl from OpenCPN. wxCURL is a simplified and integrated interface between LibCURL and wxWidgets. wxCURL provides several sub-classes for simplified interfaces to HTTP, WebDAV, FTP and Telnet based resources, threads specialized for non-blocking downloads/uploads, stock download and upload dialogs.
- **wxDatabase** [📁](./wxDatabase) [🌐](https://github.com/GerHobbelt/wxDatabase) -- wxDatabase is built on the excellent work of Joseph Blough called DatabaseLayer. The wxDatabase classes provide a database independent interface similar to JDBC (but only VERY basic functionality). So far, the only database backends supported are SQLite3, MySQL, PostGreSQL, ODBC, and TDS.
- **wxExamples** [📁](./wxExamples) [🌐](https://github.com/GerHobbelt/Examples_wxWidgets) -- examples using wxWidgets
- **wxFormBuilder** [📁](./wxFormBuilder) [🌐](https://github.com/GerHobbelt/wxFormBuilder) -- resource editor and GUI designer for wxWidgets
- **wxMEdit** [📁](./wxMEdit) [🌐](https://github.com/GerHobbelt/wxMEdit) -- a cross-platform Text/Hex Editor written in C++ & wxWidgets. wxMEdit supports many useful functions, e.g. Bookmark, Syntax Highlightings, Word Wraps, Encodings and Column/Hex Modes.
- **wxPdfDocument** [📁](./wxPdfDocument) [🌐](https://github.com/GerHobbelt/wxpdfdoc) -- **wxPdfDocument** allows wxWidgets applications to generate PDF documents. The code is a port of FPDF - a free PHP class for generating PDF files - to C++ using the wxWidgets library. Several add-on PHP scripts found on the FPDF web site are incorporated into wxPdfDocument.
- **wxPDFView** [📁](./wxPDFView) [🌐](https://github.com/GerHobbelt/wxPDFView) -- wxWidgets PDF viewer/reader control
- **wxSQLite3** [📁](./wxSQLite3) [🌐](https://github.com/GerHobbelt/wxsqlite3) -- a C++ wrapper around the SQLite 3.x database and is specifically designed for use in programs based on the wxWidgets library. **wxSQLite3** does not try to hide the underlying database, in contrary almost all special features of the current SQLite3 version are supported, like for example the creation of user defined scalar or aggregate functions.
- **wxVisualScriptEngine** [📁](./wxVisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngineWxWidgets) -- a utility module for [VisualScriptEngine](https://github.com/kovacsv/VisualScriptEngine) which provides helper classes for embedding the engine in a wxWidgets application.
- **wxWebViewChromium** [📁](./wxWebViewChromium) [🌐](https://github.com/GerHobbelt/wxWebViewChromium) -- Chromium CEF3-based embedded browser for wxWidgets
- **wxWidgets** [📁](./wxWidgets) [🌐](https://github.com/GerHobbelt/wxWidgets) -- cross-platform GUI framework.











### Language translation & transliteration

- **gettext** [📁](./gettext) [🌐](https://github.com/GerHobbelt/gettext) -- the GNU gettext package.  It is interesting for authors or maintainers of other packages or programs which they want to see internationalized.  As one step the handling of messages in different languages should be implemented.  For this task GNU gettext provides the needed tools and library functions. It is also interesting for translators, because GNU gettext provides the 'msgmerge' program, which prepares a message catalog before a translation update.
- **marian** [📁](./marian) [🌐](https://github.com/GerHobbelt/marian) -- an efficient Neural Machine Translation framework written in pure C++ with minimal dependencies.
- **NiuTrans.NMT** [📁](./NiuTrans.NMT) [🌐](https://github.com/GerHobbelt/NiuTrans.NMT) -- a lightweight and efficient Transformer-based neural machine translation system. Its main features are:
  
  - Few dependencies. It is implemented with pure C++, and all dependencies are optional.
  - Flexible running modes. The system can run with various systems and devices (Linux vs. Windows, CPUs vs. GPUs, and FP32 vs. FP16, etc.).
  - Framework agnostic. It supports various models trained with other tools, e.g., fairseq models.
  - High efficiency. It is heavily optimized for fast decoding, see [our WMT paper](https://arxiv.org/pdf/2109.08003.pdf) for more details.

- **OpenFST** [📁](./OpenFST) [🌐](https://github.com/GerHobbelt/openfst) -- a library for constructing, combining, optimizing, and searching weighted finite-state transducers (FSTs). Weighted finite-state transducers are automata where each transition has an input label, an output label, and a weight. The more familiar finite-state acceptor is represented as a transducer with each transition's input and output label equal. Finite-state acceptors are used to represent sets of strings (specifically, regular or rational sets); finite-state transducers are used to represent binary relations between pairs of strings (specifically, rational transductions). The weights can be used to represent the cost of taking a particular transition. FSTs have key applications in speech recognition and synthesis, machine translation, optical character recognition, pattern matching, string processing, machine learning, information extraction and retrieval among others. Often a weighted transducer is used to represent a probabilistic model (e.g., an n-gram model, pronunciation model). FSTs can be optimized by determinization and minimization, models can be applied to hypothesis sets (also represented as automata) or cascaded by finite-state composition, and the best results can be selected by shortest-path algorithms.
- **OpenFST-utils** [📁](./OpenFST-utils) [🌐](https://github.com/GerHobbelt/openfst-utils) -- a set of useful programs for manipulating Finite State Transducer with the OpenFst library.
- **tinygettext** [📁](./tinygettext) [🌐](https://github.com/GerHobbelt/tinygettext) -- a minimal replacement for gettext written in C++. It can read `.po` files directly and doesn't need `.mo` files generated from `.po`. It also can read the `.po` files from arbitrary locations, so it's better suited for non-Unix systems and situations in which one wants to store or distribute `.po` files separately from the software itself.
- **zotero-translate** [📁](./zotero-translate) [🌐](https://github.com/GerHobbelt/translate) -- browser-based standalone zotero translator.
- **zotero-translation-server** [📁](./zotero-translation-server) [🌐](https://github.com/GerHobbelt/translation-server) -- lets you use Zotero translators without the Zotero client.
- **zotero-translators** [📁](./zotero-translators) [🌐](https://github.com/GerHobbelt/translators) -- Zotero Translators : automatically detect journal articles, library records, news items, and other objects you might like to save to your Zotero library. Zotero uses so-called “translators” to detect and import data from websites. There are currently more than 600 different translators, facilitating data import from countless sites.











## Application Installers (NSIS, et al)

- **libmetalink** [📁](./libmetalink) [🌐](https://github.com/GerHobbelt/libmetalink) -- a library to read Metalink XML download description format. It supports both [_Metalink version 3_](http://www.metalinker.org/Metalink_3.0_Spec.pdf) and [_Metalink version 4 (RFC 5854)_](https://tools.ietf.org/html/rfc5854).
- **metalink-cli** [📁](./metalink-cli) [🌐](https://github.com/GerHobbelt/command) -- a small program which generates a metalink record on `stdout` for every file given on the commandline and using the mirror list from `stdin`.
- **metalink-mini-downloader** [📁](./metalink-mini-downloader) [🌐](https://github.com/GerHobbelt/mini-downloader) -- a small metalink downloader written in C++, using boost, libcurl and expat. It can either be compiled so that it downloads a specific file and then (optionally) launches it or be compiled into a "downloader template", which can later be used to create a custom downloader by replacing text strings inside the executable (they are marked in a special way, to make this easy).
- **nsis** [📁](./nsis) [🌐](https://github.com/GerHobbelt/nsis) -- **Unofficial** "Nullsoft Scriptable Install System" (NSIS) builds
- **NSISDotNetChecker** [📁](./NSISDotNetChecker) [🌐](https://github.com/GerHobbelt/NsisDotNetChecker) -- .NET Framework Checker NSIS plugin, used to detect if the required .NET Framework is installed and if it is not - plugin will download and install the required package. The plugin's C++ source code is based on the [work of Aaron Stebner](http://blogs.msdn.com/b/astebner/archive/2009/06/16/9763379.aspx).
- **NSISFileCheck** [📁](./NSISFileCheck) [🌐](https://github.com/GerHobbelt/nsisfilecheck) -- NSIS FileCheck is a [NSIS (Nullsoft Scriptable Install System)](https://en.wikipedia.org/wiki/Nullsoft_Scriptable_Install_System) plugin that enables:
  
  - Calculating a file's hash (SHA1, SHA2)
  - Obtaining a file's string version info
  - Verifying a file's Authenticode code signature (including details)

- **NSISMultiUser** [📁](./NSISMultiUser) [🌐](https://github.com/GerHobbelt/NsisMultiUser) -- NSIS Multi User Plugin allows "per-user" (no admin required) and "per-machine" (asks elevation *only when necessary*) installations. This plugin was inspired by [MultiUser.nsh (by Joost Verburg)](http://nsis.sourceforge.net/Docs/MultiUser/Readme.html), but supports a lot of new features and is easier to use.
- **nsis-nscurl** [📁](./nsis-nscurl) [🌐](https://github.com/GerHobbelt/nsis-nscurl) -- NScurl is a NSIS (Nullsoft Scriptable Install System) plugin with advanced HTTP/HTTPS capabilities. It's implemented on top of [libcurl](https://curl.haxx.se/libcurl/) with [OpenSSL](https://www.openssl.org/) as SSL backend.
- **NSIS-OBSInstallerUtils** [📁](./NSIS-OBSInstallerUtils) [🌐](https://github.com/GerHobbelt/OBSInstallerUtils) -- designed to be used with NSIS (Unicode version). It provides the following features:
  
  ```
  OBSInstallerUtils::IsProcessRunning
  OBSInstallerUtils::IsDLLLoaded
  OBSInstallerUtils::AddInUseFileCheck
  OBSInstallerUtils::ResetInUseFileChecks
  OBSInstallerUtils::GetAppNameForInUseFiles
  OBSInstallerUtils::KillProcess
  OBSInstallerUtils::AddAllApplicationPackages
  ```

- **nsis-stdutils** [📁](./nsis-stdutils) [🌐](https://github.com/GerHobbelt/stdutils) -- StdUtils plug-in for NSIS
- **vcpkg** [📁](./vcpkg) [🌐](https://github.com/GerHobbelt/vcpkg) -- `Vcpkg` helps you manage C and C++ libraries on Windows, Linux and MacOS.











## checking out the competition / compatriots for Qiqqa + re-use useful components

- **bibtool** [📁](./bibtool) [🌐](https://github.com/GerHobbelt/bibtool) -- a tool for manipulating BibTeX data bases. BibTeX provides a mean to integrate citations into LaTeX documents. BibTool allows the manipulation of BibTeX files which goes beyond the possibilities -- and intentions -- of BibTeX.
- **calibre** [📁](./calibre) [🌐](https://github.com/GerHobbelt/calibre) -- an e-book manager. It can view, convert, edit and catalog e-books in all of the major e-book formats. It can also talk to e-book reader devices. It can go out to the internet and fetch metadata for your books. It can download newspapers and convert them into e-books for convenient reading. It is cross platform, running on Linux, Windows and macOS.
- **cef-pdf** [📁](./cef-pdf) [🌐](https://github.com/GerHobbelt/cef-pdf) -- a command line utility (with embedded HTTP server as an optional mode) for creating PDF documents from HTML content. It uses Google Chrome browser's [Chromium Embedded Framework (CEF)](https://bitbucket.org/chromiumembedded/cef/overview) library for all it's internal work; loading urls, rendering HTML & CSS pages and PDF printing, therefore, it produces perfect, accurate, excellent quality PDF documents.
- **citation-abbreviations** [📁](./citation-abbreviations) [🌐](https://github.com/GerHobbelt/abbreviations) -- Journal Title Abbreviations
- **JabRef-abbreviations** [📁](./JabRef-abbreviations) [🌐](https://github.com/GerHobbelt/jabref-abbreviations) -- Jabref journal name abbreviations: some journal require you to use the abbreviated names for journals. If you have to change this manually, it's quite cumbersome to do. Luckily there exist tools to help. [Jabref](http://jabref.sourceforge.net) is open source bibliography reference manager. It has an option to abbreviate journal names. However, when it comes to Physics journals, the internal list is far from complete.
  
  The original list of abbreviations is located at [ISI](https://images.webofknowledge.com/WOK46/help/WOS/A_abrvjt.html).

- **JabRef-Browser-Extension** [📁](./JabRef-Browser-Extension) [🌐](https://github.com/GerHobbelt/JabRef-Browser-Extension) -- a browser extension for users of the bibliographic reference manager [JabRef](https://www.jabref.org/). It automatically identifies and extracts bibliographic information on websites and sends them to JabRef with one click. When you find an interesting article through Google Scholar, the arXiv or journal websites, this browser extension allows you to add those references to JabRef. Even links to accompanying PDFs are sent to JabRef, where those documents can easily be downloaded, renamed and placed in the correct folder. [A wide range of publisher sites, library catalogs and databases are supported](https://www.zotero.org/support/translators).
- **papis-zotero** [📁](./papis-zotero) [🌐](https://github.com/GerHobbelt/papis-zotero) -- Zotero compatiblity scripts for papis. Includes a script that decodes the zotero.sqlite sqlite file that zotero uses to manage documents and creates papis Documents out of it. This script will retrieve the documents from zotero (be it pdf documents or something else) and important information like tags.
- **tesseract-gImgRdrGui** [📁](./tesseract-gImgRdrGui) [🌐](https://github.com/GerHobbelt/gImageReader) -- a Gtk/Qt front-end to tesseract-ocr.
- **zotero** [📁](./zotero) [🌐](https://github.com/GerHobbelt/zotero) -- [Zotero](https://www.zotero.org/) is a free, easy-to-use tool to help you collect, organize, cite, and share your research sources.
- **zotero-better-bibtex** [📁](./zotero-better-bibtex) [🌐](https://github.com/GerHobbelt/zotero-better-bibtex) -- Better BibTeX (BBT) is an extension for Zotero and Juris-M that makes it easier to manage bibliographic data, especially for people authoring documents using text-based toolchains (e.g. based on LaTeX / Markdown).
- **zotero-bib** [📁](./zotero-bib) [🌐](https://github.com/GerHobbelt/bib) -- Zotero Translation Client is a library that can process URLs and identifiers (such as ISBN or DOI) into CSL-JSON bibliography items using a translation server.
- **zotero-build** [📁](./zotero-build) [🌐](https://github.com/GerHobbelt/zotero-build) -- Zotero client build scripts.
- **zotero-connectors** [📁](./zotero-connectors) [🌐](https://github.com/GerHobbelt/zotero-connectors) -- Chrome, Firefox, and Safari browser extensions for Zotero.
- **zotero-google-docs-integration** [📁](./zotero-google-docs-integration) [🌐](https://github.com/GerHobbelt/zotero-google-docs-integration) -- a Zotero integration plugin that communicates between Google Docs and Zotero via the Connector.
- **zotero-libreoffice-integration** [📁](./zotero-libreoffice-integration) [🌐](https://github.com/GerHobbelt/zotero-libreoffice-integration) -- comprises extensions for LibreOffice/OpenOffice.org/NeoOffice and Zotero communicating using local web servers.
- **zotero-scholar-citations** [📁](./zotero-scholar-citations) [🌐](https://github.com/GerHobbelt/zotero-scholar-citations) -- an add-on for Zotero. The add-on automatically fetches numbers of citations of your Zotero items from Google Scholar and makes it possible to sort your items by the citations. Moreover, it allows batch updating the citations, as they may change over time.
  
  **When updating multiple citations in a batch, it may happen that citation queries are blocked by Google Scholar for multiple automated requests. If a blockage happens, the add-on opens a browser window and directs it to http://scholar.google.com/, where you should see a Captcha displayed by Google Scholar, which you need to enter to get unblocked and then re-try updating the citations. It may happen that Google Scholar displays a message like the following "*We're sorry... but your computer or network may be sending automated queries. To protect our users, we can't process your request right now.*" In that case, the only solution is to wait for a while until Google unblocks you.**

- **zotero-shortdoi** [📁](./zotero-shortdoi) [🌐](https://github.com/GerHobbelt/zotero-shortdoi) -- an add-on for Zotero. The add-on can auto-fetch DOI names for journal articles using the CrossRef API, as well as look up shortDOI names using http://shortdoi.org. The add-on additionally verifies that stored DOIs are valid and marks invalid DOIs.
- **zotero-standalone-build** [📁](./zotero-standalone-build) [🌐](https://github.com/GerHobbelt/zotero-standalone-build) -- build scripts used to bundle the Zotero core into distributable bundles for Mac, Windows, and Linux.
- **zotero-translate** [📁](./zotero-translate) [🌐](https://github.com/GerHobbelt/translate) -- browser-based standalone zotero translator.
- **zotero-translation-server** [📁](./zotero-translation-server) [🌐](https://github.com/GerHobbelt/translation-server) -- lets you use Zotero translators without the Zotero client.
- **zotero-translators** [📁](./zotero-translators) [🌐](https://github.com/GerHobbelt/translators) -- Zotero Translators : automatically detect journal articles, library records, news items, and other objects you might like to save to your Zotero library. Zotero uses so-called “translators” to detect and import data from websites. There are currently more than 600 different translators, facilitating data import from countless sites.
- **zotero-web-library** [📁](./zotero-web-library) [🌐](https://github.com/GerHobbelt/web-library) -- a Web Library capable of being installed/run on other websites. It is a single-page application implemented in Javascript. It uses Zotero API via CORS requests.
- **zotero-word-for-windows-integration** [📁](./zotero-word-for-windows-integration) [🌐](https://github.com/GerHobbelt/zotero-word-for-windows-integration) -- a Firefox add-on that consists of a library written in C++ that communicates with Microsoft Word out of process using OLE Automation, a js-ctypes wrapper for said library, and a template that is installed into Microsoft Word to communicate with Zotero.
- **zotero-zotfile** [📁](./zotero-zotfile) [🌐](https://github.com/GerHobbelt/zotfile) -- Zotero plugin to manage your attachments: automatically rename, move, and attach PDFs (or other files) to Zotero items, sync PDFs from your Zotero library to your (mobile) PDF reader (e.g. an iPad, Android tablet, etc.), and extract PDF annotations.











## citations output (CSL)

- **citation-abbreviations** [📁](./citation-abbreviations) [🌐](https://github.com/GerHobbelt/abbreviations) -- Journal Title Abbreviations
- **citation-journals** [📁](./citation-journals) [🌐](https://github.com/GerHobbelt/journals) -- Tools and journal metadata for generating dependent CSL styles.
- **citation-styles** [📁](./citation-styles) [🌐](https://github.com/GerHobbelt/styles) -- the Citation Style Language (CSL) citation styles.
- **citeproc-js** [📁](./citeproc-js) [🌐](https://github.com/GerHobbelt/citeproc-js) -- a JavaScript implementation of the Citation Style Language (CSL) https://citeproc-js.readthedocs.io
- **JabRef-abbreviations** [📁](./JabRef-abbreviations) [🌐](https://github.com/GerHobbelt/jabref-abbreviations) -- Jabref journal name abbreviations: some journal require you to use the abbreviated names for journals. If you have to change this manually, it's quite cumbersome to do. Luckily there exist tools to help. [Jabref](http://jabref.sourceforge.net) is open source bibliography reference manager. It has an option to abbreviate journal names. However, when it comes to Physics journals, the internal list is far from complete.
  
  The original list of abbreviations is located at [ISI](https://images.webofknowledge.com/images/help/WOS/A_abrvjt.html).












## Microsoft Word, Google Docs, LibreOffice: application integration

- **JabRef-Browser-Extension** [📁](./JabRef-Browser-Extension) [🌐](https://github.com/GerHobbelt/JabRef-Browser-Extension) -- a browser extension for users of the bibliographic reference manager [JabRef](https://www.jabref.org/). It automatically identifies and extracts bibliographic information on websites and sends them to JabRef with one click. When you find an interesting article through Google Scholar, the arXiv or journal websites, this browser extension allows you to add those references to JabRef. Even links to accompanying PDFs are sent to JabRef, where those documents can easily be downloaded, renamed and placed in the correct folder. [A wide range of publisher sites, library catalogs and databases are supported](https://www.zotero.org/support/translators).
- **zotero-connectors** [📁](./zotero-connectors) [🌐](https://github.com/GerHobbelt/zotero-connectors) -- Chrome, Firefox, and Safari browser extensions for Zotero.
- **zotero-google-docs-integration** [📁](./zotero-google-docs-integration) [🌐](https://github.com/GerHobbelt/zotero-google-docs-integration) -- a Zotero integration plugin that communicates between Google Docs and Zotero via the Connector.
- **zotero-libreoffice-integration** [📁](./zotero-libreoffice-integration) [🌐](https://github.com/GerHobbelt/zotero-libreoffice-integration) -- comprises extensions for LibreOffice/OpenOffice.org/NeoOffice and Zotero communicating using local web servers.
- **zotero-word-for-windows-integration** [📁](./zotero-word-for-windows-integration) [🌐](https://github.com/GerHobbelt/zotero-word-for-windows-integration) -- a Firefox add-on that consists of a library written in C++ that communicates with Microsoft Word out of process using OLE Automation, a js-ctypes wrapper for said library, and a template that is installed into Microsoft Word to communicate with Zotero.











## XML & XSLT tooling

- **gumbo-libxml** [📁](./gumbo-libxml) [🌐](https://github.com/GerHobbelt/gumbo-libxml) -- LibXML2 bindings for the Gumbo HTML5 parser: this provides a libxml2 API on top of the Gumbo parser.  It lets you use a modern parser - Gumbo now passes all html5lib tests, including the template tag, and should be fully conformant with the HTML5 spec - with the full ecosystem of libxml tools, including XPath, tree modification, DTD validation, etc.
- **libexpat** [📁](./libexpat) [🌐](https://github.com/GerHobbelt/libexpat) -- XML read/write
- **libxml2** [📁](./libxml2) [🌐](https://github.com/GerHobbelt/libxml2) -- XML read/write
- **libxslt** [📁](./libxslt) [🌐](https://github.com/GerHobbelt/libxslt) -- XSLT support for libxml2 (XML toolkit from the GNOME project)
- **xml-pugixml** [📁](./xml-pugixml) [🌐](https://github.com/GerHobbelt/pugixml) -- light-weight, simple and fast XML parser for C++ with XPath support.
- **xsldbg** [📁](./xsldbg) [🌐](https://github.com/GerHobbelt/xsldbg) -- a debugger for xsl/xslt stylesheets which has functionality similar to a Unix/Linux "gdb", using libxml2 and libxslt.











## Microsoft DOCX ~ OpenXML & other XML & XSLT tooling

- **b2xtranslator** [📁](./b2xtranslator) [🌐](https://github.com/GerHobbelt/b2xtranslator) -- .NET Core library to convert Microsoft Office binary files (doc, xls and ppt) to Open XML (docx, xlsx and pptx). You can use the Open XML SDK to mainpulate those.
- **docxBox** [📁](./docxBox) [🌐](https://github.com/GerHobbelt/docxBox) -- CLI tool for Word DOCX templating and analysis.
- **html2openxml** [📁](./html2openxml) [🌐](https://github.com/GerHobbelt/html2openxml) -- Html2OpenXml is a small .NET library that converts simple or advanced HTML to plain OpenXml components (docx).
- **MariGold.OpenXHTML** [📁](./MariGold.OpenXHTML) [🌐](https://github.com/GerHobbelt/MariGold.OpenXHTML) -- a wrapper library for Open XML SDK to convert HTML documents into Open XML word documents. It has simply encapsulated the complexity of Open XML yet exposes the properties of Open XML for manipulation.
- **npoi** [📁](./npoi) [🌐](https://github.com/GerHobbelt/npoi) -- a .NET library that can read/write Office formats without Microsoft Office installed. No COM+, no interop. With NPOI, you can read/write Office 2003/2007 files very easily.
- **OfficeIMO** [📁](./OfficeIMO) [🌐](https://github.com/GerHobbelt/OfficeIMO) -- fast and easy to use cross-platform .NET library that creates or modifies Microsoft Word (.docx) files without installing any software. Underneath it uses OpenXML SDK but heavily simplifies it.
- **Open-XML-SDK** [📁](./Open-XML-SDK) [🌐](https://github.com/GerHobbelt/Open-XML-SDK) -- the Microsoft Open XML SDK (.NET) provides tools for working with Office Word, Excel, and PowerPoint documents.
- **ShapeCrawler** [📁](./ShapeCrawler) [🌐](https://github.com/GerHobbelt/ShapeCrawler) -- a .NET library for manipulating PowerPoint presentations.











## misc / other

- **ADE-graph-management** [📁](./ADE-graph-management) [🌐](https://github.com/GerHobbelt/ade) -- ADE Framework is a graph construction, manipulation, and processing framework.  ADE Framework is suitable for organizing data flow processing and execution.
- **bbe** [📁](./bbe) [🌐](https://github.com/GerHobbelt/bbe) -- Binary block editor, i.e. kinda like `sed` for binary files
- **BoxFort** [📁](./BoxFort) [🌐](https://github.com/GerHobbelt/BoxFort) -- a simple, cross-platform sandboxing C library powering [Criterion](https://github.com/Snaipe/Criterion). BoxFort provides a simple API to run user code in isolated processes. The main goal of this project **is not** security, but portable code isolation -- if you want complete system isolation, consider using properly configured containers.
- **chromium-snss-parse** [📁](./chromium-snss-parse) [🌐](https://github.com/GerHobbelt/chromium-snss-parse) -- Chromium SNSS parse library parses Chromium's SNSS files, e.g. Current Session, Current Tabs, Last Session, Last Tabs and other files.
- **cpp-terminal** [📁](./cpp-terminal) [🌐](https://github.com/GerHobbelt/cpp-terminal) -- CPP-Terminal is a small C++ library for writing platform independent terminal-based applications. It follows the "Zero-overhead principle" and limits externally included files to the C++ STL. Being crossplatform we support Windows, Linux and MacOS and provide a unified API across all platforms. Our main features are consisting of Colors, Keyboard input, terminal resize handling, as well as other common terminal functionality. It's also possible to open a managed terminal from a windows GUI application.
- **Cysboard** [📁](./Cysboard) [🌐](https://github.com/GerHobbelt/Cysboard) -- a lightweight system monitor similar to `conky` but with html and css for themes.
- **debugbreak** [📁](./debugbreak) [🌐](https://github.com/GerHobbelt/debugbreak) -- allows you to put breakpoints in your C/C++ code with a call to **`debug_break()`**.
- **doh** [📁](./doh) [🌐](https://github.com/GerHobbelt/doh) -- a libcurl-using application that resolves a host name using DNS-over-HTTPS (DoH).
- **doxygen-awesome-css** [📁](./doxygen-awesome-css) [🌐](https://github.com/GerHobbelt/doxygen-awesome-css) -- a custom **CSS theme for Doxygen HTML-documentation** with lots of customization parameters.
- **ex-leptonica-freetype-harfbuzz** [📁](./ex-leptonica-freetype-harfbuzz) [🌐](https://github.com/GerHobbelt/ex-leptonica-freetype-harfbuzz) -- a simple sample application to get from zero to rendering unicode text using harfbuzz to do the text layout, freetype for the underlying font magic and some trivial code for the anti-aliased font rasterization.
- **exprtk** [📁](./exprtk) [🌐](https://github.com/GerHobbelt/exprtk) -- C++ Mathematical Expression Toolkit Library is a simple to use, easy to integrate and extremely efficient run-time mathematical expression parsing and evaluation engine. The parsing engine supports numerous forms of functional and logic processing semantics and is easily extensible.
- **fatal** [📁](./fatal) [🌐](https://github.com/GerHobbelt/fatal) -- Fatal (Facebook Template Library) is a library for fast prototyping software in modern C++. It provides facilities heavily based on template meta-programming, while keeping most of the complexity under-the-hood, to enhance the expressive power of C++. Fatal also provides lessons on how to write meta-programs, as well as on how to make the best use of the library, starting at beginner levels.
- **folly** [📁](./folly) [🌐](https://github.com/GerHobbelt/folly) -- Folly (acronymed loosely after Facebook Open Source Library) is a library of C++14 components designed with practicality and efficiency in mind. **Folly contains a variety of core library components used extensively at Facebook**. In particular, it's often a dependency of Facebook's other open source C++ efforts and place where those projects can share code.
- **fontview** [📁](./fontview) [🌐](https://github.com/GerHobbelt/fontview) -- “FontView” is a little demo app that shows the contents of a font file. It opens `*.ttf`, `*.otf`, `*.ttc`, `*.otc`, `*.pfa`, and `*.pfb` files. To render text, FontView uses the open-source libraries [FreeType](https://www.freetype.org/), [HarfBuzz](https://www.freedesktop.org/wiki/Software/HarfBuzz/), and [Raqm](http://host-oman.github.io/libraqm/).
- **getopt** [📁](./getopt) [🌐](https://github.com/GerHobbelt/getopt_port) -- an original implementation of `getopt` and `getopt_long` with limited GNU extensions. Provided under the BSD license, to allow non-GPL projects to use `getopt`-style command-line parsing.
- **GSL** [📁](./GSL) [🌐](https://github.com/GerHobbelt/GSL) -- the Guidelines Support Library (GSL) contains functions and types that are suggested for use by the [C++ Core Guidelines](https://github.com/isocpp/CppCoreGuidelines) maintained by the [Standard C++ Foundation](https://isocpp.org). This repo contains Microsoft's implementation of GSL.
- **hikyuu** [📁](./hikyuu) [🌐](https://github.com/GerHobbelt/hikyuu) -- Hikyuu Quant Framework is an open source quantitative trading research framework based on C++/Python, which is used for strategy analysis and backtesting. Its core idea is based on the current mature systematic trading method, which abstracts the entire systematic trading into judging strategies based on market environment, system effective conditions, signal indicators, stop loss/take profit strategies, fund management strategies, profit target strategies, slippage There are seven components of the price difference algorithm. You can build the strategy asset library of these components separately, and freely combine them in actual research to observe the effectiveness, stability of the system and the effect of a single type of strategy.
- **IconFontCppHeaders** [📁](./IconFontCppHeaders) [🌐](https://github.com/GerHobbelt/IconFontCppHeaders) -- provides C and C++ headers, among others, for icon fonts Font Awesome, Fork Awesome, Google Material Design, Pictogrammers Material Design icons, Kenney game icons, Fontaudio, Codicons and Lucide. Useful in UI applications such as ones built in Dear ImGui.
- **javascript-serialization-benchmark** [📁](./javascript-serialization-benchmark) [🌐](https://github.com/GerHobbelt/javascript-serialization-benchmark) -- a binary serialization comparison tool in JavaScript (Protocol Buffer, Avro, BSON, etc.). This is a comparison and benchmark of various binary serialization formats and libraries used in JavaScript as of 2020-07-28.
- **kfr** [📁](./kfr) [🌐](https://github.com/GerHobbelt/kfr) -- an open source C++ DSP framework that contains high performance building blocks for DSP, audio, scientific and other applications.
- **klib** [📁](./klib) [🌐](https://github.com/GerHobbelt/klib) -- Klib is a standalone and lightweight C library. Most components are independent of external libraries, except the standard C library, and independent of each other. To use a component of this library, you only need to copy a couple of files to your source code tree without worrying about library dependencies. Klib strives for efficiency and a small memory footprint. Some components, such as khash.h, kbtree.h, ksort.h and kvec.h, are among the most efficient implementations of similar algorithms or data structures in all programming languages, in terms of both speed and memory use.
- **libclip** [📁](./libclip) [🌐](https://github.com/GerHobbelt/clip) -- a library to copy/retrieve content to/from the clipboard/pasteboard.
- **libclipboard** [📁](./libclipboard) [🌐](https://github.com/GerHobbelt/libclipboard) -- a lightweight cross-platform clipboard library.
- **libdivide** [📁](./libdivide) [🌐](https://github.com/GerHobbelt/libdivide) -- libdivide.h is a header-only C/C++ library for optimizing integer division. Integer division is one of the slowest instructions on most CPUs e.g. on current x64 CPUs a 64-bit integer division has a latency of up to 90 clock cycles whereas a multiplication has a latency of only 3 clock cycles. `libdivide` allows you to replace expensive integer divsion instructions by a sequence of shift, add and multiply instructions that will calculate the integer division much faster.
- **libicns** [📁](./libicns) [🌐](https://github.com/GerHobbelt/libicns) -- a library for manipulation of the Mac OS `icns` resource format, also known as the IconFamily resource type. It can read and write files from the Mac OS X icns format, as well as read from Mac OS resource files and macbinary encoded Mac OS resource forks.
- **librs232** [📁](./librs232) [🌐](https://github.com/GerHobbelt/librs232) -- multiplatform library for serial communications over RS-232 (serial port).
- **libsiridb** [📁](./libsiridb) [🌐](https://github.com/GerHobbelt/libsiridb) -- SiriDB Connector C (libsiridb) is a library which can be used to communicate with [SiriDB](https://github.com/transceptor-technology/siridb-server) using the C program language. This library contains useful functions but does not handle the connection itself.
- **libusb** [📁](./libusb) [🌐](https://github.com/GerHobbelt/libusb) -- a library for USB device access from Linux, macOS, Windows, OpenBSD/NetBSD, Solaris userspace, etc.; libusb is abstracted internally in such a way that it can hopefully be ported to other operating systems.
- **merror** [📁](./merror) [🌐](https://github.com/GerHobbelt/merror) -- **MError** C++ Macro Error Handling Library is a library for error handling in C++ without exceptions. It requires C++17 and only works for gcc or clang compilers.
- **minifb** [📁](./minifb) [🌐](https://github.com/GerHobbelt/minifb) -- MiniFB (Mini FrameBuffer) is a small cross platform library that makes it easy to render (32-bit) pixels in a window.
- **monolith** [📁](./monolith) [🌐](https://github.com/GerHobbelt/monolith) -- a monorepo with several optimization projects.
  
  One of the highlights is a state-of-the-art scheduler using column generation, which significantly outperforms all other optimizers at [schedulingbenchmarks.org](http://www.schedulingbenchmarks.org/). **Try it in the browser (wasm) [here](https://www.strandmark.net/wasm/shift_scheduling_colgen_page.html)!**
  
  Implements the algorithm described in [_First-order Linear Programming in a Column Generation-Based Heuristic Approach to the Nurse Rostering Problem_](https://www.strandmark.net/papers/first-order-scheduling.pdf) (2020) [doi link](https://doi.org/10.1016/j.cor.2020.104945).
  
  The `minimum::linear::colgen` module contains code for solving scheduling problems. It significantly outperforms all other optimizers at [schedulingbenchmarks.org](http://www.schedulingbenchmarks.org/).
  
  Some of the reasons it is fast:
  
  - It uses a first-order LP solver based on papers by Chambolle and Pock.
  - The pricing problem uses highly optimized dynamic programming in a DAG (in `minimum::algorithms`).
  - The [Ryan-Foster rule](https://strandmark.wordpress.com/2018/01/24/visualizing-the-ryan-foster-rule/) is used to iteratively work towards an integer solution. There is no time to branch and bound for big problems.

- **nameof** [📁](./nameof) [🌐](https://github.com/GerHobbelt/nameof) -- header-only C++17 library providing nameof macros and functions to simply obtain the name of a variable, type, function, macro, and enum.
- **omaha** [📁](./omaha) [🌐](https://github.com/GerHobbelt/omaha) -- Omaha is the open-source version of Google Update, a program to install requested software and keep it up to date.  The Google-branded version of Omaha is used to support software patching (both background updating, and on-demand update checks) for Google Chrome, Earth, and a variety of other Google products on Windows 7, 8, and 10.
- **PEGTL** [📁](./PEGTL) [🌐](https://github.com/GerHobbelt/PEGTL) -- the Parsing Expression Grammar Template Library (PEGTL) is a zero-dependency C++ header-only parser combinator library for creating parsers according to a [Parsing Expression Grammar](http://en.wikipedia.org/wiki/Parsing_expression_grammar) (PEG).
- **pikchr** [📁](./pikchr) [🌐](https://github.com/GerHobbelt/pikchr) -- Pikchr (pronounced like "picture") is a [PIC][1]-like markup language for diagrams in technical documentation.  Pikchr is designed to be embedded in [fenced code blocks][2] of Markdown (or in similar mechanisms in other markup languages) to provide a convenient means of showing diagrams.
- **poco** [📁](./poco) [🌐](https://github.com/GerHobbelt/poco) -- POCO (Portable Components) C++ Libraries are a collection of C++ class libraries, conceptually similar to the Java Class Library or the .NET Framework, focused on solutions to frequently-encountered practical problems.
- **portable-snippets** [📁](./portable-snippets) [🌐](https://github.com/GerHobbelt/portable-snippets) -- a collection of public domain (CC0) code snippets written in C for performing various common tasks which are typically OS, architecture, and/or compiler-dependent.  Basically, our goal is to move those annoying preprocessor conditionals from your code to ours.
- **preprocess-corpuses** [📁](./preprocess-corpuses) [🌐](https://github.com/GerHobbelt/preprocess) -- Pipelines for preprocessing corpora.
- **RuntimeCompiledCPlusPlus** [📁](./RuntimeCompiledCPlusPlus) [🌐](https://github.com/GerHobbelt/RuntimeCompiledCPlusPlus) -- Runtime-Compiled C++ (RCC++) is a way to reliably make major changes to your C++ code at runtime and see the results immediately. It's aimed at games development but could be useful in any industry where turnaround times are a bottleneck. RCC++ is primarily designed to shorten iteration times in development - developers can build their project, run it, make changes during runtime and see the results almost immediately. If needed, shipping code can [disable runtime compilation](https://github.com/RuntimeCompiledCPlusPlus/RuntimeCompiledCPlusPlus/wiki/Disabling-runtime-compilation) in a number of ways. RCC++ is not intended as a method to allow end users of a shipped binary to compile modifications, though with some work it can be used this way.
- **RxCpp** [📁](./RxCpp) [🌐](https://github.com/GerHobbelt/RxCpp) -- the Reactive Extensions for C++ (__RxCpp__) is a library of algorithms for values-distributed-in-time. The [__Range-v3__](https://github.com/ericniebler/range-v3) library does the same for values-distributed-in-space.
- **safeclib** [📁](./safeclib) [🌐](https://github.com/GerHobbelt/safeclib) -- Safe C Library implements the secure C11 Annex K[^5] functions on top of most libc implementations, which are missing from them. The ISO TR24731 Bounds Checking Interface documents indicate that the key motivation for the new specification is to help mitigate the ever increasing security attacks, specifically the buffer overrun.
- **safestringlib** [📁](./safestringlib) [🌐](https://github.com/GerHobbelt/safestringlib) -- The Safe String Library is based on the Safe C Library by Cisco, and provides routines for safe string operations (like `strcpy`) and memory routines (like `memcpy`) that are recommended for Linux/Android operating systems, and will also work for Windows. This library is especially useful for cross-platform situations where one library for these routines is preferred.
- **salieri** [📁](./salieri) [🌐](https://github.com/GerHobbelt/salieri) -- provides function arguments' in/out annotation definitions for Microsoft's [source-code annotation language (SAL)](https://msdn.microsoft.com/en-us/library/hh916383.aspx). SAL provides lots of annotations you can use to describe the behavior
- **sdsl-lite** [📁](./sdsl-lite) [🌐](https://github.com/GerHobbelt/sdsl-lite) -- The Succinct Data Structure Library (SDSL) is a powerful and flexible C++11 library implementing succinct data structures. In total, the library contains the highlights of 40 [research publications][SDSLLIT]. Succinct data structures can represent an object (such as a bitvector or a tree) in space close to the information-theoretic lower bound of the object while supporting operations of the original object efficiently. The theoretical time complexity of an operation performed on the classical data structure and the equivalent succinct data structure are (most of the time) identical.
- **siridb-server** [📁](./siridb-server) [🌐](https://github.com/GerHobbelt/siridb-server) -- SiriDB Server is a highly-scalable, robust and super fast time series database. SiriDB uses a unique mechanism to operate without a global index and allows server resources to be added on the fly. SiriDB’s unique query language includes dynamic grouping of time series for easy analysis over large amounts of time series. SiriDB is scalable on the fly and has no downtime while updating or expanding your database. The scalable possibilities enable you to enlarge the database time after time without losing speed. SiriDB is developed to give an unprecedented performance without downtime. A SiriDB cluster distributes time series across multiple pools. Each pool supports active replicas for load balancing and redundancy. When one of the replicas is not available the database is still accessible.
- **splitmerge** [📁](./splitmerge) [🌐](https://github.com/GerHobbelt/splitmerge) -- simple binary file splitter and (re)merger tool.
- **stringi** [📁](./stringi) [🌐](https://github.com/GerHobbelt/stringi) -- fast and portable character string processing in R (with the Unicode ICU).
- **strtk** [📁](./strtk) [🌐](https://github.com/GerHobbelt/strtk) -- the C++ String Toolkit Library (StrTk) consists of robust, optimized and portable string processing algorithms for the C++ language. StrTk is designed to be easy to use and integrate within existing code bases. Furthermore the library has a rich set of features  that makes light work of any kind of string processing task.
- **termcolor** [📁](./termcolor) [🌐](https://github.com/GerHobbelt/termcolor) -- a header-only C++ library for printing colored messages to the terminal. Termcolor uses ANSI color formatting, so you can use it on every system that is used such terminals (most *nix systems, including Linux and Mac OS).
  
  On MS Windows the Windows API is used instead of escape codes but some limitations apply (not everything is supported). That's why it's recommended to enter virtual terminal processing mode and set the TERMCOLOR_USE_ANSI_ESCAPE_SEQUENCES macro to trick termcolor to use ANSI color codes.

- **tinydir** [📁](./tinydir) [🌐](https://github.com/GerHobbelt/tinydir) -- lightweight, portable and easy to integrate C directory and file reader. TinyDir wraps `dirent` for POSIX and `FindFirstFile` for Windows. Windows unicode is supported.
- **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr) -- a very small recursive descent parser and evaluation engine for math expressions.
- **u8_to_std_string** [📁](./u8_to_std_string) [🌐](https://github.com/GerHobbelt/u8_to_std_string) -- C++ u8_to_std_string (`u8` and `char8_t` based string to `std::string`) inlines to convert between `u8` (`char8_t[]`) string constants and `char`-based `std::string` types to shut up C++17 ➜ C++20 transitioning codebases & compilers.
- **visible-url-detector** [📁](./visible-url-detector) [🌐](https://github.com/GerHobbelt/visible-url-detector) -- console app for listing active tab from browsers (Windows)
- **VSNASM** [📁](./VSNASM) [🌐](https://github.com/GerHobbelt/VSNASM) -- a set of build customisations that can be used within Visual Studio to compile assembly code using NASM. Visual Studio integration for the NASM assembler.
- **wil-Win32-Interface-Library** [📁](./wil-Win32-Interface-Library) [🌐](https://github.com/GerHobbelt/wil) -- The Windows Implementation Libraries (WIL) is a header-only C++ library created to make life easier for developers on Windows through readable type-safe C++ interfaces for common Windows coding patterns.
- **win-iconv** [📁](./win-iconv) [🌐](https://github.com/GerHobbelt/win-iconv) -- an `iconv` implementation using Win32 API to convert.
- **zxing-cpp** [📁](./zxing-cpp) [🌐](https://github.com/GerHobbelt/zxing-cpp) -- ZXing-C++ ("zebra crossing") is a multi-format linear/matrix (1D/2D) barcode image processing library implemented in C++. Supported formats include: UPC-A, UPC-E, EAN-8, EAN-13, Code 39, Code 128, QR Code, PDF417, DataMatrix, CodaBar, DataBar, ITF.
- ~~**binary_bakery** [🌐](https://github.com/s9w/binary_bakery) -- resource compiler-like tool: embed any data in your C/C++ application~~
  
  - **removed**; reason: we already have `bin2coff` from MuPDF, which serves this purpose well enough.












## sub-dependencies (libraries which are required by any of the above)

- **abseil-cpp** [📁](./abseil-cpp) [🌐](https://github.com/GerHobbelt/abseil-cpp) -- a collection of C++ code (compliant to C++11) designed to augment the C++ standard library.
- **boost** [📁](./boost) [🌐](https://github.com/GerHobbelt/boost) -- required by several other libraries in this collection
- **cairo** [📁](./cairo) [🌐](https://github.com/GerHobbelt/cairo) -- Cairo: Multi-platform 2D graphics library with support for multiple output devices. Cairo is designed to produce consistent output on all output media while taking advantage of display hardware acceleration when available. Currently supported output targets include the X Window System (via both Xlib and XCB), quartz, win32, and image buffers, as well as PDF, PostScript, and SVG file output. Experimental backends include OpenGL. Cairo is designed to produce consistent output on all output media while taking advantage of display hardware acceleration when available (for example, through the X Render Extension).
- **cairo-demos** [📁](./cairo-demos) [🌐](https://github.com/GerHobbelt/cairo-demos) -- several simple programs intended to demonstrate some of the features of the Cairo graphics library (http://cairographics.org).
- **fftw3** [📁](./fftw3) [🌐](https://github.com/GerHobbelt/fftw3) -- the FFTW library for computing Fourier transforms (version 3.x), maintained by the FFTW authors.
- **fontconfig** [📁](./fontconfig) [🌐](https://github.com/GerHobbelt/fontconfig) -- font configuration and customization library
- **gflags** [📁](./gflags) [🌐](https://github.com/GerHobbelt/gflags) -- google::flags library, used by other libs in this set.
- **glib2** [📁](./glib2) [🌐](https://github.com/GerHobbelt/glib) -- GLib is the low-level core library that forms the basis for projects such as GTK and GNOME.
- **highway** [📁](./highway) [🌐](https://github.com/GerHobbelt/highway) -- dependency of JpegXL
- **htmlstreamparser** [📁](./htmlstreamparser) [🌐](https://github.com/GerHobbelt/htmlstreamparser) -- used in a demo of zsync2
- **jemalloc** [📁](./jemalloc) [🌐](https://github.com/GerHobbelt/jemalloc) -- a general purpose malloc(3) implementation that emphasizes fragmentation avoidance and scalable concurrency support.  jemalloc first came into use as the FreeBSD libc allocator in 2005, and since then it has found its way into numerous applications that rely on its predictable behavior.  In 2010 jemalloc development efforts broadened to include developer support features such as heap profiling and extensive monitoring/tuning hooks.
- **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
- **libcpr** [📁](./libcpr) [🌐](https://github.com/GerHobbelt/cpr) -- wrapper library for cURL; used by zsync2
- **libdiagnostics** [📁](./libdiagnostics) [🌐](https://github.com/GerHobbelt/libdiagnostics) -- a C/C++ diagnostics logging library with support for writing HTML and store images and misc binary data to disk alongside. or when a mere logfile doesn't suffice.
- **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
- **libidn2** [📁](./libidn2) [🌐](https://github.com/GerHobbelt/libidn2) -- international domain name parsing
- **libsmile** [📁](./libsmile) [🌐](https://github.com/GerHobbelt/libsmile) -- C implementation of the Smile binary format (https://github.com/FasterXML/smile-format-specification).
- **mimalloc** [📁](./mimalloc) [🌐](https://github.com/GerHobbelt/mimalloc) -- a compact general purpose allocator with excellent performance.
- **nanosvg** [📁](./nanosvg) [🌐](https://github.com/GerHobbelt/nanosvg) -- a simple stupid single-header-file SVG parser. The output of the parser is a list of cubic bezier shapes. Suitable for anything from rendering scalable icons in your editor application to prototyping a game. NanoSVG supports a wide range of SVG features.
- **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- also used by cURL et al, incidentally.
- **pango** [📁](./pango) [🌐](https://github.com/GerHobbelt/pango) -- a library for layout and rendering of text, with an emphasis on internationalization. Pango can be used anywhere that text layout is needed.
- **pcre** [📁](./pcre) [🌐](https://github.com/GerHobbelt/pcre) -- PCRE2 : Perl-Compatible Regular Expressions. The PCRE2 library is a set of C functions that implement regular expression pattern matching using the same syntax and semantics as Perl 5. PCRE2 has its own native API, as well as a set of wrapper functions that correspond to the POSIX regular expression API. It comes in three forms, for processing 8-bit, 16-bit, or 32-bit code units, in either literal or UTF encoding.
- **protobuf** [📁](./protobuf) [🌐](https://github.com/GerHobbelt/protobuf) -- Protocol Buffers - Google's data interchange format that is a language-neutral, platform-neutral, extensible mechanism for serializing structured data.
  
  - **☹discouraged🤧**; reason: relatively slow run-time and (in my opinion) rather ugly & convoluted approach at build time. Has too much of a Java/CorporateProgramming smell, which has not lessened over the years, unfortunately.

- **scintilla** [📁](./scintilla) [🌐](https://github.com/GerHobbelt/scintilla) -- text editor (part of wxWidgets)
- **snmalloc** [📁](./snmalloc) [🌐](https://github.com/GerHobbelt/snmalloc) -- a high-performance allocator.
- **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
- **ticpp** [📁](./ticpp) [🌐](https://github.com/GerHobbelt/ticpp) -- TinyXML++: XML read/write (is part of wxFormbuilder).
- **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr) -- a very small recursive descent parser and evaluation engine for math expressions.
- **tlx** [📁](./tlx) [🌐](https://github.com/GerHobbelt/tlx) -- a collection of C++ helpers and extensions universally needed, but not found in the STL.
- **tsf** [📁](./tsf) [🌐](https://github.com/GerHobbelt/tsf) -- type-safe printf equivalent for C++ (used by the uberlog submodule)
- **uint128_t** [📁](./uint128_t) [🌐](https://github.com/GerHobbelt/uint128_t) -- an unsigned 128 bit integer type for C++.
- **winflexbison** [📁](./winflexbison) [🌐](https://github.com/GerHobbelt/winflexbison) -- Flex and Bison for Microsoft Windows :: a Windows port of Flex (the fast lexical analyser) and GNU Bison (parser generator). Both `win_flex` and `win_bison` are based on upstream sources but depend on system libraries only.
- **Imath** [🌐](https://github.com/AcademySoftwareFoundation/Imath) -- float16 support lib for OpenEXR format
- ~~**Catch2** [🌐](https://github.com/catchorg/Catch2)~~
  
  - **removed**; reason: we've decided to standardize on a single unittest library (which is well supported in Microsoft Visual Studio, including the Test Explorer view there); where necessary, we'll have to provide a translation layer instead when existing submodules use different test rigs originally.






---













# Libraries in this collection (All of the above, listed in alphabetical order)

- **1D-RGB-color-gradient** [📁](./1D-RGB-color-gradient) [🌐](https://github.com/GerHobbelt/1D-RGB-color-gradient) -- 1D (univariate) continous (smooth) [color gradients](https://en.wikipedia.org/wiki/Color_gradient) (colormaps) for gnuplot.
- **2D-color-gradient-or-Procedural-texture** [📁](./2D-color-gradient-or-Procedural-texture) [🌐](https://github.com/GerHobbelt/2D-color-gradient-or-Procedural-texture) -- 2D continous (smooth) [color gradients](https://en.wikipedia.org/wiki/Color_gradient) (colormaps) for gnuplot.
- **abseil-cpp** [📁](./abseil-cpp) [🌐](https://github.com/GerHobbelt/abseil-cpp) -- a collection of C++ code (compliant to C++11) designed to augment the C++ standard library.
- **adaptiveqf** [📁](./adaptiveqf) [🌐](https://github.com/GerHobbelt/adaptiveqf) -- [Adaptive Quotient Filter (AQF)](https://arxiv.org/abs/2107.02866) supports approximate membership testing and counting the occurrences of items in a data set. Like other AMQs, the AQF has a chance for false positives during queries. However, the AQF has the ability to adapt to false positives after they have occurred so they are not repeated. At the same time, the AQF maintains the benefits of a quotient filter, as it is small and fast, has good locality of reference, scales out of RAM to SSD, and supports deletions, counting, resizing, merging, and highly concurrent access.
- **ADE-graph-management** [📁](./ADE-graph-management) [🌐](https://github.com/GerHobbelt/ade) -- ADE Framework is a graph construction, manipulation, and processing framework.  ADE Framework is suitable for organizing data flow processing and execution.
- **AFLplusplus** [📁](./AFLplusplus) [🌐](https://github.com/GerHobbelt/AFLplusplus) -- American Fuzzy Lop plus plus (AFL++) is a superior fork to Google's AFL fuzzer - more speed, more and better mutations, more and better instrumentation, custom module support, etc.
- **agg** [📁](./agg) [🌐](https://github.com/GerHobbelt/agg) -- Anti-Grain Geometry library, written by Maxim Shemanarev in C++. It is an Open Source, 2D vector graphics library. Agg produces pixel images in memory from vectorial data. AGG doesn't depend on any graphic API or technology. Basically, you can think of AGG as of a rendering engine that produces pixel images in memory from some vectorial data.
- **aho_corasick** [📁](./aho_corasick) [🌐](https://github.com/GerHobbelt/aho_corasick) -- a header only implementation of the Aho-Corasick pattern search algorithm invented by Alfred V. Aho and Margaret J. Corasick. It is a very efficient dictionary matching algorithm that can locate all search patterns against in input text simultaneously in O(n + m), with space complexity O(m) (where n is the length of the input text, and m is the combined length of the search patterns).
- **A-MNS_TemplateMatching** [📁](./A-MNS_TemplateMatching) [🌐](https://github.com/GerHobbelt/A-MNS_TemplateMatching) -- the official code for the PatternRecognition2020 paper: Fast and robust template matching with majority neighbour similarity and annulus projection transformation.
- **annoy** [📁](./annoy) [🌐](https://github.com/GerHobbelt/annoy) -- ANNOY (<b>A</b>pproximate <b>N</b>earest <b>N</b>eighbors <b>O</b>h <b>Y</b>eah) is a C++ library to search for points in space that are close to a given query point. It also creates large read-only file-based data structures that are `mmap`-ped into memory so that many processes may share the same data. ANNOY is almost as fast as the fastest libraries, but what really sets Annoy apart is: it has the ability to use static files as indexes, enabling you to share an index across processes. ANNOY also decouples creating indexes from loading them, so you can pass around indexes as files and map them into memory quickly. ANNOY tries to minimize its memory footprint: the indexes are quite small. This is useful when you want to find nearest neighbors using multiple CPU's. Spotify uses ANNOY for music recommendations.
- **ApprovalTestsCpp** [📁](./ApprovalTestsCpp) [🌐](https://github.com/GerHobbelt/ApprovalTests.cpp) -- Approval Tests for C++: also known as **Golden Master Tests** or **Snapshot Testing**, Approval Tests are an alternative to asserts.
- **arangodb** [📁](./arangodb) [🌐](https://github.com/GerHobbelt/arangodb) -- a scalable open-source multi-model database natively supporting graph, document and search. All supported data models & access patterns can be combined in queries allowing for maximal flexibility.
- **ArborX** [📁](./ArborX) [🌐](https://github.com/GerHobbelt/ArborX) -- a library designed to provide performance portable algorithms for geometric search, similarly to nanoflann and Boost Geometry.
- **archive-hocr-tools** [📁](./archive-hocr-tools) [🌐](https://github.com/GerHobbelt/archive-hocr-tools) -- a python package to ease hOCR parsing in a streaming manner.
- **argparse** [📁](./argparse) [🌐](https://github.com/GerHobbelt/argparse) -- simply include argparse.hpp and start parsing command-line arguments.
- **armadillo** [📁](./armadillo) [🌐](https://github.com/GerHobbelt/armadillo-code) -- C++ library for linear algebra & scientific computing
- **arrayfire** [📁](./arrayfire) [🌐](https://github.com/GerHobbelt/arrayfire) -- a general-purpose tensor library that simplifies the process of software development for the parallel architectures found in CPUs, GPUs, and other hardware acceleration devices. The library serves users in every technical computing market.
- **asio** [📁](./asio) [🌐](https://github.com/GerHobbelt/asio) -- a cross-platform C++ library for network and low-level I/O programming that provides developers with a consistent asynchronous model using a modern C++ approach.
  
  Note: (older) Boost.Asio is also included in Boost.

- **asyncplusplus** [📁](./asyncplusplus) [🌐](https://github.com/GerHobbelt/asyncplusplus) -- Async++ is a lightweight concurrency framework for C++11.
- **asynqro** [📁](./asynqro) [🌐](https://github.com/GerHobbelt/asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.
- **autodiff** [📁](./autodiff) [🌐](https://github.com/GerHobbelt/autodiff) -- a C++17 library that uses modern and advanced programming techniques to enable automatic computation of derivatives in an efficient, easy, and intuitive way.
- **avro** [📁](./avro) [🌐](https://github.com/GerHobbelt/avro) -- Apache Avro™ is a data serialization system.
- **awesome-c** [📁](./awesome-c) [🌐](https://github.com/GerHobbelt/awesome-c) -- a curated list of C good stuff.
- **b2xtranslator** [📁](./b2xtranslator) [🌐](https://github.com/GerHobbelt/b2xtranslator) -- .NET Core library to convert Microsoft Office binary files (doc, xls and ppt) to Open XML (docx, xlsx and pptx). You can use the Open XML SDK to mainpulate those.
- **BaseMatrixOps** [📁](./BaseMatrixOps) [🌐](https://github.com/GerHobbelt/BaseMatrixOps) -- wrappers to C++ linear algebra libraries. No guarantees made about APIs or functionality.
- **basez** [📁](./basez) [🌐](https://github.com/GerHobbelt/basez) -- encode data into/decode data from base16, base32, base32hex, base64 or base64url stream per RFC 4648; MIME base64 Content-Transfer-Encoding per RFC 2045; or PEM Printable Encoding per RFC 1421.
- **bbe** [📁](./bbe) [🌐](https://github.com/GerHobbelt/bbe) -- Binary block editor, i.e. kinda like `sed` for binary files
- **BBHash** [📁](./BBHash) [🌐](https://github.com/GerHobbelt/BBHash) -- Bloom-filter based minimal perfect hash function library.
  
  - **left-for-dead**; reason: has some GCC + Linux specific coding constructs; code isn't clean, which doesn't make my porting effort 'trustworthy'. Overall, if this is the alternative, we'll stick with `gperf`.

- **BCF-cuckoo-index** [📁](./BCF-cuckoo-index) [🌐](https://github.com/GerHobbelt/BCF) -- Better Choice Cuckoo Filter (BCF) is an efficient approximate set representation data structure. Different from the standard Cuckoo Filter (CF), BCF leverages the principle of the power of two choices to select the better candidate bucket during insertion. BCF reduces the average number of relocations of the state-of-the-art CF by 35%.
  
  - **left-for-dead**; reason: has some GCC + Linux specific coding constructs: intrinsics + Linux-only API calls, which increase the cost of porting.

- **bebop** [📁](./bebop) [🌐](https://github.com/GerHobbelt/bebop) -- an extremely simple, fast, efficient, cross-platform serialization format. Bebop is a schema-based binary serialization technology, similar to Protocol Buffers or MessagePack. In particular, Bebop tries to be a good fit for client–server or distributed web apps that need something faster, more concise, and more type-safe than JSON or MessagePack, while also avoiding some of the complexity of Protocol Buffers, FlatBuffers and the like.
- **bhtsne--Barnes-Hut-t-SNE** [📁](./bhtsne--Barnes-Hut-t-SNE) [🌐](https://github.com/GerHobbelt/bhtsne) -- Barnes-Hut t-SNE
- **bibtex-robust-decoder** [📁](./bibtex-robust-decoder) [🌐](https://github.com/GerHobbelt/bibtex-robust-decoder) -- BibTeX parser which is robust: it will cope well with various BibTeX input errors which may be caused by manual entry of a BibTeX record.
- **bibtool** [📁](./bibtool) [🌐](https://github.com/GerHobbelt/bibtool) -- a tool for manipulating BibTeX data bases. BibTeX provides a mean to integrate citations into LaTeX documents. BibTool allows the manipulation of BibTeX files which goes beyond the possibilities -- and intentions -- of BibTeX.
- **bibutils** [📁](./bibutils) [🌐](https://github.com/GerHobbelt/bibutils) -- the `bibutils` set interconverts between various bibliography formats using a common MODS-format XML intermediate. For example, one can convert RIS-format files to Bibtex by doing two transformations: RIS->MODS->Bibtex. By using a common intermediate for N formats, only 2N programs are required and not N²-N.
- **binary_search** [📁](./binary_search) [🌐](https://github.com/GerHobbelt/binary_search) -- includes both the most commonly used binary search variant, as first published by Hermann Bottenbruch in 1962, plus several novel variants with improved performance. The most notable variant, the monobound binary search, executes two to four times faster than the standard binary search on arrays smaller than 1 million 32 bit integers: Boundless Binary Search, Doubletapped Binary Search, Monobound Binary Search, Tripletapped Binary Search, Quaternary Binary Search, Monobound Interpolated Binary Search, Adaptive Binary Search.
- **binlog** [📁](./binlog) [🌐](https://github.com/GerHobbelt/binlog) -- a high performance C++ log library to produce structured binary logs.
- **Bi-Sent2Vec** [📁](./Bi-Sent2Vec) [🌐](https://github.com/GerHobbelt/Bi-Sent2Vec) -- provides cross-lingual numerical representations (features) for words, short texts, or sentences, which can be used as input to any machine learning task with applications geared towards cross-lingual word translation, cross-lingual sentence retrieval as well as cross-lingual downstream NLP tasks. The library is a cross-lingual extension of [Sent2Vec](https://github.com/epfml/sent2vec). Bi-Sent2Vec vectors are also well suited to monolingual tasks as indicated by a marked improvement in the monolingual quality of the word embeddings. (For more details, see [paper](https://arxiv.org/abs/1912.12481))
- **BitFunnel** [📁](./BitFunnel) [🌐](https://github.com/GerHobbelt/BitFunnel) -- the BitFunnel search index is used by [Bing's](http://www.bing.com) super-fresh, news, and media indexes. The algorithm is described in [BitFunnel: Revisiting Signatures for
- **bitsery** [📁](./bitsery) [🌐](https://github.com/GerHobbelt/bitsery) -- header only C++ binary serialization library, designed around the networking requirements for real-time data delivery, especially for games. All cross-platform requirements are enforced at compile time, so serialized data do not store any meta-data information and is as small as possible.
- **BLAKE3** [📁](./BLAKE3) [🌐](https://github.com/GerHobbelt/BLAKE3) -- cryptographic hash
- **blaze** [📁](./blaze) [🌐](https://github.com/GerHobbelt/blaze) -- a high-performance C++ math library for dense and sparse arithmetic. With its state-of-the-art *Smart Expression Template* implementation **Blaze** combines the elegance and ease of use of a domain-specific language with HPC-grade performance, making it one of the most intuitive and fastest C++ math libraries available.
- **BlingFire** [📁](./BlingFire) [🌐](https://github.com/GerHobbelt/BlingFire) -- we are a team at Microsoft called Bling (Beyond Language Understanding), sharing our [FInite State machine and REgular expression manipulation library](https://github.com/microsoft/BlingFire) (FIRE). We use Fire for many linguistic operations inside Bing such as Tokenization, Multi-word expression matching, Unknown word-guessing, Stemming / Lemmatization just to mention a few.
  
  Fire can also be used to improve FastText: see [here](https://github.com/microsoft/BlingFire#8-example-of-reaching-99-accuracy-for-language-detection).
  
  Bling Fire Tokenizer provides state of the art performance for Natural Language text tokenization.

- **blitsort** [📁](./blitsort) [🌐](https://github.com/GerHobbelt/blitsort) -- Blitsort is an in-place rotate quick/merge sort based on the stable out-of-place merge sort [quadsort](https://github.com/scandum/quadsort), stable out-of-place quicksort [fluxsort](https://github.com/scandum/fluxsort), and unstable in-place [crumsort](https://github.com/scandum/crumsort).
- **bloom** [📁](./bloom) [🌐](https://github.com/GerHobbelt/bloom) -- C++ Bloom Filter Library, which offers optimal parameter selection based on expected false positive rate, union, intersection and difference operations between bloom filters and compression of in-use table (increase of false positive probability vs space).
- **bolt** [📁](./bolt) [🌐](https://github.com/GerHobbelt/bolt) -- a deep learning library with high performance and heterogeneous flexibility.
- **boost** [📁](./boost) [🌐](https://github.com/GerHobbelt/boost) -- required by several other libraries in this collection
- **boost-url** [📁](./boost-url) [🌐](https://github.com/GerHobbelt/boost-url) -- a library for manipulating (RFC3986) Uniform Resource Identifiers (URIs) and Locators (URLs).
- **boringssl** [📁](./boringssl) [🌐](https://github.com/GerHobbelt/boringssl) -- BoringSSL is a fork of OpenSSL that is designed to meet Google's needs.
- **BoxFort** [📁](./BoxFort) [🌐](https://github.com/GerHobbelt/BoxFort) -- a simple, cross-platform sandboxing C library powering [Criterion](https://github.com/Snaipe/Criterion). BoxFort provides a simple API to run user code in isolated processes. The main goal of this project **is not** security, but portable code isolation -- if you want complete system isolation, consider using properly configured containers.
- **breakpad** [📁](./breakpad) [🌐](https://github.com/GerHobbelt/breakpad) -- a set of client and server components which implement a crash-reporting system.
  
  - **left-for-dead**; reason: nice idea, but slightly too GCC specific. has some GCC + Linux specific coding constructs: intrinsics + Linux-only API calls, which increase the cost of porting.

- **brotli** [📁](./brotli) [🌐](https://github.com/GerHobbelt/brotli) -- compression
- **CacheLib** [📁](./CacheLib) [🌐](https://github.com/GerHobbelt/CacheLib) -- provides an in-process high performance caching mechanism, thread-safe API to build high throughput, low overhead caching services, with built-in ability to leverage DRAM and SSD caching transparently.
- **cachelot** [📁](./cachelot) [🌐](https://github.com/GerHobbelt/cachelot) -- is an LRU cache that works at the speed of light. The library works with a fixed pre-allocated memory. You tell the memory size and LRU cache is ready. Small metadata, up to 98% memory utilization.
- **caches** [📁](./caches) [🌐](https://github.com/GerHobbelt/caches) -- implements a simple thread-safe cache with several page replacement policies: LRU (Least Recently Used), FIFO (First-In/First-Out), LFU (Least Frequently Used)
- **caffe** [📁](./caffe) [🌐](https://github.com/GerHobbelt/caffe) -- a fast deep learning framework made with expression and modularity in mind, developed by Berkeley AI Research (BAIR)/The Berkeley Vision and Learning Center (BVLC).
  
  - **ho-hum**; reason: uses google protobuffers, CUDA SDK for the GPU access (at least that's how it looks from the header files reported missing by my compiler). Needs more effort before this can be used in the monolithic production builds.

- **cairo** [📁](./cairo) [🌐](https://github.com/GerHobbelt/cairo) -- Cairo: Multi-platform 2D graphics library with support for multiple output devices. Cairo is designed to produce consistent output on all output media while taking advantage of display hardware acceleration when available. Currently supported output targets include the X Window System (via both Xlib and XCB), quartz, win32, and image buffers, as well as PDF, PostScript, and SVG file output. Experimental backends include OpenGL. Cairo is designed to produce consistent output on all output media while taking advantage of display hardware acceleration when available (for example, through the X Render Extension).
- **cairo-demos** [📁](./cairo-demos) [🌐](https://github.com/GerHobbelt/cairo-demos) -- several simple programs intended to demonstrate some of the features of the Cairo graphics library (http://cairographics.org).
- **calibre** [📁](./calibre) [🌐](https://github.com/GerHobbelt/calibre) -- an e-book manager. It can view, convert, edit and catalog e-books in all of the major e-book formats. It can also talk to e-book reader devices. It can go out to the internet and fetch metadata for your books. It can download newspapers and convert them into e-books for convenient reading. It is cross platform, running on Linux, Windows and macOS.
- **capnproto** [📁](./capnproto) [🌐](https://github.com/GerHobbelt/capnproto) -- Cap'n Proto is an insanely fast data interchange format and capability-based RPC system. Think JSON, except binary. Or think [Protocol Buffers](https://github.com/google/protobuf), except faster.
- **Capture2Text** [📁](./Capture2Text) [🌐](https://github.com/GerHobbelt/Capture2Text) -- Linux CLI port of Capture2Text v4.5.1 (Ubuntu) - the OCR results from Capture2Text were generally better than standard Tesseract, so it seemed ideal to make this run on Linux.
- **capture-thread** [📁](./capture-thread) [🌐](https://github.com/GerHobbelt/capture-thread) -- framework for loggers, tracers, and mockers in multithreaded C++ programs. When developing C++ projects, [instrumentation][instrumentation] is frequently used to collect information from the system, inject information into the system, or both. The role of this information within the system rarely lines up with the actual structure of the project. This library is designed to handle all of these situations with minimal intrusion into your project, and without leaking details in your API. The **Capture Thread Library** is designed around the concept of thread-locality, which allows the sharing of static variables *only within the current thread*. Canonical static variables, on the other hand, are problematic due to ownership and thread-safety issues.
- **catboost** [📁](./catboost) [🌐](https://github.com/GerHobbelt/catboost) -- a fast, scalable, high performance Gradient Boosting on Decision Trees library, used for ranking, classification, regression and other machine learning tasks. Supports computation on CPU and GPU.
- **c-blosc2** [📁](./c-blosc2) [🌐](https://github.com/GerHobbelt/c-blosc2) -- a high performance compressor optimized for binary data (i.e. floating point numbers, integers and booleans), designed to transmit data to the processor cache faster than the traditional, non-compressed, direct memory fetch approach via a `memcpy()` OS call.
- **cctz** [📁](./cctz) [🌐](https://github.com/GerHobbelt/cctz) -- CCTZ contains two libraries that cooperate with `<chrono>` to give C++ programmers all the necessary tools for computing with dates, times, and time zones in a simple and correct manner.
- **ccv-nnc** [📁](./ccv-nnc) [🌐](https://github.com/GerHobbelt/ccv) -- C-based/Cached/Core Computer Vision Library. A Modern Computer Vision Library.
- **cdc-file-transfer** [📁](./cdc-file-transfer) [🌐](https://github.com/GerHobbelt/cdc-file-transfer) -- CDC File Transfer contains tools for syncing and streaming files from Windows to Windows or Linux. The tools are based on Content Defined Chunking (CDC), in particular [FastCDC](https://www.usenix.org/conference/atc16/technical-sessions/presentation/xia), to split up files into chunks.
- **cef-pdf** [📁](./cef-pdf) [🌐](https://github.com/GerHobbelt/cef-pdf) -- a command line utility (with embedded HTTP server as an optional mode) for creating PDF documents from HTML content. It uses Google Chrome browser's [Chromium Embedded Framework (CEF)](https://bitbucket.org/chromiumembedded/cef/overview) library for all it's internal work; loading urls, rendering HTML & CSS pages and PDF printing, therefore, it produces perfect, accurate, excellent quality PDF documents.
- **cereal** [📁](./cereal) [🌐](https://github.com/GerHobbelt/cereal) -- C++11 serialization library
- **ceres-solver** [📁](./ceres-solver) [🌐](https://github.com/GerHobbelt/ceres-solver) -- a library for modeling and solving large, complicated optimization problems. It is a feature rich, mature and performant library which has been used in production at Google since 2010. Ceres Solver can solve two kinds of problems: (1) Non-linear Least Squares problems with bounds constraints, and (2) General unconstrained optimization problems.
- **cfgpath** [📁](./cfgpath) [🌐](https://github.com/GerHobbelt/cfgpath) -- cross platform methods for obtaining paths to configuration files
- **chibi-scheme** [📁](./chibi-scheme) [🌐](https://github.com/GerHobbelt/chibi-scheme) -- Chibi-Scheme is a very small library intended for use as an extension and scripting language in C programs.  In addition to support for lightweight VM-based threads, each VM itself runs in an isolated heap allowing multiple VMs to run simultaneously in different OS threads.
- **CHM-lib** [📁](./CHM-lib) [🌐](https://github.com/GerHobbelt/CHMLib) -- as I have several HTML pages stored in this format. See also MHTML: `mht-rip`
- **chromium-snss-parse** [📁](./chromium-snss-parse) [🌐](https://github.com/GerHobbelt/chromium-snss-parse) -- Chromium SNSS parse library parses Chromium's SNSS files, e.g. Current Session, Current Tabs, Last Session, Last Tabs and other files.
- **CImg** [📁](./CImg) [🌐](https://github.com/GerHobbelt/CImg) -- a **small** C++ toolkit for **image processing**.
- **citation-abbreviations** [📁](./citation-abbreviations) [🌐](https://github.com/GerHobbelt/abbreviations) -- Journal Title Abbreviations
- **citation-journals** [📁](./citation-journals) [🌐](https://github.com/GerHobbelt/journals) -- Tools and journal metadata for generating dependent CSL styles.
- **citation-styles** [📁](./citation-styles) [🌐](https://github.com/GerHobbelt/styles) -- the Citation Style Language (CSL) citation styles.
- **citeproc-js** [📁](./citeproc-js) [🌐](https://github.com/GerHobbelt/citeproc-js) -- a JavaScript implementation of the Citation Style Language (CSL) https://citeproc-js.readthedocs.io
- **civetweb** [📁](./civetweb) [🌐](https://github.com/GerHobbelt/civetweb) -- an easy to use, powerful, C (C/C++) embeddable web server with optional CGI, SSL and Lua support.
- **cjose** [📁](./cjose) [🌐](https://github.com/GerHobbelt/cjose) -- JOSE for C/C++
- **clBLAS** [📁](./clBLAS) [🌐](https://github.com/GerHobbelt/clBLAS) -- the OpenCL™ BLAS portion of OpenCL's `clMath`. The complete set of BLAS level 1, 2 & 3 routines is implemented. In addition to GPU devices, the library also supports running on CPU devices to facilitate debugging and multicore programming. The primary goal of `clBLAS` is to make it easier for developers to utilize the inherent performance and power efficiency benefits of heterogeneous computing. `clBLAS` interfaces do not hide nor wrap OpenCL interfaces, but rather leaves OpenCL state management to the control of the user to allow for maximum performance and flexibility. The clBLAS library does generate and enqueue optimized OpenCL kernels, relieving the user from the task of writing, optimizing and maintaining kernel code themselves.
- **CLBlast** [📁](./CLBlast) [🌐](https://github.com/GerHobbelt/CLBlast) -- the tuned OpenCL BLAS library. CLBlast is a modern, lightweight, performant and tunable OpenCL BLAS library written in C++11. It is designed to leverage the full performance potential of a wide variety of OpenCL devices from different vendors, including desktop and laptop GPUs, embedded GPUs, and other accelerators. CLBlast implements BLAS routines: basic linear algebra subprograms operating on vectors and matrices.
- **CLBlast-database** [📁](./CLBlast-database) [🌐](https://github.com/GerHobbelt/CLBlast-database) -- the full database of tuning results for the [CLBlast OpenCL BLAS library](https://github.com/CNugteren/CLBlast). Tuning results are obtained using CLBlast and the [CLTune auto-tuner](https://github.com/CNugteren/CLTune).
- **cld1-language-detect** [📁](./cld1-language-detect) [🌐](https://github.com/GerHobbelt/cld) -- the CLD (Compact Language Detection) library, extracted from the source code for Google's Chromium library. CLD1 probabilistically detects languages in Unicode UTF-8 text.
- **cld2-language-detect** [📁](./cld2-language-detect) [🌐](https://github.com/GerHobbelt/cld2) -- CLD2 probabilistically detects over 80 languages in Unicode UTF-8 text, either plain text or HTML/XML. For mixed-language input, CLD2 returns the top three languages found and their approximate percentages of the total text bytes.  Optionally, it also returns a vector of text spans with the language of each identified. The design target is web pages of at least 200 characters (about two sentences); CLD2 is not designed to do well on very short text.
- **cld3-language-detect** [📁](./cld3-language-detect) [🌐](https://github.com/GerHobbelt/cld3) -- CLD3 is a neural network model for language identification. The inference code extracts character ngrams from the input text and computes the fraction of times each of them appears. The model outputs BCP-47-style language codes, shown in the table below. For some languages, output is differentiated by script. Language and script names from Unicode CLDR.
- **cli11** [📁](./cli11) [🌐](https://github.com/GerHobbelt/CLI11) -- command line options parser
- **clipp** [📁](./clipp) [🌐](https://github.com/GerHobbelt/clipp) -- commandline parser
  
  - **left-for-dead**; reason: looks really nice, but MSVC coughs up some pretty-hard-to-diagnose compiler errors and warnings. The writer of this library is clearly better versed in writing C++ templating code than *me*, alas. Initial attempts to fix the issues left me in the dirt, humiliated, and reading up on the latest C++ *goodnesses* did not improve my success rate, alas.

- **Clipper2** [📁](./Clipper2) [🌐](https://github.com/GerHobbelt/Clipper2) -- a Polygon <a href="https://en.wikipedia.org/wiki/Clipping_(computer_graphics)">Clipping</a> and <a href="https://en.wikipedia.org/wiki/Parallel_curve">Offsetting</a> library.
- **CLTune** [📁](./CLTune) [🌐](https://github.com/GerHobbelt/CLTune) -- automatic OpenCL kernel tuning for CLBlast: CLTune is a C++ library which can be used to automatically tune your OpenCL and CUDA kernels. The only thing you'll need to provide is a tuneable kernel and a list of allowed parameters and values.
- **cmph-hasher** [📁](./cmph-hasher) [🌐](https://github.com/GerHobbelt/cmph) -- C Minimal Perfect Hashing Library for both small and (very) large hash sets.
- **colormap-shaders** [📁](./colormap-shaders) [🌐](https://github.com/GerHobbelt/colormap-shaders) -- a collection of shaders to draw color maps.
- **ColorSpace** [📁](./ColorSpace) [🌐](https://github.com/GerHobbelt/ColorSpace) -- library for converting between color spaces and comparing colors.
- **color-util** [📁](./color-util) [🌐](https://github.com/GerHobbelt/color-util) -- a header-only C++11 library for handling colors, including color space converters between RGB, XYZ, Lab, etc. and color difference calculators such as CIEDE2000.
- **comdb2-bdb** [📁](./comdb2-bdb) [🌐](https://github.com/GerHobbelt/comdb2) -- a clustered RDBMS built on Optimistic Concurrency Control techniques. It provides multiple isolation levels, including Snapshot and Serializable Isolation.
- **compact_enc_det** [📁](./compact_enc_det) [🌐](https://github.com/GerHobbelt/compact_enc_det) -- Compact Encoding Detection (CED for short) is a library written in C++ that scans given raw bytes and detect the most likely text encoding.
- **completesearch** [📁](./completesearch) [🌐](https://github.com/GerHobbelt/completesearch) -- a fast and interactive search engine for *context-sensitive prefix search* on a given collection of documents. It does not only provide search results, like a regular search engine, but also completions for the last (maybe only partially typed) query word that lead to a hit.
- **concurrencpp** [📁](./concurrencpp) [🌐](https://github.com/GerHobbelt/concurrencpp) -- the C++ concurrency library: concurrencpp is a tasking library for C++ allowing developers to write highly concurrent applications easily and safely by using tasks, executors and coroutines.
- **concurrentqueue** [📁](./concurrentqueue) [🌐](https://github.com/GerHobbelt/concurrentqueue) -- moodycamel::ConcurrentQueue, an industrial-strength and fast multi-producer, multi-consumer lock-free concurrent queue for C++11.
- **coost** [📁](./coost) [🌐](https://github.com/GerHobbelt/coost) -- A tiny boost library in C++11. `coost` (formerly known as `cocoyaxi`) is an elegant and efficient cross-platform C++ base library, it is not as heavy as `boost`, but still provides enough powerful features.
- **cpp-btree** [📁](./cpp-btree) [🌐](https://github.com/GerHobbelt/cpp-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- **cppdap** [📁](./cppdap) [🌐](https://github.com/GerHobbelt/cppdap) -- a C++11 library (["SDK"](https://microsoft.github.io/debug-adapter-protocol/implementors/sdks/)) implementation of the [Debug Adapter Protocol](https://microsoft.github.io/debug-adapter-protocol/), providing an API for implementing a DAP client or server. `cppdap` provides C++ type-safe structures for the full [DAP specification](https://microsoft.github.io/debug-adapter-protocol/specification), and provides a simple way to add custom protocol messages.
- **cppflow** [📁](./cppflow) [🌐](https://github.com/GerHobbelt/cppflow) -- run TensorFlow models in c++ without Bazel, without TensorFlow installation and without compiling Tensorflow.
- **cpp-httplib** [📁](./cpp-httplib) [🌐](https://github.com/GerHobbelt/cpp-httplib) -- an extremely easy to setup C++11 cross platform HTTP/HTTPS library. 
  
  **NOTE**: This library uses 'blocking' socket I/O. If you are looking for a library with 'non-blocking' socket I/O, this is not the one that you want.

- **cpp-ipc** [📁](./cpp-ipc) [🌐](https://github.com/GerHobbelt/cpp-ipc) -- a high-performance inter-process communication using shared memory on Linux/Windows.
- **cppjieba** [📁](./cppjieba) [🌐](https://github.com/GerHobbelt/cppjieba) -- the C++ version of the Chinese "Jieba" project:
  
  - Supports loading a custom user dictionary, using the '|' separator when multipathing or the ';' separator for separate, multiple, dictionaries.
  - Supports 'utf8' encoding.
  - The project comes with a relatively complete unit test, and the stability of the core function Chinese word segmentation (utf8) has been tested by the online environment.

- **cpplocate** [📁](./cpplocate) [🌐](https://github.com/GerHobbelt/cpplocate) -- a cross-platform C++ library that provides tools for applications to locate their binary files and data assets, as well as those of dependent modules.
- **cpp-netlib** [📁](./cpp-netlib) [🌐](https://github.com/GerHobbelt/cpp-netlib) -- modern C++ network programming library: `cpp-netlib` is a collection of network-related routines/implementations geared towards providing a robust cross-platform networking library.
- **CppNumericalSolvers** [📁](./CppNumericalSolvers) [🌐](https://github.com/GerHobbelt/CppNumericalSolvers) -- a header-only C++17 BFGS / L-BFGS-B optimization library.
- **cpp_rest_sdk** [📁](./cpp_rest_sdk) [🌐](https://github.com/GerHobbelt/cpprestsdk) -- the C++ REST SDK is a Microsoft project for cloud-based client-server communication in native code using a modern asynchronous C++ API design. This project aims to help C++ developers connect to and interact with services.
- **cpp-terminal** [📁](./cpp-terminal) [🌐](https://github.com/GerHobbelt/cpp-terminal) -- CPP-Terminal is a small C++ library for writing platform independent terminal-based applications. It follows the "Zero-overhead principle" and limits externally included files to the C++ STL. Being crossplatform we support Windows, Linux and MacOS and provide a unified API across all platforms. Our main features are consisting of Colors, Keyboard input, terminal resize handling, as well as other common terminal functionality. It's also possible to open a managed terminal from a windows GUI application.
- **cpptoml** [📁](./cpptoml) [🌐](https://github.com/GerHobbelt/cpptoml) -- a header-only library for parsing [TOML][toml] configuration files. This includes support for the new DateTime format, inline tables, multi-line basic and raw strings, digit separators, hexadecimal integers, octal integers, binary integers, and float special values.
- **cppzmq** [📁](./cppzmq) [🌐](https://github.com/GerHobbelt/cppzmq) -- header-only C++ binding for libzmq.
- **cpuinfo** [📁](./cpuinfo) [🌐](https://github.com/GerHobbelt/cpuinfo) -- CPU & hardware info
- **cpython** [📁](./cpython) [🌐](https://github.com/GerHobbelt/cpython) -- Python version 3. Note: Building a complete Python installation requires the use of various additional third-party libraries, depending on your build platform and configure options.  Not all standard library modules are buildable or useable on all platforms.
- **cqf** [📁](./cqf) [🌐](https://github.com/GerHobbelt/cqf) -- [A General-Purpose Counting Filter: Counting Quotient Filter (CQF)](https://dl.acm.org/doi/10.1145/3035918.3035963) supports approximate membership testing and counting the occurrences of items in a data set. This general-purpose AMQ is small and fast, has good locality of reference, scales out of RAM to SSD, and supports deletions, counting (even on skewed data sets), resizing, merging, and highly concurrent access.
- **cr** [📁](./cr) [🌐](https://github.com/GerHobbelt/cr) -- a single file header-only live reload solution for C, written in C++: simple public API, 3 functions to use only (and another to export); works and tested on Linux, MacOSX and Windows; based on dynamic reloadable binary (.so/.dylib/.dll).
- **crc32c** [📁](./crc32c) [🌐](https://github.com/GerHobbelt/crc32c) -- a few CRC32C implementations under an umbrella that dispatches to a suitable implementation based on the host computer's hardware capabilities. CRC32C is specified as the CRC that uses the iSCSI polynomial in [RFC 3720](https://tools.ietf.org/html/rfc3720#section-12.1). The polynomial was introduced by G. Castagnoli, S. Braeuer and M. Herrmann. CRC32C is used in software such as Btrfs, ext4, Ceph and leveldb.
- **createprocess-windows** [📁](./createprocess-windows) [🌐](https://github.com/GerHobbelt/createprocess-windows) -- drive `CreateProcess` Win32 API
- **CRFpp** [📁](./CRFpp) [🌐](https://github.com/GerHobbelt/crfpp) -- CRF++ is a simple, customizable, and open source implementation of <a href="http://www.cis.upenn.edu/~pereira/papers/crf.pdf">Conditional Random Fields (CRFs)</a> for segmenting/labeling sequential data. CRF++ is designed for generic purpose and will be applied to a variety of NLP tasks, such as Named Entity Recognition, Information Extraction and Text Chunking.
- **crfsuite** [📁](./crfsuite) [🌐](https://github.com/GerHobbelt/crfsuite) -- an implementation of Conditional Random Fields (CRFs) for labeling sequential data.
- **CRFsuite-extended** [📁](./CRFsuite-extended) [🌐](https://github.com/GerHobbelt/CRFSuiteEx) -- a fork of [Naoaki Okazaki's](http://www.chokkan.org/) implementation of conditional random fields (CRFs).
- **Criterion** [📁](./Criterion) [🌐](https://github.com/GerHobbelt/Criterion) -- a dead-simple, yet extensible, C and C++ unit testing framework.
- **CRoaring** [📁](./CRoaring) [🌐](https://github.com/GerHobbelt/CRoaring) -- portable Roaring bitmaps in C (and C++). Bitsets, also called bitmaps, are commonly used as fast data structures. Unfortunately, they can use too much memory. To compensate, we often use compressed bitmaps. Roaring bitmaps are compressed bitmaps which tend to outperform conventional compressed bitmaps such as WAH, EWAH or Concise. They are used by several major systems such as Apache Lucene and derivative systems such as Solr and Elasticsearch, etc.. The CRoaring library is used in several systems such as Apache Doris.
- **crow** [📁](./crow) [🌐](https://github.com/GerHobbelt/crow) -- IPC / server framework. Crow is a very fast and easy to use C++ micro web framework (inspired by Python Flask).
  
  Interface looks nicer than `oatpp`...

- **crumsort** [📁](./crumsort) [🌐](https://github.com/GerHobbelt/crumsort) -- is a hybrid quicksort / mergesort algorithm. The sort is in-place, unstable, adaptive, branchless, and has exceptional performance.
- **cryptopp** [📁](./cryptopp) [🌐](https://github.com/GerHobbelt/cryptopp) -- crypto library
- **CryptSync** [📁](./CryptSync) [🌐](https://github.com/GerHobbelt/CryptSync) -- a small utility that synchronizes two folders while encrypting the contents in one folder. That means one of the two folders has all files unencrypted (the files you work with) and the other folder has all the files encrypted. This is best used together with cloud storage tools like OneDrive, DropBox or Google Drive.
- **csv-parser** [📁](./csv-parser) [🌐](https://github.com/GerHobbelt/csv-parser) -- Vince's CSV Parser: there's plenty of other CSV parsers in the wild, but I had a hard time finding what I wanted. Inspired by Python's `csv` module, I wanted a library with **simple, intuitive syntax**. Furthermore, I wanted support for special use cases such as calculating statistics on very large files. Thus, this library was created with these following goals in mind.
- **csvquote** [📁](./csvquote) [🌐](https://github.com/GerHobbelt/csvquote) -- smart and simple CSV processing on the command line. This program can be used at the start and end of a text processing pipeline so that regular unix command line tools can properly handle CSV data that contain commas and newlines inside quoted data fields. Without this program, embedded special characters would be incorrectly interpreted as separators when they are inside quoted data fields.
- **csync2** [📁](./csync2) [🌐](https://github.com/GerHobbelt/csync2) -- a cluster synchronization tool. It can be used to keep files on multiple hosts in a cluster in sync. Csync2 can handle complex setups with much more than just 2 hosts, handle file deletions and can detect conflicts.
- **CTCWordBeamSearch** [📁](./CTCWordBeamSearch) [🌐](https://github.com/GerHobbelt/CTCWordBeamSearch) -- Connectionist Temporal Classification (CTC) decoder with dictionary and Language Model (LM).
- **CTPL-Thread-Pool** [📁](./CTPL-Thread-Pool) [🌐](https://github.com/GerHobbelt/CTPL) -- Modern and efficient C++ Thread Pool Library. More specifically, there are some threads dedicated to the pool and a container of jobs. The jobs come to the pool dynamically. A job is fetched and deleted from the container when there is an idle thread. The job is then run on that thread.
- **ctsa** [📁](./ctsa) [🌐](https://github.com/GerHobbelt/ctsa) -- a Univariate Time Series Analysis and ARIMA Modeling Package in ANSI C: CTSA is a C software package for univariate time series analysis. ARIMA and Seasonal ARIMA models have been added as of 10/30/2014. 07/24/2020 Update: SARIMAX and Auto ARIMA added. Documentation will be added in the coming days. Software is still in beta stage and older ARIMA and SARIMA functions are now superseded by SARIMAX.
- **cuckoofilter** [📁](./cuckoofilter) [🌐](https://github.com/GerHobbelt/cuckoofilter) -- Cuckoo Filter is a Bloom filter replacement for approximated set-membership queries. While Bloom filters are well-known space-efficient data structures to serve queries like "if item x is in a set?", they do not support deletion. Their variances to enable deletion (like counting Bloom filters) usually require much more space. Cuckoo ﬁlters provide the ﬂexibility to add and remove items dynamically. A cuckoo filter is based on cuckoo hashing (and therefore named as cuckoo filter).  It is essentially a cuckoo hash table storing each key's fingerprint. Cuckoo hash tables can be highly compact, thus a cuckoo filter could use less space than conventional Bloom ﬁlters, for applications that require low false positive rates (< 3%).
- **cuckoo-index** [📁](./cuckoo-index) [🌐](https://github.com/GerHobbelt/cuckoo-index) -- Cuckoo Index (CI) is a lightweight secondary index structure that represents the many-to-many relationship between keys and partitions of columns in a highly space-efficient way. CI associates variable-sized fingerprints in a Cuckoo filter with compressed bitmaps indicating qualifying partitions. The problem of finding all partitions that possibly contain a given lookup key is traditionally solved by maintaining one filter (e.g., a Bloom filter) per partition that indexes all unique key values contained in this partition. To identify all partitions containing a key, we would need to probe all per-partition filters (which could be many). Depending on the storage medium, a false positive there can be very expensive. Furthermore, secondary columns typically contain many duplicates (also across partitions). Cuckoo Index (CI) addresses these drawbacks of per-partition filters. (It must know all keys at build time, though.)
- **cURL** [📁](../../thirdparty/curl) [🌐](https://github.com/GerHobbelt/thirdparty-curl) -- the ubiquitous [libcurl](http://curl.haxx.se/libcurl).
- **curl-impersonate** [📁](./curl-impersonate) [🌐](https://github.com/GerHobbelt/curl-impersonate) -- a special build of [curl](https://github.com/curl/curl) that can impersonate the four major browsers: Chrome, Edge, Safari & Firefox. curl-impersonate is able to perform TLS and HTTP handshakes that are identical to that of a real browser.
- **curl-www** [📁](./curl-www) [🌐](https://github.com/GerHobbelt/curl-www) -- the curl.se web site contents.
- **CurvatureFilter** [📁](./CurvatureFilter) [🌐](https://github.com/GerHobbelt/CurvatureFilter) -- Curvature filters are efficient solvers for variational models. Traditional solvers, such as gradient descent or Euler Lagrange Equation, start at the total energy and use diffusion scheme to carry out the minimization. When the initial condition is the original image, the data fitting energy always increases while the regularization energy always reduces during the optimization, as illustrated in the below figure. Thus, regularization energy must be the dominant part since the total energy has to decrease. Therefore, **Curvature filters focus on minimizing the regularization term,** whose minimizers are already known. For example, if the regularization is Gaussian curvature, the developable surfaces minimize this energy. Therefore, in curvature filter, developable surfaces are used to approximate the data. **As long as the decreased amount in the regularization part is larger than the increased amount in the data fitting energy, the total energy is reduced.**
- **cvmatio** [📁](./cvmatio) [🌐](https://github.com/GerHobbelt/cvmatio) -- an open source Matlab v7 MAT file parser written in C++, giving users the ability to interact with binary MAT files in their own projects.
- **CxImage** [📁](./CxImage) [🌐](https://github.com/GerHobbelt/CxImage) -- venerated library for reading and creating many image file formats.
- **cxxopts** [📁](./cxxopts) [🌐](https://github.com/GerHobbelt/cxxopts) -- a lightweight C++ option parser library, supporting the standard GNU style syntax for options.
- **cxxtest** [📁](./cxxtest) [🌐](https://github.com/GerHobbelt/cxxtest) -- a unit testing framework for C++ that is similar in spirit to JUnit, CppUnit, and xUnit. CxxTest is easy to use because it does not require precompiling a CxxTest testing library, it employs no advanced features of C++ (e.g. RTTI) and it supports a very flexible form of test discovery.
- **cxxtest_catch_2_gtest** [📁](./cxxtest_catch_2_gtest) [🌐](https://github.com/GerHobbelt/cxxtest_catch_2_gtest) -- quick & dirty converter from various test suites to googletest, i.e. allows us to use a single test framework, despite some libraries having been set up to use another, e.g. [Catch2](https://github.com/catchorg/Catch2).
- **Cysboard** [📁](./Cysboard) [🌐](https://github.com/GerHobbelt/Cysboard) -- a lightweight system monitor similar to `conky` but with html and css for themes.
- **datamash** [📁](./datamash) [🌐](https://github.com/GerHobbelt/datamash) -- GNU Datamash is a command-line program which performs basic numeric, textual and statistical operations on input textual data files. It is designed to be portable and reliable, and aid researchers to easily automate analysis pipelines, without writing code or even short scripts.
- **date** [📁](./date) [🌐](https://github.com/GerHobbelt/date) -- a combo of several separate C++11/C++14/C++17 libraries, all geared towards formatting and working with date and time stamps in human-centric formats.
- **datetimepp** [📁](./datetimepp) [🌐](https://github.com/GerHobbelt/datetimepp) -- datetime++ is an attempt to port [Python Datetime](https://docs.python.org/3/library/datetime.html) to C++. Finally easy datetime management in C++ !
- **dateutils** [📁](./dateutils) [🌐](https://github.com/GerHobbelt/dateutils) -- a bunch of tools that revolve around fiddling with dates and times on the command line with a strong focus on use cases that arise when dealing with large amounts of financial data.
- **DBoW2** [📁](./DBoW2) [🌐](https://github.com/GerHobbelt/DBoW2) -- a C++ library for indexing and converting images into a bag-of-word representation. It implements a hierarchical tree for approximating nearest neighbours in the image feature space and creating a visual vocabulary. DBoW2 also implements an image database with inverted and direct files to index images and enabling quick queries and feature comparisons.
- **dbscan** [📁](./dbscan) [🌐](https://github.com/GerHobbelt/dbscan) -- Density-Based Spatial Clustering of Applications with Noise (DBSCAN) and Related Algorithms: a fast C++ (re)implementation of several density-based algorithms with a focus on the DBSCAN family for clustering spatial data. The package includes: DBSCAN, HDBSCAN, OPTICS/OPTICSXi, FOSC, Jarvis-Patrick clustering, LOF (Local outlier factor), GLOSH (Global-Local Outlier Score from Hierarchies), kd-tree based kNN search, Fixed-radius NN search
- **DCF-cuckoo-index** [📁](./DCF-cuckoo-index) [🌐](https://github.com/GerHobbelt/DCF) -- the Dynamic Cuckoo Filter (DCF) is an efficient approximate membership test data structure. Different from the classic Bloom filter and its variants, DCF is especially designed for highly dynamic datasets and supports extending and reducing its capacity. The DCF design is the first to achieve both reliable item deletion and flexibly extending/reducing for approximate set representation and membership testing. DCF outperforms the state-of-the-art DBF designs in both speed and memory consumption.
- **debugbreak** [📁](./debugbreak) [🌐](https://github.com/GerHobbelt/debugbreak) -- allows you to put breakpoints in your C/C++ code with a call to **`debug_break()`**.
- **decision-tree** [📁](./decision-tree) [🌐](https://github.com/GerHobbelt/decision-tree) -- a decision tree classifier. Decision trees are a simple machine learning algorithm that use a series of features of an observation to create a prediction of a target outcome class.
- **delegate** [📁](./delegate) [🌐](https://github.com/GerHobbelt/delegate) -- an embedded friendly alternative to `std::function`. The main purpose is to store callable things such as free functions, member functions, and functors. Once stored, the delegate can be called without knowledge of the type of stored thing. The `delegate` guarantees no heap allocation and [is `trivially_copyable`](https://en.cppreference.com/w/cpp/named_req/TriviallyCopyable). It will never throw exceptions itself. Intended use is as general callback storage (think function pointer analog). The price to pay is that the delegate only stores a pointer to referenced functor objects or objects to call member functions on. The user needs to handle the lifetime of a referred object. In addition, the delegation object has a smaller footprint compared to common `std::function` implementations, using only 2 pointers (free function pointer and void pointer). This is small enough so that a delegate will use small object optimization.
- **density** [📁](./density) [🌐](https://github.com/GerHobbelt/density) -- a superfast compression library. It is focused on high-speed compression, at the best ratio possible. **All three** of DENSITY's algorithms are currently at the **pareto frontier** of compression speed vs ratio (cf. [here](https://github.com/inikep/lzbench/blob/master/lzbench18_sorted.md) for an independent benchmark).
- **densityxx** [📁](./densityxx) [🌐](https://github.com/GerHobbelt/densityxx) -- the c++ version of `density`, which is a super fast compress library.
- **detect-character-encoding** [📁](./detect-character-encoding) [🌐](https://github.com/GerHobbelt/detect-character-encoding) -- detect character encoding using [ICU](http://site.icu-project.org).  **Tip:** If you don’t need ICU in particular, consider using [ced](https://github.com/sonicdoe/ced), which is based on Google’s lighter [compact_enc_det](https://github.com/google/compact_enc_det) library.
- **DGM-CRF** [📁](./DGM-CRF) [🌐](https://github.com/GerHobbelt/DGM) -- DGM (Direct Graphical Models) is a cross-platform C++ library implementing various tasks in probabilistic graphical models with pairwise and complete (dense) dependencies. The library aims to be used for the Markov and Conditional Random Fields (MRF / CRF), Markov Chains, Bayesian Networks, _etc_.
- **diffutils** [📁](./diffutils) [🌐](https://github.com/GerHobbelt/diffutils) -- the GNU diff, diff3, sdiff, and cmp utilities. Their features are a superset of the Unix features and they are significantly faster.
- **dirent** [📁](./dirent) [🌐](https://github.com/GerHobbelt/dirent) -- POSIX `dirent.h` ported to MS Windows (Win32/Win64); used by several libraries.
- **DiskANN** [📁](./DiskANN) [🌐](https://github.com/GerHobbelt/DiskANN) -- DiskANN is a suite of scalable, accurate and cost-effective approximate nearest neighbor search algorithms for large-scale vector search that support real-time changes and simple filters.
- **djvulibre** [📁](./djvulibre) [🌐](https://github.com/GerHobbelt/djvulibre) -- DjVu (pronounced "déjà vu") a set of compression technologies, a file format, and a software platform for the delivery over the Web of digital documents, scanned documents, and high resolution images.
- **dlfcn-win32** [📁](./dlfcn-win32) [🌐](https://github.com/GerHobbelt/dlfcn-win32) -- an implementation of `dlfcn` for Windows. `dlfcn` is a set of functions that allows runtime dynamic library loading. It is standardized in the POSIX. Windows also provide similar routines, but not in a POSIX-compatible way. This library attempts to implement a wrapper around the Windows functions to make programs written for POSIX that use dlfcn work in Windows without any modifications.
- **dlib** [📁](./dlib) [🌐](https://github.com/GerHobbelt/dlib) -- machine learning algorithms
- **doctest** [📁](./doctest) [🌐](https://github.com/GerHobbelt/doctest) -- a C++ testing framework, by far the fastest both in compile times (by [**orders of magnitude**](doc/markdown/benchmarks.md)) and runtime compared to other feature-rich alternatives.
- **docxBox** [📁](./docxBox) [🌐](https://github.com/GerHobbelt/docxBox) -- CLI tool for Word DOCX templating and analysis.
- **doh** [📁](./doh) [🌐](https://github.com/GerHobbelt/doh) -- a libcurl-using application that resolves a host name using DNS-over-HTTPS (DoH).
- **doxa** [📁](./doxa) [🌐](https://github.com/GerHobbelt/Doxa) -- Δoxa Binarization Framework (ΔBF) is an image binarization framework which focuses primarily on local adaptive thresholding algorithms, aimed at providing the building blocks one might use to advance the state of handwritten manuscript binarization.
  
  Supported Algorithms:
  
  * Otsu - "A threshold selection method from gray-level histograms", 1979.
  * Bernsen - "Dynamic thresholding of gray-level images", 1986.
  * Niblack - "An Introduction to Digital Image Processing", 1986.
  * Sauvola - "Adaptive document image binarization", 1999.
  * Wolf - "Extraction and Recognition of Artificial Text in Multimedia Documents", 2003.
  * Gatos - "Adaptive degraded document image binarization", 2005. (Partial)
  * NICK - "Comparison of Niblack inspired Binarization methods for ancient documents", 2009.
  * Su - "Binarization of Historical Document Images Using the Local Maximum and Minimum", 2010.
  * T.R. Singh - "A New local Adaptive Thresholding Technique in Binarization", 2011.
  * Bataineh - "An adaptive local binarization method for document images based on a novel thresholding method and dynamic windows", 2011. (unreproducible)
  * ISauvola - "ISauvola: Improved Sauvola’s Algorithm for Document Image Binarization", 2016.
  * WAN - "Binarization of Document Image Using Optimum Threshold Modification", 2018.
  
  Optimizations:
  
  * Shafait - "Efficient Implementation of Local Adaptive Thresholding Techniques Using Integral Images", 2008.
  * Petty - An algorithm for efficiently calculating the min and max of a local window.  Unpublished, 2019.
  * Chan - "Memory-efficient and fast implementation of local adaptive binarization methods", 2019.
  
  Performance Metrics:
  
  * Overall Accuracy
  * F-Measure
  * Peak Signal-To-Noise Ratio (PSNR)
  * Negative Rate Metric (NRM)
  * Matthews Correlation Coefficient (MCC)
  * Distance-Reciprocal Distortion Measure (DRDM) - "An Objective Distortion Measure for Binary Document Images Based on Human Visual Perception", 2002.
  
  Native Image Support:
  
  * Portable Any-Map: PBM (P4), 8-bit PGM (P5), PPM (P6), PAM (P7)

- **doxygen-awesome-css** [📁](./doxygen-awesome-css) [🌐](https://github.com/GerHobbelt/doxygen-awesome-css) -- a custom **CSS theme for Doxygen HTML-documentation** with lots of customization parameters.
- **drogon** [📁](./drogon) [🌐](https://github.com/GerHobbelt/drogon) -- a C++14/17-based HTTP application framework to easily build various types of web application server programs.
- **dtl-diff-template-library** [📁](./dtl-diff-template-library) [🌐](https://github.com/GerHobbelt/dtl) -- `dtl` is the diff template library written in C++.
- **dtoa-benchmark** [📁](./dtoa-benchmark) [🌐](https://github.com/GerHobbelt/dtoa-benchmark) -- This benchmark evaluates the performance of conversion from double precision IEEE-754 floating point (double) to ASCII string.
- **duckdb** [📁](./duckdb) [🌐](https://github.com/GerHobbelt/duckdb) -- DuckDB is a high-performance analytical database system. It is designed to be fast, reliable, portable, and easy to use. DuckDB provides a rich SQL dialect, with support far beyond basic SQL. DuckDB supports arbitrary and nested correlated subqueries, window functions, collations, complex types (arrays, structs), and more.
- **dynet** [📁](./dynet) [🌐](https://github.com/GerHobbelt/dynet) -- The Dynamic Neural Network Toolkit. DyNet is a neural network library developed by Carnegie Mellon University and many others. It is written in C++ (with bindings in Python) and is designed to be efficient when run on either CPU or GPU, and to work well with networks that have dynamic structures that change for every training instance. For example, these kinds of networks are particularly important in natural language processing tasks, and DyNet has been used to build state-of-the-art systems for syntactic parsing, machine translation, morphological inflection, and many other application areas.
- **easyexif** [📁](./easyexif) [🌐](https://github.com/GerHobbelt/easyexif) -- EasyEXIF is a tiny, lightweight C++ library that parses basic (EXIF) information out of JPEG files. It uses only the std::string library and is otherwise pure C++. You pass it the binary contents of a JPEG file, and it parses several of the most important EXIF fields for you.
- **easyloggingpp** [📁](./easyloggingpp) [🌐](https://github.com/GerHobbelt/easyloggingpp) -- Easylogging++ is single header efficient logging library for C++ applications. It is extremely powerful, highly extendable and configurable to user's requirements. It provides ability to write your own _sinks_ (via a feature referred as `LogDispatchCallback`).
- **ecal** [📁](./ecal) [🌐](https://github.com/GerHobbelt/ecal) -- the *enhanced Communication Abstraction Layer* (*eCAL*) is a middleware that enables scalable, high performance interprocess communication on a single computer node or between different nodes in a computer network. eCAL uses a publish-subscribe pattern to automatically connect different nodes in the network. eCAL automatically chooses the best available data transport mechanism for each link:
  
  - Shared memory for local communication (incredible fast!)
  - UDP for network communication

- **ECMA262** [📁](./ECMA262) [🌐](https://github.com/GerHobbelt/ecma262) -- ECMAScript :: the source for the current draft of ECMA-262, the ECMAScript® Language Specification.
- **edit-distance** [📁](./edit-distance) [🌐](https://github.com/GerHobbelt/editdistance) -- a fast implementation of the edit distance (Levenshtein distance). The algorithm used in this library is proposed by _Heikki Hyyrö, "Explaining and extending the bit-parallel approximate string matching algorithm of Myers", (2001) <http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.19.7158&rep=rep1&type=pdf>_.
- **efsw** [📁](./efsw) [🌐](https://github.com/GerHobbelt/efsw) -- cross-platform file system watcher and notifier
- **EigenRand** [📁](./EigenRand) [🌐](https://github.com/GerHobbelt/EigenRand) -- EigenRand: The Fastest C++11-compatible random distribution generator for Eigen. EigenRand is a header-only library for [Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page), providing vectorized random number engines and vectorized random distribution generators.  Since the classic Random functions of Eigen rely on an old C function `rand()`, there is no way to control random numbers and no guarantee for quality of generated numbers. In addition, Eigen's Random is slow because `rand()` is hard to vectorize. EigenRand provides a variety of random distribution functions similar to C++11 standard's random functions, which can be vectorized and easily integrated into Eigen's expressions of Matrix and Array. You can get 5~10 times speed by just replacing old Eigen's Random or unvectorizable c++11 random number generators with EigenRand.
- **emphf-hash** [📁](./emphf-hash) [🌐](https://github.com/GerHobbelt/emphf) -- an efficient external-memory algorithm for the construction of minimal perfect hash functions for large-scale key sets, focusing on speed and low memory usage (2.61 N bits plus a small constant factor).
- **enca** [📁](./enca) [🌐](https://github.com/GerHobbelt/enca) -- Enca (Extremely Naive Charset Analyser) consists of two main components: `libenca`, an encoding detection library, and `enca`, a command line frontend, integrating libenca and several charset conversion libraries and tools (GNU `recode`, UNIX98 `iconv`, perl `Unicode::Map`, `cstocs`).
- **enkiTS** [📁](./enkiTS-TaskScheduler) [🌐](https://github.com/GerHobbelt/enkiTS) -- a permissively licensed C++11 Task Scheduler for creating parallel programs. The primary goal of enkiTS is to help developers create programs which handle both data and task level parallelism to utilize the full performance of multicore CPUs, whilst being lightweight (only a small amount of code) and easy to use.
  
  Features:
  
    - Braided parallelism - can issue tasks from another task as well as from the thread which created the Task System, and has a simple task interface for both data and task parallelism.
    - Can pin tasks to a given thread - can schedule a task which will only be run on the specified thread.
    - Can register external threads to use with enkiTS
    - Can set task priorities - Up to 5 task priorities can be configured via define ENKITS_TASK_PRIORITIES_NUM (defaults to 3). Higher priority tasks are run before lower priority ones.
    - Can wait for pinned tasks - useful for creating IO threads which do no other work.
    - Completion Actions - can perform an action on task completion. This avoids the expensive action of adding the task to the scheduler, and can be used to safely delete a completed task.
    - Dependencies - can set dependencies between tasks.
    - Fast, then scalable - designed for consumer devices first, so performance on a low number of threads is important, followed by scalability.
    - Lightweight
    - Up-front Allocation friendly - designed for zero allocations during scheduling.

- **ensmallen** [📁](./ensmallen) [🌐](https://github.com/GerHobbelt/ensmallen) -- a high-quality C++ library for non-linear numerical optimization. `ensmallen` provides many types of optimizers that can be used for virtually any numerical optimization task. This includes gradient descent techniques, gradient-free optimizers, and constrained optimization. Examples include L-BFGS, SGD, CMAES and Simulated Annealing.
- **EtwExplorer** [📁](./EtwExplorer) [🌐](https://github.com/GerHobbelt/EtwExplorer) -- View ETW Provider metadata. Event Tracing for Windows (ETW) is a logging facility built into the Windows OS. Modern providers register a manifest that describes all the events they support, with their properties. Classic providers register a MOF instead.
- **eventpp** [📁](./eventpp) [🌐](https://github.com/GerHobbelt/eventpp) -- a C++ event library for callbacks, event dispatcher, and event queue. With eventpp you can easily implement signal and slot mechanism, publisher and subscriber pattern, or observer pattern.
- **everything-curl** [📁](./everything-curl) [🌐](https://github.com/GerHobbelt/everything-curl) -- *Everything curl* is an extensive guide for all things curl. The project, the command-line tool, the library, how everything started and how it came to be the useful tool it is today. It explains how we work on developing it further, what it takes to use it, how you can contribute with code or bug reports and why millions of existing users use it.
- **exiv2** [📁](./exiv2) [🌐](https://github.com/GerHobbelt/exiv2) -- a C++ library and a command-line utility to read, write, delete and modify Exif, IPTC, XMP and ICC image metadata.
- **ex-leptonica-freetype-harfbuzz** [📁](./ex-leptonica-freetype-harfbuzz) [🌐](https://github.com/GerHobbelt/ex-leptonica-freetype-harfbuzz) -- a simple sample application to get from zero to rendering unicode text using harfbuzz to do the text layout, freetype for the underlying font magic and some trivial code for the anti-aliased font rasterization.
- **expected-lite** [📁](./expected-lite) [🌐](https://github.com/GerHobbelt/expected-lite) -- a single-file header-only library to represent value objects that either contain a valid value or an error. The library is a partly implementation of the proposal for [`std::expected`](https://en.cppreference.com/w/cpp/utility/expected) for use with C++11 and later.
- **exprtk** [📁](./exprtk) [🌐](https://github.com/GerHobbelt/exprtk) -- C++ Mathematical Expression Toolkit Library is a simple to use, easy to integrate and extremely efficient run-time mathematical expression parsing and evaluation engine. The parsing engine supports numerous forms of functional and logic processing semantics and is easily extensible.
- **Extensible-Storage-Engine** [📁](./Extensible-Storage-Engine) [🌐](https://github.com/GerHobbelt/Extensible-Storage-Engine) -- ESE is an embedded / ISAM-based database engine, that provides rudimentary table and indexed access. However the library provides many other strongly layered and thus reusable sub-facilities as well: A Synchronization / Locking library, a Data-structures / STL-like library, an OS-abstraction layer, and a Cache Manager, as well as the full-blown database engine itself.
- **extract** [📁](../../thirdparty/extract) [🌐](https://github.com/GerHobbelt/thirdparty_extract) -- clone of git://git.ghostscript.com/extract.git
- **eytzinger** [📁](./eytzinger) [🌐](https://github.com/GerHobbelt/eytzinger) -- `fixed_eytzinger_map` is a free implementation of Eytzinger’s layout, in a form of an STL-like generic associative container, broadly compatible with a well-established access patterns. An Eytzinger map, or BFS(breadth-first search) map, places elements in a lookup order, which leads to a better memory locality. In practice, such container can outperform searching in sorted arrays, like `boost::flat_map`, due to less cache misses made in a lookup process. In comparison with RB-based trees, like `std::map`, lookup in Eytzinger map can be multiple times faster. Some comparison graphs are [given here](https://kazakov.life/2017/03/06/cache-friendly-associative-container/).
- **faiss** [📁](./faiss) [🌐](https://github.com/GerHobbelt/faiss) -- a library for efficient similarity search and clustering of dense vectors. It contains algorithms that search in sets of vectors of any size, up to ones that possibly do not fit in RAM. It also contains supporting code for evaluation and parameter tuning. Faiss is written in C++ with complete wrappers for Python/numpy. Some of the most useful algorithms are implemented on the GPU. It is developed primarily at Facebook AI Research.
- **falconn** [📁](./falconn) [🌐](https://github.com/GerHobbelt/FALCONN) -- FALCONN (FAst Lookups of Cosine and Other Nearest Neighbors) is a library with algorithms for the nearest neighbor search problem. The algorithms in FALCONN are based on [Locality-Sensitive Hashing](https://en.wikipedia.org/wiki/Locality-sensitive_hashing) (LSH), which is a popular class of methods for nearest neighbor search in high-dimensional spaces. The goal of FALCONN is to provide very efficient and well-tested implementations of LSH-based data structures.  Currently, FALCONN supports two LSH families for the [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity): hyperplane LSH and cross polytope LSH. Both hash families are implemented with multi-probe LSH in order to minimize memory usage. Moreover, FALCONN is optimized for both dense and sparse data. Despite being designed for the cosine similarity, FALCONN can often be used for nearest neighbor search under the Euclidean distance or a maximum inner product search.
- **farmhash** [📁](./farmhash) [🌐](https://github.com/GerHobbelt/farmhash) -- FarmHash, a family of hash functions. FarmHash provides hash functions for strings and other data.  The functions mix the input bits thoroughly but are not suitable for cryptography.
- **farver-OKlab** [📁](./farver-OKlab) [🌐](https://github.com/GerHobbelt/farver) -- provides very fast, vectorised functions for conversion of colours between different colour spaces, colour comparisons (distance between colours), encoding/decoding, and channel manipulation in colour strings.
- **fastapprox** [📁](./fastapprox) [🌐](https://github.com/GerHobbelt/fastapprox) -- approximate and vectorized versions of common mathematical functions (e.g. exponential, logarithm, and power, lgamma and digamma, cosh, sinh, tanh, cos, sin, tan, sigmoid and erf, Lambert W)
- **fastBPE** [📁](./fastBPE) [🌐](https://github.com/GerHobbelt/fastBPE) -- text tokenization / ngrams
- **fastfilter_cpp** [📁](./fastfilter_cpp) [🌐](https://github.com/GerHobbelt/fastfilter_cpp) -- Fast Filter: Fast approximate membership filter implementations (C++, research library)
- **fast_float** [📁](./fast_float) [🌐](https://github.com/GerHobbelt/fast_float) -- fast and exact implementation of the C++ `from_chars` functions for float and double types: 4x faster than `strtod`
- **FastGlobbing** [📁](./FastGlobbing) [🌐](https://github.com/GerHobbelt/FastGlobbing) -- a Fast String Matching with Wildcards, Globs, and Gitignore-Style Globs. Wildcard string matching and globbing isn’t as trivial as it may seem at first.  In fact, mistakes in the past resulted in serious vulnerabilities such as denial of service due to exponential blow-up in execution time. This fast non-recursive algorithm performs safe gitignore-style wildcard matching.  Implementations in C, C++, Java, Javascript and Python are included.
- **fastgron** [📁](./fastgron) [🌐](https://github.com/GerHobbelt/fastgron) -- `fastgron` makes JSON greppable super fast! `fastgron` transforms JSON into discrete assignments to make it easier to grep for what you want and see the absolute 'path' to it. It eases the exploration of APIs that return large blobs of JSON but lack documentation.
- **fast-lzma2** [📁](./fast-lzma2) [🌐](https://github.com/GerHobbelt/fast-lzma2) -- the __Fast LZMA2 Library__ is a lossless high-ratio data compression library based on Igor Pavlov's LZMA2 codec from 7-zip. Binaries of 7-Zip forks which use the algorithm are available in the [7-Zip-FL2 project](https://github.com/conor42/7-Zip-FL2/releases/), the [7-Zip-zstd project](https://github.com/mcmilk/7-Zip-zstd/releases/), and the active fork of [p7zip](https://github.com/szcnick/p7zip/releases/). The library is also embedded in a fork of XZ Utils, named [FXZ Utils](https://github.com/conor42/fxz).
- **fast_pfor** [📁](./fast_pfor) [🌐](https://github.com/GerHobbelt/FastPFor) -- a research library with integer compression schemes. It is broadly applicable to the compression of arrays of 32-bit integers where most integers are small. The library seeks to exploit SIMD instructions (SSE) whenever possible.
- **fastPRNG** [📁](./fastPRNG) [🌐](https://github.com/GerHobbelt/fastPRNG) -- a single header-only FAST 32/64 bit PRNG (pseudo-random generator), highly optimized to obtain faster code from compilers, it's based on **xoshiro** / **xoroshiro** ([**Blackman/Vigna**](http://prng.di.unimi.it/)), **xorshift** and other [**Marsaglia**](https://en.wikipedia.org/wiki/George_Marsaglia) algorithms.
- **fastText** [📁](./fastText) [🌐](https://github.com/GerHobbelt/fastText) -- [fastText](https://fasttext.cc/) is a library for efficient learning of word representations and sentence classification. Includes language detection feeatures.
- **fatal** [📁](./fatal) [🌐](https://github.com/GerHobbelt/fatal) -- Fatal (Facebook Template Library) is a library for fast prototyping software in modern C++. It provides facilities heavily based on template meta-programming, while keeping most of the complexity under-the-hood, to enhance the expressive power of C++. Fatal also provides lessons on how to write meta-programs, as well as on how to make the best use of the library, starting at beginner levels.
- **faup** [📁](./faup) [🌐](https://github.com/GerHobbelt/faup) -- **Faup** stands for Finally An Url Parser and is a library and command line tool to parse URLs and normalize fields with two constraints: (1) work with real-life urls (resilient to badly formated ones), and (2) be fast: no allocation for string parsing and read characters only once.
- **ffht** [📁](./ffht) [🌐](https://github.com/GerHobbelt/FFHT) -- FFHT (Fast Fast Hadamard Transform) is a library that provides a heavily optimized C99 implementation of the Fast Hadamard Transform. FFHT also provides a thin Python wrapper that allows to perform the Fast Hadamard Transform on one-dimensional [NumPy](http://www.numpy.org/) arrays. The Hadamard Transform is a linear orthogonal map defined on real vectors whose length is a _power of two_. For the precise definition, see the [Wikipedia entry](https://en.wikipedia.org/wiki/Hadamard_transform). The Hadamard Transform has been recently used a lot in various machine learning and numerical algorithms. FFHT uses [AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions) to speed up the computation.
- **FFmpeg** [📁](./FFmpeg) [🌐](https://github.com/GerHobbelt/FFmpeg) -- a collection of libraries and tools to process multimedia content such as audio, video, subtitles and related metadata.
- **fftw3** [📁](./fftw3) [🌐](https://github.com/GerHobbelt/fftw3) -- the FFTW library for computing Fourier transforms (version 3.x), maintained by the FFTW authors.
- **fifo_map** [📁](./fifo_map) [🌐](https://github.com/GerHobbelt/fifo_map) -- a FIFO-ordered associative container for C++. It has the same interface as `std::map`, it can be used as drop-in replacement.
- **figtree** [📁](./figtree) [🌐](https://github.com/GerHobbelt/figtree) -- FIGTree is a library that provides a C/C++ and MATLAB interface for speeding up the computation of the Gauss Transform.
- **file** [📁](./file) [🌐](https://github.com/GerHobbelt/file) -- `file` filetype recognizer tool & mimemagic
- **filecopyex3** [📁](./filecopyex3) [🌐](https://github.com/GerHobbelt/filecopyex3) -- a FAR plugin designed to bring to life all kinds of perverted fantasies on the topic of file copying, each of which will speed up the process by 5% :smile:. At the moment, it has implemented the main features that are sometimes quite lacking in standard copiers.
- **filesystem** [📁](./filesystem) [🌐](https://github.com/GerHobbelt/filesystem) -- a header-only single-file `std::filesystem` compatible helper library, based on the C++17 and C++20 specs, but implemented for C++11, C++14, C++17 or C++20 (tightly following the C++17 standard with very few documented exceptions). It is of course in its own namespace `ghc::filesystem` to not interfere with a regular `std::filesystem` should you use it in a mixed C++17 environment (which is possible).
- **FIt-SNE** [📁](./FIt-SNE) [🌐](https://github.com/GerHobbelt/FIt-SNE) -- FFT-accelerated implementation of t-Stochastic Neighborhood Embedding ([t-SNE](https://lvdmaaten.github.io/tsne/)), which is a highly successful method for dimensionality reduction and visualization of high dimensional datasets.  A popular [implementation](https://github.com/lvdmaaten/bhtsne) of t-SNE uses the Barnes-Hut algorithm to approximate the gradient at each iteration of gradient descent.
- **flann** [📁](./flann) [🌐](https://github.com/GerHobbelt/flann) -- FLANN (Fast Library for Approximate Nearest Neighbors) is a library for performing fast approximate nearest neighbor searches in high dimensional spaces. It contains a collection of algorithms we found to work best for nearest neighbor search and a system for automatically choosing the best algorithm and optimum parameters depending on the dataset.
- **flat_hash_map** [📁](./flat_hash_map) [🌐](https://github.com/GerHobbelt/flat_hash_map) -- a very fast hashtable.
- **flat.hpp** [📁](./flat.hpp) [🌐](https://github.com/GerHobbelt/flat.hpp) -- a library of flat vector-like based associative containers.
- **flinng** [📁](./flinng) [🌐](https://github.com/GerHobbelt/FLINNG) -- Filters to Identify Near-Neighbor Groups (FLINNG) is a near neighbor search algorithm outlined in the paper [Practical Near Neighbor Search via Group Testing](https://arxiv.org/pdf/2106.11565.pdf).
- **flip** [📁](./flip) [🌐](https://github.com/GerHobbelt/flip) -- ꟻLIP: A Tool for Visualizing and Communicating Errors in Rendered Images, implements the [LDR-ꟻLIP](https://research.nvidia.com/publication/2020-07_FLIP) and [HDR-ꟻLIP](https://research.nvidia.com/publication/2021-05_HDR-FLIP) image error metrics.
- **fluent-bit** [📁](./fluent-bit) [🌐](https://github.com/GerHobbelt/fluent-bit) -- [Fluent Bit](http://fluentbit.io) is a fast Log Processor and Forwarder for Linux, Windows, Embedded Linux, MacOS and BSD family operating systems. It's part of the Graduated [Fluentd](http://fluentd.org) Ecosystem and a [CNCF](https://cncf.io) sub-project. Fluent Bit allows to collect log events or metrics from different sources, process them and deliver them to different backends such as [Fluentd](http://fluentd.org), Elasticsearch, Splunk, DataDog, Kafka, New Relic, Azure services, AWS services, Google services, NATS, InfluxDB or any custom HTTP end-point.
- **fluxsort** [📁](./fluxsort) [🌐](https://github.com/GerHobbelt/fluxsort) -- is a stable quicksort / mergesort hybrid algorithm. The sort is stable, adaptive, branchless, and has exceptional performance.
- **fmem** [📁](./fmem) [🌐](https://github.com/GerHobbelt/fmem) -- a cross-platform library for opening memory-backed libc streams (a la UNIX `fmemopen()`).
- **fmemopen_windows** [📁](./fmemopen_windows) [🌐](https://github.com/GerHobbelt/fmemopen_windows) -- provides **FILE\*** handler based on memory backend for fread,fwrite etc. just like `fmemopen` on linux, but now on MS Windows.
- **fmt** [📁](./fmt) [🌐](https://github.com/GerHobbelt/fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
- **fmtlog** [📁](./fmtlog) [🌐](https://github.com/GerHobbelt/fmtlog) -- a performant fmtlib-style logging library with latency in nanoseconds (i.e. using fmt library format).
- **fnmatch** [📁](./fnmatch) [🌐](https://github.com/GerHobbelt/fnmatch)
- **folly** [📁](./folly) [🌐](https://github.com/GerHobbelt/folly) -- Folly (acronymed loosely after Facebook Open Source Library) is a library of C++14 components designed with practicality and efficiency in mind. **Folly contains a variety of core library components used extensively at Facebook**. In particular, it's often a dependency of Facebook's other open source C++ efforts and place where those projects can share code.
- **fontconfig** [📁](./fontconfig) [🌐](https://github.com/GerHobbelt/fontconfig) -- font configuration and customization library
- **fontview** [📁](./fontview) [🌐](https://github.com/GerHobbelt/fontview) -- “FontView” is a little demo app that shows the contents of a font file. It opens `*.ttf`, `*.otf`, `*.ttc`, `*.otc`, `*.pfa`, and `*.pfb` files. To render text, FontView uses the open-source libraries [FreeType](https://www.freetype.org/), [HarfBuzz](https://www.freedesktop.org/wiki/Software/HarfBuzz/), and [Raqm](http://host-oman.github.io/libraqm/).
- **fpng** [📁](./fpng) [🌐](https://github.com/GerHobbelt/fpng) -- a very fast C++ .PNG image reader/writer for 24/32bpp images. fpng was written to see just how fast you can write .PNG's without sacrificing too much compression. The files written by fpng conform to the [PNG standard](https://www.w3.org/TR/PNG/), are readable using any PNG decoder, and load or validate successfully using libpng, wuffs, lodepng, stb_image, and [pngcheck](http://www.libpng.org/pub/png/apps/pngcheck.html). PNG files written using fpng can also be read using fpng faster than other PNG libraries, due to its explicit use of [Length-Limited Prefix Codes](https://create.stephan-brumme.com/length-limited-prefix-codes/) and an [optimized decoder](https://fastcompression.blogspot.com/2015/10/huffman-revisited-part-4-multi-bytes.html) that exploits the properties of these codes.
- **FreeFileSync** [📁](./FreeFileSync) [🌐](https://github.com/GerHobbelt/FreeFileSync) -- a folder comparison and synchronization application that creates and manages backup copies of all your important files. Instead of copying every file every time, FreeFileSync determines the differences between a source and a target folder and transfers only the minimum amount of data needed. FreeFileSync is available for Windows, macOS, and Linux.
- **freeglut** [📁](../../thirdparty/freeglut) [🌐](https://github.com/GerHobbelt/thirdparty-freeglut) -- Freeglut, the Free OpenGL Utility Toolkit, is meant to be a free alternative to Mark Kilgard's GLUT library. In short, freeglut can be used by OpenGL programs to perform those tasks which would normally require platform-specific code. Tasks like creating a window, creating an OpenGL context and binding it to the window, and processing input events. Freeglut provides a concise and elegant API to handle those tasks, in a platform-independent manner, keeping the application simple and portable.
- **freetype** [📁](../../thirdparty/freetype) [🌐](https://github.com/GerHobbelt/thirdparty-freetype2) -- FreeType is a freely available software library to render fonts.
- **fribidi** [📁](./fribidi) [🌐](https://github.com/GerHobbelt/fribidi) -- GNU FriBidi: the Free Implementation of the [Unicode Bidirectional Algorithm]. One of the missing links stopping the penetration of free software in Middle East is the lack of support for the Arabic and Hebrew alphabets. In order to have proper Arabic and Hebrew support, the bidi algorithm needs to be implemented. It is our hope that this library will stimulate more free software in the Middle Eastern countries.
- **friso** [📁](./friso) [🌐](https://github.com/GerHobbelt/friso) -- high performance Chinese tokenizer with both GBK and UTF-8 charset support based on MMSEG algorithm.
- **frozen** [📁](./frozen) [🌐](https://github.com/GerHobbelt/frozen) -- provides 0 cost initialization for immutable containers, fixed-size containers, and various algorithms.
- **fswatch** [📁](./fswatch) [🌐](https://github.com/GerHobbelt/fswatch) -- a cross-platform file change monitor that receives notifications when the contents of the specified files or directories are modified.
- **fxt** [📁](./fxt) [🌐](https://github.com/GerHobbelt/fxt) -- a large scale feature extraction tool for text-based machine learning.
- **g3log** [📁](./g3log) [🌐](https://github.com/GerHobbelt/g3log) -- G3log is an asynchronous logger with three main features: 
  
  1. Intuitive `LOG(...)` API
  2. `Design-by-contract` `CHECK(...)` functionality
  3. Fatal crash handling for graceful shutdown of the logged process without loosing any log details up to the point of the crash.

- **gbenchmark** [📁](./gbenchmark) [🌐](https://github.com/GerHobbelt/benchmark) -- a library to benchmark code snippets, similar to unit tests.
- **gcem** [📁](./gcem) [🌐](https://github.com/GerHobbelt/gcem) -- GCE-Math (**G**eneralized **C**onstant **E**xpression Math) is a templated C++ library enabling compile-time computation of mathematical functions.
- **gdbm** [📁](./gdbm) [🌐](https://github.com/GerHobbelt/gdbm) -- GNU dbm is a set of NoSQL database routines that use extendable hashing and works similar to the standard UNIX `dbm` routines.
- **gegl** [📁](./gegl) [🌐](https://github.com/GerHobbelt/gegl) -- *GEGL* (Generic Graphics Library) is a data flow based image processing framework, providing floating point processing and non-destructive image processing capabilities to [GNU Image Manipulation Program](http://www.gimp.org/) and other projects. With GEGL you chain together processing operations to represent the desired image processing pipeline. GEGL provides operations for image loading and storing, color adjustments, GIMPs artistic filters and more forms of image processing GEGL can be used on the command-line with the same syntax that can be used for creating processing flows interactively with text from GIMP using gegl-graph.
- **gencolormap** [📁](./gencolormap) [🌐](https://github.com/GerHobbelt/gencolormap) -- generate color maps for visualization. A variety of methods for sequential, diverging, and qualitative maps is available.
- **genieclust** [📁](./genieclust) [🌐](https://github.com/GerHobbelt/genieclust) -- a faster and more powerful version of *Genie* (Fast and Robust Hierarchical Clustering with Noise Point Detection) – a robust and outlier resistant clustering algorithm (see Gagolewski, Bartoszuk, Cena, 2016).
- **getopt** [📁](./getopt) [🌐](https://github.com/GerHobbelt/getopt_port) -- an original implementation of `getopt` and `getopt_long` with limited GNU extensions. Provided under the BSD license, to allow non-GPL projects to use `getopt`-style command-line parsing.
- **gettext** [📁](./gettext) [🌐](https://github.com/GerHobbelt/gettext) -- the GNU gettext package.  It is interesting for authors or maintainers of other packages or programs which they want to see internationalized.  As one step the handling of messages in different languages should be implemented.  For this task GNU gettext provides the needed tools and library functions. It is also interesting for translators, because GNU gettext provides the 'msgmerge' program, which prepares a message catalog before a translation update.
- **gflags** [📁](./gflags) [🌐](https://github.com/GerHobbelt/gflags) -- google::flags library, used by other libs in this set.
- **gibbs-lda** [📁](./gibbs-lda) [🌐](https://github.com/GerHobbelt/gibbs-lda) -- modified GibbsLDA++: A C/C++ Implementation of Latent Dirichlet Allocation by by Xuan-Hieu Phan and Cam-Tu Nguyen.
- **glfw** [📁](./glfw) [🌐](https://github.com/GerHobbelt/glfw) -- GLFW is an Open Source, multi-platform library for OpenGL, OpenGL ES and Vulkan application development.  It provides a simple, platform-independent API for creating windows, contexts and surfaces, reading input, handling events, etc.
- **glib2** [📁](./glib2) [🌐](https://github.com/GerHobbelt/glib) -- GLib is the low-level core library that forms the basis for projects such as GTK and GNOME.
- **glob** [📁](./glob) [🌐](https://github.com/GerHobbelt/glob) -- directory scanner
- **glog** [📁](./glog) [🌐](https://github.com/GerHobbelt/glog) -- Google Logging is a C++98 library that implements application-level logging. The library provides logging APIs based on C++-style streams and various helper macros.
- **glyph_name** [📁](./glyph_name) [🌐](https://github.com/GerHobbelt/glyph_name) -- a library for computing Unicode sequences from glyph names according to the Adobe Glyph Naming convention: https://github.com/adobe-type-tools/agl-specification
- **gmic** [📁](./gmic) [🌐](https://github.com/GerHobbelt/gmic) -- a Full-Featured Open-Source Framework for Image Processing. It provides several different **[user interfaces](https://en.wikipedia.org/wiki/User_interface)** to convert/manipulate/filter/visualize **generic image datasets**, ranging from _1d scalar signals_ to _3d+t sequences of multi-spectral volumetric images_, hence including _2d color images_.
- **gmic-community** [📁](./gmic-community) [🌐](https://github.com/GerHobbelt/gmic-community) -- community contributions for the GMIC Full-Featured Open-Source Framework for Image Processing. It provides several different **[user interfaces](https://en.wikipedia.org/wiki/User_interface)** to convert/manipulate/filter/visualize **generic image datasets**, ranging from _1d scalar signals_ to _3d+t sequences of multi-spectral volumetric images_, hence including _2d color images_.
- **GMM-HMM-kMeans** [📁](./GMM-HMM-kMeans) [🌐](https://github.com/GerHobbelt/KMeans-GMM-HMM) -- HMM based on KMeans and GMM
- **GMMreg** [📁](./GMMreg) [🌐](https://github.com/GerHobbelt/Project_gmmreg) -- implementations of the robust point set registration framework described in the paper "[Robust Point Set Registration Using Gaussian Mixture Models](https://github.com/bing-jian/gmmreg/blob/master/gmmreg_PAMI_preprint.pdf)", Bing Jian and Baba C. Vemuri, IEEE Transactions on Pattern Analysis and Machine Intelligence, 2011, 33(8), pp. 1633-1645. An earlier conference version of this work, "A Robust Algorithm for Point Set Registration Using Mixture of Gaussians, Bing Jian and Baba C. Vemuri.", appeared in the proceedings of ICCV'05.
- **gmt** [📁](./gmt) [🌐](https://github.com/GerHobbelt/gmt) -- GMT (Generic Mapping Tools) is an open source collection of about 100 command-line tools for manipulating geographic and Cartesian data sets (including filtering, trend fitting, gridding, projecting, etc.) and producing high-quality illustrations ranging from simple x-y plots via contour maps to artificially illuminated surfaces, 3D perspective views and animations. The GMT supplements add another 50 more specialized and discipline-specific tools. GMT supports over 30 map projections and transformations and requires support data such as [GSHHG](http://www.soest.hawaii.edu/pwessel/gshhg/) coastlines, rivers, and political boundaries and optionally [DCW](http://www.soest.hawaii.edu/pwessel/dcw) country polygons.
- **gnuplot** [📁](./gnuplot) [🌐](https://github.com/GerHobbelt/gnuplot) -- the Gnuplot Plotting Utility is a command-line driven interactive function plotting utility for linux, OSX, MSWin, VMS, and many other platforms. Gnuplot handles both curves (2 dimensions) and surfaces (3 dimensions). Surfaces can be plotted as a mesh fitting the specified function, floating in the 3-d coordinate space, or as a contour plot on the x-y plane. For 2-d plots, there are also many plot styles including lines, points, boxes, heat maps, stacked histograms, and contoured projections of 3D data. Graphs may be labeled with arbitrary labels and arrows, axis labels, a title, date and time, and a key.  The interface includes command-line editing and history on most platforms.
- **gnuplot_i** [📁](./gnuplot_i) [🌐](https://github.com/GerHobbelt/gnuplot_i) -- gnuplot C interface library enables developers to create [gnuplots](http://www.gnuplot.info/) directly from their C programs.
- **gnuplot-palettes** [📁](./gnuplot-palettes) [🌐](https://github.com/GerHobbelt/gnuplot-palettes) -- color palettes for gnuplot.
- **GoldFish-CBOR** [📁](./GoldFish-CBOR) [🌐](https://github.com/GerHobbelt/GoldFish) -- a fast JSON and CBOR streaming library, without using memory. GoldFish can parse and generate very large [JSON](http://json.org) or [CBOR](http://cbor.io) documents. It has some similarities to a [SAX](https://en.wikipedia.org/wiki/Simple_API_for_XML) parser, but doesn't use an event driven API, instead the user of the GoldFish interface is in control. GoldFish intends to be the easiest and one of the fastest JSON and CBOR streaming parser and serializer to use.
- **google-diff-match-patch** [📁](./google-diff-match-patch) [🌐](https://github.com/GerHobbelt/diff-match-patch) -- Diff, Match and Patch offers robust algorithms to perform the operations required for synchronizing plain text.
  
  1. Diff:
     * Compare two blocks of plain text and efficiently return a list of differences.
  2. Match:
     * Given a search string, find its best fuzzy match in a block of plain text. Weighted for both accuracy and location.
  3. Patch:
     * Apply a list of patches onto plain text. Use best-effort to apply patch even when the underlying text doesn't match.
  
  Originally built in 2006 to power Google Docs.

- **google::marl** [📁](./google-marl) [🌐](https://github.com/GerHobbelt/marl) -- a hybrid thread / fiber task scheduler written in C++ 11. Marl uses a combination of fibers and threads to allow efficient execution of tasks that can block, while keeping a fixed number of hardware threads.
- **googletest** [📁](./googletest) [🌐](https://github.com/GerHobbelt/googletest) -- unit test framework: see the [GoogleTest User's Guide](https://google.github.io/googletest/) for documentation. We recommend starting with the [GoogleTest Primer](https://google.github.io/googletest/primer.html).
  
  Features:
  
  * An [xUnit](https://en.wikipedia.org/wiki/XUnit) test framework.
  * Test discovery.
  * A rich set of assertions.
  * User-defined assertions.
  * Death tests.
  * Fatal and non-fatal failures.
  * Value-parameterized tests.
  * Type-parameterized tests.
  * Various options for running the tests.
  * XML test report generation.

- **gperf-hash** [📁](./gperf-hash) [🌐](https://github.com/GerHobbelt/gperf) -- This is GNU gperf, a program that generates C/C++ perfect hash functions for sets of key words.
- **GQ-gumbo-css-selectors** [📁](./GQ-gumbo-css-selectors) [🌐](https://github.com/GerHobbelt/GQ) -- GQ is a CSS Selector Engine for [Gumbo Parser](https://github.com/google/gumbo-parser) written in C++11. Using Gumbo Parser as a backend, GQ can parse input HTML and allow users to select and modify elements in the parsed document with CSS Selectors and the provided simple, but powerful mutation API.
- **gram_savitzky_golay** [📁](./gram_savitzky_golay) [🌐](https://github.com/GerHobbelt/gram_savitzky_golay) -- Savitzky-Golay filtering based on Gram polynomials, as described in [General Least-Squares Smoothing and Differentiation by the Convolution (Savitzky-Golay) Method](http://pubs.acs.org/doi/pdf/10.1021/ac00205a007)
- **graph-coloring** [📁](./graph-coloring) [🌐](https://github.com/GerHobbelt/graph-coloring) -- a C++ Graph Coloring Package. This project has two primary uses:
  
  * As an executable for finding the chromatic number for an input graph (in edge list or edge matrix format)
  * As a library for finding the particular coloring of an input graph (represented as a `map<string,vector<string>>` edge list)

- **GraphicsMagick** [📁](./GraphicsMagick) [🌐](https://github.com/GerHobbelt/graphicsmagick) -- provides a comprehensive collection of utilities, programming interfaces, and GUIs, to support file format conversion, image processing, and 2D vector rendering. GraphicsMagick is originally based on ImageMagick from ImageMagick Studio (which was originally written by John Cristy at Dupont). The goal of GraphicsMagick is to provide the highest quality product possible while encouraging open and active participation from all interested developers.
- **graphit** [📁](./graphit) [🌐](https://github.com/GerHobbelt/graphit) -- a High-Performance Domain Specific Language for Graph Analytics.
- **grok-jpeg2000** [📁](./grok-jpeg2000) [🌐](https://github.com/GerHobbelt/grok) -- World's Leading Open Source JPEG 2000 Codec
  
  Features:
  
  * support for new **High Throughput JPEG 2000 (HTJ2K)** standard
  * fast random-access sub-image decoding using `TLM` and `PLT` markers
  * full encode/decode support for `ICC` colour profiles
  * full encode/decode support for `XML`,`IPTC`, `XMP` and `EXIF` meta-data
  * full encode/decode support for `monochrome`, `sRGB`, `palette`, `YCC`, `extended YCC`, `CIELab` and `CMYK` colour spaces
  * full encode/decode support for `JPEG`,`PNG`,`BMP`,`TIFF`,`RAW`,`PNM` and `PAM` image formats
  * full encode/decode support for 1-16 bit precision images

- **groonga** [📁](./groonga) [🌐](https://github.com/GerHobbelt/groonga) -- an open-source fulltext search engine and column store.
- **GSL** [📁](./GSL) [🌐](https://github.com/GerHobbelt/GSL) -- the Guidelines Support Library (GSL) contains functions and types that are suggested for use by the [C++ Core Guidelines](https://github.com/isocpp/CppCoreGuidelines) maintained by the [Standard C++ Foundation](https://isocpp.org). This repo contains Microsoft's implementation of GSL.
- **gtn** [📁](./gtn) [🌐](https://github.com/GerHobbelt/gtn) -- GTN (Automatic Differentiation with WFSTs) is a framework for automatic differentiation with weighted finite-state transducers. The goal of GTN is to make adding and experimenting with structure in learning algorithms much simpler. This structure is encoded as weighted automata, either acceptors (WFSAs) or transducers (WFSTs). With `gtn` you can dynamically construct complex graphs from operations on simpler graphs. Automatic differentiation gives gradients with respect to any input or intermediate graph with a single call to `gtn.backward`.
- **guetzli** [📁](./guetzli) [🌐](https://github.com/GerHobbelt/guetzli) -- a JPEG encoder that aims for excellent compression density at high visual quality. Guetzli-generated images are typically 20-30% smaller than images of equivalent quality generated by libjpeg. Guetzli generates only sequential (nonprogressive) JPEGs due to faster decompression speeds they offer.
- **guile** [📁](./guile) [🌐](https://github.com/GerHobbelt/guile) -- Guile is Project GNU's extension language library. Guile is an implementation of the Scheme programming language, packaged as a library that can be linked into applications to give them their own extension language.  Guile supports other languages as well, giving users of Guile-based applications a choice of languages.
- **gumbo-libxml** [📁](./gumbo-libxml) [🌐](https://github.com/GerHobbelt/gumbo-libxml) -- LibXML2 bindings for the Gumbo HTML5 parser: this provides a libxml2 API on top of the Gumbo parser.  It lets you use a modern parser - Gumbo now passes all html5lib tests, including the template tag, and should be fully conformant with the HTML5 spec - with the full ecosystem of libxml tools, including XPath, tree modification, DTD validation, etc.
- **gumbo-parser** [📁](../../thirdparty/gumbo-parser) [🌐](https://github.com/GerHobbelt/gumbo-parser) -- HTML parser
- **gumbo-query** [📁](./gumbo-query) [🌐](https://github.com/GerHobbelt/gumbo-query) -- HTML DOM access in C/C++
- **h5cpp** [📁](./h5cpp) [🌐](https://github.com/GerHobbelt/h5cpp) -- easy to use HDF5 C++ templates for Serial and Paralel HDF5. Hierarchical Data Format HDF5 is prevalent in high performance scientific computing, sits directly on top of sequential or parallel file systems, providing block and stream operations on standardized or custom binary/text objects. Scientific computing platforms come with the necessary libraries to read write HDF5 dataset. H5CPP simplifies interactions with popular linear algebra libraries, provides compiler assisted seamless object persistence, Standard Template Library support and comes equipped with a novel error handling architecture.
  
  - **in-purgatory**; reason: see the `HDF5` entry below. But advertises to be an interface between OpenCV, Eigen, etc. at the same time...

- **harbour-core** [📁](./harbour-core) [🌐](https://github.com/GerHobbelt/core) -- Harbour is the free software implementation of a multi-platform, multi-threading, object-oriented, scriptable programming language, backward compatible with Clipper/xBase. Harbour consists of a compiler and runtime libraries with multiple UI and database backends, its own make system and a large collection of libraries and interfaces to many popular APIs.
- **harfbuzz** [📁](../../thirdparty/harfbuzz) [🌐](https://github.com/GerHobbelt/thirdparty-harfbuzz) -- a text shaping engine. It primarily supports [OpenType][1], but also [Apple Advanced Typography][2].
- **hdbscan** [📁](./hdbscan) [🌐](https://github.com/GerHobbelt/hdbscan) -- a fast parallel implementation for HDBSCAN* [[1]](https://dl.acm.org/doi/10.1145/2733381) (hierarchical DBSCAN). The implementation stems from our parallel algorithms [[2]](https://arxiv.org/pdf/2104.01126.pdf) developed at MIT, and presented at SIGMOD 2021. Our approach is based on generating a well-separated pair decomposition followed by using Kruskal's minimum spanning tree algorithm and bichromatic closest pair computations. We also give a new parallel divide-and-conquer algorithm for computing the dendrogram, which are used in visualizing clusters of different scale that arise for HDBSCAN*.
- **hdbscan-cpp** [📁](./hdbscan-cpp) [🌐](https://github.com/GerHobbelt/hdbscan-cpp) -- Fast and Efficient Implementation of HDBSCAN in C++ using STL. HDBSCAN - Hierarchical Density-Based Spatial Clustering of Applications with Noise. Performs DBSCAN over varying epsilon values and integrates the result to find a clustering that gives the best stability over epsilon. This allows HDBSCAN to find clusters of varying densities (unlike DBSCAN), and be more robust to parameter selection. In practice this means that HDBSCAN returns a good clustering straight away with little or no parameter tuning -- and the primary parameter, minimum cluster size, is intuitive and easy to select. HDBSCAN is ideal for exploratory data analysis; it's a fast and robust algorithm that you can trust to return meaningful clusters (if there are any).
- **HDiffPatch** [📁](./HDiffPatch) [🌐](https://github.com/GerHobbelt/HDiffPatch) -- a library and command-line tools for Diff & Patch between binary files or directories(folders); cross-platform; runs fast; create small delta/differential; support large files and limit memory requires when diff & patch.
- **hedley** [📁](./hedley) [🌐](https://github.com/GerHobbelt/hedley) -- a C/C++ header file designed to smooth over some platform-specific annoyances.
- **highway** [📁](./highway) [🌐](https://github.com/GerHobbelt/highway) -- dependency of JpegXL
- **highwayhash** [📁](./highwayhash) [🌐](https://github.com/GerHobbelt/highwayhash) -- Fast strong hash functions: SipHash/HighwayHash
- **hikyuu** [📁](./hikyuu) [🌐](https://github.com/GerHobbelt/hikyuu) -- Hikyuu Quant Framework is an open source quantitative trading research framework based on C++/Python, which is used for strategy analysis and backtesting. Its core idea is based on the current mature systematic trading method, which abstracts the entire systematic trading into judging strategies based on market environment, system effective conditions, signal indicators, stop loss/take profit strategies, fund management strategies, profit target strategies, slippage There are seven components of the price difference algorithm. You can build the strategy asset library of these components separately, and freely combine them in actual research to observe the effectiveness, stability of the system and the effect of a single type of strategy.
- **hmm-scalable** [📁](./hmm-scalable) [🌐](https://github.com/GerHobbelt/hmm-scalable) -- a Tool for fitting Hidden Markov Models models at scale. In particular, it is targeting a specific kind of HMM used in education called Bayesian Knowledge Tracing (BKT) model.
- **hmm-stoch** [📁](./hmm-stoch) [🌐](https://github.com/GerHobbelt/StochHMM) -- StochHMM - A Flexible hidden Markov model application and C++ library that implements HMM from simple text files.   It implements traditional HMM algorithms in addition to providing additional flexibility.  The additional flexibility is achieved by allowing researchers to integrate additional data sources and application code into the HMM framework.
- **hnswlib** [📁](./hnswlib) [🌐](https://github.com/GerHobbelt/hnswlib) -- fast approximate nearest neighbor search. Header-only C++ HNSW implementation with python bindings.
- **hocr-fileformat** [📁](./hocr-fileformat) [🌐](https://github.com/GerHobbelt/ocr-fileformat) -- tools to alidate and transform between OCR file formats (hOCR, ALTO, PAGE, FineReader)
- **hocr-spec** [📁](./hocr-spec) [🌐](https://github.com/GerHobbelt/hocr-spec) -- the [hOCR](https://en.wikipedia.org/wiki/HOCR) Embedded OCR Workflow and Output Format specification originally written by [Thomas Breuel](https://github.com/tmbdev).
- **hocr-tools** [📁](./hocr-tools) [🌐](https://github.com/GerHobbelt/hocr-tools) -- a [Public Specification](http://hocr.info) and tools for the hOCR Format.
  
  hOCR is a format for representing OCR output, including layout information, character confidences, bounding boxes, and style information. It embeds this information invisibly in standard HTML. By building on standard HTML, it automatically inherits well-defined support for most scripts, languages, and common layout options. Furthermore, unlike previous OCR formats, the recognized text and OCR-related information co-exist in the same file and survives editing and manipulation. hOCR markup is independent of the presentation.

- **honggfuzz** [📁](./honggfuzz) [🌐](https://github.com/GerHobbelt/honggfuzz) -- a security oriented, feedback-driven, evolutionary, easy-to-use fuzzer with interesting analysis options.
- **hopscotch-map** [📁](./hopscotch-map) [🌐](https://github.com/GerHobbelt/hopscotch-map) -- a C++ implementation of a fast hash map and hash set using hopscotch hashing and open-addressing to resolve collisions. It is a cache-friendly data structure offering better performances than `std::unordered_map` in most cases and is closely similar to `google::dense_hash_map` while using less memory and providing more functionalities.
- **horsejs** [📁](./horsejs) [🌐](https://github.com/GerHobbelt/horsejs) -- a framework similar to Electron. Unlike Electron, it has no built-in Node.js, but directly uses C++ to provide most of Electron's capabilities, such as accessing files using JavaScript, opening dialog boxes, creating new windows, etc. Since there is no Node.js, HorseJs runs faster, uses less memory, and is more stable.
- **hsluv-c** [📁](./hsluv-c) [🌐](https://github.com/GerHobbelt/hsluv-c) -- HSLuv (revision 4) is a human-friendly alternative to HSL. HSLuv is very similar to CIELUV, a color space designed for perceptual uniformity based on human experiments. When accessed by polar coordinates, it becomes functionally similar to HSL with a single problem: its chroma component doesn't fit into a specific range. HSLuv extends CIELUV with a new saturation component that allows you to span all the available chroma as a neat percentage.
- **hsluv-color-gradient** [📁](./hsluv-color-gradient) [🌐](https://github.com/GerHobbelt/hsluv-color-gradient) -- 1D discrete and continous perceptually uniform ordered color gradients rendered in [HSL](https://www.hsluv.org/)
- **html2openxml** [📁](./html2openxml) [🌐](https://github.com/GerHobbelt/html2openxml) -- Html2OpenXml is a small .NET library that converts simple or advanced HTML to plain OpenXml components (docx).
- **htmlstreamparser** [📁](./htmlstreamparser) [🌐](https://github.com/GerHobbelt/htmlstreamparser) -- used in a demo of zsync2
- **http-parser** [📁](./http-parser) [🌐](https://github.com/GerHobbelt/http-parser) -- a parser for HTTP messages written in C. It parses both requests and responses. The parser is designed to be used in performance HTTP applications. It does not make any syscalls nor allocations, it does not buffer data, it can be interrupted at anytime. Depending on your architecture, it only requires about 40 bytes of data per message stream (in a web server that is per connection).
- **hunspell** [📁](./hunspell) [🌐](https://github.com/GerHobbelt/hunspell) -- a free spell checker and morphological analyzer library and command-line tool, designed for quick and high quality spell checking and correcting for languages with word-level writing system, including languages with rich morphology, complex word compounding and character encoding.
- **hunspell-dictionaries** [📁](./hunspell-dictionaries) [🌐](https://github.com/GerHobbelt/dictionaries) -- Collection of normalized and installable [hunspell][] dictionaries.
- **hunspell-hyphen** [📁](./hunspell-hyphen) [🌐](https://github.com/GerHobbelt/hyphen) -- hyphenation library to use converted TeX hyphenation patterns with hunspell.
- **hyperscan** [📁](./hyperscan) [🌐](https://github.com/GerHobbelt/hyperscan) -- Hyperscan is a high-performance multiple regex matching library.
- **hypertextcpp** [📁](./hypertextcpp) [🌐](https://github.com/GerHobbelt/hypertextcpp) -- string/text template engine & source-to-source compiler.
- **iceberghashtable** [📁](./iceberghashtable) [🌐](https://github.com/GerHobbelt/iceberghashtable) -- [IcebergDB: High Performance Hash Tables Through Stability and Low Associativity](https://arxiv.org/abs/2210.04068) is a fast, concurrent, and resizeable hash table implementation. It supports insertions, deletions and queries for 64-bit keys and values.
- **iceoryx** [📁](./iceoryx) [🌐](https://github.com/GerHobbelt/iceoryx) -- true zero-copy inter-process-communication. iceoryx is an inter-process-communication (IPC) middleware for various operating systems (currently we support Linux, macOS, QNX, FreeBSD and Windows 10). It has its origins in the automotive industry, where large amounts of data have to be transferred between different processes when it comes to driver assistance or automated driving systems. However, the efficient communication mechanisms can also be applied to a wider range of use cases, e.g. in the field of robotics or game development.
- **IconFontCppHeaders** [📁](./IconFontCppHeaders) [🌐](https://github.com/GerHobbelt/IconFontCppHeaders) -- provides C and C++ headers, among others, for icon fonts Font Awesome, Fork Awesome, Google Material Design, Pictogrammers Material Design icons, Kenney game icons, Fontaudio, Codicons and Lucide. Useful in UI applications such as ones built in Dear ImGui.
- **id3-tagparser** [📁](./id3-tagparser) [🌐](https://github.com/GerHobbelt/tagparser) -- a C++ library for reading and writing MP4 (iTunes), ID3, Vorbis, Opus, FLAC and Matroska tags.
- **IdGenerator** [📁](./IdGenerator) [🌐](https://github.com/GerHobbelt/IdGenerator) -- a digital ID generator using the snowflake algorithm, developed in response to the performance problems that often occur. Example use is when you, as an architecture designer, want to solve the problem of unique database primary keys, especially in multi-database distributed systems. You want the primary key of the data table to use the least storage space, while the index speed and the Select, Insert, and Update queries are fast. Meanwhile there may be more than 50 application instances, and each concurrent request can reach 10W/s. You do not want to rely on the auto-increment operation of redis to obtain continuous primary key IDs, because continuous IDs pose business data security risks.
- **ifopt** [📁](./ifopt) [🌐](https://github.com/GerHobbelt/ifopt) -- a modern, light-weight, [Eigen]-based C++ interface to Nonlinear Programming solvers, such as Ipopt and Snopt.
- **imagedistance** [📁](./imagedistance) [🌐](https://github.com/GerHobbelt/imagedistance) -- given two images, calculate their distance in several criteria.
- **ImageMagick** [📁](./ImageMagick) [🌐](https://github.com/GerHobbelt/ImageMagick) -- [ImageMagick®](https://imagemagick.org/) can create, edit, compose, or convert digital images. It can read and write images in a variety of formats (over 200) including PNG, JPEG, GIF, WebP, HEIC, SVG, PDF, DPX, EXR, and TIFF. ImageMagick can resize, flip, mirror, rotate, distort, shear and transform images, adjust image colors, apply various special effects, or draw text, lines, polygons, ellipses, and Bézier curves.
- **Imath** [📁](./Imath) [🌐](https://github.com/GerHobbelt/Imath) -- a basic, light-weight, and efficient C++ representation of 2D and 3D vectors and matrices and other simple but useful mathematical objects, functions, and data types common in computer graphics applications, including the “half” 16-bit floating-point type.
- **indicators** [📁](./indicators) [🌐](https://github.com/GerHobbelt/indicators) -- thread-safe progress bars and spinners for console applications.
- **infoware** [📁](./infoware) [🌐](https://github.com/GerHobbelt/infoware) -- C++ Library for pulling system and hardware information, without hitting the command line.
- **iODBC** [📁](./iODBC) [🌐](https://github.com/GerHobbelt/iODBC) -- the iODBC Driver Manager provides you with everything you need to develop ODBC-compliant applications under Unix without having to pay royalties to other parties. An ODBC driver is still needed to affect your connection architecture. You may build a driver with the iODBC components or obtain an ODBC driver from a commercial vendor.
- **ion-c** [📁](./ion-c) [🌐](https://github.com/GerHobbelt/ion-c) -- a C implementation of the [Ion data notation](http://amzn.github.io/ion-docs). Amazon Ion is a richly-typed, self-describing, hierarchical data serialization format offering interchangeable binary and text representations. The text format (a superset of JSON) is easy to read and author, supporting rapid prototyping. The binary representation is efficient to store, transmit, and skip-scan parse. The rich type system provides unambiguous semantics for long-term preservation of data which can survive multiple generations of software evolution.
- **ipa-dict** [📁](./ipa-dict) [🌐](https://github.com/GerHobbelt/ipa-dict) -- Monolingual wordlists with pronunciation information in IPA aims to provide a series of dictionaries consisting of wordlists with accompanying phonemic pronunciation information in International Phonetic Alphabet (IPA) transcription for as many words as possible in as many languages / dialects / variants as possible. The dictionary data is available in a number of human- and machine-readable formats, in order to make it as useful as possible for various other applications.
- **Ipopt** [📁](./Ipopt) [🌐](https://github.com/GerHobbelt/Ipopt) -- Ipopt (Interior Point OPTimizer, pronounced eye-pea-Opt) is a software package for large-scale [nonlinear optimization](http://wiki.mcs.anl.gov/NEOS/index.php/Nonlinear_Programming_FAQ). It is designed to find (local) solutions of mathematical optimization problems.
- **iresearch** [📁](./iresearch) [🌐](https://github.com/GerHobbelt/iresearch) -- the IResearch search engine is meant to be treated as a standalone index that is capable of both indexing and storing individual values verbatim. Indexed data is treated on a per-version/per-revision basis, i.e. existing data version/revision is never modified and updates/removals are treated as new versions/revisions of the said data. This allows for trivial multi-threaded read/write operations on the index. The index exposes its data processing functionality via a multi-threaded 'writer' interface that treats each document abstraction as a collection of fields to index and/or store. The index exposes its data retrieval functionality via 'reader' interface that returns records from an index matching a specified query. The queries themselves are constructed query trees built directly using the query building blocks available in the API. The querying infrastructure provides the capability of ordering the result set by one or more ranking/scoring implementations. The ranking/scoring implementation logic is plugin-based and lazy-initialized during runtime as needed, allowing for addition of custom ranking/scoring logic without the need to even recompile the IResearch library.
- **itcl** [📁](./itcl) [🌐](https://github.com/GerHobbelt/itcl) -- Itcl is an object oriented extension for Tcl.
- **ITK** [📁](./ITK) [🌐](https://github.com/GerHobbelt/ITK) -- The Insight Toolkit (ITK) is an open-source, cross-platform toolkit for N-dimensional scientific image processing, segmentation, and registration. Segmentation is the process of identifying and classifying data found in a digitally sampled representation. Typically the sampled representation is an image acquired from such medical instrumentation as CT or MRI scanners. Registration is the task of aligning or developing correspondences between data. For example, in the medical environment, a CT scan may be aligned with a MRI scan in order to combine the information contained in both.
- **itpp** [📁](./itpp) [🌐](https://github.com/GerHobbelt/itpp) -- IT++ is a C++ library of mathematical, signal processing and communication classes and functions. Its main use is in simulation of communication systems and for performing research in the area of communications. The kernel of the library consists of generic vector and matrix classes, and a set of accompanying routines. Such a kernel makes IT++ similar to MATLAB or GNU Octave. The IT++ library originates from the former department of Information Theory at the Chalmers University of Technology, Gothenburg, Sweden.
- **ivf-hnsw** [📁](./ivf-hnsw) [🌐](https://github.com/GerHobbelt/ivf-hnsw) -- Revisiting the Inverted Indices for Billion-Scale Approximate Nearest Neighbors. This is the code for the current state-of-the-art billion-scale nearest neighbor search system presented in the paper: [Revisiting the Inverted Indices for Billion-Scale Approximate Nearest Neighbors](http://openaccess.thecvf.com/content_ECCV_2018/html/Dmitry_Baranchuk_Revisiting_the_Inverted_ECCV_2018_paper.html) (Dmitry Baranchuk, Artem Babenko, Yury Malkov).
- **JabRef-abbreviations** [📁](./JabRef-abbreviations) [🌐](https://github.com/GerHobbelt/jabref-abbreviations) -- Jabref journal name abbreviations: some journal require you to use the abbreviated names for journals. If you have to change this manually, it's quite cumbersome to do. Luckily there exist tools to help. [Jabref](http://jabref.sourceforge.net) is open source bibliography reference manager. It has an option to abbreviate journal names. However, when it comes to Physics journals, the internal list is far from complete.
  
  The original list of abbreviations is located at [ISI](https://images.webofknowledge.com/WOK46/help/WOS/A_abrvjt.html).

- **JabRef-Browser-Extension** [📁](./JabRef-Browser-Extension) [🌐](https://github.com/GerHobbelt/JabRef-Browser-Extension) -- a browser extension for users of the bibliographic reference manager [JabRef](https://www.jabref.org/). It automatically identifies and extracts bibliographic information on websites and sends them to JabRef with one click. When you find an interesting article through Google Scholar, the arXiv or journal websites, this browser extension allows you to add those references to JabRef. Even links to accompanying PDFs are sent to JabRef, where those documents can easily be downloaded, renamed and placed in the correct folder. [A wide range of publisher sites, library catalogs and databases are supported](https://www.zotero.org/support/translators).
- **JamSpell** [📁](./JamSpell) [🌐](https://github.com/GerHobbelt/JamSpell) -- a spell checking library, which considers words surroundings (context) for better correction (**accuracy**) and is **fast** (near 5K words per second)
- **jasper** [📁](./jasper) [🌐](https://github.com/GerHobbelt/jasper) -- JasPer Image Processing/Coding Tool Kit
- **javascript-serialization-benchmark** [📁](./javascript-serialization-benchmark) [🌐](https://github.com/GerHobbelt/javascript-serialization-benchmark) -- a binary serialization comparison tool in JavaScript (Protocol Buffer, Avro, BSON, etc.). This is a comparison and benchmark of various binary serialization formats and libraries used in JavaScript as of 2020-07-28.
- **jbig2dec** [📁](../../thirdparty/jbig2dec) [🌐](https://github.com/GerHobbelt/jbig2dec) -- a decoder library and example utility implementing the JBIG2 bi-level image compression spec. Also known as ITU T.88 and ISO IEC 14492, and included by reference in Adobe's PDF version 1.4 and later.
- **jbig2enc** [📁](./jbig2enc) [🌐](https://github.com/GerHobbelt/jbig2enc) -- an encoder for JBIG2. JBIG2 encodes bi-level (1 bpp) images using a number of clever tricks to get better compression than G4. This encoder can:
  
  * Generate JBIG2 files, or fragments for embedding in PDFs
  * Generic region encoding
  * Perform symbol extraction, classification and text region coding
  * Perform refinement coding and,
  * Compress multipage documents
  
  It uses the Leptonica library.

- **jemalloc** [📁](./jemalloc) [🌐](https://github.com/GerHobbelt/jemalloc) -- a general purpose malloc(3) implementation that emphasizes fragmentation avoidance and scalable concurrency support.  jemalloc first came into use as the FreeBSD libc allocator in 2005, and since then it has found its way into numerous applications that rely on its predictable behavior.  In 2010 jemalloc development efforts broadened to include developer support features such as heap profiling and extensive monitoring/tuning hooks.
- **jerryscript** [📁](./jerryscript) [🌐](https://github.com/GerHobbelt/jerryscript) -- [JerryScript](https://github.com/jerryscript-project/jerryscript/) is a lightweight JavaScript engine for resource-constrained devices such as microcontrollers. It can run on devices with less than 64 KB of RAM and less than 200 KB of flash memory.
  
  Key characteristics of JerryScript:
  
  * Full ECMAScript 5.1 standard compliance
  * 160K binary size when compiled for ARM Thumb-2
  * Heavily optimized for low memory consumption
  * Written in C99 for maximum portability
  * Snapshot support for precompiling JavaScript source code to byte code
  * Mature C API, easy to embed in applications
  
  Additional information can be found at the [project page](http://jerryscript.net) and [Wiki](https://github.com/jerryscript-project/jerryscript/wiki).

- **jimtcl** [📁](./jimtcl) [🌐](https://github.com/GerHobbelt/jimtcl) -- the Jim Interpreter is a small-footprint implementation of the Tcl programming language written from scratch. Currently Jim Tcl is very feature complete with an extensive test suite (see the tests directory). There are some Tcl commands and features which are not implemented (and likely never will be), including traces and Tk. However, Jim Tcl offers a number of both Tcl8.5 and Tcl8.6 features ({*}, dict, lassign, tailcall and optional UTF-8 support) and some unique features. These unique features include [lambda] with garbage collection, a general GC/references system, arrays as syntax sugar for [dict]tionaries, object-based I/O and more. Other common features of the Tcl programming language are present, like the "everything is a string" behaviour, implemented internally as dual ported objects to ensure that the execution time does not reflect the semantic of the language :)
- **jpeginfo** [📁](../../thirdparty/jpeginfo) [🌐](https://github.com/GerHobbelt/jpeginfo) -- prints information and tests integrity of JPEG/JFIF files.
- **JPEG-XL** [📁](./jpeg-xl) [🌐](https://github.com/GerHobbelt/jpeg-xl) -- JPEG XL reference implementation (encoder and decoder), called `libjxl`. JPEG XL was standardized in 2022 as [ISO/IEC 18181](https://jpeg.org/jpegxl/workplan.html). The [core codestream](doc/format_overview.md#codestream-features) is specified in 18181-1, the [file format](doc/format_overview.md#file-format-features) in 18181-2. [Decoder conformance](https://github.com/libjxl/conformance) is defined in 18181-3, and 18181-4 is the [reference software](https://github.com/libjxl/libjxl).
- **jq** [📁](./jq) [🌐](https://github.com/GerHobbelt/jq) -- a lightweight and flexible command-line JSON processor.
- **json** [📁](./json) [🌐](https://github.com/GerHobbelt/nlohmann-json) -- N. Lohmann's JSON for Modern C++.
- **jsoncons** [📁](./jsoncons) [🌐](https://github.com/GerHobbelt/jsoncons) -- a C++, header-only library for constructing [JSON](http://www.json.org) and JSON-like data formats such as [CBOR](http://cbor.io/). Compared to other JSON libraries, jsoncons has been designed to handle very large JSON texts. At its heart are SAX-style parsers and serializers. It supports reading an entire JSON text in memory in a variant-like structure. But it also supports efficient access to the underlying data using StAX-style pull parsing and push serializing. It supports incremental parsing into a user's preferred form, using information about user types provided by specializations of `json_type_traits`.
- **jsoncpp** [📁](./jsoncpp) [🌐](https://github.com/GerHobbelt/jsoncpp) -- JsonCpp is a C++ library that allows manipulating JSON values, including serialization and deserialization to and from strings. It can also preserve existing comment in unserialization/serialization steps, making it a convenient format to store user input files.
- **json-jansson** [📁](./json-jansson) [🌐](https://github.com/GerHobbelt/jansson) -- _Jansson_ is a C library for encoding, decoding and manipulating JSON data.
- **jtc** [📁](./jtc) [🌐](https://github.com/GerHobbelt/jtc) -- `jtc` stand for: **_JSON transformational chains_** (used to be _JSON test console_) and is a cli tool to extract, manipulate and transform source JSON, offering powerful ways to select one or multiple elements from a source JSON and apply various actions on the selected elements at once (wrap selected elements into a new JSON, filter in/out, sort elements, update elements, insert new elements, remove, copy, move, compare, transform, swap around and many other operations).
- **kahypar** [📁](./kahypar) [🌐](https://github.com/GerHobbelt/kahypar) -- KaHyPar (Karlsruhe Hypergraph Partitioning) is a multilevel hypergraph partitioning framework providing direct k-way and recursive bisection based partitioning algorithms that compute solutions of very high quality.
- **kalman-cpp** [📁](./kalman-cpp) [🌐](https://github.com/GerHobbelt/kalman-cpp) -- Kalman filter and extended Kalman filter implementation in C++. Implements Kalman, Extended Kalman, Second-order extended Kalman and Unscented Kalman filters.
- **kfr** [📁](./kfr) [🌐](https://github.com/GerHobbelt/kfr) -- an open source C++ DSP framework that contains high performance building blocks for DSP, audio, scientific and other applications.
- **kgraph** [📁](./kgraph) [🌐](https://github.com/GerHobbelt/kgraph) -- a library for k-nearest neighbor (k-NN) graph construction and online k-NN search using a k-NN Graph as index. KGraph implements heuristic algorithms that are extremely generic and fast. KGraph works on abstract objects. The only assumption it makes is that a similarity score can be computed on any pair of objects, with a user-provided function.
- **kiwi** [📁](./kiwi) [🌐](https://github.com/GerHobbelt/kiwi) -- Kiwi is an efficient C++ implementation of the Cassowary constraint solving algorithm. Kiwi is an implementation of the algorithm based on the `seminal Cassowary paper <https://constraints.cs.washington.edu/solvers/cassowary-tochi.pdf>`_. It is *not* a refactoring of the original C++ solver. Kiwi has been designed from the ground up to be lightweight and fast. Kiwi ranges from 10x to 500x faster than the original Cassowary solver with typical use cases gaining a 40x improvement. Memory savings are consistently > 5x.
- **klib** [📁](./klib) [🌐](https://github.com/GerHobbelt/klib) -- Klib is a standalone and lightweight C library. Most components are independent of external libraries, except the standard C library, and independent of each other. To use a component of this library, you only need to copy a couple of files to your source code tree without worrying about library dependencies. Klib strives for efficiency and a small memory footprint. Some components, such as khash.h, kbtree.h, ksort.h and kvec.h, are among the most efficient implementations of similar algorithms or data structures in all programming languages, in terms of both speed and memory use.
- **koan** [📁](./koan) [🌐](https://github.com/GerHobbelt/koan) -- a `word2vec` negative sampling implementation with correct CBOW update. kōan only depends on Eigen.
  
  Although continuous bag of word (CBOW) embeddings can be trained more quickly than skipgram (SG) embeddings, it is a common belief that SG embeddings tend to perform better in practice. This was observed by the original authors of Word2Vec [1] and also in subsequent work [2].  However, we found that popular implementations of word2vec with negative sampling such as [word2vec](https://github.com/tmikolov/word2vec/) and [gensim](https://github.com/RaRe-Technologies/gensim/) do not implement the CBOW update correctly, thus potentially leading to misconceptions about the performance of CBOW embeddings when trained correctly.

- **krabsETW** [📁](./krabsETW) [🌐](https://github.com/GerHobbelt/krabsetw) -- a C++ library that simplifies interacting with ETW. It allows for any number of traces and providers to be enabled and for client code to register for event notifications from these traces.
- **langdata_LSTM** [📁](../../thirdparty/langdata_LSTM) [🌐](https://github.com/GerHobbelt/langdata_lstm) -- tesseract data
- **lapack** [📁](./lapack) [🌐](https://github.com/GerHobbelt/lapack) -- [CBLAS](http://www.netlib.org/blas/) + [LAPACK](http://www.netlib.org/lapack/index.html) optimized linear algebra libs
- **LBFGS-Lite** [📁](./LBFGS-Lite) [🌐](https://github.com/GerHobbelt/LBFGS-Lite) -- a header-only L-BFGS unconstrained optimizer.
- **lcms2** [📁](../../thirdparty/lcms2) [🌐](https://github.com/GerHobbelt/thirdparty-lcms2) -- `lcms2mt` is a thread-safe fork of `lcms` (a.k.a. Little CMS). Little CMS intends to be a small-footprint color management engine, with special focus on accuracy and performance. It uses the International Color Consortium standard (ICC), which is the modern standard when regarding to color management. The ICC specification is widely used and is referred to in many International and other de-facto standards. It was approved as an International Standard, ISO 15076-1, in 2005. Little CMS is a **full implementation** of ICC specification 4.3, it fully supports all kind of V2 and V4 profiles, including abstract, devicelink and named color profiles.
- **lda** [📁](./lda) [🌐](https://github.com/GerHobbelt/lda-c) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
- **lda-3-variants** [📁](./lda-3-variants) [🌐](https://github.com/GerHobbelt/LDA) -- three modified open source versions of LDA with collapsed Gibbs Sampling: GibbsLDA++, ompi-lda and online_twitter_lda.
- **lda-bigartm** [📁](./lda-bigartm) [🌐](https://github.com/GerHobbelt/bigartm) -- BigARTM is a powerful tool for topic modeling based on a novel technique called Additive Regularization of Topic Models. This technique effectively builds multi-objective models by adding the weighted sums of regularizers to the optimization criterion. BigARTM is known to combine well very different objectives, including sparsing, smoothing, topics decorrelation and many others. Such combination of regularizers significantly improves several quality measures at once almost without any loss of the perplexity.
- **lda-Familia** [📁](./lda-Familia) [🌐](https://github.com/GerHobbelt/Familia) -- Familia: A Configurable Topic Modeling Framework for Industrial Text Engineering (Di Jiang and Yuanfeng Song and Rongzhong Lian and Siqi Bao and Jinhua Peng and Huang He and Hua Wu) (2018)
- **LDCF-hash** [📁](./LDCF-hash) [🌐](https://github.com/GerHobbelt/LDCF) -- The Logarithmic Dynamic Cuckoo Filter (LDCF) is an efficient approximate membership test data structure for dynamic big data sets. LDCF uses a novel multi-level tree structure and reduces the worst insertion and membership testing time from O(N) to O(1), while simultaneously reducing the memory cost of DCF as the cardinality of the set increases.
- **leptonica** [📁](../../thirdparty/leptonica) [🌐](https://github.com/GerHobbelt/leptonica) -- supports many operations that are useful on images.
  
  Features:
  
  * Rasterop (aka bitblt)
  * Affine transforms (scaling, translation, rotation, shear) on images of arbitrary pixel depth
  * Projective and bilinear transforms
  * Binary and grayscale morphology, rank order filters, and convolution
  * Seedfill and connected components
  * Image transformations with changes in pixel depth, both at the same scale and with scale change
  * Pixelwise masking, blending, enhancement, arithmetic ops, etc.
  
  Documentation:
  
  - **LeptonicaDocsSite** [📁](./LeptonicaDocsSite) [🌐](https://github.com/GerHobbelt/LeptonicaDocsSite) -- unofficial Reference Documentation for the Leptonica image processing library ([www.leptonica.org](http://www.leptonica.org)).
  - **UnofficialLeptDocs** [📁](./UnofficialLeptDocs) [🌐](https://github.com/GerHobbelt/UnofficialLeptDocs) -- unofficial Sphinx-generated documentation for the Leptonica image processing library.

- **LeptonicaDocsSite** [📁](./LeptonicaDocsSite) [🌐](https://github.com/GerHobbelt/LeptonicaDocsSite) -- unofficial Reference Documentation for the Leptonica image processing library ([www.leptonica.org](http://www.leptonica.org)).
- **leptonica-hillshade** [📁](./leptonica-hillshade) [🌐](https://github.com/GerHobbelt/leptonica-hillshade) -- apply hillshade elevation/shadow render to leptonica PIX & FPIX
- **lerc** [📁](./lerc) [🌐](https://github.com/GerHobbelt/lerc) -- LERC (Limited Error Raster Compression) is an open-source image or raster format which supports rapid encoding and decoding for any pixel type (not just RGB or Byte). Users set the maximum compression error per pixel while encoding, so the precision of the original input image is preserved (within user defined error bounds).
- **lexbor** [📁](./lexbor) [🌐](https://github.com/GerHobbelt/lexbor) -- fast HTML5 fully-conformant HTML + CSS parser.
- **libaco** [📁](./libaco) [🌐](https://github.com/GerHobbelt/libaco) -- a blazing fast and lightweight C asymmetric coroutine library 💎 ⛅🚀⛅🌞 Along with the implementation of a production-ready C coroutine library, it has detailed documentation about how to implement a fastest and correct coroutine library, includes a strict mathematical proof. It has no more than 700 LOC but has the full functionality which you may want from a coroutine library. (The phrase "fastest" here means the fastest context switching implementation which complies to the Sys V ABI of Intel386 or AMD64.)
- **libahocorasick** [📁](./libahocorasick) [🌐](https://github.com/GerHobbelt/pyahocorasick) -- a fast and memory efficient library for exact or approximate multi-pattern string search meaning that you can find multiple key strings occurrences at once in some input text.  The strings "index" can be built ahead of time and saved (as a pickle) to disk to reload and reuse later.  The library provides an `ahocorasick` Python module that you can use as a plain dict-like Trie or convert a Trie to an automaton for efficient Aho-Corasick search.
- **libalg** [📁](./libalg) [🌐](https://github.com/GerHobbelt/alglib) -- the mathematical *ALGLIB* library for C++.
- **libaom** [📁](./libaom) [🌐](https://github.com/GerHobbelt/libaom) -- AV1 Codec Library
- **libarchive** [📁](./libarchive) [🌐](https://github.com/GerHobbelt/libarchive) -- a portable, efficient C library that can read and write streaming archives in a variety of formats. It also includes implementations of the common `tar`, `cpio`, and `zcat` command-line tools that use the libarchive library.
- **libass** [📁](./libass) [🌐](https://github.com/GerHobbelt/libass) -- `libass` is a portable subtitle renderer for the ASS/SSA (Advanced Substation Alpha/Substation Alpha) subtitle format.
- **libassert** [📁](./libassert) [🌐](https://github.com/GerHobbelt/libassert) -- the most over-engineered and overpowered C++ assertion library.
- **libavif** [📁](./libavif) [🌐](https://github.com/GerHobbelt/libavif) -- a friendly, portable C implementation of the AV1 Image File Format, as described here: <https://aomediacodec.github.io/av1-avif/>
- **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
- **libbloom** [📁](./libbloom) [🌐](https://github.com/GerHobbelt/bloomd) -- a high-performance C server, exposing bloom filters and operations over them. The rate of false positives can be tuned to meet application demands, but reducing the error rate rapidly increases the amount of memory required for the representation. Example: Bloom filters enable you to represent 1MM items with a false positive rate of 0.1% in 2.4MB of RAM.
- **libbloomfilters** [📁](./libbloomfilters) [🌐](https://github.com/GerHobbelt/libbloomfilters) -- **libbf** is a C++11 library which implements various Bloom filters, including:
  
  - A^2
  - Basic
  - Bitwise
  - Counting
  - Spectral MI
  - Spectral RM
  - Stable

- **libcbor** [📁](./libcbor) [🌐](https://github.com/GerHobbelt/libcbor) -- a C library for parsing and generating [CBOR](https://tools.ietf.org/html/rfc7049), the general-purpose schema-less binary data format.
- **libchaos** [📁](./libchaos) [🌐](https://github.com/GerHobbelt/libchaos) -- *Advanced library for randomization, hashing and statistical analysis (devoted to [chaos machines](https://en.wikipedia.org/wiki/Chaos_machine))* written to help with the development of software for scientific research. Project goal is to *implement & analyze* various algorithms for randomization and hashing, while maintaining simplicity and security, making them suitable for use in your own code. Popular tools like [TestU01](http://simul.iro.umontreal.ca/testu01/tu01.html), [Dieharder](https://www.phy.duke.edu/~rgb/General/dieharder.php) and [Hashdeep](https://github.com/jessek/hashdeep) are obsolete or their development has been stopped. Libchaos aims to replace them.
- **libchardet** [📁](./libchardet) [🌐](https://github.com/GerHobbelt/libchardet) -- is based on Mozilla Universal Charset Detector library and, detects the character set used to encode data.
- **libchopshop** [📁](./libchopshop) [🌐](https://github.com/GerHobbelt/libchopshop) -- NLP/text processing with automated stop word detection and stemmer-based filtering. This library / toolkit is engineered to be able to provide **both** of the (often more or less disparate) n-gram token streams / vectors required for (1) initializing / training FTS databases, neural nets, etc. and (2) executing effective queries / matches on these engines.
- **libclip** [📁](./libclip) [🌐](https://github.com/GerHobbelt/clip) -- a library to copy/retrieve content to/from the clipboard/pasteboard.
- **libclipboard** [📁](./libclipboard) [🌐](https://github.com/GerHobbelt/libclipboard) -- a lightweight cross-platform clipboard library.
- **libcmime** [📁](./libcmime) [🌐](https://github.com/GerHobbelt/libcmime) -- MIME extract/insert/encode/decode: use for MHTML support
- **libcnl** [📁](./libcnl) [🌐](https://github.com/GerHobbelt/cnl) -- The Compositional Numeric Library (CNL) is a C++ library of fixed-precision numeric classes which enhance integers to deliver safer, simpler, cheaper arithmetic types. CNL is particularly well-suited to: (1) compute on energy-constrained environments where FPUs are absent or costly; (2) compute on energy-intensive environments where arithmetic is the bottleneck such as simulations, machine learning applications and DSPs; and (3) domains such as finance where precision is essential.
- **libconfig** [📁](./libconfig) [🌐](https://github.com/GerHobbelt/libconfig) -- generic config (file) reader/writer
- **libcopp** [📁](./libcopp) [🌐](https://github.com/GerHobbelt/libcopp) -- cross-platform coroutine library in C++
- **libcppjieba** [📁](./libcppjieba) [🌐](https://github.com/GerHobbelt/libcppjieba) -- source code extracted from the [CppJieba] project to form a separate project, making it easier to understand and use.
- **libcpr** [📁](./libcpr) [🌐](https://github.com/GerHobbelt/cpr) -- wrapper library for cURL. C++ Requests is a simple wrapper around [libcurl](http://curl.haxx.se/libcurl) inspired by the excellent [Python Requests](https://github.com/kennethreitz/requests) project. Despite its name, libcurl's easy interface is anything but, and making mistakes misusing it is a common source of error and frustration. Using the more expressive language facilities of C++11, this library captures the essence of making network calls into a few concise idioms.
- **libcpuid** [📁](./libcpuid) [🌐](https://github.com/GerHobbelt/libcpuid) -- CPU & hardware info
- **libCRCpp** [📁](./libCRCpp) [🌐](https://github.com/GerHobbelt/CRCpp) -- easy to use and fast C++ CRC library.
- **libcsp** [📁](./libcsp) [🌐](https://github.com/GerHobbelt/libcsp) -- a concurrency C library 10x faster than Golang, influenced by the CSP model.
- **libcsv2** [📁](./libcsv2) [🌐](https://github.com/GerHobbelt/csv2) -- CSV file format reader/writer library.
- **libcuckoo** [📁](./libcuckoo) [🌐](https://github.com/GerHobbelt/libcuckoo) -- provides a high-performance, compact hash table that allows multiple concurrent reader and writer threads.
- **libcyaml** [📁](./libcyaml) [🌐](https://github.com/GerHobbelt/libcyaml) -- a C library for reading and writing structured YAML documents. The fundamental idea behind CYAML is to allow applications to construct schemas which describe both the permissible structure of the YAML documents to read/write, and the C data structure(s) in which the loaded data is arranged in memory.
- **libCZMQ** [📁](./libCZMQ) [🌐](https://github.com/GerHobbelt/czmq) -- High-level C binding for ØMQ. (http://czmq.zeromq.org/)
- **libde265** [📁](./libde265) [🌐](https://github.com/GerHobbelt/libde265) -- libde265 is an open source implementation of the h.265 video codec. It is written from scratch and has a plain C API to enable a simple integration into other software. libde265 supports WPP and tile-based multithreading and includes SSE optimizations. The decoder includes all features of the Main profile and correctly decodes almost all conformance streams (see [[wiki page](https://github.com/strukturag/libde265/wiki/Decoder-conformance)]).
- **libdeflate** [📁](./libdeflate) [🌐](https://github.com/GerHobbelt/libdeflate) -- heavily optimized library for DEFLATE/zlib/gzip compression and decompression.
- **libdiagnostics** [📁](./libdiagnostics) [🌐](https://github.com/GerHobbelt/libdiagnostics) -- a C/C++ diagnostics logging library with support for writing HTML and store images and misc binary data to disk alongside. or when a mere logfile doesn't suffice.
- **libdi-dependency-injection** [📁](./libdi-dependency-injection) [🌐](https://github.com/GerHobbelt/di) -- \[Boost::ext\].DI :: your C++14 **one header only** Dependency Injection library with no dependencies
- **libdip** [📁](./libdip) [🌐](https://github.com/GerHobbelt/diplib) -- **[*DIPlib*](https://diplib.org/diplib-docs/)** is a C++ library for quantitative image analysis.
- **libdist** [📁](./libdist) [🌐](https://github.com/GerHobbelt/distlib) -- string distance related functions (Damerau-Levenshtein, Jaro-Winkler, longest common substring & subsequence) implemented as SQLite run-time loadable extension, with UTF-8 support.
- **libdivide** [📁](./libdivide) [🌐](https://github.com/GerHobbelt/libdivide) -- libdivide.h is a header-only C/C++ library for optimizing integer division. Integer division is one of the slowest instructions on most CPUs e.g. on current x64 CPUs a 64-bit integer division has a latency of up to 90 clock cycles whereas a multiplication has a latency of only 3 clock cycles. `libdivide` allows you to replace expensive integer divsion instructions by a sequence of shift, add and multiply instructions that will calculate the integer division much faster.
- **libdivsufsort** [📁](./libdivsufsort) [🌐](https://github.com/GerHobbelt/libdivsufsort) -- a software library that implements a lightweight suffix array construction algorithm.
- **libdtm** [📁](./libdtm) [🌐](https://github.com/GerHobbelt/dtm) -- LibDTM (Dynamic Topic Models and the Document Influence Model) implements topics that change over time (Dynamic Topic Models) and a model of how individual documents predict that change. This code is the result of work by David M. Blei and Sean M. Gerrish.
- **libeigen** [📁](./libeigen) [🌐](https://github.com/GerHobbelt/eigen-git-mirror) -- a C++ template library for linear algebra: matrices, vectors, numerical solvers, and related algorithms.
- **libeternaltimestamp** [📁](./libeternaltimestamp) [🌐](https://github.com/GerHobbelt/libeternaltimestamp) -- provide/encode/decode 64-bit integer timestamps which can encode *any* date/time in the lifetime of our planet from before the Big Bang up to about 3000 AD in the future.
- **libevent** [📁](./libevent) [🌐](https://github.com/GerHobbelt/libevent) -- _libevent_ is meant to replace the event loop found in event driven network servers.
  
  Currently, _libevent_ supports _[/dev/poll](http://download.oracle.com/docs/cd/E19253-01/816-5177/6mbbc4g9n/index.html)_, _[kqueue(2)](http://www.freebsd.org/cgi/man.cgi?query=kqueue&apropos=0&sektion=0&format=html)_, _[event ports](http://developers.sun.com/solaris/articles/event_completion.html)_, [POSIX _select(2)_](http://manpages.debian.net/cgi-bin/man.cgi?query=select), [Windows _select()_](http://msdn.microsoft.com/en-us/library/ms740141(v=vs.85).aspx), [_poll(2)_](http://manpages.debian.net/cgi-bin/man.cgi?query=poll), and _[epoll(4)](http://www.xmailserver.org/linux-patches/epoll.txt)_. The internal event mechanism is completely independent of the exposed event API, and a simple update of libevent can provide new functionality without having to redesign the applications. As a result, _Libevent_ allows for portable application development and provides the most scalable event notification mechanism available on an operating system. Libevent can also be used for multi-threaded applications, either by isolating each `event_base` so that only a single thread accesses it, or by locked access to a single shared `event_base`. _Libevent_ should compile on Linux, *BSD, Mac OS X, Solaris, Windows, and more.
  
  Libevent additionally provides a sophisticated framework for buffered network IO, with support for sockets, filters, rate-limiting, SSL, zero-copy file transmission, and IOCP. Libevent includes support for several useful protocols, including DNS, HTTP, and a minimal RPC framework.

- **libevt** [📁](./libevt) [🌐](https://github.com/GerHobbelt/libevt) -- a library to access the Windows Event Log (EVT) format.
- **libexpat** [📁](./libexpat) [🌐](https://github.com/GerHobbelt/libexpat) -- XML read/write
- **libfann** [📁](./libfann) [🌐](https://github.com/GerHobbelt/fann) -- FANN: Fast Artificial Neural Network Library, a free open source neural network library, which implements multilayer artificial neural networks in C with support for both fully connected and sparsely connected networks. Cross-platform execution in both fixed and floating point are supported. It includes a framework for easy handling of training data sets. It is easy to use, versatile, well documented, and fast.
- **libffi** [📁](./libffi) [🌐](https://github.com/GerHobbelt/libffi) -- provides a portable, high level programming interface to various calling conventions. This allows a programmer to call any function specified by a call interface description at run time.
- **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
- **libfort** [📁](./libfort) [🌐](https://github.com/GerHobbelt/libfort) -- a simple crossplatform library to create formatted text tables.
- **libfyaml** [📁](./libfyaml) [🌐](https://github.com/GerHobbelt/libfyaml) -- a fancy 1.2 YAML and JSON parser/writer. Fully feature complete YAML parser and emitter, supporting the latest YAML spec and passing the full YAML testsuite. It is designed to be very efficient, avoiding copies of data, and has no artificial limits like the 1024 character limit for implicit keys.
- **libgateY** [📁](./libgateY) [🌐](https://github.com/GerHobbelt/libgateY) -- Use a web browser to easily visualize data from your C++ program and control it’s behaviour. libgateY allows you to add variables shared between the native C++ code and the javascript code.
- **libgd** [📁](./libgd) [🌐](https://github.com/GerHobbelt/libgd) -- GD is a library for the dynamic creation of images by programmers. GD has support for: WebP, JPEG, PNG, AVIF, HEIF, TIFF, BMP, GIF, TGA, WBMP, XPM.
- **libgif** [📁](./libgif) [🌐](https://github.com/GerHobbelt/libgif) -- a library for manipulating GIF files.
- **libgnurx** [📁](./libgnurx) [🌐](https://github.com/GerHobbelt/libgnurx) -- the POSIX regex functionality from glibc extracted into a separate library, for Win32.
- **libgrape-lite** [📁](./libgrape-lite) [🌐](https://github.com/GerHobbelt/libgrape-lite) -- a C++ library from Alibaba for parallel graph processing (GRAPE). It differs from prior systems in its ability to parallelize sequential graph algorithms as a whole by following the PIE programming model from GRAPE. Sequential algorithms can be easily "plugged into" `libgrape-lite` with only minor changes and get parallelized to handle large graphs efficiently. `libgrape-lite` is designed to be highly efficient and flexible, to cope with the scale, variety and complexity of real-life graph applications.
- **libharry** [📁](./libharry) [🌐](https://github.com/GerHobbelt/harry) -- Harry - A Tool for Measuring String Similarity
- **libheif** [📁](./libheif) [🌐](https://github.com/GerHobbelt/heif) -- High Efficiency Image File Format (HEIF) :: a visual media container format standardized by the Moving Picture Experts Group (MPEG) for storage and sharing of images and image sequences. It is based on the well-known ISO Base Media File Format (ISOBMFF) standard. HEIF Reader/Writer Engine is an implementation of HEIF standard in order to demonstrate its powerful features and capabilities.
- **libheif-alt** [📁](./libheif-alt) [🌐](https://github.com/GerHobbelt/libheif) -- an ISO/IEC 23008-12:2017 HEIF and AVIF (AV1 Image File Format) file format decoder and encoder. HEIF and AVIF are new image file formats employing HEVC (h.265) or AV1 image coding, respectively, for the best compression ratios currently possible.
- **libhog** [📁](./libhog) [🌐](https://github.com/GerHobbelt/libhog) -- `hog` a.k.a. `hound` - fetch the (PDF,EPUB,HTML) document you seek using maximum effort: `hog` is a tool for fetching *files* from the internet, specifically PDFs. Intended to be used where you browse the 'Net and decide you want to download a given PDF from any site: this can be done through the browser itself, but is sometimes convoluted or neigh impossible (ftp links require another tool, PDFs stored at servers which report as having their SSL certificates *expired* are a hassle to get through for the user-in-a-hurry, etc. etc.) and `hog` is meant to cope with all these.
- **libicns** [📁](./libicns) [🌐](https://github.com/GerHobbelt/libicns) -- a library for manipulation of the Mac OS `icns` resource format, also known as the IconFamily resource type. It can read and write files from the Mac OS X icns format, as well as read from Mac OS resource files and macbinary encoded Mac OS resource forks.
- **libiconv** [📁](./libiconv) [🌐](https://github.com/GerHobbelt/libiconv-win-build) -- provides conversion between many platform, language or country dependent character encodings to & from Unicode. This library provides an `iconv()` implementation, for use on systems which don't have one, or whose implementation cannot convert from/to Unicode. It provides support for the encodings: European languages (ASCII, ISO-8859-{1,2,3,4,5,7,9,10,13,14,15,16}, KOI8-R, KOI8-U, KOI8-RU, CP{1250,1251,1252,1253,1254,1257}, CP{850,866,1131}, Mac{Roman,CentralEurope,Iceland,Croatian,Romania}, Mac{Cyrillic,Ukraine,Greek,Turkish}, Macintosh), Semitic languages (ISO-8859-{6,8}, CP{1255,1256}, CP862, Mac{Hebrew,Arabic}), Japanese (EUC-JP, SHIFT_JIS, CP932, ISO-2022-JP, ISO-2022-JP-2, ISO-2022-JP-1, ISO-2022-JP-MS), Chinese (EUC-CN, HZ, GBK, CP936, GB18030, EUC-TW, BIG5, CP950, BIG5-HKSCS, BIG5-HKSCS:2004, BIG5-HKSCS:2001, BIG5-HKSCS:1999, ISO-2022-CN, ISO-2022-CN-EXT), Korean (EUC-KR, CP949, ISO-2022-KR, JOHAB), Armenian (ARMSCII-8), Georgian (Georgian-Academy, Georgian-PS), Tajik (KOI8-T), Kazakh (PT154, RK1048), Thai (ISO-8859-11, TIS-620, CP874, MacThai), Laotian (MuleLao-1, CP1133), Vietnamese (VISCII, TCVN, CP1258), Platform specifics (HP-ROMAN8, NEXTSTEP), Full Unicode (UTF-8, UCS-2, UCS-2BE, UCS-2LE, UCS-4, UCS-4BE, UCS-4LE, UTF-16, UTF-16BE, UTF-16LE, UTF-32, UTF-32BE, UTF-32LE, UTF-7, C99, JAVA, UCS-2-INTERNAL, UCS-4-INTERNAL). It also provides support for a few extra encodings: European languages (CP{437,737,775,852,853,855,857,858,860,861,863,865,869,1125}), Semitic languages (CP864), Japanese (EUC-JISX0213, Shift_JISX0213, ISO-2022-JP-3), Chinese (BIG5-2003), Turkmen (TDS565), Platform specifics (ATARIST, RISCOS-LATIN1). It has also some limited support for transliteration, i.e. when a character cannot be represented in the target character set, it can be approximated through one or several similarly looking characters.
- **libics** [📁](./libics) [🌐](https://github.com/GerHobbelt/libics) -- the reference library for ICS (Image Cytometry Standard), an open standard for writing images of any dimensionality and data type to file, together with associated information regarding the recording equipment or recorded subject.
  
  ICS stands for Image Cytometry Standard, and was first proposed in: P. Dean, L. Mascio, D. Ow, D. Sudar, J. Mullikin, "Propsed standard for image cytometry data files", Cytometry, n.11, pp.561-569, 1990. 
  
  It writes 2 files, one is the header, with an '.ics' extension, and the other is the actual image data (with an '.ids' extension.)
  
  ICS version 2.0 extends this standard to allow for a more versatile placement of the image data. It can now be placed either in the same '.ics' file or inbedded in any other file, by specifying the file name and the byte offset for the data.
  
  The advantage of ICS over other open standards such as TIFF is that it allows data of any type and dimensionality to be stored. A TIFF file can contain a collection of 2D images; it's up to the user to determine how these relate to each other. An ICS file can contain, for exmaple, a 5D image in which the 4th dimension is the light frequency and the 5th time. Also, all of the information regarding the microscope settings (or whatever instument was used to acquire the image) and the sample preparation can be included in the file.

- **libidn2** [📁](./libidn2) [🌐](https://github.com/GerHobbelt/libidn2) -- international domain name parsing
- **libimagequant** [📁](./libimagequant) [🌐](https://github.com/GerHobbelt/libimagequant) -- Palette quantization library that powers `pngquant` and other PNG optimizers. `libimagequant` converts RGBA images to palette-based 8-bit indexed images, including alpha component. It's ideal for generating tiny PNG images and nice-looking GIFs. Image encoding/decoding isn't handled by the library itself, bring your own encoder.
- **libinsane** [📁](./libinsane) [🌐](https://github.com/GerHobbelt/libinsane) -- *the* library to access scanners on both Linux and Windows.
- **libirwls** [📁](./libirwls) [🌐](https://github.com/GerHobbelt/LIBIRWLS) -- LIBIRWLS is an integrated library that incorporates a parallel implementation of the Iterative Re-Weighted Least Squares (IRWLS) procedure, an alternative to quadratic programming (QP), for training of Support Vector Machines (SVMs). Although there are several methods for SVM training, the number of parallel libraries is very reduced. In particular, this library contains solutions to solve either full or budgeted SVMs making use of shared memory parallelization techniques: (1) a parallel SVM training procedure based on the IRWLS algorithm, (2) a parallel budgeted SVMs solver based on the IRWLS algorithm.
- **libjpeg** [📁](../../thirdparty/libjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-libjpeg) -- the Independent JPEG Group's JPEG software
- **libjpeg-turbo** [📁](./libjpeg-turbo) [🌐](https://github.com/GerHobbelt/libjpeg-turbo) -- a JPEG image codec that uses SIMD instructions to accelerate baseline JPEG compression and decompression on x86, x86-64, Arm, PowerPC, and MIPS systems, as well as progressive JPEG compression on x86, x86-64, and Arm systems.  On such systems, libjpeg-turbo is generally 2-6x as fast as libjpeg, all else being equal.  On other types of systems, libjpeg-turbo can still outperform libjpeg by a significant amount, by virtue of its highly-optimized Huffman coding routines.  In many cases, the performance of libjpeg-turbo rivals that of proprietary high-speed JPEG codecs.
- **libkra** [📁](./libkra) [🌐](https://github.com/GerHobbelt/libkra) -- a C++ library for importing Krita's KRA & KRZ formatted documents.
- **liblbfgs** [📁](./liblbfgs) [🌐](https://github.com/GerHobbelt/liblbfgs) -- libLBFGS: C library of limited-memory BFGS (L-BFGS), a C port of the implementation of Limited-memory Broyden-Fletcher-Goldfarb-Shanno (L-BFGS) method written by Jorge Nocedal. The original FORTRAN source code is available at: http://www.ece.northwestern.edu/~nocedal/lbfgs.html
- **liblinear** [📁](./liblinear) [🌐](https://github.com/GerHobbelt/liblinear) -- a simple package for solving large-scale regularized linear classification, regression and outlier detection.
- **libmdbx** [📁](./libmdbx) [🌐](https://github.com/GerHobbelt/libmdbx) -- one of the fastest embeddable key-value ACID database without WAL. `libmdbx` surpasses the legendary LMDB in terms of reliability, features and performance.
- **libmetalink** [📁](./libmetalink) [🌐](https://github.com/GerHobbelt/libmetalink) -- a library to read Metalink XML download description format. It supports both [_Metalink version 3_](http://www.metalinker.org/Metalink_3.0_Spec.pdf) and [_Metalink version 4 (RFC 5854)_](https://tools.ietf.org/html/rfc5854).
- **libmio** [📁](./libmio) [🌐](https://github.com/GerHobbelt/mio) -- An easy to use header-only cross-platform C++11 memory mapping library. `mio` has been created with the goal to be easily includable (i.e. no dependencies) in any C++ project that needs memory mapped file IO without the need to pull in Boost.
- **libmlpp** [📁](./libmlpp) [🌐](https://github.com/GerHobbelt/MLPP) -- ML++ :: The intent with this machine-learning library is for it to act as a crossroad between low-level developers and machine learning engineers.
- **libmobi** [📁](./libmobi) [🌐](https://github.com/GerHobbelt/libmobi) -- a library for handling Mobipocket/Kindle (MOBI) ebook format documents.
- **libmodbus** [📁](./libmodbus) [🌐](https://github.com/GerHobbelt/libmodbus) -- a groovy modbus library to send/receive data with a device which respects the Modbus protocol. This library can use a serial port or an Ethernet connection. The functions included in the library have been derived from the Modicon Modbus Protocol Reference Guide which can be obtained from [www.modbus.org](http://www.modbus.org).
- **lib_nas_lockfile** [📁](./lib_nas_lockfile) [🌐](https://github.com/GerHobbelt/lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
- **libngt-ann** [📁](./libngt-ann) [🌐](https://github.com/GerHobbelt/NGT) -- Yahoo's Neighborhood Graph and Tree for Indexing High-dimensional Data. NGT provides commands and a library for performing high-speed approximate nearest neighbor searches against a large volume of data (several million to several 10 million items of data) in high dimensional vector data space (several ten to several thousand dimensions).
- **libnop** [📁](./libnop) [🌐](https://github.com/GerHobbelt/libnop) -- libnop (C++ Native Object Protocols) is a header-only library for serializing and deserializing C++ data types without external code generators or runtime support libraries. The only mandatory requirement is a compiler that supports the C++14 standard.
- **liboauth2** [📁](./liboauth2) [🌐](https://github.com/GerHobbelt/liboauth2) -- a library to build C-based OAuth 2.x and OpenID Connect servers and clients e.g. web-server plugins; extends cjose into OAuth 2.x and OpenID Connect specific claims, secrets, and hashes; adds OAuth 2.x and OpenID Connect protocols by abstracting HTTP requests and responses from web server implementation specifics.
- **libocca** [📁](./libocca) [🌐](https://github.com/GerHobbelt/occa) -- a portable and vendor neutral framework for parallel programming on heterogeneous platforms. The OCCA API provides unified models for heterogeneous programming concepts&mdash;such as a device, memory, or kernel&mdash;while the OCCA Kernel Language (OKL) enables the creation of portable device kernels using a directive-based extension to the C-language.
- **libparameters** [📁](./libparameters) [🌐](https://github.com/GerHobbelt/libparameters) -- use C++ runtime configurable typed parameters as if they were native types, while you can track read/write access/usage of each in your code sections for improved diagnostics of your application's behaviour. Used in enhanced tesseract, f.e.
- **libpathutils** [📁](./libpathutils) [🌐](https://github.com/GerHobbelt/libpathutils) -- cross-platform filesystem path utility functions
- **libpillowfight** [📁](./libpillowfight) [🌐](https://github.com/GerHobbelt/libpillowfight) -- simple C Library containing various image processing algorithms. 
  
  Available algorithms:
  
  - ACE (Automatic Color Equalization; Parallelized implementation)
  - Canny edge detection
  - Compare: Compare two images (grayscale) and makes the pixels that are different really visible (red).
  - Gaussian blur
  - Scan borders: Tries to detect the borders of a page in an image coming from a scanner.
  - Sobel operator
  - SWT (Stroke Width Transformation)
  - [Unpaper](https://github.com/Flameeyes/unpaper)'s algorithms
    
    - Blackfilter
    - Blurfilter
    - Border
    - Grayfilter
    - Masks
    - Noisefilter

- **libpinyin** [📁](./libpinyin) [🌐](https://github.com/GerHobbelt/libpinyin) -- the libpinyin project aims to provide the algorithms core for intelligent sentence-based Chinese pinyin input methods.
- **libpipeline** [📁](./libpipeline) [🌐](https://github.com/GerHobbelt/libpipeline) -- libpipeline, a pipeline manipulation library for setting up and running pipelines of processes, without needing to involve shell command-line parsing which is often error-prone and insecure.  This alleviates programmers of the need to laboriously construct pipelines using lower-level primitives such as fork(2) and execve(2).
- **libpmemobj-cpp** [📁](./libpmemobj-cpp) [🌐](https://github.com/GerHobbelt/libpmemobj-cpp) -- a C++ binding for **libpmemobj** (a library which is a part of [PMDK collection](https://github.com/pmem/pmdk)).
- **libpng** [📁](../../thirdparty/libpng) [🌐](https://github.com/GerHobbelt/libpng) -- LIBPNG: Portable Network Graphics support, official libpng repository.
- **libpopcnt** [📁](./libpopcnt) [🌐](https://github.com/GerHobbelt/libpopcnt) -- a header-only C/C++ library for counting the number of 1 bits (bit population count) in an array as quickly as possible using specialized CPU instructions.
- **libprecog** [📁](./libprecog) [🌐](https://github.com/GerHobbelt/PRLib) -- PRLib - Pre-Recognition Library. The main aim of the library is to prepare images for OCR (text recogntion). Image processing can really help to improve recognition quality.
- **libprecog-data** [📁](./libprecog-data) [🌐](https://github.com/GerHobbelt/libprecog-data) -- `PRLib` (a.k.a. `libprecog`) test data.
- **libprecog-manuals** [📁](./libprecog-manuals) [🌐](https://github.com/GerHobbelt/libprecog-manuals) -- `PRLib` (a.k.a. `libprecog`) related papers.
- **libpsd** [📁](./libpsd) [🌐](https://github.com/GerHobbelt/libpsd) -- a library for Adobe Photoshop `.psd` file's decoding and rendering.
- **libpsl** [📁](./libpsl) [🌐](https://github.com/GerHobbelt/libpsl) -- handles the *Public Suffix List* (a collection of Top Level Domains (TLDs) suffixes, e.g. `.com`, `.net`, *Country Top Level Domains* (ccTLDs) like `.de` and `.cn` and *[Brand Top Level Domains](https://icannwiki.org/Brand_TLD)* like `.apple` and `.google`. Can be used to:
  
  - avoid privacy-leaking "super domain" certificates ([see post from Jeffry Walton](https://lists.gnu.org/archive/html/bug-wget/2014-03/msg00093.html))
  - avoid privacy-leaking "supercookies"
  - domain highlighting parts of the domain in a user interface
  - sorting domain lists by site

- **libq** [📁](./libq) [🌐](https://github.com/GerHobbelt/q) -- A platform-independent promise library for C++, implementing asynchronous continuations.
- **libqrencode** [📁](./libqrencode) [🌐](https://github.com/GerHobbelt/libqrencode) -- generate QRcodes from anything (e.g. URLs). `libqrencode` is a fast and compact library for encoding data in a QR Code, a 2D symbology that can be scanned by handy terminals such as a smartphone. The capacity of QR Code is up to 7000 digits or 4000 characters and has high robustness. `libqrencode` supports QR Code model 2, described in JIS (Japanese Industrial Standards) X0510:2004 or ISO/IEC 18004. Most of features in the specification are implemented: Numeric, alphabet, Japanese kanji (Shift-JIS) or any 8 bit code, Optimized encoding of a string, Structured-append of symbols, Micro QR Code (experimental).
- **libquill** [📁](./libquill) [🌐](https://github.com/GerHobbelt/quill) -- a cross-platform low latency logging library based on C++14.
- **libraqm** [📁](./libraqm) [🌐](https://github.com/GerHobbelt/libraqm) -- a small library that encapsulates the logic for complex text layout and provides a convenient API.
- **librs232** [📁](./librs232) [🌐](https://github.com/GerHobbelt/librs232) -- multiplatform library for serial communications over RS-232 (serial port).
- **librsync** [📁](./librsync) [🌐](https://github.com/GerHobbelt/librsync) -- a library for calculating and applying network deltas. librsync encapsulates the core algorithms of the rsync protocol, which help with efficient calculation of the differences between two files. The rsync algorithm is different from most differencing algorithms because it does not require the presence of the two files to calculate the delta.  Instead, it requires a set of checksums of each block of one file, which together form a signature for that file.  Blocks at any position in the other file which have the same checksum are likely to be identical, and whatever remains is the difference. This algorithm transfers the differences between two files without needing both files on the same system.
- **libscanf** [📁](./libscanf) [🌐](https://github.com/GerHobbelt/scnlib) -- a modern C++ library for replacing `scanf` and `std::istream`. This library attempts to move us ever so closer to replacing `iostream`s and C stdio altogether. It's faster than `iostream` (see Benchmarks) and type-safe, unlike `scanf`. Think [{fmt}](https://github.com/fmtlib/fmt) but in the other direction.
- **libserialport** [📁](./libserialport) [🌐](https://github.com/GerHobbelt/libserialport) -- a cross-platform library for accessing serial ports. libserialport is a minimal library written in C that is intended to take care of the OS-specific details when writing software that uses serial ports.
- **libshmcache** [📁](./libshmcache) [🌐](https://github.com/GerHobbelt/libshmcache) -- a local share memory cache for multi processes. it is a high performance library because read mechanism is lockless. libshmcache is 100+ times faster than a remote interface such as redis.
- **libsigcplusplus** [📁](./libsigcplusplus) [🌐](https://github.com/GerHobbelt/libsigcplusplus) -- libsigc++ : The Typesafe Callback Framework for C++. It allows you to define signals and to connect those signals to any callback function, either global or a member function, regardless of whether it is static or virtual.
- **libsiridb** [📁](./libsiridb) [🌐](https://github.com/GerHobbelt/libsiridb) -- SiriDB Connector C (libsiridb) is a library which can be used to communicate with [SiriDB](https://github.com/transceptor-technology/siridb-server) using the C program language. This library contains useful functions but does not handle the connection itself.
- **libsl3** [📁](./libsl3) [🌐](https://github.com/GerHobbelt/libsl3) -- a C++ interface for SQLite 3.x. libsl3 is designed to enable comfortable and efficient communication with a SQLite database based on its natural language, which is SQL.
- **libsmile** [📁](./libsmile) [🌐](https://github.com/GerHobbelt/libsmile) -- C implementation of the Smile binary format (https://github.com/FasterXML/smile-format-specification).
- **libsptag** [📁](./libsptag) [🌐](https://github.com/GerHobbelt/SPTAG) -- a library for fast approximate nearest neighbor search.  SPTAG (Space Partition Tree And Graph) is a library for large scale vector approximate nearest neighbor search scenario released by [Microsoft Research (MSR)](https://www.msra.cn/) and [Microsoft Bing](http://bing.com).
- **libsql** [📁](./libsql) [🌐](https://github.com/GerHobbelt/libsql) -- libSQL is an open source, open contribution fork of SQLite. We aim to evolve it to suit many more use cases than SQLite was originally designed for, and plan to use third-party OSS code wherever it makes sense.
  
  SQLite has solidified its place in modern technology stacks, embedded in nearly any computing device you can think of. Its open source nature and public domain availability make it a popular choice for modification to meet specific use cases.
  But despite having its code available, SQLite famously doesn't accept external contributors, so community improvements cannot be widely enjoyed.
  There have been other forks in the past, but they all focus on a specific technical difference. We aim to be a community where people can contribute from many different angles and motivations.
  We want to see a world where everyone can benefit from all of the great ideas and hard work that the SQLite community contributes back to the codebase.

- **libsqlfs** [📁](./libsqlfs) [🌐](https://github.com/GerHobbelt/libsqlfs) -- a POSIX style file system on top of an SQLite database.  It allows applications to have access to a full read/write file system in a single file, complete with its own file hierarchy and name space.  This is useful for applications which needs structured storage, such as embedding documents within documents, or management of configuration data or preferences.
- **libstb** [📁](./libstb) [🌐](https://github.com/GerHobbelt/stb) -- single-file public domain (or MIT licensed) libraries for C/C++.
- **libstemmer** [📁](./libstemmer) [🌐](https://github.com/GerHobbelt/libstemmer) -- SnowBall stemmer for many languages.
- **libsvm** [📁](./libsvm) [🌐](https://github.com/GerHobbelt/libsvm) -- a simple, easy-to-use, and efficient software for SVM classification and regression. It solves C-SVM classification, nu-SVM classification, one-class-SVM, epsilon-SVM regression, and nu-SVM regression. It also provides an automatic model selection tool for C-SVM classification.
- **libtextcat** [📁](./libtextcat) [🌐](https://github.com/GerHobbelt/libtextcat) -- text language detection
- **libtiff** [📁](../../thirdparty/libtiff) [🌐](https://github.com/GerHobbelt/libtiff) -- TIFF Software Distribution
- **libtuv** [📁](./libtuv) [🌐](https://github.com/GerHobbelt/libtuv) -- a multi-platform tiny event library refactored from `libuv` source for IoT and embedded systems.
- **libucl** [📁](./libucl) [🌐](https://github.com/GerHobbelt/libucl) -- the configuration language called UCL - Universal Configuration Language.  UCL is heavily infused by nginx configuration as the example of a convenient configuration system. However, UCL is fully compatible with JSON format and is able to parse json files.
- **libunibreak** [📁](./libunibreak) [🌐](https://github.com/GerHobbelt/libunibreak) -- an implementation of the line breaking and word breaking algorithms as described in (Unicode Standard Annex 14)[http://www.unicode.org/reports/tr14/] and (Unicode Standard Annex 29)[http://www.unicode.org/reports/tr29/].
- **libunifex** [📁](./libunifex) [🌐](https://github.com/GerHobbelt/libunifex) -- a prototype implementation of the C++ sender/receiver async programming model that is currently being considered for standardisation. This project contains implementations of the following: Schedulers, Timers, Asynchronous I/O, Algorithms that encapsulate certain concurrency patterns, Async streams, Cancellation, Coroutine integration.
- **libusb** [📁](./libusb) [🌐](https://github.com/GerHobbelt/libusb) -- a library for USB device access from Linux, macOS, Windows, OpenBSD/NetBSD, Solaris userspace, etc.; libusb is abstracted internally in such a way that it can hopefully be ported to other operating systems.
- **libuv** [📁](./libuv) [🌐](https://github.com/GerHobbelt/libuv) -- a multi-platform support library with a focus on asynchronous I/O.
  
  Feature highlights:
  
  * Full-featured event loop backed by epoll, kqueue, IOCP, event ports.
  * Asynchronous TCP and UDP sockets
  * Asynchronous DNS resolution
  * Asynchronous file and file system operations
  * File system events
  * ANSI escape code controlled TTY
  * IPC with socket sharing, using Unix domain sockets or named pipes (Windows)
  * Child processes
  * Thread pool
  * Signal handling
  * High resolution clock
  * Threading and synchronization primitives

- **libvips** [📁](./libvips) [🌐](https://github.com/GerHobbelt/libvips) -- a demand-driven, horizontally threaded image processing library which has around 300 operations covering arithmetic, histograms, convolution, morphological operations, frequency filtering, colour, resampling, statistics and others. It supports a large range of numeric types, from 8-bit int to 128-bit complex. Images can have any number of bands. It supports a good range of image formats, including JPEG, JPEG2000, JPEG-XL, TIFF, PNG, WebP, HEIC, AVIF, FITS, Matlab, OpenEXR, PDF, SVG, HDR, PPM / PGM / PFM, CSV, GIF, Analyze, NIfTI, DeepZoom, and OpenSlide. It can also load images via ImageMagick or GraphicsMagick, letting it work with formats like DICOM.
- **libvrb** [📁](./libvrb) [🌐](https://github.com/GerHobbelt/vrb) -- implements a ring buffer, also known as a character FIFO or circular buffer, with a special property that any data present in the buffer, as well as any empty space, are always seen as a single contiguous extent by the calling program.  This is implemented with virtual memory mapping by creating a mirror image of the buffer contents at the memory location in the virtual address space immediately after the main buffer location.  This allows the mirror image to always be seen without doing any copying of data.
- **libwarc** [📁](./libwarc) [🌐](https://github.com/GerHobbelt/libwarc) -- C++ library to parse WARC files. WARC is the official storage format of the Internet Archive for storing scraped content. WARC format used: http://bibnum.bnf.fr/WARC/WARC_ISO_28500_version1_latestdraft.pdf
- **libwebp** [📁](./libwebp) [🌐](https://github.com/GerHobbelt/libwebp) -- a library to encode and decode images in WebP format.
- **libwebsocketpp** [📁](./libwebsocketpp) [🌐](https://github.com/GerHobbelt/websocketpp) -- WebSocket++ is a header only C++ library that implements RFC6455 The WebSocket Protocol.
- **libwebsockets** [📁](./libwebsockets) [🌐](https://github.com/GerHobbelt/libwebsockets) -- a simple-to-use C library providing client and server for HTTP/1, HTTP/2, WebSockets, MQTT and other protocols. It supports a lot of lightweight ancilliary implementations for things like JSON, CBOR, JOSE, COSE. It's very gregarious when it comes to event loop sharing, supporting libuv, libevent, libev, sdevent, glib and uloop, as well as custom event libs.
- **libwil** [📁](./libwil) [🌐](https://github.com/GerHobbelt/wil) -- The Windows Implementation Libraries (WIL) is a header-only C++ library created to make life easier for developers on Windows through readable type-safe C++ interfaces for common Windows coding patterns.
- **libwildmatch** [📁](./libwildmatch) [🌐](https://github.com/GerHobbelt/wildmatch) -- wildmatch is a BSD-licensed C/C++ library for git/rsync-style pattern matching.
- **libxcam** [📁](./libxcam) [🌐](https://github.com/GerHobbelt/libxcam) -- libXCam is a project for extended camera features and focus on image quality improvement and video analysis. There are lots features supported in image pre-processing, image post-processing and smart analysis. This library makes GPU/CPU/ISP working together to improve image quality. OpenCL is used to improve performance in different platforms.
- **libxml2** [📁](./libxml2) [🌐](https://github.com/GerHobbelt/libxml2) -- [libxml](http://xmlsoft.org/): XML read/write
- **libxo** [📁](./libxo) [🌐](https://github.com/GerHobbelt/libxo) -- `libxo` allows an application to generate text, XML, JSON, and HTML output using a common set of function calls (rather than the application using old skool `printf()`).  The application decides at run time which output style should be produced.
- **libxslt** [📁](./libxslt) [🌐](https://github.com/GerHobbelt/libxslt) -- XSLT support for libxml2 (XML toolkit from the GNOME project)
- **libyaml** [📁](./libyaml) [🌐](https://github.com/GerHobbelt/libyaml) -- YAML
- **libyaml-examples** [📁](./libyaml-examples) [🌐](https://github.com/GerHobbelt/libyaml-examples) -- a small set of C language example programs to demonstrate how to use the [libyaml library](http://pyyaml.org/wiki/LibYAML).
- **libzip** [📁](./libzip) [🌐](https://github.com/GerHobbelt/libzip) -- a C library for reading, creating, and modifying zip and zip64 archives.
- **libzmq** [📁](./libzmq) [🌐](https://github.com/GerHobbelt/libzmq) -- ZeroMQ core engine in C++, implements [ZMTP/3.1](https://zguide.zeromq.org/).
- **libzopfli** [📁](./libzopfli) [🌐](https://github.com/GerHobbelt/zopfli) -- Zopfli Compression Algorithm is a compression library programmed in C to perform very good, but slow, deflate or zlib compression.
- **LightGBM** [📁](./LightGBM) [🌐](https://github.com/GerHobbelt/LightGBM) -- LightGBM (Light Gradient Boosting Machine) is a gradient boosting framework that uses tree based learning algorithms. It is designed to be distributed and efficient with the following advantages:
  
  - Better accuracy.
  - Capable of handling large-scale data.
  - Faster training speed and higher efficiency.
  - Lower memory usage.
  - Support of parallel, distributed, and GPU learning.

- **LightLDA** [📁](./LightLDA) [🌐](https://github.com/GerHobbelt/LightLDA) -- a distributed system for large scale topic modeling. It implements a distributed sampler that enables very large data sizes and models. LightLDA improves sampling throughput and convergence speed via a fast O(1) metropolis-Hastings algorithm, and allows small cluster to tackle very large data and model sizes through model scheduling and data parallelism architecture. LightLDA is implemented with C++ for performance consideration.
- **Lightning.NET** [📁](./Lightning.NET) [🌐](https://github.com/GerHobbelt/Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
- **ligra-graph** [📁](./ligra-graph) [🌐](https://github.com/GerHobbelt/ligra) -- LIGRA: a Lightweight Graph Processing Framework for Shared Memory; works on both uncompressed and compressed graphs and hypergraphs.
- **linecook** [📁](./linecook) [🌐](https://github.com/GerHobbelt/linecook) -- a C library for editing the command line, much like the [readline](https://tiswww.cwru.edu/php/chet/readline/readline.html) library used in <b>bash</b> and <b>gdb</b>.
- **line_detector** [📁](./line_detector) [🌐](https://github.com/GerHobbelt/line_detector) -- line segment detector ([lsd](http://www.ipol.im/pub/art/2012/gjmr-lsd/)) &. edge drawing line detector (edl) &. hough line detector (standard &. probabilistic) for detection.
- **linenoise** [📁](./linenoise) [🌐](https://github.com/GerHobbelt/linenoise) -- `readline` simile for REPL/interactive runs in a CLI
- **lizard** [📁](./lizard) [🌐](https://github.com/GerHobbelt/lizard) -- efficient compression with very fast decompression. Lizard (formerly LZ5) is a lossless compression algorithm which contains 4 compression methods:
  
  - fastLZ4 : compression levels -10...-19 are designed to give better decompression speed than [LZ4] i.e. over 2000 MB/s
  - fastLZ4 + Huffman : compression levels -30...-39 add Huffman coding to fastLZ4
  - LIZv1 : compression levels -20...-29 are designed to give better ratio than [LZ4] keeping 75% decompression speed
  - LIZv1 + Huffman : compression levels -40...-49 give the best ratio (comparable to [zlib] and low levels of [zstd]/[brotli]) at decompression speed of 1000 MB/s

- **LLhttp-parser** [📁](./LLhttp-parser) [🌐](https://github.com/GerHobbelt/llhttp) -- a port and replacement of [http_parser](https://github.com/nodejs/http-parser) to TypeScript. [llparse](https://github.com/nodejs/llparse) is used to generate the output C source file, which could be compiled and linked with the embedder's program (like Node.js).
- **lmdb** [📁](./lmdb) [🌐](https://github.com/GerHobbelt/lmdb) -- OpenLDAP [LMDB](http://www.lmdb.tech/doc/index.html) is an outrageously fast key/value store with semantics that make it highly interesting for many applications.  Of specific note, besides speed, is the full support for transactions and good read/write concurrency.  LMDB is also famed for its robustness **when used correctly**.
- **lmdb-safe** [📁](./lmdb-safe) [🌐](https://github.com/GerHobbelt/lmdb-safe) -- A safe modern & performant C++ wrapper of LMDB. LMDB is an outrageously fast key/value store with semantics that make it highly interesting for many applications. Of specific note, besides speed, is the full support for transactions and good read/write concurrency. LMDB is also famed for its robustness.. **when used correctly**. The design of LMDB is elegant and simple, which aids both the performance and stability. The downside of this elegant design is a nontrivial set of rules that need to be followed to not break things. In other words, LMDB delivers great things but only if you use it exactly right. This is by conscious design. The `lmdb-safe` library aims to deliver the full LMDB performance while programmatically making sure the LMDB semantics are adhered to, with very limited overhead.
- **lmdb.spreads.net** [📁](./lmdb.spreads.net) [🌐](https://github.com/GerHobbelt/Spreads.LMDB) -- Low-level zero-overhead and [the fastest](https://github.com/Spreads/Spreads.LMDB/commit/4085dde649ef9ebb64310f2627299762dd62d5ce) LMDB .NET wrapper with some additional native methods useful for [Spreads](https://github.com/Spreads/).
- **lmdb-store** [📁](./lmdb-store) [🌐](https://github.com/GerHobbelt/lmdb-store) -- an ultra-fast NodeJS interface to LMDB; probably the fastest and most efficient NodeJS key-value/database interface that exists for full storage and retrieval of structured JS data (objects, arrays, etc.) in a true persisted, scalable, [ACID compliant](https://en.wikipedia.org/wiki/ACID) database. It provides a simple interface for interacting with LMDB.
- **lmdbxx** [📁](./lmdbxx) [🌐](https://github.com/GerHobbelt/lmdbxx) -- lmdb++: a comprehensive C++11 wrapper for the LMDB embedded database library, offering both an error-checked procedural interface and an object-oriented resource interface with RAII semantics.
- **lnav** [📁](./lnav) [🌐](https://github.com/GerHobbelt/lnav) -- the Log File Navigator, **lnav** for short, is an advanced log file viewer for the small-scale.  It is a terminal application that can understand your log files and make it easy for you to find problems with little to no setup.
- **localmemcache** [📁](./localmemcache) [🌐](https://github.com/GerHobbelt/localmemcache) -- a key-value database and library that provides an interface similar to `memcached` but for accessing local data instead of remote data.  It's based on mmap()'ed shared memory for maximum speed. It supports persistence, also making it a fast alternative to GDBM and Berkeley DB.
- **loguru** [📁](./loguru) [🌐](https://github.com/GerHobbelt/loguru) -- a lightweight and flexible C++ logging library.
- **loki** [📁](./loki) [🌐](https://github.com/GerHobbelt/loki) -- Grafana Loki: like Prometheus, but for logs. Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by [Prometheus](https://prometheus.io/). It is designed to be very cost effective and easy to operate. It does not index the contents of the logs, but rather a set of labels for each log stream.
- **lol** [📁](./lol) [🌐](https://github.com/GerHobbelt/lol) -- the header-only part of the Lol (Math) Engine framework.
- **lolremez** [📁](./lolremez) [🌐](https://github.com/GerHobbelt/lolremez) -- LolRemez is a Remez algorithm implementation to approximate functions using polynomials.
- **lru_cache** [📁](./lru_cache) [🌐](https://github.com/GerHobbelt/lru_cache) -- LRU cache is a fast, header-only, generic C++ 17 [LRU cache][1] library, with customizable backend.
- **lrucache11** [📁](./lrucache11) [🌐](https://github.com/GerHobbelt/lrucache11) -- A header only C++11 LRU Cache template class that allows you to define key, value and optionally the `Map` type. uses a double linked list and a `std::unordered_map` style container to provide fast insert, delete and update No dependencies other than the C++ standard library.
- **lshbox** [📁](./lshbox) [🌐](https://github.com/GerHobbelt/LSHBOX) -- a C++ Toolbox of Locality-Sensitive Hashing for Large Scale Image Retrieval. Locality-Sensitive Hashing (LSH) is an efficient method for large scale image retrieval, and it achieves great performance in approximate nearest neighborhood searching.
  
  LSHBOX is a simple but robust C++ toolbox that provides several LSH algrithms, in addition, it can be integrated into Python and MATLAB languages. The following LSH algrithms have been implemented in LSHBOX, they are:
  
  * LSH Based on Random Bits Sampling
  * Random Hyperplane Hashing
  * LSH Based on Thresholding
  * LSH Based on p-Stable Distributions
  * [Spectral Hashing](http://www.cs.huji.ac.il/~yweiss/SpectralHashing/) (SH)
  * [Iterative Quantization](http://www.unc.edu/~yunchao/itq.htm) (ITQ)
  * Double-Bit Quantization Hashing (DBQ)
  * K-means Based Double-Bit Quantization Hashing (KDBQ)

- **LSWMS** [📁](./LSWMS) [🌐](https://github.com/GerHobbelt/LSWMS) -- LSWMS  (Line Segment detection using Weighted Mean-Shift): line segment detection with OpenCV, originally published by Marcos Nieto Doncel.
- **lz4** [📁](./lz4) [🌐](https://github.com/GerHobbelt/lz4) -- LZ4 is lossless compression algorithm, providing compression speed > 500 MB/s per core, scalable with multi-cores CPU. It features an extremely fast decoder, with speed in multiple GB/s per core, typically reaching RAM speed limits on multi-core systems.
- **lzbench** [📁](./lzbench) [🌐](https://github.com/GerHobbelt/lzbench) -- an in-memory benchmark of open-source LZ77/LZSS/LZMA compressors. It joins all compressors into a single exe.
- **lzham_codec** [📁](./lzham_codec) [🌐](https://github.com/GerHobbelt/lzham_codec) -- LZHAM is a lossless data compression codec, with a compression ratio similar to LZMA but with 1.5x-8x faster decompression speed.
- **mace** [📁](./mace) [🌐](https://github.com/GerHobbelt/mace) -- **Mobile AI Compute Engine** (or **MACE** for short) is a deep learning inference framework optimized for mobile heterogeneous computing on Android, iOS, Linux and Windows devices. The design focuses on the following
- **magic_enum** [📁](./magic_enum) [🌐](https://github.com/GerHobbelt/magic_enum) -- Header-only C++17 library provides static reflection for enums; works with any enum type without any macro or boilerplate code.
- **magsac** [📁](./magsac) [🌐](https://github.com/GerHobbelt/magsac) -- (MAGSAC++ had been included in OpenCV) the MAGSAC and MAGSAC++ algorithms for robust model fitting without using a single inlier-outlier threshold.
- **mammut** [📁](./mammut) [🌐](https://github.com/GerHobbelt/mammut) -- provides an object oriented abstraction of architectural features normally exposed by means of `sysfs` files or CPU registries. It also provides the possibility to manage remote machines by using a client server mechanism.
- **manticore-columnar** [📁](./manticore-columnar) [🌐](https://github.com/GerHobbelt/columnar) -- Manticore Columnar Library is a column-oriented storage and secondary indexing library, aiming to provide **decent performance with low memory footprint at big data volume**. When used in combination with [Manticore Search](https://github.com/manticoresoftware/manticoresearch) it can be beneficial for those looking for:
  
  1. log analytics including rich free text search capabities (which is missing in e.g. [Clickhouse](https://github.com/ClickHouse/ClickHouse) - great tool for metrics analytics)
  2. faster / low resource consumption log/metrics analytics. Since the library and Manticore Search are both written in C++ with low optimizations in mind, in many cases the performance / RAM consumption is better than in Lucene / SOLR / Elasticsearch
  3. running log / metric analytics in docker / kubernetes. Manticore Search + the library can work with as little as 30 megabytes of RAM which Elasticsearch / Clickhouse can't. It also starts in less than a second or a few seconds in the worst case. Since the overhead is so little you can afford having more nodes of Manticore Search + the library than Elasticsearch. More nodes and quicker start means higher high availability and agility.
  4. powerful SQL for logs/metrics analytics and everything else [Manticore Search](https://github.com/manticoresoftware/manticoresearch) can give you

- **manticore-plugins** [📁](./manticore-plugins) [🌐](https://github.com/GerHobbelt/manticore-plugins) -- Manticore Search plugins and UDFs (user defined functions) -- Manticore Search can be extended with help of plugins and custom functions (aka user defined functions or UDFs).
- **manticoresearch** [📁](./manticoresearch) [🌐](https://github.com/GerHobbelt/manticoresearch) -- Manticore Search is an easy to use open source fast database for search. Good alternative for Elasticsearch. What distinguishes it from other solutions is:
  
  * It's very fast and therefore more cost-efficient than alternatives, for example Manticore is:
  * Modern MPP architecture and smart query parallelization capabilities allow to fully utilize all your CPU cores to **lower response time** as much as possible, when needed.
  * Powerful and fast full-text search which **works fine for small and big datasets**
  * Traditional **row-wise storage** for small, medium and big size datasets
  * **Columnar storage** support via the [Manticore Columnar Library](https://github.com/manticoresoftware/columnar/) for bigger datasets (much bigger than can fit in RAM)
  * Easy to use secondary indexes (you don't need to create them manually)
  * Cost-based optimizer for search queries
  * SQL-first: Manticore's **native syntax is SQL**. It speaks SQL over HTTP and uses the MySQL protocol (you can use your preferred MySQL client)
  * **JSON over HTTP**: to provide a more programmatic way to manage your data and schemas, Manticore provides a HTTP JSON protocol
  * Written fully in C++: **starts fast, doesn't take much RAM**, and low-level optimizations provide good performance
  * **Real-time inserts**: after an INSERT is made, the document is accessible immediately
  * [Interactive courses](https://play.manticoresearch.com/) for **easier learning**
  * **Built-in replication and load balancing**
  * **Can sync** from MySQL/PostgreSQL/ODBC/xml/csv out of the box
  * Not fully ACID-compliant, but **supports transactions and binlog** for safe writes

- **many-stop-words** [📁](./many-stop-words) [🌐](https://github.com/GerHobbelt/many-stop-words) -- Many Stop Words is a simple Python package that provides a single function for loading sets of stop words for different languages.
- **marian** [📁](./marian) [🌐](https://github.com/GerHobbelt/marian) -- an efficient Neural Machine Translation framework written in pure C++ with minimal dependencies.
- **MariGold.OpenXHTML** [📁](./MariGold.OpenXHTML) [🌐](https://github.com/GerHobbelt/MariGold.OpenXHTML) -- a wrapper library for Open XML SDK to convert HTML documents into Open XML word documents. It has simply encapsulated the complexity of Open XML yet exposes the properties of Open XML for manipulation.
- **math-atlas** [📁](./math-atlas) [🌐](https://github.com/GerHobbelt/math-atlas) -- The ATLAS (Automatically Tuned Linear Algebra Software) project is an ongoing research effort focusing on applying empirical techniques in order to provide portable performance, delivering an efficient BLAS implementation, as well as a few routines from LAPACK.
- **mathtoolbox** [📁](./mathtoolbox) [🌐](https://github.com/GerHobbelt/mathtoolbox) -- mathematical tools (interpolation, dimensionality reduction, optimization, etc.) written in C++11 and [Eigen](http://eigen.tuxfamily.org/).
- **matplotplusplus** [📁](./matplotplusplus) [🌐](https://github.com/GerHobbelt/matplotplusplus) -- **Matplot++** is a graphics library for data visualization that provides interactive plotting, means for exporting plots in high-quality formats for scientific publications, a compact syntax consistent with similar libraries, dozens of plot categories with specialized algorithms, multiple coding styles, and supports generic backends.
- **mcmc** [📁](./mcmc) [🌐](https://github.com/GerHobbelt/mcmc) -- Monte Carlo
- **mecab** [📁](./mecab) [🌐](https://github.com/GerHobbelt/mecab) -- MeCab (Yet Another Part-of-Speech and Morphological Analyzer) is a high-performance morphological analysis engine, designed to be independent of languages, dictionaries, and corpora, using Conditional Random Fields ((CRF)[http://www.cis.upenn.edu/~pereira/papers/crf.pdf]) to estimate the parameters.
- **memory** [📁](./memory) [🌐](https://github.com/GerHobbelt/memory) -- the C++ STL allocator model has various flaws. For example, they are fixed to a certain type, because they are almost necessarily required to be templates. So you can't easily share a single allocator for multiple types. In addition, you can only get a copy from the containers and not the original allocator object. At least with C++11 they are allowed to be stateful and so can be made object not instance based. But still, the model has many flaws. Over the course of the years many solutions have been proposed, for example [EASTL]. This library is another. But instead of trying to change the STL, it works with the current implementation.
- **merror** [📁](./merror) [🌐](https://github.com/GerHobbelt/merror) -- **MError** C++ Macro Error Handling Library is a library for error handling in C++ without exceptions. It requires C++17 and only works for gcc or clang compilers.
- **mesh-allocator** [📁](./mesh-allocator) [🌐](https://github.com/GerHobbelt/Mesh) -- Mesh: Compacting Memory Management for C/C++ -- Mesh is a drop in replacement for [malloc(3)](http://man7.org/linux/man-pages/man3/malloc.3.html) that can transparently recover from memory fragmentation without any changes to application code. Mesh is described in detail in a [paper (PDF)](https://github.com/plasma-umass/Mesh/raw/master/mesh-pldi19-powers.pdf) that appeared at PLDI 2019.
- **messagebox-windows** [📁](./messagebox-windows) [🌐](https://github.com/GerHobbelt/messagebox-windows) -- drive `MessageBox` and `MessageBeep` Win32 APIs
- **metalink-cli** [📁](./metalink-cli) [🌐](https://github.com/GerHobbelt/command) -- a small program which generates a metalink record on `stdout` for every file given on the commandline and using the mirror list from `stdin`.
- **metalink-mini-downloader** [📁](./metalink-mini-downloader) [🌐](https://github.com/GerHobbelt/mini-downloader) -- a small metalink downloader written in C++, using boost, libcurl and expat. It can either be compiled so that it downloads a specific file and then (optionally) launches it or be compiled into a "downloader template", which can later be used to create a custom downloader by replacing text strings inside the executable (they are marked in a special way, to make this easy).
- **mht-rip** [📁](./mht-rip) [🌐](https://github.com/GerHobbelt/mht-rip) -- as I have several HTML pages stored in this MHTML format. See also CHM: `CHM-lib`
- **MicroPather** [📁](./MicroPather) [🌐](https://github.com/GerHobbelt/MicroPather) -- a path finder and A* solver (astar or a-star) written in platform independent C++ that can be easily integrated into existing code. MicroPather focuses on being a path finding engine for video games but is a generic A* solver.
- **microsoft-performance-toolkit-sdk** [📁](./microsoft-performance-toolkit-sdk) [🌐](https://github.com/GerHobbelt/microsoft-performance-toolkit-sdk) -- The Microsoft Performance Toolkit is a collection of cross-platform tools developers can use to create and extend performance analysis applications. It serves as the runtime of the Windows Performance Analyzer, a Windows program included in the Windows Performance Toolkit. By using the Microsoft Performance Toolkit SDK, Windows Performance Analyzer - or any performance analysis application - can be configured to process and display performance data from arbitrary sources.
- **midas** [📁](./midas) [🌐](https://github.com/GerHobbelt/MIDAS) -- C++ implementation of:
  
  - [MIDAS: Microcluster-Based Detector of Anomalies in Edge Streams](https://arxiv.org/pdf/1911.04464.pdf). *Siddharth Bhatia, Bryan Hooi, Minji Yoon, Kijung Shin, Christos Faloutsos*. AAAI 2020.
  - [Real-time Streaming Anomaly Detection in Dynamic Graphs](https://arxiv.org/pdf/2009.08452.pdf). *Siddharth Bhatia, Rui Liu, Bryan Hooi, Minji Yoon, Kijung Shin, Christos Faloutsos*. TKDD 2022.

- **mimalloc** [📁](./mimalloc) [🌐](https://github.com/GerHobbelt/mimalloc) -- a compact general purpose allocator with excellent performance.
- **mime-mega** [📁](./mime-mega) [🌐](https://github.com/GerHobbelt/MegaMimes) -- MIME extract/insert/encode/decode: use for MHTML support
- **mimetic** [📁](./mimetic) [🌐](https://github.com/GerHobbelt/mimetic) -- MIME: use for MHTML support
- **minifb** [📁](./minifb) [🌐](https://github.com/GerHobbelt/minifb) -- MiniFB (Mini FrameBuffer) is a small cross platform library that makes it easy to render (32-bit) pixels in a window.
- **miniscript** [📁](./miniscript) [🌐](https://github.com/GerHobbelt/miniscript) -- the [MiniScript scripting language](http://miniscript.org).
- **minizip-ng** [📁](./minizip-ng) [🌐](https://github.com/GerHobbelt/minizip-ng) -- a zip manipulation library written in C that is supported on Windows, macOS, and Linux. Minizip was originally developed by [Gilles Vollant](https://www.winimage.com/zLibDll/minizip.html) in 1998. It was first included in the zlib distribution as an additional code contribution starting in zlib 1.1.2. Since that time, it has been continually improved upon and contributed to by many people. The original [project](https://github.com/madler/zlib/tree/master/contrib/minizip) can still be found in the zlib distribution that is maintained by Mark Adler.
- **mipp** [📁](./mipp) [🌐](https://github.com/GerHobbelt/MIPP) -- MyIntrinsics++ (MIPP): a portable wrapper for vector intrinsic functions (SIMD) written in C++11. It works for SSE, AVX, AVX-512 and ARM NEON (32-bit and 64-bit) instructions. MIPP wrapper supports simple/double precision floating-point numbers and also signed integer arithmetic (64-bit, 32-bit, 16-bit and 8-bit). With the MIPP wrapper you do not need to write a specific intrinsic code anymore. Just use provided functions and the wrapper will automatically generate the right intrisic calls for your specific architecture.
- **MITIE-nlp** [📁](./MITIE-nlp) [🌐](https://github.com/GerHobbelt/MITIE) -- provides state-of-the-art information extraction tools. Includes tools for performing [named entity extraction](http://blog.dlib.net/2014/04/mitie-completely-free-and-state-of-art.html) and [binary relation detection](http://blog.dlib.net/2014/07/mitie-v02-released-now-includes-python.html) as well as tools for training custom extractors and relation detectors.  MITIE is built on top of [dlib](http://dlib.net), a high-performance machine-learning library, MITIE makes use of several state-of-the-art techniques including the use of distributional word embeddings and Structural Support Vector Machines.
- **mitlm** [📁](./mitlm) [🌐](https://github.com/GerHobbelt/mitlm) -- the MIT Language Modeling Toolkit (MITLM) toolkit is a set of tools designed for the efficient estimation of statistical n-gram language models involving iterative parameter estimation.  It achieves much of its efficiency through the use of a compact vector representation of n-grams.
- **mlpack** [📁](./mlpack) [🌐](https://github.com/GerHobbelt/mlpack) -- an intuitive, fast, and flexible C++ machine learning library, meant to be a machine learning analog to LAPACK, aiming to implement a wide array of machine learning methods and functions as a "swiss army knife" for machine learning researchers.
- **mmc** [📁](./mmc) [🌐](https://github.com/GerHobbelt/mmc) -- Monte Carlo
- **mmkv** [📁](./mmkv) [🌐](https://github.com/GerHobbelt/MMKV) -- an **efficient**, **small**, **easy-to-use** mobile key-value storage framework used in the WeChat application. It's currently available on **Android**, **iOS/macOS**, **Win32** and **POSIX**.
- **MNN** [📁](./MNN) [🌐](https://github.com/GerHobbelt/MNN) -- a highly efficient and lightweight deep learning framework. It supports inference and training of deep learning models, and has industry leading performance for inference and training on-device. At present, MNN has been integrated in more than 30 apps of Alibaba Inc, such as Taobao, Tmall, Youku, Dingtalk, Xianyu and etc., covering more than 70 usage scenarios such as live broadcast, short video capture, search recommendation, product searching by image, interactive marketing, equity distribution, security risk control. In addition, MNN is also used on embedded devices, such as IoT. Inside Alibaba, [MNN](https://mp.weixin.qq.com/s/5I1ISpx8lQqvCS8tGd6EJw) works as the basic module of the compute container in the [Walle](https://mp.weixin.qq.com/s/qpeCETty0BqqNJV9CMJafA) System, the first end-to-end, general-purpose, and large-scale production system for device-cloud collaborative machine learning, which has been published in the top system conference OSDI’22.
- **modbus-esp8266** [📁](./modbus-esp8266) [🌐](https://github.com/GerHobbelt/modbus-esp8266) -- a Modbus Library for Arduino. Supports ModbusRTU, ModbusTCP and ModbusTCP Security.
- **monolith** [📁](./monolith) [🌐](https://github.com/GerHobbelt/monolith) -- a monorepo with several optimization projects.
  
  One of the highlights is a state-of-the-art scheduler using column generation, which significantly outperforms all other optimizers at [schedulingbenchmarks.org](http://www.schedulingbenchmarks.org/). **Try it in the browser (wasm) [here](https://www.strandmark.net/wasm/shift_scheduling_colgen_page.html)!**
  
  Implements the algorithm described in [_First-order Linear Programming in a Column Generation-Based Heuristic Approach to the Nurse Rostering Problem_](https://www.strandmark.net/papers/first-order-scheduling.pdf) (2020) [doi link](https://doi.org/10.1016/j.cor.2020.104945).
  
  The `minimum::linear::colgen` module contains code for solving scheduling problems. It significantly outperforms all other optimizers at [schedulingbenchmarks.org](http://www.schedulingbenchmarks.org/).
  
  Some of the reasons it is fast:
  
  - It uses a first-order LP solver based on papers by Chambolle and Pock.
  - The pricing problem uses highly optimized dynamic programming in a DAG (in `minimum::algorithms`).
  - The [Ryan-Foster rule](https://strandmark.wordpress.com/2018/01/24/visualizing-the-ryan-foster-rule/) is used to iteratively work towards an integer solution. There is no time to branch and bound for big problems.

- **morton_filter** [📁](./morton_filter) [🌐](https://github.com/GerHobbelt/morton_filter) -- a [Morton filter](https://www.vldb.org/pvldb/vol11/p1041-breslow.pdf) -- a new approximate set membership data structure. A Morton filter is a modified cuckoo filter that is optimized for bandwidth-constrained systems. Morton filters use additional computation in order to reduce their off-chip memory traffic. Like a cuckoo filter, a Morton filter supports insertions, deletions, and lookup operations. It additionally adds high-throughput self-resizing, a feature of quotient filters, which allows a Morton filter to increase its capacity solely by leveraging its internal representation. This capability is in contrast to existing vanilla cuckoo filter implementations, which are static and thus require using a backing data structure that contains the full set of items to resize the filter. Morton filters can also be configured to use less memory than a cuckoo filter for the same error rate while simultaneously delivering insertion, deletion, and lookup throughputs that are, respectively, up to 15.5x, 1.3x, and 2.5x higher than a cuckoo filter. Morton filters in contrast to vanilla cuckoo filters do not require a power of two number of buckets but rather only a number that is a multiple of two. They also use fewer bits per item than a Bloom filter when the target false positive rate is less than around 1% to 3%.
- **mosquitto** [📁](./mosquitto) [🌐](https://github.com/GerHobbelt/mosquitto) -- Eclipse Mosquitto is an open source implementation of a server for version 5.0, 3.1.1, and 3.1 of the MQTT protocol. It also includes a C and C++ client library, and the `mosquitto_pub` and `mosquitto_sub` utilities for publishing and subscribing.
- **mozjpeg** [📁](./mozjpeg) [🌐](https://github.com/GerHobbelt/mozjpeg) -- the Mozilla JPEG Encoder Project improves JPEG compression efficiency achieving higher visual quality and smaller file sizes at the same time. It is compatible with the JPEG standard, and the vast majority of the world's deployed JPEG decoders. MozJPEG is a patch for [libjpeg-turbo](https://github.com/libjpeg-turbo/libjpeg-turbo).
- **mrpt** [📁](./mrpt) [🌐](https://github.com/GerHobbelt/mrpt) -- MRPT is a lightweight and easy-to-use library for approximate nearest neighbor search with random projection. The index building has an integrated hyperparameter tuning algorithm, so the only hyperparameter required to construct the index is the target recall level! According to [our experiments](https://github.com/ejaasaari/mrpt-comparison/) MRPT is one of the fastest libraries for approximate nearest neighbor search.
  
  In the offline phase of the algorithm MRPT indexes the data with a collection of *random projection trees*. In the online phase the index structure allows us to answer queries in superior time. A detailed description of the algorithm with the time and space complexities, and the aforementioned comparisons can be found in [our article](https://www.cs.helsinki.fi/u/ttonteri/pub/bigdata2016.pdf) that was published in IEEE International Conference on Big Data 2016.
  
  The algorithm for automatic hyperparameter tuning is described in detail in our new article that will be presented in Pacific-Asia Conference on Knowledge Discovery and Data Mining 2019 ([arxiv preprint](https://arxiv.org/abs/1812.07484)).

- **ms_cpp_client_telemetry** [📁](./ms_cpp_client_telemetry) [🌐](https://github.com/GerHobbelt/cpp_client_telemetry) -- 1DS C/C++ SDK enables cross-platform telemetry collection from various Microsoft products. It enables data / telemetry upload to Collector++. 1DS (One Data Strategy), also known as One Observability, is a cross-org initiative with five teams across the company coming together to unify multiple telemetry efforts at Microsoft. Collector++ is the externally-facing destination end-point where telemetry data is uploaded to that subsequently routes the data to Microsoft internal data pipeline.
- **mujs** [📁](../../thirdparty/mujs) [🌐](https://github.com/GerHobbelt/mujs) -- a lightweight ES5 Javascript interpreter designed for embedding in other software to extend them with scripting capabilities.
- **multiverso** [📁](./multiverso) [🌐](https://github.com/GerHobbelt/Multiverso) -- a parameter server based framework for training machine learning models on big data with numbers of machines. It is currently a standard C++ library and provides a series of friendly programming interfaces. Now machine learning researchers and practitioners do not need to worry about the system routine issues such as distributed model storage and operation, inter-process and inter-thread communication, multi-threading management, and so on. Instead, they are able to focus on the core machine learning logics: data, model, and training.
- **MuPDF itself**  [📁](../../) [🌐](https://github.com/GerHobbelt/mupdf) -- this MuPDF fork is geared towards use with [Qiqqa (document and citation manager)](https://github.com/jimmejardine/qiqqa-open-source/). It is based on [the original MuPDF work done by Artifex](https://artifex.com/products/mupdf/), _closely tracks the developments overthere_ and augments the codebase with other C/C++ based tools, which are useful in and around the Qiqqa document processes, such as
  
  * text extraction
  * metadata extraction (including annotations)
  * OCR (_text recognition_ as an required extension of _text extraction_ when you have image-based PDFs, which happens quite often in the wild)
  * Qiqqa database support (SQLite I/O; we do include the generic SQLite tools as well to "open up" the Qiqqa _core components_ for advanced usage and users who wish to perform custom actions on the collected and managed data)

- **mxnet** [📁](./mxnet) [🌐](https://github.com/GerHobbelt/mxnet) -- Apache MXNet is a deep learning framework designed for both *efficiency* and *flexibility*. It allows you to ***mix*** [symbolic and imperative programming](https://mxnet.apache.org/api/architecture/program_model) to ***maximize*** efficiency and productivity.
- **mydumper** [📁](./mydumper) [🌐](https://github.com/GerHobbelt/mydumper) -- a MySQL Logical Backup Tool. It has 2 tools:
  
  * `mydumper` which is responsible to export a consistent backup of MySQL databases
  * `myloader` reads the backup from mydumper, connects the to destination database and imports the backup.

- **mysql-connector-cpp** [📁](./mysql-connector-cpp) [🌐](https://github.com/GerHobbelt/mysql-connector-cpp) -- MySQL Connector/C++ is a release of MySQL Connector/C++, [the C++ interface](https://dev.mysql.com/doc/dev/connector-cpp/8.0/) for communicating with MySQL servers.
- **n2-kNN** [📁](./n2-kNN) [🌐](https://github.com/GerHobbelt/n2) -- N2: Lightweight approximate **N**\ earest **N**\ eighbor algorithm library. N2 stands for two N's, which comes from \'Approximate ``N``\ earest ``N``\ eighbor Algorithm\'. Before N2, there has been other great approximate nearest neighbor libraries such as `Annoy` and `NMSLIB`. However, each of them had different strengths and weaknesses regarding usability, performance, etc. N2 has been developed aiming to bring the strengths of existing aKNN libraries and supplement their weaknesses.
- **nameof** [📁](./nameof) [🌐](https://github.com/GerHobbelt/nameof) -- header-only C++17 library providing nameof macros and functions to simply obtain the name of a variable, type, function, macro, and enum.
- **nanodbc** [📁](./nanodbc) [🌐](https://github.com/GerHobbelt/nanodbc) -- a small C++ wrapper for the native C ODBC API.
- **nanoflann** [📁](./nanoflann) [🌐](https://github.com/GerHobbelt/nanoflann) -- a C++11 header-only library for building KD-Trees of datasets with different topologies: R^2, R^3 (point clouds), SO(2) and SO(3) (2D and 3D rotation groups). No support for approximate NN is provided. This library is a fork of the `flann` library by Marius Muja and David G. Lowe, and born as a child project of `MRPT`.
- **NanoLog** [📁](./NanoLog) [🌐](https://github.com/GerHobbelt/NanoLog) -- an extremely performant nanosecond scale logging system for C++ that exposes a simple printf-like API and achieves over 80 million logs/second at a median latency of just over 7 nanoseconds.
- **nanomsg-nng** [📁](./nanomsg-nng) [🌐](https://github.com/GerHobbelt/nng) -- a rewrite of the Scalability Protocols library known as https://github.com/nanomsg/nanomsg[libnanomsg], which adds significant new capabilities, while retaining compatibility with the original. NNG is a lightweight, broker-less library, offering a simple API to solve common recurring messaging problems, such as publish/subscribe, RPC-style request/reply, or service discovery.
- **nano-signal-slot** [📁](./nano-signal-slot) [🌐](https://github.com/GerHobbelt/nano-signal-slot) -- pure C++17 Signals and Slots (observer pattern)
- **nanosvg** [📁](./nanosvg) [🌐](https://github.com/GerHobbelt/nanosvg) -- a simple stupid single-header-file SVG parser. The output of the parser is a list of cubic bezier shapes. Suitable for anything from rendering scalable icons in your editor application to prototyping a game. NanoSVG supports a wide range of SVG features.
- **nativefiledialog-extended** [📁](./nativefiledialog-extended) [🌐](https://github.com/GerHobbelt/nativefiledialog-extended) -- a small C library with that portably invokes native file open, folder select and file save dialogs.  Write dialog code once and have it pop up native dialogs on all supported platforms.  Avoid linking large dependencies like wxWidgets and Qt.
- **ncnn** [📁](./ncnn) [🌐](https://github.com/GerHobbelt/ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
- **netdata** [📁](./netdata) [🌐](https://github.com/GerHobbelt/netdata) -- <a href="https://www.netdata.cloud">Netdata</a> collects metrics per second and presents them in beautiful low-latency dashboards. It is designed to run on all of your physical and virtual servers, cloud deployments, Kubernetes clusters, and edge/IoT devices, to monitor your systems, containers, and applications. It scales nicely from just a single server to thousands of servers, even in complex multi/mixed/hybrid cloud environments, and given enough disk space it can keep your metrics for years.
- **netpbm** [📁](./netpbm) [🌐](https://github.com/GerHobbelt/netpbm-mirror) -- a toolkit for manipulation of graphic images, including conversion of images between a variety of different formats.  There are over 300 separate tools in the package including converters for about 100 graphics formats.  Examples of the sort of image manipulation we're talking about are: Shrinking an image by 10%; Cutting the top half off of an image; Making a mirror image; Creating a sequence of images that fade from one image to another, etc.
- **neutralinoJS** [📁](./neutralinoJS) [🌐](https://github.com/GerHobbelt/neutralinojs) -- a lightweight and portable desktop application development framework. It lets you develop lightweight cross-platform desktop applications using JavaScript, HTML and CSS. Neutralinojs offers a lightweight SDK which is an alternative for Electron and NW.js. Neutralinojs doesn't bundle Chromium and uses the existing web browser library in the operating system. Neutralinojs implements a WebSocket connection for native operations and embeds a static web server to serve the web content. Also, it offers a built-in [JavaScript client library](https://github.com/neutralinojs/neutralino.js) for developers.
- **neutralinoJS-CLI** [📁](./neutralinoJS-CLI) [🌐](https://github.com/GerHobbelt/neutralinojs-cli) -- The official CLI of Neutralinojs.
- **newlisp** [📁](./newlisp) [🌐](https://github.com/GerHobbelt/newlisp) -- newLISP is a LISP-like scripting language for doing things you typically do with scripting languages: programming for the internet, system administration, text processing, gluing other programs together, etc. newLISP is a scripting LISP for people who are fascinated by LISP's beauty and power of expression, but who need it stripped down to easy-to-learn essentials. newLISP is LISP reborn as a scripting language: pragmatic and casual, simple to learn without requiring you to know advanced computer science concepts. Like any good scripting language, newLISP is quick to get into and gets the job done without fuss. newLISP has a very fast startup time, is small on resources like disk space and memory and has a deep, practical API with functions for networking, statistics, machine learning, regular expressions, multiprocessing and distributed computing built right into it, not added as a second thought in external modules.
- **nghttp3** [📁](./nghttp3) [🌐](https://github.com/GerHobbelt/nghttp3) -- an implementation of `RFC 9114 <https://datatracker.ietf.org/doc/html/rfc9114>`_ HTTP/3 mapping over QUIC and `RFC 9204 <https://datatracker.ietf.org/doc/html/rfc9204>`_ QPACK in C.
- **ngrams-weighted** [📁](./ngrams-weighted) [🌐](https://github.com/GerHobbelt/ngweight) -- implements the method to compute N-gram IDF weights for all valid word N-grams in the given corpus (document set).
- **ngtcp2** [📁](./ngtcp2) [🌐](https://github.com/GerHobbelt/ngtcp2) -- ngtcp2 project is an effort to implement `RFC9000 <https://datatracker.ietf.org/doc/html/rfc9000>`_ QUIC protocol.
- **NiuTrans.NMT** [📁](./NiuTrans.NMT) [🌐](https://github.com/GerHobbelt/NiuTrans.NMT) -- a lightweight and efficient Transformer-based neural machine translation system. Its main features are:
  
  - Few dependencies. It is implemented with pure C++, and all dependencies are optional.
  - Flexible running modes. The system can run with various systems and devices (Linux vs. Windows, CPUs vs. GPUs, and FP32 vs. FP16, etc.).
  - Framework agnostic. It supports various models trained with other tools, e.g., fairseq models.
  - High efficiency. It is heavily optimized for fast decoding, see [our WMT paper](https://arxiv.org/pdf/2109.08003.pdf) for more details.

- **nlopt** [📁](./nlopt) [🌐](https://github.com/GerHobbelt/nlopt) -- a library for nonlinear local and global optimization, for functions with and without gradient information.  It is designed as a simple, unified interface and packaging of several free/open-source nonlinear optimization libraries.
- **nmslib** [📁](./nmslib) [🌐](https://github.com/GerHobbelt/nmslib) -- Non-Metric Space Library (NMSLIB) is an efficient cross-platform similarity search library and a toolkit for evaluation of similarity search methods. The core-library does not have any third-party dependencies. It has been gaining popularity recently. In particular, it has become a part of Amazon Elasticsearch Service. The goal of the project is to create an effective and comprehensive toolkit for searching in generic and non-metric spaces. Even though the library contains a variety of metric-space access methods, our main focus is on generic and approximate search methods, in particular, on methods for non-metric spaces. NMSLIB is possibly the first library with a principled support for non-metric space searching.
- **notcurses** [📁](./notcurses) [🌐](https://github.com/GerHobbelt/notcurses) -- a library facilitating complex TUIs on modern terminal emulators, supporting vivid colors, multimedia, threads, and Unicode to the maximum degree possible. Things can be done with Notcurses that simply can't be done with NCURSES. It is furthermore fast as shit. What it is not: a source-compatible X/Open Curses implementation, nor a replacement for NCURSES on existing systems.
- **npoi** [📁](./npoi) [🌐](https://github.com/GerHobbelt/npoi) -- a .NET library that can read/write Office formats without Microsoft Office installed. No COM+, no interop. With NPOI, you can read/write Office 2003/2007 files very easily.
- **nsis** [📁](./nsis) [🌐](https://github.com/GerHobbelt/nsis) -- **Unofficial** "Nullsoft Scriptable Install System" (NSIS) builds
- **NSISDotNetChecker** [📁](./NSISDotNetChecker) [🌐](https://github.com/GerHobbelt/NsisDotNetChecker) -- .NET Framework Checker NSIS plugin, used to detect if the required .NET Framework is installed and if it is not - plugin will download and install the required package. The plugin's C++ source code is based on the [work of Aaron Stebner](http://blogs.msdn.com/b/astebner/archive/2009/06/16/9763379.aspx).
- **NSISFileCheck** [📁](./NSISFileCheck) [🌐](https://github.com/GerHobbelt/nsisfilecheck) -- NSIS FileCheck is a [NSIS (Nullsoft Scriptable Install System)](https://en.wikipedia.org/wiki/Nullsoft_Scriptable_Install_System) plugin that enables:
  
  - Calculating a file's hash (SHA1, SHA2)
  - Obtaining a file's string version info
  - Verifying a file's Authenticode code signature (including details)

- **NSISMultiUser** [📁](./NSISMultiUser) [🌐](https://github.com/GerHobbelt/NsisMultiUser) -- NSIS Multi User Plugin allows "per-user" (no admin required) and "per-machine" (asks elevation *only when necessary*) installations. This plugin was inspired by [MultiUser.nsh (by Joost Verburg)](http://nsis.sourceforge.net/Docs/MultiUser/Readme.html), but supports a lot of new features and is easier to use.
- **nsis-nscurl** [📁](./nsis-nscurl) [🌐](https://github.com/GerHobbelt/nsis-nscurl) -- NScurl is a NSIS (Nullsoft Scriptable Install System) plugin with advanced HTTP/HTTPS capabilities. It's implemented on top of [libcurl](https://curl.haxx.se/libcurl/) with [OpenSSL](https://www.openssl.org/) as SSL backend.
- **NSIS-OBSInstallerUtils** [📁](./NSIS-OBSInstallerUtils) [🌐](https://github.com/GerHobbelt/OBSInstallerUtils) -- designed to be used with NSIS (Unicode version). It provides the following features:
  
  ```
  OBSInstallerUtils::IsProcessRunning
  OBSInstallerUtils::IsDLLLoaded
  OBSInstallerUtils::AddInUseFileCheck
  OBSInstallerUtils::ResetInUseFileChecks
  OBSInstallerUtils::GetAppNameForInUseFiles
  OBSInstallerUtils::KillProcess
  OBSInstallerUtils::AddAllApplicationPackages
  ```

- **nsis-stdutils** [📁](./nsis-stdutils) [🌐](https://github.com/GerHobbelt/stdutils) -- StdUtils plug-in for NSIS
- **nsync** [📁](./nsync) [🌐](https://github.com/GerHobbelt/nsync) -- a C library that exports various synchronization primitives. `nsync` may be desirable in place of `pthread` primitives in some cases:  (1) nsync locks are reader-writer locks (but are as efficient as mutexes).  (2) nsync locks and condition variables occupy only two words each.  (3) nsync works on Unix-like systems and Windows.  It should be portable to other platforms straightforwardly.  (4) nsync provides conditional critical sections.  These fill the same role as condition variables, but are usually easier to use, and in most common cases are comparable in speed.  They can be easier to use in two ways:  (A) it's not necessary to surround the "wait" operation in a while loop; instead the condition is passed to the call as a function and arbitrary pointer argument.  (B) it's not necessary to wake or signal explicitly when the condition(s) become true; they are checked automatically. The primary downsides are:  (A) they are not available in most other common synchronization APIs, and so they may be unfamiliar (even though they date back to the 1960s), and (B) if threads routinely wait on many distinct, false conditions associated with the same lock, they may be slower than condition variables. In this case, clients can use condition variables in the normal way; conditional critical sections and condition variables can be used with the same lock.  (5) nsync waits can be cancelled via an object passed to the wait calls, unlike the pthread model in which threads are cancelled.  This difference can be useful if the computation needs multiple threads, or if cancellation affects only sub-operations within a larger operation by the thread.
- **numero** [📁](./numero) [🌐](https://github.com/GerHobbelt/numero) -- a library which parses/extracts a decimal number, either integer or floating-point, either in scientific notation or not, from the given input string. It uses the thousands and decimal separator symbols given in the conversion options. It also provides methods for the inverse operation, i.e. converting a value to a (English) human-readable text, e.g. "one thousand and twenty four" for `1024`.
- **nuspell** [📁](./nuspell) [🌐](https://github.com/GerHobbelt/nuspell) -- a fast and safe spelling checker software program. It is designed for languages with rich morphology and complex word compounding. Nuspell is written in modern C++ and it supports Hunspell dictionaries.
- **ocreval** [📁](./ocreval) [🌐](https://github.com/GerHobbelt/ocreval) -- `ocreval` contains 17 tools for measuring the performance of and experimenting with OCR output. `ocreval` is a modern port of the [ISRI Analytic Tools for OCR Evaluation](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.216.9427&rep=rep1&type=pdf), with UTF-8 support and other improvements.
- **OfficeIMO** [📁](./OfficeIMO) [🌐](https://github.com/GerHobbelt/OfficeIMO) -- fast and easy to use cross-platform .NET library that creates or modifies Microsoft Word (.docx) files without installing any software. Underneath it uses OpenXML SDK but heavily simplifies it.
- **ogdf** [📁](./ogdf) [🌐](https://github.com/GerHobbelt/ogdf) -- OGDF stands both for **O**pen **G**raph **D**rawing **F**ramework (the original name) and **O**pen **G**raph algorithms and **D**ata structures **F**ramework. OGDF is a self-contained C++ library for graph algorithms, in particular for (but not restricted to) automatic graph drawing. It offers sophisticated algorithms and data structures to use within your own applications or scientific projects.
- **oidn-OpenImageDenoise** [📁](./oidn-OpenImageDenoise) [🌐](https://github.com/GerHobbelt/oidn) -- Intel® Open Image Denoise is an open source library of high-performance, high-quality denoising filters for images rendered with ray tracing.
- **olena** [📁](./olena) [🌐](https://github.com/GerHobbelt/olena) -- a platform dedicated to image processing.  At the moment it is mainly composed of a C++ library: Milena.  This library features many tools to easily perform image processing tasks.  Its main characteristic is its genericity: it allows to write an algorithm once and run it over many kinds of images (gray scale, color, 1D, 2D, 3D, ...).
- **omaha** [📁](./omaha) [🌐](https://github.com/GerHobbelt/omaha) -- Omaha is the open-source version of Google Update, a program to install requested software and keep it up to date.  The Google-branded version of Omaha is used to support software patching (both background updating, and on-demand update checks) for Google Chrome, Earth, and a variety of other Google products on Windows 7, 8, and 10.
- **oneTBB** [📁](./oneTBB) [🌐](https://github.com/GerHobbelt/oneTBB) -- Intel's Thread Building Blocks library: used with OpenImageIO, ...
- **online-hnsw** [📁](./online-hnsw) [🌐](https://github.com/GerHobbelt/online-hnsw) -- Online HNSW: an implementation of the HNSW index for approximate nearest neighbors search for C++14, that supports incremental insertion and removal of elements.
- **onnxruntime** [📁](./onnxruntime) [🌐](https://github.com/GerHobbelt/onnxruntime) -- a cross-platform inference and training machine-learning accelerator. **ONNX Runtime inference** can enable faster customer experiences and lower costs, supporting models from deep learning frameworks such as PyTorch and TensorFlow/Keras as well as classical machine learning libraries such as scikit-learn, LightGBM, XGBoost, etc. ONNX Runtime is compatible with different hardware, drivers, and operating systems, and provides optimal performance by leveraging hardware accelerators where applicable alongside graph optimizations and transforms. [Learn more &rarr;](https://www.onnxruntime.ai/docs/#onnx-runtime-for-inferencing)
- **OpenBLAS** [📁](./OpenBLAS) [🌐](https://github.com/GerHobbelt/OpenBLAS) -- an optimized BLAS (Basic Linear Algebra Subprograms) library based on GotoBLAS2 1.13 BSD version.
- **OpenCL-CTS** [📁](./OpenCL-CTS) [🌐](https://github.com/GerHobbelt/OpenCL-CTS) -- the OpenCL Conformance Test Suite (CTS) for all versions of the Khronos [OpenCL](https://www.khronos.org/opencl/) standard.
- **OpenCL-Headers** [📁](./OpenCL-Headers) [🌐](https://github.com/GerHobbelt/OpenCL-Headers) -- C language headers for the OpenCL API.
- **OpenCL-SDK** [📁](./OpenCL-SDK) [🌐](https://github.com/GerHobbelt/OpenCL-SDK) -- the Khronos OpenCL SDK. It brings together all the components needed to develop OpenCL applications.
- **OpenColorIO** [📁](./OpenColorIO) [🌐](https://github.com/GerHobbelt/OpenColorIO) -- OpenColorIO (OCIO) is a complete color management solution geared towards motion picture production with an emphasis on visual effects and computer animation. OCIO provides a straightforward and consistent user experience across all supporting applications while allowing for sophisticated back-end configuration options suitable for high-end production usage. OCIO is compatible with the Academy Color Encoding Specification (ACES) and is LUT-format agnostic, supporting many popular formats.
- **opencv** [📁](./opencv) [🌐](https://github.com/GerHobbelt/opencv) -- OpenCV: Open Source Computer Vision Library
- **opencv_contrib** [📁](./opencv_contrib) [🌐](https://github.com/GerHobbelt/opencv_contrib) -- OpenCV's extra modules. This is where you'll find new, bleeding edge OpenCV module development.
- **opencv_extra** [📁](./opencv_extra) [🌐](https://github.com/GerHobbelt/opencv_extra) -- extra data for OpenCV: Open Source Computer Vision Library
- **OpenEXR** [📁](./OpenEXR) [🌐](https://github.com/GerHobbelt/openexr) -- a high dynamic-range (HDR) image file format developed by Industrial Light & Magic (ILM) for use in computer imaging applications. OpenEXR is a lossless format for multi-layered images. Professional use. (I've used it before; nice file format.)
- **OpenFST** [📁](./OpenFST) [🌐](https://github.com/GerHobbelt/openfst) -- a library for constructing, combining, optimizing, and searching weighted finite-state transducers (FSTs). Weighted finite-state transducers are automata where each transition has an input label, an output label, and a weight. The more familiar finite-state acceptor is represented as a transducer with each transition's input and output label equal. Finite-state acceptors are used to represent sets of strings (specifically, regular or rational sets); finite-state transducers are used to represent binary relations between pairs of strings (specifically, rational transductions). The weights can be used to represent the cost of taking a particular transition. FSTs have key applications in speech recognition and synthesis, machine translation, optical character recognition, pattern matching, string processing, machine learning, information extraction and retrieval among others. Often a weighted transducer is used to represent a probabilistic model (e.g., an n-gram model, pronunciation model). FSTs can be optimized by determinization and minimization, models can be applied to hypothesis sets (also represented as automata) or cascaded by finite-state composition, and the best results can be selected by shortest-path algorithms.
- **OpenFST-utils** [📁](./OpenFST-utils) [🌐](https://github.com/GerHobbelt/openfst-utils) -- a set of useful programs for manipulating Finite State Transducer with the OpenFst library.
- **OpenImageIO** [📁](./oiio) [🌐](https://github.com/GerHobbelt/oiio) -- Reading, writing, and processing images in a wide variety of file formats, using a format-agnostic API, aimed at VFX applications.
  
  Also includes:
  
  - an ImageCache class that transparently manages a cache so that it can access truly vast amounts of image data (tens of thousands of image files totaling multiple TB) very efficiently using only a tiny amount (tens of megabytes at most) of runtime memory.
  - ImageBuf and ImageBufAlgo functions, which constitute a simple class for storing and manipulating whole images in memory, plus a collection of the most useful computations you might want to do involving those images, including many image processing operations.
  
  The primary target audience for OIIO is VFX studios and developers of tools such as renderers, compositors, viewers, and other image-related software you'd find in a production pipeline.

- **openjpeg** [📁](../../thirdparty/openjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-openjpeg) -- OPENJPEG Library and Applications -- OpenJPEG is an open-source JPEG 2000 codec written in C language. It has been developed in order to promote the use of [JPEG 2000](http://www.jpeg.org/jpeg2000), a still-image compression standard from the Joint Photographic Experts Group ([JPEG](http://www.jpeg.org)).  Since April 2015, it is officially recognized by ISO/IEC and ITU-T as a [JPEG 2000 Reference Software](http://www.itu.int/rec/T-REC-T.804-201504-I!Amd2).
- **openlibm** [📁](./openlibm) [🌐](https://github.com/GerHobbelt/openlibm) -- [OpenLibm](https://openlibm.org/) is an effort to have a high quality, portable, standalone C mathematical library ([`libm`](http://en.wikipedia.org/wiki/libm)). The project was born out of a need to have a good `libm` for the [Julia programming language](http://www.julialang.org) that worked consistently across compilers and operating systems, and in 32-bit and 64-bit environments.
- **openpbs** [📁](./openpbs) [🌐](https://github.com/GerHobbelt/openpbs) -- in May 2020, OpenPBS became the new name for the PBS Professional Open Source Project. OpenPBS® software optimizes job scheduling and workload management in high-performance computing (HPC) environments – clusters, clouds, and supercomputers – improving system efficiency and people’s productivity.  Built by HPC people for HPC people, OpenPBS is fast, scalable, secure, and resilient, and supports all modern infrastructure, middleware, and applications.
- **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- OpenSSL is a robust, commercial-grade, full-featured Open Source Toolkit for the Transport Layer Security (TLS) protocol formerly known as the Secure Sockets Layer (SSL) protocol. The protocol implementation is based on a full-strength general purpose cryptographic library, which can also be used stand-alone.
- **opentelemetry-cpp** [📁](./opentelemetry-cpp) [🌐](https://github.com/GerHobbelt/opentelemetry-cpp) -- The OpenTelemetry C++ Client
- **opentelemetry-cpp-contrib** [📁](./opentelemetry-cpp-contrib) [🌐](https://github.com/GerHobbelt/opentelemetry-cpp-contrib) -- OpenTelemetry C++ Contrib repository which contains set of components extending functionality of the OpenTelemetry SDK. Instrumentation libraries, exporters, and other components can find their home here.
- **openvino** [📁](./openvino) [🌐](https://github.com/GerHobbelt/openvino) -- OpenVINO™ is an open-source toolkit for optimizing and deploying AI inference, includind several components: namely [Model Optimizer], [OpenVINO™ Runtime], [Post-Training Optimization Tool], as well as CPU, GPU, GNA, multi device and heterogeneous plugins to accelerate deep learning inference on Intel® CPUs and Intel® Processor Graphics. It supports pre-trained models from [Open Model Zoo], along with 100+ open source and public models in popular formats such as TensorFlow, ONNX, PaddlePaddle, MXNet, Caffe, Kaldi.
- **Open-XML-SDK** [📁](./Open-XML-SDK) [🌐](https://github.com/GerHobbelt/Open-XML-SDK) -- the Microsoft Open XML SDK (.NET) provides tools for working with Office Word, Excel, and PowerPoint documents.
- **oppat** [📁](./oppat) [🌐](https://github.com/GerHobbelt/oppat) -- Open Power/Performance Analysis Tool (OPPAT) is a cross-OS, cross-architecture Power and Performance Analysis Tool. cross-OS: supports Windows ETW trace files and Linux/Android perf/trace-cmd trace files. cross-architecture: supports Intel and ARM chips hardware events (using perf and/or PCM).
- **optim** [📁](./optim) [🌐](https://github.com/GerHobbelt/optim) -- OptimLib is a lightweight C++ library of numerical optimization methods for nonlinear functions. Features a C++11/14/17 library of local and global optimization algorithms, as well as root finding techniques, derivative-free optimization using advanced, parallelized metaheuristic methods and constrained optimization routines to handle simple box constraints, as well as systems of nonlinear constraints.
- **OptimizationTemplateLibrary** [📁](./OptimizationTemplateLibrary) [🌐](https://github.com/GerHobbelt/O-T-L) -- Optimization Template Library (OTL)
- **osqp** [📁](./osqp) [🌐](https://github.com/GerHobbelt/osqp) -- the Operator Splitting Quadratic Program Solver.
- **osqp-cpp** [📁](./osqp-cpp) [🌐](https://github.com/GerHobbelt/osqp-cpp) -- a C++ wrapper for [OSQP](https://github.com/oxfordcontrol/osqp), an [ADMM](http://stanford.edu/~boyd/admm.html)-based solver for [quadratic programming](https://en.wikipedia.org/wiki/Quadratic_programming). Compared with OSQP's native C interface, the wrapper provides a more convenient input format using Eigen sparse matrices and handles the lifetime of the `OSQPWorkspace` struct. This package has similar functionality to [osqp-eigen](https://github.com/robotology/osqp-eigen).
- **osqp-eigen** [📁](./osqp-eigen) [🌐](https://github.com/GerHobbelt/osqp-eigen) -- a simple C++ wrapper for [osqp](http://osqp.readthedocs.io/en/latest/index.html) library.
- **osquery** [📁](./osquery) [🌐](https://github.com/GerHobbelt/osquery) -- a SQL powered operating system instrumentation, monitoring, and analytics framework. `osquery` exposes an operating system as a high-performance relational database.  This allows you to write SQL-based queries to explore operating system data.  With osquery, SQL tables represent abstract concepts such as running processes, loaded kernel modules, open network connections, browser plugins, hardware events or file hashes.
- **otl** [📁](./otl) [🌐](https://github.com/GerHobbelt/otl) -- Oracle Template Library (STL-like wrapper for SQL DB queries; supports many databases besides Oracle)
- **owl** [📁](./owl) [🌐](https://github.com/GerHobbelt/owl) -- Owl Lisp is a functional dialect of the Scheme programming language. It is mainly based on the applicative subset of the R7RS standard.
- **p7zip** [📁](./p7zip) [🌐](https://github.com/GerHobbelt/p7zip) -- p7zip-zstd = 7zip with extensions, including major modern codecs such as Brotli, Fast LZMA2, LZ4, LZ5, Lizard and Zstd.
- **PaddleClas** [📁](./PaddleClas) [🌐](https://github.com/GerHobbelt/PaddleClas) -- an image classification and image recognition toolset for industry and academia, helping users train better computer vision models and apply them in real scenarios, based on [PaddlePaddle](https://github.com/paddlepaddle/paddle).
- **PaddleDetection** [📁](./PaddleDetection) [🌐](https://github.com/GerHobbelt/PaddleDetection) -- a Highly Efficient Development Toolkit for Object Detection based on [PaddlePaddle](https://github.com/paddlepaddle/paddle).
- **Paddle-Lite** [📁](./Paddle-Lite) [🌐](https://github.com/GerHobbelt/Paddle-Lite) -- an updated version of Paddle-Mobile, an open-open source deep learning framework designed to make it easy to perform inference on mobile, embeded, and IoT devices. It is compatible with PaddlePaddle and pre-trained models from other sources.
- **PaddleNLP** [📁](./PaddleNLP) [🌐](https://github.com/GerHobbelt/PaddleNLP) -- a NLP library that is both **easy to use** and **powerful**. It aggregates high-quality pretrained models in the industry and provides a **plug-and-play** development experience, covering a model library for various NLP scenarios. With practical examples from industry practices, PaddleNLP can meet the needs of developers who require **flexible customization**.
- **PaddleOCR** [📁](./PaddleOCR) [🌐](https://github.com/GerHobbelt/PaddleOCR) -- PaddleOCR aims to create multilingual, awesome, leading, and practical OCR tools that help users train better models and apply them into practice.
- **PaddlePaddle** [📁](./PaddlePaddle) [🌐](https://github.com/GerHobbelt/Paddle) -- the first independent R&D deep learning platform in China. It is an industrial platform with advanced technologies and rich features that cover core deep learning frameworks, basic model libraries, end-to-end development kits, tools & components as well as service platforms. PaddlePaddle is originated from industrial practices with dedication and commitments to industrialization. It has been widely adopted by a wide range of sectors including manufacturing, agriculture, enterprise service, and so on while serving more than 4.7 million developers, 180,000 companies and generating 560,000 models. With such advantages, PaddlePaddle has helped an increasing number of partners commercialize AI.
- **pagerank** [📁](./pagerank) [🌐](https://github.com/GerHobbelt/pagerank) -- a [pagerank](http://www.ams.org/samplings/feature-column/fcarc-pagerank) implementation in C++ able to handle very big graphs.
- **palanteer** [📁](./palanteer) [🌐](https://github.com/GerHobbelt/palanteer) -- Visual Python and C++ nanosecond profiler, logger, tests enabler: a set of lean and efficient tools to improve the quality of software, for C++ and Python programs.
- **palmtree** [📁](./palmtree) [🌐](https://github.com/GerHobbelt/palmtree) -- concurrent lock free B+Tree
- **pango** [📁](./pango) [🌐](https://github.com/GerHobbelt/pango) -- a library for layout and rendering of text, with an emphasis on internationalization. Pango can be used anywhere that text layout is needed.
- **papis-zotero** [📁](./papis-zotero) [🌐](https://github.com/GerHobbelt/papis-zotero) -- Zotero compatiblity scripts for papis. Includes a script that decodes the zotero.sqlite sqlite file that zotero uses to manage documents and creates papis Documents out of it. This script will retrieve the documents from zotero (be it pdf documents or something else) and important information like tags.
- **parallel-hashmap** [📁](./parallel-hashmap) [🌐](https://github.com/GerHobbelt/parallel-hashmap) -- a set of hash map implementations, as well as a btree alternative to std::map and std::set
- **paramonte** [📁](./paramonte) [🌐](https://github.com/GerHobbelt/paramonte) -- ParaMonte (Plain Powerful Parallel Monte Carlo Library) is a serial/parallel library of Monte Carlo routines for sampling mathematical objective functions of arbitrary-dimensions, in particular, the posterior distributions of Bayesian models in data science, Machine Learning, and scientific inference, with the design goal of unifying the **automation** (of Monte Carlo simulations), **user-friendliness** (of the library), **accessibility** (from multiple programming environments), **high-performance** (at runtime), and **scalability** (across many parallel processors).
- **pcg-cpp-random** [📁](./pcg-cpp-random) [🌐](https://github.com/GerHobbelt/pcg-cpp) -- a C++ implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
- **pcg-c-random** [📁](./pcg-c-random) [🌐](https://github.com/GerHobbelt/pcg-c) -- a C implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
- **pcm** [📁](./pcm) [🌐](https://github.com/GerHobbelt/pcm) -- Intel&reg; Performance Counter Monitor (Intel&reg; PCM) is an application programming interface (API) and a set of tools based on the API to monitor performance and energy metrics of Intel&reg; Core&trade;, Xeon&reg;, Atom&trade; and Xeon Phi&trade; processors. PCM works on Linux, Windows, Mac OS X, FreeBSD, DragonFlyBSD and ChromeOS operating systems.
- **pcre** [📁](./pcre) [🌐](https://github.com/GerHobbelt/pcre) -- PCRE2 : Perl-Compatible Regular Expressions. The PCRE2 library is a set of C functions that implement regular expression pattern matching using the same syntax and semantics as Perl 5. PCRE2 has its own native API, as well as a set of wrapper functions that correspond to the POSIX regular expression API. It comes in three forms, for processing 8-bit, 16-bit, or 32-bit code units, in either literal or UTF encoding.
- **pdf2htmlEX** [📁](./pdf2htmlEX) [🌐](https://github.com/GerHobbelt/pdf2htmlEX) -- convert PDF to HTML without losing text or format.
- **pdfgrep** [📁](./pdfgrep) [🌐](https://github.com/GerHobbelt/pdfgrep) -- a tool to search text in PDF files. It works similarly to *grep*.
- **pdfium** [📁](./pdfium) [🌐](https://github.com/GerHobbelt/pdfium) -- the PDF library used by the Chromium project.
- **pdiff** [📁](./pdiff) [🌐](https://github.com/GerHobbelt/pdiff) -- perceptualdiff (pdiff): a program that compares two images using a perceptually based image metric.
- **pecos** [📁](./pecos) [🌐](https://github.com/GerHobbelt/pecos) -- PECOS (Predictions for Enormous and Correlated Output Spaces) is a versatile and modular machine learning (ML) framework for fast learning and inference on problems with large output spaces, such as extreme multi-label ranking (XMR) and large-scale retrieval. PECOS' design is intentionally agnostic to the specific nature of the inputs and outputs as it is envisioned to be a general-purpose framework for multiple distinct applications. Given an input, PECOS identifies a small set (10-100) of relevant outputs from amongst an extremely large (~100MM) candidate set and ranks these outputs in terms of relevance.
- **PEGTL** [📁](./PEGTL) [🌐](https://github.com/GerHobbelt/PEGTL) -- the Parsing Expression Grammar Template Library (PEGTL) is a zero-dependency C++ header-only parser combinator library for creating parsers according to a [Parsing Expression Grammar](http://en.wikipedia.org/wiki/Parsing_expression_grammar) (PEG).
- **pelikan** [📁](./pelikan) [🌐](https://github.com/GerHobbelt/pelikan) -- Pelikan is Twitter's unified cache backend.
- **percona-server** [📁](./percona-server) [🌐](https://github.com/GerHobbelt/percona-server) -- Percona Server for MySQL is a free, fully compatible, enhanced, and open source drop-in replacement for any MySQL database. It provides superior performance, scalability, and instrumentation.
- **pevents** [📁](./pevents) [🌐](https://github.com/GerHobbelt/pevents) -- Win32 events for *nix/POSIX platforms, built on top of `pthreads`. `pevents` provides most of the functionality of both manual- and auto-reset events on Windows, most-notably including simultaneous waits on multiple events (à la `WaitForMultipleObjects`). `pevents` also doubles as a thin, sane wrapper for `CreateEvent()` & co. on Windows, meaning you can use `pevents` directly in your cross-platform code without `#ifdef`s for Windows/pthreads. While POSIX condition variables (pthread_cond_t) and WIN32 events both provide the essential building blocks of the synchronization primitives required to write multithreaded code with signaling, the nature of the differences between the two have lent their way towards creating different synchronization and multithreaded-programming paradigms. The only features not included are only named events and support for security attributes. To the author's best knowledge, this is the only implementation of WIN32 events available for Linux and other posix platforms that provides support for simultaneously waiting on multiple events. Depending on your needs, we've been told that pevents may be used as a lightweight alternative to libuv/libev while still allowing your code to embrace asynchronous event handling with ease.
- **PGM-index** [📁](./PGM-index) [🌐](https://github.com/GerHobbelt/PGM-index) -- the Piecewise Geometric Model index (PGM-index) is a data structure that enables fast lookup, predecessor, range searches and updates in arrays of billions of items using orders of magnitude less space than traditional indexes while providing the same worst-case query time guarantees.
- **pg_similarity** [📁](./pg_similarity) [🌐](https://github.com/GerHobbelt/pg_similarity) -- **pg\_similarity** is an extension to support similarity queries on [PostgreSQL](http://www.postgresql.org/). The implementation is tightly integrated in the RDBMS in the sense that it defines operators so instead of the traditional operators (= and <>) you can use ~~~ and ~!~ (any of these operators represents a similarity function).
- **pHash** [📁](./pHash) [🌐](https://github.com/GerHobbelt/pHash) -- the open source perceptual hash library. Potential applications include copyright protection, similarity search for media files, or even digital forensics. For example, YouTube could maintain a database of hashes that have been submitted by the major movie producers of movies to which they hold the copyright. If a user then uploads the same video to YouTube, the hash will be almost identical, and it can be flagged as a possible copyright violation. The audio hash could be used to automatically tag MP3 files with proper ID3 information, while the text hash could be used for plagiarism detection.
- **phash-gpl** [📁](./phash-gpl) [🌐](https://github.com/GerHobbelt/phash-gpl) -- pHash&trade; Perceptual Hashing Library is a collection of perceptual hashing algorithms for image, audo, video and text media.
- **phf-hash** [📁](./phf-hash) [🌐](https://github.com/GerHobbelt/phf) -- a simple implementation of the CHD perfect hash algorithm. CHD can generate perfect hash functions for very large key sets -- on the order of millions of keys -- in a very short time.
- **photino.native** [📁](./photino.native) [🌐](https://github.com/GerHobbelt/photino.Native) -- a lightweight open-source framework for building native, cross-platform desktop applications with Web UI technology. Photino enables developers to use fast, natively compiled languages like C#, C++, Java and more. Photino uses the OSs built-in WebKit-based browser control for Windows, macOS and Linux. Photino is the lightest cross-platform framework.
- **PhotonLibOS** [📁](./PhotonLibOS) [🌐](https://github.com/GerHobbelt/PhotonLibOS) -- a high-efficiency LibOS framework, based on a set of carefully selected C++ libs. The role of LibOS is to connect user apps and the kernel. Photon's API is as consistent as possible with C++ std and glibc semantics. This flattens the learning curve for lib users and brings convenience when migrating legacy codebases. Photon's runtime is driven by a coroutine lib. Out tests show that it has the best I/O performance in the open source world by the year of 2022, even among different programing languages.
- **picoc** [📁](./picoc) [🌐](https://github.com/GerHobbelt/picoc) -- PicoC is a very small C interpreter for scripting. It was originally written as a script language for a UAV's on-board flight system. It's also very suitable for other robotic, embedded and non-embedded applications. The core C source code is around 3500 lines of code. It's not intended to be a complete implementation of ISO C but it has all the essentials.
- **picohttpparser** [📁](./picohttpparser) [🌐](https://github.com/GerHobbelt/picohttpparser) -- PicoHTTPParser is a tiny, primitive, fast HTTP request/response parser. Unlike most parsers, it is stateless and does not allocate memory by itself. All it does is accept pointer to buffer and the output structure, and setups the pointers in the latter to point at the necessary portions of the buffer.
- **pikchr** [📁](./pikchr) [🌐](https://github.com/GerHobbelt/pikchr) -- Pikchr (pronounced like "picture") is a [PIC][1]-like markup language for diagrams in technical documentation.  Pikchr is designed to be embedded in [fenced code blocks][2] of Markdown (or in similar mechanisms in other markup languages) to provide a convenient means of showing diagrams.
- **Pillow** [📁](./Pillow) [🌐](https://github.com/GerHobbelt/Pillow) -- the friendly PIL (Python Imaging Library) fork by [Jeffrey A. Clark (Alex) and contributors](https://github.com/python-pillow/Pillow/graphs/contributors). PIL is the Python Imaging Library by Fredrik Lundh and Contributors. This library provides extensive file format support, an efficient internal representation, and fairly powerful image processing capabilities.
- **pinyin** [📁](./pinyin) [🌐](https://github.com/GerHobbelt/pinyin) -- pīnyīn is a tool for converting Chinese characters to *pinyin*. It can be used for Chinese phonetic notation, sorting, and retrieval.
- **pipes** [📁](./pipes) [🌐](https://github.com/GerHobbelt/pipes) -- Pipes are small components for writing expressive code when working on collections. Pipes chain together into a pipeline that receives data from a source, operates on that data, and send the results to a destination. This is a header-only library, implemented in C++14.
- **pisa** [📁](./pisa) [🌐](https://github.com/GerHobbelt/pisa) -- a text search engine able to run on large-scale collections of documents. It allows researchers to experiment with state-of-the-art techniques, allowing an ideal environment for rapid development. PISA is a text search engine, though the "PISA Project" is a set of tools that help experiment with indexing and query processing. Given a text collection, PISA can build an inverted index over this corpus, allowing the corpus to be searched. The inverted index, put simply, is an efficient data structure that represents the document corpus by storing a list of documents for each unique term (see here). At query time, PISA stores its index in main memory for rapid retrieval.
- **pisa_formatter** [📁](./pisa_formatter) [🌐](https://github.com/GerHobbelt/pisa_formatter) -- converts list of documents to the [pisa-engine](https://github.com/pisa-engine/pisa) binary format: {.docs, .freqs, .sizes}. Its input should be a text file where each line is a document.  Each document starts with the document name (which should not have whitespaces) followed by a list of ascii terms separated by whitespaces which define the document. This also generates a binary .terms file which has the information to convert from term to index and is used by the query_transformer executable. This file stores all the unique terms from all the documents.
- **pixman** [📁](./pixman) [🌐](https://github.com/GerHobbelt/pixman) -- a library that provides low-level pixel manipulation features such as image compositing and trapezoid rasterization.
- **PlatformFolders** [📁](./PlatformFolders) [🌐](https://github.com/GerHobbelt/PlatformFolders) -- a C++ library to look for directories like `My Documents`, `~/.config`, `%APPDATA%`, etc. so that you do not need to write platform-specific code.
- **plf_nanotimer** [📁](./plf_nanotimer) [🌐](https://github.com/GerHobbelt/plf_nanotimer) -- high precision cross-platform performance timer
- **pmdk** [📁](./pmdk) [🌐](https://github.com/GerHobbelt/pmdk) -- the **Persistent Memory Development Kit (PMDK)** is a collection of libraries and tools for System Administrators and Application Developers to simplify managing and accessing persistent memory devices.
- **pmdk-tests** [📁](./pmdk-tests) [🌐](https://github.com/GerHobbelt/pmdk-tests) -- tests for [Persistent Memory Development Kit](https://github.com/pmem/pmdk)
- **pmemkv** [📁](./pmemkv) [🌐](https://github.com/GerHobbelt/pmemkv) -- `pmemkv` is a local/embedded key-value datastore optimized for persistent memory. Rather than being tied to a single language or backing implementation, `pmemkv` provides different options for language bindings and storage engines.
- **pmemkv-bench** [📁](./pmemkv-bench) [🌐](https://github.com/GerHobbelt/pmemkv-bench) -- benchmark for [libpmemkv](https://github.com/pmem/pmemkv/) and its underlying libraries, based on [leveldb's db_bench](https://github.com/google/leveldb). The `pmemkv_bench` utility provides some standard read, write & remove benchmarks. It's based on the `db_bench` utility included with LevelDB and RocksDB, although the list of supported parameters is slightly different.
- **pmt-png-tools** [📁](./pmt-png-tools) [🌐](https://github.com/GerHobbelt/pmt) -- pngcrush and other PNG and MNG tools
- **poco** [📁](./poco) [🌐](https://github.com/GerHobbelt/poco) -- POCO (Portable Components) C++ Libraries are a collection of C++ class libraries, conceptually similar to the Java Class Library or the .NET Framework, focused on solutions to frequently-encountered practical problems.
- **podofo** [📁](./podofo) [🌐](https://github.com/GerHobbelt/podofo) -- a library to work with the PDF file format and includes also a few tools. The name comes from the first two letters of PDF (<b>Po</b>rtable <b>Do</b>cument <b>Fo</b>rmat). The PoDoFo library is a free portable C++ library which includes classes to parse a PDF file and modify its contents into memory. The changes can be written back to disk easily. PoDoFo is designed to avoid loading large PDF objects into memory until they are required and can write large streams immediately to disk, so it is possible to manipulate quite large files with it.
- **poisson_blend** [📁](./poisson_blend) [🌐](https://github.com/GerHobbelt/poisson_blend) -- a simple, readable implementation of Poisson Blending, that demonstrates the concepts explained in [my article](https://erkaman.github.io/posts/poisson_blending.html), seamlessly blending a source image and a target image, at some specified pixel location.
- **polatory** [📁](./polatory) [🌐](https://github.com/GerHobbelt/polatory) -- a fast and memory-efficient framework for RBF (radial basis function) interpolation. Polatory can perform kriging prediction via RBF interpolation (dual kriging). Although different terminologies are used, both methods produce the same results.
- **poppler** [📁](./poppler) [🌐](https://github.com/GerHobbelt/poppler) -- Poppler is a library for rendering PDF files, and examining or modifying their structure.  Poppler originally came from the XPDF sources.
- **portable_concurrency-std-future** [📁](./portable_concurrency-std-future) [🌐](https://github.com/GerHobbelt/portable_concurrency) -- Portable implementation of future/promise API in C++. `std::future` done right.
- **portable-memory-mapping** [📁](./portable-memory-mapping) [🌐](https://github.com/GerHobbelt/portable-memory-mapping) -- portable Memory Mapping C++ Class (Windows/Linux)
- **portable-snippets** [📁](./portable-snippets) [🌐](https://github.com/GerHobbelt/portable-snippets) -- a collection of public domain (CC0) code snippets written in C for performing various common tasks which are typically OS, architecture, and/or compiler-dependent.  Basically, our goal is to move those annoying preprocessor conditionals from your code to ours.
- **preprocess-corpuses** [📁](./preprocess-corpuses) [🌐](https://github.com/GerHobbelt/preprocess) -- Pipelines for preprocessing corpora.
- **prio_queue** [📁](./prio_queue) [🌐](https://github.com/GerHobbelt/prio_queue) -- a cache friendly priority queue, done as a B-heap.
- **probminhash** [📁](./probminhash) [🌐](https://github.com/GerHobbelt/probminhash) -- a class of Locality-Sensitive Hash Algorithms for the (Probability) Jaccard Similarity
- **promise-cpp** [📁](./promise-cpp) [🌐](https://github.com/GerHobbelt/promise-cpp) -- advanced C++ promise/A+ library in Javascript style
- **promise-hpp** [📁](./promise-hpp) [🌐](https://github.com/GerHobbelt/promise.hpp) -- C++ asynchronous promises like a Promises/A+
- **protobuf** [📁](./protobuf) [🌐](https://github.com/GerHobbelt/protobuf) -- Protocol Buffers - Google's data interchange format that is a language-neutral, platform-neutral, extensible mechanism for serializing structured data.
  
  - **☹discouraged🤧**; reason: relatively slow run-time and (in my opinion) rather ugly & convoluted approach at build time. Has too much of a Java/CorporateProgramming smell, which has not lessened over the years, unfortunately.

- **proxygen** [📁](./proxygen) [🌐](https://github.com/GerHobbelt/proxygen) -- the core C++ HTTP abstractions used at Facebook. Internally, it is used as the basis for building many HTTP servers, proxies, and clients, focusing on the common HTTP abstractions and our simple HTTPServer framework. The framework supports HTTP/1.1, SPDY/3, SPDY/3.1, HTTP/2, and HTTP/3.
- **prvhash** [📁](./prvhash) [🌐](https://github.com/GerHobbelt/prvhash) -- PRVHASH is a hash function that generates a [uniform pseudo-random number sequence](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) derived from the message. PRVHASH is conceptually similar (in the sense of using a pseudo-random number sequence as a hash) to [`keccak`](https://en.wikipedia.org/wiki/SHA-3) and [`RadioGatun`](https://en.wikipedia.org/wiki/RadioGat%C3%BAn) schemes, but is a completely different implementation of such concept. PRVHASH is both a ["randomness extractor"](https://en.wikipedia.org/wiki/Randomness_extractor) and an "extendable-output function" (XOF).
- **psd_sdk** [📁](./psd_sdk) [🌐](https://github.com/GerHobbelt/psd_sdk) -- a C++ library that directly reads Photoshop PSD files. The library supports:
  
  * Groups
  * Nested layers
  * Smart Objects
  * User and vector masks
  * Transparency masks and additional alpha channels
  * 8-bit, 16-bit, and 32-bit data in grayscale and RGB color mode
  * All compression types known to Photoshop
  
  Additionally, limited export functionality is also supported.

- **pthreadpool** [📁](./pthreadpool) [🌐](https://github.com/GerHobbelt/pthreadpool) -- pthreadpool is a portable and efficient thread pool implementation. It provides similar functionality to `#pragma omp parallel for`, but with additional features.
- **pthread-win32** [📁](./pthread-win32) [🌐](https://github.com/GerHobbelt/pthread-win32) -- `pthread` for MS Windows
- **pybind11** [📁](./pybind11) [🌐](https://github.com/GerHobbelt/pybind11) -- a lightweight header-only library that exposes C++ types in Python and vice versa, mainly to create Python bindings of existing C++ code.
- **pyclustering** [📁](./pyclustering) [🌐](https://github.com/GerHobbelt/pyclustering) -- a Python, C++ data mining library (clustering algorithm, oscillatory networks, neural networks). The library provides Python and C++ implementations (C++ pyclustering library) of each algorithm or model.
- **pyglass** [📁](./pyglass) [🌐](https://github.com/GerHobbelt/pyglass) -- a library for fast inference of graph index for approximate similarity search.
  
  - It's high performant.
  - No third-party library dependencies, does not rely on OpenBLAS / MKL or any other computing framework.
  - Sophisticated memory management and data structure design, very low memory footprint.
  - Supports multiple graph algorithms, like [**HNSW**](https://github.com/nmslib/hnswlib) and [**NSG**](https://github.com/ZJULearning/nsg).
  - Supports multiple hardware platforms, like **X86** and **ARM**. Support for **GPU** is on the way

- **pylene** [📁](./pylene) [🌐](https://github.com/GerHobbelt/pylene) -- Pylene is a fork of [Olena/Milena](http://www.lrde.epita.fr/olena), an image processing library targeting genericity and efficiency. It provided mostly Mathematical Morphology building blocs for image processing pipelines.
- **pytorch** [📁](./pytorch) [🌐](https://github.com/GerHobbelt/pytorch) -- PyTorch library in C++
- **pytorch_cpp_demo** [📁](./pytorch_cpp_demo) [🌐](https://github.com/GerHobbelt/pytorch_cpp) -- Deep Learning sample programs of PyTorch written in C++.
- **QCBOR** [📁](./QCBOR) [🌐](https://github.com/GerHobbelt/QCBOR) -- a powerful, commercial-quality CBOR encoder/decoder that implements these RFCs:
  
  * [RFC7049](https://tools.ietf.org/html/rfc7049) The previous CBOR standard. Replaced by RFC 8949.
  * [RFC8742](https://tools.ietf.org/html/rfc8742) CBOR Sequences
  * [RFC8943](https://tools.ietf.org/html/rfc8943) CBOR Dates
  * [RFC8949](https://tools.ietf.org/html/rfc8949) The CBOR Standard. (Everything except sorting of encoded maps)

- **qlever** [📁](./qlever) [🌐](https://github.com/GerHobbelt/qlever) -- a SPARQL engine that can efficiently index and query very large knowledge graphs with up to 100 billion triples on a single standard PC or server. In particular, QLever is fast for queries that involve large intermediate or final results, which are notoriously hard for engines like Blazegraph or Virtuoso.
- **qoi** [📁](./qoi) [🌐](https://github.com/GerHobbelt/qoi) -- QOI: the “Quite OK Image Format” for fast, lossless image compression, single-file MIT licensed library for C/C++. Compared to stb_image and stb_image_write QOI offers 20x-50x faster encoding, 3x-4x faster decoding and 20% better compression. It's also stupidly simple and fits in about 300 lines of C.
- **qpdf** [📁](./qpdf) [🌐](https://github.com/GerHobbelt/qpdf) -- QPDF is a command-line tool and C++ library that performs content-preserving transformations on PDF files. It supports linearization, encryption, and numerous other features. It can also be used for splitting and merging files, creating PDF files, and inspecting files for study or analysis. QPDF does not render PDFs or perform text extraction, and it does not contain higher-level interfaces for working with page contents. It is a low-level tool for working with the structure of PDF files and can be a valuable tool for anyone who wants to do programmatic or command-line-based manipulation of PDF files.
- **qs_parse** [📁](./qs_parse) [🌐](https://github.com/GerHobbelt/qs_parse) -- a set of simple and easy functions for parsing URL query strings, such as those generated in an HTTP GET form submission.
- **quadsort** [📁](./quadsort) [🌐](https://github.com/GerHobbelt/quadsort) -- a high performance stable bottom-up adaptive branchless merge sort algorithm.
- **QuickJS** [📁](./QuickJS) [🌐](https://github.com/GerHobbelt/quickjs) -- a small and embeddable Javascript engine. It supports the <a href="https://tc39.github.io/ecma262/">ES2020</a> specification including modules, asynchronous generators, proxies and BigInt. It optionally supports mathematical extensions such as big decimal floating point numbers (BigDecimal), big binary floating point numbers (BigFloat) and operator overloading.
  
  - **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
  - **QuickJS-C++-Wrapper** [📁](./QuickJS-C++-Wrapper) [🌐](https://github.com/GerHobbelt/quickjscpp) -- quickjscpp is a header-only wrapper around the [quickjs](https://bellard.org/quickjs/) JavaScript engine, which allows easy integration into C++11 code. This wrapper also automatically tracks the lifetime of values and objects, is exception-safe, and automates clean-up.
  - **QuickJS-C++-Wrapper2** [📁](./QuickJS-C++-Wrapper2) [🌐](https://github.com/GerHobbelt/quickjspp) -- QuickJSPP is QuickJS wrapper for C++. It allows you to easily embed Javascript engine into your program.
  - **txiki** [📁](./txiki.js) [🌐](https://github.com/GerHobbelt/txiki.js) -- uses QuickJS as its kernel

- **QuickJS-C++-Wrapper** [📁](./QuickJS-C++-Wrapper) [🌐](https://github.com/GerHobbelt/quickjscpp) -- quickjscpp is a header-only wrapper around the [quickjs](https://bellard.org/quickjs/) JavaScript engine, which allows easy integration into C++11 code. This wrapper also automatically tracks the lifetime of values and objects, is exception-safe, and automates clean-up.
- **QuickJS-C++-Wrapper2** [📁](./QuickJS-C++-Wrapper2) [🌐](https://github.com/GerHobbelt/quickjspp) -- QuickJSPP is QuickJS wrapper for C++. It allows you to easily embed Javascript engine into your program.
- **quill-logging** [📁](./quill-logging) [🌐](https://github.com/GerHobbelt/quill) -- asynchronous cross-platform low latency logging library based on C++14/C++17.
- **radamsa** [📁](./radamsa) [🌐](https://github.com/GerHobbelt/radamsa) -- Radamsa is a test case generator for robustness testing, a.k.a. a fuzzer. It is typically used to test how well a program can withstand malformed and potentially malicious inputs. It works by reading sample files of valid data and generating interestingly different outputs from them. The main selling points of radamsa are that it has already found a slew of bugs in programs that actually matter, it is easily scriptable and easy to get up and running.
- **radon-tf** [📁](./radon-tf) [🌐](https://github.com/GerHobbelt/radon-tf) -- simple implementation of the radon transform. Faster when using more than one thread to execute it. No inverse function is provided. CPU implementation only.
- **randen** [📁](./randen) [🌐](https://github.com/GerHobbelt/randen) -- What if we could default to attack-resistant random generators without excessive CPU cost? We introduce 'Randen', a new generator with security guarantees; it outperforms MT19937, pcg64_c32, Philox, ISAAC and ChaCha8 in real-world benchmarks. This is made possible by AES hardware acceleration and a large Feistel permutation.
- **random** [📁](./random) [🌐](https://github.com/GerHobbelt/random) -- random for modern C++ with a convenient API.
- **random-forest** [📁](./random-forest) [🌐](https://github.com/GerHobbelt/random-forest) -- a Fast C++ Implementation of Random Forests as described in: Leo Breiman. Random Forests. Machine Learning 45(1):5-32, 2001.
- **RapidFuzz** [📁](./RapidFuzz) [🌐](https://github.com/GerHobbelt/RapidFuzz) -- rapid fuzzy string matching in Python and C++ using the Levenshtein Distance.
- **rapidJSON** [📁](./rapidJSON) [🌐](https://github.com/GerHobbelt/rapidjson) -- TenCent's fast JSON parser/generator for C++ with both SAX & DOM style APIs.
- **rapidxml** [📁](./rapidxml) [🌐](https://github.com/GerHobbelt/rapidxml) -- RapidXML is an ancient C++ library for parsing XML quickly and flexibly.
- **rapidyaml** [📁](./rapidyaml) [🌐](https://github.com/GerHobbelt/rapidyaml) -- *Rapid YAML*, or `ryml`, for short. ryml is a C++ library to parse and emit YAML, and do it fast, on everything from x64 to bare-metal chips without operating system. `ryml` parses both read-only and in-situ source buffers; the resulting data nodes hold only views to sub-ranges of the source buffer. No string copies or duplications are done, and no virtual functions are used. The data tree is a flat index-based structure stored in a single array. Serialization happens only at your direct request, after parsing / before emitting. Internally, the data tree representation stores only string views and has no knowledge of types, but of course, every node can have a YAML type tag. `ryml` makes it easy and fast to read and modify the data tree.
- **rclone** [📁](./rclone) [🌐](https://github.com/GerHobbelt/rclone) -- Rclone *("rsync for cloud storage")* is a command-line program to sync files and directories to and from different cloud storage providers. See [the full list of all storage providers and their features](https://rclone.org/overview/).
- **re2** [📁](./re2) [🌐](https://github.com/GerHobbelt/re2) -- RE2, a regular expression library.
- **reckless** [📁](./reckless) [🌐](https://github.com/GerHobbelt/reckless) -- Reckless is an extremely low-latency, high-throughput logging library.
- **recycle** [📁](./recycle) [🌐](https://github.com/GerHobbelt/recycle) -- an implementation of a simple resource pool for recycling resources in C++.
- **refl-cpp** [📁](./refl-cpp) [🌐](https://github.com/GerHobbelt/refl-cpp) -- static reflection for C++17 (compile-time enumeration, attributes, proxies, overloads, template functions, metaprogramming).
- **RE-flex** [📁](./RE-flex) [🌐](https://github.com/GerHobbelt/RE-flex) -- the regex-centric, fast lexical analyzer generator for C++ with full Unicode support. Faster than Flex. Accepts Flex specifications. Generates reusable source code that is easy to understand. Introduces indent/dedent anchors, lazy quantifiers, functions for lex/syntax error reporting and more. Seamlessly integrates with Bison and other parsers.
  
  The RE/flex matcher tracks line numbers, column numbers, and indentations, whereas Flex does not (option `noyylineno`) and neither do the other regex matchers (except PCRE2 and Boost.Regex when used with RE/flex).
  Tracking this information incurs some overhead. RE/flex also automatically decodes UTF-8/16/32 input and accepts `std::istream`, strings, and wide strings as input.
  
  RE/flex runs equally fast or slightly faster than the best times of Flex.

- **replxx** [📁](./replxx) [🌐](https://github.com/GerHobbelt/replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
- **reproc** [📁](./reproc) [🌐](https://github.com/GerHobbelt/reproc) -- reproc (Redirected Process) is a cross-platform C/C++ library that simplifies starting, stopping and communicating with external programs. The main use case is executing command line applications directly from C or C++ code and retrieving their output.
- **restc-cpp** [📁](./restc-cpp) [🌐](https://github.com/GerHobbelt/restc-cpp) -- a modern C++ REST Client library. The magic that takes the pain out of accessing JSON API's from C++. The design goal of this project is to make external REST API's simple and safe to use in C++ projects, but still fast and memory efficient.
- **result-cpp** [📁](./result-cpp) [🌐](https://github.com/GerHobbelt/result) -- `Result<T, E>` is a modern, simple, and light-weight error-handling alternative to C++ exceptions with a rich feature-set.
- **resumable-assert** [📁](./resumable-assert) [🌐](https://github.com/GerHobbelt/resumable-assert) -- `assert` replacement to continue execution in debugger. In any large app, it sometimes happens that some asserts are failing in code you don't currently care about, and blocking the entire team from being able to run the app until the issue is fixed is not the best workflow. So we usually end up moving the execution marker past the assert line in IDE or debugger, or even comment the assert out, recompile and relaunch. With Resumable Assert, you can simply continue execution when an assertion fails in debugger, or even disable asserts that you are not interested in, so that those never bother you again.
- **rgf** [📁](./rgf) [🌐](https://github.com/GerHobbelt/rgf) -- Regularized Greedy Forest (RGF) is a tree ensemble machine learning method described in [this paper](https://arxiv.org/abs/1109.0887). RGF can deliver better results than gradient boosted decision trees (GBDT) on a number of datasets and it has been used to win a few Kaggle competitions. Unlike the traditional boosted decision tree approach, RGF works directly with the underlying forest structure. RGF integrates two ideas: one is to include tree-structured regularization into the learning formulation; and the other is to employ the fully-corrective regularized greedy algorithm.
- **RNGSobol** [📁](./RNGSobol) [🌐](https://github.com/GerHobbelt/RNGSobol) -- Sobol quadi-random numbers generator (C++). Note that unlike pseudo-random numbers, quasi-random numbers care about dimensionality of points.
- **robin-hood-hashing** [📁](./robin-hood-hashing) [🌐](https://github.com/GerHobbelt/robin-hood-hashing) -- robin_hood unordered map & set.
- **robin-map** [📁](./robin-map) [🌐](https://github.com/GerHobbelt/robin-map) -- a C++ implementation of a fast hash map and hash set using open-addressing and linear robin hood hashing with backward shift deletion to resolve collisions.
- **rotate** [📁](./rotate) [🌐](https://github.com/GerHobbelt/rotate) -- provides several classic, commonly used and novel rotation algorithms (aka block swaps), which were documented since around 1981 up to 2021: three novel rotation algorithms were introduced in 2021, notably the [trinity rotation](https://github.com/scandum/rotate#Trinity-Rotation).
- **rotate_detection** [📁](./rotate_detection) [🌐](https://github.com/GerHobbelt/rotate_detection) -- angle rotation detection on scanned documents. Designed for embedding in systems using tesseract OCR. The detection algorithm based on [Rényi entropy](https://en.wikipedia.org/wiki/R%C3%A9nyi_entropy).
- **RRD** [📁](./RRD) [🌐](https://github.com/GerHobbelt/RRD) -- RRD: Rotation-Sensitive Regression for Oriented Scene Text Detection
- **RRPN** [📁](./RRPN) [🌐](https://github.com/GerHobbelt/RRPN) -- (Arbitrary-Oriented Scene Text Detection via Rotation Proposals)[https://arxiv.org/abs/1703.01086]
- **rsync** [📁](./rsync) [🌐](https://github.com/GerHobbelt/rsync) -- Rsync is a fast and extraordinarily versatile file copying tool for both remote and local files. Rsync uses a delta-transfer algorithm which provides a very fast method for bringing remote files into sync.
- **RuntimeCompiledCPlusPlus** [📁](./RuntimeCompiledCPlusPlus) [🌐](https://github.com/GerHobbelt/RuntimeCompiledCPlusPlus) -- Runtime-Compiled C++ (RCC++) is a way to reliably make major changes to your C++ code at runtime and see the results immediately. It's aimed at games development but could be useful in any industry where turnaround times are a bottleneck. RCC++ is primarily designed to shorten iteration times in development - developers can build their project, run it, make changes during runtime and see the results almost immediately. If needed, shipping code can [disable runtime compilation](https://github.com/RuntimeCompiledCPlusPlus/RuntimeCompiledCPlusPlus/wiki/Disabling-runtime-compilation) in a number of ways. RCC++ is not intended as a method to allow end users of a shipped binary to compile modifications, though with some work it can be used this way.
- **RxCpp** [📁](./RxCpp) [🌐](https://github.com/GerHobbelt/RxCpp) -- the Reactive Extensions for C++ (__RxCpp__) is a library of algorithms for values-distributed-in-time. The [__Range-v3__](https://github.com/ericniebler/range-v3) library does the same for values-distributed-in-space.
- **safeclib** [📁](./safeclib) [🌐](https://github.com/GerHobbelt/safeclib) -- Safe C Library implements the secure C11 Annex K[^5] functions on top of most libc implementations, which are missing from them. The ISO TR24731 Bounds Checking Interface documents indicate that the key motivation for the new specification is to help mitigate the ever increasing security attacks, specifically the buffer overrun.
- **safestringlib** [📁](./safestringlib) [🌐](https://github.com/GerHobbelt/safestringlib) -- The Safe String Library is based on the Safe C Library by Cisco, and provides routines for safe string operations (like `strcpy`) and memory routines (like `memcpy`) that are recommended for Linux/Android operating systems, and will also work for Windows. This library is especially useful for cross-platform situations where one library for these routines is preferred.
- **salieri** [📁](./salieri) [🌐](https://github.com/GerHobbelt/salieri) -- provides function arguments' in/out annotation definitions for Microsoft's [source-code annotation language (SAL)](https://msdn.microsoft.com/en-us/library/hh916383.aspx). SAL provides lots of annotations you can use to describe the behavior
- **sbcl** [📁](./sbcl) [🌐](https://github.com/GerHobbelt/sbcl) -- SBCL is an implementation of ANSI Common Lisp, featuring a high-performance native compiler, native threads on several platforms, a socket interface, a source-level debugger, a statistical profiler, and much more.
- **scantailor** [📁](./scantailor) [🌐](https://github.com/GerHobbelt/scantailor-advanced) -- [scantailor_advanced](https://github.com/4lex4/scantailor-advanced) is the [ScanTailor](https://github.com/scantailor/scantailor) version that merges the features of the *ScanTailor Featured* and *ScanTailor Enhanced* versions, brings new ones and fixes. ScanTailor is an interactive post-processing tool for scanned pages. It performs operations such as page splitting, deskewing, adding/removing borders, selecting content, ... and many others.
- **scilab** [📁](./scilab) [🌐](https://github.com/GerHobbelt/scilab) -- Scilab includes hundreds of mathematical functions. It has a high-level programming language allowing access to advanced data structures, 2-D and 3-D graphical functions.
- **scintilla** [📁](./scintilla) [🌐](https://github.com/GerHobbelt/scintilla) -- text editor
- **ScriptX** [📁](./ScriptX) [🌐](https://github.com/GerHobbelt/ScriptX) -- wrapper for V8, QuickJS, Lua, Python, ...
- **scws-chinese-word-segmentation** [📁](./scws-chinese-word-segmentation) [🌐](https://github.com/GerHobbelt/scws) -- SCWS (Simple Chinese Word Segmentation) (i.e.: Simple Chinese Word Segmentation System). This is a mechanical Chinese word segmentation engine based on word frequency dictionary, which can basically correctly segment a whole paragraph of Chinese text into words. A word is the smallest morpheme unit in Chinese, but when writing, it does not separate words with spaces like English, so how to segment words accurately and quickly has always been a difficult problem in Chinese word segmentation. SCWS supports Chinese encoding includes `GBK`, `UTF-8`, etc.
  
  There are not many innovative elements in the word segmentation algorithm. It uses a word frequency dictionary collected by itself, supplemented by certain proper names, names of people, and place names. Basic word segmentation is achieved by identifying rules such as digital age. After small-scale testing, the accuracy is between 90% and 95%, which can basically satisfy some use in small search engines, keyword extraction and other occasions. The first prototype version was released in late 2005.

- **sdhash** [📁](./sdhash) [🌐](https://github.com/GerHobbelt/sdhash) -- a tool which allows two arbitrary blobs of data to be compared for similarity based on common strings of binary data. It is designed to provide quick results during triage and initial investigation phases.
- **sdsl-lite** [📁](./sdsl-lite) [🌐](https://github.com/GerHobbelt/sdsl-lite) -- The Succinct Data Structure Library (SDSL) is a powerful and flexible C++11 library implementing succinct data structures. In total, the library contains the highlights of 40 [research publications][SDSLLIT]. Succinct data structures can represent an object (such as a bitvector or a tree) in space close to the information-theoretic lower bound of the object while supporting operations of the original object efficiently. The theoretical time complexity of an operation performed on the classical data structure and the equivalent succinct data structure are (most of the time) identical.
- **Sealighter** [📁](./Sealighter) [🌐](https://github.com/GerHobbelt/Sealighter) -- Sysmon-Like research tool for ETW: helps non-developers dive into researching Event Tracing for Windows (ETW) and Windows PreProcessor Tracing (WPP).
- **semimap** [📁](./semimap) [🌐](https://github.com/GerHobbelt/semimap) -- semi::static_map and semi::map: associative map containers with compile-time lookup! Normally, associative containers require some runtime overhead when looking up their values from a key. However, when the key is known at compile-time (for example, when the key is a literal) then this run-time lookup could technically be avoided. This is exactly what the goal of `semi::static_map` and `semi::map` is.
- **sent2vec** [📁](./sent2vec) [🌐](https://github.com/GerHobbelt/sent2vec) -- a tool and pre-trained models related to the [Bi-Sent2vec](https://arxiv.org/abs/1912.12481). The cross-lingual extension of Sent2Vec can be found [here](https://github.com/epfml/Bi-sent2vec). This library provides numerical representations (features) for words, short texts, or sentences, which can be used as input to any machine learning task.
- **sentencepiece** [📁](./sentencepiece) [🌐](https://github.com/GerHobbelt/sentencepiece) -- text tokenization
- **sentence-tokenizer** [📁](./sentence-tokenizer) [🌐](https://github.com/GerHobbelt/Tokenizer) -- text tokenization
- **sequential-line-search** [📁](./sequential-line-search) [🌐](https://github.com/GerHobbelt/sequential-line-search) -- a C++ library for performing the **sequential line search** method (which is a human-in-the-loop variant of **Bayesian optimization**), following the paper "Yuki Koyama, Issei Sato, Daisuke Sakamoto, and Takeo Igarashi. 2017. Sequential Line Search for Efficient Visual Design Optimization by Crowds. ACM Trans. Graph. 36, 4, pp.48:1--48:11 (2017). (a.k.a. Proceedings of SIGGRAPH 2017), DOI: https://doi.org/10.1145/3072959.3073598"
- **shadesmar** [📁](./shadesmar) [🌐](https://github.com/GerHobbelt/shadesmar) -- an IPC library that uses the system's shared memory to pass messages. Supports publish-subscribe and RPC.
- **ShapeCrawler** [📁](./ShapeCrawler) [🌐](https://github.com/GerHobbelt/ShapeCrawler) -- a .NET library for manipulating PowerPoint presentations.
- **sharedhashfile** [📁](./sharedhashfile) [🌐](https://github.com/GerHobbelt/sharedhashfile) -- share hash tables with stable key hints stored in memory mapped files between arbitrary processes.
- **Sherwood** [📁](./Sherwood) [🌐](https://github.com/GerHobbelt/Sherwood) -- Sherwood: a library for decision forest inference, which was written by Duncan Robertson (duncan.robertson@redimension.co.uk) to accompany the book "A. Criminisi and J. Shotton. Decision Forests: for Computer Vision and Medical Image Analysis. Springer,  2013." The Sherwood library comprises a general purpose, object-oriented software framework for applying decision forests to a wide range of inference problems.
- **shmdata** [📁](./shmdata) [🌐](https://github.com/GerHobbelt/shmdata) -- shares streams of framed data between processes (1 writer to many readers) via shared memory. It supports any kind of data stream:  it has been used with multichannel audio, video frames, 3D models, OSC messages, and various others types of data. Shmdata is very fast and allows processes to access data streams without the need for extra copies.
- **shoco** [📁](./shoco) [🌐](https://github.com/GerHobbelt/shoco) -- a fast compressor for short strings
- **Signals** [📁](./Signals) [🌐](https://github.com/GerHobbelt/Signals) -- a lightweight "signals and slots" implementation using fast delegates. When GUI programming in C++, delegates and the signals and slots paradigm can vastly simplify your code. It implements the Observer pattern while avoiding all the boilerplate code. I needed a lightweight and efficient implementation that I could just drop into my projects and use without adding weird macros, inheriting from crazy templates or having external dependencies. I wanted something simpler and more efficient than libsigc++, sigslot, and boost.signals.
- **sile-typesetter** [📁](./sile-typesetter) [🌐](https://github.com/GerHobbelt/sile) -- SILE is a typesetting system; its job is to produce beautiful printed documents. Conceptually, SILE is similar to TeX—from which it borrows some concepts and even syntax and algorithms—but the similarities end there. Rather than being a derivative of the TeX family SILE is a new typesetting and layout engine written from the ground up using modern technologies and borrowing some ideas from graphical systems such as Adobe InDesign.
- **SilkETW** [📁](./SilkETW) [🌐](https://github.com/GerHobbelt/SilkETW) -- SilkETW & SilkService are flexible C# wrappers for ETW, they are meant to abstract away the complexities of ETW and give people a simple interface to perform research and introspection. While both projects have obvious defensive (and offensive) applications they should primarily be considered as research tools.
- **simd-imgproc** [📁](./simd-imgproc) [🌐](https://github.com/GerHobbelt/Simd) -- the Simd Library is an image processing and machine learning library designed for C and C++ programmers. It provides many useful high performance algorithms for image processing such as: pixel format conversion, image scaling and filtration, extraction of statistic information from images, motion detection, object detection (HAAR and LBP classifier cascades) and classification, neural network.
  
  The algorithms are optimized, using different SIMD CPU extensions where available. The library supports following CPU extensions: SSE, AVX, AVX-512 and AMX for x86/x64, VMX(Altivec) and VSX(Power7) for PowerPC (big-endian), NEON for ARM.

- **simdjson** [📁](./simdjson) [🌐](https://github.com/GerHobbelt/simdjson) -- simdjson : Parsing gigabytes of JSON per second. For NDJSON files, we can exceed 3 GB/s with our multithreaded parsing functions](https://github.com/simdjson/simdjson/blob/master/doc/parse_many.md).
- **sioyek** [📁](./sioyek) [🌐](https://github.com/GerHobbelt/sioyek) -- a PDF viewer with a focus on textbooks and research papers.
- **SipHash** [📁](./SipHash) [🌐](https://github.com/GerHobbelt/SipHash) -- SipHash is a family of pseudorandom functions (PRFs) optimized for speed on short messages. This is the reference C code of SipHash: portable, simple, optimized for clarity and debugging. SipHash was designed in 2012 by [Jean-Philippe Aumasson](https://aumasson.jp) and [Daniel J. Bernstein](https://cr.yp.to) as a defense against [hash-flooding DoS attacks](https://aumasson.jp/siphash/siphashdos_29c3_slides.pdf).
  
  It is *simpler and faster* on short messages than previous cryptographic algorithms, such as MACs based on universal hashing, *competitive in performance* with insecure non-cryptographic algorithms, such as [fhhash](https://github.com/cbreeden/fxhash), *cryptographically secure*, with no sign of weakness despite multiple [cryptanalysis](https://eprint.iacr.org/2019/865) [projects](https://eprint.iacr.org/2019/865) by leading cryptographers, *battle-tested*, with successful integration in OSs (Linux kernel, OpenBSD, FreeBSD, FreeRTOS), languages (Perl, Python, Ruby, etc.), libraries (OpenSSL libcrypto, Sodium, etc.) and applications (Wireguard, Redis, etc.).
  
  As a secure pseudorandom function (a.k.a. keyed hash function), SipHash can also be used as a secure message authentication code (MAC). But SipHash is *not a hash* in the sense of general-purpose key-less hash function such as BLAKE3 or SHA-3. SipHash should therefore always be used with a secret key in order to be secure.

- **siridb-server** [📁](./siridb-server) [🌐](https://github.com/GerHobbelt/siridb-server) -- SiriDB Server is a highly-scalable, robust and super fast time series database. SiriDB uses a unique mechanism to operate without a global index and allows server resources to be added on the fly. SiriDB’s unique query language includes dynamic grouping of time series for easy analysis over large amounts of time series. SiriDB is scalable on the fly and has no downtime while updating or expanding your database. The scalable possibilities enable you to enlarge the database time after time without losing speed. SiriDB is developed to give an unprecedented performance without downtime. A SiriDB cluster distributes time series across multiple pools. Each pool supports active replicas for load balancing and redundancy. When one of the replicas is not available the database is still accessible.
- **sist2** [📁](./sist2) [🌐](https://github.com/GerHobbelt/sist2) -- sist2 (Simple incremental search tool) is a fast, low memory usage, multi-threaded application, which scans drives and directory trees, extracts text and metadata from common file types, generates thumbnails and comes with OCR support (with tesseract) and  Named-Entity Recognition (using pre-trained client-side tensorflow models).
- **slot_map** [📁](./slot_map) [🌐](https://github.com/GerHobbelt/slot_map) -- a Slot Map is a high-performance associative container with persistent unique keys to access stored values. Upon insertion, a key is returned that can be used to later access or remove the values. Insertion, removal, and access are all guaranteed to take `O(1)` time (best, worst, and average case). Great for storing collections of objects that need stable, safe references but have no clear ownership. The difference between a `std::unordered_map` and a `dod::slot_map` is that the slot map generates and returns the key when inserting a value. A key is always unique and will only refer to the value that was inserted.
- **smhasher** [📁](./smhasher) [🌐](https://github.com/GerHobbelt/smhasher) -- benchmark and collection of fast hash functions for symbol tables or hash tables.
- **snap** [📁](./snap) [🌐](https://github.com/GerHobbelt/snap) -- Stanford Network Analysis Platform (SNAP) is a general purpose, high performance system for analysis and manipulation of large networks. SNAP scales to massive graphs with hundreds of millions of nodes and billions of edges.
- **snappy** [📁](./snappy) [🌐](https://github.com/GerHobbelt/snappy) -- an up-to-date fork of google/snappy, a fast compression/decompression library. It does not aim for maximum compression, or compatibility with any other compression library; instead, it aims for very high speeds and reasonable compression.
  
  - **second-choice**; reason: see `lzo2` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading. See also [How do I decide between LZ4 and Snappy compression?](https://stackoverflow.com/questions/67537111/how-do-i-decide-between-lz4-and-snappy-compression)

- **snmalloc** [📁](./snmalloc) [🌐](https://github.com/GerHobbelt/snmalloc) -- a high-performance allocator.
- **snowball** [📁](./snowball) [🌐](https://github.com/GerHobbelt/snowball) -- SnowBall stemming compiler (code generator)
- **somoclu** [📁](./somoclu) [🌐](https://github.com/GerHobbelt/somoclu) -- a massively parallel implementation of self-organizing maps. It exploits multicore CPUs, it is able to rely on MPI for distributing the workload in a cluster, and it can be accelerated by CUDA. A sparse kernel is also included, which is useful for training maps on vector spaces generated in text mining processes.
- **Sophus** [📁](./Sophus) [🌐](https://github.com/GerHobbelt/Sophus) -- a C++ implementation of Lie groups commonly used for 2d and 3d geometric problems (i.e. for Computer Vision or Robotics applications). Among others, this package includes the special orthogonal groups SO(2) and SO(3) to present rotations in 2d and 3d as well as the special Euclidean group SE(2) and SE(3) to represent rigid body transformations (i.e. rotations and translations) in 2d and 3d.
- **sparsehash** [📁](./sparsehash) [🌐](https://github.com/GerHobbelt/sparsehash) -- fast (non-cryptographic) hash algorithms
- **spdlog** [📁](./spdlog) [🌐](https://github.com/GerHobbelt/spdlog) -- very fast, header-only/compiled, C++ logging library.
- **spdlog_setup** [📁](./spdlog_setup) [🌐](https://github.com/GerHobbelt/spdlog_setup) -- file-based setup library for convenience in initializing spdlog.
- **spdlog_sqlite_sink** [📁](./spdlog_sqlite_sink) [🌐](https://github.com/GerHobbelt/sqlite_sink) -- SQLite 3 database sink for `spdlog`: a simple custom sink made for spdlog that writes to SQLite database.
- **spdmon** [📁](./spdmon) [🌐](https://github.com/GerHobbelt/spdmon) -- a progress monitor based on spdlog library. In just one function call visualize your loop progress!
- **spline** [📁](./spline) [🌐](https://github.com/GerHobbelt/spline) -- a lightweight C++ cubic spline interpolation library.
- **splinter** [📁](./splinter) [🌐](https://github.com/GerHobbelt/splinter) -- SPLINTER (SPLine INTERpolation) is a library for *multivariate function approximation with splines*. The library can be used for function approximation, regression, data smoothing, data reduction, and much more. Spline approximations are represented by a speedy C++ implementation of the tensor product B-spline. The B-spline consists of piecewise polynomial basis functions, offering a high flexibility and smoothness. The B-spline can be fitted to data using ordinary least squares (OLS), possibly with regularization. The library also offers construction of penalized splines (P-splines).
- **splitmerge** [📁](./splitmerge) [🌐](https://github.com/GerHobbelt/splitmerge) -- simple binary file splitter and (re)merger tool.
- **spookyhash** [📁](./spookyhash) [🌐](https://github.com/GerHobbelt/spookyhash) -- a very fast non cryptographic hash function, [designed by Bob Jenkins](http://burtleburtle.net/bob/hash/spooky.html). It produces well-distributed 128-bit hash values for byte arrays of any length. It can produce 64-bit and 32-bit hash values too, at the same speed.
- **spy-build-sysinfo** [📁](./spy-build-sysinfo) [🌐](https://github.com/GerHobbelt/spy) -- build system info
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
- **sqlite-stats** [📁](./sqlite-stats) [🌐](https://github.com/GerHobbelt/sqlite-stats) -- provides common statistical functions for SQLite.
- **sqlite_wrapper** [📁](./sqlite_wrapper) [🌐](https://github.com/GerHobbelt/sqlite_wrapper) -- an easy-to-use, lightweight and concurrency-friendly SQLite wrapper written in C++17.
- **sqlite_zstd_vfs** [📁](./sqlite_zstd_vfs) [🌐](https://github.com/GerHobbelt/sqlite_zstd_vfs) -- SQLite VFS extension providing streaming storage compression using Zstandard (Zstd), transparently compressing pages of the main database file as they're written out and later decompressing them as they're read in. It runs page de/compression on background threads and occasionally generates dictionaries to improve subsequent compression.
- **sqlplot-tools** [📁](./sqlplot-tools) [🌐](https://github.com/GerHobbelt/sqlplot-tools) -- a tool to **process data series** from algorithm experiments **using SQL statements** and embed the results in **gnuplot** datafiles or **pgfplots** LaTeX files. Using SQL to generate plots can be see as **cracking a nut with a sledgehammer**, but it really works well in practice.
- **sqlpp11** [📁](./sqlpp11) [🌐](https://github.com/GerHobbelt/sqlpp11) -- a type safe embedded domain specific language for SQL queries and results in C++.
- **squash** [📁](./squash) [🌐](https://github.com/GerHobbelt/squash) -- an abstraction library which provides a single API to access many compression libraries, allowing applications a great deal of flexibility when choosing a compression algorithm, or allowing a choice between several of them.
- **ssdeep** [📁](./ssdeep) [🌐](https://github.com/GerHobbelt/ssdeep) -- fuzzy hashing library, can be used to assist with identifying almost identical files using context triggered piecewise hashing.
- **ssimulacra2** [📁](./ssimulacra2) [🌐](https://github.com/GerHobbelt/ssimulacra2) -- Structural SIMilarity Unveiling Local And Compression Related Artifacts metric developed by Jon Sneyers. SSIMULACRA 2 is based on the concept of the multi-scale structural similarity index measure (MS-SSIM), computed in a perceptually relevant color space, adding two other (asymmetric) error maps, and aggregating using two different norms.
- **stan** [📁](./stan) [🌐](https://github.com/GerHobbelt/stan) -- Stan is a C++ package providing (1) full Bayesian inference using the No-U-Turn sampler (NUTS), a variant of Hamiltonian Monte Carlo (HMC), (2) approximate Bayesian inference using automatic differentiation variational inference (ADVI), and (3) penalized maximum likelihood estimation (MLE) using L-BFGS optimization. It is built on top of the [Stan Math library](https://github.com/stan-dev/math).
- **stan-math** [📁](./stan-math) [🌐](https://github.com/GerHobbelt/stan-math) -- the Stan Math Library is a C++, reverse-mode automatic differentiation library designed to be usable, extensive and extensible, efficient, scalable, stable, portable, and redistributable in order to facilitate the construction and utilization of algorithms that utilize derivatives.
- **StarSpace** [📁](./StarSpace) [🌐](https://github.com/GerHobbelt/StarSpace) -- a general-purpose neural model for efficient learning of entity embeddings for solving a wide variety of problems.
- **stateline** [📁](./stateline) [🌐](https://github.com/GerHobbelt/stateline) -- a framework for distributed Markov Chain Monte Carlo (MCMC) sampling written in C++. It implements random walk Metropolis-Hastings with parallel tempering to improve chain mixing, provides an adaptive proposal distribution to speed up convergence, and allows the user to factorise their likelihoods (eg. over sensors or data).
- **stats** [📁](./stats) [🌐](https://github.com/GerHobbelt/stats) -- StatsLib is a templated C++ library of statistical distribution functions, featuring unique compile-time computing capabilities and seamless integration with several popular linear algebra libraries. Features a header-only library of probability density functions, cumulative distribution functions, quantile functions, and random sampling methods. Functions are written in C++11 `constexpr` format, enabling the library to operate as both a compile-time and run-time computation engine. Provides functions to compute the cdf, pdf, quantile, as well as random sampling methods, are available for the following distributions: Bernoulli, Beta, Binomial, Cauchy, Chi-squared, Exponential, F, Gamma, Inverse-Gamma, Inverse-Gaussian, Laplace, Logistic, Log-Normal, Normal (Gaussian), Poisson, Rademacher, Student's t, Uniform and Weibull. In addition, pdf and random sampling functions are available for several multivariate distributions: inverse-Wishart, Multivariate Normal and Wishart.
- **statsite** [📁](./statsite) [🌐](https://github.com/GerHobbelt/statsite) -- a metrics aggregation server. Statsite is based heavily on Etsy's StatsD <https://github.com/etsy/statsd>, and is wire compatible.
- **stdext-path** [📁](./stdext-path) [🌐](https://github.com/GerHobbelt/stdext-path) -- path manipulations (`dirname` et al)
- **stlcache** [📁](./stlcache) [🌐](https://github.com/GerHobbelt/stlcache) -- STL::Cache is an in-memory cache for C++ applications. STL::Cache is just a simple wrapper over standard map, that implements some cache algorithms, thus allowing you to limit the storage size and automatically remove unused items from it. It is intended to be used for keeping any key/value data, especially when data's size are too big, to just put it into the map and keep the whole thing. With STL::Cache you could put enormous (really unlimited) amount of data into it, but it will store only some small part of your data. So re-usable data will be kept near your code and not so popular data will not spend expensive memory. STL::Cache uses configurable policies, for decisions, whether data are good, to be kept in cache or they should be thrown away. It is shipped with 8 policies and you are free to implement your own.
- **stopwords** [📁](./stopwords) [🌐](https://github.com/GerHobbelt/stopwords) -- default English stop words from different sources.
- **stringi** [📁](./stringi) [🌐](https://github.com/GerHobbelt/stringi) -- fast and portable character string processing in R (with the Unicode ICU).
- **strtk** [📁](./strtk) [🌐](https://github.com/GerHobbelt/strtk) -- the C++ String Toolkit Library (StrTk) consists of robust, optimized and portable string processing algorithms for the C++ language. StrTk is designed to be easy to use and integrate within existing code bases. Furthermore the library has a rich set of features  that makes light work of any kind of string processing task.
- **stx-error-handling** [📁](./stx-error-handling) [🌐](https://github.com/GerHobbelt/STX) -- C++ 17 & C++ 20 error-handling and utility extensions.
- **subprocess** [📁](./subprocess) [🌐](https://github.com/GerHobbelt/subprocess) -- cross platform subprocess library for C++ similar to design of Python `subprocess`.
- **subprocess-cpp** [📁](./subprocess-cpp) [🌐](https://github.com/GerHobbelt/subprocess-cpp) -- a no nonsense library for writing shell commands in C++.
- **subprocess_h** [📁](./subprocess_h) [🌐](https://github.com/GerHobbelt/subprocess.h) -- 🐜 a simple one header solution to launching processes and interacting with them for C/C++.
- **sumatrapdf** [📁](./sumatrapdf) [🌐](https://github.com/GerHobbelt/sumatrapdf) -- SumatraPDF is a multi-format (PDF, EPUB, MOBI, CBZ, CBR, FB2, CHM, XPS, DjVu) reader for Windows.
- **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
- **swig** [📁](./swig) [🌐](https://github.com/GerHobbelt/swig) -- SWIG (Simplified Wrapper and Interface Generator) is a software development tool (code generator) that connects programs written in C and C++ with a variety of high-level programming languages. It is used for building scripting language interfaces to C and C++ programs. SWIG simplifies development by largely automating the task of scripting language integration, allowing developers and users to focus on more important problems.
  
  *[SWIG 🌐](https://swig.readthedocs.io/en/latest/Manual/SWIG.html) was not considered initially; more suitable for RPC than what we have in mind, which is purely data messages enchange. MAY be of use for transitional applications which are mixed-(programming-)language based, e.g. where we want to mix C/C++ and C# in a single Test Application.*

- **SymSpell** [📁](./SymSpell) [🌐](https://github.com/GerHobbelt/SymSpell) -- spelling correction & fuzzy search: **1 million times faster** through Symmetric Delete spelling correction algorithm. The Symmetric Delete spelling correction algorithm reduces the complexity of edit candidate generation and dictionary lookup for a given Damerau-Levenshtein distance. It is six orders of magnitude faster ([than the standard approach with deletes + transposes + replaces + inserts](http://norvig.com/spell-correct.html)) and language independent.
- **tabulate** [📁](./tabulate) [🌐](https://github.com/GerHobbelt/tabulate) -- Table Maker for Modern C++, for when you want to display table formatted data in the terminal/console text window.
- **taglib** [📁](./taglib) [🌐](https://github.com/GerHobbelt/taglib) -- TagLib is a library for reading and editing the metadata of several popular audio formats. Currently it supports both ID3v1 and [ID3v2][] for MP3 files, [Ogg Vorbis][] comments and ID3 tags in [FLAC][], MPC, Speex, WavPack, TrueAudio, WAV, AIFF, MP4, APE, and ASF files.
- **tao-json** [📁](./tao-json) [🌐](https://github.com/GerHobbelt/tao-json) -- taoJSON is a C++ header-only JSON library that provides a generic [Value Class](doc/Value-Class.md), uses [Type Traits](doc/Type-Traits.md) to interoperate with C++ types, uses an [Events Interface](doc/Events-Interface.md) to convert from and to JSON, JAXN, CBOR, MsgPack and UBJSON, and much more...
- **taolog** [📁](./taolog) [🌐](https://github.com/GerHobbelt/taolog) -- a Win32 logger based on DebugView & ETW.
- **taskflow** [📁](./taskflow) [🌐](https://github.com/GerHobbelt/taskflow) -- quickly write parallel and heterogeneous task programs in modern C++. Taskflow is faster, more expressive, and easier for drop-in integration than many of existing task programming frameworks in handling complex parallel workloads.
- **tcl** [📁](./tcl) [🌐](https://github.com/GerHobbelt/tcl) -- the latest **Tcl** source distribution. Tcl provides a powerful platform for creating integration applications that tie together diverse applications, protocols, devices, and frameworks.
- **tclap** [📁](./tclap) [🌐](https://github.com/GerHobbelt/tclap) -- TCLAP (Templatized Command Line Argument Parser) is a simple C++ library that facilitates parsing command line arguments in a type independent manner. It doesn't conform exactly to either the GNU or POSIX standards, although it is close.
- **tclclockmod** [📁](./tclclockmod) [🌐](https://github.com/GerHobbelt/tclclockmod) -- TclClockMod is the fastest, most powerful Tcl clock engine written in C. This Tcl clock extension is the faster Tcl-module for the replacement of the standard "clock" ensemble of tcl.
- **tcp_pubsub** [📁](./tcp_pubsub) [🌐](https://github.com/GerHobbelt/tcp_pubsub) -- a minimal publish-subscribe library that transports data via TCP. `tcp_pubsub` does not define a message format but only transports binary blobs. It does however define a protocol around that, which is kept as lightweight as possible.
- **tcpshm** [📁](./tcpshm) [🌐](https://github.com/GerHobbelt/tcpshm) -- a connection-oriented persistent message queue framework based on TCP or SHM IPC for Linux. TCPSHM provides a reliable and efficient solution based on a sequence number and acknowledge mechanism, that every sent out msg is persisted in a send queue until sender got ack that it's been consumed by the receiver, so that disconnects/crashes are tolerated and the recovery process is purely automatic.
- **tee-win32** [📁](./tee-win32) [🌐](https://github.com/GerHobbelt/tee-win32) -- a simple [**`tee`**](https://en.wikipedia.org/wiki/Tee_(command)) implementation for Microsoft Windows.
- **telegram-bot-api** [📁](./telegram-bot-api) [🌐](https://github.com/GerHobbelt/telegram-bot-api) -- the Telegram Bot API provides an HTTP API for creating Telegram Bots.
- **telegram-td** [📁](./telegram-td) [🌐](https://github.com/GerHobbelt/td) -- TDLib (Telegram Database library) is a cross-platform library for building [Telegram](https://telegram.org) clients. It can be easily used from almost any programming language.
- **TelemetrySourcerer** [📁](./TelemetrySourcerer) [🌐](https://github.com/GerHobbelt/TelemetrySourcerer) -- Telemetry Sourcerer can enumerate and disable common sources of telemetry used by AV/EDR on Windows. Red teamers and security enthusiasts can use this tool in a lab environment for various purposes, including ETW event monitoring.
- **tempo** [📁](./tempo) [🌐](https://github.com/GerHobbelt/tempo) -- Grafana Tempo is an open source, easy-to-use and high-scale distributed tracing backend. Tempo is cost-efficient, requiring only object storage to operate, and is deeply integrated with Grafana, Prometheus, and Loki. Tempo is Jaeger, Zipkin, Kafka, OpenCensus and OpenTelemetry compatible.  It ingests batches in any of the mentioned formats, buffers them and then writes them to Azure, GCS, S3 or local disk.  As such it is robust, cheap and easy to operate! Tempo implements [TraceQL](https://grafana.com/docs/tempo/latest/traceql/), a traces-first query language inspired by LogQL and PromQL. This query language allows users to very precisely and easily select spans and jump directly to these spans.
- **tensorflow** [📁](./tensorflow) [🌐](https://github.com/GerHobbelt/tensorflow) -- an end-to-end open source platform for machine learning.
- **tensorflow-docs** [📁](./tensorflow-docs) [🌐](https://github.com/GerHobbelt/tensorflow-docs) -- TensorFlow documentation
- **tensorflow-io** [📁](./tensorflow-io) [🌐](https://github.com/GerHobbelt/tensorflow-io) -- TensorFlow I/O is a collection of file systems and file formats that are not available in TensorFlow's built-in support. A full list of supported file systems and file formats by TensorFlow I/O can be found [here](https://www.tensorflow.org/io/api_docs/python/tfio).
- **tensorflow-text** [📁](./tensorflow-text) [🌐](https://github.com/GerHobbelt/tensorflow-text) -- TensorFlow Text provides a collection of text related classes and ops ready to use with TensorFlow 2.0. The library can perform the preprocessing regularly required by text-based models, and includes other features useful for sequence modeling not provided by core TensorFlow.
- **tensorstore** [📁](./tensorstore) [🌐](https://github.com/GerHobbelt/tensorstore) -- TensorStore is an open-source C++ and Python software library designed for storage and manipulation of large multi-dimensional arrays.
- **termcolor** [📁](./termcolor) [🌐](https://github.com/GerHobbelt/termcolor) -- a header-only C++ library for printing colored messages to the terminal. Termcolor uses ANSI color formatting, so you can use it on every system that is used such terminals (most *nix systems, including Linux and Mac OS).
  
  On MS Windows the Windows API is used instead of escape codes but some limitations apply (not everything is supported). That's why it's recommended to enter virtual terminal processing mode and set the TERMCOLOR_USE_ANSI_ESCAPE_SEQUENCES macro to trick termcolor to use ANSI color codes.

- **tessconfigs** [📁](../../thirdparty/tessconfigs) [🌐](https://github.com/GerHobbelt/tessconfigs) -- Tesseract Config files
- **tessdata** [📁](../../thirdparty/tessdata) [🌐](https://github.com/GerHobbelt/tessdata) -- trained models for Tesseract. These have models for legacy tesseract engine (--oem 0) as well as the new LSTM neural net based engine (--oem 1). The LSTM models (--oem 1) in these files have been updated to the integerized versions of [tessdata_best](https://github.com/tesseract-ocr/tessdata_best) on GitHub. So, they should be faster but probably a little less accurate than tessdata_best.
- **tessdata_best** [📁](../../thirdparty/tessdata_best) [🌐](https://github.com/GerHobbelt/tessdata_best) -- the best trained models for the [Tesseract Open Source OCR Engine](https://github.com/tesseract-ocr/tesseract). These models only work with the LSTM OCR engine of Tesseract 4 / 5.
- **tessdata_contrib** [📁](../../thirdparty/tessdata_contrib) [🌐](https://github.com/GerHobbelt/tessdata_contrib) -- user contributions (non Google) for Tesseract 4 / 5.
- **tessdata_fast** [📁](../../thirdparty/tessdata_fast) [🌐](https://github.com/GerHobbelt/tessdata_fast) -- fast integer versions of trained models for the [Tesseract Open Source OCR Engine](https://github.com/tesseract-ocr/tesseract). These models only work with the LSTM OCR engine of Tesseract 4 / 5.
- **tessdoc** [📁](../../thirdparty/tessdoc) [🌐](https://github.com/GerHobbelt/tessdoc) -- user manual for Tesseract versions `5.x`.
- **tesseract** [📁](../../thirdparty/tesseract) [🌐](https://github.com/GerHobbelt/tesseract) -- `tesseract-ocr` with `--visible-pdf-image` and other tweaks.
- **tesseract_docs** [📁](../../thirdparty/tesseract_docs) [🌐](https://github.com/GerHobbelt/tesseract_docs) -- various documents related to Tesseract OCR.
- **tesseract-gImgRdrGui** [📁](./tesseract-gImgRdrGui) [🌐](https://github.com/GerHobbelt/gImageReader) -- a Gtk/Qt front-end to tesseract-ocr.
- **tesseract_langdata** [📁](../../thirdparty/tesseract_langdata) [🌐](https://github.com/GerHobbelt/langdata) -- source training data for Tesseract for lots of languages.
- **tesslinesplit** [📁](./tesslinesplit) [🌐](https://github.com/GerHobbelt/tesslinesplit) -- a standalone program for using Tesseract's line segmentation algorithm to split up document images.
- **tesstrain** [📁](../../thirdparty/tesstrain) [🌐](https://github.com/GerHobbelt/tesstrain) -- training workflow for Tesseract 4.
- **textflowcpp** [📁](./textflowcpp) [🌐](https://github.com/GerHobbelt/textflowcpp) -- a simple way to wrap a string at different line lengths, optionally with indents.
- **thread-pool** [📁](./thread-pool) [🌐](https://github.com/GerHobbelt/thread-pool) -- `BS::thread_pool`: a fast, lightweight, and easy-to-use C++17 thread pool library (by Barak Shoshany)
- **thread-pool-c** [📁](./thread-pool-c) [🌐](https://github.com/GerHobbelt/C-Thread-Pool) -- a minimal but advanced threadpool implementation.
- **thread-pool-cpp** [📁](./thread-pool-cpp) [🌐](https://github.com/GerHobbelt/thread-pool-cpp) -- highly scalable and fast thread pool. It implements both work-stealing and work-distribution balancing startegies. It implements cooperative scheduling strategy.
- **thrift** [📁](./thrift) [🌐](https://github.com/GerHobbelt/thrift) -- Apache Thrift is a lightweight, language-independent software stack for point-to-point RPC implementation. Thrift provides clean abstractions and implementations for data transport, data serialization, and application level processing. The code generation system takes a simple definition language as input and generates code across programming languages that uses the abstracted stack to build interoperable RPC clients and servers.
- **thunderSVM** [📁](./thunderSVM) [🌐](https://github.com/GerHobbelt/thundersvm) -- ThunderSVM exploits GPUs and multi-core CPUs to achieve high efficiency, supporting all functionalities of LibSVM such as one-class SVMs, SVC, SVR and probabilistic SVMs.
- **ticpp** [📁](./ticpp) [🌐](https://github.com/GerHobbelt/ticpp) -- TinyXML++: XML read/write
- **tidy-html5** [📁](./tidy-html5) [🌐](https://github.com/GerHobbelt/tidy-html5) -- clean up HTML documents before archiving/processing
- **tink** [📁](./tink) [🌐](https://github.com/GerHobbelt/tink) -- A multi-language, cross-platform library that provides cryptographic APIs that are secure, easy to use correctly, and hard(er) to misuse.
- **tinn** [📁](./tinn) [🌐](https://github.com/GerHobbelt/tinn) -- Tinn (Tiny Neural Network) is a 200 line dependency free neural network library written in C99.
- **tinycbor** [📁](./tinycbor) [🌐](https://github.com/GerHobbelt/tinycbor) -- Concise Binary Object Representation (CBOR) library for serializing data to disk or message channel.
- **tinycolormap** [📁](./tinycolormap) [🌐](https://github.com/GerHobbelt/tinycolormap) -- a header-only, single-file library for colormaps written in C++11.
- **tinydir** [📁](./tinydir) [🌐](https://github.com/GerHobbelt/tinydir) -- lightweight, portable and easy to integrate C directory and file reader. TinyDir wraps `dirent` for POSIX and `FindFirstFile` for Windows. Windows unicode is supported.
- **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr) -- a very small recursive descent parser and evaluation engine for math expressions.
- **tinygettext** [📁](./tinygettext) [🌐](https://github.com/GerHobbelt/tinygettext) -- a minimal replacement for gettext written in C++. It can read `.po` files directly and doesn't need `.mo` files generated from `.po`. It also can read the `.po` files from arbitrary locations, so it's better suited for non-Unix systems and situations in which one wants to store or distribute `.po` files separately from the software itself.
- **tiny-process-library** [📁](./tiny-process-library) [🌐](https://github.com/GerHobbelt/tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
- **tlx** [📁](./tlx) [🌐](https://github.com/GerHobbelt/tlx) -- a collection of C++ helpers and extensions universally needed, but not found in the STL.
- **tlx-btree** [📁](./tlx-btree) [🌐](https://github.com/GerHobbelt/tlx) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- **tmap** [📁](./tmap) [🌐](https://github.com/GerHobbelt/tmap) -- a very fast visualization library for large, high-dimensional data sets. tmap's graph layouts are based on the [OGDF](https://ogdf.uos.de/) library.
- **toml11** [📁](./toml11) [🌐](https://github.com/GerHobbelt/toml11) -- a C++11 header-only TOML parser/encoder depending only on C++ standard library, compatible to the latest version of [TOML v1.0.0](https://toml.io/en/v1.0.0), including UTF-8 support.
- **tomlpp** [📁](./tomlpp) [🌐](https://github.com/GerHobbelt/tomlplusplus) -- TOML++
- **TraceETW** [📁](./TraceETW) [🌐](https://github.com/GerHobbelt/TraceEtw) -- [Event Tracing for Windows (ETW)](http://msdn.microsoft.com/en-us/library/windows/desktop/aa363668(v=vs.85).aspx) is  powerful but notoriously complex. In C#, [EventSource](http://msdn.microsoft.com/en-us/library/system.diagnostics.tracing.eventsource(v=vs.110).aspx) made that technology much more approachable. This project aims at providing a similar solution for C++, both for Desktop apps and for Windows/Windows Phone Universal Store apps.
- **tracelogging-for-ETW** [📁](./tracelogging-for-ETW) [🌐](https://github.com/GerHobbelt/tracelogging) -- C++ Wrapper for Windows ETW TraceLogging
- **transwarp** [📁](./transwarp) [🌐](https://github.com/GerHobbelt/transwarp) -- a header-only C++ library for task concurrency. It allows you to easily create a graph of tasks where every task can be executed synchronously. transwarp is written in C++17 and only depends on the standard library.
- **tray** [📁](./tray) [🌐](https://github.com/GerHobbelt/tray) -- cross-platform, single header, super tiny C99 implementation of a system tray icon with a popup menu.
- **tre** [📁](./tre) [🌐](https://github.com/GerHobbelt/tre) -- TRE is a lightweight, robust, and efficient POSIX compliant regexp matching library with some exciting features such as approximate (fuzzy) matching. The matching algorithm used in TRE uses linear worst-case time in the length of the text being searched, and quadratic worst-case time in the length of the used regular expression.
- **treelite** [📁](./treelite) [🌐](https://github.com/GerHobbelt/treelite) -- **Treelite** is a universal model exchange and serialization format for decision tree forests. Treelite aims to be a small library that enables other C++ applications to exchange and store decision trees on the disk as well as the network.
- **tsf** [📁](./tsf) [🌐](https://github.com/GerHobbelt/tsf) -- type-safe printf equivalent for C++ (used by the uberlog submodule)
- **tvision** [📁](./tvision) [🌐](https://github.com/GerHobbelt/tvision) -- a modern port of Borland's Turbo Vision 2.0, the classical framework for text-based user interfaces. Now cross-platform and with Unicode support. (**retro fun**)
- **twain_library** [📁](./twain_library) [🌐](https://github.com/GerHobbelt/twain_library) -- the DTWAIN Library, **Version 5.x**, from Dynarithmic Software.  DTWAIN is an open source programmer's library that will allow applications to acquire images from TWAIN-enabled devices using a simple Application Programmer's Interface (API).
- **txiki** [📁](./txiki.js) [🌐](https://github.com/GerHobbelt/txiki.js) -- a small and powerful JavaScript runtime. It's built on the shoulders of giants: it uses [QuickJS] as its JavaScript engine, [libuv] as the platform layer, [wasm3] as the WebAssembly engine and [curl] as the HTTP / WebSocket client.
- **typesense** [📁](./typesense) [🌐](https://github.com/GerHobbelt/typesense) -- a fast, typo-tolerant search engine for building delightful search experiences. Open Source alternative to Algolia and an Easier-to-Use alternative to ElasticSearch. ⚡🔍✨ Fast, typo tolerant, in-memory fuzzy Search Engine for building delightful search experiences.
- **u8_to_std_string** [📁](./u8_to_std_string) [🌐](https://github.com/GerHobbelt/u8_to_std_string) -- C++ u8_to_std_string (`u8` and `char8_t` based string to `std::string`) inlines to convert between `u8` (`char8_t[]`) string constants and `char`-based `std::string` types to shut up C++17 ➜ C++20 transitioning codebases & compilers.
- **uberlog** [📁](./uberlog) [🌐](https://github.com/GerHobbelt/uberlog) -- a cross platform C++ logging system that is focused on fast and small, writing to a shared memory ring buffer.
- **uchardet** [📁](./uchardet) [🌐](https://github.com/GerHobbelt/uchardet) -- [uchardet](https://www.freedesktop.org/wiki/Software/uchardet/) is an encoding and language detector library, which attempts to determine the encoding of the text. It can reliably detect many charsets. Moreover it also works as a very good and fast language detector.
- **ucto** [📁](./ucto) [🌐](https://github.com/GerHobbelt/ucto) -- text tokenization
  
  - **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
  - **uctodata** [📁](./uctodata) [🌐](https://github.com/GerHobbelt/uctodata) -- data for `ucto` library

- **uctodata** [📁](./uctodata) [🌐](https://github.com/GerHobbelt/uctodata) -- data for `ucto` library
- **ucx** [📁](./ucx) [🌐](https://github.com/GerHobbelt/ucx) -- Unified Communication X (UCX) is an optimized production proven-communication framework for modern, high-bandwidth and low-latency networks. UCX exposes a set of abstract communication primitives that utilize the best of available hardware resources and offloads. These include RDMA (InfiniBand and RoCE), TCP, GPUs, shared memory, and network atomic operations.
- **ugrep** [📁](./ugrep) [🌐](https://github.com/GerHobbelt/ugrep) -- search for anything in everything... ultra fast. "*`grep` for arbitrary binary files*."
- **UIforETW** [📁](./UIforETW) [🌐](https://github.com/GerHobbelt/UIforETW) -- Bruce Dawson's user interface for recording ETW (Event Tracing for Windows) traces, which allow amazingly deep investigations of performance problems on Windows.
- **uint128_t** [📁](./uint128_t) [🌐](https://github.com/GerHobbelt/uint128_t) -- an unsigned 128 bit integer type for C++.
- **unblending** [📁](./unblending) [🌐](https://github.com/GerHobbelt/unblending) -- a C++ library for decomposing a target image into a set of semi-transparent layers associated with *advanced color-blend modes* (e.g., "multiply" and "color-dodge"). Output layers can be imported to Adobe Photoshop, Adobe After Effects, GIMP, Krita, etc. and are useful for performing complex edits that are otherwise difficult.
- **unicode-cldr** [📁](./unicode-cldr) [🌐](https://github.com/GerHobbelt/cldr) -- Unicode CLDR Project: provides key building blocks for software to support the world's languages, with the largest and most extensive standard repository of locale data available. This data is used by a wide spectrum of companies for their software internationalization and localization, adapting software to the conventions of different languages for such common software tasks.
- **unicode-cldr-data** [📁](./unicode-cldr-data) [🌐](https://github.com/GerHobbelt/cldr-json) -- the JSON distribution of CLDR locale data for internationalization. While XML (not JSON) is the "official" format for all CLDR data, this data is programatically generated from the corresponding XML, using the CLDR tooling. This JSON data is generated using only data that has achieved draft="contributed" or draft="approved" status in the CLDR. This is the same threshhold as is used by the ICU (International Components for Unicode).
- **unicode-icu** [📁](./unicode-icu) [🌐](https://github.com/GerHobbelt/icu) -- the [International Components for Unicode](https://icu.unicode.org/).
- **unicode-icu-data** [📁](./unicode-icu-data) [🌐](https://github.com/GerHobbelt/icu-data) -- International Components for Unicode: Data Repository. This is an auxiliary repository for the International Components for Unicode.
- **unicode-icu-demos** [📁](./unicode-icu-demos) [🌐](https://github.com/GerHobbelt/icu-demos) -- ICU Demos contains sample applications built using the International Components for Unicode (ICU) C++ library ICU4C.
- **universal-numbers** [📁](./universal-numbers) [🌐](https://github.com/GerHobbelt/universal) -- a header-only C++ template library for universal number arithmetic. The goal of the Universal Numbers Library is to offer applications alternatives to IEEE floating-point that are more efficient and mathematically robust. The Universal library is a ready-to-use header-only library that provides plug-in replacement for native types, and provides a low-friction environment to start exploring alternatives to IEEE floating-point in your own algorithms.
- **unixODBC** [📁](./unixODBC) [🌐](https://github.com/GerHobbelt/unixODBC) -- an Open Source ODBC sub-system and an ODBC SDK for Linux, Mac OSX, and UNIX.
- **UnofficialLeptDocs** [📁](./UnofficialLeptDocs) [🌐](https://github.com/GerHobbelt/UnofficialLeptDocs) -- unofficial Sphinx-generated documentation for the Leptonica image processing library.
- **uno-solver** [📁](./uno-solver) [🌐](https://github.com/GerHobbelt/Uno) -- a modern, modular solver for nonlinearly constrained nonconvex optimization.
- **unpaper** [📁](./unpaper) [🌐](https://github.com/GerHobbelt/unpaper) -- a post-processing tool for scanned sheets of paper, especially for book pages that have been scanned from previously created photocopies.  The main purpose is to make scanned book pages better readable on screen after conversion to PDF. The program also tries to detect misaligned centering and rotation of ages and will automatically straighten each page by rotating it to the correct angle (a.k.a. deskewing).
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
- **upskirt-markdown** [📁](./upskirt-markdown) [🌐](https://github.com/GerHobbelt/soldout) -- MarkDown renderer
- **URI-Encode-C** [📁](./URI-Encode-C) [🌐](https://github.com/GerHobbelt/URI-Encode-C) -- an optimized C library for percent encoding/decoding text, i.e. a URI encoder/decoder written in C based on [RFC3986](https://tools.ietf.org/html/rfc3986).
- **url** [📁](./url) [🌐](https://github.com/GerHobbelt/url) -- URI parsing and other utility functions
- **URL-Detector** [📁](./URL-Detector) [🌐](https://github.com/GerHobbelt/URL-Detector) -- Url Detector is a library created by the Linkedin Security Team to detect and extract urls in a long piece of text. Keep in mind that for security purposes, its better to overdetect urls: instead of complying with RFC 3986 (http://www.ietf.org/rfc/rfc3986.txt), we try to detect based on browser behavior, optimizing detection for urls that are visitable through the address bar of Chrome, Firefox, Internet Explorer, and Safari. It is also able to identify the parts of the identified urls.
- **url-parser** [📁](./url-parser) [🌐](https://github.com/GerHobbelt/url.h) -- parse URLs much like Node's [url](http://nodejs.org/api/url.html) module.
- **userver** [📁](./userver) [🌐](https://github.com/GerHobbelt/userver) -- an open source asynchronous framework with a rich set of abstractions for fast and comfortable creation of C++ microservices, services and utilities. The framework solves the problem of efficient I/O interactions transparently for the developers. Operations that would typically suspend the thread of execution do not suspend it. Instead of that, the thread processes other requests and tasks and returns to the handling of the operation only when it is guaranteed to execute immediately. As a result you get straightforward source code and avoid CPU-consuming context switches from OS, efficiently utilizing the CPU with a small amount of execution threads.
- **utf8proc** [📁](./utf8proc) [🌐](https://github.com/GerHobbelt/utf8proc) -- [utf8proc](http://juliastrings.github.io/utf8proc/) is a small, clean C library that provides Unicode normalization, case-folding, and other operations for data in the [UTF-8 encoding](http://en.wikipedia.org/wiki/UTF-8).
- **utfcpp** [📁](./utfcpp) [🌐](https://github.com/GerHobbelt/utfcpp) -- UTF-8 with C++ in a Portable Way
- **variadic_table** [📁](./variadic_table) [🌐](https://github.com/GerHobbelt/variadic_table) -- for "pretty-printing" a formatted table of data to the console. It uses "variadic templates" to allow you to specify the types of data in each column.
- **vcopy** [📁](./vcopy) [🌐](https://github.com/GerHobbelt/vcopy) -- tool to safely copy files across various (local) hardware under circumstances where there may be another file writer active at the same time and/or the (USB?) connection is sometimes flakey or system I/O drivers buggered.
- **vcpkg** [📁](./vcpkg) [🌐](https://github.com/GerHobbelt/vcpkg) -- `Vcpkg` helps you manage C and C++ libraries on Windows, Linux and MacOS.
- **velocypack** [📁](./velocypack) [🌐](https://github.com/GerHobbelt/velocypack) -- a fast and compact format for serialization and storage.  These days, JSON (JavaScript Object Notation, see ECMA-404) is used in many cases where data has to be exchanged. Lots of protocols between different services use it, databases store JSON (document stores naturally, but others increasingly as well). It is popular, because it is simple, human-readable, and yet surprisingly versatile, despite its limitations. At the same time there is a plethora of alternatives ranging from XML over Universal Binary JSON, MongoDB's BSON, MessagePack, BJSON (binary JSON), Apache Thrift till Google's protocol buffers and ArangoDB's shaped JSON. When looking into this, we were surprised to find that none of these formats manages to combine compactness, platform independence, fast access to sub-objects and rapid conversion from and to JSON.
- **Verify** [📁](./Verify) [🌐](https://github.com/GerHobbelt/Verify) -- a snapshot tool that simplifies the assertion of complex data models and documents. Verify is called on the test result during the assertion phase. It serializes that result and stores it in a file that matches the test name. On the next test execution, the result is again serialized and compared to the existing file. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new result.
- **visible-url-detector** [📁](./visible-url-detector) [🌐](https://github.com/GerHobbelt/visible-url-detector) -- console app for listing active tab from browsers (Windows)
- **VisualScriptEngine** [📁](./VisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngine) -- A visual scripting engine designed for embedding. The engine is written in modern C++ and compiles on several platforms with no external dependencies.
- **vizzu** [📁](./vizzu) [🌐](https://github.com/GerHobbelt/vizzu-lib) -- Vizzu is a Javascript/C++ library for animated data visualizations and data stories, utilizing a generic dataviz engine that generates many types of charts and seamlessly animates between them. It can be used to create static charts but more importantly, it is designed for building animated data stories and interactive explorers as Vizzu enables showing different perspectives of the data that the viewers can easily follow due to the animation.
- **vmaf** [📁](./vmaf) [🌐](https://github.com/GerHobbelt/vmaf) -- VMAF (Video Multi-Method Assessment Fusion) is an [Emmy-winning](https://theemmys.tv/) perceptual video quality assessment algorithm developed by Netflix. It also provides a set of tools that allows a user to train and test a custom VMAF model.
- **vmem** [📁](./vmem) [🌐](https://github.com/GerHobbelt/vmem) -- **libvmem** and **libvmmalloc** are a couple of libraries for using persistent memory for malloc-like volatile uses.  They have historically been a part of [PMDK](https://pmem.io/pmdk) despite being solely for volatile uses. You may want consider using [memkind](https://github.com/memkind/memkind) instead in code that benefits from extra features like NUMA awareness.
- **vmemcache** [📁](./vmemcache) [🌐](https://github.com/GerHobbelt/vmemcache) -- **libvmemcache** is an embeddable and lightweight in-memory buffered LRU caching solution. It's designed to fully take advantage of large capacity memory, such as Persistent Memory with DAX, through memory mapping in an efficient and scalable way.
- **VQMT** [📁](./VQMT) [🌐](https://github.com/GerHobbelt/VQMT) -- VQMT (Video Quality Measurement Tool) provides fast implementations of the following objective metrics:
  
  - **MS-SSIM**: Multi-Scale Structural Similarity,
  - **PSNR**: Peak Signal-to-Noise Ratio,
  - **PSNR-HVS**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF),
  - **PSNR-HVS-M**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF) and between-coefficient contrast masking of DCT basis functions.
  - **SSIM**: Structural Similarity,
  - **VIFp**: Visual Information Fidelity, pixel domain version
  
  The above metrics are implemented in C++ with the help of OpenCV and are based on the original Matlab implementations provided by their developers.

- **VSNASM** [📁](./VSNASM) [🌐](https://github.com/GerHobbelt/VSNASM) -- a set of build customisations that can be used within Visual Studio to compile assembly code using NASM. Visual Studio integration for the NASM assembler.
- **VTK** [📁](./VTK) [🌐](https://github.com/GerHobbelt/VTK) -- VTK - The Visualization Toolkit - is an open-source software system for image processing, 3D graphics, volume rendering and visualization. VTK includes many advanced algorithms (e.g., surface reconstruction, implicit modeling, decimation) and rendering techniques (e.g., hardware-accelerated volume rendering, LOD control).
- **vtm** [📁](./vtm) [🌐](https://github.com/GerHobbelt/vtm) -- Terminal multiplexer with window manager and session sharing. Text-based desktop environment inside your terminal. Includes `destopio`, a text/terminal oriented layout engine.
- **vxl** [📁](./vxl) [🌐](https://github.com/GerHobbelt/vxl) -- VXL (the Vision-something-Libraries) is a collection of C++ libraries designed for computer vision research and implementation. It was created from TargetJr and the IUE with the aim of making a light, fast and consistent system.
- **waifu2x-ncnn-vulkan** [📁](./waifu2x-ncnn-vulkan) [🌐](https://github.com/GerHobbelt/waifu2x-ncnn-vulkan) -- waifu2x ncnn Vulkan: an [ncnn project](https://github.com/Tencent/ncnn) implementation of the waifu2x converter. Runs fast on Intel / AMD / Nvidia / Apple-Silicon with Vulkan API.
- **warc2text** [📁](./warc2text) [🌐](https://github.com/GerHobbelt/warc2text) -- Extracts plain text, language identification and more metadata from WARC records.
- **warp-ctc** [📁](./warp-ctc) [🌐](https://github.com/GerHobbelt/warp-ctc) -- A fast parallel implementation of CTC, on both CPU and GPU. Connectionist Temporal Classification (CTC) is a loss function useful for performing supervised learning on sequence data, without needing an alignment between input data and labels. For example, CTC can be used to train end-to-end systems for speech recognition.
- **warpLDA** [📁](./warpLDA) [🌐](https://github.com/GerHobbelt/warplda) -- a cache efficient implementation for Latent Dirichlet Allocation.
- **wcwidth9** [📁](./wcwidth9) [🌐](https://github.com/GerHobbelt/wcwidth9) -- platform independent, header only, `wcwidth` with full Unicode 9 wide character support.
- **websocket-sharp** [📁](./websocket-sharp) [🌐](https://github.com/GerHobbelt/websocket-sharp) -- a C# implementation of the WebSocket protocol client and server.
- **webview** [📁](./webview) [🌐](https://github.com/GerHobbelt/webview) -- cross-platform embedding of the system-default web browser: a tiny cross-platform webview library for C/C++/Golang to build modern cross-platform GUIs. The goal of the project is to create a common HTML5 UI abstraction layer for the most widely used platforms. It supports two-way JavaScript bindings (to call JavaScript from C/C++/Go and to call C/C++/Go from JavaScript).
- **wget** [📁](./wget) [🌐](https://github.com/GerHobbelt/wget) -- GNU Wget is a free utility for non-interactive download of files from the Web.  It supports HTTP, HTTPS, and FTP protocols, as well as retrieval through HTTP proxies.
- **wget2** [📁](./wget2) [🌐](https://github.com/GerHobbelt/wget2) -- GNU Wget2 is the successor of GNU Wget, a file and recursive website downloader. Designed and written from scratch it wraps around libwget, that provides the basic functions needed by a web client. Wget2 works multi-threaded and uses many features to allow fast operation. In many cases Wget2 downloads much faster than Wget1.x due to HTTP2, HTTP compression, parallel connections and use of If-Modified-Since HTTP header.
- **wil-Win32-Interface-Library** [📁](./wil-Win32-Interface-Library) [🌐](https://github.com/GerHobbelt/wil) -- The Windows Implementation Libraries (WIL) is a header-only C++ library created to make life easier for developers on Windows through readable type-safe C++ interfaces for common Windows coding patterns.
- **win32-dpi** [📁](./win32-dpi) [🌐](https://github.com/GerHobbelt/win32-dpi) -- Win32 DPI-aware window example, showcasing how to write a Win32 DPI-aware GUI application that scales properly on everything starting from Windows XP up to and including latest Windows 11.
- **Win32_read_directory_changes** [📁](./Win32_read_directory_changes) [🌐](https://github.com/GerHobbelt/readdirectorychanges) -- sample code which goes with [Understanding ReadDirectoryChangesW](http://qualapps.blogspot.com/2010/05/understanding-readdirectorychangesw.html)
- **Win32_read_directory_changes_IOCP** [📁](./Win32_read_directory_changes_IOCP) [🌐](https://github.com/GerHobbelt/ReadDirectoryChangesIOCP) -- inspired by jimbeveridge's artical [Understanding ReadDirectoryChangesW](http://qualapps.blogspot.com/2010/05/understanding-readdirectorychangesw.html)! The project shows how to read directory changes by IO completion port on windows platform.
- **Windows10EtwEvents** [📁](./Windows10EtwEvents) [🌐](https://github.com/GerHobbelt/Windows10EtwEvents) -- Events from all manifest-based and mof-based ETW providers across Windows 10 versions.
- **winflexbison** [📁](./winflexbison) [🌐](https://github.com/GerHobbelt/winflexbison) -- Flex and Bison for Microsoft Windows :: a Windows port of Flex (the fast lexical analyser) and GNU Bison (parser generator). Both `win_flex` and `win_bison` are based on upstream sources but depend on system libraries only.
- **WinHttpPAL** [📁](./WinHttpPAL) [🌐](https://github.com/GerHobbelt/WinHttpPAL) -- implements [WinHttp API](https://docs.microsoft.com/en-us/windows/win32/winhttp/winhttp-start-page) Platform Abstraction Layer for POSIX systems using libcurl
- **win-iconv** [📁](./win-iconv) [🌐](https://github.com/GerHobbelt/win-iconv) -- an `iconv` implementation using Win32 API to convert.
- **word2vec** [📁](./word2vec) [🌐](https://github.com/GerHobbelt/word2vec) -- Word2Vec in C++ 11.
- **word2vec-GloVe** [📁](./word2vec-GloVe) [🌐](https://github.com/GerHobbelt/GloVe) -- an implementation of the GloVe (*Global Vectors for Word Representation*) model for learning word representations.
- **wordfreq** [📁](./wordfreq) [🌐](https://github.com/GerHobbelt/wordfreq) -- wordfreq is a Python library for looking up the frequencies of words in many languages, based on many sources of data.
- **wordfrequency** [📁](./wordfrequency) [🌐](https://github.com/GerHobbelt/FrequencyWords) -- FrequencyWords: Frequency Word List Generator and processed files.
- **wxCharts** [📁](./wxCharts) [🌐](https://github.com/GerHobbelt/wxCharts) -- charts for wxWidgets
- **wxCurl** [📁](./wxCurl) [🌐](https://github.com/GerHobbelt/wxCurl) -- clone of improved wxCurl from OpenCPN. wxCURL is a simplified and integrated interface between LibCURL and wxWidgets. wxCURL provides several sub-classes for simplified interfaces to HTTP, WebDAV, FTP and Telnet based resources, threads specialized for non-blocking downloads/uploads, stock download and upload dialogs.
- **wxDatabase** [📁](./wxDatabase) [🌐](https://github.com/GerHobbelt/wxDatabase) -- wxDatabase is built on the excellent work of Joseph Blough called DatabaseLayer. The wxDatabase classes provide a database independent interface similar to JDBC (but only VERY basic functionality). So far, the only database backends supported are SQLite3, MySQL, PostGreSQL, ODBC, and TDS.
- **wxExamples** [📁](./wxExamples) [🌐](https://github.com/GerHobbelt/Examples_wxWidgets) -- examples using wxWidgets
- **wxFormBuilder** [📁](./wxFormBuilder) [🌐](https://github.com/GerHobbelt/wxFormBuilder) -- resource editor and GUI designer for wxWidgets
- **wxMEdit** [📁](./wxMEdit) [🌐](https://github.com/GerHobbelt/wxMEdit) -- a cross-platform Text/Hex Editor written in C++ & wxWidgets. wxMEdit supports many useful functions, e.g. Bookmark, Syntax Highlightings, Word Wraps, Encodings and Column/Hex Modes.
- **wxPdfDocument** [📁](./wxPdfDocument) [🌐](https://github.com/GerHobbelt/wxpdfdoc) -- **wxPdfDocument** allows wxWidgets applications to generate PDF documents. The code is a port of FPDF - a free PHP class for generating PDF files - to C++ using the wxWidgets library. Several add-on PHP scripts found on the FPDF web site are incorporated into wxPdfDocument.
- **wxPDFView** [📁](./wxPDFView) [🌐](https://github.com/GerHobbelt/wxPDFView) -- wxWidgets PDF viewer/reader control
- **wxSQLite3** [📁](./wxSQLite3) [🌐](https://github.com/GerHobbelt/wxsqlite3) -- a C++ wrapper around the SQLite 3.x database and is specifically designed for use in programs based on the wxWidgets library. **wxSQLite3** does not try to hide the underlying database, in contrary almost all special features of the current SQLite3 version are supported, like for example the creation of user defined scalar or aggregate functions.
- **wxVisualScriptEngine** [📁](./wxVisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngineWxWidgets) -- a utility module for [VisualScriptEngine](https://github.com/kovacsv/VisualScriptEngine) which provides helper classes for embedding the engine in a wxWidgets application.
- **wxWebViewChromium** [📁](./wxWebViewChromium) [🌐](https://github.com/GerHobbelt/wxWebViewChromium) -- Chromium CEF3-based embedded browser for wxWidgets
- **wxWidgets** [📁](./wxWidgets) [🌐](https://github.com/GerHobbelt/wxWidgets) -- cross-platform GUI framework.
- **wyhash** [📁](./wyhash) [🌐](https://github.com/GerHobbelt/wyhash) -- No hash function is perfect, but some are useful. `wyhash` and `wyrand` are the ideal 64-bit hash function and PRNG respectively: solid, portable, fastest (especially for short keys), salted (using a dynamic secret to avoid intended attack).
- **xgboost** [📁](./xgboost) [🌐](https://github.com/GerHobbelt/xgboost) -- an optimized distributed gradient boosting library designed to be highly efficient, flexible and portable. It implements machine learning algorithms under the Gradient Boosting framework. XGBoost provides a parallel tree boosting (also known as GBDT, GBM) that solve many data science problems in a fast and accurate way. The same code runs on major distributed environment (Kubernetes, Hadoop, SGE, MPI, Dask) and can solve problems beyond billions of examples.
- **xlnt** [📁](./xlnt) [🌐](https://github.com/GerHobbelt/xlnt) -- a modern C++ library for manipulating spreadsheets in memory and reading/writing them from/to XLSX files as described in [ECMA 376 4th edition](http://www.ecma-international.org/publications/standards/Ecma-376.htm).
- **xml-pugixml** [📁](./xml-pugixml) [🌐](https://github.com/GerHobbelt/pugixml) -- light-weight, simple and fast XML parser for C++ with XPath support.
- **XMP-Toolkit-SDK** [📁](./XMP-Toolkit-SDK) [🌐](https://github.com/GerHobbelt/XMP-Toolkit-SDK) -- the XMP Toolkit allows you to integrate XMP functionality into your product, supplying an API for locating, adding, or updating the XMP metadata in a file.
- **xnnpack** [📁](./xnnpack) [🌐](https://github.com/GerHobbelt/XNNPACK) -- a highly optimized library of floating-point neural network inference operators for ARM, WebAssembly, and x86 platforms. XNNPACK is not intended for direct use by deep learning practitioners and researchers; instead it provides low-level performance primitives for accelerating high-level machine learning frameworks, such as TensorFlow Lite, TensorFlow.js, PyTorch, and MediaPipe.
- **xor-and-binary-fuse-filter** [📁](./xor-and-binary-fuse-filter) [🌐](https://github.com/GerHobbelt/xor_singleheader) -- XOR and Binary Fuse Filter library: Bloom filters are used to quickly check whether an element is part of a set. Xor filters and binary fuse filters are faster and more concise alternative to Bloom filters. They are also smaller than cuckoo filters. They are used in [production systems](https://github.com/datafuselabs/databend).
- **Xoshiro-cpp** [📁](./Xoshiro-cpp) [🌐](https://github.com/GerHobbelt/Xoshiro-cpp) -- a header-only pseudorandom number generator library for modern C++. Based on **David Blackman and Sebastiano Vigna's [xoshiro/xoroshiro generators](http://prng.di.unimi.it/)**.
- **xpdf** [📁](./xpdf) [🌐](https://github.com/GerHobbelt/xpdf) -- Xpdf is an open source viewer for Portable Document Format (PDF) files.
- **xsg** [📁](./xsg) [🌐](https://github.com/GerHobbelt/xsg) -- XOR [BST](https://en.wikipedia.org/wiki/Binary_search_tree) implementations are related to the [XOR linked list](https://en.wikipedia.org/wiki/XOR_linked_list), a [doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list) variant, from where we borrow the idea about how links between nodes are to be implemented. Modest resource requirements and simplicity make XOR [scapegoat trees](https://en.wikipedia.org/wiki/Scapegoat_tree) stand out of the [BST](https://en.wikipedia.org/wiki/Binary_search_tree) crowd. All iterators (except `end()` iterators), but not references and pointers, are invalidated, after inserting or erasing from this XOR [scapegoat tree](https://en.wikipedia.org/wiki/Scapegoat_tree) implementation. You can dereference invalidated iterators, if they were not erased, but you cannot iterate with them. `end()` iterators are constant and always valid, but dereferencing them results in undefined behavior.
- **xsimd** [📁](./xsimd) [🌐](https://github.com/GerHobbelt/xsimd) -- SIMD (Single Instruction, Multiple Data) instructions differ between microprocessor vendors and compilers. `xsimd` provides a unified means for using these features for library authors. It enables manipulation of batches of numbers with the same arithmetic operators as for single values. It also provides accelerated implementation of common mathematical functions operating on batches.
- **xsldbg** [📁](./xsldbg) [🌐](https://github.com/GerHobbelt/xsldbg) -- a debugger for xsl/xslt stylesheets which has functionality similar to a Unix/Linux "gdb", using libxml2 and libxslt.
- **xtensor** [📁](./xtensor) [🌐](https://github.com/GerHobbelt/xtensor) -- C++ tensors with broadcasting and lazy computing. `xtensor` is a C++ library meant for numerical analysis with multi-dimensional array expressions.
- **xtensor-blas** [📁](./xtensor-blas) [🌐](https://github.com/GerHobbelt/xtensor-blas) -- an extension to the `xtensor` library, offering bindings to BLAS and LAPACK libraries through `cxxblas` and `cxxlapack`.
- **xtensor-io** [📁](./xtensor-io) [🌐](https://github.com/GerHobbelt/xtensor-io) -- a `xtensor` plugin to read and write images, audio files, NumPy (compressed) NPZ and HDF5 files.
- **xtl** [📁](./xtl) [🌐](https://github.com/GerHobbelt/xtl) -- xtensor core library
- **xxHash** [📁](./xxHash) [🌐](https://github.com/GerHobbelt/xxHash) -- fast (non-cryptographic) hash algorithm
- **YACLib** [📁](./YACLib) [🌐](https://github.com/GerHobbelt/YACLib) -- YACLib is a lightweight C++ library for concurrent and parallel task execution.
- **yaml-cpp** [📁](./yaml-cpp) [🌐](https://github.com/GerHobbelt/yaml-cpp) -- a YAML parser and emitter in C++ matching the YAML 1.2 spec.
- **yaml-test-suite** [📁](./yaml-test-suite) [🌐](https://github.com/GerHobbelt/yaml-test-suite) -- comprehensive Test Suite for YAML
- **yara-pattern-matcher** [📁](./yara-pattern-matcher) [🌐](https://github.com/GerHobbelt/yara) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks
- **yasl** [📁](./yasl) [🌐](https://github.com/GerHobbelt/yasl) -- Bytecode Interpreter for Yet Another Scripting Language (YASL).
- **yggdrasil-decision-forests** [📁](./yggdrasil-decision-forests) [🌐](https://github.com/GerHobbelt/yggdrasil-decision-forests) -- Yggdrasil Decision Forests (YDF) is a production-grade collection of algorithms for the training, serving, and interpretation of decision forest models. YDF is open-source and is available in C++, command-line interface (CLI), TensorFlow (under the name [TensorFlow Decision Forests](https://github.com/tensorflow/decision-forests); TF-DF), JavaScript (inference only), and Go (inference only).
- **you-token-to-me** [📁](./you-token-to-me) [🌐](https://github.com/GerHobbelt/YouTokenToMe) -- text tokenization
- **yyjson** [📁](./yyjson) [🌐](https://github.com/GerHobbelt/yyjson) -- allegedly the fastest JSON library in C.
- **zfp-compressed-arrays** [📁](./zfp-compressed-arrays) [🌐](https://github.com/GerHobbelt/zfp) -- zfp is a compressed format for representing multidimensional floating-point and integer arrays. zfp provides compressed-array classes that support high throughput read and write random access to individual array elements. zfp also supports serial and parallel (OpenMP and CUDA) compression of whole arrays, e.g., for applications that read and write large data sets to and from disk.
- **zlib** [📁](../../thirdparty/zlib) [🌐](https://github.com/GerHobbelt/thirdparty-zlib) -- zlib-ng: zlib data compression library for the next generation systems.
- **ZLMediaKit** [📁](./ZLMediaKit) [🌐](https://github.com/GerHobbelt/ZLMediaKit) -- a high-performance operational-level streaming media service framework based on C++11, supporting multiple protocols (RTSP/RTMP/HLS/HTTP-FLV/WebSocket-FLV/GB28181/HTTP-TS/WebSocket-TS/HTTP-fMP4/WebSocket-fMP4/MP4/WebRTC) and protocol conversion.
  
  This extension supports a set of similarity algorithms. The most known algorithms are covered by this extension. You must be aware that each algorithm is suited for a specific domain. The following algorithms are provided.
  
  - Cosine Distance;
  - Dice Coefficient;
  - Euclidean Distance;
  - Hamming Distance;
  - Jaccard Coefficient;
  - Jaro Distance;
  - Jaro-Winkler Distance;
  - L1 Distance (as known as City Block or Manhattan Distance);
  - Levenshtein Distance;
  - Matching Coefficient;
  - Monge-Elkan Coefficient;
  - Needleman-Wunsch Coefficient;
  - Overlap Coefficient;
  - Q-Gram Distance;
  - Smith-Waterman Coefficient;
  - Smith-Waterman-Gotoh Coefficient;
  - Soundex Distance.

- **zotero** [📁](./zotero) [🌐](https://github.com/GerHobbelt/zotero) -- [Zotero](https://www.zotero.org/) is a free, easy-to-use tool to help you collect, organize, cite, and share your research sources.
- **zotero-better-bibtex** [📁](./zotero-better-bibtex) [🌐](https://github.com/GerHobbelt/zotero-better-bibtex) -- Better BibTeX (BBT) is an extension for Zotero and Juris-M that makes it easier to manage bibliographic data, especially for people authoring documents using text-based toolchains (e.g. based on LaTeX / Markdown).
- **zotero-bib** [📁](./zotero-bib) [🌐](https://github.com/GerHobbelt/bib) -- Zotero Translation Client is a library that can process URLs and identifiers (such as ISBN or DOI) into CSL-JSON bibliography items using a translation server.
- **zotero-build** [📁](./zotero-build) [🌐](https://github.com/GerHobbelt/zotero-build) -- Zotero client build scripts.
- **zotero-connectors** [📁](./zotero-connectors) [🌐](https://github.com/GerHobbelt/zotero-connectors) -- Chrome, Firefox, and Safari browser extensions for Zotero.
- **zotero-google-docs-integration** [📁](./zotero-google-docs-integration) [🌐](https://github.com/GerHobbelt/zotero-google-docs-integration) -- a Zotero integration plugin that communicates between Google Docs and Zotero via the Connector.
- **zotero-libreoffice-integration** [📁](./zotero-libreoffice-integration) [🌐](https://github.com/GerHobbelt/zotero-libreoffice-integration) -- comprises extensions for LibreOffice/OpenOffice.org/NeoOffice and Zotero communicating using local web servers.
- **zotero-scholar-citations** [📁](./zotero-scholar-citations) [🌐](https://github.com/GerHobbelt/zotero-scholar-citations) -- an add-on for Zotero. The add-on automatically fetches numbers of citations of your Zotero items from Google Scholar and makes it possible to sort your items by the citations. Moreover, it allows batch updating the citations, as they may change over time.
  
  **When updating multiple citations in a batch, it may happen that citation queries are blocked by Google Scholar for multiple automated requests. If a blockage happens, the add-on opens a browser window and directs it to http://scholar.google.com/, where you should see a Captcha displayed by Google Scholar, which you need to enter to get unblocked and then re-try updating the citations. It may happen that Google Scholar displays a message like the following "*We're sorry... but your computer or network may be sending automated queries. To protect our users, we can't process your request right now.*" In that case, the only solution is to wait for a while until Google unblocks you.**

- **zotero-shortdoi** [📁](./zotero-shortdoi) [🌐](https://github.com/GerHobbelt/zotero-shortdoi) -- an add-on for Zotero. The add-on can auto-fetch DOI names for journal articles using the CrossRef API, as well as look up shortDOI names using http://shortdoi.org. The add-on additionally verifies that stored DOIs are valid and marks invalid DOIs.
- **zotero-standalone-build** [📁](./zotero-standalone-build) [🌐](https://github.com/GerHobbelt/zotero-standalone-build) -- build scripts used to bundle the Zotero core into distributable bundles for Mac, Windows, and Linux.
- **zotero-translate** [📁](./zotero-translate) [🌐](https://github.com/GerHobbelt/translate) -- browser-based standalone zotero translator.
- **zotero-translation-server** [📁](./zotero-translation-server) [🌐](https://github.com/GerHobbelt/translation-server) -- lets you use Zotero translators without the Zotero client.
- **zotero-translators** [📁](./zotero-translators) [🌐](https://github.com/GerHobbelt/translators) -- Zotero Translators : automatically detect journal articles, library records, news items, and other objects you might like to save to your Zotero library. Zotero uses so-called “translators” to detect and import data from websites. There are currently more than 600 different translators, facilitating data import from countless sites.
- **zotero-web-library** [📁](./zotero-web-library) [🌐](https://github.com/GerHobbelt/web-library) -- a Web Library capable of being installed/run on other websites. It is a single-page application implemented in Javascript. It uses Zotero API via CORS requests.
- **zotero-word-for-windows-integration** [📁](./zotero-word-for-windows-integration) [🌐](https://github.com/GerHobbelt/zotero-word-for-windows-integration) -- a Firefox add-on that consists of a library written in C++ that communicates with Microsoft Word out of process using OLE Automation, a js-ctypes wrapper for said library, and a template that is installed into Microsoft Word to communicate with Zotero.
- **zotero-zotfile** [📁](./zotero-zotfile) [🌐](https://github.com/GerHobbelt/zotfile) -- Zotero plugin to manage your attachments: automatically rename, move, and attach PDFs (or other files) to Zotero items, sync PDFs from your Zotero library to your (mobile) PDF reader (e.g. an iPad, Android tablet, etc.), and extract PDF annotations.
- **zpp_bits** [📁](./zpp_bits) [🌐](https://github.com/GerHobbelt/zpp_bits) -- A modern, *fast*, C++20 binary serialization and RPC library, with just one header file.See also the [benchmark](https://github.com/GerHobbelt/zpp_bits#benchmark).
- **zstd** [📁](./zstd) [🌐](https://github.com/GerHobbelt/zstd) -- Zstandard, a.k.a. `zstd`, is a fast lossless compression algorithm, targeting real-time compression scenarios at zlib-level and better compression ratios.
- **zsv** [📁](./zsv) [🌐](https://github.com/GerHobbelt/zsv) -- the world's fastest (SIMD) CSV parser, with an extensible CLI for SQL querying, format conversion and more.
- **zsync2** [📁](./zsync2) [🌐](https://github.com/GerHobbelt/zsync2) -- the advanced file download/sync tool zsync. zsync is a well known tool for downloading and updating local files from HTTP servers using the well known algorithms rsync used for diffing binary files. Therefore, it becomes possible to synchronize modifications by exchanging the changed blocks locally using `Range:` requests. The system is based on meta files called `.zsync` files. They contain hash sums for every block of data. The file is generated from and stored along with the actual file it refers to. Due to how system works, nothing but a "dumb" HTTP server is required to make use of zsync2. This makes it easy to integrate zsync2 into existing systems.
- **zxing-cpp** [📁](./zxing-cpp) [🌐](https://github.com/GerHobbelt/zxing-cpp) -- ZXing-C++ ("zebra crossing") is a multi-format linear/matrix (1D/2D) barcode image processing library implemented in C++. Supported formats include: UPC-A, UPC-E, EAN-8, EAN-13, Code 39, Code 128, QR Code, PDF417, DataMatrix, CodaBar, DataBar, ITF.
- https://github.com/alxvasilev/cpp-promise -- Javascript-like C++ promise library
- https://github.com/arun11299/cpp-subprocess -- as close as possible to Python2.7 `subprocess` module in dealing with processes.
- https://github.com/fxsjy/jieba -- a Chinese text tokenizer (done in Python)
- https://github.com/pnappa/subprocesscpp -- A header-only library that allows you to execute processes either synchronously or asynchronously, whilst providing input and output handling. No more calling `exec` in C++!
- https://github.com/rajatjain1997/subprocess -- A C++ high level library for running shell processes
- https://github.com/rhashimoto/poolqueue -- C++ Asynchronous Promises, inspired by Promises/A+.
- https://github.com/sheredom/subprocess.h -- A one header solution to launching processes and interacting with them for C/C++.
- https://github.com/YACLib/YACLib -- Yet Another lightweight C++ library for concurrent and parallel task execution.
- **Imath** [🌐](https://github.com/AcademySoftwareFoundation/Imath) -- float16 support lib for OpenEXR format
  
  - **optional**; reason: considered *overkill* for the projects I'm currently involved in, including Qiqqa. Those can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.

- **OpenImageIO** [🌐](https://github.com/OpenImageIO/oiio) -- a library for reading, writing, and processing images in a wide variety of file formats, using a format-agnostic API, aimed at VFX applications.
  
  - **tentative/pending**; reason: considered nice & cool but still *overkill*. Qiqqa tooling can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.

- ~~**circlehash** [📁](./circlehash) [🌐](https://github.com/GerHobbelt/circlehash) -- a family of non-cryptographic hash functions that pass every test in SMHasher.~~
  
  - **removed**; reason: written in Go; port to C/C++ is easy but just too much effort for too little gain; when we're looking for *fast* non-cryptographic hashes like this, we don't it to include 128-bit / 64-bit multiplications as those are generally slower than shift, add, xor. While this will surely be a nice hash, it doesn't fit our purposes.

- ~~**cpuinfo** [📁](./cpuinfo) [🌐](https://github.com/GerHobbelt/cpuinfo) -- CPU & hardware info~~
  
  - **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.

- ~~**h2o-server** [📁](./h2o-server) [🌐](https://github.com/GerHobbelt/h2o) -- an optimized HTTP/1, HTTP/2, HTTP/3 server.~~
  
  - **removed**; reason: we've decided on using `crow` as the main server framework. Second choice is `civetweb`. As we're looking for a non-public-facing web server, we don't need h2o and it's complexity.

- ~~**merror** [📁](./merror) [🌐](https://github.com/GerHobbelt/merror) -- a library for error handling in C++ without exceptions.~~
  
  - **removed**; reason: code is non-portable to compilers other than GCC, or at least would require more effort than we're willing to expend on this.

- ~~**binary_bakery** [🌐](https://github.com/s9w/binary_bakery) -- resource compiler-like tool: embed any data in your C/C++ application~~
  
  - **removed**; reason: we already have `bin2coff` from MuPDF, which serves this purpose well enough.

- ~~**bzip2** [🌐](https://github.com/nemequ/bzip2)~~
  
  - **removed**; reason: see `lzo` below. When we want this, we can go through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines.

- ~~**Catch2** [🌐](https://github.com/catchorg/Catch2)~~
  
  - **removed**; reason: we've decided to standardize on a single unittest library (which is well supported in Microsoft Visual Studio, including the Test Explorer view there); where necessary, we'll have to provide a translation layer instead when existing submodules use different test rigs originally.

- ~~**cgohlke::imagecodecs** [🌐](https://github.com/cgohlke/imagecodecs) (*not included; see also DICOM slot above*)~~
- ~~**clippson** [🌐](https://github.com/heavywatal/clippson) -- commandline parser + JSON data diagnostical dumper~~
  
  - **removed**; reason: deemed cool but unsuitable for our needs. Besides, we intend to use `cli11` instead of `clipp` for that library is easier to read and support is more active there.

- ~~**cpu_features** [🌐](https://github.com/google/cpu_features)~~
  
  - **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.

- ~~**cpu_stat** [🌐](https://github.com/vivaladav/cpu-stat)~~
  
  - **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.

- ~~**CPython** [🌐](https://github.com/python/cpython)~~
  
  - **removed**; reason: we've decided to offer any application user facing scripting features in JavaScript only: Python and the others can use socket-based messaging when someone wants to write their user scripts in any of those languages.

- ~~[DICOM to NIfTI](https://github.com/rordenlab/dcm2niix) (*not included; see also DICOM slot above*)~~
- ~~**docopt** [🌐](https://github.com/docopt/docopt.cpp) -- generate documentation for command line options~~
  
  - **removed**; reason: deemed cool but unsuitable for our needs. We intend to use `cli11` instead.

- ~~**EasyLogger** [🌐](https://github.com/armink/EasyLogger) -- an ultra-lightweight (ROM<1.6K, RAM<0.3K), high-performance C/C++ log library, very suitable for resource-sensitive software projects. Compared with the well-known C/C++ log libraries such as log4c and zlog, EasyLogger has simpler functions and provides fewer interfaces to users, but it will be quick to get started. More practical functions support dynamic expansion in the form of plug-ins.~~
  
  - **removed**; reason: we've decided on using `glog` as the logging library for everything: while that one isn't perfect, most of the other stuff we've been looking at is using that one already and it matches our needs 80% of the time, while I'm okay with patching that library for the other 20% (syslog-like use, i.e. logging to localhost logging server where all logging is collected -- these log messages should travel across as part of the ZeroMQ message streams.)

- ~~**FastBinaryEncoding** [🌐](https://github.com/chronoxor/FastBinaryEncoding)~~
  
  - **removed**; reason: for binary format record serialization we will be using `bebop` exclusively. All other communications will be JSON/JSON5/XML based.

- ~~**flatbuffers** [🌐](https://github.com/google/flatbuffers)~~
  
  - **removed**; reason: see `protobuf`: same smell rising. Faster at run time, but still a bit hairy to my tastes while `bebop` et al are on to something *potentially nice*.

- ~~**flatcc** [🌐](https://github.com/dvidelabs/flatcc)~~
  
  - **removed**; reason: see `flatbuffers`. When we don't dig `flatbuffers`, then `flatcc` is automatically pretty useless to us. Let's rephrase that professionally: "`flatcc` has moved out of scope for our project."

- ~~**GDCM-Grassroots-DICOM** [🌐](https://github.com/malaterre/GDCM)~~
  
  - **removed**; reason: not a frequently used format; the filter codes can be found in other libraries. *Overkill*. Qiqqa tooling can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.

- ~~**gmime** [🌐](https://github.com/jstedfast/gmime) (alternative repo [here](https://github.com/GNOME/gmime)) -- multipart MIME library; serves as a fundamental building block for full MHTML file format I/O support~~
  
  - **removed**; reason: GNOME libraries are horrible to integrate with other codebases.

- ~~**HDF5** [🌐](https://github.com/HDFGroup/hdf5)~~
  
  - **removed**; reason: HDF5 is a nice concept but considered *overkill* right now; where we need disk stores, we'll be using SQLite or LMDB-like key-value stores instead. Such stores are not meant to be interchangeable with other software in their raw shape and we'll provide public access APIs instead, where applicable.

- ~~**HighFive-HDF5** [🌐](https://github.com/BlueBrain/HighFive)~~
  
  - **removed**; reason: see the `HDF5` entry above.

- ~~**ice** [🌐](https://github.com/zeroc-ice/ice) -- Comprehensive RPC Framework: helps you network your software with minimal effort.~~
  
  - **removed**; reason: has a strong focus on the *remote*, i.e. `R` in `RPC` (thus a focus on things such as encryption, authentication, firewalling, etc.), which we don't want or need: all services are supposed to run on a single machine and comms go through `localhost` *only*. When folks find they need to distribute the workload across multiple machines, then we'll be entering a new era in Qiqqa usage and then will be soon enough to (re-)investigate the usefulness of this package.

- ~~**inih** [🌐](https://github.com/benhoyt/inih)~~
  
  - **removed**; reason: we've decided on using `libconfig` for configuration files.

- ~~**iniparser** [🌐](https://github.com/ndevilla/iniparser)~~
  
  - **removed**; reason: we've decided on using `libconfig` for configuration files.

- ~~**libmicrohttpd** [🌐](https://github.com/Karlson2k/libmicrohttpd)~~
  
  - **removed**; reason: we've decided on using `crow` as the main server framework. Second choices are `civetweb` and `h2o`. This GNU library is way too 'Unix-is-the-world' oriented for a smooth portable dev experience.

- ~~**libsmile** [🌐](https://github.com/pierre/libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format~~
  
  - **removed**; reason: for binary format record serialization we will be using `bebop` exclusively. All other communications will be JSON/JSON5/XML based.

- ~~**log4cplus** [🌐](https://github.com/log4cplus/log4cplus)~~
  
  - **removed**; reason: we've decided on using `glog` as the logging library for everything. log4cplus, at the same time, is a tad too much. (I consider `log4j` et al *overdone* as it caters to every need instead of just providing those things as contrib code which can be integrated at need -- should not be as far run-time configurable as it currently is.)

- ~~**lua** [🌐](https://github.com/lua/lua)~~
  
  - **removed**; reason: we've decided to offer any application user facing scripting features in JavaScript only: Python and the others can use socket-based messaging when someone wants to write their user scripts in any of those languages. See also the `CPython` entry.

- ~~**luaJIT** [🌐](https://github.com/LuaJIT/LuaJIT)~~
  
  - **removed**; reason: see the `lua` entry above.

- ~~**lzo** [🌐](https://github.com/nemequ/lzo)~~
  
  - **removed**; reason: gone as part of the first round of compression libraries' cleanup: we intend to support lz4 for fast work, plus zstd and *maybe* brotli for higher compression ratios, while we won't bother with anything else: the rest can be dealt with through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines when we need to read (or write) them. See also: [7zip-Zstd](https://github.com/mcmilk/7-Zip-zstd), which is what I use for accessing almost all compressed material anywhere.

- ~~**lzsse** [🌐](https://github.com/ConorStokes/LZSSE)~~
  
  - **removed**; reason: see `lzo` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...

- ~~**oatpp** [🌐](https://github.com/oatpp/oatpp) -- IPC / server framework~~
  
  - **removed**; reason: see `crow`. We have picked `crow` as the preferred way forward, so any similar/competing product is out of scope unless `crow` throws a tantrum on our test bench after all, the chances of that being *very slim*.

- ~~**pithy** [🌐](https://github.com/johnezang/pithy)~~
  
  - **removed**; reason: see `lzo` above. LZ4 either overtakes this one or is on par (anno 2022 AD) and I don't see a lot happening here, so the coolness factor is slowly fading...

- ~~**spdlog** [🌐](https://github.com/gabime/spdlog)~~
  
  - **removed**; reason: we've decided on using `glog` as the logging library for everything. `spdlog` has some nice features but in the end it was ease of cross-platform compilation and installed base that won out here...

- ~~**xz-utils** [🌐](https://github.com/xz-mirror/xz)~~
  
  - **removed**; reason: see `lzo2` above. When we want this, we can go through [Apache Tika](https://tika.apache.org/) or other thirdparty pipelines.

- ~~**zlog** [🌐](https://github.com/HardySimpson/zlog)~~
  
  - **removed**; `zlog` has a nice overall design but is too 'Unix-is-the-world' in its coding: in the end it was ease of cross-platform compilation of `glog` that won the day and I'm okay with layering on top of that one to get the zlog category and other channel features, once I really need them.






---













# TBD: Libraries which still need to be moved into the overview / categories above...

- **AFLplusplus** [📁](./AFLplusplus) [🌐](https://github.com/GerHobbelt/AFLplusplus) -- American Fuzzy Lop plus plus (AFL++) is a superior fork to Google's AFL fuzzer - more speed, more and better mutations, more and better instrumentation, custom module support, etc.
- **agg** [📁](./agg) [🌐](https://github.com/GerHobbelt/agg) -- Anti-Grain Geometry library, written by Maxim Shemanarev in C++. It is an Open Source, 2D vector graphics library. Agg produces pixel images in memory from vectorial data. AGG doesn't depend on any graphic API or technology. Basically, you can think of AGG as of a rendering engine that produces pixel images in memory from some vectorial data.
- **awesome-c** [📁](./awesome-c) [🌐](https://github.com/GerHobbelt/awesome-c) -- a curated list of C good stuff.
- **cfgpath** [📁](./cfgpath) [🌐](https://github.com/GerHobbelt/cfgpath) -- cross platform methods for obtaining paths to configuration files
- **cjose** [📁](./cjose) [🌐](https://github.com/GerHobbelt/cjose) -- JOSE for C/C++
- **detect-character-encoding** [📁](./detect-character-encoding) [🌐](https://github.com/GerHobbelt/detect-character-encoding) -- detect character encoding using [ICU](http://site.icu-project.org).  **Tip:** If you don’t need ICU in particular, consider using [ced](https://github.com/sonicdoe/ced), which is based on Google’s lighter [compact_enc_det](https://github.com/google/compact_enc_det) library.
- **fnmatch** [📁](./fnmatch) [🌐](https://github.com/GerHobbelt/fnmatch)
- **gegl** [📁](./gegl) [🌐](https://github.com/GerHobbelt/gegl) -- *GEGL* (Generic Graphics Library) is a data flow based image processing framework, providing floating point processing and non-destructive image processing capabilities to [GNU Image Manipulation Program](http://www.gimp.org/) and other projects. With GEGL you chain together processing operations to represent the desired image processing pipeline. GEGL provides operations for image loading and storing, color adjustments, GIMPs artistic filters and more forms of image processing GEGL can be used on the command-line with the same syntax that can be used for creating processing flows interactively with text from GIMP using gegl-graph.
- **libkra** [📁](./libkra) [🌐](https://github.com/GerHobbelt/libkra) -- a C++ library for importing Krita's KRA & KRZ formatted documents.
- **libmodbus** [📁](./libmodbus) [🌐](https://github.com/GerHobbelt/libmodbus) -- a groovy modbus library to send/receive data with a device which respects the Modbus protocol. This library can use a serial port or an Ethernet connection. The functions included in the library have been derived from the Modicon Modbus Protocol Reference Guide which can be obtained from [www.modbus.org](http://www.modbus.org).
- **liboauth2** [📁](./liboauth2) [🌐](https://github.com/GerHobbelt/liboauth2) -- a library to build C-based OAuth 2.x and OpenID Connect servers and clients e.g. web-server plugins; extends cjose into OAuth 2.x and OpenID Connect specific claims, secrets, and hashes; adds OAuth 2.x and OpenID Connect protocols by abstracting HTTP requests and responses from web server implementation specifics.
- **libpathutils** [📁](./libpathutils) [🌐](https://github.com/GerHobbelt/libpathutils) -- cross-platform filesystem path utility functions
- **libpipeline** [📁](./libpipeline) [🌐](https://github.com/GerHobbelt/libpipeline) -- libpipeline, a pipeline manipulation library for setting up and running pipelines of processes, without needing to involve shell command-line parsing which is often error-prone and insecure.  This alleviates programmers of the need to laboriously construct pipelines using lower-level primitives such as fork(2) and execve(2).
- **libserialport** [📁](./libserialport) [🌐](https://github.com/GerHobbelt/libserialport) -- a cross-platform library for accessing serial ports. libserialport is a minimal library written in C that is intended to take care of the OS-specific details when writing software that uses serial ports.
- **linecook** [📁](./linecook) [🌐](https://github.com/GerHobbelt/linecook) -- a C library for editing the command line, much like the [readline](https://tiswww.cwru.edu/php/chet/readline/readline.html) library used in <b>bash</b> and <b>gdb</b>.
- **lshbox** [📁](./lshbox) [🌐](https://github.com/GerHobbelt/LSHBOX) -- a C++ Toolbox of Locality-Sensitive Hashing for Large Scale Image Retrieval. Locality-Sensitive Hashing (LSH) is an efficient method for large scale image retrieval, and it achieves great performance in approximate nearest neighborhood searching.
  
  LSHBOX is a simple but robust C++ toolbox that provides several LSH algrithms, in addition, it can be integrated into Python and MATLAB languages. The following LSH algrithms have been implemented in LSHBOX, they are:
  
  * LSH Based on Random Bits Sampling
  * Random Hyperplane Hashing
  * LSH Based on Thresholding
  * LSH Based on p-Stable Distributions
  * [Spectral Hashing](http://www.cs.huji.ac.il/~yweiss/SpectralHashing/) (SH)
  * [Iterative Quantization](http://www.unc.edu/~yunchao/itq.htm) (ITQ)
  * Double-Bit Quantization Hashing (DBQ)
  * K-means Based Double-Bit Quantization Hashing (KDBQ)
  

- **modbus-esp8266** [📁](./modbus-esp8266) [🌐](https://github.com/GerHobbelt/modbus-esp8266) -- a Modbus Library for Arduino. Supports ModbusRTU, ModbusTCP and ModbusTCP Security.
- **nano-signal-slot** [📁](./nano-signal-slot) [🌐](https://github.com/GerHobbelt/nano-signal-slot) -- pure C++17 Signals and Slots (observer pattern)
- **radamsa** [📁](./radamsa) [🌐](https://github.com/GerHobbelt/radamsa) -- Radamsa is a test case generator for robustness testing, a.k.a. a fuzzer. It is typically used to test how well a program can withstand malformed and potentially malicious inputs. It works by reading sample files of valid data and generating interestingly different outputs from them. The main selling points of radamsa are that it has already found a slew of bugs in programs that actually matter, it is easily scriptable and easy to get up and running.
- **rapidxml** [📁](./rapidxml) [🌐](https://github.com/GerHobbelt/rapidxml) -- RapidXML is an ancient C++ library for parsing XML quickly and flexibly.
- **spdmon** [📁](./spdmon) [🌐](https://github.com/GerHobbelt/spdmon) -- a progress monitor based on spdlog library. In just one function call visualize your loop progress!
- **tee-win32** [📁](./tee-win32) [🌐](https://github.com/GerHobbelt/tee-win32) -- a simple [**`tee`**](https://en.wikipedia.org/wiki/Tee_(command)) implementation for Microsoft Windows.
- **tray** [📁](./tray) [🌐](https://github.com/GerHobbelt/tray) -- cross-platform, single header, super tiny C99 implementation of a system tray icon with a popup menu.
- **utf8proc** [📁](./utf8proc) [🌐](https://github.com/GerHobbelt/utf8proc) -- [utf8proc](http://juliastrings.github.io/utf8proc/) is a small, clean C library that provides Unicode normalization, case-folding, and other operations for data in the [UTF-8 encoding](http://en.wikipedia.org/wiki/UTF-8).
- **wcwidth9** [📁](./wcwidth9) [🌐](https://github.com/GerHobbelt/wcwidth9) -- platform independent, header only, `wcwidth` with full Unicode 9 wide character support.
