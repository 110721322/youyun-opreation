<template>
  <div>
    <div class="p_head">下级服务商信息</div>
    <div class="content">
      <div class="list-title">基本信息</div>
      <ul class="list-info">
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
          <div v-if="showName === true" class="modify" @click="clickChange">修改</div>
          <div v-if="showName === false" class="modify" @click="clickSave">保存</div>
          <div v-if="showName === false" class="modify" @click="clickCancle">取消</div>
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
      showName: true, // 是否展示名称
      ruleForm: {}, // 页面数据
      agentNo: '', // 服务商编号
      options: [], // 选择项列表
      loading: false // 加载
    }
  },
  mounted() {
    const agentNo = this.$route.query.agentNo
    this.getDeatil(agentNo)
  },
  methods: {
    // 获取服务商信息
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

    // 点击更换
    clickChange() {
      this.showName = false
    },

    // 点击保存
    clickSave() {
      this.showName = true
    },

    // 点击取消
    clickCancle() {
      if (!this.agentNo) {
        this.$message({
          message: '请选择上级服务商',
          type: 'warning'
        })
        return
      }
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
    },

    // 搜索服务商
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

  .list-title {
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eee;
    line-height: 54px;
    padding-left: 24px;
    font-weight: 500;
    color: #333335;
  }

  .list-info {
    display: flex;
    flex-wrap: wrap;
    padding: 24px 0 0 32px;
    background: #fff;

    li {
      display: flex;
      align-items: center;
      margin-bottom: 32px;
      width: 33%;
      font-size: 14px;
      line-height: 32px;

      span:nth-child(1) {
        color: #000;
        opacity: 0.85;
      }

      span:nth-child(2) {
        color: #606266;
      }

      .modify {
        padding-left: 20px;
        cursor: pointer;
        color: #1989fa;
      }
    }
  }
}
</style>
