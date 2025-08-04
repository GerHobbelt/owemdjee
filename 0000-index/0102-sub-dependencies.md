









## sub-dependencies (libraries which are required by any of the above)

- **abseil-cpp** [📁](./abseil-cpp) [🌐](https://github.com/GerHobbelt/abseil-cpp) -- a collection of C++ code (compliant to C++11) designed to augment the C++ standard library.
- **boost** [📁](./boost) [🌐](https://github.com/GerHobbelt/boost) -- required by several other libraries in this collection
- **c4core** [📁](./c4core) [🌐](https://github.com/GerHobbelt/c4core) -- a library of low-level C++ utilities, written with low-latency projects in mind.  Some of the utilities provided by c4core have already equivalent functionality in the C++ standard, but they are provided as the existing C++ equivalent may be insufficient (eg, std::string_view), inefficient (eg, std::string), heavy (eg streams), or plainly unusable on some platforms/projects, (eg exceptions); some other utilities have equivalent under consideration for C++ standardisation; and yet some other utilities have (to my knowledge) no equivalent under consideration.
- **cairo** [📁](./cairo) [🌐](https://github.com/GerHobbelt/cairo) -- Cairo: Multi-platform 2D graphics library with support for multiple output devices. Cairo is designed to produce consistent output on all output media while taking advantage of display hardware acceleration when available. Currently supported output targets include the X Window System (via both Xlib and XCB), quartz, win32, and image buffers, as well as PDF, PostScript, and SVG file output. Experimental backends include OpenGL. Cairo is designed to produce consistent output on all output media while taking advantage of display hardware acceleration when available (for example, through the X Render Extension).
- **cairo-demos** [📁](./cairo-demos) [🌐](https://github.com/GerHobbelt/cairo-demos) -- several simple programs intended to demonstrate some of the features of the Cairo graphics library (http://cairographics.org).
- **cimfomfa** [📁](./cimfomfa) [🌐](https://github.com/GerHobbelt/cimfomfa) -- another blooming C utility library.
- **cJSON** [📁](./cJSON) [🌐](https://github.com/GerHobbelt/cJSON) -- ultra-lightweight JSON parser in ANSI C.
- **cmocka** [📁](./cmocka) [🌐](https://github.com/GerHobbelt/cmocka) -- an elegant unit testing framework for C with support for mock objects. It only requires the standard C library, works on a range of computing platforms (including embedded) and with different compilers.
- **colm** [📁](./colm) [🌐](https://github.com/GerHobbelt/colm) -- Colm (COmputer Language Machinery) is a programming language designed for the analysis and [transformation of computer languages](https://www.program-transformation.org/Transform/TransformationSystems). Colm is influenced primarily by [TXL](https://www.txl.ca/). Colm is not-your-typical-scripting-language™: Colm's main contribution lies in the parsing method. Colm's parsing engine is generalized, but it also allows for the construction of arbitrary global data structures that can be queried during parsing. In other generalized methods, construction of global data requires some very careful consideration because of inherent concurrency in the parsing method. It is such a tricky task that it is often avoided altogether and the problem is deferred to a post-parse disambiguation of the parse forest.
- **docopt.cpp** [📁](./docopt.cpp) [🌐](https://github.com/GerHobbelt/docopt.cpp) -- creates *beautiful* command-line interfaces *easily*.
- **ewig** [📁](./ewig) [🌐](https://github.com/GerHobbelt/ewig) -- a simple text editor (an [Ersatz Emacs](https://www.emacswiki.org/emacs/ErsatzEmacs)) written using [immutable data-structures](https://sinusoid.es/immer/) in C++. The code is written in a simple style to showcase a value-based functional architecture.
- **fftw3** [📁](./fftw3) [🌐](https://github.com/GerHobbelt/fftw3) -- the FFTW library for computing Fourier transforms (version 3.x), maintained by the FFTW authors.
- **figcone_ini** [📁](./figcone_ini) [🌐](https://github.com/GerHobbelt/figcone_ini) -- a [`inifile-cpp`](https://github.com/Rookfighter/inifile-cpp) configuration parser adapter for [`figcone`](https://github.com/kamchatka-volcano/figcone) library.
- **figcone_json** [📁](./figcone_json) [🌐](https://github.com/GerHobbelt/figcone_json) -- a [`nlohmann/json`](https://github.com/nlohmann/json) configuration parser adapter for [`figcone`](https://github.com/kamchatka-volcano/figcone) library.
- **figcone_shoal** [📁](./figcone_shoal) [🌐](https://github.com/GerHobbelt/figcone_shoal) -- a [`shoal`](https://shoal.eelnet.org/) configuration parser for [`figcone`](https://github.com/kamchatka-volcano/figcone) library.
- **figcone_toml** [📁](./figcone_toml) [🌐](https://github.com/GerHobbelt/figcone_toml) -- a [`toml11`](https://github.com/ToruNiina/toml11) configuration parser adapter for [`figcone`](https://github.com/kamchatka-volcano/figcone) library.
- **figcone_tree** [📁](./figcone_tree) [🌐](https://github.com/GerHobbelt/figcone_tree) -- a C++17 header-only library providing an interface for creating configuration parsers compatible with [`figcone`](https://github.com/kamchatka-volcano/figcone) library.
- **figcone_xml** [📁](./figcone_xml) [🌐](https://github.com/GerHobbelt/figcone_xml) -- a [`rapidxml`](https://github.com/dwd/rapidxml) configuration parser adapter for [`figcone`](https://github.com/kamchatka-volcano/figcone) library.
- **figcone_yaml** [📁](./figcone_yaml) [🌐](https://github.com/GerHobbelt/figcone_yaml) -- a [`rapidyaml`](https://github.com/biojppm/rapidyaml) configuration parser adapter for [`figcone`](https://github.com/kamchatka-volcano/figcone) library.
- **fontconfig** [📁](./fontconfig) [🌐](https://github.com/GerHobbelt/fontconfig) -- font configuration and customization library
- **gflags** [📁](./gflags) [🌐](https://github.com/GerHobbelt/gflags) -- google::flags library, used by other libs in this set.
- **glib2** [📁](./glib2) [🌐](https://github.com/GerHobbelt/glib) -- GLib is the low-level core library that forms the basis for projects such as GTK and GNOME.
- **graphengine** [📁](./graphengine) [🌐](https://github.com/GerHobbelt/graphengine) -- modern graph analytics. Used by `zimg` library.
- **highway** [📁](./highway) [🌐](https://github.com/GerHobbelt/highway) -- dependency of JpegXL
- **htmlstreamparser** [📁](./htmlstreamparser) [🌐](https://github.com/GerHobbelt/htmlstreamparser) -- used in a demo of zsync2
- **inih** [📁](./inih) [🌐](https://github.com/GerHobbelt/inih) -- **inih (INI Not Invented Here)** is a simple [.INI file](http://en.wikipedia.org/wiki/INI_file) parser written in C. It's only a couple of pages of code, and it was designed to be _small and simple_, so it's good for embedded systems. It's also more or less compatible with Python's [ConfigParser](http://docs.python.org/library/configparser.html) style of .INI files, including RFC 822-style multi-line syntax and `name: value` entries.
- **iod** [📁](./iod) [🌐](https://github.com/GerHobbelt/iod) -- the IOD library enhances C++14 meta programming with a symbol based paradigm. It provides a compile-time way to introspect objects and generate code matching their data structures. It also contains few utilities built with symbol meta-programming. Symbols are at the core of the IOD paradigm. They add to C++ a missing powerful feature: The way to statically store in a variable the access to an object member, the call to a method, and the access to the string representing the name of this variable.
- **jemalloc** [📁](./jemalloc) [🌐](https://github.com/GerHobbelt/jemalloc) -- a general purpose malloc(3) implementation that emphasizes fragmentation avoidance and scalable concurrency support.  jemalloc first came into use as the FreeBSD libc allocator in 2005, and since then it has found its way into numerous applications that rely on its predictable behavior.  In 2010 jemalloc development efforts broadened to include developer support features such as heap profiling and extensive monitoring/tuning hooks.
- **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
- **libcpr** [📁](./libcpr) [🌐](https://github.com/GerHobbelt/cpr) -- wrapper library for cURL; used by zsync2
- **libdiagnostics** [📁](./libdiagnostics) [🌐](https://github.com/GerHobbelt/libdiagnostics) -- a C/C++ diagnostics logging library with support for writing HTML and store images and misc binary data to disk alongside. or when a mere logfile doesn't suffice.
- **libfolia** [📁](./libfolia) [🌐](https://github.com/GerHobbelt/libfolia) -- working with the Format for Linguistic Annotation (FoLiA). Provides a high-level API to read, manipulate, and create FoLiA documents.
- **libfsm** [📁](./libfsm) [🌐](https://github.com/GerHobbelt/libfsm) -- provides core functions for finite state machines: NFA, DFA, regular expressions and lexical analysis. Used by `ragel`.
- **libidn2** [📁](./libidn2) [🌐](https://github.com/GerHobbelt/libidn2) -- international domain name parsing
- **libsmile** [📁](./libsmile) [🌐](https://github.com/GerHobbelt/libsmile) -- C implementation of the Smile binary format (https://github.com/FasterXML/smile-format-specification).
- **lodepng** [📁](./lodepng) [🌐](https://github.com/GerHobbelt/lodepng) -- LodePNG: PNG encoder and decoder in C and C++, without dependencies.
- **mimalloc** [📁](./mimalloc) [🌐](https://github.com/GerHobbelt/mimalloc) -- a compact general purpose allocator with excellent performance.
- **nanosvg** [📁](./nanosvg) [🌐](https://github.com/GerHobbelt/nanosvg) -- a simple stupid single-header-file SVG parser. The output of the parser is a list of cubic bezier shapes. Suitable for anything from rendering scalable icons in your editor application to prototyping a game. NanoSVG supports a wide range of SVG features.
- **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- also used by cURL et al, incidentally.
- **pango** [📁](./pango) [🌐](https://github.com/GerHobbelt/pango) -- a library for layout and rendering of text, with an emphasis on internationalization. Pango can be used anywhere that text layout is needed.
- **pcre** [📁](./pcre) [🌐](https://github.com/GerHobbelt/pcre) -- PCRE2 : Perl-Compatible Regular Expressions. The PCRE2 library is a set of C functions that implement regular expression pattern matching using the same syntax and semantics as Perl 5. PCRE2 has its own native API, as well as a set of wrapper functions that correspond to the POSIX regular expression API. It comes in three forms, for processing 8-bit, 16-bit, or 32-bit code units, in either literal or UTF encoding.
- **protobuf** [📁](./protobuf) [🌐](https://github.com/GerHobbelt/protobuf) -- Protocol Buffers - Google's data interchange format that is a language-neutral, platform-neutral, extensible mechanism for serializing structured data.
  
  - **☹discouraged🤧**; reason: relatively slow run-time and (in my opinion) rather ugly & convoluted approach at build time. Has too much of a Java/CorporateProgramming smell, which has not lessened over the years, unfortunately.

- **ragel** [📁](./ragel) [🌐](https://github.com/GerHobbelt/ragel) -- State Machine Compiler
- **re2c** [📁](./re2c) [🌐](https://github.com/GerHobbelt/re2c) -- a lexer generator for C/C++, Go and Rust. Its main goal is generating fast lexers: at least as fast as their reasonably optimized hand-coded counterparts. Instead of using traditional table-driven approach, re2c encodes the generated finite state automata directly in the form of conditional jumps and comparisons. The resulting programs are faster and often smaller than their table-driven analogues, and they are much easier to debug and understand. re2c applies quite a few optimizations in order to speed up and compress the generated code.  Another distinctive feature is its flexible interface: instead of assuming a fixed program template, re2c lets the programmer write most of the interface code and adapt the generated lexer to any particular environment.
- **scintilla** [📁](./scintilla) [🌐](https://github.com/GerHobbelt/scintilla) -- text editor (part of wxWidgets)
- **sfun** [📁](./sfun) [🌐](https://github.com/GerHobbelt/sfun) -- a header-only collection of utilities for string manipulation, metaprogramming, core guidelines support and other general-purpose tasks.
- **snmalloc** [📁](./snmalloc) [🌐](https://github.com/GerHobbelt/snmalloc) -- a high-performance allocator.
- **stxxl** [📁](./stxxl) [🌐](https://github.com/GerHobbelt/stxxl) -- STXXL is an implementation of the C++ standard template library STL for external memory (out-of-core) computations, i. e. STXXL implements containers and algorithms that can process huge volumes of data that only fit on disks.
- **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
- **tcmalloc** [📁](./tcmalloc) [🌐](https://github.com/GerHobbelt/tcmalloc) -- TCMalloc is Google's customized implementation of C's `malloc()` and C++'s `operator new` used for memory allocation within our C and C++ code. TCMalloc is a fast, multi-threaded malloc implementation.
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













	
----

🡸 [previous section](./0101-misc-uncategorized.md)  |  🡹 [up](./0016-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0103-libraries-in-this-collection.md)
