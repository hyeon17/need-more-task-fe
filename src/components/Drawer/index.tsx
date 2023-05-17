import React, { useRef, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  FormLabel,
} from '@chakra-ui/react';
import * as S from '@/styles/calendar.styles';
import { useSideBarState } from '@/store/sideBarStore';
import { useRouter } from 'next/router';
import { useOverViewState } from '@/store/overViewStore';

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setStartAtStore, setEndAtStore } = useSideBarState();
  const { setSelectedProgress, setDisplayedData, setTotalPage,setCurrentPage } = useOverViewState();
  const btnRef = useRef<HTMLElement>(null);
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const router = useRouter();

  const handleSave = () => {
    startAt > endAt
      ? alert('시작일이 종료일보다 늦습니다.')
      : (setStartAtStore(startAt),
        setEndAtStore(endAt),
        setSelectedProgress('All'),
        setDisplayedData(null),
        setCurrentPage(0),
        setTotalPage(0),
        onClose(),
        router.push(`/tasks/period?startat=${startAt}&endat=${endAt}`));
  };

  return (
    <>
      <S.PeriodButton ref={btnRef} onClick={onOpen}>
        <S.CalendarIcons />
      </S.PeriodButton>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <S.CloseButton />
          <DrawerHeader>보고싶은 일정의 날짜를 선택하세요</DrawerHeader>
          <DrawerBody>
            <FormLabel htmlFor="Start_At">시작일</FormLabel>
            <S.InputWrapper type="date" id="Start_At" value={startAt} onChange={(e) => setStartAt(e.target.value)} />
            <FormLabel htmlFor="End_At">종료일</FormLabel>
            <S.InputWrapper type="date" id="End_At" value={endAt} onChange={(e) => setEndAt(e.target.value)} />
          </DrawerBody>
          <DrawerFooter>
            <S.CancelButton variant="outline" mr={3} onClick={onClose}>
              Cancel
            </S.CancelButton>
            <S.SaveButton onClick={handleSave}>Save</S.SaveButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
