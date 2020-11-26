<template>
  <div @click="linkProps">
    <slot :to="to" />
  </div>
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
      if (!isExternal(this.to)) {
        this.$router.push({
          path: this.to
        });
      }
    }
  }
};
</script>
