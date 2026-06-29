









## Embedded Development Specializations

- **adsr_curve_tweens** [📁](../adsr_curve_tweens) [🌐](https://github.com/GerHobbelt/adsr_curve_tweens) -- a C++ template based compact ADSR (attack, decay, sustain, release) modulation library. Includes advanced features e.g. smoothing, tweening, time & rate scaling modes, while using a tiny storage footprint as this is geared towards embedded applications (firmware).
- **ArduinoCore-sam** [📁](../ArduinoCore-sam) [🌐](https://github.com/GerHobbelt/ArduinoCore-sam) -- the source code and configuration files of the Arduino Core for Atmel's SAM3X processor (used on the [Arduino Due](https://www.arduino.cc/en/Main/ArduinoBoardDue) board).
- **avr-libc** [📁](../avr-libc) [🌐](https://github.com/GerHobbelt/avr-libc) -- the standard library for Microchip (formerly Atmel) AVR devices together with the AVR-GCC compiler.
- **bin2cpp** [📁](../bin2cpp) [🌐](https://github.com/GerHobbelt/bin2cpp) -- a command line tool for embedding small files (like images, icons or raw data files) into a C++ executable.
- **binary2strings** [📁](../binary2strings) [🌐](https://github.com/GerHobbelt/binary2strings) -- a module to extract strings from binary blobs. Extracts ASCII, UTF8, and UCS-2 wide strings from binary data. Supports Unicode characters. This is designed to extract strings from binary content such as compiled executables.
- **binary_bakery** [📁](../binary_bakery) [🌐](https://github.com/GerHobbelt/binary_bakery) -- Binary bakery translates binary files (images, fonts etc.) into **C++ source code** and gives access to that data at compile- or runtime.
- **bitfield_array** [📁](../bitfield_array) [🌐](https://github.com/GerHobbelt/bitfield_array) -- std::array alike C++ template for compact storage and direct access of N-bit integer values (where N = {1 .. 32}). Designed to have a low memory footprint.
- **convert_floating_point_to_fraction** [📁](../convert_floating_point_to_fraction) [🌐](https://github.com/GerHobbelt/convert_floating_point_to_fraction) -- convert any floating point value to a classic rational a.k.a. fraction a.k.a. ratio with integer numerator and denominator.
- **data_seek_cache** [📁](../data_seek_cache) [🌐](https://github.com/GerHobbelt/data_seek_cache) -- a compact C++ template-based LRU/LFU/... cache; static (fixed) or dynamically sized; delayed and punch-through write support. Primarily aimed at embedded firmware targets, but also useful in large-scale applications.
- **dragonbox** [📁](../dragonbox) [🌐](https://github.com/GerHobbelt/dragonbox) -- a reference implementation of Dragonbox, a float-to-string conversion algorithm based on a beautiful algorithm [Schubfach](https://drive.google.com/file/d/1IEeATSVnEE6TkrHlCYNY2GjaraBjOT4f/edit), developed by Raffaello Giulietti in 2017-2018. Dragonbox is further inspired by [Grisu](https://www.cs.tufts.edu/~nr/cs257/archive/florian-loitsch/printf.pdf) and [Grisu-Exact](https://github.com/jk-jeon/Grisu-Exact).
- **DueFlashStorage** [📁](../DueFlashStorage) [🌐](https://github.com/GerHobbelt/DueFlashStorage) -- saves non-volatile data for Arduino Due. The library is made to be similar to the EEPROM library. Uses flash block 1 per default.
- **DueTimer** [📁](../DueTimer) [🌐](https://github.com/GerHobbelt/DueTimer) -- an embedded timer library to work with Arduino DUE.
- **enhanced_linn_sequencer** [📁](../enhanced_linn_sequencer) [🌐](https://github.com/GerHobbelt/enhanced_linn_sequencer) -- an advanced sequencer for LinnStruments and other hardware. Supports note-chords, pattern stacking and other advanced features that make this a full-fledged, stand-alone MIDI sequencer, which can be embedded in a musical instrument's firmware, e.g. a LinnStrument.
- **fixed_space_std_allocator** [📁](../fixed_space_std_allocator) [🌐](https://github.com/GerHobbelt/fixed_space_std_allocator) -- space-compacting allocator for embedded environments and other applications where a predetermined fixed space (RAM) is to be managed while offering an API that's akin to the usual classic dynamic allocation C/C++ malloc/realloc/free & new/delete APIs.
- **flash_wear_leveling_management** [📁](../flash_wear_leveling_management) [🌐](https://github.com/GerHobbelt/flash_wear_leveling_management) -- a C++ layer on top of any raw (paged) flash/EEPROM storage, providing wear leveling of the available storage hardware with minimal overhead costs. Geared towards use with [DueFlashStorage](https://github.com/GerHobbelt/DueFlashStorage), but generally applicable, thanks to a templated C++ 'backoffice' interface.
- **function2** [📁](../function2) [🌐](https://github.com/GerHobbelt/function2) -- offering `fu2::function` which is an improved drop-in replacement to `std::function`: copyable, capable of holding move only types, and non-owning: capable of referencing callables in a non owning way.
- **grid_map** [📁](../grid_map) [🌐](https://github.com/GerHobbelt/grid_map) -- Grid Map is a C++ library with ROS interface to manage two-dimensional grid maps with multiple data layers. It is designed for mobile robotic mapping to store data such as elevation, variance, color, friction coefficient, foothold quality, surface normal, traversability etc. It is used in the [Robot-Centric Elevation Mapping](https://github.com/anybotics/elevation_mapping) package designed for rough terrain navigation.
- **libascii** [📁](../libascii) [🌐](https://github.com/GerHobbelt/libascii) -- C/C++ header files carrying the ASCII, Z-modem, etc. control codes as named definitions.
- **libc** [📁](../libc) [🌐](https://github.com/GerHobbelt/libc) -- Embedded Artistry's `libc` is a stripped-down C standard library implementation targeted for microcontroller-based embedded systems.
- **libdivide** [📁](../libdivide) [🌐](https://github.com/GerHobbelt/libdivide) -- libdivide.h is a header-only C/C++ library for optimizing integer division. Integer division is one of the slowest instructions on most CPUs e.g. on current x64 CPUs a 64-bit integer division has a latency of up to 90 clock cycles whereas a multiplication has a latency of only 3 clock cycles. `libdivide` allows you to replace expensive integer divsion instructions by a sequence of shift, add and multiply instructions that will calculate the integer division much faster.
- **libhashish** [📁](../libhashish) [🌐](https://github.com/GerHobbelt/libhashish) -- non-cryptographic hash algorithms & various applications thereof (hash tables = dictionaries, bloom filters, ...)
- **libintrinsics** [📁](../libintrinsics) [🌐](https://github.com/GerHobbelt/libintrinsics) -- C/C++ compiler / CPU intrinsics for bit ops and various other math.
- **libmemory** [📁](../libmemory) [🌐](https://github.com/GerHobbelt/libmemory) -- Embedded Artistry's `libmemory` is a memory management library for embedded systems. If you have a bare metal system and want to use `malloc()`, this library is for you: `libmemory` provides various implementations of the `malloc()` and `free()` functions. The primary `malloc` implementation is a free-list allocator which can be used on a bare-metal system. Wrappers for some RTOSes are also provided (and can be added if not already).
- **libmodbus** [📁](../libmodbus) [🌐](https://github.com/GerHobbelt/libmodbus) -- a groovy modbus library to send/receive data with a device which respects the Modbus protocol. This library can use a serial port or an Ethernet connection. The functions included in the library have been derived from the Modicon Modbus Protocol Reference Guide which can be obtained from [www.modbus.org](http://www.modbus.org).
- **librs232** [📁](../librs232) [🌐](https://github.com/GerHobbelt/librs232) -- multiplatform library for serial communications over RS-232 (serial port).
- **libserialport** [📁](../libserialport) [🌐](https://github.com/GerHobbelt/libserialport) -- a cross-platform library for accessing serial ports. libserialport is a minimal library written in C that is intended to take care of the OS-specific details when writing software that uses serial ports.
- **libzint** [📁](../libzint) [🌐](https://github.com/GerHobbelt/libzint) -- Zint is a suite of programs to allow easy encoding of data in any of the wide range of public domain barcode standards.
- **lwmem** [📁](../lwmem) [🌐](https://github.com/GerHobbelt/lwmem) -- a Lightweight dynamic memory manager, which implements standard C library functions for memory allocation, malloc, calloc, realloc and free, using the *first-fit* algorithm to search for a free block, while supporting multiple allocation instances to split between memories and/or CPU cores.
- **memory** [📁](../memory) [🌐](https://github.com/GerHobbelt/memory) -- the C++ STL allocator model has various flaws. For example, they are fixed to a certain type, because they are almost necessarily required to be templates. So you can't easily share a single allocator for multiple types. In addition, you can only get a copy from the containers and not the original allocator object. At least with C++11 they are allowed to be stateful and so can be made object not instance based. But still, the model has many flaws. Over the course of the years many solutions have been proposed, for example [EASTL]. This library is another. But instead of trying to change the STL, it works with the current implementation.
- **merror** [📁](../merror) [🌐](https://github.com/GerHobbelt/merror) -- **MError** C++ Macro Error Handling Library is a library for error handling in C++ without exceptions. It requires C++17 and only works for gcc or clang compilers.
- **modbus-esp8266** [📁](../modbus-esp8266) [🌐](https://github.com/GerHobbelt/modbus-esp8266) -- a Modbus Library for Arduino. Supports ModbusRTU, ModbusTCP and ModbusTCP Security.
- **oof** [📁](../oof) [🌐](https://github.com/GerHobbelt/oof) -- OOF (omnipotent output friend) is a single C++20 header that wraps so-called [Virtual Terminal sequences](https://docs.microsoft.com/en-us/windows/console/console-virtual-terminal-sequences) (sometimes also confusingly called ["escape codes"](https://en.wikipedia.org/wiki/ANSI_escape_code)) in a convenient way, enabling console applications using OOF to be far more capable than usual: complete control over position, color and other properties of written characters.
- **picolibc** [📁](../picolibc) [🌐](https://github.com/GerHobbelt/picolibc) -- a library offering standard C library APIs that target small embedded systems with limited RAM. Picolibc was formed by blending code from [Newlib](http://sourceware.org/newlib/) and [AVR Libc](https://www.nongnu.org/avr-libc/).
- **printf** [📁](../printf) [🌐](https://github.com/GerHobbelt/printf) -- a tiny but **fully loaded** printf, sprintf and (v)snprintf implementation, primarily designed for usage in embedded systems where printf is not available due to memory issues or in avoidance of linking against libc.
- **ragel** [📁](../ragel) [🌐](https://github.com/GerHobbelt/ragel) -- State Machine Compiler
- **scales_chords_modes** [📁](../scales_chords_modes) [🌐](https://github.com/GerHobbelt/scales_chords_modes) -- a compact C++ algorithmic library for use in embedded music instrument software, providing scales' definitions plus an algorithmic modes and chords library, including an API for applying operations to the fundamental set, such as transposing (key and note based), chord inversions, reductions and expansions. Designed to have a low memory footprint.
- **sdcc** [📁](../sdcc) [🌐](https://github.com/GerHobbelt/sdcc) -- SDCC is the free open source, retargettable, optimizing ISO C compiler for small devices, including the Intel MCS-51 based microprocessors (8031, 8032, 8051, 8052, etc.), Maxim (formerly Dallas) DS80C390 variants, Freescale (formerly Motorola) HC08 based (hc08, s08), Zilog Z80 based MCUs (Z80, Z80N, Z180, SM83 (e.g. Game Boy), Rabbit 2000, Rabbit 2000A/3000, Rabbit 3000A, TLCS-90, R800), STMicroelectronics STM8, Padauk PDK14 and PDK15 and MOS 6502. Work is in progress on supporting the Padauk PDK13 target. There are unmaintained Microchip PIC16 and PIC18 targets.
- **specialty_histograms** [📁](../specialty_histograms) [🌐](https://github.com/GerHobbelt/specialty_histograms) -- templated C++ code for special-purpose histograms, e.g. discover lowest freq byte value in a memory range (for use as an IV for an encoder), saturated histogram for high probability results with minimum storage cost, ...
- **str-buf-stream-fmt-noheap** [📁](../str-buf-stream-fmt-noheap) [🌐](https://github.com/GerHobbelt/str-buf-stream-fmt-noheap) -- a C++/11 string buffer, stream and arbitrary type/value printer/formatter without any heap allocations nor any virtual methods nor any exceptions for fast deterministic execution in embedded and other restricted environments.
- **tinyexpr** [📁](../tinyexpr) [🌐](https://github.com/GerHobbelt/tinyexpr) -- a very small recursive descent parser and evaluation engine for math expressions.
- **uClibc** [📁](../uClibc) [🌐](https://github.com/GerHobbelt/uClibc) -- uClibc (a.k.a. µClibc/pronounced yew-see-lib-see) is a C library for developing embedded Linux systems.  It is much smaller than the GNU C Library, but nearly all applications supported by glibc also work perfectly with uClibc.  Porting applications from glibc to uClibc typically involves just recompiling the source code.
- **uclibc-ng** [📁](../uclibc-ng) [🌐](https://github.com/GerHobbelt/uclibc-ng) -- (a.k.a. `µClibc-ng`/pronounced yew-see-lib-see-next-generation) is a C library for developing embedded Linux systems. It is much smaller than the GNU C Library, but nearly all applications supported by glibc also work perfectly with uClibc-ng. uClibc-ng is a spin-off of uClibc from http://www.uclibc.org from Erik Andersen and others.













	
----

🡸 [previous section](./0100-microsoft-docx-openxml-other-xml-xslt-tooling.md)  |  🡹 [up](./0016-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0104-libraries-in-this-collection.md)  |  🡺 [next section](./0102-misc-uncategorized.md)
