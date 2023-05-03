import { Button, Divider, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Select } from 'chakra-react-select';

export const Container = styled.div`
  position: relative;
  border: 1px solid;
  border-radius: 12px;
  width: 417px;

  min-height: 650px;
  margin-top: 100px;
  padding-bottom: 100px;
  background-color: #fff;

  overflow: hidden;

  & label,
  & span {
    font-size: 14px;
    color: ${({ theme }) => theme.labelColor};
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;

  & > h5 {
    padding: 25px 0;
  }

  & > hr {
    color: ${({ theme }) => theme.outlineColor};
  }
`;
export const TitleDivider = styled(Divider)`
  color: ${({ theme }) => theme.outlineColor};
`;

export const BodyWrapper = styled.div`
  /* border: 1px solid; */
  padding: 10px 26px;

  & h2 {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 20px;
  }
`;
export const InputContainer = styled.div`
  margin-bottom: 30px;
  /* border: 1px solid; */
`;
export const ConfirmButton = styled(Button)`
  margin-top: 100px;
  width: 100%;
  background-color: ${({ theme }) => theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.outlineColor} !important;
  }
`;

export const FooterWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  width: 100%;
  height: 68px;
  background-color: ${({ theme }) => theme.gray50};

  & span {
    display: inline;
  }

  & > button {
    color: ${({ theme }) => theme.labelColor};
    font-weight: 700;
    font-size: 12px;
  }
`;

export const StyledSelect = styled(Select)`
  /* color: ${({ theme }) => theme.gray50}; */
  & #react-select-3-placeholder {
    color: ${({ theme }) => theme.labelColor};
  }
`;

export const JoinStepWrapper = styled.div`
  /* border: 1px solid; */
  display: flex;
  margin: 10px 20px 0;
`;

export const PhoneNumWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

// step3
export const ProfileWrapper = styled.div`
  /* display: flex; */
  margin-top: 20px;
`;

export const ProfileIMGWrapper = styled.div`
  margin-bottom: 30px;
`;

export const ProfileFigure = styled.figure`
  margin: 10px auto 10px;
  width: 150px;
  height: 150px;
  border: 1px solid ${({ theme }) => theme.outlineColor};
  border-radius: 6px;
  img {
    object-fit: contain;
  }
`;
export const SelectButton = styled.input`
  color: #d7a1b5;
`;

// complete
export const CompleteBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 500px;

  & > h1:nth-of-type(1) {
    margin-top: 50px;
  }
  & > p:nth-of-type(1) {
    margin-top: 50px;
  }
  & h1,
  p {
    /* margin-top: 50px; */
    display: flex;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
    text-align: center;
  }
`;

// export const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

export const CompleteButton = styled(ConfirmButton)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 60px;
  left: 0;
  /* width: 90%; */
`;
export const LottieWrapper = styled.div``;

// export const ConfirmButton = styled(Button)`
//   margin-top: 100px;
//   width: 100%;
//   background-color: ${({ theme }) => theme.primary};

//   &:hover {
//     background-color: ${({ theme }) => theme.outlineColor} !important;
//   }
