<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(vnodes.push(<i class="el-icon-location"></i>));
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }

    vnodes.splice(1, 1);
    return vnodes;
  }
};
</script>
