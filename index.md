---
layout: page
title: "{bbon}"
tagline: hello world!
---
{% include JB/setup %}
    
## Posts

<dl class="posts">

  {% for post in site.posts %}
    <dt><h3><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>  <small><span>&raquo; {{ post.date | date_to_string }}</span></small></h3></dt>
    <dd>{{ post.excerpt }}</dd>
  {% endfor %}
</dl>


