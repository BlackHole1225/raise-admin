"use client";
// import { Modal, Button, Label } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import {Modal, Button, Box, Typography, TextField, CircularProgress} from '@mui/material';
import { GenreParam } from "@/features/games/types/games";
import { createGenre } from "@/features/games/api/game";
import { fetcherWithTotal } from "@/libs/axios";
import { useEffect, useState } from "react";
import { ModalStyle } from "@/utils/constants";

type GenresDialogModalProps = {
  openModal: boolean;
  setOpenModal: (flag: boolean) => void;
};
export const GenresDialogModal = ({
  openModal,
  setOpenModal,
}: GenresDialogModalProps) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GenreParam>();

  const { trigger } = useSWRMutation(`/games/genres`, fetcherWithTotal);

  const onSubmit: SubmitHandler<GenreParam> = async (data: GenreParam) => {
    setIsProcessing(true);
    try {
      const res = await createGenre(data);
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
      <Modal open={openModal} onClose={() => setOpenModal(false)} >
        <Box  sx={ModalStyle}> 
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box mb={4}>
            <Typography id="modal-modal-title" variant="h6" component="h2" mt={2}>
              Genre Name
            </Typography>
          </Box>
          <TextField
            label={"Genre Name"}
            placeholder={"Genre Name"}
            margin="normal"
            fullWidth
            {...register("name", {
              required: "genre name is required",
            })}
            error={"name" in errors}
            helperText={errors?.name?.message}
            sx={{ my: -1 }}
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
