import SignUp from "../routes/auth/SignUp";
import {Container} from "@material-ui/core";
import React from "react";


export default function AuthenticationContainer(props: any) {
  const { children,  ...other } = props;

  return(
      <Container maxWidth="sm" style={{ marginTop: '64px', height: '600px' }}>
        {children}
      </Container>
  );
}
