//import React from 'react';

export const sortByDate = (items, key: string = null) => (items.sort((a, b) => {
    let _a = key && a[key] ? a[key] : a.date;
    let _b = key && b[key] ? b[key] : b.date;
    _a = _a.getTime ? _a : new Date(_a);
    _b = _b.getTime ? _b : new Date(_b);
    return _b.getTime() - _a.getTime();
}))

 
export const formatDateTime = (date) => {
    let correctDateFormat = date.getTime ? date : new Date(date);
    let options = {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    let formattedDate = new Intl.DateTimeFormat(undefined, options).format(correctDateFormat);

    return formattedDate;
}
 

export const stringToBoolean = (value) => {
    return (value === 'true' || value === true ? true : false);
}


export const isAdmin = (roles = []) => {
    // TODO: Update to reflect the defined admin roles
    return roles.includes('moderator');
}
