/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  background-color: red;

  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyled = styled.header`
  .bar {
    border-bottom: 10px solid var(--black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    border-bottom: 1px solid var(--black);
  }
`;

function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

export default function Header() {
  return (
    <HeaderStyled>
      <div className="bar">
        <Logo>
          <Link href="/">Sick Fits!</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <ClientOnly>
          <Search />
        </ClientOnly>
      </div>
      <Cart />
    </HeaderStyled>
  );
}
