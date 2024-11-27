<template>
  <div>
    <header>
      <nav></nav>
    </header>
    <!-- output the page content-->
    <div>
      <slot />
    </div>
    <footer>
      <header>
        <nav>
          <ul>
            <li><NuxtLink to="/">Home1</NuxtLink></li>
            <li><NuxtLink to="/about">About1</NuxtLink></li>
            <li><NuxtLink to="/products">Products</NuxtLink></li>
            <li><NuxtLink to="#">Contact us</NuxtLink></li>
          </ul>
        </nav>
      </header>
    </footer>
  </div>
</template>

<style scopped>
.router-link-exact-active {
  /*color: #12b488;*/
}
</style>
