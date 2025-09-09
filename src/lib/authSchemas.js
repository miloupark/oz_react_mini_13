import { z } from "zod";

// 이름: 2~8자, 한글/영문/숫자만
const nameReg = /^[A-Za-z가-힣0-9]{2,8}$/;

// 비밀번호: 영어 대문자/소문자 + 숫자의 조합 사용
const passwordSchema = z
  .string()
  .min(6, "비밀번호는 최소 6자 이상")
  .regex(/(?=.*[a-z])/, "소문자를 포함해야 합니다.")
  .regex(/(?=.*[A-Z])/, "대문자를 포함해야 합니다.")
  .regex(/(?=.*\d)/, "숫자를 포함해야 합니다.");

// 로그인 스키마
export const loginSchema = z.object({
  email: z.string().email("이메일 형식 오류입니다."),
  password: passwordSchema,
});

// 회원가입 스키마
export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .regex(nameReg, "이름은 2~8자, 한글/영문/숫자만 가능합니다."),
    email: z.string().email("이메일 형식 오류입니다."),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다",
  });
