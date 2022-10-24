import { render, waitFor } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('Renders', () => {
    render(<CartCount count={10} />);
  });

  it('Matches Snapshot', () => {
    const { container } = render(<CartCount count={17} />);
    expect(container).toMatchSnapshot();
  });

  it('Update via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={17} />);
    expect(container.textContent).toBe('17');
    rerender(<CartCount count={25} />);
    await wait(2000);
    expect(container.textContent).toBe('25');
    expect(container).toMatchSnapshot();
  });
});
