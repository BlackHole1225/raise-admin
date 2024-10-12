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
import useSWRMutation from "swr/mutation";
import { createCategory } from "@/features/games/api/game";
import { fetcherWithTotal } from "@/libs/axios";
import { COLORS } from "@/utils/colors";
import { CurrencyRequestParam } from "@/types/requests/finance";
import { createCurrency } from "@/features/Finace/api/finance";

type CategoryDialogModalProps = {
  openModal: boolean;
  setOpenModal: (flag: boolean) => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export const CurrencyDialogModal = ({
  openModal,
  setOpenModal,
}: CategoryDialogModalProps) => {
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencyRequestParam>();

  const { trigger } = useSWRMutation(`/games/categories`, fetcherWithTotal);

  const onSubmit: SubmitHandler<CurrencyRequestParam> = async (
    data: CurrencyRequestParam
  ) => {
    try {
      setIsProcessing(true);
      const res = await createCurrency(data);
      trigger();
      setOpenModal(false);
      setValue("currency_name", "");
    } catch (error: any) {
      setRequestError(error.response.data.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <div>
                <TextField
                  label="Currency name"
                  {...register("currency_name", {
                    required: "Currency name is required",
                  })}
                  sx={{ width: "100%" }}
                />
              </div>
              <div className="flex my-3">
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    textTransform: "capitalize",
                    backgroundColor: COLORS.blue,
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: COLORS.blue600,
                    },
                  }}
                >
                  {isProcessing && (
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 2 }} />
                  )}{" "}
                  add
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
