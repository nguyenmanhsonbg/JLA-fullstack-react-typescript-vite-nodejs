import { useAuth } from "@/hook/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

export default function DetailUserProfile() {
  const { user, setUser } = useAuth(); // Assuming setUser is a function to update the user in your auth context
  
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const FormSchema = z.object({
    full_name: z.string().trim().min(2, {
      message: "Bạn cần nhập tên của mình!",
    }),
    phone_number: z
      .string()
      .trim()
      .min(10, { message: "Bạn cần nhập số điện thoại" })
      .max(11, { message: "Bạn cần nhập số điện thoại" }),
    dob: z.string().optional(),
    email: z.string().email().optional(),
  });

  const initialUserProfile = {
    full_name: user.full_name,
    phone_number: user.phone_number,
    dob: user.dob,
    email: user.email,
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    //@ts-ignore
    defaultValues: initialUserProfile,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const subscription = form.watch((value) => {
      const hasChanged = Object.keys(initialUserProfile).some(
        (key) => initialUserProfile[key] !== value[key]
      );
      setIsButtonDisabled(!hasChanged);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, initialUserProfile]);
  const openNotification = () => {
    notification.open({
      message: " ",
      description: "Thông tin của bạn đã được cập nhật thành công.",
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      placement: "topRight",
    });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.put(`/account/${user.account_id}`, data, {
        headers: {
          Authorization: user.token,
        },
      });
      if (response.status === 200) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser); // Update the user in context
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Save the updated user to local storage
        setMessage(response.data.data.message);
        //alert(response.data.data.message);
        openNotification();
      } else {
        throw new Error("Error!");
      }
    } catch (error) {
        navigate('/error', { state: { message: error } });
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000); // Clear message after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or if message changes
    }
  }, [message]);
if (window.innerWidth > 920)
  return (
    <div className="flex items-center justify-center w-full mt-24">
      <div className="flex flex-col w-full h-full gap-10 p-10 bg-white shadow-sm rounded-3xl">
        <div className="mt-5 text-xl font-semibold text-center">
          THÔNG TIN CÁ NHÂN
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 pl-16"
          >
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center pr-8">
                  <FormLabel className="w-1/6">Họ và Tên</FormLabel>
                  <FormControl>
                    <Input className="w-full ml-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center pr-8">
                  <FormLabel className="w-1/6 ">Email</FormLabel>
                  <FormControl>
                    <Input className="w-full ml-3" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center pr-8">
                  <FormLabel className="w-1/6">Số điện thoại</FormLabel>
                  <FormControl>
                    <Input className="w-full ml-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center pr-8">
                  <FormLabel className="w-1/6">Ngày sinh</FormLabel>
                  <FormControl>
                    <Input className="w-full ml-3" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-4/5 bg-[#eeb55f] hover:bg-[#ff9800] mx-auto"
              disabled={isButtonDisabled}
            >
              <p className="w-full">Thay đổi thông tin</p>
            </Button>
            <div className="text-[#7db660]">{message}</div>
          </form>
        </Form>
      </div>
    </div>
  );
if (window.innerWidth <= 920 && window.innerWidth > 620)
  return (
    <div className="flex w-full mt-20">
      <div className="flex flex-col w-full h-full gap-10 bg-white shadow-sm rounded-3xl">
        <div className="mt-5 text-xl font-semibold text-center">
          THÔNG TIN CÁ NHÂN
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 pl-16"
          >
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center pr-8">
                  <FormLabel className="w-1/6">Họ và Tên</FormLabel>
                  <FormControl>
                    <Input className="w-full ml-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center pr-8">
                  <FormLabel className="w-1/6 ">Email</FormLabel>
                  <FormControl>
                    <Input className="w-full ml-3" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center pr-8">
                  <FormLabel className="w-1/6">Số điện thoại</FormLabel>
                  <FormControl>
                    <Input className="w-full ml-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center pr-8">
                  <FormLabel className="w-1/6">Ngày sinh</FormLabel>
                  <FormControl>
                    <Input className="w-full ml-3" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-4/5 bg-[#eeb55f] hover:bg-[#ff9800] mx-auto"
              disabled={isButtonDisabled}
            >
              <p className="w-full">Thay đổi thông tin</p>
            </Button>
            <div className="text-[#7db660]">{message}</div>
          </form>
        </Form>
      </div>
    </div>
  );
if (window.innerWidth <= 620)
    return (
      <div className="flex w-full mt-10">
        <div className="flex flex-col w-full h-full gap-10 bg-white shadow-sm rounded-3xl">
          <div className="mt-8 text-xs font-semibold text-center">
            THÔNG TIN CÁ NHÂN
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 pl-2"
            >
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center pr-8">
                    <FormLabel className="w-1/6">Họ và Tên</FormLabel>
                    <FormControl>
                      <Input className="w-full ml-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center pr-8">
                    <FormLabel className="w-1/6 ">Email</FormLabel>
                    <FormControl>
                      <Input className="w-full ml-3" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center pr-8">
                    <FormLabel className="w-1/6">Số điện thoại</FormLabel>
                    <FormControl>
                      <Input className="w-full ml-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center pr-8">
                    <FormLabel className="w-1/6">Ngày sinh</FormLabel>
                    <FormControl>
                      <Input className="w-full ml-3" type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-4/5 bg-[#eeb55f] hover:bg-[#ff9800] mx-auto"
                disabled={isButtonDisabled}
              >
                <p className="w-full">Thay đổi thông tin</p>
              </Button>
              <div className="text-[#7db660]">{message}</div>
            </form>
          </Form>
        </div>
      </div>
    );
}
