

### Language translation & transliteration

- **gettext** [📁](./gettext) [🌐](https://github.com/GerHobbelt/gettext) -- the GNU gettext package.  It is interesting for authors or maintainers of other packages or programs which they want to see internationalized.  As one step the handling of messages in different languages should be implemented.  For this task GNU gettext provides the needed tools and library functions. It is also interesting for translators, because GNU gettext provides the 'msgmerge' program, which prepares a message catalog before a translation update.
- **marian** [📁](./marian) [🌐](https://github.com/GerHobbelt/marian) -- an efficient Neural Machine Translation framework written in pure C++ with minimal dependencies.
- **NiuTrans.NMT** [📁](./NiuTrans.NMT) [🌐](https://github.com/GerHobbelt/NiuTrans.NMT) -- a lightweight and efficient Transformer-based neural machine translation system. Its main features are:
  
  - Few dependencies. It is implemented with pure C++, and all dependencies are optional.
  - Flexible running modes. The system can run with various systems and devices (Linux vs. Windows, CPUs vs. GPUs, and FP32 vs. FP16, etc.).
  - Framework agnostic. It supports various models trained with other tools, e.g., fairseq models.
  - High efficiency. It is heavily optimized for fast decoding, see [our WMT paper](https://arxiv.org/pdf/2109.08003.pdf) for more details.

- **OpenFST** [📁](./OpenFST) [🌐](https://github.com/GerHobbelt/openfst) -- a library for constructing, combining, optimizing, and searching weighted finite-state transducers (FSTs). Weighted finite-state transducers are automata where each transition has an input label, an output label, and a weight. The more familiar finite-state acceptor is represented as a transducer with each transition's input and output label equal. Finite-state acceptors are used to represent sets of strings (specifically, regular or rational sets); finite-state transducers are used to represent binary relations between pairs of strings (specifically, rational transductions). The weights can be used to represent the cost of taking a particular transition. FSTs have key applications in speech recognition and synthesis, machine translation, optical character recognition, pattern matching, string processing, machine learning, information extraction and retrieval among others. Often a weighted transducer is used to represent a probabilistic model (e.g., an n-gram model, pronunciation model). FSTs can be optimized by determinization and minimization, models can be applied to hypothesis sets (also represented as automata) or cascaded by finite-state composition, and the best results can be selected by shortest-path algorithms.
- **OpenFST-utils** [📁](./OpenFST-utils) [🌐](https://github.com/GerHobbelt/openfst-utils) -- a set of useful programs for manipulating Finite State Transducer with the OpenFst library.
- **tinygettext** [📁](./tinygettext) [🌐](https://github.com/GerHobbelt/tinygettext) -- a minimal replacement for gettext written in C++. It can read `.po` files directly and doesn't need `.mo` files generated from `.po`. It also can read the `.po` files from arbitrary locations, so it's better suited for non-Unix systems and situations in which one wants to store or distribute `.po` files separately from the software itself.
- **zotero-translate** [📁](./zotero-translate) [🌐](https://github.com/GerHobbelt/translate) -- browser-based standalone zotero translator.
- **zotero-translation-server** [📁](./zotero-translation-server) [🌐](https://github.com/GerHobbelt/translation-server) -- lets you use Zotero translators without the Zotero client.
- **zotero-translators** [📁](./zotero-translators) [🌐](https://github.com/GerHobbelt/translators) -- Zotero Translators : automatically detect journal articles, library records, news items, and other objects you might like to save to your Zotero library. Zotero uses so-called “translators” to detect and import data from websites. There are currently more than 600 different translators, facilitating data import from countless sites.















	
----

🡸 [previous section](./0083-ui.md)  |  🡹 [up](./0083-ui.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0085-application.md)
