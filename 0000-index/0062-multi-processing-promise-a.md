

### multi-processing: Promise/A+

The key distinction between Promises/A+ and `std::promise` in C++11 is that Promises/A+ provides non-blocking synchronization (via chaining function objects) and `std::promise` provides blocking synchronization (or polling). Both have their uses and one is not a direct replacement for the other.

IMPORTANT NOTE: there is one major difference, though. Most modern Javascript promises (including JS Native promises) resolve asynchronously, i.e. their `resolve()` method does not directly call the `then()` handlers, but schedules the calls on the next message loop iteration. The same happens when a `then()`/`catch()` handler is attached to an already resolved/rejected promise. This may be a bit less efficient, but makes the behavior symmetric and more predictable. These libraries *SHOULD* resolve synchronously, because they are unaware of the message loop that is used in the application. (Look into task schedulers above for when you need such awareness, e.g. `taskflow`.)

- **asynqro** [📁](./asynqro) [🌐](https://github.com/GerHobbelt/asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.
- **concurrencpp** [📁](./concurrencpp) [🌐](https://github.com/GerHobbelt/concurrencpp) -- the C++ concurrency library: concurrencpp is a tasking library for C++ allowing developers to write highly concurrent applications easily and safely by using tasks, executors and coroutines.
- **continuable** [📁](./continuable) [🌐](https://github.com/GerHobbelt/continuable) -- a C++14 library that provides full support for:
  
  * lazy async continuation chaining based on callbacks (**then**) and expression templates, callbacks are wrapped nicely as **promises**.
  * **no enforced type-erasure** which means we need **less heap allocations** than comparable libraries, strictly following the **"don't pay for what you don't use"** principle.
  * support for *all*, *any* and *sequential* connections between continuables through expressive operator overloads **&&**, **||** and **>>** as well as free functions **when_all**, **when_any** and **when_seq**.
  * asynchronous **error handling** through **exceptions**, **error codes** and **user defined types**.
  * syntactic sugar for instance: **partial invocation**, **tuple unpacking**, `co_await` support and **executors**.
  * **encapsuled from any runtime**, larger framework or executors makes it possible to use continuable even in smaller or esoteric usage scenarios.

- **libq** [📁](./libq) [🌐](https://github.com/GerHobbelt/q) -- A platform-independent promise library for C++, implementing asynchronous continuations.
- **portable_concurrency-std-future** [📁](./portable_concurrency-std-future) [🌐](https://github.com/GerHobbelt/portable_concurrency) -- Portable implementation of future/promise API in C++. `std::future` done right.
- **promise-cpp** [📁](./promise-cpp) [🌐](https://github.com/GerHobbelt/promise-cpp) -- advanced C++ promise/A+ library in Javascript style
- **promise-hpp** [📁](./promise-hpp) [🌐](https://github.com/GerHobbelt/promise.hpp) -- C++ asynchronous promises like a Promises/A+
- **quantum** [📁](./quantum) [🌐](https://github.com/GerHobbelt/quantum) -- a full-featured and powerful C++ framework build on top of the [Boost coroutine](https://www.boost.org/doc/libs/1_65_0/libs/coroutine2/doc/html/index.html) library. The framework allows users to dispatch units of work (a.k.a. _tasks_) as coroutines and execute them concurrently using the 'reactor' pattern.
- **YACLib** [📁](./YACLib) [🌐](https://github.com/GerHobbelt/YACLib) -- YACLib is a lightweight C++ library for concurrent and parallel task execution.
- https://github.com/alxvasilev/cpp-promise -- Javascript-like C++ promise library
- https://github.com/rhashimoto/poolqueue -- C++ Asynchronous Promises, inspired by Promises/A+.
- https://github.com/YACLib/YACLib -- Yet Another lightweight C++ library for concurrent and parallel task execution.















	
----

🡸 [previous section](./0061-multi-processing-invoking-external.md)  |  🡹 [up](./0056-multi-processing-core.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0063-multi-processing-running-tasks-in-parallel-multi-processing-multithreading.md)
