# owemdjee

Data Science &amp; Image Processing amalgam library in C/C++.

This place is a gathering spot & integration workplace for the C & C++ libraries we choose to use.  Think "Façade Pattern' and you're getting warm. :wink:
The heavy data lifting will be done in the referenced libraries, while this lib will provide some glue and common ground for them to work in/with.


## Reason for this repo

`git submodules` hasn't been the most, ah, "user-friendly" methods to track and manage a set of libraries that you wish to track at *source level*.

A few problems have been repeatedly observed over our lifetime with `git`:

- when it so happens that the importance & interest in a submoduled library is perhaps waning and you want to migrate to another, you can of course invoke `git` to ditch the old sow aand bring in the shiny new one, but that stuff gets quite finicky when you are pedalling back & forth through your commit tree when, e.g. bughunting or maintenance work on a release branch which isn't up to snuff with the fashion kids yet. 

  Yup, that's been much less of a problem since about 2018, but old scars need more than a pat on the arm to heal, if you get my drift.
  
- folks haven't always been the happy campers they were supposed to be when they're facing a set of submodules and want to feel safe and sure in their "knowledge" that each library X is at commit Y, when the top off the module tree is itself at commit Z, for we are busy producing a production release, perhaps? That's a wee bit stressful and there have beeen enough "flukes" with git to make that a not-so-ironclad-as-we-would-like position. 

  Over time, I've created several bash shell scripts to help with that buzzin' feelin' of *absolute certainty*. Useful perhaps, but the cuteness of those wears off pretty darn quickly when many nodes in the submodule tree start cluttering their git repo with those.
  
### And?

This repo is made to ensure we have a single point of reference for all the data munching stuff, at least.

We don't need to `git submodule add` all those data processing libs in our applications this way, as this is a single submodule to bother that project with. The scripts and other material in here will provide the means to ensure your build and test tools can quickly and easily ensure that everyone in here is at the commit spot they're supposed to be.

And when we want to add another lib about data/image processing, we do that in here, so the application-level git repo sees a very stable singular submodule all the time: this repo/lib, not the stuff that will change over time as external libs gain and loose momentum over time. (We're talking multiyear timespans here!)


### Critique?

It's not the most brilliant solution to our problems, as this, of course, becomes a single point of failure that way, but experience in the past with similar "solutions" has shown that it's maybe not always fun, but at least we keep track of the management crap in one place and that was worth it, every time.

And why not do away with `git submodule` entirely and use packages instead? Because this stuff is important enough that *other, quite painful experience* has shown us that (binary) packages are a wonder and a hassle too: I'ld rather have my code tracked and tagged at source level **all the way** because that has reduced several bug situations from man-*weeks* to man-*hours*: like Gentoo, compile it all, one compiler only.  Doesn't matter if the bug is in your own code or elsewhere, there are enough moments like that where one is helped enormously by the ability to step through *and possibly tweak a bit of code here or there temporarily to help the debugging process* that I, at least, prefer full source code.

And that's what this repo is here to provide: the source code gathered and ready for use on our machines.




