import * as React from 'react';
import {NavLink, NavLinkProps} from 'react-router-dom';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';

type ForwardedProps = Pick<NavLinkProps, 'to'>;

interface LinkProps extends ForwardedProps {

}

const initialHorPadding = 1;
const horBias = 0.5;

const textBiasStyles = {
    paddingLeft: `${initialHorPadding + horBias}em`,
    paddingRight: `${initialHorPadding - horBias}em`,
};

const styles = {
    link: {
        color: 'currentColor',
        display: 'block',
        padding: `.8em ${initialHorPadding}em`,
        transition: '.2s padding',
        textDecoration: 'none',
        position: 'relative',
        border: '1px solid transparent',
        '&:hover': textBiasStyles,
        '&:before': {
            content: '" "',
            width: 0,
            display: 'inline-block',
            backgroundColor: 'currentColor',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            transition: '.5s ease-in-out width'
        }
    },
    link__active: {
        ...textBiasStyles,
        borderColor: 'currentColor',
        '&:before': {
            width: '.3em'
        }
    }
};

const MenuLink: React.SFC<LinkProps & WithStyles> = (props) => {
    const {classes} = props;
    return (
        <NavLink to={props.to}
                 activeClassName={classes.link__active}
                 className={classes.link}>
            {props.children}
        </NavLink>
    );
};

export default injectSheet(styles as any)(MenuLink);
