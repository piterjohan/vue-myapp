/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
*/
export function formatDate(inputDate, isoCountry = 'id-ID') {
    const date = new Date(inputDate);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(isoCountry, options);
    
    return formattedDate.replace(/\//g, '-');
  }