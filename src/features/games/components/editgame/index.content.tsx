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
import { updateGame } from "../../api/game";
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

const EditGameFormContent = ({gameData, genresData, categoriesData}: EditContentPropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameName, setGameName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const router = useRouter();
  const showSnackbar = useSnackbar();

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
      let selectedCatIds = selectedCategories.map((categoryName: string) => {
        const cat = categoriesData.find((cat) => cat.category_name === categoryName);
        return cat?.category_uuid;
      });
      data.categories = selectedCatIds;
      
      let selectedGenIds = selectedGenres.map((genreName: string) => {
        const genre = genresData.find((genre) => genre.genre_name === genreName);
        return genre?.genre_uuid;
      });
      data.genres = selectedGenIds;
      const res = await updateGame(gameData.game_uuid, data);
      showSnackbar({
        newMessage: 'Game updated successfully',
        newSeverity: 'success'
      });
      router.push('/games');
    } catch (error) {
      console.log('Error updating game: ', error);
      showSnackbar({
        newMessage: 'Error updating game',
        newSeverity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenresChange = ( event: any ) => {
    const {
      target: { value },
    } = event;

    console.log('Genre changed: ', value);
    const selectedValues = Array.isArray(value) ? value : [value];
    setSelectedGenres(selectedValues);
  };

  const handleCategoriesChange = ( event: any ) => {
    const {
      target: { value },
    } = event;

    const selectedValues = Array.isArray(value) ? value : [value];
    setSelectedCategories(selectedValues);
  };

  useEffect(() => {
    setGameName(gameData?.game_name);
    setValue("name", gameData?.game_name);
    setDescription(gameData?.game_description);
    setValue("description", gameData?.game_description);
    setSelectedGenres([]);
    setSelectedGenres(gameData?.game_genres.map((genre) => genre.genre_name));
    setSelectedCategories(gameData?.game_categories.map((category) => category.category_name));
  }, [gameData]);

  useEffect(() => {
    setValue("categories", []);
    setValue("genres", []);
  }, [setValue]);

  return(
    <>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Typography color={'black'} sx={{fontSize: 20}}>Edit Game</Typography>
        <Grid container spacing={6} sx={{mt: 1}}>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <img src={gameData.game_image} />
            </Grid>
          </Grid>
          <Grid item xs={6}>
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
              <TextField
                label="Description"
                multiline
                rows={4}
                value={description}
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
                  mt: 2,
                }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormControl fullWidth sx={{mt: 2}}>
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
              <FormControl fullWidth sx={{mt: 2}}>
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
              <Grid item xs={12} sx={{textAlign: 'right'}}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  sx={{mt: 2, mr: 2}}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isLoading}
                  sx={{mt: 2}}
                  onClick={() => router.back()}
                >
                  Cancel
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