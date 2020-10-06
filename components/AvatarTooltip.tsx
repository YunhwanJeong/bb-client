import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: none;
  position: absolute;
  width: 232px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: white;
  top: 65px;
  right: -24px;
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    right: 35px;
    border: 10px solid white;
    border-color: transparent transparent white transparent;
  }
`;
const Block = styled.ul`
  width: 100%;
  height: 100%;
  padding: 2.5rem 3.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > *:not(:first-child) {
    margin-top: 1rem;
  }
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  &:nth-child(4) {
    margin-top: 1.8rem;
  }
`;
const Divider = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid black;
`;
const Icon = styled.img`
  width: 15px;
  height: 15px;
`;
const Text = styled.span`
  margin-left: 1.5rem;
`;

const AvatarTooltip = ({ onClick }: { onClick: () => Promise<void> }) => {
  return (
    <Container id="avatar-tooltip">
      <Block>
        <Link href="/profile">
          <a>
            <Item>
              <Icon src="/static/svg/icon-profile.svg" />
              <Text>프로필</Text>
            </Item>
          </a>
        </Link>
        <Divider />
        <Item>
          <Icon src="/static/svg/icon-edit.svg" />
          <Text>프로필 수정하기</Text>
        </Item>
        <Item>
          <Icon src="/static/svg/icon-upload.svg" />
          <Text>프로젝트 업로드</Text>
        </Item>
        <Divider />
        <Item onClick={onClick}>
          <Icon src="/static/svg/icon-logout.svg" />
          <Text>로그아웃</Text>
        </Item>
      </Block>
    </Container>
  );
};

export default AvatarTooltip;
