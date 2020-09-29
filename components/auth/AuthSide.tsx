import styled from "styled-components";

const Container = styled.section`
  height: 100%;
  flex: 11.8;
  background: #f3f6fa;
`;
const StyledSideImg = styled.img`
  width: 100%;
  height: 100%;
`;

const AuthSide = () => {
  return (
    <Container>
      <StyledSideImg src="https://source.unsplash.com/random" />
    </Container>
  );
};

export default AuthSide;
