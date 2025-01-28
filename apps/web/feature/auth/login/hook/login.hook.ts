import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import type { LoginUser } from "../types/loginUser.type";
import LoginValidationSchema from "../validation/validation";
import Axios from "@/lib/axios";
import { toast } from "@workspace/ui/hooks/use-toast";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/utils";

const useLogin = function () {
    const router = useRouter();

    const { isPending, mutate } = useMutation({
        mutationKey: ["login-user"],
        mutationFn: async ({ email, password }: LoginUser) => {
            const { data } = await Axios.post("/auth/login", { email, password });
            return data;
        }
    });

    const formik = useFormik<LoginUser>({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: LoginValidationSchema,
        onSubmit: ({ email, password }) => {
            mutate({ email, password }, {
                onSuccess(res) {
                  
                    const { accessToken, refreshToken } = res.data;

                    // Save tokens in session storage
                    setTokens(accessToken, refreshToken);

                    toast({
                        title: "User successfully authenticated",
                        description: "Authentication successful",
                        variant: "default"
                    });

                    setTimeout(() => {
                        // router.push("/dashboard");
                    }, 1000);
                },
                onError(err: any) {
                    toast({
                        title: "Login failed",
                        description: `${err.response.data.errors[0].message}`,
                        variant: "destructive"
                    });
                }
            });
        }
    });

    return { isPending, ...formik };
};

export default useLogin;
