

## Application Installers (NSIS, et al)

- **libmetalink** [📁](./libmetalink) [🌐](https://github.com/GerHobbelt/libmetalink) -- a library to read Metalink XML download description format. It supports both [_Metalink version 3_](http://www.metalinker.org/Metalink_3.0_Spec.pdf) and [_Metalink version 4 (RFC 5854)_](https://tools.ietf.org/html/rfc5854).
- **metalink-cli** [📁](./metalink-cli) [🌐](https://github.com/GerHobbelt/command) -- a small program which generates a metalink record on `stdout` for every file given on the commandline and using the mirror list from `stdin`.
- **metalink-mini-downloader** [📁](./metalink-mini-downloader) [🌐](https://github.com/GerHobbelt/mini-downloader) -- a small metalink downloader written in C++, using boost, libcurl and expat. It can either be compiled so that it downloads a specific file and then (optionally) launches it or be compiled into a "downloader template", which can later be used to create a custom downloader by replacing text strings inside the executable (they are marked in a special way, to make this easy).
- **nsis** [📁](./nsis) [🌐](https://github.com/GerHobbelt/nsis) -- **Unofficial** "Nullsoft Scriptable Install System" (NSIS) builds
- **NSISDotNetChecker** [📁](./NSISDotNetChecker) [🌐](https://github.com/GerHobbelt/NsisDotNetChecker) -- .NET Framework Checker NSIS plugin, used to detect if the required .NET Framework is installed and if it is not - plugin will download and install the required package. The plugin's C++ source code is based on the [work of Aaron Stebner](http://blogs.msdn.com/b/astebner/archive/2009/06/16/9763379.aspx).
- **NSISFileCheck** [📁](./NSISFileCheck) [🌐](https://github.com/GerHobbelt/nsisfilecheck) -- NSIS FileCheck is a [NSIS (Nullsoft Scriptable Install System)](https://en.wikipedia.org/wiki/Nullsoft_Scriptable_Install_System) plugin that enables:
  
  - Calculating a file's hash (SHA1, SHA2)
  - Obtaining a file's string version info
  - Verifying a file's Authenticode code signature (including details)

- **NSISMultiUser** [📁](./NSISMultiUser) [🌐](https://github.com/GerHobbelt/NsisMultiUser) -- NSIS Multi User Plugin allows "per-user" (no admin required) and "per-machine" (asks elevation *only when necessary*) installations. This plugin was inspired by [MultiUser.nsh (by Joost Verburg)](http://nsis.sourceforge.net/Docs/MultiUser/Readme.html), but supports a lot of new features and is easier to use.
- **nsis-nscurl** [📁](./nsis-nscurl) [🌐](https://github.com/GerHobbelt/nsis-nscurl) -- NScurl is a NSIS (Nullsoft Scriptable Install System) plugin with advanced HTTP/HTTPS capabilities. It's implemented on top of [libcurl](https://curl.haxx.se/libcurl/) with [OpenSSL](https://www.openssl.org/) as SSL backend.
- **NSIS-OBSInstallerUtils** [📁](./NSIS-OBSInstallerUtils) [🌐](https://github.com/GerHobbelt/OBSInstallerUtils) -- designed to be used with NSIS (Unicode version). It provides the following features:
  
  ```
  OBSInstallerUtils::IsProcessRunning
  OBSInstallerUtils::IsDLLLoaded
  OBSInstallerUtils::AddInUseFileCheck
  OBSInstallerUtils::ResetInUseFileChecks
  OBSInstallerUtils::GetAppNameForInUseFiles
  OBSInstallerUtils::KillProcess
  OBSInstallerUtils::AddAllApplicationPackages
  ```

- **nsis-stdutils** [📁](./nsis-stdutils) [🌐](https://github.com/GerHobbelt/stdutils) -- StdUtils plug-in for NSIS
- **vcpkg** [📁](./vcpkg) [🌐](https://github.com/GerHobbelt/vcpkg) -- `Vcpkg` helps you manage C and C++ libraries on Windows, Linux and MacOS.















	
----

🡸 [prev](./0084-language-translation.md)  |  🡹 [up](./0006-libraries-we-re-looking-at-for-this-intent.md)  |  🡺 [next](./0086-checking-out-the-competition-compatriots-for-qiqqa-re-use-useful.md)
