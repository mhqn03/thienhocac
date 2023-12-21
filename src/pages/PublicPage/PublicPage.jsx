import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SignInButton } from "@clerk/clerk-react";

function PublicPage() {
  return (
    <Box>
      PublicPage
      <SignInButton>
        <Button
          sx={{
            color: "white",
          }}
        >
          Sign in
        </Button>
      </SignInButton>
    </Box>
  );
}

export default PublicPage;
