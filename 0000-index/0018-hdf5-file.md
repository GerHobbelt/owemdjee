











### HDF5 file format

- **h5cpp** [📁](./h5cpp) [🌐](https://github.com/GerHobbelt/h5cpp) -- easy to use HDF5 C++ templates for Serial and Paralel HDF5. Hierarchical Data Format HDF5 is prevalent in high performance scientific computing, sits directly on top of sequential or parallel file systems, providing block and stream operations on standardized or custom binary/text objects. Scientific computing platforms come with the necessary libraries to read write HDF5 dataset. H5CPP simplifies interactions with popular linear algebra libraries, provides compiler assisted seamless object persistence, Standard Template Library support and comes equipped with a novel error handling architecture.
  
  - **in-purgatory**; reason: see the `HDF5` entry below. But advertises to be an interface between OpenCV, Eigen, etc. at the same time...

- ~~**HDF5** [🌐](https://github.com/HDFGroup/hdf5)~~
  
  - **removed**; reason: HDF5 is a nice concept but considered *overkill* right now; where we need disk stores, we'll be using SQLite or LMDB-like key-value stores instead. Such stores are not meant to be interchangeable with other software in their raw shape and we'll provide public access APIs instead, where applicable.

- ~~**HighFive-HDF5** [🌐](https://github.com/BlueBrain/HighFive)~~
  
  - **removed**; reason: see the `HDF5` entry above.






	
----

🡸 [previous section](./0017-ram-disk-based-large-queues-and-stores-b-tree-lsm-tree.md)  |  🡹 [up](./0016-intermediate-data-storage-caching-hierarchical-data.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0019-data-storage-caching-ipc-loss-less-data.md)
