export const SEARCH_CONFIG = [
  {
    type: 9,
    label: '筛选时间',
    defaultDateType: 'first',
    quickPickerType: 5,
    firstLabel: 'yesterday',
    key: 'date',
    span: 24,
    pickerOptions: {
      disabledDate: time => {
        const timeRange = 90 * 24 * 3600 * 1000;
        const date = new Date();
        const maxTime = date.getTime();
        const minTime = maxTime - timeRange;
        return time.getTime() < minTime || timeRange > maxTime
      }
    }
  }
]
