

### image export, image / \[scanned] document import

- **avir** [📁](./avir) [🌐](https://github.com/GerHobbelt/avir) -- a image resizing / scaling library which has reached a production level of quality, and is ready to be incorporated into any project. This library features routines for both down- and upsizing of 8- and 16-bit, 1 to 4-channel images. Image resizing routines were implemented in a portable, cross-platform, header-only C++ code, and have a high level of optimality. Beside resizing, this library offers a sub-pixel shift operation. Built-in sRGB gamma correction is available.
- **brunsli** [📁](./brunsli) [🌐](https://github.com/GerHobbelt/brunsli) -- a lossless JPEG repacking library. Brunsli allows for a 22% decrease in file size while allowing the original JPEG to be recovered byte-by-byte.
- **CImg** [📁](./CImg) [🌐](https://github.com/GerHobbelt/CImg) -- a **small** C++ toolkit for **image processing**.
- **CxImage** [📁](./CxImage) [🌐](https://github.com/GerHobbelt/CxImage) -- venerated library for reading and creating many image file formats.
- **dcmtk** [📁](./dcmtk) [🌐](https://github.com/GerHobbelt/dcmtk) -- the DICOM toolkit (DCMTK) package consists of source code, documentation and installation instructions for a set of software libraries and applications implementing part of the DICOM/MEDICOM Standard.
- **FFmpeg** [📁](./FFmpeg) [🌐](https://github.com/GerHobbelt/FFmpeg) -- a collection of libraries and tools to process multimedia content such as audio, video, subtitles and related metadata.
- **fpng** [📁](./fpng) [🌐](https://github.com/GerHobbelt/fpng) -- a very fast C++ .PNG image reader/writer for 24/32bpp images. fpng was written to see just how fast you can write .PNG's without sacrificing too much compression. The files written by fpng conform to the [PNG standard](https://www.w3.org/TR/PNG/), are readable using any PNG decoder, and load or validate successfully using libpng, wuffs, lodepng, stb_image, and [pngcheck](http://www.libpng.org/pub/png/apps/pngcheck.html). PNG files written using fpng can also be read using fpng faster than other PNG libraries, due to its explicit use of [Length-Limited Prefix Codes](https://create.stephan-brumme.com/length-limited-prefix-codes/) and an [optimized decoder](https://fastcompression.blogspot.com/2015/10/huffman-revisited-part-4-multi-bytes.html) that exploits the properties of these codes.
- **fpnge** [📁](./fpnge) [🌐](https://github.com/GerHobbelt/fpnge) -- fast PNG Encoder: a proof-of-concept fast PNG encoder that uses AVX2 and a special Huffman table to encode images faster. Speed on a single core is anywhere from 180 to 800 MP/s on a Threadripper 3970x, depending on compile time settings and content. It supports 8 and 16 bit content, 1 to 4 channels; it can also emit [cICP chunks](https://www.w3.org/TR/png/#cICP-chunk) for signaling that the content should be interpreted as HDR.
- **freeimage** [📁](./freeimage) [🌐](https://github.com/GerHobbelt/freeimage) -- a library supporting popular graphics image formats like PNG, BMP, JPEG, TIFF and others as needed by today's multimedia applications, providing an ANSI C interface.
- **giflib-turbo** [📁](./giflib-turbo) [🌐](https://github.com/GerHobbelt/giflib-turbo) -- GIFLIB-Turbo is a faster drop-in replacement for GIFLIB. The original GIF codecs were written for a much different world and took great pains to use as little memory as possible and to accommodate a slow and unreliable input stream of data. Those constraints are no longer a problem for the vast majority of users and they were hurting the performance. Another feature holding back the performance of the original GIFLIB was that the original codec was designed to work with image data a line at a time and used a separate LZW dictionary to manage the strings of repeating symbols. My codec uses the output image as the dictionary; this allows much faster 'unwinding' of the codes since they are all stored in the right direction to just be copied to the new location.
- **grok-jpeg2000** [📁](./grok-jpeg2000) [🌐](https://github.com/GerHobbelt/grok) -- World's Leading Open Source JPEG 2000 Codec
  
  Features:
  
  * support for new **High Throughput JPEG 2000 (HTJ2K)** standard
  * fast random-access sub-image decoding using `TLM` and `PLT` markers
  * full encode/decode support for `ICC` colour profiles
  * full encode/decode support for `XML`,`IPTC`, `XMP` and `EXIF` meta-data
  * full encode/decode support for `monochrome`, `sRGB`, `palette`, `YCC`, `extended YCC`, `CIELab` and `CMYK` colour spaces
  * full encode/decode support for `JPEG`,`PNG`,`BMP`,`TIFF`,`RAW`,`PNM` and `PAM` image formats
  * full encode/decode support for 1-16 bit precision images

- **guetzli** [📁](./guetzli) [🌐](https://github.com/GerHobbelt/guetzli) -- a JPEG encoder that aims for excellent compression density at high visual quality. Guetzli-generated images are typically 20-30% smaller than images of equivalent quality generated by libjpeg. Guetzli generates only sequential (nonprogressive) JPEGs due to faster decompression speeds they offer.
- **icer_compression** [📁](./icer_compression) [🌐](https://github.com/GerHobbelt/icer_compression) -- implements the NASA ICER image compression algorithm as a C library. Said compression algorithm is a progressive, wavelet-based image compression algorithm designed to be resistant to data loss, making it suitable for use as the image compression algorithm when encoding images to be transmitted over unreliable delivery channels, such as those in satellite radio communications.
- **Image-Compression-Benchmark** [📁](./Image-Compression-Benchmark) [🌐](https://github.com/GerHobbelt/Image-Compression-Benchmark) -- Lossless Image Compression Benchmark: a comparison of 20+ lossless image compression formats on several datasets.
- **imageio-freeimage** [📁](./imageio-freeimage) [🌐](https://github.com/GerHobbelt/imageio-freeimage) -- ImageIO FreeImage is an ImageIO plugin for the FreeImage library, which allows using [FreeImage](https://freeimage.sourceforge.io/) with [ImageIO](https://github.com/imageio/imageio).
- **jbig2dec** [📁](../../thirdparty/jbig2dec) [🌐](https://github.com/GerHobbelt/jbig2dec) -- a decoder library and example utility implementing the JBIG2 bi-level image compression spec. Also known as ITU T.88 and ISO IEC 14492, and included by reference in Adobe's PDF version 1.4 and later.
- **jbig2enc** [📁](./jbig2enc) [🌐](https://github.com/GerHobbelt/jbig2enc) -- an encoder for JBIG2. JBIG2 encodes bi-level (1 bpp) images using a number of clever tricks to get better compression than G4. This encoder can:
  
  * Generate JBIG2 files, or fragments for embedding in PDFs
  * Generic region encoding
  * Perform symbol extraction, classification and text region coding
  * Perform refinement coding and,
  * Compress multipage documents
  
  It uses the Leptonica library.

- **jbigkit** [📁](./jbigkit) [🌐](https://github.com/GerHobbelt/jbigkit) -- JBIG-KIT lossless image compression library, which implements a highly effective data compression algorithm for bi-level high-resolution images such as fax pages or scanned documents. JBIG-KIT implements the specification: International Standard ISO/IEC 11544:1993 and ITU-T Recommendation T.82(1993), "Information technology - Coded representation of picture and audio information - progressive bi-level image compression", <http://www.itu.int/rec/T-REC-T.82>, a.k.a. the "JBIG1 standard".
- **jpeginfo** [📁](../../thirdparty/jpeginfo) [🌐](https://github.com/GerHobbelt/jpeginfo) -- prints information and tests integrity of JPEG/JFIF files.
- **JPEG-XL** [📁](./jpeg-xl) [🌐](https://github.com/GerHobbelt/jpeg-xl) -- JPEG XL reference implementation (encoder and decoder), called `libjxl`. JPEG XL was standardized in 2022 as [ISO/IEC 18181](https://jpeg.org/jpegxl/workplan.html). The [core codestream](doc/format_overview.md#codestream-features) is specified in 18181-1, the [file format](doc/format_overview.md#file-format-features) in 18181-2. [Decoder conformance](https://github.com/libjxl/conformance) is defined in 18181-3, and 18181-4 is the [reference software](https://github.com/libjxl/libjxl).
- **knusperli** [📁](./knusperli) [🌐](https://github.com/GerHobbelt/knusperli) -- Knusperli reduces blocking artifacts in decoded JPEG images by interpreting quantized DCT coefficients in the image data as an interval, rather than a fixed value, and choosing the value from that interval that minimizes discontinuities at block boundaries.
- **lerc** [📁](./lerc) [🌐](https://github.com/GerHobbelt/lerc) -- LERC (Limited Error Raster Compression) is an open-source image or raster format which supports rapid encoding and decoding for any pixel type (not just RGB or Byte). Users set the maximum compression error per pixel while encoding, so the precision of the original input image is preserved (within user defined error bounds).
- **libaom** [📁](./libaom) [🌐](https://github.com/GerHobbelt/libaom) -- AV1 Codec Library
- **libavif** [📁](./libavif) [🌐](https://github.com/GerHobbelt/libavif) -- a friendly, portable C implementation of the AV1 Image File Format, as described here: <https://aomediacodec.github.io/av1-avif/>
- **libde265** [📁](./libde265) [🌐](https://github.com/GerHobbelt/libde265) -- libde265 is an open source implementation of the h.265 video codec. It is written from scratch and has a plain C API to enable a simple integration into other software. libde265 supports WPP and tile-based multithreading and includes SSE optimizations. The decoder includes all features of the Main profile and correctly decodes almost all conformance streams (see [[wiki page](https://github.com/strukturag/libde265/wiki/Decoder-conformance)]).
- **libgd** [📁](./libgd) [🌐](https://github.com/GerHobbelt/libgd) -- GD is a library for the dynamic creation of images by programmers. GD has support for: WebP, JPEG, PNG, AVIF, HEIF, TIFF, BMP, GIF, TGA, WBMP, XPM.
- **libgif** [📁](./libgif) [🌐](https://github.com/GerHobbelt/libgif) -- a library for manipulating GIF files.
- **libheif** [📁](./libheif) [🌐](https://github.com/GerHobbelt/heif) -- High Efficiency Image File Format (HEIF) :: a visual media container format standardized by the Moving Picture Experts Group (MPEG) for storage and sharing of images and image sequences. It is based on the well-known ISO Base Media File Format (ISOBMFF) standard. HEIF Reader/Writer Engine is an implementation of HEIF standard in order to demonstrate its powerful features and capabilities.
- **libheif-alt** [📁](./libheif-alt) [🌐](https://github.com/GerHobbelt/libheif) -- an ISO/IEC 23008-12:2017 HEIF and AVIF (AV1 Image File Format) file format decoder and encoder. HEIF and AVIF are new image file formats employing HEVC (h.265) or AV1 image coding, respectively, for the best compression ratios currently possible.
- **libjpeg** [📁](../../thirdparty/libjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-libjpeg) -- the Independent JPEG Group's JPEG software
- **libjpeg-turbo** [📁](./libjpeg-turbo) [🌐](https://github.com/GerHobbelt/libjpeg-turbo) -- a JPEG image codec that uses SIMD instructions to accelerate baseline JPEG compression and decompression on x86, x86-64, Arm, PowerPC, and MIPS systems, as well as progressive JPEG compression on x86, x86-64, and Arm systems.  On such systems, libjpeg-turbo is generally 2-6x as fast as libjpeg, all else being equal.  On other types of systems, libjpeg-turbo can still outperform libjpeg by a significant amount, by virtue of its highly-optimized Huffman coding routines.  In many cases, the performance of libjpeg-turbo rivals that of proprietary high-speed JPEG codecs.
- **libkra** [📁](./libkra) [🌐](https://github.com/GerHobbelt/libkra) -- a C++ library for importing Krita's KRA & KRZ formatted documents.
- **libpng** [📁](../../thirdparty/libpng) [🌐](https://github.com/GerHobbelt/libpng) -- LIBPNG: Portable Network Graphics support, official libpng repository.
- **LibRaw** [📁](./LibRaw) [🌐](https://github.com/GerHobbelt/LibRaw) -- a library for reading and processing of RAW files generated by digital photo cameras.
- **libtiff** [📁](../../thirdparty/libtiff) [🌐](https://github.com/GerHobbelt/libtiff) -- TIFF Software Distribution
- **libultrahdr** [📁](./libultrahdr) [🌐](https://github.com/GerHobbelt/libultrahdr) -- libultrahdr is an image compression library that uses gain map technology to store and distribute HDR images. Conceptually on the encoding side, the library accepts SDR and HDR rendition of an image and from these a Gain Map (quotient between the two renditions) is computed. The library then uses backward compatible means to store the base image (SDR), gain map image and some associated metadata.
- **libwebp** [📁](./libwebp) [🌐](https://github.com/GerHobbelt/libwebp) -- a library to encode and decode images in WebP format.
- **lunasvg** [📁](./lunasvg) [🌐](https://github.com/GerHobbelt/lunasvg) -- LunaSVG is a standalone SVG rendering library in C++.
- **mozjpeg** [📁](./mozjpeg) [🌐](https://github.com/GerHobbelt/mozjpeg) -- the Mozilla JPEG Encoder Project improves JPEG compression efficiency achieving higher visual quality and smaller file sizes at the same time. It is compatible with the JPEG standard, and the vast majority of the world's deployed JPEG decoders. MozJPEG is a patch for [libjpeg-turbo](https://github.com/libjpeg-turbo/libjpeg-turbo).
- **NBLI** [📁](./NBLI) [🌐](https://github.com/GerHobbelt/NBLI) -- NBLI (New-Bee Lossless Image) is a fast, better lossless compression algorithm, which supports both RGB 24-bit and Gray 8-bit image formats.
- **OpenEXR** [📁](./OpenEXR) [🌐](https://github.com/GerHobbelt/openexr) -- a high dynamic-range (HDR) image file format developed by Industrial Light & Magic (ILM) for use in computer imaging applications. OpenEXR is a lossless format for multi-layered images. Professional use. (I've used it before; nice file format.)
- **openexr-images** [📁](./openexr-images) [🌐](https://github.com/GerHobbelt/openexr-images) -- collection of images associated with the OpenEXR distribution.
- **OpenImageIO** [📁](./oiio) [🌐](https://github.com/GerHobbelt/oiio) -- Reading, writing, and processing images in a wide variety of file formats, using a format-agnostic API, aimed at VFX applications.
  
  Also includes:
  
  - an ImageCache class that transparently manages a cache so that it can access truly vast amounts of image data (tens of thousands of image files totaling multiple TB) very efficiently using only a tiny amount (tens of megabytes at most) of runtime memory.
  - ImageBuf and ImageBufAlgo functions, which constitute a simple class for storing and manipulating whole images in memory, plus a collection of the most useful computations you might want to do involving those images, including many image processing operations.
  
  The primary target audience for OIIO is VFX studios and developers of tools such as renderers, compositors, viewers, and other image-related software you'd find in a production pipeline.

- **openimageio-mupdf** [📁](./openimageio-mupdf) [🌐](https://github.com/GerHobbelt/openimageio-mupdf) -- an [OpenImageIO](https://github.com/imageio/imageio) plugin for the mupdf library which enables us to read/fetch/view every page in a given PDF file as a ready-to-use image.
- **openjpeg** [📁](../../thirdparty/openjpeg) [🌐](https://github.com/GerHobbelt/thirdparty-openjpeg) -- OPENJPEG Library and Applications -- OpenJPEG is an open-source JPEG 2000 codec written in C language. It has been developed in order to promote the use of [JPEG 2000](http://www.jpeg.org/jpeg2000), a still-image compression standard from the Joint Photographic Experts Group ([JPEG](http://www.jpeg.org)).  Since April 2015, it is officially recognized by ISO/IEC and ITU-T as a [JPEG 2000 Reference Software](http://www.itu.int/rec/T-REC-T.804-201504-I!Amd2).
- **pdiff** [📁](./pdiff) [🌐](https://github.com/GerHobbelt/pdiff) -- perceptualdiff (pdiff): a program that compares two images using a perceptually based image metric.
- **pmt-png-tools** [📁](./pmt-png-tools) [🌐](https://github.com/GerHobbelt/pmt) -- pngcrush and other PNG and MNG tools
- **psd_sdk** [📁](./psd_sdk) [🌐](https://github.com/GerHobbelt/psd_sdk) -- a C++ library that directly reads Photoshop PSD files. The library supports:
  
  * Groups
  * Nested layers
  * Smart Objects
  * User and vector masks
  * Transparency masks and additional alpha channels
  * 8-bit, 16-bit, and 32-bit data in grayscale and RGB color mode
  * All compression types known to Photoshop
  
  Additionally, limited export functionality is also supported.

- **qoi** [📁](./qoi) [🌐](https://github.com/GerHobbelt/qoi) -- QOI: the “Quite OK Image Format” for fast, lossless image compression, single-file MIT licensed library for C/C++. Compared to stb_image and stb_image_write QOI offers 20x-50x faster encoding, 3x-4x faster decoding and 20% better compression. It's also stupidly simple and fits in about 300 lines of C.
- **rawspeed** [📁](./rawspeed) [🌐](https://github.com/GerHobbelt/rawspeed) -- a library for decoding various images in RAW file format, while providing the fastest decoding speed possible. Supports the most common DSLR and similar class brands.
- **SFML** [📁](./SFML) [🌐](https://github.com/GerHobbelt/SFML) -- Simple and Fast Multimedia Library (SFML) is a simple, fast, cross-platform and object-oriented multimedia API. It provides access to windowing, graphics, audio and network.
- **tinyexr** [📁](./tinyexr) [🌐](https://github.com/GerHobbelt/tinyexr) -- Tiny OpenEXR: `tinyexr` is a small, single header-only library to load and save OpenEXR (.exr) images.
- **twain_library** [📁](./twain_library) [🌐](https://github.com/GerHobbelt/twain_library) -- the DTWAIN Library, **Version 5.x**, from Dynarithmic Software.  DTWAIN is an open source programmer's library that will allow applications to acquire images from TWAIN-enabled devices using a simple Application Programmer's Interface (API).
- **vpp** [📁](./vpp) [🌐](https://github.com/GerHobbelt/vpp) -- Video++ is a video and image processing library taking advantage of the C++14 standard to ease the writing of fast video and image processing applications. The idea behind Video++ performance is to generate via meta-programming code that the compiler can easily optimize. Its main features are generic N-dimensional image containers, a growing set of image processing algorithms, zero-cost abstractions to easily write image processing algorithms for multicore SIMD processors and an embedded language to evaluate image expressions.
- **Imath** [🌐](https://github.com/AcademySoftwareFoundation/Imath) -- float16 support lib for OpenEXR format
  
  - **optional**; reason: considered *overkill* for the projects I'm currently involved in, including Qiqqa. Those can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.

- **OpenImageIO** [🌐](https://github.com/OpenImageIO/oiio) -- a library for reading, writing, and processing images in a wide variety of file formats, using a format-agnostic API, aimed at VFX applications.
  
  - **tentative/pending**; reason: considered nice & cool but still *overkill*. Qiqqa tooling can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.

- ~~**cgohlke::imagecodecs** [🌐](https://github.com/cgohlke/imagecodecs) (*not included; see also DICOM slot above*)~~
- ~~[DICOM to NIfTI](https://github.com/rordenlab/dcm2niix) (*not included; see also DICOM slot above*)~~
- ~~**GDCM-Grassroots-DICOM** [🌐](https://github.com/malaterre/GDCM)~~
  
  - **removed**; reason: not a frequently used format; the filter codes can be found in other libraries. *Overkill*. Qiqqa tooling can use [Apache Tika](https://tika.apache.org/), [ImageMagick](https://imagemagick.org/) or other thirdparty pipelines to convert to & from supported formats.
















	
----

🡸 [previous section](./0034-ocr-page-image-preprocessing-scanner-tooling-getting-the-pages.md)  |  🡹 [up](./0022-pattern.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0036-monte-carlo-simulations-lda-keyword-inference-extraction-etc.md)
