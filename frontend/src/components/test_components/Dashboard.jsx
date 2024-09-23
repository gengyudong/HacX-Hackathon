import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import PhotoIcon from "@mui/icons-material/DirtyLens";
import SecurityIcon from "@mui/icons-material/Security";
import TextAnalysis from "./text_analysis/TextAnalysis";
import PhotoAnalysis from "./photo_analysis/PhotoAnalysis";
import LandingPage from "./LandingPage";

const NAVIGATION = [
  {
    segment: "textanalysis",
    title: "Text Analysis",
    icon: <TroubleshootIcon />,
  },
  {
    segment: "photoanalysis",
    title: "Photo Analysis",
    icon: <PhotoIcon />,
  },
];

const Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent({ pathname }) {
  if (pathname === "/main") {
    return <LandingPage />;
  }
  if (pathname === "/textanalysis") {
    return <TextAnalysis />;
  }
  if (pathname === "/photoanalysis") {
    return <PhotoAnalysis />;
  }
}

function DashboardLayoutBranding() {

  const [pathname, setPathname] = React.useState("/main");
  
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <SecurityIcon color="primary" />,
        title: "Info-CrimeWatch",
      }}
      router={router}
      theme={Theme}
    >
      <DashboardLayout>
        <PageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
export default DashboardLayoutBranding;
