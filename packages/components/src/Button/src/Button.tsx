import { type StyledComponentProps, useStyledSystem, type ResponsiveProp, useResponsiveValue } from "@hopper-ui/styled-system";
import { type ForwardedRef, forwardRef } from "react";
import { Button as RACButton, useContextProps, type ButtonProps as RACButtonProps, type PressEvent, composeRenderProps } from "react-aria-components";
import styles from "./Button.module.css";
import { useId } from "@react-aria/utils";
import { cssModule } from "../../utils/src/css-module.ts";
import { Text } from "../../Text/src/Text.tsx";
import { SlotProvider, composeClassnameRenderProps } from "../../utils/index.ts";
import { IconContext } from "@hopper-ui/icons";
import { ButtonContext } from "./ButtonContext.ts";
import { TextContext } from "../../Text/index.ts";
import { useLocalizedString } from "../../intl/index.ts";
import { Spinner } from "../../Spinner/index.ts";

// TODO: create some kind of meta object with global css selectors, default slot and context?
const GlobalButtonCssSelector = "hop-Button-component";
const DefaultSlot = "button";

export interface ButtonProps extends StyledComponentProps<RACButtonProps> {
    /**
     * The visual style of the button.
     */
    variant?: "primary" | "secondary" | "tertiary" | "negative" | "upsell";

    /**
     * A button can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md">;

    /**
     * Whether or not the button take up the width of its container.
     */
    fluid?: ResponsiveProp<boolean>;

    // TODO: implement this
    isLoading?:boolean;

    /**
     * TODO: sugar syntax for the onPress event
     */
    onClick?: ((e: PressEvent) => void);
}

const Button = (props:ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    [props, ref] = useContextProps({ ...props, slot: props.slot || DefaultSlot }, ref, ButtonContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        size: sizeProp = "md",
        fluid: fluidProp,
        variant = "primary",
        onClick,
        onPress: onPressProp,
        isDisabled,
        isLoading,
        style: styleProp,
        ...otherProps
    } = ownProps;

    if (onPressProp && onClick) {
        console.warn("[Hopper] The onClick prop is an alias for onPress and should not be used in conjunction with it. Use one or the other.");
    }

    const onPress = onPressProp ?? onClick;
    const isInteractionDisabled = isDisabled || isLoading;

    // TODO: utilities for resolving multiple responsive values?
    const size = useResponsiveValue(sizeProp);
    const fluid = useResponsiveValue(fluidProp);

    const stringFormatter = useLocalizedString();

    const classNames = composeClassnameRenderProps(
        className,
        GlobalButtonCssSelector,
        cssModule(
            styles,
            "hop-button",
            variant,
            size,
            fluid && "fluid",
            isLoading && "loading"
        ),
        stylingProps.className
    );

    const children = composeRenderProps(childrenProp, prev => {
        if (typeof prev === "string") {
            return <Text>{prev}</Text>;
        }

        return prev;
    });

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const spinnerId = useId();

    const hasAriaLabel = !!props["aria-label"] || !!props["aria-labelledby"];
    const isLoadingAriaLiveLabel = `${hasAriaLabel ? props["aria-label"] : ""} ${stringFormatter.format("button.pending")}`.trim();

    return (
        <SlotProvider
            values={[
                [IconContext, {
                    slots: {
                        icon: {
                            className: styles["hop-button__icon"],
                            size: "md"
                        },
                        "end-icon": {
                            className: styles["hop-button__end-icon"],
                            size: "md"
                        }
                    }
                }],
                [TextContext, {
                    slots: {
                        text: {
                            className: styles["hop-button__text"],
                            size: size
                        }
                    }
                }]
            ]}
        >
            <RACButton
                ref={ref}
                className={classNames}
                style={style}
                data-loading={isLoading}
                onPress={onPress}
                isDisabled={isInteractionDisabled}
                {...otherProps}
            >
                {buttonProps => {
                    return (
                        <>
                            {children(buttonProps)}
                            {isLoading && (
                                <Spinner
                                    id={spinnerId}
                                    aria-label={isLoadingAriaLiveLabel}
                                    className={styles["hop-button__Spinner"]}
                                />
                            )}
                        </>
                    );
                }}
            </RACButton>
        </SlotProvider>
    );
};

/**
 * Buttons are used to initialize an action. Button labels express what action will occur when the user interacts with it.
 *
 * [View Documentation](TODO)
 */
const _Button = forwardRef<HTMLButtonElement, ButtonProps>(Button);
_Button.displayName = "Button";

export { _Button as Button };


