

## disk I/O, monitoring import locations, ...

- **asio** [📁](./asio) [🌐](https://github.com/GerHobbelt/asio) -- a cross-platform C++ library for network and low-level I/O programming that provides developers with a consistent asynchronous model using a modern C++ approach.
  
  Note: (older) Boost.Asio is also included in Boost.

- **cfgpath** [📁](./cfgpath) [🌐](https://github.com/GerHobbelt/cfgpath) -- cross platform methods for obtaining paths to configuration files
- **cpplocate** [📁](./cpplocate) [🌐](https://github.com/GerHobbelt/cpplocate) -- a cross-platform C++ library that provides tools for applications to locate their binary files and data assets, as well as those of dependent modules.
- **detox** [📁](./detox) [🌐](https://github.com/GerHobbelt/detox) -- renames files to make them easier to work with under Linux and other Unix-like operating systems.  Spaces and various other unsafe characters (such as "`$`") get replaced with "`_`".  The upper portion of ISO-8859-1 (Latin-1) can be transcoded to UTF-8, as can CP-1252.
- **directorywatcher** [📁](./directorywatcher) [🌐](https://github.com/GerHobbelt/myoddweb.directorywatcher) -- a fast and reliable File/Directory watcher for C#/C++ to replace the current .NET `FileSystemWatcher` class.
- **dirent** [📁](./dirent) [🌐](https://github.com/GerHobbelt/dirent) -- POSIX `dirent.h` ported to MS Windows (Win32/Win64); used by several libraries.
- **dunce** [📁](./dunce) [🌐](https://github.com/GerHobbelt/dunce) -- Dunce (de-UNC): in Windows the regular paths (`C:\foo`) are supported by all programs, but have lots of bizarre restrictions for backwards compatibility with MS-DOS. There are also Windows NT UNC paths (`\\?\C:\foo`), which are more robust and with fewer gotchas, but are rarely supported by Windows programs — even Microsoft's own! Dunce converts Windows UNC paths to the MS-DOS-compatible format whenever possible, but leaves UNC paths as-is when they can't be unambiguously expressed in a simpler way. This allows legacy programs to access all paths they can possibly access, and doesn't break any paths for UNC-aware programs. For example, `\\?\C:\Windows` will be converted to `C:\Windows`, but `\\?\C:\COM` will be left as-is, because it contains a reserved filename.  Dunce's handling of UNC paths is safer than just unconditionally stripping the `\\` prefix, because naively stripped UNC paths with hostnames change to relative directory paths. There are other normalization rules, special characters, and length limits that could change meaning of the path. Parsing is based on <https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx>.
- **efsw** [📁](./efsw) [🌐](https://github.com/GerHobbelt/efsw) -- cross-platform file system watcher and notifier
- **FastGlobbing** [📁](./FastGlobbing) [🌐](https://github.com/GerHobbelt/FastGlobbing) -- a Fast String Matching with Wildcards, Globs, and Gitignore-Style Globs. Wildcard string matching and globbing isn’t as trivial as it may seem at first.  In fact, mistakes in the past resulted in serious vulnerabilities such as denial of service due to exponential blow-up in execution time. This fast non-recursive algorithm performs safe gitignore-style wildcard matching.  Implementations in C, C++, Java, Javascript and Python are included.
- **filesystem** [📁](./filesystem) [🌐](https://github.com/GerHobbelt/filesystem) -- a header-only single-file `std::filesystem` compatible helper library, based on the C++17 and C++20 specs, but implemented for C++11, C++14, C++17 or C++20 (tightly following the C++17 standard with very few documented exceptions). It is of course in its own namespace `ghc::filesystem` to not interfere with a regular `std::filesystem` should you use it in a mixed C++17 environment (which is possible).
- **fnmatch** [📁](./fnmatch) [🌐](https://github.com/GerHobbelt/fnmatch) -- match a filename string or a pathname using POSIX wildcards.
- **fswatch** [📁](./fswatch) [🌐](https://github.com/GerHobbelt/fswatch) -- a cross-platform file change monitor that receives notifications when the contents of the specified files or directories are modified.
- **glob** [📁](./glob) [🌐](https://github.com/GerHobbelt/glob) -- directory scanner
- **libpathutils** [📁](./libpathutils) [🌐](https://github.com/GerHobbelt/libpathutils) -- cross-platform filesystem path utility functions
- **libwildmatch** [📁](./libwildmatch) [🌐](https://github.com/GerHobbelt/wildmatch) -- wildmatch is a BSD-licensed C/C++ library for git/rsync-style pattern matching.
- **llfio** [📁](./llfio) [🌐](https://github.com/GerHobbelt/llfio) -- LLFIO: proposed zero whole machine memory copy file i/o and filesystem library for the C++ standard, intended for storage devices with ~1 microsecond 4Kb transfer latencies and those supporting Storage Class Memory (SCM)/Direct Access Storage (DAX). Its i/o overhead, including syscall overhead, has been benchmarked to 100 nanoseconds on Linux which corresponds to a theoretical maximum of 10M IOPS @ QD1, approx 40Gb/sec per thread. It has particularly strong support for writing portable filesystem algorithms which work well with directly mapped non-volatile storage such as Intel Optane. It is a complete rewrite after a Boost peer review in August 2015. LLFIO is the reference implementation for C++/26 standardisation.
- **physfs** [📁](./physfs) [🌐](https://github.com/GerHobbelt/physfs) -- PhysicsFS: a portable, flexible file I/O abstraction.
- **tinydir** [📁](./tinydir) [🌐](https://github.com/GerHobbelt/tinydir) -- lightweight, portable and easy to integrate C directory and file reader. TinyDir wraps `dirent` for POSIX and `FindFirstFile` for Windows. Windows unicode is supported.
- **win32-fileapi-demo** [📁](./win32-fileapi-demo) [🌐](https://github.com/GerHobbelt/win32-fileapi-demo) -- demo-ing Win32 file api 'A' (ANSI) and UCS2/UTF16 'W' (Wide/Unicode) interfaces / UNC paths and "long filename support" / Linux file paths: regulars, limitations, mistakes, disasters and related stuff begging for a CVE if you haven't already.
- **Win32_read_directory_changes** [📁](./Win32_read_directory_changes) [🌐](https://github.com/GerHobbelt/readdirectorychanges) -- sample code which goes with [Understanding ReadDirectoryChangesW](http://qualapps.blogspot.com/2010/05/understanding-readdirectorychangesw.html)
- **Win32_read_directory_changes_IOCP** [📁](./Win32_read_directory_changes_IOCP) [🌐](https://github.com/GerHobbelt/ReadDirectoryChangesIOCP) -- inspired by jimbeveridge's artical [Understanding ReadDirectoryChangesW](http://qualapps.blogspot.com/2010/05/understanding-readdirectorychangesw.html)! The project shows how to read directory changes by IO completion port on windows platform.















	
----

🡸 [prev](./0069-socket-i-o.md)  |  🡹 [up](./0006-libraries-we-re-looking-at-for-this-intent.md)  |  🡺 [next](./0071-configuration.md)
