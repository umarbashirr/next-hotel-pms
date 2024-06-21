import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/app/(auth)/_components/login-form";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Login to your account
          </CardTitle>
          <CardDescription>
            Welcome back! We are happy to see you today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
