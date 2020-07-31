<template>
  <div class="main_page">
    <el-date-picker
      v-model="month"
      style="float: left;"
      size="large"
      type="month"
      placeholder="选gs择月"
    />
  </div>
</template>

<script>
export default {
  data() {
  },
  mounted() {
    this.getData()
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

