#[Digitalvapor](http://antivapor.net)
Etc verbage about plants and code, maybe some drawings, and whatever else.

#Dev
* `git clone --recursive https://github.com/digitalvapor/digitalvapor.git`
* `npm install` (first time, for grunt dependencies)
* `grunt server` to run locally, watch for changes and regenerate. Or simply `grunt`, because this is the default task.
* `grunt deploy_init` (first time, or if accidently delete the `.git` folder in `output`)
* `grunt deploy` to deploy.

##Article and Page Workflow
1. `grunt article my-cool-title` or `grunt page my-page-title`
2. Your [default Git editor](http://git-scm.com/book/en/Customizing-Git-Git-Configuration#Basic-Client-Configuration) opens so you can edit the post.
3. `git add -A && git commit -m 'adds my-cool-titled article'`
4. `git push origin source`
5. `grunt deploy`

##Dependencies
Some are optional depending on what you are doing..
* [Pelican](https://github.com/getpelican/pelican) - `pip install pelican`
* [Grunt](https://github.com/gruntjs/grunt) - `npm install -g grunt-cli`
* [IPython](https://github.com/ipython/ipython) - `pip install ipython[notebook]`
* [Markdown](http://daringfireball.net/projects/markdown/syntax) - `pip install markdown`
* [Git](http://git-scm.com/) - `apt-get install git`

##Pelican Plugins
All of these plugins are supported and/or integrated if you choose to use them. We implement all of them (plus a couple optimization plugins) for the Digitalvapor site.

* [Grid](https://github.com/digitalvapor/grid)
* [Liquid Tags](https://github.com/getpelican/pelican-plugins/tree/master/liquid_tags)
  * [gram](https://github.com/digitalvapor/pelican-plugins/blob/master/liquid_tags/gram.py) - see this Instagram Tag in use [here](http://antivapor.net/instagram-tag.html).
  * img
* [Share Post](https://github.com/getpelican/pelican-plugins/tree/master/share_post)
* [Gravatar](https://github.com/getpelican/pelican-plugins/tree/master/gravatar)
* [Sitemap](https://github.com/getpelican/pelican-plugins/tree/master/sitemap)
* [IPython Notebooks](https://github.com/danielfrg/pelican-ipynb)
* [Render Math](https://github.com/barrysteyn/pelican_plugin-render_math)

##License
This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 License](https://creativecommons.org/licenses/by-nc-sa/4.0/).
