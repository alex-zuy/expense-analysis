import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';

enum ButtonKind {
    PRIMARY = 'PRIMARY'
}

interface RequiredProps {
    children: React.ReactNode
}

interface DefaultProps {
    kind: ButtonKind,
}

interface OptionalProps {
    disabled: boolean
}

type UsableProps = Partial<OptionalProps> & RequiredProps & DefaultProps;

const style: StyleSheet<UsableProps> = {

};

const Button = (props: UsableProps) => (
    <button className={`pure-button ${KIND_CLASSES[props.kind]}`} disabled={props.disabled}>
        {props.children}
    </button>
);

Button.defaultProps = {
    kind: ButtonKind.PRIMARY
} as DefaultProps

const KIND_CLASSES: Record<ButtonKind, string> = {
    [ButtonKind.PRIMARY]: 'pure-button-primary'
};

export default Button as React.StatelessComponent<
    Partial<OptionalProps & DefaultProps>
        & RequiredProps
>;
