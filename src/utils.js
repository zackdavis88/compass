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
export const generateUrlWithQuery = (key, rawValue, url) => {
  const value = rawValue ? encodeURIComponent(rawValue) : rawValue;
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

// Title format will be: Compass - PAGE_NAME
export const setTitle = (pageName) => {
  document.title = `Compass - ${pageName}`;
};

// Stackoverflow to the rescue: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16)
  } : null;
};

// Formula found from stackoverflow: https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
export const calcTextColor = (backgroundColor) => {
  const rgbValues = hexToRgb(backgroundColor);
  // Shouldnt hit this case ever...but just in-case. Default to black text.
  if(!rgbValues)
    return "#000000";

  const {red, green, blue} = rgbValues;
  if((red*0.299 + green*0.587 + blue*0.114) > 130)
    return "#000000";
  else
    return "#FFFFFF";
};

export const updateQueryString = (key, value) => {
  const newUrl = generateUrlWithQuery(key, value);
  history.replaceState({path: newUrl}, "", newUrl);
};

export const onHeaderClick = (headerIndex) => {
  if(headerIndex === 0)
    return updateQueryString("activeTab", null);
  
  updateQueryString("activeTab", headerIndex);
};
