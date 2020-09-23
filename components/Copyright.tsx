import styled from "styled-components";

const StyledCopyright = styled.p`
  font-family: "Maven-pro";
`;

const Copyright = () => {
  return (
    <StyledCopyright>
      ©2020. <a>Buzzer Beater.</a> All rights reserved.
    </StyledCopyright>
  );
};

export default Copyright;
