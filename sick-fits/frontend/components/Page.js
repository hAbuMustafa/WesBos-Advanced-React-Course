import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2');
    format('woff2');
    font-weight:normal;
    font-style: normal;
  }
  :root{
    --red: #ff0000;
    --black: #393939;
    --grey: #3a3a3a
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --font_stack: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
    font-size:62.5%;
  }

  *,*::before, *:after {
    box-sizing:inherit;
  }

  body {
    font-family: var(--font_stack);
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  a{
    text-decoration: none;
    color: var(--black);
  }
  a:hover{
    text-decoration: underline;
  }
  button{
    font-family: var(--font_stack);
  }
`;

const InnerStyles = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem;
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}
