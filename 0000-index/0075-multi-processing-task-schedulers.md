









### multi-processing: task schedulers

- **actor-framework** [📁](./actor-framework) [🌐](https://github.com/GerHobbelt/actor-framework) -- CAF is an open source framework that offers a programming environment based on the [Actor Model](https://en.wikipedia.org/wiki/Actor_model) of computation combined with a [scalable](https://dl.acm.org/doi/10.1145/2541329.2541336), [native](https://www.sciencedirect.com/science/article/abs/pii/S1477842416000038) runtime environment that lets you build applications at a high level of abstraction without sacrificing performance. Whether you are targeting a single machine, a data center, or the cloud, CAF provides the necessary tools to implement robust, scalable, and maintainable software.
- **asynqro** [📁](./asynqro) [🌐](https://github.com/GerHobbelt/asynqro) -- Futures and thread pool for C++: Asynqro gives developers a rich monadic Future API (inspired by Future API in Scala language), a clean API, refined task scheduling logic and is not tied to any framework.
- **continuable** [📁](./continuable) [🌐](https://github.com/GerHobbelt/continuable) -- a C++14 library that provides full support for:
  
  * lazy async continuation chaining based on callbacks (**then**) and expression templates, callbacks are wrapped nicely as **promises**.
  * **no enforced type-erasure** which means we need **less heap allocations** than comparable libraries, strictly following the **"don't pay for what you don't use"** principle.
  * support for *all*, *any* and *sequential* connections between continuables through expressive operator overloads **&&**, **||** and **>>** as well as free functions **when_all**, **when_any** and **when_seq**.
  * asynchronous **error handling** through **exceptions**, **error codes** and **user defined types**.
  * syntactic sugar for instance: **partial invocation**, **tuple unpacking**, `co_await` support and **executors**.
  * **encapsuled from any runtime**, larger framework or executors makes it possible to use continuable even in smaller or esoteric usage scenarios.

- **corosync** [📁](./corosync) [🌐](https://github.com/GerHobbelt/corosync) -- the Corosync Cluster Engine. The synchronization algorithm is used for every service in corosync to synchronize state of the system. The checkpoint synchronization algorithm is to synchronize checkpoints after a partition or merge of two or more partitions.
- **enkiTS-TaskScheduler** [📁](./enkiTS-TaskScheduler) [🌐](https://github.com/GerHobbelt/enkiTS) -- a permissively licensed C++11 Task Scheduler for creating parallel programs. The primary goal of enkiTS is to help developers create programs which handle both data and task level parallelism to utilize the full performance of multicore CPUs, whilst being lightweight (only a small amount of code) and easy to use.
  
  Features:
  
    - Braided parallelism - can issue tasks from another task as well as from the thread which created the Task System, and has a simple task interface for both data and task parallelism.
    - Can pin tasks to a given thread - can schedule a task which will only be run on the specified thread.
    - Can register external threads to use with enkiTS
    - Can set task priorities - Up to 5 task priorities can be configured via define ENKITS_TASK_PRIORITIES_NUM (defaults to 3). Higher priority tasks are run before lower priority ones.
    - Can wait for pinned tasks - useful for creating IO threads which do no other work.
    - Completion Actions - can perform an action on task completion. This avoids the expensive action of adding the task to the scheduler, and can be used to safely delete a completed task.
    - Dependencies - can set dependencies between tasks.
    - Fast, then scalable - designed for consumer devices first, so performance on a low number of threads is important, followed by scalability.
    - Lightweight
    - Up-front Allocation friendly - designed for zero allocations during scheduling.

- **FiberTaskingLib** [📁](./FiberTaskingLib) [🌐](https://github.com/GerHobbelt/FiberTaskingLib) -- a library for enabling task-based multi-threading. It allows execution of task graphs with arbitrary dependencies. Dependencies are represented as atomic counters. Under the covers, the task graph is executed using fibers, which in turn, are run on a pool of worker threads (one thread per CPU core). This allows the scheduler to wait on dependencies without task chaining or context switches.
- **google::marl** [📁](./google-marl) [🌐](https://github.com/GerHobbelt/marl) -- a hybrid thread / fiber task scheduler written in C++ 11. Marl uses a combination of fibers and threads to allow efficient execution of tasks that can block, while keeping a fixed number of hardware threads.
- **libcron** [📁](./libcron) [🌐](https://github.com/GerHobbelt/libcron) -- a C++ scheduling library using `cron` formatting. `libcron` offers an easy to use API to add callbacks with corresponding cron-formatted strings, while using `std::chrono::system_clock::timepoint` as its time unit. While that is UTC by default, the Cron-class uses a `LocalClock` by default which offsets `system_clock::now()` by the current UTC-offset. If you wish to work in UTC, then construct the Cron instance, passing it a `libcron::UTCClock`.
- **libMultiRobotPlanning** [📁](./libMultiRobotPlanning) [🌐](https://github.com/GerHobbelt/libMultiRobotPlanning) -- a library with search algorithms primarily for task and path planning for multi robot/agent systems. It is written in C++(14), highly templated for good performance, and comes with useful examples. The following algorithms are currently supported: A\*, A\* epsilon (also known as focal search), SIPP (Safe Interval Path Planning), Conflict-Based Search (CBS), Enhanced Conflict-Based Search (ECBS), Conflict-Based Search with Optimal Task Assignment (CBS-TA), Enhanced Conflict-Based Search with Optimal Task Assignment (ECBS-TA), Prioritized Planning using SIPP (example code for SIPP), Minimum sum-of-cost (flow-based; integer costs; any number of agents/tasks) and Best Next Assignment (series of optimal solutions)
- **libpipeline** [📁](./libpipeline) [🌐](https://github.com/GerHobbelt/libpipeline) -- libpipeline, a pipeline manipulation library for setting up and running pipelines of processes, without needing to involve shell command-line parsing which is often error-prone and insecure.  This alleviates programmers of the need to laboriously construct pipelines using lower-level primitives such as fork(2) and execve(2).
- **stdexec** [📁](./stdexec) [🌐](https://github.com/GerHobbelt/stdexec) -- `stdexec` is an experimental reference implementation of the _Senders_ model of asynchronous programming proposed by [**P2300 - `std::execution`**](http://wg21.link/p2300) for adoption into the C++ Standard. _Senders_ is a Standard Model for Asynchronous Execution in C++.
- **taskflow** [📁](./taskflow) [🌐](https://github.com/GerHobbelt/taskflow) -- Quickly write parallel and heterogeneous task programs in modern C++. Taskflow is faster, more expressive, and easier for drop-in integration than many of existing task programming frameworks in handling complex parallel workloads.
- **thrill** [📁](./thrill) [🌐](https://github.com/GerHobbelt/thrill) -- an *EXPERIMENTAL* C++ framework for algorithmic distributed Big Data batch computations on a cluster of machines. More information at [http://project-thrill.org](http://project-thrill.org).
- **transwarp** [📁](./transwarp) [🌐](https://github.com/GerHobbelt/transwarp) -- a header-only C++ library for task concurrency. It allows you to easily create a graph of tasks where every task can be executed synchronously. transwarp is written in C++17 and only depends on the standard library.













	
----

🡸 [previous section](./0074-multi-processing-event-handling-signals-asynchronous-operation.md)  |  🡹 [up](./0066-multi-processing-core-technologies.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0076-multi-processing-thread-pools.md)
