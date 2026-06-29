









## audio files & processing

Not just speech processing & speech recognition, but sometimes data is easier "visualized" as audio (sound).

- **AudioFile** [📁](../AudioFile) [🌐](https://github.com/GerHobbelt/AudioFile) -- a simple header-only C++ library for reading and writing audio files. (WAV, AIFF)
- **dr_libs** [📁](../dr_libs) [🌐](https://github.com/GerHobbelt/dr_libs) -- single file audio decoding libraries for C and C++ (FLAC, MP3, WAV)
- **flac** [📁](../flac) [🌐](https://github.com/GerHobbelt/flac) -- a software that can reduce the amount of storage space needed to store digital audio signals without needing to remove information in doing so. The files read and produced by this software are called FLAC files. As these files (which follow the [FLAC format](https://xiph.org/flac/format.html)) can be read from and written to by other software as well, this software is often referred to as the FLAC reference implementation.
- **libsndfile** [📁](../libsndfile) [🌐](https://github.com/GerHobbelt/libsndfile) -- a C library for reading and writing files containing sampled audio data, e.g. Ogg, Vorbis and FLAC.
- **minimp3** [📁](../minimp3) [🌐](https://github.com/GerHobbelt/minimp3) -- a minimalistic, single-header library for decoding MP3. minimp3 is designed to be small, fast (with SSE and NEON support), and accurate (ISO conformant).
- **opus** [📁](../opus) [🌐](https://github.com/GerHobbelt/opus) -- an audio codec for interactive speech and audio transmission over the Internet. Opus can handle a wide range of interactive audio applications, including Voice over IP, videoconferencing, in-game  chat, and even remote live music performances. It can scale from low bit-rate narrowband speech to very high quality stereo music.
- **qoa** [📁](../qoa) [🌐](https://github.com/GerHobbelt/qoa) -- QOA - The “Quite OK Audio Format” for fast, lossy audio compression - is a single-file library for C/C++.  More info at: https://qoaformat.org
- **r8brain-free-src** [📁](../r8brain-free-src) [🌐](https://github.com/GerHobbelt/r8brain-free-src) -- high-quality professional audio sample rate converter (SRC) / resampler C++ library.  Features routines for SRC, both up- and downsampling, to/from any sample rate, including non-integer sample rates: it can be also used for conversion to/from SACD/DSD sample rates, and even go beyond that. Also suitable for fast general-purpose 1D time-series resampling / interpolation (with relaxed filter parameters).
- **sac** [📁](../sac) [🌐](https://github.com/GerHobbelt/sac) -- a state-of-the-art lossless audio compression model. Lossless audio compression is a complex problem, because PCM data is highly non-stationary and uses high sample resolution (typically >=16bit). That's why classic context modelling suffers from context dilution problems. Sac employs a simple OLS-NLMS predictor per frame including bias correction. Prediction residuals are encoded using a sophisticated bitplane coder including SSE and various forms of probability estimations. Meta-parameters of the predictor are optimized via binary search (or [DDS](https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2005WR004723)) on by-frame basis. This results in a highly asymmetric codec design. We throw a lot of muscles at the problem and archive only little gains - by practically predicting noise.
- **silk-codec** [📁](../silk-codec) [🌐](https://github.com/GerHobbelt/silk-codec) -- a library to convert PCM to TenCent Silk files and vice versa.
- **silk-v3-decoder** [📁](../silk-v3-decoder) [🌐](https://github.com/GerHobbelt/silk-v3-decoder) -- decodes Silk v3 audio files (like WeChat amr, aud files, qq slk files) and converts to other formats (like mp3).
- **Solo** [📁](../Solo) [🌐](https://github.com/GerHobbelt/Solo) -- Agora SOLO is a speech codec, developed based on Silk with BWE(Bandwidth Extension) and MDC(Multi Description Coding). With these technologies, SOLO is able to resist weak networks at low bitrates. The main reason for SOLO to use bandwidth expansion is to reduce the computational complexity.
- **speex** [📁](../speex) [🌐](https://github.com/GerHobbelt/speex) -- a patent-free voice codec. Unlike other codecs like MP3 and Ogg Vorbis, Speex is designed to compress voice at bitrates in the 2-45 kbps range. Possible applications include VoIP, internet audio streaming, archiving of speech data (e.g. voice mail), and audio books.













	
----

🡸 [previous section](./0056-web-scraping.md)  |  🡹 [up](./0016-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0104-libraries-in-this-collection.md)  |  🡺 [next section](./0058-file-format-support.md)
