import React from 'react';

import {
  Avatar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/MoreHoriz';
import DislikeIcon from '@material-ui/icons/ThumbDownAlt';
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import cx from 'classnames';
import { formatDistance } from 'date-fns';

import { SimpleDropdown } from './Dropdown';
import { Flex } from './Flex';
import DefaultTooltip from './DefaultTooltip';
import { CommunityComment } from 'types/common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: theme.spacing(2, 1),
      margin: theme.spacing(2, 0),
      flex: 1,
      '&:hover': {
        background: theme.palette.action.hover,
      },
      borderRadius: theme.shape.borderRadius,
    },
    mainContainer: {
      paddingLeft: theme.spacing(2),
    },
    date: {
      paddingLeft: theme.spacing(1),
    },
    likeWrapper: {
      minWidth: 45,
    },
    likeButton: {
      color: theme.palette.grey[500],
      '&$liked': {
        color: theme.palette.secondary.main,
      },
    },
    dislikeButton: {
      color: theme.palette.grey[500],
      '&$disliked': {
        color: theme.palette.common.white,
      },
    },
    liked: {},
    disliked: {},
  })
);

interface Props {
  comment: CommunityComment;
  onLike?: (commentId: string) => void;
  onDislike?: (commentId: string) => void;
  onRemove?: (commentId: string) => void;
  isLiked?: boolean;
  isOwner?: boolean;
  isDisliked?: boolean;
}

enum Action {
  REMOVE_COMMENT = 'REMOVE_COMMENT',
}

export const UserProjectComment = ({
  comment,
  onLike,
  onDislike,
  onRemove,
  isLiked,
  isDisliked,
  isOwner,
}: Props) => {
  const classes = useStyles();

  const handleClickLike = () => {
    onLike && onLike(comment.id);
  };

  const handleClickDislike = () => {
    onDislike && onDislike(comment.id);
  };

  const handleMenuSelect = (actionId: string, id?: string) => {
    switch (actionId) {
      case Action.REMOVE_COMMENT:
        onRemove && onRemove(comment.id);
        break;

      default:
        return;
    }
  };

  // sanity check
  const likes = (comment.likes?.length || 0) - (comment.dislikes?.length || 0);

  return (
    <div className={classes.root}>
      <Avatar src={comment.avatar} />
      <Flex column flexOne columnFlexStart className={classes.mainContainer}>
        <Flex>
          <Typography style={{ fontWeight: 500 }}>
            {comment.username || 'Anonymous'}
          </Typography>
          <Typography
            variant="caption"
            className={classes.date}
            color="textSecondary"
          >
            {formatDistance(comment.createdAt, new Date(), { addSuffix: true })}
          </Typography>
        </Flex>

        <Typography gutterBottom variant="body2">
          {comment.text}
        </Typography>
        <Flex>
          <span className={classes.likeWrapper}>
            <DefaultTooltip title={isLiked ? 'Remove like' : 'Like'}>
              <IconButton
                onClick={handleClickLike}
                size="small"
                className={cx(classes.likeButton, { [classes.liked]: isLiked })}
              >
                <LikeIcon />
              </IconButton>
            </DefaultTooltip>
            {likes}
          </span>
          <DefaultTooltip title={isDisliked ? 'Remove dislike' : 'Dislike'}>
            <IconButton
              onClick={handleClickDislike}
              size="small"
              className={cx(classes.dislikeButton, {
                [classes.disliked]: isDisliked,
              })}
            >
              <DislikeIcon />
            </IconButton>
          </DefaultTooltip>
        </Flex>
      </Flex>
      <Flex>
        {isOwner && (
          <SimpleDropdown
            onSelect={handleMenuSelect}
            icon={<MenuIcon />}
            items={[
              { name: 'Delete comment', actionId: Action.REMOVE_COMMENT },
            ]}
          />
        )}
      </Flex>
    </div>
  );
};
