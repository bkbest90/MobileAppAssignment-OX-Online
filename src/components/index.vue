<template lang="html">
    <div id="app">
      <div class="container">
        <div class="row profile">
          <div class="col-md-3">
            <div class="Fixed">
              <div class="col-md-5">
                <div class="profile-sidebar">
                  <!-- รูป user -->
                  <div class="profile-userpic">
                    <img v-if="authorized" :src="'https://graph.facebook.com/' + this.profile.id + '/picture?width=500'" alt="" class="img-responsive"></img>
                    <img v-else="authorized" src="/static/warp.gif" class="img-responsive"></img>
                  </div>
                  <!--ชื่อ-->
                  <div class="profile-usertitle" v-if="authorized">
                    <div class="profile-usertitle-name">
                      <a :href="'https://www.facebook.com/' + this.profile.id" STYLE="text-decoration: none"><h3>{{ profile.name }}</h3></a>
                    </div>
                    <div class="profile-usertitle-job">
                      <h4>Facebook User</h4>
                    </div>
                  </div>
                  <div class="profile-usertitle" v-else="authorized">
                    <h4>Newbie</h4>
                  </div>
                  <!-- ปุ่ม Login-->
                  <div class="profile-userbuttons">
                    <button v-if="authorized" @click="logout()" class="btn btn-danger"><span class="glyphicon glyphicon-off"></span> Logout</button>
                    <button v-else="authorized" @click="login()" class="btn btn-primary"><i class="fa fa-facebook"></i> Sign in with Facebook</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="profile-content">
              <div class="row">
                <h1>OX game</h1><br>
                <div class="col-xs-6 col-md-3" style="width: 56%;">
                  <router-link to="/createRoom"><h4 ><img src="/static/create.png" @click="log()"></img><br></h4></router-link>
                    <h3>Create room</h3>
                </div>
                <div class="col-xs-6 col-md-3">
                    <router-link to="/joinRoom"><h4 ><img src="/static/joint.png" height="126 px"></img><br></h4></router-link>
                    <h3>Join room</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
