import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

describe('<Product/>', () => {
  it('renders out title and price tag', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // debug();

    // 'screen' mocks the displayed webpage. And provides testing for finding the existence of what you want
    const priceTag = screen.getByText('$50');
    debug(priceTag);
    expect(priceTag).toBeInTheDocument();

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/product/abc123');
    debug(link);
  });

  it('Renders and matches the snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('Renders the image properly', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    const img = screen.getByAltText(product.name);
    debug(img);
    expect(img).toBeInTheDocument();
  });
});
