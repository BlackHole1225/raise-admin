import { useState } from 'react';
import { Typography, Button, Box } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { uploadGameFile } from '../../api/game';
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "@/contexts/snackbarContext";
import { GameDataModel } from '@/types/base';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type UploadGamePropsType = {
  toNext: () => void;
  setGameInfo: (info: GameDataModel) => void;
}

const UploadGame = ({toNext, setGameInfo}: UploadGamePropsType) => {

  const [gameFile, setGameFile] = useState<File>();
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showSnackbar = useSnackbar();

  const handleGameUpload = (e: any) => {
    const file = e.target.files[0];
    setGameFile(file);
  };

  const handleNext = async () => {
    if (!gameFile) return;
    const formData = new FormData();
    formData.append("file", gameFile, gameFile?.name);
    setIsLoading(true);
    try {
      const res = await uploadGameFile(formData);
      setGameInfo(res.data.data);
      toNext();
    } catch (error: any) {
      setRequestError(error.response.data.message);
      showSnackbar({
        newMessage: error.response.data.message,
        newSeverity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Typography color={"black"} sx={{'pb': 5, fontSize: 20}}>
        Upload game
      </Typography>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{ 'mt': 2, width: '100%', height: '150px', borderRadius: 3, }}
      >
        {gameFile ? gameFile.name : 'Please upload a game file. (Supported file formats: .apk, .zip)'}
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => handleGameUpload(e)}
          accept="application/vnd.android.package-archive,application/zip"
        />
      </Button>
      <Box sx={{textAlign: "right", mr: 2}}>
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize", mt: 2 }}
          onClick={handleNext}
        >
          {isLoading ? (
            <>
              <CircularProgress size={20} sx={{ color: "#555", mr: 2 }} />
              Uploading
            </>
          ) : (
            <>
              Next
            </>
          )}
        </Button>
      </Box>
    </>
  )
}

export default UploadGame;