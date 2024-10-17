"use client";
// import { Modal, Button, Label } from "flowbite-react";
import { useState } from "react";
import {
  Modal,
  Button,
  Box,
  Input,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
// import { loginWithEmailAndPassword } from "@/features/games/api/game";
import useSWRMutation from "swr/mutation";
import { LocationModel } from "@/features/campaigns/types/games";
import { createLocation } from "@/features/campaigns/api/game";
import { fetcherWithTotal } from "@/libs/axios";
import { COLORS } from "@/utils/colors";
import { ModalStyle } from "@/utils/constants";
type LocationDialogModalProps = {
  openModal: boolean;
  setOpenModal: (flag: boolean) => void;
};

export const LocationDialogModal = ({
  openModal,
  setOpenModal,
}: LocationDialogModalProps) => {
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationModel>();

  const { trigger } = useSWRMutation(`/location`, fetcherWithTotal);

  const onSubmit: SubmitHandler<LocationModel> = async (
    data: LocationModel
  ) => {
    try {
      setIsProcessing(true);
      const res = await createLocation(data);
      trigger();
      setOpenModal(false);
      setValue("name", "");
    } catch (error: any) {
      setRequestError(error.response.data.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={ModalStyle}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={4}>
              <Typography id="modal-modal-title" variant="h6" component="h2" mt={2}>
                Location Name
              </Typography>
            </Box>
                <TextField
                  label="Location name"
                  {...register("name", {
                    required: "location name is required",
                  })}
                  sx={{ width: "100%" }}
                />
              <Box my={2}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 0,
                    boxShadow: 0,
                  }}
                  size="large"
                > 
                  {isProcessing && (
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 2 }} />
                  )}{" "}
                  <span style={{ fontWeight: "bold" }}>
                    Add
                  </span>
                </Button>
              </Box>
            </Box>
          </Box>
      </Modal>
    </>
  );
};
