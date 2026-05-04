









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













	
----

🡸 [previous section](./0077-run-time-library-core-features-logging-formatting.md)  |  🡹 [up](./0016-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0104-libraries-in-this-collection.md)  |  🡺 [next section](./0079-socket-i-o-websockets.md)
