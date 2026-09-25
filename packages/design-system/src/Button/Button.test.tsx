import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../index'; // via the public barrel — the seam

test('renders its children', () => {
  render(<Button>Submit</Button>);
  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
});

test('defaults to type="button" so it never submits a form by accident', () => {
  render(<Button>Submit</Button>);
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
});

test('fires onClick', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Submit</Button>);
  await user.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledOnce();
});

test('icon-only button is accessible via its required aria-label', () => {
  render(<Button iconOnly aria-label="Close" />);
  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
});

test('disabled button does not fire onClick', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(
    <Button disabled onClick={onClick}>
      Submit
    </Button>,
  );
  await user.click(screen.getByRole('button'));
  expect(onClick).not.toHaveBeenCalled();
});
