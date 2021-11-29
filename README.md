# owemdjee

Data Science &amp; Image Processing amalgam library in C/C++.

This place is a gathering spot & integration workplace for the C & C++ libraries we choose to use.  Think "Façade Pattern' and you're getting warm. :wink:
The heavy data lifting will be done in the referenced libraries, while this lib will provide some glue and common ground for them to work in/with.


## Reason for this repo

`git submodules` hasn't been the most, ah, "user-friendly" methods to track and manage a set of libraries that you wish to track at *source level*.

A few problems have been repeatedly observed over our lifetime with `git`:

- when it so happens that the importance & interest in a submoduled library is perhaps waning and you want to migrate to another, you can of course invoke `git` to ditch the old sow aand bring in the shiny new one, but that stuff gets quite finicky when you are pedalling back & forth through your commit tree when, e.g. bughunting or maintenance work on a release branch which isn't up to snuff with the fashion kids yet. 

  Yup, that's been much less of a problem since about 2018, but old scars need more than a pat on the arm to heal, if you get my drift.
  
- folks haven't always been the happy campers they were supposed to be when they're facing a set of submodules and want to feel safe and sure in their "knowledge" that each library X is at commit Y, when the top off the module tree is itself at commit Z, for we are busy producing a production release, perhaps? That's a wee bit stressful and there have beeen enough "flukes" with git to make that a not-so-ironclad-as-we-would-like position. 

  Over time, I've created several bash shell scripts to help with that buzzin' feelin' of *absolute certainty*. Useful perhaps, but the cuteness of those wears off pretty darn quickly when many nodes in the submodule tree start cluttering their git repo with those.

  
### And?

This repo is made to ensure we have a single point of reference for all the data munching stuff, at least.

We don't need to `git submodule add` all those data processing libs in our applications this way, as this is a single submodule to bother that project with. The scripts and other material in here will provide the means to ensure your build and test tools can quickly and easily ensure that everyone in here is at the commit spot they're supposed to be.

