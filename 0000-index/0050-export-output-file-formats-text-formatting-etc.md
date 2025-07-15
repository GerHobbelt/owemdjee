

## export / output file formats, text formatting, etc.

- **bustache** [📁](./bustache) [🌐](https://github.com/GerHobbelt/bustache) -- C++20 implementation of [{{ mustache }}](http://mustache.github.io/), compliant with [spec](https://github.com/mustache/spec) v1.1.3.
- **fast_double_parser** [📁](./fast_double_parser) [🌐](https://github.com/GerHobbelt/fast_double_parser) -- 4x faster than `strtod()`. Unless you need support for [RFC 7159](https://tools.ietf.org/html/rfc7159) (JSON standard), we encourage users to adopt [fast_float](https://github.com/fastfloat/fast_float) library instead. It has more functionality. Fast function to parse ASCII strings containing decimal numbers into double-precision (binary64) floating-point values.  That is, given the string "1.0e10", it should return a 64-bit floating-point value equal to 10000000000. We do not sacrifice accuracy. The function will match exactly (down the smallest bit) the result of a standard function like `strtod`.
- **fast_float** [📁](./fast_float) [🌐](https://github.com/GerHobbelt/fast_float) -- fast and exact implementation of the C++ `from_chars` functions for float and double types: 4x faster than `strtod`
- **fast-hex** [📁](./fast-hex) [🌐](https://github.com/GerHobbelt/fast-hex) -- a fast, SIMD (vectorized) hex string encoder/decoder.
- **fmt** [📁](./fmt) [🌐](https://github.com/GerHobbelt/fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
- **hypertextcpp** [📁](./hypertextcpp) [🌐](https://github.com/GerHobbelt/hypertextcpp) -- string/text template engine & source-to-source compiler.
- **inja** [📁](./inja) [🌐](https://github.com/GerHobbelt/inja) -- a template engine for modern C++, loosely inspired by [jinja](http://jinja.pocoo.org) for python. It has an easy and yet powerful template syntax with all variables, loops, conditions, includes, callbacks, and comments you need, nested and combined as you like.
- **libfort** [📁](./libfort) [🌐](https://github.com/GerHobbelt/libfort) -- a simple crossplatform library to create formatted text tables.
- **libqrencode** [📁](./libqrencode) [🌐](https://github.com/GerHobbelt/libqrencode) -- generate QRcodes from anything (e.g. URLs). `libqrencode` is a fast and compact library for encoding data in a QR Code, a 2D symbology that can be scanned by handy terminals such as a smartphone. The capacity of QR Code is up to 7000 digits or 4000 characters and has high robustness. `libqrencode` supports QR Code model 2, described in JIS (Japanese Industrial Standards) X0510:2004 or ISO/IEC 18004. Most of features in the specification are implemented: Numeric, alphabet, Japanese kanji (Shift-JIS) or any 8 bit code, Optimized encoding of a string, Structured-append of symbols, Micro QR Code (experimental).
- **PDFGen** [📁](./PDFGen) [🌐](https://github.com/GerHobbelt/PDFGen) -- a simple PDF Creation/Generation library, contained in a single C-file with header and no external library dependencies. Useful for embedding into other programs that require rudimentary PDF output.
- **quirc** [📁](./quirc) [🌐](https://github.com/GerHobbelt/quirc) -- a library for extracting and decoding QR codes, which are a type of high-density matrix barcodes, from images. It features a fast, robust and tolerant recognition algorithm. It can correctly recognise and decode QR codes which are rotated and/or oblique to the camera. It can also distinguish and decode multiple codes within the same image.
- **see-phit** [📁](./see-phit) [🌐](https://github.com/GerHobbelt/see-phit) -- a compile time HTML templating library written in modern C++/14. You write plain HTML as C++ string literals and it is parsed at compile time into a DOM like data structure. It makes your "stringly typed" HTML text into an actual strongly typed DSL.
- **sile-typesetter** [📁](./sile-typesetter) [🌐](https://github.com/GerHobbelt/sile) -- SILE is a typesetting system; its job is to produce beautiful printed documents. Conceptually, SILE is similar to TeX—from which it borrows some concepts and even syntax and algorithms—but the similarities end there. Rather than being a derivative of the TeX family SILE is a new typesetting and layout engine written from the ground up using modern technologies and borrowing some ideas from graphical systems such as Adobe InDesign.
- **tabulate** [📁](./tabulate) [🌐](https://github.com/GerHobbelt/tabulate) -- Table Maker for Modern C++, for when you want to display table formatted data in the terminal/console text window.
- **textflowcpp** [📁](./textflowcpp) [🌐](https://github.com/GerHobbelt/textflowcpp) -- a simple way to wrap a string at different line lengths, optionally with indents.
- **upskirt-markdown** [📁](./upskirt-markdown) [🌐](https://github.com/GerHobbelt/soldout) -- MarkDown renderer
  
  - **svg-charter** [📁](./svg-charter) [🌐](https://github.com/GerHobbelt/charter) -- SVG chart renderer
    
    - **tinyexpr** [📁](./tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr) -- a very small recursive descent parser and evaluation engine for math expressions.

- **variadic_table** [📁](./variadic_table) [🌐](https://github.com/GerHobbelt/variadic_table) -- for "pretty-printing" a formatted table of data to the console. It uses "variadic templates" to allow you to specify the types of data in each column.















	
----

🡸 [prev](./0049-bibtex-and-similar-library-metadata-formats.md)  |  🡹 [up](./0006-libraries-we-re-looking-at-for-this-intent.md)  |  🡺 [next](./0051-fts.md)
