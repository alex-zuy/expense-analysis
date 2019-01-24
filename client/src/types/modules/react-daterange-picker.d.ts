declare module "@wojtekmaj/react-daterange-picker" {

    import * as React from 'react';
    import {CalendarProps} from 'react-calendar';

    type PickedProps = Pick<
        CalendarProps,
        'returnValue' | 'minDate' | 'maxDate' | 'className'
    >;

    type ValueType = Date[] | null;

    interface Props extends PickedProps {
        value: ValueType,
        onChange(value: ValueType | null): void
    }

    const DateRangePicker: React.ComponentType<Props>;

    export default DateRangePicker;
}
