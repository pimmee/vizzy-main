import { useEffect, useState, useRef, useCallback } from 'react';
import * as React from 'react';

import { createStyles, Button, makeStyles, Theme, ButtonProps } from '@material-ui/core';
import cx from 'classnames';

import { primaryMain, primaryDark, primaryContrastText } from 'assets/theme/main/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      justifyContent: 'center',
      width: '100%',
    },
    button: {
      border: 'none',
      display: 'initial',
      cursor: 'pointer',
      height: '40px',
      width: '100%',
      minWidth: 0,
      transition:
        'background-color 0.3s, width 0.3s, border-width 0.3s, border-color 0.3s, border-radius 0.3s',
      '&$disabled': {
        cursor: 'not-allowed',
      },
      '&$loading': {
        width: '40px',
        borderWidth: '6.5px',
        borderColor: '#ddd',
        cursor: 'wait',
        backgroundColor: 'transparent',
        padding: 0,
      },
      '&$success': {
        borderColor: theme.palette.success.main,
        backgroundColor: theme.palette.success.main,
      },
      '&$error': {
        borderColor: theme.palette.error.main,
        backgroundColor: theme.palette.error.main,
      },
    },
    label: {
      display: 'inherit',
      transition: 'opacity 0.3s 0.1s',
      fontSize: '0.875rem',
      fontWeight: 500,
      '&$loading': {
        transition: 'all 0.15s',
        opacity: 0,
        display: 'none',
      },
      '&$success': {
        transition: 'all 0.15s',
        opacity: 0,
        display: 'none',
      },
      '&$error': {
        transition: 'all 0.15s',
        opacity: 0,
        display: 'none',
      },
    },
    svg: {
      height: '40px',
      width: '40px',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      '& > path': {
        fill: 'none',
      },
    },
    progressCircle: {
      color: theme.palette.primary.main,
      animation: '$spin 0.9s infinite cubic-bezier(0.085, 0.260, 0.935, 0.710)',
      '&$loading > path': {
        transition: 'opacity 0.15s 0.3s',
      },
      '& > path': {
        stroke: 'currentColor',
        strokeWidth: 5,
      },
    },
    checkmark: {
      '& > path': {
        stroke: '#fff',
        strokeLinecap: 'round',
        strokeWidth: 4,
      },
    },
    cross: {
      '& > path': {
        stroke: '#fff',
        strokeLinecap: 'round',
        strokeWidth: 4,
      },
    },
    '@keyframes spin': {
      from: {
        transform: 'translate(-50%, -50%) rotate(0deg)',
        transformOrigin: 'center center',
      },
      to: {
        transform: 'translate(-50%, -50%) rotate(360deg)',
        transformOrigin: 'center center',
      },
    },
    primary: {
      color: primaryContrastText,
      background: primaryMain,
      '&:hover': {
        background: primaryDark,
      },
    },
    loading: {},
    error: {},
    success: {},
    disabled: {},
    hidden: {
      opacity: 0,
    },
  })
);

export enum STATE {
  LOADING = 'loading',
  DISABLED = 'disabled',
  SUCCESS = 'success',
  ERROR = 'error',
  NOTHING = '',
}

export type StateTypes = 'loading' | 'disabled' | 'success' | 'error' | '';

interface Props extends ButtonProps {
  durationError?: number;
  durationSuccess?: number;
  controlled?: boolean;
  onClick: () => void | Promise<any>;
  onError: () => any;
  onSuccess: () => any;
  state?: StateTypes;
  shouldAllowClickOnLoading: boolean;
  className?: string;
}

