export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getRiskColor(level: string) {
  switch (level?.toUpperCase()) {
    case 'LOW':
      return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    case 'MEDIUM':
      return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    case 'HIGH':
      return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    case 'CRITICAL':
      return 'text-red-500 bg-red-500/10 border-red-500/20';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  }
}

export function getPredictionColor(prediction: string) {
  switch (prediction?.toUpperCase()) {
    case 'BENIGN':
      return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    case 'SUSPICIOUS':
      return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    case 'MALICIOUS':
      return 'text-red-500 bg-red-500/10 border-red-500/20';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  }
}

export function formatConfidence(confidence: number) {
  return `${(confidence * 100).toFixed(1)}%`;
}

export function truncateUrl(url: string, maxLength: number = 50) {
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength - 3) + '...';
}
