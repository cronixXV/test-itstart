import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Seminar } from "../types/types";

interface SeminarCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
  onDelete: (id: string) => void;
  onEdit: (seminar: Seminar) => void;
}

function SeminarCard({
  id,
  title,
  description,
  date,
  time,
  photo,
  onDelete,
  onEdit,
}: SeminarCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={photo} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {date} в {time}
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 1 }}
          onClick={() => onDelete(id)}
        >
          Удалить
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1, ml: 1 }}
          onClick={() => onEdit({ id, title, description, date, time, photo })}
        >
          Редактировать
        </Button>
      </CardContent>
    </Card>
  );
}

export default SeminarCard;
