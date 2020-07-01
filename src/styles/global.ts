import { createGlobalStyle } from 'styled-components';

import imgBackground from '../assets/background.png';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    background: url(${imgBackground});
    color: white;
    font-family: 'Ubuntu', sans-serif;
  }
`;
