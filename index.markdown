---
layout: page
title: "{bbon}"
---
<div id="posts">
<ul>
{% for post in site.posts limit: 6 %}
		<li>

			
				{% comment %}
				<a href="{{ post.url }}">
					<div class="c-image waves-effect waves-block waves-light">
						<img alt="{{ post.title }}" src="{{ post.image }}" />
						<span class="c-title">{{ post.title }}</span>
					</div>
				</a>
				{% endcomment %}
				<a href="{{ post.url }}">
				<div class="card-content">
					<h3 class="c-title">{{ post.title }}</h3>
					{% if post.excerpt %}<p>{{ post.excerpt }}</p>{% endif %}
				</div>
				</a>
				
			
			</li>
{% endfor %}
</ul>
</div>