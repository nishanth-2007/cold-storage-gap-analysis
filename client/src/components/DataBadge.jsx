import React from 'react';
import { ShieldCheck, Info, Clock, AlertTriangle, Building, Database } from 'lucide-react';

export default function DataBadge({ source, sourceType, sourceLastUpdated, lastVerified, className = "" }) {
  const type = sourceType || "Government";

  const getStyle = () => {
    switch (type) {
      case "Government":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          dot: "bg-emerald-500",
          icon: ShieldCheck,
          label: "Govt. Verified"
        };
      case "Owner Provided":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          dot: "bg-blue-500",
          icon: Building,
          label: "Live Owner Reported"
        };
      case "Platform Calculated":
        return {
          bg: "bg-purple-50 text-purple-800 border-purple-200",
          dot: "bg-purple-500",
          icon: Database,
          label: "GIS Algorithmic"
        };
      case "Demo Data":
      default:
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          dot: "bg-amber-500",
          icon: AlertTriangle,
          label: "Demo Data"
        };
    }
  };

  const style = getStyle();
  const Icon = style.icon;

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const updatedFormatted = formatDate(sourceLastUpdated);

  return (
    <div className={`inline-flex flex-wrap items-center gap-1.5 text-xs ${className}`}>
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border font-medium ${style.bg}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        <Icon className="w-3 h-3" />
        {style.label}
      </span>

      {source && (
        <span className="text-slate-500 text-[11px] truncate max-w-xs" title={`Source: ${source}`}>
          via {source}
        </span>
      )}

      {updatedFormatted && (
        <span className="text-slate-400 text-[11px] flex items-center gap-0.5" title="Last Synchronized">
          <Clock className="w-2.5 h-2.5" />
          {updatedFormatted}
        </span>
      )}
    </div>
  );
}
