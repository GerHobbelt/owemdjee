











### Random generators & all things random

- **EigenRand** [📁](./EigenRand) [🌐](https://github.com/GerHobbelt/EigenRand) -- EigenRand: The Fastest C++11-compatible random distribution generator for Eigen. EigenRand is a header-only library for [Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page), providing vectorized random number engines and vectorized random distribution generators.  Since the classic Random functions of Eigen rely on an old C function `rand()`, there is no way to control random numbers and no guarantee for quality of generated numbers. In addition, Eigen's Random is slow because `rand()` is hard to vectorize. EigenRand provides a variety of random distribution functions similar to C++11 standard's random functions, which can be vectorized and easily integrated into Eigen's expressions of Matrix and Array. You can get 5~10 times speed by just replacing old Eigen's Random or unvectorizable c++11 random number generators with EigenRand.
- **fastPRNG** [📁](./fastPRNG) [🌐](https://github.com/GerHobbelt/fastPRNG) -- a single header-only FAST 32/64 bit PRNG (pseudo-random generator), highly optimized to obtain faster code from compilers, it's based on **xoshiro** / **xoroshiro** ([**Blackman/Vigna**](http://prng.di.unimi.it/)), **xorshift** and other [**Marsaglia**](https://en.wikipedia.org/wiki/George_Marsaglia) algorithms.
- **libchaos** [📁](./libchaos) [🌐](https://github.com/GerHobbelt/libchaos) -- *Advanced library for randomization, hashing and statistical analysis (devoted to [chaos machines](https://en.wikipedia.org/wiki/Chaos_machine))* written to help with the development of software for scientific research. Project goal is to *implement & analyze* various algorithms for randomization and hashing, while maintaining simplicity and security, making them suitable for use in your own code. Popular tools like [TestU01](http://simul.iro.umontreal.ca/testu01/tu01.html), [Dieharder](https://www.phy.duke.edu/~rgb/General/dieharder.php) and [Hashdeep](https://github.com/jessek/hashdeep) are obsolete or their development has been stopped. Libchaos aims to replace them.
- **libprng** [📁](./libprng) [🌐](https://github.com/GerHobbelt/libprng) -- a collection of C/C++ PRNGs (pseudo-random number generators) + supporting code.
- **OpenRAND** [📁](./OpenRAND) [🌐](https://github.com/GerHobbelt/OpenRAND) -- OpenRAND (Reproducible Random Number For Parallel Computations) is a C++ library designed to foster reproducible scientific research by providing a robust and replicable random number generation solution. It is a simple header only library that is performance portable, statistically robust, and easy to integrate into any HPC computing project.
- **pcg-cpp-random** [📁](./pcg-cpp-random) [🌐](https://github.com/GerHobbelt/pcg-cpp) -- a C++ implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
- **pcg-c-random** [📁](./pcg-c-random) [🌐](https://github.com/GerHobbelt/pcg-c) -- a C implementation of the PCG family of random number generators, which are fast, statistically excellent, and offer a number of useful features.
- **poisson-disc-distribution-bridson** [📁](./poisson-disc-distribution-bridson) [🌐](https://github.com/GerHobbelt/poisson-disc-distribution-bridson) -- a Poisson disc distribution produces randomised points that are close together but not closer than a lower bound. It is a form of [blue noise](https://en.wikipedia.org/wiki/Blue_noise#Blue_noise) that emulates the arrangement of the eye's retina cells and works well for sampling. The result is more aesthetically pleasing than uniform or jittered-grid approaches.
- **prvhash** [📁](./prvhash) [🌐](https://github.com/GerHobbelt/prvhash) -- PRVHASH is a hash function that generates a [uniform pseudo-random number sequence](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) derived from the message. PRVHASH is conceptually similar (in the sense of using a pseudo-random number sequence as a hash) to [`keccak`](https://en.wikipedia.org/wiki/SHA-3) and [`RadioGatun`](https://en.wikipedia.org/wiki/RadioGat%C3%BAn) schemes, but is a completely different implementation of such concept. PRVHASH is both a ["randomness extractor"](https://en.wikipedia.org/wiki/Randomness_extractor) and an "extendable-output function" (XOF).
- **randen** [📁](./randen) [🌐](https://github.com/GerHobbelt/randen) -- What if we could default to attack-resistant random generators without excessive CPU cost? We introduce 'Randen', a new generator with security guarantees; it outperforms MT19937, pcg64_c32, Philox, ISAAC and ChaCha8 in real-world benchmarks. This is made possible by AES hardware acceleration and a large Feistel permutation.
- **random** [📁](./random) [🌐](https://github.com/GerHobbelt/random) -- random for modern C++ with a convenient API.
- **RNGSobol** [📁](./RNGSobol) [🌐](https://github.com/GerHobbelt/RNGSobol) -- Sobol quadi-random numbers generator (C++). Note that unlike pseudo-random numbers, quasi-random numbers care about dimensionality of points.
- **trng4** [📁](./trng4) [🌐](https://github.com/GerHobbelt/trng4) -- Tina’s Random Number Generator Library (TRNG) is a state of the art C++ pseudo-random number generator library for sequential and parallel Monte Carlo simulations. Its design principles are based on the extensible random number generator facility that was introduced in the C++11 standard. The TRNG library features an object oriented design, is easy to use and has been speed optimized. Its implementation does not depend on any communication library or hardware architecture.
- **Xoshiro-cpp** [📁](./Xoshiro-cpp) [🌐](https://github.com/GerHobbelt/Xoshiro-cpp) -- a header-only pseudorandom number generator library for modern C++. Based on **David Blackman and Sebastiano Vigna's [xoshiro/xoroshiro generators](http://prng.di.unimi.it/)**.





	
----

🡸 [previous section](./0036-monte-carlo-simulations-lda-keyword-inference-extraction-etc.md)  |  🡹 [up](./0022-pattern.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0038-regression-curve-fitting-polynomials-splines-geometrics-interpolation.md)
