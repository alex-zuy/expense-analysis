import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';
import {createFragmentContainer, graphql, QueryRenderer, ReadyState} from 'react-relay';
import {ExpensesClassificationPage_products_QueryResponse} from '../../../__generated__/ExpensesClassificationPage_products_Query.graphql';
import {ProvidedEnvironmentProps, withEnvironment} from '../../../graphql/withEnvironment';
import {ExpensesClassificationPage_products} from 'src/__generated__/ExpensesClassificationPage_products.graphql';
import ProductClassification from './ProductClassification';

interface PageProps extends ProvidedEnvironmentProps {

}

interface PageState {

}

class ExpensesClassificationPage extends React.Component<PageProps, PageState> {

    render() {
        return (
            <QueryRenderer
                environment={this.props.environment}
                query={graphql`
                    query ExpensesClassificationPage_products_Query {
                        productsExpenses {
                            ...ExpensesClassificationPage_products
                        }
                    }
                `}
                variables={{}}
                render={(args: ReadyState<ExpensesClassificationPage_products_QueryResponse>) => {
                    const {props} = args;
                    return (
                        <ViewFragment
                            products={props ? props.productsExpenses : null}
                        />
                    )
                }}
            />
        );
    }
}

export default withEnvironment(ExpensesClassificationPage);

interface ViewProps {
    products: ExpensesClassificationPage_products | null
}

const styles: StyleSheet<ViewProps> = {
    productsList: {
        maxWidth: '60em'
    }
};

const View: React.SFC<ViewProps & WithStyles> = (props) => {
    return (
        <>
            <h1>Expenses classification</h1>
            <div className={props.classes.productsList}>
                {props.products && props.products.map((expense) => {
                    return (
                        <ProductClassification
                            key={expense.id}
                            expense={expense}
                        />
                    );
                })}
            </div>
        </>
    );
};

const ViewFragment = createFragmentContainer(
    injectSheet(styles)(View),
    graphql`
        fragment ExpensesClassificationPage_products on ProductExpense @relay(plural: true) {
            id
            ...ProductClassification_expense
        }
    `
);
