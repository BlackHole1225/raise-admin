"use client";
import { useState } from "react";
import {
  Modal,
  Button,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { fetcherWithTotal } from "@/libs/axios";
import { COLORS } from "@/utils/colors";
import { BlockchainRequestParam } from "@/types/requests/finance";
import { createBlockchain} from "@/features/Finace/api/finance";

type BlockchainDialogModalProps = {
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
export const BlockchainDialogModal = ({
  openModal,
  setOpenModal,
}: BlockchainDialogModalProps) => {
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BlockchainRequestParam>();

  const { trigger } = useSWRMutation(`/finance/blockchain`, fetcherWithTotal);

  const onSubmit: SubmitHandler<BlockchainRequestParam> = async (
    data: BlockchainRequestParam
  ) => {
    try {
      setIsProcessing(true);
      const res = await createBlockchain(data);
      trigger();
      setOpenModal(false);
      setValue("blockchain_name", "");
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
                  label="Blockchain name"
                  {...register("blockchain_name", {
                    required: "Blockchain name is required",
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
