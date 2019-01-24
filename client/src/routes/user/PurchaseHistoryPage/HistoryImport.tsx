import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import * as moment from 'moment';
import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';
import {commitMutation, graphql} from 'react-relay';
import {Environment} from 'relay-runtime';
import Button from '../../../components/basic/Button';
import {serializeAsDateTime} from '../../../graphql/dateTime';
import {ProvidedEnvironmentProps, withEnvironment} from '../../../graphql/withEnvironment';
import {propsCompare} from '../../../react/propsCompare';
import {DateRange} from './DateRange';

interface Props {
    isLoaded: boolean,
    importedRange: DateRange | null
};

interface State {
    range: DateRange | null;
}

const purchaseHistoryImportStyles: StyleSheet<{}> = {
    form: {
        width: '30em',
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        gridGap: '.6em',
        alignItems: 'center',
        border: '0.1rem solid',
        padding: '1em'
    },
    submitButton: {
        gridColumn: '2 / 3'
    },
    calendarRoot: {
        flexDirection: 'column'
    }
};

class PurchaseHistoryImport extends React.Component<Props & WithStyles & ProvidedEnvironmentProps, State> {

    state: State = {
        range: null
    }

    componentDidUpdate(prevProps: Props) {
        const ifChanged = propsCompare(this.props, prevProps);
        ifChanged('isLoaded', () => {
            this.setState({range: this.props.importedRange});
        });
    }

    _handleRangeChange = (range: Date[] | null) =>
        this.setState({
            range: range ? {dateFrom: range[0], dateTo: range[1]} : null
        });

    _handleSaveClick = () => {
        //TODO: history listing doesn't gets updated with new imported items
        importPurchasesHistory(this.props.environment, this.state.range!);
    }

    render() {
        const {props, state} = this;
        const isRangeSelected = state.range !== null;
        //TODO: add "Account expired warning"
        return (
            <div className={`${props.classes.form}`}>
                <label>
                    Imported date range
                </label>
                <DateRangePicker
                    className={props.classes.calendarRoot}
                    value={state.range ? [state.range.dateFrom, state.range.dateTo] : null}
                    onChange={this._handleRangeChange}
                />
                <div className={props.classes.submitButton}>
                    <Button
                        disabled={!props.isLoaded || !isRangeSelected}
                        onClick={this._handleSaveClick}>
                        Import
                    </Button>
                </div>
            </div>
        );
    }
}

export default withEnvironment(
    injectSheet(purchaseHistoryImportStyles)(PurchaseHistoryImport)
);

const importPurchasesHistory = (environment: Environment, range: DateRange) => {
    return commitMutation(
        environment,
        {
            mutation: graphql`
                mutation HistoryImport_Mutation($input: PurchasesHistoryImportInput!) {
                    importPurchasesHistory(input: $input) {
                        importedRangeStart
                        importedRangeEnd
                    }
                }
            `,
            variables: {
                input: {
                    dateFrom: serializeAsDateTime(
                        moment(range.dateFrom).startOf('days').toDate()
                    ),
                    dateTo: serializeAsDateTime(
                        moment(range.dateTo).endOf('days').toDate()
                    )
                }
            }
        }
    );
};
