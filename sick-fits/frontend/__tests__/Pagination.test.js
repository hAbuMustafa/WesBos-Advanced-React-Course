import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Pagination from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';

describe('<Pagination/>', () => {
  it('Displays a loading message', () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>
    );
    expect(container).toHaveTextContent('Loading');
  });

  it('renders pagination for 18 items', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    debug();
    expect(container).toHaveTextContent('of 9');
    expect(container).toMatchSnapshot();
  });

  it('disables the prev page on fisrt page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevBtn = screen.getByText(/prev/i);
    const nextBtn = screen.getByText(/next/i);
    expect(prevBtn).toHaveAttribute('aria-disabled', 'true');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'false');
  });

  it('disables the next page on last page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={9} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevBtn = screen.getByText(/prev/i);
    const nextBtn = screen.getByText(/next/i);
    expect(prevBtn).toHaveAttribute('aria-disabled', 'false');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'true');
  });

  it('enables next and prev page buttons on mid pages', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={2} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevBtn = screen.getByText(/prev/i);
    const nextBtn = screen.getByText(/next/i);
    expect(prevBtn).toHaveAttribute('aria-disabled', 'false');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'false');
  });
});
