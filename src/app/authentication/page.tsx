import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

const AuthenticationPage = () => {
  return (
    <div className="h-screen flex w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-96">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Criar conta</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>

        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
