import { Seminar } from "../types/types";

const API_URL = "http://localhost:5001/seminars";

export const getSeminars = async (): Promise<Seminar[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching seminars:", error);
    throw error;
  }
};

export const deleteSeminar = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting seminar:", error);
    throw error;
  }
};

export const editSeminar = async (seminar: Seminar) => {
  try {
    const response = await fetch(`${API_URL}/${seminar.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seminar),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating seminar:", error);
    throw error;
  }
};
