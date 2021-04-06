import { useState } from 'react';
import * as React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogContentText,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 450,
    },
    footer: {
      padding: theme.spacing(1, 3, 2),
    },
  })
);

export interface Field {
  name: string;
  value: string;
}

interface Props {
  title: string | JSX.Element;
  text?: string;
  fields: string[];
  onSubmit: (fields: Field[], checkList?: string[]) => void;
  open: boolean;
  onClose: () => void;
  selectionList?: string[];
  checkList?: string[]; // Checklist can be used to render checkboxes, and the checked ones will be submitted
  alert?: JSX.Element;
  textAreaConfig?: { [name: string]: number }; // make some fields textarea
}
export default function InputDialog({
  title,
  text,
  fields,
  onSubmit,
  open,
  onClose,
  selectionList,
  checkList,
  alert,
  textAreaConfig,
}: Props) {
  const classes = useStyles();
  const [fieldValues, setFieldValues] = useState<Field[]>(
    fields.map(field => ({ name: field, value: '' }))
  );
  const [checked, setChecked] = useState<string[]>(checkList || []);

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { id: name, value } = event.target;
    const fieldIndex = fieldValues.findIndex(f => f.name === name);
    const newValues = [...fieldValues];
    newValues[fieldIndex] = { name, value };
    setFieldValues(newValues);
  };

  // Used only if there is only one field and there are default options listed to select from
  const handleSelection = (option: string) => {
    setFieldValues([{ name: fields[0], value: option }]);
  };

  const handleCheckList = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setChecked(prev =>
      checked
        ? [...prev, event.target.name]
        : prev.filter(c => c !== event.target.name)
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(fieldValues, checked);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ className: classes.paper }}
    >
      {typeof title === 'string' ? <DialogTitle>{title}</DialogTitle> : title}
      <form onSubmit={handleSubmit} autoComplete="off">
        <DialogContent>
          {text && <DialogContentText>{text}</DialogContentText>}
          {checkList &&
            checkList.map(c => (
              <FormControlLabel
                key={c}
                control={
                  <Checkbox
                    checked={checked.includes(c)}
                    onChange={handleCheckList}
                    name={c}
                    color="primary"
                  />
                }
                label={c}
              />
            ))}
          {selectionList && fields.length === 1 && (
            <List
              dense
              subheader={
                <ListSubheader component="div">Existing options</ListSubheader>
              }
            >
              {selectionList.map(option => (
                <ListItem
                  key={option}
                  button
                  onClick={() => handleSelection(option)}
                >
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
          )}
          {alert}
          {fields.map((field, i) => (
            <TextField
              key={field}
              autoFocus={i === 0}
              value={
                selectionList && fields.length === 1
                  ? fieldValues[0].value
                  : undefined
              }
              margin="dense"
              id={field}
              variant="outlined"
              label={field}
              fullWidth
              multiline={textAreaConfig && field in textAreaConfig}
              rows={
                textAreaConfig && field in textAreaConfig
                  ? textAreaConfig[field]
                  : undefined
              }
              onChange={handleChange}
            />
          ))}
        </DialogContent>
        <DialogActions className={classes.footer}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
