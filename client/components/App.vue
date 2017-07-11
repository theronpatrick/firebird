<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
html {
	font-family: 'Open Sans', sans-serif;
  font-size: 62.5%;

	overflow-x: hidden;
}

html * {
  box-sizing: border-box;
}

body {
  font-weight: 400;
  font-size: 1.2rem;
  margin: 0;
}

html, body, #app {
  height: 100%;
  width: 100%;
}
</style>
