<template>
  <div class="page_box">


    <div class="errPage-container">
      <el-button class="pan-back-btn" @click="back">
        返回
      </el-button>
      <el-row>
        <el-col :span="12">
          <h1 class="text-jumbo text-ginormous">
            权限不足!
          </h1>
          <h2>你没有权限去该页面</h2>
          <ul class="list-unstyled">
            <li>或者你可以去:</li>
            <li class="link-type">
              <router-link to="/index">
                回首页
              </router-link>
            </li>

          </ul>
        </el-col>
        <el-col :span="12">
          <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import errGif from '@/assets/img/401_images/401.gif';

export default {
    name: 'Page401',

    data () {
        return {
            errGif: errGif + '?' + +new Date(),
        };
    },
    methods: {
        back () {
            if (this.$route.query.noGoBack) {
                this.$router.push({path: '/dashboard'});
            } else {
                this.$router.go(-1);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;

    .pan-back-btn {
      color: #fff;
      background: #14a0ff;
      border: none !important;
    }

    .pan-gif {
      display: block;
      margin: 0 auto;
    }

    .pan-img {
      display: block;
      width: 100%;
      margin: 0 auto;
    }

    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }

    .list-unstyled {
      font-size: 14px;

      li {
        padding-bottom: 5px;
      }

      a {
        color: #14a0ff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .page_box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
  }

</style>
