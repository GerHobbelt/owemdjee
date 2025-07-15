

## File / Directory Tree Synchronization (local and remote)

- **cdc-file-transfer** [📁](./cdc-file-transfer) [🌐](https://github.com/GerHobbelt/cdc-file-transfer) -- CDC File Transfer contains tools for syncing and streaming files from Windows to Windows or Linux. The tools are based on Content Defined Chunking (CDC), in particular [FastCDC](https://www.usenix.org/conference/atc16/technical-sessions/presentation/xia), to split up files into chunks.
- **CryptSync** [📁](./CryptSync) [🌐](https://github.com/GerHobbelt/CryptSync) -- a small utility that synchronizes two folders while encrypting the contents in one folder. That means one of the two folders has all files unencrypted (the files you work with) and the other folder has all the files encrypted. This is best used together with cloud storage tools like OneDrive, DropBox or Google Drive.
- **csync2** [📁](./csync2) [🌐](https://github.com/GerHobbelt/csync2) -- a cluster synchronization tool. It can be used to keep files on multiple hosts in a cluster in sync. Csync2 can handle complex setups with much more than just 2 hosts, handle file deletions and can detect conflicts.
- **filecopyex3** [📁](./filecopyex3) [🌐](https://github.com/GerHobbelt/filecopyex3) -- a FAR plugin designed to bring to life all kinds of perverted fantasies on the topic of file copying, each of which will speed up the process by 5% :smile:. At the moment, it has implemented the main features that are sometimes quite lacking in standard copiers.
- **FreeFileSync** [📁](./FreeFileSync) [🌐](https://github.com/GerHobbelt/FreeFileSync) -- a folder comparison and synchronization application that creates and manages backup copies of all your important files. Instead of copying every file every time, FreeFileSync determines the differences between a source and a target folder and transfers only the minimum amount of data needed. FreeFileSync is available for Windows, macOS, and Linux.
- **lib_nas_lockfile** [📁](./lib_nas_lockfile) [🌐](https://github.com/GerHobbelt/lib_nas_lockfile) -- lockfile management on NAS and other disparate network filesystem storage. To be combined with SQLite to create a proper Qiqqa Sync operation.
- **librsync** [📁](./librsync) [🌐](https://github.com/GerHobbelt/librsync) -- a library for calculating and applying network deltas. librsync encapsulates the core algorithms of the rsync protocol, which help with efficient calculation of the differences between two files. The rsync algorithm is different from most differencing algorithms because it does not require the presence of the two files to calculate the delta.  Instead, it requires a set of checksums of each block of one file, which together form a signature for that file.  Blocks at any position in the other file which have the same checksum are likely to be identical, and whatever remains is the difference. This algorithm transfers the differences between two files without needing both files on the same system.
- **rclone** [📁](./rclone) [🌐](https://github.com/GerHobbelt/rclone) -- Rclone *("rsync for cloud storage")* is a command-line program to sync files and directories to and from different cloud storage providers. See [the full list of all storage providers and their features](https://rclone.org/overview/).
- **rsync** [📁](./rsync) [🌐](https://github.com/GerHobbelt/rsync) -- Rsync is a fast and extraordinarily versatile file copying tool for both remote and local files. Rsync uses a delta-transfer algorithm which provides a very fast method for bringing remote files into sync.
- **vcopy** [📁](./vcopy) [🌐](https://github.com/GerHobbelt/vcopy) -- tool to safely copy files across various (local) hardware under circumstances where there may be another file writer active at the same time and/or the (USB?) connection is sometimes flakey or system I/O drivers buggered.
- **zsync2** [📁](./zsync2) [🌐](https://github.com/GerHobbelt/zsync2) -- the advanced file download/sync tool zsync. zsync is a well known tool for downloading and updating local files from HTTP servers using the well known algorithms rsync used for diffing binary files. Therefore, it becomes possible to synchronize modifications by exchanging the changed blocks locally using `Range:` requests. The system is based on meta files called `.zsync` files. They contain hash sums for every block of data. The file is generated from and stored along with the actual file it refers to. Due to how system works, nothing but a "dumb" HTTP server is required to make use of zsync2. This makes it easy to integrate zsync2 into existing systems.











