import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductClassification_expense} from 'src/__generated__/ProductClassification_expense.graphql';
import Tag from '../../../components/Tag';
import CategoryPath from './CategoryPath';

interface Props extends WithStyles {
    expense: ProductClassification_expense
}

const styles = {
    container: {
        border: '1px solid lightgrey',
        padding: '1em 1em 2em',
        display: 'grid',
        gridTemplateColumns: '1fr 10em',
        gridRowGap: '1em',
        gridTemplateAreas: `
            "title price"
            "categories price"
            "tags price"
        `,
        '&:not(:last-child)': {
            borderBottom: 'none'
        }
    },
    title: {
        fontSize: '1.2em',
        gridArea: 'title'
    },
    price: {
        gridArea: 'price',
        justifySelf: 'center',
        alignSelf: 'center'
    },
    tags: {
        gridArea: 'tags'
    },
    categoryPath: {
        gridArea: 'categories'
    }
};

class ProductClassification extends React.Component<Props> {

    render() {
        const {props} = this;
        const {classes, expense} = props;
        const {product} = expense;
        return (
            <div className={classes.container}>
                <div className={classes.title}>
                    {product.name}
                </div>
                <div className={classes.price}>
                    {expense.expense.toFixed(2)}
                </div>
                <div className={classes.categoryPath}>
                    <CategoryPath path={product.categoryPath}/>
                </div>
                <div className={classes.tags}>
                    {product.tags.map((tag) => (
                        <Tag
                            name={tag.name}
                            color={tag.color}
                            marginRight=".6em"
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default createFragmentContainer(
    injectSheet(styles as any)(ProductClassification),
    graphql`
        fragment ProductClassification_expense on ProductExpense {
            expense
            product {
                id
                name
                tags {
                    id
                    name
                    color
                }
                categoryPath {
                    id
                    name
                    color
                }
            }
        }
    `
);
