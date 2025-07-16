











## testing, benchmarking & fuzzing

- **AFLplusplus** [📁](./AFLplusplus) [🌐](https://github.com/GerHobbelt/AFLplusplus) -- American Fuzzy Lop plus plus (AFL++) is a superior fork to Google's AFL fuzzer - more speed, more and better mutations, more and better instrumentation, custom module support, etc.
- **ApprovalTestsCpp** [📁](./ApprovalTestsCpp) [🌐](https://github.com/GerHobbelt/ApprovalTests.cpp) -- Approval Tests for C++: also known as **Golden Master Tests** or **Snapshot Testing**, Approval Tests are an alternative to asserts.
- **BoxFort** [📁](./BoxFort) [🌐](https://github.com/GerHobbelt/BoxFort) -- a simple, cross-platform sandboxing C library powering [Criterion](https://github.com/Snaipe/Criterion). BoxFort provides a simple API to run user code in isolated processes. The main goal of this project **is not** security, but portable code isolation -- if you want complete system isolation, consider using properly configured containers.
- **Catch2** [📁](./Catch2) [🌐](https://github.com/GerHobbelt/Catch2) -- a unit testing framework for C++, which also provides basic micro-benchmarking features, and simple BDD macros. Catch2's main advantage is that using it is both simple
- **Celero** [📁](./Celero) [🌐](https://github.com/GerHobbelt/Celero) -- C++ Benchmarking Library for developing consistent and meaningful benchmark results. Celero aims to be a small library which can be added to a C++ project and perform benchmarks on code in a way which is easy to reproduce, share, and compare among individual runs, developers, or projects. Celero uses a framework similar to that of GoogleTest to make its API more natural to use and integrate into a project.
- **cmocka** [📁](./cmocka) [🌐](https://github.com/GerHobbelt/cmocka) -- an elegant unit testing framework for C with support for mock objects. It only requires the standard C library, works on a range of computing platforms (including embedded) and with different compilers.
- **Criterion** [📁](./Criterion) [🌐](https://github.com/GerHobbelt/Criterion) -- a dead-simple, yet extensible, C and C++ unit testing framework.
- **cxxtest** [📁](./cxxtest) [🌐](https://github.com/GerHobbelt/cxxtest) -- a unit testing framework for C++ that is similar in spirit to JUnit, CppUnit, and xUnit. CxxTest is easy to use because it does not require precompiling a CxxTest testing library, it employs no advanced features of C++ (e.g. RTTI) and it supports a very flexible form of test discovery.
- **cxxtest_catch_2_gtest** [📁](./cxxtest_catch_2_gtest) [🌐](https://github.com/GerHobbelt/cxxtest_catch_2_gtest) -- quick & dirty converter from various test suites to googletest, i.e. allows us to use a single test framework, despite some libraries having been set up to use another, e.g. [Catch2](https://github.com/catchorg/Catch2).
- **doctest** [📁](./doctest) [🌐](https://github.com/GerHobbelt/doctest) -- a C++ testing framework, by far the fastest both in compile times (by [**orders of magnitude**](doc/markdown/benchmarks.md)) and runtime compared to other feature-rich alternatives.
- **dtoa-benchmark** [📁](./dtoa-benchmark) [🌐](https://github.com/GerHobbelt/dtoa-benchmark) -- This benchmark evaluates the performance of conversion from double precision IEEE-754 floating point (double) to ASCII string.
- **gbenchmark** [📁](./gbenchmark) [🌐](https://github.com/GerHobbelt/benchmark) -- a library to benchmark code snippets, similar to unit tests.
- **googletest** [📁](./googletest) [🌐](https://github.com/GerHobbelt/googletest) -- unit test framework: see the [GoogleTest User's Guide](https://google.github.io/googletest/) for documentation. We recommend starting with the [GoogleTest Primer](https://google.github.io/googletest/primer.html).
  
  Features:
  
  * An [xUnit](https://en.wikipedia.org/wiki/XUnit) test framework.
  * Test discovery.
  * A rich set of assertions.
  * User-defined assertions.
  * Death tests.
  * Fatal and non-fatal failures.
  * Value-parameterized tests.
  * Type-parameterized tests.
  * Various options for running the tests.
  * XML test report generation.

- **gtest-tap-listener** [📁](./gtest-tap-listener) [🌐](https://github.com/GerHobbelt/gtest-tap-listener) -- a Google Test plug-in providing TAP output format. (Although GoogleTest has an XML writer, it lacks a TAP one.)
- **honggfuzz** [📁](./honggfuzz) [🌐](https://github.com/GerHobbelt/honggfuzz) -- a security oriented, feedback-driven, evolutionary, easy-to-use fuzzer with interesting analysis options.
- **Image-Compression-Benchmark** [📁](./Image-Compression-Benchmark) [🌐](https://github.com/GerHobbelt/Image-Compression-Benchmark) -- Lossless Image Compression Benchmark: a comparison of 20+ lossless image compression formats on several datasets.
- **libassert** [📁](./libassert) [🌐](https://github.com/GerHobbelt/libassert) -- the most over-engineered and overpowered C++ assertion library. **Library philosophy**: Provide as much helpful diagnostic info as possible.
- **libpfm4** [📁](./libpfm4) [🌐](https://github.com/GerHobbelt/libpfm4) -- a helper library to develop monitoring tools exploiting the performance monitoring events such as those provided by the Performance Monitoring Unit (PMU) of modern processors.
- **logger_benchmarks** [📁](./logger_benchmarks) [🌐](https://github.com/GerHobbelt/logger_benchmarks) -- benchmarking several C++ logging libraries.
- **mixbench** [📁](./mixbench) [🌐](https://github.com/GerHobbelt/mixbench) -- a benchmark tool to evaluate performance bounds of GPUs (or CPUs) on mixed operational intensity kernels. The executed kernel is customized on a range of different operational intensity values. Modern GPUs are able to hide memory latency by switching execution to threads able to perform compute operations. Using this tool one can assess the practical optimum balance in both types of operations for a compute device. CUDA, HIP, OpenCL and SYCL implementations have been developed, targeting GPUs, or OpenMP when using a CPU as a target.
- **nanobench** [📁](./nanobench) [🌐](https://github.com/GerHobbelt/nanobench) -- `ankerl::nanobench` is a platform independent microbenchmarking library for C++11/14/17/20.
- **radamsa** [📁](./radamsa) [🌐](https://github.com/GerHobbelt/radamsa) -- Radamsa is a test case generator for robustness testing, a.k.a. a fuzzer. It is typically used to test how well a program can withstand malformed and potentially malicious inputs. It works by reading sample files of valid data and generating interestingly different outputs from them. The main selling points of radamsa are that it has already found a slew of bugs in programs that actually matter, it is easily scriptable and easy to get up and running.
- **resumable-assert** [📁](./resumable-assert) [🌐](https://github.com/GerHobbelt/resumable-assert) -- `assert` replacement to continue execution in debugger. In any large app, it sometimes happens that some asserts are failing in code you don't currently care about, and blocking the entire team from being able to run the app until the issue is fixed is not the best workflow. So we usually end up moving the execution marker past the assert line in IDE or debugger, or even comment the assert out, recompile and relaunch. With Resumable Assert, you can simply continue execution when an assertion fails in debugger, or even disable asserts that you are not interested in, so that those never bother you again.
- **the-yabbering-politician** [📁](./the-yabbering-politician) [🌐](https://github.com/GerHobbelt/the-yabbering-politician) -- provides a cross-platform structure-aware generation-based fuzzer toolkit, which does not need coverage tooling nor injects code into your application.
- **ut** [📁](./ut) [🌐](https://github.com/GerHobbelt/ut) -- C++ single header/single module, macro-free μ(micro)/Unit Testing Framework
- **Verify** [📁](./Verify) [🌐](https://github.com/GerHobbelt/Verify) -- a snapshot tool that simplifies the assertion of complex data models and documents. Verify is called on the test result during the assertion phase. It serializes that result and stores it in a file that matches the test name. On the next test execution, the result is again serialized and compared to the existing file. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new result.
- **zzuf** [📁](./zzuf) [🌐](https://github.com/GerHobbelt/zzuf) -- a transparent application input fuzzer. It works by intercepting file operations and changing random bits in the program's input. zzuf's behaviour is deterministic, making it easy to reproduce bugs.





	
----

🡸 [previous section](./0074-ini.md)  |  🡹 [up](./0006-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0076-logging.md)
