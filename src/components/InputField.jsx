import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// 🧩 InputField: 공통 인풋 필드 컴포넌트
// - label, input, validation message를 한 번에 관리
// - `form.control`과 `name`을 연결해 상태 및 유효성 검사를 자동 반영

export default function InputField({
  form,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
