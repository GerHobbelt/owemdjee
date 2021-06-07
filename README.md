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
    * new: BLAKE3 & Base36
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

**UPDATE 2021/June**: jerryscript, duktape, XS/moddable, escargot: these have been dropped as we picked QuickJS. After somee initial hassle with that codebase, we picked a different branch to test, which was cleaner and compiled out of the box (CMake > MSVC), which is always a good omen for a codebase when you have cross-platform portability in mind.


### Libraries we're looking at for this *intent*:

- IPC: flatbuffer et al for protocol design:
    - [bebop](./bebop)
    - [FastBinaryEncoding](./FastBinaryEncoding)
    - [flatbuffers](./flatbuffers)
    - [flatcc](./flatcc)
    - [libzmq](./libzmq)
    - [libsmile](./libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format
    - [libwebsocketpp](./libwebsocketpp)
    - [libwebsockets](./libwebsockets)
    - [websocket-sharp](./websocket-sharp)
    - [OpenSSL](./openssl) -- also used by CURL et al, incidentally.
    - [crow](./crow) -- IPC / server framework 
     
      Interface looks nicer than `oatpp`...
    - [oatpp](./oatpp) -- IPC / server framework
- IPC: JSON for protocol design:
    - [json](./json)
    - [json-jansson](./json-jansson)
    - [rapidJSON](./rapidJSON)
    - [yyjson](./yyjson)
    - [libsmile](./libsmile) -- ["Smile" format](https://en.wikipedia.org/wiki/Smile_%28data_interchange_format%29), i.e. a compact binary JSON format
- content hashing
    - [BLAKE3](./BLAKE3)
    - [cryptopp](./cryptopp)
- intermediate data storage / caching / hierarchical data stores (binary hOCR; document text revisions; ...) 
    - [c-blosc2](./c-blosc2)
    - [h5cpp-HDF5](./h5cpp-HDF5)
    - [HDF5](./HDF5)
    - [HighFive-HDF5](./HighFive-HDF5)
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
- OCR: hOCR output format, other output format? (dedicated binary?)
    - [hocr-fileformat](./hocr-fileformat)
    - [hocr-spec](./hocr-spec)
    - [hocr-tools](./hocr-tools)
- pattern recognition: "A.I." for cover pages, image/page *segmentation*, including abstract & summary demarcation, "figure" and "table" detection & extraction from documents, ...
    - [apophenia](./apophenia) -- statistics
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
    - [yara-pattern-matcher](./yara-pattern-matcher) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks
    - *delta features* & other feature extraction (see Qiqqa research notes)
        + [dtl-diff-template-library](./dtl-diff-template-library)
        + [google-diff-match-patch](./google-diff-match-patch)
        + [HDiffPatch](./HDiffPatch)
        + [yara-pattern-matcher](./yara-pattern-matcher)
        + [lz4](./lz4)
- regex matchers (manual edit - pattern recognition)
    * [re2](./re2)
    * [tre](./tre)
    * [hyperscan](./hyperscan) -- Hyperscan is a high-performance multiple regex matching library.
- OCR: quality improvements, language detect, ...
    - [hunspell](./hunspell)
    - [hunspell-hyphen](./hunspell-hyphen)
- OCR page image preprocessing, \[scanner] tooling: getting the pages to the OCR engine
    - [lcms2](../lcms2)
    - [leptonica](../leptonica)
    - [ImageMagick](./ImageMagick)
    - [jasper](./jasper) -- JasPer Image Processing/Coding Tool Kit
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
    + [lda](./lda) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
    + [lda-Familia](./lda-Familia)
    + [lda-bigartm](./lda-bigartm)
    + [LightLDA](./LightLDA)
    + [mcmc](./mcmc)
    + [mipp](./mipp)
    + [mmc](./mmc)
    + other *topic modeling* code on the Net:
        * [Hierarchical Dirichlet Process (with Split-Merge Operations), Chong Wang](https://github.com/renaud/hdp-faster)
        * [Hierarchical Latent Tree Analysis (HLTA)](https://github.com/kmpoon/hlta)
        * [Leonard Poon - various works]](https://github.com/kmpoon?tab=repositories)
        * [David Blei's list of topic modeling OSS software](http://www.cs.columbia.edu/~blei/topicmodeling_software.html) + [github repo list](https://github.com/blei-lab)
- database "backend storage"
    - [sqlite](./sqlite)
    - [sqlite-amalgamation](./sqlite-amalgamation)
    - [lib_nas_lockfile](./lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
- metadata & text (OCR et al): language detect, suggesting fixes, ...    
    - [unicode-cldr](./unicode-cldr)
    - [unicode-icu](./unicode-icu)
- PDF metadata editing for round-trip annotation and other "external application editing" of known documents; metadata embedding / *export*
    - [xml-pugixml](./xml-pugixml)
    - [XMP-Toolkit-SDK](./XMP-Toolkit-SDK)
    - [libexpat](./libexpat)
    - [libxml2](./libxml2)
- web scraping (document eextraction, cleaning, metadata extraction, BibTeX, ...) 
    - see investigation notes in Qiqqa docs
    - [curl](../curl)
    - [extract](../extract)
    - [gumbo-parser](../gumbo-parser)
    - [gumbo-libxml](./gumbo-libxml)
    - [http-parser](./http-parser)
    - [picohttpparser](./picohttpparser)
    - [xml-pugixml](./xml-pugixml)
    - [libexpat](./libexpat)
    - [libxml2](./libxml2) -- [libxml](http://xmlsoft.org/)
    - [gumbo-query](./gumbo-query)
    - [tidy-html5](./tidy-html5)
* file format support
    - [djvulibre](./djvulibre)
    - [extract](../extract)
    - [gmime](./gmime) -- multipart MIME library; serves as a fundameental building block for full MHTML file format I/O support
    - [gumbo-parser](../gumbo-parser)
    - [gumbo-libxml](./gumbo-libxml)
    - [mimetic](./mimetic) -- S/MIME: use for MHTML support
    - [libzip](./libzip)
    - [gumbo-query](./gumbo-query) -- HTML DOM access in C/C++
    - [tidy-html5](./tidy-html5) -- clean up HTML documents before archiving/processing
    - [http-parser](./http-parser)
    - [picohttpparser](./picohttpparser)
    - [xml-pugixml](./xml-pugixml)
    - [libexpat](./libexpat)
    - [libxml2](./libxml2) -- [libxml](http://xmlsoft.org/)
    - [mht-rip](./mht-rip) -- as I have several HTML pages stored in this MHTML format. See also CHM: `CHM-lib`
    - [CHM lib](./CHM-lib) -- as I have several HTML pages stored in this format. See also MHTML: `mht-rip`
- scripting *user-tunable tasks* such as OCR preproceessing, metadata extraction, metadata cleaning & other \[post-]processing, ...
    - [mujs](../mujs)
    - [CPython](./CPython)
    - [ECMA262](./ECMA262)
    - [lua](./lua)
    - [luaJIT](./luaJIT)
    - [QuickJS](./QuickJS)
        - [txiki](./txiki.js) -- uses QuickJS as its kernel
    - [replxx](./replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
 - multi-processing core technologies
    - [libwebsocketpp](./libwebsocketpp)
    - [libwebsockets](./libwebsockets)
    - [websocket-sharp](./websocket-sharp)
    - [crow](./crow) -- IPC / server framework
    - [oatpp](./oatpp) -- IPC / server framework
    - [clipp](./clipp) -- commandline parser 
    - [clippson](./clippson) -- commandline parser + JSON data diagnostical dumper
    - [fmt](./fmt)
    - [glob](./glob) -- directory scanner
    - [Imath](./Imath) -- float16 support lib for OpenEXR format
    - [inih](./inih)
    - [iniparser](./iniparser)
    - [libidn2](./libidn2) -- International Domain Name decoder/encoder library; used with gmime --> MHTML format
    - [libtuv](./libtuv)
    - [libzmq](./libzmq)
    - [oneTBB](./oneTBB) -- Intel's Thread Building Blocks library: used with OpenImageIO, ...
    - [pthread-win32](./pthread-win32)
    - [upskirt-markdown](./upskirt-markdown) -- MarkDown renderer
        - [svg-charter](./svg-charter) -- SVG chart renderer
            - [tinyexpr](./tinyexpr)
    - [libarchive](./libarchive)
- testing & fuzzing
    - [googletest](./googletest)
- logging & debugging
    - MuPDF itself
    - [EasyLogger](./EasyLogger)
    - [glog](./glog)
    - [log4cplus](./log4cplus)
    - [zlog](./zlog)
    - [fmt](./fmt)
- OCR core (tesseract)
    + [tesseract](../tesseract)
    + [langdata_LSTM](../langdata_LSTM)
    + [tessconfigs](../tessconfigs)
    + [tessdata](../tessdata)
    + [tessdata_best](../tessdata_best)
    + [tessdata_contrib](../tessdata_contrib)
    + [tessdata_fast](../tessdata_fast)
    + [tessdoc](../tessdoc)
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


### Libraries in this collection

- [apophenia](./apophenia)
- [bebop](./bebop)
- [BLAKE3](./BLAKE3)
- [boost](./boost) -- required by several other libraries in this collection
- [c-blosc2](./c-blosc2)
- [CHM lib](./CHM-lib) -- as I have several HTML pages stored in this format. See also MHTML: `mht-rip`
- [clipp](./clipp)
- [clippson](./clippson)
- [CPython](./CPython)
- [crow](./crow)
- [cryptopp](./cryptopp)
- [djvulibre](./djvulibre)
- [dlib](./dlib)
- [dtl-diff-template-library](./dtl-diff-template-library)
- [EasyLogger](./EasyLogger)
- [ECMA262](./ECMA262)
- [fast-lzma2](./fast-lzma2)
- [FastBinaryEncoding](./FastBinaryEncoding)
- [flatbuffers](./flatbuffers)
- [flatcc](./flatcc)
- [fmt](./fmt)
- [GDCM-Grassroots-DICOM](./GDCM-Grassroots-DICOM)
- [glob](./glob)
- [glog](./glog)
- [gmime](./gmime)
- [google-diff-match-patch](./google-diff-match-patch)
- [googletest](./googletest)
- [GraphicsMagick](./GraphicsMagick)
- [gumbo-query](./gumbo-query)
- [h5cpp-HDF5](./h5cpp-HDF5)
- [HDF5](./HDF5)
- [HDiffPatch](./HDiffPatch)
- [HighFive-HDF5](./HighFive-HDF5)
- [hocr-fileformat](./hocr-fileformat)
- [hocr-spec](./hocr-spec)
- [hocr-tools](./hocr-tools)
- [http-parser](./http-parser)
- [hunspell-hyphen](./hunspell-hyphen)
- [hunspell](./hunspell)
- [hyperscan](./hyperscan)
- [ImageMagick](./ImageMagick)
- [Imath](./Imath)
- [inih](./inih)
- [iniparser](./iniparser)
- [jasper](./jasper)
- [jpeg-xl](https://gitlab.com/wg1/jpeg-xl) - \[DROPPED: nobody is using it yet, while I am more interested in high perf **lossless** formats for internal communications and storage]
- [json-jansson](./json-jansson)
- [json](./json)
- [lapack](./lapack)
- [lda-bigartm](./lda-bigartm)
- [lda-Familia](./lda-Familia)
- [lda](./lda) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
- [lib_nas_lockfile](./lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
- [libarchive](./libarchive)
- [libexpat](./libexpat)
- [libgif](./libgif)
- [libidn2](./libidn2)
- [libjpeg-turbo](./libjpeg-turbo)
- [libsmile](./libsmile)
- [libsvm](./libsvm)
- [libtuv](./libtuv)
- [libvips](./libvips)
- [libwebp](./libwebp)
- [libwebsocketpp](./libwebsocketpp)
- [libwebsockets](./libwebsockets)
- [libxml2](./libxml2)
- [libzip](./libzip)
- [libzmq](./libzmq)
- [LightLDA](./LightLDA)
- [lizard](./lizard)
- [log4cplus](./log4cplus)
- [lua](./lua)
- [luaJIT](./luaJIT)
- [lz4](./lz4)
- [lzo](./lzo)
- [lzsse](./lzsse)
- [math-atlas](./math-atlas)
- [mcmc](./mcmc)
- [mht-rip](./mht-rip) -- as I have several HTML pages stored in this MHTML format. See also CHM: `CHM-lib`
- [mimetic](./mimetic)
- [mipp](./mipp)
- [MITIE-nlp](./MITIE-nlp)
- [mlpack](./mlpack)
- [mmc](./mmc)
- [oatpp](./oatpp)
- [olena](./olena)
- [oneTBB](./oneTBB)
- [opencv](./opencv)
- [opencv_contrib](./opencv_contrib)
- [OpenEXR](./OpenEXR)
- [OpenImageIO](./OpenImageIO)
- [OpenSSL](./openssl)
- [picohttpparser](./picohttpparser)
- [pithy](./pithy)
- [pmt-png-tools](./pmt-png-tools)
- [pthread-win32](./pthread-win32)
- [pytorch](./pytorch)
- [QuickJS](./QuickJS)
- [rapidJSON](./rapidJSON)
- [re2](./re2)
- [replxx](./replxx)
- [snappy](./snappy)
- [sqlite-amalgamation](./sqlite-amalgamation)
- [sqlite](./sqlite)
- [squash](./squash)
- [svg-charter](./svg-charter)
- [thunderSVM](./thunderSVM)
- [tidy-html5](./tidy-html5)
- [tinyexpr](./tinyexpr)
- [tre](./tre)
- [txiki](./txiki.js)
- [unicode-cldr](./unicode-cldr)
- [unicode-icu](./unicode-icu)
- [upskirt-markdown](./upskirt-markdown)
- [websocket-sharp](./websocket-sharp)
- [xml-pugixml](./xml-pugixml)
- [XMP-Toolkit-SDK](./XMP-Toolkit-SDK)
- [xsimd](./xsimd)
- [xtensor-blas](./xtensor-blas)
- [xtensor-io](./xtensor-io)
- [xtensor](./xtensor)
- [xtl](./xtl)
- [xz-utils](./xz-utils)
- [yara-pattern-matcher](./yara-pattern-matcher)
- [yyjson](./yyjson)
- [zlog](./zlog)
- [zstd](./zstd)


### Libraries not available in this collection but already part of `mupdf`

+ [curl](../curl)
+ [extract](../extract)
+ [freeglut](../freeglut)
+ [freetype](../freetype)
+ [gumbo-parser](../gumbo-parser)
+ [harfbuzz](../harfbuzz)
+ [jbig2dec](../jbig2dec)
+ [jpeginfo](../jpeginfo)
+ [langdata_LSTM](../langdata_LSTM)
+ [lcms2](../lcms2)
+ [leptonica](../leptonica)
+ [libjpeg](../libjpeg)
+ [libpng](../libpng)
+ [libtiff](../libtiff)
+ [mujs](../mujs)
+ [openjpeg](../openjpeg)
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
+ [zlib](../zlib)




















