import {faTag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';

interface RequiredProps {
    name: string,
    color: string,
}

interface DefaultedProps {
    marginRight: string
}

interface Props extends RequiredProps, DefaultedProps { }

const styles: StyleSheet<Props> = {
    tag: props => ({
        display: 'inline-flex',
        alignItems: 'center',
        padding: '.4em .6em',
        borderRadius: '.5em',
        boxShadow: `0 0 0.2em ${props.color} inset`,
        marginRight: props.marginRight
    }),
    tagName: {
    },
    tagIcon: {
        width: '1.4em',
        height: '1.4em'
    }
};

const Tag: React.SFC<Props & WithStyles> = (props) => {
    const {classes} = props;
    return (
        <div className={classes.tag}>
            <FontAwesomeIcon
                icon={faTag}
                color={props.color}
                pull={'left'}
                size={'lg'}
            />
            <span className={classes.tagName}>
                {props.name}
            </span>
        </div>
    )
};

Tag.defaultProps = {
    marginRight: '0'
}

export default injectSheet(styles)(Tag) as React.SFC<RequiredProps & Partial<DefaultedProps>>;
