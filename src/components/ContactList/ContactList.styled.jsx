import styled from '@emotion/styled';

export const ContactList = styled.li`
  display: flex;

  align-items: center;
  justify-content: space-between;
  height: 32px;
  min-width: 45%;
  text-align: center;
  padding: ${p => p.theme.space[2]}px;
  border-radius: ${p => p.theme.radii.normal};
  box-shadow: ${p => p.theme.shadows.items};

  background-color: #e5f36980;
  &:nth-of-type(2n + 1) {
    @media screen and (max-width: 767px) {
      background-color: #face7fad;
    }
  }
`;
export const Message = styled.h3`
  margin: 0 auto;
  font-size: ${p => p.theme.fontSizes.m};
  width: 312px;
  text-align: center;
`;
export const ContactBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${p => p.theme.borders.none};
  background-color: transparent;
  width: 26px;
  height: 26px;
  padding: 0;

  cursor: pointer;
  svg {
    fill: #ce2727;
    width: 26px;
    height: 26px;

    transition: fill 250ms linear;
    &:hover,
    &:focus {
      fill: #fa0000;
    }
  }
`;

export const ContactName = styled.span`
  margin-right: ${p => p.theme.space[2]}px;
  font-size: ${p => p.theme.fontSizes.m};
  font-weight: ${p => p.theme.fontWeights.bold};
`;
