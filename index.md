---
layout: page
title: "{bbon}"
tagline: hello world!
---
{% include JB/setup %}
    
## Posts

<div class="posts row">

  {% for post in site.posts %}
    <div class="col-md-4">
        <h3><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>  <small><span>&raquo; {{ post.date | date_to_string }}</span></small></h3>
        <p>
            <a href="{{ BASE_PATH }}{{ post.url }}">
                <img src="{{ post.image }}" class="center-block img-thumbnail" />
            </a>
        </p>
        {{ post.excerpt }}
    </div>
  {% endfor %}
</div>

