import styled from 'styled-components/macro';

export const InputGroup = styled.div`
  display: flex;
  position: relative;
  width: 640px;
  min-width: 100%;
  @media (max-width: 660px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const Tooltip = styled.span`
  position: absolute;
  font-size: 14px;
  padding: 0px 10px;
  margin-top: 5px;
  color: ${({ formState, theme }) =>
    formState.error ? theme.tooltip.error : theme.tooltip.default};
`;

export const InputText = styled.div`
  box-sizing: border-box;
  padding: 20px 10px;
  font-size: 20px;
  width: 640px;
  min-width: 100%;
  @media (max-width: 660px) {
    width: 100%;
    text-align: center;
  }
`;

export const FormItem = styled.form`
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0px;
  }
  @media (max-width: 660px) {
    width: 100%;
  }
`;
