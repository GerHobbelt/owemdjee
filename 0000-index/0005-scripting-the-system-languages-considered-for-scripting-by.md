

## Scripting the System: Languages Considered for Scripting by Users

Python has been considered. Given its loud presence in the AI communities, we still may integrate it one day. However, personally I'm not a big fan of the language and don't use it unless it's *prudent to do*, e.g. when extending or tweaking previous works produced by others.
Also, it turns out, it's not exactly *easy* to integrate (CPython) and I don't see a need for it beyond this one project / product: Qiqqa.

I've looked at Lua for a scripting language suitable for users (used quite a lot in the gaming industries and elsewhere); initial trials to get something going did not uncover major obstacles, but the question "_how do I **debug** Lua scripts?_" does not produce any viable project / product that goes beyond the *old skool `printf`-style debugging method*. Not a prime candidate therefor, as we expect that users will pick this up, when they like it, and grow the user scripts to unanticipated size and complexity: I've seen this happen multiple times in my career. Lua does not provide a scalable growth path from my perspective due to the lack of a *decent, customizable, debugger*.

Third candidate is JavaScript. While Artifex/mupdf comes with `mujs`, which is a simple engine it suffers from *two* drawbacks: it's ES5 and also does not provide a debugger mechanism beyond old skool `print`. Nice for nerds, but this is user-facing and thus not a viable option.

The other JavaScript engines considered are of varying size, performance and complexity. *Some* of them offer ways to integrate them with the \[F12] Chrome browser Developer Tools debugger, which would be *very nice to have available*. The road traveled there, along the various JavaScript engines is this:

