import dayjs from 'dayjs';

export function classnames(...args: string[]) {
  return args.join(' ');
}

export const taskTitle = (title: string) => {
  return title.length > 30 ? title.substring(0, 30).concat(' ...' + '더보기') : title;
};

export const teamOptions = [
  { label: '개발', value: 'DEV' },
  { label: '인사', value: 'HR' },
  { label: '경영', value: 'MANAGEMENT' },
  { label: '무역', value: 'TRADE' },
  { label: '영업', value: 'SALES' },
  { label: '서비스', value: 'SERVICE' },
  { label: '생산', value: 'PRODUCTION' },
  { label: '교육', value: 'EDUCATION' },
  { label: '마케팅', value: 'MARKETING' },
  { label: '기타', value: 'OTHER' },
];

export const getJoinCompanyYear = () => {
  const thisYear = dayjs().year();
  return [...Array(thisYear - 1979)].map((_v, i) => {
    // if (i === 0)
    //   return {
    //     // label: '연 선택',
    //     // value: '',
    //   };
    return {
      label: thisYear - i,
      value: thisYear - i,
    };
  });
};
