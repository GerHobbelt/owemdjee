# owemdjee









<!-- 📁🌐 force Notepad++ to recognize UTF8: 📁🌐 -->









Data Science & Image Processing amalgam library in C/C++.

This place is a gathering spot & integration workplace for the C & C++ libraries we choose to use.  Think "*Façade Pattern*" and you're getting warm. 😉
The heavy data lifting will be done in the referenced libraries, while this lib will provide some glue and common ground for them to work in/with.









<!-- *toc* -->









* [TOC](#owemdjee)
    * [Reason for this repo](#reason-for-this-repo)
        * [And?](#and)
        * [Critique?](#critique)
        * [Why is this repo a *solution*? And does it scale?](#why-is-this-repo-a-solution-and-does-it-scale)
* [Intent](#intent)
  * [Inter-process communications (IPC)](#inter-process-communications-ipc)
  * [Programming Languages used: *intent and purposes*](#programming-languages-used-intent-and-purposes)
  * [Scripting the System: Languages Considered for Scripting by Users](#scripting-the-system-languages-considered-for-scripting-by-users)
* [Libraries we're looking at for this *intent*](#libraries-were-looking-at-for-this-intent)





---









<!-- *toc::ALL* -->









## Reason for this repo

`git submodules` hasn't been the most, ah, "user-friendly" methods to track and manage a set of libraries that you wish to track at *source level*.

A few problems have been repeatedly observed over our lifetime with `git`:

+ when it so happens that the importance & interest in a submoduled library is perhaps waning and you want to migrate to another, you can of course invoke `git` to ditch the old sow and bring in the shiny new one, but that stuff gets quite finicky when you are pedalling back & forth through your commit tree when, e.g. bughunting or maintenance work on a release branch which isn't up to snuff with the fashion kids yet.

  Yup, that's been much less of a problem since about 2018, but old scars need more than a pat on the arm to heal, if you get my drift.

+ folks haven't always been the happy campers they were supposed to be when they're facing a set of submodules and want to feel safe and sure in their "knowledge" that each library X is at commit Y, when the top of the module tree is itself at commit Z, for we are busy producing a production release, perhaps? That's a wee bit stressful and there have been enough "flukes" with git to make that a not-so-ironclad-as-we-would-like position.

  Over time, [I've created several bash shell scripts to help with that buzzin' feelin' of *absolute certainty*](https://github.com/GerHobbelt/developer-utility-commands). Useful perhaps, but the cuteness of those wears off pretty darn quickly when many nodes in the submodule tree start cluttering their git repo with those.











### And?

This repo is made to ensure we have a single point of reference for all the data munching stuff, at least.

We don't need to `git submodule add` all those data processing libs in our applications this way, as this is a single submodule to bother that project with. The scripts and other material in here will provide the means to ensure your build and test tools can quickly and easily ensure that everyone in here is at the commit spot they're supposed to be.

And when we want to add another lib about data/image processing, we do that in here, so the application-level git repo sees a very stable singular submodule all the time: this repo/lib, not the stuff that will change over time as external libs gain and loose momentum over time. (We're talking multiyear timespans here!)











### Critique?

It's not the most brilliant solution to our problems, as this, of course, becomes a single point of failure that way, but experience in the past with similar "solutions" has shown that it's maybe not always fun, but at least we keep track of the management crap in one place and that was worth it, every time.

And why not do away with `git submodule` entirely and use packages instead? Because this stuff is important enough that *other, quite painful experience* has shown us that (binary & source) packages are a wonder and a hassle too: I'ld rather have my code tracked and tagged at source level **all the way** because that has reduced several bug situations from man-*weeks* to man-*hours*: like Gentoo, compile it all, one compiler only.  Doesn't matter if the bug is in your own code or elsewhere, there are enough moments like that where one is helped enormously by the ability to step through *and possibly tweak a bit of code here or there temporarily to help the debugging process* that I, at least, prefer full source code.

And that's what this repo is here to provide: the source code gathered and ready for use on our machines.











### Why is this repo a *solution*? And does it scale?

The worst bit first: it scales like rotten eggs. The problem there is two-fold: first, there's (relatively) few people who want to track progress at the bleeding edge, so tooling is consequently limited in power and availability, compared to conservative approaches (count the number of *package managers* lately?).

Meanwhile, I'm in a spot where I *want* to ride the bleeding edge, at least most of the time, and I happen to *like* it that way: my world is much more *R&D* than *product maintenance*, so having a means to track, relatively easy, the latest developments in subjects and materiel of interest is a boon to me. Sure, I'll moan and rant about it once in a while, but if I wanted to really get rid of the need to be flexible and *adapt to changes*, sometimes often, I'ld have gone with the conservative stability of *package managers* and *LTS releases* already. Which I've done for other parts of my environment, but do not intend to do for the part which is largely covered by this repo: source libraries which I intend to use or am using already in research tools I'm developing for others and myself.

For that purpose, this repo is a *solution*, though -- granted -- a *sub-optimal one* in that it doesn't scale very well. I don't think there's any automated process available to make this **significantly faster and more scalable** anyway: the fact that I'm riding the bleeding edge and wish to be able to backpedal at will when the latest change of direction or state of affairs of a component is off the rails (from my perspective at least), requires me to be flexible and adaptable to the full gamut of change. There are alternative approaches, also within the `git` world, but they haven't shown real appeal vs. *old skool* `git submodules` -- which is cranky at times and a pain in the neck when you want to ditch something but still need it in another dev branch, *moan moan moan*, but anyway... -- so here we are.

> **Side note**: submodules which have been picked up for experimentation and inspection **but have been deleted from this A list later on** are ~~struck through~~ in the overview below: the rationale there is that we can thus still observe **why** we struck it off the list, *plus* never make the mistake of re-introducing it after a long time, forgetting that we once had a look already, *without* running into the struck-through entry and having to re-evaluate the reason at least, before we re-introduce an item.
>





---













# Intent

* [TOC](#intent)
    * [Inter-process communications (IPC)](#inter-process-communications-ipc)
    * [Programming Languages used: *intent and purposes*](#programming-languages-used-intent-and-purposes)
    * [Scripting the System: Languages Considered for Scripting by Users](#scripting-the-system-languages-considered-for-scripting-by-users)











## Inter-process communications (IPC)

Lowest possible **run-time** cost, a.k.a. "run-time overhead": the aim is to have IPC which does not noticably impact UX (User Experience of the application: responsiveness / UI) on reeasonably powered machines. (Users are *not* expected to have the latest or fastest hardware.)

As *at least* large images will be transfered (PDF page renders) we need to have a binary-able protocol.











## Programming Languages used: *intent and purposes*

We expect to use these languages in processes which require this type of IPC:

- C / C++ (**backend No.1**)
  + PDF renderer ([mupdf](https://mupdf.com/))
  + metadata & annotations extractor ([mupdf](https://mupdf.com/) et al)
  + *very* probably also the database interface (SQLite)
  + \[page] image processing (leptonica, openCV, ImageMagick?, what-ever turns out to be useful and reasonable to integrate (particularly between PDF page renderer and OCR engine to help us provide a *user-tunable* PDF text+metadata extractor
  + OCR (tesseract)
  + "A.I."-assisted tooling to help process and *clean* PDFs: cover pages, abstract/summary extraction for meta-research, etc. (think ngrams, xdelta, SVM, tensors, author identification, document categorization, document similarity / \[*near*-]duplicate / revision detection, tagging, ...)
  + document identifier key generator a.k.a. **content hasher** for creating **unique** key for each document, which can be used as database record index, etc.
    * old: Qiqqa SHA1B
    * new: BLAKE3+Base36

- C# (**"business logic" / "middleware"**: the glue logic)
- Java (SOLR / Lucene: our choice for the "full text search database" ~ **backend No.2**)
- JavaScript (**UI**, mostly. Think [*electron*](https://www.electronjs.org/), *web browser*, [*Chromely*](https://chromely.net/)<sup>[also](https://github.com/chromelyapps/Chromely)</sup>, [*WebView2*](https://docs.microsoft.com/en-us/microsoft-edge/webview2/)<sup>[plus](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)</sup>, that sort of thing)

Here we *intend* to use the regular SOLR APIs, which does not require specialized binary IPC.

We **may** **probably** choose to use a web-centric UI approach where images are *compressed* and *cached* in the *backend*, while being provided as \<picture> or \<img> tag references (URLs) in the HTML generated by the backend. *However*, we keep our options open ATM as furtheer testing is expected to hit a few obstacles there (smart caching required as we will be processing lots of documents in "background **bulk processes**" alongside the browsing and other more *direct* user activity) so a *websocket* or similar push technology may be employed: there we may benefit from dedicated IPC for large binary and text data transfers.











## Scripting the System: Languages Considered for Scripting by Users

Python has been considered. Given its loud presence in the AI communities, we still may integrate it one day. However, personally I'm not a big fan of the language and don't use it unless it's *prudent to do*, e.g. when extending or tweaking previous works produced by others.
Also, it turns out, it's not exactly *easy* to integrate (CPython) and I don't see a need for it beyond this one project / product: Qiqqa.

I've looked at Lua for a scripting language suitable for users (used quite a lot in the gaming industries and elsewhere); initial trials to get something going did not uncover major obstacles, but the question "_how do I **debug** Lua scripts?_" does not produce any viable project / product that goes beyond the *old skool `printf`-style debugging method*. Not a prime candidate therefor, as we expect that users will pick this up, when they like it, and grow the user scripts to unanticipated size and complexity: I've seen this happen multiple times in my career. Lua does not provide a scalable growth path from my perspective due to the lack of a *decent, customizable, debugger*.

Third candidate is JavaScript. While Artifex/mupdf comes with `mujs`, which is a simple engine it suffers from *two* drawbacks: it's ES5 and also does not provide a debugger mechanism beyond old skool `print`. Nice for nerds, but this is user-facing and thus not a viable option.

The other JavaScript engines considered are of varying size, performance and complexity. *Some* of them offer ways to integrate them with the \[F12] Chrome browser Developer Tools debugger, which would be *very nice to have available*. The road traveled there, along the various JavaScript engines is this:

- [Facebook's Hermes](https://github.com/facebook/hermes), [Samsung's Escargot](https://github.com/Samsung/escargot) and [XS/moddable](https://www.moddable.com/)<sup>[also](https://github.com/Moddable-OpenSource/moddable) [here](https://github.com/Moddable-OpenSource/moddable-xst)</sup>, which led me to [a webpage where various embeddable JS engines are compared size- and *performance*-wise](https://bellard.org/quickjs/bench.html).
- [Google's V8](https://v8.dev/)<sup>[here](https://github.com/v8/v8) [too](https://chromium.googlesource.com/v8/v8/+/84450a2239672109bcf537d6740b8babda521567)</sup>, as available in NodeJS, is deemed too complex for integration: when we go there, we could spend the same amount of effort on CPython integration -- though there again is the ever-present "how to debug this visually?!" question...)
- [JerryScript](https://github.com/jerryscript-project/jerryscript/): ES2017/2020 (good!), there's noises about Chrome Developer Tools on the Net for this one. Small, designed for embedded devices. I like that.
- mujs: ES5, no visual debugger. **Out.**
- [QuickJS](https://github.com/bellard/quickjs): ES2020, DevTools or [VS Code debugging](https://github.com/koush/vscode-quickjs-debug) seems to be available. Also comes with an interesting runtime: [txiki](https://github.com/saghul/txiki.js), which we still need to take a good look at.

**UPDATE 2021/June**: [JerryScript](https://github.com/jerryscript-project/jerryscript/), duktape, XS/moddable, escargot: these have been dropped as we picked QuickJS. After some initial hassle with that codebase, we picked a different branch to test, which was cleaner and compiled out of the box (CMake > MSVC), which is always a good omen for a codebase when you have cross-platform portability in mind.













	
----

🡻 [all (index)](./0000-index/0103-libraries-in-this-collection.md)  |  🡺 [next section](./0000-index/0001-script-languages-for-embedding-in-c-c-applications.md)
