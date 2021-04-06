import { createStyles } from '@material-ui/core';

export default createStyles({
  parent: {
    display: 'flex',
    alignItems: 'center',
  },
  relativeParent: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  centeredChild: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  rightChild: {
    marginLeft: 'auto',
  },
  leftChild: {
    marginRight: 'auto',
  },
  autoChild: {
    flex: 'auto',
  },
  child: {
    display: 'flex',
    alignItems: 'center',
  },
});
