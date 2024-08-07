import { useAuthStore } from "@/app/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/app/apis/authApi";

export const useLogOut = () => {
  const logOut = useAuthStore((state) => state.logOut);

  return useMutation({
    mutationKey: ["logOut"],
    mutationFn: authApi.logOut,
    onSuccess: () => {
      logOut();
    },
    onError: (error) => {
      console.error("로그아웃 API 호출 중 에러 발생: ", error);
    },
  });
};
