้<template>
    <div id="app">
      <div v-if="ready" class="">
        <div class="container">
          <div class="row profile">
            <div class="Fixed">
		          <div class="col-md-5">
			        <div class="profile-sidebar" v-for="room of roomF" v-bind:key="room['.key']" v-if="room['.key']==$route.params.id">
				      <!-- รูป user -->
            <div class="" v-if="room.hostFacebookID">
              <div class="profile-userpic">
                <img :src="'https://graph.facebook.com/' + room.hostFacebookID + '/picture?width=500'" alt="" class="img-responsive"></img>
              </div>
				      <!--ชื่อ-->
					      <div class="profile-usertitle-name" >
						      <a :href="'https://www.facebook.com/' + room.hostFacebookID" STYLE="text-decoration: none"><h3>{{ room.hostFacebookName }}</h3></a>
					      </div>
					      <div class="profile-usertitle-job">
						      <h4>Home</h4>
                  <h3>Win : {{ room.winHost }}</h3>
                </div>
                  <div v-if="profile.id == room.hostFacebookID">
                      <router-link to="/"><button @click="hostExit()">Exit </button></router-link>
                  </div>
                <div style="height: 65px;">
                  <hr>
                  <h3>Draw : {{ room.drawScore }}</h3>
                  <hr>
					      </div>

              </div>
              <div class="" v-else>
                <div class="profile-usertitle-job">
                  <img src="/static/warp.gif" alt="" width="100px"/>
                  <h4>Host has left this room</h4>
                </div>
              </div>
            </div>
            <div class="profile-sidebar" v-for="room of roomF" v-bind:key="room['.key']" v-if="room['.key']==$route.params.id">
            <!-- รูป user -->
          <div class="" v-if="room.awayFacebookID">
            <div class="profile-userpic">
              <img :src="'https://graph.facebook.com/' + room.awayFacebookID + '/picture?width=500'" alt="" class="img-responsive"></img>
            </div>
            <!--ชื่อ-->
              <div class="profile-usertitle-name" v-if="authorized">
                <a :href="'https://www.facebook.com/' + room.awayFacebookID" STYLE="text-decoration: none"><h3>{{ room.awayFacebookName }}</h3></a>
              </div>
              <div class="profile-usertitle-job">
                <h4>Away</h4>
                <h3>Win : {{ room.winAway }}</h3>
              </div>
              <div v-if="profile.id == room.awayFacebookID">
                  <router-link to="/"><button @click="awayExit()">Exit </button></router-link>
              </div>
            </div>
            <div class="" v-else>
              <div class="profile-usertitle-job">
                <img src="/static/warp.gif" alt="" width="100px"/>
                <h4>Away</h4>
              </div>
            </div>
          </div>
			    </div>
		    </div>
        <div class="col-md-3">
        </div>
		    <div class="col-md-9">
          <div class="profile-content">
            <div>
            <!-- <router-view :id="id"></router-view> -->

            <div class="" >
              <div class="row" v-for="room of roomF" v-bind:key="room['.key']" v-if="room['.key']==$route.params.id">
                <div v-if="room.winStatus === '1' || room.winStatus === 'draw'">
                    {{alertWin()}}
                </div>
                <h1>{{ room.roomName }}</h1>
                <h2>Round : {{ room.round }}</h2>
                <h3>Your are "{{ whoAreUF(profile.id) }}"</h3>
                <div v-if="room.awayFacebookID == ''">
                    <h3>Waiting for another player</h3>
                </div>
                <div v-if="room.matchEnd !== '1' && room.awayFacebookID !== ''">
                  <h3>{{turnCheck(room.playerTurn, profile.id)}}</h3>
                </div>
                <div v-if="room.matchEnd == '1' && room.winStatus == 0 && room.hostVote + room.awayVote !== 2">
                    <button @click="reMatchVote()">Rematch</button> ({{ room.hostVote + room.awayVote }} / 2)
                </div>
                <div v-if="room.hostVote + room.awayVote === 2">
                    {{reMatch()}}
                </div>
                <table border="1" style="margin: auto; font-family: 'Raleway'; font-size: 50px;" >
                  <tr >
                    <td @click="markCell1(room.clickStatus, room.playerTurn, room.hostStatus, profile.id, room.hostFacebookID, room.cell1, room.awayStatus, room.awayFacebookID)" width="100px" height="100px">{{room.cell1}}</td>
                    <td @click="markCell2(room.clickStatus, room.playerTurn, room.hostStatus, profile.id, room.hostFacebookID, room.cell2, room.awayStatus, room.awayFacebookID)" width="100px" height="100px">{{room.cell2}}</td>
                    <td @click="markCell3(room.clickStatus, room.playerTurn, room.hostStatus, profile.id, room.hostFacebookID, room.cell3, room.awayStatus, room.awayFacebookID)" width="100px" height="100px">{{room.cell3}}</td>
                  </tr>
                  <tr>
                    <td @click="markCell4(room.clickStatus, room.playerTurn, room.hostStatus, profile.id, room.hostFacebookID, room.cell4, room.awayStatus, room.awayFacebookID)" width="100px" height="100px">{{room.cell4}}</td>
                    <td @click="markCell5(room.clickStatus, room.playerTurn, room.hostStatus, profile.id, room.hostFacebookID, room.cell5, room.awayStatus, room.awayFacebookID)" width="100px" height="100px">{{room.cell5}}</td>
                    <td @click="markCell6(room.clickStatus, room.playerTurn, room.hostStatus, profile.id, room.hostFacebookID, room.cell6, room.awayStatus, room.awayFacebookID)" width="100px" height="100px">{{room.cell6}}</td>
                  </tr>
                  <tr>
                    <td @click="markCell7(room.clickStatus, room.playerTurn, room.hostStatus, profile.id, room.hostFacebookID, room.cell7, room.awayStatus, room.awayFacebookID)" width="100px" height="100px">{{room.cell7}}</td>
                    <td @click="markCell8(room.clickStatus, room.playerTurn, room.hostStatus, profile.id, room.hostFacebookID, room.cell8, room.awayStatus, room.awayFacebookID)" width="100px" height="100px">{{room.cell8}}</td>
                    <td @click="markCell9(room.clickStatus, room.playerTurn, room.hostStatus, profile.id, room.hostFacebookID, room.cell9, room.awayStatus, room.awayFacebookID)" width="100px" height="100px">{{room.cell9}}</td>
                  </tr>
                </table>
                <br>
                  Watcher : {{ room.matchWatcher }}
                  <div v-if="profile.id !== room.awayFacebookID && profile.id !== room.hostFacebookID">
                    <router-link to="/joinRoom"><button @click="watcherExit(room.matchWatcher)">Exit </button></router-link>
                  </div>
                <br>
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
import swal from 'sweetalert'

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
      whoAreU: '',
      turnC: ''
    }
  },
  firebase: {
    roomF: roomRef
  },
  methods: {
    watcherExit (matchWatche) {
      roomRef.child(this.$route.params.id).update({ matchWatcher: matchWatche - 1 })
      this.roomPlayerCheck()
    },
    turnCheck (turn, profileID) {
      var roomR = this.roomF.find(room => room['.key'] === this.$route.params.id)
      if (profileID === roomR.hostFacebookID || profileID === roomR.awayFacebookID) {
        if (turn === this.whoAreU) {
          this.turnC = 'Your turn'
          return this.turnC
        } else if (turn !== this.whoAreU) {
          this.turnC = 'Opponent\'s turn'
          return this.turnC
        }
      } else if (profileID !== roomR.hostFacebookID && profileID !== roomR.awayFacebookID) {
        if (roomR.hostStatus === 'O' && roomR.playerTurn === roomR.hostStatus) {
          this.turnC = roomR.hostFacebookName + '\'s turn'
          return this.turnC
        } else if (roomR.hostStatus === 'O' && roomR.playerTurn !== roomR.hostStatus) {
          this.turnC = roomR.awayFacebookName + '\'s turn'
          return this.turnC
        } else if (roomR.hostStatus === 'X' && roomR.playerTurn === roomR.hostStatus) {
          this.turnC = roomR.hostFacebookName + '\'s turn'
          return this.turnC
        } else if (roomR.hostStatus === 'X' && roomR.playerTurn !== roomR.hostStatus) {
          this.turnC = roomR.awayFacebookName + '\'s turn'
          return this.turnC
        }
      }
    },
    reMatch () {
      var roomR = this.roomF.find(room => room['.key'] === this.$route.params.id)
      roomRef.child(this.$route.params.id).update({ matchEnd: '0', clickStatus: 'enable', round: roomR.round + 1, cell1: '', cell2: '', cell3: '', cell4: '', cell5: '', cell6: '', cell7: '', cell8: '', cell9: '', awayVote: 0, hostVote: 0 })
      if (roomR.hostStatus === 'O') {
        roomRef.child(this.$route.params.id).update({ hostStatus: 'X', awayStatus: 'O', playerTurn: 'O' })
      } else if (roomR.hostStatus === 'X') {
        roomRef.child(this.$route.params.id).update({ hostStatus: 'O', awayStatus: 'X', playerTurn: 'O' })
      }
    },
    reMatchVote () {
      var roomR = this.roomF.find(room => room['.key'] === this.$route.params.id)
      if (this.profile.id === roomR.hostFacebookID && roomR.hostVote !== 1) {
        roomRef.child(this.$route.params.id).update({ hostVote: 1 })
      } else if (this.profile.id === roomR.awayFacebookID && roomR.awayVote !== 1) {
        roomRef.child(this.$route.params.id).update({ awayVote: 1 })
      }
    },
    roomPlayerCheck () {
      var roomR = this.roomF.find(room => room['.key'] === this.$route.params.id)
      if (roomR.hostFacebookID === '' && roomR.awayFacebookID === '') {
        roomRef.child(this.$route.params.id).remove()
      }
    },
    hostExit () {
      roomRef.child(this.$route.params.id).update({ hostFacebookID: '' })
      this.roomPlayerCheck()
    },
    awayExit () {
      roomRef.child(this.$route.params.id).update({ awayFacebookID: '', awayFacebookName: '' })
      this.roomPlayerCheck()
    },
    whoAreUF (profileID) {
      var roomR = this.roomF.find(room => room['.key'] === this.$route.params.id)
      if (profileID === roomR.hostFacebookID) {
        this.whoAreU = roomR.hostStatus
        return this.whoAreU
      } else if (profileID === roomR.awayFacebookID) {
        this.whoAreU = roomR.awayStatus
        return this.whoAreU
      } else if (profileID !== roomR.hostFacebookID && profileID !== roomR.awayFacebookID) {
        this.whoAreU = 'watcher'
        return this.whoAreU
      }
    },
    alertWin () {
      var roomR = this.roomF.find(room => room['.key'] === this.$route.params.id)
      if (roomR.hostStatus === 'O' && roomR.playerTurn === 'O' && roomR.clickStatus === 'enable' && roomR.winStatus !== 'draw') {
        swal({
          title: 'We have winner !!',
          closeOnClickOutside: false,
          text: roomR.awayFacebookName + ' win',
          icon: 'info'
        })
        roomRef.child(this.$route.params.id).update({ winAway: roomR.winAway + 1, matchEnd: '1', clickStatus: 'disable', winStatus: '0' })
      } else if (roomR.hostStatus === 'O' && roomR.playerTurn === 'X' && roomR.clickStatus === 'enable' && roomR.winStatus !== 'draw') {
        swal({
          title: 'We have winner !!',
          closeOnClickOutside: false,
          text: roomR.hostFacebookName + ' win',
          icon: 'info'
        })
        roomRef.child(this.$route.params.id).update({ winHost: roomR.winHost + 1, matchEnd: '1', clickStatus: 'disable', winStatus: '0' })
      } else if (roomR.hostStatus === 'X' && roomR.playerTurn === 'O' && roomR.clickStatus === 'enable' && roomR.winStatus !== 'draw') {
        swal({
          title: 'We have winner !!',
          closeOnClickOutside: false,
          text: roomR.hostFacebookName + ' win',
          icon: 'info'
        })
        roomRef.child(this.$route.params.id).update({ winHost: roomR.winHost + 1, matchEnd: '1', clickStatus: 'disable', winStatus: '0' })
      } else if (roomR.hostStatus === 'X' && roomR.playerTurn === 'X' && roomR.clickStatus === 'enable' && roomR.winStatus !== 'draw') {
        swal({
          title: 'We have winner !!',
          closeOnClickOutside: false,
          text: roomR.awayFacebookName + ' win',
          icon: 'info'
        })
        roomRef.child(this.$route.params.id).update({ winAway: roomR.winAway + 1, matchEnd: '1', clickStatus: 'disable', winStatus: '0' })
      } else if (roomR.winStatus === 'draw') {
        swal({
          title: 'Draw !!',
          closeOnClickOutside: false,
          icon: 'warning'
        })
        roomRef.child(this.$route.params.id).update({ drawScore: roomR.drawScore + 1, matchEnd: '1', clickStatus: 'disable', winStatus: '0' })
      }
    },
    checkWin () {
      var roomR = this.roomF.find(room => room['.key'] === this.$route.params.id)
      if (roomR.cell1 === roomR.cell2 && roomR.cell2 === roomR.cell3 && roomR.cell3 !== '' && roomR.cell2 !== '') {
        roomRef.child(this.$route.params.id).update({ cell4: '', cell5: '', cell6: '', cell7: '', cell8: '', cell9: '', winStatus: '1' })
      } else if (roomR.cell4 === roomR.cell5 && roomR.cell5 === roomR.cell6 && roomR.cell5 !== '' && roomR.cell6 !== '') {
        roomRef.child(this.$route.params.id).update({ cell1: '', cell2: '', cell3: '', cell7: '', cell8: '', cell9: '', winStatus: '1' })
      } else if (roomR.cell7 === roomR.cell8 && roomR.cell8 === roomR.cell9 && roomR.cell9 !== '' && roomR.cell8 !== '') {
        roomRef.child(this.$route.params.id).update({ cell1: '', cell2: '', cell3: '', cell4: '', cell5: '', cell6: '', winStatus: '1' })
      } else if (roomR.cell1 === roomR.cell4 && roomR.cell4 === roomR.cell7 && roomR.cell7 !== '' && roomR.cell4 !== '') {
        roomRef.child(this.$route.params.id).update({ cell2: '', cell3: '', cell5: '', cell6: '', cell8: '', cell9: '', winStatus: '1' })
      } else if (roomR.cell2 === roomR.cell5 && roomR.cell5 === roomR.cell8 && roomR.cell5 !== '' && roomR.cell8 !== '') {
        roomRef.child(this.$route.params.id).update({ cell1: '', cell3: '', cell4: '', cell6: '', cell7: '', cell9: '', winStatus: '1' })
      } else if (roomR.cell3 === roomR.cell6 && roomR.cell6 === roomR.cell9 && roomR.cell6 !== '' && roomR.cell9 !== '') {
        roomRef.child(this.$route.params.id).update({ cell1: '', cell2: '', cell4: '', cell5: '', cell7: '', cell8: '', winStatus: '1' })
      } else if (roomR.cell1 === roomR.cell5 && roomR.cell5 === roomR.cell9 && roomR.cell5 !== '' && roomR.cell9 !== '') {
        roomRef.child(this.$route.params.id).update({ cell2: '', cell3: '', cell4: '', cell6: '', cell7: '', cell8: '', winStatus: '1' })
      } else if (roomR.cell3 === roomR.cell5 && roomR.cell5 === roomR.cell7 && roomR.cell5 !== '' && roomR.cell7 !== '') {
        roomRef.child(this.$route.params.id).update({ cell1: '', cell2: '', cell4: '', cell6: '', cell8: '', cell9: '', winStatus: '1' })
      } else if (roomR.cell1 !== '' && roomR.cell2 !== '' && roomR.cell3 !== '' && roomR.cell4 !== '' && roomR.cell5 !== '' && roomR.cell6 !== '' && roomR.cell7 !== '' && roomR.cell8 !== '' && roomR.cell9 !== '') {
        roomRef.child(this.$route.params.id).update({ winStatus: 'draw' })
      }
    },
    markCell1 (clickStatus, playerTurn, hostStatus, profileID, hostFacebookID, cell, awayStatus, awayFacebookID) {
      if (playerTurn === 'O' && hostStatus === 'O' && profileID === hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell1: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && hostStatus === 'O' && profileID !== hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell1: 'X', playerTurn: 'O' })
        this.checkWin()
      }
      if (playerTurn === 'O' && awayStatus === 'O' && profileID === awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell1: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && awayStatus === 'O' && profileID !== awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell1: 'X', playerTurn: 'O' })
        this.checkWin()
      }
    },
    markCell2 (clickStatus, playerTurn, hostStatus, profileID, hostFacebookID, cell, awayStatus, awayFacebookID) {
      if (playerTurn === 'O' && hostStatus === 'O' && profileID === hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell2: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && hostStatus === 'O' && profileID !== hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell2: 'X', playerTurn: 'O' })
        this.checkWin()
      }
      if (playerTurn === 'O' && awayStatus === 'O' && profileID === awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell2: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && awayStatus === 'O' && profileID !== awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell2: 'X', playerTurn: 'O' })
        this.checkWin()
      }
    },
    markCell3 (clickStatus, playerTurn, hostStatus, profileID, hostFacebookID, cell, awayStatus, awayFacebookID) {
      if (playerTurn === 'O' && hostStatus === 'O' && profileID === hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell3: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && hostStatus === 'O' && profileID !== hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell3: 'X', playerTurn: 'O' })
        this.checkWin()
      }
      if (playerTurn === 'O' && awayStatus === 'O' && profileID === awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell3: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && awayStatus === 'O' && profileID !== awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell3: 'X', playerTurn: 'O' })
        this.checkWin()
      }
    },
    markCell4 (clickStatus, playerTurn, hostStatus, profileID, hostFacebookID, cell, awayStatus, awayFacebookID) {
      if (playerTurn === 'O' && hostStatus === 'O' && profileID === hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell4: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && hostStatus === 'O' && profileID !== hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell4: 'X', playerTurn: 'O' })
        this.checkWin()
      }
      if (playerTurn === 'O' && awayStatus === 'O' && profileID === awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell4: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && awayStatus === 'O' && profileID !== awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell4: 'X', playerTurn: 'O' })
        this.checkWin()
      }
    },
    markCell5 (clickStatus, playerTurn, hostStatus, profileID, hostFacebookID, cell, awayStatus, awayFacebookID) {
      if (playerTurn === 'O' && hostStatus === 'O' && profileID === hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell5: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && hostStatus === 'O' && profileID !== hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell5: 'X', playerTurn: 'O' })
        this.checkWin()
      }
      if (playerTurn === 'O' && awayStatus === 'O' && profileID === awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell5: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && awayStatus === 'O' && profileID !== awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell5: 'X', playerTurn: 'O' })
        this.checkWin()
      }
    },
    markCell6 (clickStatus, playerTurn, hostStatus, profileID, hostFacebookID, cell, awayStatus, awayFacebookID) {
      if (playerTurn === 'O' && hostStatus === 'O' && profileID === hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell6: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && hostStatus === 'O' && profileID !== hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell6: 'X', playerTurn: 'O' })
        this.checkWin()
      }
      if (playerTurn === 'O' && awayStatus === 'O' && profileID === awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell6: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && awayStatus === 'O' && profileID !== awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell6: 'X', playerTurn: 'O' })
        this.checkWin()
      }
    },
    markCell7 (clickStatus, playerTurn, hostStatus, profileID, hostFacebookID, cell, awayStatus, awayFacebookID) {
      if (playerTurn === 'O' && hostStatus === 'O' && profileID === hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell7: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && hostStatus === 'O' && profileID !== hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell7: 'X', playerTurn: 'O' })
        this.checkWin()
      }
      if (playerTurn === 'O' && awayStatus === 'O' && profileID === awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell7: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && awayStatus === 'O' && profileID !== awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell7: 'X', playerTurn: 'O' })
        this.checkWin()
      }
    },
    markCell8 (clickStatus, playerTurn, hostStatus, profileID, hostFacebookID, cell, awayStatus, awayFacebookID) {
      if (playerTurn === 'O' && hostStatus === 'O' && profileID === hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell8: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && hostStatus === 'O' && profileID !== hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell8: 'X', playerTurn: 'O' })
        this.checkWin()
      }
      if (playerTurn === 'O' && awayStatus === 'O' && profileID === awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell8: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && awayStatus === 'O' && profileID !== awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell8: 'X', playerTurn: 'O' })
        this.checkWin()
      }
    },
    markCell9 (clickStatus, playerTurn, hostStatus, profileID, hostFacebookID, cell, awayStatus, awayFacebookID) {
      if (playerTurn === 'O' && hostStatus === 'O' && profileID === hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell9: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && hostStatus === 'O' && profileID !== hostFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell9: 'X', playerTurn: 'O' })
        this.checkWin()
      }
      if (playerTurn === 'O' && awayStatus === 'O' && profileID === awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell9: 'O', playerTurn: 'X' })
        this.checkWin()
      } else if (playerTurn === 'X' && awayStatus === 'O' && profileID !== awayFacebookID && cell === '' && awayFacebookID !== '' && clickStatus === 'enable') {
        roomRef.child(this.$route.params.id).update({ cell9: 'X', playerTurn: 'O' })
        this.checkWin()
      }
    },
    getProfile () {
      let vm = this
      FB.api('/me', function (response) {
        console.log(response)
        vm.$set(vm, 'profile', response)
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

</style>
