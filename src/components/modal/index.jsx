/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
// import { DateTimePicker } from "@mui/lab";

const colors = ["red", "blue", "green", "orange", "purple"];

const EventModal = ({
  open,
  eventData,
  handleClose,
  handleSave,
  handleDelete,
  setEventData,
  isEditMode,
  originalEventData,
}) => {
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    const isTitleValid = eventData.title.trim() !== "";
    const hasChanges =
      JSON.stringify(eventData) !== JSON.stringify(originalEventData);
    setIsSaveDisabled(!(isTitleValid && hasChanges));
  }, [eventData, originalEventData]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditMode ? "Edit Event" : "New Event"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Title"
          fullWidth
          margin="dense"
          value={eventData.title}
          onChange={(e) =>
            setEventData({ ...eventData, title: e.target.value })
          }
          error={eventData.title.trim() === ""}
          helperText={eventData.title.trim() === "" ? "Title is required" : ""}
        />
        <TextField
          select
          label="Color"
          fullWidth
          margin="dense"
          value={eventData.color}
          onChange={(e) =>
            setEventData({ ...eventData, color: e.target.value })
          }
        >
          {colors.map((color) => (
            <MenuItem key={color} value={color}>
              {color}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        {isEditMode && (
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        )}
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary" disabled={isSaveDisabled}>
          {isEditMode ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
