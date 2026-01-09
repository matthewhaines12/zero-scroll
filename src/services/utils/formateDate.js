export const formatDateOnly = (isoDate) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoDate));
};

// Format date to short M/D format for chart axes
export const formatChartDate = (dateString) => {
  // Handle ISO date strings properly to avoid timezone issues
  const [year, month, day] = dateString.split('-').map(Number);
  return `${month}/${day}`;
};
