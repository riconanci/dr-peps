import { EvidenceLevel, RiskLevel } from '@/types/peptides';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  
  const variantClasses = {
    default: 'bg-slate-700 text-slate-200 border border-slate-600',
    primary: 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
    success: 'bg-green-600/20 text-green-300 border border-green-600/30',
    warning: 'bg-yellow-600/20 text-yellow-300 border border-yellow-600/30',
    danger: 'bg-red-600/20 text-red-300 border border-red-600/30',
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  size?: 'sm' | 'md';
}

export function EvidenceBadge({ level, size = 'md' }: EvidenceBadgeProps) {
  const variantMap: Record<EvidenceLevel, 'success' | 'primary' | 'warning' | 'default'> = {
    Strong: 'success',
    Moderate: 'primary',
    Preliminary: 'warning',
    Anecdotal: 'default',
  };

  return (
    <Badge variant={variantMap[level]} size={size}>
      <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fillRule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clipRule="evenodd"
        />
      </svg>
      Evidence: {level}
    </Badge>
  );
}

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md';
}

export function RiskBadge({ level, size = 'md' }: RiskBadgeProps) {
  const variantMap: Record<RiskLevel, 'success' | 'warning' | 'danger' | 'default'> = {
    Low: 'success',
    Moderate: 'warning',
    High: 'danger',
    Unknown: 'default',
  };

  return (
    <Badge variant={variantMap[level]} size={size}>
      <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      Risk: {level}
    </Badge>
  );
}
