import { useCallback, useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import EventModal from "../modal";
import moment from "moment";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export default function BigCalendar() {
  const [myEvents, setMyEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [originalEventData, setOriginalEventData] = useState(null);
  const [eventData, setEventData] = useState({
    title: "",
    color: "blue",
    start: null,
    end: null,
  });

  const handleSelectSlot = useCallback(({ start, end }) => {
    const data = { title: "", color: "blue", start, end };
    setEventData(data);
    setOriginalEventData(data);
    setIsEditMode(false);
    setOpenModal(true);
  }, []);

  const handleSelectEvent = useCallback((event) => {
    const data = {
      title: event.title,
      color: event.color,
      start: event.start,
      end: event.end,
    };
    setEventData(data);
    setOriginalEventData(data);
    setSelectedEvent(event);
    setIsEditMode(true);
    setOpenModal(true);
  }, []);

  const handleSaveEvent = useCallback(() => {
    if (isEditMode) {
      setMyEvents((prev) =>
        prev.map((ev) =>
          ev.id === selectedEvent.id ? { ...ev, ...eventData } : ev
        )
      );
    } else {
      setMyEvents((prev) => [...prev, { id: nanoid(), ...eventData }]);
    }
    toast.success("Well done!");
    setOpenModal(false);
  }, [eventData, isEditMode, selectedEvent]);

  const handleDeleteEvent = useCallback(() => {
    setMyEvents((prev) => prev.filter((ev) => ev.id !== selectedEvent.id));
    setOpenModal(false);
    toast.success("Deleted");
  }, [selectedEvent]);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false;
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay: event.allDay }];
      });
    },
    [setMyEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );

  const eventStyleGetter = useCallback((event) => {
    const backgroundColor = event.color || "lightblue";
    return {
      style: { backgroundColor },
    };
  }, []);

  const defaultDate = useMemo(() => new Date(), []);

  return (
    <div>
      <h1>Calendar</h1>
      <DragAndDropCalendar
        defaultDate={defaultDate}
        defaultView={Views.MONTH}
        events={myEvents}
        localizer={localizer}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        selectable
        popup
        resizable
        style={{ height: 560 }}
      />

      <EventModal
        open={openModal}
        eventData={eventData}
        originalEventData={originalEventData}
        handleClose={() => setOpenModal(false)}
        handleSave={handleSaveEvent}
        handleDelete={handleDeleteEvent}
        setEventData={setEventData}
        isEditMode={isEditMode}
      />
    </div>
  );
}
