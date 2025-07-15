

### Distance Metrics, Image Quality Metrics, Image Comparison

- **edit-distance** [📁](./edit-distance) [🌐](https://github.com/GerHobbelt/editdistance) -- a fast implementation of the edit distance (Levenshtein distance). The algorithm used in this library is proposed by _Heikki Hyyrö, "Explaining and extending the bit-parallel approximate string matching algorithm of Myers", (2001) <http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.19.7158&rep=rep1&type=pdf>_.
- **figtree** [📁](./figtree) [🌐](https://github.com/GerHobbelt/figtree) -- FIGTree is a library that provides a C/C++ and MATLAB interface for speeding up the computation of the Gauss Transform.
- **flip** [📁](./flip) [🌐](https://github.com/GerHobbelt/flip) -- ꟻLIP: A Tool for Visualizing and Communicating Errors in Rendered Images, implements the [LDR-ꟻLIP](https://research.nvidia.com/publication/2020-07_FLIP) and [HDR-ꟻLIP](https://research.nvidia.com/publication/2021-05_HDR-FLIP) image error metrics.
- **glfw** [📁](./glfw) [🌐](https://github.com/GerHobbelt/glfw) -- GLFW is an Open Source, multi-platform library for OpenGL, OpenGL ES and Vulkan application development.  It provides a simple, platform-independent API for creating windows, contexts and surfaces, reading input, handling events, etc.
- **imagedistance** [📁](./imagedistance) [🌐](https://github.com/GerHobbelt/imagedistance) -- given two images, calculate their distance in several criteria.
- **iqa** [📁](./iqa) [🌐](https://github.com/GerHobbelt/iqa) -- an Image Quality Analysis library.
- **libdip** [📁](./libdip) [🌐](https://github.com/GerHobbelt/diplib) -- **[*DIPlib*](https://diplib.org/diplib-docs/)** is a C++ library for quantitative image analysis.
- **libxcam** [📁](./libxcam) [🌐](https://github.com/GerHobbelt/libxcam) -- libXCam is a project for extended camera features and focus on image quality improvement and video analysis. There are lots features supported in image pre-processing, image post-processing and smart analysis. This library makes GPU/CPU/ISP working together to improve image quality. OpenCL is used to improve performance in different platforms.
- **magsac** [📁](./magsac) [🌐](https://github.com/GerHobbelt/magsac) -- (MAGSAC++ had been included in OpenCV) the MAGSAC and MAGSAC++ algorithms for robust model fitting without using a single inlier-outlier threshold.
- **mecab** [📁](./mecab) [🌐](https://github.com/GerHobbelt/mecab) -- MeCab (Yet Another Part-of-Speech and Morphological Analyzer) is a high-performance morphological analysis engine, designed to be independent of languages, dictionaries, and corpora, using Conditional Random Fields ((CRF)[http://www.cis.upenn.edu/~pereira/papers/crf.pdf]) to estimate the parameters.
- **pg_similarity** [📁](./pg_similarity) [🌐](https://github.com/GerHobbelt/pg_similarity) -- **pg\_similarity** is an extension to support similarity queries on [PostgreSQL](http://www.postgresql.org/). The implementation is tightly integrated in the RDBMS in the sense that it defines operators so instead of the traditional operators (`=` and `<>`) you can use `~~~` and `~!~` (any of these operators represents a similarity function).
- **poisson_blend** [📁](./poisson_blend) [🌐](https://github.com/GerHobbelt/poisson_blend) -- a simple, readable implementation of Poisson Blending, that demonstrates the concepts explained in [my article](https://erkaman.github.io/posts/poisson_blending.html), seamlessly blending a source image and a target image, at some specified pixel location.
- **polatory** [📁](./polatory) [🌐](https://github.com/GerHobbelt/polatory) -- a fast and memory-efficient framework for RBF (radial basis function) interpolation. Polatory can perform kriging prediction via RBF interpolation (dual kriging). Although different terminologies are used, both methods produce the same results.
- **radon-tf** [📁](./radon-tf) [🌐](https://github.com/GerHobbelt/radon-tf) -- simple implementation of the radon transform. Faster when using more than one thread to execute it. No inverse function is provided. CPU implementation only.
- **RapidFuzz** [📁](./RapidFuzz) [🌐](https://github.com/GerHobbelt/RapidFuzz) -- rapid fuzzy string matching in Python and C++ using the Levenshtein Distance.
- **rotate** [📁](./rotate) [🌐](https://github.com/GerHobbelt/rotate) -- provides several classic, commonly used and novel rotation algorithms (aka block swaps), which were documented since around 1981 up to 2021: three novel rotation algorithms were introduced in 2021, notably the [trinity rotation](https://github.com/scandum/rotate#Trinity-Rotation).
- **Shifted-Hamming-Distance** [📁](./Shifted-Hamming-Distance) [🌐](https://github.com/GerHobbelt/Shifted-Hamming-Distance) -- Shifted Hamming Distance (SHD) is an edit-distance based filter that can quickly check whether the minimum number of edits (including insertions, deletions and substitutions) between two strings is smaller than a user defined threshold **T** (the number of allowed edits between the two strings).  Testing if two stings differs by a small amount is a prevalent function that is used in many applications. One of its biggest usage, perhaps, is in DNA or protein mapping, where a short DNA or protein string is compared against an enormous database, in order to find similar matches. In such applications, a query string is usually compared against multiple candidate strings in the database. Only candidates that are similar to the query are considered **matches** and recorded.  SHD expands the basic Hamming distance computation, which only detects substitutions, into a full-fledged edit-distance filter, which counts not only substitutions but **insertions and deletions** as well.
- **vmaf** [📁](./vmaf) [🌐](https://github.com/GerHobbelt/vmaf) -- VMAF (Video Multi-Method Assessment Fusion) is an [Emmy-winning](https://theemmys.tv/) perceptual video quality assessment algorithm developed by Netflix. It also provides a set of tools that allows a user to train and test a custom VMAF model.
- **ZLMediaKit** [📁](./ZLMediaKit) [🌐](https://github.com/GerHobbelt/ZLMediaKit) -- a high-performance operational-level streaming media service framework based on C++11, supporting multiple protocols (RTSP/RTMP/HLS/HTTP-FLV/WebSocket-FLV/GB28181/HTTP-TS/WebSocket-TS/HTTP-fMP4/WebSocket-fMP4/MP4/WebRTC) and protocol conversion.
  
  This extension supports a set of similarity algorithms. The most known algorithms are covered by this extension. You must be aware that each algorithm is suited for a specific domain. The following algorithms are provided.
  
  - Cosine Distance;
  - Dice Coefficient;
  - Euclidean Distance;
  - Hamming Distance;
  - Jaccard Coefficient;
  - Jaro Distance;
  - Jaro-Winkler Distance;
  - L1 Distance (as known as City Block or Manhattan Distance);
  - Levenshtein Distance;
  - Matching Coefficient;
  - Monge-Elkan Coefficient;
  - Needleman-Wunsch Coefficient;
  - Overlap Coefficient;
  - Q-Gram Distance;
  - Smith-Waterman Coefficient;
  - Smith-Waterman-Gotoh Coefficient;
  - Soundex Distance.












