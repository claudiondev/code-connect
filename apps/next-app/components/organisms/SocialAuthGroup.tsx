import { SocialButton } from "@/components/molecules/SocialButton";
import { Divider } from "@/components/atoms/Divider";
import { GithubIcon } from "@/components/atoms/icons/GithubIcon";
import { GoogleIcon } from "@/components/atoms/icons/GoogleIcon";

export function SocialAuthGroup() {
  return (
    <div className="space-y-3">
      <SocialButton icon={<GithubIcon className="h-4 w-4" />}>
        Continuar com GitHub
      </SocialButton>
      <SocialButton icon={<GoogleIcon className="h-4 w-4" />}>
        Continuar com Google
      </SocialButton>
      <Divider>
        <span className="font-mono">ou via email</span>
      </Divider>
    </div>
  );
}
