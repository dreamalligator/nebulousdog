#[Digitalvapor](http://antivapor.net)
Etc verbage about plants and code, maybe some drawings, and whatever else.

#Dev
* `git clone --recursive https://github.com/digitalvapor/digitalvapor.git`
* `npm install`
* `grunt server` to run locally, watch for changes and regenerate. Or simply `grunt`, because this is the default task.
* `grunt deploy` to deploy.

##Article and Page Workflow
1. `grunt article my-cool-title` or `grunt page my-page-title`
2. Your [default Git editor](http://git-scm.com/book/en/Customizing-Git-Git-Configuration#Basic-Client-Configuration) opens so you can edit the post.
3. `git add -A && git commit -m 'adds my-cool-titled article'`
4. `git push origin source`
5. `grunt deploy`

##Dependencies
Some are optional depending on what you are doing..
* [Pelican](https://github.com/getpelican/pelican)
* [Grunt](https://github.com/gruntjs/grunt)
* [IPython](https://github.com/ipython/ipython)
* [Markdown](http://daringfireball.net/projects/markdown/syntax) - `pip install markdown`
* [Git](http://git-scm.com/)

##License
This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 License](https://creativecommons.org/licenses/by-nc-sa/4.0/).
