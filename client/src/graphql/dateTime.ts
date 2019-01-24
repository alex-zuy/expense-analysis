import * as moment from 'moment';

export const serializeAsDate = (date: Date | null) =>
    date ? moment(date).format('YYYY-MM-DD') : null;

export const serializeAsDateTime = (date: Date | null) =>
    date ? date.toISOString() : null;

export const deserializeDate = (string: string) =>
    moment(string).toDate();
