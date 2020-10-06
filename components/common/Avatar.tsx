import Link from "next/link";
import styled from "styled-components";
import AvatarTooltip from "../AvatarTooltip";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 3rem;
  &:hover #avatar-tooltip {
    display: block;
  }
`;
const Box = styled.div`
  width: 38px;
  height: 38px;
  position: relative;
`;
const ProfileLink = styled.a`
  cursor: pointer;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Avatar = ({ onClick }: { onClick: () => Promise<void> }) => {
  return (
    <Container>
      <Box>
        <Link href="/profile">
          <ProfileLink>
            <Img src="/static/images/avatar.jpg" />
          </ProfileLink>
        </Link>
        <AvatarTooltip onClick={onClick} />
      </Box>
    </Container>
  );
};

export default Avatar;
