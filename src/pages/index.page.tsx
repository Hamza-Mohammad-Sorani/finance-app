import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Box, Button, Container, Typography } from "@mui/material";

export default function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = router.locale === "en" ? "ar" : "en";
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("welcome")}
        </Typography>
        <Button variant="contained" onClick={toggleLanguage}>
          {t("switchLanguage")}
        </Button>
      </Box>
    </Container>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