/* global FB */
import Hello from './Hello'
export default {
  name: 'index',
  props: ['setIdPage'],
  components: {
    Hello
  },
  data () {
    return {
      pagename: [],
      profile: {},
      ready: false,
      re: true,
      authorized: false
    }
  },
  methods: {
    getProfilePhoto (albumId) {
      let vm = this
      FB.api('/' + albumId + '/photos', {fields: ['images']}, function (response) {
        console.log(response)
        vm.$set(vm, 'photos', response.data)
      })
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
@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");
html, body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #EDF7FF;
  text-align: center;
  padding: 30px;
}
.box {
  background-color: #2c3e50;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
}
.stylish-input-group .input-group-addon{
    background: white !important;
}
.stylish-input-group .form-control{
	border-right:0;
	box-shadow:0 0 0;
	border-color:#ccc;
}
.stylish-input-group button{
    border:0;
    background:transparent;
}
a.btn-social,
.btn-social {
    border-radius: 50%;
    color: #ffffff !important;
    display: inline-block;
    height: 54px;
    line-height: 54px;
    margin: 8px 4px;
    text-align: center;
    text-decoration: none;
    transition: background-color .3s;
    webkit-transition: background-color .3s;
    width: 54px;
}
.btn-social .fa,.btn-social i {
    backface-visibility: hidden;
    moz-backface-visibility: hidden;
    ms-transform: scale(1);
    o-transform: scale(1);
    transform: scale(1);
    transition: all .25s;
    webkit-backface-visibility: hidden;
    webkit-transform: scale(1);
    webkit-transition: all .25s;
}
.btn-social:hover,.btn-social:focus {
    color: #fff;
    outline: none;
    text-decoration: none;
}
.btn-social:hover .fa,.btn-social:focus .fa,.btn-social:hover i,.btn-social:focus i {
    ms-transform: scale(1.3);
    o-transform: scale(1.3);
    transform: scale(1.3);
    webkit-transform: scale(1.3);
}
.btn-social.btn-xs {
    font-size: 9px;
    height: 24px;
    line-height: 13px;
    margin: 6px 2px;
    width: 24px;
}
.btn-social.btn-sm {
    font-size: 13px;
    height: 36px;
    line-height: 18px;
    margin: 6px 2px;
    width: 36px;
}
.btn-social.btn-lg {
    font-size: 22px;
    height: 72px;
    line-height: 40px;
    margin: 10px 6px;
    width: 72px;
}
.btn-facebook {
    background-color: #3b5998;
}
.btn-facebook:hover {
    background-color: #4c70ba;
}
.disabled {
   pointer-events: none;
   cursor: default;
}
/* Profile container */
.profile {
  /*margin: -50px 0;*/
}
/* Profile sidebar */
.profile-sidebar {
  padding: 20px 0 10px 0;
  margin: -10px 0;
  background: #fff;
}
.profile-userpic img {
  float: none;
  margin: 0 auto;
  width: 50%;
  height: 50%;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}
.profile-usertitle {
  text-align: center;
  margin-top: 20px;
}
.profile-usertitle-name {
  color: #5a7391;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;
}
.profile-usertitle-job {
  text-transform: uppercase;
  color: #5b9bd1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}
.profile-userbuttons {
  text-align: center;
  margin-top: 10px;
}
.profile-userbuttons .btn {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 15px;
  margin-right: 5px;
}
.profile-userbuttons .btn:last-child {
  margin-right: 0px;
}
.profile-usermenu {
  margin-top: 30px;
}
.profile-usermenu ul li {
  border-bottom: 1px solid #f0f4f7;
}
.profile-usermenu ul li:last-child {
  border-bottom: none;
}
.profile-usermenu ul li a {
  color: #93a3b5;
  font-size: 14px;
  font-weight: 400;
}
.profile-usermenu ul li a i {
  margin-right: 8px;
  font-size: 14px;
}
.profile-usermenu ul li a:hover {
  background-color: #fafcfd;
  color: #5b9bd1;
}
.profile-usermenu ul li.active {
  border-bottom: none;
}
.profile-usermenu ul li.active a {
  color: #5b9bd1;
  background-color: #f6f9fb;
  border-left: 2px solid #5b9bd1;
  margin-left: -2px;
}
/* Profile Content */
.profile-content {
  background: #fff;
  height: 100%;
}

.breadcrumb {
    padding: 0px;
	background: #D4D4D4;
	list-style: none;
	overflow: hidden;
    margin-top: 20px;
}
.breadcrumb>li+li:before {
	padding: 0;
}
.breadcrumb li {
	float: left;
}
.breadcrumb li.active a {
	background: brown;                   /* fallback color */
	background-color: #2494be;
}
.breadcrumb li.completed a {
	background: brown;                   /* fallback color */
	background: hsla(153, 57%, 51%, 1);
}
.breadcrumb li.active a:after {
	border-left: 30px solid #2494be ;
}
.breadcrumb li.completed a:after {
	border-left: 30px solid hsla(153, 57%, 51%, 1);
}

.breadcrumb li a {
	color: white;
	text-decoration: none;
	padding: 10px 0 10px 45px;
	position: relative;
	display: block;
	float: left;
}
.breadcrumb li a:after {
	content: " ";
	display: block;
	width: 0;
	height: 0;
	border-top: 50px solid transparent;           /* Go big on the size, and let overflow hide */
	border-bottom: 50px solid transparent;
	border-left: 30px solid hsla(0, 0%, 83%, 1);
	position: absolute;
	top: 50%;
	margin-top: -50px;
	left: 100%;
	z-index: 2;
}
.breadcrumb li a:before {
	content: " ";
	display: block;
	width: 0;
	height: 0;
	border-top: 50px solid transparent;           /* Go big on the size, and let overflow hide */
	border-bottom: 50px solid transparent;
	border-left: 30px solid white;
	position: absolute;
	top: 50%;
	margin-top: -50px;
	margin-left: 1px;
	left: 100%;
	z-index: 1;
}
.breadcrumb li:first-child a {
	padding-left: 15px;
}
.breadcrumb li a:hover { background: #ffc107  ; }
.breadcrumb li a:hover:after { border-left-color: #ffc107   !important; }

.box {
  background-color: #FFFFFF;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
}
.roomBox {
  background-color: #FFFFFF;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}
.mynav {
    /*position: fixed;*/
    top: 0px;
    width: 100%;
}
.mynavbutt {
    /*position: fixed;*/
    padding-top: 3px;
    padding-left: 910px;
}
.Fixed {
    position: fixed;
    top: 70px;
    width: 700px;
}
.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 110px;
  margin: 1rem;
  position: relative;
  width: 300px;
  font-family: 'Raleway', sans-serif;
  font-size: 18px;
}
.card-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card-1:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
h1 {
  font-family: 'Raleway', cursive;
  font-size: 60px;
}
h2 {
  font-family: 'Raleway', cursive;
  font-size: 30px;
}
h3 {
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
}
h4 {
  font-family: 'Raleway', sans-serif;
  font-size: 15px;
}
h5 {
  font-family: 'Press Start 2P', cursive;;
  font-size: 20px;
  color: #656565;
}
li {
  font-family: 'Raleway';
  font-size: 15px;
}
.navbar-right{
    float: right !important;
    margin-right: 10px;
}
.swal-text {
  background-color: #FEFAE3;
  padding: 17px;
  border: 1px solid #F0E1A1;
  display: block;
  margin: 22px;
  text-align: center;
  color: #61534e;
}
table {
  border-collapse: collapse;
}
td {
  border: 5px solid #222;
}
td:first-of-type {
  border-left-color: transparent;
  border-top-color: transparent;
}
td:nth-of-type(2) {
  border-top-color: transparent;
}
td:nth-of-type(3) {
  border-right-color: transparent;
  border-top-color: transparent;
}
tr:nth-of-type(3) td {
  border-bottom-color: transparent;
}
</style>
