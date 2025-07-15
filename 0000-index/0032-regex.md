

### regex matchers (manual edit - pattern recognition)

- **hyperscan** [📁](./hyperscan) [🌐](https://github.com/GerHobbelt/hyperscan) -- Hyperscan is a high-performance multiple regex matching library.
- **libfsm** [📁](./libfsm) [🌐](https://github.com/GerHobbelt/libfsm) -- provides core functions for finite state machines: NFA, DFA, regular expressions and lexical analysis. Used by `ragel`.
- **libgnurx** [📁](./libgnurx) [🌐](https://github.com/GerHobbelt/libgnurx) -- the POSIX regex functionality from glibc extracted into a separate library, for Win32.
- **libwildmatch** [📁](./libwildmatch) [🌐](https://github.com/GerHobbelt/wildmatch) -- wildmatch is a BSD-licensed C/C++ library for git/rsync-style pattern matching.
- **oniguruma** [📁](./oniguruma) [🌐](https://github.com/GerHobbelt/oniguruma) -- a modern and flexible regular expressions library. It encompasses features from different regular expression implementations that traditionally exist in different languages. Character encoding can be specified per regular expression object. Supported character encodings include: ASCII, UTF-8, UTF-16BE, UTF-16LE, UTF-32BE, UTF-32LE, EUC-JP, EUC-TW, EUC-KR, EUC-CN, Shift_JIS, Big5, GB18030, KOI8-R, CP1251, ISO-8859-1, ISO-8859-2, ISO-8859-3, ISO-8859-4, ISO-8859-5, ISO-8859-6, ISO-8859-7, ISO-8859-8, ISO-8859-9, ISO-8859-10, ISO-8859-11, ISO-8859-13, ISO-8859-14, ISO-8859-15, ISO-8859-16
- **pccts** [📁](./pccts) [🌐](https://github.com/GerHobbelt/pccts) -- PCCTS / ANTLR 1 (Purdue Compiler-Construction Tool Set), a set of public domain software tools designed to facilitate the implementation of compilers and other translation systems. The canonical source is [polhode.com (maintainer: Tom Moog)](http://www.polhode.com/pccts.html); [this github repository](https://github.com/GerHobbelt/pccts) carries my own derivative (a.k.a. "fork"), which includes a few additional bugfixes and a tweak here & there.
- **pcre** [📁](./pcre) [🌐](https://github.com/GerHobbelt/pcre) -- PCRE2 : Perl-Compatible Regular Expressions. The PCRE2 library is a set of C functions that implement regular expression pattern matching using the same syntax and semantics as Perl 5. PCRE2 has its own native API, as well as a set of wrapper functions that correspond to the POSIX regular expression API. It comes in three forms, for processing 8-bit, 16-bit, or 32-bit code units, in either literal or UTF encoding.
- **pdfgrep** [📁](./pdfgrep) [🌐](https://github.com/GerHobbelt/pdfgrep) -- a tool to search text in PDF files. It works similarly to *grep*.
- **ragel** [📁](./ragel) [🌐](https://github.com/GerHobbelt/ragel) -- State Machine Compiler
- **re2** [📁](./re2) [🌐](https://github.com/GerHobbelt/re2) -- RE2, a regular expression library.
- **re2c** [📁](./re2c) [🌐](https://github.com/GerHobbelt/re2c) -- a lexer generator for C/C++, Go and Rust. Its main goal is generating fast lexers: at least as fast as their reasonably optimized hand-coded counterparts. Instead of using traditional table-driven approach, re2c encodes the generated finite state automata directly in the form of conditional jumps and comparisons. The resulting programs are faster and often smaller than their table-driven analogues, and they are much easier to debug and understand. re2c applies quite a few optimizations in order to speed up and compress the generated code.  Another distinctive feature is its flexible interface: instead of assuming a fixed program template, re2c lets the programmer write most of the interface code and adapt the generated lexer to any particular environment.
- **RE-flex** [📁](./RE-flex) [🌐](https://github.com/GerHobbelt/RE-flex) -- the regex-centric, fast lexical analyzer generator for C++ with full Unicode support. Faster than Flex. Accepts Flex specifications. Generates reusable source code that is easy to understand. Introduces indent/dedent anchors, lazy quantifiers, functions for lex/syntax error reporting and more. Seamlessly integrates with Bison and other parsers.
  
  The RE/flex matcher tracks line numbers, column numbers, and indentations, whereas Flex does not (option `noyylineno`) and neither do the other regex matchers (except PCRE2 and Boost.Regex when used with RE/flex).
  Tracking this information incurs some overhead. RE/flex also automatically decodes UTF-8/16/32 input and accepts `std::istream`, strings, and wide strings as input.
  
  RE/flex runs equally fast or slightly faster than the best times of Flex.

- **tre** [📁](./tre) [🌐](https://github.com/GerHobbelt/tre) -- TRE is a lightweight, robust, and efficient POSIX compliant regexp matching library with some exciting features such as approximate (fuzzy) matching. The matching algorithm used in TRE uses linear worst-case time in the length of the text being searched, and quadratic worst-case time in the length of the used regular expression.
- **ugrep** [📁](./ugrep) [🌐](https://github.com/GerHobbelt/ugrep) -- search for anything in everything... ultra fast. "*`grep` for arbitrary binary files*."
- **yara-pattern-matcher** [📁](./yara-pattern-matcher) [🌐](https://github.com/GerHobbelt/yara) -- for automated and user-specified pattern recognition in custom document & metadata *cleaning* / processing tasks











