









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













	
----

🡸 [previous section](./0014-sans-category.md)  |  🡹 [up](./0001-script-languages-for-embedding-in-c-c-applications.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0016-libraries-we-re-looking-at-for-this-intent.md)
