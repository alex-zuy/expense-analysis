import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import * as moment from 'moment';
import * as React from 'react';
import injectStyles, {StyleSheet, WithStyles} from 'react-jss';
import {createFragmentContainer, graphql, QueryRenderer, ReadyState} from 'react-relay';
import {HistoryListing_groups} from '../../../__generated__/HistoryListing_groups.graphql';
import {HistoryListing_groups_QueryResponse} from '../../../__generated__/HistoryListing_groups_Query.graphql';
import {serializeAsDateTime} from '../../../graphql/dateTime';
import {ProvidedEnvironmentProps, withEnvironment} from '../../../graphql/withEnvironment';
import {DateRange} from './DateRange';

interface HistoryListingProps extends ProvidedEnvironmentProps {
    availableRange: DateRange | null,
    isLoaded: boolean
};

interface HistoryListingState {
    selectedRange: DateRange | null,
    expandedGroups: string[]
}

class HistoryListingContainer extends React.Component<HistoryListingProps, HistoryListingState> {

    state: HistoryListingState = {
        selectedRange: null,
        expandedGroups: []
    };

    componentDidUpdate(prevProps: HistoryListingProps) {
        if (prevProps.availableRange === null && this.props.availableRange !== null) {
            const range = this.props.availableRange!;

            const oneWeekBeforeDateTo = moment(range.dateTo).subtract(1, 'weeks');
            const availableDateFrom = oneWeekBeforeDateTo.isAfter(range.dateFrom)
                ? oneWeekBeforeDateTo.toDate()
                : range.dateFrom;

            this.setState({
                selectedRange: {
                    dateFrom: availableDateFrom,
                    dateTo: range.dateTo
                }
            });
        }
    }

    _handleSelectedRangeChange = (selectedRange: DateRange | null) => {
        this.setState({selectedRange});
    }

    _handleExpandedGroupToggle = (groupId: string) => {
        this.setState(({expandedGroups}) => ({
            expandedGroups: expandedGroups.includes(groupId)
                ? expandedGroups.filter((group) => group !== groupId)
                : [...expandedGroups, groupId]
        }));
    }

    render() {
        const {props: outerProps, state} = this;
        const {selectedRange} = this.state;

        return (
            <QueryRenderer
                environment={outerProps.environment}
                query={selectedRange ?
                    graphql`
                        query HistoryListing_groups_Query($dateFrom: DateTime!, $dateTo: DateTime!) {
                            purchasesGroups(dateFrom: $dateFrom, dateTo: $dateTo) {
                                ...HistoryListing_groups
                            }
                        }
                    `
                    : null
                }
                variables={selectedRange ?
                    {
                        dateFrom: serializeAsDateTime(
                            moment(selectedRange.dateFrom).startOf('days').toDate()
                        ),
                        dateTo: serializeAsDateTime(
                            moment(selectedRange.dateTo).endOf('days').toDate()
                        )
                    }
                    : {}
                }
                render={({props}: ReadyState<HistoryListing_groups_QueryResponse>) => {
                    return (
                        <ViewFragment
                            isGroupsLoaded={Boolean(props)}
                            selectedRange={state.selectedRange}
                            availableRange={outerProps.availableRange}
                            groups={props && props.purchasesGroups || null}
                            expandedGroups={state.expandedGroups}
                            onExpandedGroupToggle={this._handleExpandedGroupToggle}
                            onSelectedRangeChange={this._handleSelectedRangeChange}
                        />
                    );
                }}
            />
        );
    }
};

export default withEnvironment(HistoryListingContainer);

interface ViewProps {
    isGroupsLoaded: boolean,
    availableRange: DateRange | null,
    selectedRange: DateRange | null,
    groups: HistoryListing_groups | null,
    expandedGroups: string[],
    onSelectedRangeChange: (range: DateRange | null) => void,
    onExpandedGroupToggle: (groupId: string) => void;
}

const styles: StyleSheet<ViewProps> = {
    container: {
        padding: '1em'
    },
    groupsList: {
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr 1fr',
        gridGap: '1em'
    },
    groupItem: {
        justifySelf: 'end'
    },
    groupItemsCount: {
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    groupItemsList: {
        gridColumn: '2 / 4',
        display: 'grid',
        gridTemplateColumns: '1fr repeat(4, max-content)',
        gridColumnGap: '1em',
        gridRowGap: '.3em'
    },
    groupItemAmount: {
        justifySelf: 'end'
    },
    groupItemPricePerUnit: {
        justifySelf: 'end'
    },
    groupItemPriceForAmount: {
        justifySelf: 'end'
    },
    selectedRange: {
        padding: '1em 0'
    },
    selectedRangeLabel: {
        marginRight: '1em',
    }
}

const View: React.SFC<ViewProps & WithStyles>  = (props) => {
    const onChangeRange = (range: Date[] | null) =>
        props.onSelectedRangeChange(range ? {dateFrom: range[0], dateTo: range[1]} : null);

    const {classes, availableRange, selectedRange} = props;

    return (
        <div className={classes.container}>
            <div className={classes.selectedRange}>
                <label className={classes.selectedRangeLabel}>
                    Your purchases history for period:
                </label>
                {/*TODO: this date picker does not support 'disabled' state */}
                <DateRangePicker
                    minDate={availableRange ? availableRange.dateFrom : undefined}
                    maxDate={availableRange ? availableRange.dateTo : undefined}
                    value={selectedRange ? [selectedRange.dateFrom, selectedRange.dateTo] : null}
                    onChange={onChangeRange}
                />
            </div>
            {props.isGroupsLoaded || (
                <div>
                    Loading...
                </div>
            )}
            <div className={classes.groupsList}>
                {props.groups && props.groups.map((group) => (
                    <React.Fragment key={group.id}>
                        <div>{new Date(group.purchasedAt).toLocaleString()}</div>
                        <div className={classes.groupItemsCount}
                            onClick={() => props.onExpandedGroupToggle(group.id)}>
                            {group.items.length} items
                        </div>
                        <div className={classes.groupItem}>{group.totalPrice.toFixed(2)}</div>
                        {props.expandedGroups.includes(group.id) && (
                            <div className={classes.groupItemsList}>
                                {group.items.map((item) => (
                                    <React.Fragment key={item.id}>
                                        <div>{item.product.name}</div>
                                        <div className={classes.groupItemAmount}>{item.amount}</div>
                                        <div>*</div>
                                        <div className={classes.groupItemPricePerUnit}>{item.pricePerUnit.toFixed(2)}</div>
                                        <div className={classes.groupItemPriceForAmount}>
                                            {(item.amount * item.pricePerUnit).toFixed(2)}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

const ViewFragment = createFragmentContainer(
    injectStyles(styles)(View),
    graphql`
        fragment HistoryListing_groups on PurchasesGroup @relay(plural: true) {
            id
            purchasedAt
            totalPrice
            items {
                id
                amount
                pricePerUnit
                product {
                    id
                    name
                }
            }
        }
    `
);
