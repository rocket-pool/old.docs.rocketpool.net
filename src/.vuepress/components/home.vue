<template>
  <main aria-labelledby="main-title" class="home">
    <header class="hero">
        <img :src="$page.frontmatter.heroImage" alt="hero"> 
        <h1 id="main-title">Rocket Pool</h1> 
        <p class="description">
            {{ $page.frontmatter.tagline }}
        </p> 
        <p class="action">
            <a :href="$page.frontmatter.actionLink" class="nav-link action-button">{{ $page.frontmatter.actionText }}</a>
        </p>
    </header> 
    <div class="features">
        <div class="feature" v-for="feat in $page.frontmatter.features">
            <h2><a v-bind:href="feat.link">{{ feat.title }}</a></h2>
            <p>{{ feat.details }}</p>
        </div>
        <div class="theme-default-content custom content__default"></div> 
    </div>
    <div class="footer">
        {{ $page.frontmatter.footer }}
    </div>
  </main>
</template>

<style scoped>

    .feature > h2 {
        margin-block-end: 0;
    }

    .feature > p {
        margin-block-start: 6px;
    }

</style>
