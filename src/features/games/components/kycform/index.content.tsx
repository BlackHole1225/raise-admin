"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { ResCampaignDataModel } from "@/types/base";
import { checkKycApi } from "../../api/game";
import { useSnackbar } from "@/contexts/snackbarContext";

type SetKycFormContentPropsType = {
  campaignData: ResCampaignDataModel;
}
const SetKycFormContent = ({ campaignData }: SetKycFormContentPropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const showSnackbar = useSnackbar();
 
  const checkKyc = async (id: string, state:string, file:string) => {
    try{
      await checkKycApi(id, state,file);
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

  return (
    <>
      <Box >
        <Typography color={'black'} sx={{ fontSize: 24 }}>Kyc Manage</Typography>
        <Grid container spacing={6} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <div className="xp-8">
                <img
                  src={campaignData ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/file/download/${campaignData.campaign_image}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
                  alt="Game"
                />
              </div>
            </Grid>
            <Grid item xs={12} className="flex gap-3 items-center">
              <p className="font-5">Title:</p>
              <Typography color={'black'} sx={{ fontSize: 20 }}> {campaignData?.title}</Typography>
            </Grid>
            <Grid item xs={12} className="flex gap-3 items-center">
              <p className="font-5">Reporter:</p>
              <Typography color={'black'} sx={{ fontSize: 20 }}> {campaignData?.createrId.fullName}</Typography>
            </Grid>
            <Grid item xs={12} className="">
              <p className="font-5">Description:</p>
              <p className="font-5 font-bold" dangerouslySetInnerHTML={{ __html: campaignData?.content[0].text }}></p>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <div className="xp-8">
                <img
                  className="w-full h-full object-cover"
                  src={campaignData ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/file/download/${campaignData.kyc.file}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
                  alt="kyc"
                />
              </div>
              <Grid item xs={12} className="flex gap-3 items-center">
                <p className="font-5">Kyc state:</p>
                <Typography color={'black'} sx={{ fontSize: 20 }}> {campaignData?.kyc.verify}</Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    checkKyc(campaignData._id, 'verified',campaignData.kyc.file);
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
                    checkKyc(campaignData._id, 'denied',campaignData.kyc.file);
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

export default SetKycFormContent;