import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";

export default function PasswordInput(props: any) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="relative h-full">
      {passwordVisible ? (
        <EyeOffIcon
          onClick={() => setPasswordVisible(false)}
          className="absolute top-1/2 transform -translate-y-1/2 right-3"
        />
      ) : (
        <EyeIcon
          onClick={() => setPasswordVisible(true)}
          className="absolute top-1/2 transform -translate-y-1/2 right-3"
        />
      )}
      <Input
        placeholder=""
        type={passwordVisible ? "text" : "password"}
        {...props}
      />
    </div>
  );
}
