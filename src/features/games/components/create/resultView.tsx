import * as React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import { ResGameDataModel } from '@/types/base';
import { useRouter } from "next/navigation";
import Image from 'next/image';

type ResultViewPropsType = {
  data: ResGameDataModel;
}

const ResultView = ({data}: ResultViewPropsType) => {
  const [genres, setGenres] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const router = useRouter();
  const editGame = () => {
    router.push(`/games/${data.game_uuid}`);
  }
  React.useEffect(() => {
    setGenres([]);
    setCategories([]);
    data.game_genres.forEach((genre) => setGenres((prev) => [...prev, genre.genre_name]));
    data.game_categories.forEach((category) => setCategories((prev) => [...prev, category.category_name]));
  }, [data]);
  return(
    <>
      {
        data ? (
          <>
            <Typography color={"blue"} sx={{'pb': 5, fontSize: 28}}>
              {data.game_name}
            </Typography>
            <Grid container spacing={2} sx={{color: 'black'}}>
              <Grid item xs={6}>
                <Image src={data.game_image} width={300} height={200} alt='game image'/>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{mb: 2}}>
                  <Typography sx={{fontSize: 20}}>
                    Description:
                  </Typography>
                  {data.game_description}
                </Box>
                <Box sx={{mb: 2}}>
                  <Typography sx={{fontSize: 20}}>
                    Genre:
                  </Typography>
                  {genres.map((genre) => (
                    <Button variant='outlined' key={genre} sx={{border: '1px solid red', borderRadius: '20px', mr: 1}}>{genre}</Button>
                  ))}
                </Box>
                <Box sx={{mb: 2}}>
                  <Typography sx={{fontSize: 20}}>
                    Category:
                  </Typography>
                  {categories.map((category) => (
                    <Button variant='outlined' key={category} sx={{border: '1px solid blue', borderRadius: '20px', mr: 1}}>{category}</Button>
                  ))}
                </Box>
                <Box sx={{pt: 2}}>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "capitalize", mr: 2 }}
                    onClick={() => editGame() }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "capitalize", color: 'error' }}
                    onClick={() => {router.push('/games')}}
                  >
                    Finish
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography color={'black'}>
            No data
          </Typography>
        )
      }
    </>
  )
}

export default ResultView;