<template>
  <!-- <component v-bind:is="linkProps(to)"> -->
  <div @click="linkProps">
    <slot :to="to" />
  </div>
  <!-- </component> -->
</template>

<script>
import { isExternal } from "@/libs/kit/validate";

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps() {
      if (isExternal(this.to)) {
        console.log({
          is: "a",
          href: this.to,
          target: "_blank",
          rel: "noopener"
        });
      } else {
        this.$router.push({
          path: this.to
        });
      }
    }
  }
};
</script>
