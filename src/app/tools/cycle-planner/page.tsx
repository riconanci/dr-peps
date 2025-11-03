'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function CyclePlannerPage() {
  const [daysPerWeek, setDaysPerWeek] = useState('5');
  const [totalWeeks, setTotalWeeks] = useState('4');
  const [schedule, setSchedule] = useState<string[][]>([]);

  const generateSchedule = () => {
    const days = parseInt(daysPerWeek);
    const weeks = parseInt(totalWeeks);

    if (isNaN(days) || isNaN(weeks) || days < 1 || days > 7 || weeks < 1 || weeks > 52) {
      return;
    }

    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const newSchedule: string[][] = [];

    for (let week = 1; week <= weeks; week++) {
      const weekDays: string[] = [];
      
      // Distribute doses evenly across the week
      const spacing = Math.floor(7 / days);
      let dayIndex = 0;
      
      for (let i = 0; i < days; i++) {
        weekDays.push(dayNames[dayIndex % 7]);
        dayIndex += spacing;
      }
      
      newSchedule.push(weekDays);
    }

    setSchedule(newSchedule);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4 no-print">
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Tools
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Cycle Planner</h1>
        <p className="text-gray-600 leading-relaxed">
          Generate a non-prescriptive schedule to help organize peptide administration timing.
        </p>
      </div>

      {/* Warning */}
      <div className="bg-danger-50 border border-danger-300 rounded-lg p-4 no-print">
        <p className="text-sm text-danger-900 font-medium">
          ⚠️ This planner generates example schedules only. Your healthcare provider must determine actual dosing frequency, timing, and duration.
        </p>
      </div>

      {/* Input Form */}
      <Card className="no-print">
        <CardHeader>
          <CardTitle>Schedule Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-700 mb-1">
              Days Per Week
            </label>
            <input
              id="daysPerWeek"
              type="number"
              min="1"
              max="7"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              className="block w-full md:w-48 rounded-lg border border-gray-300 px-4 py-2 text-[16px] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="mt-1 text-xs text-gray-500">Number of administration days (1-7)</p>
          </div>

          <div>
            <label htmlFor="totalWeeks" className="block text-sm font-medium text-gray-700 mb-1">
              Total Duration (weeks)
            </label>
            <input
              id="totalWeeks"
              type="number"
              min="1"
              max="52"
              value={totalWeeks}
              onChange={(e) => setTotalWeeks(e.target.value)}
              className="block w-full md:w-48 rounded-lg border border-gray-300 px-4 py-2 text-[16px] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="mt-1 text-xs text-gray-500">Schedule length (1-52 weeks)</p>
          </div>

          <button
            onClick={generateSchedule}
            className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            Generate Schedule
          </button>
        </CardContent>
      </Card>

      {/* Generated Schedule */}
      {schedule.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between no-print">
            <h2 className="text-xl font-semibold text-gray-900">Your Schedule</h2>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Print Schedule
            </button>
          </div>

          <div className="bg-warning-50 border border-warning-300 rounded-lg p-4 print-avoid-break">
            <p className="text-sm text-warning-900 font-medium">
              📋 Remember to confirm this schedule with your clinician before following it
            </p>
          </div>

          <div className="space-y-4">
            {schedule.map((weekDays, weekIndex) => (
              <Card key={weekIndex} className="print-avoid-break">
                <CardHeader>
                  <CardTitle>Week {weekIndex + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {weekDays.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="px-4 py-2 bg-primary-100 text-primary-800 font-medium rounded-lg"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Print-only disclaimer */}
          <div className="hidden print:block mt-8 pt-8 border-t-2 border-gray-300">
            <p className="text-sm font-medium">
              Educational schedule only. Confirm with your healthcare provider before use.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
