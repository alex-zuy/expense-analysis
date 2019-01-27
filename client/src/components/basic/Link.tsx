import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';

interface LinkProps extends Pick<RouterLinkProps, 'to' | 'replace'> {

}

const linkStyles: StyleSheet<LinkProps> = {
    link: {
        color: 'currentColor'
    }
};

const Link: React.SFC<LinkProps & WithStyles> = (props) => {
    const {to, replace, children} = props;
    return (
        <RouterLink
            {...{to, replace, children}}
            className={props.classes.link}
        />
    )
};

export default injectSheet(linkStyles)(Link);
