import styled, { createGlobalStyle } from "styled-components";
import './assets/css/index.scss';

//css全局样式，reset.css
export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`

export const container = {
  display: 'flex'
};

export const navLeft = {
  height: 'calc(100vh)',
  background: '#001528',
  overflow: 'hidden'
};

export const main = {
  flex: 1,
  background: '#f1f3f5',
  height: 'calc(100vh)',
  overflow: 'auto'
};

export const content = {
  position: 'relative',
  // padding: '20px',
  height: 'calc(100vh-200px)'
};

export const CommonWrapper = styled.div`
  .simple-page{
    .header-top{
      background: #1890ff;
      color: #fff;

      .logo{
        line-height: 60px;
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        img{
          height: 45px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }
`