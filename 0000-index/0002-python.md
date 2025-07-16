











### Python(esque)

- **asp** [📁](./asp) [🌐](https://github.com/GerHobbelt/asp) -- the Asp Scripting Platform for Embedded Systems resembles basic Python (with some small differences), making it easy to learn for those who are already familiar with Python. It supports conditionals (if/elif/else), loops (while, for), and functions. It supports basic data types plus tuples, lists, sets, dictionaries, and ranges/slices. To keep things small, Asp does not support classes, exception handling, and many other advanced features. Scripts are compiled to compact byte-code, which is checked for compatibility with the application before being allowed to run in the engine.  The Asp engine has a small code memory footprint (less than 100 KB when compiled optimizing for space). It avoids use of dynamic memory allocation and recursion, resulting in very little impact on the memory of the host application. Applications run scripts one instruction at a time, retaining a high frequency of control of the CPU.
- **cpython** [📁](./cpython) [🌐](https://github.com/GerHobbelt/cpython) -- Python version 3. Note: Building a complete Python installation requires the use of various additional third-party libraries, depending on your build platform and configure options.  Not all standard library modules are buildable or useable on all platforms.
- **micropython** [📁](./micropython) [🌐](https://github.com/GerHobbelt/micropython) -- the MicroPython project aims to put an implementation of Python 3.x on microcontrollers and small embedded systems. You can find the official website at [micropython.org](http://www.micropython.org).  **WARNING**: this project is in beta stage and is subject to changes of the code-base, including project-wide name changes and API changes.  MicroPython implements the entire Python 3.4 syntax (including exceptions, `with`, `yield from`, etc., and additionally `async`/`await` keywords from Python 3.5 and some select features from later versions).
- **PikaPython** [📁](./PikaPython) [🌐](https://github.com/GerHobbelt/PikaPython) -- an ultra-lightweight Python interpreter that runs with only 4KB of RAM, zero dependencies. It is ready to use out of the box without any configuration required and easy to extend with C.
- **pocketlang** [📁](./pocketlang) [🌐](https://github.com/GerHobbelt/pocketlang) -- a lightweight (~3000 semicolons) and [fast](https://github.com/ThakeeNathees/pocketlang#performance) object oriented, embeddable scripting language written in C. It has a ruby flavoured python syntax, that can be learned [within 15 minutes](https://thakeenathees.github.io/pocketlang/docs/v0.1.0/Reference/Cheat-Sheet.html). Including the compiler, bytecode VM and runtime, it's a standalone executable with zero external dependencies just as it's self descriptive name. The pocketlang VM can be embedded in another hosting program very easily.













	
----

🡸 [previous section](./0001-script-languages-for-embedding-in-c-c-applications.md)  |  🡹 [up](./0001-script-languages-for-embedding-in-c-c-applications.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0003-forth-et-al.md)
