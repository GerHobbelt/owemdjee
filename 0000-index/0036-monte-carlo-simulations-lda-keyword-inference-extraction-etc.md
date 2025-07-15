

### Monte Carlo simulations, LDA, keyword inference/extraction, etc.

- **ceres-solver** [📁](./ceres-solver) [🌐](https://github.com/GerHobbelt/ceres-solver) -- a library for modeling and solving large, complicated optimization problems. It is a feature rich, mature and performant library which has been used in production at Google since 2010. Ceres Solver can solve two kinds of problems: (1) Non-linear Least Squares problems with bounds constraints, and (2) General unconstrained optimization problems.
- **gibbs-lda** [📁](./gibbs-lda) [🌐](https://github.com/GerHobbelt/gibbs-lda) -- modified GibbsLDA++: A C/C++ Implementation of Latent Dirichlet Allocation by by Xuan-Hieu Phan and Cam-Tu Nguyen.
- **lda** [📁](./lda) [🌐](https://github.com/GerHobbelt/lda-c) -- variational EM for latent Dirichlet allocation (LDA), David Blei et al
- **lda-3-variants** [📁](./lda-3-variants) [🌐](https://github.com/GerHobbelt/LDA) -- three modified open source versions of LDA with collapsed Gibbs Sampling: GibbsLDA++, ompi-lda and online_twitter_lda.
- **lda-bigartm** [📁](./lda-bigartm) [🌐](https://github.com/GerHobbelt/bigartm) -- BigARTM is a powerful tool for topic modeling based on a novel technique called Additive Regularization of Topic Models. This technique effectively builds multi-objective models by adding the weighted sums of regularizers to the optimization criterion. BigARTM is known to combine well very different objectives, including sparsing, smoothing, topics decorrelation and many others. Such combination of regularizers significantly improves several quality measures at once almost without any loss of the perplexity.
- **lda-Familia** [📁](./lda-Familia) [🌐](https://github.com/GerHobbelt/Familia) -- Familia: A Configurable Topic Modeling Framework for Industrial Text Engineering (Di Jiang and Yuanfeng Song and Rongzhong Lian and Siqi Bao and Jinhua Peng and Huang He and Hua Wu) (2018)
- **LightLDA** [📁](./LightLDA) [🌐](https://github.com/GerHobbelt/LightLDA) -- a distributed system for large scale topic modeling. It implements a distributed sampler that enables very large data sizes and models. LightLDA improves sampling throughput and convergence speed via a fast O(1) metropolis-Hastings algorithm, and allows small cluster to tackle very large data and model sizes through model scheduling and data parallelism architecture. LightLDA is implemented with C++ for performance consideration.
- **mcmc** [📁](./mcmc) [🌐](https://github.com/GerHobbelt/mcmc) -- Monte Carlo
- **mmc** [📁](./mmc) [🌐](https://github.com/GerHobbelt/mmc) -- Monte Carlo
- **multiverso** [📁](./multiverso) [🌐](https://github.com/GerHobbelt/Multiverso) -- a parameter server based framework for training machine learning models on big data with numbers of machines. It is currently a standard C++ library and provides a series of friendly programming interfaces. Now machine learning researchers and practitioners do not need to worry about the system routine issues such as distributed model storage and operation, inter-process and inter-thread communication, multi-threading management, and so on. Instead, they are able to focus on the core machine learning logics: data, model, and training.
- **ncnn** [📁](./ncnn) [🌐](https://github.com/GerHobbelt/ncnn) -- high-performance neural network inference computing framework optimized for mobile platforms (i.e. small footprint)
- **OptimizationTemplateLibrary** [📁](./OptimizationTemplateLibrary) [🌐](https://github.com/GerHobbelt/O-T-L) -- Optimization Template Library (OTL)
- **pke** [📁](./pke) [🌐](https://github.com/GerHobbelt/pke) -- python keyphrase extraction (PKE) is an open source python-based **keyphrase extraction** toolkit. It provides an end-to-end keyphrase extraction pipeline in which each component can be easily modified or extended to develop new models. `pke` also allows for easy benchmarking of state-of-the-art keyphrase extraction models, and ships with supervised models trained on the [SemEval-2010 dataset](http://aclweb.org/anthology/S10-1004).
- **RAKE** [📁](./RAKE) [🌐](https://github.com/GerHobbelt/RAKE) -- the Rapid Automatic Keyword Extraction (RAKE) algorithm as described in: Rose, S., Engel, D., Cramer, N., & Cowley, W. (2010). Automatic Keyword Extraction from Individual Documents. In M. W. Berry & J. Kogan (Eds.), Text Mining: Theory and Applications: John Wiley & Sons.
- **SDLP** [📁](./SDLP) [🌐](https://github.com/GerHobbelt/SDLP) -- Seidel's LP Algorithm: Linear-Complexity Linear Programming (LP) for Small-Dimensions: this solver is super efficient for small-dimensional LP with any constraint number, mostly encountered in computational geometry. It enjoys [__linear complexity about the constraint number__](https://dl.acm.org/doi/10.1145/2422.322418).
- **stan** [📁](./stan) [🌐](https://github.com/GerHobbelt/stan) -- Stan is a C++ package providing (1) full Bayesian inference using the No-U-Turn sampler (NUTS), a variant of Hamiltonian Monte Carlo (HMC), (2) approximate Bayesian inference using automatic differentiation variational inference (ADVI), and (3) penalized maximum likelihood estimation (MLE) using L-BFGS optimization. It is built on top of the [Stan Math library](https://github.com/stan-dev/math).
- **stateline** [📁](./stateline) [🌐](https://github.com/GerHobbelt/stateline) -- a framework for distributed Markov Chain Monte Carlo (MCMC) sampling written in C++. It implements random walk Metropolis-Hastings with parallel tempering to improve chain mixing, provides an adaptive proposal distribution to speed up convergence, and allows the user to factorise their likelihoods (eg. over sensors or data).
- **waifu2x-ncnn-vulkan** [📁](./waifu2x-ncnn-vulkan) [🌐](https://github.com/GerHobbelt/waifu2x-ncnn-vulkan) -- waifu2x ncnn Vulkan: an [ncnn project](https://github.com/Tencent/ncnn) implementation of the waifu2x converter. Runs fast on Intel / AMD / Nvidia / Apple-Silicon with Vulkan API.
- **warpLDA** [📁](./warpLDA) [🌐](https://github.com/GerHobbelt/warplda) -- a cache efficient implementation for Latent Dirichlet Allocation.
- **worde_butcher** [📁](./worde_butcher) [🌐](https://github.com/GerHobbelt/worde_butcher) -- a tool for text segmentation, keyword extraction and speech tagging. Butchers any text into prime word / phrase cuts, deboning all incoming based on our definitive set of stopwords for all languages.
- **yake** [📁](./yake) [🌐](https://github.com/GerHobbelt/yake) -- Yet Another Keyword Extractor (Yake) is a light-weight unsupervised automatic keyword extraction method which rests on text statistical features extracted from single documents to select the most important keywords of a text. Our system does not need to be trained on a particular set of documents, neither it depends on dictionaries, external-corpus, size of the text, language or domain.
- other *topic modeling* code on the Net:
  
  * [David Blei's list of topic modeling OSS software](http://www.cs.columbia.edu/~blei/topicmodeling_software.html) + [github repo list](https://github.com/blei-lab)
  * [Hierarchical Dirichlet Process (with Split-Merge Operations), Chong Wang](https://github.com/renaud/hdp-faster)
  * [Hierarchical Latent Tree Analysis (HLTA)](https://github.com/kmpoon/hlta)
  * [Leonard Poon - various works](https://github.com/kmpoon?tab=repositories)
















	
----

🡸 [previous section](./0035-image-export-image-scanned-document.md)  |  🡹 [up](./0022-pattern.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0037-random-generators-all-things.md)
