import styled from "styled-components";

const StyledLogo = styled.div`
  position: absolute;
  top: 28px;
  left: 78px;
  font-size: 2.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blue};
`;

const Logo = () => {
  return <StyledLogo>LOGO</StyledLogo>;
};

export default Logo;
