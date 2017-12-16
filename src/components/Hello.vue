<template>
<div class="hello">
</div>
</template>

<script>
export default {
  name: 'hello',
  props: ['profile'],
  computed: {
    msg () {
      return 'Welcome <b><i>' + this.profile.name + '</i></b> to Vue.js App'
    },
    profilePicture () {
      return (this.profile.id) ? 'https://graph.facebook.com/' + this.profile.id + '/picture?width=300' : '/static/man.gif'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.profile-picture {
  width: 150px;
  border-radius: 75px;
}
</style>
