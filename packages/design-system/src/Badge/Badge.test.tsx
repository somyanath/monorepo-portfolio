import { render, screen } from '@testing-library/react';
import { Badge } from '../index'; // via the public barrel — the seam

test('renders its children', () => {
  render(<Badge variant="success">Active</Badge>);
  expect(screen.getByText('Active')).toBeInTheDocument();
});
