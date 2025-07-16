









### multi-processing: event handling, signals, asynchronous operation

- **cpp.react** [📁](./cpp.react) [🌐](https://github.com/GerHobbelt/cpp.react) -- C++React is a reactive programming library for C++14. It enables the declarative definition of data dependencies between state and event flows. Based on these definitions, propagation of changes is handled automatically.
- **eventpp** [📁](./eventpp) [🌐](https://github.com/GerHobbelt/eventpp) -- a C++ event library for callbacks, event dispatcher, and event queue. With eventpp you can easily implement signal and slot mechanism, publisher and subscriber pattern, or observer pattern.
- **libevent** [📁](./libevent) [🌐](https://github.com/GerHobbelt/libevent) -- _libevent_ is meant to replace the event loop found in event driven network servers.
  
  Currently, _libevent_ supports _[/dev/poll](http://download.oracle.com/docs/cd/E19253-01/816-5177/6mbbc4g9n/index.html)_, _[kqueue(2)](http://www.freebsd.org/cgi/man.cgi?query=kqueue&apropos=0&sektion=0&format=html)_, _[event ports](http://developers.sun.com/solaris/articles/event_completion.html)_, [POSIX _select(2)_](http://manpages.debian.net/cgi-bin/man.cgi?query=select), [Windows _select()_](http://msdn.microsoft.com/en-us/library/ms740141(v=vs.85).aspx), [_poll(2)_](http://manpages.debian.net/cgi-bin/man.cgi?query=poll), and _[epoll(4)](http://www.xmailserver.org/linux-patches/epoll.txt)_. The internal event mechanism is completely independent of the exposed event API, and a simple update of libevent can provide new functionality without having to redesign the applications. As a result, _Libevent_ allows for portable application development and provides the most scalable event notification mechanism available on an operating system. Libevent can also be used for multi-threaded applications, either by isolating each `event_base` so that only a single thread accesses it, or by locked access to a single shared `event_base`. _Libevent_ should compile on Linux, *BSD, Mac OS X, Solaris, Windows, and more.
  
  Libevent additionally provides a sophisticated framework for buffered network IO, with support for sockets, filters, rate-limiting, SSL, zero-copy file transmission, and IOCP. Libevent includes support for several useful protocols, including DNS, HTTP, and a minimal RPC framework.

- **libocca** [📁](./libocca) [🌐](https://github.com/GerHobbelt/occa) -- a portable and vendor neutral framework for parallel programming on heterogeneous platforms. The OCCA API provides unified models for heterogeneous programming concepts&mdash;such as a device, memory, or kernel&mdash;while the OCCA Kernel Language (OKL) enables the creation of portable device kernels using a directive-based extension to the C-language.
- **libsigcplusplus** [📁](./libsigcplusplus) [🌐](https://github.com/GerHobbelt/libsigcplusplus) -- libsigc++ : The Typesafe Callback Framework for C++. It allows you to define signals and to connect those signals to any callback function, either global or a member function, regardless of whether it is static or virtual.
- **libuv** [📁](./libuv) [🌐](https://github.com/GerHobbelt/libuv) -- a multi-platform support library with a focus on asynchronous I/O.
  
  Feature highlights:
  
  * Full-featured event loop backed by epoll, kqueue, IOCP, event ports.
  * Asynchronous TCP and UDP sockets
  * Asynchronous DNS resolution
  * Asynchronous file and file system operations
  * File system events
  * ANSI escape code controlled TTY
  * IPC with socket sharing, using Unix domain sockets or named pipes (Windows)
  * Child processes
  * Thread pool
  * Signal handling
  * High resolution clock
  * Threading and synchronization primitives

- **nano-signal-slot** [📁](./nano-signal-slot) [🌐](https://github.com/GerHobbelt/nano-signal-slot) -- pure C++17 Signals and Slots (observer pattern)
- **observable** [📁](./observable) [🌐](https://github.com/GerHobbelt/observable) -- use the observer pattern in C++11 multithreaded programs with observable/observer classes or signals/slots.
- **pevents** [📁](./pevents) [🌐](https://github.com/GerHobbelt/pevents) -- Win32 events for *nix/POSIX platforms, built on top of `pthreads`. `pevents` provides most of the functionality of both manual- and auto-reset events on Windows, most-notably including simultaneous waits on multiple events (à la `WaitForMultipleObjects`). `pevents` also doubles as a thin, sane wrapper for `CreateEvent()` & co. on Windows, meaning you can use `pevents` directly in your cross-platform code without `#ifdef`s for Windows/pthreads. While POSIX condition variables (pthread_cond_t) and WIN32 events both provide the essential building blocks of the synchronization primitives required to write multithreaded code with signaling, the nature of the differences between the two have lent their way towards creating different synchronization and multithreaded-programming paradigms. The only features not included are only named events and support for security attributes. To the author's best knowledge, this is the only implementation of WIN32 events available for Linux and other posix platforms that provides support for simultaneously waiting on multiple events. Depending on your needs, we've been told that pevents may be used as a lightweight alternative to libuv/libev while still allowing your code to embrace asynchronous event handling with ease.
- **ReactivePlusPlus** [📁](./ReactivePlusPlus) [🌐](https://github.com/GerHobbelt/ReactivePlusPlus) -- a reactive programming library for C++20 language inspired by "official implementation" ([RxCpp](https://github.com/ReactiveX/RxCpp)) and original idea ([ReactiveX](https://reactivex.io/)) that only depends on standard library and C++20 features (mostly on [concepts](https://en.cppreference.com/w/cpp/language/constraints)).
- **Signals** [📁](./Signals) [🌐](https://github.com/GerHobbelt/Signals) -- a lightweight "signals and slots" implementation using fast delegates. When GUI programming in C++, delegates and the signals and slots paradigm can vastly simplify your code. It implements the Observer pattern while avoiding all the boilerplate code. I needed a lightweight and efficient implementation that I could just drop into my projects and use without adding weird macros, inheriting from crazy templates or having external dependencies. I wanted something simpler and more efficient than libsigc++, sigslot, and boost.signals.
- **signal-slot-benchmarks** [📁](./signal-slot-benchmarks) [🌐](https://github.com/GerHobbelt/signal-slot-benchmarks) -- comprehensive benchmarks for a majority of GitHub c++ signal slot implementations and others. These benchmarks do not accurately depict real world usage patterns seen in the wild. However, these benchmarks were designed to provide impartial results regardless of implementation.
- **signals-rt** [📁](./signals-rt) [🌐](https://github.com/GerHobbelt/signals-rt) -- this Signal-Slot library is optimized for video games (and probably other low-latency applications as well). Interestingly, even though the observer pattern is generally useful, it has never been standardized in C++, which leads to the never-ending attempts at improvements by curious people. Many signal-slot libraries do not focus on performance, e.g. `boost::signals2` [invocation can be 90x more expensive than a simple function call](https://stackoverflow.com/questions/22416860/is-boostsignals2-overkill-for-simple-applications). This work is based on previous [research](https://github.com/TheWisp/ImpossiblyFastEventCPP17) which focused on the syntax and performance improvements brought by a C++17 feature - `template<auto>`. This library is a combination of modern C++ exploration, system programming and data-structure design. It aims to become feature-complete like `boost::signals`, yet extremely light-weight - both run time and memory footprint - in order to replace _interface_ or `std::function` based callbacks. `signal` emission is **faster** than virtual function calls. Compared to virtual calls, `signal` calls only take between 22% and 77% of the time, depending on the number and the level of randomness of classes and objects.
- **sigslot** [📁](./sigslot) [🌐](https://github.com/GerHobbelt/sigslot) -- a header-only, thread safe implementation of signal-slots for C++. The main goal was to replace Boost.Signals2.
- **uvw** [📁](./uvw) [🌐](https://github.com/GerHobbelt/uvw) -- `libuv` wrapper in modern C++. `uvw` started as a header-only, event based, tiny and easy to use wrapper for [`libuv`](https://github.com/libuv/libuv) written in modern C++.  Now it's finally available also as a compilable static library. The basic idea is to wrap the *C-ish* interface of `libuv` behind a graceful C++ API.













	
----

🡸 [previous section](./0073-multi-processing-running-tasks-in-parallel-multi-processing-multithreading.md)  |  🡹 [up](./0066-multi-processing-core-technologies.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0075-multi-processing-task-schedulers.md)
