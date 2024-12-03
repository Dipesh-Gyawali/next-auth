import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Auth</h1>
      <p>A simple authentication service</p>
      <br />
      <LoginButton>
        <Button variant="secondary">Sign in</Button>
      </LoginButton>
    </div>
  );
}
