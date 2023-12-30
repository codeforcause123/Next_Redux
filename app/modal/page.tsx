"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchUsers, increment } from "@/slices/userSlice";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Entity {
  name: string;
  id: number;
  age: number | string;
}

interface ListItemProps {
  entity: Entity;
  onEdit: (id: number) => void;
}

const ListItem: React.FC<ListItemProps> = ({ entity, onEdit }) => {
  return (
    <div>
      <Typography>
        {entity.name} - {entity.id}
      </Typography>
      <Button onClick={() => onEdit(entity.id)}>Edit</Button>
    </div>
  );
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(
    null
  );

  const handleOpen = (id: number) => {
    setSelectedItemId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedItemId(null);
    setOpen(false);
  };

  const handleEdit = (id: number) => {
    // Handle editing logic here
    console.log(`Editing item with id: ${id}`);
  };

  const dispatch = useDispatch<AppDispatch>();
  const { entities, loading, userscount } = useSelector(
    (state: RootState) => state.user
  );
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      {entities.map((entity: Entity) => (
        <ListItem key={entity.id} entity={entity} onEdit={handleOpen} />
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Entity
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Edit form goes here */}
            <input id="modal-modal-name" />
          </Typography>
          <Button onClick={() => handleEdit(selectedItemId!)}>Update</Button>
        </Box>
      </Modal>
    </div>
  );
}
