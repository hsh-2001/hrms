import BaseDialog from "./shares/BaseDialog";
import InfoButton from "./shares/button/InfoButton";
import PrimaryButton from "./shares/button/PrimaryButton";
import MyInput from "./shares/input/MyInput";

interface IResetPasswordDialog {
  isOpen: boolean;
  onClose: () => void;
  model: { user_id: string; password: string };
  updateModel: React.Dispatch<React.SetStateAction<{ user_id: string; password: string }>>;
  onClick: React.SubmitEventHandler<HTMLFormElement>;
}

function ResetPasswordDialog({ isOpen, onClose, model, updateModel, onClick }: IResetPasswordDialog) {

  return (
    <BaseDialog isOpen={isOpen} onClose={onClose} title="Reset Password" isCentered>
      <form onSubmit={onClick} className="grid gap-4">
        <MyInput
          id="newPassword"
          label="New Password"
          required
          value={model.password}
          onChange={(e) => updateModel({ ...model, password: e.target.value })}
        />
        <div className="flex justify-end gap-2 mt-2">
          <InfoButton name="Cancel" onClick={onClose} />
          <PrimaryButton name="Reset" type="submit" />
        </div>
      </form>
    </BaseDialog>
  );
};

export default ResetPasswordDialog;