import dayjs from 'dayjs';

export function classnames(...args: string[]) {
  return args.join(' ');
}

export const taskTitle = (title: string) => {
  return title.length > 30 ? title.substring(0, 30).concat(' ...' + '더보기') : title;
};

export const teamOptions = [
  { value: '개발', label: '개발' },
  { value: '인사', label: '인사' },
  { value: '경영', label: '경영' },
  { value: '무역', label: '무역' },
  { value: '영업', label: '영업' },
  { value: '서비스', label: '서비스' },
  { value: '생산', label: '생산' },
  { value: '교육', label: '교육' },
  { value: '마케팅', label: '마케팅' },
  { value: '기타', label: '기타' },
];

export const getJoinCompanyYear = () => {
  const thisYear = dayjs().year();
  return [...Array(thisYear - 1899)].map((_v, i) => {
    if (i === 0)
      return {
        label: '연 선택',
        value: '',
      };
    return {
      label: thisYear - i,
      value: thisYear - i,
    };
  });
};
