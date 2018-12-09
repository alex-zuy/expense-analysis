import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';

interface Props {
    content: React.ReactNode,
    menu: React.ReactNode,
}

const styles: StyleSheet<Props> = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    menu: {
        width: '15rem',
        color: 'white',
        backgroundColor: '#151313e3',
    },
    content: {
        flexGrow: 1,
        padding: '1rem'
    }
}


const DashboardLayout = (props: Props & WithStyles) => (
    <div className={props.classes.container}>
        <div className={props.classes.menu}>
            {props.menu}
        </div>
        <div className={props.classes.content}>
            {props.content}
        </div>
    </div>
);

export default injectSheet(styles)(DashboardLayout);
