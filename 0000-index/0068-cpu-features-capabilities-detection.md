









### CPU features & capabilities detection

- **cppuprofile** [📁](./cppuprofile) [🌐](https://github.com/GerHobbelt/cppuprofile) -- provides a tiny C++ profiling library for monitoring execution time, CPU(s) usage, memory usage and GPU(s) usage and memory. Those metrics can be useful to check that load is properly spread onto all CPU cores or that memory is not starved.
- **cpu_features** [📁](./cpu_features) [🌐](https://github.com/GerHobbelt/cpu_features) -- a cross-platform C library to retrieve CPU features (such as available instructions) at runtime.
- **cpuinfo** [📁](./cpuinfo) [🌐](https://github.com/GerHobbelt/cpuinfo) -- CPU & hardware info
- **hwinfo** [📁](./hwinfo) [🌐](https://github.com/GerHobbelt/hwinfo) -- provides an easy-to-use and modern C++ API for retrieving hardware information of your systems components such as CPU, RAM, GPU, Disks, Mainboard, ...
- **infoware** [📁](./infoware) [🌐](https://github.com/GerHobbelt/infoware) -- C++ Library for pulling system and hardware information, without hitting the command line.
- **libcpuid** [📁](./libcpuid) [🌐](https://github.com/GerHobbelt/libcpuid) -- CPU & hardware info
- **mammut** [📁](./mammut) [🌐](https://github.com/GerHobbelt/mammut) -- provides an object oriented abstraction of architectural features normally exposed by means of `sysfs` files or CPU registries. It also provides the possibility to manage remote machines by using a client server mechanism.
- **osquery** [📁](./osquery) [🌐](https://github.com/GerHobbelt/osquery) -- a SQL powered operating system instrumentation, monitoring, and analytics framework. `osquery` exposes an operating system as a high-performance relational database.  This allows you to write SQL-based queries to explore operating system data.  With osquery, SQL tables represent abstract concepts such as running processes, loaded kernel modules, open network connections, browser plugins, hardware events or file hashes.
- **pcm** [📁](./pcm) [🌐](https://github.com/GerHobbelt/pcm) -- Intel&reg; Performance Counter Monitor (Intel&reg; PCM) is an application programming interface (API) and a set of tools based on the API to monitor performance and energy metrics of Intel&reg; Core&trade;, Xeon&reg;, Atom&trade; and Xeon Phi&trade; processors. PCM works on Linux, Windows, Mac OS X, FreeBSD, DragonFlyBSD and ChromeOS operating systems.
- **PlatformFolders** [📁](./PlatformFolders) [🌐](https://github.com/GerHobbelt/PlatformFolders) -- a C++ library to look for directories like `My Documents`, `~/.config`, `%APPDATA%`, etc. so that you do not need to write platform-specific code.
- **simde** [📁](./simde) [🌐](https://github.com/GerHobbelt/simde) -- SIMD Everywhere: the SIMDe header-only library provides fast, portable implementations of [SIMD intrinsics](https://en.wikipedia.org/wiki/SIMD) on hardware which doesn't natively support them, such as calling [SSE](https://en.wikipedia.org/wiki/Streaming_SIMD_Extensions) functions on ARM.  There is no performance penalty if the hardware supports the native implementation (*e.g.*, SSE/[AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions) runs at full speed on [x86](https://en.wikipedia.org/wiki/X86), [NEON](https://en.wikipedia.org/wiki/ARM_architecture#Advanced_SIMD_(Neon)) on [ARM](https://en.wikipedia.org/wiki/ARM_architecture), *etc.*).
- **spy-build-sysinfo** [📁](./spy-build-sysinfo) [🌐](https://github.com/GerHobbelt/spy) -- build system info
- **sys_info** [📁](./sys_info) [🌐](https://github.com/GerHobbelt/sys_info) -- provides cross-platform cpu and memory usage info by current process.
- ~~**cpuinfo** [📁](./cpuinfo) [🌐](https://github.com/GerHobbelt/cpuinfo) -- CPU & hardware info~~
  
  - **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.

- ~~**cpu_features** [🌐](https://github.com/google/cpu_features) -- a cross-platform C library to retrieve CPU features (such as available instructions) at runtime.
  
  - **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.

- ~~**cpu_stat** [🌐](https://github.com/vivaladav/cpu-stat)~~
  
  - **removed**; reason: Linux-only, non-portable, deemed unsuitable for our needs.













	
----

🡸 [previous section](./0067-cli-commandline-parsing-perusing.md)  |  🡹 [up](./0066-multi-processing-core-technologies.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0069-date-time-functionality.md)
