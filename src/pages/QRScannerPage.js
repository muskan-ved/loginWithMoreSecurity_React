import { QRCodeCanvas } from "qrcode.react";
import { Helmet } from "react-helmet-async";
// @mui
import {
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { FRONT_END_BASE_URL } from "src/config/config";


// ----------------------------------------------------------------------
export default function QRScannerPage() {

  const { id } = useParams();

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={`${FRONT_END_BASE_URL}/dashboard/yourDetail/${id}`}
      size={200}
      level={"H"}
    />
  );
  return (
    <>
      <Helmet>
        <title> QR code | Booking Direction </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Scan the Scanner
          </Typography>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2" gutterBottom>
            By the scanner visitor get the detail of their profile...
          </Typography>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="space-evenly"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {qrcode}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
