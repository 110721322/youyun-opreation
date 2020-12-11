<template>
  <section style="overflow: auto;background-color: #f0f2f5;">
    <div class="main_page">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="includeKeepAlive">
          <router-view />
        </keep-alive>
      </transition>
      <p class="law">杭州火脸科技有限公司 @Copyright 2020.All Rights Reserved.</p>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "AppMain",
  computed: {
    ...mapState({
      includeKeepAlive: (state) => state.admin.includeKeepAlive
    })
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.law {
  text-align: center;
  margin: 24px 0;
  color: #909399;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
//
</style>
