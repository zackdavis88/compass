const monthAbbreviations = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const formatDate = (timestampString) => {
  const timestamp = new Date(timestampString);
  const monthName = monthAbbreviations[timestamp.getMonth()];
  const dayNumber = timestamp.getDate();
  const fullYear = timestamp.getFullYear();
  return `${monthName} ${dayNumber}, ${fullYear}`;
};

export const getPermissionLevel = (roles) => {
  const {isAdmin, isManager, isDeveloper, isViewer} = roles;
  if(isAdmin)
    return "Admin";
  
  if(isManager)
    return "Manager";
  
  if(isDeveloper)
    return "Developer";
  
  if(isViewer)
    return "Viewer";

  return "None";
    
};
