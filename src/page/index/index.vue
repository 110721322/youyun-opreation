<template>
  <div>
    <Form :form-base-data="formBaseData"></Form>
  </div>
</template>

<script>
import Form from "@/components/form/index.vue";
import { setRules } from "@/libs/kit/formFns.js";
import areaData from "@/assets/data/areaData";
export default {
  name: "",
  components: {
    Form
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      aaa: 23,
      formBaseData: [
        {
          type: 0,
          label: "姓名",
          key: "name",
          initVal: "pdd",
          rules: setRules("姓名").isRequired.get
        },
        {
          type: 6,
          label: "姓名",
          key: "pic",
          initVal: "pdd",
          rules: setRules("姓名").isRequired.get
        },
        {
          type: 7,
          label: "姓名",
          key: "Tin",
          initVal: "pdd",
          rules: setRules("姓名").isRequired.get
        },
        {
          type: 0,
          label: "年龄",
          key: "age",
          initVal: null,
          inputType: "number",
          rules: setRules("年龄").isRequired.intNumber.get.concat({
            trigger: "change",
            validator: function(rule, value, callback) {
              if (!value) {
                return callback(new Error("请输入年龄"));
              }
              if (value <= 0) {
                return callback(new Error("不能为负数"));
              }
              if (value > 150) {
                return callback(new Error("不能超过150"));
              }
              callback();
            }
          })
        },
        {
          type: 1,
          label: "擅长菜",
          key: "food",
          initVal: "",
          // urlOptions: {
          //     url: './demo.js',
          //     keyName: 'records',
          //     method: 'get'
          // }
          options: areaData
        },
        {
          type: 8,
          label: "地区",
          key: "address",
          initVal: [],
          // urlOptions: {
          //     url: './demo.js',
          //     keyName: 'records',
          //     method: 'get'
          // }
          options: areaData
        },
        {
          type: 1,
          label: "性别",
          key: "sex",
          initVal: "male",
          options: [
            {
              label: "男",
              value: "male"
            },
            {
              label: "女",
              value: "female"
            }
          ],
          rules: setRules("性别", 1).isRequired.get
        },
        {
          type: 2,
          label: "特长",
          key: "skill",
          initVal: [],
          options: [
            {
              label: "唱",
              value: 0
            },
            {
              label: "跳",
              value: 1
            },
            {
              label: "rap",
              value: 2
            },
            {
              label: "篮球",
              value: 3
            }
          ]
        },
        {
          type: 3,
          label: "出生日期",
          key: "birthday",
          initVal: null,
          dateType: "daterange"
        },
        {
          // index:
          type: 4,
          label: "是否加入会员",
          key: "isMember",
          initVal: true
        },
        {
          type: 5,
          label: "户口性质",
          key: "adressType",
          initVal: 0,
          options: [
            {
              label: "农村",
              value: 0
            },
            {
              label: "城市",
              value: 1
            }
          ]
        },
        {
          type: 0,
          label: "详情",
          key: "detail",
          initVal: "",
          inputType: "textarea",
          maxlength: 1000
        }
      ]
    };
  },
  created() {},
  methods: {
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss"></style>
