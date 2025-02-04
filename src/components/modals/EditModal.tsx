import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Seminar } from "../../types/types";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (seminar: Seminar) => void;
  initialSeminar: Seminar | null;
}

function EditModal({ open, onClose, onSave, initialSeminar }: EditModalProps) {
  // Состояние для хранения данных семинара
  const [seminar, setSeminar] = useState<Seminar>({
    id: "",
    title: "",
    description: "",
    date: "",
    time: "",
    photo: "",
  });

  // Обновление состояния семинара при изменении initialSeminar
  useEffect(() => {
    if (initialSeminar) {
      setSeminar(initialSeminar);
    }
  }, [initialSeminar]);

  // Обработчик изменения значений полей ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSeminar((prevSeminar) => ({
      ...prevSeminar,
      [name]: value,
    }));
  };

  // Обработчик сохранения изменений семинара
  const handleSave = () => {
    onSave(seminar);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать семинар</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          label="Название"
          value={seminar.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Описание"
          value={seminar.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="date"
          label="Дата"
          value={seminar.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="time"
          label="Время"
          value={seminar.time}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="photo"
          label="Фото"
          value={seminar.photo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
