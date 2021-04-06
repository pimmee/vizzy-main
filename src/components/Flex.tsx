import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import cx from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexRoot: {
      display: 'flex',
      alignItems: 'center',
    },
    column: {
      flexDirection: 'column',
    },
    columnFlexEnd: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    columnFlexStart: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    center: {
      justifyContent: 'center',
    },
    flexEnd: {
      justifyContent: 'flex-end',
    },
    fullWidth: {
      width: '100%',
    },
    fullHeight: {
      width: '100%',
    },
    flexOne: {
      flex: 1,
    },
  })
);

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  center?: boolean;
  flexEnd?: boolean;
  column?: boolean;
  className?: string;
  children?: any;
  fullWidth?: boolean;
  fullHeight?: boolean;
  columnFlexEnd?: boolean;
  columnFlexStart?: boolean;
  width?: number;
  flexOne?: boolean;
}

export const Flex = ({
  center,
  flexEnd,
  column,
  columnFlexStart,
  columnFlexEnd,
  className,
  children,
  fullWidth,
  fullHeight,
  width,
  flexOne,
  ...props
}: Props) => {
  const classes = useStyles();

  return (
    <div
      {...props}
      className={cx(
        classes.flexRoot,
        className,
        center && classes.center,
        flexEnd && classes.flexEnd,
        columnFlexStart && classes.columnFlexStart,
        columnFlexEnd && classes.columnFlexEnd,
        column && classes.column,
        fullWidth && classes.fullWidth,
        fullHeight && classes.fullHeight,
        flexOne && classes.flexOne
      )}
      style={{ width }}
    >
      {children}
    </div>
  );
};
