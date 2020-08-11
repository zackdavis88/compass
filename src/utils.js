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

// Taken from stackoverflow: https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
export const generateUrlWithQuery = (key, value, url) => {
  if (!url) url = window.location.href;
  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
      hash;

  if (re.test(url)) {
      if (typeof value !== 'undefined' && value !== null) {
          return url.replace(re, '$1' + key + "=" + value + '$2$3');
      } 
      else {
          hash = url.split('#');
          url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
          if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
              url += '#' + hash[1];
          }
          return url;
      }
  }
  else {
      if (typeof value !== 'undefined' && value !== null) {
          var separator = url.indexOf('?') !== -1 ? '&' : '?';
          hash = url.split('#');
          url = hash[0] + separator + key + '=' + value;
          if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
              url += '#' + hash[1];
          }
          return url;
      }
      else {
          return url;
      }
  }
}

// Also ripped from stackoverflow: https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
export const generateObjectFromSearch = (searchString) => {
  if(!searchString)
    return {};
  const search = searchString.substring(1);
  return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value)})
};
