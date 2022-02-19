# Other subjects of interest

# Unicode

- https://sites.psu.edu/symbolcodes/accents/math/ :: Mathematical Symbols in Unicode


# JavaScript / JerryScript / QuickJS

- https://github.com/Samsung/node-jerryscript :: Samsung : JS runtime based on JerryScript
- https://github.com/Samsung/Castanets :: Samsung : Edge distributed web engine. Part of web engine processes are offloaded to a powerful devices and only graphical results are processed in local devices. This way, we overcome both CPU limitations and memory limitations of the low-end local devices
    
    ### What is CASTANETS?   <img src="https://github.com/Samsung/Castanets/raw/castanets_76_dev/docs/images/Castanets_logo_white.svg" width="48">
    
    Castanets is an evolutionary web browser for next generation networks (5G and beyond).
    
    The proliferation of smart electronic devices and the advancement of high-speed wireless networks have been driving the exponential growth of web users and web applications. As specifications of the web technologies expand, the memory consumption and computing power requirements of the browsers are increasing significantly. However, the web browsers are becoming unsuitable for embedded devices and consumer electronics devices. Unlike PCs and smartphones, both computing capabilities and memory capacities are extremely limited in IoT-enabled devices. Recent Chromium, in general, consume more than 150MB of memories to view popular websites. When the number of tabs increases, the memory usages increase proportionally and turn out to be unacceptable for embedded devices.
    
    Considering aforementioned aspects of browser overheads, we propose an in-home edge-distributed split web browser; Castanets. The split rendering processes run memory intensive component on the distributed in-home edge devices while the browser process runs GPU intensive and composites results on the screen.
    
- https://bellard.org/quickjs/bench.html :: QuickJS Benchmark

  Compared against many other "embedded" JavaScript engines
  
- https://github.com/facebook/hermes :: Hermes is a small and lightweight JavaScript engine optimized for running React Native.

- https://tc39.es/ecma262/ :: ECMAScript® 2022 Language Specification

    - https://github.com/tc39/ecmarkup :: An HTML superset/Markdown subset source format for ECMAScript and related specifications
    
      - See also https://tc39.es/ecmarkup/#getting-started
      
      - https://github.com/rbuckton/grammarkdown :: Markdown-like DSL for defining grammatical syntax for programming languages.
      
- https://en.wikipedia.org/wiki/List_of_ECMAScript_engines :: List of ECMAScript engines

- https://en.wikipedia.org/wiki/Comparison_of_JavaScript_engines :: Comparison of JavaScript engines


    



# Fuzzing / Testing

