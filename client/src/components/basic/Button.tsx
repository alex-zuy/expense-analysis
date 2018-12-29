import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';

enum ButtonKind {
    PRIMARY = 'PRIMARY'
}

interface DefaultProps {
    kind: ButtonKind,
}

interface OptionalProps {
    disabled: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

type UsableProps = Partial<OptionalProps> & DefaultProps;

const Button: React.SFC<UsableProps> = (props) => (
    <button
        className={`pure-button ${KIND_CLASSES[props.kind]}`}
        disabled={props.disabled}
        onClick={props.onClick}>
        {props.children}
    </button>
);

Button.defaultProps = {
    kind: ButtonKind.PRIMARY
}

const KIND_CLASSES: Record<ButtonKind, string> = {
    [ButtonKind.PRIMARY]: 'pure-button-primary'
};

export default Button as React.ComponentType<Partial<OptionalProps & DefaultProps>>;
