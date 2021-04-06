import { useState, useEffect, useRef } from 'react';
import * as React from 'react';

import { Typography, TypographyProps } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import cx from 'classnames';

import { TextFieldWrapper } from './InputWrapper';
import useKeypress from 'utils/hooks/useKeypress';
import useOnClickOutside from 'utils/hooks/useOnClickOutside';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {},
    text: {
      '&$active': {
        // cursor: 'pointer',
      },
    },
    input: {
      '&$active': {
        textAlign: 'left',
      },
      padding: 0,
    },
    active: {
      font: 'inherit',
      color: 'inherit',
      textAlign: 'inherit',
      background: 'none',
      border: 'none',
      outline: 'none',
    },
    hidden: {
      display: 'none',
    },
  })
);

interface Props extends TypographyProps {
  text: string;
  onSetText: (text: string) => void;
  isInputActive: boolean;
  setIsInputActive: (isActive: boolean) => void;
  editOnClickText?: boolean;
}
function InlineEdit({
  text,
  onSetText,
  isInputActive,
  setIsInputActive,
  editOnClickText,
  className,
  ...textProps
}: Props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<string>(text);

  const wrapperRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');

  // Check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  });

  useEffect(() => {
    setInputValue(text);
  }, [text]);

  // Focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close
      if (enter) {
        if (inputValue !== text) {
          onSetText(inputValue);
        }
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close
      if (esc) {
        setInputValue(text);
        setIsInputActive(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enter, esc, isInputActive]); // watch the Enter and Escape key presses

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Typography
      className={cx(classes.wrapper, className)}
      ref={wrapperRef}
      component="span"
      {...textProps}
    >
      <span
        ref={textRef}
        onClick={() => (editOnClickText ? setIsInputActive(true) : null)}
        className={cx(classes.text, {
          [classes.active]: !isInputActive,
          [classes.hidden]: isInputActive,
        })}
      >
        {text}
      </span>
      <TextFieldWrapper
        inputRef={inputRef}
        //style={{ minWidth: Math.ceil(inputValue.length / 10) + 'ch' }}
        value={inputValue}
        onChange={handleChange}
        InputProps={{
          disableUnderline: true,
          className: cx(classes.input, {
            [classes.active]: isInputActive,
            [classes.hidden]: !isInputActive,
          }),
        }}
        spellCheck="false"
        size="small"
      />
    </Typography>
  );
}

export default InlineEdit;
