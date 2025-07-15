

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

















	
----

🡸 [previous section](../README.md)  |  🡹 [up](../README.md)  |  🡻 [all (index)](./0093-libraries-in-this.md)  |  🡺 [next section](./0002-intent.md)
