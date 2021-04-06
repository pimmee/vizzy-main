import { ChangeEvent, useState } from 'react';

import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import cx from 'classnames';
import { compareDesc } from 'date-fns';

import AlertDialog from 'components/Dialog/AlertDialog';
import { Flex } from 'components/Flex';
import { UserProjectComment } from 'components/UserProjectComment';
import { useCurrentUser, useFirebase } from 'fbase';
import { useProjectComments } from 'fbase/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid ${theme.palette.border.dark}`,
      padding: theme.spacing(2, 3),
      [theme.breakpoints.up('sm')]: {
        maxHeight: '70vh',
      },
      overflowY: 'auto',
    },
    commentForm: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    inputField: {
      width: '100%',
    },
  })
);

interface Props {
  projectId: string;
  className?: string;
}
export default function CommunityCommentSection({
  projectId,
  className,
}: Props) {
  const classes = useStyles();
  const firebase = useFirebase();
  const user = useCurrentUser();

  const comments = useProjectComments(projectId);
  const [text, setText] = useState<string>('');
  const [commentToDelete, setCommentToDelete] = useState<string>('');

  const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    firebase.addProjectComment(projectId, text);
    setText('');
  };

  const handleClickLike = (commentId: string) => {
    firebase.toggleProjectCommentLike(commentId);
  };

  const handleClickDislike = (commentId: string) => {
    firebase.toggleProjectCommentDislike(commentId);
  };

  const onConfirmDelete = () => {
    if (commentToDelete) {
      firebase.removeProjectComment(commentToDelete, projectId);
    }
  };

  return (
    <>
      <div className={cx(classes.root, className)}>
        <AlertDialog
          open={!!commentToDelete}
          title="Delete comment"
          acceptText="Confirm"
          text="Are you sure you want to delete comment?"
          icon="warning"
          onAccept={onConfirmDelete}
          onClose={() => setCommentToDelete('')}
        />
        <form onSubmit={handleSubmit} className={classes.commentForm}>
          <TextField
            placeholder="Add a comment..."
            multiline
            value={text}
            onChange={handleChangeText}
            className={classes.inputField}
            disabled={!user}
          />
          <Flex flexEnd fullWidth>
            {/* <Button>Cancel</Button>{' '} */}
            <Button
              variant={'contained'}
              color="primary"
              type="submit"
              disabled={!user || !text}
            >
              Comment
            </Button>
          </Flex>
        </form>
        {comments
          .sort((a, b) => compareDesc(a.createdAt, b.createdAt))
          .map(comment => (
            <UserProjectComment
              key={comment.id}
              comment={comment}
              isOwner={user && user.id === comment.userId}
              onLike={handleClickLike}
              onDislike={handleClickDislike}
              onRemove={setCommentToDelete}
              isLiked={!!user && comment.likes?.includes(user.id)}
              isDisliked={!!user && comment.dislikes?.includes(user.id)}
            />
          ))}
      </div>
    </>
  );
}
