









### OCR page image preprocessing, \[scanner] tooling: getting the pages to the OCR engine

- **Awesome-Document-Image-Rectification** [📁](./Awesome-Document-Image-Rectification) [🌐](https://github.com/GerHobbelt/Awesome-Document-Image-Rectification) -- a comprehensive list of awesome document image rectification methods based on deep learning.
- **Awesome-Image-Quality-Assessment** [📁](./Awesome-Image-Quality-Assessment) [🌐](https://github.com/GerHobbelt/Awesome-Image-Quality-Assessment) -- a comprehensive collection of IQA papers, datasets and codes. We also provide PyTorch implementations of mainstream metrics in [IQA-PyTorch](https://github.com/chaofengc/IQA-PyTorch)
- **butteraugli** [📁](./butteraugli) [🌐](https://github.com/GerHobbelt/butteraugli) -- a tool for measuring perceived differences between images. Butteraugli is a project that estimates the psychovisual similarity of two images. It gives a score for the images that is reliable in the domain of barely noticeable differences. Butteraugli not only gives a scalar score, but also computes a spatial map of the level of differences. One of the main motivations for this project is the statistical differences in location and density of different color receptors, particularly the low density of blue cones in the fovea. Another motivation comes from more accurate modeling of ganglion cells, particularly the frequency space inhibition.
- **Capture2Text** [📁](./Capture2Text) [🌐](https://github.com/GerHobbelt/Capture2Text) -- Linux CLI port of Capture2Text v4.5.1 (Ubuntu) - the OCR results from Capture2Text were generally better than standard Tesseract, so it seemed ideal to make this run on Linux.
- **ccv-nnc** [📁](./ccv-nnc) [🌐](https://github.com/GerHobbelt/ccv) -- C-based/Cached/Core Computer Vision Library. A Modern Computer Vision Library.
- **CImg** [📁](./CImg) [🌐](https://github.com/GerHobbelt/CImg) -- a **small** C++ toolkit for **image processing**.
- **colorm** [📁](./colorm) [🌐](https://github.com/GerHobbelt/colorm) -- ColorM is a C++11 header-only color conversion and manipulation library for [CSS colors](https://www.w3.org/TR/css-color-4/) with an API similar to [chroma.js](https://github.com/gka/chroma.js/)'s API.
- **ColorSpace** [📁](./ColorSpace) [🌐](https://github.com/GerHobbelt/ColorSpace) -- library for converting between color spaces and comparing colors.
- **color-util** [📁](./color-util) [🌐](https://github.com/GerHobbelt/color-util) -- a header-only C++11 library for handling colors, including color space converters between RGB, XYZ, Lab, etc. and color difference calculators such as CIEDE2000.
- **dcmtk** [📁](./dcmtk) [🌐](https://github.com/GerHobbelt/dcmtk) -- the DICOM toolkit (DCMTK) package consists of source code, documentation and installation instructions for a set of software libraries and applications implementing part of the DICOM/MEDICOM Standard.
- **DocLayNet** [📁](./DocLayNet) [🌐](https://github.com/GerHobbelt/DocLayNet) -- DocLayNet provides page-by-page layout segmentation ground-truth using bounding-boxes for 11 distinct class labels on 80863 unique pages from 6 document categories. It provides several unique features compared to related work such as PubLayNet or DocBank, e.g. *Human Annotation*: DocLayNet is hand-annotated by well-trained experts, providing a gold-standard in layout segmentation through human recognition and interpretation of each page layout.
- **doxa** [📁](./doxa) [🌐](https://github.com/GerHobbelt/Doxa) -- Δoxa Binarization Framework (ΔBF) is an image binarization framework which focuses primarily on local adaptive thresholding algorithms, aimed at providing the building blocks one might use to advance the state of handwritten manuscript binarization.
  
  Supported Algorithms:
  
  * Otsu - "A threshold selection method from gray-level histograms", 1979.
  * Bernsen - "Dynamic thresholding of gray-level images", 1986.
  * Niblack - "An Introduction to Digital Image Processing", 1986.
  * Sauvola - "Adaptive document image binarization", 1999.
  * Wolf - "Extraction and Recognition of Artificial Text in Multimedia Documents", 2003.
  * Gatos - "Adaptive degraded document image binarization", 2005. (Partial)
  * NICK - "Comparison of Niblack inspired Binarization methods for ancient documents", 2009.
  * Su - "Binarization of Historical Document Images Using the Local Maximum and Minimum", 2010.
  * T.R. Singh - "A New local Adaptive Thresholding Technique in Binarization", 2011.
  * Bataineh - "An adaptive local binarization method for document images based on a novel thresholding method and dynamic windows", 2011. (unreproducible)
  * ISauvola - "ISauvola: Improved Sauvola’s Algorithm for Document Image Binarization", 2016.
  * WAN - "Binarization of Document Image Using Optimum Threshold Modification", 2018.
  
  Optimizations:
  
  * Shafait - "Efficient Implementation of Local Adaptive Thresholding Techniques Using Integral Images", 2008.
  * Petty - An algorithm for efficiently calculating the min and max of a local window.  Unpublished, 2019.
  * Chan - "Memory-efficient and fast implementation of local adaptive binarization methods", 2019.
  
  Performance Metrics:
  
  * Overall Accuracy
  * F-Measure
  * Peak Signal-To-Noise Ratio (PSNR)
  * Negative Rate Metric (NRM)
  * Matthews Correlation Coefficient (MCC)
  * Distance-Reciprocal Distortion Measure (DRDM) - "An Objective Distortion Measure for Binary Document Images Based on Human Visual Perception", 2002.
  
  Native Image Support:
  
  * Portable Any-Map: PBM (P4), 8-bit PGM (P5), PPM (P6), PAM (P7)

- **EasyOCR** [📁](./EasyOCR) [🌐](https://github.com/GerHobbelt/EasyOCR) -- ready-to-use OCR with 80+ [supported languages](https://www.jaided.ai/easyocr) and all popular writing scripts including: Latin, Chinese, Arabic, Devanagari, Cyrillic, etc.
- **EasyOCR-cpp** [📁](./EasyOCR-cpp) [🌐](https://github.com/GerHobbelt/EasyOCR-cpp) -- custom C++ implementation of [EasyOCR](https://github.com/JaidedAI/EasyOCR). This C++ project implements the pre/post processing to run a OCR pipeline consisting of a text detector [CRAFT](https://arxiv.org/abs/1904.01941), and a CRNN based text recognizer. Unlike the EasyOCR python which is API based, this repo provides a set of classes to show how you can integrate OCR in any C++ program for maximum flexibility.
- **farver-OKlab** [📁](./farver-OKlab) [🌐](https://github.com/GerHobbelt/farver) -- provides very fast, vectorised functions for conversion of colours between different colour spaces, colour comparisons (distance between colours), encoding/decoding, and channel manipulation in colour strings.
- **fCWT** [📁](./fCWT) [🌐](https://github.com/GerHobbelt/fCWT) -- the fast Continuous Wavelet Transform (fCWT) is a highly optimized C++ library for very fast calculation of the CWT in C++, Matlab, and Python. **fCWT has been featured on the January 2022 cover of NATURE Computational Science**. In this article, fCWT is compared against eight competitor algorithms, tested on noise resistance and validated on synthetic electroencephalography and in vivo extracellular local field potential data.
- **FFmpeg** [📁](./FFmpeg) [🌐](https://github.com/GerHobbelt/FFmpeg) -- a collection of libraries and tools to process multimedia content such as audio, video, subtitles and related metadata.
- **gegl** [📁](./gegl) [🌐](https://github.com/GerHobbelt/gegl) -- *GEGL* (Generic Graphics Library) is a data flow based image processing framework, providing floating point processing and non-destructive image processing capabilities to [GNU Image Manipulation Program](http://www.gimp.org/) and other projects. With GEGL you chain together processing operations to represent the desired image processing pipeline. GEGL provides operations for image loading and storing, color adjustments, GIMPs artistic filters and more forms of image processing GEGL can be used on the command-line with the same syntax that can be used for creating processing flows interactively with text from GIMP using gegl-graph.
- **gmic** [📁](./gmic) [🌐](https://github.com/GerHobbelt/gmic) -- a Full-Featured Open-Source Framework for Image Processing. It provides several different **[user interfaces](https://en.wikipedia.org/wiki/User_interface)** to convert/manipulate/filter/visualize **generic image datasets**, ranging from _1d scalar signals_ to _3d+t sequences of multi-spectral volumetric images_, hence including _2d color images_.
- **gmic-community** [📁](./gmic-community) [🌐](https://github.com/GerHobbelt/gmic-community) -- community contributions for the GMIC Full-Featured Open-Source Framework for Image Processing. It provides several different **[user interfaces](https://en.wikipedia.org/wiki/User_interface)** to convert/manipulate/filter/visualize **generic image datasets**, ranging from _1d scalar signals_ to _3d+t sequences of multi-spectral volumetric images_, hence including _2d color images_.
- **graph-coloring** [📁](./graph-coloring) [🌐](https://github.com/GerHobbelt/graph-coloring) -- a C++ Graph Coloring Package. This project has two primary uses:
  
  * As an executable for finding the chromatic number for an input graph (in edge list or edge matrix format)
  * As a library for finding the particular coloring of an input graph (represented as a `map<string,vector<string>>` edge list)

- **GraphicsMagick** [📁](./GraphicsMagick) [🌐](https://github.com/GerHobbelt/graphicsmagick) -- provides a comprehensive collection of utilities, programming interfaces, and GUIs, to support file format conversion, image processing, and 2D vector rendering. GraphicsMagick is originally based on ImageMagick from ImageMagick Studio (which was originally written by John Cristy at Dupont). The goal of GraphicsMagick is to provide the highest quality product possible while encouraging open and active participation from all interested developers.
- **gtsam** [📁](./gtsam) [🌐](https://github.com/GerHobbelt/gtsam) -- Georgia Tech Smoothing and Mapping Library (GTSAM) is a C++ library that implements smoothing and mapping (SAM) in robotics and vision, using Factor Graphs and Bayes Networks as the underlying computing paradigm rather than sparse matrices.
- **guetzli** [📁](./guetzli) [🌐](https://github.com/GerHobbelt/guetzli) -- a JPEG encoder that aims for excellent compression density at high visual quality. Guetzli-generated images are typically 20-30% smaller than images of equivalent quality generated by libjpeg. Guetzli generates only sequential (nonprogressive) JPEGs due to faster decompression speeds they offer.
- **hsluv-c** [📁](./hsluv-c) [🌐](https://github.com/GerHobbelt/hsluv-c) -- HSLuv (revision 4) is a human-friendly alternative to HSL. HSLuv is very similar to CIELUV, a color space designed for perceptual uniformity based on human experiments. When accessed by polar coordinates, it becomes functionally similar to HSL with a single problem: its chroma component doesn't fit into a specific range. HSLuv extends CIELUV with a new saturation component that allows you to span all the available chroma as a neat percentage.
- **ImageMagick** [📁](./ImageMagick) [🌐](https://github.com/GerHobbelt/ImageMagick) -- [ImageMagick®](https://imagemagick.org/) can create, edit, compose, or convert digital images. It can read and write images in a variety of formats (over 200) including PNG, JPEG, GIF, WebP, HEIC, SVG, PDF, DPX, EXR, and TIFF. ImageMagick can resize, flip, mirror, rotate, distort, shear and transform images, adjust image colors, apply various special effects, or draw text, lines, polygons, ellipses, and Bézier curves.
- **Image-Smoothing-Algorithm-Based-on-Gradient-Analysis** [📁](./Image-Smoothing-Algorithm-Based-on-Gradient-Analysis) [🌐](https://github.com/GerHobbelt/Image-Smoothing-Algorithm-Based-on-Gradient-Analysis) -- the implementation of an image smoothing algorithm that was proposed in this [publication](https://ieeexplore.ieee.org/document/9117646). Our algorithm uses filtering and to achieve edge-preserving smoothing it uses two components of gradient vectors: their magnitudes (or lengths) and directions. Our method discriminates between two types of boundaries in given neighborhood: regular and irregular ones.
- **IMGUR5K-Handwriting-Dataset** [📁](./IMGUR5K-Handwriting-Dataset) [🌐](https://github.com/GerHobbelt/IMGUR5K-Handwriting-Dataset) -- the IMGUR5K Handwriting Dataset for OCR/image preprocessing benchmarks.
- **InversePerspectiveMapping** [📁](./InversePerspectiveMapping) [🌐](https://github.com/GerHobbelt/InversePerspectiveMapping) -- C++ class for the computation of plane-to-plane homographies, aka bird's-eye view or IPM, particularly relevant in the field of Advanced Driver Assistance Systems.
- **ITK** [📁](./ITK) [🌐](https://github.com/GerHobbelt/ITK) -- The Insight Toolkit (ITK) is an open-source, cross-platform toolkit for N-dimensional scientific image processing, segmentation, and registration. Segmentation is the process of identifying and classifying data found in a digitally sampled representation. Typically the sampled representation is an image acquired from such medical instrumentation as CT or MRI scanners. Registration is the task of aligning or developing correspondences between data. For example, in the medical environment, a CT scan may be aligned with a MRI scan in order to combine the information contained in both.
- **jasper** [📁](./jasper) [🌐](https://github.com/GerHobbelt/jasper) -- JasPer Image Processing/Coding Tool Kit
- **jpeg2dct** [📁](./jpeg2dct) [🌐](https://github.com/GerHobbelt/jpeg2dct) -- Faster Neural Networks Straight from JPEG: jpeg2dct subroutines -- this module is useful for reproducing results presented in the paper [Faster Neural Networks Straight from JPEG](https://openreview.net/forum?id=S1ry6Y1vG) (ICLR workshop 2018).
- **lcms2** [📁](../../thirdparty/lcms2) [🌐](https://github.com/GerHobbelt/thirdparty-lcms2) -- `lcms2mt` is a thread-safe fork of `lcms` (a.k.a. Little CMS). Little CMS intends to be a small-footprint color management engine, with special focus on accuracy and performance. It uses the International Color Consortium standard (ICC), which is the modern standard when regarding to color management. The ICC specification is widely used and is referred to in many International and other de-facto standards. It was approved as an International Standard, ISO 15076-1, in 2005. Little CMS is a **full implementation** of ICC specification 4.3, it fully supports all kind of V2 and V4 profiles, including abstract, devicelink and named color profiles.
- **leptonica** [📁](../../thirdparty/leptonica) [🌐](https://github.com/GerHobbelt/leptonica) -- supports many operations that are useful on images.
  
  Features:
  
  * Rasterop (aka bitblt)
  * Affine transforms (scaling, translation, rotation, shear) on images of arbitrary pixel depth
  * Projective and bilinear transforms
  * Binary and grayscale morphology, rank order filters, and convolution
  * Seedfill and connected components
  * Image transformations with changes in pixel depth, both at the same scale and with scale change
  * Pixelwise masking, blending, enhancement, arithmetic ops, etc.
  
  Documentation:
  
  - **LeptonicaDocsSite** [📁](./LeptonicaDocsSite) [🌐](https://github.com/GerHobbelt/LeptonicaDocsSite) -- unofficial Reference Documentation for the Leptonica image processing library ([www.leptonica.org](http://www.leptonica.org)).
  - **UnofficialLeptDocs** [📁](./UnofficialLeptDocs) [🌐](https://github.com/GerHobbelt/UnofficialLeptDocs) -- unofficial Sphinx-generated documentation for the Leptonica image processing library.

- **libchiaroscuramente** [📁](./libchiaroscuramente) [🌐](https://github.com/GerHobbelt/libchiaroscuramente) -- a collection of C/C++ functions (components) to help improving / enhancing your images for various purposes (e.g. helping an OCR engine detect and recognize the text in the page scan image)
- **libdip** [📁](./libdip) [🌐](https://github.com/GerHobbelt/diplib) -- **[*DIPlib*](https://diplib.org/diplib-docs/)** is a C++ library for quantitative image analysis.
- **libimagequant** [📁](./libimagequant) [🌐](https://github.com/GerHobbelt/libimagequant) -- Palette quantization library that powers `pngquant` and other PNG optimizers. `libimagequant` converts RGBA images to palette-based 8-bit indexed images, including alpha component. It's ideal for generating tiny PNG images and nice-looking GIFs. Image encoding/decoding isn't handled by the library itself, bring your own encoder.
- **libinsane** [📁](./libinsane) [🌐](https://github.com/GerHobbelt/libinsane) -- *the* library to access scanners on both Linux and Windows.
- **libjpegqs** [📁](./libjpegqs) [🌐](https://github.com/GerHobbelt/libjpegqs) -- JPEG Quant Smooth tries to recreate lost precision of DCT coefficients based on quantization table from jpeg image. You may not notice jpeg artifacts on the screen without zooming in, but you may notice them after printing. Also, when editing compressed images, artifacts can accumulate, but if you use this program before editing - the result will be better.
- **libpano13** [📁](./libpano13) [🌐](https://github.com/GerHobbelt/libpano13) -- the pano13 library, part of the Panorama Tools by Helmut Dersch of the University of Applied Sciences Furtwangen.
- **libpillowfight** [📁](./libpillowfight) [🌐](https://github.com/GerHobbelt/libpillowfight) -- simple C Library containing various image processing algorithms. 
  
  Available algorithms:
  
  - ACE (Automatic Color Equalization; Parallelized implementation)
  - Canny edge detection
  - Compare: Compare two images (grayscale) and makes the pixels that are different really visible (red).
  - Gaussian blur
  - Scan borders: Tries to detect the borders of a page in an image coming from a scanner.
  - Sobel operator
  - SWT (Stroke Width Transformation)
  - [Unpaper](https://github.com/Flameeyes/unpaper)'s algorithms
    
    - Blackfilter
    - Blurfilter
    - Border
    - Grayfilter
    - Masks
    - Noisefilter

- **libprecog** [📁](./libprecog) [🌐](https://github.com/GerHobbelt/PRLib) -- PRLib - Pre-Recognition Library. The main aim of the library is to prepare images for OCR (text recogntion). Image processing can really help to improve recognition quality.
- **libprecog-data** [📁](./libprecog-data) [🌐](https://github.com/GerHobbelt/libprecog-data) -- `PRLib` (a.k.a. `libprecog`) test data.
- **libprecog-manuals** [📁](./libprecog-manuals) [🌐](https://github.com/GerHobbelt/libprecog-manuals) -- `PRLib` (a.k.a. `libprecog`) related papers.
- **libraqm** [📁](./libraqm) [🌐](https://github.com/GerHobbelt/libraqm) -- a small library that encapsulates the logic for complex text layout and provides a convenient API.
- **libvips** [📁](./libvips) [🌐](https://github.com/GerHobbelt/libvips) -- a demand-driven, horizontally threaded image processing library which has around 300 operations covering arithmetic, histograms, convolution, morphological operations, frequency filtering, colour, resampling, statistics and others. It supports a large range of numeric types, from 8-bit int to 128-bit complex. Images can have any number of bands. It supports a good range of image formats, including JPEG, JPEG2000, JPEG-XL, TIFF, PNG, WebP, HEIC, AVIF, FITS, Matlab, OpenEXR, PDF, SVG, HDR, PPM / PGM / PFM, CSV, GIF, Analyze, NIfTI, DeepZoom, and OpenSlide. It can also load images via ImageMagick or GraphicsMagick, letting it work with formats like DICOM.
- **libxbr-standalone** [📁](./libxbr-standalone) [🌐](https://github.com/GerHobbelt/libxbr-standalone) -- this standalone XBR/hqx Library implements the xBR pixel art scaling filter developed by Hyllian, and now also the hqx filter developed by Maxim Stepin. Original source for the xBR implementation: http://git.videolan.org/gitweb.cgi/ffmpeg.git/?p=ffmpeg.git;a=blob;f=libavfilter/vf_xbr.c;h=5c14565b3a03f66f1e0296623dc91373aeac1ed0;hb=HEAD
- **local_adaptive_binarization** [📁](./local_adaptive_binarization) [🌐](https://github.com/GerHobbelt/local_adaptive_binarization) -- uses an improved contrast maximization version of Niblack/Sauvola et al's method to binarize document images. It is also able to perform the more classical Niblack as well as Sauvola et al. methods. Details can be found in the [ICPR 2002 paper](file:///Users/chris/www/prof/publications/index.html#icpr2002v).
- **LSWMS** [📁](./LSWMS) [🌐](https://github.com/GerHobbelt/LSWMS) -- LSWMS  (Line Segment detection using Weighted Mean-Shift): line segment detection with OpenCV, originally published by Marcos Nieto Doncel.
- **magsac** [📁](./magsac) [🌐](https://github.com/GerHobbelt/magsac) -- (MAGSAC++ had been included in OpenCV) the MAGSAC and MAGSAC++ algorithms for robust model fitting without using a single inlier-outlier threshold.
- **oidn-OpenImageDenoise** [📁](./oidn-OpenImageDenoise) [🌐](https://github.com/GerHobbelt/oidn) -- Intel® Open Image Denoise is an open source library of high-performance, high-quality denoising filters for images rendered with ray tracing.
- **olena** [📁](./olena) [🌐](https://github.com/GerHobbelt/olena) -- a platform dedicated to image processing.  At the moment it is mainly composed of a C++ library: Milena.  This library features many tools to easily perform image processing tasks.  Its main characteristic is its genericity: it allows to write an algorithm once and run it over many kinds of images (gray scale, color, 1D, 2D, 3D, ...).
- **OpenColorIO** [📁](./OpenColorIO) [🌐](https://github.com/GerHobbelt/OpenColorIO) -- OpenColorIO (OCIO) is a complete color management solution geared towards motion picture production with an emphasis on visual effects and computer animation. OCIO provides a straightforward and consistent user experience across all supporting applications while allowing for sophisticated back-end configuration options suitable for high-end production usage. OCIO is compatible with the Academy Color Encoding Specification (ACES) and is LUT-format agnostic, supporting many popular formats.
- **OpenCP** [📁](./OpenCP) [🌐](https://github.com/GerHobbelt/OpenCP) -- a library for computational photography.
- **opencv** [📁](./opencv) [🌐](https://github.com/GerHobbelt/opencv) -- OpenCV: Open Source Computer Vision Library
- **opencv_3rdparty** [📁](./opencv_3rdparty) [🌐](https://github.com/GerHobbelt/opencv_3rdparty) -- 3rdparty libraries used by OpenCV.
- **opencv_contrib** [📁](./opencv_contrib) [🌐](https://github.com/GerHobbelt/opencv_contrib) -- OpenCV's extra modules. This is where you'll find new, bleeding edge OpenCV module development.
- **opencv_extra** [📁](./opencv_extra) [🌐](https://github.com/GerHobbelt/opencv_extra) -- extra data for OpenCV: Open Source Computer Vision Library
- **OTB** [📁](./OTB) [🌐](https://github.com/GerHobbelt/OTB) -- Orfeo ToolBox (OTB) is an open-source project for state-of-the-art remote sensing. Built on the shoulders of the open-source geospatial community, it can process high resolution optical, multispectral and radar images at the terabyte scale. A wide variety of applications are available: from ortho-rectification or pansharpening, all the way to classification, SAR processing, and much more!
- **pdiff** [📁](./pdiff) [🌐](https://github.com/GerHobbelt/pdiff) -- perceptualdiff (pdiff): a program that compares two images using a perceptually based image metric.
- **Pillow** [📁](./Pillow) [🌐](https://github.com/GerHobbelt/Pillow) -- the friendly PIL (Python Imaging Library) fork by [Jeffrey A. Clark (Alex) and contributors](https://github.com/python-pillow/Pillow/graphs/contributors). PIL is the Python Imaging Library by Fredrik Lundh and Contributors. This library provides extensive file format support, an efficient internal representation, and fairly powerful image processing capabilities.
- **pillow-resize** [📁](./pillow-resize) [🌐](https://github.com/GerHobbelt/pillow-resize) -- a C++ porting of the resize method from the [Pillow](https://github.com/python-pillow/Pillow) python library. It is written in C++ using [OpenCV](https://opencv.org/) for matrix support. The main difference with respect to the [`resize`](https://docs.opencv.org/4.5.2/da/d54/group__imgproc__transform.html#ga47a974309e9102f5f08231edc7e7529d) method of OpenCV is the use of an anti aliasing filter, that is missing in OpenCV and could introduce some artifacts, in particular with strong down-sampling.
- **pixman** [📁](./pixman) [🌐](https://github.com/GerHobbelt/pixman) -- a library that provides low-level pixel manipulation features such as image compositing and trapezoid rasterization.
- **poisson_blend** [📁](./poisson_blend) [🌐](https://github.com/GerHobbelt/poisson_blend) -- a simple, readable implementation of Poisson Blending, that demonstrates the concepts explained in [my article](https://erkaman.github.io/posts/poisson_blending.html), seamlessly blending a source image and a target image, at some specified pixel location.
- **pylene** [📁](./pylene) [🌐](https://github.com/GerHobbelt/pylene) -- Pylene is a fork of [Olena/Milena](http://www.lrde.epita.fr/olena), an image processing library targeting genericity and efficiency. It provided mostly Mathematical Morphology building blocs for image processing pipelines.
- **radon-tf** [📁](./radon-tf) [🌐](https://github.com/GerHobbelt/radon-tf) -- simple implementation of the radon transform. Faster when using more than one thread to execute it. No inverse function is provided. CPU implementation only.
- **RandomizedRedundantDCTDenoising** [📁](./RandomizedRedundantDCTDenoising) [🌐](https://github.com/GerHobbelt/RandomizedRedundantDCTDenoising) -- demonstrates the paper S. Fujita, N. Fukushima, M. Kimura, and Y. Ishibashi, "Randomized redundant DCT: Efficient denoising by using random subsampling of DCT patches," Proc. Siggraph Asia, Technical Brief, Nov. 2015. In this paper, the DCT-based denoising is accelerated by using a randomized algorithm. The DCT is based on the fastest algorithm and is SIMD vectorized by using SSE. Some modifications improve denoising performance in term of PSNR. The code is 100x faster than the OpenCV's implementation (cv::xphoto::dctDenoising) for the paper. Optionally, we can use DHT (discrete Walsh–Hadamard transform) for fast computation instead of using DCT.
- **retinex** [📁](./retinex) [🌐](https://github.com/GerHobbelt/retinex) -- the Retinex algorithm for intrinsic image decomposition. The provided code computes image gradients, and assembles a sparse linear "Ax = b" system. The system is solved using Eigen.
- **rotate** [📁](./rotate) [🌐](https://github.com/GerHobbelt/rotate) -- provides several classic, commonly used and novel rotation algorithms (aka block swaps), which were documented since around 1981 up to 2021: three novel rotation algorithms were introduced in 2021, notably the [trinity rotation](https://github.com/scandum/rotate#Trinity-Rotation).
- **rotate_detection** [📁](./rotate_detection) [🌐](https://github.com/GerHobbelt/rotate_detection) -- angle rotation detection on scanned documents. Designed for embedding in systems using tesseract OCR. The detection algorithm based on [Rényi entropy](https://en.wikipedia.org/wiki/R%C3%A9nyi_entropy).
- **scantailor** [📁](./scantailor) [🌐](https://github.com/GerHobbelt/scantailor-advanced) -- [scantailor_advanced](https://github.com/4lex4/scantailor-advanced) is the [ScanTailor](https://github.com/scantailor/scantailor) version that merges the features of the *ScanTailor Featured* and *ScanTailor Enhanced* versions, brings new ones and fixes. ScanTailor is an interactive post-processing tool for scanned pages. It performs operations such as page splitting, deskewing, adding/removing borders, selecting content, ... and many others.
- **scilab** [📁](./scilab) [🌐](https://github.com/GerHobbelt/scilab) -- Scilab includes hundreds of mathematical functions. It has a high-level programming language allowing access to advanced data structures, 2-D and 3-D graphical functions.
- **simd-imgproc** [📁](./simd-imgproc) [🌐](https://github.com/GerHobbelt/Simd) -- the Simd Library is an image processing and machine learning library designed for C and C++ programmers. It provides many useful high performance algorithms for image processing such as: pixel format conversion, image scaling and filtration, extraction of statistic information from images, motion detection, object detection (HAAR and LBP classifier cascades) and classification, neural network.
  
  The algorithms are optimized, using different SIMD CPU extensions where available. The library supports following CPU extensions: SSE, AVX, AVX-512 and AMX for x86/x64, VMX(Altivec) and VSX(Power7) for PowerPC (big-endian), NEON for ARM.

- **SSIM** [📁](./SSIM) [🌐](https://github.com/GerHobbelt/SSIM) -- the **structural similarity index measure** (**SSIM**) is a popular method to predict perceived image quality. Published in April 2004, with over [46,000 Google Scholar citations](https://scholar.google.com/scholar?q=Image+quality+assessment:+from+error+visibility+to+structural+similarity&hl=en&as_sdt=0&as_vis=1&oi=scholart), it has been re-implemented hundreds, perhaps thousands, of times, and is widely used as a measurement of image quality for image processing algorithms (even in places where it does not make sense, leading to even worse outcomes!).  Unfortunately, if you try to reproduce results in papers, or simply grab a few SSIM implementations and compare results, you will soon find that it is (nearly?) impossible to find two implementations that agree, and even harder to find one that agrees with the original from the author. Chris Lomont ran into this issue many times, so he finally decided to write it up once and for all (and provide clear code that matches the original results, hoping to help reverse the mess that is current SSIM). Most of the problems come from the original implementation being in MATLAB, which not everyone can use. Running the same code in open source Octave, which claims to be MATLAB compatible, even returns wrong results!  This large and inconsistent variation among SSIM implementations makes it hard to trust or compare published numbers between papers. The original paper doesn't define how to handle color images, doesn't specify what color space the grayscale values represent (linear? gamma compressed?), adding to the inconsistencies and results. The lack of color causes the following images to be rated as visually perfect by SSIM as published. The paper demonstrates so many issues when using SSIM with color images that they state "**we advise not to use SSIM with color images**".  All of this is a shame since the underlying concept works well for the given compute complexity. A good first step to cleaning up this mess is trying to get widely used implementations to match the author results for their published test values, and this requires clearly specifying the algorithm at the computational level, which the authors did not. Chris Lomont explains some of these choices, and most importantly, provides original, MIT licensed, single file C++ header and single file C# implementations; each reproduces the original author code better than any other version I have found.
- **tesslinesplit** [📁](./tesslinesplit) [🌐](https://github.com/GerHobbelt/tesslinesplit) -- a standalone program for using Tesseract's line segmentation algorithm to split up document images.
- **twain_library** [📁](./twain_library) [🌐](https://github.com/GerHobbelt/twain_library) -- the DTWAIN Library, **Version 5.x**, from Dynarithmic Software.  DTWAIN is an open source programmer's library that will allow applications to acquire images from TWAIN-enabled devices using a simple Application Programmer's Interface (API).
- **unblending** [📁](./unblending) [🌐](https://github.com/GerHobbelt/unblending) -- a C++ library for decomposing a target image into a set of semi-transparent layers associated with *advanced color-blend modes* (e.g., "multiply" and "color-dodge"). Output layers can be imported to Adobe Photoshop, Adobe After Effects, GIMP, Krita, etc. and are useful for performing complex edits that are otherwise difficult.
- **unpaper** [📁](./unpaper) [🌐](https://github.com/GerHobbelt/unpaper) -- a post-processing tool for scanned sheets of paper, especially for book pages that have been scanned from previously created photocopies.  The main purpose is to make scanned book pages better readable on screen after conversion to PDF. The program also tries to detect misaligned centering and rotation of ages and will automatically straighten each page by rotating it to the correct angle (a.k.a. deskewing).
- **vivid** [📁](./vivid) [🌐](https://github.com/GerHobbelt/vivid) -- vivid 🌈 is a simple-to-use C++ color library.
- **VQMT** [📁](./VQMT) [🌐](https://github.com/GerHobbelt/VQMT) -- VQMT (Video Quality Measurement Tool) provides fast implementations of the following objective metrics:
  
  - **MS-SSIM**: Multi-Scale Structural Similarity,
  - **PSNR**: Peak Signal-to-Noise Ratio,
  - **PSNR-HVS**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF),
  - **PSNR-HVS-M**: Peak Signal-to-Noise Ratio taking into account Contrast Sensitivity Function (CSF) and between-coefficient contrast masking of DCT basis functions.
  - **SSIM**: Structural Similarity,
  - **VIFp**: Visual Information Fidelity, pixel domain version
  
  The above metrics are implemented in C++ with the help of OpenCV and are based on the original Matlab implementations provided by their developers.

- **wavelib** [📁](./wavelib) [🌐](https://github.com/GerHobbelt/wavelib) -- C implementation of Discrete Wavelet Transform (DWT,SWT and MODWT), Continuous Wavelet transform (CWT) and Discrete Packet Transform ( Full Tree Decomposition and Best Basis DWPT).
- **wdenoise** [📁](./wdenoise) [🌐](https://github.com/GerHobbelt/wdenoise) -- Wavelet Denoising in ANSI C using empirical bayes thresholding and a host of other thresholding methods.
- **xbrzscale** [📁](./xbrzscale) [🌐](https://github.com/GerHobbelt/xbrzscale) -- xBRZ upscaling commandline tool. This tool allows you to scale your graphics with xBRZ algorithm, see https://en.wikipedia.org/wiki/Pixel-art_scaling_algorithms#xBR_family
- **zimg** [📁](./zimg) [🌐](https://github.com/GerHobbelt/zimg) -- the "z" library implements the commonly required image processing basics of scaling, colorspace conversion, and depth conversion. A simple API enables conversion between any supported formats to operate with minimal knowledge from the programmer. All library routines were designed from the ground-up with correctness, flexibility, and thread-safety as first priorities.













	
----

🡸 [previous section](./0043-ocr-quality-improvements-language-detect.md)  |  🡹 [up](./0032-pattern-recognition.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0045-image-export-image-scanned-document-import.md)