- https://github.com/googleprojectzero/winafl :: A fork of AFL for fuzzing Windows binaries
    
    AFL is a popular fuzzing tool for coverage-guided fuzzing. The tool combines fast target execution with clever heuristics to find new execution paths in the target binary. It has been successfully used to find a large number of vulnerabilities in real products. For more info about the original project, please refer to the original documentation at:
    
    http://lcamtuf.coredump.cx/afl/
    
    Unfortunately, the original AFL does not work on Windows due to very *nix-specific design (e.g. instrumentation, forkserver etc). This project is a fork of AFL that uses different instrumentation approach which works on Windows even for black box binary fuzzing.
    
    ### The WinAFL approach
    
    Instead of instrumenting the code at compilation time, WinAFL supports the following instrumentation modes:
    
    - Dynamic instrumentation using DynamoRIO (http://dynamorio.org/)
    - Hardware tracing using Intel PT
    - Static instrumentation via Syzygy
    
- [How to use Google Test for C++ in Visual Studio](https://docs.microsoft.com/en-us/visualstudio/test/how-to-use-google-test-for-cpp?view=vs-2019)

- [CMake: Debugging](https://cliutils.gitlab.io/modern-cmake/chapters/features/debug.html) :: You might need to debug your CMake build, or debug your C++ code. Both are covered here.

- https://blog.doyensec.com/2020/09/09/fuzzilli-jerryscript.html :: Fuzzing JavaScript Engines (JerryScript) with Fuzzilli





# Debugging

- https://github.com/x64dbg/x64dbg :: An open-source x64/x32 debugger for windows.





# OS / Systems, Languages: core stuff

- https://github.com/inferno-os/inferno-os :: Inferno® is a distributed operating system. Inferno represents services and resources in a file-like name hierarchy, including devices, network and protocol interfaces, dynamic data sources, and services. Applications are written in a concurrent programming language, Limbo.

- https://github.com/albertodemichelis/squirrel :: Official repository for the programming language Squirrel : http://www.squirrel-lang.org/

- https://devmesh.intel.com/git?sort=best :: **interesting papers**, sites and git repositories. With a search index to dig through the (growing) collection.

- coroutines et al:
  + https://github.com/xhawk18/s_task :: awaitable coroutine library for C
  + https://github.com/tencent-wechat/libco :: Coroutine library for C/C++
  + https://github.com/idealvin/co :: A go-style coroutine library in C++11 and more.
  + https://github.com/lewissbaker/cppcoro :: A library of C++ coroutine abstractions for the coroutines C++ Standards Proposal
  + https://github.com/Naios/continuable :: C++14 asynchronous allocation aware futures (supporting then, exception handling, coroutines and connections)
  + https://github.com/David-Haim/concurrencpp :: Modern concurrency for C++. Tasks, executors, timers and C++20 coroutines to rule them all
  + https://github.com/iqiyi/libfiber :: The high performance coroutine library for Linux/FreeBSD/MacOS/Windows, supporting select/poll/epoll/kqueue/iocp/windows GUI

    *What's more*: with the help of libfiber you can even write network module of the Windows GUI application written by MFC, wtl or other GUI framework on Windows in coroutine way. 
  + https://github.com/sustrik/libmill :: Go-style concurrency in C
  + https://github.com/google/marl :: A hybrid thread / fiber task scheduler written in C++ 11
  + https://github.com/Tastyep/TaskManager :: an asynchronous task management library using the features of C++14.
  + https://github.com/Naios/TaskScheduler :: Use functors, lambdas and std::chrono to schedule tasks in the near future
  + 
  
- https://www.youtube.com/watch?v=X1T3IQ4N-3g&ab_channel=CppCon :: atomics, two types of 'em in the standard
- https://www.youtube.com/watch?v=fHNmRkzxHWs :: part 1, https://www.youtube.com/watch?v=vElZc6zSIXM&ab_channel=CppCon :: part 2

- https://github.com/dokan-dev/dokany -- FUSE on Windows; mountable custom file systems for MSWindows. Includes a `memfs` sample FS. Interesting as an alternative way into large libraries: a custom file-system like that can be used to offer folks a 'human-readable' set of document files which do not take up space on your harddrive as they will be direct aliases of the hash-encoded Qiqqa-managed documents.



# Monitoring, (SQL) Querying, Data Gathering and Reporting

- https://github.com/osquery/osquery :: osquery exposes an operating system as a high-performance relational database. This allows you to write SQL-based queries to explore operating system data. With osquery, SQL tables represent abstract concepts such as running processes, loaded kernel modules, open network connections, browser plugins, hardware events or file hashes.

  SQL tables are implemented via a simple plugin and extensions API. A variety of tables already exist and more are being written: https://osquery.io/schema.

  ---

  This inspired me to consider this or a similar interface for monitoring and debugging the task queue, which can grow *huge* in Qiqqa and has beeen a problem spot since the beginning: we need to discover how we can prioritize tasks, how they are queued in the internal task list and how and where we can modify or *tune* this behaviour to provide an optimal UX.

  Turns out following a quick scan of the source tree that osquery is using [SQLite Virtual Tables](https://sqlite.org/vtab.html) as a fundament, which suits us *fine* as we're using SQLite already ourselves *and* intend to run it as part of the C/C++ backend binary in the *new Qiqqa design*, which is a place we have already considered moving the task list + scheduler to in the past. Ergo: a very nice fit for our needs and ideas.

  See also:

  - https://www.sqlite.org/vtablist.html#:~:text=A%20virtual%20table%20is%20an%20object%20that%20presents,database%20file%20using%20the%20powerful%20SQL%20query%20language.
  - https://sqlite.org/vtab.html



# Network protocols

- https://github.com/xia-chu/ZLMediaKit :: A lightweight RTSP/RTMP/HTTP/HLS/HTTP-FLV/WebSocket-FLV/HTTP-TS/HTTP-fMP4/WebSocket-TS/WebSocket-fMP4/GB28181/WebRTC server and client framework based on C++11
    
    ![logo](https://raw.githubusercontent.com/zlmediakit/ZLMediaKit/master/www/logo.png)
    
    ### A lightweight ,high performance and stable stream server and client framework based on C++11
    

    ### Why ZLMediaKit?
    
    - Developed based on C++ 11, the code is stable and reliable, avoiding the use of raw pointers, cross-platform porting is simple and convenient, and the code is clear and concise.
    - Support rich streaming media protocols(`RTSP/RTMP/HLS/HTTP-FLV/WebSocket-flv/HTTP-TS/WebSocket-TS/HTTP-fMP4/Websocket-fMP4/MP4/WebRTC`),and support Inter-protocol conversion.
    - Multiplexing asynchronous network IO based on epoll and multi thread，extreme performance.
    - Well performance and stable test,can be used commercially.
    - Support linux, macos, ios, android, Windows Platforms.
    - Very low latency(lower then one second), video opened immediately.
    
    ### Features
    
    - RTSP[S]
      - RTSP[S] server,support rtsp push.
      - RTSP[S] player and pusher.
      - RTP Transport : `rtp over udp` `rtp over tcp` `rtp over http` `rtp udp multicast` .
      - Basic/Digest/Url Authentication.
      - H265/H264/AAC/G711/OPUS codec.
      - Recorded as mp4.
      - Vod of mp4.
      
    - RTMP[S]
      - RTMP[S] server,support player and pusher.
      - RTMP[S] player and pusher.
      - Support HTTP-FLV/WebSocket-FLV sever.
      - H265/H264/AAC/G711/OPUS codec.
      - Recorded as flv or mp4.
      - Vod of mp4.
      - support [RTMP-H265](https://github.com/ksvc/FFmpeg/wiki)
      
    - HLS
      - RTSP RTMP can be converted into HLS,built-in HTTP server.
      - Play authentication based on cookie.
      - Support HLS player, support streaming HLS proxy to RTSP / RTMP / MP4.
      
    - TS
      - Support HTTP-TS/WebSocket-TS sever.
      
    - fMP4
      - Support HTTP-fMP4/WebSocket-fMP4 sever.
    
    - HTTP[S]
      - HTTP server,suppor directory meun、RESTful http api.
      - HTTP client,downloader,uploader,and http api requester.
      - Cookie supported.
      - WebSocket Server and Client.
      - File access authentication.
      
    - WebRTC(experiential, dev branch)
      - Support webrtc push stream and transfer to other protocols
      - Support webrtc play, support other protocol to webrtc
    
    - Others
      - Support stream proxy by ffmpeg.
      - RESTful http api and http hook event api.
      - Config file hot loading.
      - Vhost supported.
      - Auto close stream when nobody played.  
      - Play and push authentication.
      - Pull stream on Demand.
      - Support TS / PS streaming push through RTP,and it can be converted to RTSP / RTMP / HLS / FLV.
      - Support real-time online screenshot http api.
      
      


# XPath et al

- https://github.com/nilp0inter/pez :: Command-line XPath evaluation tool

- https://github.com/arisi/c-json-path :: Basic Pure C implementation of XPath like query library for JSON-data. No allocs, No c++. Suitable to microcontrollers and sensors.

- https://github.com/kibook/libxpath2 :: XPath 2.0 implementation for libxml2

- https://github.com/cdoyen/xmlclean :: fastest XML Parser library in ANSI C with SAX and XPATH support

- https://github.com/hughsie/libxmlb :: A library to help create and query binary XML blobs

  XML is slow to parse and strings inside the document cannot be memory mapped as they do not have a trailing NUL char. The libxmlb library takes XML source, and converts it to a structured binary representation with a deduplicated string table -- where the strings have the NULs included.
    
  This allows an application to mmap the binary XML file, do an XPath query and return some strings without actually parsing the entire document. This is all done using (almost) zero allocations and no actual copying of the binary data.
    
  As each node in the binary XML file encodes the 'next' node at the same level it makes skipping whole subtrees trivial. A 10Mb binary XML file can be loaded from disk and queried in less than a few milliseconds.
    
  The binary XML is not supposed to be small. It's usually about half the size of the text XML data where a lot of the tag content is duplicated, but can actually be larger than the original XML file. This isn't important; the fast query speed and the ability to mmap strings without copies more than makes up for the larger on-disk size. If you want to compress your XML, this library probably isn't for you -- just use gzip -- it gives you an almost a perfect compression ratio for data like this.
  



# Algorithms, ...

- https://github.com/xprilion/binary_swarm_optimization :: Library of binary swarm intelligence mainly used for obtaining optimal solution of feature selection

  ### The implemented algorithm
  
    - Binary Genetic Algorithm
    - Binary Particle Swarm optimization
    - Binary Cuckoo Search
    - Binary Firefly algorithm
    - Binary Bat Algorithm
    - Binary Gravitational Search algorithm
    - Binary Dragon Fly Algorithm

- https://github.com/CYBORG-NIT-ROURKELA/Improving_Semantic_segmentation :: optimising the segmentation process in Deep Convolutional Neural Networks by solving the anomaly due to fine edges

- https://github.com/sayakpaul/MIRNet-TFLite-TRT :: TensorFlow Lite models for MIRNet for low-light image enhancement.

  This repository shows the TensorFlow Lite and TensorRT model conversion and inference processes for the MIRNet model as proposed by Learning Enriched Features for Real Image Restoration and Enhancement. This model is capable of enhancing low-light images upto a great extent.
  
- https://github.com/Damowerko/OPF :: Optimal Power Flow
	
	Optimal power flow (OPF) is one of the most important optimization problems for the energy industry. In its simplest form, it is the problem of finding the optimal power outputs for several generators on the grid with respect to some objective function - usually a second order polynomial, $\bbc(\bbp^G, \bbp^R)$, where $\bbp^G, \bbp^R$ is the generated active and reactive power.
	
	This problem is at the heart of daily electricity grid operation. However, it is a very difficult problem to solve. Since electrical systems are predominantly AC, this introduces several non-linearities in the form of trigonometric functions in the voltage angle constraint equations (\ref{eq:opf_angle}). Moreover, the problem is non-convex due to non-linearities in the power flow equations (\ref{eq:opf_active}, \ref{eq:opf_reactive}) \cite{nonconvex, molzahn} and has been proven to be NP hard \cite{bienstock}. This makes it one of the most difficult optimization problems \cite{acopf}. Therefore, in practice linear DC approximations are used to solve the problem, but which exhibit significant inaccuracy \cite{molzahn}. There is a lot of active research. Recently a lot of works attempt convex approximations using techniques like semi-definite programming \cite{molzahn}. In this paper we are concerned with applying recently developed \red{[x]} graph neural networks to approximate the AC OPF problem, which can be formulated as follows.
  
- https://github.com/srimanthtenneti/Cardiac-Abnormality-Detection :: Using simple Machine Learning, Statistical Modelling we plan to make diagnosis smoother and faster for both patients and medical personnel.

    2. Inspiration behind the product
    
    In early 2020 when the first wave of COVID-19 hit the place where I live (Hyderabad) medical students and nurses were put on the front line. In government hospitals there is a lack of medical personnel, so, to attend to the extreme large volume of incoming patients medical students were being used to monitor and administer medicines to the patients. These people were not given proper protective measures and were getting exposed to an unknown virus at that time. Many of my friends studying medicine were there in the front line and listening to their story inspired me to come up with a method to diagnose and monitor the patients remotely and from the past one year I have been working on similar lines to help them.
    
    3. Solution
    
    Our solution finds its application on two major fronts. One is the hospital front where we designed a low power, low cost, sterializable IOT based wearable device that would collect elementary body parameters like temperature, heart rate, SPO2 (an indicator of COVID-19) & ECG data. This data is then pushed to a cloud platform where this data would be stored for future use. When the doctor wants to know the condition of a patient then he simply has to enter the patient ID and the entire patient data would be available for him to monitor. Also, we have designed a serum cholesterol predictor that uses Machine Learning to determine the cholesterol levels instead of traditional painful invasive methods that rely on collecting blood samples.

- https://github.com/manikyabard/DashAI :: DashAI provides a simple graphical user interface (GUI) that guides users through a step-by-step process through creating, training, and saving a model.

- https://github.com/ayushanand18/nephron-ai :: Nephron AI is a project by Ayush Anand. This is a Machine Learning powered toll for diagnosis and analysis of causes for Chronic Kidney Disease with 99.9% accuracy.

- https://github.com/margaretmz/Cartoonizer-with-TFLite :: How to create a Cartoonizer with TensorFlow Lite models.

  This is the GitHub repository for an end-to-end tutorial on How to Create a Cartoonizer with TensorFlow Lite, published on the official TensorFlow blog. The tutorial demonstrates the steps for TFLite model saving, conversion and all the way up to model deployment on an Android App. It's one of a series of the End-to-End TensorFlow Lite Tutorials. See the full list of TensorFlow Lite samples and learning resources on awesome-tflite.
  
- https://github.com/margaretmz/selfie2anime-with-tflite :: How to create Selfie2Anime from tflite model to Android.

- https://github.com/sayakpaul/Supervised-Contrastive-Learning-in-TensorFlow-2 :: Implements the ideas presented in Supervised Contrastive Learning by Khosla et al. The authors propose a two-stage framework to enhance the performance of image classifiers and also achieves SoTA results.

  A detailed discussion of the paper and the results of our experiments are available here in this report.

  This repository consists of the notebooks (runnable on Colab) showing the experiments we have done.
  
- https://github.com/vishruthb/naivebayes/tree/master/scripts :: Scripts for "Efficient Hyperparameter Optimization by Using Bayesian Optimization for Drug-Target Interaction Prediction"

  A Bayesian optimization technique enables a short search time for a complex prediction model that includes many hyperparameters while maintaining the accuracy of the prediction model. Here, we apply a Bayesian optimization technique to the drug-target interaction (DTI) prediction problem as a method for computational drug discovery. We target neighborhood regularized logistic matrix factorization (NRLMF) (Liu et al., 2016), which is a state-of-the-art DTI prediction method, and accelerated parameter searches with the Gaussian process mutual information (GP-MI). Experimental results with four general benchmark datasets show that our GP-MI-based method obtained an 8.94-fold decrease in the computational time on average and almost the same predicted area under the curve (AUC) for all datasets compared to those of a grid parameter search, which was generally used in DTI predictions. Moreover, if a slight accuracy reduction (approximately 0.002 for AUC) is allowed, an increase in the calculation speed of 18 times or more can be obtained. Our results show for the first time that Bayesian optimization works effectively for the DTI prediction problem. By accelerating the time-consuming parameter search, the most advanced model can be used even if the number of drug candidates and target proteins to be predicted increase.
  
    - https://github.com/vishruthb/naivebayes :: Naive Bayes Classifier w/ Sci-Kit : Naive Bayes Model and Data Classification using Sci-Kit Learn : machine learning data optimization and model
    
- https://github.com/AndreaCossu/ContinualLearning-SequentialProcessing :: Continual Learning with Gated Incremental Memories for Sequential Data Processing. IJCNN 2020. Continual Learning with Recurrent Neural Networks (RNNs) inspired by Progressive network architecture.

- https://bitbucket.org/corbera/vi-mdp/src/oneAPI/ :: VI-MDP : Implementations and optimizations of Value iteration algorithm (VI). We use as a benckmark a robot navigation problem modelled as a discrete MDP. We have generate 12 discrete MDP (numbered from 0 to 11) from simulated navigation in a room like environment and use them as benchmarks to test different VI implementations for CRUMB mobile robot.

- https://github.com/sayakpaul/EvoNorms-in-TensorFlow-2 :: Implements EvoNorms B0 and S0 as proposed in Evolving Normalization-Activation Layers. : Presents implementations of EvoNormB0 and EvoNormS0 layers as proposed in Evolving Normalization-Activation Layers by Liu et al. The authors showed the results with these layers tested on MobileNetV2, ResNets, MnasNet, and EfficientNets. However, I tried a Mini Inception architecture as shown in this blog post with the CIFAR10 dataset.

- https://github.com/sayakpaul/Adversarial-Examples-in-Deep-Learning :: Adversarial Examples in Deep Learning

  Deep Learning has brought us tremendous achievements in the field of Computer Vision. In spite of the impeccable success, modern Deep Learning systems are still prone to adversaries. Let's talk in terms of Computer Vision. Consider an image of a polar bear and an instance of it (X1). A Deep Learning-based image classifier is able to successfully X1 as a polar bear. Now consider another instance of a polar bear X2 which is a slightly perturbed version of X1. To the human eyes, it would still be a polar bear but for that same image classifier, it would be an ant. These perturbations are referred to as image adversaries.
  
- https://machinelearningmastery.com/what-are-generative-adversarial-networks-gans/ :: A Gentle Introduction to Generative Adversarial Networks (GANs)  

- https://github.com/mirerfangheibi/Deep-Learning-Resources :: Free and High-Quality Materials to Study Deep Learning

- https://github.com/HarshCasper/Vyaadhi :: This repository consists of the various Jupyter Notebooks that were written to perform analysis on the different Open-Source Datasets available on Health Parameters and different disease, namely: Breast Cancer, Diabetes Analysis, Heart Disease, Kidney Disease and Liver Disease.

- https://github.com/openai/gpt-2 :: Code and models from the paper "Language Models are Unsupervised Multitask Learners".

    You can read about GPT-2 and its staged release in our original blog post, 6 month follow-up post, and final post.
    
    We have also released a dataset for researchers to study their behaviors.
    
    * Note that our original parameter counts were wrong due to an error (in our previous blog posts and paper). Thus you may have seen small referred to as 117M and medium referred to as 345M.
    
    This repository is meant to be a starting point for researchers and engineers to experiment with GPT-2.

- https://github.com/OpenImageDenoise/oidn :: Intel® Open Image Denoise

    This is release v1.3.0 of Intel Open Image Denoise. For changes and new features see the changelog. Visit https://www.openimagedenoise.org for more information.
    
    Intel Open Image Denoise is an open source library of high-performance, high-quality denoising filters for images rendered with ray tracing. Intel Open Image Denoise is part of the Intel® oneAPI Rendering Toolkit and is released under the permissive Apache 2.0 license.
    
    The purpose of Intel Open Image Denoise is to provide an open, high-quality, efficient, and easy-to-use denoising library that allows one to significantly reduce rendering times in ray tracing based rendering applications. It filters out the Monte Carlo noise inherent to stochastic ray tracing methods like path tracing, reducing the amount of necessary samples per pixel by even multiple orders of magnitude (depending on the desired closeness to the ground truth). A simple but flexible C/C++ API ensures that the library can be easily integrated into most existing or new rendering solutions.
    
    At the heart of the Intel Open Image Denoise library is a collection of efficient deep learning based denoising filters, which were trained to handle a wide range of samples per pixel (spp), from 1 spp to almost fully converged. Thus it is suitable for both preview and final-frame rendering. The filters can denoise images either using only the noisy color (beauty) buffer, or, to preserve as much detail as possible, can optionally utilize auxiliary feature buffers as well (e.g. albedo, normal). Such buffers are supported by most renderers as arbitrary output variables (AOVs) or can be usually implemented with little effort.
    
    Although the library ships with a set of pre-trained filter models, it is not mandatory to use these. To optimize a filter for a specific renderer, sample count, content type, scene, etc., it is possible to train the model using the included training toolkit and user-provided image datasets.
    
    Intel Open Image Denoise supports Intel® 64 architecture compatible CPUs and Apple Silicon, and runs on anything from laptops, to workstations, to compute nodes in HPC systems. It is efficient enough to be suitable not only for offline rendering, but, depending on the hardware used, also for interactive ray tracing.
    
    Intel Open Image Denoise internally builds on top of Intel oneAPI Deep Neural Network Library (oneDNN), and automatically exploits modern instruction sets like Intel SSE4, AVX2, and AVX-512 to achieve high denoising performance. A CPU with support for at least SSE4.1 or Apple Silicon is required to run Intel Open Image Denoise.
    
- https://github.com/oneapi-src/oneDNN :: oneAPI Deep Neural Network Library (oneDNN)
    
    This software was previously known as Intel(R) Math Kernel Library for Deep Neural Networks (Intel(R) MKL-DNN) and Deep Neural Network Library (DNNL).
    
    oneAPI Deep Neural Network Library (oneDNN) is an open-source cross-platform performance library of basic building blocks for deep learning applications. The library is optimized for Intel Architecture Processors, Intel Processor Graphics and Xe architecture-based Graphics.     
- https://github.com/vasusharma7/Text_Extractor :: End to End application which extracts text from Image using Pytesseract.

  This is an end to end application which accepts image as an input from the user (either from storage or from camera ) and extracts 'English Text' from the image in. It uses pytesseract at the backend.
  
- https://github.com/aifyjs/aifyjs.github.io :: In the simplest terms, aify.js is a library which when embedded on your web page, can quickly add the power of AI to your website in the form of several features, without you having to invest in any backend or machine learning costs.

- https://github.com/prakhar21/TextAugmentation-GPT2 :: Fine-tuned pre-trained GPT2 for topic specific text generation. Such system can be used for Text Augmentation.

- https://github.com/Morizeyao/GPT2-Chinese :: Chinese version of GPT2 training code, using BERT tokenizer. It is based on the extremely awesome repository from HuggingFace team Transformers. Can write poems, news, novels, or train general language models. Support char level, word level and BPE level. Support large training corpus.

- https://github.com/rish-16/gpt2client :: Easy-to-use Wrapper for GPT-2 124M, 355M, 774M, and 1.5B Transformer Models

    GPT-2 is a Natural Language Processing model developed by OpenAI for text generation. It is the successor to the GPT (Generative Pre-trained Transformer) model trained on 40GB of text from the internet. It features a Transformer model that was brought to light by the Attention Is All You Need paper in 2017. The model has 4 versions - 124M, 355M, 774M, and 1558M - that differ in terms of the amount of training data fed to it and the number of parameters they contain.

    The 1.5B model is currently the largest available model released by OpenAI.

    Finally, gpt2-client is a wrapper around the original gpt-2 repository that features the same functionality but with more accessiblity, comprehensibility, and utilty. You can play around with all four GPT-2 models in less than five lines of code.

- https://github.com/Prayushi9/AMC-SSDA :: Adaptive Multi Column Stacked Sparsed Denoising Autoencoder

    Denoising the images is a very important task when working with Computer Vision and Image Processing. In some applications, the noisy images are taken as input where there is chance to lose some important features of that image. There are various types of noise present at a same time in the training images and removing them all is a difficult task. Here, we introduce a technique called Adaptive Multi-Column Stacked Sparse Denoising Autoencoder (AMC-SSDA) which is use dto remove all the noise at the same time from the noisy images.
    
    There are mainly 3 parts in this technique:
    
    - Autoencoder
    
    - Qudratic program (QP)
    
    - Radial Basis Function (RBF)
    
    The autoencoder used here is a sparsed denoising autoencoder which helps to denoise a single type of noise. So we have to use the same number of SDAs as the number of type of noise present in the noisy image. -Every autoencoder trained on different type of noise remove from images. -During testing when an image is given as input to the AMC-SSDA, it will go to all these SSDAs and generate an output as per their training individually.
    
    QP is used for getting an optimal solution to generate a single image from all those images which we have got from each SSDA. -This part gives the optimum weights to each output generated from autoencoder according to target image during training.
    
    During testing we do not have target images so that we cannot use QP here. Therefore, we have to use trained RBF which takes latent vector as input and optimal weight vector (which we got from above QP part) as output.
    
- https://github.com/mwt/econ-ipsum :: A Laurem Ipsum generator that uses words from Economics journals. : https://ipsum.mwt.me/

- https://github.com/koriavinash1/BioExp :: Explaining Deep Learning Models which perform various image processing tasks in the medical images and natural images.

- https://github.com/koriavinash1/nfm :: neural field models

- https://github.com/princesegzy01/lstm-google-stock-price-prediction :: Google stock prices using LSTM

    This codebase predict stock prices using Long-Short term mermory (LSTM) and also plot the result in a chart.

- https://github.com/princesegzy01/incremental-machine-learning-techniques- :: Feature Engineering Techniques in Online / Incremental Learning

    Online learnning is a medthod of machine learning where data becomes available in sequential order and is used to update our best predictor for future data at each step as opposed to batch learning techniques which generates best predictor by learning on the entore training datasets at once.
    
    Advantages
    
    - Online learning is used when it is computational infeasible to train the entire datasets, requiring the need of algorithim that can process data that are too large to fit in the computer memory at a time.
    
    - It is used when it is neccessary for the algorithm to dynamically adapt to new patterns in the data, or when when the data itself is generated as a function in time, e.g stock price prediction    

- https://github.com/princesegzy01/bitLsh-TrendingTopic :: Bit locality sensitive hashing is an unspervised machine learning algorithm that takes in some data and categorized them and then inturns detect trending topic.

    The goal of using lsh is to group similar tweets to the same buckets, Candidate pairs are those that hash at least once to the same bucket.

- https://github.com/shivam13juna/Sequence_Prediction_LSTM_CHAR :: This is the model for predicting sequence prediction on character basis, with 3 uni-directional LSTM ( + FAQ )

- https://ruder.io/word-embeddings-softmax/index.html :: On word embeddings - Part 2: Approximating the Softmax

- https://ruder.io/tag/word-embeddings/index.html :: word embeddings : Posts about different aspects of word embeddings.

- https://ruder.io/word-embeddings-1/index.html :: On word embeddings - Part 1

    Word embeddings popularized by word2vec are pervasive in current NLP applications. The history of word embeddings, however, goes back a lot further. This post explores the history of word embeddings in the context of language modelling.
    
- https://ruder.io/secret-word2vec/index.html :: On word embeddings - Part 3: The secret ingredients of word2vec

- https://github.com/koriavinash1/DeepBrainSeg :: Fully automatic brain tumour segmentation using Deep 3-D convolutional neural networks

- https://github.com/digantamisra98/Mish :: Official Repsoitory for "Mish: A Self Regularized Non-Monotonic Neural Activation Function" [BMVC 2020]

- https://github.com/sayakpaul/Generating-categories-from-arXiv-paper-titles/ :: This project takes the arXiv dataset and builds an automatic tag classifier from the arXiv article/paper titles

- https://github.com/animeshdutta888/System-Failure-Prediction-using-log-analysis :: You're given logs of various machines. You need to provide warning so as to when failure may occur.

- https://github.com/adizz2407/Fuzzy-SVM :: Fuzzy-SVM

    Based on research paper “FSVM-CIL: Fuzzy Support Vector Machines for Class Imbalance Learning” by Rukshan Batuwita and Vasile Palade which discuss Fuzzy concept

    It is used for optimazation of algorithm for imbalanced datasets which do not have 1:1 no. of instances of each class.
    
- https://www.netlib.org/cephes/ :: Cephes Mathematical Library (+ source code archives) for 32, 64, 128bit and *extended* floating point math functions

- https://github.com/PetterS/monolith :: A C++ monorepo for discrete and continuous optimization. Batteries included!

    Monolith is a monorepo with several optimization projects. Some of the code was originally written for research or as hobby projects in other repositories (e.g. spii and easy-IP).
    
    One of the highlights is a state-of-the-art scheduler using column generation, which significantly outperforms all other optimizers at schedulingbenchmarks.org. Try it in the browser (wasm) here!
    
    Why a monorepo?
    
    - C++ does not have an ABI. Every compiler, or worse, every flag configuration of every compiler generates potentially incompatible code. I want to use many compilers (MCVC, GCC, Clang) and many settings (debug, release, asan, fuzzers etc.). I also use Emscripten to compile programs to WASM (example here).
    
    - Refactoring code becomes much easier if all code with all dependencies is available in one IDE at the same time.
    
- https://github.com/apache/tvm :: Apache TVM : Open Deep Learning Compiler Stack

    Apache TVM is a compiler stack for deep learning systems. It is designed to close the gap between the productivity-focused deep learning frameworks, and the performance- and efficiency-focused hardware backends. TVM works with deep learning frameworks to provide end to end compilation to different backends.    
    
- https://github.com/PatWie/CppNumericalSolvers :: a lightweight C++17 library of numerical optimization methods for nonlinear functions (Including L-BFGS-B for TensorFlow)

- https://github.com/OpenQuadruped/spot_mini_mini :: Dynamics and Domain Randomized Gait Modulation with Bezier Curves for Sim-to-Real Legged Locomotion.

    Spot Mini Mini OpenAI Gym Environment

    As part of the Spot Micro community, I saw the need for a reliable and versatile simulator for those who wanted to try things out without risking damage to their robots. To that end, I developed my own in Pybullet which can also be used as a Gym environment for Reinforcement Learning tasks.

    You'll notice that there are gifs of the original SpotMicro as well a new version designed for added real world fidelity. The default branch simulates the new version, but you can work with SpotMicro in the spotmicroai branch of this repo. The new version also has a more reliable URDF, with more accurate inertial calculations.

    If you don't need a Gym environment, that's okay too! env_tester.py works without RL or Gym, it is designed to accept any gait implementation, and provides a GUI for testing it out! In my case, I've implemented a 12-point Bezier gait.
    
- https://github.com/kthohr/optim :: OptimLib: a lightweight C++ library of numerical optimization methods for nonlinear functions

    Features:
    
    - A C++11 library of local and global optimization algorithms, as well as root finding techniques.
    - Derivative-free optimization using advanced, parallelized metaheuristic methods.
    - Constrained optimization routines to handle simple box constraints, as well as systems of nonlinear constraints.
    - For fast and efficient matrix-based computation, OptimLib supports the following templated linear algebra libraries:
    - Armadillo
    - Eigen
    - OpenMP-accelerated algorithms for parallel computation.
    - Straightforward linking with parallelized BLAS libraries, such as OpenBLAS.
    - Available as a header-only library, or as a compiled shared library.
    - Released under a permissive, non-GPL license.
    
- https://github.com/btwael/SuperString :: A fast and memory-optimized string library for C++
    
    SuperString is an efficient string library for C++, that achieves a remarkable memory and CPU optimization.
    
    SuperString uses Rope (data structure) and optimization techniques.
    
- https://github.com/yixuan/LBFGSpp :: LBFGS++ : A header-only C++ library for L-BFGS and L-BFGS-B algorithms

    UPDATE on 2020-03-06: LBFGS++ now includes a new L-BFGS-B solver for box-constrained optimization problems. Check the example below for its usage.
    
    LBFGS++ is a header-only C++ library that implements the Limited-memory BFGS algorithm (L-BFGS) for unconstrained minimization problems, and a modified version of the L-BFGS-B algorithm for box-constrained ones.
    
    The code for the L-BFGS solver is derived and modified from the libLBFGS library developed by Naoaki Okazaki.
    
    LBFGS++ is implemented as a header-only C++ library, whose only dependency, Eigen, is also header-only.
    
- https://github.com/chokkan/liblbfgs :: libLBFGS: a library of Limited-memory Broyden-Fletcher-Goldfarb-Shanno (L-BFGS) 

    libLBFGS is a C port of the implementation of Limited-memory
    Broyden-Fletcher-Goldfarb-Shanno (L-BFGS) method written by Jorge Nocedal.
    The original FORTRAN source code is available at:
    http://www.ece.northwestern.edu/~nocedal/lbfgs.html
    
    The L-BFGS method solves the unconstrainted minimization problem:
    
        minimize F(x), x = (x1, x2, ..., xN),
    
    only if the objective function F(x) and its gradient G(x) are computable.
    
    Refer to the libLBFGS web site for more information.
    http://www.chokkan.org/software/liblbfgs/
    
- https://github.com/ZJU-FAST-Lab/LBFGS-Lite :: A header-only LBFGS unconstrained optimizer.

    LBFGS-Lite is a C/C++ header-only library for unconstrained optimization on twice continuously differentiable functions. This code is a modified version of liblbfgs, so that only necessary part is preserved for simplicity.
    
    The library is an implementation of Limited-Memory Broyden-Fletcher-Goldfarb-Shanno (LBFGS) with More-Thuente Line Search to ensure linear time/space complexity and strong Wolfe conditions in each iteration.

- https://github.com/yuki-koyama/mathtoolbox :: Mathematical tools (interpolation, dimensionality reduction, optimization, etc.) written in C++11 with Eigen

  Mathematical tools (interpolation, dimensionality reduction, optimization, etc.) written in C++11 and Eigen.
  
- https://github.com/openturns/openturns :: Uncertainty treatment library

    OpenTURNS (Open source initiative to Treat Uncertainties, Risks'N Statistics)
    
    OpenTURNS is a scientific C++ and Python library featuring an internal data model and algorithms dedicated to the treatment of uncertainties. The main goal of this library is to provide all functionalities needed to treat uncertainties in studies with industrial applications. Targeted users are all engineers who want to introduce the probabilistic dimension in their so far deterministic studies.
    
    Up-to-date information can be found at http://www.openturns.org
    
- https://github.com/openturns/ev3/ :: Ev3 is a C++ library for symbolic computation written by Leo Liberti.

    It is an alternative to libmatheval.
    
    It was originally published by Leo Liberti under the CPL license.
    
    The Computational Infrastructure for Operations Research project (COIN-OR) uses a modified version in ROSE (https://github.com/coin-or/ROSE/ :: Reformulation-Optimization Software Engine).    
    
- https://github.com/siconos/siconos :: A software package for the modeling and simulation of nonsmooth dynamical systems in C++ and in Python.

    Siconos is an open-source scientific software primarily targeted at modeling and simulating nonsmooth dynamical systems:
    
    - Mechanical systems (rigid or solid) with unilateral contact and Coulomb friction and impact (Nonsmooth mechanics, contact dynamics, multibody systems dynamics or granular materials).
    - Switched Electrical Circuit such as electrical circuits with ideal and piecewise linear components: power converter, rectifier, Phase-Locked Loop (PLL) or Analog-to-Digital converter.
    - Sliding mode control systems.
    - Biology Gene regulatory networks.
    - Other applications are found in Systems and Control (hybrid systems, differential inclusions, optimal control with state constraints), Optimization (Complementarity systems and Variational inequalities), Fluid Mechanics, Computer Graphics, ...
    
- https://github.com/usgs/pestpp :: PEST++ : Tools for non-intrusive and scalable parameter estimation and uncertainty quantification

    PEST++ is a software suite aimed at supporting complex numerical models in the decision-support context. Much focus has been devoted to supporting environmental models (groundwater, surface water, etc) but these tools are readily applicable to any computer model.    
    
- https://github.com/avaneev/biteopt :: Derivative-Free Optimization Method 

    BITEOPT is a free open-source stochastic non-linear bound-constrained derivative-free optimization method (algorithm, heuristic, or strategy). The name "BiteOpt" is an acronym for "BITmask Evolution OPTimization".
    
    The benefit of this method is a relatively high robustness: it can successfully optimize a wide range of multi-dimensional test functions. Another benefit is a low convergence time which depends on the complexity of the objective function. Hard (multi-modal) problems may require many optimization attempts to reach optimum.
    
    Instead of iterating through different "starting guesses" to find optimum like in deterministic methods, this method requires optimization attempts (runs) with different random seeds. The stochastic nature of the method allows it to automatically "fall" into different competing minima with each run. If there are no competing minima in a function (or the true/global minimum is rogue and cannot be detected), this method in absolute majority of runs will return the same optimum.
    
    BiteOpt uses self-optimization techniques making it objective function-agnostic. In its inner workings, BiteOpt uses objective function value's ranking, not the actual value. BiteOpt is a multi-faceted example of a "probabilistic computing" system.
    
- https://github.com/SGpp/SGpp :: SG⁺⁺ is a library and framework for sparse grids in different flavors. SG⁺⁺ supports both hierarchical spatially-adaptive sparse grids and the dimensionally-adaptive sparse grid combination technique.

- https://www.j-ij.com/ :: quantum annealing, etc.

- https://github.com/nojhan/paradiseo :: Paradiseo: a Heuristic Optimization Framework

    Paradiseo is an open-source full-featured evolutionary computation framework which main purpose is to help you write your own stochastic optimization algorithms, insanely fast.
    
- https://github.com/tonykero/Moe :: Moe is a C++14 header-only dependency-free library providing generic implementations of some metaheuristic algorithms

- https://github.com/RoboJackets/hungarian :: C++ Implementation of the hungarian algorithm 

  C++ adaptation of Cyril Stachniss's libhungarian: http://www2.informatik.uni-freiburg.de/~stachnis/misc.html.
  
- http://www2.informatik.uni-freiburg.de/~stachnis/misc.html :: Cyrill Stachniss

- https://github.com/Willtl/heurisko :: Heurisko - C++ open-source parallel framework for continuous and combinatorial optimization with metaheuristics

    ### List of implemented population-based metaheuristics:
    
    - Differential Evolution
       - Mutation scheme variants:
          - DE/rand/1
          - DE/best/1
    - Genetic Algorithm
       - Crossover operators
          - Uniform Crossover
          - Simulated Binary Crossover
          - Multiple Point Crossover 
       - Mutation operators
          - Random mutation
          - Swap Mutation
          - Polynomial Mutation
          - Uniform Mutation 
    - Particle Swarm Optimization
    - Grey Wolf Optimizer
    - Whale Optimization Algorithm
    
    #### The following strategies are associated with each population-based metaheuristics:
    
    - Opposition-based learning
    
    ### List of implemented single-solution metaheuristics:
    
    The methods below require that the `void localSearch()` function had been overridden in the solution class.
    - Iterated local search
       - Random perturbation
       - Swap perturbation
       - 2-opt perturbation
    
    ### Problems addressed with the framework in the examples folder:
    
    - Non-convex continuous optimization examples
       - Rastrigin (indirect representation)
       - Ackley    (direct   representation)
    - Combinatorial optimization
       - Traveling  salesman problem
          - 2-opt-based local search
          - swap-based local search
       - Vehicle routing problem
          - two decoding strategies 

- https://github.com/asherikov/qpmad :: ROS-compatible Eigen-based Goldfarb-Idnani quadratic programming solver

    Eigen-based, header-only C++ implementation of Goldfarb-Idnani dual active set algorithm for quadratic programming. The package is ROS compatible.
    
    The solver is optimized for performance, for this reason some of the computations are omitted as described below. See https://github.com/asherikov/qpmad_benchmark for comparison with qpOASES and eiQuadProg.

- https://github.com/gvegayon/ABCoptim :: An implementation of the Artificial Bee Colony (ABC) Algorithm

  This is an implementation of Karaboga (2005) ABC optimization algorithm. It was developed upon the basic version programmed in C and distributed at the algorithm's official website (see the references).
  
- https://github.com/yuki-koyama/sequential-line-search :: A human-in-the-loop Bayesian optimization [SIGGRAPH 2017]

- https://github.com/mavam/libbf :: a C++11 library which implements various Bloom filters, including:

  + Basic
  + Counting
  + Spectral MI
  + Spectral RM
  + Bitwise
  + A^2
  + Stable

- https://github.com/ArashPartow/bloom :: C++ Bloom Filter Library, has the following capabilities:
  
  + Optimal parameter selection based on expected false positive rate.
  + Union, intersection and difference operations between bloom filters.
  + Compression of in-use table (increase of false positive probability vs space)
  + Portable and efficient source code implementation.
  + Single header implementation, no building required. No external dependencies

- https://github.com/bitly/dablooms :: A Scalable, Counting, Bloom Filter

  This project aims to demonstrate a novel Bloom filter implementation that can scale, and provide not only the addition of new members, but reliable removal of existing members.

  Bloom filters are a probabilistic data structure that provide space-efficient storage of elements at the cost of possible false positive on membership queries.

  dablooms implements such a structure that takes additional metadata to classify elements in order to make an intelligent decision as to which Bloom filter an element should belong.

- https://github.com/bcgsc/biobloom :: BioBloom Tools (BBT) provides the means to create filters for a given reference and then to categorize sequences. This methodology is faster than alignment but does not provide mapping locations. BBT was initially intended to be used for pre-processing and QC applications like contamination detection, but is flexible to accommodate other purposes. This tool is intended to be a pipeline component to replace costly alignment steps.

  Relevant paper:

  BioBloom tools: fast, accurate and memory-efficient host species sequence screening using bloom filters.  
  Justin Chu, Sara Sadeghi, Anthony Raymond, Shaun D. Jackman, Ka Ming Nip, Richard Mar, Hamid Mohamadi, Yaron S. Butterfield, A. Gordon Robertson, Inanç Birol  
  Bioinformatics 2014; 30 (23): 3402-3404.  
  doi: 10.1093/bioinformatics/btu558  
  PMID: 25143290  

- https://github.com/efficient/cuckoofilter :: Cuckoo Filter

  Cuckoo filter is a Bloom filter replacement for approximated set-membership queries. While Bloom filters are well-known space-efficient data structures to serve queries like "if item x is in a set?", they do not support deletion. Their variances to enable deletion (like counting Bloom filters) usually require much more space.

  Cuckoo ﬁlters provide the ﬂexibility to add and remove items dynamically. A cuckoo filter is based on cuckoo hashing (and therefore named as cuckoo filter). It is essentially a cuckoo hash table storing each key's fingerprint. Cuckoo hash tables can be highly compact, thus a cuckoo filter could use less space than conventional Bloom ﬁlters, for applications that require low false positive rates (< 3%).

  For details about the algorithm and citations please use:

  "Cuckoo Filter: Practically Better Than Bloom" in proceedings of ACM CoNEXT 2014 by Bin Fan, Dave Andersen and Michael Kaminsky

- https://github.com/simongog/sdsl-lite :: SDSL - Succinct Data Structure Library

  The Succinct Data Structure Library (SDSL) is a powerful and flexible C++11 library implementing succinct data structures. In total, the library contains the highlights of 40 research publications. Succinct data structures can represent an object (such as a bitvector or a tree) in space close to the information-theoretic lower bound of the object while supporting operations of the original object efficiently. The theoretical time complexity of an operation performed on the classical data structure and the equivalent succinct data structure are (most of the time) identical.

  Why SDSL?

  Succinct data structures have very attractive theoretical properties. However, in practice implementing succinct data structures is non-trivial as they are often composed of complex operations on bitvectors. The SDSL Library provides high quality, open source implementations of many succinct data structures proposed in literature.

  Specifically, the aim of the library is to provide basic and complex succinct data structure which are

  - Easy and intuitive to use (like the STL, which provides classical data structures),
  - Faithful to the original theoretical results,
  - Capable of handling large inputs (yes, we support 64-bit),
  - Provide efficient construction of all implemented succinct data structures, while at the same time enable good run-time performance.

  Uses:

  + https://github.com/y-256/libdivsufsort/ :: a software library that implements a lightweight suffix array construction algorithm.
  
    This library provides a simple and an efficient C API to construct a suffix array and a Burrows-Wheeler transformed string from a given string over a constant-size alphabet. The algorithm runs in O(n log n) worst-case time using only 5n+O(1) bytes of memory space, where n is the length of the string.

- https://github.com/fredrik-johansson/arb :: Arb

  Arb is a C library for arbitrary-precision interval arithmetic. It has full support for both real and complex numbers. The library is thread-safe, portable, and extensively tested.

  Arb produces a rigorous enclosure of the exact value of the expression, hence the user can rely on Arb's automatic error bound tracking to get an output that is guaranteed to be accurate -- no error analysis needs to be done by the user.

  Features

  Besides basic arithmetic, Arb allows working with univariate polynomials, truncated power series, and matrices over both real and complex numbers.
  
  Basic linear algebra is supported, including matrix multiplication, determinant, inverse, nonsingular solving, matrix exponential, and computation of eigenvalues and eigenvectors.
  
  Support for polynomials and power series is quite extensive, including methods for composition, reversion, product trees, multipoint evaluation and interpolation, complex root isolation, and transcendental functions of power series.
  
  Other features include root isolation for real functions, rigorous numerical integration of complex functions, and discrete Fourier transforms (DFTs).
  
  Special functions

  Arb can compute a wide range of transcendental and special functions, including the gamma function, polygamma functions, Riemann zeta and Hurwitz zeta function, Dirichlet L-functions, polylogarithm, error function, Gauss hypergeometric function 2F1, confluent hypergeometric functions, Bessel functions, Airy functions, Legendre functions and other orthogonal polynomials, exponential and trigonometric integrals, incomplete gamma and beta functions, Jacobi theta functions, modular functions, Weierstrass elliptic functions, complete and incomplete elliptic integrals, arithmetic-geometric mean, Bernoulli numbers, partition function, Barnes G-function, Lambert W function.
  
  Speed

  Arb uses a midpoint-radius (ball) representation of real numbers. At high precision, this allows doing interval arithmetic without significant overhead compared to plain floating-point arithmetic. Various low-level optimizations have also been implemented to reduce overhead at precisions of just a few machine words. Most operations on polynomials and power series use asymptotically fast FFT multiplication based on FLINT. Similarly, most operations on large matrices take advantage of the fast integer matrix multiplication in FLINT.

  For basic arithmetic, Arb should generally be around as fast as MPFR (http://mpfr.org), though it can be a bit slower at low precision, and around twice as fast as MPFI (https://perso.ens-lyon.fr/nathalie.revol/software.html).
  
  Transcendental functions in Arb are quite well optimized and should generally be faster than any other arbitrary-precision software currently available. 



  