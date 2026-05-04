









### ECMA + JavaScript*ease*

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













	
----

🡸 [previous section](./0004-expression-parsers-of-various-kinds.md)  |  🡹 [up](./0001-script-languages-for-embedding-in-c-c-applications.md)  |  🡻 [all (index)](./0104-libraries-in-this-collection.md)  |  🡺 [next section](./0006-igor-s-lisp-vetinari-s-scheming.md)
