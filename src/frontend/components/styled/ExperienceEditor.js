import styled from 'styled-components';
import theme from '../theme';

const { borderRadius, borderShadow } = theme;

export const ExperienceEditorContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const Sidebar = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #ddd;
  max-width: 300px;
  height: 100%;
  align-items: baseline;
  padding: 20px 10px;
`;

export const Editor = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  position: relative;
  padding-top: 100px;
  background-color: #3c3c3c;
  background-image:
    linear-gradient(0deg,
      transparent 24%,
       rgba(255, 255, 255, 0.05) 25%,
       rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
       rgba(255, 255, 255, 0.05) 75%,
       rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent),
    linear-gradient(90deg,
      transparent 24%,
       rgba(255, 255, 255, 0.05) 25%,
       rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
       rgba(255, 255, 255, 0.05) 75%,
       rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent);
  background-size: 50px 50px;
`;

export const EditorOptions = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  right: 20px;
  background-color: white;
  border-radius: ${borderRadius}px;
  box-shadow: ${borderShadow};
`;
