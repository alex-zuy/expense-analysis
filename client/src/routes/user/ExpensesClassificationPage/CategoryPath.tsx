import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';

interface CategoryProps {
    id: string,
    name: string,
    color: string
}

interface Props {
    path: ReadonlyArray<CategoryProps>
}

const styles: StyleSheet<Props> = {
    path: {
        display: 'flex',
        alignItems: 'center'
    },
    category: (props) => ({
        padding: '.4em .5em',
    })
};

const CategoryPath: React.SFC<Props & WithStyles> = (props) => {
    const {classes} = props;
    return (
        <div className={classes.path}>
            {props.path.map((category, idx, array) => (
                <React.Fragment key={category.id}>
                    {idx < array.length && (
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            color={category.color}
                        />
                    )}
                    <div className={classes.category} style={{borderBottom: `.2em solid ${category.color}`}}>
                        {category.name}
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
};

export default injectSheet(styles)(CategoryPath);
