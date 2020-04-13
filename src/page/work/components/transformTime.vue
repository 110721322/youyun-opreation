<template>
  <span class="time">
    {{ TimeString }}
  </span>
</template>
<script>
const pad = function (num, n) {
  var i = (num + "").length;
  while (i++ < n) num = "0" + num;
  return num;
}
export default {
  name: 'Time',
  components: { },
  props: ['time'],

  data () {
    return {
      TimeString: null
    }
  },
  mounted() {
    this.transform(this.time);
  },
  methods: {
    transform($time) {
      var intenval = setInterval(() => {
        var _time = new Date().getTime() - $time.getTime();
        if (_time <= 0) {
          this.TimeString = "00:00:00";
          clearInterval(intenval);
          return;
        }
        var _hours = Math.floor(_time / 1000 / 3600);
        var _mins = Math.floor((_time - _hours * 3600 * 1000) / 60 / 1000);
        var _secs = Math.floor((_time - _hours * 3600 * 1000 - _mins * 60 * 1000) / 1000);

        this.TimeString = pad(_hours, 2) + ":" + pad(_mins, 2) + ":" + pad(_secs, 2);
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
        .time {
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:#F5222D;
            line-height:22px;
        }
</style>
