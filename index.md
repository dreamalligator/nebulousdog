---
layout: page
title: Devices, Sounds, and Etc Verbage
tagline: Antivapor is MechanicalApe
---
{% include JB/setup %}

<div class="blog-index">
{% assign post = site.posts.first %}
{% assign content = post.content %}
{% include post_recent.html %}
</div>

##Projects
<ul>
{% for post in site.projects %}
<li>{{ project.image }} {{ project.title }}<span>{{ project.dates }}</span><p>{{ project.description }}</p></li>
{% endfor %}
</ul>
