











### CLI: commandline parsing & perusing

- **argparse** [📁](./argparse) [🌐](https://github.com/GerHobbelt/argparse) -- simply include argparse.hpp and start parsing command-line arguments.
- **args** [📁](./args) [🌐](https://github.com/GerHobbelt/args) -- a simple, small, flexible, single-header C++11 argument parsing library, designed to appear somewhat similar to Python's argparse, but in C++, with static type checking, and hopefully a lot faster (also allowing fully nestable group logic, where Python's argparse does not).
- **cli11** [📁](./cli11) [🌐](https://github.com/GerHobbelt/CLI11) -- command line options parser
- **clipp** [📁](./clipp) [🌐](https://github.com/GerHobbelt/clipp) -- commandline parser
  
  - **left-for-dead**; reason: looks really nice, but MSVC coughs up some pretty-hard-to-diagnose compiler errors and warnings. The writer of this library is clearly better versed in writing C++ templating code than *me*, alas. Initial attempts to fix the issues left me in the dirt, humiliated, and reading up on the latest C++ *goodnesses* did not improve my success rate, alas.

- **cxxopts** [📁](./cxxopts) [🌐](https://github.com/GerHobbelt/cxxopts) -- a lightweight C++ option parser library, supporting the standard GNU style syntax for options.
- **docopt.cpp** [📁](./docopt.cpp) [🌐](https://github.com/GerHobbelt/docopt.cpp) -- creates *beautiful* command-line interfaces *easily*.
- **Lyra** [📁](./Lyra) [🌐](https://github.com/GerHobbelt/Lyra) -- a simple to use, composing, header only, command line arguments parser for C++ 11 and beyond.
- **tclap** [📁](./tclap) [🌐](https://github.com/GerHobbelt/tclap) -- TCLAP (Templatized Command Line Argument Parser) is a simple C++ library that facilitates parsing command line arguments in a type independent manner. It doesn't conform exactly to either the GNU or POSIX standards, although it is close.
- ~~**clippson** [🌐](https://github.com/heavywatal/clippson) -- commandline parser + JSON data diagnostical dumper~~
  
  - **removed**; reason: deemed cool but unsuitable for our needs. Besides, we intend to use `cli11` instead of `clipp` for that library is easier to read and support is more active there.













	
----

🡸 [previous section](./0066-multi-processing-core-technologies.md)  |  🡹 [up](./0066-multi-processing-core-technologies.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0068-cpu-features-capabilities-detection.md)
