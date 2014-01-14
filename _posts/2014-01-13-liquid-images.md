---
layout: post
title: "liquid images"
description: "blog like a hacker indeed"
category: code
tags: [ghost, blogging, node, markdown, images, tumblr, liquid, jekyll]
images: [pacificsunsetbayinlet.jpg, southgoldengatebay.jpg]
github: https://gist.github.com/antivapor/8413011
---
{% include JB/setup %}
Okay, this post might get broken up into seperate pieces if it gets too long.. this'll be about my usage of [Jekyll](https://github.com/jekyll/jekyll), Tumblr, and [Ghost](https://github.com/TryGhost/Ghost) for blogging, and some [Liquid](https://github.com/Shopify/liquid) snippets for images.

I saw that [Ghost](https://ghost.org) has been [trending](https://github.com/explore?since=monthly) on Github; the tantalizing 'just a blogging platform' slogan, that it is awesomely made with [Node](http://nodejs.org), and that you write the blog in [Markdown](http://daringfireball.net/projects/markdown) sung to me. <aside markdown="1">I write this blog in Markdown, btw.</aside><aside markdown="1">Doing the meta thing; blogging about blogging. Man, I'm going to have to come up with some real content after this..</aside> Ghost hadn't come out with its hosted service yet at the time of initial writing, but has since; however, there's no fun in that.<aside markdown="1">so we don't care about that anyway :).</aside> It does purport to be about as easy as it gets to [setup](http://docs.ghost.org/installation), so I wanted to check it out. I DLed Ghost and ran locally just to test it out real fast.<aside markdown="1">See the prereqs on the [Contrib](https://github.com/TryGhost/Ghost/blob/master/CONTRIBUTING.md#working-on-ghost-core) page.</aside> Then, a lot of us are going to run into this, my web hosting doesn't do Node.. so, I used the free [Bitnami](http://wiki.bitnami.com/Applications/BitNami_Ghost) option.

I'm currently doing a [drawing-a-day](http://drawing-day-to-day.tumblr.com/) for 2014, and it is hard enough to output a drawing a day, but then to document it all is even harder. I used to do Tumblr, so I resurrected my old blog. My goal at the time of writing is to still blog through Jekyll, but to also dually post to Tumblr and my new Ghost blog. <aside markdown="1">Tumblr supports Markdown too, I'm happy to note</aside> 

First thing is first, I want to show off all my drawings, but not be too repetitive with copy-pasta `<img src="/images/whatnot.jpg">` into every single post. So, I updated my [blog post](http://antivapor.github.io/blog/) page to use a preview image if listed in the [front matter](http://jekyllrb.com/docs/frontmatter) `images: []`. I also updated my `Rakefile` to include the frontmatter in all future posts.

Secondly, Github isn't really meant for storing images.<aside markdown="1">and if I update an image, it is probably because I don't ever want to see the old one!</aside> Although my images arent currently surpassing 3 MB<aside markdown="1">See [rule of thumb](https://help.github.com/articles/what-is-my-disk-quota#rule-of-thumb-1gb-per-repository-100mb-per-file) on Github</aside>, I still wanted to do this. So, with the intent of updating my image folder in the near future, I updated my image snippet to be {% raw %}`{% include image src="whatnot.jpg" %}`{% endraw %} which outputs a single image, or {% raw %}`{% include image %}`{% endraw %} which outputs all images listed in the frontmatter, and made a `post_matter` include which contains that snippet, appended to all posts.<aside markdown="1">See [passing parameters](http://jekyllrb.com/docs/templates/#includes) in includes.</aside>

Instead of a manually written rel-path, I peppered this above change throughout my previous blog posts and updated the front matter accordingly.

Usages: 

* {% raw %}`{% include image %}`{% endraw %}
* {% raw %}`{% include image src="whatnot.jpg" %}`{% endraw %}

I recently explored the South Bay near the [Legion of Honor](https://en.wikipedia.org/wiki/California_Palace_of_the_Legion_of_Honor). Below you can see a bit of my explorations with the new `post_matter`.

Part two, on the way..

As with my other `code` posts, click the above [Fork Me](http://antivapor.github.io/code/2013/06/03/fork-me/) ribbon to see more code.
{% include post_matter %}