import { useEffect, useState } from "react";
import { getSeminars, deleteSeminar, editSeminar } from "../libs/api";
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DeleteModal from "./modals/DeleteModal";
import SeminarCard from "../components/SeminarCard";
import { Seminar } from "../types/types";
import EditModal from "./modals/EditModal";

function SeminarList() {
  // Состояние для хранения списка семинаров
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  // Состояние для отображения загрузки
  const [loading, setLoading] = useState<boolean>(false);
  // Состояние для отображения ошибок
  const [error, setError] = useState<string>("");
  // Состояние для управления модальными окнами
  const [modalData, setModalData] = useState<{
    type: "edit" | "delete";
    seminar: Seminar | null;
  }>({
    type: "edit",
    seminar: null,
  });

  // Загрузка семинаров при монтировании компонента
  useEffect(() => {
    const loadSeminars = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getSeminars();
        setSeminars(data);
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    };
    loadSeminars();
  }, []);

  // Открытие модального окна для редактирования или удаления семинара
  const handleModalOpen = (type: "edit" | "delete", seminar: Seminar) => {
    setModalData({ type, seminar });
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setModalData({ type: "edit", seminar: null });
  };

  // Подтверждение удаления семинара
  const handleConfirmDelete = async () => {
    if (!modalData.seminar) return;

    const seminar = modalData.seminar;
    try {
      await deleteSeminar(seminar.id);
      setSeminars((prevSeminars) =>
        prevSeminars.filter((s) => s.id !== seminar.id)
      );
      handleCloseModal();
    } catch (error) {
      setError(String(error));
    }
  };

  // Сохранение изменений семинара
  const handleSaveEdit = async (updatedSeminar: Seminar) => {
    try {
      await editSeminar(updatedSeminar);
      setSeminars((prevSeminars) =>
        prevSeminars.map((seminar) =>
          seminar.id === updatedSeminar.id ? updatedSeminar : seminar
        )
      );
      handleCloseModal();
    } catch (error) {
      setError(String(error));
    }
  };

  // Отображение загрузки
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Отображение ошибки
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Список семинаров
      </Typography>

      <Grid2 container spacing={2} justifyContent="center">
        {seminars.map((seminar) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={seminar.id}>
            <SeminarCard
              {...seminar}
              onDelete={() => handleModalOpen("delete", seminar)}
              onEdit={() => handleModalOpen("edit", seminar)}
            />
          </Grid2>
        ))}
      </Grid2>

      <DeleteModal
        open={modalData.type === "delete" && modalData.seminar !== null}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <EditModal
        open={modalData.type === "edit" && modalData.seminar !== null}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
        initialSeminar={modalData.seminar}
      />
    </Container>
  );
}

export default SeminarList;
