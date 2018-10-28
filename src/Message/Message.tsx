import * as React from 'react';
import {connect} from "react-redux";
import {RootState} from "../store/rootState";

interface MessageProps {
    message: string
};

const Message = (props: MessageProps) => (
    <p>
        {props.message}
    </p>
);

const mapState = (state: RootState): MessageProps => ({
    message: state || ''
});

export default connect(mapState)(Message);
