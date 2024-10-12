"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dropzone,
  FileMosaic,
  ExtFile,
  AvatarProps,
  DropzoneProps,
  Avatar,
} from "@files-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HelperText, Spinner } from "flowbite-react";
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
  Button,
} from "@mui/material";
import {
  BetsModel,
  CreateEsportsGameModel,
  EsportsGameModel,
  UpdateEsportsGameModel,
} from "@/features/esports/types/esports";
import {
  createEsports,
  loadImage,
  updateEsports,
} from "@/features/esports/api/esports";
import { useSnackbar } from "@/contexts/snackbarContext";
import Link from "next/link";

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

type EsportsGameViewContentProps = {
  gameData: EsportsGameModel;
  betsData: BetsModel[];
  categoriesData: string[];
};

export const EsportsGameViewContent = ({
  gameData,
  categoriesData,
  betsData,
}: EsportsGameViewContentProps) => {
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<ExtFile[]>([]);

  const [bets, setBets] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [imageSource, setImageSource] = useState<AvatarProps["src"]>(
    gameData?.cover.replace("%5C", "/")
  );
  const showSnackbar = useSnackbar();

  const router = useRouter();

  const handleChangeSource = (selectedFile: File) => {
    setImageSource(selectedFile);

    setValue("image", selectedFile);
  };
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateEsportsGameModel>();

  const onSubmit: SubmitHandler<UpdateEsportsGameModel> = async (
    data: UpdateEsportsGameModel
  ) => {
    setIsLoading(true);
    try {
      const res = await updateEsports(gameData.id, data);
      router.push("/esports-games");
      showSnackbar({
        newMessage: `${gameData.name} is updated successfully`,
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

  useEffect(() => {
    setValue("categories", []);
    setValue("bets", []);
  }, [setValue]);

  useEffect(() => {
    function setData() {
      if (gameData != undefined) {
        setValue("name", gameData.name);
        setValue("description", gameData.description);
        const bets = Array.isArray(gameData.bets)
          ? gameData.bets.map((item) => item.bet_uuid)
          : [gameData.bets];
        setValue("bets", bets);
        setBets(bets);

        const categories = Array.isArray(gameData.categories)
          ? gameData.categories
          : [gameData.categories];
        setValue("categories", categories);
        setCategories(categories);

        if (gameData.cover) {
          setImageSource(gameData.cover.replace("%5C", "/"));
        }
      }
    }
    setData();
  }, [gameData, setValue]);

  return (
    <>
      <div className="px-10 py-16">
        <div className="my-5">Create Esports Game</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5">
            <TextField
              id=""
              label="Game Name"
              className="w-full"
              {...register("name", {
                required: "Name is required",
              })}
              error={"name" in errors}
              helperText={errors?.name?.message}
            />
          </div>
          <div className="my-5">
            <TextField
              id="description"
              label="Game Description"
              className="w-full"
              multiline
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
              error={"description" in errors}
              helperText={errors?.description?.message}
            />
          </div>
          <div className="my-5">
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
                      return selectedBet ? `USD ${selectedBet.bet_value}` : "";
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
          </div>
          <div className="my-5">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">Genres</InputLabel>{" "}
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
          </div>{" "}
          <div className="my-5 ">
            <Avatar
              src={imageSource}
              alt="Avatar"
              onChange={handleChangeSource}
              style={{ width: "250px", height: "250px" }}
              smartImgFit={false}
            />
            {errors.image && (
              <FormHelperText className="text-[#d32f2f]">
                {errors.image.message}
              </FormHelperText>
            )}
          </div>
          <div className="my-5 flex float-right">
            <Link href={"/esports-games"} className="mt-2 mr-5">
              Cancel
            </Link>
            {/* <Button type="submit" className="text-center">
              {isLoading ? <Spinner /> : <></>}
              save
            </Button> */}
            <Button
              variant="contained"
              type="submit"
              sx={{
                textTransform: "capitalize",
              }}
            >
              {isLoading ? <Spinner /> : <></>}save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
