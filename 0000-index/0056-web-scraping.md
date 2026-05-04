









## web scraping (document extraction, cleaning, metadata extraction, BibTeX, ...)

(see also investigation notes in Qiqqa docs)

- **boost-url** [📁](./boost-url) [🌐](https://github.com/GerHobbelt/boost-url) -- a library for manipulating (RFC3986) Uniform Resource Identifiers (URIs) and Locators (URLs).
- **cURL** [📁](../../thirdparty/curl) [🌐](https://github.com/GerHobbelt/thirdparty-curl) -- the ubiquitous [libcurl](http://curl.haxx.se/libcurl).
- **curl-impersonate** [📁](./curl-impersonate) [🌐](https://github.com/GerHobbelt/curl-impersonate) -- a special build of [curl](https://github.com/curl/curl) that can impersonate the four major browsers: Chrome, Edge, Safari & Firefox. curl-impersonate is able to perform TLS and HTTP handshakes that are identical to that of a real browser.
- **curlpp** [📁](./curlpp) [🌐](https://github.com/GerHobbelt/curlpp) -- [cURLpp](http://www.curlpp.org) is a C++ wrapper for libcURL.
- **curl-www** [📁](./curl-www) [🌐](https://github.com/GerHobbelt/curl-www) -- the curl.se web site contents.
- **easyexif** [📁](./easyexif) [🌐](https://github.com/GerHobbelt/easyexif) -- EasyEXIF is a tiny, lightweight C++ library that parses basic (EXIF) information out of JPEG files. It uses only the std::string library and is otherwise pure C++. You pass it the binary contents of a JPEG file, and it parses several of the most important EXIF fields for you.
- **everything-curl** [📁](./everything-curl) [🌐](https://github.com/GerHobbelt/everything-curl) -- *Everything curl* is an extensive guide for all things curl. The project, the command-line tool, the library, how everything started and how it came to be the useful tool it is today. It explains how we work on developing it further, what it takes to use it, how you can contribute with code or bug reports and why millions of existing users use it.
- **exif** [📁](./exif) [🌐](https://github.com/GerHobbelt/exif) -- a small command-line utility to show EXIF information hidden in JPEG files, demonstrating the power of libexif.
- **exiv2** [📁](./exiv2) [🌐](https://github.com/GerHobbelt/exiv2) -- a C++ library and a command-line utility to read, write, delete and modify Exif, IPTC, XMP and ICC image metadata.
- **extract** [📁](../../thirdparty/extract) [🌐](https://github.com/GerHobbelt/thirdparty_extract) -- clone of git://git.ghostscript.com/extract.git
- **faup** [📁](./faup) [🌐](https://github.com/GerHobbelt/faup) -- **Faup** stands for Finally An Url Parser and is a library and command line tool to parse URLs and normalize fields with two constraints: (1) work with real-life urls (resilient to badly formated ones), and (2) be fast: no allocation for string parsing and read characters only once.
- **GQ-gumbo-css-selectors** [📁](./GQ-gumbo-css-selectors) [🌐](https://github.com/GerHobbelt/GQ) -- GQ is a CSS Selector Engine for [Gumbo Parser](https://github.com/google/gumbo-parser) written in C++11. Using Gumbo Parser as a backend, GQ can parse input HTML and allow users to select and modify elements in the parsed document with CSS Selectors and the provided simple, but powerful mutation API.
- **gumbo-libxml** [📁](./gumbo-libxml) [🌐](https://github.com/GerHobbelt/gumbo-libxml) -- LibXML2 bindings for the Gumbo HTML5 parser: this provides a libxml2 API on top of the Gumbo parser.  It lets you use a modern parser - Gumbo now passes all html5lib tests, including the template tag, and should be fully conformant with the HTML5 spec - with the full ecosystem of libxml tools, including XPath, tree modification, DTD validation, etc.
- **gumbo-parser** [📁](../../thirdparty/gumbo-parser) [🌐](https://github.com/GerHobbelt/gumbo-parser) -- HTML parser
- **gumbo_pp** [📁](./gumbo_pp) [🌐](https://github.com/GerHobbelt/gumbo_pp) -- a C++ wrapper over Gumbo that provides a higher level query mechanism.
- **gumbo-query** [📁](./gumbo-query) [🌐](https://github.com/GerHobbelt/gumbo-query) -- HTML DOM access in C/C++
- **hescape** [📁](./hescape) [🌐](https://github.com/GerHobbelt/hescape) -- a C library for fast HTML escape using SSE instruction, `pcmpestri`. Hescape provides only one API, `hesc_escape_html()`.
- **houdini** [📁](./houdini) [🌐](https://github.com/GerHobbelt/houdini) -- Houdini - The Escapist: is zero-dependency and modular. Houdini is a simple API for escaping text for the web. And unescaping it. HTML escaping follows the OWASP suggestion. All other entities are left as-is. HTML unescaping is fully RFC-compliant. Yes, that's the 253 different entities for you, and decimal/hex code point specifiers. URI escaping and unescaping is fully RFC-compliant. URL escaping and unescaping is the same as generic URIs, but spaces are changed to `+`.
- **html5-parser** [📁](./html5-parser) [🌐](https://github.com/GerHobbelt/html5-parser) -- a *fast*, standards compliant, C based, HTML 5 parser for python. Over **thirty** times as fast as pure python based parsers, such as html5lib.
- **htmlstreamparser** [📁](./htmlstreamparser) [🌐](https://github.com/GerHobbelt/htmlstreamparser) -- used in a demo of zsync2
- **http-parser** [📁](./http-parser) [🌐](https://github.com/GerHobbelt/http-parser) -- a parser for HTTP messages written in C. It parses both requests and responses. The parser is designed to be used in performance HTTP applications. It does not make any syscalls nor allocations, it does not buffer data, it can be interrupted at anytime. Depending on your architecture, it only requires about 40 bytes of data per message stream (in a web server that is per connection).
- **lexbor** [📁](./lexbor) [🌐](https://github.com/GerHobbelt/lexbor) -- fast HTML5 fully-conformant HTML + CSS parser.
- **libcpr** [📁](./libcpr) [🌐](https://github.com/GerHobbelt/cpr) -- wrapper library for cURL. C++ Requests is a simple wrapper around [libcurl](http://curl.haxx.se/libcurl) inspired by the excellent [Python Requests](https://github.com/kennethreitz/requests) project. Despite its name, libcurl's easy interface is anything but, and making mistakes misusing it is a common source of error and frustration. Using the more expressive language facilities of C++11, this library captures the essence of making network calls into a few concise idioms.
- **libexif** [📁](./libexif) [🌐](https://github.com/GerHobbelt/libexif) -- a library for parsing, editing, and saving EXIF data. In addition, it has gettext support. All EXIF tags described in EXIF standard 2.1 (and most from 2.2) are supported.  Many maker notes from Canon, Casio, Epson, Fuji, Nikon, Olympus, Pentax and Sanyo cameras are also supported.
- **libexpat** [📁](./libexpat) [🌐](https://github.com/GerHobbelt/libexpat) -- XML read/write
- **libhog** [📁](./libhog) [🌐](https://github.com/GerHobbelt/libhog) -- `hog` a.k.a. `hound` - fetch the (PDF,EPUB,HTML) document you seek using maximum effort: `hog` is a tool for fetching *files* from the internet, specifically PDFs. Intended to be used where you browse the 'Net and decide you want to download a given PDF from any site: this can be done through the browser itself, but is sometimes convoluted or neigh impossible (ftp links require another tool, PDFs stored at servers which report as having their SSL certificates *expired* are a hassle to get through for the user-in-a-hurry, etc. etc.) and `hog` is meant to cope with all these.
- **libidn2** [📁](./libidn2) [🌐](https://github.com/GerHobbelt/libidn2) -- international domain name parsing
- **libpsl** [📁](./libpsl) [🌐](https://github.com/GerHobbelt/libpsl) -- handles the *Public Suffix List* (a collection of Top Level Domains (TLDs) suffixes, e.g. `.com`, `.net`, *Country Top Level Domains* (ccTLDs) like `.de` and `.cn` and *[Brand Top Level Domains](https://icannwiki.org/Brand_TLD)* like `.apple` and `.google`. Can be used to:
  
  - avoid privacy-leaking "super domain" certificates ([see post from Jeffry Walton](https://lists.gnu.org/archive/html/bug-wget/2014-03/msg00093.html))
  - avoid privacy-leaking "supercookies"
  - domain highlighting parts of the domain in a user interface
  - sorting domain lists by site

- **libunisani** [📁](./libunisani) [🌐](https://github.com/GerHobbelt/libunisani) -- a sanitizer, sluggifier, normalizer, detoxer for Unicode and ASCII text strings. A customizable unified approach to filtering raw input for text, file names and paths, URL and file 'slugs' and various other outputs that require potential sanitization of your input texts / strings.
- **libxml2** [📁](./libxml2) [🌐](https://github.com/GerHobbelt/libxml2) -- [libxml](http://xmlsoft.org/): XML read/write
- **LLhttp-parser** [📁](./LLhttp-parser) [🌐](https://github.com/GerHobbelt/llhttp) -- a port and replacement of [http_parser](https://github.com/nodejs/http-parser) to TypeScript. [llparse](https://github.com/nodejs/llparse) is used to generate the output C source file, which could be compiled and linked with the embedder's program (like Node.js).
- **picohttpparser** [📁](./picohttpparser) [🌐](https://github.com/GerHobbelt/picohttpparser) -- PicoHTTPParser is a tiny, primitive, fast HTTP request/response parser. Unlike most parsers, it is stateless and does not allocate memory by itself. All it does is accept pointer to buffer and the output structure, and setups the pointers in the latter to point at the necessary portions of the buffer.
- **qs_parse** [📁](./qs_parse) [🌐](https://github.com/GerHobbelt/qs_parse) -- a set of simple and easy functions for parsing URL query strings, such as those generated in an HTTP GET form submission.
- **robotstxt** [📁](./robotstxt) [🌐](https://github.com/GerHobbelt/robotstxt) -- Google `robots.txt` Parser and Matcher Library. The Robots Exclusion Protocol (REP) is a standard that enables website owners to control which URLs may be accessed by automated clients (i.e. crawlers) through a simple text file with a specific syntax. It's one of the basic building blocks of the internet as we know it and what allows search engines to operate. Because the REP was only a de-facto standard for the past 25 years, different implementers implement parsing of robots.txt slightly differently, leading to confusion. This project aims to fix that by releasing the parser that Google uses.
- **sist2** [📁](./sist2) [🌐](https://github.com/GerHobbelt/sist2) -- sist2 (Simple incremental search tool) is a fast, low memory usage, multi-threaded application, which scans drives and directory trees, extracts text and metadata from common file types, generates thumbnails and comes with OCR support (with tesseract) and  Named-Entity Recognition (using pre-trained client-side tensorflow models).
- **tidy-html5** [📁](./tidy-html5) [🌐](https://github.com/GerHobbelt/tidy-html5) -- clean up HTML documents before archiving/processing
- **URI-Encode-C** [📁](./URI-Encode-C) [🌐](https://github.com/GerHobbelt/URI-Encode-C) -- an optimized C library for percent encoding/decoding text, i.e. a URI encoder/decoder written in C based on [RFC3986](https://tools.ietf.org/html/rfc3986).
- **url** [📁](./url) [🌐](https://github.com/GerHobbelt/url) -- URI parsing and other utility functions
- **URL-Detector** [📁](./URL-Detector) [🌐](https://github.com/GerHobbelt/URL-Detector) -- Url Detector is a library created by the Linkedin Security Team to detect and extract urls in a long piece of text. Keep in mind that for security purposes, its better to overdetect urls: instead of complying with RFC 3986 (http://www.ietf.org/rfc/rfc3986.txt), we try to detect based on browser behavior, optimizing detection for urls that are visitable through the address bar of Chrome, Firefox, Internet Explorer, and Safari. It is also able to identify the parts of the identified urls.
- **url-parser** [📁](./url-parser) [🌐](https://github.com/GerHobbelt/url.h) -- parse URLs much like Node's [url](http://nodejs.org/api/url.html) module.
- **wget2** [📁](./wget2) [🌐](https://github.com/GerHobbelt/wget2) -- GNU Wget2 is the successor of GNU Wget, a file and recursive website downloader. Designed and written from scratch it wraps around libwget, that provides the basic functions needed by a web client. Wget2 works multi-threaded and uses many features to allow fast operation. In many cases Wget2 downloads much faster than Wget1.x due to HTTP2, HTTP compression, parallel connections and use of If-Modified-Since HTTP header.
- **xml-pugixml** [📁](./xml-pugixml) [🌐](https://github.com/GerHobbelt/pugixml) -- light-weight, simple and fast XML parser for C++ with XPath support.
- **xmlwrapp** [📁](./xmlwrapp) [🌐](https://github.com/GerHobbelt/xmlwrapp) -- a modern style C++ library for working with XML data, built atop the venerable libxml2 and libxslt C libraries.













	
----

🡸 [previous section](./0055-pdf.md)  |  🡹 [up](./0016-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0104-libraries-in-this-collection.md)  |  🡺 [next section](./0057-audio-files-processing.md)
