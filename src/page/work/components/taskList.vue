<template>
  <div>
    <div class="list-box" v-if="openType === '30/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="status">
          {{ item.status+":" }}
          <!--        <transformTime :time="item.time"></transformTime>-->
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="title">服务商ID:  {{ item.agentName }}</div>
        <div class="title">服务商ID:  {{ item.agentName }}</div>
<!--        <div class="detail" :style="{width:cssConfig.detailWidth}">-->
<!--          <div v-for="(item1,index1) in item.detail" :key="index1">-->
<!--            <div-->
<!--                v-if="item1.label==='失败原因'"-->
<!--                class="reason ellipsis"-->
<!--            >{{ item1.label ? item1.label+":"+item1.value :item1.value }}</div>-->
<!--            <div-->
<!--                v-else-if="item1.label==='发起人备注'"-->
<!--                class="note ellipsis3"-->
<!--            >{{ item1.label ? item1.label+":"+item1.value :item1.value }}</div>-->
<!--            <div v-else>{{ item1.label ? item1.label+":"+item1.value :item1.value }}</div>-->
<!--          </div>-->
<!--        </div>-->
        <div v-if="status === 'undo'" v-has="TASK_DEALT" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">立即沟通</el-button>
        </div>
<!--        <template v-if="isCheck===true">-->
<!--          <div class="mask"></div>-->
<!--          <el-checkbox v-model="checkList[index]" class="checkbox-item" @change="changeCheckList"></el-checkbox>-->
<!--        </template>-->
      </div>
    </div>
    <div class="list-box" v-if="openType === '1/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">商户结算失败</div>
        <div class="title">商户ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">商户名称:<span>{{ item.agentName }}</span></div>
        <div class="title">所属服务商:<span>{{ item.expireDate }}</span></div>
        <div class="title">交易通道:<span>{{ item.agentNo }}</span></div>
        <div class="title">金额:<span>{{ item.agentName }}元</span></div>
        <div class="title">渠道商户号:<span>{{ item.expireDate }}</span></div>
        <div class="title">失败原因:<span>{{ item.expireDate }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '2/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">商户入件审核</div>
        <div class="title">商户ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">商户名称:<span>{{ item.agentName }}</span></div>
        <div class="title">所属服务商:<span>{{ item.expireDate }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '3/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">服务商到期</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">到期时间:<span>{{ item.expireDate }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '4/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">佣金结算</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_settleExamine(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '5/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">预约沟通</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">预约沟通时间:<span>{{ item.remindTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '6/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">新服务商沟通</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">开通时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '7/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">客单价异常</div>
        <div class="title">商户ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">商户名称:<span>{{ item.agentName }}</span></div>
        <div class="title">所属服务商:<span>{{ item.agentName }}</span></div>
        <div class="title">客单价:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '8/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">交易数据异常</div>
        <div class="title">商户ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">商户名称:<span>{{ item.agentName }}</span></div>
        <div class="title">所属服务商:<span>{{ item.agentName }}</span></div>
        <div class="title">交易环比:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '9/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">服务商资料补全</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_agentCompletion(item)">去补充</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '10/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">设备订购出库</div>
        <div class="title">订购物品:<span>{{ item.orderGoods }}</span></div>
        <div class="title">订购数量:<span>{{ item.count }}</span></div>
        <div class="title">订购服务商:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_stock(item)">去出库</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '11/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">工单</div>
        <div class="title">问题模块:<span>{{ item.questionModule }}</span></div>
        <div class="title">问题类型:<span>{{ item.questionType }}</span></div>
        <div class="title">问题内容:<span>{{ item.questionContent }}</span></div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_distribution(item)">分配</el-button>
          <el-button type="primary" class="btn" @click="onClick_relpyWork(item)">回复</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '12/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">乐刷申诉审核</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_leSuhaExamine(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '13/1'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">平台资料申诉审核</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_channelExamine(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '1/2'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">运营佣金结算</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '2/2'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">财务佣金结算</div>
        <div class="title">服务商ID:<span>{{ item.agentSettleRecord.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentSettleRecord.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_commission(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '3/2'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">开通服务商</div>
        <div class="title">服务商ID:<span>{{ item.agent.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agent.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '4/2'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">冻结服务商</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="openType === '5/2'">
      <div
          v-for="(item,index) in listData"
          :key="index"
          class="item"
          :style="{height:cssConfig.itemHeight}"
      >
        <div class="list_status">短信群发申请</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="onClick_communication(item)">去审核</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import transformTime from "./transformTime";
import { TASK_DEALT } from "../../../libs/data/permissionBtns";

export default {
  name: "TaskList",
  // components: { transformTime },
  props: ["listData", "type", "cssConfig", "isCheck", "isCheckAll", "openType", "status"],

  data() {
    return {
      checkList: [],
      TASK_DEALT: TASK_DEALT
    };
  },
  watch: {
    isCheckAll: function($val) {
      if ($val === true) {
        this.checkList.forEach(($item, $index) => {
          this.$set(this.checkList, $index, true);
        });
      }
      this.changeCheckList();
    },
    listData: function($val) {
      this.checkList.length = this.listData.length;
      this.checkList.fill(false);
    }
  },
  mounted() {},
  methods: {
    onClick_communication($data) {
      this.$emit("communication", $data);
    },
    onClick_pass($data) {
      this.$emit("pass", $data);
    },
    onClick_reject($data) {
      this.$emit("reject", $data);
    },
    changeCheckList() {
      this.$emit("handleCheckList", this.checkList);
    },
    // 佣金结算
    onClick_settleExamine($data) {
      this.$emit('settleExamine', $data)
    },
    // 服务商资料补全
    onClick_agentCompletion($data) {
      this.$emit('agentCompletion', $data)
    },
    // 设备出库
    onClick_stock($data) {
      this.$emit('stock', $data)
    },
    // 工单 -分配
    onClick_distribution($data) {
      this.$emit('distribution', $data)
    },
    // 工单 - 回复
    onClick_relpyWork($data) {
      this.$emit('relpyWork', $data)
    },
    // 乐刷申诉审核
    onClick_leSuhaExamine($data) {
      this.$emit('leSuhaExamine', $data)
    },
    // 平台资料商户审核
    onClick_channelExamine($data) {
      this.$emit('channelExamine', $data)
    },
    // 财务佣金结算
    onClick_commission($data) {
      this.$emit('commission', $data)
    }
  }
};
</script>
<style lang="scss" scoped>
.list-box {
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  align-content: flex-start;
  overflow: auto;
  .item {
    position: relative;
    margin-bottom: 24px;
    padding: 16px 24px;
    width: 48%;
    height: 236px;
    background: #fff;
    border-radius: 2px;
    .list_status {
      font-size: 14px;
      color: #000000;
      font-weight: 500;
      margin-bottom: 6px;
      line-height: 22px;
    }
    &:nth-child(even) {
      margin-left: 24px;
    }
    .status {
      position: absolute;
      right: 24px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
      line-height: 22px;
    }
    .title {
      font-size: 14px;
      color: #909399;
      line-height: 22px;
      margin-bottom: 4px;
      span {
        padding-left: 6px;
      }
    }
    .detail {
      margin-top: 6px;
      width: 357px;
      height: 154px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
      line-height: 22px;
      .reason {
        width: 80%;
      }
      .note {
        width: 80%;
      }
    }
    .oper-box {
      position: absolute;
      bottom: 16px;
      right: 24px;
      img {
        width: 92px;
        height: 92px;
      }
    }
    .btn {
      width: 109px;
      height: 32px;
    }
    .btn_agree {
      width: 86px;
      height: 32px;
    }

    .btn_refuse {
      width: 86px;
      height: 32px;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      opacity: 0.5;
    }
    .checkbox-item {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
    }
  }
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ellipsis2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
}

.ellipsis3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
}
</style>
