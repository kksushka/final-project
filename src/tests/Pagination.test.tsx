import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../Components/Pagination';

describe('Pagination', () => {
  it('disables Prev button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText(/← Prev/i)).toBeDisabled();
    expect(screen.getByText(/1 \/ 5/)).toBeInTheDocument();
  });

  it('disables Next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText(/Next →/i)).toBeDisabled();
  });

  it('calls onPageChange when clicking buttons', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText(/← Prev/i));
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText(/Next →/i));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
