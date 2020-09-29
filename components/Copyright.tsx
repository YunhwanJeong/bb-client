import styled from "styled-components";

const StyledCopyright = styled.p`
  font-family: "Maven-pro";
  position: absolute;
  bottom: 31px;
`;

const Copyright = () => {
  return (
    <StyledCopyright>
      ©2020. <a>Buzzer Beater.</a> All rights reserved.
    </StyledCopyright>
  );
};

export default Copyright;
