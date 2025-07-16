









## OCR core (*tesseract*)

- **DocLayNet** [📁](./DocLayNet) [🌐](https://github.com/GerHobbelt/DocLayNet) -- DocLayNet provides page-by-page layout segmentation ground-truth using bounding-boxes for 11 distinct class labels on 80863 unique pages from 6 document categories. It provides several unique features compared to related work such as PubLayNet or DocBank, e.g. *Human Annotation*: DocLayNet is hand-annotated by well-trained experts, providing a gold-standard in layout segmentation through human recognition and interpretation of each page layout.
- **EasyOCR** [📁](./EasyOCR) [🌐](https://github.com/GerHobbelt/EasyOCR) -- ready-to-use OCR with 80+ [supported languages](https://www.jaided.ai/easyocr) and all popular writing scripts including: Latin, Chinese, Arabic, Devanagari, Cyrillic, etc.
- **EasyOCR-cpp** [📁](./EasyOCR-cpp) [🌐](https://github.com/GerHobbelt/EasyOCR-cpp) -- custom C++ implementation of [EasyOCR](https://github.com/JaidedAI/EasyOCR). This C++ project implements the pre/post processing to run a OCR pipeline consisting of a text detector [CRAFT](https://arxiv.org/abs/1904.01941), and a CRNN based text recognizer. Unlike the EasyOCR python which is API based, this repo provides a set of classes to show how you can integrate OCR in any C++ program for maximum flexibility.
- **IMGUR5K-Handwriting-Dataset** [📁](./IMGUR5K-Handwriting-Dataset) [🌐](https://github.com/GerHobbelt/IMGUR5K-Handwriting-Dataset) -- the IMGUR5K Handwriting Dataset for OCR/image preprocessing benchmarks.
- **langdata_LSTM** [📁](../../thirdparty/langdata_LSTM) [🌐](https://github.com/GerHobbelt/langdata_lstm) -- tesseract data
- **ocr_eval_tools** [📁](./ocr_eval_tools) [🌐](https://github.com/GerHobbelt/ocr_eval_tools) -- toolkit to help evaluate / benchmark tesseract OCR performance.
- **openalpr** [📁](./openalpr) [🌐](https://github.com/GerHobbelt/openalpr) -- OpenALPR is an open source *Automatic License Plate Recognition* library written in C++.  The library analyzes images and video streams to identify license plates.  The output is the text representation of any license plate characters.
- **Sancho.Panza.on.tesseract.OCR** [📁](./Sancho.Panza.on.tesseract.OCR) [🌐](https://github.com/GerHobbelt/Sancho.Panza.on.tesseract.OCR) -- a book about tesseract OCR programming and usage.
- **tessconfigs** [📁](../../thirdparty/tessconfigs) [🌐](https://github.com/GerHobbelt/tessconfigs) -- Tesseract Config files
- **tessdata** [📁](../../thirdparty/tessdata) [🌐](https://github.com/GerHobbelt/tessdata) -- trained models for Tesseract. These have models for legacy tesseract engine (--oem 0) as well as the new LSTM neural net based engine (--oem 1). The LSTM models (--oem 1) in these files have been updated to the integerized versions of [tessdata_best](https://github.com/tesseract-ocr/tessdata_best) on GitHub. So, they should be faster but probably a little less accurate than tessdata_best.
- **tessdata_best** [📁](../../thirdparty/tessdata_best) [🌐](https://github.com/GerHobbelt/tessdata_best) -- the best trained models for the [Tesseract Open Source OCR Engine](https://github.com/tesseract-ocr/tesseract). These models only work with the LSTM OCR engine of Tesseract 4 / 5.
- **tessdata_contrib** [📁](../../thirdparty/tessdata_contrib) [🌐](https://github.com/GerHobbelt/tessdata_contrib) -- user contributions (non Google) for Tesseract 4 / 5.
- **tessdata_fast** [📁](../../thirdparty/tessdata_fast) [🌐](https://github.com/GerHobbelt/tessdata_fast) -- fast integer versions of trained models for the [Tesseract Open Source OCR Engine](https://github.com/tesseract-ocr/tesseract). These models only work with the LSTM OCR engine of Tesseract 4 / 5.
- **tessdoc** [📁](../../thirdparty/tessdoc) [🌐](https://github.com/GerHobbelt/tessdoc) -- user manual for Tesseract versions `5.x`.
- **tesseract** [📁](../../thirdparty/tesseract) [🌐](https://github.com/GerHobbelt/tesseract) -- `tesseract-ocr` with `--visible-pdf-image` and other tweaks.
- **tesseract_docs** [📁](../../thirdparty/tesseract_docs) [🌐](https://github.com/GerHobbelt/tesseract_docs) -- various documents related to Tesseract OCR.
- **tesseract-gImgRdrGui** [📁](./tesseract-gImgRdrGui) [🌐](https://github.com/GerHobbelt/gImageReader) -- a Gtk/Qt front-end to tesseract-ocr.
- **tesseract_langdata** [📁](../../thirdparty/tesseract_langdata) [🌐](https://github.com/GerHobbelt/langdata) -- source training data for Tesseract for lots of languages.
- **tesslinesplit** [📁](./tesslinesplit) [🌐](https://github.com/GerHobbelt/tesslinesplit) -- a standalone program for using Tesseract's line segmentation algorithm to split up document images.
- **tesstrain** [📁](../../thirdparty/tesstrain) [🌐](https://github.com/GerHobbelt/tesstrain) -- training workflow for Tesseract 4.













	
----

🡸 [previous section](./0090-telemetry.md)  |  🡹 [up](./0016-libraries-we-re-looking-at-for-this-intent.md)  |  🡻 [all (index)](./0103-libraries-in-this-collection.md)  |  🡺 [next section](./0092-pdf-render-metadata-core.md)
