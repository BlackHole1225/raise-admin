"use client";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Typography,
  TextField,
  Box,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormHelperText,
  Button,
  CircularProgress
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dropzone, FileMosaic, ExtFile } from "@files-ui/react";
import { GameDataModel, ResGameDataModel } from "@/types/base";
import { CategoryModel, GenreModel, CreateGameModel } from "../../types/games";
import { useSnackbar } from "@/contexts/snackbarContext";
import { createGame } from "../../api/game";

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


type GameAddProps = {
  categoriesData: CategoryModel[];
  genresData: GenreModel[];
  gameInfo: GameDataModel;
  toNext: () => void;
  setResultData: (data: ResGameDataModel) => void;
}

const GameInfo = ({categoriesData, genresData, gameInfo, toNext, setResultData}: GameAddProps) => {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [gameSource, setGameSource] = useState('');
  const [gameName, setGameName] = useState('');
  const [gameVersion, setGameVersion] = useState('');
  const showSnackbar = useSnackbar();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGameModel>();

  const onSubmit: SubmitHandler<CreateGameModel> = async (data: CreateGameModel) => {
    setIsLoading(true);
    try {
      let selectedCatIds = data.categories.map((categoryName: string) => {
        const cat = categoriesData.find((cat) => cat.category_name === categoryName);
        return cat?.category_uuid;
      });
      data.categories = selectedCatIds;
      
      let selectedGenIds = data.genres.map((genreName: string) => {
        const genre = genresData.find((genre) => genre.genre_name === genreName);
        return genre?.genre_uuid;
      });
      data.genres = selectedGenIds;
      const res = await createGame(data);
      setIsLoading(false);
      showSnackbar({
        newMessage: 'Game created successfully',
        newSeverity: 'success'
      });
      setResultData(res.data.data);
      toNext();
    } catch (error) {
      console.error('Error creating game: ', error);
      showSnackbar({
        newMessage: 'Error creating game',
        newSeverity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  }  

  const handleCategoriesChange = ( event: any ) => {
    const {
      target: { value },
    } = event;

    const selectedValues = Array.isArray(value) ? value : [value];
    setSelectedCategories(selectedValues);
  };

  const handleGenresChange = ( event: any ) => {
    const {
      target: { value },
    } = event;

    const selectedValues = Array.isArray(value) ? value : [value];
    setSelectedGenres(selectedValues);
  };

  const onchangeFile = (incommingFile: ExtFile[]) => {
    setFiles(incommingFile);
    setValue("cover", incommingFile[0].file as File);
  };

  const removeFile = () => {
    setFiles([]);
  };

  useEffect(() => {
    setValue("categories", []);
    setValue("genres", []);
  }, [setValue]);

  useEffect(() => {
    setGameName(gameInfo?.metadata?.name);
    setGameVersion(gameInfo?.metadata?.version);
    setGameSource(gameInfo?.name);
    setValue("source", gameInfo?.name);
  }, [gameInfo]);

  return (
    <>
      <Box>
        <Typography color={"black"} sx={{'pb': 5, fontSize: 20}}>
          Game Information
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <TextField
              sx={{                
                display: "none",
              }}
              value={gameSource}
              {...register("source")}
            />
            <Grid item xs={12}>
              <TextField
                label="Game Name"
                sx={{
                  "& input": {
                    "&:focus": {
                      boxShadow: "none",
                    },
                  },
                  width: "100%",
                }}
                value={gameName}
                {...register("name", {
                  required: "Name is required",
                })}
                error={"name" in errors}
                helperText={errors?.name?.message}
                onChange={(e) => setGameName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Version"
                sx={{
                  "& input": {
                    "&:focus": {
                      boxShadow: "none",
                    },
                  },
                  width: "100%",
                }}
                value={gameVersion}
                {...register("version", {
                  required: "Version is required",
                })}
                error={"version" in errors}
                onChange={(e) => setGameVersion(e.target.value)}
                helperText={errors?.version?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Game Description"
                multiline
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                error={"description" in errors}
                helperText={errors?.description?.message}
                sx={{
                  "& textarea": {
                    "&:focus": {
                      boxShadow: "none",
                    },
                  },
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">
                  Category
                </InputLabel>{" "}
                <Select
                  labelId="game-categories-multiple-checkbox-label"
                  id="game-categories-multiple-checkbox"
                  multiple
                  value={selectedCategories}
                  {...register("categories")}
                  onChange={handleCategoriesChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(",")}
                  MenuProps={MenuProps}
                >
                  {categoriesData.map((category) => (
                    <MenuItem key={category.category_uuid} value={category.category_name}>
                      <Checkbox checked={selectedCategories?.indexOf(category.category_name) > -1} />
                      <ListItemText primary={category.category_name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">
                  Genres
                </InputLabel>{" "}
                <Select
                  labelId="game-genres-multiple-checkbox-label"
                  id="game-genres-multiple-checkbox"
                  multiple
                  value={selectedGenres}
                  {...register("genres")}
                  onChange={handleGenresChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {genresData.map((gen) => (
                    <MenuItem key={gen.genre_uuid} value={gen.genre_name}>
                      <Checkbox checked={selectedGenres?.indexOf(gen.genre_name) > -1} />
                      <ListItemText primary={gen.genre_name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Dropzone
                onChange={onchangeFile}
                value={files}
                // accept="image/*"
                maxFiles={1}
                label=""
                behaviour={"replace"}
              >
                {files.map((file: ExtFile) => (
                  <FileMosaic
                    key={file.id}
                    {...file}
                    onDelete={removeFile}
                    info={true}
                    preview
                  />
                ))}
              </Dropzone>

              {errors.cover && (
                <FormHelperText className="text-[#d32f2f]">
                  {errors.cover.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item sx={{ marginLeft: "auto"}}>
              <Button
                type="submit"
                variant="outlined"
                sx={{ textTransform: "capitalize" }}
              >
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: "black", mr: 1 }} />
                ) : (
                  <></>
                )}
                save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default GameInfo;