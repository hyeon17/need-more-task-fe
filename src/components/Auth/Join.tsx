// import React, { useState } from 'react';
// import * as A from '@/styles/auth.styles';
// import TitleLabel from './TitleLabel';
// import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
// import PasswordInput from './PasswordInput';
// import AuthInput from './AuthInput';
// import UploadImage from './UploadImage';
// import SelectDepartment from './SelectDepartment';

// export const inputProps = {
//   variant: 'flushed',
//   borderColor: 'outlineColor',
//   focusBorderColor: 'inputFocusColor',
// };

// function Join() {
//   // const [show, setShow] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleShowPassword = () => setShowPassword(!showPassword);
//   const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
//   const handleIsDuplicated = () => {
//     console.log('중복확인');
//   };

//   return (
//     <A.Container>
//       <TitleLabel title="회원가입" />
//       <A.BodyWrapper>
//         {/* 이미지 */}
//         {/* <UploadImage /> */}
//         {/* 이름 */}
//         <AuthInput label="이름" placeholder="이름을 입력하세요" inputProps={inputProps} />
//         {/* 이메일 */}
//         <AuthInput label="이메일" placeholder="이메일을 입력하세요" inputProps={inputProps} />
//         {/* 닉네임 */}
//         <A.InputContainer>
//           <label>닉네임</label>
//           <InputGroup size="md" variant="flushed">
//             <Input pr="4.5rem" placeholder="닉네임을 입력하세요" {...inputProps} />
//             <InputRightElement width="4.5rem">
//               <Button h="1.75rem" size="sm" onClick={handleIsDuplicated}>
//                 {/* {show ? '보기' : '숨기기'} */}
//                 중복 확인
//               </Button>
//             </InputRightElement>
//           </InputGroup>
//         </A.InputContainer>
//         {/* 부서 선택 */}
//         <SelectDepartment />

//         {/* 비밀번호 */}
//         <PasswordInput label="비밀번호" show={showPassword} handleClick={handleShowPassword} inputProps={inputProps} />
//         {/* 비밀번호 확인 */}
//         <PasswordInput
//           label="비밀번호 확인"
//           show={showConfirmPassword}
//           handleClick={handleShowConfirmPassword}
//           inputProps={inputProps}
//         />

//         <A.ConfirmButton colorScheme="teal" size="md">
//           회원가입
//         </A.ConfirmButton>
//       </A.BodyWrapper>
//     </A.Container>
//   );
// }

// export default Join;
import React from 'react';

function Join() {
  return <div>Join</div>;
}

export default Join;
