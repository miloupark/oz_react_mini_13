import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/authSchemas";
import InputField from "@/components/InputField";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// shadcn/ui Form + react-hook-form + zod

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema), // zod 스키마로 검증
    defaultValues: { email: "", password: "" }, // RHF이 관리할 초기 값
    mode: "onTouched", // 해당 필드 한 번이라도 만지고 나면 에러 표시
    shouldFocusError: true, // 에러 발생 시 해당 필드로 포커스
  });

  const onSubmit = (data) => {
    // 로그인 테스트
    login({ email: data.email, name: "Demo User" });
    navigate("/", { replace: true });
    // 실제 로그인 API 호출
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto grid justify-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        {/* RHF 컨텍스트 제공 */}
        <Form {...form}>
          {/* 네이티브 제출 form 태그 */}
          <form
            noValidate // RHF + zod로만 검증, 에러는 <FormMessage />로
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <CardContent className="space-y-5">
              {/* 아래의 InputField들이 form.control을 컨텍스트로 받음 */}
              <InputField
                form={form}
                name="email"
                label="Email"
                type="email"
                placeholder="example@example.com"
                autoComplete="email"
              />
              <InputField
                form={form}
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>

              <Button type="button" variant="outline" className="w-full">
                Login with Google
              </Button>

              <Button asChild variant="link">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
}
