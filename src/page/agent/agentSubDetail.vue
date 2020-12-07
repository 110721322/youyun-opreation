<template>
  <div>
    <div class="p-head">下级服务商信息</div>
    <div class="content">
      <div class="list_title">基本信息</div>
      <ul class="list_info">
        <li>
          <span>所属上级服务商：</span>
          <el-select
            v-if="showName === false"
            v-model="agentNo"
            clearable
            filterable
            remote
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.agentNo"
              :label="item.agentName"
              :value="item.agentNo"
            >
            </el-option>
          </el-select>
          <span v-if="showName === true">{{ ruleForm.parentAgentName }}</span>
          <div v-if="showName === true" class="modify" @click="on_change">修改</div>
          <div v-if="showName === false" class="modify" @click="on_save">保存</div>
          <div v-if="showName === false" class="modify" @click="on_cancle">取消</div>
        </li>
        <li>
          <span>账号类型：</span>
          <span>{{ ruleForm.bankAccountType }}</span>
        </li>
        <li>
          <span>公司名称：</span>
          <span>{{ ruleForm.agentName }}</span>
        </li>
        <li>
          <span>法人姓名：</span>
          <span>{{ ruleForm.personName }}</span>
        </li>
        <li>
          <span>法人手机号：</span>
          <span>{{ ruleForm.personMobile }}</span>
        </li>
        <li>
          <span>地区：</span>
          <span>{{ ruleForm.provinceName + ruleForm.cityName + ruleForm.areaName }}</span>
        </li>
        <li>
          <span>详细地址：</span>
          <span>{{ ruleForm.companyAddress }}</span>
        </li>
        <li>
          <span>邮箱：</span>
          <span>{{ ruleForm.email }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_agent.js"

export default {
  name: "AgentSubDetail",
  data() {
    return {
      showName: true,
      ruleForm: {},
      agentNo: '',
      options: [],
      loading: false
    }
  },
  mounted() {
    const agentNo = this.$route.query.agentNo
    this.getDeatil(agentNo)
  },
  methods: {
    getDeatil(agentNo) {
      api.subAgentDetail({
        agentNo: agentNo
      }).then(res => {
        if (res.data.bankAccountType === 'public') {
          res.data.bankAccountTypeCn = '对公'
        }
        if (res.data.bankAccountType === 'private') {
          res.data.bankAccountTypeCn = '对私'
        }
        var request = res.data;
        this.ruleForm = {
          agentName: request.agentName,
          personName: request.personName,
          personMobile: request.personMobile,
          parentAgentName: request.parentAgentName,
          businessType: request.businessType,
          email: request.email,
          companyAddress: request.companyAddress,
          provinceName: request.provinceName,
          cityName: request.cityName,
          areaName: request.areaName,
          bankAccountType: request.bankAccountType
        }
      })
    },
    on_change() {
      this.showName = false
    },
    on_cancle() {
      this.showName = true
    },
    on_save() {
      if (!this.agentNo) {
        this.$message({
          message: '请选择上级服务商',
          type: 'warning'
        })
      } else {
        api.updateParentAgentNo({
          agentNo: this.$route.query.agentNo,
          parentAgentNo: this.agentNo
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '更换上级服务商成功',
              type: 'success'
            })
          }
        })
        this.getDeatil(this.$route.query.agentNo)
        this.showName = true
      }
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        api.queryNamesByCondition({
          agentName: query
        }).then(res => {
          if (res.data) {
            this.options = res.data
          }
          this.loading = false
        })
      } else {
        this.options = [];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  padding: 24px 32px;
  .list_title {
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;
    line-height: 54px;
    padding-left: 24px;
    font-weight: 500;
    color: #333335;
  }
  .list_info {
    padding: 24px 0 0 32px;
    background: #ffffff;
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      align-items: center;
      width: 33%;
      margin-bottom: 32px;
      font-size: 14px;
      line-height: 32px;
      span:nth-child(1) {
        color: #000000;
        opacity: 0.85;
      }
      span:nth-child(2) {
        color: #606266;
      }
      .modify {
        padding-left: 20px;
        cursor: pointer;
        color: #1989FA;
      }
    }
  }
}
</style>
