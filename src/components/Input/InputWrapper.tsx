import * as React from 'react';

import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  InputBase,
  InputBaseProps,
} from '@material-ui/core';
import Input, { InputProps } from '@material-ui/core/Input';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const InputWrapper = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const _prevent = (event: React.KeyboardEvent) => {
    if (!event.ctrlKey && event.key !== 'Enter') {
      prevent(event);
    }
  };
  const prevent = (event: React.KeyboardEvent | React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  return (
    <input
      {...props}
      ref={ref}
      onKeyDown={event => {
        _prevent(event);
        props.onKeyDown && props.onKeyDown(event);
      }}
      onClick={prevent}
      onKeyUp={_prevent}
    ></input>
  );
});

interface IconButtonWrapperProps extends IconButtonProps {
  allowSpace?: boolean;
}

export const IconButtonWrapper = React.forwardRef<any, IconButtonWrapperProps>(
  ({ allowSpace = false, ...props }, ref) => {
    const _prevent = (event: React.KeyboardEvent) => {
      if (!event.ctrlKey && event.key !== 'Enter' && !(allowSpace && event.key === 'Space')) {
        prevent(event);
      }
    };
    const prevent = (event: React.KeyboardEvent) => {
      event.stopPropagation();
      event.nativeEvent.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    };

    return (
      <IconButton
        {...props}
        ref={ref}
        onKeyDown={event => {
          _prevent(event);
          props.onKeyDown && props.onKeyDown(event);
        }}
        onKeyUp={_prevent}
      />
    );
  }
);

export const ButtonWrapper = React.forwardRef<any, ButtonProps>((props, ref) => {
  const _prevent = (event: React.KeyboardEvent) => {
    if (!event.ctrlKey && event.key !== 'Enter') {
      prevent(event);
    }
  };
  const prevent = (event: React.KeyboardEvent) => {
    event.stopPropagation();
    event.preventDefault();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  return (
    <Button
      {...props}
      ref={ref}
      onKeyDown={event => {
        _prevent(event);
        props.onKeyDown && props.onKeyDown(event);
      }}
      onKeyUp={_prevent}
    />
  );
});

export const InputBaseWrapper = React.forwardRef<HTMLInputElement, InputBaseProps>((props, ref) => {
  const _prevent = (event: React.KeyboardEvent) => {
    if (!event.ctrlKey) {
      prevent(event);
    }
  };
  const prevent = (event: React.KeyboardEvent | React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  return (
    <InputBase
      {...props}
      ref={ref}
      onKeyDown={event => {
        _prevent(event);
        props.onKeyDown && props.onKeyDown(event);
      }}
      onClick={prevent}
      onKeyUp={_prevent}
    />
  );
});

export const TextAreaWrapper = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const _prevent = (event: React.KeyboardEvent) => {
      if (!event.ctrlKey) {
        prevent(event);
      }
    };

    const prevent = (event: React.KeyboardEvent | React.MouseEvent) => {
      event.stopPropagation();
      event.nativeEvent.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    };

    return (
      <textarea {...props} ref={ref} onKeyDown={_prevent} onClick={prevent} onKeyUp={prevent} />
    );
  }
);

export const MaterialInputWrapper = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const _prevent = (event: React.KeyboardEvent) => {
    if (!event.ctrlKey) {
      prevent(event);
    }
  };

  const prevent = (event: React.KeyboardEvent | React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  return (
    <Input ref={ref} onKeyDown={_prevent} onClick={prevent} onKeyUp={prevent} {...props}></Input>
  );
});

export const TextFieldWrapper = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const prevent = (event: React.KeyboardEvent) => {
    if (!event.ctrlKey && event.key !== 'Escape') {
      event.stopPropagation();
      event.nativeEvent.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
  };

  return <TextField ref={ref} onKeyDown={prevent} onKeyUp={prevent} {...props}></TextField>;
});
