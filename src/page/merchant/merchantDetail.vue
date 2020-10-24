<template>
  <div>
    <div class="p_head">商户详情</div>

    <detailMode :rule-form="businessData" :config-data="configData" :is-show-edit-btn="true" @edit="itemEdit"></detailMode>
    <detailMode :rule-form="commonData" v-if="commonData.merchantType !== 'personal'" :config-data="configData2" @modify="editMask"></detailMode>
    <detailMode :rule-form="commonData" v-if="commonData.merchantType === 'personal'" :config-data="configData3" @modify="editMask"></detailMode>
    <el-drawer :visible.sync="editData" :with-header="false" size="500px">
      <div class="p_head">{{editDataTitle}}</div>
      <Form
          ref="liaisonRef"
          :form-base-data="contactConfigData"
          :show-foot-btn="contactConfigData.showFootBtn"
          :isDrawer="true"
          @confirm="confirm"
          @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>

<script>
import api from "@/api/api_merchant";
import Form from "@/components/form/index.vue";
import detailMode from "@/components/detailMode/detailMode2.vue";
import { CONTACTS_CONFIG } from "./formConfig/merchantDetailEdit"

export default {
  name: "MerchantDetail",
  components: { detailMode, Form },
  data() {
    return {
      openType: '',
      editData: false,
      merchantNo: '',
      commonData: {},
      businessData: {},
      ruleForm: {},
      contactConfigData: {},
      editDataTitle: '',
      configData: {
        name: "业务信息",
        items: [
          {
            name: "乐刷商户号",
            key: "leShuaMerchantNo"
          },
          {
            name: "所属服务商",
            key: "agentName"
          }
        ]
      },
      configData2: {
        name: "基本信息",
        items: [
          {
            name: "公司名称",
            key: "merchantName"
          },
          {
            name: "法人姓名",
            key: "lawPerson"
          },
          {
            name: "法人手机号",
            key: "lawMobile"
          },
          {
            name: "登陆账号",
            key: "loginAccount"
          },
          {
            name: "地址",
            key: "address"
          },
          {
            name: "营业执照编号",
            hideItem: false,
            key: "shopLicenseNo"
          },
          {
            name: "营业执照图",
            key: "shopLicenseImg",
            type: "image"
          },
          {
            name: "备注",
            key: "remark",
            type: "edit"
          }
        ]
      },
      configData3: {
        name: "基本信息",
        items: [
          {
            name: "公司名称",
            key: "merchantName"
          },
          {
            name: "法人姓名",
            key: "lawPerson"
          },
          {
            name: "法人手机号",
            key: "lawMobile"
          },
          {
            name: "登陆账号",
            key: "loginAccount"
          },
          {
            name: "地址",
            key: "address"
          },
          {
            name: "备注",
            key: "remark",
            type: "edit"
          }
        ]
      }
    };
  },
  created() {
    this.merchantNo = this.$route.query.merchantNo
    this.getCommonDetail()
    this.getBusiness()
  },
  mounted() {},
  methods: {
    getCommonDetail() {
      api.getDetailByMerchantNo({
        merchantNo: this.merchantNo
      }).then(res => {
        if (res.datas.merchantType === "personal") {
          this.configData2.items = this.configData2.items.filter(item => {
            if (item.key !== 'shopLicenseNo' && item.key !== 'shopLicenseImg') {
              return true
            }
          })
        }
        this.commonData = res.datas;
      }).catch();
    },
    getBusiness() {
      api.getBusinessDetail({
        merchantNo: this.merchantNo
      }).then(res => {
        this.businessData = res.datas
      })
    },
    itemEdit() {
      this.openType = 1
      this.editData = true
      this.editDataTitle = '业务信息'
      this.contactConfigData = CONTACTS_CONFIG.changeData
    },
    editMask() {
      this.openType = 2
      this.editData = true
      this.editDataTitle = '编辑备注'
      this.contactConfigData = CONTACTS_CONFIG.formData
    },
    confirm($data) {
      if (this.openType === 2) {
        if (!$data.remark) {
          this.$message({
            message: '请填写备注信息',
            type: 'warning'
          })
        } else {
          api.modifyRemark({
            merchantNo: this.merchantNo,
            remark: $data.remark
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getBusiness()
              this.getCommonDetail()
              this.editData = false
            }
          })
        }
      } else {
        if (!$data.agentNo) {
          this.$message({
            message: '请选择所属服务商',
            type: 'warning'
          })
        } else {
          api.saveBusinessInfo({
            merchantNo: this.merchantNo,
            agentNo: $data.agentNo
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getCommonDetail()
              this.getBusiness()
              this.editData = false
            }
          })
        }
      }
    },
    cancel() {
      this.editData = false
    }
  }
};
</script>

<style scoped></style>
