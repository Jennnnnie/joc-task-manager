export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Work':
      return 'bg-mint';
    case 'Personal':
      return 'bg-lilac';
    case 'Events':
      return 'bg-bluebell';
    case 'Important':
      return ''; // Use an icon for important tasks
    default:
      return 'bg-gray-300'; // Default color for unknown categories
  }
};
