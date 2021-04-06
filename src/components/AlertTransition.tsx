import { Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface Props {
  show: boolean;
  text: string;
  severity?: 'warning' | 'info' | 'error' | 'success';
  className?: string;
  wrapperClassName?: string;
  children?: any;
  noTransition: boolean;
}
const AlertTransition = ({
  show,
  text,
  severity,
  className,
  noTransition,
  children,
  wrapperClassName,
}: Props) => (
  <Collapse
    in={show}
    timeout={noTransition ? 0 : 'auto'}
    className={wrapperClassName}
  >
    <Alert severity={severity} className={className}>
      {text}
      {children}
    </Alert>
  </Collapse>
);

AlertTransition.defaultProps = {
  show: true,
  severity: 'info',
  noTransition: false,
};

export default AlertTransition;
