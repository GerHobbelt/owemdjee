

# Libraries we're looking at for this *intent*:

<!-- *toc* -->

* [TOC](#libraries-we-re-looking-at-for-this-intent)
    * [IPC: flatbuffer et al for protocol design](#ipc-flatbuffer-et-al-for-protocol-design)
    * [IPC: websockets, etc.: all communication means](#ipc-websockets-etc-all-communication-means)
        * [ZeroMQ a.k.a. ØMQ](#ipc-zeromq-aka-ømq)
        * [memory mapping](#ipc-memory-mapping)
    * [IPC: JSON for protocol design](#ipc-json-for-protocol-design)
    * [IPC: CBOR for protocol design](#ipc-cbor-for-protocol-design)
    * [IPC: YAML, TOML, etc. for protocol design](#ipc-yaml-toml-etc-for-protocol-design)
    * [Content Hashing (cryptographic strength i.e. *"guaranteed"* collision-free)](#content-hashing-cryptographic-strength-ie-guaranteed-collision-free)
    * [Hash-like Filters & Fast Hashing for Hash Tables et al (64 bits and less, mostly)](#hash-like-filters--fast-hashing-for-hash-tables-et-al-64-bits-and-less-mostly)
    * [Intermediate Data Storage / Caching / Hierarchical Data Stores (binary hOCR; document text revisions; ...)](#intermediate-data-storage--caching--hierarchical-data-stores-binary-hocr-document-text-revisions-)
        * [RAM-/disk-based large queues and stores: B+tree, LSM-tree, ...](#ram-disk-based-large-queues-and-stores-btree-lsm-tree-)
        * [HDF5 file format](#hdf5-file-format)
    * [Data Storage / Caching / IPC: loss-less data compression](#data-storage--caching--ipc-loss-less-data-compression)
    * [File / Directory Tree Synchronization (local and remote)](#file--directory-tree-synchronization-local-and-remote)
    * [OCR: hOCR output format, other output formats? (dedicated binary?)](#ocr-hocr-output-format-other-output-formats-dedicated-binary)
    * [Pattern Recognition](#pattern-recognition)
        * [BLAS, LAPACK, ...](#blas-lapack-)
        * [_delta features_ & other feature extraction (see Qiqqa research notes)](#delta-features--other-feature-extraction-see-qiqqa-research-notes)
        * [fuzzy matching](#fuzzy-matching)
        * [decision trees](#decision-trees)
        * [GMM/HMM/kM](#gmmhmmkm)
        * [graph analysis, graph databases](#graph-analysis-graph-databases)
        * [NN, ...](#nn-)
        * [similarity search](#similarity-search)
        * [text tokenization (as a preprocessing step for LDA et al)](#text-tokenization-as-a-preprocessing-step-for-lda-et-al)
        * [regex matchers (manual edit - pattern recognition)](#regex-matchers-manual-edit-pattern-recognition)
        * [OCR: quality improvements, language detect, ...](#ocr-quality-improvements-language-detect-)
        * [OCR page image preprocessing, \[scanner\] tooling: getting the pages to the OCR engine](#ocr-page-image-preprocessing-scanner-tooling-getting-the-pages-to-the-ocr-engine)
        * [image export, image / \[scanned\] document import](#image-export-image--scanned-document-import)
        * [Monte Carlo simulations, LDA, keyword inference/extraction, etc.](#monte-carlo-simulations-lda-keyword-inferenceextraction-etc)
        * [Random generators & all things random](#random-generators--all-things-random)
        * [Regression, curve fitting, polynomials, splines, geometrics, interpolation, math](#regression-curve-fitting-polynomials-splines-geometrics-interpolation-math)
        * [Solvers, Clustering, Monte Carlo, Decision Trees](#solvers-clustering-monte-carlo-decision-trees)
        * [Distance Metrics, Image Quality Metrics, Image Comparison](#distance-metrics-image-quality-metrics-image-comparison)
    * [database "backend storage"](#database-backend-storage)
        * [LMDB, NoSQL and key/value stores](#lmdb-nosql-and-keyvalue-stores)
        * [SQLite specific modules & related materials](#sqLite-specific-modules-related-materials)
    * [metadata & text (OCR et al) -- language detect, suggesting fixes, ...](#metadata--text-ocr-et-al----language-detect-suggesting-fixes-)
    * [PDF (XML) metadata editing](#pdf-xml-metadata-editing)
    * [web scraping (document extraction, cleaning, metadata extraction, BibTeX, ...)](#web-scraping-document-extraction-cleaning-metadata-extraction-bibtex-)
    * [audio files & processing](#audio-files--processing)
    * [file format support](#file-format-support)
    * [BibTeX and similar library metadata formats' support](#bibtex-and-similar-library-metadata-formats-support)
    * [export / output file formats, text formatting, etc.](#export--output-file-formats-text-formatting-etc)
    * [FTS (*Full Text Search*) and related: SOLR/Lucene et al: document content search](#fts-full-text-search-and-related-solrlucene-et-al-document-content-search)
        * [stemmers](#stemmers)
        * [language detection / inference](#language-detection--inference)
    * [scripting *user-tunable tasks* such as OCR preprocessing, metadata extraction, metadata cleaning & other \[post-\]processing, ...](#scripting-user-tunable-tasks-such-as-ocr-preprocessing-metadata-extraction-metadata-cleaning--other-post-processing-)
      * [QuickJS specific modules & related materials](#quickjs-specific-modules-related-materials)
    * [multi-processing core technologies](#multi-processing-core-technologies)
        * [CLI: commandline parsing & perusing](#cli-commandline-parsing--perusing)
        * [CPU features & capabilities detection](#cpu-features--capabilities-detection)
        * [Date & time functionality](#date--time-functionality)
        * [Misc. core functionality](#misc-core-functionality)
        * [multi-processing: invoking external applications](#multi-processing-invoking-external-applications)
        * [multi-processing: Promise/A+](#multi-processing-promisea)
        * [multi-processing: running tasks in parallel: multi-processing, multithreading, async, ...](#multi-processing-running-tasks-in-parallel-multi-processing-multithreading-async-)
        * [multi-processing: task schedulers](#multi-processing-task-schedulers)
        * [multi-processing: thread pools](#multi-processing-thread-pools)
        * [run-time library core features: logging, formatting, ...](#run-time-library-core-features-logging-formatting-)
    * [web servers, generic sockets I/O (IPC)](#web-servers-generic-sockets-io-ipc)
    * [socket I/O: websockets](#socket-io-websockets)
    * [disk I/O, monitoring import locations, ...](#disk-io-monitoring-import-locations-)
    * [configuration / parameterization](#configuration--parameterization)
        * [TOML](#toml)
        * [YAML](#yaml)
        * [INI](#ini)
    * [testing, benchmarking & fuzzing](#testing-benchmarking--fuzzing)
    * [logging & debugging](#logging--debugging)
        * [ETW (Event Tracing for Microsoft Windows)](#etw-event-tracing-for-microsoft-windows)
    * [colour processing & conversion](#colour-processing--conversion)
    * [visualization](#visualization)
    * [telemetry](#telemetry)
    * [OCR core (*tesseract*)](#ocr-core-tesseract)
    * [PDF render & metadata core (*mupdf*)](#pdf-render--metadata-core-mupdf)
    * [UI / GUI](#ui--gui)
    * [Language translation & transliteration](####language-translation--transliteration)
    * [Application Installers (NSIS, et al)](#application-installers-nsis-et-al)
    * [checking out the competition / compatriots for Qiqqa + re-use useful components](#checking-out-the-competition--compatriots-for-qiqqa--re-use-useful-components)
    * [citations output (CSL)](#citations-output-csl)
    * [Microsoft Word, Google Docs, LibreOffice: application integration](#microsoft-word-google-docs-libreoffice-application-integration)
    * [XML & XSLT tooling](#xml--xslt-tooling)
    * [Microsoft DOCX ~ OpenXML & other XML & XSLT tooling](#microsoft-docx--openxml--other-xml--xslt-tooling)
    * [Misc. / Other](#misc--other)
    * [sub-dependencies (libraries which are required by any of the above)](#sub-dependencies-libraries-which-are-required-by-any-of-the-above)
* [Libraries in this collection (All of the above, listed in alphabetical order)](#libraries-in-this-collection-all-of-the-above-listed-in-alphabetical-order)
* [TBD: Libraries which still need to be moved into the overview / categories above...](#tbd-libraries-which-still-need-to-be-moved-into-the-overview--categories-above)















	
----

🡸 [previous section](./0005-scripting-the-system-languages-considered-for-scripting-by.md)  |  🡹 [up](../README.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0007-ipc-flatbuffer-et-al-for-protocol.md)
