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
import { signupSchema } from "@/lib/authSchemas";
import InputField from "@/components/InputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// shadcn/ui Form + react-hook-form + zod

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  // 가입 후 로그인 페이지로 이동
  const from = location.state?.from ?? "/login";
  const { signUp } = useAuth();

  const form = useForm({
    resolver: zodResolver(signupSchema), // zod 스키마로 검증
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" }, // RHF이 관리할 초기 값
    mode: "onTouched", // 해당 필드 한 번이라도 만지고 나면 에러 표시
    shouldFocusError: true, // 에러 발생 시 해당 필드로 포커스
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      navigate(from, {
        replace: true,
        state: {
          flash: "회원가입이 완료되었습니다. 이메일 인증 후 로그인해 주세요.",
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto grid justify-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
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
                name="name"
                label="Name"
                autoComplete="name"
              />
              <InputField
                form={form}
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
              />
              <InputField
                form={form}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
              />
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>
              <Button asChild variant="link">
                <Link to="/login" replace>
                  {/* 히스토리 정리 위해 replace */}
                  Back to Login
                </Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
}
