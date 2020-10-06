import React from "react";
import styled, { css } from "styled-components";
import { AnchorHTMLAttributes } from "react";

const providers = {
  google: {
    src: "/static/svg/icon-google.svg",
  },
};

const fullWidthStyles = css`
  ${({ fullWidth }: { fullWidth: boolean }) =>
    fullWidth &&
    css`
      display: flex;
      width: 100%;
      height: auto;
      justify-content: center;
      border: 2px solid #e5e5e5;
      border-radius: 10px;
      font-weight: 900;
      font-size: 1.5rem;
      padding: 1.3rem 0;
      img {
        margin-right: 3.1rem;
      }
      &:not(:first-child) {
        margin-left: 0;
        margin-top: 1.6rem;
      }
    `}
`;

const Block = styled.a`
  /* 공통 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color: white;
  justify-content: center;
  align-items: center;

  /* 기타 */
  &:not(:first-child) {
    margin-left: 1.6rem;
  }

  ${fullWidthStyles}
`;
const Logo = styled.img``;

interface AuthSocialButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  fullWidth?: boolean;
  provider: string;
}

const AuthSocialButton = React.forwardRef(
  (
    {
      children,
      provider,
      fullWidth,
      onClick,
      href,
      ...rest
    }: AuthSocialButtonProps,
    ref
  ) => {
    return (
      <Block
        fullWidth={fullWidth}
        href={href}
        onClick={onClick}
        ref={ref}
        {...rest}
      >
        <Logo src={providers[provider].src} />
        {children}
      </Block>
    );
  }
);

export default AuthSocialButton;
