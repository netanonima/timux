<script setup lang="ts">
import {onMounted, ref} from "vue";
import moment from "moment";

// window.electronAPI.sendMessage('Hello from App.vue!');

let now: any = ref(moment('00:00:00.000', 'HH:mm:ss.SSS'));
let timerRunning = ref(false);
let startingTime: any = ref();
let paused = ref(false);
let pauseTime: any = ref();

function stopTimer() {
  timerRunning.value = false;
}

function startTimer() {
  paused.value = false;
  startingTime.value = moment().add(1, 'hours');
  timerRunning.value = true;
}

function pauseTimer() {
  timerRunning.value = false;
  paused.value = true;
  pauseTime.value = now;
}

function unpauseTimer() {
  timerRunning.value = true;
  startingTime.value = moment().subtract(now.value);
  paused.value = false;
}

onMounted(() => {
  window.electronAPI.on0Shortcut(()=>{
    if(timerRunning.value==false){
      if(moment(now.value).format('HH:mm:ss.SS')!='00:00:00.00'){
        now.value=moment('00:00:00.000', 'HH:mm:ss.SSS');
      }else{
        startTimer();
      }
    }else{
      stopTimer();
    }
  });

  window.electronAPI.on1Shortcut(()=>{
    if(paused.value==true){
      unpauseTimer();
    }
    else if(timerRunning.value==true && paused.value==false){
      pauseTimer();
    }

  })


  setInterval(function(){
    if(timerRunning.value==true && paused.value==false) {
      now.value = moment().diff(startingTime.value);
    }
  }, 10);
});

</script>

<template>
  <div id="app">
    <!-- mediumseagreen cadetblue -->
    <div
        class="timer"
        :style="timerRunning==false && moment(now).format('HH:mm:ss.SS')!='00:00:00.00'?paused==false?{'color': 'mediumseagreen'}:{'color': 'powderblue'}:{'color': 'navajowhite'}"
    >
      <span v-if="moment(now).format('HH')!='00'">
        <span v-if="moment(now).format('HH').charAt(0)=='0'">
          {{ moment(now).format('H:mm:ss.SS') }}
        </span>
        <span v-else>
          {{ moment(now).format('HH:mm:ss.SS') }}
        </span>
      </span>
      <span v-if="moment(now).format('HH')=='00' && moment(now).format('mm')!='00'">
        <span v-if="moment(now).format('mm').charAt(0)=='0'">
          {{ moment(now).format('m:ss.SS') }}
        </span>
        <span v-else>
          {{ moment(now).format('mm:ss.SS') }}
        </span>
      </span>
      <span v-if="moment(now).format('HH')=='00' && moment(now).format('mm')=='00'">
        <span v-if="moment(now).format('ss').charAt(0)=='0'">
          {{ moment(now).format('s.SS') }}
        </span>
        <span v-else>
          {{ moment(now).format('ss.SS') }}
        </span>
      </span>
    </div>
    <!--
    <hr>
    <div>
      <span>
        <button v-if="timerRunning==true && paused==false" @click="pauseTimer()">
          pause
        </button>
        <button v-if="paused==true" @click="unpauseTimer()">
          unpause
        </button>
      </span>

      <span>
        <button v-if="timerRunning==true && paused==false" @click="stopTimer()">
          stop timer
        </button>

        <button v-if="timerRunning==false && paused==false" @click="startTimer()">
          <span v-if="moment(now).format('HH:mm:ss.SS')=='00:00:00.00'">
            start timer
          </span>
          <span v-else>
            restart timer
          </span>
        </button>
      </span>
    </div>
    -->
  </div>
</template>
<style>
@font-face {
  font-family: "PrStart";
  src: local("PrStart"), url(../../assets/fonts/PrStart.ttf) format("truetype");
}

#app{
  font-family: PrStart;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 42px;
  background-color: black;
  color: white;
  border: 0px;
}
hr{
  border: 1px solid white;
}
.timer{
  text-align: right;
  padding-right: 10px;
}
</style>