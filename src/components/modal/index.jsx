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
  Box,
} from "@mui/material";

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
      <Box component="form" autoComplete="off">
        <DialogTitle>{isEditMode ? "Edit Event" : "New Event"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Title"
            fullWidth
            margin="dense"
            value={eventData.title}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length <= 30) {
                setEventData({ ...eventData, title: newValue });
              }
            }}
            error={eventData.title.trim() === ""}
            helperText={
              eventData.title.trim() === "" ? "Title is required" : ""
            }
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

          {isEditMode ? (
            <>
              <TextField
                id="start-date"
                label="Start Date"
                type="date"
                fullWidth
                margin="dense"
                value={
                  eventData.start
                    ? eventData.start.toLocaleDateString("en-CA")
                    : ""
                }
                onChange={(e) => {
                  const newStart = new Date(e.target.value);
                  setEventData((prev) => ({ ...prev, start: newStart }));
                }}
                inputLabel={{
                  shrink: true,
                }}
              />
              <TextField
                id="end-date"
                label="End Date"
                type="date"
                fullWidth
                margin="dense"
                value={
                  eventData.end ? eventData.end.toLocaleDateString("en-CA") : ""
                }
                onChange={(e) => {
                  const newEnd = new Date(e.target.value);
                  if (newEnd >= eventData.start) {
                    setEventData((prev) => ({ ...prev, end: newEnd }));
                  }
                }}
                inputLabel={{
                  shrink: true,
                }}
                slotProps={{
                  input: {
                    min: eventData.start
                      ? eventData.start.toLocaleDateString("en-CA")
                      : undefined,
                  },
                }}
              />
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          {isEditMode && (
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          )}
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            color="primary"
            disabled={isSaveDisabled}
          >
            {isEditMode ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EventModal;
