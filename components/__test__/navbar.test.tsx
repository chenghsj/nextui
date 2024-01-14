import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { Navbar } from '../navbar';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;

describe('Navbar', () => {
  it('should render avatar', async () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          name: 'Joe',
          image: 'joe_image@example.png',
          id: '12345',
          username: 'Joe',
          email: 'joe_image@example.com',
          emailVerified: new Date(),
          role: 'user',
          createdAt: new Date(),
        },
        expires: new Date(Date.now() + 3600000).toString(),
      },
      update: jest.fn(),
      status: 'authenticated',
    });

    render(<Navbar />);

    const navbar = screen.getByRole('navigation');
    const avatar = screen.getAllByRole('img', { name: /joe/i });

    expect(navbar).toHaveTextContent('Home');
    expect(avatar[0]).toBeTruthy();
  });

  it('should render get started button', async () => {
    mockUseSession.mockReturnValue({
      data: null,
      update: jest.fn(),
      status: 'unauthenticated',
    });

    render(<Navbar />);

    const navbar = screen.getByRole('navigation');
    const getStartButton = screen.getAllByRole('button', {
      name: /get started/i,
    });

    expect(navbar).toHaveTextContent('Home');
    expect(getStartButton[0]).toBeTruthy;
  });
});
