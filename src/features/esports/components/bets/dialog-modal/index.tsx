"use client";
import { SubmitHandler, useForm } from "react-hook-form";
// import { loginWithEmailAndPassword } from "@/features/games/api/game";
import useSWRMutation from "swr/mutation";
import {
  Modal,
  Button,
  Box,
  Input,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { CreateBetsModel } from "@/features/esports/types/esports";
import { createBet } from "@/features/esports/api/esports";
import { fetcherWithTotal } from "@/libs/axios";
import { useState } from "react";
import { ModalStyle } from "@/utils/constants";
type EsportsBetsDialogModalProps = {
  openModal: boolean;
  setOpenModal: (flag: boolean) => void;
};
export const EsportsBetsDialogModal = ({
  openModal,
  setOpenModal,
}: EsportsBetsDialogModalProps) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [requestError, setRequestError] = useState<string | null>(null);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBetsModel>();

  const { trigger } = useSWRMutation(`/esports/bets`, fetcherWithTotal);

  const onSubmit: SubmitHandler<CreateBetsModel> = async (
    data: CreateBetsModel
  ) => {
    setIsProcessing(true);
    try {
      const res = await createBet(data);
      trigger();
      setOpenModal(false);
      setValue("bet_value", 0);
    } catch (error: any) {
      setRequestError(error.response.data.message);
    }finally {
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
                Bet value
              </Typography>
            </Box>
              <TextField
                label="Bet Value"
                {...register("bet_value", {
                  required: "Bet value is required",
                })}
                sx={{ width: "100%" }}
                type="number"
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
