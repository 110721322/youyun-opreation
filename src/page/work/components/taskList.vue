<template>
  <div>
    <div v-if="openType === '30/1'" class="list-box">
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
          <el-button type="primary" class="btn" @click="clickCommunication(item)">立即沟通</el-button>
        </div>
        <!--        <template v-if="isCheck===true">-->
        <!--          <div class="mask"></div>-->
        <!--          <el-checkbox v-model="checkList[index]" class="checkbox-item" @change="changeCheckList"></el-checkbox>-->
        <!--        </template>-->
      </div>
    </div>
    <div v-if="openType === '1/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">商户结算失败</div>
        <div class="title">商户名称(ID):<span>{{ item.merchantName + '(' + item.merchantNo + ')' }}</span></div>
        <div class="title">所属服务商:<span>{{ item.agentName }}</span></div>
        <div class="title">交易通道:<span>{{ item.channelCode }}</span></div>
        <div class="title">金额:<span>{{ item.totalSettleAmount }}元</span></div>
        <div class="title">渠道商户号:<span>{{ item.channelMerchantNo }}</span></div>
        <div class="title">失败原因:<span>{{ item.failReason }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickSettleFail(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '2/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">商户入件审核</div>
        <div class="title">商户ID:<span>{{ item.merchantNo }}</span></div>
        <div class="title">商户名称:<span>{{ item.merchantName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickMerchantExamine(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '3/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">服务商到期</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">到期时间:<span>{{ item.expireDate }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickOverTime(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '4/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">佣金结算</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickSettleExamine(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '5/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">预约沟通</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">预约沟通时间:<span>{{ item.remindTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickSubscribe(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '6/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">新服务商沟通</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">开通时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickNewAgent(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '7/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">客单价异常</div>
        <div class="title">商户ID:<span>{{ item.merchantNo }}</span></div>
        <div class="title">商户名称:<span>{{ item.merchantName }}</span></div>
        <div class="title">所属服务商:<span>{{ item.agentName }}</span></div>
        <div class="title">客单价:<span>{{ item.perAmount }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickUnitPrice(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '8/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">交易数据异常</div>
        <div class="title">商户ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">商户名称:<span>{{ item.agentName }}</span></div>
        <div class="title">所属服务商:<span>{{ item.agentName }}</span></div>
        <div class="title">交易环比:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickTransaction(item)">立即沟通</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '9/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">服务商资料补全</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickAgentCompletion(item)">去补充</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '10/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">设备订购出库</div>
        <div class="title">订购物品:<span>{{ item.orderGoods }}</span></div>
        <div class="title">订购数量:<span>{{ item.count }}</span></div>
        <div class="title">订购服务商:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickStock(item)">去出库</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '11/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">工单</div>
        <div class="title">问题模块:<span>{{ item.questionModule }}</span></div>
        <div class="title">问题类型:<span>{{ item.questionType }}</span></div>
        <div class="title">问题内容:<span>{{ item.questionContent }}</span></div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickDistribution(item)">分配</el-button>
          <el-button type="primary" class="btn" @click="clickRelpyWork(item)">回复</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '12/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">乐刷申诉审核</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickLeSuhaExamine(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '13/1'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">平台资料申诉审核</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickChannelExamine(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '1/2'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">运营佣金结算</div>
        <div class="title">服务商ID:<span>{{ item.agentSettleRecord.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentSettleRecord.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickCommission(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '2/2'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">财务佣金结算</div>
        <div class="title">服务商ID:<span>{{ item.agentSettleRecord.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentSettleRecord.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickCommission(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '3/2'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">开通服务商</div>
        <div class="title">服务商ID:<span>{{ item.agent.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agent.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickOpenAgent(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '4/2'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">冻结服务商</div>
        <div class="title">服务商ID:<span>{{ item.agent.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agent.agentName }}</span></div>
        <div class="title">冻结原因:<span>{{ item.agent.reason }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickFrozenAgent(item)">去审核</el-button>
        </div>
      </div>
    </div>
    <div v-if="openType === '5/2'" class="list-box">
      <div
        v-for="(item,index) in listData"
        :key="index"
        class="item"
        :style="{height:cssConfig.itemHeight}"
      >
        <div class="list-status">短信群发申请</div>
        <div class="title">服务商ID:<span>{{ item.agentNo }}</span></div>
        <div class="title">服务商名称:<span>{{ item.agentName }}</span></div>
        <div class="title">创建时间:<span>{{ item.createTime }}</span></div>
        <div v-if="status === 'undo'" class="oper-box">
          <el-button type="primary" class="btn" @click="clickCommunication(item)">去审核</el-button>
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
    clickCommunication($data) {
      this.$emit("communication", $data);
    },

    clickReject($data) {
      this.$emit("reject", $data);
    },

    changeCheckList() {
      this.$emit("handleCheckList", this.checkList);
    },

    // 商户结算失败
    clickSettleFail($data) {
      this.$emit('settleFail', $data)
    },

    // 服务商到期
    clickOverTime($data) {
      this.$emit('overTime', $data)
    },

    // 商户入件审核
    clickMerchantExamine($data) {
      this.$emit('merchantExamine', $data)
    },

    // 佣金结算
    clickSettleExamine($data) {
      this.$emit('settleExamine', $data)
    },

    // 预约沟通
    clickSubscribe($data) {
      this.$emit('subscribe', $data)
    },

    // 新服务商沟通
    clickNewAgent($data) {
      this.$emit('newAgent', $data)
    },

    // 客单价异常
    clickUnitPrice($data) {
      this.$emit('unitPrice', $data)
    },

    // 交易数据异常
    clickTransaction($data) {
      this.$emit('transaction', $data)
    },

    // 服务商资料补全
    clickAgentCompletion($data) {
      this.$emit('agentCompletion', $data)
    },

    // 设备出库
    clickStock($data) {
      this.$emit('stock', $data)
    },

    // 工单 -分配
    clickDistribution($data) {
      this.$emit('distribution', $data)
    },

    // 工单 - 回复
    clickRelpyWork($data) {
      this.$emit('relpyWork', $data)
    },

    // 乐刷申诉审核
    clickLeSuhaExamine($data) {
      this.$emit('leSuhaExamine', $data)
    },

    // 平台资料商户审核
    clickChannelExamine($data) {
      this.$emit('channelExamine', $data)
    },

    // 财务佣金结算
    clickCommission($data) {
      this.$emit('commission', $data)
    },

    // 冻结服务商
    clickFrozenAgent($data) {
      this.$emit('frozenAgent', $data)
    },

    // 开通服务商
    clickOpenAgent($data) {
      this.$emit('openAgent', $data)
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
  justify-content: space-between;
  overflow: auto;

  .item {
    position: relative;
    margin-bottom: 24px;
    padding: 16px 24px;
    width: 48%;
    background: #fff;
    border-radius: 2px;

    .list-status {
      font-size: 14px;
      color: #000;
      font-weight: 500;
      margin-bottom: 6px;
      line-height: 22px;
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
      img {
        width: 92px;
        height: 92px;
      }
    }

    .btn {
      width: 109px;
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
  -webkit-box-orient: vertical;
}

.ellipsis3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
</style>
