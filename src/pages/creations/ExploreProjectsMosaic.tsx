import { useState, useEffect, useCallback } from 'react';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';

import { Typography, Box, Hidden, Button, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { compareDesc } from 'date-fns';

import AlertTransition from 'components/AlertTransition';
import { Flex } from 'components/Flex';
import { DefaultSelect } from 'components/Input';
import { InputBaseWrapper } from 'components/Input/InputWrapper';
import { ProjectGrid } from 'components/ProjectGrid';
import DefaultTooltip from 'components/DefaultTooltip';
import {
  fetchMoreCommunityProjects,
  performProjectSearch,
  setCommunityOrderBy,
  setProjectSearchTerm,
} from 'modules/project/actions';
import { enqueueSnackbar } from 'modules/info/actions';
import { useSelector } from '../../store';
import { ProjectOrderBy } from 'types/firebase';
import { AchievementID } from 'types/user';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      left: '50%',
      top: 50,
      marginLeft: -25,
    },
    flexWrap: {
      width: '100%',
      padding: theme.spacing(1),
    },
    topContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 0, 3),
    },
    flexCenter: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    loadMoreButton: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(1),
    },
    searchWrapper: {
      padding: theme.spacing(1),
      transition: theme.transitions.create('width'),
      width: '100%',
    },
    searchInput: {
      width: '100%',
      background: theme.palette.background.paper,
      display: 'inline-flex',
    },
    searchButton: {
      padding: 10,
      fontSize: 16,
    },
  })
);

export enum CardSize {
  SMALL,
  MEDIUM,
  LARGE,
}

const textLookup = {
  [ProjectOrderBy.POPULAR]: 'Most popular projects',
  [ProjectOrderBy.VIEWED]: 'Most viewed projects',
  [ProjectOrderBy.STAFF_PICK]: 'Projects recommended by staff',
  [ProjectOrderBy.RECENT]: 'Most recent projects',
};

interface Props {
  onClickProject?: (projectId: string) => void;
  initialSize?: 'small' | 'large';
}

export default function ExploreProjectsMoasic({
  onClickProject,
  initialSize = 'large',
}: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    community: projects,
    isFetching,
    hasMore,
    orderBy,
    searchedProjects,
    searchTerm,
    hasSearched,
    showSearchedProjects,
  } = useSelector(state => state.project);

  const fetchMoreProjects = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (event) event.stopPropagation();
      if (hasMore && !isFetching) {
        dispatch(fetchMoreCommunityProjects());
      }
    },
    [hasMore, isFetching, dispatch]
  );

  useEffect(() => {
    fetchMoreProjects();
  }, []);

  const sortProjects = () => {
    const _projects = showSearchedProjects
      ? [...searchedProjects]
      : [...projects];
    console.log('proj', _projects);
    switch (orderBy) {
      case ProjectOrderBy.POPULAR:
        return _projects.sort((a, b) => b.likes - a.likes);
      case ProjectOrderBy.RECENT:
        return _projects.sort((a, b) => compareDesc(a.createdAt, b.createdAt));
      case ProjectOrderBy.VIEWED:
        return _projects.sort((a, b) => b.clicks - a.clicks);
      default:
        return _projects.sort((a, b) => b.likes - a.likes);
    }
  };

  const handleSetOrderBy = (orderBy: ProjectOrderBy) => {
    dispatch(setCommunityOrderBy(orderBy));
  };

  const submitSearchQuery = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.length < 3) {
      dispatch(
        enqueueSnackbar({
          message: 'Search word must be atleast 3 letters',
          variant: 'info',
        })
      );
    }
    dispatch(performProjectSearch(searchTerm));
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setProjectSearchTerm(event.target.value));
  };

  const renderProjects = () => (
    <>
      <AlertTransition
        show={hasSearched && !searchedProjects.length}
        text={'No projects found'}
      />

      <InfiniteScroll
        loadMore={() => fetchMoreProjects()}
        hasMore={hasMore && !searchTerm}
        className={classes.flexWrap}
      >
        <ProjectGrid
          onClickProject={onClickProject}
          projects={
            orderBy === ProjectOrderBy.STAFF_PICK
              ? sortProjects().filter(
                  p =>
                    p.achievements &&
                    p.achievements.some(
                      achievement =>
                        achievement.id === AchievementID.WEEK_PROJECT
                    )
                )
              : sortProjects()
          }
        />
      </InfiniteScroll>
    </>
  );

  return (
    <>
      <div className={classes.topContainer}>
        <Hidden smDown>
          <Typography variant="h5" gutterBottom>
            {textLookup[orderBy]}
          </Typography>
        </Hidden>
        <form onSubmit={submitSearchQuery}>
          <InputBaseWrapper
            value={searchTerm}
            endAdornment={
              <DefaultTooltip
                className={classes.searchButton}
                title={`Search by username or project keyword`}
              >
                <IconButton
                  className={classes.searchButton}
                  type="submit"
                  size="small"
                >
                  <SearchIcon fontSize="inherit" />
                </IconButton>
              </DefaultTooltip>
            }
            placeholder="Search"
            inputProps={{ style: { paddingLeft: 10 } }}
            onChange={handleChangeSearch}
            className={classes.searchInput}
          />
        </form>
        <Flex>
          {/* <IconButton
            color={size === CardSize.LARGE ? 'inherit' : 'default'}
            onClick={() => setSize(size === CardSize.SMALL ? CardSize.LARGE : CardSize.SMALL)}
          >
            <PhotoSizeSelectLargeIcon />
          </IconButton> */}
          {/* <ToggleButtonGroup value={String(size)} onChange={onSizeChange} exclusive>
            <ToggleButton value={'0'}>
              <DefaultTooltip title="Decrease size">
                <PhotoSizeSelectLargeIcon />
              </DefaultTooltip>
            </ToggleButton>
            <ToggleButton value={'1'}>
              <DefaultTooltip title="Increase size">
                <PhotoSizeSelectActualIcon />
              </DefaultTooltip>
            </ToggleButton>
          </ToggleButtonGroup> */}
          <Box display="flex" justifyContent="flex-end">
            <DefaultSelect
              noTopMargin
              value={orderBy}
              onChange={option => handleSetOrderBy(option as ProjectOrderBy)}
              items={[
                { text: 'Most popular', value: ProjectOrderBy.POPULAR },
                { text: 'Most recent', value: ProjectOrderBy.RECENT },
                { text: 'Most viewed', value: ProjectOrderBy.VIEWED },
                // { text: 'Staff picks', value: ProjectOrderBy.STAFF_PICK },
              ]}
            />
          </Box>
        </Flex>

        <div className={classes.flexCenter}>{renderProjects()}</div>
      </div>
    </>
  );
}

ExploreProjectsMoasic.defaultProps = {
  size: 'small',
};
