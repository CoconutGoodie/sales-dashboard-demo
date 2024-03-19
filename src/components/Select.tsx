import ArrowRight01 from "@src/assets/icons/hugeicons/arrow-right01.svg?component";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { compoundBuilder, contextBuilder } from "react-compound-composer";
import { createPortal } from "react-dom";
import { Modifier, usePopper } from "react-popper";
import { useEventListener } from "usehooks-ts";

import clsx from "clsx";
import styles from "./Select.module.scss";

interface SelectOption<
  TValue extends PropertyKey = PropertyKey,
  TData = unknown
> {
  value: TValue;
  label?: string;
  data?: TData;
}

type RootProps<
  TOption extends SelectOption = SelectOption,
  TOptions extends readonly TOption[] = TOption[],
  TValue = TOptions[number]["value"]
> = PropsWithChildren<{
  options?: TOptions;
  modifiers?: Modifier<unknown>[];
  value?: TValue;
  onSelect?: (option: TOption) => void;
}>;

export const {
  Consumer: SelectConsumer,
  Provider: SelectProvider,
  useContext: useSelectContext,
} = contextBuilder((rootProps: RootProps) => {
  const [isOpen, setOpen] = useState(false);

  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  const popper = usePopper(triggerElement, popperElement, {
    modifiers: [
      { name: "offset", options: { offset: [0, 12] } },
      ...(rootProps.modifiers ?? []),
    ],
    strategy: "fixed",
  });

  useEffect(() => {
    if (triggerElement) {
      const onClick = () => setOpen(true);
      triggerElement.addEventListener("click", onClick);
      return () => triggerElement.removeEventListener("click", onClick);
    }
  }, [triggerElement]);

  useEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    },
    { current: document.body }
  );

  return {
    rootProps,
    isOpen,
    setOpen,
    triggerElement,
    setTriggerElement,
    popperElement,
    setPopperElement,
    popper,
  };
});

export const Select = compoundBuilder({
  name: "Select",
  provider: SelectProvider,
  components: {
    Root: (props: RootProps) => {
      return props.children;
    },

    Trigger: (props: {
      className?: string;
      noChevron?: boolean;
      renderPlaceholder?: () => ReactNode;
      renderSelectedOption?: (option?: SelectOption) => ReactNode;
    }) => {
      const context = useSelectContext();
      const selectedOption = context.rootProps.options?.find(
        (option) => context.rootProps.value === option.value
      );

      return (
        <button
          ref={context.setTriggerElement}
          className={clsx(styles.trigger, props.className)}
        >
          <span className={styles.text}>
            {selectedOption
              ? props.renderSelectedOption?.(selectedOption) ??
                selectedOption?.label
              : props.renderPlaceholder?.()}
          </span>
          {!props.noChevron && (
            <span className={styles.chevron}>
              <ArrowRight01
                width={18}
                height={18}
                style={{ rotate: context.isOpen ? "270deg" : "90deg" }}
              />
            </span>
          )}
        </button>
      );
    },

    Popper: (props: { renderOption?: (option: SelectOption) => ReactNode }) => {
      const context = useSelectContext();

      if (!context.isOpen) return null;

      return createPortal(
        <>
          <div
            className={styles.overlay}
            onClick={() => context.setOpen(false)}
          />
          <div
            ref={context.setPopperElement}
            style={{
              ...context.popper.styles.popper,
              minWidth: context.triggerElement?.clientWidth,
            }}
            className={styles.popper}
            {...context.popper.attributes.popper}
          >
            {context.rootProps.options?.map((option) => (
              <button
                key={option.value.toString()}
                className={styles.option}
                onClick={() => {
                  context.rootProps.onSelect?.(option);
                  context.setOpen(false);
                }}
              >
                {props.renderOption?.(option) ?? option.label}
              </button>
            ))}
          </div>
        </>,
        document.body
      );
    },
  },
});
