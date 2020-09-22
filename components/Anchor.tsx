import React from "react";
import styled, { css } from "styled-components";
import { lighten, darken } from "polished";
import { AnchorHTMLAttributes } from "react";
import { theme } from "../lib/types";

const anchorSize = {
  large: {
    height: "3rem",
    fontSize: "1.25rem",
  },
  medium: {
    height: "2.25rem",
    fontSize: "1rem",
  },
  small: {
    height: "1.75rem",
    fontSize: "0.875rem",
  },
};
const sizeStyles = css`
  ${({ size }: { size: string }) =>
    css`
      height: ${anchorSize[size].height};
      font-size: ${anchorSize[size].fontSize};
    `}
`;

type ColorStylesProps = {
  theme?: theme;
  color?: string;
  outline?: boolean;
};
const colorStyles = css`
  ${({ theme, color }: ColorStylesProps) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${({ outline }: ColorStylesProps) =>
        outline === true &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${lighten(0.1, selected)};
            color: white;
          }
          &:active {
            background: ${darken(0.1, selected)};
            color: white;
          }
        `}
      ${({ outline }: ColorStylesProps) =>
        outline === false &&
        css`
          color: ${selected};
          background: none;
          border: none;
          &:hover {
            background: none;
            color: ${lighten(0.3, selected)};
          }
          &:active {
            background: none;
            color: ${darken(0.3, selected)};
          }
        `}
    `;
  }}
`;

const fullWidthStyles = css`
  ${({ fullWidth }: { fullWidth: boolean }) =>
    fullWidth &&
    css`
      display: flex;
      width: 100%;
      justify-content: center;
      &:not(:first-child) {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

const StyledAnchor = styled.a`
  /* 공통 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;

  /* 크기 */
  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  /* 기타 */
  &:not(:first-child) {
    margin-left: 1rem;
  }

  ${fullWidthStyles}
`;

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  color?: string;
  size?: string;
  outline?: boolean;
  fullWidth?: boolean;
}

const Anchor = React.forwardRef(
  (
    {
      children,
      color,
      size,
      outline,
      fullWidth,
      onClick,
      href,
      ...rest
    }: AnchorProps,
    ref
  ) => {
    return (
      <StyledAnchor
        href={href}
        onClick={onClick}
        ref={ref}
        color={color}
        size={size}
        outline={outline}
        fullWidth={fullWidth}
        {...rest}
      >
        {children}
      </StyledAnchor>
    );
  }
);

Anchor.defaultProps = {
  color: "blue",
  size: "medium",
};

export default Anchor;
