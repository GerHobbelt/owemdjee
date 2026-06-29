









### multi-processing: thread pools

- **concurrencpp** [📁](../concurrencpp) [🌐](https://github.com/GerHobbelt/concurrencpp) -- the C++ concurrency library: concurrencpp is a tasking library for C++ allowing developers to write highly concurrent applications easily and safely by using tasks, executors and coroutines.
- **concurrentqueue** [📁](../concurrentqueue) [🌐](https://github.com/GerHobbelt/concurrentqueue) -- moodycamel::ConcurrentQueue, an industrial-strength and fast multi-producer, multi-consumer lock-free concurrent queue for C++11.
- **CTPL-Thread-Pool** [📁](../CTPL-Thread-Pool) [🌐](https://github.com/GerHobbelt/CTPL) -- Modern and efficient C++ Thread Pool Library. More specifically, there are some threads dedicated to the pool and a container of jobs. The jobs come to the pool dynamically. A job is fetched and deleted from the container when there is an idle thread. The job is then run on that thread.
- **fork_union** [📁](../fork_union) [🌐](https://github.com/GerHobbelt/fork_union) -- the low(est?)-latency [OpenMP](https://en.wikipedia.org/wiki/OpenMP)-style [NUMA](https://en.wikipedia.org/wiki/Non-uniform_memory_access)-aware minimalistic scoped thread-pool designed for 'Fork-Join' parallelism in C++, C, and Rust, avoiding × [mutexes & system calls](#locks-and-mutexes), × [dynamic memory allocations](#memory-allocations), × [CAS-primitives](#atomics-and-cas), and × [false-sharing](#) of CPU cache-lines on the hot path 🍴  Most other "thread-pools" are not, in fact, thread-pools, but rather "task-queues" that are designed to synchronize a concurrent dynamically growing list of heap-allocated globally accessible shared objects. In C++ terms, think of it as a `std::queue<std::function<void()>>` protected by a `std::mutex`, where each thread waits for the next task to be available and then executes it on some random core chosen by the OS scheduler. All of that is slow... and true across C++, C, and Rust projects. Short of OpenMP, practically every other solution has high dispatch latency and noticeable memory overhead.
- **pthreadpool** [📁](../pthreadpool) [🌐](https://github.com/GerHobbelt/pthreadpool) -- pthreadpool is a portable and efficient thread pool implementation. It provides similar functionality to `#pragma omp parallel for`, but with additional features.
- **stdexec** [📁](../stdexec) [🌐](https://github.com/GerHobbelt/stdexec) -- `stdexec` is an experimental reference implementation of the _Senders_ model of asynchronous programming proposed by [**P2300 - `std::execution`**](http://wg21.link/p2300) for adoption into the C++ Standard. _Senders_ is a Standard Model for Asynchronous Execution in C++.
- **thread-pool** [📁](../thread-pool) [🌐](https://github.com/GerHobbelt/thread-pool) -- `BS::thread_pool`: a fast, lightweight, and easy-to-use C++17 thread pool library (by Barak Shoshany)
- **thread-pool-c** [📁](../thread-pool-c) [🌐](https://github.com/GerHobbelt/C-Thread-Pool) -- a minimal but advanced threadpool implementation.
- **thread-pool-cpp** [📁](../thread-pool-cpp) [🌐](https://github.com/GerHobbelt/thread-pool-cpp) -- highly scalable and fast thread pool. It implements both work-stealing and work-distribution balancing startegies. It implements cooperative scheduling strategy.
- **YACLib** [📁](../YACLib) [🌐](https://github.com/GerHobbelt/YACLib) -- YACLib is a lightweight C++ library for concurrent and parallel task execution.













	
----

🡸 [previous section](./0075-multi-processing-task-schedulers.md)  |  🡹 [up](./0066-multi-processing-core-technologies.md)  |  🡻 [all (index)](./0104-libraries-in-this-collection.md)  |  🡺 [next section](./0077-run-time-library-core-features-logging-formatting.md)
