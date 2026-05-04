









## logging & debugging

- **binary_log** [📁](./binary_log) [🌐](https://github.com/GerHobbelt/binary_log) -- a fast C++20 library which logs messages in a compact binary format while using [fmtlib](https://github.com/fmtlib/fmt) to format the logs.
- **binlog** [📁](./binlog) [🌐](https://github.com/GerHobbelt/binlog) -- a high performance C++ log library to produce structured binary logs.
- **breakpad** [📁](./breakpad) [🌐](https://github.com/GerHobbelt/breakpad) -- a set of client and server components which implement a crash-reporting system.
  
  - **left-for-dead**; reason: nice idea, but slightly too GCC specific. has some GCC + Linux specific coding constructs: intrinsics + Linux-only API calls, which increase the cost of porting.

- **capture-thread** [📁](./capture-thread) [🌐](https://github.com/GerHobbelt/capture-thread) -- framework for loggers, tracers, and mockers in multithreaded C++ programs. When developing C++ projects, [instrumentation][instrumentation] is frequently used to collect information from the system, inject information into the system, or both. The role of this information within the system rarely lines up with the actual structure of the project. This library is designed to handle all of these situations with minimal intrusion into your project, and without leaking details in your API. The **Capture Thread Library** is designed around the concept of thread-locality, which allows the sharing of static variables *only within the current thread*. Canonical static variables, on the other hand, are problematic due to ownership and thread-safety issues.
- **clp** [📁](./clp) [🌐](https://github.com/GerHobbelt/clp) -- YScope's Compressed Log Processor (CLP) compresses your logs, and allows you to search the compressed logs without decompression. CLP supports both JSON logs and unstructured (i.e., free text) logs. It also supports real-time log compression within several logging libraries. CLP also includes purpose-built web interfaces for searching and viewing the compressed logs.
- **fmt** [📁](./fmt) [🌐](https://github.com/GerHobbelt/fmt) -- advanced C++ data-to-text formatter. The modern answer to classic `printf()`.
- **g3log** [📁](./g3log) [🌐](https://github.com/GerHobbelt/g3log) -- G3log is an asynchronous logger with three main features: 
  
  1. Intuitive `LOG(...)` API
  2. `Design-by-contract` `CHECK(...)` functionality
  3. Fatal crash handling for graceful shutdown of the logged process without loosing any log details up to the point of the crash.

- **glog** [📁](./glog) [🌐](https://github.com/GerHobbelt/glog) -- Google Logging is a C++98 library that implements application-level logging. The library provides logging APIs based on C++-style streams and various helper macros.
- **KDSPDSetup** [📁](./KDSPDSetup) [🌐](https://github.com/GerHobbelt/KDSPDSetup) -- a minimal reimplementation of the unmaintained [spdlog_setup](https://github.com/guangie88/spdlog_setup) library for modern C++ projects.
- **libassert** [📁](./libassert) [🌐](https://github.com/GerHobbelt/libassert) -- the most over-engineered and overpowered C++ assertion library. **Library philosophy**: Provide as much helpful diagnostic info as possible.
- **libdiagnostics** [📁](./libdiagnostics) [🌐](https://github.com/GerHobbelt/libdiagnostics) -- a C/C++ diagnostics logging library with support for writing HTML and store images and misc binary data to disk alongside. or when a mere logfile doesn't suffice.
- **libevt** [📁](./libevt) [🌐](https://github.com/GerHobbelt/libevt) -- a library to access the Windows Event Log (EVT) format.
- **logger_benchmarks** [📁](./logger_benchmarks) [🌐](https://github.com/GerHobbelt/logger_benchmarks) -- benchmarking several C++ logging libraries.
- **loguru** [📁](./loguru) [🌐](https://github.com/GerHobbelt/loguru) -- a lightweight and flexible C++ logging library.
- **loki** [📁](./loki) [🌐](https://github.com/GerHobbelt/loki) -- Grafana Loki: like Prometheus, but for logs. Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by [Prometheus](https://prometheus.io/). It is designed to be very cost effective and easy to operate. It does not index the contents of the logs, but rather a set of labels for each log stream.
- **lwlog** [📁](./lwlog) [🌐](https://github.com/GerHobbelt/lwlog) -- a very fast C++17 logging library, which includes a static pre-allocated memory buffer for string manipulations to minimize dynamic memory allocations and promotes memory reuse and improves performance for high-frequency logging scenarios.
- **microsoft-performance-toolkit-sdk** [📁](./microsoft-performance-toolkit-sdk) [🌐](https://github.com/GerHobbelt/microsoft-performance-toolkit-sdk) -- The Microsoft Performance Toolkit is a collection of cross-platform tools developers can use to create and extend performance analysis applications. It serves as the runtime of the Windows Performance Analyzer, a Windows program included in the Windows Performance Toolkit. By using the Microsoft Performance Toolkit SDK, Windows Performance Analyzer - or any performance analysis application - can be configured to process and display performance data from arbitrary sources.
- **MuPDF itself**  [📁](../../) [🌐](https://github.com/GerHobbelt/mupdf) -- this MuPDF fork is geared towards use with [Qiqqa (document and citation manager)](https://github.com/jimmejardine/qiqqa-open-source/). It is based on [the original MuPDF work done by Artifex](https://artifex.com/products/mupdf/), _closely tracks the developments overthere_ and augments the codebase with other C/C++ based tools, which are useful in and around the Qiqqa document processes, such as
  
  * text extraction
  * metadata extraction (including annotations)
  * OCR (_text recognition_ as an required extension of _text extraction_ when you have image-based PDFs, which happens quite often in the wild)
  * Qiqqa database support (SQLite I/O; we do include the generic SQLite tools as well to "open up" the Qiqqa _core components_ for advanced usage and users who wish to perform custom actions on the collected and managed data)

- **netdata** [📁](./netdata) [🌐](https://github.com/GerHobbelt/netdata) -- <a href="https://www.netdata.cloud">Netdata</a> collects metrics per second and presents them in beautiful low-latency dashboards. It is designed to run on all of your physical and virtual servers, cloud deployments, Kubernetes clusters, and edge/IoT devices, to monitor your systems, containers, and applications. It scales nicely from just a single server to thousands of servers, even in complex multi/mixed/hybrid cloud environments, and given enough disk space it can keep your metrics for years.
- **opendtrace** [📁](./opendtrace) [🌐](https://github.com/GerHobbelt/opendtrace) -- unified, cross platform, source code for the OpenDTrace system including kernel components and tools for all of the platforms currently supported by the OpenDTrace system.
- **oppat** [📁](./oppat) [🌐](https://github.com/GerHobbelt/oppat) -- Open Power/Performance Analysis Tool (OPPAT) is a cross-OS, cross-architecture Power and Performance Analysis Tool. cross-OS: supports Windows ETW trace files and Linux/Android perf/trace-cmd trace files. cross-architecture: supports Intel and ARM chips hardware events (using perf and/or PCM).
- **palanteer** [📁](./palanteer) [🌐](https://github.com/GerHobbelt/palanteer) -- Visual Python and C++ nanosecond profiler, logger, tests enabler: a set of lean and efficient tools to improve the quality of software, for C++ and Python programs.
- **plf_nanotimer** [📁](./plf_nanotimer) [🌐](https://github.com/GerHobbelt/plf_nanotimer) -- high precision cross-platform performance timer
- **quill-logging** [📁](./quill-logging) [🌐](https://github.com/GerHobbelt/quill) -- asynchronous cross-platform low latency logging library based on C++14/C++17.
- **reckless** [📁](./reckless) [🌐](https://github.com/GerHobbelt/reckless) -- Reckless is an extremely low-latency, high-throughput logging library.
- **replxx** [📁](./replxx) [🌐](https://github.com/GerHobbelt/replxx) -- REPL CLI component: `readline` simile for REPL/interactive runs in a CLI
- **resumable-assert** [📁](./resumable-assert) [🌐](https://github.com/GerHobbelt/resumable-assert) -- `assert` replacement to continue execution in debugger. In any large app, it sometimes happens that some asserts are failing in code you don't currently care about, and blocking the entire team from being able to run the app until the issue is fixed is not the best workflow. So we usually end up moving the execution marker past the assert line in IDE or debugger, or even comment the assert out, recompile and relaunch. With Resumable Assert, you can simply continue execution when an assertion fails in debugger, or even disable asserts that you are not interested in, so that those never bother you again.
- **spdlog** [📁](./spdlog) [🌐](https://github.com/GerHobbelt/spdlog) -- very fast, header-only/compiled, C++ logging library.
- **spdlog_sqlite_sink** [📁](./spdlog_sqlite_sink) [🌐](https://github.com/GerHobbelt/sqlite_sink) -- SQLite 3 database sink for `spdlog`: a simple custom sink made for spdlog that writes to SQLite database.
- **spdmon** [📁](./spdmon) [🌐](https://github.com/GerHobbelt/spdmon) -- a progress monitor based on spdlog library. In just one function call visualize your loop progress!
- **sqlplot-tools** [📁](./sqlplot-tools) [🌐](https://github.com/GerHobbelt/sqlplot-tools) -- a tool to **process data series** from algorithm experiments **using SQL statements** and embed the results in **gnuplot** datafiles or **pgfplots** LaTeX files. Using SQL to generate plots can be see as **cracking a nut with a sledgehammer**, but it really works well in practice.
- **taolog** [📁](./taolog) [🌐](https://github.com/GerHobbelt/taolog) -- A Win32 logger based on DebugView & ETW.
- **tempo** [📁](./tempo) [🌐](https://github.com/GerHobbelt/tempo) -- Grafana Tempo is an open source, easy-to-use and high-scale distributed tracing backend. Tempo is cost-efficient, requiring only object storage to operate, and is deeply integrated with Grafana, Prometheus, and Loki. Tempo is Jaeger, Zipkin, Kafka, OpenCensus and OpenTelemetry compatible.  It ingests batches in any of the mentioned formats, buffers them and then writes them to Azure, GCS, S3 or local disk.  As such it is robust, cheap and easy to operate! Tempo implements [TraceQL](https://grafana.com/docs/tempo/latest/traceql/), a traces-first query language inspired by LogQL and PromQL. This query language allows users to very precisely and easily select spans and jump directly to these spans.
- **tscns** [📁](./tscns) [🌐](https://github.com/GerHobbelt/tscns) -- What's the problem with clock_gettime/gettimeofday/std::chrono::XXX_clock? Although current Linux systems are using VDSO to implement clock_gettime/gettimeofday/std::chrono::XXX_clock, they still have a nonnegligible overhead with latency from 20 to 100 ns. The problem is even worse on Windows as the latency is more unstable and could be as high as 1 us. Also on Windows, the high resolution clock is at only 100 ns precision. These problems are not good for time-critical tasks where high precison timestamp is required and latency of getting timestamp itself should be minimized.  TSCNS uses `rdtsc` instruction and simple arithmetic operations to implement a thread-safe clock with 1 ns precision, and is much faster and stable in terms of latency at less than 10 ns, comprising latency of `rdtsc` (4 ~ 7 ns depending on platforms) plus calculations in less than 1 ns.  TSCNS can be closely synchronized with the system clock, which makes it a good alternative of standard system clocks. However, real-time synchronization requires the clock to be calibrated at a proper interval, but it's a easy and cheap job to do.
- **uberlog** [📁](./uberlog) [🌐](https://github.com/GerHobbelt/uberlog) -- a cross platform C++ logging system that is focused on fast and small, writing to a shared memory ring buffer.
- ~~**EasyLogger** [🌐](https://github.com/armink/EasyLogger) -- an ultra-lightweight (ROM<1.6K, RAM<0.3K), high-performance C/C++ log library, very suitable for resource-sensitive software projects. Compared with the well-known C/C++ log libraries such as log4c and zlog, EasyLogger has simpler functions and provides fewer interfaces to users, but it will be quick to get started. More practical functions support dynamic expansion in the form of plug-ins.~~
  
  - **removed**; reason: we've decided on using `glog` as the logging library for everything: while that one isn't perfect, most of the other stuff we've been looking at is using that one already and it matches our needs 80% of the time, while I'm okay with patching that library for the other 20% (syslog-like use, i.e. logging to localhost logging server where all logging is collected -- these log messages should travel across as part of the ZeroMQ message streams.)

- ~~**log4cplus** [🌐](https://github.com/log4cplus/log4cplus)~~
  
  - **removed**; reason: we've decided on using `glog`/`spdlog` as the logging library for everything. `log4cplus`, at the same time, is a tad too much. (I consider `log4j` et al *overdone* as it caters to every need instead of just providing those things as contrib code which can be integrated at need -- should not be as far run-time configurable as it currently is.)

- ~~**zlog** [🌐](https://github.com/HardySimpson/zlog)~~
  
  - **removed**; `zlog` has a nice overall design but is too 'Unix-is-the-world' in its coding: in the end it was ease of cross-platform compilation of `glog`/`spdlog` that won the day and I'm okay with layering on top of that one to get the zlog category and other channel features, once I really need them.













	
----

🡸 [previous section](./0085-testing-benchmarking-fuzzing.md)  |  🡹 [up](./0016-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0104-libraries-in-this-collection.md)  |  🡺 [next section](./0087-colour-processing-conversion.md)
