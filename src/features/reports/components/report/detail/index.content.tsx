"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dropzone,
  FileMosaic,
  ExtFile,
  DropzoneProps
} from "@files-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HelperText, Spinner } from "flowbite-react";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  Avatar,
  AvatarGroup,
  colors,
  Select
} from "@mui/material";
import {
  BetsModel,
} from "@/features/esports/types/esports";
import { DistributeModel } from "@/features/reports/types";
import {
  createEsports,
  loadImage,
  updateEsports,
} from "@/features/esports/api/esports";
import { useSnackbar } from "@/contexts/snackbarContext";
import Link from "next/link";
import { RoomModel } from "@/features/auth/types";
import TeamAvatar from "@/components/UI/avatar/team_avatar";
import { tree } from "next/dist/build/templates/app-page";
import { distributeBalance } from "@/features/reports/api";
import useSWR from "swr";
import { BaseResponse } from "@/types/base";

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

type ReportDetailContentProps = {
  reportData: RoomModel[];
  betsData: BetsModel[];
  roomId: number|undefined;
};

export const ReportDetailContent = ({
  reportData,
  betsData,
  roomId
}: ReportDetailContentProps) => {
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [selectTeam, setSelectTeam] = useState<string>("default");

  const showSnackbar = useSnackbar();

  const router = useRouter();
  const changeValue = () => {

  }
  useEffect(()=>{
    console.log("reportData", reportData[0]);
    console.log("betsData", betsData);
    if (reportData[0].room_status !== "finished" && reportData[0].bet.bet_value !== 0) {
      setDisabled(false);
    }
  },[])
  const handleClick = async() => {
    if (selectTeam !== "default") {
      const payload : DistributeModel ={
        room_uuid: reportData[0].room_uuid,
        winnerteam_uuid: selectTeam
      }
      const res = await distributeBalance(payload).then(()=>{
        alert("報酬を正確に分配しました。");
        router.push("/reports/report");
      })  
    }
  }
  console.log(selectTeam);
  
  // const {
  //   register,
  //   setValue,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<UpdateEsportsGameModel>();

  // const onSubmit: SubmitHandler<UpdateEsportsGameModel> = async (
  //   data: UpdateEsportsGameModel
  // ) => {
  //   setIsLoading(true);
  //   // try {
  //   //   const res = await updateEsports(reportData.id, data);
  //   //   router.push("/esports-games");
  //   //   showSnackbar({
  //   //     newMessage: `${reportData.name} is updated successfully`,
  //   //     newSeverity: "success",
  //   //   });
  //   // } catch (error: any) {
  //   //   setRequestError(error.response.data.message);
  //   //   showSnackbar({
  //   //     newMessage: error.response.data.message,
  //   //     newSeverity: "error",
  //   //   });
  //   // } finally {
  //   //   setIsLoading(false);
  //   // }
  // };
  const betBounty = (bet_uuid: string) => {
    const value = betsData.filter((data)=>data.bet_uuid == bet_uuid)[0].bet_value;
    var result = value + value*0.9;
    return result;
  }

  return (
    <>
      <div className="px-10">
        <div className="my-5 text-center">
          <p className="text-xl font-bold">対戦結果・報酬分配</p>
        </div>
        <div className="w-full flex justify-center items-center p-5 mt-10 border rounded-md shadow">
          <div className="flex flex-col items-center mr-40">
            <p className="font-bold">ゲーム名: <span className="text-blue-600 ml-2 text-2xl">{reportData[0].game.name}</span></p>
            <span>{reportData[0].room_status}</span>
          </div>
          <div className="flex flex-col items-center mx-10">
            <span>対戦ボリューム</span>
            <p className="text-blue-600 font-bold">USD <span className="text-xl">{reportData[0].bet.bet_value}</span></p>
          </div>
          <div className="flex flex-col items-center mx-10">
            <span>ペイアウト</span>
            <p className="text-blue-600 font-bold">USD <span className="text-xl">{betBounty(reportData[0].bet.bet_uuid)}</span></p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center p-5 shadow-sm">
         <div className="flex flex-col items-center px-5 py-5">
            <p className="text-xl my-2 font-bold">{reportData[0].teams[0].team.team_name}<span className="ml-3 text-red-500">{reportData[0].teams[0].is_winner?"(Winner)":""}</span></p>
            <div>
              {
                reportData[0].teams[0].players.length == 1 &&
                <TeamAvatar 
                  url={reportData[0].teams[0].players[0].user.avatar}
                  is_winner={reportData[0].teams[0].is_winner}
                />
              }
              {
                reportData[0].teams[0].players.length > 1 &&
                <AvatarGroup>
                  {
                    reportData[0].teams[0].players.map((player)=>{
                      return <Avatar src={player.user.avatar} />
                    })
                  }
                </AvatarGroup>
              }
            </div>
          </div>
          <img src="/images/vs_versus.webp" className="w-40" alt="" />
          <div className="flex flex-col items-center px-5 py-5">
            <p className="text-xl my-2 font-bold">{reportData[0].teams[1].team.team_name}<span className="ml-3 text-red-500">{reportData[0].teams[1].is_winner?"(Winner)":""}</span></p>
            <div>
              {
                reportData[0].teams[1].players.length == 1 &&
                <TeamAvatar 
                  url={reportData[0].teams[1].players[0].user.avatar}
                  is_winner={reportData[0].teams[1].is_winner}
                />
              }
              {
                reportData[0].teams[1].players.length > 1 &&
                <AvatarGroup>
                  {
                    reportData[0].teams[1].players.map((player)=>{
                      return <Avatar src={player.user.avatar} />
                    })
                  }
                </AvatarGroup>
              }
            </div>
          </div>
        </div>
        <div className="my-5 text-center">
          <p className="font-bold">報告結果 ({reportData[0].team_size.memo})</p>
        </div>
        {
          roomId && 
          <div className="w-full flex flex-col justify-center items-start p-5">
            {
              reportData[0].team_size.memo === "1 vs 1" && 
              <div className="w-full flex justify-center items-center">
                <div className="flex flex-col items-start border-r-2 px-10 py-5">
                  <span className="font-bold">{reportData[0].teams[0].team.team_name}</span>
                  {
                    reportData[0].teams[0].players.length !== 0 &&
                    <Link href={`https://esmembers.s3.ap-northeast-1.amazonaws.com/esport/${reportData[0].game.id}/matches/${roomId}/proofs/${reportData[0].teams[0].players[0].player_uuid}.png`} target="_blank"><img src={`https://esmembers.s3.ap-northeast-1.amazonaws.com/esport/${reportData[0].game.id}/matches/${roomId}/proofs/${reportData[0].teams[0].players[0].player_uuid}.png`} alt="teamA" className="w-[300px] rounded" /></Link>
                  }
                </div>
                <div className="flex flex-col items-start px-10 py-5">
                  <span className="font-bold">{reportData[0].teams[1].team.team_name}</span>
                  {
                    reportData[0].teams[1].players.length !== 0 &&
                    <Link href={`https://esmembers.s3.ap-northeast-1.amazonaws.com/esport/${reportData[0].game.id}/matches/${roomId}/proofs/${reportData[0].teams[1].players[0].player_uuid}.png`} target="_blank"><img src={`https://esmembers.s3.ap-northeast-1.amazonaws.com/esport/${reportData[0].game.id}/matches/${roomId}/proofs/${reportData[0].teams[1].players[0].player_uuid}.png`} alt="teamA" className="w-[300px] rounded" /></Link>
                  }
                </div>
              </div>
            }
            {
              reportData[0].team_size.memo !== "1 vs 1" &&
              <div className="w-full flex flex-col justify-start items-start px-20">
                <span className="font-bold mt-2">{reportData[0].teams[0].team.team_name}</span>
                <div className="w-full flex justify-start items-center">
                  {
                    reportData[0].teams[0].players.map((player)=>{
                      return <Link href={`https://esmembers.s3.ap-northeast-1.amazonaws.com/esport/${reportData[0].game.id}/matches/${roomId}/proofs/${player.player_uuid}.png`} target="_blank"><img src={`https://esmembers.s3.ap-northeast-1.amazonaws.com/esport/${reportData[0].game.id}/matches/${roomId}/proofs/${player.player_uuid}.png`} alt="teamA" className="w-[100px] rounded mr-1" /></Link>
                    })
                  }
                </div>
                <span className="font-bold mt-2">{reportData[0].teams[0].team.team_name}</span>
                <div className="w-full flex justify-start items-center">
                  {
                    reportData[0].teams[0].players.map((player)=>{
                      return <Link href={`https://esmembers.s3.ap-northeast-1.amazonaws.com/esport/${reportData[0].game.id}/matches/${roomId}/proofs/${player.player_uuid}.png`} target="_blank"><img src={`https://esmembers.s3.ap-northeast-1.amazonaws.com/esport/${reportData[0].game.id}/matches/${roomId}/proofs/${player.player_uuid}.png`} alt="teamA" className="w-[100px] rounded mr-1" /></Link>
                    })
                  }
                </div>
              </div>
            }
          </div>
        }
        <div className="w-full flex justify-center items-center">
            <button onClick={handleClick} className={!disabled?'border border-blue-500 px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white mx-5':'border border-gray-500 px-5 py-2 rounded-full bg-gray-500 text-white mx-5'} disabled={disabled}>報酬分配</button>
            <Select
              defaultValue={"default"}
              id="named-select"
              name="demo-select"
              sx={{ width: '150px', height: '40px' }}
              value={selectTeam}
              onChange={(e)=>setSelectTeam(e.target.value)}
            >
              <MenuItem value={"default"}>Select Team</MenuItem>
              {
                reportData[0].teams.map((item)=>{
                  return <MenuItem value={item.team.team_uuid}>{item.team.team_name}</MenuItem>
                })
              }
            </Select>
          </div>
      </div>
    </>
  );
};
