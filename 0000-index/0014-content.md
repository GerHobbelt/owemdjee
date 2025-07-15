

## Content Hashing (cryptographic strength i.e. *"guaranteed"* collision-free)

The bit about **_"guaranteed"_ collision-free** is to be read as: hash algorithms in this section must come with *strong statistical guarantees* that any chance at a **hash collision** is negligible, even for *extremely large* collections. In practice this means: use *cryptographic* hash algorithms with a *strength* of 128 bits or more. (Qiqqa used a b0rked version SHA1 thus far, which is considered too weak as we already sample PDFs which cause a hash collision for the *official* SHA1 algo (and thus also collide in our b0rked SHA1 variant): while those can still be argued to be fringe case, I don't want to be bothered with this at all and thus choose to err on the side of 'better than SHA1B' here. Meanwhile, any library in here *may* contain weaker cryptographic hashes alongside: we won't be using those for **content hashing**.

- **BLAKE3** [📁](./BLAKE3) [🌐](https://github.com/GerHobbelt/BLAKE3) -- cryptographic hash
- **boringssl** [📁](./boringssl) [🌐](https://github.com/GerHobbelt/boringssl) -- BoringSSL is a fork of OpenSSL that is designed to meet Google's needs.
- **botan** [📁](./botan) [🌐](https://github.com/GerHobbelt/botan) -- Botan (Japanese for peony flower) is a C++ cryptography library which' goal is to be the best option for cryptography in C++ by offering the tools necessary to implement a range of practical systems, such as TLS protocol, X.509 certificates, modern AEAD ciphers, PKCS#11 and TPM hardware support, password hashing, and post quantum crypto schemes.
- **cryptopp** [📁](./cryptopp) [🌐](https://github.com/GerHobbelt/cryptopp) -- crypto library
- **libsodium** [📁](./libsodium) [🌐](https://github.com/GerHobbelt/libsodium) -- an easy-to-use software library for encryption, decryption, signatures, password hashing, and more. It is a portable, cross-compilable, installable, packageable fork of [NaCl](http://nacl.cr.yp.to/), with a compatible API, and an extended API to improve usability even further.
- **md5-optimisation** [📁](./md5-optimisation) [🌐](https://github.com/GerHobbelt/md5-optimisation) -- MD5 Optimisation Tricks: Beating OpenSSL’s Hand-tuned Assembly. Putting aside the security concerns with using MD5 as a cryptographic hash, there have been few developments on the performance front for many years, possibly due to maturity of implementations and existing techniques considered to be optimal. Several new tricks are employed which I’ve not seen used elsewhere, ultimately beating OpenSSL’s hand-optimized MD5 implementation by roughly 5% in the general case, and 23% for processors with AVX512 support.
- **OpenSSL** [📁](./openssl) [🌐](https://github.com/GerHobbelt/openssl) -- its crypto library part, more specifically.
- **prvhash** [📁](./prvhash) [🌐](https://github.com/GerHobbelt/prvhash) -- PRVHASH is a hash function that generates a [uniform pseudo-random number sequence](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) derived from the message. PRVHASH is conceptually similar (in the sense of using a pseudo-random number sequence as a hash) to [`keccak`](https://en.wikipedia.org/wiki/SHA-3) and [`RadioGatun`](https://en.wikipedia.org/wiki/RadioGat%C3%BAn) schemes, but is a completely different implementation of such concept. PRVHASH is both a ["randomness extractor"](https://en.wikipedia.org/wiki/Randomness_extractor) and an "extendable-output function" (XOF).
- **SipHash** [📁](./SipHash) [🌐](https://github.com/GerHobbelt/SipHash) -- SipHash is a family of pseudorandom functions (PRFs) optimized for speed on short messages. This is the reference C code of SipHash: portable, simple, optimized for clarity and debugging. SipHash was designed in 2012 by [Jean-Philippe Aumasson](https://aumasson.jp) and [Daniel J. Bernstein](https://cr.yp.to) as a defense against [hash-flooding DoS attacks](https://aumasson.jp/siphash/siphashdos_29c3_slides.pdf).
  
  It is *simpler and faster* on short messages than previous cryptographic algorithms, such as MACs based on universal hashing, *competitive in performance* with insecure non-cryptographic algorithms, such as [fhhash](https://github.com/cbreeden/fxhash), *cryptographically secure*, with no sign of weakness despite multiple [cryptanalysis](https://eprint.iacr.org/2019/865) [projects](https://eprint.iacr.org/2019/865) by leading cryptographers, *battle-tested*, with successful integration in OSs (Linux kernel, OpenBSD, FreeBSD, FreeRTOS), languages (Perl, Python, Ruby, etc.), libraries (OpenSSL libcrypto, Sodium, etc.) and applications (Wireguard, Redis, etc.).
  
  As a secure pseudorandom function (a.k.a. keyed hash function), SipHash can also be used as a secure message authentication code (MAC). But SipHash is *not a hash* in the sense of general-purpose key-less hash function such as BLAKE3 or SHA-3. SipHash should therefore always be used with a secret key in order to be secure.

- **tink** [📁](./tink) [🌐](https://github.com/GerHobbelt/tink) -- A multi-language, cross-platform library that provides cryptographic APIs that are secure, easy to use correctly, and hard(er) to misuse.
- **tink-cc** [📁](./tink-cc) [🌐](https://github.com/GerHobbelt/tink-cc) -- Tink C++: Using crypto in your application shouldn't feel like juggling chainsaws in the dark. Tink is a crypto library written by a group of cryptographers and security engineers at Google. It was born out of our extensive experience working with Google's product teams, [fixing weaknesses in implementations](https://github.com/google/wycheproof), and providing simple APIs that can be used safely without needing a crypto background. Tink provides secure APIs that are easy to use correctly and hard(er) to misuse. It reduces common crypto pitfalls with user-centered design, careful implementation and code reviews, and extensive testing. At Google, Tink is one of the standard crypto libraries, and has been deployed in hundreds of products and systems.











