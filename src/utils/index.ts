import dayjs from 'dayjs';
import { PriorityType, StatusType } from '@/constant/TaskOverview';
import { RoleType } from '@/constant/UserRole';

export function classnames(...args: string[]) {
  return args.join(' ');
}

export const taskTitle = (title: string) => {
  return title.length > 30 ? title.substring(0, 30).concat(' ...' + '더보기') : title;
};

export const setTagColor = (value: string) => {
  switch (value) {
    case StatusType.TODO:
      return 'errorColor';
    case StatusType.IN_PROGRESS:
      return 'warningColor';
    case StatusType.DONE:
      return 'successColor';
    case PriorityType.URGENT:
      return 'errorColor';
    case PriorityType.HIGH:
      return 'warningColor';
    case PriorityType.MEDIUM:
      return 'successColor';
    case PriorityType.LOW:
      return 'primary';
    default:
      return 'labelColor';
  }
};

export const setActionTextToKorean = (value: string) => {
  switch (value) {
    case 'DUE_DATE':
      return '마감일 설정';
    case 'ASSIGNEE':
      return '담당자 지정';
    case 'SET_STATUS':
      return '상태 변경';
    case 'SET_PRIORITY':
      return '우선순위';
    case 'DELETE_TASK':
      return '삭제하기';
    case 'EDIT_TASK':
      return '수정하기';
    default:
      return '예기치 못한 에러 발생';
  }
};

export const setStatusToKorean = (value: string) => {
  switch (value) {
    case StatusType.TODO:
      return '할 일';
    case StatusType.IN_PROGRESS:
      return '진행 중';
    case StatusType.DONE:
      return '완료';
    default:
      return '상태';
  }
};

export const setPriorityToKorean = (value: string) => {
  switch (value) {
    case PriorityType.URGENT:
      return '긴급';
    case PriorityType.HIGH:
      return '높음';
    case PriorityType.MEDIUM:
      return '중간';
    case PriorityType.LOW:
      return '낮음';
    default:
      return '우선순위';
  }
};

export function getKeyByValue(object: { [key: string]: any }, value: any): string | undefined {
  return Object.keys(object).find((key) => object[key] === value);
}

export const teamOptions = [
  { label: '개발', value: 'DEVELOPMENT' },
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

export const UserRoleEnum = (role: string | undefined) => {
  switch (role) {
    case RoleType.ADMIN:
      return '관리자';
    case RoleType.USER:
      return '일반 사용자';
    default:
      return '일반 사용자';
  }
};

export const formattedDate = <T extends string>(date: T) => {
  return dayjs(date).format('YYYY-MM-DD').toString();
};