function ProgressButton({
  controlled,
  durationError,
  durationSuccess,
  onClick,
  state,
  shouldAllowClickOnLoading,
  children,
  className,
  onSuccess,
  ...rest
}: Props) {
  const classes = useStyles();
  const [currentState, setCurrentState] = useState<StateTypes>(STATE.NOTHING);
  const timeout = useRef<NodeJS.Timeout | number | null>(null); // https://github.com/Microsoft/TypeScript/issues/842

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const shouldAllowClick =
      (shouldAllowClickOnLoading || currentState !== STATE.LOADING) &&
      currentState !== STATE.DISABLED;
    if (controlled && shouldAllowClick) {
      onClick();
    } else if (shouldAllowClick) {
      loading();
      const promise = onClick() as Promise<any>;
      handlePromise(promise);
    } else {
      event.preventDefault();
    }
  };

  const handlePromise = (promise: Promise<any>) => {
    // If not controlled, onClick should return a promise
    // and ProgressButton will handle state itself
    if (promise && promise.then && promise.catch) {
      promise.then(() => success()).catch(() => error());
    }
  };

  const loading = () => {
    setCurrentState(STATE.LOADING);
  };

  const notLoading = () => {
    setCurrentState(STATE.NOTHING);
  };

  const disable = () => {
    setCurrentState(STATE.DISABLED);
  };

  const success = useCallback(() => {
    setCurrentState(STATE.SUCCESS);
    timeout.current = setTimeout(() => {
      timeout.current = null;
      setCurrentState(STATE.NOTHING);
      onSuccess();
    }, durationSuccess);
  }, [durationSuccess, onSuccess]);

  const error = useCallback(() => {
    setCurrentState(STATE.ERROR);
    timeout.current = setTimeout(() => {
      timeout.current = null;
      setCurrentState(STATE.NOTHING);
    }, durationError);
  }, [durationError]);

  useEffect(() => {
    switch (state) {
      case STATE.SUCCESS:
        success();
        break;
      case STATE.ERROR:
        error();
        break;
      case STATE.LOADING:
        loading();
        break;
      case STATE.DISABLED:
        disable();
        break;
      case STATE.NOTHING:
        notLoading();
        break;
      default:
        break;
    }

    return function cleanup() {
      if (timeout.current !== null) {
        clearTimeout(timeout.current as NodeJS.Timeout);
      }
    };
  }, [error, state, success]);

  const progressStateClasses = cx({
    [classes.success]: currentState === STATE.SUCCESS,
    [classes.loading]: currentState === STATE.LOADING,
    [classes.error]: currentState === STATE.ERROR,
    [classes.disabled]: currentState === STATE.DISABLED,
  });

  return (
    <div onClick={handleClick} className={cx(classes.root, progressStateClasses, className)}>
      <Button
        disabled={state === STATE.DISABLED}
        className={cx(classes.button, progressStateClasses, {
          [classes.primary]: rest.color === 'primary',
        })}
        {...rest}
      >
        <span className={cx(classes.label, progressStateClasses)}>{children}</span>
        <svg
          className={cx(classes.svg, classes.progressCircle, progressStateClasses)}
          viewBox="0 0 41 41"
        >
          <path
            d="M38,20.5 C38,30.1685093 30.1685093,38 20.5,38"
            className={currentState !== STATE.LOADING ? classes.hidden : ''}
          />
        </svg>
        <svg
          className={cx(classes.svg, classes.checkmark, progressStateClasses)}
          viewBox="0 0 70 70"
        >
          <path
            d="m31.5,46.5l15.3,-23.2"
            className={currentState !== STATE.SUCCESS ? classes.hidden : ''}
          />
          <path
            d="m31.5,46.5l-8.5,-7.1"
            className={currentState !== STATE.SUCCESS ? classes.hidden : ''}
          />
        </svg>
        <svg className={cx(classes.svg, classes.cross, progressStateClasses)} viewBox="0 0 70 70">
          <path
            d="m35,35l-9.3,-9.3"
            className={currentState !== STATE.ERROR ? classes.hidden : ''}
          />
          <path d="m35,35l9.3,9.3" className={currentState !== STATE.ERROR ? classes.hidden : ''} />
          <path
            d="m35,35l-9.3,9.3"
            className={currentState !== STATE.ERROR ? classes.hidden : ''}
          />
          <path
            d="m35,35l9.3,-9.3"
            className={currentState !== STATE.ERROR ? classes.hidden : ''}
          />
        </svg>
      </Button>
    </div>
  );
}

ProgressButton.defaultProps = {
  controlled: false,
  durationError: 1200,
  durationSuccess: 500,
  onClick: () => {},
  onError: () => {},
  onSuccess: () => {},
  shouldAllowClickOnLoading: false,
};

export default ProgressButton;