- [Facebook's Hermes](https://github.com/facebook/hermes), [Samsung's Escargot](https://github.com/Samsung/escargot) and [XS/moddable](https://www.moddable.com/)<sup>[also](https://github.com/Moddable-OpenSource/moddable) [here](https://github.com/Moddable-OpenSource/moddable-xst)</sup>, which led me to [a webpage where various embeddable JS engines are compared size- and *performance*-wise](https://bellard.org/quickjs/bench.html).
- [Google's V8](https://v8.dev/)<sup>[here](https://github.com/v8/v8) [too](https://chromium.googlesource.com/v8/v8/+/84450a2239672109bcf537d6740b8babda521567)</sup>, as available in NodeJS, is deemed too complex for integration: when we go there, we could spend the same amount of effort on CPython integration -- though there again is the ever-present "how to debug this visually?!" question...)
- [JerryScript](https://github.com/jerryscript-project/jerryscript/): ES2017/2020 (good!), there's noises about Chrome Developer Tools on the Net for this one. Small, designed for embedded devices. I like that.
- mujs: ES5, no visual debugger. **Out.**
- [QuickJS](https://github.com/bellard/quickjs): ES2020, DevTools or [VS Code debugging](https://github.com/koush/vscode-quickjs-debug) seems to be available. Also comes with an interesting runtime: [txiki](https://github.com/saghul/txiki.js), which we still need to take a good look at.

**UPDATE 2021/June**: [JerryScript](https://github.com/jerryscript-project/jerryscript/), duktape, XS/moddable, escargot: these have been dropped as we picked QuickJS. After some initial hassle with that codebase, we picked a different branch to test, which was cleaner and compiled out of the box (CMake > MSVC), which is always a good omen for a codebase when you have cross-platform portability in mind.











### Python(esque)

- **asp** [📁](./asp) [🌐](https://github.com/GerHobbelt/asp) -- the Asp Scripting Platform for Embedded Systems resembles basic Python (with some small differences), making it easy to learn for those who are already familiar with Python. It supports conditionals (if/elif/else), loops (while, for), and functions. It supports basic data types plus tuples, lists, sets, dictionaries, and ranges/slices. To keep things small, Asp does not support classes, exception handling, and many other advanced features. Scripts are compiled to compact byte-code, which is checked for compatibility with the application before being allowed to run in the engine.  The Asp engine has a small code memory footprint (less than 100 KB when compiled optimizing for space). It avoids use of dynamic memory allocation and recursion, resulting in very little impact on the memory of the host application. Applications run scripts one instruction at a time, retaining a high frequency of control of the CPU.
- **cpython** [📁](./cpython) [🌐](https://github.com/GerHobbelt/cpython) -- Python version 3. Note: Building a complete Python installation requires the use of various additional third-party libraries, depending on your build platform and configure options.  Not all standard library modules are buildable or useable on all platforms.
- **micropython** [📁](./micropython) [🌐](https://github.com/GerHobbelt/micropython) -- the MicroPython project aims to put an implementation of Python 3.x on microcontrollers and small embedded systems. You can find the official website at [micropython.org](http://www.micropython.org).  **WARNING**: this project is in beta stage and is subject to changes of the code-base, including project-wide name changes and API changes.  MicroPython implements the entire Python 3.4 syntax (including exceptions, `with`, `yield from`, etc., and additionally `async`/`await` keywords from Python 3.5 and some select features from later versions).
- **PikaPython** [📁](./PikaPython) [🌐](https://github.com/GerHobbelt/PikaPython) -- an ultra-lightweight Python interpreter that runs with only 4KB of RAM, zero dependencies. It is ready to use out of the box without any configuration required and easy to extend with C.
- **pocketlang** [📁](./pocketlang) [🌐](https://github.com/GerHobbelt/pocketlang) -- a lightweight (~3000 semicolons) and [fast](https://github.com/ThakeeNathees/pocketlang#performance) object oriented, embeddable scripting language written in C. It has a ruby flavoured python syntax, that can be learned [within 15 minutes](https://thakeenathees.github.io/pocketlang/docs/v0.1.0/Reference/Cheat-Sheet.html). Including the compiler, bytecode VM and runtime, it's a standalone executable with zero external dependencies just as it's self descriptive name. The pocketlang VM can be embedded in another hosting program very easily.











### Forth et al

- **atlast** [📁](./atlast) [🌐](https://github.com/GerHobbelt/atlast) -- ATLAST (Embedded Threaded Language Toolkit) is an attempt to make software component technology and open architecture applications commonplace in the mainstream software market. Atlast is based upon the FORTH-83 language, but has been extended in many ways and modified to better serve its mission as an embedded toolkit for open, programmable applications.  Atlast includes native support for floating point, C-like strings, Unix-compatible file access, and a wide variety of facilities for embedding within applications.  Integers are 32 bits (64 bits in the 64-bit version of Atlast) and identifiers can be up to 127 characters; extensive stack and heap pointer checking is available to aid in debugging.
- **pforth** [📁](./pforth) [🌐](https://github.com/GerHobbelt/pforth) -- PForth - a Portable ANS-like Forth written in ANSI 'C'. It only needs character input and output functions to operate and, therefore, does not require an operating system. This makes it handy for bringing up and testing embedded systems.











### Expression Parsers of various kinds

- **cel-cpp** [📁](./cel-cpp) [🌐](https://github.com/GerHobbelt/cel-cpp) -- C++ Implementations of the Common Expression Language. For background on the Common Expression Language see the cel-spec repo. Common Expression Language specification: the Common Expression Language (CEL) implements common semantics for expression evaluation, enabling different applications to more easily interoperate. Key Applications are (1) Security policy: organizations have complex infrastructure and need common tooling to reason about the system as a whole and (2) Protocols: expressions are a useful data type and require interoperability across programming languages and platforms.
- **cel-spec** [📁](./cel-spec) [🌐](https://github.com/GerHobbelt/cel-spec) -- Common Expression Language specification: the Common Expression Language (CEL) implements common semantics for expression evaluation, enabling different applications to more easily interoperate. Key Applications are (1) Security policy: organizations have complex infrastructure and need common tooling to reason about the system as a whole and (2) Protocols: expressions are a useful data type and require interoperability across programming languages and platforms.
- **exprtk** [📁](./exprtk) [🌐](https://github.com/GerHobbelt/exprtk) -- C++ Mathematical Expression Toolkit Library is a simple to use, easy to integrate and extremely efficient run-time mathematical expression parsing and evaluation engine. The parsing engine supports numerous forms of functional and logic processing semantics and is easily extensible.
- **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr) -- a very small recursive descent parser and evaluation engine for math expressions.











### ECMA+JavaScriptease

- **ChaiScript** [📁](./ChaiScript) [🌐](https://github.com/GerHobbelt/ChaiScript) -- ChaiScript is one of the few embedded scripting language designed from the ground up to directly target C++ and take advantage of modern C++ development techniques, working with the developer how they would expect it to work. ChaiScript is similar to ECMAScript (aka JavaScript(tm)), but with some modifications to make it easier to use.
- **duktape** [📁](./duktape) [🌐](https://github.com/GerHobbelt/duktape) -- [Duktape](http://duktape.org/) is an **embeddable Javascript** engine, with a focus on **portability** and **compact** footprint. Duktape is ECMAScript E5/E5.1 compliant, with some semantics updated from ES2015+, with partial support for ECMAScript 2015 (E6) and ECMAScript 2016 (E7), ES2015 TypedArray, Node.js Buffer bindings and comes with a built-in debugger.
- **ECMA262** [📁](./ECMA262) [🌐](https://github.com/GerHobbelt/ecma262) -- ECMAScript :: the source for the current draft of ECMA-262, the ECMAScript® Language Specification.
- **jerryscript** [📁](./jerryscript) [🌐](https://github.com/GerHobbelt/jerryscript) -- [JerryScript](https://github.com/jerryscript-project/jerryscript/) is a lightweight JavaScript engine for resource-constrained devices such as microcontrollers. It can run on devices with less than 64 KB of RAM and less than 200 KB of flash memory.
  
  Key characteristics of JerryScript:
  
  * Full ECMAScript 5.1 standard compliance
  * 160K binary size when compiled for ARM Thumb-2
  * Heavily optimized for low memory consumption
  * Written in C99 for maximum portability
  * Snapshot support for precompiling JavaScript source code to byte code
  * Mature C API, easy to embed in applications
  
  Additional information can be found at the [project page](http://jerryscript.net) and [Wiki](https://github.com/jerryscript-project/jerryscript/wiki).

- **mujs** [📁](../../thirdparty/mujs) [🌐](https://github.com/GerHobbelt/mujs) -- a lightweight ES5 Javascript interpreter designed for embedding in other software to extend them with scripting capabilities.
- **QuickJS** [📁](./QuickJS) [🌐](https://github.com/GerHobbelt/quickjs) -- a small and embeddable Javascript engine. It supports the <a href="https://tc39.github.io/ecma262/">ES2020</a> specification including modules, asynchronous generators, proxies and BigInt. It optionally supports mathematical extensions such as big decimal floating point numbers (BigDecimal), big binary floating point numbers (BigFloat) and operator overloading.
  
  - **libbf** [📁](./libbf) [🌐](https://github.com/GerHobbelt/libbf) -- a small library to handle arbitrary precision binary or decimal floating point numbers
  - **QuickJS-C++-Wrapper** [📁](./QuickJS-C++-Wrapper) [🌐](https://github.com/GerHobbelt/quickjscpp) -- quickjscpp is a header-only wrapper around the [quickjs](https://bellard.org/quickjs/) JavaScript engine, which allows easy integration into C++11 code. This wrapper also automatically tracks the lifetime of values and objects, is exception-safe, and automates clean-up.
  - **QuickJS-C++-Wrapper2** [📁](./QuickJS-C++-Wrapper2) [🌐](https://github.com/GerHobbelt/quickjspp) -- QuickJSPP is QuickJS wrapper for C++. It allows you to easily embed Javascript engine into your program.
  - **txiki** [📁](./txiki.js) [🌐](https://github.com/GerHobbelt/txiki.js) -- uses QuickJS as its kernel

- **txiki** [📁](./txiki.js) [🌐](https://github.com/GerHobbelt/txiki.js) -- a small and powerful JavaScript runtime. It's built on the shoulders of giants: it uses [QuickJS] as its JavaScript engine, [libuv] as the platform layer, [wasm3] as the WebAssembly engine and [curl] as the HTTP / WebSocket client.











### Igor's Lisp, Vetinari's Scheming, ...

- **chibi-scheme** [📁](./chibi-scheme) [🌐](https://github.com/GerHobbelt/chibi-scheme) -- Chibi-Scheme is a very small library intended for use as an extension and scripting language in C programs.  In addition to support for lightweight VM-based threads, each VM itself runs in an isolated heap allowing multiple VMs to run simultaneously in different OS threads.
- **ecl** [📁](./ecl) [🌐](https://github.com/GerHobbelt/ecl) -- ECL (Embeddable Common-Lisp) aims to produce an implementation of the Common-Lisp language which complies to the ANSI X3J13 definition of the language. ECL includes a Lisp to C compiler, which produces libraries (static or dynamic) that can be called from C programs. Furthermore, ECL can produce standalone executables from Lisp code and can itself be linked to your programs as a shared library. It also features an interpreter for situations when a C compiler isn't available.
- **guile** [📁](./guile) [🌐](https://github.com/GerHobbelt/guile) -- Guile is Project GNU's extension language library. Guile is an implementation of the Scheme programming language, packaged as a library that can be linked into applications to give them their own extension language.  Guile supports other languages as well, giving users of Guile-based applications a choice of languages.
- **janet** [📁](./janet) [🌐](https://github.com/GerHobbelt/janet) -- **Janet** is a (lispy) programming language for system scripting, expressive automation, and extending programs written in C or C++ with user scripting capabilities. Janet makes a good system scripting language, or a language to embed in other programs. It's like Lua and GNU Guile in that regard. It has more built-in functionality and a richer core language than Lua, but smaller than GNU Guile or Python. However, it is much easier to embed and port than Python or Guile.
- **newlisp** [📁](./newlisp) [🌐](https://github.com/GerHobbelt/newlisp) -- newLISP is a LISP-like scripting language for doing things you typically do with scripting languages: programming for the internet, system administration, text processing, gluing other programs together, etc. newLISP is a scripting LISP for people who are fascinated by LISP's beauty and power of expression, but who need it stripped down to easy-to-learn essentials. newLISP is LISP reborn as a scripting language: pragmatic and casual, simple to learn without requiring you to know advanced computer science concepts. Like any good scripting language, newLISP is quick to get into and gets the job done without fuss. newLISP has a very fast startup time, is small on resources like disk space and memory and has a deep, practical API with functions for networking, statistics, machine learning, regular expressions, multiprocessing and distributed computing built right into it, not added as a second thought in external modules.
- **owl** [📁](./owl) [🌐](https://github.com/GerHobbelt/owl) -- Owl Lisp is a functional dialect of the Scheme programming language. It is mainly based on the applicative subset of the R7RS standard.
- **sbcl** [📁](./sbcl) [🌐](https://github.com/GerHobbelt/sbcl) -- SBCL is an implementation of ANSI Common Lisp, featuring a high-performance native compiler, native threads on several platforms, a socket interface, a source-level debugger, a statistical profiler, and much more.











### Smalltalk, ...

- **io** [📁](./io) [🌐](https://github.com/GerHobbelt/io) -- a dynamic prototype-based programming language in the same realm as Smalltalk and Self. It revolves around the idea of message passing from object to object.
- **wren** [📁](./wren) [🌐](https://github.com/GerHobbelt/wren) -- Wren is a small, fast, class-based concurrent scripting language: think Smalltalk in a Lua-sized package with a dash of Erlang and wrapped up in a familiar, modern syntax.











### Strongly Typed Languages, e.g. C/C++-like, ...

- **daScript** [📁](./daScript) [🌐](https://github.com/GerHobbelt/daScript) -- Daslang - high-performance statically strong typed scripting language.
- **gravity** [📁](./gravity) [🌐](https://github.com/GerHobbelt/gravity) -- a powerful, dynamically typed, lightweight, embeddable programming language written in C without any external dependencies (except for stdlib). It is a class-based concurrent scripting language with modern <a href="https://github.com/apple/swift">Swift</a>-like syntax. **Gravity** supports procedural programming, object-oriented programming, functional programming, and data-driven programming. Thanks to special built-in methods, it can also be used as a prototype-based programming language.
- **picoc** [📁](./picoc) [🌐](https://github.com/GerHobbelt/picoc) -- PicoC is a very small C interpreter for scripting. It was originally written as a script language for a UAV's on-board flight system. It's also very suitable for other robotic, embedded and non-embedded applications. The core C source code is around 3500 lines of code. It's not intended to be a complete implementation of ISO C but it has all the essentials.











### Luaäuwitudinational

- **quirrel** [📁](./quirrel) [🌐](https://github.com/GerHobbelt/quirrel) -- a script language that is based on Squirrel language and is inspired by Python, Javascript and especially Lua (The API is very similar and the table code is based on the Lua one). Whole [syntax and documentation](http://quirrel.io/doc/reference/language.html) can be read in an approximately an hour, and it looks almost familiar if you know Javascript or C++.
- **squilu** [📁](./squilu) [🌐](https://github.com/GerHobbelt/squilu) -- the [http://www.squirrel-lang.org/ squirrel scripting language] seeks to address some problems of lua language and offer a C like syntax with some god extras but it lacks a source code repository and some facilities provided by default in lua like string.gsub, string.gmatch, io.lines, modules, ..., this project try to solve it and extend the language to make it even more useful.
- **squirrel** [📁](./squirrel) [🌐](https://github.com/GerHobbelt/squirrel) -- the programming language SQUIRREL 3 [http://www.squirrel-lang.org/ squirrel scripting language] seeks to address some problems of lua language and offer a C like syntax with some god extras but it lacks a source code repository and some facilities provided by default in lua like string.gsub, string.gmatch, io.lines, modules, ..., this project try to solve it and extend the language to make it even more useful.











### TCL and their ilk

- **itcl** [📁](./itcl) [🌐](https://github.com/GerHobbelt/itcl) -- Itcl is an object oriented extension for Tcl.
- **jimtcl** [📁](./jimtcl) [🌐](https://github.com/GerHobbelt/jimtcl) -- the Jim Interpreter is a small-footprint implementation of the Tcl programming language written from scratch. Currently Jim Tcl is very feature complete with an extensive test suite (see the tests directory). There are some Tcl commands and features which are not implemented (and likely never will be), including traces and Tk. However, Jim Tcl offers a number of both Tcl8.5 and Tcl8.6 features ({*}, dict, lassign, tailcall and optional UTF-8 support) and some unique features. These unique features include [lambda] with garbage collection, a general GC/references system, arrays as syntax sugar for [dict]tionaries, object-based I/O and more. Other common features of the Tcl programming language are present, like the "everything is a string" behaviour, implemented internally as dual ported objects to ensure that the execution time does not reflect the semantic of the language :)
- **picol** [📁](./picol) [🌐](https://github.com/GerHobbelt/picol) -- a tiny Tcl interpreter.
- **tcl** [📁](./tcl) [🌐](https://github.com/GerHobbelt/tcl) -- the latest **Tcl** source distribution. Tcl provides a powerful platform for creating integration applications that tie together diverse applications, protocols, devices, and frameworks.
- **tclclockmod** [📁](./tclclockmod) [🌐](https://github.com/GerHobbelt/tclclockmod) -- TclClockMod is the fastest, most powerful Tcl clock engine written in C. This Tcl clock extension is the faster Tcl-module for the replacement of the standard "clock" ensemble of tcl.











### Rubyism, Various others...

- **mruby** [📁](./mruby) [🌐](https://github.com/GerHobbelt/mruby) -- the lightweight implementation of the Ruby language complying to (part of) the ISO standard with more recent features provided by Ruby 3.x. Also, its syntax is Ruby 3.x compatible except for pattern matching.  You can link and embed mruby within your application. The "mruby" interpreter program and the interactive "mirb" shell are provided as examples. You can also compile Ruby programs into compiled byte code using the "mrbc" compiler.
- **mrubyc** [📁](./mrubyc) [🌐](https://github.com/GerHobbelt/mrubyc) -- mruby/c is another implementation of mruby, featuring small memory consumption, limited class libraries and emphasizing small size rather than execution speed.
- **pocketlang** [📁](./pocketlang) [🌐](https://github.com/GerHobbelt/pocketlang) -- a lightweight (~3000 semicolons) and [fast](https://github.com/ThakeeNathees/pocketlang#performance) object oriented, embeddable scripting language written in C. It has a ruby flavoured python syntax, that can be learned [within 15 minutes](https://thakeenathees.github.io/pocketlang/docs/v0.1.0/Reference/Cheat-Sheet.html). Including the compiler, bytecode VM and runtime, it's a standalone executable with zero external dependencies just as it's self descriptive name. The pocketlang VM can be embedded in another hosting program very easily.











### Rebol nation

- **racket** [📁](./racket) [🌐](https://github.com/GerHobbelt/racket) -- [Racket](https://racket-lang.org/) is a general-purpose programming language and an ecosystem for language-oriented programming.
- **Rebol3** [📁](./Rebol3) [🌐](https://github.com/GerHobbelt/Rebol3) -- Rebol R3 pushes [Carl's original source](https://github.com/rebol/rebol) to be at least as usable as Rebol 2. Rebol itself is an interpreter.











### El BASICque

- **my_basic** [📁](./my_basic) [🌐](https://github.com/GerHobbelt/my_basic) -- MY-BASIC is a lightweight BASIC interpreter written in standard C in dual files. It aims to be embeddable, extendable and portable. It is a dynamic typed programming language, reserves structured syntax, supports a style of [prototype-based programming](https://en.wikipedia.org/wiki/Prototype-based_programming) (OOP), also implements a functional paradigm by [lambda abstraction](https://en.wikipedia.org/wiki/Anonymous_function). The core is written in a C source file and an associated header file. It's easy to either use it as a standalone interpreter or embed it with existing projects in C, C++, Java, Objective-C, Swift, C#, etc. and totally customizable by adding your own scripting interface.











### Sans category...

- **harbour-core** [📁](./harbour-core) [🌐](https://github.com/GerHobbelt/core) -- Harbour is the free software implementation of a multi-platform, multi-threading, object-oriented, scriptable programming language, backward compatible with Clipper/xBase. Harbour consists of a compiler and runtime libraries with multiple UI and database backends, its own make system and a large collection of libraries and interfaces to many popular APIs.
- **miniscript** [📁](./miniscript) [🌐](https://github.com/GerHobbelt/miniscript) -- the [MiniScript scripting language](http://miniscript.org).
- **VisualScriptEngine** [📁](./VisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngine) -- A visual scripting engine designed for embedding. The engine is written in modern C++ and compiles on several platforms with no external dependencies.
- **wuffs** [📁](./wuffs) [🌐](https://github.com/GerHobbelt/wuffs) -- Wuffs is a **memory-safe programming language** (and a **standard library** written in that language) for **Wrangling Untrusted File Formats Safely**. Wrangling includes parsing, decoding and encoding.
- **wxVisualScriptEngine** [📁](./wxVisualScriptEngine) [🌐](https://github.com/GerHobbelt/VisualScriptEngineWxWidgets) -- a utility module for [VisualScriptEngine](https://github.com/kovacsv/VisualScriptEngine) which provides helper classes for embedding the engine in a wxWidgets application.











### Misc. tooling

- **cppdap** [📁](./cppdap) [🌐](https://github.com/GerHobbelt/cppdap) -- a C++11 library (["SDK"](https://microsoft.github.io/debug-adapter-protocol/implementors/sdks/)) implementation of the [Debug Adapter Protocol](https://microsoft.github.io/debug-adapter-protocol/), providing an API for implementing a DAP client or server. `cppdap` provides C++ type-safe structures for the full [DAP specification](https://microsoft.github.io/debug-adapter-protocol/specification), and provides a simple way to add custom protocol messages.
- **pccts** [📁](./pccts) [🌐](https://github.com/GerHobbelt/pccts) -- PCCTS / ANTLR 1 (Purdue Compiler-Construction Tool Set), a set of public domain software tools designed to facilitate the implementation of compilers and other translation systems. The canonical source is [polhode.com (maintainer: Tom Moog)](http://www.polhode.com/pccts.html); [this github repository](https://github.com/GerHobbelt/pccts) carries my own derivative (a.k.a. "fork"), which includes a few additional bugfixes and a tweak here & there.
- **PEGTL** [📁](./PEGTL) [🌐](https://github.com/GerHobbelt/PEGTL) -- the Parsing Expression Grammar Template Library (PEGTL) is a zero-dependency C++ header-only parser combinator library for creating parsers according to a [Parsing Expression Grammar](http://en.wikipedia.org/wiki/Parsing_expression_grammar) (PEG).
- **ragel** [📁](./ragel) [🌐](https://github.com/GerHobbelt/ragel) -- State Machine Compiler
- **re2c** [📁](./re2c) [🌐](https://github.com/GerHobbelt/re2c) -- a lexer generator for C/C++, Go and Rust. Its main goal is generating fast lexers: at least as fast as their reasonably optimized hand-coded counterparts. Instead of using traditional table-driven approach, re2c encodes the generated finite state automata directly in the form of conditional jumps and comparisons. The resulting programs are faster and often smaller than their table-driven analogues, and they are much easier to debug and understand. re2c applies quite a few optimizations in order to speed up and compress the generated code.  Another distinctive feature is its flexible interface: instead of assuming a fixed program template, re2c lets the programmer write most of the interface code and adapt the generated lexer to any particular environment.
- **RE-flex** [📁](./RE-flex) [🌐](https://github.com/GerHobbelt/RE-flex) -- the regex-centric, fast lexical analyzer generator for C++ with full Unicode support. Faster than Flex. Accepts Flex specifications. Generates reusable source code that is easy to understand. Introduces indent/dedent anchors, lazy quantifiers, functions for lex/syntax error reporting and more. Seamlessly integrates with Bison and other parsers.
  
  The RE/flex matcher tracks line numbers, column numbers, and indentations, whereas Flex does not (option `noyylineno`) and neither do the other regex matchers (except PCRE2 and Boost.Regex when used with RE/flex).
  Tracking this information incurs some overhead. RE/flex also automatically decodes UTF-8/16/32 input and accepts `std::istream`, strings, and wide strings as input.
  
  RE/flex runs equally fast or slightly faster than the best times of Flex.

- **ScriptX** [📁](./ScriptX) [🌐](https://github.com/GerHobbelt/ScriptX) -- Tencent's [ScriptX](https://github.com/Tencent/ScriptX) is a script engine abstraction layer. A variety of script engines are encapsulated on the bottom and a unified API is exposed on the top, so that the upper-layer caller can completely isolate the underlying engine implementation (back-end).
  
  ScriptX not only isolates several JavaScript engines (e.g. V8 and QuickJS), but can even isolate different scripting languages, so that the upper layer can seamlessly switch between scripting engine and scripting language without changing the code.

- **sml** [📁](./sml) [🌐](https://github.com/GerHobbelt/sml) -- SML (State Machine Language) is your scalable C++14 **one header only** State Machine Library with no dependencies.





---













