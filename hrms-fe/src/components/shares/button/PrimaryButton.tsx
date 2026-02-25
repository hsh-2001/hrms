interface IButtonProp {
    name?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}
export default function PrimaryButton({ name = 'Submit', onClick, type = "button" }: IButtonProp) {
  return (
    <button type={type} className="px-4 py-2 bg-green-500 text-white cursor-pointer rounded-[20px] text-sm w-auto" onClick={onClick}>
      {name}
    </button>
  )
}
