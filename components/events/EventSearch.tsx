"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Styles from "./search.module.css";

export default function SearchEvent() {
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const [dateType, setDateType] = useState<string>("");
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);    
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const router = useRouter();
    

    const handleDateTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const today = new Date();
        setDateRange(null);
        if (value === "1") {
            setFromDate(today);
            setToDate(today);
        } else if (value === "2") {
            const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
            setFromDate(firstDayOfWeek);
            setToDate(lastDayOfWeek);
        } else if (value === "3") {
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            console.log('firstDayOfMonth: ', firstDayOfMonth);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            setFromDate(firstDayOfMonth);
            setToDate(lastDayOfMonth);
        } else {
            setFromDate(null);
            setToDate(null);
        }
    };

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(fromDate && toDate) {
            router.push(`?from_date=${fromDate.toLocaleDateString("en-CA").split('T')[0]}&to_date=${toDate.toLocaleDateString("en-CA").split('T')[0]}`);
        }
    };

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const formattedValue =
        dateRange && dateRange[0] && dateRange[1]
            ? `${dateRange[0].toLocaleDateString("en-CA")} - ${dateRange[1].toLocaleDateString("en-CA")}`
            : "";

    return (
        <div className={Styles.searchEventWrap}>
            <form className={Styles.searchForm}>
                <h6>Search By</h6>
                <div className="row align-items-center g-3">
                    <div className="col-md-3">
                        <div className="form-group">
                            <select name="t" className={`form-select`}  value={dateType} onChange={(e) => {
                                setDateType(e.target.value);
                                handleDateTypeChange(e);
                            }}>
                                <option value="">--select--</option>
                                <option value="1">Today</option>
                                <option value="2">This Week</option>
                                <option value="3">This Month</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-auto d-flex align-items-center">
                        <span className="fw-bold">OR</span>
                    </div>

                    {/* Input Box */}
                    <div className="col-md-4 position-relative">
                        <input
                            type="text"
                            value={formattedValue}
                            placeholder="Select Date Range"
                            readOnly
                            onClick={() => setShowCalendar(true)}
                            onFocus={() => setShowCalendar(true)}
                            className={`form-control`}
                        />

                        {/* Popup Calendar */}
                        {showCalendar && (
                            <div className={Styles.calendarPopup} ref={calendarRef}>
                                <Calendar
                                    selectRange
                                    onChange={(value) => {
                                        const range = value as [Date, Date];
                                        setDateRange(value as [Date, Date]);
                                        setShowCalendar(false);
                                        setDateType('');
                                        setFromDate(range[0]);
                                        setToDate(range[1]);
                                    }}
                                    value={dateRange}
                                    showFixedNumberOfWeeks
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-md-2">
                        <button type="button" className="btn btn-danger w-100" onClick={handleSubmit}>Search</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
