import areaData from "@/assets/data/areaData.ws";
import utils from "@/libs/kit/utils";
import store from "@/store";

export const AreaOption = () => {
  const areas = store.state.admin.userInfo.areas;
  const isAllArea = store.state.admin.userInfo.isAllArea;
  const areasArr = [];
  if (isAllArea === 1) {
    return areaData;
  }
  if (!utils.isString(areas)) {
    return areaData;
  }
  areas.split('|').forEach(areaCode => {
    const proviceCode = areaCode.substr(0, 3) + "000";
    const cityCode = areaCode.substr(0, 4) + "00";
    if (proviceCode === areaCode) {
      areasArr.push(proviceCode)
    } else if (cityCode === areaCode) {
      areasArr.push(proviceCode, cityCode)
    } else {
      areasArr.push(proviceCode, cityCode, areaCode)
    }
  })
  return utils.filterNestedArr2(areaData, 'children', filterCallback)
  function filterCallback($item) {
    if (areasArr.indexOf($item.value) > -1) {
      return true
    }
  }
}
