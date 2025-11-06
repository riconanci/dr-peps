'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { getAllPeptides } from '@/lib/peptides';
import { normalizeSearchString } from '@/lib/normalize-search';

type Peptide = {
  id: string;
  name: string;
  dose: string;
  selectedDays: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  color: string;
};

type DaySchedule = {
  day: string;
  peptides: { name: string; dose: string; color: string }[];
};

const PEPTIDE_COLORS = [
  { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-300' },
  { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-300' },
  { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-300' },
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_ABBREV = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function CyclePlannerPage() {
  const [peptides, setPeptides] = useState<Peptide[]>([
    {
      id: '1',
      name: '',
      dose: '',
      selectedDays: [true, true, true, true, true, false, false], // Default: Mon-Fri
      color: '0',
    },
  ]);
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  
  // Autocomplete state
  const [focusedPeptideId, setFocusedPeptideId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  // Get all available peptides for autocomplete
  const allPeptides = useMemo(() => getAllPeptides(), []);
  
  // Generate suggestions for focused peptide
  const suggestions = useMemo(() => {
    if (!focusedPeptideId || !showSuggestions) return [];
    
    const focusedPeptide = peptides.find(p => p.id === focusedPeptideId);
    if (!focusedPeptide || !focusedPeptide.name.trim()) return [];
    
    const query = normalizeSearchString(focusedPeptide.name);
    
    return allPeptides
      .filter(p => {
        const nameMatch = normalizeSearchString(p.name).includes(query);
        const aliasMatch = p.aliases.some(alias => 
          normalizeSearchString(alias).includes(query)
        );
        return nameMatch || aliasMatch;
      })
      .slice(0, 6)
      .map(p => ({
        name: p.name,
        aliases: p.aliases
      }));
  }, [focusedPeptideId, peptides, allPeptides, showSuggestions]);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setFocusedPeptideId(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addPeptide = () => {
    if (peptides.length < 3) {
      setPeptides([
        ...peptides,
        {
          id: Date.now().toString(),
          name: '',
          dose: '',
          selectedDays: [true, true, true, true, true, false, false],
          color: peptides.length.toString(),
        },
      ]);
    }
  };

  const removePeptide = (id: string) => {
    setPeptides(peptides.filter((p) => p.id !== id));
  };

  const updatePeptide = (id: string, field: keyof Peptide, value: any) => {
    setPeptides(
      peptides.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };
  
  const selectSuggestion = (id: string, name: string) => {
    updatePeptide(id, 'name', name);
    setShowSuggestions(false);
    setFocusedPeptideId(null);
  };

  const toggleDay = (id: string, dayIndex: number) => {
    setPeptides(
      peptides.map((p) => {
        if (p.id === id) {
          const newDays = [...p.selectedDays];
          newDays[dayIndex] = !newDays[dayIndex];
          return { ...p, selectedDays: newDays };
        }
        return p;
      })
    );
  };

  const generateSchedule = () => {
    const newSchedule: DaySchedule[] = DAY_NAMES.map((day) => ({
      day,
      peptides: [],
    }));

    // Filter out peptides with no name
    const validPeptides = peptides.filter((p) => p.name.trim() !== '');

    validPeptides.forEach((peptide) => {
      peptide.selectedDays.forEach((isSelected, dayIndex) => {
        if (isSelected) {
          newSchedule[dayIndex].peptides.push({
            name: peptide.name,
            dose: peptide.dose,
            color: peptide.color,
          });
        }
      });
    });

    setSchedule(newSchedule);
    setShowSchedule(true);
  };

  const copyAsText = () => {
    let text = `Dr Peps Weekly Schedule\n\n`;
    text += `⚠️ Educational schedule only. Confirm with your healthcare provider.\n\n`;

    schedule.forEach((daySchedule) => {
      if (daySchedule.peptides.length > 0) {
        text += `${daySchedule.day}:\n`;
        daySchedule.peptides.forEach((peptide) => {
          if (peptide.dose) {
            text += `  • ${peptide.name} — ${peptide.dose}\n`;
          } else {
            text += `  • ${peptide.name}\n`;
          }
        });
        text += '\n';
      }
    });

    navigator.clipboard.writeText(text);
    alert('Schedule copied to clipboard!');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          ← Back to Tools
        </Link>
        <h1 className="text-3xl font-bold text-slate-100">Cycle Planner</h1>
        <p className="text-slate-300 leading-relaxed text-lg">
          Generate a simple weekly pattern to help organize peptide administration timing.
        </p>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg
            className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-yellow-200 font-medium leading-relaxed">
            This planner generates example schedules only. Your healthcare provider must
            determine actual dosing frequency, timing, and duration.
          </p>
        </div>
      </div>

      {/* Peptides */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Peptides</CardTitle>
            <span className="text-xs text-slate-400">Max 3 peptides</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Horizontal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {peptides.map((peptide, index) => {
              const colorScheme = PEPTIDE_COLORS[parseInt(peptide.color) % 3];
              return (
                <div
                  key={peptide.id}
                  className="bg-dark-700/50 rounded-lg p-4 space-y-4 border border-dark-600"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${colorScheme.bg} ${colorScheme.border} border-2`}
                      />
                      <span className="text-sm font-medium text-slate-300">
                        Peptide {index + 1}
                      </span>
                    </div>
                    {peptides.length > 1 && (
                      <button
                        onClick={() => removePeptide(peptide.id)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Name with Autocomplete */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-100 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., BPC-157"
                      value={peptide.name}
                      onChange={(e) => {
                        updatePeptide(peptide.id, 'name', e.target.value);
                        setFocusedPeptideId(peptide.id);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => {
                        setFocusedPeptideId(peptide.id);
                        if (peptide.name.trim()) {
                          setShowSuggestions(true);
                        }
                      }}
                      className="input-field w-full text-[16px]"
                      autoComplete="off"
                    />
                    
                    {/* Suggestions Dropdown */}
                    {focusedPeptideId === peptide.id && showSuggestions && suggestions.length > 0 && (
                      <div 
                        ref={suggestionsRef}
                        className="absolute z-10 w-full mt-1 bg-dark-800 border border-dark-600 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                      >
                        {suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => selectSuggestion(peptide.id, suggestion.name)}
                            className="w-full text-left px-3 py-2 hover:bg-dark-700 transition-colors border-b border-dark-700 last:border-b-0"
                          >
                            <div className="text-sm font-medium text-slate-100">
                              {suggestion.name}
                            </div>
                            {suggestion.aliases.length > 0 && (
                              <div className="text-xs text-slate-400 mt-0.5">
                                {suggestion.aliases.join(', ')}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dose */}
                  <div>
                    <label className="block text-sm font-medium text-slate-100 mb-1.5">
                      Dose
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 0.25 mg"
                      value={peptide.dose}
                      onChange={(e) => updatePeptide(peptide.id, 'dose', e.target.value)}
                      className="input-field w-full text-[16px]"
                    />
                  </div>

                  {/* Days */}
                  <div>
                    <label className="block text-sm font-medium text-slate-100 mb-2">
                      Days
                    </label>
                    <div className="grid grid-cols-7 gap-1">
                      {DAY_ABBREV.map((day, dayIndex) => (
                        <button
                          key={dayIndex}
                          type="button"
                          onClick={() => toggleDay(peptide.id, dayIndex)}
                          className={`h-10 rounded text-xs font-medium transition-all ${
                            peptide.selectedDays[dayIndex]
                              ? `${colorScheme.bg} ${colorScheme.border} ${colorScheme.text} border-2`
                              : 'bg-dark-800 border border-dark-600 text-slate-500 hover:border-slate-500'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Peptide Button */}
          {peptides.length < 3 && (
            <button
              onClick={addPeptide}
              className="w-full py-3 border-2 border-dashed border-dark-600 hover:border-primary-500/50 rounded-lg text-slate-300 hover:text-primary-400 transition-colors text-sm font-medium"
            >
              + Add Peptide
            </button>
          )}

          {/* Generate Button */}
          <button
            onClick={generateSchedule}
            className="btn-primary w-full"
            disabled={peptides.every((p) => p.name.trim() === '')}
          >
            Generate Schedule
          </button>
        </CardContent>
      </Card>

      {/* Generated Schedule */}
      {showSchedule && schedule.length > 0 && (
        <>
          {/* Reminder */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-purple-200 font-medium">
                Remember to confirm this schedule with your clinician before following it
              </p>
            </div>
          </div>

          {/* Export Bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-xl font-semibold text-slate-100">Your Weekly Schedule</h2>
            <button
              onClick={copyAsText}
              className="btn-secondary flex items-center gap-2"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy as Text
            </button>
          </div>

          {/* Schedule Display */}
          <Card>
            <CardContent className="pt-6">
              {/* Mobile: Accordion style */}
              <div className="md:hidden space-y-3">
                {schedule.map((daySchedule, dayIndex) => (
                  <div key={dayIndex} className="space-y-2">
                    <div className="font-medium text-slate-200 text-sm">
                      {daySchedule.day}
                    </div>
                    {daySchedule.peptides.length > 0 ? (
                      <div className="flex gap-2">
                        {daySchedule.peptides.map((peptide, pIndex) => {
                          const colorScheme =
                            PEPTIDE_COLORS[parseInt(peptide.color) % 3];
                          return (
                            <div
                              key={pIndex}
                              className={`${colorScheme.bg} ${colorScheme.border} ${colorScheme.text} border rounded-lg px-3 py-2 text-sm flex-1`}
                            >
                              <div className="font-medium">{peptide.name}</div>
                              <div className="text-xs opacity-90 mt-1 min-h-[16px]">
                                {peptide.dose || '\u00A0'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 pl-2">Rest day</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop: Grid */}
              <div className="hidden md:grid md:grid-cols-7 gap-3">
                {schedule.map((daySchedule, dayIndex) => (
                  <div key={dayIndex} className="space-y-2">
                    <div className="font-medium text-slate-200 text-sm text-center pb-2 border-b border-dark-600">
                      {daySchedule.day}
                    </div>
                    <div className="min-h-[80px]">
                      {daySchedule.peptides.length > 0 ? (
                        <div className="flex gap-1 h-full">
                          {daySchedule.peptides.map((peptide, pIndex) => {
                            const colorScheme =
                              PEPTIDE_COLORS[parseInt(peptide.color) % 3];
                            return (
                              <div
                                key={pIndex}
                                className={`${colorScheme.bg} ${colorScheme.border} ${colorScheme.text} border rounded px-2 py-2 text-xs flex-1 flex flex-col justify-center`}
                              >
                                <div className="font-medium truncate text-center">
                                  {peptide.name}
                                </div>
                                <div className="opacity-90 text-[10px] text-center mt-1 min-h-[12px]">
                                  {peptide.dose || '\u00A0'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 text-center pt-2">
                          —
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
