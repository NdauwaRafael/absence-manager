import React, {useState, Fragment, useEffect} from "react";
import {useAbsences} from "../../hooks/useAbsences";
import {truncateString} from "../../utils/helpers";
import DatePicker, {DayValue, DayRange, Day} from '@hassanmojab/react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

const absence_types = ['all', 'sickness', 'vacation'];

interface IFilter {
    startDate?: Date | null; // optional string property for startDate
    endDate?: Date | null; // optional string property for endDate
    type?: string | null; // optional array of string for types
}

export default function Home() {
    const [page, setPage] = useState(1);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState<IFilter>({
        startDate: null,
        endDate: null,
        type: 'all',
    });
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const datesFilters = (dates: DayRange) => {
        const date = {
            startDate: dates.to && dates.from ? new Date(`${dates?.from?.month}/${dates?.from?.day}/${dates?.from?.year}`).toISOString(): null,
            endDate: dates.from && dates.to ? new Date(`${dates?.to?.month}/${dates?.to?.day}/${dates?.to?.year}`).toISOString(): null,
        }
        return date;
    }

    const {
        loading,
        error,
        data: absences,
        getAbsences
    } = useAbsences();

    useEffect(()=>{
        getAbsences(page, 10 );
    }, []);

    useEffect(()=>{
        getAbsences(page, 10, {...filters, ...datesFilters(dayRange)});
    }, [filters, dayRange, page])

    // if (loading) return <><ListLoader /></>
    if (error) return <>Error: {error?.message}</>

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-3">
                <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
                    <div className="relative md:w-1/3">
                        <button
                            data-testid="drop-menu-button"
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="block p-2 w-4/5 capitalize inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button">
                            <span className="sr-only">Action button</span>
                            {
                                filters.type
                            }
                            <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>


                        <div data-testid="drop-down-menu" className={
                            `${filterOpen ? 'absolute' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`
                        }>
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    {
                                        absence_types.map((filter, index: number) => (
                                            <a onClick={() => {
                                                setFilters({
                                                    ...filters,
                                                    type: filter
                                                });
                                                setFilterOpen(false)
                                            }}
                                               data-testid={filter}
                                               key={`filter-${index}`}
                                               className="capitalize block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{filter}</a>
                                        ))
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative md:w-1/3">
                        <DatePicker data-testid="date-picker"
                                    inputPlaceholder="Select period range"
                                    value={dayRange}
                                    onChange={setDayRange}
                                    wrapperClassName="w-4/5"
                                    inputClassName="date-picker block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>

                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="table-search-users"
                               className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Search for users"/>
                    </div>
                </div>

                <div className="mb-3 text-gray-400">
                    Displaying {absences?.data?.length} of {absences?.total} absentees.
                </div>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Member
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type of absence
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Period
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Member note
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Admitter note
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        absences?.data?.length > 0 ?  absences?.data?.map((absence: any, index: number) => (
                            <tr key={`absence-${index}-${absence.userId}`}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={absence?.member?.image}
                                         alt={absence?.member?.name}/>
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{absence?.member?.name}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {
                                        absence.type
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    Between {absence.startDate} and {absence.endDate}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        truncateString(absence.memberNote)
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div
                                            className={`h-2.5 w-2.5 rounded-full mr-2 ${absence.confirmedAt ? 'bg-green-500' : 'bg-red-500'} `}></div>
                                        {
                                            absence.confirmedAt ? 'Confirmed' : 'Rejected'
                                        }
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        truncateString(absence.admitterNote)
                                    }
                                </td>
                            </tr>
                        )) :
                        <tr>
                            <td colSpan={6}>
                                <div className="text-gray-400 text-lg">
                                    No Absences found! Empty!
                                </div>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>

                <div className="mt-3 flex items-center mb-10">

                    <button
                        disabled={page === 1 || loading}
                        onClick={() => setPage(prevState => Math.max(prevState - 1, 0))}
                        className="disabled:opacity-30 cursor-pointer inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(prevState => prevState + 1)}
                        disabled={loading || page === absences.pages || absences.total === 0}
                        className="disabled:opacity-30 cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </button>

                </div>
            </div>
        </>
    )
}