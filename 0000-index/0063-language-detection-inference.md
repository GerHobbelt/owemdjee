









### language detection / inference

- **cld1-language-detect** [📁](./cld1-language-detect) [🌐](https://github.com/GerHobbelt/cld) -- the CLD (Compact Language Detection) library, extracted from the source code for Google's Chromium library. CLD1 probabilistically detects languages in Unicode UTF-8 text.
- **cld2-language-detect** [📁](./cld2-language-detect) [🌐](https://github.com/GerHobbelt/cld2) -- CLD2 probabilistically detects over 80 languages in Unicode UTF-8 text, either plain text or HTML/XML. For mixed-language input, CLD2 returns the top three languages found and their approximate percentages of the total text bytes.  Optionally, it also returns a vector of text spans with the language of each identified. The design target is web pages of at least 200 characters (about two sentences); CLD2 is not designed to do well on very short text.
- **cld3-language-detect** [📁](./cld3-language-detect) [🌐](https://github.com/GerHobbelt/cld3) -- CLD3 is a neural network model for language identification. The inference code extracts character ngrams from the input text and computes the fraction of times each of them appears. The model outputs BCP-47-style language codes, shown in the table below. For some languages, output is differentiated by script. Language and script names from Unicode CLDR.
- **libchardet** [📁](./libchardet) [🌐](https://github.com/GerHobbelt/libchardet) -- is based on Mozilla Universal Charset Detector library and, detects the character set used to encode data.
- **uchardet** [📁](./uchardet) [🌐](https://github.com/GerHobbelt/uchardet) -- [uchardet](https://www.freedesktop.org/wiki/Software/uchardet/) is an encoding and language detector library, which attempts to determine the encoding of the text. It can reliably detect many charsets. Moreover it also works as a very good and fast language detector.













	
----

🡸 [previous section](./0062-stemmers.md)  |  🡹 [up](./0061-fts.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0064-scripting-user-tunable-tasks-such-as-ocr-preprocessing-metadata.md)
