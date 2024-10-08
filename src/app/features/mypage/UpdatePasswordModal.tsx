import { UpdatePasswordModalProps } from "@/components/types/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema } from "@/app/validators/auth";
import { useToast } from "@/components/ui/use-toast";
import { useUpdatePassword } from "@/app/apis/hooks/useUpdatePassword";
import { X } from "lucide-react";

export const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title,
  currentPasswordLabel,
  currentPasswordPlaceholder,
  newPasswordLabel,
  newPasswordPlaceholder,
  newPasswordConfirmLabel,
  newPasswordConfirmPlaceholder,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  const { toast } = useToast();
  const updatePasswordMutation = useUpdatePassword();

  const onSubmit = (data: any) => {
    updatePasswordMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "비밀번호가 성공적으로 변경되었습니다.",
          variant: "success",
          duration: 3000,
        });
        onSuccess(data.newPassword);
        onClose();
      },
      onError: (error: any) => {
        toast({
          title: "비밀번호 변경에 실패했습니다.",
          description: (error as Error).message,
          variant: "destructive",
          duration: 3000,
        });
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xs rounded-xl bg-white shadow-lg">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
          >
            <X />
          </button>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-black">{title}</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="mb-2 block text-sm text-black">
                {currentPasswordLabel}
              </label>
              <input
                type="password"
                placeholder={currentPasswordPlaceholder}
                {...register("currentPassword")}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-black"
              />
              {errors.currentPassword && (
                <p className="mt-1 text-[0.8rem] text-destructive">
                  {String(errors.currentPassword?.message)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm text-black">
                {newPasswordLabel}
              </label>
              <input
                type="password"
                placeholder={newPasswordPlaceholder}
                {...register("newPassword")}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-black"
              />
              {errors.newPassword && (
                <p className="mt-1 text-[0.8rem] text-destructive">
                  {String(errors.newPassword?.message)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm text-black">
                {newPasswordConfirmLabel}
              </label>
              <input
                type="password"
                placeholder={newPasswordConfirmPlaceholder}
                {...register("newPasswordConfirm")}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-black"
              />
              {errors.newPasswordConfirm && (
                <p className="mt-1 text-[0.8rem] text-destructive">
                  {String(errors.newPasswordConfirm?.message)}
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-1 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded bg-gray-400 px-6 py-2"
              >
                취소
              </button>
              <button type="submit" className="rounded bg-primary px-6 py-1">
                변경
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
