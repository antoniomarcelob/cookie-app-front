"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from 'lucide-react'
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const LoginInfoSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must have at least 4 characters." }),
  password: z
    .string()
    .min(4, { message: "Password must have at least 4 characters." }),
});

type LoginInfoType = z.infer<typeof LoginInfoSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInfoType>({
    resolver: zodResolver(LoginInfoSchema),
  });

  const router = useRouter()

  async function handleLogin(data: LoginInfoType) {
    const response = await fetch(`http://localhost:3000/api/signin`, {
      body: JSON.stringify(data),
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if ([500, 400].includes(response.status)) {
      if (response.status === 400) {
        toast.error("Credenciais inválidas. Tente novamente.");
      }
    } else if (response.status === 200) {
      toast.success("Logado");
      router.push("/protected");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="size-96 flex flex-col">
        <CardHeader className="text-center">Faça seu login</CardHeader>
        <CardContent className="flex-1">
          <form
            className="flex flex-col h-full justify-between"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input type="text" {...register("username")} />
                {errors.username && (
                  <ErrorMessage
                    name="username"
                    errors={errors}
                    render={(err) => (
                      <span className="text-xs">{err.message}</span>
                    )}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input type="password" {...register("password")} />
                {errors.password && (
                  <ErrorMessage
                    name="password"
                    errors={errors}
                    render={(err) => (
                      <span className="text-xs">{err.message}</span>
                    )}
                  />
                )}
              </div>
            </div>
            <Button className="cursor-pointer">
              {
                isSubmitting ? <LoaderCircle className="animate-spin" /> : <span>Login</span>
              }
              
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
