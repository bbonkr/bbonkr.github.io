---
layout: default
---


<!-- Get the tag name for every tag on the site and set them
to the `site_tags` variable. -->
{% capture site_categories %}{% for cate in site.categories %}{{ cate | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}

<!-- `tag_words` is a sorted array of the tag names. -->
{% assign category_words = site_categories | split:',' | sort %}

<!-- Posts by Tag -->
<section>
    {% for item in (0..site.categories.size) %}
        {% unless forloop.last %}
            {% capture this_word %}{{ category_words[item] }}{% endcapture %}
                <h3 id="{{ this_word | cgi_escape }}">{{ this_word }}  &#172;</h3>
                <ul>
                {% for post in site.categories[this_word] %}
                    {% if post.title != null %}
                        <li>
                            <div class="title">
                                <a href="{{ post.url }}">{{ post.title }}</a>
                            </div>
                            <div class="post-date">
                                <span><small>{{ post.date | date_to_string }}</small></span>
                            </div>
                        </li>
                    {% endif %}
                {% endfor %}
                </ul>
        {% endunless %}
    {% endfor %}
</section>
