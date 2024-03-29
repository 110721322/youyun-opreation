/**
 * 添加校验规则字典
 */
export const rules = {
  isRequired: (i) => {
    const readObj = i[0];
    const message = `请${readObj.keyType ? '选择' : '输入'}${readObj.keyName}`;
    const trigger = readObj.keyType ? 'change' : 'blur';
    const result = [{
      required: true,
      trigger,
      message
    }];
    return i.concat(result);
  },
  isSelected: (i) => {
    const readObj = i[0];
    const message = `请选择${readObj.keyName}`;
    const trigger = 'change';
    const result = [{
      required: true,
      trigger,
      message
    }];
    return result;
  },
  intNumber: (i) => {
    const result = [{
      trigger: 'change',
      message: '请输入正整数',
      pattern: /^[0-9]+$/
    }];
    return i.concat(result);
  },
  doubleFloat: (i) => {
    const result = [{
      pattern: /^\d+(\.\d{0,2})?$/,
      message: '请输入可带两位小数的正数',
      required: true
    }];
    return i.concat(result);
  },
  oneFloat: (i) => {
    const result = [{
      pattern: /^\d+(\.\d{0,1})?$/,
      message: '可带一位小数的正数',
      required: true,
    }];
    return i.concat(result);
  }
};