And when we want to add another lib about data/image processing, we do that in here, so the application-level git repo sees a very stable singular submodule all the time: this repo/lib, not the stuff that will change over time as external libs gain and loose momentum over time. (We're talking multiyear timespans here!)


### Critique?

It's not the most brilliant solution to our problems, as this, of course, becomes a single point of failure that way, but experience in the past with similar "solutions" has shown that it's maybe not always fun, but at least we keep track of the management crap in one place and that was worth it, every time.

And why not do away with `git submodule` entirely and use packages instead? Because this stuff is important enough that *other, quite painful experience* has shown us that (binary) packages are a wonder and a hassle too: I'ld rather have my code tracked and tagged at source level **all the way** because that has reduced several bug situations from man-*weeks* to man-*hours*: like Gentoo, compile it all, one compiler only.  Doesn't matter if the bug is in your own code or elsewhere, there are enough moments like that where one is helped enormously by the ability to step through *and possibly tweak a bit of code here or there temporarily to help the debugging process* that I, at least, prefer full source code.

And that's what this repo is here to provide: the source code gathered and ready for use on our machines.

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
  + "A.I."-assisted tooling to help process and *clean* PDFs: cover pages, abstract/summary extraction for meta-research, etc. (think ngrams, xdelta, SVM, tensors, author identification, document categorization, document similarity / \[*near-]duplicate / revision detection, tagging, ...)
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


### Libraries we're looking at for this *intent*:

- IPC: flatbuffer et al for protocol design:
    - [bebop](./bebop)
    - [FastBinaryEncoding](./FastBinaryEncoding)
    - ~~[flatbuffers](./flatbuffers)~~
      + **removed**; reason: see `protobuf`: same smell rising. Faster at run time, but still a bit hairy to my tastes while `bebop` et al are on to something *potentially nice*.
    - ~~[flatcc](./flatcc)~~
      + **removed**; reason: see `flatbuffers`. When we don't dig `flatbuffers`, then `flatcc` is automatically pretty useless to us. Let's rephrase that professionally: "`flatcc` has moved out of scope for our project."
    - [cereal](./cereal) -- C++11 serialization library
    - [libzmq](./libzmq)
    - [cppzmq](./cppzmq)
    - [libcppzmq](../libcppzmq)
    - [libCZMQ](../libCZMQ)
    - [libsmile](./libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format
    - ~~[protobuf](./protobuf)~~
      + **removed**; reason: relatively slow run-time and (in my opinion) rather ugly & convoluted approach at build time. Has too much of a Java/CorprorateProgramming smell, which has not lessened over the years, unfortunately.
- IPC: websockets, etc.: all communication means
    - [libwebsocketpp](./libwebsocketpp)
    - [libwebsockets](./libwebsockets)
    - [websocket-sharp](./websocket-sharp)
    - [OpenSSL](./openssl) -- also used by CURL et al, incidentally.
    - [crow](./crow) -- IPC / server framework 
     
      Interface looks nicer than `oatpp`...
    - ~~[oatpp](./oatpp) -- IPC / server framework~~
      + **removed**; reason: see `crow`. We have picked `crow` as the preferred way forward, so any similar/competing product is out of scope unless `crow` throws a tantrum on our test bench after all, the chances of that being *very slim*.
    - ~~[ice](./ice) -- Comprehensive RPC Framework: helps you network your software with minimal effort.~~
      + **removed**; reason: has a strong focus on the *remote*, i.e. `R` in `RPC` (thus a focus on things such as encryption, authentication, firewalling, etc.), which we don't want or need: all services are supposed to run on a single machine and comms go through `localhost` *only*. When folks find they need to distribute the workload across multiple machines, then we'll be entering a new era in Qiqqa usage and then will be soon enough to (re-)investigate the usefulness of this package.
      
        Also, we are currently more interested in *fast data serialization* then RPC *pre se* as we aim for a solution that's more akin to a REST API interface style.
- IPC: JSON for protocol design:
    - [json](./json)
    - [json-jansson](./json-jansson)
    - [rapidJSON](./rapidJSON)
    - [yyjson](./yyjson)
    - [libsmile](./libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format
- content hashing
    - [BLAKE3](./BLAKE3) -- cryptographic hash
    - [cryptopp](./cryptopp) -- crypto library
    - [sparsehash](./sparsehash) -- fast (non-cryptographic) hash algorithms
    - [xxHash](./xxHash) -- fast (non-cryptographic) hash algorithm
- intermediate data storage / caching / hierarchical data stores (binary hOCR; document text revisions; ...) 
    - [c-blosc2](./c-blosc2)
    - [h5cpp-HDF5](./h5cpp-HDF5)
    - [HDF5](./HDF5)
    - [HighFive-HDF5](./HighFive-HDF5)
    - RAM-/disk-based large queues and stores: B+tree, LSM-tree, ...
        + [cpp-btree](../cpp-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
        + [tlx-btree](./tlx-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
        + [Lightning.NET](./Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
        + [lmdb-safe](./lmdb-safe)
        + [lmdb-store](./lmdb-store)
        + [lmdb.spreads.net](./lmdb.spreads.net)
        + [lmdb](./lmdb)
        + [lmdbxx](./lmdbxx) -- LMDB C++ wrapper
        + [palmtree](./palmtree) -- concurrent lock free B+Tree
        + [parallel-hashmap](./parallel-hashmap) -- a set of hash map implementations, as well as a btree alternative to std::map and std::set
        + [ligra-graph](./ligra-graph)
        + [libmdbx](./libmdbx)
- data storage / caching / IPC: loss-less data compression
    - [lz4](./lz4)
    - [lzsse](./lzsse)
    - [lizard](./lizard)
    - [pithy](./pithy)
    - [snappy](./snappy)
    - [lzo](./lzo)
    - [xz-utils](./xz-utils)
    - [fast-lzma2](./fast-lzma2)
    - [zstd](./zstd)
    - [squash](./squash)
    - [libzip](./libzip)
    - see also [lzbench](https://github.com/inikep/lzbench)
    - [brotli](../brotli) -- compression
    - [bzip2](./bzip2)
    - [shoco](./shoco) -- a fast compressor for short strings
- OCR: hOCR output format, other output format? (dedicated binary?)
    - [hocr-fileformat](./hocr-fileformat)
    - [hocr-spec](./hocr-spec)
    - [hocr-tools](./hocr-tools)
- pattern recognition: "A.I." for cover pages, image/page *segmentation*, including abstract & summary demarcation, "figure" and "table" detection & extraction from documents, ...
    - [dlib](./dlib) -- machine learning algorithms
        - [lapack](./lapack) -- [CBLAS](http://www.netlib.org/blas/) + [LAPACK](http://www.netlib.org/lapack/index.html) optimized linear algebra libs
    - [libsvm](./libsvm)
    - [thunderSVM](./thunderSVM)
    - [math-atlas](./math-atlas)
    - [MITIE-nlp](./MITIE-nlp)
    - [mlpack](./mlpack)
    - [pytorch](./pytorch) -- PyTorch library in C++
    - [xtensor](./xtensor)
    - [xtensor-blas](./xtensor-blas)
    - [xtensor-io](./xtensor-io)
    - [xsimd](./xsimd) -- xtensor core library
    - [xtl](./xtl) -- xtensor core library
    - [clBLAS](./clBLAS)
    - [ncnn](./ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
    - text tokenization, i.e. breaking text into words when you receiveatextstreamwithoutspaces. Also useful for Asian languages, which don't do spaces, e.g. Chinese.
        + [sentencepiece](./sentencepiece) -- text tokenization
        + [sentence-tokenizer](./sentence-tokenizer) -- text tokenization
        + [you-token-to-me](./you-token-to-me) -- text tokenization
        + [libtextcat](./libtextcat) -- text language detection
        + [ucto](./ucto) -- text tokenization
            * [uctodata](./uctodata) -- data for `ucto` library
            * [libfolia](./libfolia)
        + [fastBPE](./fastBPE) -- text tokenization / ngrams
    - GMM/HMM/kM: fit patterns, e.g. match & transform a point cloud or image onto a template --> help matching pages against banner templates, etc. as part of the OCR/recognition task.
        + [GMMreg](./GMMreg) -- implementations of the robust point set registration framework described in the paper "[Robust Point Set Registration Using Gaussian Mixture Models](https://github.com/bing-jian/gmmreg/blob/master/gmmreg_PAMI_preprint.pdf)", Bing Jian and Baba C. Vemuri, IEEE Transactions on Pattern Analysis and Machine Intelligence, 2011, 33(8), pp. 1633-1645. An earlier conference version of this work, "A Robust Algorithm for Point Set Registration Using Mixture of Gaussians, Bing Jian and Baba C. Vemuri.", appeared in the proceedings of ICCV'05.
        + [liblinear](./liblinear)
        + [hmm-scalable](./hmm-scalable)
        + [hmm-stoch](./hmm-stoch)
        + [GMM-HMM-kMeans](./GMM-HMM-kMeans)
    - [yara-pattern-matcher](./yara-pattern-matcher) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks
    - *delta features* & other feature extraction (see Qiqqa research notes)
        + [dtl-diff-template-library](./dtl-diff-template-library)
        + [google-diff-match-patch](./google-diff-match-patch)
        + [HDiffPatch](./HDiffPatch)
        + [yara-pattern-matcher](./yara-pattern-matcher)
        + [lz4](./lz4)
- regex matchers (manual edit - pattern recognition)
    * [hyperscan](./hyperscan) -- Hyperscan is a high-performance multiple regex matching library.
    * [re2](./re2)
    * [tre](./tre)
- OCR: quality improvements, language detect, ...
    - [hunspell](./hunspell)
    - [hunspell-hyphen](./hunspell-hyphen)
    - [libtextcat](./libtextcat) -- text language detection
- OCR page image preprocessing, \[scanner] tooling: getting the pages to the OCR engine
    - [GraphicsMagick](./GraphicsMagick)
    - [ImageMagick](./ImageMagick)
    - [jasper](./jasper) -- JasPer Image Processing/Coding Tool Kit
    - [lcms2](../lcms2)
    - [leptonica](../leptonica)
    - [libvips](./libvips)
    - [olena](./olena)
    - [opencv](./opencv)
    - [opencv_contrib](./opencv_contrib)
- image export, image / \[scanned] document import
    - [jbig2dec](../jbig2dec)
    - [jpeginfo](../jpeginfo)
    - [libjpeg](../libjpeg)
    - [libpng](../libpng)
    - [libtiff](../libtiff)
    - [openjpeg](../openjpeg)
    - [OpenEXR](./OpenEXR) -- lossless format for multi-layered images. Professional use. (I've used it before; nice file format.)
        + [Imath](./Imath) -- float16 support lib for OpenEXR format
    - [OpenImageIO](./OpenImageIO)
    - [jpeg-xl](https://gitlab.com/wg1/jpeg-xl) - \[DROPPED: nobody is using it yet, while I am more interested in high perf **lossless** formats for internal communications and storage]
    - [libgif](./libgif)
    - [libjpeg-turbo](./libjpeg-turbo)
    - [libwebp](./libwebp)
    - [GDCM-Grassroots-DICOM](./GDCM-Grassroots-DICOM)
    - [pmt-png-tools](./pmt-png-tools)
    - [DICOM to NIfTI](https://github.com/rordenlab/dcm2niix) (*not included yet*)
    - [cgohlke::imagecodecs](https://github.com/cgohlke/imagecodecs) (*not included yet*)
    - [image formats (visual) quality comparison](https://eclipseo.github.io/image-comparison-web/) (*not included*)
- Monte Carlo simulations, LDA, keyword inference/extraction, etc.
    - [lda-bigartm](./lda-bigartm)
    - [lda-Familia](./lda-Familia)
    - [lda](./lda) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
    - [LightLDA](./LightLDA)
    - [mcmc](./mcmc) -- Monte Carlo
    - [mipp](./mipp)
    - [mmc](./mmc) -- Monte Carlo
    - [OptimizationTemplateLibrary](./OptimizationTemplateLibrary) -- Optimization Template Library (OTL)
    - [pcg-c-random](./pcg-c-random) -- fast random generators
    - [ncnn](./ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
    + text tokenization (as a preprocessing step for LDA et al):
        + [sentencepiece](./sentencepiece) -- text tokenization
        + [sentence-tokenizer](./sentence-tokenizer) -- text tokenization
        + [you-token-to-me](./you-token-to-me) -- text tokenization
        + [libtextcat](./libtextcat) -- text language detection
        + [ucto](./ucto) -- text tokenization
            * [uctodata](./uctodata) -- data for `ucto` library
            * [libfolia](./libfolia)
        + [fastBPE](./fastBPE) -- text tokenization / ngrams
        + [many-stop-words](./many-stop-words)
        + [stopwords](./stopwords)
    + other *topic modeling* code on the Net:
        * [Hierarchical Dirichlet Process (with Split-Merge Operations), Chong Wang](https://github.com/renaud/hdp-faster)
        * [Hierarchical Latent Tree Analysis (HLTA)](https://github.com/kmpoon/hlta)
        * [Leonard Poon - various works]](https://github.com/kmpoon?tab=repositories)
        * [David Blei's list of topic modeling OSS software](http://www.cs.columbia.edu/~blei/topicmodeling_software.html) + [github repo list](https://github.com/blei-lab)
- database "backend storage"
    - [sqlite](./sqlite)
    - [sqlite-amalgamation](./sqlite-amalgamation)
    - [lib_nas_lockfile](./lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
    - [otl](../otl) -- Oracle Template Library (STL-like wrapper for SQL DB queries; supports many databases besides Oracle)
    - [Lightning.NET](./Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
    - [lmdb-safe](./lmdb-safe)
    - [lmdb-store](./lmdb-store)
    - [lmdb.spreads.net](./lmdb.spreads.net)
    - [lmdb](./lmdb)
    - [lmdbxx](./lmdbxx) -- LMDB C++ wrapper
    - [ligra-graph](./ligra-graph)
    - [libmdbx](./libmdbx)
- metadata & text (OCR et al): language detect, suggesting fixes, ...    
    - [libtextcat](./libtextcat) -- text language detection
    - [sentence-tokenizer](./sentence-tokenizer) -- text tokenization
    - [sentencepiece](./sentencepiece) -- text tokenization
    - [unicode-cldr](./unicode-cldr)
    - [unicode-icu](./unicode-icu)
    - [you-token-to-me](./you-token-to-me) -- text tokenization
    - [ucto](./ucto) -- text tokenization
        + [uctodata](./uctodata) -- data for `ucto` library
        + [libfolia](./libfolia)
    - [fastBPE](./fastBPE) -- text tokenization / ngrams
    - see also https://github.com/fxsjy/jieba for a Chinese text tokenizer (done in Python)
- PDF metadata editing for round-trip annotation and other "external application editing" of known documents; metadata embedding / *export*
    - [libexpat](./libexpat)
    - [libxml2](./libxml2)
    - [xml-pugixml](./xml-pugixml)
    - [XMP-Toolkit-SDK](./XMP-Toolkit-SDK)
- web scraping (document extraction, cleaning, metadata extraction, BibTeX, ...) 
    - see investigation notes in Qiqqa docs
    - [curl](../curl)
    - [extract](../extract)
    - [libidn2](./libidn2) -- international domain name parsing
    - [gumbo-parser](../gumbo-parser) -- HTML parser
    - [gumbo-libxml](./gumbo-libxml)
    - [http-parser](./http-parser)
    - [picohttpparser](./picohttpparser)
    - [xml-pugixml](./xml-pugixml)
    - [libexpat](./libexpat)
    - [libxml2](./libxml2) -- [libxml](http://xmlsoft.org/)
    - [gumbo-query](./gumbo-query) -- HTML DOM access in C/C++
    - [tidy-html5](./tidy-html5)
    - [url](./url) -- URI parsing and other utility functions
- file format support
    - [file](./file) -- `file` filetype recognizer tool & mimemagic 
    - [djvulibre](./djvulibre)
    - [extract](../extract)
    - ~~[gmime](./gmime) -- multipart MIME library; serves as a fundamental building block for full MHTML file format I/O support~~
      + **removed**; reason: GNOME libraries are horrible to integrate with other codebases
    - [gumbo-libxml](./gumbo-libxml)
    - [gumbo-parser](../gumbo-parser)
    - [gumbo-query](./gumbo-query) -- HTML DOM access in C/C++
    - [http-parser](./http-parser)
    - [libarchive](./libarchive)
    - [libcmime](../libcmime) -- MIME extract/insert/encode/decode: use for MHTML support
    - [libexpat](./libexpat)
    - [libxml2](./libxml2) -- [libxml](http://xmlsoft.org/)
    - [libzip](./libzip)
    - [CHM lib](./CHM-lib) -- as I have several HTML pages stored in this format. See also MHTML: `mht-rip`
    - [mht-rip](./mht-rip) -- as I have several HTML pages stored in this MHTML format. See also CHM: `CHM-lib`
    - [mime-mega](../mime-mega) -- MIME extract/insert/encode/decode: use for MHTML support
    - [mimetic](./mimetic) -- MIME: use for MHTML support
    - [picohttpparser](./picohttpparser)
    - [tidy-html5](./tidy-html5) -- clean up HTML documents before archiving/processing
    - [xml-pugixml](./xml-pugixml)
    - [upskirt-markdown](./upskirt-markdown) -- MarkDown renderer
        - [svg-charter](./svg-charter) -- SVG chart renderer
            - [tinyexpr](./tinyexpr)
- BibTeX and similar library formats' support
    - [bibtex-robust-decoder](./bibtex-robust-decoder)
    - [bibutils](./bibutils)
- export / output file formats, etc.
    - [libqrencode](./libqrencode) -- generate QRcodes from anything (e.g. URLs)
    - [fmt](./fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
    - [upskirt-markdown](./upskirt-markdown) -- MarkDown renderer
        - [svg-charter](./svg-charter) -- SVG chart renderer
            - [tinyexpr](./tinyexpr)
- scripting *user-tunable tasks* such as OCR preproceessing, metadata extraction, metadata cleaning & other \[post-]processing, ...
    - [mujs](../mujs)
    - [CPython](./CPython)
    - [ECMA262](./ECMA262)
    - [lua](./lua)
    - [luaJIT](./luaJIT)
    - [QuickJS](./QuickJS)
        - [txiki](./txiki.js) -- uses QuickJS as its kernel
        - [QuickJS-C++-Wrapper](./QuickJS-C++-Wrapper)
        - [libbf](../libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
    - [replxx](./replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
    - [linenoise](./linenoise)
    - [ScriptX](./ScriptX/) -- wrapper for V8, QuickJS, Lua, Python, ...
- multi-processing core technologies
    - [cli11](./cli11) -- command line options parser
    - [clipp](./clipp) -- commandline parser 
    - [clippson](./clippson) -- commandline parser + JSON data diagnostical dumper
    - [cpu_features](./cpu_features)
    - [cpu_stat](./cpu_stat)
    - [cpuinfo](./cpuinfo) -- CPU & hardware info
    - [createprocess-windows](./createprocess-windows) -- drive `CreateProcess` Win32 API
    - [docopt](./docopt) -- generate documentation for command line options
    - [expected-lite](./expected-lite)
    - [fmt](./fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
    - [frozen](./frozen)
    - [hedley](./hedley)
    - [libcpuid](./libcpuid) -- CPU & hardware info
    - [libscanf](./libscanf)
    - [libtuv](./libtuv)
    - [libunifex](./libunifex)
    - [libzmq](./libzmq) -- ZeroMQ
    - [cppzmq](./cppzmq)
    - [libcppzmq](../libcppzmq)
    - [libCZMQ](../libCZMQ)
    - [magic_enum](./magic_enum)
    - [messagebox-windows](./messagebox-windows) -- drive `MessageBox` and `MessageBeep` Win32 APIs
    - [oneTBB](./oneTBB) -- Intel's Thread Building Blocks library: used with OpenImageIO, ...
    - [pcg-c-random](./pcg-c-random) -- fast random generators
    - [plf_nanotimer](./plf_nanotimer) -- high precision cross-platform performance timer
    - [pthread-win32](./pthread-win32)
    - [spy-build-sysinfo](./spy-build-sysinfo) -- build system info
    - [stdext-path](./stdext-path) -- path manipulations (`dirname` et al)
    - [subprocess](./subprocess)
    - [taskflow](./taskflow)
    - [thread-pool-c](./thread-pool-c)
    - [thread-pool-cpp](./thread-pool-cpp)
    - [thread-pool](./thread-pool)
    - [tiny-process-library](./tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
- hashing, hash-like filters
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
    + [sparsehash](./sparsehash) -- fast hash algorithms
    + [xxHash](./xxHash) -- fast hash algorithm
- web servers, generic sockets I/O (IPC)
    + [civetweb](./civetweb)
    + [crow](./crow) -- IPC / server framework
    + [drogon](./drogon)
    + [h2o-server](./h2o-server)
    + [libmicrohttpd](./libmicrohttpd)
    + [oatpp](./oatpp) -- IPC / server framework
    + [proxygen](./proxygen)
    + [wget](./wget)
- socket I/O: websockets
    - [libwebsocketpp](./libwebsocketpp)
    - [libwebsockets](./libwebsockets)
    - [websocket-sharp](./websocket-sharp)
- disk I/O, monitoring import locations, ...
    + [efsw](./efsw) -- cross-platform file system watcher and notifier
    + [glob](./glob) -- directory scanner
- configuration / parameterization 
    + [gflags](./gflags) -- google::flags library, used by other libs in this set.
    + [inih](./inih)
    + [iniparser](./iniparser)
    + [libconfig](../libconfig) -- generic config (file) reader/writer
    + [libyaml](./libyaml) -- YAML
    + [tomlpp](../tomlpp) -- TOML++
- testing & fuzzing
    - [googletest](./googletest)
    - [gbenchmark](./gbenchmark)
- logging & debugging
    + [breakpad](./breakpad)
    + [EasyLogger](./EasyLogger)
    + [fmt](./fmt)
    + [glog](./glog)
    + [log4cplus](./log4cplus)
    + [MuPDF itself](../../)
    + [plf_nanotimer](./plf_nanotimer) -- high precision cross-platform performance timer
    + [replxx](./replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
    + [resumable-assert](./resumable-assert)
    + [spdlog](./spdlog)
    + [zlog](./zlog)
- OCR core (tesseract)
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
- PDF render & metadata core (mupdf)
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
- sub-dependencies (libraries which are required by any of the above)
    + [boost](./boost) -- required by several other libraries in this collection
    + [Catch2](./Catch2)
    + [gflags](./gflags) -- google::flags library, used by other libs in this set.
    + [Imath](./Imath) -- float16 support lib for OpenEXR format
    + [jemalloc](./jemalloc)
    + [libbf](../libbf)
    + [libfolia](./libfolia)
    + [libidn2](./libidn2)
    + [nanosvg](./nanosvg)
    + [OpenSSL](./openssl) -- also used by CURL et al, incidentally.
    + [pcre](./pcre)
    + [protobuf](./protobuf)
    + [svg-charter](./svg-charter) -- SVG chart renderer
    + [tinyexpr](./tinyexpr)
    + [tlx](./tlx) -- a collection of C++ helpers and extensions universally needed, but not found in the STL.
    + [uint128_t](./uint128_t)
- UI / GUI
    + [neutralinoJS](./neutralinoJS)
    + [neutralinoJS-CLI](./neutralinoJS-CLI)
    + [photino.native](../photino.native)
    + [webview](./webview)
    + [wxWidgets](./wxWidgets)
    + [wxCharts](./wxCharts)
    + [wxFormBuilder](../wxFormBuilder)
         


### Libraries in this collection

- [BBHash](./BBHash)
- [BCF-cuckoo-index](./BCF-cuckoo-index)
- [bebop](./bebop)
- [bibtex-robust-decoder](./bibtex-robust-decoder)
- [bibutils](./bibutils)
- [binary_bakery](./binary_bakery) -- resource compiler-like tool: embed any data in your C/C++ application
- [BLAKE3](./BLAKE3)
- [boost](./boost) -- required by several other libraries in this collection
- [breakpad](./breakpad)
- [brotli](../brotli) -- compression
- [bzip2](./bzip2)
- [c-blosc2](./c-blosc2)
- [caffe](./caffe)
- [catboost](./catboost)
- [Catch2](./Catch2)
- [cereal](./cereal) -- C++11 serialization library
- [CHM lib](./CHM-lib) -- as I have several HTML pages stored in this format. See also MHTML: `mht-rip`
- [civetweb](./civetweb)
- [clBLAS](./clBLAS)
- [cli11](./cli11) -- command line options parser
- [clipp](./clipp) -- commandline parser 
- [clippson](./clippson) -- commandline parser + JSON data diagnostical dumper
- [cmph-hasher](./cmph-hasher)
- [cpp-btree](../cpp-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- [cppzmq](./cppzmq)
- [cpu_features](./cpu_features)
- [cpu_stat](./cpu_stat)
- [cpuinfo](./cpuinfo) -- CPU & hardware info
- [CPython](./CPython)
- [createprocess-windows](./createprocess-windows) -- drive `CreateProcess` Win32 API
- [crow](./crow) -- IPC / server framework 
- [cryptopp](./cryptopp)
- [cuckoo-index](./cuckoo-index)
- [cuckoofilter](./cuckoofilter)
- [curl](../curl)
- [DCF-cuckoo-index](./DCF-cuckoo-index)
- [djvulibre](./djvulibre)
- [dlib](./dlib) -- machine learning algorithms
- [docopt](./docopt) -- generate documentation for command line options
- [drogon](./drogon)
- [dtl-diff-template-library](./dtl-diff-template-library)
- [EasyLogger](./EasyLogger)
- [ECMA262](./ECMA262)
- [efsw](./efsw) -- cross-platform file system watcher and notifier
- [emphf-hash](./emphf-hash)
- [expected-lite](./expected-lite)
- [extract](../extract)
- [fast-lzma2](./fast-lzma2)
- [FastBinaryEncoding](./FastBinaryEncoding)
- [fastBPE](./fastBPE) -- text tokenization / ngrams
- [file](./file) -- `file` filetype recognizer tool & mimemagic 
- [flatbuffers](./flatbuffers)
- [flatcc](./flatcc)
- [fmt](./fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
- [freeglut](../freeglut)
- [freetype](../freetype)
- [frozen](./frozen)
- [gbenchmark](./gbenchmark)
- [GDCM-Grassroots-DICOM](./GDCM-Grassroots-DICOM)
- [gflags](./gflags) -- google::flags library, used by other libs in this set.
- [glob](./glob) -- directory scanner
- [glog](./glog)
- [GMM-HMM-kMeans](./GMM-HMM-kMeans)
- [GMMreg](./GMMreg)
- [google-diff-match-patch](./google-diff-match-patch)
- [googletest](./googletest)
- [gperf-hash](./gperf-hash)
- [GraphicsMagick](./GraphicsMagick)
- [gumbo-libxml](./gumbo-libxml)
- [gumbo-parser](../gumbo-parser)
- [gumbo-query](./gumbo-query) -- HTML DOM access in C/C++
- [h2o-server](./h2o-server)
- [h5cpp-HDF5](./h5cpp-HDF5)
- [harfbuzz](../harfbuzz)
- [HDF5](./HDF5)
- [HDiffPatch](./HDiffPatch)
- [hedley](./hedley)
- [HighFive-HDF5](./HighFive-HDF5)
- [hmm-scalable](./hmm-scalable)
- [hmm-stoch](./hmm-stoch)
- [hocr-fileformat](./hocr-fileformat)
- [hocr-spec](./hocr-spec)
- [hocr-tools](./hocr-tools)
- [http-parser](./http-parser)
- [hunspell-hyphen](./hunspell-hyphen)
- [hunspell](./hunspell)
- [hyperscan](./hyperscan) -- Hyperscan is a high-performance multiple regex matching library.
- [ice](./ice) -- Comprehensive RPC Framework: helps you network your software with minimal effort.
- [ImageMagick](./ImageMagick)
- [Imath](./Imath) -- float16 support lib for OpenEXR format
- [inih](./inih)
- [iniparser](./iniparser)
- [jasper](./jasper) -- JasPer Image Processing/Coding Tool Kit
- [jbig2dec](../jbig2dec)
- [jemalloc](./jemalloc)
- [jpeg-xl](https://gitlab.com/wg1/jpeg-xl) - \[DROPPED: nobody is using it yet, while I am more interested in high perf **lossless** formats for internal communications and storage]
- [jpeginfo](../jpeginfo)
- [json-jansson](./json-jansson)
- [json](./json)
- [langdata_LSTM](../langdata_LSTM) -- tesseract data
- [lapack](./lapack) -- [CBLAS](http://www.netlib.org/blas/) + [LAPACK](http://www.netlib.org/lapack/index.html) optimized linear algebra libs
- [lcms2](../lcms2)
- [lda-bigartm](./lda-bigartm)
- [lda-Familia](./lda-Familia)
- [lda](./lda) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
- [LDCF-hash](./LDCF-hash)
- [leptonica](../leptonica)
- [lib_nas_lockfile](./lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
- [libarchive](./libarchive)
- [libbf](../libbf)
- [libbloom](./libbloom)
- [libcmime](../libcmime) -- MIME extract/insert/encode/decode: use for MHTML support
- [libconfig](../libconfig) -- generic config (file) reader/writer
- [libcppzmq](../libcppzmq)
- [libcpuid](./libcpuid) -- CPU & hardware info
- [libCZMQ](../libCZMQ)
- [libexpat](./libexpat)
- [libfolia](./libfolia)
- [libgif](./libgif)
- [libidn2](./libidn2)
- [libjpeg-turbo](./libjpeg-turbo)
- [libjpeg](../libjpeg)
- [liblinear](./liblinear)
- [libmdbx](./libmdbx)
- [libmicrohttpd](./libmicrohttpd)
- [libpng](../libpng)
- [libqrencode](./libqrencode)
- [libscanf](./libscanf)
- [libsmile](./libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format
- [libsvm](./libsvm)
- [libtextcat](./libtextcat) -- text language detection
- [libtiff](../libtiff)
- [libtuv](./libtuv)
- [libunifex](./libunifex)
- [libvips](./libvips)
- [libwebp](./libwebp)
- [libwebsocketpp](./libwebsocketpp)
- [libwebsockets](./libwebsockets)
- [libxml2](./libxml2) -- [libxml](http://xmlsoft.org/)
- [libyaml](./libyaml) -- YAML
- [libzip](./libzip)
- [libzmq](./libzmq)
- [LightLDA](./LightLDA)
- [Lightning.NET](./Lightning.NET) -- .NET library for OpenLDAP's LMDB key-value store
- [ligra-graph](./ligra-graph)
- [linenoise](./linenoise)
- [lizard](./lizard)
- [lmdb-safe](./lmdb-safe)
- [lmdb-store](./lmdb-store)
- [lmdb.spreads.net](./lmdb.spreads.net)
- [lmdb](./lmdb)
- [lmdbxx](./lmdbxx) -- LMDB C++ wrapper
- [log4cplus](./log4cplus)
- [lua](./lua)
- [luaJIT](./luaJIT)
- [lz4](./lz4)
- [lzo](./lzo)
- [lzsse](./lzsse)
- [magic_enum](./magic_enum)
- [many-stop-words](./many-stop-words)
- [math-atlas](./math-atlas)
- [mcmc](./mcmc)
- [messagebox-windows](./messagebox-windows) -- drive `MessageBox` and `MessageBeep` Win32 APIs
- [mht-rip](./mht-rip) -- as I have several HTML pages stored in this MHTML format. See also CHM: `CHM-lib`
- [mime-mega](../mime-mega) -- MIME extract/insert/encode/decode: use for MHTML support
- [mimetic](./mimetic) -- MIME: use for MHTML support
- [mipp](./mipp)
- [MITIE-nlp](./MITIE-nlp)
- [mlpack](./mlpack)
- [mmc](./mmc)
- [morton_filter](./morton_filter)
- [mujs](../mujs)
- [nanosvg](./nanosvg)
- [ncnn](./ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
- [neutralinoJS-CLI](./neutralinoJS-CLI)
- [neutralinoJS](./neutralinoJS)
- [oatpp](./oatpp) -- IPC / server framework
- [olena](./olena)
- [oneTBB](./oneTBB) -- Intel's Thread Building Blocks library: used with OpenImageIO, ...
- [opencv](./opencv)
- [opencv_contrib](./opencv_contrib)
- [OpenEXR](./OpenEXR) -- lossless format for multi-layered images. Professional use. (I've used it before; nice file format.)
- [OpenImageIO](./OpenImageIO)
- [openjpeg](../openjpeg)
- [OpenSSL](./openssl) -- also used by CURL et al, incidentally.
- [OptimizationTemplateLibrary](./OptimizationTemplateLibrary) -- Optimization Template Library (OTL)
- [otl](../otl) -- Oracle Template Library (STL-like wrapper for SQL DB queries; supports many databases besides Oracle)
- [palmtree](./palmtree) -- concurrent lock free B+Tree
- [parallel-hashmap](./parallel-hashmap) -- a set of hash map implementations, as well as a btree alternative to std::map and std::set
- [pcg-c-random](./pcg-c-random) -- fast random generators
- [pcre](./pcre)
- [phf-hash](./phf-hash)
- [photino.native](../photino.native)
- [picohttpparser](./picohttpparser)
- [pithy](./pithy)
- [plf_nanotimer](./plf_nanotimer) -- high precision cross-platform performance timer
- [pmt-png-tools](./pmt-png-tools)
- [protobuf](./protobuf)
- [proxygen](./proxygen)
- [pthread-win32](./pthread-win32)
- [pytorch](./pytorch) -- PyTorch library in C++
- [QuickJS-C++-Wrapper](./QuickJS-C++-Wrapper)
- [QuickJS](./QuickJS)
- [rapidJSON](./rapidJSON)
- [re2](./re2)
- [replxx](./replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
- [resumable-assert](./resumable-assert)
- [ScriptX](./ScriptX)
- [ScriptX](./ScriptX/) -- wrapper for V8, QuickJS, Lua, Python, ...
- [sentence-tokenizer](./sentence-tokenizer) -- text tokenization
- [sentencepiece](./sentencepiece) -- text tokenization
- [shoco](./shoco) -- a fast compressor for short strings
- [snappy](./snappy)
- [sparsehash](./sparsehash) -- fast hash algorithms
- [spdlog](./spdlog)
- [spy-build-sysinfo](./spy-build-sysinfo) -- build system info
- [sqlite-amalgamation](./sqlite-amalgamation)
- [sqlite](./sqlite)
- [squash](./squash)
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
- [tidy-html5](./tidy-html5) -- clean up HTML documents before archiving/processing
- [tiny-process-library](./tiny-process-library) -- small platform independent library making it simple to create and stop new processes, as well as writing to stdin and reading from stdout and stderr of a new process.
- [tinyexpr](./tinyexpr)
- [tlx-btree](./tlx-btree) -- in-memory B+-tree: an alternative for the priority queue as we expect the queue to grow huge, given past experience with Qiqqa.
- [tlx](./tlx) -- a collection of C++ helpers and extensions universally needed, but not found in the STL.
- [tomlpp](../tomlpp) -- TOML++
- [tre](./tre)
- [txiki](./txiki.js) -- uses QuickJS as its kernel
- [ucto](./ucto) -- text tokenization
- [uctodata](./uctodata) -- data for `ucto` library
- [uint128_t](./uint128_t)
- [unicode-cldr](./unicode-cldr)
- [unicode-icu](./unicode-icu)
- [upskirt-markdown](./upskirt-markdown) -- MarkDown renderer
- [url](./url) -- URI parsing and other utility functions
- [websocket-sharp](./websocket-sharp)
- [webview](./webview)
- [wget](./wget)
- [wxCharts](./wxCharts)
- [wxFormBuilder](../wxFormBuilder)
- [wxWidgets](./wxWidgets)
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
- [zlog](./zlog)
- [zstd](./zstd)






### Libraries not available in this collection but already part of `mupdf`

- [curl](../curl)
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










