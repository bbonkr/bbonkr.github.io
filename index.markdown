---
layout: page
title: "{bbon}"
---
<div class="row">
{% for post in site.posts limit: 3 %}

	<div class="col s12 m4">
		<div class="card-panel card small">
			<a href="{{ post.url }}">
				<div class="card-image waves-effect waves-block waves-light">
					<img alt="{{ post.title }}" src="{{ post.image }}" />
					<span class="card-title">{{ post.title }}</span>
				</div>
			</a>
			<div class="card-content">
				{% if post.excerpt %}<p>{{ post.excerpt }}</p>{% endif %}
			</div>
			<div class="card-action">
			 	<a href="{{ post.url }}" class="waves-effect waves-teal c-btn">READ MORE</a>
			</div>
		</div>
	</div>

{% endfor %}
</div>