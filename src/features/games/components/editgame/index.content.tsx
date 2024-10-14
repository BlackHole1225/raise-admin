"use client"
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import { ResGameDataModel } from "@/types/base";
import { UpdateGameModel } from "../../types/games";
import { GenreModel, CategoryModel } from "../../types/games";
import { checkKycApi, updateGame } from "../../api/game";
import { useSnackbar } from "@/contexts/snackbarContext";

type EditContentPropsType = {
  gameData: ResGameDataModel;
  genresData: GenreModel[];
  categoriesData: CategoryModel[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EditGameFormContent = ({ gameData }: EditContentPropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameName, setGameName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const router = useRouter();
  const showSnackbar = useSnackbar();
  console.log(gameData);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateGameModel>();

  const onSubmit: SubmitHandler<UpdateGameModel> = async (
    data: UpdateGameModel
  ) => {
    setIsLoading(true);
    try {

      const res = await updateGame(gameData.game_uuid, data, gameData.kyc.file);
      showSnackbar({
        newMessage: 'Game updated successfully',
        newSeverity: 'success'
      });
      router.push('/campaign');
    } catch (error) {
     
    } finally {
      setIsLoading(false);
    }
  };
  const checkKyc = async (id: string, state:string) => {
    try{
      const res = await checkKycApi(id, state);
      showSnackbar({
        newMessage: 'Kyc was ' + state + ' successfully',
        newSeverity: 'success'
      });
      router.push('/campaign');
    }catch(error){
      console.log('Error approving kyc: ', error);
      showSnackbar({
        newMessage: 'Error approving kyc',
        newSeverity: 'error'
      });
    } finally {
      setIsLoading(false)
    }

  }
  useEffect(() => {
    setGameName(gameData?.title);
    setValue("name", gameData?.game_name);
    setDescription(gameData?.content[0].text);
    setValue("description", gameData?.game_description);
  }, [gameData]);



  return (
    <>
      <Box >
        <Typography color={'black'} sx={{ fontSize: 24 }}>Kyc Manage</Typography>
        <Grid container spacing={6} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <div className="xp-8">
                <img
                  src={gameData ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/file/download/${gameData.file}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
                  alt="Game"
                />
              </div>
            </Grid>
            <Grid item xs={12} className="flex gap-3 items-center">
              <p className="font-5">Title:</p>
              <Typography color={'black'} sx={{ fontSize: 20 }}> {gameData?.title}</Typography>
            </Grid>
            <Grid item xs={12} className="flex gap-3 items-center">
              <p className="font-5">Reporter:</p>
              <Typography color={'black'} sx={{ fontSize: 20 }}> {gameData?.createrId.fullName}</Typography>
            </Grid>
            <Grid item xs={12} className="">
              <p className="font-5">Description:</p>
              <p className="font-5 font-bold" dangerouslySetInnerHTML={{ __html: gameData?.content[0].text }}></p>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <div className="xp-8">
                <img
                  className="w-full h-full object-cover"
                  src={gameData ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/file/download/${gameData.kyc.file}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
                  alt="kyc"
                />
              </div>
              <Grid item xs={12} className="flex gap-3 items-center">
                <p className="font-5">Kyc state:</p>
                <Typography color={'black'} sx={{ fontSize: 20 }}> {gameData?.kyc.verify}</Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    checkKyc(gameData._id, 'verified');
                  }}
                  color="primary"
                  disabled={isLoading}
                  sx={{ mt: 2, mr: 2 }}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    checkKyc(gameData._id, 'denied');
                  }}
                  disabled={isLoading}
                  sx={{ mt: 2 }}
                >
                  Deny
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
};

export default EditGameFormContent;