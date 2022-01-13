export function formatDateMMDDYYY() {
  var date = new Date();
  var month = (date.getMonth()+1);
  var edate = date.getDate();
  return (month <= 9 ? '0'+month : month) + '/' + (edate <= 9 ? '0'+edate : edate)  + '/'+ date.getFullYear();
}

export function formatedTimeHHMM() {
  let date = new Date();
  var hours = date.getHours();
  var minutes:any = date.getMinutes();
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes;
  return strTime;
}
