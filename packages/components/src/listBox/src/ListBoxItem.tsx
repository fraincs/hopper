import { CheckmarkIcon, IconContext, type IconProps } from "@hopper-ui/icons";
import { type StyledComponentProps, useStyledSystem, type ResponsiveProp, useResponsiveValue } from "@hopper-ui/styled-system";
import { forwardRef, type ForwardedRef } from "react";
import {
    useContextProps, 
    ListBoxItem as RACListBoxItem, 
    type ListBoxItemProps as RACListBoxItemProps, 
    composeRenderProps, 
    type SlotProps,
    DEFAULT_SLOT
} from "react-aria-components";

import { BadgeContext } from "../../badge/index.ts";
import { Checkbox } from "../../checkbox/index.ts";
import { IconListContext } from "../../IconList/index.ts";
import { Radio, RadioGroup, RadioList } from "../../radio/index.ts";
import { Text, TextContext, type TextProps } from "../../typography/Text/index.ts";
import { composeClassnameRenderProps, type SizeAdapter, SlotProvider, cssModule, isTextOnlyChildren } from "../../utils/index.ts";

import { ListBoxItemContext } from "./ListBoxItemContext.ts";

import styles from "./ListBoxItem.module.css";

export const GlobalListBoxItemCssSelector = "hop-ListBoxItem";

export type ListBoxItemSize = "xs" | "sm" | "md" | "lg";

export interface ListBoxItemProps<T> extends StyledComponentProps<Omit<RACListBoxItemProps<T>, "orientation | layout">>, SlotProps {
    /**
     * Whether or not the ListBoxItem is in an invalid state.
     */
    isInvalid?: boolean;
    /**
     * The selection indicator to use. Only available if the selection mode is not "none".
     * When set to "input", the selection indicator will be an either a radio or checkbox based on the selection mode.
     * @default "check"
     */
    selectionIndicator?: "check" | "input";
    /**
     * A ListBoxItem can vary in size.
     * @default "sm"
     */
    size?: ResponsiveProp<ListBoxItemSize>;
}

const ListBoxItemToIconSizeAdapter = {
    xs: "sm",
    sm: "sm",
    md: "md",
    lg: "md"
} as const satisfies SizeAdapter<ListBoxItemSize, IconProps["size"]>;

const ListBoxItemToTextSizeAdapter = {
    xs: "sm",
    sm: "sm",
    md: "sm",
    lg: "md"
} as const satisfies SizeAdapter<ListBoxItemSize, TextProps["size"]>;

function ListBoxItem<T extends object>(props: ListBoxItemProps<T>, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, ListBoxItemContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        isInvalid,
        size: sizeProp,
        style: styleProp,
        textValue: textValueProp,
        selectionIndicator,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "sm";
    const textValue = textValueProp ?? (typeof childrenProp === "string" ? childrenProp : undefined);

    const classNames = composeClassnameRenderProps(
        className,
        GlobalListBoxItemCssSelector,
        cssModule(
            styles,
            "hop-ListBoxItem",
            size,
            selectionIndicator
        ),
        stylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const children = composeRenderProps(childrenProp, prev => {
        if (prev && isTextOnlyChildren(prev)) {
            return <Text slot="label">{prev}</Text>;
        }

        return prev;
    });

    return (
        <RACListBoxItem
            {...otherProps}
            ref={ref}
            className={classNames}
            style={style}
            textValue={textValue}
            data-invalid={isInvalid || undefined}
        >
            {ListBoxItemProps => {
                const { selectionMode, isDisabled, isFocusVisible, isPressed, isHovered, isSelected } = ListBoxItemProps;
                const isRadio = selectionIndicator === "input" && selectionMode === "single";
                const isCheckbox = selectionIndicator === "input" && selectionMode === "multiple";
                const isCheck = selectionIndicator === "check" && selectionMode !== "none";

                return (
                    <>
                        {isRadio && (
                            <RadioGroup 
                                size="sm"
                                aria-hidden="true" 
                                aria-label="list item indicator"
                                value={isSelected ? "radio" : null} 
                                className={styles["hop-ListBoxItem__radio-group"]}
                                isInvalid={isInvalid}
                            >
                                <RadioList>
                                    <Radio
                                        className={styles["hop-ListBoxItem__radio"]}
                                        value="radio"
                                        isDisabled={isDisabled}
                                        isFocused={isFocusVisible}
                                        isHovered={isHovered}
                                        isPressed={isPressed}
                                    />
                                </RadioList>
                            </RadioGroup>
                        )}
                        {isCheckbox && (
                            <Checkbox
                                size="sm"
                                value="checkbox"
                                aria-hidden="true"
                                className={styles["hop-ListBoxItem__checkbox"]}
                                isDisabled={isDisabled}
                                isFocused={isFocusVisible}
                                isHovered={isHovered}
                                isPressed={isPressed}
                                isSelected={isSelected}
                                isInvalid={isInvalid}
                            />
                        )}
                        <SlotProvider
                            values={[
                                [TextContext, {
                                    slots: {
                                        [DEFAULT_SLOT]: {
                                            slot: "label",
                                            className: styles["hop-ListBoxItem__label"],
                                            size: ListBoxItemToTextSizeAdapter[size]
                                        },
                                        label: {
                                            className: styles["hop-ListBoxItem__label"],
                                            size: ListBoxItemToTextSizeAdapter[size]
                                        },
                                        description: {
                                            className: styles["hop-ListBoxItem__description"],
                                            size: "xs"
                                        }
                                    }
                                }],
                                [IconListContext, {
                                    slots: {
                                        [DEFAULT_SLOT]: {
                                            className: styles["hop-ListBoxItem__icon-list"],
                                            size: ListBoxItemToIconSizeAdapter[size]
                                        },
                                        "end-icon": {
                                            className: styles["hop-ListBoxItem__end-icon-list"],
                                            size: ListBoxItemToIconSizeAdapter[size]
                                        }
                                    }
                                }],
                                [IconContext, {
                                    slots: {
                                        [DEFAULT_SLOT]: {
                                            className: styles["hop-ListBoxItem__icon"],
                                            size: ListBoxItemToIconSizeAdapter[size]
                                        },
                                        "end-icon": {
                                            className: styles["hop-ListBoxItem__end-icon"],
                                            size: ListBoxItemToIconSizeAdapter[size]
                                        }
                                    }
                                }],
                                [BadgeContext, {
                                    className: styles["hop-ListBoxItem__badge"],
                                    slot: null
                                }]
                            ]}
                        >
                            {children(ListBoxItemProps)}
                        </SlotProvider>
                        {isCheck && (
                            <CheckmarkIcon className={styles["hop-ListBoxItem__checkmark"]} />
                        )}
                    </>
                );
            }}
        </RACListBoxItem>
    );
}

/**
 * A ListBoxItem represents an item within a ListBox component.
 *
 * [View Documentation](TODO)
 */
const _ListBoxItem = forwardRef<HTMLDivElement, ListBoxItemProps<object>>(ListBoxItem);
_ListBoxItem.displayName = "ListBoxItem";

export { _ListBoxItem as ListBoxItem };
