้<template>
    <div id="app">
      <div v-if="ready" class="">
        <div class="container">
          <div class="row profile">
            <div class="Fixed">
		          <div class="col-md-5">
			        <div class="profile-sidebar">
				      <!-- รูป user -->
              <div class="profile-userpic">
                <img v-if="authorized" :src="'https://graph.facebook.com/' + this.profile.id + '/picture?width=500'" alt="" class="img-responsive"></img>
                <img v-else="authorized" src="/static/warp.gif" class="img-responsive"></img>
              </div>
				      <!--ชื่อ-->
				      <div class="profile-usertitle">
					      <div class="profile-usertitle-name" v-if="authorized">
						      <a :href="'https://www.facebook.com/' + this.profile.id" STYLE="text-decoration: none"><h3>{{ profile.name }}</h3></a>
					      </div>
                <div class="profile-usertitle-name" v-else="authorized">
						      <h3>Unknow</h3>
					      </div>
					      <div class="profile-usertitle-job" v-if="authorized">
						      <h4>Facebook User</h4>
					      </div>
				      </div>
				      <!-- ปุ่ม Login-->
				      <div class="profile-userbuttons">
					      <button v-if="authorized" @click="logout()" class="btn btn-danger"><span class="glyphicon glyphicon-off"></span> Logout</button>
                <button v-else="authorized" @click="login()" class="btn btn-primary"><i class="fa fa-facebook"></i> Sign in with Facebook</button>
				      </div>
            </div>
			    </div>
		    </div>
        <div class="col-md-3">
        </div>
		    <div class="col-md-9">
          <div class="profile-content">
            <div v-if="authorized">
            </div>
            <div v-else="authorized">
              <h5>Please Sign in with Facebook first</h5>
              <img src="/static/error.gif" alt="" height="300"><br><br>
              <img src="/static/fb_login.png" alt="" @click="login()" height="50"></img>
            </div>
            <div v-if="authorized" class="">
              <h1>All room</h1>
              <router-link to="/"><button class="">Back</button></router-link> <br><br>
              <div class="row">
                <div v-for="room of roomF" v-bind:key="room['.key']">
                  <div class="card card-1" style="height: 123px;background-color: #66ff99;" v-if="room.awayFacebookID == ''">
                      {{room.roomName}} <br>By {{room.hostFacebookName}}<br>(1/2) <br> <router-link :to="'/playRoom/'+ joinKey"><button @click="joinRoom(room['.key'], room.awayFacebookID)">Joint this room</button></router-link>
                  </div>
                  <div class="card card-1" style="height: 145px;background-color: #DB9EEB;" v-else>
                      {{room.roomName}} <br>By {{room.hostFacebookName}}<br>(2/2) <br> {{room.hostFacebookName}} vs {{room.awayFacebookName}} <br> <router-link :to="'/playRoom/'+ joinKey"><button @click="joinRoom(room['.key'], room.awayFacebookID, room.matchWatcher)">Watch this game</button></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
	    </div>
    </div><br><br>
  </div>
</div>
</template>

<script>
/* global FB */
import Hello from './Hello'
import { roomRef } from './firebase'

export default {
  components: {
    Hello
  },
  data () {
    return {
      check: false,
      profile: {},
      ready: false,
      re: true,
      authorized: false,
      roomName: '',
      joinKey: ''
    }
  },
  firebase: {
    roomF: roomRef
  },
  methods: {
    joinRoom (roomKey, awayFacebookID, matchWatche) {
      if (awayFacebookID === '') {
        roomRef.child(roomKey).update({ awayFacebookID: this.profile.id, awayFacebookName: this.profile.name })
        this.joinKey = roomKey
      } else if (awayFacebookID !== '') {
        roomRef.child(roomKey).update({ matchWatcher: matchWatche + 1 })
        this.joinKey = roomKey
      }
    },
    getProfile () {
      let vm = this
      FB.api('/me', function (response) {
        console.log(response)
        vm.$set(vm, 'profile', response)
      })
    },
    login () {
      let vm = this
      FB.login(function (response) {
        vm.statusChangeCallback(response)
      }, {scope: 'publish_actions'})
    },
    logout () {
      let vm = this
      FB.logout(function (response) {
        vm.statusChangeCallback(response)
      })
    },
    statusChangeCallback (response) {
      let vm = this
      vm.ready = true
      vm.re = false
      console.log('statusChangeCallback')
      console.log(response)
      console.log(vm.re)
      if (response.status === 'connected') {
        vm.authorized = true
        vm.getProfile()
        vm.getAlbums()
        vm.getNext()
        vm.getPre()
        vm.realAlbum(this.page)
      } else if (response.status === 'not_authorized') {
        vm.authorized = false
      } else {
        vm.authorized = false
      }
    }
  },
  mounted () {
    let vm = this
    // window.fbAsyncInit = () => {
    FB.init({
      appId: '365137310495361',
      cookie: true,
      xfbml: true,
      version: 'v2.8'
    })
    FB.getLoginStatus(function (response) {
      vm.statusChangeCallback(response)
    })
    // }
  }
}
</script>

<style>



</style>
