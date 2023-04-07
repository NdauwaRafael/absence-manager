import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import Home from './index';
import axios from "axios";

interface UseAbsencesResult {
    loading: boolean;
    error: any;
    data: any[];
    getAbsences: (page?: number, pageSize?: number, filters?: any) => Promise<void>;
}

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Absences component', () => {
    beforeEach(()=>{
        jest.mock('../../hooks/useAbsences', () => ({
            useAbsences: ()=>({
                loading: false,
                error: null,
                data: null,
                getAbsences: jest.fn()
            }),
        }));
    })

    it('should render correctly', () => {
        const { container } = render(<Home />);
        expect(container).toBeInTheDocument();
    });

    it('should open and close the filter dropdown when the button is clicked', () => {
        render(<Home />);
        const button = screen.getByTestId('drop-menu-button');
        const dropdown = screen.getByTestId('drop-down-menu');
        expect(dropdown).toHaveClass('hidden');
        fireEvent.click(button);
        expect(dropdown).not.toHaveClass('hidden');
        fireEvent.click(button);
        expect(dropdown).toHaveClass('hidden');
    });

    it('should set the type filter when a filter button is clicked', () => {
        render(<Home />);
        const button = screen.getByTestId('drop-menu-button');
        fireEvent.click(button);
        const sicknessFilter = screen.getByText('sickness');
        fireEvent.click(sicknessFilter);
        expect(button).toHaveTextContent('sickness');
    });

    // it('should call the getAbsences function with the correct arguments when the filters or date range change', async () => {
    //     render(<Home />);
    //     const { useAbsences } = jest.requireMock('../../hooks/useAbsences');
    //     const { getAbsences } = useAbsences();
    //
    //     const sicknessFilter = screen.getByTestId('sickness');
    //     fireEvent.click(sicknessFilter);
    //     await waitFor(() => {
    //         expect(getAbsences).toHaveBeenCalledWith(1, 10, { type: 'sickness', startDate: null, endDate: null });
    //     });
    //
    //     const allFilter = screen.getByTestId('all');
    //     fireEvent.click(allFilter);
    //     await waitFor(() => {
    //         expect(getAbsences).toHaveBeenCalledWith(1, 10, { type: 'all', startDate: null, endDate: null });
    //     });
    // });

});