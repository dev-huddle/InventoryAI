import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import type { registerUser } from "../types/registerUser.type";
import RegisterValidationSchema from "../validation/validation";
import Axios from "@/lib/axios";
import { toast } from "@workspace/ui/hooks/use-toast";
import { useRouter } from "next/navigation";

const useRegister = function () {

    const router  = useRouter();

    const { isPending, mutate } = useMutation({
        mutationKey: ["register-user"],
        mutationFn: async ({firstName, lastName, email, password }: registerUser) => {
            const data = await Axios.post("/auth/register", { firstName, lastName, email, password })
            return data
        }
    })

    const formik = useFormik<registerUser>({
        initialValues: {
            firstName: "",
            lastName:"",
            email: "",
            password: ""
        },
        validationSchema: RegisterValidationSchema,
        onSubmit: ({ firstName, lastName, email, password }) => {
            mutate({firstName, lastName, email, password }, {
                onSuccess(res) {
                    toast({
                        title: "User successfully registered",
                        description: "User has been successfully registered, please login!",
                        variant: "default"
                    });
                    
                    setTimeout(() => {
                        router.push("/login");
                    }, 1000);
                },
                onError(err: any) {
                    toast({
                        title: "User registration failed",
                        description: `${err.response.data.errors[0].message}`,
                        variant: "destructive"
                    });
                }
            })
        }
    })

    return { isPending, ...formik }
}

export default useRegister