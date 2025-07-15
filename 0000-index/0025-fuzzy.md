

### fuzzy matching

- **FM-fast-match** [📁](./FM-fast-match) [🌐](https://github.com/GerHobbelt/FAsT-Match) -- FAsT-Match: a port of the Fast Affine Template Matching algorithm (Simon Korman, Daniel Reichman, Gilad Tsur, Shai Avidan, CVPR 2013, Portland)
- **fuzzy-match** [📁](./fuzzy-match) [🌐](https://github.com/GerHobbelt/fuzzy-match) -- `FuzzyMatch-cli` is a commandline utility allowing to compile FuzzyMatch indexes and use them to lookup fuzzy matches. Okapi BM25 prefiltering is available on branch [`bm25`](https://github.com/SYSTRAN/fuzzy-match/tree/bm25).
- **libdist** [📁](./libdist) [🌐](https://github.com/GerHobbelt/distlib) -- string distance related functions (Damerau-Levenshtein, Jaro-Winkler, longest common substring & subsequence) implemented as SQLite run-time loadable extension, with UTF-8 support.
- **lshbox** [📁](./lshbox) [🌐](https://github.com/GerHobbelt/LSHBOX) -- a C++ Toolbox of Locality-Sensitive Hashing for Large Scale Image Retrieval. Locality-Sensitive Hashing (LSH) is an efficient method for large scale image retrieval, and it achieves great performance in approximate nearest neighborhood searching.
  
  LSHBOX is a simple but robust C++ toolbox that provides several LSH algrithms, in addition, it can be integrated into Python and MATLAB languages. The following LSH algrithms have been implemented in LSHBOX, they are:
  
  * LSH Based on Random Bits Sampling
  * Random Hyperplane Hashing
  * LSH Based on Thresholding
  * LSH Based on p-Stable Distributions
  * [Spectral Hashing](http://www.cs.huji.ac.il/~yweiss/SpectralHashing/) (SH)
  * [Iterative Quantization](http://www.unc.edu/~yunchao/itq.htm) (ITQ)
  * Double-Bit Quantization Hashing (DBQ)
  * K-means Based Double-Bit Quantization Hashing (KDBQ)

- **pdiff** [📁](./pdiff) [🌐](https://github.com/GerHobbelt/pdiff) -- perceptualdiff (pdiff): a program that compares two images using a perceptually based image metric.
- **rollinghashcpp** [📁](./rollinghashcpp) [🌐](https://github.com/GerHobbelt/rollinghashcpp) -- randomized rolling hash functions in C++. This is a set of C++ classes implementing various recursive n-gram hashing techniques, also called rolling hashing (http://en.wikipedia.org/wiki/Rolling_hash), including Randomized Karp-Rabin (sometimes called Rabin-Karp), Hashing by Cyclic Polynomials (also known as Buzhash) and Hashing by Irreducible Polynomials.
- **sdhash** [📁](./sdhash) [🌐](https://github.com/GerHobbelt/sdhash) -- a tool which allows two arbitrary blobs of data to be compared for similarity based on common strings of binary data. It is designed to provide quick results during triage and initial investigation phases.
- **ssdeep** [📁](./ssdeep) [🌐](https://github.com/GerHobbelt/ssdeep) -- fuzzy hashing library, can be used to assist with identifying almost identical files using context triggered piecewise hashing.
- **SSIM** [📁](./SSIM) [🌐](https://github.com/GerHobbelt/SSIM) -- the **structural similarity index measure** (**SSIM**) is a popular method to predict perceived image quality. Published in April 2004, with over [46,000 Google Scholar citations](https://scholar.google.com/scholar?q=Image+quality+assessment:+from+error+visibility+to+structural+similarity&hl=en&as_sdt=0&as_vis=1&oi=scholart), it has been re-implemented hundreds, perhaps thousands, of times, and is widely used as a measurement of image quality for image processing algorithms (even in places where it does not make sense, leading to even worse outcomes!).  Unfortunately, if you try to reproduce results in papers, or simply grab a few SSIM implementations and compare results, you will soon find that it is (nearly?) impossible to find two implementations that agree, and even harder to find one that agrees with the original from the author. Chris Lomont ran into this issue many times, so he finally decided to write it up once and for all (and provide clear code that matches the original results, hoping to help reverse the mess that is current SSIM). Most of the problems come from the original implementation being in MATLAB, which not everyone can use. Running the same code in open source Octave, which claims to be MATLAB compatible, even returns wrong results!  This large and inconsistent variation among SSIM implementations makes it hard to trust or compare published numbers between papers. The original paper doesn't define how to handle color images, doesn't specify what color space the grayscale values represent (linear? gamma compressed?), adding to the inconsistencies and results. The lack of color causes the following images to be rated as visually perfect by SSIM as published. The paper demonstrates so many issues when using SSIM with color images that they state "**we advise not to use SSIM with color images**".  All of this is a shame since the underlying concept works well for the given compute complexity. A good first step to cleaning up this mess is trying to get widely used implementations to match the author results for their published test values, and this requires clearly specifying the algorithm at the computational level, which the authors did not. Chris Lomont explains some of these choices, and most importantly, provides original, MIT licensed, single file C++ header and single file C# implementations; each reproduces the original author code better than any other version I have found.
- **ssimulacra2** [📁](./ssimulacra2) [🌐](https://github.com/GerHobbelt/ssimulacra2) -- Structural SIMilarity Unveiling Local And Compression Related Artifacts metric developed by Jon Sneyers. SSIMULACRA 2 is based on the concept of the multi-scale structural similarity index measure (MS-SSIM), computed in a perceptually relevant color space, adding two other (asymmetric) error maps, and aggregating using two different norms.
- **VQMT** [📁](./VQMT) [🌐](https://github.com/GerHobbelt/VQMT) -- VQMT (Video Quality Measurement Tool) provides fast implementations of the following objective metrics:
  
  - **MS-SSIM**: Multi-Scale Structural Similarity,
  - **PSNR**: Peak Signal-to-Noise Ratio,
  - **PSNR-HVS**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF),
  - **PSNR-HVS-M**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF) and between-coefficient contrast masking of DCT basis functions.
  - **SSIM**: Structural Similarity,
  - **VIFp**: Visual Information Fidelity, pixel domain version
  
  The above metrics are implemented in C++ with the help of OpenCV and are based on the original Matlab implementations provided by their developers.

- **xor-and-binary-fuse-filter** [📁](./xor-and-binary-fuse-filter) [🌐](https://github.com/GerHobbelt/xor_singleheader) -- XOR and Binary Fuse Filter library: Bloom filters are used to quickly check whether an element is part of a set. Xor filters and binary fuse filters are faster and more concise alternative to Bloom filters. They are also smaller than cuckoo filters. They are used in [production systems](https://github.com/datafuselabs/databend).















	
----

🡸 [prev](./0024-delta-features-other-feature.md)  |  🡹 [up](./0022-pattern.md)  |  🡺 [next](./0026-decision.md)
