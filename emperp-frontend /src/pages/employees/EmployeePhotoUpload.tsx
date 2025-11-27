import { useState } from "react";
import { uploadPhoto } from "../../api/employee.api";
import { Button, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export default function EmployeePhotoUpload() {
  const { id } = useParams();
  const nav = useNavigate();

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const upload = async () => {
    if (!photoFile) {
      alert("Please select an image.");
      return;
    }

    await uploadPhoto(Number(id), photoFile);
    alert("Uploaded successfully!");

    nav("/employees");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h2>Upload Employee Photo</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setPhotoFile(e.target.files ? e.target.files[0] : null)
        }
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={upload}
      >
        Upload
      </Button>
    </Container>
  );
}
