"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dropzone, FileMosaic, ExtFile } from "@files-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  TextField,
  Checkbox,
  InputLabel,
  MenuItem,
  OutlinedInput,
  FormControl,
  ListItemText,
  FormHelperText,
  Box,
  Grid,
  Button,
  FormControlLabel,
} from "@mui/material";
import {
  BetsModel,
  CreateEsportsGameModel,
} from "@/features/esports/types/esports";
import { createEsports } from "@/features/esports/api/esports";
import { useSnackbar } from "@/contexts/snackbarContext";

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

type EsportsGameAddFormProps = {
  betsData: BetsModel[];
  categoriesData: string[];
  genresData: string[];
};
export const EsportsGameAddForm = ({
  categoriesData,
  betsData,
  genresData,
}: EsportsGameAddFormProps) => {
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<ExtFile[]>([]);

  const [bets, setBets] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const showSnackbar = useSnackbar();

  const router = useRouter();

  const onchangeFile = (incommingFile: ExtFile[]) => {
    setFiles(incommingFile);
    setValue("image", incommingFile[0].file as File);
  };

  const removeFile = () => {
    setFiles([]);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEsportsGameModel>();

  const onSubmit: SubmitHandler<CreateEsportsGameModel> = async (
    data: CreateEsportsGameModel
  ) => {
    setIsLoading(true);
    try {
      const res = await createEsports(data);
      router.push("/esports-games");
      showSnackbar({
        newMessage: "New esports game is created successfully",
        newSeverity: "success",
      });
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

  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof categories>
  ) => {
    const {
      target: { value },
    } = event;

    const selectedValues = Array.isArray(value) ? value : [value];
    setValue("categories", selectedValues);
    setCategories(selectedValues);
  };

  const handleBetsChange = (event: SelectChangeEvent<typeof bets>) => {
    const {
      target: { value },
    } = event;
    const selectedValues = Array.isArray(value) ? value : [value];
    setValue("bets", selectedValues);
    setBets(selectedValues);
  };

  // const handleGenresChange = (event: SelectChangeEvent<typeof genres>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   const selectedValues = Array.isArray(value) ? value : [value];
  //   setValue("genres", selectedValues);
  //   setGenres(selectedValues);
  // };

  useEffect(() => {
    setValue("categories", []);
    setValue("bets", []);
  }, [setValue]);

  return (
    <>
      <Box>
        <Box sx={{ my: 5 }}>Create Esports Game</Box>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id=""
                label="Game Name"
                sx={{ width: "100%" }}
                {...register("name", {
                  required: "Name is required",
                })}
                error={"name" in errors}
                helperText={errors?.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Game Description"
                sx={{ width: "100%" }}
                multiline
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                error={"description" in errors}
                helperText={errors?.description?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="timer"
                type="number"
                label="Game Timer(In seconds)"
                sx={{
                  "& input": {
                    "&:focus": {
                      boxShadow: "none",
                    },
                  },
                  width: "100%",
                }}
                {...register("timer", {
                  required: "Timer is required",
                })}
                error={"timer" in errors}
                helperText={errors?.timer?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Bets</InputLabel>
                <Select
                  labelId="bets-multiple-checkbox-label"
                  id="bets-multiple-checkbox"
                  fullWidth
                  multiple
                  value={bets}
                  {...register("bets")}
                  onChange={handleBetsChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => {
                    return selected
                      .map((selectedValue) => {
                        const selectedBet = betsData.find(
                          (item) => item.bet_uuid === selectedValue
                        );
                        return selectedBet
                          ? `USD ${selectedBet.bet_value}`
                          : "";
                      })
                      .join(", ");
                  }}
                  MenuProps={MenuProps}
                >
                  {betsData.map((item) => (
                    <MenuItem key={item.bet_uuid} value={item.bet_uuid}>
                      <Checkbox checked={bets?.indexOf(item.bet_uuid) > -1} />
                      <ListItemText primary={`USD ` + item.bet_value} />
                    </MenuItem>
                  ))}
                </Select>

                {errors.bets && (
                  <FormHelperText className="text-[#d32f2f]">
                    {errors.bets.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">
                  Category
                </InputLabel>{" "}
                <Select
                  labelId="categories-multiple-checkbox-label"
                  id="categories-multiple-checkbox"
                  multiple
                  value={categories}
                  {...register("categories")}
                  onChange={handleCategoriesChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {categoriesData.map((category) => (
                    <MenuItem key={category} value={category}>
                      <Checkbox checked={categories?.indexOf(category) > -1} />
                      <ListItemText primary={category} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">
                  Genres
                </InputLabel>{" "}
                <Select
                  labelId="genres-multiple-checkbox-label"
                  id="genres-multiple-checkbox"
                  multiple
                  value={genres}
                  {...register("genres")}
                  onChange={handleGenresChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {genresData.map((genres) => (
                    <MenuItem key={genres} value={genres}>
                      <Checkbox checked={genres?.indexOf(genres) > -1} />
                      <ListItemText primary={genres} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                label="+17 age"
                control={
                  <Checkbox
                    {...register("is_age_limit")}
                    // // checked={checked[0] && checked[1]}
                    // indeterminate={checked[0] !== checked[1]}
                    // onChange={handleChange1}
                  />
                }
              />
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

              {errors.image && (
                <FormHelperText className="text-[#d32f2f]">
                  {errors.image.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: "capitalize" }}
              >
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: "#fff", mr: 2 }} />
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
  );
};
